         /*********************************************************************/
function busca_ventas_pedidos_planifi(){
  $(document).ready(function(){
     $.post("buscapedidospendientes_planifica.php", {}, 
             function(data2){
              
          $("#datapedidospendientes").html(data2);
            $('#tablaPEDIDO').DataTable();
     
               }); 

     $p=".0000";
 $( "td:contains('"+$p+"')").css("background-color", "red");
  })
};

      //$( "td:contains('"$p"')").css("background-color", "red");

/****************************************************************************/

$( document ).on( 'click', '#che', function(){

  //Revisa en que status está el checkbox y controlalo según lo //desees
  if( $( this ).is( ':checked' ) ){
 $("#modal_detalle_venta").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });

 $(this).parents("tr").find("td").css( "background-color", "LightGreen" );

   $(document).ready(function() {    
          //lista direciones de clientes

$(":checkbox:checked").each(function(key){
    $sap= $(this).parents("tr").find("td").eq(4).text();
    $dnu= $(this).parents("tr").find("td").eq(2).text();
   $cli= $(this).parents("tr").find("td").eq(5).text();
 $iteCode= $(this).parents("tr").find("td").eq(6).text();
 $itenName= $(this).parents("tr").find("td").eq(7).text();

document.querySelector('#nsap').innerText = $dnu;
document.querySelector('#pru').innerText = $sap;
document.querySelector('#CLien').innerText = $cli;
document.querySelector('#iteCode').innerText = $iteCode;
document.querySelector('#itenName').innerText = $itenName;
});
 $.post("ListaPedidosPendientes_Plani.php", {id:$sap
    },
            function(data2){
        $("#listapendientes").html(data2);
            $('#Tabla').DataTable();
     
            });


});


  }
  else{

    //$(this).parents("tr").find("td").css( "color", "black" );
       $(this).parents("tr").find("td").css( "background-color", "white" );

  
  }
});



/****************************************************************************/
/********Ma ********************************************************************/

$('#modal_detalle_venta').on('hidden.bs.modal', function (event) {

 $("input[type=checkbox]").prop("checked",false);
$("input[type=checkbox]").parents("tr").find("td").css( "background-color", "white" );

  
});
/****************************************************************************/
/********Ma-REGISTRAR ********************************************************************/
 function  OpenInsert(){

 //$(document).ready(function() {    
          //lista direciones de clientes

$(":checkbox:checked").each(function(key){
$Pendi= $(this).parents("tr").find("td").eq(8).text();
$Pla= $(this).parents("tr").find("td").eq(9).text();
$RESTA= $(this).parents("tr").find("td").eq(10).text();
});


$cantidad=$("#ncantidad").val();
if($RESTA =='.0000'){
   alertify.error("Pedido Completado");
}

else if($cantidad ==''){
  alertify.error("ingrese una cantidad");
}
else{
   nega=$("#ncantidad").val();
  nca=Math.abs(nega);
 // alert(nca);

var totalpe= parseFloat($Pla) +parseFloat(nca);
$pedidofal=parseFloat($Pendi)- parseFloat(totalpe);

if($pedidofal < 0)
{
alertify.error("Planificado no puede superar a lo Pendiente")
}else{


  var docentry=[];
var docnum=[];
var Line=[];
var carco=[];
var cli=[];
var iteCode=[];
var itenName=[];   
var oqu=[]; 
var quan=[]; 
var fech=[]; 

$(":checkbox:checked").each(function(key){

  docnum= $(this).parents("tr").find("td").eq(2).text();
  docentry= $(this).parents("tr").find("td").eq(4).text();
  Line= $(this).parents("tr").find("td").eq(16).text();
  carco= $(this).parents("tr").find("td").eq(3).text();
  cli= $(this).parents("tr").find("td").eq(6).text();
  iteCode= $(this).parents("tr").find("td").eq(8).text();
  itenName= $(this).parents("tr").find("td").eq(9).text();
  oqu= $(this).parents("tr").find("td").eq(15).text();


 });


quan=$("#ncantidad").val();
 fech=$("#fechaCrea").val();

   $.post("InsertarPedidio_PendientePlanificado.php", {docentry:docentry,
     docnum:docnum,Line:Line,carco:carco,cli:cli,iteCode:iteCode
    ,itenName:itenName,oqu:oqu,quan:quan,fech:fech},
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

//});
}
};


/****************************************************************************/
/********Ma -eliminar Reguistro Pla********************************************************************/

///////////eliminar item scaneados


 
         function eliminar_Pedido_plani(id){
            var id2= id;
  
 

            alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){


  eliminar_Pedido_plani2(id2);
 alertify.success('Eliminado') 


}, function(){ alertify.error('Cancelado')});
//  var bool=confirm("Seguro de eliminar el dato?");

   

};
//eliminnar registrros scaneados

    function eliminar_Pedido_plani2(id){
            var docEntry= id;
          
           $base=$("#nsap").text(); 

   $(document).ready(function() {
    
$.post("Eliminar_Pedido_Planifi.php", {docEntry:docEntry,base:$base}, 
             function(data){

                  $("#listapendientes").html(data);
            $('#Tabla').DataTable();
         
$.post("buscapedidospendientes_planifica.php", {}, 
             function(data2){
     $("#datapedidospendientes").html(data2);
            $('#tablaPEDIDO').DataTable();
            
               }); 
  }); 

swal(
    "El registro fue elimino ",
    "Cargando...",
     "success",
    2000,

);

setTimeout('location.reload()',2000);
          }) ;

   

};


///exportar en excel
////exportar en excel
//
$(document).ready(function(){

$("#btnExport").click(function(e) {
     window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('#datapedidospendientes').html()));
        e.preventDefault();
  })
});
$( document ).ready(function() {
$("#btnExpor").click(function() {
var export_type = $(this).data('export-type');
$('#datapedidospendientes').tableExport({
type : export_type,
escape : 'false',
ignoreColumn: []
});
});
});

   ///////////////consultar detalle pedidos en PLANIFICACION PRODUCCION
   function Consultar_Detalle_PlanificacionProd(id){
    var id= id;
  //  alert(id);
  
  $(document).ready(function() {
    $('#modal_detalle_pedido_planif').modal('show');
  
  
  
  $.post("Listar_Detalle_Pedidos_Planif.php", {id:id}, 
     function(data){
  
  $("#detalle_pedido_planif").html(data);
  
  $("#idpedido").val(id);
  //  $('#OCS').DataTable(); 
       }); 
  
  
  
  
  }) ;
  }
  