function lista_Itms_Oprodu(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#cod_Producto").html("Recuperando proveedores...");
           },
          url: 'Listar_Items_OrdenProduc.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#cod_Producto").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }

   ////////////////////////LISTA CENTRO DE COSTO/////////////////////////
   function lista_ccosto(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_Almacen").html("Recuperando proveedores...");
      },
     url: 'Listar_PersonalCCosto.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#CCOSTO").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }




/////////////////////////////////////////////////////
     function lista_Almacenes_InternosOrden(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#lista_Almacen").html("Recuperando proveedores...");
           },
          url: 'Lista_Almacen_Despacho.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#lista_Almacen").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }
    ///////////////////////
    function busqueda_art(){
   $("#modal_busqueda_arts").modal({
             show:true,
             backdrop: 'static',
             keyboard: false
            });
   $('#modal_busqueda_arts').on('shown.bs.modal', function () {
   $("#lista_articulos").html("");
   $("#articulo_buscar").val("");
   $("#articulo_buscar").focus();
   });
}

//////////////////////////////
function busca(){
    $.ajax({
        beforeSend: function(){
          $("#lista_articulos").html("<img src='dist/img/default.gif'></img>");
          },
        url: 'Lista_Norma_Reparto.php',
        type: 'POST',
        data: 'articulo='+$("#articulo_buscar").val(),
        success: function(x){
         $("#lista_articulos").html(x);
         },
        error: function(jqXHR,estado,error){
          $("#lista_articulos").html("Error en la peticion AJAX..."+estado+"      "+error);
        }
       });
}
///
function add_art(id){
//  alert(id);
//console.log(id);

  $("#modal_busqueda_arts").modal("toggle");
  $("#codigo").html(id.trim());

}

/////////////////////listar ayudante producion
 /////////////////////////////////////////////////


     function lista_Ayudante_Alma(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#lista_Ayudante").html("Recuperando proveedores...");
           },
          url: 'Listar_Ayudante_Producion.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#lista_Ayudante").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }

   /////////////////////////////////////////////////


/////////////////////listar maquinaria de producion
 /////////////////////////////////////////////////


     function Lista_Maquinaria(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#lista_Maquina").html("Recuperando proveedores...");
           },
          url: 'Listar_Maquinaria_Producion.php',
          type: 'POST',
          data: null,
          success: function(x){
            $("#lista_Maquina").html(x);
            $(".select2").select2();
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }

   /////////////////////////////////////////////////

/////Lista N°CORRELATIVO
function Lista_CorrelativoProduc(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#Correlativo").html("Recuperando Correlativo...");
           },
          url: 'Correlativo_OrdenProducion.php',
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
    /////////////////////////////////////////////////


    function buscaComponentes(){
    $.ajax({
        beforeSend: function(){
          $("#lista_articulos2").html("<img src='dist/img/default.gif'></img>");
          },
        url: 'Lista_Componentes.php',
        type: 'POST',
        data: 'articulo='+$("#componente_buscar").val(),
        success: function(x){
         $("#lista_articulos2").html(x);
         },
        error: function(jqXHR,estado,error){
          $("#lista_articulos2").html("Error en la peticion AJAX..."+estado+"      "+error);
        }
       });
}


   ///////////////////////////////////////agrega componente
   function add_ar_Compo(id){

          var id= id;

 $(document).ready(function() {
            $('#modal_combo').modal('show');



$.post("Lista_Almacen_Despacho.php", {}, 
             function(data2){

     $("#lista_Almacenpro").html(data2);
            $(".select2").select2();
            
          }) ;



$.post("Agregar_Combo.php", {id:id}, 
 function(data){

     $("#lista_Almacen_Des").html(data);



               }); 
          }) ;

}

/////////////////////////////////////


///////////// eliminar celdas
function Eliminar_celda(id){

  

 alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  Eliminar_celda2(id);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}
//eliminnar registrros scaneados

    function Eliminar_celda2(id){
  
              
   $(document).ready(function() {

    


           $($(id).closest("tr"))
$($(id).closest("tr")).remove()

      
       




               }) ;

   

}


///cambiar de estado los orden de producion
function lista_Orden_Producion(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#lista_Ordenes").html("Recuperando proveedores...");
           },
          url: 'Consultar_Ordenes_Produciones.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#lista_Ordenes").html(x);
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }



///cambiar de estado los orden de producion cerrar
function Cerrar_Orden_Producion(){
         $(document).ready(function() {
          $.ajax({
          beforeSend: function(){
            $("#lista_Ordenes").html("Recuperando proveedores...");
           },
          url: 'Consultar_Ordenes_Liberadas.php',
          type: 'POST',
          data: null,
          success: function(x){
             $("#lista_Ordenes").html(x);
           },
           error: function(jqXHR,estado,error){
           }
           });
          });
         }


      ///detalle de lectura temporal
  /////////////////////////////////////
   ////// function Consultar_Dl(id,user){
      
    ////        var itemco= id;
    //        user= user;
       
           

      //      $itemglo=itemco;
      //      $userglo=user;
                

         
     
      //   $(document).ready(function() {
        //    $('#modal_CODIGOS').modal('show');
//


//$.post("Agregar_Combo.php", {user:user,item:itemco}, 
  //           function(data){

      //    $("#lista_scaneo").html(data);
    //           }); 
        //  }) ;
//}   

//CAMBIAR DE ESTADO
function LiberarEmision(id){

  

 alertify.confirm('LIBERACION DE OF', '¿Desea Liberar Orden de Fabricacion?', function(E){


  LiberarEmision2(id);
 alertify.success('Su Orden de Fabricaciòn fue Liberado') 


}, function(){ alertify.error('Liberacion de OF Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}



//liberar registro

    function LiberarEmision2(id){
  
              
   $(document).ready(function() {

    

  $.post("Actualizar_Orden_ProducionLIBERADA.php", {id:id},
              function(data1){
 swal(
    "Su Orden de Fabricación fue Liberada",
    "Cargando...",
     "success",
    2000,

);

setTimeout('location.reload()',2000);

             });

      
       




               }) ;

   

}
///cancelar producion

//CAMBIAR DE ESTADO
function CancelarOrden(id){

  

 alertify.confirm('Cerrar DE OF', '¿Desea Cancelar Orden de Fabricacion?', function(E){


  CancelarOrden3(id);
 alertify.success('Su Orden de Fabricaciòn fue Cerrado') 


}, function(){ alertify.error('Cerrar de OF Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

}



//liberar registro

    function CancelarOrden3(id){
  
              
   $(document).ready(function() {

    

  $.post("Actualizar_Orden_Producion.php", {id:id},
              function(data1){
 swal(
    "Su Orden de Fabricación fue Liberada",
    "Cargando...",
     "success",
    2000,

);

setTimeout('location.reload()',2000);

             });

      
       




               }) ;

   

}

///////////////////////Listar Botones Maquinas Panel
function lista_boton_maquinas(){
  
   

  $(document).ready(function() {

         $.ajax({
         beforeSend: function(){
      
           $("#lista_boton_maquinas").html("Recuperando Maquinas Programadas...");
          },
         url: 'Listar_Botones_Maquina_Panel_INI.php',
         type: 'POST',
         data: null,
         success: function(x){
           $("#lista_boton_maquinas").html(x);
               

          },
          error: function(jqXHR,estado,error){
          }
          });
         });
        }
//


/****************************** BUSCA  Informacion de Maquinas por sede ****************************************/
function busca_Lista_Maquinas_Trabajando(){

  $(document).ready(function() {
  
          $.ajax({
          beforeSend: function(){
            $("#lista_boton_maquinas").html("Consultando informacion...");
           },
          url: 'Listar_Botones_Maquina_Panel.php',
          type: 'POST',
          data: 'IdPlanta='+$("#IdPlanta1").val(),
          success: function(x){
            //alert("ingreso");
           // alert(x);
            $("#lista_boton_maquinas").html(x);
            
            // $("#ListaReq_compras2").DataTable({
            //  "order": [[ 1, "desc" ]]
        //  });
           },
           error: function(jqXHR,estado,error){
             $("#lista_boton_maquinas").html(estado+"    "+error);
           }
           });
          });
 }


 /*****************************LISTA OF SAP***********************************************/


 function pone_lista_OFSAP(){
  $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_OFSAP").html("Recuperando Ordenes de Fabricacion...");
        },
        url: 'consulta_OFSAP.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_OFSAP").html(x);
          $("#tabla_OFSAP").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}

 /********************************MODIFICAR UDF OF********************************************/

function modificar_UDF_OF(id,value) {
  $('#modal_modificar').modal('show');
  document.getElementById('cod_activo_modi').value=id;
  $(document).ready(function() {
      $.post("consulta_OFSAP_datos.php", {codigo:id}, 
      function(data2){  
          $("#datosOFSAP").html(data2);    
          document.getElementById('DocEntry').value=$("[name='DocEntry']").text().trim();
          document.getElementById('NumOF').value=$("[name='NumOF']").text().trim();
          document.getElementById('ItemCode').value=$("[name='ItemCode']").text().trim();
          document.getElementById('desc_modifi').value=$("[name='descripcion_modi']").text().trim();
          te_modi = $('#tipo_modi').text().trim(); 
          $('#tipo_modifi').val(te_modi).trigger('change.select2');
          se_modi = $("[name='sede_modi']").text().trim();
          $('#sede_modifi').val(se_modi).trigger('change.select2');
          document.getElementById('campo_ccosto').value=$("[name='ccosto']").text().trim();
          document.getElementById('unidmed').value=$("[name='um']").text().trim();
          document.getElementById('cant').value=$("[name='cantid']").text().trim();
          document.getElementById('kgmod').value=$("[name='kgtot']").text().trim();
          // maq_modi = $("[name='cmaquina']").val();
  listar_maquina(id);
  listar_ccostoofsap(id);
          // $('#lista_Maquina').val(maq_modi).trigger('change.select2');
       
          turno_modi = $("[name='cturno']").text().trim();
          $('#turno_modifi').val(turno_modi).trigger('change.select2');

   
      });
  });
}

function listar_maquina(id) {
  $.post("listar_maq_ofsap.php", {codigo:id}, 
  function(data2){ 
       $("#lista_Maquina").html(data2);
  $(".select2").select2();
}
)
}

function listar_ccostoofsap(id) {
  $.post("listar_ccosto_ofsap.php", {codigo:id}, 
  function(data2){ 
       $("#lista_ccostonew").html(data2);
  $(".select2").select2();
}
)
}

 /****************************************************************************/

 function Actualizar_Datos_UDF_OF() {
  dtipo=document.getElementById('tipo_modifi').value;
  dturno=document.getElementById('turno_modifi').value;
  dmaquina=$("#lista_Maquina option:selected").val().trim();
  dccostonew=$("#lista_ccostonew option:selected").val().trim();
  cod=document.getElementById('DocEntry').value;
  // alertify.error(cod);
  // alertify.error(dtipo);
  // alertify.error(dturno);
  // alertify.error(dmaquina);
  if (dtipo ==="" ){
      alertify.error('Debe Seleccionar Falta Tipo de OF');
  }
  if (dturno ==="" ){
      alertify.error('Debe Seleccionar Turno de OF');
  }

  if (dtipo !== "" && dturno !== "" && dmaquina !== "") {
          
      $(document).ready(function() {
          
          $.post("UpdateDatosOFSAP.php", {code:cod,tipo:dtipo,turno:dturno,maquina:dmaquina,ccostonew:dccostonew}, 
          function(data2){  
   
             
              $('#modal_modificar').modal('hide');
              pone_lista_OFSAP()
          });
      }); 
  }
 
}
 /****************************************************************************/

  //  function Consultar_Detalle_reqcompra(){
    function Consultar_Log_Modificacion(){
    var cod= document.getElementById('DocEntry').value;
    var objtyp= "202";
  //  alert(cod);
  
  $(document).ready(function() {
    $('#modal_log_modificacion').modal('show');
  
  
  
  $.post("listar_log_modificaciones.php", {id:cod,objty:objtyp}, 
     function(data){
  
  $("#lista_log_modif").html(data);
  
  // $("#idpedido").val(id);
  //  $('#OCS').DataTable(); 
       }); 
  
  
  
  
  }) ;
  }

   /****************************************************************************/