///////////////////////buqueda de recibo
  function ListarOrdenProduc(){
  
   

   $(document).ready(function() {

          $.ajax({
          beforeSend: function(){
       
            $("#lista_EMISION").html("Recuperando Correlativo...");
           },
          url: 'Lista_Orden_Producion_Corte.php',
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






         ////termina el proceso de pesaje de scrap


function add_art(id){
    //validaciones al abrir
    
    
    $(document).ready(function() {
    
    
      $("#modal_busqueda_arts").modal("toggle");
     
    
       $("#modal_Componentes_Producion").modal({
                         show:true,
                         backdrop: 'static',
                         keyboard: false
                       });
    
    
    $("#peso_ca").val('');
    
      $.post("Listar_Modal_Recibo_Peso.php", {id:id}, 
     function(data){
    
        $("#LISTA_PESO").html(data);
    
    $("#idp").hide();
    $("#des").hide();
    
    
    uni=$('#uni').text().trim();
    
    if(uni== 'KG')
    {
    
      cantidad = $('#cantidad').text().trim();
       pesore = $('#peso2').text().trim();
     pesore2=$('#peso').text().trim();
       pesoto=  parseFloat(pesore)+parseFloat(pesore2);
       if(pesoto=="")
     {
         var total =  parseFloat(cantidad);
           document.querySelector("#falta").innerText = total;
    }else{
    
    
         var total =  parseFloat(cantidad)- parseFloat(pesoto);
    
    numero = Number(total.toFixed(2));
           document.querySelector("#falta").innerText = numero;
    }
        
    
    
    }else{
    
    //pruebaa
    
    
    cantidad = $('#cantidad').text().trim();
       CANTI2= $('#cantidsca2').text().trim();
       CANTI = $('#cantidsca').text().trim();
        CANTITOT=  parseFloat(CANTI2)+ parseFloat(CANTI);
    
       if(CANTITOT=="")
     {
         var total =  parseFloat(cantidad);
           document.querySelector("#falta").innerText = total;
    }else{
     
         var total =  parseFloat(cantidad)- parseFloat(CANTITOT);
           document.querySelector("#falta").innerText = total;
    }
        
    
       }
    
    
     });
              }) ;
    
    }


    ///GENERAR CORTE 

    $(document).ready(function(){

        $("#btnProcesar").on('click',  function (e) {
    
    
    docEntry= $('#idp').text().trim();
    canTotal=$("#cantidsca2").text().trim();
    PesoTotal=$("#peso2").text().trim();
    unidad=$('#uni').text().trim();
    item=$('#item').text().trim();

    if (canTotal > 0) {
    
         $("#modal_Recibo").modal("show");
            $("#modal_Componentes_Producion").modal("toggle");
    $.post("Listar_Ayudante_Producion.php", {}, 
     function(data){
    
       $("#lista_ayudantes").html(data);
           $(".select2").select2();
     });
    
    $.post("Procesar_ReciboProduccion.php", {docEntry:docEntry,canTotal:canTotal,PesoTotal:PesoTotal,unidad:unidad,item:item}, 
     function(data){
    
       $("#lista_ORDENFABRICA").html(data);
     });
    }else{
      alertify.error('NO HAY NINGUN PRODUCTO PESADO');
    }
    
    
              }); 
    
    
       });



       ///////PROCESAR 
       //insertar recibo
$(document).ready(function(){

    $("#btnProceRecibo").on('click',  function (e) {

    docEntry=$("#docEntry").text().trim();
 Ayudante=$("#lista_ayudantes option:selected").text().trim();
     Turno=$("#IdTurno option:selected").text().trim();

 fecha=$('#fechaCrea').val();

 cantidad=$('#can').text().trim();
  peso=$('#pesoto').text().trim();
  comenta=$('#comen').val();
  type=1;


         uniproce=$('#uni').text().trim();

if(uniproce=='KG')
{

if(Ayudante === "Seleccione un Ayudante") {
 alertify.error('Selecione un Ayudante');

 }
 else if(Turno == "Seleccione un Turno"){
alertify.error('Selecione un Turno');
 }
 else{
$.post("Insertar_ReciboProduc.php", {docEntry:docEntry,Ayudante:Ayudante,Turno:Turno,fecha:fecha,cantidad:cantidad,peso:peso,comenta:comenta,type:type}, 
 function(data){
       
 });

$.post("Insertar_EmisionProd.php", {docEntry:docEntry,cantidad:peso}, 
 function(data){
       
 });

$.post("Actualizar_OrdenPro_Real.php", { id:docEntry},
                 function(data1){
          
     
    });


         uni=$('#uni').text().trim();
if(uni== 'KG'){
    peso=$('#peso').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });
}else{

 peso=$('#can').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });

}
swal(
    "Su Recibo fue Procesado",
    "Cargando...",
     "success",
    2000,


);

$("#modal_Recibo").modal("hide");
///setTimeout('location.reload()',2000);

}
}else{




 if(Ayudante === "Seleccione un Ayudante") {
 alertify.error('Selecione un Ayudante');

 }
 else if(Turno == "Seleccione un Turno"){
alertify.error('Selecione un Turno');
 }
 else{
$.post("Insertar_ReciboProduc.php", {docEntry:docEntry,Ayudante:Ayudante,Turno:Turno,fecha:fecha,cantidad:cantidad,peso:peso,comenta:comenta,type:type}, 
 function(data){
       swal(
    "Su Recibo fue Procesado",
    "Cargando...",
     "success",
    2000,

);
 });
 $("#modal_Recibo").modal("hide");
$.post("Insertar_EmisionProd.php", {docEntry:docEntry,cantidad:cantidad}, 
 function(data){
       
 });
 $.post("Actualizar_OrdenPro_Real.php", { id:docEntry},
                 function(data1){
          
     
    });
  uni=$('#uni').text().trim();
if(uni== 'KG'){
    peso=$('#peso').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });
}else{

 peso=$('#can').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });

}


//setTimeout('location.reload()',2000);

}
}


 });
 });


 ///procesar datps


 $(document).ready(function(){

    $("#btnProcesarSCRAP").on('click',  function (e) {
  
  
  docEntry= $('#idp').text().trim();

  
  item= $('#des').text().trim();
  canTotal=$("#scantidsca2").text().trim();
  PesoTotal=$("#speso2").text().trim();
  unidad=$('#sitem').text().trim();
  if (canTotal > 0) {
  
       $("#modal_ReSCRAP").modal("show");
          $("#modal_Pesos_scrap").modal("toggle");
  $.post("Listar_Ayudante_Producion.php", {}, 
   function(data){
  
     $("#lista_ayudantesSCRAP").html(data);
         $(".select2").select2();
   });
  
  $.post("Procesar_ReciboProduccion.php", {docEntry:docEntry,canTotal:canTotal,PesoTotal:PesoTotal,unidad:unidad,item:item}, 
   function(data){
    $("#lista_ORDENFABRICASCRAP").html(data);
   });
  }else{
    alertify.error('NO HAY NINGUN PRODUCTO PESADO');
  }
  
  
            }); 
  
  
     });




       //insertar recibo scrp

$(document).ready(function(){

    $("#btnProceReciboscrap").on('click',  function (e) {

     docEntry=$("#docEntry").text().trim();
 Ayudante=$("#IdTurnoScrapIdTurnoScrap option:selected").text().trim();
     Turno=$("#IdTurnoScrap option:selected").text().trim();

 fecha=$('#fechaCrea').val();

 cantidad=$('#can').text().trim();
  peso=$('#pesoto').text().trim();
  comenta=$('#comen').val();
  type=1;


         uniproce=$('#uni').text().trim();

if(uniproce=='KG')
{

if(Ayudante === "Seleccione un Ayudante") {
 alertify.error('Selecione un Ayudante');

 }
 else if(Turno == "Seleccione un Turno"){
alertify.error('Selecione un Turno');
 }
 else{
$.post("Insertar_ReciboProduc.php", {docEntry:docEntry,Ayudante:Ayudante,Turno:Turno,fecha:fecha,cantidad:cantidad,peso:peso,comenta:comenta,type:type}, 
 function(data){
       
 });

$.post("Insertar_EmisionProd.php", {docEntry:docEntry,cantidad:peso}, 
 function(data){
       
 });

$.post("Actualizar_OrdenPro_Real.php", { id:docEntry},
                 function(data1){
          
     
    });


         uni=$('#uni').text().trim();
if(uni== 'KG'){
    peso=$('#peso').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });
}else{

 peso=$('#can').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });

}
swal(
    "Su Recibo fue Procesado",
    "Cargando...",
     "success",
    2000,


);


//setTimeout('location.reload()',2000);

}
}else{




 if(Ayudante === "Seleccione un Ayudante") {
 alertify.error('Selecione un Ayudante');

 }
 else if(Turno == "Seleccione un Turno"){
alertify.error('Selecione un Turno');
 }
 else{
$.post("Insertar_ReciboProduc.php", {docEntry:docEntry,Ayudante:Ayudante,Turno:Turno,fecha:fecha,cantidad:cantidad,peso:peso,comenta:comenta,type:type}, 
 function(data){
      
 });

$.post("Insertar_EmisionProd.php", {docEntry:docEntry,cantidad:cantidad}, 
 function(data){
       
 });
 $.post("Actualizar_OrdenPro_Real.php", { id:docEntry},
                 function(data1){
          
     
    });
  uni=$('#uni').text().trim();
if(uni== 'KG'){
    peso=$('#peso').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });
}else{

 peso=$('#can').text().trim();
$.post("Actualizar_CantidadProduc.php", {docEntry:docEntry,peso:peso}, 
 function(data){
       
 });

}
 swal(
    "Su Recibo fue Procesado",
    "Cargando...",
     "success",
    2000,

);

setTimeout('location.reload()',2000);

}
}

 });
 });
