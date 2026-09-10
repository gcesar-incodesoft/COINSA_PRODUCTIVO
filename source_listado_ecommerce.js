//tipo cambio actual

function lista_cotizacion() {

  $.ajax({
    beforeSend: function () {
      modal();
    },
    url: "consulta_listado_ecommerce.php",
    type: "POST",
    data: "",
    success: function (x) {

      setTimeout(() => {
        swal.close();
        $("#listado_cab").html(x);
        $("#tabla_eccomerce").DataTable({
          order: [[0, "desc"]],
        });
      }, 2500);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function modal(params) {
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
}

function mostrar_modal_error(error, linea) {
  console.log(error[0]);

  swal({
    icon: "error",
    title: "Errores Migracion pedido",
    content: {
      element: "div",
      attributes: {
        innerHTML: "<strong>Error Migracion:</strong> " + error[0].error_factura
      },
    }
  });
}
function mostrar_modal_error2(error1, linea) {
  console.log(error1[0]);

  swal({
    icon: "error",
    title: "Errores Migracion cotizacion",
    content: {
      element: "div",
      attributes: {
        innerHTML: "<strong>Error Migracion:</strong> " + error1[0].error_factura2
      },
    }
  });
}



$(document).on("dblclick", "#tabla_eccomerce tbody tr", function () {
  var $fila = $(this);

  var filaId = $fila.attr('id');

  console.log("Número de la fila seleccionada: " + filaId);

  // Obtener los datos de las celdas
  var doc = $fila.find("td:nth-child(1)").text();
  var num_cliente = $fila.find("td:nth-child(3)").text();
  var cliente = $fila.find("td:nth-child(4)").text();
  var estado = $fila.find("td:nth-child(9)").text();

  $("#tabla_eccomerce tbody tr").removeClass("fila-resaltada"); // Quitar clase de fila resaltada de todas las filas
  $fila.addClass("fila-resaltada");

console.log("docentry= "+ doc);

  $("#modal_id_botones").modal("show");
  // $("#modal_registrar_evidencia").modal("show");
  $("#docito").val(doc);
  $("#num_cliente").val(num_cliente).css("font-size", "12px");
  $("#CLIENTE").val(cliente).css("font-size", "12px");
  $("#ESTADO").val(estado).css("font-size", "12px");

  $("#docito_Modal").val(doc).css("font-size", "12px");
  $("#docentry_Modal").val(doc).css("font-size", "12px");
  $("#docentry_Modal_OC").val(doc).css("font-size", "12px");
  $("#docito_Modal_oc").val(doc).css("font-size", "12px");
  $("#docito_Modal_guia").val(doc).css("font-size", "12px");

  // $("#docentry_Modal").val(doc);


  setTimeout(() => {
    $("#btn_detalle").show();
    $("#btn_migrar").show();
});

});
function consultar_boton(docentry) {
  console.log("docentry1= " + docentry);
  
  $.ajax({
    url: "busca_data_listado_pedido.php",

    type: "POST",
    data: { docentry, docentry },
    success: function (x) {

      var data = x;
      var idcl = data.split("|");
      var estado = idcl[1];
      var est_mig_pedido = idcl[5];
      var est_mig_cotizacion = idcl[6];

      $("#docito").val(idcl[2]);
      $("#docito_cot").val(idcl[0]);

      if (estado == '0') {
        $("#btn_detalle").show();
        $("#btn_pdf_cot").show();
        $("#btn_mapa").show();
        $("#btn_pendiente").show();
        $("#btn_detalle_pedido").hide();
        $("#btn_migrar").hide();
        $("#btn_migrar_pedido").hide();
      }


      if (estado == '1') {
        $("#btn_detalle").hide();
        $("#btn_pendiente").hide();
        $("#btn_detalle_pedido").show();
        $("#btn_pdf_cot").show();
        $("#btn_mapa").show();

        if (est_mig_pedido !== '1' && est_mig_cotizacion !== '1') {
          $("#btn_migrar").show();
        } else if (est_mig_cotizacion == '1' && est_mig_pedido !== '1') {
          $("#btn_migrar_pedido").show();
        }

      }


    },
    error: function (jqXHR, estado, error) { },
  });
}


function busca_detalle_pedido() {
  docentry = $("#docito").val();

  $.ajax({
    url: "busca_data_listado_pedido.php",

    type: "POST",
    data: { docentry, docentry },
    success: function (x) {

      var data = x;
      var idcl = data.split("|");
      var id = docentry;


      busca_detalle_pedido2(id);

    },
    error: function (jqXHR, estado, error) { },
  });
}

function migrar_sap_prueba() {

  docentry = $("#docito").val();

  

      $.ajax({
        beforeSend: function () { },
        url: "insertar_cola_service_prueba.php",
        type: "POST",
        data: { docentry: docentry, tipo_doc: '12', objtype: '15' },
        success: function (x) {

          migrar_sap_pedido();

        },
        error: function (jqXHR, estado, error) {
          $("#errores").html("Error... " + estado + "  " + error);
        },
      });

    
}


function poner_direcion() {
  direccion = $("#pone_cdireccion option:selected").text();

  if (direccion != "") {
    $("#cap_dicc1").val(direccion);
  } else alert("no se selecciono nada.");
}
function consultar_data_cot_det(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion_det3.php",

    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      $("#data_articulo_det").html(x);
      $("#tabla_articulos_mod").DataTable({
        order: [[0, "asc"]],
      });
      resumen_mod();
    },
    error: function (jqXHR, estado, error) { },
  });
}


function lista_cmoneda_mod() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cmoneda_mod").html("Recuperando Lista ...");
      },
      url: "lista_moneda_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cmoneda_mod").html(x);
        $(".select2").select2();
        $("#lista_cmoneda_mod").children().prop("disabled", true);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function quitarAcentos(cadena) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ñ: "N",
    ñ: "n",
    ç: "c",
    Ç: "C",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString();
}


function busca_detalle_pedido2(id) {


  $("#modal_det_cotizacion").modal("show");
  estado = $("#IDestado option:selected").text().trim();
  $("#idpedido").val(id);
  $.ajax({
    url: "consulta_detalle_venta_autorizaciones_pedidos2_otro.php",

    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append(
        "AUTORIZACIONES: Detalle de Cotizacion | <span class='label label-warning'>Ticket: " +
        id +
        "</span>"
      );
      $("#pagos_realizados").html(x);
      $.post(
        "busca_modelo_autorizacion.php",
        {
          query: ["1"],
        },
        function (data) {
          $("#cont_aut").html(data);
          valor = $("#cont_aut").text().trim();
          //console.log(valor);
          if (valor == "a") {
            //console.log('entro  a');
            if (estado == "Pendiente") {
              //console.log('entro  Pendiente');
              $("#pone_cmodelo").removeClass("disabledTab");
              $("#pone_cmodelo").addClass("activeTab");
              $(".comentar").removeClass("disabledTab");
              $(".comentar").addClass("activeTab");
            } else {
              $("#pone_cmodelo").removeClass("activeTab");
              $("#pone_cmodelo").addClass("disabledTab");
              $(".comentar").removeClass("activeTab");
              $(".comentar").addClass("disabledTab");
            }
          } else {
            $(".comentar").removeClass("activeTab");
            $(".comentar").addClass("disabledTab");
            $("#pone_cmodelo").removeClass("activeTab");
            $("#pone_cmodelo").addClass("disabledTab");
          }
        }
      );

      var idpedido = "";
      idpedido = id;
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: "pone_modelo_autoriza_coti_condicion.php",

          type: "POST",
          data: {
            idpedido,
          },
          success: function (x) {
            $("#idmodelo").val("");
            $("#comentariosaut").val("");
            $("#pone_cmodelo").html(x);
            $(".select2").select2();
            //              alert($("#totales").html())
            //$("#montolp2").val($("#montolp").val());
          },
          error: function (jqXHR, estado, error) { },
        });
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}



