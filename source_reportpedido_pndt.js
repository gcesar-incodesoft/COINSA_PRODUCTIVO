function lista_clientes1() {
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Cargando Datos......");
    },
    url: "pone_clientes_reportpedpendiente.php",
    type: "POST",
    data: {},
    success: function (x) {
      $("#pone_clientes").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {},
  });
}

function busca_detalle() {
  var cardcode = $("#cliente").val().toString();

  if (cardcode === "") {
    alertify.error("Error: Debes seleccionar un cliente.");
    return;
  }

  if (cardcode !== "") {
    $.ajax({
      beforeSend: function () {
        $("#tabla_detalle").html("Cargando Datos......");
      },
      url: "consulta_reporte_pedido_pend.php",
      type: "POST",
      data: { cardcode: cardcode },
      success: function (x) {
        $("#tabla_detalle").html(x);

        $("#tabla_det").DataTable();
      },
      error: function (jqXHR, estado, error) {},
    });
  }
}

function migrar_sap_despacho(docentry) {
  $.ajax({
    beforeSend: function () {
      $("#migrado_sap_despacho").html("");
    },
    url: "migradores/migrar_despacho_sap.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      $("#migrado_sap_despacho").html(x);
      estado_migrado = $("#estado_mig").text().trim();
      docentry_new = $("#docentry_mig").text().trim();
      if (estado_migrado === "02") {
        $messegae = "Migro a SAP" + docentry_new;
        swal("Aceptada!", $messegae, "success");
        // enviar_sunat(docentry, 'VE')
      } else {
        $messegae = "NO Migro a SAP : " + docentry_new;
        swal("Error!", $messegae, "error");
      }
      console.log(x);
    },
    error: function (jqXHR, estado, error) {
      //$("#lista_sol_tras").html("Error en la peticion AJAX..." + estado + "      " + error);
    },
  });
}
// function exportar_PDF(id) {
//   var docentry =id;
//   javascript: window.open("pdf_preguia.php?docentry=" + docentry);
// }

function exportar_PDF(docentry) {
  // var docentry ='77';
  // javascript: window.open('pdf_preguia.php?docentry=' + docentry);
  // javascript: window.open('guia_pdf.php?docentry=' + docentry);

  var ruta = "guia_pdf.php?docentry=" + docentry;

  $("#modal_data_pdf").modal("show");
  $("#modal_data_pdf")
    .on("shown.bs.modal", function () {
      $(this).find("iframe").attr("src", ruta);
    })
    .on("hidden.bs.modal", function () {
      $(this).find("iframe").attr("src", "");
    });

  $("#navegador")
    .off("click")
    .on("click", function () {
      window.open(ruta, "_blank");
    });

  $("#imprimir")
    .off("click")
    .on("click", function () {
      $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
    });
}

// function exportar_PDF(id) {
//   var docentry =id;
//   javascript: window.open("pdf_preguia.php?docentry=" + docentry);
// }

function quitarAcentos(cadena) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ñ: "N",
    ñ: "n",
    ç: "c",
    Ç: "C",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
    "&": "",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString()
    .replace(/['"]+/g, "");
}

function ver_detalle(id) {
  $("#modal_detalle").modal("show");
  console.log(id);

  $.ajax({
    beforeSend: function () {
      // $("#tabla_detalle").html("Cargando Datos......");
    },
    url: "consulta_reporte_pedido_det.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#tabla_detalle_2").html(x);
      // $("#tabla_detalle1").DataTable();
    },
    error: function (jqXHR, estado, error) {},
  });
}
