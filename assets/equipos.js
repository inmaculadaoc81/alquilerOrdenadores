(function () {
  // Lee el inventario real de equipos disponibles directamente del
  // dashboard de Kelatos (kelatos-rep-back) — solo equipos activos y en
  // estado DISPONIBLE, sin ningún dato de quién los tiene alquilados.
  var ENDPOINT = "https://db.affirmatechnology.com/kelatos-api/publico/equipos-alquiler";

  var contenedor = document.getElementById("equipos-lista");
  var buscador = document.getElementById("equipos-buscador");
  var marcas = document.getElementById("equipos-marca");
  if (!contenedor) return;

  var todosEquipos = [];

  var ETIQUETA_TIPO = { Portatil: "Portátil", Normal: "Sobremesa" };
  var ENLACES_ALQUILER = {
    "EQ-001": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzI=", "https://sis.redsys.es/tiendaWeb/item/NTY3OzM=", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQ="],
    "EQ-002": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzU=", "https://sis.redsys.es/tiendaWeb/item/NTY3OzY=", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc="],
    "EQ-0027": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozg=", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozk=", "https://sis.redsys.es/tiendaWeb/item/NTY3OzEw"],
    "EQ-0028": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzEx", "https://sis.redsys.es/tiendaWeb/item/NTY3OzEy", "https://sis.redsys.es/tiendaWeb/item/NTY3OzEz"],
    "EQ-0029": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzE0", "https://sis.redsys.es/tiendaWeb/item/NTY3OzE1", "https://sis.redsys.es/tiendaWeb/item/NTY3OzE2"],
    "EQ-003": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzE3", "https://sis.redsys.es/tiendaWeb/item/NTY3OzE4", "https://sis.redsys.es/tiendaWeb/item/NTY3OzE5"],
    "EQ-0031": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzIw", "https://sis.redsys.es/tiendaWeb/item/NTY3OzIx", "https://sis.redsys.es/tiendaWeb/item/NTY3OzIy"],
    "EQ-004": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzIz", "https://sis.redsys.es/tiendaWeb/item/NTY3OzI0", "https://sis.redsys.es/tiendaWeb/item/NTY3OzI1"],
    "EQ-005": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzI2", "https://sis.redsys.es/tiendaWeb/item/NTY3OzI3", "https://sis.redsys.es/tiendaWeb/item/NTY3OzI4"],
    "EQ-006": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzI5", "https://sis.redsys.es/tiendaWeb/item/NTY3OzMw", "https://sis.redsys.es/tiendaWeb/item/NTY3OzMx"],
    "EQ-007": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzMy", "https://sis.redsys.es/tiendaWeb/item/NTY3OzMz", "https://sis.redsys.es/tiendaWeb/item/NTY3OzM0"],
    "EQ-008": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzM1", "https://sis.redsys.es/tiendaWeb/item/NTY3OzM2", "https://sis.redsys.es/tiendaWeb/item/NTY3OzM3"],
    "EQ-009": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzM4", "https://sis.redsys.es/tiendaWeb/item/NTY3OzM5", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQw"],
    "EQ-010": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzQx", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQy", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQz"],
    "EQ-011": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzQ0", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQ1", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQ2"],
    "EQ-012": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzQ3", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQ4", "https://sis.redsys.es/tiendaWeb/item/NTY3OzQ5"],
    "EQ-013": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzUw", "https://sis.redsys.es/tiendaWeb/item/NTY3OzUx", "https://sis.redsys.es/tiendaWeb/item/NTY3OzUy"],
    "EQ-014": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzUz", "https://sis.redsys.es/tiendaWeb/item/NTY3OzU0", "https://sis.redsys.es/tiendaWeb/item/NTY3OzU1"],
    "EQ-015": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzU2", "https://sis.redsys.es/tiendaWeb/item/NTY3OzU3", "https://sis.redsys.es/tiendaWeb/item/NTY3OzU4"],
    "EQ-016": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzU5", "https://sis.redsys.es/tiendaWeb/item/NTY3OzYw", "https://sis.redsys.es/tiendaWeb/item/NTY3OzYx"],
    "EQ-017": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzYy", "https://sis.redsys.es/tiendaWeb/item/NTY3OzYz", "https://sis.redsys.es/tiendaWeb/item/NTY3OzY0"],
    "EQ-018": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzY1", "https://sis.redsys.es/tiendaWeb/item/NTY3OzY2", "https://sis.redsys.es/tiendaWeb/item/NTY3OzY3"],
    "EQ-019": ["https://sis.redsys.es/tiendaWeb/item/NTY3OzY4", "https://sis.redsys.es/tiendaWeb/item/NTY3OzY5", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozcw"],
    "EQ-021": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozcx", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozcy", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozcz"],
    "EQ-025": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozc0", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc1", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc2"]
  };

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function euros(n) {
    var v = Number(n);
    if (isNaN(v)) return null;
    return v.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + "€";
  }

  function tarjeta(e) {
    var nombre = [e.marca, e.modelo].filter(Boolean).join(" ");
    var imagen = e.imagen_url
      ? '<img class="equipo-img" src="' + escapeHtml(e.imagen_url) + '" alt="' + escapeHtml(nombre) + '" loading="lazy">'
      : '<div class="equipo-img-placeholder" aria-hidden="true">AO</div>';
    var tipo = e.tipo ? '<div class="equipo-tipo">' + escapeHtml(ETIQUETA_TIPO[e.tipo] || e.tipo) + "</div>" : "";
    var precios = ["dia", "semanal", "mensual"]
      .map(function (clave) {
        var precio = euros(e[clave]);
        if (!precio) return "";
        var etiqueta = clave === "dia" ? "día" : clave === "semanal" ? "semana" : "mes";
        return '<span><b>' + precio + '</b> /' + etiqueta + "</span>";
      })
      .join("");
    var links = ENLACES_ALQUILER[String(e.id_equipo || "").trim()];
    var botonesAlquiler = "";
    if (links && links.length === 3) {
      var periodos = [
        { texto: "Alquilar 1 día", precio: euros(e.dia) },
        { texto: "Alquilar 1 semana", precio: euros(e.semanal) },
        { texto: "Alquilar 1 mes", precio: euros(e.mensual) }
      ];
      botonesAlquiler = '<div class="equipo-alquiler-opciones">' + periodos.map(function (p, i) {
        return '<a class="equipo-alquiler-btn" href="' + escapeHtml(links[i]) + '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(p.texto) + (p.precio ? '<span>' + escapeHtml(p.precio) + '</span>' : '') + '</a>';
      }).join("") + '</div>';
    }

    var caracteristicas = e.caracteristicas
      ? '<div class="equipo-caracteristicas">' + escapeHtml(e.caracteristicas) + "</div>"
      : "";

    return (
      '<article class="equipo-card">' +
      imagen +
      '<div class="equipo-body">' +
      tipo +
      '<h4 class="equipo-nombre">' + escapeHtml(nombre) + "</h4>" +
      caracteristicas +
      '<div class="equipo-precios">' + precios + "</div>" +
      botonesAlquiler +
      "</div>" +
      "</article>"
    );
  }

  function normalizar(s) {
    return String(s == null ? "" : s).toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function render() {
    var texto = normalizar(buscador ? buscador.value : "");
    var marca = marcas ? marcas.value : "";
    var filtrados = todosEquipos.filter(function (e) {
      var coincideMarca = !marca || String(e.marca || "") === marca;
      var coincideTexto = !texto || normalizar([e.marca, e.modelo, e.tipo].filter(Boolean).join(" ")).indexOf(texto) !== -1;
      return coincideMarca && coincideTexto;
    });
    contenedor.innerHTML = filtrados.length
      ? filtrados.map(tarjeta).join("")
      : '<p class="equipos-vacio">No encontramos equipos que coincidan con tu búsqueda.</p>';
  }

  function prepararFiltros() {
    if (marcas) {
      var lista = todosEquipos.map(function (e) { return String(e.marca || "").trim(); }).filter(Boolean)
        .filter(function (m, i, a) { return a.indexOf(m) === i; })
        .sort(function (a, b) { return a.localeCompare(b, "es", { sensitivity: "base" }); });
      marcas.innerHTML = '<option value="">Todas las marcas</option>' + lista.map(function (m) {
        return '<option value="' + escapeHtml(m) + '">' + escapeHtml(m) + "</option>";
      }).join("");
    }
    if (buscador) buscador.addEventListener("input", render);
    if (marcas) marcas.addEventListener("change", render);
  }

  fetch(ENDPOINT, { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      var equipos = data && data.ok && Array.isArray(data.equipos) ? data.equipos : [];
      if (!equipos.length) {
        contenedor.innerHTML = '<p class="equipos-vacio">Ahora mismo no tenemos equipos libres, pero rotamos el stock constantemente. Escríbenos y te avisamos en cuanto haya disponibilidad.</p>';
        return;
      }
      todosEquipos = equipos;
      prepararFiltros();
      render();
    })
    .catch(function () {
      contenedor.innerHTML = '<p class="equipos-vacio">No hemos podido cargar la disponibilidad ahora mismo. Escríbenos y te la confirmamos al momento.</p>';
    });
})();
