-- Supabase SQL Editor에서 실행하세요.
-- 서비스 역할 키를 사용하는 서버 API만 insert할 수 있도록
-- 공개 사용자용 RLS 정책은 만들지 않습니다.

create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 50),
  phone text not null check (char_length(phone) between 8 and 30),
  preferred_date date,
  guests integer check (guests is null or guests between 1 and 100),
  message text check (message is null or char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

comment on table public.inquiries is
  '만나의 식탁 클래스 및 모임 문의';

comment on column public.inquiries.phone is
  '문의 회신용 연락처. 관리자 화면과 로그에서 불필요하게 노출하지 않도록 주의';

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);
