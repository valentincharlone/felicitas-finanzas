import "server-only";

import { Resend } from "resend";

import {
  amountOptions,
  clientTypeOptions,
  experienceOptions,
  goalOptions,
  labelFor,
  sourceOptions,
} from "@/content/lead-options";
import { isEmailConfigured, serverEnv } from "@/lib/env";
import type { LeadInput } from "@/lib/validations/lead-schema";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildRows(lead: LeadInput): Array<[string, string]> {
  const whatsapp = lead.phone.replace(/\D/g, "");
  return [
    ["Nombre", lead.fullName],
    ["Email", lead.email],
    ["WhatsApp", `${lead.phone} (wa.me/${whatsapp})`],
    ["Para", labelFor(clientTypeOptions, lead.clientType)],
    ["Experiencia", labelFor(experienceOptions, lead.experience)],
    ["Objetivos", lead.goals.map((g) => labelFor(goalOptions, g)).join(", ")],
    ["Monto", labelFor(amountOptions, lead.amount)],
    ["Cómo la conoció", labelFor(sourceOptions, lead.source)],
    ["Mensaje", lead.message || "—"],
  ];
}

/**
 * El asunto lleva el filtro (tipo de cliente y monto) para que Feli pueda
 * priorizar desde la bandeja de entrada sin abrir el mail.
 * Ej: "[Web] Empresa · USD 50.000 a 150.000 · Juan Pérez"
 */
function buildSubject(lead: LeadInput) {
  const kind = lead.clientType === "empresa" ? "Empresa" : "Persona";
  const name = lead.fullName.replace(/\s+/g, " ");
  return `[Web] ${kind} · ${labelFor(amountOptions, lead.amount)} · ${name}`;
}

/** Le avisa a Feli por mail que entró un lead nuevo. */
export async function sendLeadNotification(lead: LeadInput) {
  const subject = buildSubject(lead);

  if (!isEmailConfigured) {
    console.info(
      `[lead] Email no configurado, se omite el aviso: "${subject}"`,
    );
    return;
  }

  const resend = new Resend(serverEnv.resendApiKey);
  const rows = buildRows(lead);

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#10231e;max-width:560px">
      <h2 style="color:#0b4a3c;margin:0 0 16px">Nueva consulta desde la web</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#4a5e57;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
            <td style="padding:8px 0;border-bottom:1px solid #d5dfda">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const { error } = await resend.emails.send({
    from: serverEnv.leadFromEmail,
    to: serverEnv.leadNotifyEmail!,
    replyTo: lead.email,
    subject,
    html,
    text,
  });

  if (error) throw new Error(`Resend: ${error.message}`);
}
