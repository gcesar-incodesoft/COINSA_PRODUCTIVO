////muestra data
function procesa_Busqueda_historial() {
  proveedor = $("#lista_proveedores option:selected").val();
  anio = $("#anos").val();

  /////traer datos
  $.ajax({
    beforeSend: function () {
      // $("#cartera_vendedores").html("Consultando informacion...");
      // $("#lista_historial").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
    url: "Lista_Datos_historial_import_pedido.php",
    type: "POST",
    data: "periodo=" + $("#cmeses").val() + '&proveedor=' + proveedor + '&anio=' + anio,
    success: function (dat2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_historial").html(dat2);
        $("#Tabla_Esca").DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              },
              // {
              //   extend: 'csv',
              //   text: '<i class="fa fa-file"></i> Exportar CSV',
              //   titleAttr: 'Exportar a CSV',
              //   className: 'btn btn-csv'
              // },
              // {
              //   extend: 'excel',
              //   text: '<i class="fa fa-file"></i> Exportar Excel',
              //   titleAttr: 'Exportar a Excel',
              //   className: 'btn btn-excel'
              // },
              {
                extend: 'pdf',
                text: '<i class="fa fa-file"></i> Exportar PDF',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-pdf',
                orientation: 'landscape',
                pageSize: 'A4',
              },
              {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                className: 'btn btn-print'
              }
            ],
          }
        );
      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      $("#lista_marca_familia").html(estado + "    " + error);
    },
  });
  /* 
  $.post(
    "Lista_Datos_historial_import.php",
    { pone_cmeses: pone_cmeses },
    function (dat2) {
      $("#lista_historial").html(dat2);
      $("#Tabla_Esca").DataTable();
    }
  ); */
}

function lista_cmeses() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_cmeses").html("Recuperando meses...");
      },
      url: "pone_cmeses.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_cmeses").html(x);

        $(".select2").select2();

        var urlParams = new URLSearchParams(window.location.search);
        var valMesesito = urlParams.get('val');
        var yearAnte = urlParams.get('year');


        // Asignar el valor del mes si existe en la URL, de lo contrario usar mes_actual
        if (valMesesito) {
          $("#pone_cmeses select").val(valMesesito).trigger("change");

          $("#anos").val(yearAnte).trigger("change");
        } else {
          var fecha = new Date();
          var mes_actual = fecha.getMonth() + 1;
          $("#pone_cmeses select").val(mes_actual).trigger("change");
        }
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

$(document).ready(function () {
  setTimeout(function () {
    $("#anos").val('2026').trigger('change.select2');
  }, 100);
});

function listar_Proveedores2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_proveedores").html("Recuperando proveedores...");
      },
      url: "lista_proveedores.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_proveedores").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function exportar_excel_his_importacion() {
  proveedor = $("#lista_proveedores option:selected").val();
  anio = $("#anos").val();

  javascript: window.open(
    "reporte_excel_historial_importacion.php?&periodo=" +
    $("#cmeses").val() +
    "&proveedor=" +
    proveedor +
    "&anio=" +
    anio +
    ""
  );
}