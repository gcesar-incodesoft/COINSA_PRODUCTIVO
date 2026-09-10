function genera_opcion(){
  $(document).ready(function(){
    $.ajax({
      beforeSend: function(){
         $("#pone_opcion").html("Poniendo opciones...");
       },
      url: 'Mostrar_DatosRecibo_Fecha.php',
      type: 'POST',
      data: 'option='+1,
      success: function(res){
        $("#pone_opcion").html(res);
           $(function(){
            $('#daterange-btn').daterangepicker(
                {
              ranges: {
             'Este dia': [moment(), moment()],
             'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
             'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
             'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
             'Este mes': [moment().startOf('month'), moment().endOf('month')],
             'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
             startDate: moment().subtract(29, 'days'),
             endDate: moment()
           },
     function (start, end) {
       $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
       var xstart=start.format('YYYY-MM-DD');
       var xend=end.format('YYYY-MM-DD');
       $("#fi").val(xstart);
       $("#ff").val(xend);
       //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
      }
     );
    });
     $("#numero_caja").select2();
     $("#numero_ticket").inputmask('mask',{'alias':'numeric','autogroup':true,'digits':0,'digitsOptional': false});
       },
      error: function(jqXHR,estado,error){
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado+"     "+error);
       }
     });
  })
}
/*********************************************************************/

/*********************************************************************/
function busca_ReciboProduc(){
$(document).ready(function(){
  if($("#fi").val()!=""||$("#ff").val()!=""){
  $.ajax({
      beforeSend: function(){
         $("#data").html("Buscando las ventas, un momento...");
       },
      url: 'Buscar_Recibo_OrdenProduccion.php',
      type: 'POST',
      data: 'fechai='+$("#fi").val()+
      '&fechaf='+$("#ff").val(),
      success: function(x){
         
      $("#data").html(x);
         $('#tabla').DataTable(); 

      },
      error: function(jqXHR,estado,error){
        alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
        $("#data").hmtl(estado+"     "+error);
       }
     });
     }else{
   alert("Selecciona un rango de fechas para poder continuar...!");
}
})
}

///// FECHAS PARA BUSCAR EN ODP CERRADAS

function genera_ODP_CERRADA(){
$(document).ready(function(){
 $.ajax({
   beforeSend: function(){
      $("#pone_opcion").html("Poniendo opciones...");
    },
   url: 'MOSTRAR_DATOSODP_CFECHA.php',
   type: 'POST',
   data: 'option='+1,
   success: function(res){
     $("#pone_opcion").html(res);
        $(function(){
         $('#daterange-btn').daterangepicker(
             {
           ranges: {
          'Este dia': [moment(), moment()],
          'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
          'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
          'Este mes': [moment().startOf('month'), moment().endOf('month')],
          'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
           },
          startDate: moment().subtract(29, 'days'),
          endDate: moment()
        },
  function (start, end) {
    $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    var xstart=start.format('YYYY-MM-DD');
    var xend=end.format('YYYY-MM-DD');
    $("#fi").val(xstart);
    $("#ff").val(xend);
    //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
   }
  );
 });
  $("#numero_caja").select2();
  $("#numero_ticket").inputmask('mask',{'alias':'numeric','autogroup':true,'digits':0,'digitsOptional': false});
    },
   error: function(jqXHR,estado,error){
     alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
     $("#pone_opcion").hmtl(estado+"     "+error);
    }
  });
})
}


/***********************BUSCAR ODP CERRADAS *********************************************/
function busca_ODP_CERRADAS(){
$(document).ready(function(){
  if($("#fi").val()!=""||$("#ff").val()!=""){
  $.ajax({
      beforeSend: function(){
         $("#datace").html("Buscando ODP CERRADAS, un momento...");
       },
      url: 'BUSCAR_ODP_CERRADAS.php',
      type: 'POST',
      data: 'fechai='+$("#fi").val()+
      '&fechaf='+$("#ff").val(),
      success: function(x){
         
      $("#datace").html(x);
         $('#tb2').DataTable(); 

      },
      error: function(jqXHR,estado,error){
        alert("Hubor un error al buscar las ODP CERRADAS...por favor reporte a soporte...!");
        $("#datace").hmtl(estado+"     "+error);
       }
     });
     }else{
   alert("Selecciona un rango de fechas para poder continuar...!");
}
})
}


///// FECHAS PARA BUSCAR EN ODP mauyqinas

function genera_ODP_TELAR(){
$(document).ready(function(){
 $.ajax({
   beforeSend: function(){
      $("#pone_opcion").html("Poniendo opciones...");
    },
   url: 'MOSTRAR_DATOSODP_CFECHA_TE.php',
   type: 'POST',
   data: 'option='+1,
   success: function(res){
     $("#pone_opcion").html(res);
        $(function(){
         $('#daterange-btn').daterangepicker(
             {
           ranges: {
          'Este dia': [moment(), moment()],
          'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
          'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
          'Este mes': [moment().startOf('month'), moment().endOf('month')],
          'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
           },
          startDate: moment().subtract(29, 'days'),
          endDate: moment()
        },
  function (start, end) {
    $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    var xstart=start.format('YYYY-MM-DD');
    var xend=end.format('YYYY-MM-DD');
    $("#fi").val(xstart);
    $("#ff").val(xend);
    //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
   }
  );
 });
  $("#numero_caja").select2();
  $("#numero_ticket").inputmask('mask',{'alias':'numeric','autogroup':true,'digits':0,'digitsOptional': false});
    },
   error: function(jqXHR,estado,error){
     alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
     $("#pone_opcion").hmtl(estado+"     "+error);
    }
  });
})
}


/***********************BUSCAR ODP CERRADAS *********************************************/
function BUSCA_ODP_TELAR(){
$(document).ready(function(){
  if($("#fi").val()!=""||$("#ff").val()!=""){
  $.ajax({
      beforeSend: function(){
         $("#data").html("Buscando ODP CERRADAS, un momento...");
       },
      url: 'BUSCAR_ODP_TELAR.php',
      type: 'POST',
      data: 'fechai='+$("#fi").val()+
      '&fechaf='+$("#ff").val(),
      success: function(x){
         
      $("#data").html(x);
         $('#tabla').DataTable(); 

      },
      error: function(jqXHR,estado,error){
        alert("Hubor un error al buscar las ODP CERRADAS...por favor reporte a soporte...!");
        $("#data").hmtl(estado+"     "+error);
       }
     });
     }else{
   alert("Selecciona un rango de fechas para poder continuar...!");
}
})
}

///DETALLE DE ORDENES CERRADAS


function DetalleCerradas(id){



 
 $.post("Consultar_Detalle_Cerrados.php", { id: id},
           function(data1){
            
             va = data1

if(va==2)
{
 alertify.error('La orden no cuenta con ningun registro');

}
else
{
$("#modal_Componentes_Producion").modal("show");
         $("#lista_OrdenEmision").html(data1);
    


       }
          });

          


}
function DetalleConsumo(id){




 
 $.post("Consultar_Detalle_Consumo.php", { id: id },
           function(data1){
            
             va = data1

if(va==2)
{
 alertify.error('La orden no cuenta con ningun registro');

}
else
{
$("#modal_Componentes_Producion").modal("show");
         $("#lista_OrdenEmision").html(data1);
         $.post("Consultar_Detalle_Consumo_Diferencias.php", { id: id },
           function(data2){
         $("#lista_OrdenEmision2").html(data2);
       });
           
        // $.post("Consultar_Detalle_Consumo_Real.php", { id: id },
         //  function(data){
          //   $("#lista_DetalleReal").html(data);
           //  
           //});


       }
          });

          


}
function DetalleConsumo_Telar(id){




fechai=$("#fi").val();
fechaf=$("#ff").val();
 

 
 $.post("Consulta_Detalle_telar.php", { id: id,fechai:fechai,fechaf:fechaf },
           function(data1){
            
             va = data1

if(va==2)
{
 alertify.error('La orden no cuenta con ningun registro');

}
else
{
$("#modal_Componentes_Producion").modal("show");
         $("#lista_OrdenEmision").html(data1);
                      
        // $.post("Consultar_Detalle_Consumo_Real.php", { id: id },
         //  function(data){
          //   $("#lista_DetalleReal").html(data);
           //  
           //});


       }
          });

          


}