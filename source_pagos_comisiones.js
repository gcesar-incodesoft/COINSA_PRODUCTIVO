/*******************************FECHA DE BUSQUEDA**************************************/

function fecha_pagos_Comisiones(){
  $(document).ready(function(){
    $.ajax({
      beforeSend: function(){
         $("#pone_opcion").html("Poniendo opciones...");
       },
      url: 'Mostrar_PGR_COMISIONES.php',
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

/******************************Busqueda por vendedor ********* */
function lista_vendedores_factura(){
  $(document).ready(function() {
   $.ajax({
   beforeSend: function(){
     $("#IDvendedores").html("Recuperando proveedores...");
    },
   url: 'Listar_vendedores_Comisiones.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#IDvendedores").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
  }

/***********************BUSCAR  comisiones pagadas *********************************************/

function  COMISIONES_PAGADAS(){
  $(document).ready(function(){
    if($("#fi").val()!=""||$("#ff").val()!=""){
    $.ajax({
        beforeSend: function(){
           $("#data").html("Buscando ODP CERRADAS, un momento...");
         },
        url: 'BUSCAR_COMISIONES_PAGADAS.php',
        type: 'POST',
        data: 'fechai='+$("#fi").val()+
        '&fechaf='+$("#ff").val()+
        '&code='+$("#IDvendedores option:selected").val(),
        success: function(x){
           
        $("#data").html(x);
           $('#tb2').DataTable(); 
  
        },
        error: function(jqXHR,estado,error){
          alert("Hubor un error al buscar las ODP CERRADAS...por favor reporte a soporte...!");
          $("#data").hmtl(estado+"     "+error);
         }
       });
       }else{
        alertify.error("Selecciona un rango de fechas para poder continuar...!");
  }
  })
  }
  
/***********************Ver Detalle de las comisiones *********************************************/

  function  Consultar_Detalle_ComiPaga(id){

    var idca= id;

    $iddet= idca;
    
    
   
    $(document).ready(function() {
       // document.getElementById("num_fix").value = num_ficha;
       $('#modal_detalle_comipago').modal('show');
       $('.modal_detalle_comipago').on('shown.bs.modal',function(){      //correct here use 'shown.bs.modal' event which comes in bootstrap3
           $(this).find('iframe').attr('src','reporte_detpago_Comi.php?iddetalle='+$iddet)
       })
       $("#navegador2").on('click', function() {
        
       // window.open('reporte_detpago_Comi.php?iddetalle='+$iddet'');
        javascript:window.open('reporte_detpago_Comi.php?iddetalle='+$iddet+'');
         // window.open.re= 'reporte_detpago_Comi.php?iddetalle='+$iddet
       });
    });



  }