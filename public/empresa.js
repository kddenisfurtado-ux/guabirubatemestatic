// Empresa detail page (template.html) — renders from ?slug=
(function () {
  if (!document.getElementById("empresa-root")) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const all = window.GBT.loadAll();
  const e = all.find((x) => x.slug === slug);
  const root = document.getElementById("empresa-root");

  if (!e) {
    root.innerHTML = `<div class="empty">Empresa não encontrada. <a href="/home.html">Voltar à página inicial</a>.</div>`;
    return;
  }

  document.title = `${e.nome} — ${e.categoria} em Guabiruba, SC | GuabirubaTem`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", e.descricaoCurta || "");

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
  const stars = "★★★★★☆☆☆☆☆".slice(5 - (e.rating || 0), 10 - (e.rating || 0));
  const waUrl = e.whatsapp ? `https://wa.me/${e.whatsapp.replace(/\D/g, "")}` : "";
  const telUrl = e.telefone ? `tel:${e.telefone.replace(/\D/g, "")}` : "";

  const related = all
    .filter((x) => x.slug !== e.slug && x.categoria === e.categoria)
    .slice(0, 2);

  root.innerHTML = `
    <div class="crumbs">
      <a href="/home.html">Início</a> ›
      <a href="/home.html?cat=${encodeURIComponent(e.categoria)}">${esc(e.categoria)}</a> ›
      <span>${esc(e.nome)}</span>
    </div>
    <a class="back" href="/home.html">← Voltar</a>

    <div class="empresa-layout">
      <div>
        <div class="panel">
          <div class="empresa-head">
            <div class="avatar" style="background-image:url('${esc(e.avatarUrl || e.capaUrl || "")}')"></div>
            <div style="flex:1">
              <h1>${esc(e.nome)} — ${esc(e.categoria)} em Guabiruba, SC</h1>
              <div class="stars">${stars} <span style="color:var(--muted);font-size:12px">(${e.avaliacoes || 0})</span></div>
              <div class="meta">${esc(e.autor || "")}</div>
            </div>
          </div>
        </div>

        <div class="panel">
          <h3>Sobre a Empresa</h3>
          <p style="font-size:13px;color:var(--ink-2);white-space:pre-wrap">${esc(e.sobre || "")}</p>
        </div>

        ${(e.tags && e.tags.length) ? `
        <div class="panel">
          <h3>Serviços em ${esc(e.categoria)}</h3>
          <div class="tags">
            ${e.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
          </div>
        </div>` : ""}

        ${(e.galeria && e.galeria.length) ? `
        <div class="panel">
          <h3>Galeria de Fotos</h3>
          <div class="gallery">
            ${e.galeria.map((g) => `<div class="ph" style="background-image:url('${esc(g)}')"></div>`).join("")}
          </div>
        </div>` : ""}

        ${related.length ? `
        <div class="panel">
          <h3>Outras empresas de ${esc(e.categoria)} em Guabiruba</h3>
          <div class="related-grid">
            ${related.map((r) => `
              <a class="card" href="${r.slug === "je-stetica" ? "/empresas/je-stetica.html" : "/empresas/template.html?slug=" + encodeURIComponent(r.slug)}">
                <div class="cover" style="background-image:url('${esc(r.capaUrl || "")}');aspect-ratio:16/9"></div>
                <div class="body">
                  <p class="title">${esc(r.nome)}</p>
                  <p class="desc">${esc(r.descricaoCurta || "")}</p>
                </div>
              </a>
            `).join("")}
          </div>
          <div style="text-align:center;margin-top:12px">
            <a href="/home.html" style="font-size:13px;color:var(--primary)">Ver todas as empresas de ${esc(e.categoria)} em Guabiruba</a>
          </div>
        </div>` : ""}
      </div>

      <aside>
        <div class="panel">
          <h3>Fale com ${esc(e.nome.split(" ")[0])}</h3>
          <div class="side-actions">
            ${waUrl ? `<a class="btn btn-whatsapp btn-block" href="${waUrl}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
            ${telUrl ? `<a class="btn btn-block" href="${telUrl}">Ligar</a>` : ""}
            ${e.website ? `<a class="btn btn-primary btn-block" href="${esc(e.website)}" target="_blank" rel="noopener">Website</a>` : ""}
          </div>
        </div>

        <div class="panel">
          <h3>Localização em Guabiruba</h3>
          <iframe class="map-embed" src="${esc(e.mapaEmbedUrl || "https://www.google.com/maps?q=Guabiruba,SC&output=embed")}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <p class="address">${esc(e.endereco || "")}</p>
          <div class="side-actions">
            <a class="btn btn-block" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.endereco || "Guabiruba,SC")}">Ver no Maps</a>
            <a class="btn btn-primary btn-block" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(e.endereco || "Guabiruba,SC")}">Como Chegar</a>
          </div>
        </div>
      </aside>
    </div>
  `;
})();
