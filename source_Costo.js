
$('#modald .modal-header').css({'background-color' : '#FFA500','color' : '#fff',
'border-radius' : '5px 5px 0 0'});

function ModalCosto(){


$(document).ready(function() {

$("#modald").modal({
show:true,
backdrop: 'static',
keyboard: false
});
fechac= $("#fecha").val();
//$("#hora").hide();

//alert(fechac);
//combo de centro de costos
$.post("Listar_PersonalComi.php", {fechac:fechac,Sinasig:'A'},
function(data1){

$("#lista_Personal").html(data1);
$('#esca').DataTable(); 


});

$.post("Listar_PersonalCCosto.php", {},
function(data2){

$("#lista_CCOSTO2").html(data2);
$(".select2").select2();


});         
var ccost=$("#lista_CCOSTO2 option:selected").val();
turn=$("#IdTurno option:selected").val();

      $.post("Listar_PersonalComi_FePrin.php", {fechac:fechac,ccost:ccost,turn:turn},
      function(data1){
        $("#tabla_Costo").html(data1);
      });
});
}
/*******************************FECHA DE BUSQUEDA**************************************/


      $("#fecha").on('changeDate',  function() {

        fechac= $("#fecha").val();
      var ccost=$("#lista_CCOSTO2 option:selected").val();
      turn=$("#IdTurno option:selected").val();

            $.post("Listar_PersonalComi_FePrin.php", {fechac:fechac,ccost:ccost,turn:turn},
            function(data1){
     
                $("#tabla_Costo").html(data1);
              //  $('#cosp').DataTable(); 
             
                $.post("Listar_PersonalComi.php", {fechac:fechac,Sinasig:'A'},
                function(data2){
         
                    $("#lista_Personal").html(data2);
                    $('#esca').DataTable(); 
                  });

          });

    
       
     }); 
    
   

/*******************************funcion clik de los chekbox**************************************/


CONTA = 0;
     $( document ).on( 'click', '#che', function(){


      ccosto=$("#lista_CCOSTO2 option:selected").val();
      turno=$("#IdTurno option:selected").val();
     if(ccosto=='-1'){
       alertify.error('Selecionar un Centro de Costos');
      }else{

        if(turno=='1'){
          alertify.error('Selecionar un Turno');
         }else{


      //Revisa en que status está el checkbox y controlalo según lo //desees
      if( $( this ).is( ':checked' ) ){


CONTA ++;
  
     DNI =  $(this).parents("tr").find("td").eq(1).text();
     TRABAJADOR =  $(this).parents("tr").find("td").eq(2).text();
     ID =  $(this).parents("tr").find("td").eq(3).text();
     ccost=$("#lista_CCOSTO2 option:selected").val();
     turn=$("#IdTurno option:selected").val();
     fechac= $("#fecha").val();

     $.post("validarUltinmo_regis.php", {fechac:fechac},
        function(data2){
    $fecha=data2;
   //+ alert($fecha);
if ($fecha == 0)

{ 
  $.post("validarTurno_regis.php", {fechac:fechac,turn:turn,id:ID},
  function(data3){
    $tur=data3;
    //alert($tur);
    if ($tur == 1)
    { 
      $("#tabla_Costo > tbody " ).append("<tr><td style='text-align: center;'><input class='CheckedAK' type='checkbox' id='chet' val='chet'  checked disabled ></td> <td class='center'>"+DNI+"</td><td class='center'>"+TRABAJADOR+"</td><td class='center'>"+ccost+"</td></td><td class='center'>"+turn+"</td><td class='center' style='display:none'>"+ID+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
  
    }else{ 
      alertify.error('El usuario ya cuenta con un Turno');
    }
  });


 
}else{   
 alertify.error('hay '+ $fecha+ '. ');
      //i++;
  }

 });

     



//var miCheckbox = document.getElementById('#chet').checked;
//alert(miCheckbox);
//var r=0;
//$(".CheckedAK:checked").each(function(){

  //dniT= $(this).parents("tr").find("td").eq(1).text().trim();

  //if(dniT==DNI){
    

    
    //alert("igual");
//r++;
 //    }
 // /   else
     //{
 /// alert("diferente");
      
  
  
    //}//
  //  alert(0);

 

//});

//if(r==0)
//{
  //alert("ingresa");
  //$("#tabla_Costo > tbody " ).append("<tr><td style='text-align: center;'><input class='CheckedAK' type='checkbox' id='chet' val='chet' checked></td> <td class='center'>"+DNI+"</td><td class='center'>"+TRABAJADOR+"</td><td class='center'>"+ccost+"</td></td><td class='center'>"+turn+"</td<td class='center' style='display:none'>"+ID+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
  
//}
//else{
//alert("ingreso¡")
//}



      }

          /*************************************QUITAR ITEM DE LA OTRA LISTA*****************************************************/
      else{
        CONTA --;
        
     DNIE =  $(this).parents("tr").find("td").eq(1).text();
        $(".CheckedAK:checked").each(function(){
        dniR= $(this).parents("tr").find("td").eq(1).text().trim();

  if(dniR==DNIE){

    var parent = $(this).parents().parents().get(0);
  
    $(parent).remove();
    
 
     }
     else
     {
 // alert("diferente");

  
  
    }

  });








   
      }
    }  }
    });
    /*************************************QUITAR ITEM LISTA*****************************************************/


//eliminnar registrros SELECIONADOS 


$(function(){
  // Evento que selecciona la fila y la elimina
 $(document).on("click",".delete",function(){
   
  event.preventDefault();
   var s=$(this);
  id =  $(this).parents("tr").find("td").eq(6).text();

//alert(id);

      alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


       $(s).closest('tr').remove();
     // $(parent).remove();
    Eliminar_Item_CCOSTO(id);
      //alert(parent);
    }, function(){ alertify.error('Cancelado')});
       })
       
      
 
});

//eliminnar registrros SELECIONADOS 

function Eliminar_Item_CCOSTO(id){
  var proc=id
if(proc === " Eliminar")
{
  alertify.success('Eliminado Local') 
}else{
  fechac= $("#fecha").val();

  sede=$("#Idsede option:selected").val();

  $(document).ready(function() {
  //alert(id);
      $.post("Eliminar_Ccosto_perso.php", {id:id}, 
                   function(data){
      
      
                     
                alertify.success('Eliminado') 
                $.post("Listar_PersonalComi.php", {fechac:fechac,Sinasig:'A'},
                function(data1){
                
                $("#lista_Personal").html(data1);
                $('#esca').DataTable(); 
                
                
                });
                     }); 
                }) ;
}
}






   /*************************************Filtrar por centro de costo *****************************************************/
   $(document).ready(function(){

    $("#lista_CCOSTO2").on('change',  function () {
        $("#lista_CCOSTO2 option:selected").each(function () {
          ccost=$(this).val();
    
            fechac= $("#fecha").val();

    //   $('#btnLeer').attr("disabled", true);


    turn=$("#IdTurno option:selected").val();

    $.post("Listar_PersonalComi_FePrin.php", {fechac:fechac,ccost:ccost,turn:turn},
    function(data1){

        $("#tabla_Costo").html(data1);
       // $('#cos').DataTable(); 
     
     

  });
  




        });
   });
});
   /*************************************Filtrar por turno *****************************************************/
   $(document).ready(function(){

    $("#IdTurno").on('change',  function () {
        $("#IdTurno option:selected").each(function () {
            turn=$(this).val();

            fechac= $("#fecha").val();

    //   $('#btnLeer').attr("disabled", true);

    ccost=$("#lista_CCOSTO2 option:selected").val();

    $.post("Listar_PersonalComi_FePrin.php", {fechac:fechac,ccost:ccost,turn:turn},
    function(data1){

        $("#tabla_Costo").html(data1);
        //$('#cos').DataTable(); 
     
     

  });
  




        });
   });
});



   /*************************************Insertar a la base *****************************************************/
   

   function GuardarCosto(){

  //    valor=$('.icheckbox_flat-green').attr('aria-checked') ;
  
 
 fechacos=$("#fecha").val();
 ccosto=$("#lista_CCOSTO2 option:selected").val();
 turno=$("#IdTurno option:selected").val();



 $(".CheckedAK:checked").each(function(){

    $DNII= $(this).parents("tr").find("td").eq(1).text().trim();
  
     $TRABAJ= $(this).parents("tr").find("td").eq(2).text().trim();
     
       $idIN= $(this).parents("tr").find("td").eq(5).text().trim();
  

     //  if( valor == 'true') {
       horaini= $('#hini').val();
       horafin= $('#hfin').val();
       if( horaini == '') {
        alertify.error('Ingrese una hora de Inicio')

      }if( horafin == ''){
      alertify.error('Ingrese una hora de Fin')
    }else {
 
        $.post("Insertar_TrabajadorCCOSTO.php", {DNII:$DNII,TRABAJ:$TRABAJ,idIN:$idIN,fechacos:fechacos,ccosto:ccosto,turno:turno,horaimi:horaini,horafin:horafin,statuhor:'2'},
        function(data2){


       });
       swal(
        "Su Guia fue Generada",
        "Cargando...",
         "success",
        2000,
    
    );

    
  setTimeout('location.reload()',2000);
      }
 

  
  
  });


  //setTimeout('location.reload()',2000);





 

 }


 ///actividad de los check ichek




 $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifChecked', function(event){


  fechac= $("#fecha").val();
  //$("#hora").hide();
  
  //alert(fechac);
  //combo de centro de costos
  $.post("Listar_PersonalComi.php", {fechac:fechac,Sinasig:'B'},
  function(data1){
  
  $("#lista_Personal").html(data1);
  $('#esca').DataTable(); 
  
  
  });
  ccost=$("#lista_CCOSTO2 option:selected").val();
    
  fechac= $("#fecha").val();

//   $('#btnLeer').attr("disabled", true);


turn=$("#IdTurno option:selected").val();

$.post("Listar_PersonalComi_FePrin.php", {fechac:fechac,ccost:ccost,turn:turn},
function(data1){

$("#tabla_Costo").html(data1);
// $('#cos').DataTable(); 



});



});

  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifUnchecked', function(event){
    fechac= $("#fecha").val();
    
    $.post("Listar_PersonalComi.php", {fechac:fechac,Sinasig:'A'},
    function(data1){
    
    $("#lista_Personal").html(data1);
    $('#esca').DataTable(); 
    
    
    });

    ccost=$("#lista_CCOSTO2 option:selected").val();
    
    fechac= $("#fecha").val();
  
  //   $('#btnLeer').attr("disabled", true);
  
  
  turn=$("#IdTurno option:selected").val();
  
  $.post("Listar_PersonalComi_FePrin.php", {fechac:fechac,ccost:ccost,turn:turn},
  function(data1){
  
  $("#tabla_Costo").html(data1);
  // $('#cos').DataTable(); 
  
  
  
  });
});

  /////reporte de rrhh 

  /*******************************FECHA DE BUSQUEDA**************************************/

function fecha_Reporte_Asistencia(){
  $(document).ready(function(){
    $.ajax({
      beforeSend: function(){
         $("#pone_fecha").html("Poniendo opciones...");
       },
      url: 'Mostrar_ReporteORDEFabri.php',
      type: 'POST',
      data: 'option='+1,
      success: function(res){
        $("#pone_fecha").html(res);
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
        $("#pone_fecha").hmtl(estado+"     "+error);
       }
     });
  })
}


/*******************************Buscar las ordesnes de producion**************************************/


  function  ReorteOP(){
      $(document).ready(function(){
        if($("#fi").val()!=""||$("#ff").val()!=""){
        $.ajax({
            beforeSend: function(){
               $("#data").html("Buscando ODP CERRADAS, un momento...");
             },
            
            url: 'Listar_Report_Asisten.php',
            type: 'POST',
            data: 'fechai='+$("#fi").val()+
            '&fechaf='+$("#ff").val()+
            '&sed='+$("#sed option:selected").val(),
          
            success: function(data2){
               
      
            $("#lista_Repor_OP").html(data2);
               $('#tbpr').DataTable(); 
            },
            error: function(jqXHR,estado,error){
              alert("Hubor un error al buscar las ODP CERRADAS...por favor reporte a soporte...!");
              $("#tbpr").hmtl(estado+"     "+error);
             }
           });
           }else{
            alertify.error("Selecciona un rango de fechas para poder continuar...!");
      }
      })
      }

   