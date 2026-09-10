

function listar_Fabrincantes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Fabricantes").html("Recuperando proveedores...");
      },
      url: 'Lista_Fabricantes.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Fabricantes").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function listar_Familias() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Familia").html("Recuperando proveedores...");
      },
      url: 'Lista_Familias.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Familia").html(x);
        $(".select2").select2();

      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function listar_Proveedores() {
  tiopo_cliente = $("#tipoC2 option:selected").val();

  if (tiopo_cliente == '103') {
    $.ajax({
      beforeSend: function () {
        $("#lista_proveedores").html("Recuperando proveedores...");
      },
      url: 'lista_proveedores_exterior.php',
      type: 'POST',
      data: 'tipoC1=' + $("#tipoC2 option:selected").val(),
      success: function (x) {
        $("#lista_proveedores").html(x);
        $(".select2").select2();



      },
      error: function (jqXHR, estado, error) {
      }
    });
  } else {
    $.ajax({
      beforeSend: function () {
        $("#lista_proveedores").html("Recuperando proveedores...");
      },
      url: 'lista_proveedores_nacional.php',
      type: 'POST',
      data: 'tipoC1=' + $("#tipoC2 option:selected").val(),
      success: function (x) {
        $("#lista_proveedores").html(x);
        $(".select2").select2();



      },
      error: function (jqXHR, estado, error) {
      }
    });
  }
}
function listar_Proveedores2() {
  tiopo_cliente = $("#tipoC1 option:selected").val();

  if (tiopo_cliente == '103') {
    $.ajax({
      beforeSend: function () {
        $("#lista_proveedores2").html("Recuperando proveedores...");
      },
      url: 'lista_proveedores_exterior.php',
      type: 'POST',
      data: 'tipoC1=' + $("#tipoC1 option:selected").val(),
      success: function (x) {
        $("#lista_proveedores2").html(x);
        $(".select2").select2();



      },
      error: function (jqXHR, estado, error) {
      }
    });
  } else {
    $.ajax({
      beforeSend: function () {
        $("#lista_proveedores2").html("Recuperando proveedores...");
      },
      url: 'lista_proveedores_nacional.php',
      type: 'POST',
      data: 'tipoC1=' + $("#tipoC1 option:selected").val(),
      success: function (x) {
        $("#lista_proveedores2").html(x);
        $(".select2").select2();



      },
      error: function (jqXHR, estado, error) {
      }
    });
  }
}




//////Mostrar  sub familia



function lista_SubFamilia_Despacho() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_SubFamilia").html("Recuperando Marcas...");
      },
      url: 'Lista_SubFamilia_Ventas.php',
      type: 'POST',
      data: 'fami=' + $("#lista_Familia option:selected").val(),
      success: function (x) {
        $("#lista_SubFamilia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}



////muestra data 
function procesa_Busqueda() {
  proveedor = $("#lista_proveedores option:selected").val();
  fabricante = $("#lista_Fabricantes option:selected").val();
  tipoC2 = $("#tipoC2 option:selected").val();
  //subfami = $("#lista_SubFamilia option:selected").val();
  fechai = $("#fechai2").val();
  fechaf = $("#fechaf2").val();
  text = $("#text").val();

  if (text == '') {
    txt = '*';
  } else {
    txt = text;
  }
  if ($("#fechai2").val() != "" || $("#fechaf2").val() != "") {
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

    $.post("Lista_Datos_ordenes_compras_exterior.php", { proveedor: proveedor, fabricante: fabricante, tipoC2: tipoC2, fechai: fechai, fechaf: fechaf, txt: txt },
      function (dat2) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#lista_marca_familia").html(dat2);
          $('#Tabla_Esca').DataTable(
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
  } else {
    alertify.error("Selecciona un rango de fechas para poder continuar...!");
  }
}


function ReportedeFacturasEmitidas() {
  $(document).ready(function () {
    if ($("#fechai").val() != "" || $("#fechaf").val() != "") {
      $.ajax({
        beforeSend: function () {
          // $("#data").html("Buscando Facturas, un momento...");
          // $("#lista_Repor_Consumo").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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

        url: 'Listar_Report_ORDEN_Compras_ext.php',
        type: 'POST',
        data: 'fechai=' + $("#fechai").val() +
          '&fechaf=' + $("#fechaf").val() +
          '&sed=' + $("#sed option:selected").val() +
          '&proveedor=' + $("#lista_proveedores2 option:selected").val() +
          '&tipoC1=' + $("#tipoC1 option:selected").val() +
          '&fabricante=' + '' +
          '&txt=' + '',
        success: function (data2) {

          // Retrasar el cierre del Swal 1.5 segundos
          setTimeout(() => {
            swal.close();
            $("#lista_Repor_Consumo").html(data2);
            $('#Tabla_factu').DataTable(
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
          alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
          $("#tbpr1").hmtl(estado + "     " + error);
        }
      });
    } else {
      alertify.error("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
function muestra_detalle_ordenes_de_compras(num_ticket) {
  var tic = num_ticket.split("|");
  console.log(num_ticket);
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle de facturas...");
    },
    url: 'consulta_detalle_ordenes_de_compras.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de Orden | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[0];

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
function genera_opcion_Compras() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'Mostrar_Fecha_GuiaEmi.php',
      type: 'POST',
      data: 'option=' + 1,
      success: function (res) {
        $("#pone_opcion").html(res);
        $(function () {
          $('#daterange-btn').daterangepicker(
            {
              ranges: {
                'Este dia': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
              startDate: moment().startOf('month'),
              endDate: moment().endOf('month')
            },
            function (start, end) {
              $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              var xstart = start.format('YYYY-MM-DD');
              var xend = end.format('YYYY-MM-DD');


              $("#fi").val(xstart);
              $("#ff").val(xend);
              // alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
            }
          );
        });
        $("#numero_caja").select2();
        $("#numero_ticket").inputmask('mask', { 'alias': 'numeric', 'autogroup': true, 'digits': 0, 'digitsOptional': false });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })

}

function genera_opcion_Compras2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion2").html("Poniendo opciones...");
      },
      url: 'Mostrar_Fecha_GuiaEmi.php',
      type: 'POST',
      data: 'option=' + 1,
      success: function (res) {
        $("#pone_opcion2").html(res);
        $(function () {
          $('#daterange-btn2').daterangepicker(
            {
              ranges: {
                'Este dia': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
              startDate: moment().startOf('month'),
              endDate: moment().endOf('month')
            },
            function (start, end) {
              $('.fe2').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              var xstart = start.format('YYYY-MM-DD');
              var xend = end.format('YYYY-MM-DD');


              $("#fi2").val(xstart);
              $("#ff2").val(xend);
              //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
            }
          );
        });
        $("#numero_caja").select2();
        $("#numero_ticket").inputmask('mask', { 'alias': 'numeric', 'autogroup': true, 'digits': 0, 'digitsOptional': false });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion2").hmtl(estado + "     " + error);
      }
    });
  })
}


function exportar_excel_oc_comprobantes() {

  javascript: window.open(
    "reporte_excel_oc_exterior.php?&fechai=" +
    $("#fechai").val() +
    "&fechaf=" +
    $("#fechaf").val() +
    "&sed=" +
    $("#sed option:selected").val() +
    "&proveedor=" +
    $("#lista_proveedores2 option:selected").val() +
    "&tipoC1=" +
    $("#tipoC1 option:selected").val() +
    "&fabricante=" +
    '' +
    "&txt=" +
    '' +
    ""
  );
}


function exportar_excel_oc_articulos() {
  proveedor = $("#lista_proveedores option:selected").val();
  fabricante = $("#lista_Fabricantes option:selected").val();
  tipoC2 = $("#tipoC2 option:selected").val();
  //subfami = $("#lista_SubFamilia option:selected").val();
  fechai = $("#fechai2").val();
  fechaf = $("#fechaf2").val();
  text = $("#text").val();

  if (text == '') {
    txt = '*';
  } else {
    txt = text;
  }

  javascript: window.open(
    "reporte_excel_oc_exterior_art.php?&proveedor=" +
    proveedor +
    "&fabricante=" +
    fabricante +
    "&tipoC2=" +
    tipoC2 +
    "&fechai=" +
    fechai +
    "&fechaf=" +
    fechaf +
    "&txt=" +
    txt +
    ""
  );
}