 
   function busqueda_cdba(){
   $("#McodigoBa").modal("show");
   
     $('#componente_buscar').focus();
}



///LISTA N° CORRELATIVO oreden de producion


function Lista_CorrelativoEmision(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#Correlativo").html("Recuperando Correlativo...");
           },
          url: 'Correlativo_OrdenProducion.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#Correlativo").html(x);
  
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
////


function Lista_CorrelativoOrden(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#Correlativo").html("Recuperando Correlativo...");
           },
          url: 'Correlativo_NumeroProducion.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#Numer").html(x);
  
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
///
