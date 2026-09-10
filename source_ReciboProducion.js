///LISTA N° CORRELATIVO

///////////////////////buqueda de recibo
  function ListarOrdenProduc(){
  
   

   $(document).ready(function() {

          $.ajax({
          beforeSend: function(){
       
            $("#lista_EMISION").html("Recuperando Correlativo...");
           },
          url: 'Lista_Orden_Producion.php',
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


///LISTA N° CORRELATIVO


function Lista_CorrelativoRecibo(){
         $(document).ready(function() {

          $.ajax({
          beforeSend: function(){
       
            $("#Correlativo").html("Recuperando Correlativo...");
           },
          url: 'Correlativo_Emision.php',
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


//modal de pesos



///Eliminar pesos
function Eliminar_Pesos(id){
            var id2= id;


 alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  Eliminar_Item_Peso(id2);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}
//eliminnar registrros scaneados

    function Eliminar_Item_Peso(id){
            idP=$("#idp").text().trim();
              
   $(document).ready(function() {

     
$.post("Eliminar_Pesos_Recibo.php", 
  {id:id,idP:idP}, 
             function(data){

            $("#lista_Pesos").html(data);
              

             add_art(idP);

                   }); 


               }) ;
   
}

////correlativo recibo


function Lista_CorrelativoRecibo(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#Correlativo").html("Recuperando Correlativo...");
           },
          url: 'Correlativo_ReciboProduccion.php',
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

let reloj;

///count para pesaje
function FOper(){
  
  
    
 reloj= setInterval(saludo,4000);


 

};


///clearInterval(id);


$('#modal_Componentes_Producion').on('hidden.bs.modal', function (event) {
  // do something...  
  //alert("preuba");
  clearInterval(reloj);
})


var saludo = function(){

$.post("Listar_Peso_Balanza.php", {}, 
function(data){
 
       pesaje=data;

  if(pesaje < 1)
  {
///sin peso 
  }else{


        validar= pesaje ;


    //el peso es vacio    
  if(validar =="")
  {
alertify.error('No Puede Registrar un Peso Vacio');
  } else{       

$.post("Eliminar_Peso_Balanza.php", {}, 
function(data){

});


//restar pesos

pesoactu= $("#peso2").text().trim();

if(pesoactu=="")
{
 var totalPeso = 0+ parseFloat(pesaje);

document.querySelector('#peso2').innerText = totalPeso;
}else{
 var totalPeso =  parseFloat(pesoactu)+ parseFloat(pesaje);
num = Number(totalPeso.toFixed(2));
document.querySelector('#peso2').innerText = num;
}
//contador al sumar
cantidad=$("#cantidsca2").text().trim();
if(cantidad=="")
{
 var registro = 1;

document.querySelector('#cantidsca2').innerText = registro;
}else{
 //contador al sumar
registro=1+parseInt(cantidad);

document.querySelector('#cantidsca2').innerText = registro;
}


var item=  $("#item").text().trim();

var id =$('#idp').text().trim();
var unida=$("#uni").text().trim();
var tuco=  $("#tuco").val().trim();
var tara=  $("#tara").val().trim();
var pesobruto= pesaje.trim();
var restar =parseFloat(tuco) + parseFloat(tara);
var pesar =parseFloat(pesobruto) - parseFloat(restar);

if (unida =="RLL"){

//ver cuanto falta
pesore = $('#cantidsca').text().trim();
pesoactu=$('#cantidsca2').text().trim();
cantidarLeer =$("#cantidad").text().trim();

pesotot=parseFloat(pesore) + parseFloat(pesoactu);
restante =parseFloat(cantidarLeer) - parseFloat(pesotot);

document.querySelector('#falta').innerText = restante;





///sumar el peso  leido

pesoMomen=$("#pesole").text().trim();

pesohora=parseFloat(pesoMomen)+parseFloat(pesaje);
document.querySelector('#pesole').innerText = pesohora;

}else{
//ver cuanto falta
pesore = $('#peso2').text().trim();
pesoactu=$('#peso').text().trim();
cantidarLeer =$("#cantidad").text().trim();

pesotot=parseFloat(pesore) + parseFloat(pesoactu);
restante =parseFloat(cantidarLeer) - parseFloat(pesotot);

document.querySelector('#falta').innerText = restante;


///sumar el peso  leido

pesoMomen=$("#pesole").text().trim();

pesohora=parseFloat(pesoMomen)+parseFloat(pesaje);
document.querySelector('#pesole').innerText = pesohora;

}
type=1;

//alert(id);
$.post("Insertar_Peso.php", {id:id,item:item,peso:pesar,uni:unida,type:type,tuco:tuco,tara:tara,pesobruto:pesobruto}, 
function(data){
//IGRESP


$("#LISTA_RESUL").html(data);

$("#LISTA_RESUL").hide();
  codebar=$('#code').text().trim();
  fec=$('#fe').text().trim();
  
  carcod=$('#item').text().trim();
  carname=$('#des').text().trim();
  carnam=carname.substring(0,40)+' -';
  carnam2=carname.substring(40,150);
  um=$("#uni").text().trim();
//cantiImPRE=parseInt($("#Idcanti option:selected").text());

//stepd=0;
//for (let stepd = 0; stepd < cantiImPRE; stepd++) {

  estado =$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').is(':checked');

  if(estado == true){
  var saveData = (function () {
   var a = document.createElement("a");
   document.body.appendChild(a);
   a.style = "display: none";
   return function (data, fileName) {
      
       
       
           blob = new Blob ([data], {tipo: 'texto / plano'}),
           url = window.URL.createObjectURL(blob);
       a.href = url;
       a.download = fileName;
       a.click();
       window.URL.revokeObjectURL(url);
   };
}());


 var data = [];

 data.push( ' CT~~CD,~CC^~CT~ ^XA ~TA000 ~JSN ^LT0 ^MNW ^MTT ^PON ^PMN ^LH0,0 ^JMA ^PR5,5 ~SD25 ^JUS ^LRN ^CI27 ^PA0,1,1,0 ^XZ ^XA ^MMT ^PW735 ^LL543 ^LS0 ^FT515,63^A0N,28,28^FH\^CI28^FDFP :^FS^CI27 ^FT579,62^A0N,31,30^FH\^CI28^FD' + fec+ '^FS^CI27 ^BY5,3,88^FT63,255^BCN,,Y,N ^FH\^FD>;'+codebar+'^FS ^FPH,2^FT0,393^A0N,23,23^FB237,1,6,C^FH\^CI28^FDITEMCODE  ^FS^CI27 ^FPH,2^FT0,436^A0N,23,23^FB243,1,6,C^FH\^CI28^FDDSCRIPTION^FS^CI27 ^FT223,395^A0N,23,23^FH\^CI28^FD'+ carcod +'^FS^CI27 ^FT223,436^A0N,23,25^FH\^CI28^FD'+ carnam +'^FS^CI27 ^FT58,134^BQN,2,4 ^FH\^FDLA,'+codebar+'^FS ^FPH,2^FT0,497^A0N,23,23^FB142,1,6,C^FH\^CI28^FDUM^FS^CI27 ^FT223,503^A0N,23,23^FH\^CI28^FD'+ um +'^FS^CI27 ^FT211,503^A0N,23,23^FH\^CI28^FD:^FS^CI27 ^FT211,393^A0N,23,23^FH\^CI28^FD:^FS^CI27 ^FT219,468^A0N,23,23^FH\^CI28^FD'+ carnam2 +'^FS^CI27 ^FT211,439^A0N,23,15^FH\^CI28^FD:^FS^CI27 ^FT608,532^A0N,23,23^FH\^CI28^FDFIBRAFIL S.A^FS^CI27 ^PQ1,0,1,Y ^XZ ');  
   fileName = "Fibraticket.prn";
      saveData(data, fileName);

    }
    else{
      
      var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
           
            
            
                blob = new Blob ([data], {tipo: 'texto / plano'}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
     }());
     
     
      var data = [];
     
      data.push( 'CT~~CD,~CC^~CT~      ^XA      ~TA000      ~JSN      ^LT0      ^MNW      ^MTT      ^PON      ^PMN      ^LH0,0      ^JMA      ^PR5,5      ~SD25      ^JUS      ^LRN      ^CI27      ^PA0,1,1,0      ^XZ      ^XA      ^MMT      ^PW735      ^LL543      ^LS0      ^FT515,63^A0N,28,28^FH\^CI28^FDFP :^FS^CI27      ^FT579,62^A0N,31,30^FH\^CI28^FD' + fec+ '^FS^CI27      ^BY5,3,88^FT63,255^BCN,,Y,N      ^FH\^FD>;'+codebar+'^FS      ^FPH,2^FT0,394^A0N,23,23^FB237,1,6,C^FH\^CI28^FDITEMCODE  ^FS^CI27      ^FPH,2^FT0,437^A0N,23,23^FB243,1,6,C^FH\^CI28^FDDSCRIPTION^FS^CI27      ^FT223,396^A0N,23,23^FH\^CI28^FD'+ carcod +'^FS^CI27      ^FT223,437^A0N,23,25^FH\^CI28^FD'+ carnam +'^FS^CI27      ^FT58,134^BQN,2,4      ^FH\^FDLA,'+codebar+'^FS      ^FPH,2^FT0,502^A0N,23,23^FB142,1,6,C^FH\^CI28^FDUM^FS^CI27      ^FT223,508^A0N,23,23^FH\^CI28^FD'+ um +'^FS^CI27      ^FT211,508^A0N,23,23^FH\^CI28^FD:^FS^CI27      ^FT211,394^A0N,23,23^FH\^CI28^FD:^FS^CI27      ^FT219,468^A0N,23,23^FH\^CI28^FD'+ carnam2 +'^FS^CI27      ^FT211,439^A0N,23,15^FH\^CI28^FD:^FS^CI27      ^FT621,371^A0N,56,56^FH\^CI28^FDKG^FS^CI27      ^FT407,370^A0N,70,48^FH\^CI28^FD'+ pesar +'^FS^CI27      ^FT608,529^A0N,23,23^FH\^CI28^FDFIBRAFIL S.A^FS^CI27      ^PQ1,0,1,Y      ^XZ                  ');        
      
      fileName = "Fibraticket.prn";
           saveData(data, fileName);
     

    }




//'+codebar+'
//};

  // $("#etique").html(data);
});

//alert("termima");
 
 //$("#Imprimir").modal("show");

 //document.querySelector('#pesobalanza').innerText = pesaje;


        



    etique=$('#etique').text();

         setTimeout(function(){
    $("#Imprimir").modal("hide");
  }, 2500);
        $("#peso_ca").val('');
     

///unidades comienza aca

 //insertar








}




}
});

}         




$("#modal_Componentes_Producion").on("hidden.bs.modal", function () {
    // Aquí va el código a disparar en el evento
});

let relojscrap;


////////etiequeta pesaja scrap
///count para pesaje
function Fscrap(){
  
  
  relojscrap=setInterval(scraps,4000);
   

};

$('#modal_Pesos_scrap').on('hidden.bs.modal', function (event) {
  // do something...  
  //alert("preuba");
  clearInterval(relojscrap);
})


 

  var scraps = function(){

$.post("Listar_Peso_Balanza.php", {}, 
function(data){
       
      

       pesaje=data;

  if(pesaje < 1)
  {


  }else{

        pesaje= pesaje;

//restar pesos

pesoactu2= $("#speso2").text().trim();

if(pesoactu2=="")
{
 var totalPeso = 0+ parseFloat(pesaje);

document.querySelector('#speso2').innerText = totalPeso;
}else{
 var totalPeso =  parseFloat(pesoactu2)+ parseFloat(pesaje);
num = Number(totalPeso.toFixed(2));
document.querySelector('#speso2').innerText = num;
}
//contador al sumar
cantidad2=$("#scantidsca2").text().trim();

if(cantidad2=="")
{
 var registro = 1;

document.querySelector('#scantidsca2').innerText = registro;
}else{
 //contador al sumar
registro=1+parseInt(cantidad2);

document.querySelector('#scantidsca2').innerText = registro;
}
pesoactu= $("#speso2").text().trim();
if(pesoactu=="")
{
 var totalPeso = 0+ parseFloat(pesaje);

document.querySelector('#speso2').innerText = totalPeso;
}else{
 var totalPeso =  parseFloat(pesoactu)+ parseFloat(pesaje);
num = Number(totalPeso.toFixed(2));
document.querySelector('#speso2').innerText = num;
}
//contador al sumar
cantidad=$("#scantidsca2").text().trim();

if(cantidad=="")
{
 var registro = 1;

document.querySelector('#scantidsca2').innerText = registro;
}else{
 //contador al sumar
registro=1+parseInt(cantidad);

document.querySelector('#scantidsca2').innerText = registro;
}

var type=2;
 var item=  $("#sitem").text().trim();

id =$('#idp').text();

var unida=$("#uni").text().trim();

var peso= $("#speso2").text().trim();

$.post("Eliminar_Peso_Balanza.php", {}, 
function(data){

});
$("#Imprimir").modal("show");
$.post("Insertar_Peso.php", {id:id,item:item,peso:pesaje,type:type}, 
function(data){
  $("#LISTA_RESUL").html(data);

  $("#LISTA_RESUL").hide();
    codebar=$('#code').text().trim();
    fec=$('#fe').text().trim();
    
    carcod=$('#sitem').text().trim();
    carnam=$('#nameitem').text().trim();



    document.querySelector('#pesoba').innerText = pesaje;

   

    setTimeout(function(){
      $("#Imprimir").modal("hide");
    }, 2500);




  var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
       
        
        
            blob = new Blob ([data], {tipo: 'texto / plano'}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
 }());
 
 
  var data = [];
 
  data.push('  CT~~CD,~CC^~CT~  ^XA  ~TA000  ~JSN  ^LT0  ^MNW  ^MTT  ^PON  ^PMN  ^LH0,0  ^JMA  ^PR5,5  ~SD25  ^JUS  ^LRN  ^CI27  ^PA0,1,1,0  ^XZ  ^XA  ^MMT  ^PW735  ^LL519  ^LS0  ^FT515,63^A0N,28,28^FH\^CI28^FDFP :^FS^CI27  ^FT579,62^A0N,31,30^FH\^CI28^FD' + fec+ '^FS^CI27  ^BY5,3,88^FT74,236^BCN,,Y,N  ^FH\^FD>;'+codebar+'^FS  ^FPH,2^FT0,443^A0N,23,23^FB211,1,6,C^FH\^CI28^FDITEMCODE  ^FS^CI27  ^FPH,2^FT0,487^A0N,23,23^FB217,1,6,C^FH\^CI28^FDDSCRIPTION^FS^CI27  ^FT210,445^A0N,23,23^FH\^CI28^FD'+ carcod +'^FS^CI27  ^FT206,489^A0N,23,25^FH\^CI28^FD'+ carnam +'^FS^CI27  ^FT58,134^BQN,2,4  ^FH\^FDLA,'+codebar+'^FS  ^FT190,443^A0N,23,23^FH\^CI28^FD:^FS^CI27  ^FT190,487^A0N,23,15^FH\^CI28^FD:^FS^CI27  ^FT364,373^A0N,90,51^FH\^CI28^FD'+pesaje +' KG^FS^CI27  ^PQ1,0,1,Y  ^XZ    ');    
    fileName = "Fibraticket.prn";
       saveData(data, fileName);
 
 
 
});
document.querySelector('#pesoba').innerText = pesaje;





}




});

  
};