// GET /blog (vía rewrite de vercel.json) — listado de artículos publicados, leídos en vivo de la API de Kelatos.
// La organización se identifica con ?org=<clave>: un parámetro de la URL, no una cabecera, porque la API de
// Kelatos se expone detrás de un túnel de Cloudflare que reescribe X-Forwarded-Host con el suyo propio.
const { paginaLayout, tarjetaArticulo } = require("./_blog-layout");

const API_BASE = process.env.KELATOS_BLOG_API || "https://db.affirmatechnology.com/kelatos-api";
const ORG_KEY = "alquiler_ordenadores";

module.exports = async (req, res) => {
  try {
    const r = await fetch(`${API_BASE}/publico/blog?org=${ORG_KEY}`);
    const data = await r.json().catch(() => null);
    const posts = data && data.ok && Array.isArray(data.posts) ? data.posts : [];
    const html = paginaLayout({
      title: "Blog | Alquiler de Ordenadores Madrid",
      description: "Guías sobre alquiler de ordenadores y portátiles Windows, Surface y Mac en Madrid: cuándo conviene, qué equipo elegir y cómo funciona.",
      canonical: "https://alquilerordenadoresmadrid.es/blog",
      body: `<section class="blog-hero"><div class="wrap"><div class="kicker">Blog Alquiler de Ordenadores</div><h1 class="title">¿Necesitas un ordenador ya? Aquí resolvemos tus dudas</h1><p class="lead">Guías claras para decidir si alquilar te conviene, qué equipo elegir y durante cuánto tiempo.</p></div></section>
<section class="blog-list"><div class="wrap">${
        posts.length ? `<div class="blog-grid">${posts.map(tarjetaArticulo).join("")}</div>` : `<p class="lead">Todavía no hay artículos publicados. Vuelve pronto.</p>`
      }</div></section>`,
    });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
    res.status(200).send(html);
  } catch (e) {
    console.error(e);
    res.status(502).send("No se pudo cargar el blog. Inténtalo de nuevo en unos minutos.");
  }
};
