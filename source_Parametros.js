function lista_Lectura_Temporal(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#pone_clientes").html("Recuperando proveedores...");
      },
     url: 'Listar_Cab_TabAuto.php',
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
  //////abrir detalle
  //function detalle_tabla(id){
    //var item= id;

    //$(document).ready(function() {  
  
      //$.post("activar_usuario.php", 
        //{item:item}, 
        //function(data){
          //  pone_lista_usuarios()
            //$("#lista_scaneo6").html(data);
        //  }); 
    //}) ;
  
  //
//}

/// detalle

function detalle_tabla(id){
 $idtabla= id;
//  alert(id);

$(document).ready(function() {
  $('#modal_detalletabla').modal('show');



$.post("Listar_det_Servicio.php", {id:$idtabla}, 
   function(data){

$("#lista_dettabla").html(data);
$("#escp").DataTable();


   //devulve las filas del body de tu tabla segun el ejemplo que brindaste

    var $tblrows = $("#escp tbody tr");
      

     $conta=1;

    $tblrows.each(function () {
      $conta++;
     $comboid="combosap"+$conta;

     //console.log($comboid);
 var $tblrow = $(this);

   $Line2 = $tblrow.find("[name=namesa]").val();

valuecombo= $("#"+$comboid+" option:selected").val();
datocombo=$("#"+$comboid+" option:selected").text();


   $("[name='namesa']  option[value='"+$Line2+"'").attr("hidden",true);
   //alert(datocombo);
   $("#"+$comboid+"").prepend("<option value='"+valuecombo+"' >"+datocombo+"</option>");
   //$('#combosap2').prepend("<option value='1' >Josh_reder</option>");



  //console.log($Line2 +'ingresos');
  })
     }); 

     
  

}) ;
}

//function resive(id,value){



//$.post("actualiza_combo.php", {id:id,value:value}, 
  // function(data){
    //$("#combonsap").html(data);
    //$(".select2").select2();
 // }); 
//}


///////eliminar los nombres de proceso


 function Eliminar_nombre(id){
  var id2= id;



  alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


    eliminar_Regis_Pro(id2);
alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");



}


//eliminnar registrros scaneados

function eliminar_Regis_Pro(id){
  var id= id;




$(document).ready(function() {

$.post("Eliminar_Camp_Servicios.php", {id:id}, 
   function(){
  

detalle_tabla($idtabla);



     }); 
}) ;



}




//////PROCESAR LOS SERVICIOS Y VALIDAR QUE TODO ESTE OK


function  PROCESAR(){
  //$validacampos=0;
  var $tblrows = $("#escp tbody tr");
  
 // $tblrows.each(function () {
    //var $tblrow = $(this);

  //  $Line3 = $tblrow.find("[name=valido]").val();

//if($Line3=='1'){

//$validacampos++;

//}else{






  

//}
  //})



 // if($validacampos=='0'){

    $tblrows.each(function () {
      var $tblro = $(this);
      $id = $tblro.find("[name=id]").text();
   
      $TIPOCD = $tblro.find("[name=tipo] option:selected").val();
      $VALOR= $tblro.find("[name=val] option:selected").val();
    
      if($id=='0')
      {
        $val = $tblro.find("[name=namesap] option:selected").val();


        if($TIPOCD=='')
        {
          $TIPO=2;
        }else{
          $TIPO = $tblro.find("[name=tipo] option:selected").val();
        }

        if($VALOR=='')
        {
          $VAL="F";
        }else{
          $VAL= $tblro.find("[name=val] option:selected").val();
        }





        $.post("Insertar_NameSap.php", {id:$val,nameproce:$nameproce,TIPO:$TIPO,VAL:$VAL,docentry:$idtabla},
        function(data1){

        });




      }else{

        $updatval = $tblro.find("[name=namesap] option:selected").val();

 $.post("Actualizar_NameSapService.php", {id:$id,updatval:$updatval,TIPOCD:$TIPOCD,VALOR:$VALOR},
        function(data1){

        });
      
      }


    })
  //  }else{
//
  //    alertify.error('hay  '+$validacampos+' nombres incorrectos en SP');
    //}
    


}
