function genera_opcion_OC() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'Mostrar_OC_SERVICIOS.php',
      type: 'POST',
      data: 'option=' + 1,
      success: function (res) {
        $("#pone_opcion").html(res);
        $(function () {
          $('#daterange-btn').daterangepicker({
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
        $("#numero_ticket").inputmask('mask', {
          'alias': 'numeric',
          'autogroup': true,
          'digits': 0,
          'digitsOptional': false
        });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })
}
/*********************************************************************/

/*********************************************************************/
function busca_oc_servicio() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando las ventas, un momento...");
        },
        url: 'Buscar_OC_SERVICIO.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() +
          '&fechaf=' + $("#ff").val(),
        success: function (x) {

          $("#data").html(x);
          $('#tabla').DataTable();

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



///////////////consultar detalle de ocservicio
function Consultar_Detalle_OCS(id) {
  var id = id;
  // alert(id);

  $(document).ready(function () {
    $(".nuticket").html("");
    $(".nuticket").append("AUTORIZACIONES: DETALLES DE OC- SERVICIO  | <span class='label label-warning'>Codigo: " + id + "</span>");
    $('#modal_DetalleOCS').modal('show');

    $("#idpedido").val(id);

    $.post("Listar_Detalle_OCS.php", {
        id: id
      },
      function (data) {

        $("#lista_OCS").html(data);
        var idpedido = '';
        idpedido = id;
        $(document).ready(function () {
          $.ajax({
            //          beforeSend: function(){
            //            $("#montolp").html("Recuperando Lista Precios...");
            //           },
            url: 'pone_modelo_autoriza_ordencom_condicion.php',
  
            type: 'POST',
            data: {
              idpedido
            },
            success: function (x) {
              console.log(x);
              $("#idmodelo").val("");
              $("#comentariosaut").val("");
              $("#pone_cmodelo").html(x);
              $(".select2").select2();
              //              alert($("#totales").html())
              //$("#montolp2").val($("#montolp").val());
  
            },
            error: function (jqXHR, estado, error) {}
          });
        });
        //  $('#OCS').DataTable(); 
      });




  });
}
  /*******PROCESA AUTORIZACION******************************/
  function procesa_autorizacion() {
    $(document).ready(function () {
  
      var idautoriza = '1';
      var id_ticket = '0';
      var idmodel = '';
      var comentaaut = '';
      // $('#modal_detalle_venta').modal('toggle');
      id_ticket = $('#idpedido').val();
      idmodel = $("#pone_cmodelo").val();
      comentarioOC = $("#comentarioOC").val();
      if ($("#pone_cmodelo").val() != "") {
        $.ajax({
          beforeSend: function () {},
          url: 'procesa_ordenc_autorizacion.php',
          type: 'POST',
          data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentarioOC,
          success: function (x) {
            var n = noty({
              text: "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
              theme: 'relax',
              layout: 'topLeft',
              type: 'success',
              timeout: 2000,
            });
            $("#comentarios").val("");
            busca_orden_au()
          },
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
/*******PROCESA RECHAZO******************************/
function procesa_rechazo() {
  $(document).ready(function () {

    var idautoriza = '0';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $('#idpedido').val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentarioOC").val();
    if ($("#pone_cmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {},
        url: 'procesa_ordenc_rechazo.php',
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
          busca_orden_au()
        },
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
function genera_status_OC() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'Mostrar_OC_STATUS.php',
      type: 'POST',
      data: 'option=' + 1,
      success: function (res) {
        $("#pone_opcion").html(res);
        $(function () {
          $('#daterange-btn').daterangepicker({
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
        $("#numero_ticket").inputmask('mask', {
          'alias': 'numeric',
          'autogroup': true,
          'digits': 0,
          'digitsOptional': false
        });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })
}


/*********************************************************************/
function STATUS_oc_servicio() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando las ventas, un momento...");
        },
        url: 'Buscar_OC_STATUS.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() +
          '&fechaf=' + $("#ff").val(),
        success: function (x) {

          $("#data").html(x);
          $('#tabla').DataTable();

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

/*********************************************************************/
///////////////consultar detalle de ocservicio
function Consultar_Detalle_STATUS_OCS(id) {
  var id = id;
  // alert(id);

  $(document).ready(function () {
    $('#modal_DetalleOCS').modal('show');



    $.post("Listar_Detalle_STATUS_OCS.php", {
        id: id
      },
      function (data) {

        $("#lista_OCS").html(data);
        var idpedido = '';
        idpedido =id;
        

        //  $('#OCS').DataTable(); 
      });




  });
}

/****************************** BUSCA REQUERIMIENTOS DE COMPRAS ****************************************/
function busca_ListaReq_compras() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#ListaReq_compras").html("Consultando informacion...");
      },
      url: 'consulta_Req_Compras.php',
      type: 'POST',
      data: 'idestad=' + $("#IDestado").val(),
      success: function (x) {
        $("#ListaReq_compras").html(x);
        $("#ListaReq_compras2").DataTable();
      },
      error: function (jqXHR, estado, error) {
        $("#ListaReq_compras").html(estado + "    " + error);
      }
    });
  });
}
/****************************************************************************/
/*****************************************************************
GC Muestra Detalle req Pendientes
************/
function muestra_detalle_requerimientos(num_ticket) {
  var tic = num_ticket;
  // alert(num_ticket);
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle pedidos pendientes...");
    },
    url: 'consulta_detalle_req_compras.php',
    type: 'POST',
    data: 'serie=' + tic,
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic);
      $(".nuticket").append("Detalle de pedidos pendientes | <span class='label' style='background-color: royalblue'>#: " + tic + "</span>");
      $("#detalle_de_venta").html(x);


    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/*********************************FIN - GC Muestra Detalle Pedidos Pendientes *************************************************/
function Gprebtn() {
  //var fechai=$("#fi").val();
  //var fechaf=$("#ff").val();


  javascript: window.open('Rerpote_ReqCompras_Excel.php');

};