function lista_clientes2() {
  //console.log('hola');
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "pone_clientes_emision_factura.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#pone_clientes").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function busca_cuentas_cliente() {
  var idcliente = $("#cliente").val();

  data_id = idcliente.split("|");

  $("#cartera").show();
  var loadingContent =
    // '<div class="cart-animation"><i class="fas fa-shopping-cart"></i></div><span></span>';
    // $("#cartera").html(loadingContent).addClass("loading-container");
    swal({
      title: "Cargando...",
      text: "Espere un momento",
      content: {
        element: "div",
        attributes: {
          innerHTML: `
          <div style="text-align: center; margin-bottom: 10px;">
            <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
          </div>
          <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
              <div style="width: 10px; height: 10px; margin: 0 5px; background: #007BFF; border-radius: 50%; animation: bounce 0.6s infinite ease-in-out; animation-delay: -0.32s;"></div>
              <div style="width: 10px; height: 10px; margin: 0 5px; background: #007BFF; border-radius: 50%; animation: bounce 0.6s infinite ease-in-out; animation-delay: -0.16s;"></div>
              <div style="width: 10px; height: 10px; margin: 0 5px; background: #007BFF; border-radius: 50%; animation: bounce 0.6s infinite ease-in-out;"></div>
          </div>
          <style>
              @keyframes bounce {
                  0%, 80%, 100% {
                      transform: scale(0);
                  }
                  40% {
                      transform: scale(1);
                  }
              }
          </style>
        `
        }
      },
      buttons: false,
      closeOnClickOutside: false
    });
  $.post(
    "consulta_REPORTE_CLIENTESFACTURAR.php",
    { idcliente: data_id[0] },
    function (x) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#cartera").hide();
        $("#cartera_clientes").html(x);
        $("#tabla_cliente_cartera").DataTable();
        
      }, 1500); // Retraso de 1.5 segundos
    }
  );
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
  data = $("#cliente option:selected").val()
  data2 = data.split("|")
  id = data2[0];
  valor = data2[1];
  ruc = data2[2];

  $("#codigo").val(id);
  $("#nombre").val(valor);
  let line = [];
  let line3 = [];
  let line4 = [];
  $('#tabla_cliente_cartera input[type="checkbox"]:checked').each(function (e) {
    // cardcode = $(this).closest("tr").children("td:eq(1)").text();
    DocNum = $(this).closest("tr").children("td:eq(3)").text();
    Docentry = $(this).closest("tr").children("td:eq(2)").text();
    ruc = $(this).closest("tr").children("td:eq(4)").text();
    cardname = $(this).closest("tr").children("td:eq(5)").text();
    // line0.push(cardcode)
    line.push(DocNum);
    //line2.push(ruc);
    line3.push(cardname);
    line4.push(Docentry);
  });
  // cardcode = line0.toString();
  DocNum = line.toString();
  ruc = ruc
  cardname = line3.toString();
  docentry = line4.toString();
  $("#DocNum").val(DocNum);
  $("#ruc").val(ruc);
  $("#cardname").val(cardname);
  $("#docentry").val(docentry);
  $("#modal_factura").modal("show");
  lista_cpago()
  lista_tipo_factura()
  detalle_cliente(docentry);
  detalle_items(docentry);
}

function detalle_cliente(docentry) {
  $.ajax({
    beforeSend: function () {
      $("#datos_factura_detalle").html("Recuperando proveedores...");
    },
    url: "pone_datos_factura_detalle.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      $("#datos_factura_detalle").html(x);
      data_x = x.trim();
      data = data_x.split("|");
      console.log(data);
      $("#oc").val(data[1]);
      $("#pone_cpago select ").val(data[0]).trigger("change.select2");
    },
    error: function (jqXHR, estado, error) { },
  });
}

function detalle_items(docentry) {
  $.post(
    "consulta_detalla_factPedido.php",
    { docentry: docentry },
    function (x) {
      $("#detalle_item").html(x);
      $("#tabla_det_items").DataTable();
    }
  );
}

$(document).on('click', '#det_items_mod', function () {
  if ($(this).is(':checked')) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
  }
});


function emitir_factura() {
  data = $("#cliente option:selected").val()
  data2 = data.split("|")
  var docentry = $("#docentry").val();
  var cardcode = data2[0];
  var cardname = data2[1];
  var ruc = data2[2];
  var orden_compra = $("#oc").val();
  var serie = $("#serie_fac").val();
  var numero_fac = $("#numero_fac").val();
  var moneda = $("#moneda").val();
  var fevenc = $("#fevenc").val();
  var femision = $("#femision").val();
  var condicion_pago = $("#pone_cpago select").val();
  var obsevacion = $("#obsevacion_fact").val();
  var tipo_factura = $("#pone_tip_factura select").val();
  var tipo_conprobante = $("#tipo_comprobante").val();

  precio_total = 0.0;
  subtotal = 0.0;
  impuesto = 0.0;
  descuento = 0.0;
  $("[name='det_items[]']:checked").each(function (key) {
    precio_total += parseFloat($(this).parents("tr").find('input[id="precio_total"]').val()).toFixed(2);
    cantidad_item = parseFloat($(this).parents("tr").find('input[id="cant_facturar"]').val()).toFixed(2);
    precio_item = parseFloat($(this).parents("tr").find('td:eq(7)').text()).toFixed(2);
    subtotal = parseFloat(cantidad_item * precio_item);
    impuesto += parseFloat($(this).parents("tr").find('input[id="cant_impuesto"]').val()).toFixed(2);
    descuento += parseFloat($(this).parents("tr").find('input[id="cant_descuento"]').val()).toFixed(2);
    tipo_impuesto = $(this).parents("tr").find("#sede_xd option:selected").val().trim();
    tipo_imp = tipo_impuesto.split("|")
    tipo_imp2 = tipo_imp[1]
  });

  //console.log('hola');
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes2").html("Recuperando proveedores...");
    },
    url: "registrar_factura.php",
    type: "POST",
    data: {
      docentry: docentry,
      cardcode: cardcode,
      cardname: cardname,
      ruc: ruc,
      orden_compra: orden_compra,
      serie: serie,
      numero_fac: numero_fac,
      moneda: moneda,
      fevenc: fevenc,
      femision: femision,
      condicion_pago: condicion_pago,
      precio_total: precio_total,
      subtotal: subtotal,
      impuesto: impuesto,
      descuento: descuento,
      tipo_impuesto: tipo_imp2,
      obsevacion: obsevacion,
      tipo_factura: tipo_factura,
      tipo_conprobante: tipo_conprobante
    },
    success: function (x) {
      console.log(x);
      global = parseInt(x);
      if (global == 0) {
        swal("No Inserto!", " Factura No Inserto", "error");
      } else {
        emitir_factura_det(global)
      }
      //migrar_sap_factura(ruc_cliente);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function emitir_factura_det(global) {
  $("[name='det_items[]']:checked").each(function (key) {
    base_entry = $(this).parents("tr").find('td:eq(1)').text();
    itemcode = $(this).parents("tr").find('td:eq(2)').text();
    itemname = $(this).parents("tr").find('td:eq(3)').text();
    cantidad_total = $(this).parents("tr").find('td:eq(4)').text();
    cantidad_pendiente = $(this).parents("tr").find('td:eq(5)').text();
    cantidad_item = parseFloat($(this).parents("tr").find('input[id="cant_facturar"]').val());
    precio_item = $(this).parents("tr").find('td:eq(7)').text();
    tipo_impuesto = $(this).parents("tr").find("#sede_xd option:selected").val().trim();
    impuesto = parseFloat($(this).parents("tr").find('input[id="cant_impuesto"]').val());
    por_descuento = parseFloat($(this).parents("tr").find('input[id="por_descuento"]').val());
    cant_descuento = parseFloat($(this).parents("tr").find('input[id="cant_descuento"]').val());
    precio_total = parseFloat($(this).parents("tr").find('input[id="precio_total"]').val());

    tipo_imp = tipo_impuesto.split("|")
    tipo_imp2 = tipo_imp[1]

    $.post("registrar_factura_det.php", {
      docentry: global,
      base_entry: base_entry,
      itemcode: itemcode,
      itemname: itemname,
      cantidad_total: cantidad_total,
      cantidad_pendiente: cantidad_pendiente,
      cantidad_item: cantidad_item,
      precio_item: precio_item,
      tipo_impuesto: tipo_imp[0],
      por_impuesto: tipo_imp[1],
      impuesto: impuesto,
      por_descuento: por_descuento,
      cant_descuento: cant_descuento,
      precio_total: precio_total,
    },

      function (data1) {

        pone_lista_consumo()
        document.getElementById('regist_sal').disabled = true
      });
  });
}

function migrar_sap_factura(ruc_cliente) {
  $.ajax({
    // beforeSend: function () {
    //   $("#migrado_sap").html("");
    // },
    url: "migrar_factura_sap.php",
    type: "POST",
    data: { docentry: ruc_cliente },
    success: function (x) {
      $("#migrado_sap").html(x);
      estado_migrado = $("#estado_mig").text().trim();
      docentry_new = $("#docentry_mig").text().trim();
      if (estado_migrado === "02") {
        $messegae = "Migro a SAP" + docentry_new;
        swal("Aceptada!", $messegae, "success");
        // enviar_sunat(docentry, 'VE')
      } else {
        $messegae = "NO Migro a SAP : " + docentry_new;
        swal("Error!", $messegae, "error");
      }
      console.log(x);
    },
    error: function (jqXHR, estado, error) {
      //$("#lista_sol_tras").html("Error en la peticion AJAX..." + estado + "      " + error);
    },
  });
}

function lista_cpago() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_cpago").html("Recuperando Lista ...");
      },
      url: "pone_cpago_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_cpago").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function lista_tipo_factura() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_tip_factura").html("Recuperando Lista ...");
      },
      url: "pone_tipo_factura.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_tip_factura").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function poner_impuesto(id) {
  var rowIndex = id;

  var selectElement = $("#tabla_det_items tbody > tr:eq(" + rowIndex + ") select")[0].value;

  data_split = selectElement.split("|")

  precio_uni = $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[7].textContent

  cantidad = $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[6].children[0].value

  parcial1 = parseFloat(parseFloat(precio_uni) * parseFloat(cantidad));

  parcial2 = parseFloat(parcial1 * data_split[1] / 100)

  $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[9].children[0].value = parcial2
}

function totalizado(id) {
  var rowIndex = id;
  precio_uni = $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[7].textContent

  cantidad = $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[6].children[0].value
  impuesto = $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[9].children[0].value

  descuento = $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[11].children[0].value

  parcial1 = parseFloat(parseFloat(precio_uni) * parseFloat(cantidad));

  parcial2 = parseFloat(impuesto)

  total = parseFloat(parcial1 + parcial2 - parseFloat(descuento))
  $($("#tabla_det_items").find("tbody > tr")[rowIndex]).children("td")[12].children[0].value = total
}

