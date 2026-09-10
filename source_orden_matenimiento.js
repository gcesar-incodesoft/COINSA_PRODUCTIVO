function pone_lista_orden() {
  $(document).ready(function () {
    fechai = $("#fi").val();
    fechaf = $("#ff").val();
    estado = $("#idEstado option:selected").val();
    if (estado === "Seleccione un Estado") {
      alertify.error('Seleccione un Estado');

    } else if (fechai == "") {
      alertify.error('Seleccione un fecha inicio');
    } else if (fechaf == "") {
      alertify.error('Seleccione un fecha fin');
    } else {
      $.post("consulta_orden_matenimiento.php", {
        fechai: fechai,
        fechaf: fechaf,
        statu: estado
      },
      function (inf) {

        $("#lista_mantenimiento").html(inf);
        $('#tabla_mantenimiento').DataTable();


      });
    }
   /*  $.ajax({
      beforeSend: function () {
        $("#lista_mantenimiento").html("Recuperando proveedores...");
      },
      url: 'consulta_orden_matenimiento.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_mantenimiento").html(x);
        $("#tabla_mantenimiento").DataTable();
      },
      error: function (jqXHR, estado, error) {}
    }); */
  });
}

function lista_maquinaria() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#maquina").html("Recuperando Estructura...");
      },
      url: 'Lista_Maquinaria.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#maquina").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {}
    });
  });
}

function lista_maquinaria2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#maquina").html("Recuperando Estructura...");
      },
      url: 'Lista_Maquinaria2.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#maquina2").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {}
    });
  });
}

function reg_mantenimiento() {
  $('#modal_registrar').modal('show');
}

function registrar_datos() {

  bandera = true;
  tipo = $("#tipo_reg option:selected").val().trim();
  area = document.getElementById('area_reg').value;
  maquina = $("#maquina option:selected").val().trim();
  parte = document.getElementById('parte_reg').value;
  fecha = document.getElementById('fecha_reg').value;
  hora_ini = document.getElementById('hora_reg').value;
  tecnico = document.getElementById('tecnico_reg').value;
  descripcion = document.getElementById('descripcion_reg').value;
  maquina = $("#maquina option:selected").val().trim();
  hora_fin = '';
  if (tipo == '01') {
    sede = '-';
    puesto_sol = '-';
    nombre_sol = '-';
  } else {
    sede = $("#sede_reg option:selected").val().trim();
    puesto_sol = $("#puesto_sol_reg option:selected").val().trim();
    nombre_sol = $("#nombre_sol_reg option:selected").val().trim();
  }
  if (tipo === "") {
    bandera = false
    alertify.error('Falta elegir el tipo');
  }
  if (area === "") {
    bandera = false
    alertify.error('Falta elegir el area');
  }
  if (maquina === "Seleccione") {
    bandera = false
    alertify.error('Falta elegir la maquina');
  }
  if (sede === "") {
    bandera = false
    alertify.error('Falta elegir sede');
  }
  if (puesto_sol === "") {
    bandera = false
    alertify.error('Falta elegir puesto del solicitante');
  }
  if (nombre_sol === "") {
    bandera = false
    alertify.error('Falta elegir nombre del solicitante');
  }
  if (parte === "") {
    bandera = false
    alertify.error('Falta elegir la parte');
  }
  if (fecha === "") {
    bandera = false
    alertify.error('Falta fecha');
  }
  if (hora_ini === "") {
    bandera = false
    alertify.error('Falta la hora de inicio');
  }
  if (tecnico === "") {
    bandera = false
    alertify.error('Falta elegir el tecnico');
  }
  if (descripcion === "") {
    bandera = false
    alertify.error('Falta elegir la descripcion');
  }
  
  if (bandera === true) {

    $(document).ready(function () {
      $.post("busca_modelo_autorizacion3.php", {
        query: ['4']
      },
        function (data) {
          $("#cont_aut_2").html(data);
          valor = $("#cont_aut_2").text().trim();
          if (valor == 'a') {
            console.log('entro  a');
            $.post("registrar_mantenimiento.php", {
              tipo: tipo,
              area: area,
              maquina: maquina,
              parte: parte,
              fecha: fecha,
              hora_ini: hora_ini,
              tecnico: tecnico,
              descripcion: descripcion,
              sede: sede,
              puesto_sol: puesto_sol,
              nombre_sol: nombre_sol
            },
              function (data2) {
                console.log('hola');
                $('#modal_registrar').modal('hide');
                pone_lista_orden()
              });
        }else {
          alertify.error('No esta autorizado');
        }
      });
    });
  }

  
}

function finalizar_orden(id) {
  var code = id;
  document.getElementById('codig_fin').innerText = id;
  $('#modal_finalizar').modal('show');
  $.post("buscar_orden_man.php", {
      code: code
    },
    function (data) {
      $("#datos_finalizar").html(data);
      document.getElementById('fecha_fin').value = $("[name='fecha']").text().trim();
      $("#datos_finalizar").html(data);
      document.getElementById('tipo_fin').value = $("[name='tipo']").text().trim();
      document.getElementById('maquina_fin').value = $("[name='maquina']").text().trim();
      document.getElementById('parte_fin').value = $("[name='parte']").text().trim();
      document.getElementById('tecnico_fin').value = $("[name='tecnico']").text().trim();
      document.getElementById('area_fin').value = $("[name='area']").text().trim();
      document.getElementById('hora_ini_fin').value = $("[name='hora_ini']").text().trim();
      document.getElementById('nombre_solicitante_fin').value = $("[name='nombre_solicitante']").text().trim();
      document.getElementById('sede_fin').value = $("[name='sede']").text().trim();
      document.getElementById('puesto_solicitante_fin').value = $("[name='puesto_solicitante']").text().trim();
      //document.getElementById('descripcion_fin').value=$("[name='descripcion']").text().trim();
    });
}

function agregar_rep() {
  $('#modal_repuesto').modal('show');
}

function agregar_repuesto() {
  descripcion = document.getElementById("descrip_rep").value;
  cantidad = document.getElementById("cant_rep").value;
  unidad = document.getElementById("uni_rep").value;
  if (descripcion === "") {
    alertify.error('Falta la descripcion ');
  }
  if (cantidad === "") {
    alertify.error('Falta la cantidad');
  }
  if (unidad === "") {
    alertify.error('Falta la unidad');
  }
  if (descripcion !== "" && cantidad !== "" && unidad !== "") {
    num = parseFloat(document.getElementById('repuesto').getElementsByTagName('tr').length - 1)
    real = parseFloat(num + 1);
    num_ficha = $('#num_fichaxd2').text().trim();

    $("#repuesto > tbody").append("<tr><td style='text-align:center'>" + real + "</td><td style='text-align:center'>" + descripcion + "</td><td style='text-align:center'>" + cantidad + "</td><td style='text-align:center'>" + unidad + "</td><td style='text-align:center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
    resumen();
  }

}

function resumen() {
  $(document).ready(function () {
    document.getElementById("descrip_rep").value = '';
    document.getElementById("cant_rep").value = '';
    document.getElementById("uni_rep").value = '';
  })
}

$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", ".delete", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();
    resumen()

  });
});

function modificar_datos() {
  fecha_fin = document.getElementById('fecha_fin_fin').value;
  hora_fin = document.getElementById('hora_fin_fin').value;
  descripcion_fin = document.getElementById('descripcion_fin_fin').value;
  cod = document.getElementById('codig_fin').innerText
  if (fecha_fin === "") {
    alertify.error('Falta la fecha de fin ');
  }
  if (hora_fin === "") {
    alertify.error('Falta la hora de fin');
  }
  if (descripcion_fin === "") {
    alertify.error('Falta la actividad realizada');
  }
  if (fecha_fin !== "" && hora_fin !== "" && descripcion_fin !== "") {

    $(document).ready(function () {

      $.post("finalizar_mantenimeinto.php", {
          fecha_fin: fecha_fin,
          hora_fin: hora_fin,
          descripcion_fin: descripcion_fin,
          code: cod
        },
        function (data2) {
          //console.log('hola');
          agrega_rep()
          $('#modal_finalizar').modal('hide');
          pone_lista_orden()
        });
    });
  }

}

function modificar_orden(id) {
  var code = id;
  document.getElementById('codig_modi').innerText = id;
  $('#modal_modificar').modal('show');
  cargarSedes2();
  $.post("buscar_orden_man.php", {
      code: code
    },
    function (data) {
      $("#datos_finalizar").html(data);
      document.getElementById('fecha_modi').value = $("[name='fecha']").text().trim();
      $("#datos_finalizar").html(data);
      se_modi = $("[name='tipo']").text().trim();
      $('#tipo_modi').val(se_modi).trigger('change.select2');
      maq = $("[name='id_maquina']").text().trim();
      $('#maquina_2').val(maq).trigger('change.select2');
      sede_modi = $("[name='sede']").text().trim();
      $('#sede_modi').val(sede_modi).trigger('change.select2');
      setTimeout(() => {
        cargarPuestoSols2();
        puesto_modi = $("[name='puesto_solicitante']").text().trim();
        $('#puesto_sol_modi').val(puesto_modi).trigger('change.select2');
        setTimeout(() => {
          cargarNomSols2();
          nombre_modi = $("[name='nombre_solicitante']").text().trim();
          $('#nombre_sol_modi').val(nombre_modi).trigger('change.select2');
        }, 500);
        if (se_modi == 'Preventivo') {
          document.getElementById('sede_modi').disabled = true
          document.getElementById('puesto_sol_modi').disabled = true
          document.getElementById('nombre_sol_modi').disabled = true
          document.getElementById('descripcion_modi').disabled = true
          document.getElementById('descripcion_modi').value = '-';
        } else {
          document.getElementById('sede_modi').disabled = false
          document.getElementById('puesto_sol_modi').disabled = false
          document.getElementById('nombre_sol_modi').disabled = false
          document.getElementById('descripcion_modi').disabled = false
          //document.getElementById('descripcion_modi').value = ''
        }
      }, 500);
      //document.getElementById('tipo_fin').value=$("[name='tipo']").text().trim();
      //document.getElementById('maquina_fin').value=$("[name='maquina']").text().trim();
      document.getElementById('parte_modi').value = $("[name='parte']").text().trim();
      document.getElementById('tecnico_modi').value = $("[name='tecnico']").text().trim();
      document.getElementById('area_modi2').value = $("[name='area']").text().trim();
      document.getElementById('hora_modi').value = $("[name='hora_ini']").text().trim();
      document.getElementById('descripcion_modi').value = $("[name='descripcion']").text().trim();
    });
}

function actualizar_datos() {
  id = document.getElementById('codig_modi').innerText
  tipo = $("#tipo_modi option:selected").val().trim();
  if (tipo == "Preventivo") {
    tipo = "01"
    sede = '-';
    puesto_sol = '-';
    nombre_sol = '-';
  }
  if (tipo == "Correctivo") {
    tipo = "02"
    sede = $("#sede_modi option:selected").val().trim();
    puesto_sol = $("#puesto_sol_modi option:selected").val().trim();
    nombre_sol = $("#nombre_sol_modi option:selected").val().trim();
  }
  area = document.getElementById('area_modi2').value;
  maquina = $("#maquina_2 option:selected").val().trim();
  parte = document.getElementById('parte_modi').value;
  fecha = document.getElementById('fecha_modi').value;
  hora_ini = document.getElementById('hora_modi').value;
  tecnico = document.getElementById('tecnico_modi').value;
  hora_fin = '';
  descripcion = document.getElementById('descripcion_modi').value;
  bandera = true;
  if (tipo === "") {
    bandera = false
    alertify.error('Falta elegir el tipo');
  }
  if (area === "") {
    bandera = false
    alertify.error('Falta elegir el area');
  }
  if (maquina === "Seleccione") {
    bandera = false
    alertify.error('Falta elegir la maquina');
  }
  if (parte === "") {
    bandera = false
    alertify.error('Falta elegir la parte');
  }
  if (fecha === "") {
    bandera = false
    alertify.error('Falta fecha');
  }
  if (hora_ini === "") {
    bandera = false
    alertify.error('Falta la hora de inicio');
  }
  if (tecnico === "") {
    bandera = false
    alertify.error('Falta elegir el parte');
  }
  if (descripcion === "") {
    alertify.error('Falta elegir la descripcion');
  }
  if (sede === "") {
    bandera = false
    alertify.error('Falta elegir sede');
  }
  if (puesto_sol === "") {
    bandera = false
    alertify.error('Falta elegir puesto del solicitante');
  }
  if (nombre_sol === "") {
    bandera = false
    alertify.error('Falta elegir nombre del solicitante');
  }
  if (bandera === true) {
   // console.log('paso');
    alertify.success('Modificado')
    $(document).ready(function () {

      $.post("modificar_mantenimiento.php", {
          tipo: tipo,
          area: area,
          maquina: maquina,
          parte: parte,
          fecha: fecha,
          hora_ini: hora_ini,
          tecnico: tecnico,
          descripcion: descripcion,
          id: id,
          sede: sede,
          puesto_sol: puesto_sol,
          nombre_sol: nombre_sol
        },
        function (data2) {
          //console.log('hola');
          $('#modal_modificar').modal('hide');
          pone_lista_orden()
        });
    });
  }else{
    alertify.error('error')
  }


}

function valideKey(evt) {

  // code is the decimal ASCII representation of the pressed key.
  var code = (evt.which) ? evt.which : evt.keyCode;

  if (code == 8) { // backspace.
    return true;
  } else if (code >= 48 && code <= 57) { // is a number.
    return true;
  } else { // other keys.
    return false;
  }
}

function agrega_rep() {
  cod = document.getElementById('codig_fin').innerText
  var descripcion = [];
  var cantidad = [];
  var unidad = [];
  var orden = [];
  $('#repuesto > tbody > tr').each(function () {
    $orden = $(this).find('td').eq(0).html();
    $descripcion = $(this).find('td').eq(1).html();
    $cantidad = $(this).find('td').eq(2).html();
    $unidad = $(this).find('td').eq(3).html();


    $.post("agregar_respuesto.php", {
        descripcion: $descripcion,
        cantidad: $cantidad,
        unidad: $unidad,
        cod: cod,
        orden: $orden
      },
      function (data) {

      });
  });
}

function ver_orden2(id) {
  var num_form_lista = id;
  javascript: window.open('reporte_mantenimineto2.php?id=' + id + '');
}

function ver_orden(id) {
  var num_form_lista = id;
  //console.log(id);
 javascript: window.open('reporte_mantenimineto.php?id=' + id + '');
}

function busca_orden_au() {
  $(document).ready(function () {
    //estado = $("#IDestado option:selected").text().trim();
    $.ajax({
      beforeSend: function () {
        $("#data").html("Buscando las ventas, un momento...");
      },
      url: 'busca_ordeman_autorizacion.php',
      type: 'POST',
      data: 'estado=' + $("#IDestado option:selected").val().trim(),
      success: function (res) {
        $("#data").html(res);
        $(document).ready(function () {
          $('#tabla_orden').DataTable();
        });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
        $("#data").hmtl(estado + "     " + error);
      }
    });


  })
}

function muestra_detalle_autorizaciones(num_ticket) {
  var tic = num_ticket.split("|");
  estado = $("#IDestado option:selected").text().trim();
  $("#modal_detalle_cotizacion").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_mant_autorizaciones.php',
    type: 'POST',
    data: 'codigo=' + tic,
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[1]);
      $(".nuticket").append("AUTORIZACIONES: Detalle  | <span class='label label-warning'>Codigo: " + tic + "</span>");
      $("#detalle_de_venta").html(x);
      $.post("busca_modelo_autorizacion3.php", {
        query:['4']
      },
      function(data) {
        $("#cont_aut").html(data);
        valor= $("#cont_aut").text().trim();
        if (valor=='a') {
          console.log('entro  a');
            if (estado == "Pendiente") {
              console.log('entro  Pendiente');
                $('#pone_cmodelo').removeClass('disabledTab');
                $('#pone_cmodelo').addClass('activeTab');
                $('.comentar').removeClass('disabledTab');
                $('.comentar').addClass('activeTab');
            } else {
                $('#pone_cmodelo').removeClass('activeTab');
                $('#pone_cmodelo').addClass('disabledTab');
                $('.comentar').removeClass('activeTab');
                $('.comentar').addClass('disabledTab');
            }
        }else{
            $('.comentar').removeClass('activeTab');
            $('.comentar').addClass('disabledTab');
            $('#pone_cmodelo').removeClass('activeTab');
            $('#pone_cmodelo').addClass('disabledTab');
        }
      });
      /* if (estado == "Pendiente") {
        $('#pone_cmodelo').removeClass('disabledTab');
        $('#pone_cmodelo').addClass('activeTab');
        $('.comentar').removeClass('disabledTab');
        $('.comentar').addClass('activeTab');
      } else {
        $('#pone_cmodelo').removeClass('activeTab');
        $('#pone_cmodelo').addClass('disabledTab');
        $('.comentar').removeClass('activeTab');
        $('.comentar').addClass('disabledTab');
      } */
      var idpedido = '';
      idpedido = tic[0];
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: 'pone_modelo_autoriza_mant_condicion.php',

          type: 'POST',
          data: {
            idpedido
          },
          success: function (x) {
            $("#idmodelo").val("");
            $("#comentariosaut").val("");
            $("#pone_cmodelo").html(x);
            $(".select2").select2();
            //              alert($("#totales").html())
            //$("#montolp2").val($("#montolp").val());

          },
          error: function (jqXHR, estado, error) {}
        });
      });

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/*******PROCESA AUTORIZACION******************************/
function procesa_autorizacion(numero) {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = numero;
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {},
        url: 'procesa_mant_autorizacion.php',
        type: 'POST',
        data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
            theme: 'relax',
            layout: 'topLeft',
            type: 'success',
            timeout: 2000,
          });
          $("#comentarios").val("");
          busca_orden_au()
        },
        error: function (jqXHR, estado, error) {
          $("#errores").html('Error... ' + estado + '  ' + error);
        }
      });
    } else {
      var n = noty({
        text: "Debe seleccionar un Modelo de Autorización...: " + id_ticket,
        theme: 'relax',
        layout: 'topLeft',
        type: 'warning',
        timeout: 2000,
      });
    }
  });
}

/*******PROCESA RECHAZO******************************/
function procesa_rechazo(numero) {
  $(document).ready(function () {

    var idautoriza = '0';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = numero
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {},
        url: 'procesa_mant_rechazo.php',
        type: 'POST',
        data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido al RECHAZO del pedido N°: " + id_ticket,
            theme: 'relax',
            layout: 'topLeft',
            type: 'warning',
            timeout: 2000,
          });
          busca_orden_au()
        },
        error: function (jqXHR, estado, error) {
          $("#errores").html('Error... ' + estado + '  ' + error);
        }
      });
    } else {
      var n = noty({
        text: "Debe seleccionar un Modelo de Autorización....: " + id_ticket,
        theme: 'relax',
        layout: 'topLeft',
        type: 'warning',
        timeout: 2000,
      });
    }
  });
}
/*********************************************************************/
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
          $('#daterange-btn').daterangepicker({
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
        $("#numero_ticket").inputmask('mask', {
          'alias': 'numeric',
          'autogroup': true,
          'digits': 0,
          'digitsOptional': false
        });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })
}
function Gprebtn() {
  var fechai=$("#fi").val();
  var fechaf=$("#ff").val();
  if (fechai == "") {
    alertify.error('Seleccione un fecha inicio');
  } else if (fechaf == "") {
    alertify.error('Seleccione un fecha fin');
  } else {javascript: window.open('reporte_mantenimiento_excel.php');}

  

};