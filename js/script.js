/* ============================================================
   STAMP!DA — JS compartido por index.html y gracias.html
   ============================================================ */

/* ----- CONFIG: edita SOLO estos valores antes de publicar ----- */
const STAMPIDA_CONFIG = {
  // PENDIENTE: pega aquí tu enlace de Calendly (ej. "https://calendly.com/stampida/cita?hide_gdpr_banner=1")
  calendlyUrl: "",
  // PENDIENTE: pega aquí la URL del video del hero (.mp4 en loop)
  heroVideoUrl: "",
  // WhatsApp de respaldo (solo dígitos, con lada país)
  whatsapp: "525551720748"
};

/* ----- Datos de testimonios (reseñas reales de Google) ----- */
const STAMPIDA_REVIEWS = [
  { name: "Miguel Ramirez",          initials: "MR", color: "#1a73e8", text: "Excelente trabajo, tiempo récord y atención increíble. Muy recomendable 😊" },
  { name: "Hydra México",            initials: "H",  color: "#8a3ab9", text: "Me gustó mucho todo el proceso, desde el momento en que les mandé el primer mensaje. El tiempo de respuesta fue muy rápido y todo el proceso muy dinámico y sencillo. El trabajo me gustó mucho. 100% recomendable." },
  { name: "Ana Flores",              initials: "AF", color: "#e8001d", text: "Llevé mi Tesla y me encantó el resultado, muy atentos en todo momento y el equipo de instaladores increíble 😍❤️" },
  { name: "Ricardo Cruz Najar",      initials: "RC", color: "#e8710a", text: "Excelente servicio por parte de todo el equipo de Stampida, al igual que un excelente trabajo de hojalatería y wrap." },
  { name: "Ivan Barboza",            initials: "IB", color: "#f4511e", text: "La atención de principio a fin fue muy buena, me explicaron en todo momento el porqué. Todo quedó mejor de lo que esperaba y por mejor precio. Coticé en otros lados y me convino mucho más. Recomiendo ampliamente traer sus autos a colocarles el vinil, realmente quedan como nuevos." },
  { name: "Jaime Fuentes",           initials: "JF", color: "#0b8043", text: "¡Excelente trabajo! La atención de primera, y el mejor precio del mercado. ¡Muy recomendables!" },
  { name: "Alberto Tejeda",          initials: "AT", color: "#c2185b", text: "Solo una recomendación para quienes apliquen a buena parte o toda la carrocería: revisen el muestrario a la luz natural. Por lo demás, gran trabajo y atención del equipo." },
  { name: "Leonela Jara",            initials: "LJ", color: "#3949ab", text: "The best idea, everything was done thru the app, everyone is very nice and I loved the results!" },
  { name: "Luis Eduardo Meza Castro",initials: "LM", color: "#d81b60", text: "Buen lugar, excelente atención y trabajo. Muy recomendable." },
  { name: "Eleazar Dominguez",       initials: "ED", color: "#00897b", text: "Gran experiencia con STAMP!DA, resultado impecable y trato de primera. Cinco estrellas." }
];

/* ----- Ubicaciones ----- */
const STAMPIDA_LOCATIONS = [
  { name: "Santa Fe",        q: "STAMPIDA Santa Fe CDMX" },
  { name: "Polanco",         q: "STAMPIDA Polanco CDMX" },
  { name: "Lomas",           q: "Montes Urales 424 Lomas de Chapultepec" },
  { name: "Reforma",         q: "STAMPIDA Reforma CDMX" },
  { name: "Insurgentes Sur", q: "STAMPIDA Insurgentes Sur" },
  { name: "Mitikah",         q: "STAMPIDA Mitikah" },
  { name: "Artz Pedregal",   q: "STAMPIDA Artz Pedregal" },
  { name: "Garage Toluca",   q: "Av. Paseo Tollocan 1322 Santa Ana Tlapaltitlan 50160 Toluca" }
];

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mapSrc = (q) => "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";

/* ============================================================
   LANDING (index.html)
   ============================================================ */
function initLanding() {
  /* Video del hero */
  const heroVideo = document.getElementById("heroVideo");
  const heroPh = document.getElementById("heroPlaceholder");
  if (heroVideo && STAMPIDA_CONFIG.heroVideoUrl) {
    heroVideo.src = STAMPIDA_CONFIG.heroVideoUrl;
    heroVideo.style.display = "block";
    heroVideo.addEventListener("loadeddata", () => { if (heroPh) heroPh.style.display = "none"; });
  }

  /* Testimonios */
  const track = document.getElementById("reviewsTrack");
  if (track) {
    const cardHTML = (r) => `
      <article class="review">
        <div class="review__head">
          <div class="avatar" style="background:${r.color}">${esc(r.initials)}</div>
          <div style="min-width:0">
            <strong class="review__name">${esc(r.name)}</strong>
            <span class="stars review__stars">★★★★★</span>
          </div>
        </div>
        <p class="review__text">${esc(r.text)}</p>
        <div class="review__src">
          <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="">View on Google
        </div>
      </article>`;
    /* Se duplica la lista para un loop continuo del marquee */
    track.innerHTML = (STAMPIDA_REVIEWS.map(cardHTML).join("")) + (STAMPIDA_REVIEWS.map(cardHTML).join(""));
  }

  /* Ubicaciones */
  const locBtns = document.getElementById("locBtns");
  const locName = document.getElementById("locName");
  const locMap = document.getElementById("locMap");
  if (locBtns) {
    STAMPIDA_LOCATIONS.forEach((loc, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "loc-btn" + (i === 0 ? " is-active" : "");
      b.textContent = loc.name;
      b.addEventListener("click", () => {
        locBtns.querySelectorAll(".loc-btn").forEach(x => x.classList.remove("is-active"));
        b.classList.add("is-active");
        if (locName) locName.textContent = loc.name;
        if (locMap) locMap.src = mapSrc(loc.q);
      });
      locBtns.appendChild(b);
    });
    if (locName) locName.textContent = STAMPIDA_LOCATIONS[0].name;
    if (locMap) locMap.src = mapSrc(STAMPIDA_LOCATIONS[0].q);
  }

  /* Carrusel de antes y después */
  const viewport = document.getElementById("showcaseViewport");
  const dots = document.getElementById("showcaseDots");
  const prev = document.getElementById("showcasePrev");
  const next = document.getElementById("showcaseNext");
  if (viewport && dots && prev && next) {
    const slides = Array.from(viewport.querySelectorAll(".showcase__slide"));
    let active = 0;
    let timer;
    const render = (n) => {
      active = (n + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === active);
        const video = slide.querySelector("video");
        if (video) {
          if (i === active) video.play().catch(() => {});
          else video.pause();
        }
      });
      Array.from(dots.children).forEach((dot, i) => dot.classList.toggle("is-active", i === active));
    };
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "showcase__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Ver slide " + (i + 1));
      dot.addEventListener("click", () => { render(i); reset(); });
      dots.appendChild(dot);
    });
    const reset = () => {
      clearInterval(timer);
      timer = setInterval(() => render(active + 1), 5600);
    };
    prev.addEventListener("click", () => { render(active - 1); reset(); });
    next.addEventListener("click", () => { render(active + 1); reset(); });
    viewport.addEventListener("mouseenter", () => clearInterval(timer));
    viewport.addEventListener("mouseleave", reset);
    render(0); reset();
  }

  /* Formulario → guarda intención y redirige a gracias.html */
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      data.at = new Date().toISOString();
      try { localStorage.setItem("stampida_last_lead", JSON.stringify(data)); } catch (err) {}
      if (window.dataLayer) window.dataLayer.push({ event: "stampida_lead_submit", servicio: data.servicio, zona: data.ubicacion });
      window.location.href = "gracias.html";
    });
  }
}

/* ============================================================
   THANK YOU (gracias.html)
   ============================================================ */
function initGracias() {
  /* Saludo personalizado con el nombre capturado en el form */
  let lead = {};
  try { lead = JSON.parse(localStorage.getItem("stampida_last_lead") || "{}"); } catch (err) {}
  const firstName = (lead.nombre || "").trim().split(" ")[0] || "";
  const greet = document.getElementById("thanksGreet");
  if (greet) greet.textContent = firstName ? `${firstName}, ¡ya casi!` : "¡Ya casi!";

  const resumen = document.getElementById("thanksResumen");
  if (resumen && (lead.servicio || lead.ubicacion)) {
    const parts = [];
    if (lead.servicio) parts.push(lead.servicio);
    if (lead.ubicacion) parts.push(lead.ubicacion);
    resumen.textContent = "Tu solicitud: " + parts.join(" · ");
    resumen.style.display = "block";
  }

  /* Embed de Calendly (o respaldo por WhatsApp) */
  const cal = document.getElementById("calCard");
  if (!cal) return;
  const url = (STAMPIDA_CONFIG.calendlyUrl || "").trim();
  if (url) {
    const prefill = new URLSearchParams();
    if (lead.nombre) prefill.set("name", lead.nombre);
    if (lead.email) prefill.set("email", lead.email);
    const sep = url.includes("?") ? "&" : "?";
    const full = url + sep + "embed_domain=" + encodeURIComponent(location.hostname || "stampida") + "&embed_type=Inline" + (prefill.toString() ? "&" + prefill.toString() : "");
    const iframe = document.createElement("iframe");
    iframe.title = "Agenda tu cita — STAMP!DA";
    iframe.src = full;
    cal.innerHTML = "";
    cal.appendChild(iframe);
  } else {
    const wa = "https://wa.me/" + STAMPIDA_CONFIG.whatsapp + "?text=" + encodeURIComponent("Quiero agendar mi cita STAMP!DA");
    cal.innerHTML = `
      <div class="cal-fallback">
        <div class="cal-fallback__icon">📅</div>
        <strong>Elige tu horario</strong>
        <p>Aquí se mostrará tu calendario de Calendly. Conéctalo pegando tu enlace en <code>js/script.js</code> (campo <code>calendlyUrl</code>), o continúa por WhatsApp.</p>
        <a class="btn btn--primary btn--md" href="${wa}" target="_blank" rel="noopener">Continuar por WhatsApp →</a>
      </div>`;
  }
}

/* ----- Auto-init según la página ----- */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page");
  if (page === "gracias") initGracias();
  else initLanding();
});
