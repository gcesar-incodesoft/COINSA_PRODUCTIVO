function revisa_Liberado(){
   $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_Procesos").html("Cargando... <img src='dist/img/default.gif'/>")
               },
               url: 'pone_liberar_OrdenProduc.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_Procesos").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_Procesos").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
              }
            });
   })
}


function revisa_Planificado(){
   $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_Planificados").html("Cargando... <img src='dist/img/default.gif'/>")
               },
               url: 'pone_Planificado_OrdenProduc.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_Planificados").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_Planificados").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
              }
            });
   })
}



function revisa_Terminado(){
   $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#pone_Terminado").html("Cargando... <img src='dist/img/default.gif'/>")
               },
               url: 'pone_Terminado_OrdenProduc.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#pone_Terminado").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#pone_Terminado").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
              }
            });
   })
}






