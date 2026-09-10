function genera_fecha(){
  $(document).ready(function(){
    $.ajax({
      beforeSend: function(){
         $("#pone_opcion").html("Poniendo opciones...");
       },
      url: 'Mostrar_ReporteFechaGeneral.php',
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

/*******************************lista_Trabajadores*************************************/

function ListarTrabajadores(){

  //  lista_Trabajadores
  $.post("Listar_TrabajadoresCosto.php", {},
  function(data2){

      $("#lista_Trabajadores").html(data2);
      $(".select2").select2();


 });         

}

/*******************************Buscas los centros de costo activados************************************/


function COMISIONES_PAGADAS(){

  if($("#fi").val()!=""||$("#ff").val()!=""){

    fechai= $("#fi").val();
    fechaf= $("#ff").val();
    trabaja=$("#lista_Trabajadores option:selected").val();
    sede=$("#Idsede  option:selected").val();
    $.post("Listar_PersonalCcosto_Mes.php", {fechai:fechai,fechaf:fechaf,trabaja:trabaja,sede:sede},
    function(data2){

        $("#lista_Personalccos").html(data2);
        $('#esca').DataTable(); 
      });
    }else{
      alertify.error("Selecciona un rango de fechas para poder continuar...!");
   }
}

//generar excel

 function Gexof(){
  if($("#fi").val()!=""||$("#ff").val()!=""){
  fechai= $("#fi").val();
  fechaf= $("#ff").val();
  trabaja=$("#lista_Trabajadores option:selected").val();
  sede=$("#Idsede  option:selected").val();

 javascript:window.open('Rerpote_C.COSTO_Excel.php?fechai='+fechai+'&fechaf='+fechaf+'&trabaja='+trabaja+'&sede='+sede+'');
}else{
  alertify.error("Selecciona un rango de fechas para poder continuar...!");
}
};
