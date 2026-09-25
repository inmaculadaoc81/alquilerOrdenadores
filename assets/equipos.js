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
    "EQ-020": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozc3", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc4", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc5"],
    "EQ-021": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozcx", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozcy", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozcz"],
    "EQ-022": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozgw", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozgx", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozgy"],
    "EQ-023": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozg0", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozg1", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozg2"],
    "EQ-025": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozc0", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc1", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozc2"],
    "EQ-026": ["https://sis.redsys.es/tiendaWeb/item/NTY3Ozg3", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozg4", "https://sis.redsys.es/tiendaWeb/item/NTY3Ozg5"]
  };

  // Enlaces generales Redsys para equipos nuevos sin enlaces específicos.
  // Se seleccionan por el precio configurado en cada periodo.
  var ENLACES_GENERALES_POR_PRECIO = {
    dia: {
      "10": "https://sis.redsys.es/tiendaWeb/item/NTY3Ozk2",
      "20": "https://sis.redsys.es/tiendaWeb/item/NTY3Ozkz"
    },
    semanal: {
      "50": "https://sis.redsys.es/tiendaWeb/item/NTY3Ozkx",
      "80": "https://sis.redsys.es/tiendaWeb/item/NTY3Ozk0"
    },
    mensual: {
      "150": "https://sis.redsys.es/tiendaWeb/item/NTY3Ozky",
      "240": "https://sis.redsys.es/tiendaWeb/item/NTY3Ozk1"
    }
  };

  function enlaceGeneral(periodo, precio) {
    var n = Number(precio);
    if (!isFinite(n)) return null;
    return ENLACES_GENERALES_POR_PRECIO[periodo][String(n)] || null;
  }

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

  function marcaCanonica(marca) {
    var original = String(marca || "").trim();
    var clave = normalizar(original);
    var conocidas = { hp: "HP", msi: "MSI", acer: "Acer", apple: "Apple", dell: "Dell", lenovo: "Lenovo", toshiba: "Toshiba", asus: "ASUS", microsoft: "Microsoft", surface: "Surface", gigabyte: "Gigabyte" };
    return conocidas[clave] || original;
  }

  function enlaceFianza(e) {
    var d = Number(e.dia), s = Number(e.semanal), m = Number(e.mensual);
    if (d === 10 && s === 50 && m === 150) return "https://sis.redsys.es/tiendaWeb/item/NDk4OzY=";
    if (d === 20 && s === 80 && m === 240) return "https://sis.redsys.es/tiendaWeb/item/NDk4Ozg=";
    return null;
  }

  function tarjeta(e) {
    var nombre = [marcaCanonica(e.marca), e.modelo].filter(Boolean).join(" ");
    var imagen = e.imagen_url
      ? '<img class="equipo-img" src="' + escapeHtml(e.imagen_url) + '" alt="' + escapeHtml(nombre) + '" loading="lazy">'
      : '<div class="equipo-img-placeholder" aria-hidden="true">AO</div>';
    var tipo = e.tipo ? '<div class="equipo-tipo">' + escapeHtml(ETIQUETA_TIPO[e.tipo] || e.tipo) + "</div>" : "";
    var linksEspecificos = ENLACES_ALQUILER[String(e.id_equipo || "").trim()];
    var periodos = [
      { texto: "Alquilar 1 día", precio: euros(e.dia), valor: e.dia, periodo: "dia" },
      { texto: "Alquilar 1 semana", precio: euros(e.semanal), valor: e.semanal, periodo: "semanal" },
      { texto: "Alquilar 1 mes", precio: euros(e.mensual), valor: e.mensual, periodo: "mensual" }
    ];
    var opciones = periodos.map(function (p, i) {
      var href = linksEspecificos && linksEspecificos[i] ? linksEspecificos[i] : enlaceGeneral(p.periodo, p.valor);
      return { texto: p.texto, precio: p.precio, href: href, fallback: !(linksEspecificos && linksEspecificos[i]) };
    }).filter(function (p) { return !!p.href; });
    var fianza = enlaceFianza(e);\n    var botonesAlquiler = opciones.length ? '<div class="equipo-alquiler-opciones">' + opciones.map(function (p) {\n      return '<a class="equipo-alquiler-btn' + (p.fallback ? ' equipo-alquiler-btn-general' : '') + '" href="' + escapeHtml(p.href) + '" target="_blank" rel="noopener noreferrer">' +\n        escapeHtml(p.texto) + (p.precio ? '<span>' + escapeHtml(p.precio) + '<em class="iva"> + IVA</em></span>' : '') + '</a>';\n    }).join("") + (fianza ? '<a class="equipo-fianza-btn" href="' + escapeHtml(fianza) + '" target="_blank" rel="noopener noreferrer">Pagar fianza del portátil</a>' : '') + '</div>' : "";

    function detalleCaracteristicas(valor) {
      if (!valor) return "";
      return String(valor).split(",").map(function (parte, indice) {
        var dato = parte.trim();
        if (!dato) return "";
        var etiqueta = "";
        if (/\b(i[3579]-?\d|ryzen|celeron|pentium|core\s+i[3579]|amd\s+ryzen)\b/i.test(dato) || indice === 0) {
          etiqueta = "Procesador";
          if (/^i[3579]-?\d/i.test(dato)) dato = "Intel Core " + dato;
        } else if (/\bram\b/i.test(dato)) {
          etiqueta = "RAM";
          dato = dato.replace(/\bram\s*/i, "").trim();
        } else if (/\b(ssd|hdd|m\.2|nvme|disco|almacenamiento)\b/i.test(dato)) {
          etiqueta = "Almacenamiento";
        }
        return '<div>' + (etiqueta ? '<b>' + etiqueta + ':</b> ' : '') + escapeHtml(dato) + '</div>';
      }).join("");
    }
    var caracteristicas = e.caracteristicas
      ? '<div class="equipo-caracteristicas">' + detalleCaracteristicas(e.caracteristicas) + "</div>"
      : "";

    return (
      '<article class="equipo-card">' +
      imagen +
      '<div class="equipo-body">' +
      tipo +
      '<h4 class="equipo-nombre">' + escapeHtml(nombre) + "</h4>" +
      caracteristicas +
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
      var coincideMarca = !marca || marcaCanonica(e.marca) === marca;
      var coincideTexto = !texto || normalizar([e.marca, e.modelo, e.tipo].filter(Boolean).join(" ")).indexOf(texto) !== -1;
      return coincideMarca && coincideTexto;
    });
    contenedor.innerHTML = filtrados.length
      ? filtrados.map(tarjeta).join("")
      : '<p class="equipos-vacio">No encontramos equipos que coincidan con tu búsqueda.</p>';
  }

  function prepararFiltros() {
    if (marcas) {
      var lista = todosEquipos.map(function (e) { return marcaCanonica(e.marca); }).filter(Boolean)
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
