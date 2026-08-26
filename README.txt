ALQUILER ORDENADORES MADRID - ONE PAGE
Teléfono caja y botones: +34 910 05 36 51
Dominio: https://alquilerordenadoresmadrid.es/
(corregido de http:// a https:// en canonical, og:url, JSON-LD,
robots.txt y sitemap.xml; sin colisión con ningún otro dominio
revisado en esta sesión)
Incluye, SOLO para esta web, la sección especial de precios facilitada:
- Día: PC Windows 10 € + IVA/día; Surface/Mac 12 € + IVA.
- Semana: PC Windows 50 € + IVA; Surface/Mac 65 € + IVA.
- Mes: PC Windows 150 € + IVA/mes; Surface/Mac 200 € + IVA.
NOTA: en la captura original facilitada, la tarjeta semanal mostraba literalmente “50€ + IVA / mes*” (errata). Corregido a “50€ + IVA / semana*”, confirmado por el cliente.
El correo SMTP no aparece visible en la web; solo se usa en /api/contacto.
Variables Vercel: SMTP_HOST, SMTP_PORT=465, SMTP_SECURE=true, SMTP_USER, SMTP_PASS, CONTACT_EMAIL.
Google Analytics:
G-XDX432KN2T

HISTORIAL: el repositorio era multipágina (12 páginas /servicios/ de
tipos y duraciones de alquiler) y se convirtió a one-page; esas
páginas fueron eliminadas en commits anteriores. Como ya no existen en
el sitemap actual, se ha añadido middleware.mjs para redirigir (301)
cualquier URL antigua a la home, evitando 404 en enlaces indexados o
backlinks antiguos. Excluye /api/* y cualquier ruta con extensión de
archivo. Se añadió "@vercel/functions": "^2.0.3" a package.json como
dependencia de esta función.

REVISIÓN (fixes aplicados en esta pasada):
- Ya estaba bien: banner de cookies (ya corregido en un commit
  anterior), sección SEO "Guía" (id="sobre-alquiler"), menú móvil,
  borde blanco del chat, api/contacto.js con SMTP + nodemailer,
  teléfono +34 910 05 36 51 consistente en toda la web (no se ha
  tocado). No se ha modificado ninguno de estos.
- Google Analytics: no existía. Añadido G-XDX432KN2T.
- Dominio corregido de http:// a https:// (canonical, og:url, JSON-LD,
  robots.txt, sitemap.xml).
- Schema.org: faltaban areaServed y sameAs (Maps/YouTube) — añadidos.
- .navcall: el texto largo ("Atención Telefónica 24 horas 365 días")
  deformaba la píldora del menú. Acortado a solo el número (mismo
  número, +34 910 05 36 51) y añadido white-space:nowrap como
  salvaguarda. El botón grande .cta.phone del hero conserva su texto
  completo.
- H1 de portada reescrito, corto, directo y totalmente afirmativo
  (sin interrogación ni condicionales): "Necesitas un ordenador ya.
  Aquí te lo entregamos hoy mismo." Tamaño del H1 aumentado:
  clamp(38-54px) → clamp(46-72px) en escritorio, 38px → 46px en móvil.
