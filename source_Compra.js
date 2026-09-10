function ActualizaPre(){

}
 /*********************************bus articulos compras *************************************************/
 function buscaarticulocompras(){
    $.ajax({
        beforeSend: function(){
          $("#lista_articulos").html("<img src='dist/img/default.gif'></img>");
          },
        url: 'busca_articulos_ayuda_compras.php',
        type: 'POST',
        data: 'articulo='+$("#articulo_buscar").val(),
        success: function(x){
         $("#lista_articulos").html(x);
         },
        error: function(jqXHR,estado,error){
          $("#lista_articulos").html("Error en la peticion AJAX..."+estado+"      "+error);
        }
       });
  }
  /************************************************************************************/
/*******************************modela********************************************************/
function busqueda_art2(){
  var Idtipoproducto=$("#Idtipoproducto").val().trim();
  if(Idtipoproducto.trim()=="Seleccione Tipo"){
    var n = noty({
      text: "Debe seleccionar tipo de requerimiento...!",
      theme: 'relax',
      layout: 'center',
      type: 'error',
      timeout: 2000,
     });
 
}else{

  if(Idtipoproducto.trim()=="S"){
    $("#modal_agregar_servicio").modal({
      show:true,
      backdrop: 'static',
      keyboard: false
     });
     $("#servicio_desc").focus();
     lista_ccosto2();
     
  }else{
  $("#modal_busqueda_arts").modal({
    show:true,
    backdrop: 'static',
    keyboard: false
   });
$('#modal_busqueda_arts2').on('shown.bs.modal', function () {
$("#lista_articulos").html("");
// $("#cantidad").val("");
$("#cantidad").focus();

});
lista_ccosto();
} }
}
/*****************************************************************************/
/*****************************************************************************/
function add_art2(art){
  //alert(art);
  $("#modal_busqueda_arts2").modal("toggle");
  $("#codigo").val(art.trim());
  busca_articulo2();
  busqueda_art2();
}
/*******************************************************/
/*FUNCIONES PARA COMPRAS*/
/************************************************************************************/
function busca_articulo2(){
  $(document).ready(function(){
   var cod=$("#codigo").val().trim();
  //  var descrip=$("#articulo_desc").val().trim();
  //  var UMCompra=$("#UMCompra").val().trim();
  // var tipcli=$("#tipocliente").val().trim();
         if(cod.trim()!=""){
      $(document).ready(function(){
       $.ajax({
       beforeSend: function(){
         $("#data_articulo").html("Buscando informacion del articulo...");
        },
       url: 'busca_data_articulo_compras.php',
       dataType: 'json',
       type: 'POST',
       data: 
//PERMITE HACER MULTIPLE CONSULTA GC
            {codigo: $("#codigo").val(), 
             codigolp: $("#codigolp").val(),
    idcliente_credito: $("#idcliente_credito").val()},
//              'codigo='+$("#codigo").val(),
       success: function(data){
         if(data==0){
//            alert("No existe el articulo...!");
          var n = noty({
                text: "No existe el articulo...!",
                theme: 'relax',
                layout: 'center',
                type: 'error',
                timeout: 2000,
               });
         $("#codigo").val("");
         $("#codigo").focus();
         $("#cantidad").attr("disabled", true);
         $("#cantidad").val(0.00);
         $("#dsctoline").attr("disabled", true);
         $("#dsctoline").val(0.00);
   $("#monedaitem").attr("disabled", true);
         $("#monedaitem").val("");
         //$("#preciou").attr("disabled", true);
         $("#preciou").val(0.00);
   $("#preciouigv").attr("disabled", true);
         $("#preciouigv").val(0.00);
        //  $("#articulo_desc").html("");
        $("#articulo_desc").val("");
        $("#UMCompras").val("");
          $(".exis").html(0);
         $(".preciol").html(0.00);
     $("#imagen").attr("src",'dist/img/sin_foto.png');
         }else{
             $("#cantidad").val(0.00);
             $("#dsctoline").val(0.00);
     $("#monedaitem").val("");
             $("#preciou").val(0.00);
             $("#articulo_desc").val(data[0].descripcion);
             $("#UMCompras").val(data[0].UMCompra);
        //  $("articulo_desc").html(data[0].descripcion);
         $(".exis").html(data[0].cantidad);
         $(".preciol").html(data[0].precio);
     $("#monedaitem").attr("disabled", true);
     $("#monedaitem").val(data[0].moneda);
        // $("#preciou").attr("disabled", true);
         //$('#preciou').number(true, 2);
         $("#preciou").val(data[0].precio);
       // SI TIPO CLIENTE = 115 = EXTRANJERO
      if(data[0].tipocliente==115){
     $("#preciouigv").val((data[0].precio));
          }else{
       $("#preciouigv").val((data[0].precio)*1.18);
             }
         //$('#cantidad').number(true, 2);
         $("#cantidad").attr("disabled", false);
         $("#cantidad").val(0.00);
        // $("#dsctoline").attr("disabled", false);
         $("#dsctoline").val(0.00);
       $("#preciou").select();
         $("#cantidad").focus();
           if(data[0].imagen!=""){
             $("#imagen").attr("src",'img_articulos/'+data[0].imagen);
            }else{
             $("#imagen").attr("src",'dist/img/sin_foto.png');
            }
           if(data[0].cantidad<=0){
// GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
          var n = noty({
                text: "No hay suficiente existencia...!",
                theme: 'relax',
                layout: 'center',
                type: 'information',
                timeout: 2000,
               });
//                alert("No hay suficiente existencia...!")
//                 $("#codigo").val("");
//                 $("#codigo").focus();
//                 $("#cantidad").attr("disabled", true);
//                $("#dsctoline").attr("disabled", true);
//                 $("#preciou").attr("disabled", true);
               $("#cantidad").focus();
           }
         }
        },
           
        error: function(jqXHR,estado,error){
// GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                         var n = noty({
                text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
                theme: 'relax',
                layout: 'center',
                type: 'error',
                timeout: 2000,
               });
//            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
        }
        });
       });
       }else{
       }
       })
      }
/*************************************************************************************/
 /*************************************************************************************/
 function agrega_a_lista2(){
  $(document).ready(function(){
           if($("#cantidad").val()>0){
           var articulo=$("#codigo").val();
           var descripcion=$("#articulo_desc").val();
           var ccosto=$("#pone_ccosto").val();
           var precio=$("#preciou").val();
           var cantidad=$("#cantidad").val();
       var tipovta="V";
           if($("#dsctoline").val()==0){
               var dsctoline=0;
           }else{
           var dsctoline=$("#dsctoline").val();
           }             
           var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));             
           $("#tabla_articulos > tbody").append("<tr><td class='center'>"+articulo+"</td><td class='center'>"+
           descripcion+"<td class='center'>"+cantidad+"</td><td class='center'>"+
           ccosto+"</td><td class='center' style='display:none'>"+precio+"</td><td class='center' style='display:none'>"+
           dsctoline+"</td><td class='center' style='display:none'>"+monto.toFixed(2)+"</td><td class='center' style='display:none'>"+
           tipovta+"</td><td class='center' style='display:none'>"+articulo
           +"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
          
           $("#codigo").val("");
           $("#articulo_desc").val("");
           $("#articulo_buscar").val("");
           
           $("#cantidad").val(0.00);
           $("#dsctoline").val(0.00);
       $("#monedaitem").val("");
           $("#preciou").val(0.00);
       $("#preciouigv").val(0.00);
           $("#cantidad").attr("disabled", true);
            $("#dsctoline").attr("disabled", true);
            $("#Idtipoproducto").attr("disabled", true);
            
           //$("#preciou").attr("disabled", true);
           $("#codigo").focus();
                           $(".widget-user-desc").html("");
            $(".exis").html(0);
           $(".preciol").html(0.00);
           /*cancela_operacion();*/
           $("#imagen").attr("src",'dist/img/sin_foto.png');
           $("#servicio_desc").focus();
           resumenreqcompras();
           }else{
            var n = noty({
                                  text: "La cantidad es invalida...!",
                                  theme: 'relax',
                                  layout: 'center',
                                  type: 'error',
                                  timeout: 2000,
                                 });
           }
           })
        }
/************************************************************************************/

/*************************************************************************************/
function agrega_a_servicio(){
  $(document).ready(function(){
           if($("#cantidadservicio").val()>0){
           var articulo="SERV";
           var descripcion=$("#servicio_desc").val();
           var ccosto=$("#pone_ccosto2").val();
           var precio=1;
           var cantidad=$("#cantidadservicio").val();
       var tipovta="V";
           if($("#dsctoline").val()==0){
               var dsctoline=0;
           }else{
           var dsctoline=$("#dsctoline").val();
           }             
           var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));             
           $("#tabla_articulos > tbody").append("<tr><td class='center'>"+articulo+"</td><td class='center'>"+
           descripcion+"</td><td class='center'>"+cantidad+"</td><td class='center'>"+ccosto+"</td><td class='center' style='display:none'>"+precio+"</td><td class='center' style='display:none'>"+
           dsctoline+"</td><td class='center' style='display:none'>"+monto.toFixed(2)+"</td><td class='center' style='display:none'>"+
           tipovta+"</td><td class='center' style='display:none'>"+articulo
           +"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
           $("#codigo").val("");
           $("#articulo_desc").val("");
           $("#servicio_desc").val("");
           $("#articulo_buscar").val("");
           
           $("#cantidad").val(0.00);
           $("#cantidadservicio").val(0.00);
           $("#dsctoline").val(0.00);
       $("#monedaitem").val("");
           $("#preciou").val(0.00);
       $("#preciouigv").val(0.00);
           $("#cantidad").attr("disabled", true);
            $("#dsctoline").attr("disabled", true);
            $("#Idtipoproducto").attr("disabled", true);
            
           //$("#preciou").attr("disabled", true);
           $("#codigo").focus();
                           $(".widget-user-desc").html("");
            $(".exis").html(0);
           $(".preciol").html(0.00);
           /*cancela_operacion();*/
           $("#imagen").attr("src",'dist/img/sin_foto.png');
           resumenreqcompras();
           }else{
            var n = noty({
                                  text: "La cantidad es invalida...!",
                                  theme: 'relax',
                                  layout: 'center',
                                  type: 'error',
                                  timeout: 2000,
                                 });
           }
           })
        }
/************************************************************************************/
/*************************************************************************************/
function agrega_a_servicio2(){
  $(document).ready(function(){
           if($("#cantidadservicio").val()>0){
           var articulo="SERV";
           var descripcion=$("#servicio_desc").val();
           var precio=1;
           var cantidad=$("#cantidadservicio").val();
       var tipovta="V";
           if($("#dsctoline").val()==0){
               var dsctoline=0;
           }else{
           var dsctoline=$("#dsctoline").val();
           }             
           var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));             
           $("#tabla_articulos > tbody").append("<tr><td class='center'>"+articulo+"</td><td class='center'>"+
           descripcion+"</td><td class='center'>"+cantidad+"</td><td class='center' style='display:none'>"+precio+"</td><td class='center' style='display:none'>"+
           dsctoline+"</td><td class='center' style='display:none'>"+monto.toFixed(2)+"</td><td class='center' style='display:none'>"+
           tipovta+"</td><td class='center' style='display:none'>"+articulo
           +"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
           $("#codigo").val("");
           $("#articulo_desc").val("");
           $("#servicio_desc").val("");
           $("#articulo_buscar").val("");
           
           $("#cantidad").val(0.00);
           $("#cantidadservicio").val(0.00);
           $("#dsctoline").val(0.00);
       $("#monedaitem").val("");
           $("#preciou").val(0.00);
       $("#preciouigv").val(0.00);
           $("#cantidad").attr("disabled", true);
            $("#dsctoline").attr("disabled", true);
            $("#Idtipoproducto").attr("disabled", true);
            
           //$("#preciou").attr("disabled", true);
           $("#codigo").focus();
                           $(".widget-user-desc").html("");
            $(".exis").html(0);
           $(".preciol").html(0.00);
           /*cancela_operacion();*/
           $("#imagen").attr("src",'dist/img/sin_foto.png');
           resumenreqcompras();
           }else{
            var n = noty({
                                  text: "La cantidad es invalida...!",
                                  theme: 'relax',
                                  layout: 'center',
                                  type: 'error',
                                  timeout: 2000,
                                 });
           }
           })
        }
/************************************************************************************/


/***************************************************************************************/
function cancela_codigo2(){
  $("#preciou").val("");
 $("#preciouigv").val("");
  $("#cantidad").val("");
  //$("#preciou").attr("disabled", true);
 $("#preciouigv").attr("disabled", true);
  $("#cantidad").attr("disabled", true);
  $("#codigo").val("");
  $("#articulo_desc").val("");
       $("#servicio_desc").val("");
           $("#cantidadservicio").val(0.00);

  $('#modal_busqueda_arts2').modal('hide');
  $('#modal_busqueda_arts').modal('hide');
  $('#modal_agregar_servicio').modal('hide');
  // $("#codigo").focus();
}
/***************************************************************************************/
/*************************************************************
RESUMEN requerimiento
****************************/
function resumenreqcompras(){
  $(document).ready(function(){
    $('#modal_busqueda_arts2').modal('hide');
    $('#modal_busqueda_arts').modal('hide');
    $('#modal_agregar_servicio').modal('hide');
            var articulos=0.00;
            var monto=0.00;
	  var montoigv=0.00;
            $('#tabla_articulos > tbody > tr').each(function(){
            articulos +=parseFloat($(this).find("td").eq(2).html());
            monto+=parseFloat($(this).find('td').eq(5).html());
            });
            $("#total_articulos").html("Q de Articulos: "+articulos.toFixed(2));
            $("#total_venta").val(monto.toFixed(2));
//            $("#totales").html('S/ ' + monto.toFixed(2));
                 $("#totales").html(monto.toFixed(2));
	  montoigv=monto*1.18;
	  $("#totalesigv").html(montoigv.toFixed(2));
      
      
            // if(articulos>0){
            //   $("#btn-procesa").prop('disabled', false);
            //   $("#btn-cancela").prop('disabled', false);
            // }else{
            //   $("#btn-procesa").prop('disabled', true);
            //   $("#btn-cancela").prop('disabled', true);
            // }
      
            })
          }
/********************************************************************************************/
/*************************************QUITAR ITEM LISTA*****************************************************/
$(function(){
  // Evento que selecciona la fila y la elimina
 $(document).on("click",".delete",function(){
  var parent = $(this).parents().parents().get(0);
$(parent).remove();
    resumen();
 
       
  });
});
/****************************************************************************************/
function Busca_Confirmacion(){
 
             $("#btn_cancela").prop("disabled", true);
           var n = noty({
                    text: "¿Desea proceso el requerimiento de compra...?",
                    theme: 'relax',
                    layout: 'center',
                    type: 'success',
                    buttons     : [
                      {addClass: 'btn btn-primary',
                       text    : 'Si, Quiero!',
                       onClick : function ($noty){
  
           
                            $noty.close();
                            procesa_reqcompra();
  //                          $("#tabla_articulos > tbody:last").children().remove();
  //                          resumen();
  //                          cancela_codigo();
  //                          $("#codigo").focus();
                        }
                     },
                     {addClass: 'btn btn-danger',
                      text    : 'No, Cancelar',
                      onClick : function ($noty){
  //                      $("#btn_cancela").prop("disabled", false);
                         $noty.close();
              
  //						    $('#modal_prepara_venta').modal('toggle');
                       }
                      }
                    ]
                });
  }
  /*********************************************************************************************/
  /***********************************************************************************************/
function cancelarguardar(){

  $('#modal_busqueda_arts2').modal('hide');
  $('#modal_busqueda_arts').modal('hide');
  $('#modal_agregar_servicio').modal('hide');
  // $("#btn_cancela").prop("disabled", true);
  // var n = noty({
  //          text: "¿Deseas cancelar el requerimiento...?",
  //          theme: 'relax',
  //          layout: 'center',
  //          type: 'information',
  //          buttons     : [
  //            {addClass: 'btn btn-primary',
  //             text    : 'Si',
  //             onClick : function ($noty){
  //                  $noty.close();
  //                  $("#tabla_articulos > tbody:last").children().remove();
  //                  resumenreqcompras();
  //                  cancela_codigo2();
  //                  $("#codigo").focus();
  //              }
  //           },
  //           {addClass: 'btn btn-danger',
  //            text    : 'No',
  //            onClick : function ($noty){
  //              $("#btn_cancela").prop("disabled", false);
  //               $noty.close();
  //             }
  //            }
  //          ]
  //      });
}
/***************************************************************************************/
/**************************************************************************************/
function procesa_reqcompra(){
  $(document).ready(function(){
    /*busca el numero de ticket*/
  var n_tic;
          $.ajax({
          beforeSend: function(){
            $("#nro_ticket").html("Buscando...");
           },
        async: false,
          url: 'busca_ticket_reqcompra.php',
          type: 'POST',
          // data: 'caja='+$("#ncaja").val(),
        
          success: function(x){
            $("#nro_ticket").html(x);
            
            n_tic=x;
//              alert(n_tic);
//              return 
return n_tic;
  
           },
           error: function(jqXHR,estado,error){
             $("#nro_ticket").html('Hubo un error: '+estado+' '+error);
           }
           });



      ////******************************/////
    // setTimeout('actualiza_ticket()',1000);
//    $('#modal_prepara_venta').modal('toggle');
         var credi='0';
         var clients='0';
            var dscto='0';
      var comentarios='0';
	 var transportista='';
      var idcliente_parent='0';
      var cpago='0';
      var fentrega='0';
      var direntrega='0';
      var subtotal_venta='0';
      var total_venta='0';
      var n_ticket='0';
	  var idlp='1';
          //$("#btn-procesa").prop('disabled', true);

             credi='1';
tiporeq=$("#Idtipoproducto").val();
comentarios=$("#comentarios").val();
//cpago=document.getElementById("#pone_cpago").selectedIndex;
fentrega=$("#fecha").val();
n_ticket=n_tic;
  
//CABECERA
$.ajax({
  beforeSend: function(){
   },
  url: 'procesa_reqcompra.php',
  type: 'POST',
  data: 'tiporeq='+tiporeq+'&comentarios='+comentarios+'&fentrega='+fentrega+'&n_ticket='+n_ticket,
  success: function(x){
       var n = noty({
        text: "Procesando venta...  articulo actual: ",
        theme: 'relax',
        layout: 'topLeft',
        type: 'success',
        timeout: 2000,
       });
      

//            $("#idcliente_credito").val("");
$("#comentarios").val("");
//            $("#idcliente_parent").val("");



//            $("#idcliente_razon").val("");
//            $("#idcliente_ruc").val("");
// quita_cliente();
// pone_num_venta();

 

//                               if(yapuso==0){
//                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
//                               yapuso=1;
//                               }else{
//                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
//                               }
   },
  error: function(jqXHR,estado,error){
    $("#errores").html('Error... '+estado+'  '+error);
   }
  });



 //DETALLE
           var yapuso=0;
           $('#tabla_articulos > tbody > tr').each(function(){

    var cod = $(this).find('td').eq(0).html();
    var descripcion_art=$(this).find('td').eq(1).html();
    var can = $(this).find('td').eq(2).html();
    var CCosto = $(this).find('td').eq(3).html();

                         $.ajax({
                             beforeSend: function(){
                              },
                             url: 'procesa_reqcompraDetalle.php',
                             type: 'POST',
                             data: 'tiporeq='+tiporeq+'&codigo='+cod+'&cantidad='+can+'&descripcion_art='+descripcion_art+'&comentarios='+'&fentrega='+fentrega+'&n_ticket='+n_ticket+'&CCosto='+CCosto,
                             success: function(x){
                                  var n = noty({
                                   text: "Procesando venta...  articulo actual: "+cod,
                                   theme: 'relax',
                                   layout: 'topLeft',
                                   type: 'success',
                                   timeout: 2000,
                                  });
                                 

//            $("#idcliente_credito").val("");
            $("#comentarios").val("");
//            $("#idcliente_parent").val("");

$("#tabla_articulos > tbody:last").children().remove();
$("#Idtipoproducto").attr("disabled", false);
//            $("#idcliente_razon").val("");
//            $("#idcliente_ruc").val("");
            // quita_cliente();
          // pone_num_venta();

                            
                 
//                               if(yapuso==0){
//                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
//                               yapuso=1;
//                               }else{
//                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
//                               }
                              },
                             error: function(jqXHR,estado,error){
                               $("#errores").html('Error... '+estado+'  '+error);
                              }
                             });
                           });
                          })
                        }
/*******************************************************************************************/
/******************************************************
CENTRO DE COSTO
***************************/
function lista_ccosto(){
  $(document).ready(function() {
   $.ajax({
   beforeSend: function(){
     $("#pone_ccosto").html("Recuperando Lista ...");
    },
   url: 'pone_ccosto.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#pone_ccosto").html(x);
    //  $("#pone_ccosto2").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
  }

  function lista_ccosto2(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#pone_ccosto2").html("Recuperando Lista ...");
      },
     url: 'pone_ccosto.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#pone_ccosto2").html(x);
      //  $("#pone_ccosto2").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }
  ////////////////////////////////////
  function genera_opcion_FechaCompras() {
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


function lista_entradacompras() {
  $(document).ready(function () {
          fechai = $("#fi").val();
          fechaf = $("#ff").val();
          estado = $("#idEstado option:selected").val().trim();
          if (estado === "Seleccione un Estado") {
              alertify.error('Seleccione un Estado');

          } else if (fechai == "") {
              alertify.error('Seleccione un fecha inicio');
          } else if (fechaf == "") {
              alertify.error('Seleccione un fecha fin');
          } else {
              $.post("busca_entradamercancia.php", {
                      fechai: fechai,
                      fechaf: fechaf,
                      statu: estado
                  },
                  function (inf) {

                      $("#data").html(inf);
                      $('#tabla_sal_mercancia').DataTable();


                  });
              }
          })
  }


  function muestra_detalle_entradamercancia(num_ticket) {
    var tic = num_ticket.split("|");
    estado = $("#IDestado option:selected").text().trim();
    $("#modal_solicitud_consumo").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $.ajax({
        beforeSend: function () {
            $("#detalle_de_venta").html("Consultando detalle...");
        },
        url: 'consulta_detalle_entradamercancia.php',
        type: 'POST',
        data: 'codigo=' + tic,
        success: function (x) {
            $(".nuticket").html("");
            $("#idpedido").val(tic[1]);
            $(".nuticket").append(" Detalle  | <span class='label label-warning'>Codigo: " + tic + "</span>");
            $("#detalle_de_venta").html(x);
            if (estado == "Pendiente") {
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
            var idpedido = '';
            idpedido = tic[0];


        },
        error: function (jqXHR, estado, error) {
            $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}