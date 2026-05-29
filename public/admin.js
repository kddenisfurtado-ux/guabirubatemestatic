// Admin: login + CRUD
(function () {
  const ADMIN_EMAIL = "admin@guabirubatem.com.br";
  const ADMIN_PASSWORD = "guabiruba2026";
  const SESSION_KEY = "gbt_admin";
  const STORAGE_KEY = "guabirubatem:empresas";

  function loadAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch { return []; }
  }
  function saveAll(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2000);
  }

  const loginView = document.getElementById("login-view");
  const adminView = document.getElementById("admin-view");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const logoutBtn = document.getElementById("logout-btn");

  function showAdmin() {
    loginView.style.display = "none";
    adminView.style.display = "block";
    renderList();
  }
  function showLogin() {
    loginView.style.display = "flex";
    adminView.style.display = "none";
  }

  if (sessionStorage.getItem(SESSION_KEY) === "1") showAdmin();
  else showLogin();

  loginForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const email = document.getElementById("email").value.trim();
    const pwd = document.getElementById("password").value;
    if (email === ADMIN_EMAIL && pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      loginError.textContent = "";
      showAdmin();
    } else {
      loginError.textContent = "Email ou senha incorretos.";
    }
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  });

  // ---- CRUD ----
  const list = document.getElementById("admin-list");
  const newBtn = document.getElementById("new-btn");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalClose = document.getElementById("modal-close");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("empresa-form");

  function renderList() {
    const data = loadAll();
    if (!data.length) {
      list.innerHTML = `<div class="empty" style="grid-column:1/-1">Nenhuma empresa cadastrada. Clique em "+ Nova empresa" para começar.</div>`;
      return;
    }
    list.innerHTML = data
      .map(
        (e) => `
      <div class="admin-card">
        <div class="ava" style="background-image:url('${esc(e.avatarUrl || e.capaUrl || "")}')"></div>
        <div class="info">
          <p class="nome">${esc(e.nome)}</p>
          <div class="cat">${esc(e.categoria || "")}</div>
          ${e.patrocinado ? '<span class="pat">Patrocinado</span>' : ""}
        </div>
        <div class="actions">
          <button class="btn" data-edit="${esc(e.slug)}">Editar</button>
          <button class="btn btn-danger" data-del="${esc(e.slug)}">Excluir</button>
        </div>
      </div>
    `,
      )
      .join("");
    list.querySelectorAll("[data-edit]").forEach((b) =>
      b.addEventListener("click", () => openModal(b.getAttribute("data-edit"))),
    );
    list.querySelectorAll("[data-del]").forEach((b) =>
      b.addEventListener("click", () => deleteEmpresa(b.getAttribute("data-del"))),
    );
  }

  function openModal(slug) {
    const data = loadAll();
    const e = slug ? data.find((x) => x.slug === slug) : null;
    modalTitle.textContent = e ? "Editar empresa" : "Nova empresa";
    form.reset();
    form.elements["originalSlug"].value = e ? e.slug : "";
    if (e) {
      for (const k of [
        "nome", "slug", "categoria", "descricaoCurta", "sobre",
        "whatsapp", "telefone", "website", "endereco", "mapaEmbedUrl",
        "rating", "avaliacoes", "autor", "capaUrl", "avatarUrl",
      ]) {
        if (form.elements[k]) form.elements[k].value = e[k] || "";
      }
      form.elements["tags"].value = (e.tags || []).join(", ");
      form.elements["galeria"].value = (e.galeria || []).join("\n");
      form.elements["patrocinado"].checked = !!e.patrocinado;
    }
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  modalClose.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  newBtn.addEventListener("click", () => openModal(null));

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);
    const originalSlug = (fd.get("originalSlug") || "").toString();
    const nome = (fd.get("nome") || "").toString().trim();
    if (!nome) return;
    let slug = (fd.get("slug") || "").toString().trim() || slugify(nome);
    slug = slugify(slug);

    const data = loadAll();
    if (!originalSlug && data.some((x) => x.slug === slug)) {
      alert("Já existe uma empresa com esse slug.");
      return;
    }
    const obj = {
      slug,
      nome,
      categoria: (fd.get("categoria") || "").toString().trim(),
      descricaoCurta: (fd.get("descricaoCurta") || "").toString().trim(),
      sobre: (fd.get("sobre") || "").toString(),
      whatsapp: (fd.get("whatsapp") || "").toString().trim(),
      telefone: (fd.get("telefone") || "").toString().trim(),
      website: (fd.get("website") || "").toString().trim(),
      endereco: (fd.get("endereco") || "").toString().trim(),
      mapaEmbedUrl: (fd.get("mapaEmbedUrl") || "").toString().trim(),
      rating: Number(fd.get("rating") || 0),
      avaliacoes: Number(fd.get("avaliacoes") || 0),
      autor: (fd.get("autor") || "").toString().trim(),
      tags: (fd.get("tags") || "").toString().split(",").map((s) => s.trim()).filter(Boolean),
      capaUrl: (fd.get("capaUrl") || "").toString().trim(),
      avatarUrl: (fd.get("avatarUrl") || "").toString().trim(),
      galeria: (fd.get("galeria") || "").toString().split(/\r?\n/).map((s) => s.trim()).filter(Boolean),
      patrocinado: form.elements["patrocinado"].checked,
      criadoEm: Date.now(),
    };

    let next;
    if (originalSlug) {
      next = data.map((x) => (x.slug === originalSlug ? obj : x));
    } else {
      next = [obj, ...data];
    }
    saveAll(next);
    closeModal();
    renderList();
    toast(originalSlug ? "Empresa atualizada" : "Empresa criada");
  });

  function deleteEmpresa(slug) {
    if (!confirm("Excluir esta empresa? Esta ação não pode ser desfeita.")) return;
    const next = loadAll().filter((x) => x.slug !== slug);
    saveAll(next);
    renderList();
    toast("Empresa excluída");
  }
})();
