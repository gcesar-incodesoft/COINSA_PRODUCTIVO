/*FUNCIONES PARA EL PUNTO DE VENTA*/
/************************************************************************************/
function busca_articulo(){
    $(document).ready(function(){
     var cod=$("#codigo").val().trim();
        var tipcli=$("#tipocliente").val().trim();
             if(cod.trim()!=""){
        $(document).ready(function(){
         $.ajax({
         beforeSend: function(){
           $("#data_articulo").html("Buscando informacion del articulo...");
          },
         url: 'busca_data_articulo_pventa.php',
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
           $("#descripcionitem").val("");
           //$("#preciou").attr("disabled", true);
           $("#preciou").val(0.00);
           $("#preciouigv").attr("disabled", true);
           $("#preciouigv").val(0.00);
           $(".widget-user-desc").html("");
            $(".exis").html(0);
           $(".preciol").html(0.00);
       $("#imagen").attr("src",'dist/img/sin_foto.png');
           }else{
               $("#cantidad").val(0.00);
               $("#dsctoline").val(0.00);
               $("#monedaitem").val("");
               $("#preciou").val(0.00);
           $(".widget-user-desc").html(data[0].descripcion);
           $("#descripcionitem").val(data[0].descripcion);
           if (data[0].cantidad<1) {
             document.getElementsByClassName("exis")[0].style.color="red";
             document.getElementsByClassName("exis")[0].style.fontWeight ="bolder";
           } else {
             document.getElementsByClassName("exis")[0].style.color="blue";
             document.getElementsByClassName("exis")[0].style.fontWeight ="bolder";
           }
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
function agrega_a_lista(){
  $(document).ready(function(){
           if($("#cantidad").val()>0){
           var articulo=$("#codigo").val();
           var descripcion=document.getElementById('descripcionitem').value
           var precio=$("#preciou").val();
           var cantidad=$("#cantidad").val();
           var num = parseFloat(document.getElementById('tabla_articulos').getElementsByTagName('tr').length - 1)
               var tipovta="V";
           if($("#dsctoline").val()==0){
               var dsctoline=0;
           }else{
           var dsctoline=$("#dsctoline").val();
           }             
           var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));             
           $("#tabla_articulos > tbody").append("<tr><td class='center'>"+num+"</td><td class='center'>"+articulo+"</td><td class='center'>"+descripcion+"</td><td class='center'>"+cantidad+"</td><td class='center'>"+precio+"</td><td class='center'>"+dsctoline+"</td><td class='center'>"+monto.toFixed(2)+"</td><td class='center' style='display:none'>"+tipovta+"</td><td class='center' style='display:none'>"+articulo+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
           $("#codigo").val("");
           $("#cantidad").val(0.00);
           $("#dsctoline").val(0.00);
               $("#monedaitem").val("");
       $("#descripcionitem").val("");
           $("#preciou").val(0.00);
               $("#preciouigv").val(0.00);
           $("#cantidad").attr("disabled", true);
            $("#dsctoline").attr("disabled", true);
           //$("#preciou").attr("disabled", true);
           $("#codigo").focus();
                           $(".widget-user-desc").html("");
            $(".exis").html(0);
           $(".preciol").html(0.00);
           /*cancela_operacion();*/
           $("#imagen").attr("src",'dist/img/sin_foto.png');
           resumen();
           $('#modal_articulo').modal('hide');
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

/*************************************************************
RECALCULA TABLA CON LISTA DE PRECIOS
*************************/
function recal_tabla_pedido(){
 $(document).ready(function(){
//         var articulos=0.00;
var codarticulo=0.00;

     var precio=0.00;
   var cantidad=0.00;
            var dsctoline=0.00;
     var monto=0.00;
     var preciotemp=0.00;
     var tipoarticulo="";
//            var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));       
$('#tabla_articulos > tbody > tr').each(function(){
var i = $(this).index();
   //  Capturamos valor de celda [5],recorremos filas y actualizamos.
   codarticulo=$(this).find('td').eq(1).html();
   cantidad=parseFloat($(this).find('td').eq(3).html());
   precio=parseFloat($(this).find('td').eq(4).html());
   tipoarticulo=$(this).find('td').eq(6).html();
       dsctoline=parseFloat($(this).find('td').eq(5).html());
   if(isNaN(dsctoline)) {
        dsctoline = 0.00;
           $($('#tabla_articulos').find('tbody > tr')
       [i]).children('td')[4].innerHTML = parseFloat(dsctoline);
   }
    monto=parseFloat($(this).find('td').eq(5).html());
   
        $(document).ready(function(){
            
         $.ajax({
         beforeSend: function(){
           $("#data_articulo").html("Buscando informacion del articulo...");
          },
         url: 'busca_data_articulo_pventa.php',
         dataType: 'json',
         type: 'POST',
         data: 
//PERMITE HACER MULTIPLE CONSULTA GC
              {codigo:         $($('#tabla_articulos').find('tbody > tr')
         
       [i]).children('td')[0].innerHTML , 
               codigolp: $("#montolp2").val()},
         success: function(data){
             preciotemp=0.00;
           preciotemp=data[0].precio;


       $($('#tabla_articulos').find('tbody > tr')
         
       [i]).children('td')[3].innerHTML = preciotemp;
//              alert(preciotemp)
                     
         
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
          }
          });
         });
//	   alert(tipoarticulo)
             if(tipoarticulo.trim()!="V"){
                 precio=0.00;
             }else{
                  precio=parseFloat($(this).find('td').eq(3).html());
             }
      
             $($('#tabla_articulos').find('tbody > tr')
       [i]).children('td')[5].innerHTML = parseFloat((cantidad*precio)- ((cantidad*precio)*(dsctoline/100))).toFixed(2); 


//    alert(i)
//// monto+= acumaldor (suma)
//  Capturamos valor de celda [5],recorremos filas y actualizamos.
//     monto=parseFloat($(this).find('td').eq(5).html());
//    $($('#tabla_articulos').find('tbody > tr')
//        [i]).children('td')[5].innerHTML = monto*2;

//  Actualizamos RESUMEN
     resumen();
//    alert(monto)
           })
     
     // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                           var n = noty({
                  text: "Se realízó el recalculo...!",
                  theme: 'relax',
                  layout: 'center',
                  type: 'success',
                  timeout: 2000,
                 });
   
         }
                   )}
/******************************************************************************************/
$(function(){
        // Evento que selecciona la fila y la elimina
         $(document).on("click",".delete",function(){
            var parent = $(this).parents().parents().get(0);
         $(parent).remove();
          resumen();
       
             
          });
      });
/****************************************************************************************/
function pone_num_venta(){
         $(document).ready(function(){
         $.ajax({
         beforeSend: function(){
           $("#num_ticket").html("Buscando...");
          },
         url: 'busca_ticket_cotizacion.php',
         type: 'POST',
         data: 'caja='+$("#ncaja").val(),
         success: function(x){
           document.getElementById("num_pdf").value = x;
           $("#num_ticket").html("Sesión: "+$("#ncaja").val()+" - Cotizacion # " +x);
          },
          error: function(jqXHR,estado,error){
            $("#num_ticket").html('Hubo un error: '+estado+' '+error);
          }
          });
         });
       }
/*************************************************************
RESUMEN DE VENTA MODAL, COLUMMNA TOTAL 5
****************************/
function resumen(){
 $(document).ready(function(){
           var articulos=0.00;
           var monto=0.00;
     var montoigv=0.00;
           $('#tabla_articulos > tbody > tr').each(function(){
           articulos +=parseFloat($(this).find("td").eq(3).html());
           monto+=parseFloat($(this).find('td').eq(6).html());
           });
           $("#total_articulos").html("Q de Articulos: "+articulos.toFixed(2));
           $("#total_venta").val(monto.toFixed(2));
//            $("#totales").html('S/ ' + monto.toFixed(2));
                $("#totales").html(monto.toFixed(2));
     montoigv=monto*1.18;
     $("#totalesigv").html(montoigv.toFixed(2));
     
     
           if(articulos>0){
             $("#btn-procesa").prop('disabled', false);
             $("#btn-cancela").prop('disabled', false);
             $("#btn-cancel").prop('disabled', false);
           }else{
             $("#btn-procesa").prop('disabled', true);
             $("#btn-cancela").prop('disabled', true);
             //$("#btn-cancel").prop('disabled', true);
           }
     
           })
         }
/********************************************************************************************/
function busca_cliente(){
     $(document).ready(function(){
              $("#modal_tabla_clientes").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#lista_clientes").html("Cargando los clientes...");
                         },
                         url: 'lista_clientes.php',
                         type: 'POST',
                         data: 'client='+$("#clie").val(),
                         success: function(x){
                           $("#lista_clientes").html(x);
                           $(document).ready(function() {
                            $('#sample-table-3').DataTable();
                            
                           });
                          },
                         error: function(jqXHR,estado,error){
                           $("#lista_clientes").html('Hubo un error: '+estado+' '+error);
                         }
                      });
                      })
                     }

/********************************************************************************************/
function busca_clientev(){
     $(document).ready(function(){
              $("#modal_tabla_clientesv").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#lista_clientesv").html("Cargando los SN vinculados...");
                         },
                         url: 'lista_clientesv.php',
                         type: 'POST',
                         data: 'client='+$("#cliev").val(),
                         success: function(x){
                           $("#lista_clientesv").html(x);
                           $(document).ready(function() {
                            $('#sample-table-3').DataTable();
                           });
                          },
                         error: function(jqXHR,estado,error){
                           $("#lista_clientesv").html('Hubo un error: '+estado+' '+error);
                         }
                      });
                      })
                     }
/*****************************************************************
BUSCA IMG ARTICULO
***************************/
function busca_imgarticulo(){
     $(document).ready(function(){
              $("#modal_tabla_imgarticulo").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#lista_imgarticulo").html("Cargando los clientes...");
                         },
                         url: 'lista_imgarticulo.php',
                         type: 'POST',
                         data: 
                          //PERMITE HACER MULTIPLE CONSULTA GC
              {codigo: $("#codigo").val()},
                         success: function(x){
                           $("#lista_imgarticulo").html(x);
                           $(document).ready(function() {
                            $('#sample-table-4').DataTable();
                           });
                          },
                         error: function(jqXHR,estado,error){
                           $("#lista_imgarticulo").html('Hubo un error: '+estado+' '+error);
                         }
                      });
                      })
                     }
/*************************************************************
ARREGLO [0] FORMADO EN LISTA_CLIENTES.PHP
0-ID;1-RAZON;2-RUC
********************************/
function pone_cliente(elid){
                var client=elid;
                var idcl=client.split("|");
                $("#idcliente_credito").val(idcl[0]);
               $("#idcliente_razon").val(idcl[1]);
               $("#idcliente_ruc").val(idcl[2]);
                $("#idcliente_parent").val(idcl[3]);
       $("#tipocliente").val(idcl[4]);
       $("#codigocp").val(idcl[5]);
       
        //rend_linea = idcl[6]/10000
       // console.log(idcl[6])
       $("#lineacredito").val(parseFloat(idcl[6]).toFixed(2));
       $("#salpendiente").val(parseFloat(idcl[7]).toFixed(2));
      
       $("#lin_disponible").val(parseFloat(idcl[8]).toFixed(2));
       pone_cpago=idcl[5]
       $('#pone_cpago').val(pone_cpago).trigger('change.select2');
      
                $("#modal_tabla_clientes").modal('hide');
                $("#tipo_de_venta").html("<button class='btn btn-danger btn-xs' onclick='quita_cliente();'>Quitar</button> Cliente: "+idcl[1]);
                $("#btn_cre").attr('disabled', true);
                document.getElementById("ccode_pdf").value = idcl[0];
                document.getElementById("clie_pdf").value = idcl[1];
                $('.entrega').removeClass('disabledTab');
                 $('.entrega').addClass('activeTab');
                 $('.transporte').removeClass('disabledTab');
                 $('.transporte').addClass('activeTab');
                //window.alert(client);
              }
/*************************************************************
ARREGLO [0] FORMADO EN LISTA_CLIENTESV.PHP
1-CODIGO 25/01/2017 GC
********************************/
function pone_clientev(elid){
                var client=elid;
   var idcl=client.split("|");
             $("#idcliente_parent").val(idcl[0]);
                    $("#modal_tabla_clientesv").modal('hide');
                //window.alert(client);
              }
/*********************************************************************************************/
function quita_cliente(){
 $("#btn_cre").attr('disabled', false);
 $("#tipo_de_venta").html("Seleccionar Cliente.");
 $("#idcliente_credito").val("");
 $("#tipocliente").val("");
 $("#lineacredito").val("");
 $("#salpendiente").val("");
 $("#lin_disponible").val("");
 $("#pone_cpago").val("");
 $("#salpendiente").val("");
           $("#idcliente_parent").val("");

           $("#idcliente_razon").val("");
           $("#idcliente_ruc").val("");
}
/***********************************************************************************************/
function cancela_venta(){
        $("#btn_cancela").prop("disabled", true);
        var n = noty({
                 text: "¿Deseas cancelar el pedido...?",
                 theme: 'relax',
                 layout: 'center',
                 type: 'information',
                 buttons     : [
                   {addClass: 'btn btn-primary',
                    text    : 'Si',
                    onClick : function ($noty){
                         $noty.close();
                         $("#tabla_articulos > tbody:last").children().remove();
                         resumen();
                         cancela_codigo();
                         $("#codigo").focus();
                     }
                  },
                  {addClass: 'btn btn-danger',
                   text    : 'No',
                   onClick : function ($noty){
                     $("#btn_cancela").prop("disabled", false);
                      $noty.close();
                    }
                   }
                 ]
             });
      }
/***************************************************************************************/
function cancela_codigo(){
  $("#preciou").val("");
   $("#preciouigv").val("");
  $("#cantidad").val("");
  //$("#preciou").attr("disabled", true);
   $("#preciouigv").attr("disabled", true);
  $("#cantidad").attr("disabled", true);
  $("#codigo").val("");
  $("#codigo").focus();
}

/***************************************************************************************/
function cargar_pdf(){
 $('#modal_pdf').modal('show');
 var clie_pdf = document.getElementById("ccode_pdf").value
                 
 var num_pdf = document.getElementById("num_pdf").value
 console.log('entre');
                   $.post("listar_pedidos_pdf.php", {
                       num_ficha5: num_pdf,clie_pdf:clie_pdf
                       },
                       function(data) {
                           /* pre_pdf(num_fix)
                           pone_lista_pre_ficha() */
                           $("#pdfs").html(data);
                           /*  $('#modal_pre_pdf').modal('hide'); */  
                       }); 
}
/***************************************************************************************/
function prepara_venta(){
 $(document).ready(function(){
  
     if($("#idcliente_credito").val()==""){
            var n = noty({
                  text: "Debe seleccionar un Cliente válido",
                  theme: 'relax',
                  layout: 'center',
                  type: 'error',
                  timeout: 2000,
                 });
//                alert(
     }else{
      $("#modal_prepara_venta").modal({
       show:true,
       backdrop: 'static',
       keyboard: false
  });
  $('#modal_prepara_venta').on('shown.bs.modal', function () {
  $("#dscto").select();
  $('#dscto').focus();
  });
//   $("#total_de_venta").val("S/ "+ $("#total_venta").val());
    $("#total_de_venta").val($("#total_venta").val());
     }
  })
}
/***********************************************************************************/
function calcula_cambio(){
  var m1=$("#total_venta").val();
  var m2=$("#paga_con").val();
  var change=parseFloat(m2)-parseFloat(m1);
//   $("#el_cambio").val("S/ "+change.toFixed(2));
   $("#el_cambio").val(change.toFixed(2));
}
/*************************************************************
AGREG GERSON
*************************/
function calcula_dscto(){
   
               if($("#dscto").val()>100){
            // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                           var n = noty({
                  text: "El % Dscto es superior a 100...!",
                  theme: 'relax',
                  layout: 'center',
                  type: 'error',
                  timeout: 2000,
                 });
           }else{
  var m1=$("#total_venta").val();
  var m2=$("#dscto").val()/100;
  var vtotal=parseFloat(m1)-(parseFloat(m1)*parseFloat(m2));
               
               var vigv=vtotal*0.18;
               vtotal=vtotal+vigv;
//                $("#total_general").val("S/ "+vtotal.toFixed(2));
  $("#total_general").val(vtotal.toFixed(2));
               $("#total_igv_venta").val(vigv.toFixed(2));
           }


}
/**************************************************************************************/
function pone_foco_ini(){
 $("#codigo").focus();
}
/**************************************************************************************/
function procesa_venta(){
 $(document).ready(function(){
   /*busca el numero de ticket*/
 var n_tic;
         $.ajax({
         beforeSend: function(){
           $("#nro_ticket").html("Buscando...");
          },
       async: false,
         url: 'busca_ticket_cotizacion.php',
         type: 'POST',
         data: 'caja='+$("#ncaja").val(),
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
   setTimeout('actualiza_ticket()',1000);
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
          if($('#idcliente_credito').val()!=""){
            credi='1';
clients=$("#idcliente_credito").val();
comentarios=$("#comentarios").val();
transportista=$("#codigotransportista").val();
idcliente_parent=$("#idcliente_parent").val();
cpago=$("#codigocp").val();
cmoneda=$("#codigomoneda").val();		   
//cpago=document.getElementById("#pone_cpago").selectedIndex;
fentrega=$("#fecha").val();
direntrega=$("#direntrega").val();
n_ticket=n_tic;
idlp=$("#montolp2").val();
U_INCODEMOB_ESTADO='Pendiente';
U_INCODEMOB_OBSERVACION='';
U_INCODEMOB_OV='';
U_INCODEMOB_FECOV='';

           if($("#total_de_venta").val()==0){
             subtotal_venta=0;
           }else{
           subtotal_venta=$("#total_de_venta").val();
           }

           if($("#dscto").val()==0){
             dscto=0;
           }else{
           dscto=$("#dscto").val();
           }
              
           if($("#total_general").val()==0){
             total_venta=0;
           }else{
            total_venta=$("#total_general").val();
           }
        }
          var yapuso=0;
          $('#tabla_articulos > tbody > tr').each(function(){
   var descripcion_art=$(this).find('td').eq(1).html();
   var cod = $(this).find('td').eq(0).html();
   var can = $(this).find('td').eq(2).html();
   var preciou = $(this).find('td').eq(3).html();
  var dscto_lin = $(this).find('td').eq(4).html();
   var monto=$(this).find('td').eq(5).html();
    var tipo_venta=$(this).find('td').eq(6).html();
   var fath=$(this).find('td').eq(7).html();
                        $.ajax({
                            beforeSend: function(){
                             },
                            url: 'procesa_cotizacion.php',
                            type: 'POST',
                            data: 'clienteid='+clients+'&codigo='+cod+'&cantidad='+can+'&preciou='+preciou+'&dscto_lin='+dscto_lin+'&credito='+credi+'&comentarios='+comentarios+'&idcliente_parent='+idcliente_parent+'&cpago='+cpago+'&cmoneda='+cmoneda+'&fentrega='+fentrega+'&direntrega='+direntrega+'&dscto='+dscto+'&subtotal_venta='+subtotal_venta+'&total_venta='+total_venta+'&total_linea='+monto+'&n_ticket='+n_ticket+'&father='+fath+'&tipo_vta='+tipo_venta+'&transportista='+transportista+'&idlp='+idlp+'&caja='+$("#ncaja").val()+'&U_INCODEMOB_ESTADO='+U_INCODEMOB_ESTADO+'&U_INCODEMOB_OBSERVACION='+U_INCODEMOB_OBSERVACION+'&U_INCODEMOB_OV='+U_INCODEMOB_OV+'&U_INCODEMOB_FECOV='+U_INCODEMOB_FECOV,
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
           $("#direntrega").val("");
           $("#pone_cdireccion2").val("");
           $("#pone_transportista").val("");
       $("#codigotransportista").val("");
               $("#idtransportista_razon").val("");
                                
                                
//            $("#idcliente_razon").val("");
//            $("#idcliente_ruc").val("");
           quita_cliente();
         pone_num_venta();

                           
                
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
function actualiza_ticket(){
 $(document).ready(function(){
   $.ajax({
                            beforeSend: function(){
                             },
                            url: 'update_numero_ticket.php',
                            type: 'POST',
                            data: 'caja='+$("#ncaja").val(),
                            success: function(x){
                              //alert("Se actualizo el numero de ticket");
                              $("#tabla_articulos > tbody:last").children().remove();
                               resumen();
                               quita_cliente();
                               $("#codigo").focus();
                             },
                            error: function(jqXHR,estado,error){
                              $("#errores").html('Error... '+estado+'  '+error);
                             }
                            });
                            pone_num_venta();
                            $(".print_ticket").printPage({
                              url: "ticket.txt",
                              attr: "href",
                              message:"Generando vista previa del ticket.."
                            })
                            $(".print_ticket").click();
                            })
}
/*******************************************************************************************/
function llena_ticket_archivo(param1,param2,param3,param4,param5,param6,param7,param8,param9,param10){
  var cod=param1;
  var can=param2;
  var preciou=param3;
  var descripcion=param4;
  var serie=$("#ncaja").val();
  var yapuso=param5;
  var monto=param6;
  var total=param7;
  var pago=param8;
  var cambio=param9;
  var nn=param10;
  $.ajax({
       beforeSend: function(){
         },
       url: 'impresion_tickets.php',
       type: 'POST',
       data: 'codigo='+cod+'&cantidad='+can+'&preciou='+preciou+'&descripcion='+descripcion+'&serie='+serie+'&yapuso='+yapuso+'&monto='+monto+'&total='+total+'&supago='+pago+'&cambio='+cambio+'&numero_ticket='+nn,
       success: function(x){
        //alert(x);
        },
       error: function(jqXHR,estado,error){
       }
      });
}
/************************************************************************************/
/***************************************************************************************/
function busqueda_art(){
  $("#modal_busqueda_arts").modal({
            show:true,
            backdrop: 'static',
            keyboard: false
           });
  $('#modal_busqueda_arts').on('shown.bs.modal', function () {
  $("#lista_articulos").html("");
  $("#articulo_buscar").val("");
  $("#articulo_buscar").focus();
  });
}
/*****************************************************************************/
function busca(){
   $.ajax({
       beforeSend: function(){
         $("#lista_articulos").html("<img src='dist/img/default.gif'></img>");
         },
       url: 'busca_articulos_ayuda.php',
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
/*****************************************************************************/
function add_art(art){
 //alert(art);
 $("#modal_busqueda_arts").modal("toggle");
 $("#codigo").val(art.trim());
 busca_articulo();
}
/******************************************************
AGREGADO GERSON
***************************/
function actualiza_fecha_temp(){
    $(document).ready(function(){
        $.ajax({
         beforeSend: function(){
          },
         url: 'update_fecha_entrada.php',
         type: 'POST',
         data: 'fecha='+$("#fecha").val(),
         success: function(t){

          },
          error: function(jqXHR,estado,error){
          }
          });
      })
}
/******************************************************
***************************/
function lista_proveedores(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_provs").html("Recuperando proveedores...");
          },
         url: 'pone_provs_entrada.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#pone_provs").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }
/******************************************************
Lista de PRECIO
***************************/
function lista_lp(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_lp").html("Recuperando Lista Precios...");
          },
         url: 'pone_lp_venta.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#pone_lp").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }

function actualiza_lp_temp(){
    $(document).ready(function(){
        $.ajax({
         beforeSend: function(){
          },
         url: 'update_lp_venta.php',
         type: 'POST',
         data: 'id_lp='+$("#lp").val()+"&nombre_lp="+$("#lp option:selected").html(),
         success: function(t){

          },
          error: function(jqXHR,estado,error){
          }
          });
      })
}

function lista_lp_condicion(){
        $(document).ready(function() {
         $.ajax({
//          beforeSend: function(){
//            $("#montolp").html("Recuperando Lista Precios...");
//           },
         url: 'pone_lp_venta_condicion.php',
          
         type: 'POST',
         data: 
       {totales: $("#totales").html()},
         success: function(x){
           $("#montolp").html(x);
           $(".select2").select2();
//              alert($("#totales").html())
             $("#montolp2").val($("#montolp").val());
             
           var n = noty({
           text: "Lista de Precio asignado es: "+$("#montolp option:selected").html(),
           theme: 'relax',
           layout: 'center',
           type: 'warning',
           timeout: 2000,
                                 });
             
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }
/******************************************************
CONDICION DE PAGO
***************************/
function lista_cpago(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_cpago").html("Recuperando Lista ...");
          },
         url: 'pone_cpago_venta.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#pone_cpago").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }



function actualiza_cpago_temp(){
    $(document).ready(function(){
        $.ajax({
         beforeSend: function(){
          },
         url: 'update_cpago_venta.php',
         type: 'POST',
         data: 'id_cpago='+$("#cpago").val()+"&nombre_cpago="+$("#cpago option:selected").html(),
         success: function(t){

          },
          error: function(jqXHR,estado,error){
          }
          });
      })
}

function lista_cmoneda(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_cmoneda").html("Recuperando Lista ...");
          },
         url: 'pone_cmoneda_venta.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#pone_cmoneda").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }


function actualiza_moneda_temp(){
    $(document).ready(function(){
        $.ajax({
         beforeSend: function(){
          },
         url: 'update_cmoneda_venta.php',
         type: 'POST',
         data: 'id_cmoneda='+$("#cmoneda").val()+"&nombre_cmoneda="+$("#cmoneda option:selected").html(),
         success: function(t){

          },
          error: function(jqXHR,estado,error){
          }
          });
      })
}
/*************************************************************
ARREGLO [0] FORMADO EN LISTA_KITS.PHP
********************************/
//function pone_kit(elid){
//                 var client=elid;
//                 var idcl=client.split("|");
//                 $("#codigokit").val(idcl[0]);
//                $("#subkit").val(idcl[1]);
//                $("#dsctokit").val(idcl[2]);
//                 $("#cantkit").val(idcl[3]);
////    $("#sample-table-4").style.display='none';
//    $("#elidkit").val("");
//                 //$("#sample-table-4").modal('hide');
////                 $("#tipo_de_venta").html("<button class='btn btn-danger btn-xs' onclick='quita_cliente();'>Quitar</button> Cliente: "+idcl[1]);
////                 $("#btn_cre").attr('disabled', true);
//                 //window.alert(client);
//               }

function busca_kitvta(){

        $(document).ready(function(){
            var dscto=0.00;
            var qa=0.00;
            var qrkit=0.00;
         $.ajax({
         beforeSend: function(){
           $("#data_kit").html("Buscando informacion del articulo...");
          },
         url: 'busca_data_kit_pventa.php',
         dataType: 'json',
         type: 'POST',
         data: 
              {codigo: $("#articulo_kit").val()},
//              'codigo='+$("#codigo").val(),
         success: function(data){
//                $("#cantidad").val(0.00);
//                $("#dsctoline").val(0.00);
//                $("#preciou").val(0.00);
//            $(".widget-user-desc").html(data[0].descripcion);
//            $("subkit").html(data[0].CODE);
             dscto=parseFloat(data[0].DsctoxKit);
             qa=parseFloat(data[0].Qxkit);
             qrkit=parseFloat(data[0].Q_RegalosXKit);
             $("#codigokit").val(data[0].CODE);
             $("#subkit").val(data[0].SUBKIT);
//			  			  $('#dsctokit').number(true, 2);
              $("#cantRkit").val(qrkit.toFixed(2));
             $("#dsctokit").val(dscto.toFixed(2));
//		  $('#cantkit').number(true, 2);
              $("#cantkit").val(qa.toFixed(2));
             $("#fini").val(data[0].F_Ini);
             $("#ffin").val(data[0].F_Fin);
   
             

//            $(".preciol").html(data[0].precio);
//            $("#preciou").attr("disabled", false);
//            //$('#preciou').number(true, 2);
//            $("#preciou").val(data[0].precio);
//            //$('#cantidad').number(true, 2);
//            $("#cantidad").attr("disabled", false);
//            $("#cantidad").val(0.00);
//            $("#dsctoline").attr("disabled", false);
//            $("#dsctoline").val(0.00);
//            $("#preciou").select();
//            $("#cantidad").focus();
          
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

 
        }

/*************************************************************************/
function busca_kitvtamonto(){

        $(document).ready(function(){
            var dscto=0.00;
            var qa=0.00;
            var qrkit=0.00;
         $.ajax({
         beforeSend: function(){
           $("#data_kitmonto").html("Buscando informacion del articulo...");
          },
         url: 'busca_data_kit_pventamonto.php',
         dataType: 'json',
         type: 'POST',
         data: 
              {codigo: $("#articulo_kitmonto").val()},
//              'codigo='+$("#codigo").val(),
         success: function(data){
//                $("#cantidad").val(0.00);
//                $("#dsctoline").val(0.00);
//                $("#preciou").val(0.00);
//            $(".widget-user-desc").html(data[0].descripcion);
//            $("subkit").html(data[0].CODE);
             dscto=parseFloat(data[0].DsctoxKit);
             qa=parseFloat(data[0].Qxkit);
             qrkit=parseFloat(data[0].Q_RegalosXKit);
             $("#codigokitM").val(data[0].CODE);
             $("#subkitM").val(data[0].SUBKIT);
//			  			  $('#dsctokit').number(true, 2);
              $("#cantRkitM").val(qrkit.toFixed(2));
             $("#dsctokitM").val(dscto.toFixed(2));
//		  $('#cantkit').number(true, 2);
              $("#cantkitM").val(qa.toFixed(2));
             $("#finiM").val(data[0].F_Ini);
             $("#ffinM").val(data[0].F_Fin);
   
             

//            $(".preciol").html(data[0].precio);
//            $("#preciou").attr("disabled", false);
//            //$('#preciou').number(true, 2);
//            $("#preciou").val(data[0].precio);
//            //$('#cantidad').number(true, 2);
//            $("#cantidad").attr("disabled", false);
//            $("#cantidad").val(0.00);
//            $("#dsctoline").attr("disabled", false);
//            $("#dsctoline").val(0.00);
//            $("#preciou").select();
//            $("#cantidad").focus();
          
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

 
        }

/*************************************************************************/
function buscakit(){
        $(document).ready(function(){

   $.ajax({
       beforeSend: function(){
         $("#lista_kit").html("<img src='dist/img/default.gif'></img>");
         },
       url: 'lista_Kits.php',
       type: 'POST',
         data: 'articulo='+$("#articulo_kit").val(),
//        data: 'articulo='+$("#codigo").val(),
       success: function(x){
        $("#lista_kit").html(x);
        },
       error: function(jqXHR,estado,error){
         $("#lista_kit").html("Error en la peticion AJAX..."+estado+"      "+error);
       }
      });
}
)}

/*****************************************************************
BUSCA KIT MONTO
********/
function buscakitmonto(){
        $(document).ready(function(){

   $.ajax({
       beforeSend: function(){
         $("#lista_kitmonto").html("<img src='dist/img/default.gif'></img>");
         },
       url: 'lista_Kitsmonto.php',
       type: 'POST',
         data: 'articulo='+$("#articulo_kitmonto").val(),
//        data: 'articulo='+$("#codigo").val(),
       success: function(x){
        $("#lista_kitmonto").html(x);
        },
       error: function(jqXHR,estado,error){
         $("#lista_kitmonto").html("Error en la peticion AJAX..."+estado+"      "+error);
       }
      });
}
)}
/*************************************************************************/
function busca_kits(){
  $("#modal_tabla_kits").modal({
            show:true,
            backdrop: 'static',
            keyboard: false
           });
  $('#modal_tabla_kits').on('shown.bs.modal', function () {
  $("#lista_kit").html("");
//   $("#articulo_kit").val("");
  $("#articulo_kit").focus();
  });
}

/******** LISTA KITS POR MONTO ******/
function busca_kitsmonto(){
  $("#modal_tabla_kitsmonto").modal({
            show:true,
            backdrop: 'static',
            keyboard: false
           });
  $('#modal_tabla_kitsmonto').on('shown.bs.modal', function () {
  $("#lista_kitmonto").html("");
//   $("#articulo_kit").val("");
  $("#articulo_kitmonto").focus();
  });
}

/******** LISTA KITS COMBO ******/
function lista_ckit(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_ckit").html("Recuperando Lista ...");
          },
         url: 'pone_ckit_venta.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#pone_ckit").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }
/******** LISTA KITS COMBO ******/
function lista_ckitmonto(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_ckitmonto").html("Recuperando Lista ...");
          },
         url: 'pone_ckitmonto_venta.php',
         type: 'POST',
         data: {monto: $("#totales").html()},
         success: function(x){
           $("#pone_ckitmonto").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }


/*************************************************************
RESUMEN Q Kit, COLUMMNA Cantidad 5
****************************/
function resumen_Qkit(){
 $(document).ready(function(){
           var tipo="";
     var valor=0;
           var cantvta=0.00;
     var cantRkit=0.00;
     var cantprom=0.00;
     var promgana=0.00;
     
             
     
           $('#tablakit > tbody > tr').each(function(){
           tipo=$(this).find('td').eq(0).html();
      valor=parseFloat($(this).find('td').eq(5).html());
                         if(isNaN(valor)) {
        valor = 0.00;
   }
//				cantkit+=parseFloat($(this).find('td').eq(5).html());
         if(tipo.trim()=="V"){
           cantvta+=valor;
         }else{
            cantprom+=valor; 
         }
          
           });
//            $("#total_articulos").html("Q de Articulos: "+articulos.toFixed(2));
//            $("#total_venta").val(monto.toFixed(2));
//            $("#totales").html('S/ ' + monto.toFixed(2));
//                 $("#canttotkit").html(cantkit);
         if(isNaN(cantvta)) {
        cantvta = 0.00;
   }
               if(isNaN(cantprom)) {
        cantprom = 0.00;
   }
     
      cantRkit=$("#cantRkit").val();
     promgana=$("#cantkit").val();
                     if(promgana==0) {
        promgana = 0.00;
   }else{
               promgana=cantRkit*Math.floor(cantvta/promgana);
   }


                           if(isNaN(promgana)) {
        promgana = 0.00;
   }
//	  cantvta.style.color="#d32e12"
     document.getElementById('cantv').value=cantvta;
      document.getElementById('cantp').value=promgana;
     //redondeo
//	  Math.ceil(2.3) = 3;
//Math.floor(2.6) = 2;
     document.getElementById('cantpcons').value=cantprom;
     
                                 var n = noty({
                  text: "Tiene de regalo ["+promgana+"] por la compra de ["+cantvta+"] producto(s); regalo consumido ["+cantprom+"]",
                  theme: 'relax',
                  layout: 'center',
                  type: 'success',
                  timeout: 3000,
                 });
               if(cantprom>promgana) {
                                       var n = noty({
                  text: "Error..!! Esta utilizando  ["+cantprom+"] producto(s) de regalo; Solo le corresponde ["+promgana+"]",
                  theme: 'relax',
                  layout: 'center',
                  type: 'error',
                  timeout: 3000,
                 });
                     }
//      
//            if(articulos>0){
//              $("#btn-procesa").prop('disabled', false);
//              $("#btn-cancela").prop('disabled', false);
//            }else{
//              $("#btn-procesa").prop('disabled', true);
//              $("#btn-cancela").prop('disabled', true);
//            }
     
           })
         }

/*************************************************************
RESUMEN Q Kit, COLUMMNA Cantidad 5
****************************/
function resumen_Qkitmonto(){
 $(document).ready(function(){
           var tipo="";
     var valor=0;
           var cantvta=0.00;
     var cantRkit=0.00;
     var cantprom=0.00;
     var promgana=0.00;
     
             
     
           $('#tablakitmonto > tbody > tr').each(function(){
           tipo=$(this).find('td').eq(0).html();
      valor=parseFloat($(this).find('td').eq(5).html());
                         if(isNaN(valor)) {
        valor = 0.00;
   }
//				cantkit+=parseFloat($(this).find('td').eq(5).html());
         if(tipo.trim()=="V"){
           cantvta+=valor;
         }else{
            cantprom+=valor; 
         }
          
           });
//            $("#total_articulos").html("Q de Articulos: "+articulos.toFixed(2));
//            $("#total_venta").val(monto.toFixed(2));
//            $("#totales").html('S/ ' + monto.toFixed(2));
//                 $("#canttotkit").html(cantkit);
         if(isNaN(cantvta)) {
        cantvta = 0.00;
   }
               if(isNaN(cantprom)) {
        cantprom = 0.00;
   }
     
      cantRkit=Math.floor($("#cantRkitM").val());
     promgana=$("#cantkitM").val();
                     if(promgana==0) {
        promgana = 0.00;
   }else{
               promgana=cantRkit*Math.floor(cantvta/promgana);
   }


                           if(isNaN(promgana)) {
        promgana = 0.00;
   }
//	  cantvta.style.color="#d32e12"
     document.getElementById('cantvM').value=cantvta;
      document.getElementById('cantpM').value=promgana;
     //redondeo
//	  Math.ceil(2.3) = 3;
//Math.floor(2.6) = 2;
     document.getElementById('cantpconsM').value=cantprom;
     
                                 var n = noty({
                  text: "Tiene de regalo ["+cantRkit+"] por la compra de producto(s)",
                  theme: 'relax',
                  layout: 'center',
                  type: 'success',
                  timeout: 3000,
                 });
               if(cantprom>cantRkit) {
                                       var n = noty({
                  text: "Error..!! Esta utilizando  ["+cantprom+"] producto(s) de regalo; Solo le corresponde ["+cantRkit+"]",
                  theme: 'relax',
                  layout: 'center',
                  type: 'error',
                  timeout: 3000,
                 });
                     }
//      
//            if(articulos>0){
//              $("#btn-procesa").prop('disabled', false);
//              $("#btn-cancela").prop('disabled', false);
//            }else{
//              $("#btn-procesa").prop('disabled', true);
//              $("#btn-cancela").prop('disabled', true);
//            }
     
           })
         }
/******************************************************
*******************************/

/******************************************************
FUNCION AGREGAR LISTA DESDE KIT
*******************************/
function agrega_a_lista_kit(){
  $(document).ready(function(){
            var codfather=$("#codigokit").val();
      var qvta=$("#cantv").val();
      
      var qvtasis=$("#cantkit").val();
      
       var qconsumo=$("#cantpcons").val();
       var qregalo=$("#cantp").val();
      var artic="";
      var tipovta="";
      var deskit=$("#dsctokit").val();
      
     
     if(Math.floor(qvta)>=Math.floor(qvtasis)){
      
             if(qconsumo<=qregalo){
              
                  $('#tablakit > tbody > tr').each(function(){
           
      valor=parseFloat($(this).find('td').eq(5).html());
                         if(isNaN(valor)) {
        valor = 0.00;
   }
//				cantkit+=parseFloat($(this).find('td').eq(5).html());

if(valor>0){
           var articulo=$(this).find('td').eq(6).html();
           var descripcion=$(this).find('td').eq(2).html();
           var precio=parseFloat($(this).find('td').eq(4).html());
           var cantidad=valor;
           var tipovta=$(this).find('td').eq(0).html();
             if(tipovta.trim()=="V"){
           var dsctoline=deskit;
         }else{
                   var dsctoline=0.00;
         }

           
           var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));             
           $("#tabla_articulos > tbody").append("<tr><td class='center'>"+articulo+"</td><td class='center'>"+descripcion+"</td><td class='center'>"+cantidad+"</td><td class='center'>"+precio+"</td><td class='center'>"+dsctoline+"</td><td class='center'>"+monto.toFixed(2)+"</td><td class='center'>"+tipovta+"</td><td class='center'>"+codfather+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");

           resumen();
   //CERRAR MODAL
// $("#modal_tabla_kits").modal("toggle");
   $("#modal_tabla_kits").modal('hide');
           }else{

           }
                      
                      
           });

              
                 }else{
                                var n = noty({
                                 text: "La cantidad de regalo asignado es invalida...!, solo le corresponde ["+qregalo+"]",
                                 theme: 'relax',
                                 layout: 'center',
                                 type: 'error',
                                  timeout: 2000,
                                 });
      }
             
                     }else{
                                var n = noty({
                                 text: "La cantidad de venta asignada es invalida...!, Debe ser una cantidad mayor o igual a  ["+Math.floor(qvtasis)+"]",
                                 theme: 'relax',
                                 layout: 'center',
                                 type: 'error',
                                  timeout: 2000,
                                 });
      }		  
             
           })
        }
/************************************************************************************/
/******************************************************
FUNCION AGREGAR LISTA DESDE KIT
*******************************/
function agrega_a_lista_kitmonto(){
  $(document).ready(function(){
            var codfather=$("#codigokitM").val();
      var qvta=$("#cantvM").val();
       var qconsumo=$("#cantpconsM").val();
       var qregalo=$("#cantRkitM").val();
      var artic="";
      var tipovta="";
      var deskit=$("#dsctokitM").val();
      
     
      
             if(qconsumo<=qregalo){
              
                  $('#tablakitmonto > tbody > tr').each(function(){
           
      valor=parseFloat($(this).find('td').eq(5).html());
                         if(isNaN(valor)) {
        valor = 0.00;
   }
//				cantkit+=parseFloat($(this).find('td').eq(5).html());

if(valor>0){
           var articulo=$(this).find('td').eq(6).html();
           var descripcion=$(this).find('td').eq(2).html();
           var precio=parseFloat($(this).find('td').eq(4).html());
           var cantidad=valor;
           var tipovta=$(this).find('td').eq(0).html();
             if(tipovta.trim()=="V"){
           var dsctoline=deskit;
         }else{
                   var dsctoline=0.00;
         }

           
           var monto=(cantidad*precio)- ((cantidad*precio)*(dsctoline/100));             
           $("#tabla_articulos > tbody").append("<tr><td class='center'>"+articulo+"</td><td class='center'>"+descripcion+"</td><td class='center'>"+cantidad+"</td><td class='center'>"+precio+"</td><td class='center'>"+dsctoline+"</td><td class='center'>"+monto.toFixed(2)+"</td><td class='center'>"+tipovta+"</td><td class='center'>"+codfather+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");

           resumen();
//CERRAR MODAL

//	$("#modal_tabla_kitsmonto").modal('hide');
           }else{

           }
                      
                      
           });
/* procesa_cotizacion() */
               $("#modal_tabla_kitsmonto").modal("toggle");
              
                 }else{
                                var n = noty({
                                 text: "La cantidad de regalo asignado es invalida...!, solo le corresponde ["+qregalo+"]",
                                 theme: 'relax',
                                 layout: 'center',
                                 type: 'error',
                                  timeout: 2000,
                                 });
      }
             
                       
             
           })
        }
/************************************************************************************/
/******************************************************
LISTA DIRECCION
***************************/
function lista_direccion_condicion(){
   var idcliente3='';
   idcliente3=$("#idcliente_credito").val();
        $(document).ready(function() {
         $.ajax({
//          beforeSend: function(){
//            $("#montolp").html("Recuperando Lista Precios...");
//           },
         url: 'pone_direccion_venta_condicion.php',
          
         type: 'POST',
         data: 
       {idcliente3},
         success: function(x){
           $("#pone_cdireccion2").html(x);
           $(".select2").select2();
//              alert($("#totales").html())
             //$("#montolp2").val($("#montolp").val());
             
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }
/******************************************************
LISTA TRANSPORTISTA
***************************/
function lista_ctransportista(){
        $(document).ready(function() {
         $.ajax({
         beforeSend: function(){
           $("#pone_transportista").html("Recuperando Lista ...");
          },
         url: 'pone_transportista_venta.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#pone_transportista").html(x);
           $(".select2").select2();
          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }

/*****************************************************************
Buscar Transportista
***************************/
function busca_transportista(){
     $(document).ready(function(){
              $("#modal_tabla_transportista").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#lista_transportista").html("Cargando los clientes...");
                         },
                         url: 'lista_transportista.php',
                         type: 'POST',
                         data: 'transp='+$("#transport").val(),
                         success: function(x){
                           $("#lista_transportista").html(x);
                           $(document).ready(function() {
                            $('#sample-table-4').DataTable();
                           });
                          },
                         error: function(jqXHR,estado,error){
                           $("#lista_transportista").html('Hubo un error: '+estado+' '+error);
                         }
                      });
                      })
                     }
/*****************************************************************************/
/*************************************************************
ARREGLO [0] FORMADO EN LISTA_TRANSPORTISTA.PHP
0-ID;1-RAZON;2-RUC
********************************/
function pone_transportista(elid){
                var client=elid;
                var idcl=client.split("|");
                $("#codigotransportista").val(idcl[0]);
               $("#idtransportista_razon").val(idcl[1]);
                                //window.alert(client);
              }

/*****************************************************************
Buscar Transportista
***************************/
function Busca_Confirmacion(){
//	lista_ckitmonto();busca_kitsmonto()
//    {
//    var mensaje;
//    var opcion = confirm("¿Desea evaluar promoción por Totales?");
//    if (opcion == true) {
//        mensaje = "Has clickado OK";
//	} else {
//	    mensaje = "Has clickado Cancelar";
//	}
//	document.getElementById("ejemplo").innerHTML = mensaje;
//}
//	swal({
//  title: "Promo",
//  text: "¿Quiere evaluar la promo por Totales?",
//  type: "warning",
//  showCancelButton: true,
//  confirmButtonClass: "btn-danger",
//  confirmButtonText: "Si, Adelante!",
//  cancelButtonText: "No, Solo Procesar!",
//  closeOnConfirm: false,
//  closeOnCancel: false
//},
//function(isConfirm) {
//  if (isConfirm) {
//    swal("Éxito!", "Se ha procesado el pedido.", "success");
//  } else {
//    swal("Cancelled", "Your imaginary file is safe :)", "error");
//  }
//});
            $("#btn_cancela").prop("disabled", true);
        var n = noty({
                 text: "¿Deseas evaluar si accedes a la promo de Totales...?",
                 theme: 'relax',
                 layout: 'center',
                 type: 'success',
                 buttons     : [
                   {addClass: 'btn btn-primary',
                    text    : 'Si, Quiero!',
                    onClick : function ($noty){

                        lista_ckitmonto();
                        busca_kitsmonto();
                         $noty.close();

//                          $("#tabla_articulos > tbody:last").children().remove();
//                          resumen();
//                          cancela_codigo();
//                          $("#codigo").focus();
                     }
                  },
                  {addClass: 'btn btn-danger',
                   text    : 'No, Solo Procesar',
                   onClick : function ($noty){
//                      $("#btn_cancela").prop("disabled", false);
                      $noty.close();
                      c_pago=$("#pone_cpago option:selected").val();
                      total=$('#totalesigv').text().trim();
                      lin_dis=document.getElementById('lin_disponible').value
                      if (c_pago==-1) {
                          if(total<lin_dis) {
                              
                          }
                      }
                      procesa_cotizacion();
                       /*  agrega_a_lista_pdf();
                       eliminar_pdf_temp(); */
//						    $('#modal_prepara_venta').modal('toggle');
                    }
                   }
                 ]
             });
}
/*********************************************************************************************/
function agrega_a_lista_pdf(){

 $('#tabla_pfd > tbody > tr').each(function(){
   
   cliente_pdf=$(this).find('td').eq(0).html();
   nombre_pdf=$(this).find('td').eq(1).html();
   ruta_pdf=$(this).find('td').eq(2).html();
   console.log(cliente_pdf);
   $.post("registrar_punto_venta_pdf2.php", {
     cliente_pdf: cliente_pdf,nombre_pdf: nombre_pdf,ruta_pdf:ruta_pdf
   },
   function(data) {
      
   }); 
 });
}

function pedido_pdf(num_ficha,ruta){   
   
 var num_ficha_lista2= num_ficha;
 var ruta_lista= ruta;
 $global_num2= num_ficha_lista2;
 $global_ruta= ruta_lista;
 console.log(ruta_lista)

 $(document).ready(function() {
    // document.getElementById("num_fix").value = num_ficha;
    $('#modal_pre2').modal('show');
    $('.modal_pre2').on('shown.bs.modal',function(){      //correct here use 'shown.bs.modal' event which comes in bootstrap3
        $(this).find('iframe').attr('src',$global_ruta)
    })
    $("#navegador3").on('click', function() {
        window.location.href = $global_ruta
    })
 }) ;
}

function eliminar_pdf_temp(){
 carcode=document.getElementById("idcliente_credito").value;
 $.post("eliminar_temporal_pventa_pdf.php", {
   carcode: carcode
 },
 function(data) {
    
 }); 
}
function modal_articulo(){
 $('#modal_articulo').modal('show');
/*  carcode=document.getElementById("idcliente_credito").value;
 $.post("eliminar_temporal_pventa_pdf.php", {
   carcode: carcode
 },
 function(data) {
    
 });  */
}
function procesa_cotizacion() {
    $(document).ready(function(){
        var n_tic;
        $.ajax({
            beforeSend: function(){
            $("#nro_ticket").html("Buscando...");
            },
            async: false,
            url: 'busca_ticket_cotizacion.php',
            type: 'POST',
            data: 'caja='+$("#ncaja").val(),
            success: function(x){
                $("#nro_ticket").html(x);
           
                n_tic=x;
                //alert(n_tic);
                    //return 
                    return n_tic;
            },
            error: function(jqXHR,estado,error){
                $("#nro_ticket").html('Hubo un error: '+estado+' '+error);
            }
        });
        //setTimeout('actualiza_ticket()',1000);
        //var credi='0';
        //var clients='0';
        //var dscto='0';
        //var comentarios='0';
        //var transportista='';
        //var idcliente_parent='0';
        //var cpago='0';
        //var fentrega='0';
        //var direntrega='0';
        //var subtotal_venta='0';
        //var total_venta='0';
        //var n_ticket='0';
        //var idlp='1';
        //$("#btn-procesa").prop('disabled', true);
        if($('#idcliente_credito').val()!=""){
          
     
            credi='1';
            clients=$("#idcliente_credito").val();
            clientename=$("#idcliente_razon").val();
            comentarios=$("#comentarios").val();
            transportista=$("#codigotransportista").val();
            idcliente_parent=$("#idcliente_parent").val();
            cpago=$("#codigocp").val();
            cmoneda=$("#codigomoneda").val();		   
            //cpago=document.getElementById("#pone_cpago").selectedIndex;
            fentrega=$("#fecha").val();
            direntrega=$("#direntrega").val();
            n_ticket=n_tic;
            idlp=$("#montolp2").val();
            if($("#total_de_venta").val()==0){
                subtotal_venta=0;
            }else{
                subtotal_venta=$("#total_de_venta").val();
            }
            if($("#dscto").val()==0){
                dscto=0;
            }else{
                dscto=$("#dscto").val();
            }
                 
            if($("#total_general").val()==0){
                total_venta=0;
            }else{
               total_venta=$("#total_general").val();
            }
          }
          $.ajax({
            beforeSend: function(){
                },
            url: 'procesa_cotizacion.php',
            type: 'POST',
            data: 'clienteid='+clients+'&clientename='+clientename+'&credito='+credi+'&comentarios='+comentarios+'&idcliente_parent='+idcliente_parent+'&cpago='+cpago+'&cmoneda='+cmoneda+'&fentrega='+fentrega+'&direntrega='+direntrega+'&dscto='+dscto+'&subtotal_venta='+subtotal_venta+'&total_venta='+total_venta+'&n_ticket='+n_ticket+'&transportista='+transportista+'&idlp='+idlp+'&caja='+$("#ncaja").val(),
            success: function(x){
              $("#detalle_de_venta").html(x);
              va = $("#valor").text();
              console.log($("#valor").text());
                
                /* if(va==1){
                  var n = noty({
                    text: "Linea disponible insuficiente ",
                    theme: 'relax',
                    layout: 'topLeft',
                    type: 'error',
                    timeout: 2000,
                });
                 pedir_aprobacion(n_tic);
                }
                if(va==2){
                  var n = noty({
                    text: "Linea disponible insuficiente ",
                    theme: 'relax',
                    layout: 'topLeft',
                    type: 'error',
                    timeout: 2000,
                });
                  pedir_aprobacion(n_tic)
                }                    */
                if(va==3){
                  console.log("entro x2");
                  var n = noty({
                    text: "Procesando venta...  articulo actual",
                    theme: 'relax',
                    layout: 'topLeft',
                    type: 'success',
                    timeout: 2000,
                  });
                    procesar_cotizacion_det(n_tic)
                    $("#idcliente_credito").val("");
                    $("#comentarios").val("");
                    $("#idcliente_parent").val("");
                    $("#direntrega").val("");
                    $("#pone_cdireccion2").val("");
                    $("#pone_transportista").val("");
                    $("#codigotransportista").val("");
                    $("#idtransportista_razon").val("");
                    quita_cliente();
                    pone_num_venta();
                    setTimeout('actualiza_ticket()',1000);
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
                    $("#btn-procesa").prop('disabled', true);
                }
                 if(va==4){
                  console.log("Fallo");
                  var n = noty({
                    text: "Fallo",
                    theme: 'relax',
                    layout: 'topLeft',
                    type: 'error',
                    timeout: 2000,
                  });
                  
                }                       
                //$("#idcliente_razon").val("");
                //$("#idcliente_ruc").val("");
                //quita_cliente();
                //pone_num_venta();
                /* if(yapuso==0){
                llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
                yapuso=1;
                }else{
                llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
                } */
            },
            error: function(jqXHR,estado,error){
                $("#errores").html('Error... '+estado+'  '+error);
            }
          });
          
          
            
        var yapuso=0;
        
    })
}
function pedir_aprobacion(n_tic) {
  var n = noty({
    text: "¿Deseas solicitar aprobacion...?",
    theme: 'relax',
    layout: 'center',
    type: 'success',
    buttons     : [
      {addClass: 'btn btn-primary',
       text    : 'Si, Quiero!',
       onClick : function ($noty){          
          $noty.close();
          $.ajax({
            beforeSend: function(){
            $("#aprobacion").html("Buscando...");
            },
            async: false,
            url: 'solicita_aprobacion_cotizacion.php',
            type: 'POST',
            data: 'n_ticket='+n_tic,
            success: function(x){
              var n = noty({
                text: "Enviado a Aprobacion",
                theme: 'relax',
                layout: 'topLeft',
                type: 'success',
                timeout: 2000,
              });
            },
            error: function(jqXHR,estado,error){
                $("#aprobacion").html('Hubo un error: '+estado+' '+error);
            }
          });
                         
        }
     },
     {addClass: 'btn btn-danger',
      text    : 'No',
      onClick : function ($noty){

         $noty.close();
         
       }
      }
    ]
});
}

function procesar_cotizacion_det(n_tic) {
 
  $('#tabla_articulos > tbody > tr').each(function(){
    n_ticket=n_tic;
    var line = $(this).find('td').eq(0).html();
    var cod = $(this).find('td').eq(1).html();
    var descripcion_art=$(this).find('td').eq(2).html();
    var can = $(this).find('td').eq(3).html();
    var preciou = $(this).find('td').eq(4).html();
    var dscto_lin = $(this).find('td').eq(5).html();
    var monto=$(this).find('td').eq(6).html();
    var tipo_venta=$(this).find('td').eq(7).html();
    var fath=$(this).find('td').eq(8).html();
    $.ajax({
      beforeSend: function(){
          },
      url: 'procesa_cotizacion_det.php',
      type: 'POST',
      data: '&codigo='+cod+'&descripcion_art='+descripcion_art+'&cantidad='+can+'&preciou='+preciou+
      '&dscto_lin='+dscto_lin+'&total_linea='+monto+'&tipo_vta='+tipo_venta+'&father='+fath+'&n_ticket='+n_ticket+'&line='+line,
      success: function(data){
          var n = noty({
              text: "Procesando venta...  articulo actual: "+cod,
              theme: 'relax',
              layout: 'topLeft',
              type: 'success',
              timeout: 2000,
          });
          
     },
      error: function(jqXHR,estado,error){
          $("#errores").html('Error... '+estado+'  '+error);
      }
    });
  });
}


  