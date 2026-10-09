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

// Los colores del sitio (globals.css), escritos a mano: los mails no leen variables CSS.
const color = {
  green: "#0b4a3c",
  greenTint: "#e7f0ec",
  paper: "#f2f5f1",
  surface: "#ffffff",
  ink: "#10231e",
  inkSoft: "#4a5e57",
  line: "#d5dfda",
};
const sans = "system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const serif = "Georgia,'Times New Roman',serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Link para abrir el chat de WhatsApp con el lead.
 * En Argentina los celulares llevan un 9 después del 54 ("+54 9 11 ..."), y mucha gente
 * no lo pone: sin él, el chat puede no abrir. También se acepta el número local
 * (10 dígitos, con o sin 0 adelante) y se le agrega el 549.
 */
function whatsappLink(phone: string) {
  const hasPlus = phone.trim().startsWith("+");
  let digits = phone.replace(/\D/g, "");

  if (!hasPlus && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.startsWith("54") && !digits.startsWith("549")) {
    digits = `549${digits.slice(2)}`;
  } else if (!hasPlus && digits.length === 10) {
    digits = `549${digits}`;
  }
  return `https://wa.me/${digits}`;
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

function buildText(lead: LeadInput, whatsapp: string) {
  return [
    "Nueva consulta desde la web",
    "",
    `Nombre: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.phone} (${whatsapp})`,
    `Para: ${labelFor(clientTypeOptions, lead.clientType)}`,
    `Experiencia: ${labelFor(experienceOptions, lead.experience)}`,
    `Objetivos: ${lead.goals.map((g) => labelFor(goalOptions, g)).join(", ")}`,
    `Monto: ${labelFor(amountOptions, lead.amount)}`,
    `Cómo la conoció: ${labelFor(sourceOptions, lead.source)}`,
    "",
    "Mensaje:",
    lead.message || "—",
  ].join("\n");
}

/**
 * Mail con tablas y estilos en línea (lo único que respetan Gmail y Outlook).
 * Arriba lo que sirve para decidir rápido: nombre, tipo, monto y los botones para contestar;
 * abajo el detalle y el mensaje.
 */
function buildHtml(lead: LeadInput, whatsapp: string) {
  const name = escapeHtml(lead.fullName);
  const email = escapeHtml(lead.email);
  const kind = escapeHtml(labelFor(clientTypeOptions, lead.clientType));
  const amount = escapeHtml(labelFor(amountOptions, lead.amount));
  const goals = lead.goals.map((g) => labelFor(goalOptions, g)).join(", ");
  // Texto de vista previa en la bandeja de entrada (no se ve dentro del mail).
  const preheader = escapeHtml(`${labelFor(clientTypeOptions, lead.clientType)} · ${goals}`);

  const tag = (text: string) =>
    `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 12px;border-radius:999px;background:${color.greenTint};color:${color.green};font-size:13px;font-weight:600">${text}</span>`;

  const link = (href: string, text: string) =>
    `<a href="${escapeHtml(href)}" style="color:${color.green};text-decoration:underline">${text}</a>`;

  const details: Array<[string, string]> = [
    ["Email", link(`mailto:${lead.email}`, email)],
    ["WhatsApp", link(whatsapp, escapeHtml(lead.phone))],
    ["Experiencia", escapeHtml(labelFor(experienceOptions, lead.experience))],
    ["Objetivos", escapeHtml(goals)],
    ["Cómo la conoció", escapeHtml(labelFor(sourceOptions, lead.source))],
  ];

  const detailRows = details
    .map(
      ([label, value]) => `
            <tr>
              <td style="padding:12px 16px 12px 0;border-bottom:1px solid ${color.line};color:${color.inkSoft};font-size:14px;vertical-align:top;white-space:nowrap">${label}</td>
              <td style="padding:12px 0;border-bottom:1px solid ${color.line};color:${color.ink};font-size:15px;vertical-align:top">${value}</td>
            </tr>`,
    )
    .join("");

  // pre-wrap: respeta los saltos de línea y párrafos que escribió el lead.
  const message = lead.message
    ? `<div style="padding:16px 18px;border-radius:12px;background:${color.paper};color:${color.ink};font-size:15px;line-height:1.55;white-space:pre-wrap">${escapeHtml(lead.message)}</div>`
    : `<p style="margin:0;color:${color.inkSoft};font-size:15px">No dejó mensaje.</p>`;

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:${color.paper}">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${color.paper};font-family:${sans}">
      <tr>
        <td align="center" style="padding:24px 12px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${color.surface};border:1px solid ${color.line};border-radius:20px">
            <tr>
              <td style="padding:32px 28px">
                <p style="margin:0 0 8px;color:${color.green};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Nueva consulta desde la web</p>
                <h1 style="margin:0 0 14px;color:${color.ink};font-family:${serif};font-size:30px;font-weight:400;line-height:1.15">${name}</h1>
                <div style="margin:0 0 22px">${tag(kind)}${tag(amount)}</div>

                <a href="${escapeHtml(whatsapp)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:12px;background:${color.green};color:#ffffff;font-size:15px;font-weight:600;text-decoration:none">Escribir por WhatsApp</a>
                <a href="mailto:${email}" style="display:inline-block;margin:0 0 8px;padding:10.5px 18.5px;border:1.5px solid ${color.green};border-radius:12px;color:${color.green};font-size:15px;font-weight:600;text-decoration:none">Responder por mail</a>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 26px;border-top:1px solid ${color.line}">${detailRows}
                </table>

                <p style="margin:0 0 10px;color:${color.inkSoft};font-size:14px">Mensaje</p>
                ${message}
              </td>
            </tr>
          </table>
          <p style="max-width:560px;margin:16px auto 0;color:${color.inkSoft};font-size:12px;line-height:1.5">
            Si respondés este mail, le llega directo a ${name}.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
  const whatsapp = whatsappLink(lead.phone);

  const { error } = await resend.emails.send({
    from: serverEnv.leadFromEmail,
    to: serverEnv.leadNotifyEmail!,
    replyTo: lead.email,
    subject,
    html: buildHtml(lead, whatsapp),
    text: buildText(lead, whatsapp),
  });

  if (error) throw new Error(`Resend: ${error.message}`);
}
