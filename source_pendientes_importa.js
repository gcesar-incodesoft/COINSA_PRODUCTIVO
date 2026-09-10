function listar_Proveedores() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Proveedores").html("Recuperando proveedores...");
      },
      url: "Lista_Provedores_ventas.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_Proveedores").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

////muestra data
function procesa_Busqueda_pendientes() {
  prove = $("#lista_Proveedores option:selected").val();
  años = $("#caños option:selected").val();


  /////traer datos
  /* $.post("Lista_Datos_pendientes_import.php", { prove: prove, fechai: fechai, fechaf: fechaf },
    function (dat2) {

      $("#lista_marca_familia").html(dat2);
      $('#Tabla_Esca').DataTable();

    });
 */

  $.ajax({
    beforeSend: function () {
      // $("#cartera_vendedores").html("Consultando informacion...");
      // $("#lista_marca_familia").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
    url: "Lista_Datos_pendientes_import.php",
    type: "POST",
    data: "prove=" + prove + "&periodo=" + $("#cmeses").val() + "&años=" + años,
    success: function (dat2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_marca_familia").html(dat2);
        var table = $("#Tabla_Esca").DataTable();

        $("#Tabla_Esca thead tr").clone(true).appendTo("#Tabla_Esca thead");
          $("#Tabla_Esca thead tr:eq(0) th").hide();
  
          $("#Tabla_Esca thead tr:eq(1) th").each(function (i) {
            if (i == 7 || i == 8) {
              var $th = $(this);
              filter($th, table, i);
            }
          });
  
          // Botón para mostrar todos
          $("#mostrar-todos").on("click", function () {
            $('#Tabla_Esca').DataTable().column(5).search("").draw();
          });

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      $("#lista_marca_familia").html(estado + "    " + error);
    },
  });
}

$(document).ready(function () {
  setTimeout(function () {
    $("#caños").val("2025").trigger("change.select2");
  }, 100);
});

/////     ///mmuestra data sin filtros
function procesa_Busquedas() {
  /////traer datos
  // $("#lista_marca_familia").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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

  $.post("Lista_Datos_importvendedor.php", {}, function (dat2) {

    // Retrasar el cierre del Swal 1.5 segundos
    setTimeout(() => {
      swal.close();
      $("#lista_marca_familia").html(dat2);
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
  });
}

/////     ///mmuestra data sin filtros
function Consultar_comen_pedido(doce, e) {
  $("#modalcomment").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  var cod = $(e).parents("tr").find("td").eq(0).text();

  var desc = $(e).parents("tr").find("td").eq(1).text();

  var maxLength = 77;

  $(".docen").html("");
  $(".docen").append(doce);

  $(".nuticket").html("");
  $(".nuticket").append(
    "Detalle de Pedido | #: <span class='label' style='background-color: royalblue' id='doce' >" +
    cod +
    "</span>"
  );

  if (desc.length > maxLength) {
    var part1 = desc.substring(0, maxLength);
    var part2 = desc.substring(maxLength);

    $(".nutick").html("");
    $(".nutick").append(
      "Descripcion: <span class='label' style='background-color: royalblue; font-size: 12px;' >" +
      part1 + "<br>" + part2 +
      "</span>"
    );

  } else {
    $(".nutick").html("");
    $(".nutick").append(
      "Descripcion: <span class='label' style='background-color: royalblue; font-size: 12px;' >" +
      part1 +
      "</span><br><br>"
    );
  }

  // $(".nutick").html("");
  // $(".nutick").append(
  //   "Descripcion: <span class='label' style='background-color: royalblue; font-size: 12px;' > " +
  //   desc +
  //   "</span>"
  // );

  /////traer datos

  $.post("mostar_coment_pendie.php", { doce: doce }, function (dat2) {
    var inputNombre2 = document.getElementById("DTra");
    inputNombre2.value = dat2.trim();
  });
}

function ACbtn(cod) {
  cod = $("#doc").text();
  coment = $("#DTra").val();

  $.post(
    "Actualizar_Comenta.php",
    { cod: cod, coment: coment },
    function (dat2) {
      $('#modalcomment').modal('hide');
      procesa_Busquedas()
    }
  );
}

function muestra_historial_comment(doc) {
  $("#modal_historial_comment").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.post("mostrar_historial.php", { doc: doc }, function (dat2) {
    $("#hitorial").html(dat2);
    $("#Tabla_Escpa").DataTable();
  });
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

        var fecha = new Date();
        var mes_actual = fecha.getMonth() + 1;
        $("#pone_cmeses select").val(mes_actual).trigger("change");
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function exportar_excel_ped_pendt() {
  prove = $("#lista_Proveedores option:selected").val();
  años = $("#caños option:selected").val();

  javascript: window.open(
    "reporte_excel_pedidos_pndt.php?&prove=" +
    prove +
    "&periodo=" +
    $("#cmeses").val() +
    "&años=" +
    años +
    ""
  );
}