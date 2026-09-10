function pone_lista_campos_sap(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_users").html("Recuperando usuarios...");
        },
        url: 'consulta_Campos_Sap.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_users").html(x);
          $("#tabla_users").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}






function reg_usu() {
    $('#modal_registrar').modal('show');
    pone_lista_padres();
}

function pone_lista_padres(){
  $(document).ready(function() {
    $.ajax({
      beforeSend: function(){
        $("#lista_padres").html("Recuperando usuarios...");
      },
      url: 'consulta_padres_servicios.php',
      type: 'POST',
      data: null,
      success: function(x){
        $("#lista_padres").html(x);
        $(".select2").select2();
      },
      error: function(jqXHR,estado,error){}
      });
  });
}




function registrar_datos() {

   
    nombre=$("#nombre_reg").val();
    padre=$("#lista_padres option:selected").val();
    $.post("registrar_datos_usu.php", 
        {nombre:nombre,padre:padre}, 
        function(data){ 
            alertify.success('El Campo se registró correctamente.');
            pone_lista_campos_sap();
        });
}











function Eliminar_CampoSap(codigo){
    var id2= codigo;
    console.log(codigo)
    alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){
  
    dar_baja_2(id2);
    // alertify.success('Eliminado') ;
  
  
  }, function(){ alertify.error('Cancelado')});
  //  var bool=confirm("Seguro de eliminar el dato?");
}
/*******************************************************************************************/
function dar_baja_2(id){
    var item= id;
    $(document).ready(function() {  
  
      $.post("eliminar_campo.php", 
        {item:item}, 
        function(data){
            pone_lista_campos_sap();
           
            alertify.error('El Usuario fue dado de BAJA correctamente.');
          }); 
    }) ;
  
  
}