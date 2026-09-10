
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
sede=$("#Idsede option:selected").val();
//alert(fechac);
//combo de centro de costos
$.post("Listar_PersonalSinAsig_RH.php", {fechac:fechac,sede:'-1'},
function(data1){

$("#lista_Personal").html(data1);
$('#esca').DataTable(); 
$(".select2").select2();

$.post("Listar_Personal_Asignado.php", {fechac:fechac,sede:sede},
function(data){

    $("#tabla_Costo").html(data);

});
});



});
}

////
$("#fecha").on('changeDate',  function() {

    fechac= $("#fecha").val();

  sede=$("#Idsede option:selected").val();
 
           
            $.post("Listar_PersonalSinAsig_RH.php", {fechac:fechac,sede:sede},
            function(data2){
     
                $("#lista_Personal").html(data2);
                $('#esca').DataTable(); 
              });
              $.post("Listar_Personal_Asignado.php", {fechac:fechac,sede:sede},
              function(data){
              
                  $("#tabla_Costo").html(data);
              
              });
       




   
 }); 
///////////////////FILTRARA POR COMBO DE SEDE
$(document).ready(function(){

    $("#Idsede").on('change',  function () {
        $("#Idsede option:selected").each(function () {
            sede=$(this).val();
    
            fechac= $("#fecha").val();

    //   $('#btnLeer').attr("disabled", true);


    
    $.post("Listar_PersonalSinAsig_RH.php", {fechac:fechac,sede:sede},
    function(data2){

        $("#lista_Personal").html(data2);
        $('#esca').DataTable(); 
      });

      $.post("Listar_Personal_Asignado.php", {fechac:fechac,sede:sede},
              function(data){
              
                  $("#tabla_Costo").html(data);
              
              });


        });
   });
});

 ////

 CONTA = 0;
     $( document ).on( 'click', '#che', function(){


 

      //Revisa en que status está el checkbox y controlalo según lo //desees
      if( $( this ).is( ':checked' ) ){


CONTA ++;
  
     DNI =  $(this).parents("tr").find("td").eq(1).text();
     TRABAJADOR =  $(this).parents("tr").find("td").eq(2).text();
     ID =  $(this).parents("tr").find("td").eq(3).text();;
     
     fechac= $("#fecha").val();

     //$.post("validarUltinmo_regis.php", {fechac:fechac},
        // function(data2){
    //$fecha=data2;
   //+ alert($fecha);
//if ($fecha == 0)

//{ 
  //$.post("validarTurno_regis.php", {fechac:fechac,turn:turn,id:ID},
  //function(data3){
    //$tur=data3;
    //alert($tur);
    //if ($tur == 1)
    //{/ 
      $("#tabla_Costo > tbody " ).append("<tr><td style='text-align: center;'><input class='CheckedAK' type='checkbox' id='chet' val='chet'  checked disabled ></td> <td class='center'>"+DNI+"</td><td class='center'>"+TRABAJADOR+"</td><td class='center' style='display:none'>"+ID+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
  
    //}else{ 
      //alertify.error('El usuario ya cuenta con un Turno');
    //}
  //});


 
//}else{   
  //alertify.error('hay '+ $fecha+ '. ');
      //i++;
  //}

//          });

     




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
    
    });





    ///////////////////////INSERTAR DATA 

    
   function GuardarCosto(){

    //    valor=$('.icheckbox_flat-green').attr('aria-checked') ;
    
   
   fechacos=$("#fecha").val();

  
  
   $(".CheckedAK:checked").each(function(){
  
      $DNII= $(this).parents("tr").find("td").eq(1).text().trim();
    
       $TRABAJ= $(this).parents("tr").find("td").eq(2).text().trim();
       
         $idIN= $(this).parents("tr").find("td").eq(3).text().trim();
    
  
   
          $.post("Insertar_ASISTENCIACCOSTO.php", {DNII:$DNII,TRABAJ:$TRABAJ,idIN:$idIN,fechacos:fechacos},
          function(data2){
  
  
         });
         swal(
          "Su Guia fue Generada",
          "Cargando...",
           "success",
          2000,
      
      );
  
      
    setTimeout('location.reload()',2000);
        
   
  
    
    
    });
  
  
    //setTimeout('location.reload()',2000);
  
  
  
  
  
   
  
   }


   ///////ELIMINAR ITEM 

   $(function(){
    // Evento que selecciona la fila y la elimina
   $(document).on("click",".delete",function(){
     
    event.preventDefault();
     var s=$(this);
    id =  $(this).parents("tr").find("td").eq(4).text();
    //dniR= $(this).parents("tr").find("td").eq(1).text().trim();
  
    // parent = $(this).parents().parents().get(0);
  

        alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){
  

         $(s).closest('tr').remove();
       // $(parent).remove();
      Eliminar_Item_CCOSTO(id);
        //alert(parent);
      }, function(){ alertify.error('Cancelado')});
         })
         
        
     // alert("diferente");
    
     //alert("no ingresa");
      
    
    
  
  
    //  var bool=confirm("Seguro de eliminar el dato?");
   
  
    //var parent = $(this).parents().parents().get(0);
  
  
  
  
  //$(parent).remove();
 // });
  });
  
  //eliminnar registrros SELECIONADOS 
  
  function Eliminar_Item_CCOSTO(id){
    var proc=id
  if(proc === " Eliminar")
  {
    alertify.success('Eliminado') 
}else{
    fechac= $("#fecha").val();

    sede=$("#Idsede option:selected").val();

    $(document).ready(function() {
    //alert(id);
        $.post("Eliminar_Asignacion.php", {id:id}, 
                     function(data){
        
        
                       
                  alertify.success('Eliminado') 
                  $.post("Listar_PersonalSinAsig_RH.php", {fechac:fechac,sede:sede},
                  function(data2){
           
                      $("#lista_Personal").html(data2);
                      $('#esca').DataTable(); 
                    });
                       }); 
                  }) ;
}
  }
  
  ///eliminar con onclick
    
 // efunction Eliminar_Selecio(id){
//alert(id);
    
//}

///generea reporte de asistencia
function Gexof(){
  fecha= $("#fecha").val();
  sede=$("#Idsede  option:selected").val();

 javascript:window.open('Rep_Personal_sinAsignar.php?fecha='+fecha+'&sede='+sede+'');

};





$( document ).on( 'click', '#check', function(){


 

  $(".CheckePr").prop("checked", this.checked);


      //Revisa en que status está el checkbox y controlalo según lo //desees
      if( $( this ).is( ':checked' ) ){

        $(".CheckePr:checked").each(function(){
        CONTA ++;
          
             DNI =  $(this).parents("tr").find("td").eq(1).text();
             TRABAJADOR =  $(this).parents("tr").find("td").eq(2).text();
             ID =  $(this).parents("tr").find("td").eq(3).text();;
             
             fechac= $("#fecha").val();
 
              $("#tabla_Costo > tbody " ).append("<tr><td style='text-align: center;'><input class='CheckedAK' type='checkbox' id='chet' val='chet'  checked disabled ></td> <td class='center'>"+DNI+"</td><td class='center'>"+TRABAJADOR+"</td><td class='center' style='display:none'>"+ID+"</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
          
           
        
        
        
        
              }) }
        
                  /*************************************QUITAR ITEM DE LA OTRA LISTA*****************************************************/
              else{
                $(".CheckedAK:checked").each(function(){
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
        
        });
        
        
        
        
        
        
           
              }

});