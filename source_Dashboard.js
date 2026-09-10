
/***********************************DASHBOARD VENTAS*******************************************/
function DASH_VentasPBI(){
   $(document).ready( function (){
     $.ajax({
               beforeSend: function(){
                 $("#datadash").html("Cargando... <img src='dist/img/default.gif'/>")
               },
               url: 'pone_Dashboard_VentasPBI.php',
               type: 'POST',
               data: null,
               success: function(x){
                 $("#datadash").html(x);
               },
              error: function(jqXHR,estado,error){
                $("#datadash").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
              }
            });
   })
}



/******************************************************************************/


/***********************************DASHBOARD PRODUCCION*******************************************/
function DASH_ProduccionPBI(){
  $(document).ready( function (){
    $.ajax({
              beforeSend: function(){
                $("#datadash").html("Cargando... <img src='dist/img/default.gif'/>")
              },
              url: 'pone_Dashboard_ProduccionPBI.php',
              type: 'POST',
              data: null,
              success: function(x){
                $("#datadash").html(x);
              },
             error: function(jqXHR,estado,error){
               $("#datadash").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
             }
           });
  })
}



/******************************************************************************/

/***********************************DASHBOARD LOGISTICA*******************************************/
function DASH_LogisticaPBI(){
  $(document).ready( function (){
    $.ajax({
              beforeSend: function(){
                $("#datadash").html("Cargando... <img src='dist/img/default.gif'/>")
              },
              url: 'pone_Dashboard_LogisticaPBI.php',
              type: 'POST',
              data: null,
              success: function(x){
                $("#datadash").html(x);
              },
             error: function(jqXHR,estado,error){
               $("#datadash").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
             }
           });
  })
}



/******************************************************************************/


/******************************************************************************/

/***********************************DASHBOARD LOGISTICA*******************************************/
function DASH_FinanzasPBI(){
  $(document).ready( function (){
    $.ajax({
              beforeSend: function(){
                $("#datadash").html("Cargando... <img src='dist/img/default.gif'/>")
              },
              url: 'pone_Dashboard_FinanzasPBI.php',
              type: 'POST',
              data: null,
              success: function(x){
                $("#datadash").html(x);
              },
             error: function(jqXHR,estado,error){
               $("#datadash").html("Ocurrio un error al cargar la informacion de compras..."+estado+"    "+error);
             }
           });
  })
}



/******************************************************************************/