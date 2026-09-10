


////detener o iniciar el servicio


$(document).on('click', '#estado', function () {

  var s = $("#estado").is(":checked");

  if (s == true) {

    $.post("cambiarstado_service.php", { stado: 1 },
      function (data1) {

      });
    alertify.success('El servicio ha sido activado');

  }
  else {
    $.post("cambiarstado_service.php", { stado: 2 },
      function (data) {

      });
    alertify.error('El servicio ha sido detenido');

  }

});







////mostrar el estado actual del servicio






function lista_status() {

  $.post("Consulta_status_service.php", {},
    function (data1) {

      $statu = data1.trim();


      if ($statu == '') {

        $("#estado").prop("checked", false);
      } else {



        $("#estado").prop("checked", true);
      }


    });


}


///muestra el estado de todos los servicio al migrar
function lista_service_status() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_leidos2").html("Recuperando proveedores...");
      },
      url: 'consulta_servicio.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_leidos2").html(x);
        $("#Tabla_Esca3").DataTable();
      },
      error: function (jqXHR, estado, error) { }
    });
  });
}


//// ACTIVAR Y DESACTIVAR TODOS LOS SERVICIOS DE MIGRACION
//estados
$(document).on('click', '#estado', function () {
  var s = $(this).is(':checked');

  $('#Tabla_Esca3').find('input[type="checkbox"]').prop('checked', s);

  if (s == true) {
    $.post("Actualizar_service_Gen.php", { STADO: '01' },
      function (data1) {
      });

    alertify.success('Todos los servicios han sido activados');
  } else {
    $.post("Actualizar_service_Gen.php", { STADO: '02' },
      function (data1) {
      });

    alertify.error('Todos los servicios han sido detenidos');
  }
});


//// ACTIVAR Y DESACTIVAR SERVICIOS DE MIGRACION UNO POR UNO
//estados
$(document).on('click', '#estados', function () {
  //  var s = $("#estado").is(":checked");
  var s = $(this).is(':checked')

  DOCENTRY = $(this).parents("tr").find("td").eq(0).text();
  if (s == true) {
    $.post("Actualizar_service.php", { DOCENTRY: DOCENTRY, STADO: '01' },
      function (data1) {
      });

    alertify.success('El servicio ha sido activado');
  }
  else {
    $.post("Actualizar_service.php", { DOCENTRY: DOCENTRY, STADO: '02' },
      function (data) {
      });

    alertify.error('El servicio ha sido detenido');
  }
});



//////reportes de cola de migracion


///
function genera_opcion_GE() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'Mostrar_Fecha_GuiaEmi.php',
      type: 'POST',
      data: 'option=' + 1,
      success: function (res) {
        $("#pone_opcion").html(res);
        $(function () {
          $('#daterange-btn').daterangepicker(
            {
              ranges: {
                'Este dia': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
              startDate: moment().subtract(29, 'days'),
              endDate: moment()
            },
            function (start, end) {
              $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              var xstart = start.format('YYYY-MM-DD');
              var xend = end.format('YYYY-MM-DD');
              $("#fi").val(xstart);
              $("#ff").val(xend);
              //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
            }
          );
        });
        $("#numero_caja").select2();
        $("#numero_ticket").inputmask('mask', { 'alias': 'numeric', 'autogroup': true, 'digits': 0, 'digitsOptional': false });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })
}

///boton de buscar registro de auditoria

function busca_Services_Migrado() {
  fechai = $("#fi").val();
  fechaf = $("#ff").val();
  estado = $("#idEstado option:selected").val();
  if (estado === "Seleccione un Estado") {
    alertify.error('Seleccione un Estado');

  }

  else if (fechai == "") {
    alertify.error('Seleccione un fecha inicio');
  }
  else if (fechaf == "") {
    alertify.error('Seleccione un fecha fin');
  }

  else {
    $.post("Listar_Services_Emitidos.php", { fechai: fechai, fechaf: fechaf, estado: estado },
      function (inf) {

        $("#data").html(inf);
        $('#escp').DataTable();


      });
  }


}


/////mostrar detalle de auditoria

function GenerarDetalle(id, tipo) {

  $('#modal_detalle_auditoria').modal('show');
  $.post("Listar_detalle_auditoria.php", { id: id, tipo: tipo },
    function (inf) {

      $("#detalle_de_errores").html(inf);
      $('#escp').DataTable();


    });



}