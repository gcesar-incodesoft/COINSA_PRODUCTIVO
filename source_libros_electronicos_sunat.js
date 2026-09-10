
function tipo_cambio_hoy() {
  $.ajax({
    url: "Consulta_TC_Actual.php",
    type: "POST",
    data: null,
    success: function (x) {

      // insertar la respuesta en el contenedor oculto
      $("#tc_hoy").html(x);

      // extraer el valor numérico
      let tc = $("[name='tc_actual']").text().trim();

      console.log("Tipo de cambio:", tc);

      // formatear
      let num2 = new Intl.NumberFormat("es-PE", {
        style: "decimal",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(tc);

      // COLOCARLO EN EL INPUT
      document.getElementById("tipo_cambio").value = num2;
    }
  });
}


///lista el combo de vendedores
function Grupo() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_grup").html("Recuperando proveedores...");
      },
      url: 'Lista_grupo_costo_venta.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_grup").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

// function generar_archivo_txt() {
//   let libro = $("#lista_libro").val();
//   let fecha_i = $("#fechai").val();
//   let fecha_f = $("#fechaf").val();
//   let estado = $("#transanu").val();
//   let tc = $("#tipo_cambio").val();

//   if (!fecha_i || !fecha_f) {
//     alert("Debe ingresar fecha inicio y fecha fin.");
//     return;
//   }

//   window.location.href = `proceso_generar_txt_libro.php?libro=${libro}&fi=${fecha_i}&ff=${fecha_f}&estado=${estado}&tc=${tc}`;
// }

// async function generar_archivo_txt() {

//   let libro = $("#lista_libro").val();
//   let fecha_i = $("#fechai").val();
//   let fecha_f = $("#fechaf").val();
//   let estado = $("#transanu").val();
//   let tc = $("#tipo_cambio").val();

//   // Validar fechas
//   if (!fecha_i || !fecha_f) {
//     Swal.fire("Faltan datos", "Debe ingresar fecha inicio y fecha fin.", "warning");
//     return;
//   }

//   // === Generar fecha actual en formato YYYYMMDD ===
//   const hoy = new Date();
//   const yyyy = hoy.getFullYear();
//   const mm = String(hoy.getMonth() + 1).padStart(2, "0");
//   const dd = String(hoy.getDate()).padStart(2, "0");
//   const fechaActual = `${yyyy}${mm}${dd}`; // Ej: 20250204

//   // === Nombre sugerido ===
//   const nombreSugerido = `LE20538271366${fechaActual}_${libro}_.txt`;

//   // === Swal para pedir nombre ===
//   const { value: nombreArchivo } = await Swal.fire({
//     title: "Nombre del archivo TXT",
//     input: "text",
//     inputLabel: "Puede modificar el nombre antes de descargar:",
//     inputValue: nombreSugerido,
//     showCancelButton: true,
//     confirmButtonText: "Descargar",
//     cancelButtonText: "Cancelar",
//     inputValidator: (value) => {
//       if (!value) {
//         return "Debe ingresar un nombre.";
//       }
//     }
//   });

//   if (!nombreArchivo) return;

//   // Asegurar extensión
//   let nombreFinal = nombreArchivo;
//   if (!nombreFinal.toLowerCase().endsWith(".txt")) {
//     nombreFinal += ".txt";
//   }

//   // === Obtener contenido del SP ===
//   let response = await fetch(`proceso_generar_txt_libro.php?libro=${libro}&fi=${fecha_i}&ff=${fecha_f}&estado=${estado}&tc=${tc}`);
//   let texto = await response.text();

//   // === Descargar archivo ===
//   const blob = new Blob([texto], { type: "text/plain" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = nombreFinal;
//   a.click();

//   URL.revokeObjectURL(url);

//   // Swal.fire("Completado", "El archivo fue generado correctamente.", "success");
// }

async function generar_archivo_txt() {

  /* ===============================
     DATOS DE ENTRADA
  =============================== */
  const codigoSunat = $("#lista_libro").val(); // EJ: 030100, 031600
  const fecha_i = $("#fechai").val();
  const fecha_f = $("#fechaf").val();
  const estado  = $("#transanu").val(); // Y / N
  const tc      = $("#tipo_cambio").val();

  if (!fecha_i || !fecha_f) {
    Swal.fire("Faltan datos", "Debe ingresar fecha inicio y fecha fin.", "warning");
    return;
  }

  /* ===============================
     CONFIGURACIÓN SUNAT FIJA
  =============================== */
  const RUC = "20538271366";

  const indicadorOperacion = "1"; // O
  const indicadorPLE       = "1"; // G (fijo)
  const moneda             = "1"; // M (USD)2 y sol (1)
  const indicadorInfo      = (estado === "Y") ? "1" : "0"; // I
  const codigoOportunidad  = "01"; // CC (31/12)

  /* ===============================
     FECHA (INVENTARIOS Y BALANCES)
     MM = 00, DD = DÍA
  =============================== */
  const fecha = new Date(fecha_f.split("-").reverse().join("-"));
  const yyyy = fecha.getFullYear();
  const mm   =  String(fecha.getMonth() + 1).padStart(2, "0");
  const dd   = String(fecha.getDate()).padStart(2, "0");

  /* ===============================
     NOMBRE BASE (REFERENCIAL)
     (solo para mostrar en Swal)
  =============================== */
  const nombreSugerido =
    `LE${RUC}${yyyy}${mm}${dd}${codigoSunat}${codigoOportunidad}` +
    `${indicadorOperacion}${indicadorInfo}${moneda}${indicadorPLE}.txt`;

  /* ===============================
     CONFIRMACIÓN (SOLO VISUAL)
  =============================== */
  const { value: confirmar } = await Swal.fire({
    title: "Generar archivo PLE",
    text: `Se generará el archivo:\n${nombreSugerido}`,
    // icon: "question",
    showCancelButton: true,
    confirmButtonText: "Generar",
    cancelButtonText: "Cancelar"
  });

  if (!confirmar) return;

  /* ===============================
     LLAMADA AL PHP
  =============================== */
  const response = await fetch(
    `proceso_generar_txt_libro.php?libro=${codigoSunat}&fi=${fecha_i}&ff=${fecha_f}&estado=${estado}&tc=${tc}`
  );

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    Swal.fire("Aviso", "El libro no tiene información.", "info");
    return;
  }

  /* ===============================
     GENERACIÓN DE ARCHIVOS
  =============================== */
  data.forEach((item, index) => {

    // 🔥 CASO ESPECIAL: 3.16 (031600 → 031601 / 031602)
    let codigoLibroFinal = codigoSunat;

    if (codigoSunat === "031600") {
      codigoLibroFinal = (index === 0) ? "031601" : "031602";
    }

    const nombreFinal =
      `LE${RUC}${yyyy}${mm}${dd}` +
      `${codigoLibroFinal}` +
      `${codigoOportunidad}` +
      `${indicadorOperacion}` +
      `${indicadorInfo}` +
      `${moneda}` +
      `${indicadorPLE}.txt`;

    const blob = new Blob(
      [item.contenido],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = nombreFinal;
    a.click();

    URL.revokeObjectURL(url);
  });

  Swal.fire(
    "Correcto",
    "Archivos PLE generados correctamente.",
    "success"
  );
}
