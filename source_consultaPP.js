function lista_proveedor2() {
  $.ajax({
    beforeSend: function () {
      $("#lista_proveedor").html("Recuperando Lista ...");
    },
    url: "listar_proveedores_prog_pagos.php",
    type: "POST",
    data: '',
    success: function (x) {
      $("#lista_proveedor").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}


function fecha() {
  var fechaSeleccionada = new Date($("#fechai").val());

  fechaSeleccionada.setDate(0);

  //primer día del mes en formato YYYY-MM-DD
  var primerDiaDelMes = fechaSeleccionada.toISOString().split('T')[0];

  $("#fechai").val(primerDiaDelMes);
}


function lista_banco2() {
  $.ajax({
    beforeSend: function () {
      $("#lista_bancoC").html("Recuperando Lista ...");
    },
    url: "lista_bancosPP2.php",
    type: "POST",
    data: '',
    success: function (x) {
      $("#lista_bancoC").html(x);
      $(".select2").select2();
      consultar();
    },
    error: function (jqXHR, estado, error) { },
  });
}



function lista_cod() {
  $.ajax({
    beforeSend: function () {
      $("#lista_codP").html("Recuperando Lista ...");
    },
    url: "lista_codP.php",
    type: "POST",
    data: '',
    success: function (x) {
      $("#lista_codP").html(x);
      $(".select2").select2();

    },
    error: function (jqXHR, estado, error) { },
  });
}


function consultar() {
  setTimeout(() => {
    $.ajax({
      beforeSend: function () {
        $("#lista_consultar").html("Recuperando Lista ...");
      },
      url: "listar_consulta_pagoP.php",
      type: "POST",
      data: 'lista_proveedor=' + $("#lista_proveedor option:selected").val() + '&lista_bancoC=' + $("#lista_bancoC option:selected").val() + '&fechai=' + $("#fechai").val() + '&fechaf=' + $("#fechaf").val() + '&lista_codP=' + $("#lista_codP option:selected").val(),
      success: function (x) {
        $("#lista_consultar").html(x);
        $("#tabla_con1").DataTable({
          order: [[0, 'asc']]
        });
      },
      error: function (jqXHR, estado, error) { },
    });
  }, 1500);
}



function pdf_PP(id, cardcode) {
  // javascript: window.open('reporte_mantenimineto2.php?id=' + id + '');
  // javascript: window.open('reporte_pdfPP.php?id=' + id + '&cardcode=' + cardcode + '');

  var ruta = "reporte_pdfPP.php?id=" + id + "&cardcode=" + cardcode +  "";

  $('#modal_data_pdf').modal('show');
  $('#modal_data_pdf').on('shown.bs.modal', function(){
    $(this).find('iframe').attr('src', ruta);
  }).on('hidden.bs.modal', function(){
    $(this).find('iframe').attr('src', '');
  });

  $("#navegador").off('click').on('click', function(){
    window.open(ruta, '_blank');
  });

  $("#imprimir").off('click').on('click', function(){
    $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
  })
}

/****************************************************************************/


function exportarPDF() {
  lista_proveedor = $("#lista_proveedor option:selected").val();
  lista_bancoC=$("#lista_bancoC option:selected").val();
  fechai= $("#fechai").val();
  fechaf=$("#fechaf").val();
  lista_codP=$("#lista_codP option:selected").val();

  // javascript: window.open('reporte_mantenimineto2.php?id=' + id + '');
  // javascript: window.open('reporte_general_consultaPP.php?lista_proveedor=' + lista_proveedor + '&lista_bancoC=' + lista_bancoC +  '&fechai=' + fechai +  '&fechaf=' + fechaf +  '&lista_codP=' + lista_codP + '');

  var ruta = "reporte_general_consultaPP.php?lista_proveedor=" + lista_proveedor + "&lista_bancoC=" + lista_bancoC +  "&fechai=" + fechai +  "&fechaf=" + fechaf +  "&lista_codP=" + lista_codP + "";

  $('#modal_data_pdf').modal('show');
  $('#modal_data_pdf').on('shown.bs.modal', function(){
    $(this).find('iframe').attr('src', ruta);
  }).on('hidden.bs.modal', function(){
    $(this).find('iframe').attr('src', '');
  });

  $("#navegador").off('click').on('click', function(){
    window.open(ruta, '_blank');
  });

  $("#imprimir").off('click').on('click', function(){
    $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
  })
}





/***********************GENERAR EXCEL********************************************************/
function excel_PP(id, cardcode) {


  javascript: window.open('reporte_excelPP.php?id=' + id + '&cardcode=' + cardcode + '');
  // alertify.success('Reporte_ComprobantesComision_Excel.php?fechai='+ fechai+'&fechaf='+fechaf+'&idvendedor='+idvendedor+'&vendedor='+vendedor) ;

}



function eliminar_registro(id, coddoc) {

  $.ajax({
    beforeSend: function () {
    },
    url: "eliminar_CPP.php",
    type: "POST",
    data: {id,coddoc},
    success: function (x) {
      $("#tabla_con1").DataTable();

      consultar();
    },
    error: function (jqXHR, estado, error) { },
  });
}







function mostrar_calendario() {
  
  const colorPorMotivo = JSON.parse(localStorage.getItem('eventColors')) || {};
  $("#modal_calendario").modal("show");

  $.ajax({
    url: "post_datos_calendario_provee.php",
    type: "JSON",
    data: null,
    success: function (x) {
      var datos = JSON.parse(x);
      //console.log(datos.items.length);
      var eventos = [];
      var motivosUnicos = {}; // Almacena motivos únicos
      for (var i = 0; i < datos.items.length; i++) {
        var motivo = datos.items[i].motivo;
        var idempresa = datos.items[i].idempresa;
        var docentry = datos.items[i].docentry;
        var carcode = datos.items[i].carcode;
        var color = getColorByMotivo(motivo);
        var descripcion = motivo + ' - Color: ' + color;
        var start = moment(datos.items[i].fecha, "YYYY-MM-DDTHH:mm:ss");
        // var end = moment(datos.items[i].fecha, "MMM D YYYY hh:mm A");
        //console.log(start);
        eventos.push({
          title: idempresa,
          start: start,
          idempresa: idempresa,
          backgroundColor: color,
          description: descripcion,
          motivo: motivo,
          docentry: docentry,
          carcode: carcode,
          // end: end,

        });
      
        motivosUnicos[motivo] = color;
      }
      //console.log(x);
      // console.log(eventos);
      // console.log(motivosUnicos);
      // console.log(docentry);


      $('#calendario1').fullCalendar({
        // Configuración de FullCalendar
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay',
          // locale:  esLocale,
          // locale: 'es',

        },
        defaultView: 'month',
        editable: true,
        events: eventos,

        eventClick: function (event) {
          if (event.title) {
            detalle_calendario(event.docentry);
            // Cambia el color del borde solo por diversión
            // event.el.style.borderColor = 'red';
          }
          console.log('Evento: ' + event.title);
    
        },
    
        // console.log('Evento: ' ,eventos);
        // eventRender: function (event, element) {
        //   var motivo = event.motivo;
        //   var color = event.backgroundColor;
        //   var motivoMappings = {
        //     'FT': 'FACTURA',
        //     'NC': 'NOTA CREDITO',
        //     'PR': 'PR',
        //     'PEF': 'PEF',
        //     'F-AN': 'FACTURA ANTICIPO',
        //     'AS': 'AS'
        //   };

        //   var descripcion = motivoMappings[motivo] || motivo;

        //   var motivoExistente = $('#resena div:contains(' + descripcion + ')');

        //   // Verifica si la descripción ya existe en #resena (en minúsculas)
        //   if (motivoExistente.length === 0) {
        //     var motivoDiv = '<div style="background-color:' + color + '; display: inline; padding: 3px; margin: 2px; border-radius: 3px; color: white;">' + descripcion + '</div>';
        //     $('#resena').append(motivoDiv);
        //     //console.log(motivoDiv);
        //   }
        // }

      });

      function getColorByMotivo(motivo) {
        var color;
        if (colorPorMotivo[motivo]) {
          color = colorPorMotivo[motivo]; // Recuperar el color si ya está asignado
        } else {
          color = getRandomColor();
          colorPorMotivo[motivo] = color; // Asignar y registrar el color
          saveColorsToLocalStorage(colorPorMotivo); // Guardar en el almacenamiento local
        }
        return color;
      }
      function getRandomColor() {
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += Math.floor(Math.random() * 16).toString(16); // Genera un dígito hexadecimal
        }
        return color;
      }
      function saveColorsToLocalStorage(colors) {
        // Guardar los colores en el almacenamiento local
        localStorage.setItem('eventColors', JSON.stringify(colors));
      }
    },
  });
}


function detalle_calendario(docentry) {
  $("#modal_detalle_calendario").modal("show");
  $.ajax({
    url: "listar_detalle_calendario_provee.php",
    type: "POST",
    data: {
      docentry: docentry,

    },
    success: function (x) {
      $("#tabla_detalleseg").html(x);
      dt = $('#datos').text().trim();
      //console.log(dt);
      var values = dt.split(",");
      var docentry = values[0];
      var carcode = values[1];
      var nombre = values[2];
      var banco = values[3];
      var tipodoc = values[4];
      var comentario = values[5];
      var fecha_inicio = values[6];

      // $("#modal_detalle_cliente").modal("show");
      $("#docentry_1").val(docentry);
      $("#carcode_1").val(carcode);
      $("#nombre_1").val(nombre);
      $("#banco_1").val(banco);
      $("#tipodoc_1").val(tipodoc);
      $("#comentario_1").val(comentario);
      $("#fecha_ini_1").val(fecha_inicio);
      //console.log(x);
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}


function agregar_comentario_detcalen() {
  var status = 1;
  var docentry = $("#docentry_1").val();
  var carcode = $("#carcode_1").val();
  var cliente = $("#nombre_1").val();
  var banco = $("#banco_1").val();
  var comentario = $("#comentario_1").val();
  var fecha_inicio = $("#fecha_ini_1").val();
  var tipodoc = $("#tipodoc_1").val();
  var comentario_detalle = $("#comentario_detalle").val();

  $.ajax({
    url: "insertar_comentariodet_calendario_provee.php",
    type: "POST",
    data: {
      docentry: docentry,
      carcode: carcode,
      cliente: cliente,
      banco: banco,
      comentario: comentario,
      fecha_inicio: fecha_inicio,
      tipodoc: tipodoc,
      comentario_detalle: comentario_detalle,
      status: status,
    },
    success: function (x) {

      $("#modal_detalle_calendario").modal("hide");
      $("#comentario_detalle").val("");
      alertify.success("Se inserto correctamente");

      //console.log(nombre);
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
} 
