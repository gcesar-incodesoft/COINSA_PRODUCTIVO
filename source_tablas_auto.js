function pone_lista_campos_sap(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_tablasauto").html("Recuperando usuarios...");
        },
        url: 'consulta_Tablas_Automatiza.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_tablasauto").html(x);
          $("#tabla_users").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function reg_tabla() {
    $('#modal_registrar').modal('show');
    pone_lista_servicio();
}


function pone_lista_servicio(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_Servicios").html("Recuperando usuarios...");
        },
        url: 'consulta_padres_servicios.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_Servicios").html(x);
          $(".select2").select2();
        },
        error: function(jqXHR,estado,error){}
        });
    });
  }


  //seleccionar servicio 
$(document).ready(function(){

    $("#lista_Servicios").on('change',  function () { 
        $("#lista_Servicios option:selected").each(function () {
            id=$(this).val();         

           $.post("Consulta_tablas_xUsuario.php", { id: id },

              function(data1){
            $("#CampoxUsuario").html(data1);
            $(".select2").select2();

             });

         
        });
   });
});




function registrar_datos(){


    $(document).ready(function() {

        service=$("#lista_Servicios option:selected").val();
        cxusuario=$("#CampoxUsuario option:selected").val();
        nprocedure=$("#obj_reg").val();
        tcabecera=$("#tipo_activo option:selected").val();
        vdato=$("#valor_dato option:selected").val();

    

        $.post("Registra_tablaautomatizada.php", 
        {service:service,cxusuario:cxusuario,nprocedure:nprocedure,tcabecera:tcabecera,vdato:vdato}, 
        function(data){ 
            alertify.success('El Tabla se registró correctamente.');
            pone_lista_campos_sap();
        });


    });
  }