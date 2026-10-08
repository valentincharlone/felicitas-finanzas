-- Tabla de leads del formulario de captación.
-- Ejecutar en Supabase > SQL Editor.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  client_type text not null check (client_type in ('persona', 'empresa')),
  experience text not null check (experience in ('inicial', 'intermedio', 'avanzado')),
  goals text[] not null default '{}',
  amount text not null,
  message text,

  full_name text not null,
  email text not null,
  phone text not null,
  source text,

  -- Para que Feli lleve el seguimiento (a futuro, desde un panel).
  status text not null default 'nuevo'
    check (status in ('nuevo', 'contactado', 'reunion', 'cliente', 'descartado'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS activado y sin políticas: solo el service role (servidor) puede leer/escribir.
alter table public.leads enable row level security;

-- Permisos explícitos, así no dependemos de "Automatically expose new tables":
-- el servidor (service role) inserta consultas y el cron /api/keep-alive lee;
-- los roles públicos de la Data API no tienen ningún acceso a la tabla.
revoke all on public.leads from anon, authenticated;
grant select, insert on public.leads to service_role;
