///////////////////////buqueda de recibo
  function ListarOrdenProduc_PROFIL(){
  
   

   $(document).ready(function() {

          $.ajax({
          beforeSend: function(){
       
            $("#lista_EMISION").html("Recuperando Correlativo...");
           },
          url: 'Lista_ODP_PROFIL.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#lista_EMISION").html(x);
                
  $('#esca').DataTable(); 
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }

