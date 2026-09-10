/////////////////////////
//LISTA los clientes con pedidos       
/////////////////////////
function lista_Pedidos_Despacho(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_cliente").html("Recuperando proveedores...");
      },
     url: 'Lista_Clientes_Pedidos_Despachp.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_cliente").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }

    //combo cliente cuando seleccione
$(document).ready(function(){

    $("#lista_cliente").on('change',  function () {
        $("#lista_cliente option:selected").each(function () {
            elegido=$(this).val();
            $global= elegido;


    //   $('#btnLeer').attr("disabled", true);

            $.post("lista_Pedidos_Despacho_clientes.php", { elegido2: elegido }, 

          function(data){
            $('#lista_Item').html('');
        
                $("#lista_pedidos").html(data);
                     $(".select2").select2();
          
     
             }); 
        });
   });
});


/// listar pedidos

function lista_Pedidos_Despacho2(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_pedidos").html("Recuperando proveedores...");
      },
     url: 'lista_Pedidos_Despacho_clientes.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_pedidos").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }
/// listar almacenes

function lista_Almacenes(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_almacenes").html("Recuperando Almacenes...");
      },
     url: 'Lista_Almacen_Despacho.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_almacenes").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }


    /// abre el modal para leer los codigos de barra 
function leer_codigos(){
    Almacen =$("#lista_pedidos  option:selected").val();
    pedido =$("#lista_almacenes option:selected").val();


    if(Almacen === 'Selecione un Almacen') {
    alertify.error('Selecione un Almacen');
   
    }  if(Almacen === 'Seleccione un Pedido'){

        alertify.error('Selecione un Pedido');

    }
    
    
    else{
   
               $('#modal_leeer').modal('show');
             
   
     }
    }



    // cuando el modal se muestre
$('#modal_leeer').on('shown.bs.modal', function() {
    $('#nombre_c').val('');
       $('#nombre_c').focus();
      
       DocEnt=$("#lista_cliente  option:selected").text();
  
       document.querySelector('#nom').innerText = DocEnt;
  })
  



//esta function se activa cuando dan enter en la pistola


$(document).ready(function(){

    $("#nombre_c").on('keypress',  function (e) {
       if(e.which == 13) {
          // Acciones a realizar, por ej: enviar formulario.
     


      cai=$('#nombre_c').val();
     almace =$("#lista_almacenes option:selected").val();

      DocEnt=$("#lista_pedidos option:selected").val();
      CardCo=   $("#lista_cliente option:selected").val();
    

     // alert(DocEnt);
  
       $.post("Insertar_Despacho_leido.php", { Dentr:DocEnt,Card:CardCo,codb:cai,almace:almace }, 

           function(data){

          


                $("#detalle_de_venta").html(data);

  va = $("#valor").text();

  $('#valor').hide();
  if(va==1)
  {
    alertify.error('El codigo ya fue leido');
$('#nombre_c').val('');
  }

   if(va==2)
  {
 alertify.error('Codigo no encontrado en el pedido o en produccion (Profil)');
 $('#nombre_c').val('');


  }

  if(va==3)
  {
    alertify.error("EL ALMACEN NO CUENTA CON STOCK SUFICIENTE");
    $('#nombre_c').val('');
  }

  if(va==5){

    
    $('#btnGuardar').attr("disabled", false);




    codb=$('#nombre_c').val();

    doc=$("#lista_pedidos option:selected").val();
    card=   $("#lista_cliente option:selected").val();
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


   //combo pedido
   $(document).ready(function(){

    $("#lista_pedidos").on('change',  function () {
        $("#lista_pedidos option:selected").each(function () {
            elegido=$(this).val();



            card=   $("#lista_cliente option:selected").val();
    //   $('#btnLeer').attr("disabled", true);

    $.post("Consulta_Nuevos_Registros.php", { doc: elegido ,card: card },
          function(data){
          
        
            $("#lista_leidos").html(data);
            $('#tabla').DataTable(); 
          
     
             }); 
        });
   });
});
