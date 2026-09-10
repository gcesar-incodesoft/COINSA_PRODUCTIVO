
///llenado del combo de los clientes

function lista_Pedidos_Despacho(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#pone_clientes").html("Recuperando proveedores...");
      },
     url: 'Listar_clientes_Facturare.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#pone_clientes").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }

    //muestra los pedidos de factura de reserva
$(document).ready(function(){

  $("#pone_clientes").on('change',  function () {
      $("#pone_clientes option:selected").each(function () {
          elegido=$(this).val();
          $global= elegido;


  //   $('#btnLeer').attr("disabled", true);

          $.post("lista_Pedidos_Despacho_Freserva.php", { elegido2: elegido }, 

        function(data){
          $('#lista_Item').html('');
      
              $("#lista_Pedi").html(data);
                   $(".select2").select2();
        
   
           }); 
      });
 });
});

/////////////////////////
//LISTA ALMACEN        
/////////////////////////
function lista_Almacenes(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_Almacen").html("Recuperando proveedores...");
      },
     url: 'Lista_Almacen_Despacho.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_Almacen").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }



                       
//////////////
function lista_Pedidos_Despacho2(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_Pedidos").html("Recuperando proveedores...");
      },
     url: 'lista_Pedidos_Despacho.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_Pedi").html(x);
          $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }
        //////////////
function lista_Pedidos_Despacho3(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_ItemS").html("Recuperando proveedores...");
      },
     url: 'lista_Items_Despacho.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_Item").html(x);
          $(".select2").select2();


      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }
///////////////////////////////////////

////////////////////////


function validarcodigos(codi){
$(document).ready(function() {
   
   if(codi===1)
   {

     alert(1);
    $('#nombre_c').val('');
    
       
sum= $("#cantidad").text();

      total= sum -1;
       lei = $("#Leido").text();

       ente=parseInt(lei);
        leer=1 + ente;



      //document.querySelector('#cantidad').innerText = total;
       document.querySelector('#Leido').innerText = leer;
           falta= sum-leer;
document.querySelector('#Falta').innerText = falta;

}
else{

     alert(2);
}
      
     });
}
///////////eliminar item scaneados



    function eliminar_Regist_Sca(id,code){
       var id2= id;
      var doc=code;
     var car =$("#pone_clientes option:selected").val();


       alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


eliminar_Regist_Sca2(id2,doc,car);
alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");



}
//eliminnar registrros scaneados

function eliminar_Regist_Sca2(id,doc,car){
       var item= id;
      var doc1=doc;
      var car=car;


$(document).ready(function() {

$.post("Eliminar_Pedido_Scaneado.php", {car:car,doc1:doc,item:item}, 
        function(data){

     $("#lista_leidos").html(data);
          }); 
     }) ;



}




///////////////
function Consultar_Regist_Sca(id,doc){
       var id2= id;

      var doc= doc;
   var car =$("#pone_clientes option:selected").val();
       $item=id;
       $doce=doc;
       $car=car;
    $(document).ready(function() {
       $('#modal_CODIGOS').modal('show');



$.post("Listar_Detalle_Pedido.php", {card:car,doc:doc,item:id2}, 
        function(data){

     $("#lista_scaneo").html(data);
          }); 
     }) ;
}
///consultar
///////////// eliminar items del modal 
function Eliminar_Item_Sca_Des(id){
       var id2= id;


alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


Eliminar_Item_Sca2de(id2);
alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");



}
//eliminnar registrros scaneados

function Eliminar_Item_Sca2de(id){
       var id= id;
   
       var item =$item;
        var doc = $doce;
        var car = $car;
$(document).ready(function() {


$.post("Eliminar_Items_Scaneado.php", {id:id,item:item,doc:doc,card:car}, 
        function(data){

     $("#lista_scaneo").html(data);

$.post("Consulta_Nuevos_Registros.php", { doc: doc ,card: car },
         function(data1){
       $("#lista_leidos").html(data1);
                    
        });
          }); 
     }) ;



}
////////////////

//$("#confirm").click(function(){
//var bool=confirm("Seguro de eliminar el dato?");
//if(bool){
// alert("se elimino correctamente");
//}else{
// alert("cancelo la solicitud");
// }
//});


///evento enter para registar


$(document).ready(function(){

  $("#nombre_c").on('keypress',  function (e) {
     if(e.which == 13) {
        // Acciones a realizar, por ej: enviar formulario.
   


    cai=$('#nombre_c').val();
   almace =$("#lista_Almacen option:selected").val();

    DocEnt=$("#lista_Pedi option:selected").val();
    CardCo=$global;
  


     $.post("Insertar_Temporal_Despacho_Factura.php", { Dentr: DocEnt ,Card: CardCo,codb:cai,almace:almace }, 

         function(data){

        


              $("#detalle_de_venta").html(data);

va = $("#valor").text();
PE = $("#Peso").text();
$('#valor').hide();
if(va==1)
{
  alertify.success('El codigo ya fue leido');
$('#nombre_c').val('');
}

 if(va==2)
{
alertify.error('Codigo no encontrado en el pedido o en produccion (Profil)');
$('#nombre_c').val('');


}
if(va==3)
{
  alertify.error("PEDIDO COMPLETADO");
  $('#nombre_c').val('');
}
if(va==4)
{
  alertify.error("EL ALMACEN NO CUENTA CON STOCK SUFICIENTE");
  $('#nombre_c').val('');
}

if(va==5)
{
  alertify.error("EL ALMACEN NO CUENTA CON STOCK SUFICIENTE");

  $('#nombre_c').val('');

}

if(PE > 0){

  $('#btnGuardar').attr("disabled", false);




  codb=$('#nombre_c').val();
  doc=$("#lista_Pedi option:selected").val();;
  card= $global;
$('#nombre_c').val('');

alertify.success('INSERTADO ');
 $.post("Listar_datos_Scaneados.php", { doc: doc ,card:card,codb:codb },
            function(data1){
          $("#detalle_de_venta2").html(data1);
     
            

          
   
           });

           $.post("Consulta_Nuevos_Registros.php", { doc: doc ,card: card },
            function(data1){
          $("#lista_leidos").html(data1);
     
            
   
           });




  
    }
    
else{

}
       
}



  


);

     };
 });
});

/////////////
///// FUNCION CON BOTON CLICK

$(document).ready(function(){

  $("#btnProcesa").on('click',  function (e) {
     


    cai=$('#nombre_c').val();
   almace =$("#lista_Almacen option:selected").val();

    DocEnt=$("#lista_Pedi option:selected").val();
    CardCo=$global;
  


     $.post("Insertar_Temporal_Despacho_Factura.php", { Dentr: DocEnt ,Card: CardCo,codb:cai,almace:almace }, 

         function(data){

        


              $("#detalle_de_venta").html(data);

va = $("#valor").text();
PE = $("#Peso").text();
$('#valor').hide();
if(va==1)
{
  alertify.success('El codigo ya fue leido');
$('#nombre_c').val('');
}

 if(va==2)
{
alertify.error('El codigo no existe');
$('#nombre_c').val('');


}
if(va==3)
{
  alertify.error("PEDIDO COMPLETADO");
  $('#nombre_c').val('');
}
if(va==4)
{
  alertify.error("EL ALMACEN NO CUENTA CON STOCK SUFICIENTE");
  $('#nombre_c').val('');
}

if(va==5)
{
  alertify.error("EL ALMACEN NO CUENTA CON STOCK SUFICIENTE");

  $('#nombre_c').val('');

}

if(PE > 0){

  $('#btnGuardar').attr("disabled", false);




  codb=$('#nombre_c').val();
  doc=$("#lista_Pedi option:selected").val();;
  card= $global;
$('#nombre_c').val('');

alertify.success('INSERTADO ');
 $.post("Listar_datos_Scaneados.php", { doc: doc ,card:card,codb:codb },
            function(data1){
          $("#detalle_de_venta2").html(data1);
     
            

          
   
           });

           $.post("Consulta_Nuevos_Registros.php", { doc: doc ,card: card },
            function(data1){
          $("#lista_leidos").html(data1);
     
            
   
           });




  
    }
    
else{
$('#nombre_c').val('');
}
       
}



  


  


);

  

  
 });
});


////////GENERAR EXCEL