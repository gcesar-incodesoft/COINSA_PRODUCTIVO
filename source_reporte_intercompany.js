function pone_lista_campos_sap(){ 
  
  var fechai = $("#fechai").val();
  var fechaf = $("#fechaf").val()
  var motivo = $("#moti_xd").val();
  if (motivo = null) {
      motivo = '0';
  }else{
    var motivo = $("#moti_xd").val();
  }
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_tablasauto").html("Recuperando usuarios...");
        },
        url: 'busca_data_intercompany.php',
        type: 'POST',
        data: {fechai, fechaf, motivo},
        success: function(x){
          $("#lista_tablasauto").html(x);
          $("#tabla_intercompany").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function mostrar_modal_error(error,linea) {
  console.log(error[0]);

  swal({
    icon: "error",
    title: "Errores Migracion ",
    content: {
      element: "div",
      attributes: {
        innerHTML: "<strong>Error Factura:</strong> " + error[0].error_factura
      },
    }
  });
}
function lista_motivo_itercompany() {
  console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#motivo").html("Recuperando Lista ...");
      },
      url: "pone_motivo_intercompany.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#motivo").html(x);
        $(".select2").select2();
        pone_lista_campos_sap();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}
function exportar_excel(){
   
  var fechai = $("#fechai").val();
  var fechaf = $("#fechaf").val()
  var motivo = $("#moti_xd").val();


  fecha_inicio = $("#fechai").val()
  if (fecha_inicio === '') {
    fecha_inicio = '01-01-2024';
  } else {
    fecha_inicio = $("#fechai").val()
  }
  fechaf = $("#fechaf").val()
  motivo = $("#moti_xd").val();
  if (motivo = null) {
    motivo = '0';
  }else{
    var motivo = $("#moti_xd").val();
  }

  javascript: window.open('excel_reporte_intercompany.php?&fechai=' + fechai + '&fechaf=' + fechaf + '&motivo='+ motivo + '');


}