function lista_proveedor(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#proveedor").html("Recuperando proveedores...");
      },
     url: 'pone_proveedores.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#proveedor").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    }


    //////$(document).ready(function(){

    $("#proveedor").on('change',  function () {
      $("#proveedor option:selected").each(function () {
          elegido=$(this).val();
          $global= elegido;


  //   $('#btnLeer').attr("disabled", true);

          $.post("lista_Pedidos_Pendientes.php", { elegido2: elegido }, 

        function(data){
          $('#pedidos_proveedor').html('');
      
              $("#pedidos_proveedor").html(data);
                   $(".select2").select2();
        
   
           }); 
      });
 });




 //////

function verdato(){
  $(document).ready(function() {

   docent=$("#pedidos_proveedor :selected").map((_, e) => e.value).get();
   varch=String(docent);


   $("#modal_busqueda_arts").modal({
    show:true,
    backdrop: 'static',
    keyboard: false
  });
$.post("lista_ordenescompra.php", { doccomp: varch }, 

function(data){
 
  $("#lista_Ordenes").html(data);
$('#esca').DataTable(); 

   }); 

           
          });
}


////agregar datos a la tabla temporal
function agrega_lista(){

  $(":checkbox:checked").each(function(key){


    $id= $(this).parents("tr").find("td").eq(1).text();
    $ndoc= $(this).parents("tr").find("td").eq(2).text().trim();
    $line= $(this).parents("tr").find("td").eq(3).text().trim();
    $des= $(this).parents("tr").find("td").eq(4).text().trim();
    $canti= $(this).parents("tr").find("td").eq(5).text().trim();
    $precio= $(this).parents("tr").find("td").eq(6).text().trim();
    $ca= $(this).parents("tr").find("td").eq(7).text().trim();


    var $tblrows = $("#suma tbody tr");
    
    $tblrows.each(function (index) {
      var $tblrow = $(this);
      $qbase = $tblrow.find("[name=base]").val();
    });

    if($id.length === 0){

      alertify.success('Seleccione algun Pedido');
    }else{
//llena la tabla con los datos
$("#tabla_articulos > tbody").append("<tr><td class='center' style='display:none'>"+$id+"</td><td class='center'>"+
$ndoc+"<td class='center'>"+$line+"</td><td class='center'>"+
$des+"</td><td class='center' >"+$canti+"</td><td class='center'>"+
$precio+"</td><td class='center'>"+
$ca+"</td><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");

}
});
}