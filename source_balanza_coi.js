///lista el combo de vendedores
function PESAJE(){


  $("#modal_Componentes_Producion").modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
    
    $('#balanzas').css("visibility", "hidden");
  };







  function buscaarticulocompras() {
    

      $("#modal_add_servicio").modal("show");


    };

    

    

  function buscaarticulodescompras() {
    

      $('#modal_add_servicio').modal('show');

  descri=$('#articulo_buscar').val();
 
    
  

  $.post("Listar_Descripcion_combo.php", {descri:descri }, 


          function(x){

       $("#lista_ITEMS").html(x);

       $('#escp').DataTable();
       
} );

    }



    function mostraritem(item) {
    ///activamos el servicio de balanza
    FOper();

  $.post("Listar_ITEM_SELEC.php", {item:item }, 


  function(x){

$("#lista_datos_item").html(x);


$('#modal_add_servicio').modal('hide');
ruteo();

} );



    };

    function ruteo() {

      $(document).ready(function() {
    $(".mask").inputmask('Regex', {regex: "^[0-9]{1,6}(\\.\\d{1,4})?$"});
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
          checkboxClass: 'icheckbox_flat-green',
          radioClass   : 'iradio_flat-green'
        });

      });
      };



    /////evento para ocultar al activar el chek
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifChecked', function(event){


      $('#balanzas').css("visibility", "hidden");
     FOper();
      alertify.success('Acaba de activar la balanza');
  });
  
  
  
  
      /////evento para mostrar  al desactivar el chek
  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifUnchecked', function(event){

   
      $('#balanzas').css("visibility", "visible");
      clearInterval(reloj);

      alertify.success('Acaba de desactivar la balanza');


  });
  
  

  ////funcion del servicio q consulta a la bd de la balanza

  let reloj;

  ///count para pesaje
function FOper(){


  
  reloj= setInterval(imprimir,4000);
 
 
  
 
 };
 


 ///funcion para imprimir las equetas atravez de la balanza
 var imprimir = function(){

  $.post("Listar_Peso_Balanza.php", {}, 
  function(dataa){
 //  alert(data);.
 $("#datapesado").html(dataa);
 $("#datapesado").hide();
       pesaje=$("#pesocar").text();
       tipo=$("#balacar").text();
        


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
      var cajap=     $("#tara option:selected").val();
      var itemp=  $("#item").text().trim();
      if(cajap=="Seleccione Caja"){

          alertify.error('No Puede Pesar si no Seleciona un combo');


         

      }
      
      if(itemp== ''){

   
          clearInterval(reloj);

      }
      
      else{


  
  $.post("Eliminar_Peso_Balanza_coi.php", {}, 
  function(data){
  
  });
  

  
  var item=  $("#item").text().trim();
  var pesobruto= pesaje.trim();


  
  var caja=     $("#tara option:selected").val();
 
  var psunit=  $("#peso_unit").val();
  
      
  //alert(id);
  $.post("Insertar_Peso.php", {item:item,pesobruto:pesobruto,caja:caja,psunit:psunit,tipo:tipo}, 
  function(data){
  //IGRESP
  //alert(data);
  
  $("#LISTA_RESUL").html(data);
  
  $("#LISTA_RESUL").hide();

    codebar=$('#code').text().trim();
    fec=$('#fe').text().trim();
    psbru=$('#psuni').text().trim();
    pscaja=$('#pscaja').text().trim();

    pesoneto=psbru-pscaja;
    tipobalan=$('#tbalanza').text().trim();
 

      //pes=psuni.replace(/[.\W]+/g, "");
      if(tipobalan =='1')
      {
        pes=pesoneto.toFixed(2);
      }else{
        peso=pesoneto/1000;
      
        pes = peso.toFixed(2)
        
      }


 

    numer=$('#cat').text().trim();
 
    marca=$("#marca").text().trim();
    $("#Imprimir").modal("show");
    document.querySelector('#pesoba').innerText = pesobruto;
    document.querySelector('#etique').innerText = codebar;


  //cantiImPRE=parseInt($("#Idcanti option:selected").text());
 
  
  //stepd=0;
  //for (let stepd = 0; stepd < cantiImPRE; stepd++) {
  
   



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
  
   data.push( 'CT~~CD,~CC^~CT~     ^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR10,10~SD18^JUS^LRN^CI0^XZ     ^XA     ^MMT     ^PW831     ^LL0200     ^LS0     ^FT41,48^A0N,17,16^FH\^FDCATALOGO:^FS     ^FT41,77^A0N,17,16^FH\^FDMARCA:^FS     ^FT136,48^A0N,20,19^FH\^FD'+numer+'^FS     ^FT136,77^A0N,20,19^FH\^FD'+marca+'^FS     ^FT41,98^A0N,11,12^FH\^FD'+pes+'^FS     ^BY2,3,71^FT41,170^BCN,,Y,N     ^FD>:'+codebar+'^FS     ^FT477,48^A0N,17,16^FH\^FDCATALOGO:^FS     ^FT477,77^A0N,17,16^FH\^FDMARCA:^FS     ^FT572,48^A0N,20,19^FH\^FD'+numer+'^FS     ^FT572,77^A0N,20,19^FH\^FD'+marca+'^FS     ^FT477,98^A0N,11,12^FH\^FD'+pes+'^FS     ^BY2,3,71^FT477,170^BCN,,Y,N     ^FD>:'+codebar+'^FS     ^PQ1,0,1,Y^XZ ');                 
   fileName = "etiqimob.prn";
        saveData(data, fileName);
  

  });
  
      
     
  
  
           setTimeout(function(){
      $("#Imprimir").modal("hide");
    }, 2500);
       
       
  

  
  
  
  
  
  
  }
  
  
}
  
  }
  });
  
  }         
  




    ///count para pesaje
function PESAR(){
  balanza_manual =$('#peso_balan').val();

  var cajap=     $("#tara option:selected").val();
  if(balanza_manual =='')
  {
      alertify.error('No Puede Registrar un Peso Vacio');
  }
  
  if(cajap=="Seleccione Caja"){

      alertify.error('No Puede Pesar si no Seleciona un caja');
  }
  else 
  {
    
    
      
  
      var item=  $("#item").text().trim();
      var pesobruto= balanza_manual;
      var cantidad= 2;    
      var caja=     $("#tara option:selected").val();
     
  
      
          
      //alert(id);
      $.post("Insertar_Peso.php", {item:item,pesobruto:pesobruto,cantidad:cantidad,caja:caja}, 
      function(data){
      //IGRESP
      alert(data);
      
      $("#LISTA_RESUL").html(data);
      
      $("#LISTA_RESUL").hide();
  
        codebar=$('#code').text().trim();
        fec=$('#fe').text().trim();
        
        numer=$('#cat').text().trim();
     
        marca=$("#marca").text().trim();
        $("#Imprimir").modal("show");
        document.querySelector('#pesoba').innerText = pesobruto;
        document.querySelector('#etique').innerText = codebar;
      //cantiImPRE=parseInt($("#Idcanti option:selected").text());
      
      //stepd=0;
      //for (let stepd = 0; stepd < cantiImPRE; stepd++) {
      
       
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
      
       data.push( 'CT~~CD,~CC^~CT~          ^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR13,13~SD15^JUS^LRN^CI0^XZ          ^XA          ^MMT          ^PW831          ^LL0200          ^LS0          ^BY4,3,73^FT31,148^BCN,,Y,N          ^FD>;'+codebar+'^FS          ^FT117,41^A0N,17,16^FH\^FD'+numer+'^FS          ^FT31,41^A0N,17,16^FH\^FDCATALOGO:^FS         ^FT31,66^A0N,17,16^FH\^FDMARCA:^FS          ^FT117,66^A0N,17,14^FH\^FD'+marca+'^FS ^BY4,3,73^FT467,148^BCN,,Y,N     ^FD>;'+codebar+'^FS     ^FT553,41^A0N,17,16^FH\^FD'+numer+'^FS     ^FT467,41^A0N,17,16^FH\^FDCATALOGO:^FS     ^FT467,66^A0N,17,16^FH\^FDMARCA:^FS     ^FT553,66^A0N,17,14^FH\^FD'+marca+'^FS     ^PQ1,0,1,Y^XZ'  );  
         
       fileName = "etiqimob.prn";
            saveData(data, fileName);
      
  
      });
      
          
         
      
      
               setTimeout(function(){
          $("#Imprimir").modal("hide");
        }, 2500);
           

  }




};
