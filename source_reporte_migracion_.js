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
          // $("#lista_tablasauto").html("Recuperando usuarios...");
          $("#lista_tablasauto").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');

        },
        url: 'busca_data_migracion_.php',
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
  
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#motivo").html("Recuperando Lista ...");
      },
      url: "pone_motivo_migracion.php",
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
function expoexce_reporteMIGRA(){
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
  } else {
    var motivo = $("#moti_xd").val();
  }


  javascript: window.open('reporte_excel_repMigra.php?&fechai=' + fecha_inicio + '&fechaf=' + fechaf + '&motivo1='+ motivo + "");


}
function expoexcel_reporcantidadMIGRA() {

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
  } else {
    var motivo = $("#moti_xd").val();
  }

  javascript: window.open('excel_reportecanMigra.php?&fechai=' + fecha_inicio + '&fechaf=' + fechaf + '&motivo='+ motivo + '');


}

function modal_migra(){

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
  } else {
    var motivo = $("#moti_xd").val();
  }

  $("#modal_migra").modal("show");

  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#tabla_de_modal").html("Recuperando Lista ...");
      },
      url: "consulta_migracion.php",
      type: "POST",
      data:  {fecha_inicio, fechaf, motivo},
      
      success: function (x) {
        $("#detalle_cant_de_migracion").html(x); 
        
     
      },
      error: function (jqXHR, estado, error) { },
    });
  });



}



function updatesatatus(idcola) {
  console.log(idcola);
  $.ajax({
    beforeSend: function () {
      // $("#motivo").html("Recuperando Lista ...");
    },
    url: "actualizar_cola_migracion.php",
    type: "POST",
    data: { idcola },
    success: function (x) {
      pone_lista_campos_sap()
      // $("#motivo").html(x);
      // $(".select2").select2();
      // pone_lista_campos_sap();
    },
    error: function (jqXHR, estado, error) { },
  });

}

