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

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente):
- H1 verificado: "Necesitas un ordenador ya. Aquí te lo entregamos hoy
  mismo." es afirmativo, corto y no repite la plantilla "no funciona".
  No se ha tocado.
- BUG REAL — el botón CTA de teléfono no tenía icono, a diferencia del
  de WhatsApp. Añadido (verificado con cuidado el cierre de las
  etiquetas </a>: 21 aperturas / 21 cierres).
- BUG REAL — la casilla de política de privacidad existía pero el
  texto no enlazaba a ningún sitio. Añadido el enlace estándar de la
  familia a https://kelatos.com/privacy-policy/, resaltado en azul
  (#0758a8, ya que la paleta de esta web es roja/naranja, sin ningún
  tono azul existente que reutilizar).
- Añadido "Sábados, domingos y días festivos estamos cerrados" debajo
  del horario.
- No se ha añadido franja de aviso de servicio técnico independiente:
  no aplica a este negocio (alquiler/renting de equipos, sin el
  enfoque de reparación de marcas concretas del resto de la familia).
- Verificado sin bugs: no existe ninguna etiqueta rotada tipo
  hero-chip; el ticker ".hero:before" ya se ocultaba correctamente en
  móvil y no hay ningún otro texto decorativo gigante; Cal.com ya
  estaba presente; schema.org ya usaba correctamente el único
  teléfono de este repo; formulario correctamente conectado a
  /api/contacto.
- H1 de portada reescrito, corto, directo y totalmente afirmativo
  (sin interrogación ni condicionales): "Necesitas un ordenador ya.
  Aquí te lo entregamos hoy mismo." Tamaño del H1 aumentado:
  clamp(38-54px) → clamp(46-72px) en escritorio, 38px → 46px en móvil.
