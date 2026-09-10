


      ////////////////


function lista_Lectura_Temporal(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#pone_clientes").html("Recuperando proveedores...");
      },
     url: 'Consulta_Temporal_Packing.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_leidos").html(x);
    
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }



    //////generarar packing list
    
$(document).ready(function(){

    $("#nombre_c").on('keypress',  function (e) {
       if(e.which == 13) {
       

      cai=$('#nombre_c').val();
     

 
        $.post("Insertar_Detalle_Packing.php", {codb:cai}, 
 
            function(data){
 
           
 
 
                 $("#detalle_de_venta").html(data);
 
   va = $("#valor").text();
   PE = $("#Peso").text().trim();
   $('#valor').hide();
   if(va==1)
   {
     alertify.success('El codigo ya fue leido');
 $('#nombre_c').val('');
   }
   if(va==2)
   {
     alertify.success('El codigo no fue encontrado');
 $('#nombre_c').val('');
   }
 
  
   if(va==3)
   {
    alertify.success('El codigo ya fue leido en un packink');
     $('#nombre_c').val('');
   }
 
   if(va== 8)
   {
     alertify.error("llene sus datos");
 
     $('#nombre_c').val('');
 
   }

   if(PE > 0){
 
     $('#btnGuardar').attr("disabled", false);
 
 
 
 
 $('#nombre_c').val('');
 
   alertify.success('INSERTADO ');

 
              $.post("Consulta_Temporal_Packing.php", {},
              function(x){
                $("#lista_leidos").html(x);
             
            });
 
 
 
 
     
       }
       
 else{
 
 }
          
 }
 
 
 
     
 
 
 );


       };
   });
});


/////////GENERAR PACKING LIST ////////////////////


 ///
function Generar_Packing(){

  alertify.confirm('Generar', 'Desea Generar Packing?', function(E){


    Inserta_Packing();
  
  
  
  }, function(){ alertify.error('Cancelado')});
  


}






////






function Inserta_Packing(){



  obser= $("#observa").val(); 

  $(document).ready(function() {    
    var id=[];

if(obser==''){
  alertify.warning('Agrege una observacion');
}else{



  $(":checkbox:checked").each(function(key){

    id[key]= $(this).parents("tr").find("td").eq(1).text();
    idp= $(this).parents("tr").find("td").eq(1).text();


  });

  if(id.length === 0){

    alertify.warning('Seleccione algun Producto');
  }else{
    $.post("insertar_cab_packing.php", {obser:obser },
    function(data){
  
      //$("#nguia").html(data); alert(nguia2);
   //alert(data);
      $("#nguia").html(data);
  
      $("#nguia").hide();
  
  
   idcab=$("#nguia").text().trim();
  
   DocEnt=$("#lista_Pedi option:selected").val();
   CardCo=$("#pone_clientes option:selected").val();
  
  
  
   ////
       $(":checkbox:checked").each(function(key){
  
        id[key]= $(this).parents("tr").find("td").eq(1).text();
        idp= $(this).parents("tr").find("td").eq(1).text().trim();
      
         
  
    ////se actualiza las lecturas del packin
       $.post("Actualizar_det_packing.php", {nguia2:idcab,id:idp},        
       function(data1){
  
          $.post("Consulta_Temporal_Packing.php", {doc:DocEnt,card:CardCo},
          function(x){
          $("#lista_leidos").html(x);
          $.post("Consulta_CabPacking.php", {id:idcab},
        function(x){
      
          $("#LISTA_RESUL").html(data);

$("#LISTA_RESUL").hide();

  imrpimir();
       
            });
          
      });
       });
  
      
  
        });
       
         



      });

  }





}}

);
}


function imrpimir(){
  codebar=$('#code').text().trim();
  fec=$('#fe').text().trim();
  carcod=$('#item').text().trim();
  carname=$('#dscr').text().trim();
  carnam=carname.substring(0,40)+' -';
  carnam2=carname.substring(40,150);
  um='PQT'

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

     swal(
      "Su Guia fue Generada",
      "Cargando...",
       "success",
      2000,
  
  );
};
/////////////////MOSTRAR DETALLE DE LOS PACKING LIST LEIDO //////////3

function Mostrar_Det_Packing(user,item){



  $("#modal_sca").modal({
    show:true,
    backdrop: 'static',
    keyboard: false
  });
  $.post("Consulta_Detalle_Lectura_Packing.php", {user:user,item:item},
  function(x){
    $("#lista_scaneo2").html(x);
 
});

};