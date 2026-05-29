// Home page logic — grid, search, hero carousel
(function () {
  const STORAGE_KEY = "guabirubatem:empresas";

  const SEED = [
    {
      slug: "je-stetica",
      nome: "Je Stética",
      categoria: "Beleza",
      descricaoCurta: "Beleza em Guabiruba, SC. Atendimento profissional e personalizado.",
      sobre:
        "A Je Stética é uma empresa do segmento de Beleza localizada em Guabiruba, SC. Atende moradores de Guabiruba e região com atendimento próximo, prático e de qualidade. Casa de apartinha não é cadeira, é uma garota de Beleza e Salãozinho para uso bom uso e útil! Atendendo na cidade e nos cantos de estética e bom estar pessoal, os procedimentos indicados na esquina das épocas do ano: prolongamento, massagens relaxantes, spa dos pés, drenagem linfática, drenagem e quetam.",
      whatsapp: "5547999999999",
      telefone: "(47) 99999-9999",
      website: "",
      endereco: "Rua Angelo Mochlin, Mochlin Alto, Guabiruba - SC",
      mapaEmbedUrl:
        "https://www.google.com/maps?q=Guabiruba,SC&output=embed",
      lat: -27.0805,
      lng: -48.9819,
      rating: 5,
      avaliacoes: 47,
      autor: "@je_stetica",
      tags: [
        "beleza",
        "estética",
        "manicure",
        "pedicure",
        "spa dos pés",
        "drenagem linfática",
        "massagem",
        "depilação",
      ],
      capaUrl:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
      avatarUrl:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80",
      galeria: [
        "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&q=80",
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&q=80",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=80",
        "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&q=80",
      ],
      patrocinado: true,
      criadoEm: Date.now(),
    },
    {
      slug: "pretty-car-veiculos",
      nome: "Pretty Car Veículos",
      categoria: "Automotivo",
      descricaoCurta: "Revenda de veículos seminovos em Guabiruba, SC.",
      sobre: "Loja de veículos seminovos com financiamento facilitado.",
      whatsapp: "5547988888888",
      telefone: "(47) 98888-8888",
      endereco: "Av. Brasil, Guabiruba - SC",
      mapaEmbedUrl: "https://www.google.com/maps?q=Guabiruba,SC&output=embed",
      rating: 4,
      avaliacoes: 12,
      autor: "@prettycar",
      tags: ["automotivo", "veículos", "seminovos"],
      capaUrl:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      avatarUrl: "",
      galeria: [],
      patrocinado: true,
      criadoEm: Date.now(),
    },
    {
      slug: "kiko-climatizacao",
      nome: "KIKO Climatização",
      categoria: "Serviços",
      descricaoCurta: "Instalação, manutenção e higienização de ar condicionado.",
      sobre: "Especialistas em climatização para residências e empresas.",
      whatsapp: "5547977777777",
      endereco: "Centro, Guabiruba - SC",
      mapaEmbedUrl: "https://www.google.com/maps?q=Guabiruba,SC&output=embed",
      rating: 5,
      avaliacoes: 23,
      tags: ["climatização", "ar condicionado", "instalação"],
      capaUrl:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
      patrocinado: false,
      criadoEm: Date.now(),
    },
    {
      slug: "dias-malhas",
      nome: "Dias Malhas",
      categoria: "Confecção e Vestuário",
      descricaoCurta: "Confecção de malhas e vestuário em Guabiruba.",
      sobre: "Tradição em confecção de malhas há mais de 20 anos.",
      whatsapp: "5547966666666",
      endereco: "Bairro Aymorés, Guabiruba - SC",
      mapaEmbedUrl: "https://www.google.com/maps?q=Guabiruba,SC&output=embed",
      rating: 4,
      tags: ["confecção", "malhas", "vestuário"],
      capaUrl:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
      patrocinado: false,
      criadoEm: Date.now(),
    },
    {
      slug: "cvc-pinturas",
      nome: "CVC Pinturas",
      categoria: "Serviços",
      descricaoCurta: "Pintura residencial e comercial com qualidade.",
      sobre: "Serviços de pintura interna e externa.",
      whatsapp: "5547955555555",
      endereco: "Guabiruba - SC",
      mapaEmbedUrl: "https://www.google.com/maps?q=Guabiruba,SC&output=embed",
      rating: 5,
      tags: ["pintura", "reforma"],
      capaUrl:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
      patrocinado: false,
      criadoEm: Date.now(),
    },
    {
      slug: "pique-rj-lounge",
      nome: "Pique RJ Lounge & Burguer",
      categoria: "Restaurantes",
      descricaoCurta: "Os melhores hambúrgueres artesanais de Guabiruba.",
      sobre: "Lounge e hamburgueria com ambiente aconchegante.",
      whatsapp: "5547944444444",
      endereco: "Centro, Guabiruba - SC",
      mapaEmbedUrl: "https://www.google.com/maps?q=Guabiruba,SC&output=embed",
      rating: 5,
      tags: ["hambúrguer", "lounge", "restaurante"],
      capaUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
      patrocinado: false,
      criadoEm: Date.now(),
    },
  ];

  function loadAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
        return SEED.slice();
      }
      return JSON.parse(raw);
    } catch (e) {
      return SEED.slice();
    }
  }

  // expose for other pages
  window.GBT = window.GBT || {};
  window.GBT.STORAGE_KEY = STORAGE_KEY;
  window.GBT.loadAll = loadAll;
  window.GBT.SEED = SEED;
  window.GBT.saveAll = function (arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  };

  // ---- HOME render ----
  if (document.getElementById("grid")) {
    const grid = document.getElementById("grid");
    const search = document.getElementById("search");
    const countEl = document.getElementById("count");
    const loadMoreBtn = document.getElementById("load-more");
    let visible = 12;

    function detailUrl(e) {
      if (e.slug === "je-stetica") return "/empresas/je-stetica.html";
      return "/empresas/template.html?slug=" + encodeURIComponent(e.slug);
    }

    function render() {
      const q = (search.value || "").toLowerCase().trim();
      const all = loadAll();
      const filtered = all.filter((e) => {
        if (!q) return true;
        return (
          (e.nome || "").toLowerCase().includes(q) ||
          (e.categoria || "").toLowerCase().includes(q) ||
          (e.descricaoCurta || "").toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q))
        );
      });
      countEl.textContent = filtered.length + " resultados";
      const slice = filtered.slice(0, visible);
      grid.innerHTML = slice
        .map(
          (e) => `
        <a class="card" href="${detailUrl(e)}">
          ${e.patrocinado ? '<span class="badge">Patrocinado</span>' : ""}
          <div class="cover" style="background-image:url('${e.capaUrl || ""}')"></div>
          <div class="body">
            <p class="title">${escapeHtml(e.nome)}</p>
            <p class="desc">${escapeHtml(e.descricaoCurta || "")}</p>
          </div>
        </a>
      `,
        )
        .join("");
      loadMoreBtn.style.display = filtered.length > visible ? "block" : "none";
    }

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      }[c]));
    }

    search.addEventListener("input", () => {
      visible = 12;
      render();
    });
    loadMoreBtn.addEventListener("click", () => {
      visible += 12;
      render();
    });
    render();
  }

  // ---- HERO carousel ----
  const slidesEl = document.getElementById("hero-slides");
  const dotsEl = document.getElementById("hero-dots");
  if (slidesEl && dotsEl) {
    const images = [
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    ];
    slidesEl.innerHTML = images
      .map((u) => `<div class="hero-slide" style="background-image:url('${u}')"></div>`)
      .join("");
    dotsEl.innerHTML = images.map((_, i) => `<button data-i="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("");
    let i = 0;
    function go(n) {
      i = (n + images.length) % images.length;
      slidesEl.style.transform = `translateX(-${i * 100}%)`;
      dotsEl.querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === i));
    }
    dotsEl.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => go(+b.dataset.i)));
    setInterval(() => go(i + 1), 5000);
  }

  // ---- mobile menu ----
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
})();
