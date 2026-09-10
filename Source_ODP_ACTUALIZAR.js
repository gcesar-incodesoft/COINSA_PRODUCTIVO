 
 /////Lista N°CORRELATIVO

/////////////////////////////////////////////////
 
 
 
 
 //////listar Ntraslado
 function lista_NTraslado(){
  $(document).ready(function() {
 
   $.ajax({
   beforeSend: function(){
     $("#lista_Clien").html("Recuperando proveedores...");
    },
   url: 'Listar_ODP_ACTUALIZAR.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#lista_Clien").html(x);
     $(".select2").select2();
     $("#btna").hide();
     $("#btco").hide();
     
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
  }
////////////////////////////////////
function buscaComponentesAct(){
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