//ABRIR MODAL DE LECTURA
 
$(document).ready(function(){

    $("#btnLeer").on('click',  function () {
       
            $('#modal_leeer').modal('show');
        
                  

        
   });

});

// AL ABRIR el modal mostrar el focus en el div
$('#modal_leeer').on('shown.bs.modal', function() {
    $('#nombre_c').focus();
})





//registar con el boton enter 

$(document).ready(function(){

    $("#nombre_c").on('keypress',  function (e) {
       if(e.which == 13) {
          // Acciones a realizar, por ej: enviar formulario.
        
      cai=$(this).val();
   
      placa=$('#nplaca').val();
      encargado=$("#lista_Encargado option:selected").val().trim();

       $.post("Insertar_SeguridaTemp.php", {codb:cai,placa:placa,encargado:encargado }, 

           function(data){

          $('#nombre_c').val('');
 $("#detalle_de_venta").html(data);
  va = $("#valor").text();
  $('#valor').hide();
  if(va==1)
  {
    alertify.error('El codigo ya fue leido');

  }

   if(va==2)
  {
 alertify.success('El codigo no existe');

  }
  if(va==3)
  {
  alert("El codigo no pertenece al producto");
  }
if(va==8)
  {
   alertify.error("El codigo no pertenece  a ningun producto");
  }

   if(va==5){
  

 // val=$("#tpeso").text();
   $('#Peso').hide();

            alertify.success('INSERTADO UN PRODUCTO');

           $.post("Consulta_TemVseguridad.php", { },
             function(data1){
           $("#lista_leidos").html(data1);
                   
     
            });
          //contador leido temporal

        cantsca= $("#catida").text();
        contador=parseInt(cantsca)+1;

        document.querySelector('#catida').innerText = contador;
     
 
         
        
        pesopro=$("#pesod").text();
        pesolei=$("#Peso").text();
        pesotempo=parseFloat(pesopro) + parseFloat(pesolei);
  pesoleis = Number(pesotempo.toFixed(2));
          document.querySelector('#pesod').innerText = pesoleis;
}
else{

}
         

}


    


);

       };
   });
});




///// FUNCION CON BOTON CLICK

$(document).ready(function(){

    $("#btnProcesa").on('click',  function (e) {
       
          // Acciones a realizar, por ej: enviar formulario.
        
           // Acciones a realizar, por ej: enviar formulario.
        
        cai=$('#nombre_c').val();
   
      
        placa=$('#nplaca').val();
        IdEncargado=$("#lista_Encargado option:selected").val().trim();

        $.post("Insertar_SeguridaTemp.php", {codb:cai,placa:placa,IdEncargado:IdEncargado }, 
 
           function(data){

          $('#nombre_c').val('');
 $("#detalle_de_venta").html(data);
  va = $("#valor").text();
  $('#valor').hide();
  if(va==1)
  {
    alertify.success('El codigo ya fue leido');

  }

   if(va==2)
  {
 alertify.success('El codigo no existe');

  }
  if(va==3)
  {
 alertify.error("El codigo no pertenece al producto");
  }

 if(va==8)
  {
   alertify.error("El codigo no pertenece  a ningun producto");
  }
   if(va==5){
  

 // val=$("#tpeso").text();
   $('#Peso').hide();

            alertify.success('INSERTADO UN PRODUCTO');

           $.post("Consulta_TemVseguridad.php", {placa:placa },
             function(data1){
           $("#lista_leidos").html(data1);
                   
     
            });
          //contador leido temporal

        cantsca= $("#catida").text();
        contador=parseInt(cantsca)+1;

        document.querySelector('#catida').innerText = contador;
     
 
         
        
        pesopro=$("#pesod").text();
        pesolei=$("#Peso").text();
        pesotempo=parseFloat(pesopro) + parseFloat(pesolei);
  pesoleis = Number(pesotempo.toFixed(2));
          document.querySelector('#pesod').innerText = pesoleis;
}
else{

}
         

}


    


);

   });
});


/////////listar Encargados

function lista_Encargados(){
  $(document).ready(function() {
    
   $.ajax({
   beforeSend: function(){
     $("#lista_Encargado").html("Recuperando proveedores...");
    },
   url: 'Lista_Encargado_seguridad.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#lista_Encargado").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
  }

/////////listar placas 

function lista_placas(){
  $(document).ready(function() {
    $("#habi").hide();
    $("#gene").hide();


   $.ajax({
   beforeSend: function(){
     $("#lista_Placas").html("Recuperando proveedores...");
    },
   url: 'Lista_Placa_seguridad.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#lista_Placas").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
  }
  
  
  /////////listar Guias Emitidas del dia de hoy


  $("#lista_Placas").on('change',  function () {
    $("#lista_Placas option:selected").each(function () {
        elegido=$(this).val();
        $global= elegido;


//   $('#btnLeer').attr("disabled", true);

        $.post("lista_Nguias_Emitidas.php", { elegido2: elegido }, 

      function(data){
        $('#Guias_Emitidas').html('');
    
            $("#Guias_Emitidas").html(data);
                 $(".select2").select2();
      
 
         }); 

         $.post("lista_Encargado_valida.php", { elegido2: elegido }, 

         function(data){

            
          $("#lista_datos").html(data);

          $("#lista_datos").hide();
    
            ///llenar NTRANS
  var NAGENCIA1= $('#seguri').text().trim();

  var NAGENCIA2 = document.getElementById("NTRASP");
  
                       NAGENCIA2.value =NAGENCIA1;  
               
         
    
            }); 




    });
});


//////////////CONSULTAR guias validadas
function CONSULTAR(){
  $(document).ready(function() {
     placa=$("#lista_Placas option:selected").val().trim();
     emitidas=$("#Guias_Emitidas  :selected").map((_, e) => e.value).get();
     guia=String(emitidas);
     $('#placa').attr('disabled', 'disabled');
     $('#guias').attr('disabled', 'disabled');
     $('#cons').hide();
     $('#habi').show();
     $('#gene').show();
    // $("#placa").attr('disabled', true); 
    $.post("lista_codigos_validados.php", { placa: placa,guia:guia }, 

    function(data){
     
      $("#lista_guias_validas").html(data);
    $('#esca').DataTable(); 
    
       }); 

//////mostrar los observados de seguridad
$.post("lista_cdobservado_segu.php", { placa: placa,guia:guia }, 

function(data){
 
  $("#lista_guias_observadas_segu").html(data);
$('#escao').DataTable(); 

   }); 




    
       
   });
  }
////HABILITA PARA CAMBIOS DE GUIAS

function Habilitar(){
  $(document).ready(function() {
    $('#placa').prop('disabled', false);
    $('#guias').prop('disabled', false);
    $('#habi').hide();
    $('#cons').show();
    $('#gene').hide();
  });
}

  //////////////CONSULTAR DETALLE de guias validas
  function Consultar_Det_guia(id){ 
    $(document).ready(function() {
      $('#modal_cbarras').modal('show');

$.post("Listar_Det_Guiavalida.php", {id:id}, 
             function(data){

          $("#lista_cbscaneo").html(data);
          $('#escat').DataTable(); 
               }); 




});
   }



//////CONSULTAR DETALLE de guias OBSERVADAS POR SEGURIDAD
  function Consultar_obser_segu(va){ 
    $(document).ready(function() {

      
    let row = va.closest('tr');
   // id=row.cells[1].textContent;
    placa=row.cells[2].textContent;
    item=row.cells[3].textContent;
      $('#modal_cbarras').modal('show');

$.post("Listar_Det_Observ_segu.php", {placa:placa,item:item}, 
             function(data){

          $("#lista_cbscaneo").html(data);
          $('#escat').DataTable(); 
               }); 




});
   }


 /// MOSTRAR DETALLE LOS OBSERVADOS
 
 function Consultar_obser_desp(va){ 
  $(document).ready(function() {

  
  
    let row = va.closest('tr');
    id=row.cells[1].textContent;
    placa=row.cells[2].textContent;
    item=row.cells[3].textContent;


  
  $('#modal_cbarras').modal('show');

$.post("Listar_Det_Observ_des.php", {id:id,placa:placa,item:item}, 
           function(data){

        $("#lista_cbscaneo").html(data);
        $('#escat').DataTable(); 
             }); 




});
 }


 //////////////GENERAR SALIDA DE CAMION
function GENERAR(){
  $(document).ready(function() {


   
   $('#esca tr').each(function () {
     
     gui=$(this).find('td').eq(0).text();
     
 });

 if(gui=='No data available in table')
 { 
  
  alertify.error('verificar las guias selecionadas' );}
 else{
  placa=$("#lista_Placas option:selected").val().trim();
  emitidas=$("#Guias_Emitidas  :selected").map((_, e) => e.value).get();
  guia=String(emitidas);
  encargado=$('#seguri').attr('name').trim();
 observa= $('#Dpartida').val().trim();

$.post("insert_CAB_SEGU.php", { placa: placa,guia:guia,encargado:encargado,observa:observa }, 
  function(data){

   $("#nguia").html(data);
   $("#nguia").hide();   

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


    }


 /********carga las fechas para el reporte*************************************************************/
    
    function genera_fecha(){
      $(document).ready(function(){
        $.ajax({
          beforeSend: function(){
             $("#pone_opcion").html("Poniendo opciones...");
           },
          url: 'Mostrar_Fecha_Segu.php',
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
   
    /***MUESTRA TODAS LAS SALIDAS SEGUNH LA FECHA******************************************************************/
    function busc_Report_valida(){

      $(document).ready(function(){
        if($("#fi").val()!=""||$("#ff").val()!=""){
        $.ajax({
            beforeSend: function(){
               $("#data").html("Buscando las ventas, un momento...");
             },
            url: 'Buscar_Salida_Segu.php',
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
    
    
    
    /****mostrar en PDF LAS SALIDA *****************************************************************/
    function genera_pdf(id) {
      // $global_num= id.replace(/ /g,"");
       $global_num= id;
      
       $('#modal_genera_pdf').modal('show');
     
         $('.modalTotal').on('shown.bs.modal',function(){      //correct here use 'shown.bs.modal' event which comes in bootstrap3
             $(this).find('iframe').attr('src','reporte_Salida_Segu.php?ticket='+$global_num)
         })
         $("#navegador").on('click', function() {
             window.location.href = 'reporte_Salida_Segu.php?ticket='+$global_num
         })
         $("#imprimir").on('click', function() {
              $('#imprimir_1')[0].contentWindow.print(); 
             //window.print();
            
         })
        // window.location.href = 'reporte_ficha.php?num_ficha='+$global_num
      
     }



    ///abrir  modal para liberar los codigos 
   

 function  LiberaCode(){


  $('#modal_Liberar').modal('show');
   
  
  
   }
  
  
   //evento donde libera los codigos

   ///evento de liberar

$(document).ready(function(){

  $("#nombre_l").on('keypress',  function (e) {
     if(e.which == 13) {
        // Acciones a realizar, por ej: enviar formulario.
   


    cai=$('#nombre_l').val();

  


     $.post("Actualizar_Status_Lectura.php", { codb: cai}, 

         function(data){          


              $("#detalle_de_codigo").html(data);

va = $("#valor").text();

$('#valor').hide();
if(va==1)
{
  alertify.error('El codigo ya fue migrado comunicarse con TI.');
$('#nombre_l').val('');
}

 if(va==2)
{
alertify.error('El codigo no existe');
$('#nombre_l').val('');


}
else
{
  swal(
    "El codigo fue actualizado",
    "Cargando...",
     "success",
    2000,

);

  $('#nombre_l').val('');
}


    
     
}



  

);

     };
 });
});

/////setear valor 
//function conta(){

 // alert("ingreso");
//}

$(document).ready(function(){


 
$("#nplaca").change(function(){

  alert("ingreso");
});
});





function  ingre(){
alert("ingreso2");
}