/****************** MA LIstar Requerimiento **********************************/

function ListRequeri(){

    $(document).ready(function() {
    
            $.ajax({
            beforeSend: function(){
              $("#ListaReq_compras").html("Consultando informacion...");
             },
            url: 'Consultar_Req_Compras_Aproba.php',
            type: 'POST',
            data: 'idestad='+$("#IDestado").val(),
            success: function(x){
              $("#ListaReq_compras").html(x);
              $("#ListaReq_compras2").DataTable();
             },
             error: function(jqXHR,estado,error){
               $("#ListaReq_compras").html(estado+"    "+error);
             }
             });
            });
   }

/******************************************************************************/
/****************** MA LIstar Requerimiento  inicia**********************************/

function ListRequeri_au(){

    $(document).ready(function() {
    
            $.ajax({
            beforeSend: function(){
              $("#ListaReq_compras").html("Consultando informacion...");
             },
            url: 'Consultar_Req_Compras_Aproba.php',
            type: 'POST',
            data: 'idestad='+'01',
            success: function(x){
              $("#ListaReq_compras").html(x);
              $("#ListaReq_compras2").DataTable();
             },
             error: function(jqXHR,estado,error){
               $("#ListaReq_compras").html(estado+"    "+error);
             }
             });
            });
   }




   ///////////////consultar detalle de requerimiento
function Consultar_Detalle_reqcompra(id){
  var id= id;
//  alert(id);

$(document).ready(function() {
  $('#modal_detalle_reqcompra').modal('show');



$.post("Listar_Detalle_Req.php", {id:id}, 
   function(data){

$("#detalle_de_reqcompra").html(data);

$("#idpedido").val(id);
//  $('#OCS').DataTable(); 
     }); 




}) ;
}

/***********************************************************************************/
/*******PROCESA DECISION RQ ACEPTADO******************************/
function procesa_decision_reqcompra_aceptado(){
  $(document).ready(function(){

        var idautoriza='1';
    var id_ticket='0';
    var idmodel='';
    var comentaaut='';
       // $('#modal_detalle_venta').modal('toggle');
    id_ticket=$("#idpedido").val();
    //  idmodel=$("#idmodelo").val();
      comentaaut=$("#comentariosaut").val();
        if($("#idpedido").val()!=""){
                       $.ajax({
                            beforeSend: function(){
                             },
                            url: 'procesa_decision_reqcompra_aceptado.php',
                            type: 'POST',
                            data: 'id_ticket='+id_ticket+'&comentario='+comentaaut,
                            success: function(x){
                                 var n = noty({
                                  text: "Se ha procedido con la APROBACION de RQ: "+id_ticket,
                                  theme: 'relax',
                                  layout: 'topLeft',
                                  type: 'success',
                                  timeout: 2000,
                                 });
                   $("#comentarios").val("");

                        }
                           ,
                            error: function(jqXHR,estado,error){
                              $("#errores").html('Error... '+estado+'  '+error);
                             }
                      });
                }else{
                                 var n = noty({
                                  text: "Debe actualizar nuevamente el RQ: "+id_ticket,
                                  theme: 'relax',
                                  layout: 'topLeft',
                                  type: 'warning',
                                  timeout: 2000,
                                 });
 }
         });
        }
                       
/***********************************************************************************/
/*******PROCESA DECISION RQ ACEPTADO******************************/
function procesa_decision_reqcompra_rechazo(){
  $(document).ready(function(){

        var idautoriza='1';
    var id_ticket='0';
    var idmodel='';
    var comentaaut='';
       // $('#modal_detalle_venta').modal('toggle');
    id_ticket=$("#idpedido").val();
    //  idmodel=$("#idmodelo").val();
      comentaaut=$("#comentariosaut").val();
        if($("#idpedido").val()!=""){
                       $.ajax({
                            beforeSend: function(){
                             },
                            url: 'procesa_decision_reqcompra_rechazo.php',
                            type: 'POST',
                            data: 'id_ticket='+id_ticket+'&comentario='+comentaaut,
                            success: function(x){
                                 var n = noty({
                                  text: "Se ha procedido a RECHAZAR el RQ: "+id_ticket,
                                  theme: 'relax',
                                  layout: 'topLeft',
                                  type: 'success',
                                  timeout: 2000,
                                 });
                   $("#comentarios").val("");

                        }
                           ,
                            error: function(jqXHR,estado,error){
                              $("#errores").html('Error... '+estado+'  '+error);
                             }
                      });
                }else{
                                 var n = noty({
                                  text: "Debe actualizar nuevamente el RQ: "+id_ticket,
                                  theme: 'relax',
                                  layout: 'topLeft',
                                  type: 'warning',
                                  timeout: 2000,
                                 });
 }
         });
        }
                  