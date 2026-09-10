

function LEERPRODUC(){


    $("#modal_Pistoleo").modal({
        show:true,
        backdrop: 'static',
        keyboard: false
     });
     
  }


  
    // cuando el modal se muestre
$('#modal_Pistoleo').on('shown.bs.modal', function() {
    $('#nombre_c').val('');
       $('#nombre_c').focus();
      
  
       
  })
  



//esta function se activa cuando dan enter en la pistola


$(document).ready(function(){

    $("#nombre_c").on('keypress',  function (e) {
       if(e.which == 13) {

        
      codbar=$('#nombre_c').val();

      $.post("consultar_codebars.php", { codbar:codbar }, 

      function(data){

        $("#detalle_producto").html(data);

        $('#nombre_c').val('');
        $('#nombre_c').focus();
      }
      );


       }
    
   
       


    
    });
});