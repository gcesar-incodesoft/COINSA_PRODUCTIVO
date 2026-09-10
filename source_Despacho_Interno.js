function lista_Pedidos_Internos(){

         $(document).ready(function() {

 

          $.ajax({
          beforeSend: function(){
            $("#cod_interno").html("Recuperando proveedores...");
           },
          url: 'Listar_NumeroTraslado.php',
          type: 'POST',
          data: null,
          success: function(x){
   
            $("#cod_interno").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
//ELIMINA LOS PRODUCTOS SCANEADOS

/////////////////////////////////////////////////         
  function eliminar_Regist_Sca_Inter(id,code){
            var id2= id;
           var doc=code;
          

            alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  eliminar_Regist(id2,doc);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}
//eliminnar registrros scaneados

    function eliminar_Regist(id,doc){
            var item= id;
           var doc1=doc;
     
 

   $(document).ready(function() {
    
$.post("Eliminar_Pedido_Scaneado_Interno.php", {doc1:doc,item:item}, 
             function(data){

          $("#lista_leidos").html(data);
               
 


               }); 
          }) ;

   

}
//CONSULTA LOS PRODUCTOS SCANEADOS
////
function Consultar_Regist_Sca_Inter(id,doc){
          var doc= doc;
            var itemco= id;
           $doce=doc;
            $item=id;
         
     
         $(document).ready(function() {
            $('#modal_CODIGOS').modal('show');



$.post("Listar_Detalle_Pedido_Interno.php", {doc:doc,item:itemco}, 
             function(data){

          $("#lista_scaneo").html(data);
               }); 
          }) ;
}
///consultar
///////////// eliminar items del modal 
function Eliminar_Item_Sca_INTER(id){
            var id2= id;


 alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  Eliminar_Item_Sca(id2);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}
//eliminnar registrros scaneados

    function Eliminar_Item_Sca(id){
            var id= id;
              var item =$item;
             var doc = $doce;
   $(document).ready(function() {

     
$.post("Eliminar_Items_Scaneado_Interno.php", {id:id,item:item,doc:doc}, 
             function(data){

          $("#lista_scaneo").html(data);
              
  $.post("Consulta_Nuevos_Registros_Internos.php", { doc: doc },
          function(data1){
            $("#lista_leidos").html(data1);
       
              
     
             });
               }); 


          }) ;

   

}

 /////////////////////////
 //LISTA ALMACEN        
/////////////////////////
function lista_Almacenes_Internos(){
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


///////busca pesos registrados para esas soliocitudes

///evento chekc activado

$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifChecked', function(event){
  
  $('#bdproduc').hide();

  $('#bdproduc2').show();


});


///evento chekc desactivado
$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifUnchecked', function(event){
  

  $('#bdproduc2').hide();
  $('#bdproduc').show();


  
  
  });



  //////buscar productos sin codigo de barra
  function buscar_produc(){


    docen=$("#cod_interno option:selected").val();


    if(docen=="Selecione un N° Traslado"){
      alertify.error('Seleccione un traslado')
      }else{
 
        $('#modal_busqueda').modal('show');
        $.post("motrar_productos.php", { docen: docen },
        function(data1){
          $("#lista_articulos").html(data1);
     
            
    
           });
      }
 



  };

  function add_art(id,line,pendiente){
    $('#modal_busqueda_arts2').modal('show');
    
    Lista_almacenOrigbe();

    busca_articulo2(id,line,pendiente);
  };





  
    //////////////listar alamacenes
    
    function Lista_almacenOrigbe(){

        
      idOri= $("#idOri option:selected").val();

      $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#Lista_Almacenes").html("Recuperando Lista ...");
           },
          url: 'Lista_Almacen_Despacho.php',
          type: 'POST',
       
          success: function(x){
            $("#AORIGI").html(x);
           //  $("#pone_ccosto2").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
  }


    /************************************************************************************/
    function busca_articulo2(id,line,pendiente){

              $(document).ready(function(){
                         
    
   

    
  
           $.ajax({
           beforeSend: function(){
             $("#data_articulo").html("Buscando informacion del articulo...");
            },
           url: 'busca_data_articulo_traslado.php',
           dataType: 'json',
           type: 'POST',
           data: 

                {id: id, 
                 line: line,
     
      },
   
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
         ;

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
      
              var stocklimpi = document.getElementById("stock");

              stocklimpi.value ="";  
              var stockpen = document.getElementById("cantidadpe");

              stockpen.value=pendiente  ;
         // document.getElementById("cantidadpe").val(pendiente);
              $("#nguia").val(data[0].LN);
                $("#nguia").hide();
              $("#cantidad").attr("disabled", false);
                 $("#preciou").val(0.00);
          
                 $("#codigo").val(data[0].code);
                 $("#articulo_desc").val(data[0].descripcion);
                 $("#UMCompras").val(data[0].UMCompra);
         
    
        
            // $("#dsctoline").attr("disabled", false);
          
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
         
     
          }
  
  
  //////Mostrar  CLientes con pedidos

$(document).ready(function(){

  $("#AORIGI").on('change',  function () { 
      $("#AORIGI option:selected").each(function () {
          elegido=$(this).val();         
        cod= $("#codigo").val().trim();
  
         $.post("consultar_stockalmacen.php", { card: elegido,cod:cod },
            function(data2){
        

          var inputNombre = document.getElementById("stock");

          inputNombre.value =data2.trim();  


           });

       
      });
 });
});


///INSERTAR EN LA BD DE LECTURA

function agrega_a_lista2(){
  docen=$("#cod_interno option:selected").val();
  docnum=$("#cod_interno option:selected").text().trim();
  codigo=$("#codigo").val();
  descr=$("#articulo_desc").val();
  
  line=$("#nguia").val();
   stock=$("#stock").val().trim();
   can=$("#cantidad").val().trim();
   almacen=$("#AORIGI option:selected").val()
   canpe=$("#cantidadpe").val().trim();
   cantidadfaltan=canpe-can;
stocktotal=stock-can;

   if(almacen =='Selecione un Almacen'){
    alertify.error('Selecione un almacen')

   }
   else{
    if(can== '')
    {
      alertify.error('Asigne una cantidad')

    }
    else{

  

      if (stocktotal >= 0)
   {  
    if (cantidadfaltan >= 0)
   {  
    $.post("Insertar_TemporalManual_Despacho_Interno.php", {docen:docen,docnum:docnum,codigo:codigo,descr:descr,line:line,can:can,almacen:almacen}, 

    function(data){
     $.post("Consulta_Nuevos_Registros_Internos.php", {docen:docen}, 
 
     function(data2){
       $("#lista_leidos").html(data2);
     });
 
  
     alertify.success('Insertado');
     $('#modal_busqueda_arts2').modal('hide');
 
     $('#modal_busqueda_arts').modal('hide');
    });
  }else{
    
    
alertify.error('La cantidad no puede ser mayor del pedido')
  }
   }else{

    
alertify.error('No cuenta con suficiente stock en su almacen')
 

   



   }
  } }

}

////cancelar el insercion
function cancela_codigo2(){

  $('#modal_busqueda_arts2').modal('hide');


}



/////////abrir modal para pistolear los productos a depechar
//BOTON LEER
$(document).ready(function(){

  $("#btnLeer").on('click',  function () {


         

  Almacen =$("#lista_Almacen option:selected").val();


  codigo =$("#cod_interno option:selected").val();

if(Almacen === "Selecione un Almacen") {
alertify.error('Selecione un Almacen');

}

else if(codigo ===  undefined) {
alertify.error('Selecione un Codigo');

}
else if(codigo ===  "Selecione N° de Documento") {
alertify.error('Selecione un Codigo');

}


else{
     

          $("#modal_leeer").modal({
            show:true,
            backdrop: 'static',
            keyboard: false
          });
         
              
        } 
});
      
 });


 
// funcion cuando el modal abre 
$('#modal_leeer').on('shown.bs.modal', function() {
  $('#nombre_c').focus();
  DocEnt=$("#cod_interno  option:selected").text();

  document.querySelector('#nom').innerText = DocEnt;
})
