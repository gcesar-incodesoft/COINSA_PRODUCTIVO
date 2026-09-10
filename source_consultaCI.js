function listaCarpeta() {
  $.ajax({
    beforeSend: function () {
      $("#nCarpeta").html("Recuperando Lista ...");
    },
    url: "listarNroCarpeta2.php",
    type: "POST",
    data: "",
    success: function (x) {
      $("#nCarpeta").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {},
  });
}

function fecha() {
  var fechaSeleccionada = new Date($("#fechai").val());

  fechaSeleccionada.setDate(0);

  //primer día del mes en formato YYYY-MM-DD
  var primerDiaDelMes = fechaSeleccionada.toISOString().split("T")[0];

  $("#fechai").val(primerDiaDelMes);
}

function consultar() {
  setTimeout(() => {
    $.ajax({
      beforeSend: function () {
        $("#lista_consultar").html(
          '<i class="fas fa-spinner fa-spin"></i> Cargando datos'
        );
      },
      url: "lista_consultaCI.php",
      type: "POST",
      data:
        "nCarpeta=" +
        $("#nCarpeta option:selected").val() +
        "&fechai=" +
        $("#fechai").val() +
        "&fechaf=" +
        $("#fechaf").val(),
      success: function (x) {
        $("#lista_consultar").html(x);
        $("#tabla_conCIE").DataTable({
          order: [[0, "asc"]],
        });
      },
      error: function (jqXHR, estado, error) {},
    });
  }, 1000);
}

function muestra_detalle(id) {
  $("#modal_modificarCONSULTA").modal("show"); // abrir
  listadetalle(id);
  listaCosto(id);
  listaProveedores(id);
}

function listadetalle(id) {
  $.ajax({
    beforeSend: function () {
      $("#tabladetalleRegistrado").html("Recuperando Lista ...");
    },
    url: "lista_DetalleR.php",
    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $("#tabladetalleRegistrado").html(x);
      $("#tablaD1").DataTable({
        order: [[0, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}

function listaCosto(id) {
  $.ajax({
    beforeSend: function () {
      $("#tablaCostosRegistrados").html("Recuperando Lista ...");
    },
    url: "lista_CostoR.php",
    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $("#tablaCostosRegistrados").html(x);
      $("#tablaD2").DataTable({
        order: [[0, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}

function listaProveedores(id) {
  $.ajax({
    beforeSend: function () {
      $("#tablaProveedoresRegistrados").html("Recuperando Lista ...");
    },
    url: "lista_ProveedorR.php",
    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $("#tablaProveedoresRegistrados").html(x);
      $("#tablaD3").DataTable({
        order: [[0, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}

function pdf_PP(id, nrocarpetaimpo) {
  // javascript: window.open('reporte_pdf_ConsultaCI.php?id=' + id + '&nrocarpetaimpo=' + nrocarpetaimpo + '');

  var ruta =
    "reporte_pdf_ConsultaCI.php?id=" + id + "&nrocarpetaimpo=" + nrocarpetaimpo;

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

function excel_PP(id, nrocarpetaimpo) {
  javascript: window.open(
    "reporte_Excel_ConsultaCI.php?id=" +
      id +
      "&nrocarpetaimpo=" +
      nrocarpetaimpo +
      ""
  );
}
