function listar_clientes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_clientes").html("Recuperando proveedores...");
      },
      url: 'Lista_clientes_cobro.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_clientes").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function listar_vendedores() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_vendedores").html("Recuperando proveedores...");
      },
      url: 'pone_vendedores.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_vendedores").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function listar_tipo_cliente() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_tipo_cli").html("Recuperando proveedores...");
      },
      url: 'lista_tipo_cliente.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_tipo_cli").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}



//

////muestra data 
function procesa_Busqueda() {
  if ($("#fechai").val() != "" || $("#fechaf").val() != "") {
    cliente = $("#lista_clientes option:selected").val();
    vendedor = $("#lista_vendedores option:selected").val();
    tipo_cliente = $("#lista_tipo_cli option:selected").val();
    //subfami = $("#lista_SubFamilia option:selected").val();
    fechai = $("#fechai").val();
    fechaf = $("#fechaf").val();
    text = $("#text").val();
    if (text == '') {
      txt = '*';
    } else {
      txt = text;
    }
    // $("#lista_ganancia_neta").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i></div>');
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

    /////traer datos 
    $.post("Lista_Datos_ganancia_neta.php", { cliente: cliente, vendedor: vendedor, fechai: fechai, fechaf: fechaf, txt: txt, tipo_cliente: tipo_cliente },
      function (dat2) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#lista_ganancia_neta").html(dat2);
          $('#Tabla_data_ganancia_neta').DataTable(
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
                  customize: function (doc) {
                    // Cambia el tamaño de la fuente del contenido general

                    doc.defaultStyle = {
                      fontSize: 10 // Tamaño de fuente general
                    };

                    // Cambia el tamaño de la fuente del título
                    if (doc.content && doc.content[0] && doc.content[0].text) {
                      doc.content[0].fontSize = 10; // Título del PDF
                    }

                    // Cambia el tamaño de fuente de los encabezados de la tabla
                    if (doc.content[1] && doc.content[1].table && doc.content[1].table.body) {
                      const headerRow = doc.content[1].table.body[0]; // Primera fila (encabezado)
                      headerRow.forEach(cell => {
                        cell.fontSize = 10; // Tamaño de fuente de la cabecera
                        cell.bold = true; // Opcional: poner en negrita los encabezados
                      });
                    }

                    // Cambia el tamaño de fuente de las celdas de la tabla
                    for (let i = 1; i < doc.content[1].table.body.length; i++) {
                      const dataRow = doc.content[1].table.body[i]; // Filas de datos
                      dataRow.forEach(cell => {
                        cell.fontSize = 10; // Tamaño de fuente de las celdas
                      });
                    }
                  }
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
              startDate: moment().subtract(29, 'days'),
              endDate: moment()
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