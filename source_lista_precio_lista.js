

function busca_Lista() {
  var fechai = $("#fechai").val();
  var fechaf = $("#fechaf").val();
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        // $("#data").html("Buscando informacion del articulo...");
        // $("#data_PRECIO").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
        swal({
          title: "Cargando...",
          text: "Espere un momento",
          content: {
            element: "div",
            attributes: {
              innerHTML: `
                <div style="text-align: center; margin-bottom: 10px;">
                  <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
                </div>
                <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
                    <div style="width: 10px; height: 10px; margin: 0 5px; background: #007BFF; border-radius: 50%; animation: bounce 0.6s infinite ease-in-out; animation-delay: -0.32s;"></div>
                    <div style="width: 10px; height: 10px; margin: 0 5px; background: #007BFF; border-radius: 50%; animation: bounce 0.6s infinite ease-in-out; animation-delay: -0.16s;"></div>
                    <div style="width: 10px; height: 10px; margin: 0 5px; background: #007BFF; border-radius: 50%; animation: bounce 0.6s infinite ease-in-out;"></div>
                </div>
                <style>
                    @keyframes bounce {
                        0%, 80%, 100% {
                            transform: scale(0);
                        }
                        40% {
                            transform: scale(1);
                        }
                    }
                </style>
              `
            }
          },
          buttons: false,
          closeOnClickOutside: false
        });


      },
      url: 'Lista_precios_General.php',
      type: 'POST',
      data: { fechai, fechaf },
      success: function (x) {
        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#data_PRECIO").html(x);
          $("#tabla_listado").DataTable();

        }, 1500); // Retraso de 1.5 segundos
      }


    });
  });



  // $.post("Lista_precios_articulo.php", 
  //     { marca: marca, fami: fami, subfami, subfami, lista_precio: lista_precio },
  //     function (x) {
  //         $("#data").html(x);
  //         $('#tabla').DataTable();
  //     });


}


function muestra_detalle_precio(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_GENERAL").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle pedidos pendientes...");
    },
    url: 'consulta_detalle_precio_general.php',
    type: 'POST',
    data: 'tic=' + tic[0],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de Precio | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);

      $('#tabla_detalle').DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}




$(document).on("click", "#tabla tbody tr", function () {
  // Encuentra el checkbox dentro de la fila actual
  var checkbox = $(this).find("#precio_id");

  // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
  checkbox.prop("checked", !checkbox.prop("checked"));

  // Actualiza la apariencia y el botón según el estado del checkbox
  actualizarFila(checkbox);
});

function actualizarFila(checkbox) {

  var checkboxes = $('#tabla .chkCheckBoxId');
  var checkbox2 = $("#tabla tbody tr").find("#precio_id");
  var checkboxesActivados = checkboxes.filter(':checked').length;
  var cant = checkbox2.closest("tr").find("#precio_id:checked").length;
  //console.log(cant);
  if (checkbox.is(":checked")) {
    checkbox.closest("tr").find("td").css("background-color", "LightGreen");
  } else {
    checkbox.closest("tr").find("td").css("background-color", "white");
  }
  if (checkboxesActivados > 0) {
    $("#enviar").show();
  } else {
    $("#enviar").hide();
  }
}
