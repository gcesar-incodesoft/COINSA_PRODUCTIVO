function lista_Lectura_Temporal(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#pone_clientes").html("Recuperando proveedores...");
           },
          url: 'Consulta_Temporal.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#lista_leidos").html(x);
         
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }

      ///detalle de lectura temporal
      function Consultar_Det_Temporal(id,user){
      
            var itemco= id;
            user= user;
       
           

            $itemglo=itemco;
            $userglo=user;
                

         
     
         $(document).ready(function() {
            $('#modal_CODIGOS').modal('show');



$.post("Listar_Detalle_Lectura_Temporal.php", {user:user,item:itemco}, 
             function(data){

          $("#lista_scaneo").html(data);
               }); 
          }) ;
}   
///eliminar detalle
///////////// eliminar items del modal 
function Eliminar_Item_Lectura_Tem(id){
            var id2= id;


 alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  Eliminar_Item_Lectura(id2);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}
//eliminnar registrros scaneados

    function Eliminar_Item_Lectura(id){
            var id= id;
            var item= $itemglo;
            var user =$userglo;
              
   $(document).ready(function() {

     
$.post("Eliminar_Items_LecturaTem.php", 
  {id:id,item:item,user:user}, 
             function(data){

            $("#lista_scaneo").html(data);
              
     
$.post("Consulta_Temporal.php", 
  {}, 
      function(data){

            $("#lista_leidos").html(data);
              
             }); 
             
                   }); 


               }) ;

   

}

///eliminar LECTURAS TEMPORAL
///////////// eliminar items del modal 
function Eliminar_Lectura_Tem(id,user){
            var id2= id;
               var user= user;

 alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  Eliminar_Lectura(id2,user);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}
//eliminnar registrros scaneados

    function Eliminar_Lectura(id,user){
            var item= id;
         
            var user =user;
              
   $(document).ready(function() {

     
$.post("Eliminar_LecturaTem.php", 
  {item:item,user:user}, 
             function(data){

            $("#lista_leidos").html(data);
               }); 
          }) ;

   

}