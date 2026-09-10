/////Lista N°CORRELATIVO
function Lista_Correlativo_Interno(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#Correlativo").html("Recuperando Correlativo...");
           },
          url: 'Correlativo_PreGuia_Interno.php',
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
 //////listar Ntraslado
         function lista_NTraslado(){
         $(document).ready(function() {
            $("#Generar").hide()
          $.ajax({
          beforeSend: function(){
            $("#lista_Clien").html("Recuperando proveedores...");
           },
          url: 'Listar_NTraslado.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#lista_Clien").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }

 ///////LISTAR DETALLES DE PRE GUIA  INTERNA
function Consultar_Detalle_Sca_Inter(ite,code){
  
            var doce= code; 
           var item= ite;  

            $item=item;
            $doce=doce;
    

         $(document).ready(function() {
            $('#modal_sca').modal('show');



$.post("Listar_Detalle_Pedido_Guia_Interna.php", {doc:doce,item:item}, 
             function(data){

          $("#lista_scaneo2").html(data);
               }); 
          }) ;
}  


//evento click en el combo Serie -lista serie 
$(document).ready(function(){

    $("#lista_Srie").on('change',  function () {
   $('#ulti').empty();
        $("#lista_Srie option:selected").each(function () {
            seri=$(this).val();
      

            $.post("Lista_UltimoNDocument_PreGuia.php", { elegido2: seri }, 

          function(data){
             var inputNombre = document.getElementById("ulti");

                     inputNombre.value =data;  
        
     
             }); 
        });
   });
});



//evento click en el combo Licencia  - lista conductor
$(document).ready(function(){

    $("#lista_Licen").on('change',  function () {
        $("#lista_Licen option:selected").each(function () {
            licenci=$(this).val();
          

            $.post("Lista_Conductores_PreGuia.php", { elegido2: licenci }, 

          function(data){
            nlicencia=$("#lista_Licen option:selected").val();

   var inputLicencia= document.getElementById("nLicencia");

                     inputLicencia.value =nlicencia;  
    

    var inputNombre = document.getElementById("Conductor");

                     inputNombre.value =data;  
    
         
          
     
             }); 
        });
   });
});


//EVENTO CLICK EN EL COMBO PLACA.

$(document).ready(function(){

    $("#lista_Placa").on('change',  function () {
        $("#lista_Placa option:selected").each(function () {
            placa=$(this).val();
         
           $.post("Lista_ModeloVehi_Preguia.php", { placa: placa},
              function(data1){
           
             nplaca=$("#lista_Placa option:selected").val();

   var inputPlaca= document.getElementById("nplaca");

                     inputPlaca.value =nplaca;  
    
    var inputNombre = document.getElementById("placacon");

                     inputNombre.value =data1;  
     
       
              
     
             });

          
        });
   });
});



         /////////////////////////////////////////////////////////SELECIONAR  PRODUCTO - EVETO CHECK
///totalizado con check

$( document ).on( 'click', '#che', function(){

  //Revisa en que status está el checkbox y controlalo según lo //desees
  if( $( this ).is( ':checked' ) ){

$("#Generar").show()

 $(this).parents("tr").find("td").css( "background-color", "LightGreen" );

 actual = $('#canti').text().trim();
var canti =  $(this).parents("tr").find("td").eq(9).text();
 totalsu=parseInt(actual)+parseInt(canti);

document.querySelector('#canti').innerText = totalsu;



 peso = $('#pesr').text().trim();
  var pesoactu =  $(this).parents("tr").find("td").eq(10).text();
 totalsuPe=parseFloat(peso)+parseFloat(pesoactu);
   totalsuPeDA = Number(totalsuPe.toFixed(2));

  

document.querySelector('#pesr').innerText = totalsuPeDA;
  }
  
  else{

    //$(this).parents("tr").find("td").css( "color", "black" );
       $(this).parents("tr").find("td").css( "background-color", "white" );

    actulcanti = $('#canti').text().trim();
     var canti =  $(this).parents("tr").find("td").eq(9).text();
  totaldes= parseInt(actulcanti) -parseInt(canti);
  document.querySelector('#canti').innerText = totaldes;


    actualpeso = $('#pesr').text().trim();
        var peso =  $(this).parents("tr").find("td").eq(10).text();
  var totalpesoact= parseFloat(actualpeso) -parseFloat(peso);
  numero = Number(totalpesoact.toFixed(2));
  document.querySelector('#pesr').innerText = numero;
  }
});

////////////////////////////////

//evento para mostrar los pedidos

$(document).ready(function(){

    $("#lista_Clien").on('change',  function () { 
        $("#lista_Clien option:selected").each(function () {
            elegido=$(this).val();
            $Cliente = elegido;
    docent=$("#lista_Clien :selected").map((_, e) => e.value).get();
   varch=String(docent);

           $.post("Consulta_Pedidos_Scaneados_Interno.php", { doc: varch },
              function(data1){
            $("#lista_leidos").html(data1);
             $('#Tabla_Esca').DataTable();

             });

         
        });
   });
});



/////////////////BOTON GUENERAR GUI -ABRE MODAL
$errados=0;
$icount =0;
$icount2 =0;
 function  Openclick(){
  $icount =0;
$errados=0;
$errados2=0;
   $(document).ready(function() {    
          //lista direciones de clientes
var id=[];
  $checked = $(":checkbox:checked").length;

$(":checkbox:checked").each(function(key){
  id[key]= $(this).parents("tr").find("td").eq(4).text();
  
  $Linenum= $(this).parents("tr").find("td").eq(3).text();
  $numpedido= $(this).parents("tr").find("td").eq(4).text();
  $iteme=$(this).parents("tr").find("td").eq(5).text().trim(); 
  $Can=$(this).parents("tr").find("td").eq(9).text().trim();
   $almacen=$(this).parents("tr").find("td").eq(11).text().trim();  
   $.post("Consultar_restante_Pedido.php", {numpedido:$numpedido,Can:$Can,Linenum:$Linenum,iteme:$iteme},
   function(pedido){

    $pedid=pedido.trim();
    //alert($pedid);
    if($pedid==1){



   

  $.post("Consultar_Stock_Preguia.php", {iteme:$iteme,Can:$Can,almacen:$almacen},
           function(data1){

           $prue=data1.trim();
          // $prue=1; paa hacer pruebas
           
       if($prue==1){
         $icount++;
         

if($checked =$icount)
{ 
if($errados2 ==0 )
{


 $('#modal_Datos').modal('show');
 


             //lista numeros de serie
   $.post("Lista_Seri_Preguia.php", {},
              function(data2){
                   $("#lista_Srie").html(data2);
               $(".select2").select2();
              
     
             });


            //lista licencias
   $.post("Lista_Licencia_PreGuia.php", {},
              function(data3){
                  $("#lista_Licen").html(data3);
               $(".select2").select2();
              
     
             });
          //lista Placa
   $.post("Lista_Placa_PreGuia.php", {},
              function(data4){
                    $("#lista_Placa").html(data4);
               $(".select2").select2();
              
     
             });

}else{
  //alertify.error('Verificar stock de '+$errados+' productos de color rojo');
  

 $('#modal_Datos').modal('show');
 


 //lista numeros de serie
$.post("Lista_Seri_Preguia.php", {},
  function(data2){
       $("#lista_Srie").html(data2);
   $(".select2").select2();
  

 });


//lista licencias
$.post("Lista_Licencia_PreGuia.php", {},
  function(data3){
      $("#lista_Licen").html(data3);
   $(".select2").select2();
  

 });
//lista Placa
$.post("Lista_Placa_PreGuia.php", {},
  function(data4){
        $("#lista_Placa").html(data4);
   $(".select2").select2();
  

 });


}       

     
} 

else{}

                                       
   }else{        

       $( "td:contains('"+$prue+"')").css("background-color", "red");
       $icount++;

           $errados++;


if($checked == $icount)
{
alertify.error('Verificar stock de '+$errados+' productos de color rojo');


 



}else{


}       

     


 }



                   });
                  } else{
     
                    $( "td:contains('"+$pedid+"')").css("background-color", "red");
                    $icount2++;
                    $errados2++;
                    if($checked == $icount2)
                    {

                    alertify.error('No puede despachar  '+$errados2+' porque execede el pedido');
                    
                    
                     
                    
                    
                    
                    }else{
                    
                    
                    }       

                  }
                  
                  });///consulta de pedido
                  

  });

if(id.length === 0){

  alertify.success('Seleccione algun Pedido f');
}else{}







     });
 };

///insertar preguia

//////Insertar Datos PREGUIA


 function  Gprebtn(){
  
  fecha=  $('#fecha').val();
fechaEn=  $('#fechaEn').val();
cadcod=''
  client=$("#lista_Clien option:selected").text();
  IdCli=$("#lista_Clien option:selected").val(); 
IdDes=$("#EnviD option:selected").val();
//Direcioncli=$('#Direc').text().trim();
//DirecionD=$('#DirecD').text().trim();
Serie=$("#id option:selected").val();
Numero=$("#ulti").val().trim();
Licencia=$("#nLicencia").val().trim();
Conductor=$('#Conductor').val().trim();
Placa=$("#nplaca").val().trim();
Vehi=$('#placacon').val().trim();
ntransp=$("#ntransp").val().trim();
nruc=$("#nruc").val().trim();
comets=$("#commet").val().trim();
var id=[];
var iteme=[];
var obje=[];
var line=[];
var Des=[];
var Can=[];
var Pe=[];   
var CardCO=[]; 

var ori=[]; 

var desti=[]; 

//Placa =$("#lista_Placa option:selected").val();


 if(client === "Selecione un Cliente") {
 alertify.success('Selecione un N° Pedido');

 }




 else{


$(":checkbox:checked").each(function(key){


   
   obje[key]= $(this).parents("tr").find("td").eq(2).text();

   line[key]= $(this).parents("tr").find("td").eq(3).text();
  id[key]= $(this).parents("tr").find("td").eq(4).text();

  
  iteme[key]=$(this).parents("tr").find("td").eq(5).text();
   CardCO[key]= $(this).parents("tr").find("td").eq(6).text();
  
   Des[key]= $(this).parents("tr").find("td").eq(8).text();
      
  Can[key]=$(this).parents("tr").find("td").eq(9).text();

   Pe[key]=$(this).parents("tr").find("td").eq(10).text();

ori[key]=$(this).parents("tr").find("td").eq(11).text();

   desti[key]=$(this).parents("tr").find("td").eq(12).text();



});
if(id.length === 0){

  alertify.success('Seleccione algun Pedido');
}else{


     unisede=$('#despacho').is(':checked') ;


     if(unisede== true ){
////ingresa para traslado en la misma seede
      serieint="";
    

$.post("InsertarEncabezadoPreGuia_Interna.php", { fecha: fecha,fechaEn:fechaEn,card:cadcod,client:client,Serie:serieint,Numero:Numero,Licencia:Licencia,Conductor:Conductor,Placa:Placa,Vehi:Vehi,ntransp:ntransp,nruc:nruc,comets:comets},
function(data1){

alertify.success('Se a insertado Correctamente');
$("#nguia").html(data1);
$("#nguia").hide();



var nguia2=$("#nguia").text().trim();


$.post("Actualizar_EstadoPreGuia_Interna.php", {docen:id,nguia:nguia2,item:iteme},
function(data1){

      

});

$(":checkbox:checked").each(function(key){



$obje= $(this).parents("tr").find("td").eq(2).text().trim();

$line= $(this).parents("tr").find("td").eq(3).text().trim();
$id= $(this).parents("tr").find("td").eq(4).text().trim();

$iteme=$(this).parents("tr").find("td").eq(5).text().trim();
Unime= $(this).parents("tr").find("td").eq(7).text().trim();

$Des= $(this).parents("tr").find("td").eq(8).text().trim();

$Can=$(this).parents("tr").find("td").eq(9).text().trim();

$Pe=$(this).parents("tr").find("td").eq(10).text().trim();
$ori=$(this).parents("tr").find("td").eq(11).text().trim();
$desti=$(this).parents("tr").find("td").eq(12).text().trim();

$.post("Insertar_DetallePreGuia_Interna.php", { objet:$obje,linea:$line,docen:$id,nguia:nguia2,item:$iteme,Desc:$Des,Canti:$Can,Pes:$Pe,Unime:Unime,ori:$ori,desti:$desti},
function(data1){
  

});







});


});



     }else{
      ///guia entre sedes
      

      $.post("InsertarEncabezadoPreGuia_Interna.php", { fecha: fecha,fechaEn:fechaEn,card:cadcod,client:client,Serie:Serie,Numero:Numero,Licencia:Licencia,Conductor:Conductor,Placa:Placa,Vehi:Vehi,ntransp:ntransp,nruc:nruc},
      function(data1){
   
alertify.success('Se a insertado Correctamente');
      $("#nguia").html(data1);
      $("#nguia").hide();

     

    var nguia2=$("#nguia").text().trim();


$.post("Actualizar_EstadoPreGuia_Interna.php", {docen:id,nguia:nguia2,item:iteme},
      function(data1){
   
            

     });

$(":checkbox:checked").each(function(key){



$obje= $(this).parents("tr").find("td").eq(2).text().trim();

$line= $(this).parents("tr").find("td").eq(3).text().trim();
$id= $(this).parents("tr").find("td").eq(4).text().trim();

$iteme=$(this).parents("tr").find("td").eq(5).text().trim();
Unime= $(this).parents("tr").find("td").eq(7).text().trim();

$Des= $(this).parents("tr").find("td").eq(8).text().trim();

$Can=$(this).parents("tr").find("td").eq(9).text().trim();

$Pe=$(this).parents("tr").find("td").eq(10).text().trim();
$ori=$(this).parents("tr").find("td").eq(11).text().trim();
$desti=$(this).parents("tr").find("td").eq(12).text().trim();

$.post("Insertar_DetallePreGuia_Interna.php", { objet:$obje,linea:$line,docen:$id,nguia:nguia2,item:$iteme,Desc:$Des,Canti:$Can,Pes:$Pe,Unime:Unime,ori:$ori,desti:$desti},
      function(data1){
    

     });



});

});

}
//aca


 $(":checkbox:checked").each(function(key){


   
  $docentry= $(this).parents("tr").find("td").eq(1).text();

 $.post("Actualizar_EstadoSolici_Cab.php", {docen:$docentry},
 function(data7){

  $.post("Actualizar_Observaciones_GuiaInter.php", {docen:data7},
  function(data2){
  
        
  
  
  swal(
  "Su Guia fue Generada",
  "Cargando...",
  "success",
  2000,
  
  );
  
  setTimeout('location.reload()',2000);
  
  });



});
});

}
////actualizar






 }


////






 }


 $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifChecked', function(event){

    $("#atrans").hide();

    $("#aruc").hide();

    $("#aserie").hide();
    $("#acorrela").hide();
    $("#alicen").hide();
    $("#anlicen").hide();
    $("#aconduc").hide();
    $("#aplac").hide();
    $("#anplaca").hide();
    $("#aplacon").hide();
    $('#adeta').css("visibility", "visible");

});





$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifUnchecked', function(event){
  $("#atrans").show();

  $("#aruc").show();

  $("#aserie").show();
  $("#acorrela").show();
  $("#alicen").show();
  $("#anlicen").show();
  $("#aconduc").show();
  $("#aplac").show();
  $("#anplaca").show();
  $("#aplacon").show();
  $('#adeta').css("visibility", "hidden");
});



///////////////consultar detalle de ocservicio
function genera_opcion_GE(){
  $(document).ready(function(){
    $.ajax({
      beforeSend: function(){
         $("#pone_opcion").html("Poniendo opciones...");
       },
      url: 'Mostrar_Fecha_GuiaEmi.php',
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
function busca_Guia_Emitida_Internas(){
  fechai=$("#fi").val();
  fechaf=$("#ff").val();
  estado=$("#idEstado option:selected").val();
if(estado === "Seleccione un Estado") {
 alertify.error('Seleccione un Estado');

 }

 else if (fechai==""){
   alertify.error('Seleccione un fecha inicio');
 }
 else if (fechaf==""){
   alertify.error('Seleccione un fecha fin');
 }

 else{
  $.post("Listar_Guias_Emitidas_Internas.php", {fechai:fechai,fechaf:fechaf,estado:estado},
              function(inf){
            
         $("#data").html(inf);
            $('#escp').DataTable(); 


             });
}


}
/*****************************************************************
Muestra Detalle Preguias
************/
function muestra_detalle_Preguias(num_ticket){
  var tic=num_ticket;
  // alert(num_ticket);
  $("#modal_detalle_venta").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#detalle_de_venta").html("Consultando detalle guias...");
                         },
                         url: 'consulta_detalle_preguiaInterna.php',
                         type: 'POST',
                         data: 'serie='+tic,
                         success: function(x){
                           $(".nuticket").html("");
             $("#idpedido").val(tic);
                           $(".nuticket").append("Detalle de Guias | <span class='label' style='background-color: royalblue'>#: "+tic+"</span>");
                           $("#detalle_de_venta").html(x);
               
               
                          },
                         error: function(jqXHR,estado,error){
                           $("#detalle_de_venta").html('Hubo un error: '+estado+' '+error);
                         }
                      });
 }


 /*****************************************************************
ACTUALIZAR  Detalle Preguias
************/


function ActualizarGuiaInternaSe(id){

  idactuglobal=id;
$('#modal_DatosActualiza').modal('show');
/////////////// 

$.post("Lista_Seri_Preguia.php", {},
           function(data2){
                $("#lista_Srie").html(data2);
            $(".select2").select2();
           
  
          });


/////traer datos 
$.post("Lista_Datos_PreguiInterna.php", {iDPre:id},
           function(dat2){
               
                $("#lista_datos").html(dat2);

   $("#lista_datos").hide();

//DATOS DE LA FECHA





///llenar NTRANS
  var NAGENCIA1= $('#NAGENCIA').text().trim();

var NAGENCIA2 = document.getElementById("ntransp");

                     NAGENCIA2.value =NAGENCIA1;  
//fin

///llenar RUCTRANS
  var RUCAGEN1= $('#RUCAGEN').text().trim();

var RUCAGEN2 = document.getElementById("nruc");

                     RUCAGEN2.value =RUCAGEN1;  



//selecionar combo de serie
var serie= $('#seri').text().trim();


$('#id').val(serie).trigger('change.select2');
///
//llenar num de documento de seri
var nDOCc= $('#nDOC').text().trim();


 var nDOC2 = document.getElementById("ulti");

                  nDOC2.value =nDOCc;  
////llenar licencia
var licec= $('#lice').text().trim();

var licen = document.getElementById("nLicencia");

                  licen.value =licec;  
//fin

//llenar campo conductor

var con1= $('#con').text().trim();

var con2 = document.getElementById("Conductor");

                  con2.value =con1;  
///fin

///llenar campo placa
var plac1= $('#plac').text().trim();

var plac2 = document.getElementById("nplaca");

                  plac2.value =plac1;  
//fin
///llenar campo modelo
var mo1= $('#mo').text().trim();

var mo2 = document.getElementById("placacon");

                  mo2.value =mo1;  
//fin








          });





   
       //lista Placa
$.post("Lista_Placa_PreGuia.php", {},
           function(data4){
                 $("#lista_Placa").html(data4);
            $(".select2").select2();
           
            var fech= $('#fec').text().trim();

            $("#fechain").datepicker("update", fech);
            
            //DATOS DE LA FECHA DE ENTREGA
            
            var feche= $('#fechen').text().trim();
            
            $("#fechaEnin").datepicker("update", feche);
          });

}
 /*****************************************************************
ACTUALIZAR  Detalle Preguias
************/


function ActualizarGuiaInterna(id){
  idactuglobalinter=id;
 
$('#modal_DatosActualizaInterna').modal('show');
/////////////// 


/////traer datos 
$.post("Lista_Datos_PreguiInterna.php", {iDPre:id},
           function(dat2){
            $("#lista_datosin").html(dat2);

            $("#lista_datosin").hide();


            var fech= $('#fec').text().trim();

            $("#fecha").datepicker("update", fech);
            
            //DATOS DE LA FECHA DE ENTREGA
            
            var feche= $('#fechen').text().trim();
            
            $("#fechaEn").datepicker("update", feche);

            ///llenar campo  observacion
var comen= $('#observa').text().trim();

var comen2 = document.getElementById("commet");

comen2.value =comen;  

});




      

}





function ActualizaPre(){


  fecha=  $('#fecha').val();
fechaEn=  $('#fechaEn').val();

Serie=$("#lista_Srie option:selected").val();
Numero=$("#ulti").val().trim();
//Licencia=$("#lista_Licen option:selected").val();
Licencia=$("#nLicencia").val().trim();
Conductor=$('#Conductor').val().trim();
//Placa=$("#lista_Placa option:selected").val();
Placa=$("#nplaca").val().trim();
Vehi=$('#placacon').val().trim();
NTRAPOR=$("#ntransp").val().trim();
RUCTRAN=$("#nruc").val().trim();


if(Serie === "Selecione una Serie") {
alertify.error('Selecione una Serie');
}else
{
 $.post("ActualizarEncabezadoPreguiaInterna.php", {idactu:idactuglobal,fecha:fecha,fechaEn:fechaEn,Serie:Serie,Numero:Numero,Licencia:Licencia,Conductor:Conductor,Placa:Placa,Vehi:Vehi,NTRAPOR:NTRAPOR,RUCTRAN:RUCTRAN},

function(data1){
         
         
       $("#nguia").html(data1);
            $("#nguia").hide();

$("#validar").html(data1);

va =$("#valor").text().trim();
//alert(va);
$('#validar').hide();

if(va==1)
{
  alertify.error('El correlativo del documento ya se encuentra registrado');

}


else
{
     

      alertify.success('Se a insertado Correctamente');
   
           

        



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
}

//////actualizar guia interna 




function ActualizaPreSede(){


  fecha=  $('#fecha').val();
fechaEn=  $('#fechaEn').val();


observacio=$("#commet").val().trim();



 $.post("ActualizarEncabezadoPreguiaInternaSede.php", {idactu:idactuglobalinter,observacio:observacio},

function(data1){
         
         
       $("#nguia").html(data1);
            $("#nguia").hide();

$("#validar").html(data1);

va =$("#valor").text().trim();
//alert(va);
$('#validar').hide();

if(va==1)
{
  alertify.error('El correlativo del documento ya se encuentra registrado');

}


else
{
     

      alertify.success('Se a insertado Correctamente');
   
           

        



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