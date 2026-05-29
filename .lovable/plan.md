# GuabirubaTem — Site estático

Diretório de empresas locais com página principal (grid + carrossel), páginas individuais por empresa e um painel admin para criar/editar/excluir páginas. Tudo em HTML/CSS/JS puro, dados em `localStorage`.

## Estrutura de arquivos

Como o projeto roda em TanStack Start, os arquivos estáticos vão para a pasta `public/` (servida diretamente). A rota React `/` será substituída por um redirecionamento simples para `/home.html` (não posso usar `index.html` porque conflita com o SPA).

```text
public/
├── home.html               ← Página principal (grid + carrossel + busca)
├── admin.html              ← Painel (login + CRUD de empresas)
├── styles.css              ← CSS global compartilhado
├── admin.js                ← Lógica do admin (login + CRUD)
├── app.js                  ← Lógica da home (render grid, busca, carrossel)
├── empresa.js              ← Lógica da página de empresa (lê slug, renderiza)
├── robots.txt
├── sitemap.xml
└── empresas/
    ├── je-stetica.html     ← Exemplo pré-criado
    └── template.html       ← Template usado para novas empresas (lê dados por slug)
src/routes/
└── index.tsx               ← Substituído: redireciona "/" → "/home.html"
```

Observação: como tudo é estático no cliente, novas páginas geradas pelo admin NÃO criam arquivos `.html` reais por empresa (não há servidor de escrita). Em vez disso, usamos um único `empresas/template.html` que lê `?slug=...` da URL e busca os dados no `localStorage`. URLs finais ficam: `/empresas/template.html?slug=je-stetica`. A `je-stetica.html` permanece como exemplo "hard-coded" para demonstração.

## Páginas

### home.html (referência: imagem 2)

- Header escuro com logo "GuabirubaTem" e nav (Categorias, Início, Sobre, Contato, Vagas).
- Carrossel hero com bullets.
- Barra de busca centralizada (filtra grid por nome/categoria/descrição).
- Grid responsivo "Todas as Empresas" (3 colunas desktop, 1 mobile) com card: imagem de capa, nome, descrição curta, badge "Patrocinado" opcional.
- Botão "Carregar mais".
- Footer escuro com logo, ícones sociais, copyright.

### empresas/template.html + je-stetica.html (referência: imagem 1)

- Header igual ao da home.
- Breadcrumb "Início › Beleza › Je Stética" + botão Voltar.
- Bloco principal: avatar, nome, rating em estrelas, autor.
- Cards laterais: "Fale com Guabiruba" (botões WhatsApp / Ligar / Website) e "Localização" (mapa estático/iframe + endereço + botões Ver no Maps / Como Chegar).
- Seção "Sobre a Empresa" (texto longo).
- Tags "Serviços em ...".
- Galeria de fotos (grid).
- Seção "Outras empresas de [categoria] em Guabiruba" (2 cards).
- Footer.

### admin.html (referência: imagem 3)

- Tela de login (email + senha) — credencial única em constante no `admin.js`. Sessão persistida em `sessionStorage`.
- Após login: header escuro + grid de cards de empresas (cada um com nome, categoria, badge "Patrocinado", botões Editar e Excluir vermelho).
- Botão "+ Nova empresa" abre modal com formulário (slug, nome, categoria, descrição, sobre, telefone WhatsApp, endereço, lat/lng, link mapa, rating, tags, URLs de imagens [capa, avatar, galeria], patrocinado sim/não).
- Editar reabre o mesmo modal preenchido.
- Excluir pede confirmação.

## Dados (localStorage)

Chave única `guabirubatem:empresas` armazenando array de objetos:

```ts
{
  slug, nome, categoria, descricaoCurta, sobre,
  whatsapp, telefone, website, endereco, mapaEmbedUrl, lat, lng,
  rating, avaliacoes, autor,
  tags: string[],
  capaUrl, avatarUrl, galeria: string[],
  patrocinado: boolean,
  criadoEm
}
```

Seed inicial (no primeiro load) inclui `je-stetica` para a home não nascer vazia.

## Login do admin

Como pediu login mas optou por localStorage (sem backend), uso credencial estática definida em `admin.js`:

```js
const ADMIN_EMAIL = "admin@guabirubatem.com.br";
const ADMIN_PASSWORD = "@guabirubatem@2026";
```

Após validar, gravo `sessionStorage.setItem("gbt_admin", "1")`. Páginas do admin checam essa flag e redirecionam para a tela de login se ausente. Aviso explícito: isto NÃO é segurança real — qualquer pessoa que ler o JS vê a senha. Para autenticação real seria necessário backend (Lovable Cloud).

## Design

- Paleta: preto/grafite no header/footer (`#0b0b0b`), fundo branco (`#fafafa`), cards brancos com borda sutil, vermelho coral (`#e53935`) para botões de excluir, azul (`#1e88e5`) para WhatsApp/links.
- Tipografia: Inter via Google Fonts.
- Layout: container max-width 1100px, grid CSS, mobile-first.
- Ícones via Lucide CDN (`<script src="https://unpkg.com/lucide@latest">`).

## SEO

- `robots.txt`: permite tudo, aponta sitemap.
- `sitemap.xml`: lista `/home.html`, `/admin.html` (com noindex no admin) e `/empresas/je-stetica.html`. URLs dinâmicas via template não entram no sitemap (limitação de site estático sem backend).
- Meta tags (title, description, og:*) em cada página.

## Mudanças no projeto React existente

- `src/routes/index.tsx` → substituído por um componente mínimo que faz `window.location.replace("/home.html")` no `useEffect` (mantém o roteador TanStack funcional para qualquer outra rota futura).
- Nenhum outro arquivo do stack React é tocado.

## Limitações conscientes (aceitas pelo escopo escolhido)

1. Dados só existem no navegador do usuário — visitantes diferentes veem catálogos diferentes (escolha "localStorage").
2. Login admin é cosmético (senha visível no JS).
3. Novas empresas usam `template.html?slug=...` em vez de arquivos `.html` reais por empresa.
4. Sitemap não cobre empresas criadas via admin.

Se algum desses pontos for bloqueador, vale trocar para Lovable Cloud (banco real + auth real + páginas geradas server-side).