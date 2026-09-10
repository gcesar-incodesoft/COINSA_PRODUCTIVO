function lista_clientes2() {
  //console.log('hola');
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "pone_clientes_asig_pedido.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#pone_clientes").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}
function buscar_pedido() {
  //console.log('hola');
  var fi = $("#fi").val();
  var ff = $("#ff").val();
  var idcliente = $("#cliente").val().toString();

  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "consulta_pedido_cliente_asig.php",
    type: "POST",
    data: { idcliente: idcliente, fi: fi, ff: ff },
    success: function (x) {
      $("#tabla_consulta").html(x);
      $("#tabla_pedido").DataTable();
    },
    error: function (jqXHR, estado, error) {},
  });
}
function ver_detalle(docentry) {
  // console.log(docentry);
  $("#modal_detalle").modal("show");
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "consulta_pedido_cliente_asigdet.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      $("#detalle").html(x);
      // $('#tabla_pedido').DataTable();
    },
    error: function (jqXHR, estado, error) {},
  });
}

$(document).on("click", "#seguimiento_mod", function () {
  det = document.querySelectorAll("#seguimiento_mod:checked").length;
  if ($(this).is(":checked")) {
    $(this).closest("tr").css("background-color", "LightGreen");
    if (det > 0) {
      $("#asignar").removeClass("disabledTab");
      $("#asignar").addClass("activeTab");
    } else {
      $("#asignar").removeClass("activeTab");
      $("#asignar").addClass("disabledTab");
    }
  } else {
    $(this).closest("tr").css("background-color", "white");
    if (det > 0) {
      $("#asignar").removeClass("disabledTab");
      $("#asignar").addClass("activeTab");
    } else {
      $("#asignar").removeClass("activeTab");
      $("#asignar").addClass("disabledTab");
    }
  }
});
function traer_datos() {
  $("#modal_asignar").modal("show");
  let line = [];
  let line1 = [];
  $('#tabla_pedido input[type="checkbox"]:checked').each(function (e) {
    docentry = $(this).closest("tr").children("td:eq(1)").text();
    pedido = $(this).closest("tr").children("td:eq(4)").text();
    line.push(docentry);
    line1.push(pedido);
  });
  docentry = line.toString();
  console.log(pedido);
  $("#docentry").val(docentry);
  $("#pedido").val(pedido);
  asignar_pedido();
}
function asignar_pedido() {
  $.ajax({
    beforeSend: function () {
      $("#poner_almaceneros").html("Recuperando proveedores...");
    },
    url: "pone_almaceneros.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#poner_almaceneros").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });
      $("#poner_almaceneros1").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}
function confirmar_asig() {
  var docentry = $("#docentry").val();
  var prioridad = $("#prioridad").val();
  var idcliente = $("#cliente").val();
  var almacenero = $("#almaceneros").val().toString();
  var fechahora_asignado = $("#fecha_hora").val();
  // console.log("Fecha y hora asignada:", fechaHora);
  var fechaHoraObjeto = new Date(fechahora_asignado);

  // Obtener los componentes de la fecha y hora
  var year = fechaHoraObjeto.getFullYear();
  var month = fechaHoraObjeto.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
  var day = fechaHoraObjeto.getDate();
  var hours = fechaHoraObjeto.getHours();
  var minutes = fechaHoraObjeto.getMinutes();

  // Formatear la fecha y hora en el formato aceptado por SAP HANA
  var sapHANADateTime =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day +
    " " +
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes;

  console.log("Fecha y hora formateada para SAP HANA:", sapHANADateTime);

  if (prioridad === "") {
    // Mostrar mensaje de error con Alertify
    alertify.error("Seleccione una prioridad antes de confirmar la asignación.");
    return; // Detener la ejecución si no se ha seleccionado una prioridad
  }

  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "inserta_pedido_asignado.php",
    type: "POST",
    data: {
      docentry: docentry,
      almacenero: almacenero,
      prioridad: prioridad,
      idcliente: idcliente,
      sapHANADateTime:sapHANADateTime
    },
    success: function (x) {
      doc = parseInt(x);
      if (doc === 0) {
        // No asignado, mostrar SweetAlert indicando que no se asignó
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha asignado el pedido.",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Asignado, mostrar SweetAlert indicando que se asignó correctamente
        Swal.fire({
          icon: "success",
          title: "Se Asigno Pedido",
          text: "Se asignó correctamente.",
          showConfirmButton: false,
          timer: 2000,
        }).then(function () {
          confirmar_asig_det(doc);
        });

        // Ocultar el modal
        $("#modal_asignar").modal("hide");
      }
    },
    error: function (jqXHR, estado, error) {},
  });
}

function confirmar_asig_det(doc) {
  // Array para almacenar los valores de la columna "DocNum" de las filas marcadas
  var docNumsSeleccionados = [];

  // Iterar sobre las filas de la tabla
  $("#tabla_pedido tbody tr").each(function () {
    // Obtener el valor de la columna "DocNum"
    var docNum = $(this).find("td").eq(4).text();

    // Verificar si la casilla de verificación está marcada
    if ($(this).find("input[type='checkbox']").prop("checked")) {
      // Agregar el valor al array si está marcada
      docNumsSeleccionados.push(docNum);
    }
  });

  // Iterar sobre los valores seleccionados y realizar la asignación
  docNumsSeleccionados.forEach(function (docNum) {
    $.ajax({
      beforeSend: function () {
        // $("#pone_clientes").html("Recuperando proveedores...");
      },
      url: "inserta_pedido_asignado_det.php",
      type: "POST",
      data: { doc: doc, docnum: docNum },
      success: function (x) {
        // Lógica adicional después de realizar la asignación
        console.log("Asignación realizada para DocNum: " + docNum);
        buscar_pedido();
      },
      error: function (jqXHR, estado, error) {
        // Manejar errores si es necesario
      },
    });
  });
}

function reasignar_vendedor() {
  // console.log(docentry);
  asignar_pedido();
  $("#modal_reasignar").modal("show");
  $("#docentry1").val(docentry);
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "listar_almacenero_asignado.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      // $("#poner_almaceneros1").html(x);
      $("#almacenero_asignado").html(x);
      $(".select2").select2();
      console.log(x);
    },
    error: function (jqXHR, estado, error) {},
  });
}
function confirmar_reasig() {
  var docentry = $("#docentry1").val();
  var almacenero = $("#poner_almaceneros1 select").val();
  var id = $("#almacenero12").val();
  // console.log(docentry);
  // console.log(almacenero);
  // console.log(id);

  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "inserta_pedido_reasignado.php",
    type: "POST",
    data: { id: id, docentry: docentry, almacenero: almacenero },
    success: function (x) {
      Swal.fire({
        icon: "success",
        title: "Usuario Reasignado",
        text: "Se Reasigno Correctamente.",
        showConfirmButton: false, // Oculta el botón "Aceptar"
        timer: 2000,
      }).then(function () {
        // Actualizar la página
        // location.reload();
      });
      // $("#modal_reasignar").modal('hide') ;
    },
    error: function (jqXHR, estado, error) {},
  });
}
