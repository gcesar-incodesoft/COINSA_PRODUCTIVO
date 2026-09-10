/**********************************************************************************/
/*******PROCESA DECISION DESPACHO ACEPTADO******************************/

function procesa_decision_despacho_enviado(id, name) {
  var n = noty({
    text: "¿Deseas Agregar evidencias...?",
    theme: "relax",
    layout: "center",
    type: "success",
    buttons: [
      {
        addClass: "btn btn-primary",
        text: "Si, Quiero!",
        onClick: function ($noty) {
          $("#modal_registrar_evi").modal({
            show: true,
            backdrop: "static",
            keyboard: false,
          });

          document.getElementById("num_reg").value = id;
          document.getElementById("cliente_reg").value = name;
          document.getElementById("tipor").value = 1;

          listar_data_pdf(id, 1);
          $noty.close();
        },
      },
      {
        addClass: "btn btn-danger",
        text: "No, Solo Procesar",
        onClick: function ($noty) {
          Registrar_despacho_enviado();
          $noty.close();
        },
      },
    ],
  });
}




$(document).on("click", ".btn-copy", function () {
  Swal.fire({
    title: '¡Copiado!',
    text: 'Los datos se han copiado al portapapeles.',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500 // Se cierra automáticamente después de 1.5 segundos
  });
});


/**********************************************************************************/
/******* REGISTRAR EVIDENCIA******************************/

$(document).ready(function () {
  $("form#data").submit(function (event) {
    var formData = new FormData($(this)[0]);
    var files = $("#fileToUpload")[0].files[0];
    var card_code = document.getElementById("cliente_reg").value;
    var titulo = document.getElementById("titulo_reg").value;
    var num = document.getElementById("num_reg").value;
    var movi = $("#tipor").val();

    if (titulo === "") {
      alertify.error("Falta titulo");
      return false;
    }
    if (files === undefined) {
      alertify.error("no existe documento ");
      return false;
    } else {
      //var num_fix = $('#num_fix').val();
      formData.append("file", files);

      formData.append("card_code", card_code);
      formData.append("titulo", titulo);
      formData.append("num", num);
      formData.append("movi", movi);
      //formData.append('desc_arte', descrip_reg);
      // alert(files);
      //formData.append('num_fix', num_fix);

      // $("#archivo_reg").val('');
      //$("#titulo_reg").val('');
      $.ajax({
        url: "registrar_pdf_despacho.php",
        type: "post",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
          //  alert(response);

          //    $.post("conviertepdf.php", {  },

          //  function(data){

          //
          //                      alert(data)
          //                });

          $("#archivo_reg").val("");
          $("#titulo_reg").val("");
          // listar_data_pdf(va)
          listar_data_pdf(num, movi);
        },
      });
      return false;
    }
  });
});

/**********************************************************************************/
/*******PROCESA  DESPACHO ENVIADO******************************/
$(".reg").on("click", function () {
  var n = noty({
    text: "¿Deseas Registrar?",
    theme: "relax",
    layout: "center",
    type: "success",
    buttons: [
      {
        addClass: "btn btn-primary",
        text: "Si, Quiero!",
        onClick: function ($noty) {
          Registrar_despacho_General();

          $noty.close();
        },
      },
      {
        addClass: "btn btn-danger",
        text: "No, Cancelar",
        onClick: function ($noty) {
          $noty.close();
        },
      },
    ],
  });
});
function Registrar_despacho_enviado() {
  $(document).ready(function () {
    var idautoriza = "1";
    var id_ticket = "0";
    var idmodel = "";
    var comentaaut = "";
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    movi = 1;

    if ($("#idpedido").val() != "") {
      $.ajax({
        beforeSend: function () { },
        url: "procesa_decision_despacho_enviado.php",
        type: "POST",
        data:
          "id_ticket=" +
          id_ticket +
          "&comentario=" +
          comentaaut +
          "&movi=" +
          movi,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido a actualizar el N° Guia: " + id_ticket,
            theme: "relax",
            layout: "topLeft",
            type: "success",
            timeout: 2000,
          });

          busca_ventas_despacho();
        },
        error: function (jqXHR, estado, error) {
          $("#errores").html("Error... " + estado + "  " + error);
        },
      });
    } else {
      var n = noty({
        text: "Debe actualizar nuevamente la Guia N°: " + id_ticket,
        theme: "relax",
        layout: "topLeft",
        type: "warning",
        timeout: 2000,
      });
    }
  });
}

function Registrar_despacho_General() {
  $(document).ready(function () {
    var idautoriza = "1";
    var id_ticket = "0";
    var idmodel = "";
    var comentaaut = "";
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    movi = $("#tipor").val();
    canti_evidencia = parseFloat(
      document.getElementById("tabla_pfd").getElementsByTagName("tr").length - 1
    );
    if (movi == 2 || movi == 3) {
      if (canti_evidencia == 0) {
        validacion = 1;
      } else {
        validacion = 0;
      }
    } else {
      validacion = 0;
    }

    if ($("#idpedido").val() != "") {
      if (validacion == 0) {
        $.ajax({
          beforeSend: function () { },
          url: "procesa_decision_despacho_enviado.php",
          type: "POST",
          data:
            "id_ticket=" +
            id_ticket +
            "&comentario=" +
            comentaaut +
            "&movi=" +
            movi,
          success: function (x) {
            var n = noty({
              text: "Se ha procedido a actualizar el N° Guia: " + id_ticket,
              theme: "relax",
              layout: "topLeft",
              type: "success",
              timeout: 2000,
            });
            $("#comentarios").val("");
            $("#modal_registrar_evi").modal("toggle");
            busca_ventas_despacho();
          },
          error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
          },
        });
      } else {
        //  alert(validacion);
        alertify.error("Debe registrar una Evidencia");
      }
    } else {
      var n = noty({
        text: "Debe actualizar nuevamente la Guia N°: " + id_ticket,
        theme: "relax",
        layout: "topLeft",
        type: "warning",
        timeout: 2000,
      });
    }
  });
}

/**********************************************************************************/
/*******MOSTRAR EVIDENCIA******************************/

function mostrar_evidencia(id, name) {
  var doc = id;
  $("#modal_mostrar_evi").modal("show");
  document.getElementById("num_mos").value = id;
  document.getElementById("cliente_mos").value = name;
  listar_data_pdf_todos(doc, "TD");
}
/**********************************************************************************/
/*******LISTAR PDF PARA  MOSTRAR EVIDENCIA******************************/

/***********************************************************************************/
/*******PROCESA DECISION DESPACHO ACEPTADO******************************/
function procesa_decision_despacho_aceptado(id, name) {
  $("#modal_registrar_evi").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  document.getElementById("num_reg").value = id;
  document.getElementById("cliente_reg").value = name;
  document.getElementById("tipor").value = 2;

  listar_data_pdf(id, 2);
}

/**********************************************************************************/
/******* LISTAR PDF******************************/

function listar_data_pdf(id, movi) {
  num = document.getElementById("num_reg").value;
  $(document).ready(function () {
    //estado = $("#IDestado option:selected").text().trim();
    $.ajax({
      beforeSend: function () {
        $("#data_pdf").html("Buscando las ventas, un momento...");
      },
      url: "listar_despacho_pdf.php",
      type: "POST",
      data: "id=" + id + "&movi=" + movi,
      success: function (res) {
        // console.log(res);
        $("#data_pdf").html(res);
        $(document).ready(function () {
          $("#tabla_pfd").DataTable();
        });
      },
      error: function (jqXHR, estado, error) {
        alert(
          "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
        );
        $("#data_pdf").html(estado + "     " + error);
      },
    });
  });
}
function listar_data_pdf_todos(id, movi) {
  num = document.getElementById("num_reg").value;
  $(document).ready(function () {
    //estado = $("#IDestado option:selected").text().trim();
    $.ajax({
      beforeSend: function () {
        $("#data_pdf_todos").html("Buscando las ventas, un momento...");
      },
      url: "listar_despacho_pdf.php",
      type: "POST",
      data: "id=" + id + "&movi=" + movi,
      success: function (res) {
        // console.log(res);
        $("#data_pdf_todos").html(res);
        $(document).ready(function () {
          $("#tabla_pfd").DataTable();
        });
      },
      error: function (jqXHR, estado, error) {
        alert(
          "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
        );
        $("#data_pdf_todos").html(estado + "     " + error);
      },
    });
  });
}
/***********************************************************************************/
/*******PROCESA DECISION DESPACHO ACEPTADO******************************/

function procesa_decision_despacho_rechazo(id, name) {
  $("#modal_registrar_evi").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  document.getElementById("num_reg").value = id;
  document.getElementById("cliente_reg").value = name;
  document.getElementById("tipor").value = 3;

  listar_data_pdf(id, 3);
}
