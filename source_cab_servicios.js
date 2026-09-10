

function pone_lista_servicios(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_service").html("Recuperando usuarios...");
        },
        url: 'consulta_cab_servicios.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_service").html(x);
          $("#tabla_users").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}

function reg_service(){

    $('#modal_registrar').modal('show');
$("#codigo_reg").val('');
    $("#obj_reg").val('');
    $("#serie_reg").val('');
    $("#tpser_reg").val('');
   $("#descripcion_reg").val('');
   
}

function registrar_datos(){
    codigo=$("#codigo_reg").val();
    obj=$("#obj_reg").val();
    serie=$("#serie_reg").val();
    tpser=$("#tpser_reg").val();
    descrip=$("#descripcion_reg").val();
   

    $.post("registrar_datos_servi.php", 
    {codigo:codigo,obj:obj,serie:serie,tpser:tpser,descrip:descrip}, 
    function(data){ 
        alertify.success('El Campo se registró correctamente.');
        pone_lista_servicios();
    });



}