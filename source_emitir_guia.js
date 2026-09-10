function lista_clientes2() {
  //console.log('hola');
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: 'pone_clientes_emision_factura.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#pone_clientes").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });

    },
    error: function (jqXHR, estado, error) {
    }
  });

}

function busca_cuentas_cliente() {
  var idcliente = $('#cliente').val();
  console.log(idcliente);
  // Validar campos
  if (!idcliente ) {
    if (!idcliente) {
      $("#cliente_error").text("Por favor, elige un cliente.");
      $("#cliente_error").show();
      $("#cliente").addClass("select2-error"); // Agregar clase de error al select2
    } else {
      $("#cliente_error").hide();
      $("#cliente").removeClass("select2-error"); // Quitar clase de error del select2
    }
    return; // Detener la ejecución si los campos no están seleccionados
  }
  $("#cartera").show();
  var loadingContent = '<div class="cart-animation"><i class="fas fa-shopping-cart"></i></div><span></span>';
  $("#cartera").html(loadingContent).addClass("loading-container");
  $.post("consulta_REPORTE_CLIENTESFACTURAR.php",
    { idcliente: idcliente},
    function (x) {
      $("#cartera").hide();
      $("#cartera_clientes").html(x);
      $('#tabla_cliente_cartera').DataTable();
 
    });

}
$(document).on("click", "#seguimiento_mod", function () {
  det = document.querySelectorAll("#seguimiento_mod:checked").length;
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {
      $("#tomar-accion").removeClass("disabledTab");
      $("#tomar-accion").addClass("activeTab");
      $("#bt").removeClass("disabledTab");
      $("#bt").addClass("activeTab");
    } else {
      $("#tomar-accion").removeClass("activeTab");
      $("#tomar-accion").addClass("disabledTab");
      $("#bt").removeClass("activeTab");
      $("#bt").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $("#tomar-accion").removeClass("disabledTab");
      $("#tomar-accion").addClass("activeTab");
    } else {
      $("#tomar-accion").removeClass("activeTab");
      $("#tomar-accion").addClass("disabledTab");
    }
  }
});

function modal_facturas() {
  id = $('#cliente option:selected').val();
  valor = $('#cliente option:selected').text();

  $("#codigo").val(id);
  $("#nombre").val(valor);
  let line = [];
  let line2 = [];
  // let line0 = [];
  let line3 = [];
  $('#tabla_cliente_cartera input[type="checkbox"]:checked').each(function (e) {
    // cardcode = $(this).closest("tr").children("td:eq(1)").text();
    DocNum = $(this).closest("tr").children("td:eq(2)").text();
    ruc = $(this).closest("tr").children("td:eq(3)").text();
    cardname = $(this).closest("tr").children("td:eq(4)").text();
    // line0.push(cardcode)
    line.push(DocNum)
    line2.push(ruc)
    line3.push(cardname)
  });
  // cardcode = line0.toString();
  DocNum = line.toString();
  ruc = line2.toString();
  cardname = line3.toString();
  $('#DocNum').val(DocNum);
  $('#ruc').val(ruc);
  $('#cardname').val(cardname);
  $("#modal_factura").modal("show");
  //console.log(line);
  //traer_motivo();
  detalle_cliente();
  listar_accion();
}