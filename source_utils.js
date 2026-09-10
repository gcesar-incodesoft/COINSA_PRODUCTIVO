/*********************************************************************/
function valida_acceso() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#btn-valida").html("Validando...");
      },
      url: 'valida_acceso.php',
      type: 'POST',
      data: "pass=" + $("#pass").val() + "&opt=" + $("#opcion").val(),
      success: function (res) {
        if (res == 1) {
          document.location.href = 'aju_inventarios.php';
        }
        if (res == 0) {
          alert('La contrase\u00f1a no es correcta...');
          document.location.href = 'valida_cambio.php?opt=1265780909';
        }
        if (res == 2) {
          alert('La contrase\u00f1a no es correcta...');
          document.location.href = 'valida_cambio.php?opt=582963741';
        }
        if (res == 3) {
          document.location.href = 'util_backup.php';
        }
      },
      error: function (jqXHR, estado, error) {
      }
    });
  })
}
/***********************************************************************/
function pulsar(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  return (tecla != 13);
}
/***********************************************************************/
function genera_opcion() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'opciones_cancel_venta.php',
      type: 'POST',
      data: 'option=' + $("#tipo_buscar").val(),
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
/*********************************************************************/
function busca_ventas() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando las ventas, un momento...");
        },
        url: 'busca_ventas_cancel.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() + '&fechaf=' + $("#ff").val(),
        success: function (res) {
          $("#data").html(res);
          $(document).ready(function () {
            $('#tabla_ventas').DataTable();
          });
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
          $("#data").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
/****************************************************************************/
function cancela_ticket(num_ticket) {
  $(document).ready(function () {
    var ticket = num_ticket.split("|");
    var n = noty({
      text: "Seguro que deseas cancelar la venta/ticket de Sesión: " + ticket[0] + " " + "Numero: " + ticket[1],
      theme: 'relax',
      layout: 'center',
      type: 'information',
      modal: 'true',
      buttons: [
        {
          addClass: 'btn btn-primary',
          text: 'Si',
          onClick: function ($noty) {
            $noty.close();
            $.ajax({
              beforeSend: function () {
              },
              url: 'cancela_ticket.php',
              type: 'POST',
              data: 'serie=' + ticket[0] + '&numero=' + ticket[1],
              success: function (res) {
                if (res != "0") {
                  alert("Se cancelo el ticket...!");
                  $("#data").empty();
                } else {
                  alert("Ocurrio un error al intentar cancelar el ticket, es necesario que reportes a Soporte..!");
                }
              },
              error: function (jqXHR, estado, error) {
                alert("Hubor un error al intentar cancelar la venta...por favor reporte a soporte...!");
                $("#data").hmtl(estado + "     " + error);
              }
            });
          }
        },
        {
          addClass: 'btn btn-danger',
          text: 'No',
          onClick: function ($noty) {
            $noty.close();
          }
        }
      ]
    });
  })
}
/*****************************************************************************/
function muestra_detalle(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_venta.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append("Detalle de venta | <span class='label label-warning'>Ticket: " + tic[0] + " - " + tic[1] + "</span>");
      $("#detalle_de_venta").html(x);
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/
function busca_ventas_numero() {
  $(document).ready(function () {
    if ($("#numero_ticket").val() != '0') {
      //alert($("#numero_ticket").val());
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando detalle de venta, un momento...");
        },
        url: 'busca_ventas_cancel_numero.php',
        type: 'POST',
        data: 'serie_c=' + $("#numero_caja").val() + '&numero_t=' + $("#numero_ticket").val(),
        success: function (res) {
          $("#data").html(res);
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
          $("#data").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("El numero de ticket, no puede ser cero...");
      $("#numero_ticket").focus();
    }
  })

}
/****************************************************************************************/
function limpia_divs() {
  $("#pone_opcion").empty();
  $("#data").empty();
}
/****************************************************************************************/
function alta_gasto() {
  $(document).ready(function () {
    if ($("#fecha").val() != "" || $("#num_dock").val() != "" || $("#subtotal").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#btn-altas").attr('disabled', true);
          $("#btn-altas").html("Registrando...");
        },
        url: 'graba_gasto.php',
        type: 'POST',
        data: 'fecha=' + $("#fecha").val() + '&numero_fact=' + $("#num_dock").val() + '&proveedor=' + $("#proveedor").val() + '&subtotal=' + $("#subtotal").val() + '&iva=' + $("#iva").val() + '&total=' + $("#total").val() + '&concepto=' + $("#concepto").val(),
        success: function (res) {
          if (res == 'error') {
            var n = noty({
              text: "No se registro el gasto, los campos SUBTOTAL, IVA, TOTAL no pueden ser inferiores a Cero...",
              theme: 'relax',
              layout: 'center',
              type: 'error',
              timeout: 2000,
            });
            $("#btn-altas").html("<i class='fa fa-check-circle'></i> Registrar el gasto.");
            $("#btn-altas").attr('disabled', false);
          } else {
            var n = noty({
              text: "Se registro el gasto correctamente...!",
              theme: 'relax',
              layout: 'center',
              type: 'information',
              timeout: 2000,
            });
            $("#btn-altas").attr('disabled', false);
            $("#btn-altas").html("<i class='fa fa-check-circle'></i> Registrar el gasto.");
            cancela_campos_gasto();
          }
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al registrar el gasto...por favor reporte a soporte...!");
          $("#btn-altas").html(estado + "     " + error);
        }
      });
    } else {
      alert("Es necesario registrar los campos...");
    }
  })
}
/********************************************************************************/
function cancela_campos_gasto() {
  $("#fecha").val("");
  $("#num_dock").val("");
  $("#proveedor").val("");
  $("#concepto").val("");
  $("#subtotal").val("");
  $("#iva").val("");
  $("#total").val("");
}
/********************************************************************************/
function respalda() {
  $.ajax({
    beforeSend: function () {
      $("#btn-procede").prop("disabled", true)
      $("#respuesta").html("Respaldando base de datos... <img src='Imagenes/loader.gif'></img>");
    },
    url: 'crea_respaldo.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#respuesta").html(x);
    },
    error: function (jqXHR, estado, error) {
      $("#respuesta").html('Hubo un error al generar el respaldo!!!Reporte a soporte...' + '     ' + estado + ' ' + error);
    }
  });
}
/*****************************************************************GC - Busca Ventas Autorizaciones*******************/
/*********************************************************************/
function busca_ventas_autorizaciones() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando las ventas, un momento...");
        },
        url: 'busca_ventas_autorizaciones.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() + '&fechaf=' + $("#ff").val(),
        success: function (res) {
          $("#data").html(res);
          $(document).ready(function () {
            $('#tabla_ventas').DataTable();
          });
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
          $("#data").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}

/*****************************************************************
GC Muestra Detalle Autoriza
************/
function muestra_detalle_autorizaciones(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_venta_autorizaciones.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[1]);
      $(".nuticket").append("AUTORIZACIONES: Detalle de venta | <span class='label label-warning'>Ticket: " + tic[0] + " - " + tic[1] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[1];
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: 'pone_modelo_autoriza_venta_condicion.php',

          type: 'POST',
          data:
            { idpedido },
          success: function (x) {
            $("#idmodelo").val("");
            $("#comentariosaut").val("");
            $("#pone_cmodelo").html(x);
            $(".select2").select2();
            //              alert($("#totales").html())
            //$("#montolp2").val($("#montolp").val());

          },
          error: function (jqXHR, estado, error) {
          }
        });
      });

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/
/*******PROCESA AUTORIZACION******************************/
function procesa_autorizacion() {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {
        },
        url: 'procesa_venta_autorizacion.php',
        type: 'POST',
        data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
            theme: 'relax',
            layout: 'topLeft',
            type: 'success',
            timeout: 2000,
          });
          $("#comentarios").val("");

        }
        ,
        error: function (jqXHR, estado, error) {
          $("#errores").html('Error... ' + estado + '  ' + error);
        }
      });
    } else {
      var n = noty({
        text: "Debe seleccionar un Modelo de Autorización...: " + id_ticket,
        theme: 'relax',
        layout: 'topLeft',
        type: 'warning',
        timeout: 2000,
      });
    }
  });
}

/***********************************************************************************/
/*******PROCESA AUTORIZACION******************************/
function procesa_rechazo() {
  $(document).ready(function () {

    var idautoriza = '0';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {
        },
        url: 'procesa_venta_rechazo.php',
        type: 'POST',
        data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido al RECHAZO del pedido N°: " + id_ticket,
            theme: 'relax',
            layout: 'topLeft',
            type: 'warning',
            timeout: 2000,
          });

        }
        ,
        error: function (jqXHR, estado, error) {
          $("#errores").html('Error... ' + estado + '  ' + error);
        }
      });
    } else {
      var n = noty({
        text: "Debe seleccionar un Modelo de Autorización....: " + id_ticket,
        theme: 'relax',
        layout: 'topLeft',
        type: 'warning',
        timeout: 2000,
      });
    }
  });
}


/*********************************************************************/
function busca_ventas_despacho() {
  $(document).ready(function () {
    if ($("#fechai").val() != "" || $("#fechaf").val() != "") {
      $.ajax({
        beforeSend: function () {
          // $("#datadespacho").html("Buscando los despachos de ventas un momento...");
          // $("#datadespacho").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
        url: 'busca_ventas_despacho.php',
        type: 'POST',
        data: 'fechai=' + $("#fechai").val() + '&fechaf=' + $("#fechaf").val(),
        success: function (res) {

          // Retrasar el cierre del Swal 1.5 segundos
          setTimeout(() => {
            swal.close();
            $("#datadespacho").html(res);
            $(document).ready(function () {
              var table = $('#tabla_ventas_despacho').DataTable(
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
                      className: 'btn btn-pdf'
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

              $("#tabla_ventas_despacho thead tr").clone(true).appendTo("#tabla_ventas_despacho thead");
              $("#tabla_ventas_despacho thead tr:eq(0) th").hide();

              $("#tabla_ventas_despacho thead tr:eq(1) th").each(function (i) {
                if (i == 3 || i == 4) {
                  var $th = $(this);
                  filter($th, table, i);
                }
              });

              // Botón para mostrar todos
              $("#mostrar-todos").on("click", function () {
                $('#tabla_ventas_despacho').DataTable().column(5).search("").draw();
              });

            });
          }, 1500); // Retraso de 1.5 segundos
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar los despachos...por favor reporte a soporte...!");
          $("#datadespacho").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
/****************************************************************************/
/**************GC PONE OPCIONES CONSULTA DESPACHOS*********************************************************/
function genera_opcion_despacho() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion_despacho").html("Poniendo opciones...");
      },
      url: 'opciones_venta_despachos.php',
      type: 'POST',
      data: 'option=' + $("#tipo_buscar").val(),
      success: function (res) {
        $("#pone_opcion_despacho").html(res);
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
        alert("Hubor un error al establecer las opciones de consulta de despachos, reporte a soporte...!");
        $("#pone_opcion_despacho").hmtl(estado + "     " + error);
      }
    });
  })
}
/*****************************************************************
GC Muestra Detalle Autoriza
************/
function muestra_detalle_autorizaciones_despacho(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle despachos...");
    },
    url: 'consulta_detalle_venta_autorizaciones_despacho.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de despachos | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[0];
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: 'pone_modelo_autoriza_venta_condicion.php',

          type: 'POST',
          data:
            { idpedido },
          success: function (x) {
            $("#idmodelo").val("");
            $("#comentariosaut").val("");
            $("#pone_cmodelo").html(x);
            $(".select2").select2();
            //              alert($("#totales").html())
            //$("#montolp2").val($("#montolp").val());

          },
          error: function (jqXHR, estado, error) {
          }
        });
      });

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/
/*******PROCESA DECISION DESPACHO ACEPTADO******************************/





/*********************************************************************/
function busca_ventas_pedidos_pendientes() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  cliente = $("#cliente").val();
  vendedor = $("#vendedor").val();
  estado = $("#esta_pedido").val();
  // estado_entrega = $("#esta_pedido_entregas").val();

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
    url: 'busca_ventas_pedidospendientes.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      cliente: cliente,
      vendedor: vendedor,
      estado: estado,
      // estado_entrega: estado_entrega
    },
    success: function (res) {
      setTimeout(() => {
        swal.close();
        $("#datapedidospendientes").html(res);
        var table =  $('#tabla_ventas_pedidospendientes').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              },
            ],
            order: [[0, "desc"]],
            pageLength: -1,
            lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
            // ordering: false, // ❌ Deshabilita la opción de ordenar columnas
            language: {
              paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",
              },
              Show: "Mostrar",
              search: "Buscar:",
              sLengthMenu: "Mostrar _MENU_ registros",
              sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            },
          }

        );

        $("#tabla_ventas_pedidospendientes thead tr").clone(true).appendTo("#tabla_ventas_pedidospendientes thead");
        $("#tabla_ventas_pedidospendientes thead tr:eq(0) th").hide();

        $("#tabla_ventas_pedidospendientes thead tr:eq(1) th").each(function (i) {
          if (i == 10) {
            var $th = $(this);
            filter($th, table, i);
          }
        });


      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
    }
  });
}
/****************************************************************************/

function genera_excel_estado_pedido() {
  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  cliente = $("#cliente").val();
  vendedor = $("#vendedor").val();
  estado = $("#esta_pedido").val();

  javascript: window.open("excel_reporte_estado_pedido.php?fechai=" + fechai + "" + "&fechaf=" + fechaf + "" + "&cliente=" + cliente + "" + "&vendedor=" + vendedor + "" + "&estado=" + estado + "");
}
/***********************************************************************************/
/*****************************************************************
GC Muestra Detalle Pedidos Pendientes
************/
function muestra_detalle_autorizaciones_pedidospendientes(num_ticket) {
  var tic = num_ticket.split("|");

  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $("#cliente_ped").val(tic[1]);
  $("#vendedor_ped").val(tic[2]);
  $("#moneda").val(tic[3]);
  $("#orden_compra").val(tic[4]);
  $("#fec_registro_oc").val(tic[5]);
  $("#nro_pedido").val(tic[6]);
  $("#nro_cotizacion").val(tic[7]);
  $("#condicion_pago").val(tic[8]);
  $("#forma_entrega").val(tic[9]);


  $.ajax({
    beforeSend: function () {
    },
    url: 'consulta_detalle_venta_autorizaciones_pedidospendientes.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de pedidos pendientes | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);
      $('#tabla_detalle').DataTable(
        {
          dom: '<"top"lBf>rt<"bottom"ip>',
          buttons: [
            {
              extend: 'copy',
              text: '<i class="fa fa-copy"></i> Copiar',
              titleAttr: 'Copiar',
              className: 'btn btn-copy'
            },
          ],
          order: [[0, "desc"]],
          pageLength: -1,
          lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
          language: {
            paginate: {
              first: "Primero",
              last: "Último",
              next: "Siguiente",
              previous: "Anterior",
            },
            Show: "Mostrar",
            search: "Buscar:",
            sLengthMenu: "Mostrar _MENU_ registros",
            sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
          },
        }

      );
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}


function muestra_detalle_pedido(num_ticket) {
  var tic = num_ticket.split("|");

  $("#modal_detalle_venta2").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $("#cliente_ped2").val(tic[1]);
  $("#vendedor_ped2").val(tic[2]);
  $("#moneda2").val(tic[3]);
  $("#orden_compra2").val(tic[4]);
  $("#fec_registro_oc2").val(tic[5]);
  $("#nro_pedido2").val(tic[6]);
  $("#nro_cotizacion2").val(tic[7]);
  $("#condicion_pago2").val(tic[8]);


  $.ajax({
    beforeSend: function () {
    },
    url: 'consulta_detalle_ventapedido.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de pedido | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta2").html(x);
      $('#tabla_detalle2').DataTable(
        {
          dom: '<"top"lBf>rt<"bottom"ip>',
          buttons: [
            {
              extend: 'copy',
              text: '<i class="fa fa-copy"></i> Copiar',
              titleAttr: 'Copiar',
              className: 'btn btn-copy'
            },
          ],
          order: [[0, "desc"]],
          // pageLength: -1,
          pageLength: 10,
          lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
          // ordering: false, // ❌ Deshabilita la opción de ordenar columnas
          language: {
            paginate: {
              first: "Primero",
              last: "Último",
              next: "Siguiente",
              previous: "Anterior",
            },
            Show: "Mostrar",
            search: "Buscar:",
            sLengthMenu: "Mostrar _MENU_ registros",
            sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
          },
        }

      );
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta2").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}

function muestra_detalle_pedido3(num_ticket) {
  var tic = num_ticket.split("|");

  $("#modal_detalle_venta3").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $("#cliente_ped3").val(tic[1]);
  $("#vendedor_ped3").val(tic[2]);
  $("#moneda3").val(tic[3]);
  $("#orden_compra3").val(tic[4]);
  $("#fec_registro_oc3").val(tic[5]);
  $("#nro_pedido3").val(tic[6]);
  $("#nro_cotizacion3").val(tic[7]);
  $("#condicion_pago3").val(tic[8]);


  $.ajax({
    beforeSend: function () {
    },
    url: 'consulta_detalle_ventapedido3.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de pedido | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta3").html(x);
      $('#tabla_detalle3').DataTable(
        {
          dom: '<"top"lBf>rt<"bottom"ip>',
          buttons: [
            {
              extend: 'copy',
              text: '<i class="fa fa-copy"></i> Copiar',
              titleAttr: 'Copiar',
              className: 'btn btn-copy'
            },
          ],
          order: [[0, "desc"]],
          // pageLength: -1,
          pageLength: 10,
          lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
          // ordering: false, // ❌ Deshabilita la opción de ordenar columnas
          language: {
            paginate: {
              first: "Primero",
              last: "Último",
              next: "Siguiente",
              previous: "Anterior",
            },
            Show: "Mostrar",
            search: "Buscar:",
            sLengthMenu: "Mostrar _MENU_ registros",
            sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
          },
        }

      );
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta3").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/*********************************FIN - GC Muestra Detalle Pedidos Pendientes *************************************************/
/***********************************************************************************/
/******************************************************
LISTA MODELOS DE AUTORIZACION
***************************/
function lista_modelo_autorizacion_condicion() {
  //	var idpedido='';
  //	idpedido=$("#idpedido").val();
  //
  //         $(document).ready(function() {
  //          $.ajax({
  ////          beforeSend: function(){
  ////            $("#montolp").html("Recuperando Lista Precios...");
  ////           },
  //          url: 'pone_modelo_autoriza_venta_condicion.php',
  //           
  //          type: 'POST',
  //          data: 
  //        {idpedido},
  //          success: function(x){
  //			  	  $("#idmodelo").val("");
  //            $("#pone_cmodelo").html(x);
  //            $(".select2").select2();
  ////              alert($("#totales").html())
  //              //$("#montolp2").val($("#montolp").val());
  //              
  //           },
  //           error: function(jqXHR,estado,error){
  //           }
  //           });
  //          });
}
/******************************************************
LISTA pedidos pendientes
***************************/
//script datatable 
/*********************************************************************/
function datatablenew() {
  $(document).ready(function () {
    var groupColumn = 2;
    var table = $('#tabla_ventas_pedidospendientes').DataTable({
      "columnDefs": [
        { "visible": false, "targets": groupColumn }
      ],
      "order": [[groupColumn, 'asc']],
      "displayLength": 25,
      "drawCallback": function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
          if (last !== group) {
            $(rows).eq(i).before(
              '<tr class="group"><td colspan="5">' + group + '</td></tr>'
            );

            last = group;
          }
        });
      }
    });

    // Order by the grouping

    $('#tabla_ventas_pedidospendientes tbody').on('click', 'tr.group', function () {
      var currentOrder = table.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
        table.order([groupColumn, 'desc']).draw();
      }
      else {
        table.order([groupColumn, 'asc']).draw();
      }
    });
  });
}
/****************************************************************************/
function muestra_pdf(id, name) {

  $('#modal_pdf').modal('show');
  document.getElementById("clie_pdf").value = name
  document.getElementById("num_pdf").value = id
  var clie_pdf = document.getElementById("clie_pdf").value

  var num_pdf = document.getElementById("num_pdf").value
  //console.log('entre');
  $.post("listar_pedidos_pdf2.php", {
    num_ficha5: num_pdf, clie_pdf: clie_pdf
  },
    function (data) {

      $("#pdfs").html(data);

    });

}
/****************************************************************************/
function pedido_pdf(num_ficha, ruta) {

  var num_ficha_lista2 = num_ficha;
  var ruta_lista = ruta;
  $global_num2 = num_ficha_lista2;
  $global_ruta = ruta_lista;
  //console.log(ruta_lista)

  $(document).ready(function () {
    // document.getElementById("num_fix").value = num_ficha;
    $('#modal_pre2').modal('show');
    $('.modal_pre2').on('shown.bs.modal', function () {      //correct here use 'shown.bs.modal' event which comes in bootstrap3
      $(this).find('iframe').attr('src', $global_ruta)
    })
    $("#navegador3").on('click', function () {
      window.location.href = $global_ruta
    })
  });
}

/*******PROCESA REVISION CONTROL DE GUIAS******************************/
function procesa_controlguia_revision() {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();

    comentaaut = $("#comentariosaut").val();
    $.ajax({
      beforeSend: function () {
      },
      url: 'procesa_controlguia_revision.php',
      type: 'POST',
      data: 'id_ticket=' + id_ticket + '&comentario=' + comentaaut,
      success: function (x) {
        var n = noty({
          text: "Se ha procedido con el registro de revisión para el documento #: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'success',
          timeout: 2000,
        });
        $("#comentariosaut").val("");

      }
      ,
      error: function (jqXHR, estado, error) {
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });

  });
}

/***********************************************************************************/
/*******PROCESA observado CONTROL DE GUIAS******************************/
function procesa_controlguia_observado() {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();

    comentaaut = $("#comentariosaut").val();
    $.ajax({
      beforeSend: function () {
      },
      url: 'procesa_controlguia_observado.php',
      type: 'POST',
      data: 'id_ticket=' + id_ticket + '&comentario=' + comentaaut,
      success: function (x) {
        var n = noty({
          text: "Se ha procedido con el registro de observado para el documento #: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'success',
          timeout: 2000,
        });
        $("#comentariosaut").val("");

      }
      ,
      error: function (jqXHR, estado, error) {
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });

  });
}

function listar_empresas() {
  $(document).ready(function () {
    $.post("listar_empresas.php", {

    },
      function (data) {
        //console.log(data);
        $("#listar_empresas").html(data);
        $(".select2").select2();

      });
  });
}
/***********************************************************************************/

function mostrar_modal_documentos(id) {
  $('#modal_documentos_pedido').modal('show');

  const [doc, cliente, nro_oc, fecha, n_pedido, n_cotizacion] = id.split('|');

  console.log(doc);
  console.log(cliente);
  console.log(nro_oc);
  console.log(fecha);
  console.log(n_pedido);
  console.log(n_cotizacion);

  $("#cliente_pedido").val(cliente);
  $("#orden_compra_pedido").val(nro_oc);
  $("#fecha_registro_pedido").val(fecha);
  $("#nro_sap_pedido").val(n_pedido);
  $("#nro_sap_cotizacion").val(n_cotizacion);

  // setTimeout(() => {
  // listado_guias_ped(doc);
  // listado_guias_factura(doc);
  // listado_factura_anticipo(doc);
  listado_documentos_relacionados(n_pedido);
  // }, 500);
}

function listado_documentos_relacionados(doc) {

  $.ajax({
    beforeSend: function () {
      $("#listado_documentos_relacionados").html("Recuperando proveedores...");
    },
    url: 'listado_documentos_relacionados_pedido.php',
    type: 'POST',
    data: {
      doc: doc,
    },
    success: function (x) {
      $("#listado_documentos_relacionados").html(x);
      // $('#listado_documentos_relacionados').DataTable();
    },
    error: function (jqXHR, estado, error) {
    }
  });
}

function listado_guias_ped(doc) {

  $.ajax({
    beforeSend: function () {
      $("#listado_guias_despacho").html("Recuperando proveedores...");
    },
    url: 'listado_guia_despacho_pedido.php',
    type: 'POST',
    data: {
      doc: doc,
    },
    success: function (x) {
      $("#listado_guias_despacho").html(x);
      $('#listado_guias_despacho').DataTable();
    },
    error: function (jqXHR, estado, error) {
    }
  });
}

function listado_guias_factura(doc) {

  $.ajax({
    beforeSend: function () {
      $("#listado_facturas_reserva").html("Recuperando proveedores...");
    },
    url: 'listado_guia_despacho_factura.php',
    type: 'POST',
    data: {
      doc: doc,
    },
    success: function (x) {
      $("#listado_facturas_reserva").html(x);
      $('#listado_facturas_reserva').DataTable();
    },
    error: function (jqXHR, estado, error) {
    }
  });
}

function listado_factura_anticipo(doc) {

  $.ajax({
    beforeSend: function () {
      $("#listado_facturas_anticipo").html("Recuperando proveedores...");
    },
    url: 'listado_factura_anticipo.php',
    type: 'POST',
    data: {
      doc: doc,
    },
    success: function (x) {
      $("#listado_facturas_anticipo").html(x);
      $('#listado_facturas_anticipo').DataTable();
    },
    error: function (jqXHR, estado, error) {
    }
  });
}

function exportar_guia_pdf(docentry, empresa) {
  if (empresa === "C") {
    var xd = "pdf_preguia.php?docentry=" + docentry + "&empresa=" + empresa;
  } else {
    var xd = "pdf_preguia_aym.php?docentry=" + docentry + "&empresa=" + empresa;
  }

  $('#modal_pdf_guia').modal('show');
  $('#modal_pdf_guia').on('shown.bs.modal', function () {
    $(this).find('iframe').attr('src', xd);
  }).on('hidden.bs.modal', function () {
    $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
  });

  // $("#navegador_guia2").off('click').on('click', function () {
  //   console.log(xd);

  //   window.open(xd, '_blank');
  // });
  $("#navegador_guia2")
    .off("click")
    .on("click", function () {
      var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

      window.open(contenedorUrl, "_blank");
    });

  $("#imprimir_guia").off('click').on('click', function () {
    $('#modal_pdf_guia').find('iframe')[0].contentWindow.print();
  });
}

function exportar_PDF(docentry, tipo_gre) {
  var tipo_gre = "FT";
  var xd =
    "pdf_gre_sunat_new_v2.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;
  // var xd = "pdf_gre_sunat_new_prue.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;

  $("#modal_data_pdf").modal("show");
  $("#modal_data_pdf")
    .on("shown.bs.modal", function () {
      $(this).find("iframe").attr("src", xd);
    })
    .on("hidden.bs.modal", function () {
      $(this).find("iframe").attr("src", ""); // Restablecer el contenido del iframe al cerrar el modal
    });

  // $("#navegador")
  //   .off("click")
  //   .on("click", function () {
  //     window.open(xd, "_blank");
  //   });

  $("#navegador")
    .off("click")
    .on("click", function () {
      var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
    "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
    "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

      window.open(contenedorUrl, "_blank");
    });

  $("#imprimir")
    .off("click")
    .on("click", function () {
      $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
    });
}

function mostrar_evidencia2(id, cliente, emp, nguia, tipo) {
  // Mostrar modal
  $('#modal_mostrar_evi').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });

  $("#modal_mostrar_evi").modal("show");

  setTimeout(function () {
    if ($("#bton_evidencia").length) {
      $("#bton_evidencia").hide();
      console.log("Botón encontrado y ocultado.");
    } else {
      console.log("Botón aún no encontrado.");
    }
  }, 100); // Ajusta el tiempo si es necesario

  document.getElementById("num_mos").value = id;
  document.getElementById("cliente_mos").value = cliente;
  document.getElementById("serie_num_field").value = nguia;
  listar_data_pdf_todos(id, "TD", emp, tipo);
}

function listar_data_pdf_todos(id, movi, emp, tipo) {
  // num = document.getElementById("num_reg").value;
  $(document).ready(function () {
    //estado = $("#IDestado option:selected").text().trim();
    $.ajax({
      beforeSend: function () {
        // $("#data_pdf_todos_2").html("Buscando las ventas, un momento...");
      },
      url: "listar_despacho_pdf_almacen_pedi_Des.php",
      type: "POST",
      data: { id: id, movi: movi, emp: emp, tipo: tipo.trim() },
      success: function (res) {
        // console.log(res);
        $("#data_pdf_todos_2").html(res);
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

function ver_manual_pdf(id, ruta) {
  $global_id = id;
  $global_ruta = ruta;
  //console.log(id)
  $('#modal_data_pdf_guia').modal('show');
  $('.modal_data_pdf').on('shown.bs.modal', function () {      //correct here use 'shown.bs.modal' event which comes in bootstrap3
    $(this).find('iframe').attr('src', $global_ruta)
  })
  $("#navegador_guia").on('click', function () {
    //window.location.href = $global_ruta
    window.open($global_ruta);

  })
  $("#imprimir_guia").on('click', function () {
    $('#imprimir_guia')[0].contentWindow.print();
    //window.print();

  })
}

function ver_detalle_guia(docentry, empresa) {
  $('#modal_detalle_guia').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });
  $("#modal_detalle_guia").modal("show");

  console.log(empresa);

  $.ajax({
    beforeSend: function () {
      //swal_carga()
    },
    url: "consulta_reporte_guia_det.php",
    type: "POST",
    data: { id: docentry, empresa: empresa },
    success: function (x) {
      $("#tabla_detalle_2").html(x);
      $("#tabla_despdet").DataTable({
        order: [[8, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}