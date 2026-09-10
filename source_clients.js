/******************************* Cargar Vendedores*************************************/

function lista_vendedores() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_vendedores").html("Recuperando proveedores...");
      },
      url: "pone_vendedores_cotizacion.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_vendedores").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}



function lista_vendedores_mew() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_vendedores").html("Recuperando proveedores...");
      },
      url: "pone_vendedores_cotizacion.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_vendedores").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function pone_condicion_pago() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_condi").html("Recuperando proveedores...");
      },
      url: "pone_condi_listado.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_condi").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
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




/******************************* Cargar Clientes*************************************/

function lista_clients() {
  //console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_clients").html("Recuperando Lista ...");
      },
      url: "lista_clients_fact_emi.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_clients").html(x);
        $(".select2").select2();
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

$(document).ready(function () {
  $('#tabla_clientes').jtable({
    title: 'Movimientos de Clientes',
    paging: true,
    sorting: true,
    pageSize: 10,
    pageSizeChangeArea: false,
    defaultSorting: 'id ASC',
    gotoPageArea: 'none',
    //selecting: true,
    //multiselect: true, //Allow multiple selecting
    //selectingCheckboxes: true,
    actions: {
      listAction: 'busca_clientes.php',
      updateAction: 'update_clientes.php',
      //deleteAction:'elimina_proveedor.php',
      createAction: 'add_cliente.php',
    },
    fields: {
      id: {
        title: 'ID Cliente',
        width: '10%',
        key: true,
        list: true
      },
      nombre: {
        title: 'Nombre',
        width: '30%',
        list: true,
        create: true,
        edit: true
      },
      telefono: {
        title: 'Telefono',
        width: '10%',
        list: true,
        create: true,
        edit: true
      },
      domicilio: {
        title: 'Domicilio',
        width: '10%',
        list: true,
        create: true,
        edit: true
      },
      ciudad: {
        title: 'Ciudad',
        width: '10%',
        list: true,
        create: true,
        edit: true
      }
    }
  });

  //Re-load records when user click 'load records' button.
  $('#CargarRegistros').click(function (e) {
    e.preventDefault();
    $('#tabla_clientes').jtable('load', {
      nombre: $('#name').val()
    });
  });

  //Cargar todos los registros cuando se muestre por primera vez
  $('#CargarRegistros').click();
});


/*******************************************************************************/

///
function genera_opcion_Ventas() {
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
              startDate: moment().subtract(29, 'days'),
              endDate: moment()
            },
            function (start, end) {
              $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              var xstart = start.format('YYYY-MM-DD');
              var xend = end.format('YYYY-MM-DD');


              $("#fi").val(xstart);
              $("#ff").val(xend);
              //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
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

/*******************************************************************************/
/******************************* Reporte de Facturas**************************************/

function consulta_reporte_facturas_emitidas() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  var cardcode = $("#lista_clients option:selected").val();
  var vendedor = $("#pone_vendedores option:selected").val();
  var condi = $("#pone_condi option:selected").val();

  console.log(cardcode);
  console.log(vendedor);

  $.ajax({
    beforeSend: function () {
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
    url: 'Listar_Report_Facturas_Emitidas.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      cardcode: cardcode,
      vendedor: vendedor,
      condi: condi
    },
    success: function (data2) {
      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
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

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 4 || i == 6) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

      }, 2000); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {}
  });
}


function ReportedeFacturasEmitidasLoad() {
  $(document).ready(function () {
    if ($("#fechai").val() != "" || $("#fechaf").val() != "") {
      let date = new Date();
      let fech = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      $.ajax({
        beforeSend: function () {
          // $("#data").html("Buscando Facturas, un momento...");
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

        url: 'Listar_Report_Facturas_Emitidas_Load.php',
        type: 'POST',
        data: 'fechai=' + fech +
          '&fechaf=' + fech +
          // '&sed=' + 1 +
          '&cardcode=' + 'P99999' +
          '&vendedor=' + '-1',
        success: function (x) {

          // Retrasar el cierre del Swal 1.5 segundos
          setTimeout(() => {
            swal.close();
            $("#lista_Repor_Consumo").html(x);
            var table = $('#Tabla_factu').DataTable({
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
            });

            $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
            $("#Tabla_factu thead tr:eq(0) th").hide();

            $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
              if (i == 4 || i == 6) {
                var $th = $(this);
                filter($th, table, i);
              }
            });

            // Botón para mostrar todos
            $("#mostrar-todos").on("click", function () {
              $('#Tabla_factu').DataTable().column(5).search("").draw();
            });

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
/*******************************************************************************/


/******************************* Reporte de Facturas**************************************/


function ReportedeCotizacionesdeVentas() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();

  $.ajax({
    beforeSend: function () {
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

    url: 'Listar_Report_Cotizaciones_de_Ventas.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf
    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
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

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 2 || i == 3 | i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}
/*******************************************************************************/

/******************************* Reporte de Facturas**************************************/


function ReportedeCotizacionesdeVentasLoad() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();

  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {


      let date = new Date();
      let fech = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      $.ajax({
        beforeSend: function () {
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

        url: 'Listar_Report_Cotizaciones_de_Ventas_Load.php',
        type: 'POST',
        data: 'fechai=' + fechai +
          '&fechaf=' + fechaf +
          '&sed=' + 1,

        success: function (data2) {

          // Retrasar el cierre del Swal 1.5 segundos
          setTimeout(() => {
            swal.close();
            $("#lista_Repor_Consumo").html(data2);
            var table = $('#Tabla_factu').DataTable(
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

            $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
            $("#Tabla_factu thead tr:eq(0) th").hide();

            $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
              if (i == 2 || i == 3 | i == 5) {
                var $th = $(this);
                filter($th, table, i);
              }
            });

            // Botón para mostrar todos
            $("#mostrar-todos").on("click", function () {
              $('#Tabla_factu').DataTable().column(5).search("").draw();
            });

          }, 1500); // Retraso de 1.5 segundos
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
          $("#Tabla_factu").hmtl(estado + "     " + error);
        }
      });
    } else {
      alertify.error("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
/*******************************************************************************/

/*****************************************************************
GC Muestra Detalle Facturas de Ventas
************/
function muestra_detalle_facturas_de_ventas(num_ticket) {
  console.log(num_ticket);
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle de facturas...");
    },
    url: 'consulta_detalle_facturas_de_venta.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&moneda=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de Facturas | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[0];

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/

/*****************************************************************
GC Muestra Detalle Cotizaciones de Ventas
************/
function muestra_detalle_cotizaciones_de_ventas(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle de Cotizacion...");
    },
    url: 'consulta_detalle_cotizacion_de_venta.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de Cotizacion | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[0];

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/










function ReportedeCotizacionesdeVentasPrueba() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  Vendedor = $("#lista_vendeores select").val();
  Cliente = $("#lista_clients select").val();

  $.ajax({
    beforeSend: function () { },
    url: 'Listar_Report_Cotizaciones_de_Ventas_prueba.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      Vendedor: Vendedor,
      Cliente: Cliente
    },

    success: function (data2) {
      $("#lista_Repor_Consumo").html(data2);
      $('#Tabla_factu').DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}





function lista_clients() {
  //console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_clients").html("Recuperando Lista ...");
      },
      url: "lista_clients_prueba.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_clients").html(x);
        $(".select2").select2();
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function lista_vendedores() {
  //console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_vendeores").html("Recuperando Lista ...");
      },
      url: "Lista_vendedor_prueba.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_vendeores").html(x);
        $(".select2").select2();
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function CotizacionesCompraprueba() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  cliente = $("#lista_clients select").val();

  $.ajax({
    beforeSend: function () { },
    url: 'Listar_Report_Cotizaciones_compras_prueba.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      cliente: cliente
    },

    success: function (data2) {
      $("#lista_Repor_Consumo").html(data2);
      $('#tabla_prueba').DataTable({
        order: [[0, "desc"]],

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
      });
    },
    error: function (jqXHR, estado, error) {
      $("#tabla_prueba").hmtl(estado + "     " + error);
    }
  });
}





