-- ============================================
-- Polymarket Bot — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Users table (extends Supabase auth.users)
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  has_paid boolean default false,
  stripe_customer_id text,
  stripe_payment_id text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- Auto-create a public.users row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Contact messages
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- ============================================
-- Row Level Security
-- ============================================

alter table public.users enable row level security;
alter table public.contact_messages enable row level security;

-- Users can read their own record
create policy "Users can read own record"
  on public.users for select
  using (auth.uid() = id);

-- Service role can update user records (used by Stripe webhook)
create policy "Service role updates users"
  on public.users for update
  using (true);

-- Anyone can insert a contact message
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  with check (true);

-- Only service role can read contact messages (admin)
create policy "Service role reads contact messages"
  on public.contact_messages for select
  using (auth.role() = 'service_role');
