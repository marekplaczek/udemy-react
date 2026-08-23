create extension if not exists pgcrypto;

create table if not exists app_users (
  id bigserial primary key,
  clerk_user_id text not null unique,
  email text,
  display_name text not null,
  role text not null default 'STUDENT' check (role in ('STUDENT','TEACHER','ADMIN')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  teacher_user_id bigint not null references app_users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists class_students (
  class_id uuid not null references classes(id) on delete cascade,
  student_user_id bigint not null references app_users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, student_user_id)
);

create table if not exists student_progress (
  student_user_id bigint not null references app_users(id) on delete cascade,
  stage_id smallint not null check (stage_id between 1 and 7),
  status text not null default 'IN_PROGRESS' check (status in ('LOCKED','IN_PROGRESS','PASSED')),
  best_score smallint not null default 0 check (best_score between 0 and 100),
  attempts integer not null default 0 check (attempts >= 0),
  passed_at timestamptz,
  last_activity timestamptz,
  primary key (student_user_id, stage_id)
);

create table if not exists quiz_attempts (
  id bigserial primary key,
  student_user_id bigint not null references app_users(id) on delete cascade,
  stage_id smallint not null check (stage_id between 1 and 7),
  score smallint not null check (score >= 0),
  max_score smallint not null check (max_score > 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_classes_teacher on classes(teacher_user_id);
create index if not exists idx_class_students_student on class_students(student_user_id);
create index if not exists idx_progress_activity on student_progress(last_activity desc);
create index if not exists idx_attempts_student_created on quiz_attempts(student_user_id, created_at desc);
