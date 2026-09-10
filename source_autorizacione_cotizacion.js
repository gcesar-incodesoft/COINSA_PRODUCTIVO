/*********************************************************************/
function busca_cotizacion() {
  $(document).ready(function () {
    //estado = $("#IDestado option:selected").text().trim();
    $.ajax({
      beforeSend: function () {
        $("#data").html("Buscando las ventas, un momento...");
      },
      url: 'busca_cotizacion.php',
      type: 'POST',
      data: 'estado=' + $("#IDestado option:selected").text().trim(),
      success: function (res) {
        $("#data").html(res);
        $(document).ready(function () {
          $('#tabla_cotizacion').DataTable();
        });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
        $("#data").hmtl(estado + "     " + error);
      }
    });


  })
}
/*********************************************************************/
function muestra_detalle(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_cotizacion").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_cotizacion.php',
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
/*********************************************************************/
function muestra_detalle_autorizaciones(num_ticket) {
  let Queri2 = [];
  var tic = num_ticket.split("|");
  estado = $("#IDestado option:selected").text().trim();
  $("#modal_detalle_cotizacion").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_coti_autorizaciones.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[1]);
      $(".nuticket").append("AUTORIZACIONES: Detalle de venta | <span class='label label-warning'>Ticket: " + tic[0] + " - " + tic[1] + "</span>");
      $("#detalle_de_venta").html(x);
      Queri2[1]=['2','3'];
      $.post("busca_modelo_autorizacion2.php", {
        query:['2','3']
      },
      function(data) {
        $("#cont_aut").html(data);
        valor= $("#cont_aut").text().trim();
        if (valor=='a') {
          console.log('entro  a');
            if (estado == "Pendiente") {
              console.log('entro  Pendiente');
                $('#pone_cmodelo').removeClass('disabledTab');
                $('#pone_cmodelo').addClass('activeTab');
                $('.comentar').removeClass('disabledTab');
                $('.comentar').addClass('activeTab');
            } else {
                $('#pone_cmodelo').removeClass('activeTab');
                $('#pone_cmodelo').addClass('disabledTab');
                $('.comentar').removeClass('activeTab');
                $('.comentar').addClass('disabledTab');
            }
        }else{
            $('.comentar').removeClass('activeTab');
            $('.comentar').addClass('disabledTab');
            $('#pone_cmodelo').removeClass('activeTab');
            $('#pone_cmodelo').addClass('disabledTab');
        }
      });
     /*  if (estado=="Pendiente") {
        $('#pone_cmodelo').removeClass('disabledTab');
        $('#pone_cmodelo').addClass('activeTab');
        $('.comentar').removeClass('disabledTab');
        $('.comentar').addClass('activeTab');
      }else{
        $('#pone_cmodelo').removeClass('activeTab');
        $('#pone_cmodelo').addClass('disabledTab');
        $('.comentar').removeClass('activeTab');
        $('.comentar').addClass('disabledTab');
      } */
      var idpedido = '';
      idpedido = tic[1];
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: 'pone_modelo_autoriza_coti_condicion.php',

          type: 'POST',
          data: {
            idpedido
          },
          success: function (x) {
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

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
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
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {},
        url: 'procesa_coti_autorizacion.php',
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
          busca_cotizaciones_aprobadas(id_ticket)
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
/*********************************************************************/
function busca_cotizaciones_aprobadas(num_ticket) {
  $(document).ready(function () {

    $.ajax({
      beforeSend: function () {
        $("#data").html("Buscando las ventas, un momento...");
      },
      url: 'busca_cotizaciones_aprobadas.php',
      type: 'POST',
      data: 'num_ticket=' + num_ticket,
      success: function (res) {
        $("#data").html(res);
        busca_cotizacion()
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
        $("#data").hmtl(estado + "     " + error);
      }
    });


  })
}
/*******PROCESA RECHAZO******************************/
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
        beforeSend: function () {},
        url: 'procesa_coti_rechazo.php',
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
/* function muestra_pdf(id,name){
  
  $('#modal_pdf').modal('show');
  document.getElementById("clie_pdf").value = name
  document.getElementById("num_pdf").value = id
  var clie_pdf = document.getElementById("clie_pdf").value
                  
  var num_pdf = document.getElementById("num_pdf").value
  console.log('entre');
  $.post("listar_pedidos_pdf2.php", {
      num_ficha5: num_pdf,clie_pdf:clie_pdf
      },
      function(data) {
          
          $("#pdfs").html(data);
           
      });  
  
} */

/*********************************************************************/

function genera_pdf(id,name) {
 // $global_num= id.replace(/ /g,"");
  $global_num= id;
  $global_ser= name;
  $('#modal_genera_pdf').modal('show');

    $('.modalTotal').on('shown.bs.modal',function(){      //correct here use 'shown.bs.modal' event which comes in bootstrap3
        $(this).find('iframe').attr('src','reporte_cotizacion.php?ticket='+$global_num)
    })
    $("#navegador").on('click', function() {
        window.location.href = 'reporte_cotizacion.php?ticket='+$global_num
    })
    $("#imprimir").on('click', function() {
         $('#imprimir_1')[0].contentWindow.print(); 
        //window.print();
       
    })
   // window.location.href = 'reporte_ficha.php?num_ficha='+$global_num
 
}

function genera_opcion_GE() {
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

function lista_coti_aprobadas(IdEstado, IdTipo) {
  $(document).ready(function () {
      $.ajax({
          beforeSend: function () {
              $("#lista_consumo").html("Recuperando usuarios...");
          },
          url: 'consulta_cotizaciones_aprobadas.php',
          type: 'POST',
          data: 'IdEstado=' + IdEstado + '&IdTipo=' + IdTipo,
          success: function (x) {
              $("#lista_consumo").html(x);
              $("#tabla_consumo").DataTable();
          },
          error: function (jqXHR, estado, error) {}
      });
  });
}