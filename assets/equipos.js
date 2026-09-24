(function () {
  // Lee el inventario real de equipos disponibles directamente del
  // dashboard de Kelatos (kelatos-rep-back) — solo equipos activos y en
  // estado DISPONIBLE, sin ningún dato de quién los tiene alquilados.
  var ENDPOINT = "https://makeup-reef-raymond-holes.trycloudflare.com/publico/equipos-alquiler";

  var contenedor = document.getElementById("equipos-lista");
  var buscador = document.getElementById("equipos-buscador");
  var marcas = document.getElementById("equipos-marca");
  if (!contenedor) return;

  var todosEquipos = [];

  var ETIQUETA_TIPO = { Portatil: "Portátil", Normal: "Sobremesa" };

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
    return (
      '<article class="equipo-card">' +
      imagen +
      '<div class="equipo-body">' +
      tipo +
      '<h4 class="equipo-nombre">' + escapeHtml(nombre) + "</h4>" +
      '<div class="equipo-precios">' + precios + "</div>" +
      "</div>" +
      '<a class="equipo-btn" href="https://api.whatsapp.com/send?phone=34649970128&text=' +
      encodeURIComponent("¡Hola! Me interesa alquilar el " + nombre) +
      '" target="_blank">Solicitar por WhatsApp</a>' +
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
