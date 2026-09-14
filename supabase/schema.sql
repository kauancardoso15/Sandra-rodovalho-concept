-- =============================================================================
-- Sandra Rodovalho Concept — Schema do banco de dados (Supabase / PostgreSQL)
-- =============================================================================
-- Este script é IDEMPOTENTE: pode ser executado quantas vezes for preciso,
-- em qualquer ordem de re-execução, sem quebrar por objetos já existentes e
-- SEM apagar dados já cadastrados (produtos, categorias, configurações).
--
-- Como usar:
--   1. Crie um projeto em https://supabase.com
--   2. Abra o SQL Editor do projeto
--   3. Cole e execute este arquivo inteiro
--   4. Copie a "Project URL" e a "anon public key" (Project Settings > API)
--      para o arquivo .env.local do site (ver .env.local.example)
--   5. Crie o primeiro usuário administrador em Authentication > Users >
--      "Add user" (e-mail + senha) — não existe cadastro público, apenas
--      login para quem já tem uma conta criada manualmente pela loja.
-- =============================================================================

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Tabela: categories
-- -----------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.categories is 'Categorias do catálogo (Vestidos, Conjuntos, Blusas, etc.)';

-- -----------------------------------------------------------------------------
-- Tabela: products
-- -----------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  category_id uuid references public.categories(id) on delete set null,
  price numeric(10, 2) not null check (price >= 0),
  sale_price numeric(10, 2) check (sale_price is null or sale_price >= 0),
  image_url text,
  gallery text[] not null default '{}',
  is_active boolean not null default true,
  is_new boolean not null default false,
  is_on_sale boolean not null default false,
  -- Colunas preparadas para uma futura gestão de estoque/variações.
  -- Não utilizadas pelo painel administrativo na versão atual.
  stock_quantity integer,
  size text,
  variations jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.products is 'Produtos do catálogo da Sandra Rodovalho Concept';

-- Garante que o desconto seja sempre coerente quando um preço promocional existe.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'products_sale_price_lower_than_price'
  ) then
    alter table public.products
      add constraint products_sale_price_lower_than_price
      check (sale_price is null or sale_price < price);
  end if;
end $$;

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_is_active_idx on public.products (is_active);
create index if not exists products_is_new_idx on public.products (is_new) where is_new;
create index if not exists products_is_on_sale_idx on public.products (is_on_sale) where is_on_sale;

-- Mantém updated_at sempre atualizado automaticamente.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Tabela: settings (linha única de configurações centrais da loja)
-- -----------------------------------------------------------------------------
create table if not exists public.settings (
  id text primary key default 'default',
  store_name text not null default 'Sandra Rodovalho Concept',
  logo_url text,
  whatsapp_number text not null default '5561999990000',
  instagram_handle text not null default '@sandrarodovalhoconcept',
  instagram_url text not null default 'https://www.instagram.com/sandrarodovalhoconcept',
  home_headline text not null default 'Sandra Rodovalho Concept',
  home_subheadline text not null default 'Moda feminina com essência.',
  hero_image_url text,
  about_text text not null default 'A Sandra Rodovalho Concept nasceu para vestir mulheres que valorizam a elegância, a personalidade e o estilo em cada detalhe.',
  about_image_url text,
  updated_at timestamptz not null default now(),
  constraint settings_single_row check (id = 'default')
);

comment on table public.settings is 'Configurações centrais da loja (nome, WhatsApp, Instagram, textos e imagens editáveis pelo painel)';

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Tabela: instagram_highlights (preparada para uma futura curadoria de posts
-- na seção "Visto no Instagram" — ainda sem tela própria no painel)
-- -----------------------------------------------------------------------------
create table if not exists public.instagram_highlights (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  link text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.instagram_highlights is 'Imagens selecionadas para a seção "Visto no Instagram" (gestão futura pelo painel)';

-- =============================================================================
-- Row Level Security (RLS)
-- =============================================================================
-- Regra geral: qualquer visitante pode LER o catálogo ativo (site público);
-- apenas usuários autenticados (login do painel) podem CRIAR, ALTERAR ou
-- EXCLUIR dados. Não há cadastro público de administradores — os usuários
-- são criados manualmente pela própria loja em Authentication > Users.

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.settings enable row level security;
alter table public.instagram_highlights enable row level security;

-- categories -------------------------------------------------------------
drop policy if exists "categories_public_read_active" on public.categories;
create policy "categories_public_read_active"
  on public.categories for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "categories_admin_read_all" on public.categories;
create policy "categories_admin_read_all"
  on public.categories for select
  to authenticated
  using (true);

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write"
  on public.categories for insert
  to authenticated
  with check (true);

drop policy if exists "categories_admin_update" on public.categories;
create policy "categories_admin_update"
  on public.categories for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "categories_admin_delete" on public.categories;
create policy "categories_admin_delete"
  on public.categories for delete
  to authenticated
  using (true);

-- products -----------------------------------------------------------------
drop policy if exists "products_public_read_active" on public.products;
create policy "products_public_read_active"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "products_admin_read_all" on public.products;
create policy "products_admin_read_all"
  on public.products for select
  to authenticated
  using (true);

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "products_admin_update" on public.products;
create policy "products_admin_update"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "products_admin_delete" on public.products;
create policy "products_admin_delete"
  on public.products for delete
  to authenticated
  using (true);

-- settings -------------------------------------------------------------------
drop policy if exists "settings_public_read" on public.settings;
create policy "settings_public_read"
  on public.settings for select
  to anon, authenticated
  using (true);

drop policy if exists "settings_admin_write" on public.settings;
create policy "settings_admin_write"
  on public.settings for insert
  to authenticated
  with check (true);

drop policy if exists "settings_admin_update" on public.settings;
create policy "settings_admin_update"
  on public.settings for update
  to authenticated
  using (true)
  with check (true);

-- instagram_highlights ---------------------------------------------------
drop policy if exists "instagram_highlights_public_read" on public.instagram_highlights;
create policy "instagram_highlights_public_read"
  on public.instagram_highlights for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "instagram_highlights_admin_all" on public.instagram_highlights;
create policy "instagram_highlights_admin_all"
  on public.instagram_highlights for all
  to authenticated
  using (true)
  with check (true);

-- =============================================================================
-- Storage (fotos de produtos, categorias, imagens do site e do Instagram)
-- =============================================================================
insert into storage.buckets (id, name, public)
values
  ('product-images', 'product-images', true),
  ('category-images', 'category-images', true),
  ('site-images', 'site-images', true),
  ('instagram-images', 'instagram-images', true)
on conflict (id) do nothing;

drop policy if exists "storage_public_read_store_images" on storage.objects;
create policy "storage_public_read_store_images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('product-images', 'category-images', 'site-images', 'instagram-images'));

drop policy if exists "storage_admin_upload_store_images" on storage.objects;
create policy "storage_admin_upload_store_images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('product-images', 'category-images', 'site-images', 'instagram-images'));

drop policy if exists "storage_admin_update_store_images" on storage.objects;
create policy "storage_admin_update_store_images"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('product-images', 'category-images', 'site-images', 'instagram-images'));

drop policy if exists "storage_admin_delete_store_images" on storage.objects;
create policy "storage_admin_delete_store_images"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('product-images', 'category-images', 'site-images', 'instagram-images'));

-- =============================================================================
-- Seed de configuração inicial (não sobrescreve se já existir)
-- =============================================================================
insert into public.settings (id, store_name, whatsapp_number, instagram_handle, instagram_url, home_headline, home_subheadline, about_text)
values (
  'default',
  'Sandra Rodovalho Concept',
  '5561999990000',
  '@sandrarodovalhoconcept',
  'https://www.instagram.com/sandrarodovalhoconcept',
  'Sandra Rodovalho Concept',
  'Moda feminina com essência.',
  'A Sandra Rodovalho Concept nasceu para vestir mulheres que valorizam a elegância, a personalidade e o estilo em cada detalhe. Cada peça é escolhida com um olhar atento à qualidade, ao caimento e às tendências que respeitam a essência feminina — para que cada cliente se sinta confiante em qualquer ocasião.'
)
on conflict (id) do nothing;

-- =============================================================================
-- Seed de categorias e produtos DEMONSTRATIVOS
-- =============================================================================
-- ⚠️ Todo o conteúdo abaixo é DEMONSTRATIVO (DEMO) — nomes, preços e
-- descrições fictícios usados apenas para apresentar o funcionamento do
-- site. NÃO representam produtos reais da Sandra Rodovalho Concept e devem
-- ser substituídos (ou apagados) pelo catálogo real antes da publicação
-- definitiva. O "on conflict do nothing" evita duplicar ou sobrescrever
-- itens que a loja já tenha editado, caso este script seja executado de novo.

insert into public.categories (name, slug, sort_order) values
  ('Vestidos', 'vestidos', 1),
  ('Conjuntos', 'conjuntos', 2),
  ('Blusas', 'blusas', 3),
  ('Calças', 'calcas', 4),
  ('Saias', 'saias', 5),
  ('Acessórios', 'acessorios', 6)
on conflict (slug) do nothing;

insert into public.products (name, slug, description, category_id, price, sale_price, is_new, is_on_sale)
select v.name, v.slug, v.description, c.id, v.price, v.sale_price, v.is_new, v.is_on_sale
from (
  values
    ('Vestido Floral', 'vestido-floral', 'Vestido midi com estampa floral exclusiva, caimento fluido e tecido leve — ideal para o dia a dia com elegância.', 'vestidos', 189.90, 159.90, true, true),
    ('Conjunto Elegance', 'conjunto-elegance', 'Conjunto de blazer alfaiataria e calça reta em tecido nobre. Corte impecável para quem busca sofisticação.', 'conjuntos', 349.90, null, true, false),
    ('Vestido Midi', 'vestido-midi', 'Vestido midi em malha canelada, decote sofisticado e modelagem que valoriza a silhueta.', 'vestidos', 219.90, 179.90, false, true),
    ('Conjunto Casual', 'conjunto-casual', 'Conjunto de tricô com blusa e saia em tom neutro. Praticidade e estilo para o dia a dia.', 'conjuntos', 259.90, null, false, false),
    ('Calça Pantalona', 'calca-pantalona', 'Calça pantalona de cintura alta em tecido com caimento estruturado. Alonga a silhueta.', 'calcas', 169.90, 139.90, false, true),
    ('Blusa Premium', 'blusa-premium', 'Blusa em cetim com botões dourados e caimento fluido. Um toque de sofisticação discreta.', 'blusas', 129.90, null, true, false),
    ('Saia Plissada', 'saia-plissada', 'Saia midi plissada com movimento leve e cós justo. Peça-chave para looks femininos e atemporais.', 'saias', 149.90, null, false, false),
    ('Bolsa Estruturada', 'bolsa-estruturada', 'Bolsa estruturada com alça de mão e tiracolo removível, acabamento em metal dourado.', 'acessorios', 199.90, 169.90, false, true)
) as v(name, slug, description, category_slug, price, sale_price, is_new, is_on_sale)
join public.categories c on c.slug = v.category_slug
on conflict (slug) do nothing;
