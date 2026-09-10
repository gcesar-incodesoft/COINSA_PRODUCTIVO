let array_eliminar = [];
function tipo_cambio_hoy() {
  $.ajax({
    beforeSend: function () {
      $("#tc_hoy").html("Recuperando Lista ...");
    },
    url: "Consulta_TC_Actual.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#tc_hoy").html(x);
      tc = $("[name='tc_actual']").text().trim();
      console.log(tc);
      var el = document.getElementById("tipo_cambio");
      $("#lista_cmoneda2").val("USD");
      let num2 = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "SOL",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(tc);
      el.innerText = num2;
    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_clients() {
  //console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_clients").html("Recuperando Lista ...");
      },
      url: "lista_clients.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_clients").html(x);
        $(".select2").select2();

        setTimeout(() => {
          lista_cotizacion()
        }, 1000);
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function swal_carga() {
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


function lista_clients_otro() {
  //console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_clients_otro").html("Recuperando Lista ...");
      },
      url: "lista_clients.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_clients_otro").html(x);
        $(".select2").select2();

        setTimeout(() => {
          lista_cotizacion()
        }, 1000);
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}




function lista_modalidadDespacho() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_modDespacho").html("Cargando...");
      },
      url: "lista_modDespa.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_modDespacho").html(x);
        $(".select2").select2();

        // Disparar change para evaluar valor inicial (si viene preseleccionado)
        // $("#lista_modD").trigger("change");
      },
      error: function (jqXHR, estado, error) {
        console.error("Error al cargar modalidades de despacho:", error);
      },
    });
  });
}

// $(document).on("change", "#lista_modD", function () {
//   const valor = $(this).val();
//   // console.log("Modalidad seleccionada:", valor);

//   if (valor === "2" || valor == 2) {
//     $("#btn_datos_adicionales").show().prop("disabled", false);
//     $("#btn_oc_proc").show().prop("disabled", false);
//   } else {
//     $("#btn_datos_adicionales").hide().prop("disabled", true);
//     $("#btn_oc_proc").hide().prop("disabled", true);
//   }
// });

// Además, manejar evento específico de select2 por si acaso
$(document).on("select2:select", "#lista_modD", function () {
  $(this).trigger("change");
});

function pone_vendedores_otro() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_vendedores_otro").html("Recuperando proveedores...");
      },
      url: "pone_vendedores_cotizacion.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_vendedores_otro").html(x);

        $(".select2").select2();


      },
      error: function (jqXHR, estado, error) { },
    });
  });
}



// function lista_vendedores() {
//   //console.log('entro');
//   $(document).ready(function () {
//     $.ajax({
//       beforeSend: function () {
//         $("#lista_vendedores").html("Recuperando Lista ...");
//       },
//       url: "pone_vendedores.php",
//       type: "POST",
//       data: null,
//       success: function (x) {
//         $("#lista_vendedores").html(x);
//         $(".select2").select2();
//         //console.log(x);
//       },
//       error: function (jqXHR, estado, error) { },
//     });
//   });
// }

function tipo_cambio_hoy2() {
  $.ajax({
    beforeSend: function () {
      $("#tc_hoy_mod").html("Recuperando Lista ...");
    },
    url: "Consulta_TC_Actual2.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#tc_hoy_mod").html(x);
      tc = $("[name='tc_actual2']").text().trim();
      console.log(tc);
      var el = document.getElementById("tipo_cambio_mod");
      //$("#lista_cmoneda2").val("USD");
      let numFormateado = parseFloat(tc).toFixed(4); // "3.6650"
      let resultado = "SOL " + numFormateado;
      el.innerText = resultado;
    },
    error: function (jqXHR, estado, error) { },
  });
}

function tipo_cambio_hoy2_otro() {
  $.ajax({
    beforeSend: function () {
      $("#tc_hoy_mod").html("Recuperando Lista ...");
    },
    url: "Consulta_TC_Actual2.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#tc_hoy_mod").html(x);
      tc = $("[name='tc_actual2']").text().trim();
      console.log(tc);
      var el = document.getElementById("tipo_cambio_mod_otro");
      //$("#lista_cmoneda2").val("USD");
      let numFormateado = parseFloat(tc).toFixed(4); // "3.6650"
      let resultado = "SOL " + numFormateado;
      el.innerText = resultado;
    },
    error: function (jqXHR, estado, error) { },
  });
}

function busca_coti() {
  estado = $("#estado_1").val();
  cardcode = $("#lista_clients11").val();
  vendedor = $("#pone_vendedores2 select").val();
  fec_ini = $("#fec_ini").val();
  if (fec_ini === "") {
    fec_ini = '2024-01-01';
  } else {
    fec_ini = $("#fec_ini").val();
  }
  fec_fin = $("#fec_fin").val();
  setTimeout(() => {
    $.ajax({
      beforeSend: function () {
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
      },
      url: "consulta_listado_cotizacion_reg1.php",
      type: "POST",
      data: { estado: estado, cardcode: cardcode, vendedor: vendedor, fec_ini: fec_ini, fec_fin: fec_fin },
      success: function (x) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#lista_cotizacion").html(x);
          var table = $("#tabla_cot_1").DataTable({
            order: [[0, "desc"]],
            pageLength: -1,
            lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
            // ordering: false, // ❌ Deshabilita la opción de ordenar columnas
            language: {
              paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",
              },
              Show: "Mostrar",
              search: "Buscar:",
              sLengthMenu: "Mostrar _MENU_ registros",
              sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            },
          });

          $("#tabla_cot_1 thead tr").clone(true).appendTo("#tabla_cot_1 thead");
          $("#tabla_cot_1 thead tr:eq(0) th").hide();

          $("#tabla_cot_1 thead tr:eq(1) th").each(function (i) {
            if (i == 5 || i == 6) {
              var $th = $(this);
              filter($th, table, i);
            }
          });

          // Botón para mostrar todos
          $("#mostrar-todos").on("click", function () {
            $('#tabla_cot_1').DataTable().column(5).search("").draw();
          });

        }, 1500); // Retraso de 1.5 segundos
      },
      error: function (jqXHR, estado, error) { },
    });
  }, 1000);

}




function busca_coti_otro() {
  estado = $("#estado_otro").val();
  cardcode = $("#lista_clients_otro option:selected").val();
  vendedor = $("#pone_vendedores_otro option:selected").val();
  fec_ini = $("#fec_ini_otro").val();
  if (fec_ini === "") {
    fec_ini = '2024-01-01';
  } else {
    fec_ini = $("#fec_ini_otro").val();
  }
  fec_fin = $("#fec_fin_otro").val();

  setTimeout(() => {
    $.ajax({
      beforeSend: function () {
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
      },
      url: "listado_pendientes_re.php",
      type: "POST",
      data: { estado: estado, cardcode: cardcode, vendedor: vendedor, fec_ini: fec_ini, fec_fin: fec_fin },
      success: function (x) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#lista_cotizacion_otro").html(x);
          var table = $("#tabla_cot_otro").DataTable({
            pageLength: -1,
            lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
            ordering: false, // ❌ Deshabilita la opción de ordenar columnas
            language: {
              paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",
              },
              Show: "Mostrar",
              search: "Buscar:",
              sLengthMenu: "Mostrar _MENU_ registros",
              sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            },
          });

          $("#tabla_cot_otro thead tr").clone(true).appendTo("#tabla_cot_otro thead");
          $("#tabla_cot_otro thead tr:eq(0) th").hide();

          $("#tabla_cot_otro thead tr:eq(1) th").each(function (i) {
            if (i == 5 || i == 6) {
              var $th = $(this);
              filter($th, table, i);
            }
          });

          // Botón para mostrar todos
          $("#mostrar-todos").on("click", function () {
            $('#tabla_cot_otro').DataTable().column(5).search("").draw();
          });

        }, 1500); // Retraso de 1.5 segundos
      },
      error: function (jqXHR, estado, error) { },
    });
  }, 1000);

}




$(document).on("dblclick", "#lista_cotizacion_otro tbody tr", function () {
  var $fila = $(this);

  var filaId = $fila.attr('id');

  console.log("Número de la fila seleccionada: " + filaId);

  // Obtener los datos de las celdas
  var doc = $fila.find("td:nth-child(1)").text();
  var num_cliente = $fila.find("td:nth-child(2)").text();
  var cliente = $fila.find("td:nth-child(4)").text();
  var estado = $fila.find("td:nth-child(9)").text();

  $("#lista_cotizacion_otro tbody tr").removeClass("fila-resaltada"); // Quitar clase de fila resaltada de todas las filas
  $fila.addClass("fila-resaltada");


  $("#modal_id_botones_otro").modal("show");
  // $("#modal_registrar_evidencia").modal("show");
  $("#docito_otro").val(doc);
  $("#num_cliente_otro").val(num_cliente).css("font-size", "12px");
  $("#CLIENTE_otro").val(cliente).css("font-size", "12px");
  $("#ESTADO_otro").val(estado).css("font-size", "12px");

  $("#docito_Modal").val(doc).css("font-size", "12px");
  $("#docentry_Modal").val(doc).css("font-size", "12px");
  $("#docentry_Modal_OC").val(doc).css("font-size", "12px");
  $("#docito_Modal_oc").val(doc).css("font-size", "12px");
  $("#docito_Modal_guia").val(doc).css("font-size", "12px");

  // $("#docentry_Modal").val(doc);


  // setTimeout(() => {
  consultar_boton_otro(estado);
  // consultar_boton2();
  // }, 500);
});

function consultar_boton_otro(estado) {
  if (estado === 'Pendiente') {
    $("#btn_detalle_otro").show();
    $("#btn_duplica_otro").hide();
  } else {
    $("#btn_detalle_otro").show();
    $("#btn_duplica_otro").show();
  }
}




function busca_detalle_cotizacion_otro() {
  id = $("#docito_otro").val();


  $("#modal_det_cotizacion_otro").modal("show");
  estado = $("#IDestado option:selected").text().trim();
  $("#idpedido").val(id);
  $.ajax({
    url: "consulta_detalle_otro.php",

    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $(".nuticket_otro").html("");
      $(".nuticket_otro").append(
        "Detalle de Cotizacion | <span class='label label-warning'># " +
        id +
        "</span>"
      );
      $("#pagos_realizados_otro").html(x);
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



$(document).ready(function () {

  $(document).on("dblclick", "#tabla_art_ped tbody tr", function () {
    console.log('✅ Doble click detectado');

    const fila = $(this);
    const detalle = fila.find('#detalle_art2').val(); // ← OK si solo hay uno por fila
    const line = fila.find("td:nth-child(2)").text();

    $('#articulo_det_mod').val(detalle);

    $('#linea_det_mod').val(line);
    console.log("linea= " + line);


    $('#modal_detalle_art_mod').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
  });
});



// function manejadorDobleClic(numeroDeLinea) {
//   $("#modal_detalle_art_mod").modal("show");
//   // e.preventDefault();
//   line = parseInt(numeroDeLinea);
//   $("#linea_det_mod").val(numeroDeLinea);
//   console.log(numeroDeLinea);
//   console.log(line);

//   var doc = $("#docentry_cot").val();
//   console.log(doc);
//   $.ajax({
//     url: "lista_detalle_articulo_mod.php",
//     type: "POST",
//     data: { docentry: doc, line: line },
//     success: function (x) {
//       $("#user_text_mod").html(x);
//     },
//     error: function (jqXHR, estado, error) { },
//   });
// }

function guarda_detart_mod() {
  var linea = parseInt($("#linea_det_mod").val(), 10); // índice base 0
  line2 = linea - 1;
  var detalle = $("#articulo_det_mod").val();
  var fila = $("#tabla_art_ped tbody tr").eq(line2);
  console.log("Guardando detalle:", detalle, "en fila:", linea);

  if (fila.length) {
    fila.find('input.detalle_art2').val(detalle);  // con class, no id
    $("#modal_detalle_art_mod").modal("hide");
  } else {
    alert("La línea especificada no existe.");
  }
}

// $(document).ready(function () {

//   // Delegación de eventos para la tabla
//   $('#tabla_articulos').on('dblclick', 'tr', function (event) {
//     // Obtenemos la fila donde se hizo el doble clic
//     var fila = $(this);

//     // Extraemos los valores de las celdas de la fila seleccionada
//     var id = fila.find('td').eq(0).text();
//     var nombre = fila.find('td').eq(1).text();
//     nombrexd = nombre.trim()
//     // Llamamos a la función con los datos de la fila
//     buscar_detalle_kit1(nombrexd);

//     console.log(nombrexd); // Imprimimos el nombre en la consola
//   });
// });



var filaSeleccionada = null;

$(document).ready(function () {
  $('#tabla_articulos').on('dblclick', 'tr', function (event) {
    filaSeleccionada = $(this);

    var detalle = filaSeleccionada.find('td').eq(18).children("input").val();
    $("#articulo_det").val(detalle);

    $("#modal_detalle_art").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
  });
});

function guardar_detalle() {
  var detalle_articulo = $("#articulo_det").val();

  if (filaSeleccionada) {
    filaSeleccionada.find('td').eq(18).children("input").val(detalle_articulo);

    $("#modal_detalle_art").modal('hide');
  } else {
    console.error("No se ha seleccionado una fila");
  }
}



function buscar_detalle_kit1(id) {
  $("#modal_detalle_kit1").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    beforeSend: function () {
      $("#tabla_detalle_kit").html("Cargando ...");
    },
    url: "consulta_detalle_kit.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#tabla_detalle_kit1").html(x);
      // $("#tabla_kit").DataTable({
      //   order: [[0, "desc"]],
      // });
    },
    error: function (jqXHR, estado, error) { },
  });
}


function buscar_detalle_kit(id) {
  $("#modal_detalle_kit").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    beforeSend: function () {
      $("#tabla_detalle_kit").html("Cargando ...");
    },
    url: "consulta_detalle_kit.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#tabla_detalle_kit").html(x);
      // $("#tabla_kit").DataTable({
      //   order: [[0, "desc"]],
      // });
    },
    error: function (jqXHR, estado, error) { },
  });

}


function buscar_detalle_kit_mod(id) {
  $("#modal_detalle_kit").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    beforeSend: function () {
      $("#tabla_detalle_kit").html("Cargando ...");
    },
    url: "consulta_detalle_kit_mod.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#tabla_detalle_kit").html(x);
      // $("#tabla_kit_mod").DataTable({
      //   order: [[0, "desc"]],
      // });
    },
    error: function (jqXHR, estado, error) { },
  });

}


function buscar_detalle_kit_2do(id) {
  $("#modal_detalle_kit").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    beforeSend: function () {
      $("#tabla_detalle_kit").html("Cargando ...");
    },
    url: "consulta_detalle_kit_2do.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#tabla_detalle_kit").html(x);
      // $("#tabla_kit_2do").DataTable({
      //   order: [[0, "desc"]],
      // });
    },
    error: function (jqXHR, estado, error) { },
  });

}



///lista condiciones de pago
function lista_cpago() {
  // console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cpago").html("Recuperando Lista ...");
      },
      url: "lista_cpago_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cpago").html(x);
        $(".select2").select2();
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}
///lista moneda de pago

function lista_cmoneda() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cmoneda").html("Recuperando Lista ...");
      },
      url: "lista_moneda_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cmoneda").html(x);
        $(".select2").select2();
        $("#lista_cmoneda select").val("USD").trigger("change.select2");
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}
function lista_groupname() {
  $.ajax({
    beforeSend: function () {
      $("#pone_groupname").html("Recuperando grupos...");
    },
    url: "lista_groupname.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#pone_groupname").html(x);
      //console.log(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_subgroupname() {
  $.ajax({
    beforeSend: function () {
      $("#pone_subgroupname").html("Recuperando subgrupos...");
    },
    url: "lista_subgroupname.php",
    type: "POST",
    data: {
      cod: $("#pone_groupname select").val(),
    },
    success: function (x) {
      $("#pone_subgroupname").html(x);
      //console.log(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

/// busca los clientes
function busca_cliente() {
  ruc = $("#clie").val();

  $(document).ready(function () {
    $("#modal_tabla_clientes").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });

    $("#modal_tabla_clientes").on("shown.bs.modal", function () {
      $("#clie").focus();
    });


    $.ajax({
      beforeSend: function () {
        $("#lista_clientes").html("Cargando los clientes...");
      },
      url: "lista_clientes1.php",
      type: "POST",
      data: { ruc: ruc.toUpperCase() },
      success: function (x) {
        $("#lista_clientes").html(x);
        $("#tabla_clien").DataTable();
        //$('#clie').val('');
      },
      error: function (jqXHR, estado, error) {
        $("#lista_clientes").html("Hubo un error: " + estado + " " + error);
      },
    });
  });
}

$(document).on("change", "#lista_cmoneda select", function () {
  var id = this.value;
  lista_cmoneda_mod_xd = id;
  lista_cmoneda_mod_xd2 = $("#lista_cmoneda2").val();
  $("#monedaInicial").val(lista_cmoneda_mod_xd2);
  $("#cambioMoneda").val(lista_cmoneda_mod_xd);
  $("#rate")
    .val(parseFloat($("#tc_actual").text()).toFixed(3))
    .prop("disabled", true);
  $("#modalCambios").modal("show");
  $("#lista_cmoneda2").val(id);
});


function quita_cliente() {
  //console.log('hola bb <3');
  $("#btn_cre").attr("disabled", false);
  $("#tipo_de_venta").html("Seleccionar Cliente.");
  $("#idcliente_credito").val("");
  $("#tipocliente").val("");
  $("#lineacredito").val("");
  $("#salpendiente").val("");
  $("#lin_disponible").val("");
  $("#pone_cpago").val("");
  $("#salpendiente").val("");
  $("#idcliente_parent").val("");
  $("#idcliente_razon").val("");
  $("#idcliente_ruc").val("");
  $("#tabla_articulos > tbody:last").children().remove();
  $("#cmoneda").prop("disabled", "");
  $("#cpago").prop("disabled", "");
  //$('#bcliente').prop('disabled', '');

  var el = document.getElementById("totales");
  el.innerText = 0;
  var el = document.getElementById("totalesigv");
  el.innerText = 0;
  var el = document.getElementById("total_venta");
  el.innerText = 0;
  var el = document.getElementById("total_articulos");
  el.innerText = 0;
}

function reg_contacto(elid) {
  // $('#modal_registrar_contacto').modal('show');
  // limpiar_campos_contacto();

  var client = elid;
  var idcl = client.split("|");

  // $("#codigo_cardcode").val(idcl[0]);
  // $("#razon_social_contacto").val(idcl[1]);

  window.location.href = `form_contactos.php?val0=${encodeURIComponent(idcl[0])}&val1=${encodeURIComponent(idcl[1])}`;
}

function limpiar_campos_contacto() {
  $("#contacto_nombre").val("")
  $("#contacto_apellidos").val("")
  $("#posicion").val("")
  $("#telefono1").val("")
  $("#correo").val("")
  $("#observaciones2").val("")
}

////////////////// agrega los clientes
function pone_cliente(elid) {
  // $("#secundarios").show();
  $("#btn-cancela").prop("disabled", false);
  var client = elid;
  var idcl = client.split("|");
  var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
  var carcud = idcl[0];
  //console.log(carcud);

  listar_contacto(carcud);



  $("#idcliente_credito").val(idcl[0]);
  $("#idcliente_razon").val(quitarAcentos(idcl[1]).replace(pattern, ""));
  $("#idcliente_ruc").val(idcl[2]);
  $("#idcliente_parent").val(idcl[3]);
  $("#tipocliente").val(idcl[4]);
  $("#codigocp").val(idcl[5]);

  //rend_linea = idcl[6]/10000
  // console.log(idcl[6])
  $("#lineacredito").val(parseFloat(idcl[6]).toFixed(2));
  $("#salpendiente").val(parseFloat(idcl[7]).toFixed(2));

  $("#lin_disponible").val(parseFloat(idcl[8]).toFixed(2));
  // $("#pone_vendedores").val(parseFloat(idcl[9]).toFixed(2));

  pone_cpago = idcl[5];
  $("#cpago").val(pone_cpago).prop("disabled", false).trigger("change.select2");


  pone_ven = idcl[9];

  if (idcl[0] === 'C99999999999') {
    $("#pone_ven").val(pone_ven).prop("disabled", false).select2();
  } else {
    $("#pone_ven").val(pone_ven).prop("disabled", true).select2();
  }



  // $('#pone_ven').val(pone_ven).trigger('change.select2');


  $("#modal_tabla_clientes").modal("hide");
  $("#tipo_de_venta").html(
    "<button class='btn btn-danger btn-xs' onclick='quita_cliente();'>Quitar</button> Cliente: " +
    idcl[1]
  );
  $("#btn_cre").attr("disabled", true);
  // document.getElementById("ccode_pdf").value = idcl[0];
  // document.getElementById("clie_pdf").value = idcl[1];
  $(".entrega").removeClass("disabledTab");
  $(".entrega").addClass("activeTab");
  $(".transporte").removeClass("disabledTab");
  $(".transporte").addClass("activeTab");
  $("#btn-add-product").attr("disabled", false);
  //window.alert(client);
  lista_direccion_condicion();
  //desactivar_datos();
}

$(document).on("dblclick", ".fila-cliente", function (e) {
  // Si el doble clic fue sobre un botón, salimos
  if ($(e.target).closest("button").length > 0) return;

  let elidcliente = $(this).data("idcliente");
  pone_cliente(elidcliente);
  lista_direccion_condicion();
});

// function actualiza_cpago_temp() {
//   $(document).ready(function () {
//     $.ajax({
//       beforeSend: function () {
//       },
//       url: 'update_cpago_venta.php',
//       type: 'POST',
//       data: 'id_cpago=' + $("#cpago").val() + "&nombre_cpago=" + $("#cpago option:selected").html(),
//       success: function (t) {

//       },
//       error: function (jqXHR, estado, error) {
//       }
//     });
//   })
// }

function ultimo_valor_fila() {
  //let tableBody = document.getElementById('tabla_articulos_mod');
  let line = [];
  $("#tabla_articulos > tbody > tr").each(function () {
    articulos = parseFloat($(this).find("td").eq(0).html());
    line.push(articulos);
    //console.log(articulos);
  });

  line.sort(function (a, b) {
    return a - b;
  });
  cantidad = line.length;
  data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1];

  return data;
}

function ultimo_valor_fila_mod() {
  let numeros = [];

  $("#tabla_art_ped > tbody > tr").each(function () {
    let num = parseInt($(this).find("td").eq(1).text().trim());
    if (!isNaN(num)) {
      numeros.push(num);
    }
  });

  if (numeros.length === 0) return 0;

  return Math.max(...numeros);
}

// function ultimo_valor_fila_mod() {
//   //let tableBody = document.getElementById('tabla_art_ped');
//   let line = [];
//   $("#tabla_art_ped > tbody > tr").each(function () {
//     articulos = parseFloat($(this).find("td").eq(2).html());
//     line.push(articulos);
//     //console.log(articulos);
//   });

//   line.sort(function (a, b) {
//     return a - b;
//   });
//   cantidad = line.length;
//   data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1];

//   return data === 0 ? 1 : data;
// }

// function ultimo_valor_fila_mod_otro() {
//   //let tableBody = document.getElementById('tabla_articulos_mod');
//   let line = [];
//   $("#tabla_art_ped_otro > tbody > tr").each(function () {
//     articulos = parseFloat($(this).find("td").eq(2).html());
//     line.push(articulos);
//     //console.log(articulos);
//   });

//   line.sort(function (a, b) {
//     return a - b;
//   });
//   cantidad = line.length;
//   data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1];

//   return data === 0 ? 1 : data;
// }

function ultimo_valor_fila_mod_otro() {
  let numeros = [];

  $("#tabla_art_ped_otro > tbody > tr").each(function () {
    let num = parseInt($(this).find("td").eq(1).text().trim());
    if (!isNaN(num)) {
      numeros.push(num);
    }
  });

  if (numeros.length === 0) return 0;

  return Math.max(...numeros); // el último número mostrado
}


function agrega_a_lista() {
  $(document).ready(function () {
    bandera = true;
    if ($("#cantidad").val() > 0) {
      var articulo = $("#codigo").val();
      var descripcion = document.getElementById("descripcionitem").value;
      var precio = $("#preciou").val();
      var cantidad = $("#cantidad").val();
      var unidad = $("#unidad_line").val();
      var fecha_prod = $("#fecha_prod").val();
      var fecha_prod = $("#fecha_prod").val();
      var catalogo_item = $("#catalogo_item").val();
      var marca_item = $("#marca_item").val();
      var preciou_ant = $("#preciou_ant").val();
      var plazo_entrega = $("#plazo_entrega").val();

      fil = ultimo_valor_fila();
      if (fil === 0) {
        $("#tabla_articulos > tbody > tr > td").remove();
      }
      var num = ultimo_valor_fila() + 1;

      console.log(num);

      dsctoline = $("#dsctoline").val();
      multi_descuento = $("#multi_dscto").val();
      var monto = parseFloat(
        cantidad * precio - cantidad * precio * (dsctoline / 100)
      ).toFixed(2);
      if (articulo === "") {
        bandera = false;
        listar_noty("Codigo vacio...!");
      }
      if (descripcion === "") {
        bandera = false;
        listar_noty("Descripcion vacia...!");
      }
      if (cantidad === "") {
        bandera = false;
        listar_noty("Cantidad vacia...!");
      }
      if (cantidad <= 0) {
        bandera = false;
        listar_noty("Cantidad vacia...!");
      }
      if (precio === "") {
        bandera = false;
        listar_noty("Precio S/IGV vacio...!");
      }
      if (plazo_entrega === "") {
        bandera = false;
        listar_noty("Plazo de entrega vacio vacio...!");
      }
      if (precio <= 0) {
        bandera = false;
        listar_noty("Precio NO VALIDO...!");
      }
      if (dsctoline.indexOf("+") !== -1) {
        bandera = false;
        listar_noty("Falta Calcular");
      }
      //console.log(preciou_ant);console.log(precio);
      if (precio < preciou_ant) {
        bandera = false;
        var n = noty({
          text: "Precio no puede ser menor al precio base...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (bandera === true) {
        $("#tabla_articulos > tbody").append(
          "<tr><td class='center'>" +
          num +
          "</td><td class='center'>" +
          articulo +
          "</td><td class='center'>" +
          descripcion +
          "</td><td class='center'>" +
          marca_item +
          "</td><td class='center'>" +
          catalogo_item +
          "</td><td class='center'>" +
          unidad +
          "</td><td class='center'>" +
          parseFloat(cantidad).toFixed(2) +
          "</td><td class='center'>" +
          parseFloat(precio).toFixed(2) +
          "</td><td class='center'>" +
          dsctoline +
          "</td><td class='center'>" +
          parseFloat(monto).toFixed(2) +
          "</td><td class='center'>" +
          plazo_entrega +
          "</td><td class='center' style='display:none'>" +
          fecha_prod +
          "</td><td class='center' style='display:none'>" +
          multi_descuento +
          "</td><td class='center'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button><button onclick='editar_producto(" +
          num +
          ");' class='btn  btn-warning btn-xs'><i class='fa fa-edit bigger-120'></i></button></td></tr>"
        );
        $("#codigo").val("");
        $("#cantidad").val(0.0);
        $("#dsctoline").val(0.0);
        $("#exis").val(0.0);
        $("#monedaitem").val("");
        $("#descripcionitem").val("");
        $("#preciou").val(0.0);
        $("#preciouigv").val(0.0);
        //$("#preciou").attr("disabled", true);
        $("#codigo").focus();
        $(".widget-user-desc").html("");
        $(".exis").html(0);
        $(".preciol").html(0.0);
        /*cancela_operacion();*/
        // $("#imagen").attr("src", 'dist/img/sin_foto.png');
        resumen();
        $("#modal_articulo").modal("hide");
      }
    } else {
      listar_noty("Cantidad Invalida");
    }
  });
}

function listar_noty(msje) {
  var n = noty({
    text: msje,
    theme: "relax",
    layout: "center",
    type: "error",
    timeout: 2000,
  });
}

function desactivar_datos() {
  //$('#cmoneda').prop('disabled', 'disabled');
  $("#cpago").prop("disabled", "disabled");
  //$('#bcliente').prop('disabled', 'disabled');
}

function editar_producto(num) {
  num = num - 1;
  $("#moda_editar_articulo").modal("show");
  cod_art = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[1]
    .innerHTML;
  descripcion_art = $($("#tabla_articulos").find("tbody > tr")[num]).children(
    "td"
  )[2].innerHTML;
  fecha_entrega = $($("#tabla_articulos").find("tbody > tr")[num]).children(
    "td"
  )[11].innerHTML;
  cantidad = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[6]
    .innerHTML;
  unidad_medida = $($("#tabla_articulos").find("tbody > tr")[num]).children(
    "td"
  )[5].innerHTML;
  preciou = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[7]
    .innerHTML;
  monto = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[9]
    .innerHTML;
  dscto_lin = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[8]
    .innerHTML;
  catalogo = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[4]
    .innerHTML;
  marca = $($("#tabla_articulos").find("tbody > tr")[num]).children("td")[3]
    .innerHTML;
  plazo_entrega = $($("#tabla_articulos").find("tbody > tr")[num]).children(
    "td"
  )[10].innerHTML;

  $("#codigo_modificar").val(cod_art);
  $("#descripcionitem_modificar").val(descripcion_art);
  $("#fecha_prod_modificar").val(fecha_entrega);
  $("#cantidad_modificar").val(cantidad);
  $("#unidad_line_modificar").val(unidad_medida);
  $("#preciou_modificar").val(preciou);
  $("#preciou_ant_modificar").val(preciou);
  $("#preciouigv_modificar").val(monto);
  $("#dsctoline_modificar").val(dscto_lin);
  $("#catalogo_item_modificar").val(catalogo);
  $("#marca_item_modificar").val(marca);
  $("#plazo_entrega_modificar").val(plazo_entrega);
  $("#num_mod").val(num);
}

function calcular_multidscto() {
  var multi_descuento = $("#dsctoline").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === "") {
    var dsctoline = 0;
    var dsctoline2 = 0;
    var dsctoline3 = 0;
  }
  if (data.length == 1) {
    var dsctoline = data[0];
    var dsctoline2 = data[0];
    var dsctoline3 = 0;
  }
  if (data.length == 2) {
    var dsctoline2 = parseFloat(data[0]);
    var dsctoline3 = parseFloat(data[1]);

    var dsctoline = parseFloat(
      dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
    ).toFixed(2);
    $("#dsctoline").val(dsctoline);
    $("#multi_dscto").val(multi_descuento);
    //console.log(dsctoline);
  }
}

function calcular_multidscto2() {
  var multi_descuento = $("#dsctoline_modificar").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === "") {
    var dsctoline = 0;
    var dsctoline2 = 0;
    var dsctoline3 = 0;
  }
  if (data.length == 1) {
    var dsctoline = data[0];
    var dsctoline2 = data[0];
    var dsctoline3 = 0;
  }
  if (data.length == 2) {
    var dsctoline2 = parseFloat(data[0]);
    var dsctoline3 = parseFloat(data[1]);

    var dsctoline = parseFloat(
      dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
    ).toFixed(2);
    $("#dsctoline_modificar").val(dsctoline);
    $("#multi_dscto_modificar_mod").val(multi_descuento);
    //console.log(dsctoline);
  }
}

function calcular_multidscto3() {
  var multi_descuento = $("#dsctoline_modificar_mod").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === "") {
    var dsctoline = 0;
    var dsctoline2 = 0;
    var dsctoline3 = 0;
  }
  if (data.length == 1) {
    var dsctoline = data[0];
    var dsctoline2 = data[0];
    var dsctoline3 = 0;
  }
  if (data.length == 2) {
    var dsctoline2 = parseFloat(data[0]);
    var dsctoline3 = parseFloat(data[1]);

    var dsctoline = parseFloat(
      dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
    ).toFixed(2);
    $("#dsctoline_modificar_mod").val(dsctoline);
    $("#multi_dscto_modificar_mod").val(multi_descuento);
    //console.log(dsctoline);
  }
}

function calcular_multidscto4() {
  var multi_descuento = $("#dsctoline2").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === "") {
    var dsctoline = 0;
    var dsctoline2 = 0;
    var dsctoline3 = 0;
  }
  if (data.length == 1) {
    var dsctoline = data[0];
    var dsctoline2 = data[0];
    var dsctoline3 = 0;
  }
  if (data.length == 2) {
    var dsctoline2 = parseFloat(data[0]);
    var dsctoline3 = parseFloat(data[1]);

    var dsctoline = parseFloat(
      dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
    ).toFixed(2);
    $("#dsctoline2").val(dsctoline);
    $("#multi_dscto2").val(multi_descuento);
    //console.log(dsctoline);
  }
}

function actualizar_datos_prod() {
  bandera = true;
  var precio = $("#preciou_modificar").val();
  var cantidad = $("#cantidad_modificar").val();
  var dsctoline = $("#dsctoline_modificar").val();
  var multi_dscto = $("#multi_dscto_modificar_mod").val();
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(2);
  if (dsctoline.indexOf("+") !== -1) {
    bandera = false;
    listar_noty("Falta Calcular");
  }
  if (bandera === true) {
    num = $("#num_mod").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[1].innerHTML = $("#codigo_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[2].innerHTML = $("#descripcionitem_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[3].innerHTML = $("#marca_item_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[4].innerHTML = $("#catalogo_item_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[5].innerHTML = $("#unidad_line_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[6].innerHTML = $("#cantidad_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[7].innerHTML = $("#preciou_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[8].innerHTML = dsctoline;
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[9].innerHTML = monto;
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[10].innerHTML = $("#plazo_entrega_modificar").val();
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[11].innerHTML = multi_dscto;
    $("#moda_editar_articulo").modal("hide");
    $($("#tabla_articulos").find("tbody > tr")[num]).children(
      "td"
    )[12].innerHTML = multi_dscto;
    $("#moda_editar_articulo").modal("hide");

    resumen();
  }
}

function cal_igv_mod() {
  precio = $("#preciou_modificar").val();

  precio_igv = parseFloat(
    parseFloat(precio * 0.18) + parseFloat(precio)
  ).toFixed(2);

  precio_isnan = isNaN(precio_igv) ? 0 : precio_igv;

  $("#preciouigv_modificar").val(precio_igv);
}

/******************************************************************************************/
$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", ".delete", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();

    var num_filas = $("#tabla_articulos tbody tr").length;
    // $i = 1;
    $("#tabla_articulos > tbody > tr").each(function (i) {
      $(this).find("td").eq(0).html(i + 1);
    });
  });
});
/******************************************************************************************/
$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", "#delete_mod", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();
    resumen_mod();
    num_filas = document.getElementById("tabla_art_ped").rows.length - 1;

    if (num_filas <= 0) {
      //$('#cmoneda').prop('disabled', '');
      $("#cpago").prop("disabled", "");
      //$('#bcliente').prop('disabled', '');
    } else {
      //$('#cmoneda').prop('disabled', 'disabled');
    }
  });
});

/****************************************************************************************/
function resumen1() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    $("#tabla_articulos > tbody > tr").each(function () {
      // articulos += parseFloat($(this).find("td").eq(6).html());
      // monto += parseFloat($(this).find('td').eq(9).html());
      articulos += parseFloat(
        $(this).find("td").find('input[id="cantidad_item"]').val()
      );
      monto += parseFloat(
        $(this).find("td").find('input[id="monto_item"]').val()
      );
    });

    cmoneda = $("#lista_cmoneda option:selected").val();

    var el = document.getElementById("totales");
    let num = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto);
    el.innerText = num;

    //alert(el)
    //$("#totales").html(monto.toFixed(2));
    montoigv = monto * 0.18;

    monto_total = monto + montoigv;
    //$("#totalesigv").html(montoigv.toFixed(2));
    var el = document.getElementById("totalesigv");
    let num2 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(montoigv);
    el.innerText = num2;

    var el = document.getElementById("total_venta");
    let num3 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto_total);
    el.innerText = num3;

    var el = document.getElementById("total_articulos");
    el.innerText = articulos.toFixed(2);
    // if (articulos > 0) {
    //   $("#btn-procesa").prop('disabled', false);
    //   $("#btn-cancela").prop('disabled', false);
    //   $("#btn-cancel").prop('disabled', false);
    // } else {
    //   $("#btn-procesa").prop('disabled', true);
    //   $("#btn-cancela").prop('disabled', true);
    //   //$("#btn-cancel").prop('disabled', true);
    // }
  });
}

function resumen() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    // $('#tabla_articulos > tbody > tr').each(function () {
    $("#tabla_articulos > tbody > tr").each(function () {
      articulos += parseFloat(
        $(this).find("td").find('input[id="cantidad_item"]').val()
      );
      monto += parseFloat(
        $(this).find("td").find('input[id="monto_item"]').val()
      );
    });
    // console.log(articulos);
    cmoneda = $("#lista_cmoneda option:selected").val();

    var el = document.getElementById("totales");
    let num = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto);
    el.innerText = num;

    //alert(el)
    //$("#totales").html(monto.toFixed(2));
    montoigv = monto * 0.18;

    monto_total = monto + montoigv;
    //$("#totalesigv").html(montoigv.toFixed(2));
    var el = document.getElementById("totalesigv");
    let num2 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(montoigv);
    el.innerText = num2;

    var el = document.getElementById("total_venta");
    let num3 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto_total);
    el.innerText = num3;

    var el = document.getElementById("total_articulos");
    el.innerText = articulos.toFixed(2);
  });
}
/************************************************************************************/
/******************************************************
LISTA DIRECCION
***************************/
function lista_direccion_condicion() {
  var idcliente3 = "";
  idcliente3 = $("#idcliente_credito").val();
  $(document).ready(function () {
    $.ajax({
      //          beforeSend: function(){
      //            $("#montolp").html("Recuperando Lista Precios...");
      //           },
      url: "lista_direccion_venta_client.php",

      type: "POST",
      data: { idcliente3 },
      success: function (x) {
        $("#pone_cdireccion2").html(x);
        $(".select2").select2();
        //              alert($("#totales").html())
        //$("#montolp2").val($("#montolp").val());
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}
let line_mod = [];
$(document).on("click", "#tabla_art_mod tbody tr", function () {
  // Encuentra el checkbox dentro de la fila actual
  var checkbox = $(this).find("#cotizacion_mod");

  // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
  checkbox.prop("checked", !checkbox.prop("checked"));

  // Actualiza la apariencia y el botón según el estado del checkbox
  actualizarFila_mod(checkbox);

  let codigo = $(this).children("td:eq(1)").text();


  if (checkbox.prop("checked")) {
    if (!line_mod.includes(codigo)) {
      line_mod.push(codigo);
    }
  } else {

    const index = line_mod.indexOf(codigo);
    if (index > -1) {
      line_mod.splice(index, 1);
    }
  }
});

$(document).on("click", "#tabla_art_mod_otro tbody tr", function () {
  // Encuentra el checkbox dentro de la fila actual
  var checkbox = $(this).find("#cotizacion_mod_otro");

  // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
  checkbox.prop("checked", !checkbox.prop("checked"));

  // Actualiza la apariencia y el botón según el estado del checkbox
  actualizarFila_mod_otro(checkbox);

  let codigo = $(this).children("td:eq(1)").text();


  if (checkbox.prop("checked")) {
    if (!line_mod.includes(codigo)) {
      line_mod.push(codigo);
    }
  } else {

    const index = line_mod.indexOf(codigo);
    if (index > -1) {
      line_mod.splice(index, 1);
    }
  }
});

function actualizarFila_mod(checkbox) {
  var checkbox2 = $("#tabla_art_mod tbody tr").find("#cotizacion_mod");
  var cant = checkbox2.closest("tr").find("#cotizacion_mod:checked").length;
  //console.log(cant);
  if (checkbox.is(":checked")) {
    checkbox.closest("tr").find("td").css("background-color", "LightGreen");
  } else {
    checkbox.closest("tr").find("td").css("background-color", "white");
  }
  if (cant > 0) {
    $("#enviar_mod").removeClass("disabledTab");
    $("#enviar_mod").addClass("activeTab");
  } else {
    $("#enviar_mod").removeClass("activeTab");
    $("#enviar_mod").addClass("disabledTab");
  }
}

function actualizarFila_mod_otro(checkbox) {
  var checkbox2 = $("#tabla_art_mod_otro tbody tr").find("#cotizacion_mod_otro");
  var cant = checkbox2.closest("tr").find("#cotizacion_mod_otro:checked").length;
  //console.log(cant);
  if (checkbox.is(":checked")) {
    checkbox.closest("tr").find("td").css("background-color", "LightGreen");
  } else {
    checkbox.closest("tr").find("td").css("background-color", "white");
  }
  if (cant > 0) {
    $("#enviar_mod_otro").removeClass("disabledTab");
    $("#enviar_mod_otro").addClass("activeTab");
  } else {
    $("#enviar_mod_otro").removeClass("activeTab");
    $("#enviar_mod_otro").addClass("disabledTab");
  }
}

let line2 = [];
$(document).on("click", "#tabla_art tbody tr", function () {
  // Encuentra el checkbox dentro de la fila actual
  var checkbox = $(this).find("#cotizacion_seg");

  // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
  checkbox.prop("checked", !checkbox.prop("checked"));

  // Actualiza la apariencia y el botón según el estado del checkbox
  actualizarFila(checkbox);

  let codigo = $(this).children("td:eq(1)").text();

  // Si el checkbox está marcado, agregar el código al array 'line2'
  if (checkbox.prop("checked")) {
    if (!line2.includes(codigo)) {
      line2.push(codigo);
    }
  } else {
    // Si el checkbox está desmarcado, eliminar el código del array 'line2'
    const index = line2.indexOf(codigo);
    if (index > -1) {
      line2.splice(index, 1);
    }
  }
});

function actualizarFila(checkbox) {
  var checkbox2 = $("#tabla_art tbody tr").find("#cotizacion_seg");
  var cant = checkbox2.closest("tr").find("#cotizacion_seg:checked").length;
  //console.log(cant);
  if (checkbox.is(":checked")) {
    checkbox.closest("tr").find("td").css("background-color", "LightGreen");
  } else {
    checkbox.closest("tr").find("td").css("background-color", "white");
  }
  if (cant > 0) {
    $("#enviar").removeClass("disabledTab");
    $("#enviar").addClass("activeTab");
  } else {
    $("#enviar").removeClass("activeTab");
    $("#enviar").addClass("disabledTab");
  }
}

function modal_art_mod() {
  condi = $("#lista_cpago_mod option:selected").val();

  //$('#modal_articulo_2').modal('show');
  //$('#modal_articulo_2').modal('show');

  if (!condi) {
    alertify.error("Espere que cargue la condicion de pago")
  } else {
    line_mod = [];
    $("#modal_busqueda_arts_mod").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
    $("#modal_busqueda_arts_mod").on("shown.bs.modal", function () {
      $("#lista_articulos_mod").html("");
      $("#articulo_buscar_mod").val("");
      $("#articulo_buscar_mod").focus();
    });
    lista_marca2();
  }

}

function modal_art_mod_otro() {
  condi = $("#lista_cpago_mod_otro option:selected").val();

  //$('#modal_articulo_2').modal('show');
  //$('#modal_articulo_2').modal('show');

  if (!condi) {
    alertify.error("Espere que cargue la condicion de pago")
  } else {
    line_mod = [];
    $("#modal_busqueda_arts_mod_otro").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
    $("#modal_busqueda_arts_mod_otro").on("shown.bs.modal", function () {
      $("#lista_articulos_mod_otro").html("");
      $("#articulo_buscar_mod_otro").val("");
      $("#articulo_buscar_mod_otro").focus();
    });
    lista_marca2_otro();
  }

}

function modal_art() {
  //$('#modal_articulo').modal('show');
  //$('#modal_articulo').modal('show');
  vendedor = $("#pone_vendedores option:selected").val();
  condi = $("#lista_cpago option:selected").val();


  if (!vendedor) {
    alertify.error("Espere que cargue los vendedores")
  } else if (!condi) {
    alertify.error("Espere que cargue la condicion de pago")
  } else {
    line2 = [];

    $("#modal_busqueda_arts").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
    $("#modal_busqueda_arts").on("shown.bs.modal", function () {
      $("#lista_articulos").html("");
      $("#articulo_buscar").val("");
      $("#articulo_buscar").focus();
    });
    lista_marca();
    $("#enviar").removeClass("activeTab");
    $("#enviar").addClass("disabledTab");
  }
}

function busqueda_art() {
  $("#modal_articulo").modal("show");
  // $("#modal_busqueda_arts").modal({
  //   show: true,
  //   backdrop: 'static',
  //   keyboard: false
  // });
  // $('#modal_busqueda_arts').on('shown.bs.modal', function () {
  //   $("#lista_articulos").html("");
  //   $("#articulo_buscar").val("");
  //   $("#articulo_buscar").focus();
  // });
  //lista_marca();
}

function lista_marca() {
  $.ajax({
    beforeSend: function () {
      $("#listar_marca_art").html("");
    },
    url: "busca_data_articulo_marca.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#listar_marca_art").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
      $("#listar_marca_art").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

function lista_marca2() {
  $.ajax({
    beforeSend: function () {
      $("#listar_marca_art2").html("");
    },
    url: "busca_data_articulo_marca.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#listar_marca_art2").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
      $("#listar_marca_art2").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

function lista_marca2_otro() {
  $.ajax({
    beforeSend: function () {
      $("#listar_marca_art2_otro").html("");
    },
    url: "busca_data_articulo_marca.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#listar_marca_art2_otro").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
      $("#listar_marca_art2_otro").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

function busca() {
  cmoneda = $("#lista_cmoneda option:selected").val();
  data_buscar = $("#articulo_buscar").val();
  var data = data_buscar.split("//");
  firname = $("#listar_marca_art select").val();

  if (data_buscar === "") {
    datasupcatname = "";
    data_descripcion = "";
    data_codigo = "";
  }

  if (data.length == 1) {
    datasupcatname = data[0];
    data_descripcion = "";
    data_codigo = "";
  }
  if (data.length == 2) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = "";
  }
  if (data.length == 3) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = data[2];
  }
  //console.log(data);
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos").html("");
    },
    url: "busca_data_articulo_nuevo.php",
    type: "POST",
    data: {
      descripcion: data_descripcion,
      firname: firname,
      supcatname: datasupcatname,
      data_codigo: data_codigo,
    },
    success: function (x) {
      $("#lista_articulos").html(x);
      $("#tabla_art").DataTable({
        pageLength: -1,
        lengthMenu: [
          [10, 20, 60, -1],
          [10, 20, 60, "Todos"],
        ],
      });
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

function add_art(art) {
  //alert(art);
  $("#modal_busqueda_arts").modal("toggle");
  $("#modal_articulo").modal("show");
  $("#codigo").val(art.trim());
  busca_articulo();
}
function cal_igv() {
  precio = $("#preciou").val();

  precio_igv = parseFloat(
    parseFloat(precio * 0.18) + parseFloat(precio)
  ).toFixed(2);

  precio_isnan = isNaN(precio_igv) ? 0 : precio_igv;

  $("#preciouigv").val(precio_igv);
}
function cal_igv2() {
  precio = $("#preciou2").val();

  precio_igv = parseFloat(
    parseFloat(precio * 0.18) + parseFloat(precio)
  ).toFixed(2);

  precio_isnan = isNaN(precio_igv) ? 0 : precio_igv;

  $("#preciouigv2").val(precio_igv);
}

function busca_articulo() {
  $(document).ready(function () {
    var cod = $("#codigo").val().trim();
    var tipcli = $("#tipocliente").val().trim();
    var cmoneda = $("#lista_cmoneda option:selected").val();
    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo").html("Buscando informacion del articulo...");
          },
          url: "busca_data_articulo_pventa.php",
          dataType: "json",
          type: "POST",
          data:
          //PERMITE HACER MULTIPLE CONSULTA GC
          {
            codigo: $("#codigo").val(),
            idcliente_credito: $("#idcliente_credito").val(),
            cmoneda: cmoneda,
          },
          //              'codigo='+$("#codigo").val(),
          success: function (data) {
            precio = Number(data[0].precio).toFixed(2);
            precio_igv = precio * 1.18;
            precioigv_parse = Number(precio_igv).toFixed(2);
            //console.log(data);
            if (data == 0) {
              //            alert("No existe el articulo...!");
              var n = noty({
                text: "No existe el articulo...!",
                theme: "relax",
                layout: "center",
                type: "error",
                timeout: 2000,
              });

              $("#codigo").val("");
              $("#codigo").focus();
              $("#cantidad").attr("disabled", true);
              $("#cantidad").val(0.0);
              $("#dsctoline").attr("disabled", true);
              $("#dsctoline").val(0.0);
              $("#monedaitem").attr("disabled", true);
              $("#monedaitem").val("");
              $("#descripcionitem").val("");
              //$("#preciou").attr("disabled", true);
              $("#preciou").val(0.0);
              $("#preciouigv").attr("disabled", true);
              $("#preciouigv").val(0.0);
              $(".widget-user-desc").html("");
              $(".exis").html(0);
              $(".preciol").html(0.0);
              $("#imagen").attr("src", "dist/img/sin_foto.png");
            } else {
              $("#cantidad").val(0.0);
              $("#dsctoline").val(0.0);
              $("#monedaitem").val("");
              $("#preciou").val(0.0);
              $("#preciou_ant").val(precio);
              $(".widget-user-desc").html(data[0].descripcion);
              $("#descripcionitem").val(data[0].descripcion);
              /* if (data[0].cantidad < 1) {
                document.getElementsByClassName("exis")[0].style.color = "red";
                document.getElementsByClassName("exis")[0].style.fontWeight = "bolder";
              } else {
                document.getElementsByClassName("exis")[0].style.color = "blue";
                document.getElementsByClassName("exis")[0].style.fontWeight = "bolder";
              } */
              $("#exis").val(data[0].cantidad);
              $(".preciol").html(precio);
              $("#monedaitem").attr("disabled", true);
              $("#monedaitem").val(data[0].moneda);
              // $("#preciou").attr("disabled", true);
              //$('#preciou').number(true, 2);
              $("#preciou").val(precio);
              $("#unidad_line").val(data[0].unidad_medida);
              $("#catalogo_item").val(data[0].Catalogo);
              $("#marca_item").val(data[0].Fabricante);
              //console.log(data[0].precio);
              // SI TIPO CLIENTE = 115 = EXTRANJERO
              if (data[0].tipocliente == 115) {
                $("#preciouigv").val(precio);
              } else {
                $("#preciouigv").val(parseFloat(precio_igv).toFixed(2));
              }
              //$('#cantidad').number(true, 2);
              $("#cantidad").attr("disabled", false);
              $("#cantidad").val(0.0);
              $("#dsctoline").attr("disabled", false);
              $("#dsctoline").val(0.0);
              $("#preciou").select();
              $("#cantidad").focus();
              if (data[0].imagen != "") {
                $("#imagen").attr("src", "img_articulos/" + data[0].imagen);
              } else {
                $("#imagen").attr("src", "dist/img/sin_foto.png");
              }
              if (data[0].cantidad <= 0) {
                // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                var n = noty({
                  text: "No hay suficiente existencia...!",
                  theme: "relax",
                  layout: "center",
                  type: "information",
                  timeout: 2000,
                });
                //                alert("No hay suficiente existencia...!")
                //                 $("#codigo").val("");
                //                 $("#codigo").focus();
                //                 $("#cantidad").attr("disabled", true);
                //                $("#dsctoline").attr("disabled", true);
                //                 $("#preciou").attr("disabled", true);
                $("#cantidad").focus();
              }
            }
          },

          error: function (jqXHR, estado, error) {
            // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
            var n = noty({
              text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
              theme: "relax",
              layout: "center",
              type: "error",
              timeout: 2000,
            });
            //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
          },
        });
      });
    } else {
    }
  });
}

function calculo_monto_item(linea) {
  cantidad = $($("#tabla_articulos").find("tbody > tr")[linea]).children(
    "td"
  )[6].children[0];
  console.log(cantidad);
}

let global = 0;
// function procesa_cotizacion() {
//   /*busca el numero de ticket*/
//   var n_tic;
//   $.ajax({
//     beforeSend: function () {
//       $("#nro_ticket").html("Buscando...");
//     },
//     async: false,
//     url: "busca_ticket_cotizacion.php",
//     type: "POST",
//     data: "caja=" + $("#ncaja").val(),
//     success: function (x) {
//       $("#nro_ticket").html(x);
//       n_tic = x;
//       return n_tic;
//     },
//     error: function (jqXHR, estado, error) {
//       $("#nro_ticket").html("Hubo un error: " + estado + " " + error);
//     },
//   });
//   ntic = parseInt(n_tic);
//   // setTimeout("actualiza_ticket()", 1000);
//   var credi = "0";
//   var clients = "0";
//   var dscto = "0";
//   var comentarios = "0";
//   var transportista = "";
//   var idcliente_parent = "0";
//   var cpago = "0";
//   var fentrega = "0";
//   var direntrega = "0";
//   var subtotal_venta = "0";
//   var total_venta = "0";
//   var n_ticket = "0";
//   var idlp = "1";

//   band = true;
//   credi = "1";
//   clients = $("#idcliente_credito").val();
//   clientename = quitarAcentos($("#idcliente_razon").val());
//   comentarios = quitarAcentos($("#comentarios").val());
//   transportista = $("#codigotransportista").val();
//   idcliente_parent = ""; //cliente vinculado;
//   cpago = $("#lista_cpago option:selected").val();
//   cmoneda = $("#lista_cmoneda option:selected").val();
//   slpCode = $("#pone_vendedores option:selected").val();
//   //cpago=document.getElementById("#pone_cpago").selectedIndex;
//   fentrega = $("#fecha").val();
//   // direntrega = $("#pone_cdireccion2 option:selected").text();
//   direntrega = $("#cap_dicc").val();
//   validez = $("#validez").val();
//   cod_dire_entrega = $("#pone_cdireccion2 option:selected").val();
//   dirigido_coti_antes = $("#dirigido_coti option:selected").val();

//   if (dirigido_coti_antes === '') {
//     dirigido_coti = $("#dirigido_coti_nombre").val()
//     dirigido_coti_cod = 0;
//   } else {
//     var idcl_coti = dirigido_coti_antes.split("|");
//     dirigido_coti_cod = idcl_coti[0];
//     dirigido_coti = $("#dirigido_coti_nombre").val();
//   }



//   correo_dirigido = $("#correo_dirigido").val();
//   telefono_dirigido = $("#telefono_dirigido").val();
//   n_ticket = n_tic;
//   idlp = ""; //lista de precios;
//   U_IMOB_ESTADO = "Pendiente";
//   U_IMOB_OBSERVACION = "";
//   U_IMOB_OV = "";
//   U_IMOB_FECOV = "";
//   ref_req = $("#ref_req").val();
//   modificado = "0";
//   var subtotal_venta = 0.0;
//   var total_venta = 0.0;
//   $("#tabla_articulos > tbody > tr").each(function () {
//     subtotal_venta += parseFloat(
//       $(this).find("td").find('input[id="monto_item"]').val()
//     );
//   });
//   filas = $("#tabla_articulos").find("tbody tr").length;
//   dscto = ""; //descuento total;
//   total_venta = subtotal_venta + subtotal_venta * 0.18;

//   if (clients === "") {
//     alertify.error("Falta Elegir Cliente");
//     band = false;
//   }
//   if (slpCode === "-1") {
//     alertify.error("Falta Elegir Vendedor");
//     band = false;
//   }
//   if (filas === 0) {
//     alertify.error("Falta Agregar Productos");
//     band = false;
//   }
//   if (ref_req.length > 50) {
//     alertify.error("La Referencia no puede exceder los 50 caracteres.");
//     band = false;
//     return
//   }
//   // if(cod_dire_entrega === 'FISCAL'){
//   //   alertify.error("La Referencia no puede exceder los 50 caracteres.");
//   //   band = false;
//   //   return
//   // }

//   $("#tabla_articulos > tbody > tr").each(function () {
//     linea = $(this).find("td").eq(0).html();
//     lina2 = linea;
//     var can = $(this).find("td").find('input[id="cantidad_item"]').val();
//     var preciou = $(this).find("td").find('input[id="precio_uni"]').val();
//     var dscto_lin = $(this)
//       .find("td")
//       .find('input[id="descuento_item"]')
//       .val();
//     var monto = $(this).find("td").find('input[id="monto_item"]').val();
//     precio_unitario = $(this).find("td").eq(17).html();
//     if (can === "" || can <= 0) {
//       alertify.error("Linea: " + lina2 + " " + "Falta Cantidad Invalida");
//       $(this).find("td").eq(8).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(8).css("background-color", "white");
//     }
//     if (preciou === "" || preciou <= 0) {
//       alertify.error("Linea: " + linlina2ea + " " + "Falta Precio Invalido");
//       $(this).find("td").eq(9).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(9).css("background-color", "white");
//     }
//     if (monto === "" || monto <= 0) {
//       alertify.error("Linea: " + lina2 + " " + "Falta Precio Invalido");
//       $(this).find("td").eq(13).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(13).css("background-color", "white");
//     }
//     if (dscto_lin.indexOf("+") !== -1) {
//       alertify.error("Linea: " + lina2 + " " + "Falta Calcular Descuento");
//       $(this).find("td").eq(12).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(12).css("background-color", "white");
//     }
//     if (parseFloat(precio_unitario) > parseFloat(preciou)) {
//       alertify.error(
//         "Linea: " +
//         lina2 +
//         " " +
//         "Precio Unitario Inferior al Precio de Lista"
//       );
//       $(this).find("td").eq(9).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(9).css("background-color", "white");
//     }
//   });

//   fath = "";
//   tipo_venta = "";
//   if (band === true) {
//     $.ajax({
//       beforeSend: function () { },
//       url: "procesa_cotizacion.php",
//       type: "POST",
//       data:
//         "clienteid=" +
//         clients +
//         "&credito=" +
//         credi +
//         "&comentarios=" +
//         comentarios +
//         "&idcliente_parent=" +
//         idcliente_parent +
//         "&cpago=" +
//         cpago +
//         "&cmoneda=" +
//         cmoneda +
//         "&fentrega=" +
//         fentrega +
//         "&direntrega=" +
//         direntrega +
//         "&dscto=" +
//         dscto +
//         "&subtotal_venta=" +
//         subtotal_venta +
//         "&total_venta=" +
//         total_venta +
//         "&total_linea=" +
//         subtotal_venta +
//         "&n_ticket=" +
//         n_tic +
//         "&father=" +
//         fath +
//         "&tipo_vta=" +
//         tipo_venta +
//         "&transportista=" +
//         transportista +
//         "&idlp=" +
//         idlp +
//         "&caja=" +
//         $("#ncaja").val() +
//         "&U_IMOB_ESTADO=" +
//         U_IMOB_ESTADO +
//         "&U_IMOB_OBSERVACION=" +
//         U_IMOB_OBSERVACION +
//         "&U_IMOB_OV=" +
//         U_IMOB_OV +
//         "&U_IMOB_FECOV=" +
//         U_IMOB_FECOV +
//         "&clientename=" +
//         clientename +
//         "&slpCode=" +
//         slpCode +
//         "&ref_req=" +
//         ref_req +
//         "&validez=" +
//         validez +
//         "&modificado=" +
//         modificado +
//         "&modificado=" +
//         modificado +
//         "&dirigido_coti=" +
//         dirigido_coti +
//         "&correo_dirigido=" +
//         correo_dirigido +
//         "&telefono_dirigido=" +
//         telefono_dirigido +
//         "&dirigido_coti_cod=" +
//         dirigido_coti_cod +
//         "&cod_dire_entrega=" +
//         cod_dire_entrega,
//       success: function (x) {
//         global = parseInt(x);
//         //console.log(global);
//         $("#num_tick_act").val(global);
//         $("#comentarios").val("");

//         $("#cap_dicc").val("");
//         $("#pone_cdireccion2").val("");
//         $("#pone_transportista").val("");
//         $("#codigotransportista").val("");
//         $("#idtransportista_razon").val("");
//         if (global == 0) {
//           alertify.error("No Inserto");
//         } else {
//           $("#tabla_articulos > tbody > tr").each(function () {
//             linea = $(this).find("td").eq(0).html();
//             var line = parseInt(linea);
//             //$(this).find('td').eq(3).html()
//             var cod = quitarAcentos($(this).find("td").eq(1).text());
//             if (cod === "21004147" || cod === "21004146") {
//               // var descripcion_art = quitarAcentos(
//               //   $(this).find("td").find('input[id="descripcion"]').val()
//               // );

//               var descripcion_art = $(this).find("td").find('input[id="descripcion"]').val();
//               // var marca = quitarAcentos(
//               //   $(this).find("td").find('input[id="marca"]').val()
//               // );
//               var marca = $(this).find("td").find('input[id="marca"]').val();

//               // var catalogo = quitarAcentos(
//               //   $(this).find("td").find('input[id="catalogo"]').val()
//               // );
//               var catalogo = $(this).find("td").find('input[id="catalogo"]').val();
//             } else {
//               // var descripcion_art = quitarAcentos(
//               //   $(this).find("td").eq(2).html()
//               // );
//               var descripcion_art = $(this).find("td").eq(2).html();
//               var descripcion_art = '-';

//               // var detalle_art = quitarAcentos(
//               //   $(this).find("td").eq(3).html()
//               // );
//               // var marca = quitarAcentos($(this).find("td").eq(3).html());
//               var marca = $(this).find("td").eq(3).html();
//               // var catalogo = quitarAcentos($(this).find("td").eq(4).html());
//               var catalogo = $(this).find("td").eq(4).html();
//             }

//             var unidad_medida = $(this).find("td").eq(5).html();
//             var can = $(this)
//               .find("td")
//               .find('input[id="cantidad_item"]')
//               .val();
//             var preciou = $(this)
//               .find("td")
//               .find('input[id="precio_uni"]')
//               .val();
//             var dscto_lin = $(this)
//               .find("td")
//               .find('input[id="descuento_item"]')
//               .val();
//             var monto = $(this)
//               .find("td")
//               .find('input[id="monto_item"]')
//               .val();
//             var plazo_entrega = quitarAcentos(
//               $(this).find("td").find('input[id="plazoEntrega_item"]').val()
//             );
//             var fecha_prod = "";
//             var multi_descuento = "";
//             var tipo_venta = "";
//             var fath = "";
//             var modificado = "1";
//             // var detalle_art = quitarAcentos(
//             //   $(this).find("td").find('input[id="detalle_art"]').val()
//             // );
//             var detalle_art = $(this).find("td").find('input[id="detalle_art"]').val();
//             $.ajax({
//               beforeSend: function () { },
//               url: "procesa_cotizacion_det.php",
//               type: "POST",
//               data: {
//                 codigo: cod, descripcion_art: descripcion_art, cantidad: can, preciou: preciou, dscto_lin: dscto_lin,
//                 total_linea: monto, tipo_vta: tipo_venta, father: fath, n_ticket: global, line: line, unidad_medida: unidad_medida,
//                 fecha_prod: fecha_prod, marca: marca, catalogo: catalogo, plazo_entrega: plazo_entrega, modificado: modificado,
//                 multi_descuento: multi_descuento, detalle_art: detalle_art
//               },

//               success: function (data) {
//                 var n = noty({
//                   text: "Procesando venta...  articulo actual: " + cod,
//                   theme: "relax",
//                   layout: "topLeft",
//                   type: "success",
//                   timeout: 2000,
//                 });
//               },
//               error: function (jqXHR, estado, error) {
//                 $("#errores").html("Error... " + estado + "  " + error);
//               },
//             });
//           });

//           var n = noty({
//             text: "Procesando venta...  articulo actual: " + ntic,
//             theme: "relax",
//             layout: "topLeft",
//             type: "success",
//             timeout: 4000,
//           });
//           setTimeout(() => {
//             quita_cliente();
//             pone_num_venta();
//             lista_cotizacion();
//           }, 3000);

//         }
//       },
//       error: function (jqXHR, estado, error) {
//         $("#errores").html("Error... " + estado + "  " + error);
//       },
//     });
//   }
//   var yapuso = 0;

// }

function procesa_cotizacion() {

  $.ajax({
    beforeSend: function () {
      $("#nro_ticket").html("Buscando...");
    },
    url: "busca_ticket_cotizacion.php",
    type: "POST",
    data: { caja: $("#ncaja").val() },
    success: function (x) {
      setTimeout(function () {
        $("#nro_ticket").html(parseInt(x.trim()));
        n_tic = parseInt(x.trim());
        console.log("n_tic después del delay:", n_tic);
        if (n_tic !== undefined) {
          procesa_cotizacion1(n_tic);
        } else {
          alertify.error("No se pudo obtener el número de ticket.");
        }
      }, 1000); // Ajusta el tiempo si es necesario
    },
    error: function (jqXHR, estado, error) {
      $("#nro_ticket").html("Hubo un error: " + estado + " " + error);
    }
  });
}

function procesa_cotizacion1(n_tic) {
  $(document).ready(function () {

    let errores = []; // Lista de errores
    let camposIncompletos = []; // Para resaltar los campos en rojo

    let cpago = $("#lista_cpago option:selected").val();
    let cmoneda = $("#lista_cmoneda option:selected").val();
    let slpCode = $("#pone_vendedores option:selected").val();
    let clients = $("#idcliente_credito").val();
    let clientename = quitarAcentos($("#idcliente_razon").val());

    // Verificar si la tabla tiene filas en <tbody>
    let tablaVacia = $("#tabla_articulos > tbody > tr").length === 0;

    // Resetear estilos antes de validar
    $(".error-input").removeClass("error-input");
    $(".error-box").removeClass("error-box");

    // Validaciones individuales
    if (!cpago) {
      errores.push("Seleccione una condición de pago.");
      camposIncompletos.push("#lista_cpago");
    }
    if (!cmoneda) {
      errores.push("Seleccione una moneda.");
      camposIncompletos.push("#lista_cmoneda");
    }
    if (!slpCode || slpCode === "-1") {
      errores.push("Seleccione un vendedor.");
      camposIncompletos.push("#pone_vendedores");
    }
    if (!clients) {
      errores.push("Ingrese un cliente.");
      camposIncompletos.push("#idcliente_credito");
    }
    // if (!clientename) {
    //     errores.push("Ingrese la razón social del cliente.");
    //     camposIncompletos.push("#idcliente_razon");
    // }
    if (tablaVacia) {
      errores.push("La tabla de detalle está vacía.");
      $("#tabla_articulos").closest(".box.box-primary").addClass("error-box"); // Resaltar la caja completa
    }

    // Si hay errores, mostrar SweetAlert y resaltar los campos
    if (errores.length > 0) {
      // Pintar los campos vacíos de rojo
      camposIncompletos.forEach(selector => {
        $(selector).addClass("error-input");
      });

      // Mostrar alerta con todos los errores a la vez
      Swal.fire({
        title: "¡Campos incompletos!",
        html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
        icon: "error",
        timer: 3000, // Se cierra automáticamente en 3 segundos
        showConfirmButton: false,
        toast: false,
        position: "center"
      });

      return false; // Evitar que continúe la acción
    }


    let band = true;
    let U_IMOB_ESTADO = "Creado"; // Estado por defecto
    let subtotal_venta = 0.0;
    let total_venta = 0.0;
    let montoigv = 0.0;
    let requiereAprobacion = false;


    // Validación de productos
    $("#tabla_articulos > tbody > tr").each(function () {
      let monto = parseFloat($(this).find('input[id="monto_item"]').val());
      let cantidad = parseFloat($(this).find('input[id="cantidad_item"]').val());
      let tipo_iva = $(this).find("#tip_impuesto option:selected").val();
      let dscto_lin = parseFloat($(this).find('input[id="descuento_item"]').val());

      subtotal_venta += monto;

      if (tipo_iva === "IGV") {
        montoigv += monto * 0.18;
      } else if (tipo_iva === "EXO") {
        montoigv += monto * 0.0;
      }


      // Validar si hay descuento mayor al 10%
      if (dscto_lin > 10) {
        requiereAprobacion = true;
      }

    });

    total_venta = subtotal_venta + montoigv;

    // Validaciones previas
    if ($("#idcliente_credito").val() === "") {
      alertify.error("Falta Elegir Cliente");
      band = false;
    }

    if ($("#pone_vendedores option:selected").val() === "-1") {
      alertify.error("Falta Elegir Vendedor");
      band = false;
    }

    if ($("#tabla_articulos").find("tbody tr").length === 0) {
      alertify.error("Falta Agregar Productos");
      band = false;
    }
    // ejecutarCotizacion(n_tic, U_IMOB_ESTADO, band);
    // Si requiere aprobación
    if (requiereAprobacion) {
      Swal.fire({
        title: "Descuento mayor al 10%",
        text: "Esta cotización pasará a aprobación. ¿Desea continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "No, cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          U_IMOB_ESTADO = "Pendiente a Autorizar";
          ejecutarCotizacion1(n_tic, U_IMOB_ESTADO, band);
        } else {
          // No se hace nada si cancela
        }
      });
    } else {
      ejecutarCotizacion1(n_tic, U_IMOB_ESTADO, band);
    }


  });
}


function ejecutarCotizacion1(n_tic, U_IMOB_ESTADO, band) {

  if (!band) return; // Si 'band' es falso, no hace nada

  console.log("nticket" + n_tic);

  let subtotal_venta = 0.0;
  let montoigv = 0.0;
  let error = false; // Bandera para detectar errores

  // **📌 Recorrer los artículos para calcular montos**
  $("#tabla_articulos > tbody > tr").each(function () {
    let $montoItemInput = $(this).find('input[id="monto_item"]');
    let $cantidadItemInput = $(this).find('input[id="cantidad_item"]');
    let $precio_unitario_n = $(this).find('input[id="precio_uni"]');

    let monto_item = parseFloat($montoItemInput.val()) || 0;
    let cantidad = parseFloat($cantidadItemInput.val()) || 0;
    let precio_unitario = $(this).find("td").eq(17).html();
    let preciou = $(this).find("td").find('input[id="precio_uni"]').val();

    // ❌ Validaciones: Si cantidad o monto son incorrectos, marcar en rojo
    if (cantidad <= 0) {
      console.log("Cantidad");
      $cantidadItemInput.css("border", "2px solid red"); // 🔴 Resaltar en rojo
      error = true;
    } else {
      $cantidadItemInput.css("border", ""); // ✅ Quitar borde rojo si está correcto
    }

    if (monto_item <= 0) {
      console.log("Monto");

      $montoItemInput.css("border", "2px solid red"); // 🔴 Resaltar en rojo
      error = true;
    } else {
      $montoItemInput.css("border", ""); // ✅ Quitar borde rojo si está correcto
    }
    if (parseFloat(precio_unitario) > parseFloat(preciou)) {
      $precio_unitario_n.css("border", "2px solid red"); // 🔴 Resaltar en rojo
      alertify.error("Precio Unitario Inferior al Precio de Lista");
      console.log("Precio Unitario Inferior al Precio de Lista");

      error = true;
    } else {
      $precio_unitario_n.css("border", ""); // ✅ Quitar borde rojo si está correcto
    }
    subtotal_venta += monto_item;

    let tipo_iva = $(this).find("#tip_impuesto option:selected").val();
    if (tipo_iva === "IVAGPR19") {
      montoigv += monto_item * 0.18;
    } else if (tipo_iva === "IVAZFR0") {
      montoigv += monto_item * 0.0;
    }

  });
  //error = true;
  // ❌ Si hubo errores, detener el proceso y mostrar alerta
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Datos incorrectos",
      text: "Revisa los campos resaltados en rojo y corrige los valores.",
      confirmButtonText: "Cerrar"
    });
    return;
  }
  let total_venta = subtotal_venta + montoigv; // Se calcula correctamente después del bucle

  if (dirigido_coti_antes === '|||') {
    dirigido_coti = $("#contactito").val();
    dirigido_coti_cod = 0;
  } else {
    let idcl_coti = dirigido_coti_antes.split("|");
    dirigido_coti_cod = idcl_coti[0];
    dirigido_coti = "";
  }

  // **📌 Definir `cotizacionData` antes del bucle**
  let cotizacionData = {
    clienteid: $("#idcliente_credito").val(),
    credito: "1",
    comentarios: quitarAcentos($("#comentarios").val()),
    idcliente_parent: "",
    cpago: $("#lista_cpago option:selected").val(),
    cmoneda: $("#lista_cmoneda option:selected").val(),
    fentrega: $("#fecha_en").val(),
    fdoc: $("#fecha_doc").val(),
    direntrega: $("#cap_dicc").val(),
    validez: $("#validez").val(),
    dirigido_coti: dirigido_coti,
    dirigido_coti_cod: dirigido_coti_cod,
    correo_dirigido: $("#correo_dirigido").val(),
    contacto: $("#dirigido_coti_nombre").val(),
    telefono_dirigido: $("#telefono_dirigido").val(),
    cod_dire_entrega: $("#pone_cdireccion2 option:selected").val(),
    orden_compra_coti: $("#orden_compra_coti").val(),
    proyecto: $("#proyecto").val(),
    flete_cargo: $("#flete_cargo").val(),
    transportista: $("#codigotransportista").val(),
    idlp: "1",
    caja: $("#ncaja").val(),
    U_IMOB_ESTADO: U_IMOB_ESTADO,
    father: "",
    U_IMOB_OBSERVACION: "",
    tipo_venta: "",
    U_IMOB_OV: "",
    U_IMOB_FECOV: "",
    ref_req: $("#ref_req").val(),
    modificado: "0",
    clientename: quitarAcentos($("#idcliente_razon").val()),
    slpCode: $("#pone_vendedores option:selected").val(),
    dscto: "", // Descuento total
    subtotal_venta: parseFloat(subtotal_venta).toFixed(2),
    total_venta: parseFloat(total_venta).toFixed(2),
    TIPO_COTIZACION: '01',
    n_tic: n_tic,
    tipo_vta: "",
    items: []
  };

  // **📌 Recorrer los artículos y agregarlos al JSON**
  $("#tabla_articulos > tbody > tr").each(function () {
    let line = parseInt($(this).find("td").eq(0).html());
    let codigo = quitarAcentos($(this).find("td").eq(1).text());
    let descripcion, marca, catalogo;

    if (codigo === "21004146" || codigo === "21004147") {
      descripcion = ($(this).find("td").find('input[id="descripcion"]').val() || "-").toUpperCase();
      marca = ($(this).find("td").find('input[id="marca"]').val() || "-").toUpperCase();
      catalogo = ($(this).find("td").find('input[id="catalogo"]').val() || "-").toUpperCase();
    } else {
      descripcion = $(this).find("td").eq(2).find("input").length
        ? $(this).find("td").eq(2).find("input").val()
        : quitarAcentos($(this).find("td").eq(2).text().trim());

      marca = $(this).find("td").eq(3).find("input").length
        ? $(this).find("td").eq(3).find("input").val()
        : quitarAcentos($(this).find("td").eq(3).text().trim());

      catalogo = $(this).find("td").eq(4).find("input").length
        ? $(this).find("td").eq(4).find("input").val()
        : quitarAcentos($(this).find("td").eq(4).text().trim());
    }

    let unidad_medida = $(this).find("td").eq(5).html();
    let cantidad = $(this).find("td").find('input[id="cantidad_item"]').val();
    let precio_unitario = $(this).find("td").find('input[id="precio_uni"]').val();
    let descuento = $(this).find("td").find('input[id="descuento_item"]').val();
    let monto = $(this).find("td").find('input[id="monto_item"]').val();
    // let plazo_entrega =  $(this).find("td").find('input[id="plazoEntrega_item"]').val();
    // let detalle_articulo = $(this).find("td").find('input[id="detalle_art"]').val();
    let plazo_entrega = ($(this).find("td").find('.plazoEntrega_item').val() || "").toUpperCase();
    //$(this).find('.plazoEntrega_item').val();
    let detalle_articulo = ($(this).find("td").find('.detalle_art').val() || "").toUpperCase();
    //$(this).find('.detalle_art').val();
    // var detalle_art = $(this).find("td").find('input[id="detalle_art"]').val();
    // **Agregar el producto al array de items**
    cotizacionData.items.push({
      line: line,
      codigo: codigo,
      descripcion: descripcion,
      marca: marca,
      catalogo: catalogo,
      cantidad: cantidad,
      precio_unitario: precio_unitario,
      descuento: descuento,
      monto: monto,
      unidad_medida: unidad_medida,
      plazo_entrega: plazo_entrega,
      marca: marca,
      catalogo: catalogo,
      detalle_articulo: detalle_articulo
    });

    // **Actualizar el total de la cotización**
    // cotizacionData.subtotal_venta += parseFloat(monto);
  });

  // **📌 Calcular el total incluyendo impuestos**
  //cotizacionData.total_venta = cotizacionData.subtotal_venta * 1.18; // Suponiendo 18% de IGV

  console.log("Cotización Generada:", cotizacionData);

  // **📌 Enviar la cotización a SAP**
  $.ajax({
    beforeSend: function () {
      // Mostrar el loader antes de enviar la solicitud
      Swal.fire({
        title: "Migrando a SAP...",
        html: '<div class="spinner"></div>',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta
        showConfirmButton: false // No muestra botón de confirmación
      });
    },
    url: "server_layer_crear_cotizacion.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(cotizacionData),
    success: function (response) {

      console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?
      try {
        let res = typeof response === "string" ? JSON.parse(response) : response;

        Swal.close();

        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Cotización registrada",
            text: `Se ha insertado la cotización con éxito .\nDocEntry: ${res.DocEntry}, Ticket: ${res.ticket}`,
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            location.reload();
          }, 3000);

        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message || "Ocurrió un error desconocido",
          });
        }
      } catch (error) {
        console.error("Error al procesar respuesta JSON:", error);
      }
    },

    error: function (jqXHR, estado, error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
        confirmButtonText: "Cerrar"
      });
      console.error("Error AJAX:", estado, error);
    }


  });
}

function actualizarCostos() {
  var moneda_base = $("#monedaInicial").val();
  var tc = $("#rate").val();
  id = $("#cambioMoneda").val();
  console.log(moneda_base);
  console.log(id);
  if (moneda_base == "USD" && id === "SOL") {
    var monto = 0.0;
    $("#tabla_articulos > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item"]').val()
      );
      nuevo_monto = parseFloat(monto * tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni"]').val()
      );
      nuevo_preciou = parseFloat(preciou * tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(4);

      precio_decuento = parseFloat(
        $(this).find("td").find('input[id="precio_decuento"]').val()
      );
      nuevo_precio_decuento = parseFloat(precio_decuento * tc).toFixed(4);

      monto_final = parseFloat(
        $(this).find("td").find('input[id="monto_final"]').val()
      );
      nuevo_monto_final = parseFloat(monto_final * tc).toFixed(4);

      precio_unitario = parseFloat($(this).find("td").eq(17).html());
      nuevo_precio_unitario = parseFloat(precio_unitario * tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(17).html(nuevo_precio_unitario);
      // $(this).find("td").find('input[id="monto_final"]').val(nuevo_precioigv);

      resumen();
    });
  }
  if (moneda_base == "SOL" && id === "USD") {
    var monto = 0.0;
    $("#tabla_articulos > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item"]').val()
      );
      nuevo_monto = parseFloat(monto / tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni"]').val()
      );
      nuevo_preciou = parseFloat(preciou / tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(4);

      precio_decuento = parseFloat(
        $(this).find("td").find('input[id="precio_decuento"]').val()
      );
      nuevo_precio_decuento = parseFloat(precio_decuento / tc).toFixed(4);
      monto_final = parseFloat(
        $(this).find("td").find('input[id="monto_final"]').val()
      );
      nuevo_monto_final = parseFloat(monto_final / tc).toFixed(4);

      precio_unitario = parseFloat($(this).find("td").eq(17).html());
      nuevo_precio_unitario = parseFloat(precio_unitario / tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(17).html(nuevo_precio_unitario);
      resumen();
    });
  }
  if (moneda_base == "USD" && id === "USD") {
    var monto = 0.0;
    $("#tabla_articulos > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item"]').val()
      );
      nuevo_monto = parseFloat(monto * tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni"]').val()
      );
      nuevo_preciou = parseFloat(preciou * tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(4);
      precio_decuento = parseFloat(
        $(this).find("td").find('input[id="precio_decuento"]').val()
      );
      nuevo_precio_decuento = parseFloat(precio_decuento * tc).toFixed(4);

      monto_final = parseFloat(
        $(this).find("td").find('input[id="monto_final"]').val()
      );
      nuevo_monto_final = parseFloat(monto_final * tc).toFixed(4);
      precio_unitario = parseFloat($(this).find("td").eq(17).html());
      nuevo_precio_unitario = parseFloat(precio_unitario * tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(17).html(nuevo_precio_unitario);
      resumen();
    });
  }
  if (moneda_base == "SOL" && id === "SOL") {
    var monto = 0.0;
    $("#tabla_articulos > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item"]').val()
      );
      nuevo_monto = parseFloat(monto / tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni"]').val()
      );
      nuevo_preciou = parseFloat(preciou / tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(4);
      precio_decuento = parseFloat(
        $(this).find("td").find('input[id="precio_decuento"]').val()
      );
      nuevo_precio_decuento = parseFloat(precio_decuento / tc).toFixed(4);
      monto_final = parseFloat(
        $(this).find("td").find('input[id="monto_final"]').val()
      );
      nuevo_monto_final = parseFloat(monto_final / tc).toFixed(4);

      precio_unitario = parseFloat($(this).find("td").eq(17).html());
      nuevo_precio_unitario = parseFloat(precio_unitario / tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(17).html(nuevo_precio_unitario);
      resumen();
    });
  }
  $("#modalCambios").modal("hide");
}

function actualizar_datos_prod_mod() {
  var multi_descuento = $("#dsctoline_modificar_mod").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === "") {
    var dsctoline = 0;
    var dsctoline2 = 0;
    var dsctoline3 = 0;
  }
  if (data.length == 1) {
    var dsctoline = data[0];
    var dsctoline2 = data[0];
    var dsctoline3 = 0;
  }
  if (data.length == 2) {
    var dsctoline2 = parseFloat(data[0]);
    var dsctoline3 = parseFloat(data[1]);

    var dsctoline = parseFloat(
      dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
    ).toFixed(2);
    //console.log(dsctoline);
  }

  var precio = parseFloat($("#preciou_modificar_mod").val()).toFixed(2);
  var cantidad = parseFloat($("#cantidad_modificar_mod").val()).toFixed(2);
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(2);
  num = $("#num_mod_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[1].innerHTML = $("#codigo_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[2].innerHTML = $("#descripcionitem_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[3].innerHTML = $("#marca_item_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[4].innerHTML = $("#catalogo_item_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[5].innerHTML = $("#unidad_line_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[6].innerHTML = $("#cantidad_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[7].innerHTML = $("#preciou_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[8].innerHTML = $("#dsctoline_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[9].innerHTML = monto;
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[10].innerHTML = $("#plazo_entrega_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[11].innerHTML = dsctoline;
  $("#moda_editar_articulo_mod").modal("hide");

  resumen_mod();
}

function cambiarEstado(i) {
  var btn = document.querySelector('.switch-btn[data-index="' + i + '"]');
  btn.classList.toggle("active");

  var estado = btn.classList.contains("active") ? "Sí" : "No";
  btn.textContent = estado;

  console.log(`${estado} para ítem ${i}`);
}

function lista_vendedores() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_vendedores").html("Recuperando proveedores...");
      },
      url: "pone_vendedores_cotizacion.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_vendedores").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}



function lista_vendedores2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_vendedores2").html("Recuperando proveedores...");
      },
      url: "pone_vendedores_cotizacion.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_vendedores2").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}




function poner_direcion() {
  direccion = $("#pone_cdireccion2 option:selected").text();

  if (direccion != "") {
    $("#cap_dicc").val(direccion);
    $("#comentarios").val(direccion);
  } else {
    alert("no se selecciono nada.");
  }
}

function poner_direcion3() {
  direccion = $("#pone_cdireccion_procesa select option:selected").text();

  if (direccion != '') {
    $("#cap_dicc1_procesa").val(direccion);
  } else {
    alert("no se selecciono nada.");
  }
}

function pone_num_venta() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#num_ticket").html("Buscando...");
      },
      url: "busca_ticket.php",
      type: "POST",
      data: null,
      success: function (x) {
        //document.getElementById("num_pdf").value = x;
        $("#num_ticket").html("Sesión: 1" + " - Cotización # " + x);
      },
      error: function (jqXHR, estado, error) {
        $("#num_ticket").html("Hubo un error: " + estado + " " + error);
      },
    });
  });
}

function cancela_venta() {
  $("#btn_cancela").prop("disabled", true);
  var n = noty({
    text: "¿Deseas cancelar la Cotizacion...?",
    theme: "relax",
    layout: "center",
    type: "information",
    buttons: [
      {
        addClass: "btn btn-primary",
        text: "Si",
        onClick: function ($noty) {
          $noty.close();
          $("#tabla_articulos > tbody:last").children().remove();
          resumen();
          cancela_codigo();
          $("#codigo").focus();
        },
      },
      {
        addClass: "btn btn-danger",
        text: "No",
        onClick: function ($noty) {
          $("#btn_cancela").prop("disabled", false);
          $noty.close();
        },
      },
    ],
  });
}
function cancela_codigo() {
  $("#preciou").val("");
  $("#preciouigv").val("");
  $("#cantidad").val("");
  //$("#preciou").attr("disabled", true);
  $("#preciouigv").attr("disabled", true);
  $("#cantidad").attr("disabled", true);
  $("#codigo").val("");
  $("#codigo").focus();
}

function lista_cotizacion() {
  fec_ini = $("#fec_ini").val();
  fec_fin = $("#fec_fin").val();
  let estado = $("#estado_1").val();
  let cardcode = $("#lista_clients11").val();
  let vendedor = $("#pone_vendedores2 select").val();

  console.log(cardcode);

  setTimeout(() => {
    $.ajax({
      beforeSend: function () {
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
      },
      url: "consulta_listado_cotizacion_reg1.php",
      type: "POST",
      data: { estado: estado, cardcode: cardcode, vendedor: vendedor, fec_ini: fec_ini, fec_fin: fec_fin },
      success: function (x) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#lista_cotizacion").html(x);
          // console.log($("#tabla_cot").length); // Verifica si la tabla se encuentra en el DOM

          var table = $("#tabla_cot_1").DataTable({
            order: [[0, "desc"]],
            pageLength: -1,
            lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
            //ordering: false, // ❌ Deshabilita la opción de ordenar columnas
            language: {
              paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",
              },
              Show: "Mostrar",
              search: "Buscar:",
              sLengthMenu: "Mostrar _MENU_ registros",
              sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            },
          });

          $("#tabla_cot thead tr").clone(true).appendTo("#tabla_cot thead");
          $("#tabla_cot thead tr:eq(0) th").hide();

          $("#tabla_cot thead tr:eq(1) th").each(function (i) {
            if (i == 5 || i == 6) {
              var $th = $(this);
              filter($th, table, i);
            }
          });

          // Botón para mostrar todos
          $("#mostrar-todos").on("click", function () {
            $('#tabla_cot').DataTable().column(5).search("").draw();
          });


        }, 1500); // Retraso de 1.5 segundos
      },
      error: function (jqXHR, estado, error) { },
    });
  }, 500);
}


function modificar_cotizacon() {
  docentry = $("#doc_sap").val();
  tipo = 0;

  array_eliminar = [];
  $("#cpago").prop("disabled", "disabled");
  $("#modal_modificar").modal("show");


  Swal.fire({
    title: "Cargando Datos...",
    html: `
            <div class="spinner"></div>
            <br>Por favor, espera...
        `,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false
  });



  $("#tipo_mod_dup").val(tipo);
  lista_cmoneda_mod();
  lista_cpago_mod();
  consultar_data_cot_cab(docentry);
  setTimeout(() => {
    resumen_mod();
  }, 1500);
  if (tipo === 1) {
    $("#bcliente_modificar").removeClass("disabledTab");
    $("#bcliente_modificar").addClass("activeTab");
    console.log(1);
  } else {
    $("#bcliente_modificar").addClass("disabledTab");
    $("#bcliente_modificar").removeClass("activeTab");
  }
  tipo_cambio_hoy2();

  setTimeout(() => {
    Swal.close();
  }, 1500);

}



function modificar_cotizacon2() {
  docentry = $("#doc_sap").val();
  tipo = 1;

  array_eliminar = [];
  $("#cpago").prop("disabled", "disabled");
  $("#modal_modificar").modal("show");
  $("#tipo_mod_dup").val(tipo);
  lista_cmoneda_mod();
  lista_cpago_mod();
  consultar_data_cot_cab(docentry);
  setTimeout(() => {
    resumen_mod();
  }, 1500);
  if (tipo === 1) {
    $("#bcliente_modificar").removeClass("disabledTab");
    $("#bcliente_modificar").addClass("activeTab");
    console.log(1);
  } else {
    $("#bcliente_modificar").addClass("disabledTab");
    $("#bcliente_modificar").removeClass("activeTab");
  }
  tipo_cambio_hoy2();
}



function modificar_cotizacon2_otro() {
  docentry = $("#docito_otro").val();
  tipo = 1;

  array_eliminar = [];
  $("#cpago_otro").prop("disabled", "disabled");
  $("#modal_modificar_otro").modal("show");
  $("#tipo_mod_dup_otro").val(tipo);
  lista_cmoneda_mod_otro();
  lista_cpago_mod_otro();
  consultar_data_cot_cab_otro(docentry);
  setTimeout(() => {
    resumen_mod_otro();
  }, 1500);
  if (tipo === 1) {
    $("#bcliente_modificar_otro").removeClass("disabledTab");
    $("#bcliente_modificar_otro").addClass("activeTab");
    console.log(1);
  } else {
    $("#bcliente_modificar_otro").addClass("disabledTab");
    $("#bcliente_modificar_otro").removeClass("activeTab");
  }
  tipo_cambio_hoy2_otro();
}






$(document).on("dblclick", "#lista_cotizacion tbody tr", function () {
  var $fila = $(this);

  var filaId = $fila.attr('id');

  console.log("Número de la fila seleccionada: " + filaId);

  // Obtener los datos de las celdas
  var doc = $fila.find("td:nth-child(1)").text();
  var num_cliente = $fila.find("td:nth-child(3)").text();
  var cliente = $fila.find("td:nth-child(4)").text();
  var estado = $fila.find("td:nth-child(9)").text();
  var codestado = $fila.find("td:nth-child(10)").text();
  var do_sap = $fila.find("td:nth-child(11)").text();

  $("#lista_cotizacion tbody tr").removeClass("fila-resaltada"); // Quitar clase de fila resaltada de todas las filas
  $fila.addClass("fila-resaltada");


  $("#modal_id_botones").modal("show");
  // $("#modal_registrar_evidencia").modal("show");
  $("#docito").val(doc);
  $("#doc_sap").val(do_sap);
  $("#num_cliente").val(num_cliente).css("font-size", "12px");
  $("#CLIENTE").val(cliente).css("font-size", "12px");
  $("#ESTADO").val(estado).css("font-size", "12px");
  $("#COD_ESTADO").val(codestado).css("font-size", "12px");

  $("#docito_Modal").val(doc).css("font-size", "12px");
  $("#docentry_Modal").val(doc).css("font-size", "12px");
  $("#docentry_Modal_OC").val(doc).css("font-size", "12px");
  $("#docito_Modal_oc").val(doc).css("font-size", "12px");
  $("#docito_Modal_guia").val(doc).css("font-size", "12px");

  // $("#docentry_Modal").val(doc);


  setTimeout(() => {
    consultar_boton(estado, codestado);
    // consultar_boton2();
  }, 500);
});



function consultar_boton(estado, codestado) {
  if (estado === 'Cotización') {
    if (codestado == 'O') {
      $("#btn_modifica").show();
      $("#btn_pendiente").show();
      $("#btn_cancelar").hide();
    } else {
      $("#btn_modifica").show();
      $("#btn_pendiente").show();
      $("#btn_cancelar").show();
    }
  } else {
    $("#btn_pendiente").hide();
    $("#btn_modifica").hide();
    $("#btn_cancelar").hide();
  }
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
        //  $("#lista_cmoneda_mod").children().prop();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function lista_cmoneda_mod_otro() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cmoneda_mod_otro").html("Recuperando Lista ...");
      },
      url: "lista_moneda_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cmoneda_mod_otro").html(x);
        $(".select2").select2();
        //  $("#lista_cmoneda_mod").children().prop();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

$(document).on("change", "#lista_cmoneda_mod select", function () {
  var id = this.value;
  lista_cmoneda_mod_xd = id;
  lista_cmoneda_mod_xd2 = $("#lista_cmoneda_mod2").val();
  $("#monedaInicial2").val(lista_cmoneda_mod_xd2);
  $("#cambioMoneda2").val(lista_cmoneda_mod_xd);
  $("#rate2").val(parseFloat($("#tc_actual").text()).toFixed(3));
  $("#modalCambios2").modal("show");
  $("#lista_cmoneda_mod2").val(id);
});


function lista_cpago_mod() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cpago_mod").html("Recuperando Lista ...");
      },
      url: "lista_cpago_venta1.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cpago_mod").html(x);
        $(".select2").select2();
        $("#lista_cpago_mod").children().prop("disabled", false);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function lista_cpago_mod_otro() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cpago_mod_otro").html("Recuperando Lista ...");
      },
      url: "lista_cpago_venta1.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cpago_mod_otro").html(x);
        $(".select2").select2();
        $("#lista_cpago_mod_otro").children().prop("disabled", false);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function consultar_data_cot_cab(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion1x1.php",

    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      //console.log(x);
      var data = x;
      var idcl = data.split("|");
      // console.log(idcl);
      var cod_contac = idcl[19];
      $("#docentry_cot").val(docentry);
      $("#idcliente_razon_mod").val(idcl[0]);
      $("#idcliente_credito_mod").val(idcl[1]);
      $("#tipocliente_mod").val(idcl[2]);
      $("#idcliente_ruc_mod").val(idcl[3]);
      $("#lineacredito_mod").val(parseFloat(idcl[4]).toFixed(2));
      $("#salpendiente_mod").val(parseFloat(idcl[5]).toFixed(2));
      $("#lin_disponible_mod").val(parseFloat(idcl[6]).toFixed(2));
      $("#fecha_mod").val(idcl[7]);
      // $("#fecha_mod").val(idcl[7]);
      $("#vendedor").val(idcl[15]);
      $("#vendedor1").val(idcl[14]);
      $("#comentarios1").val(idcl[13]);
      $("#cap_dicc1").val(idcl[12]);

      if (cod_contac === '0') {
        $("#dirigido_coti_mod").val(idcl[16]);
      } else {
        $("#dirigido_coti_mod").val(idcl[16]);
      }

      $("#correo_dirigido_mod").val(idcl[17]);
      $("#telefono_dirigido_mod").val(idcl[18]);

      pone_cpago = idcl[8];
      $("#lista_cpago_mod")
        .children()
        .val(pone_cpago)
        .trigger("change.select2");
      //$("#cpago").val(pone_cpago).trigger("change.select2");
      pone_cmoneda = idcl[9];

      setTimeout(() => {
        $("#lista_cmoneda_mod")
          .children()
          .val(pone_cmoneda)
          .trigger("change.select2");




      }, 1000);

      //$("#cmoneda").val(pone_cmoneda).trigger("change.select2");
      $("#ref_req_mod").val(idcl[10]);
      $("#validez_mod").val(idcl[11]);

      setTimeout(() => {
        $("#lista_cmoneda_mod2").val(pone_cmoneda);
      }, 1000);
      consultar_data_cot_det(docentry);

      var clienz = idcl[0];
      var doc = idcl[20];

      $(".nuticket").html("");
      $(".nuticket").append(
        "Modificacion de Cotizacion | <span class='label label-warning'>#: " +
        docentry + " | # SAP: " + doc +
        "</span> <span class='label label-warning'>" + clienz + "</span>"
      );






      //tipo_cambio_hoy2()
    },
    error: function (jqXHR, estado, error) { },
  });
}


function consultar_data_cot_cab_otro(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion1x1_otro.php",
    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      //console.log(x);
      var data = x;
      var idcl = data.split("|");
      // console.log(idcl);
      var cod_contac = idcl[19];
      $("#docentry_cot_otro").val(docentry);
      $("#idcliente_razon_mod_otro").val(idcl[0]);
      $("#idcliente_credito_mod_otro").val(idcl[1]);
      $("#tipocliente_mod_otro").val(idcl[2]);
      $("#idcliente_ruc_mod_otro").val(idcl[3]);
      $("#lineacredito_mod_otro").val(parseFloat(idcl[4]).toFixed(2));
      $("#salpendiente_mod_otro").val(parseFloat(idcl[5]).toFixed(2));
      $("#lin_disponible_mod_otro").val(parseFloat(idcl[6]).toFixed(2));
      $("#fecha_mod_otro").val(idcl[7]);
      // $("#fecha_mod").val(idcl[7]);
      $("#vendedor_otro").val(idcl[15]);
      $("#vendedor1_otro").val(idcl[14]);
      $("#comentarios1_otro").val(idcl[13]);
      $("#cap_dicc1_otro").val(idcl[12]);

      if (cod_contac === '0') {
        $("#dirigido_coti_mod_otro").val(idcl[16]);
      } else {
        $("#dirigido_coti_mod_otro").val(idcl[16]);
      }

      $("#correo_dirigido_mod_otro").val(idcl[17]);
      $("#telefono_dirigido_mod_otro").val(idcl[18]);

      pone_cpago = idcl[8];
      $("#lista_cpago_mod_otro")
        .children()
        .val(pone_cpago)
        .trigger("change.select2");
      //$("#cpago").val(pone_cpago).trigger("change.select2");
      pone_cmoneda = idcl[9];

      setTimeout(() => {
        $("#lista_cmoneda_mod_otro")
          .children()
          .val(pone_cmoneda)
          .trigger("change.select2");
      }, 1000);

      //$("#cmoneda").val(pone_cmoneda).trigger("change.select2");
      $("#ref_req_mod_otro").val(idcl[10]);
      $("#validez_mod_otro").val(idcl[11]);

      setTimeout(() => {
        $("#lista_cmoneda_mod2_otro").val(pone_cmoneda);
      }, 1000);
      consultar_data_cot_det_otro(docentry);

      var clienz = idcl[0];
      var doc = idcl[20];

      $(".nuticket_otro").html("");
      $(".nuticket_otro").append(
        "Modificacion de Cotizacion | <span class='label label-warning'>#: " +
        docentry + " | # SAP: " + doc +
        "</span> <span class='label label-warning'>" + clienz + "</span>"
      );

      //tipo_cambio_hoy2()
    },
    error: function (jqXHR, estado, error) { },
  });
}


function consultar_data_cot_det(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion_det4.php",

    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      $("#data_articulo_det").html(x);
      // $("#tabla_art_ped").DataTable({
      //   order: [[0, "asc"]],
      //   autoWidth: false  // Desactiva el ajuste automático de ancho para permitir 100%

      // });
      new DataTable('#tabla_art_ped', {
        columnDefs: [
          {
            className: 'reorder',
            render: () => '<button class="icon-button btn-success" id="iconButton" > ≡ </button>',
            targets: 0
          },
          { orderable: false, targets: '_all' }
        ],
        order: [1, 'asc'],
        autoWidth: false,// Desactiva el ajuste automático de ancho para permitir 100%

        rowReorder: {
          dataSrc: 1,
        },
        pageLength: -1,
        lengthMenu: [
          [10, 20, 60, -1],
          [10, 20, 60, "Todos"],
        ],
      });
      // new DataTable('#tabla_art_ped', { 
      //   autoWidth: false,
      //   columnDefs: [
      //     {
      //       className: 'reorder',  // Clase opcional para estilizar la columna de reordenar
      //       render: () => '<button class="icon-button btn-success" id="iconButton">≡</button>',
      //       targets: 0  // Aplica la columna de reordenar en la primera columna (índice 0)
      //     },
      //     { orderable: false, targets: '_all' },  // Desactiva el ordenamiento para todas las demás columnas
      //     { visible: false, targets: [12, 14, 15, 16, 17] }  // Oculta columnas específicas
      //   ],
      //   order: [[1, 'asc']],  // Ordena por la segunda columna (índice 1)
      //   rowReorder: {
      //     dataSrc: 1,  // Usa la segunda columna para la fuente de datos para el reordenamiento
      //   },
      //   pageLength: -1,
      //   lengthMenu: [
      //     [10, 20, 60, -1],
      //     [10, 20, 60, "Todos"],
      //   ],
      // });


      /*$('#tabla_art_ped > tbody > tr').each(function () {
        $(this).find('td').eq(0).html($i)
        $i++;
      });*/

      resumen_mod();


    },
    error: function (jqXHR, estado, error) { },
  });
}


function consultar_data_cot_det_otro(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion_det4_otro.php",

    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      $("#data_articulo_det_otro").html(x);
      // $("#tabla_art_ped").DataTable({
      //   order: [[0, "asc"]],
      //   autoWidth: false  // Desactiva el ajuste automático de ancho para permitir 100%

      // });
      new DataTable('#tabla_art_ped_otro', {
        columnDefs: [
          {
            className: 'reorder',
            render: () => '<button class="icon-button btn-success" id="iconButton" > ≡ </button>',
            targets: 0
          },
          { orderable: false, targets: '_all' }
        ],
        order: [1, 'asc'],
        autoWidth: false,// Desactiva el ajuste automático de ancho para permitir 100%

        rowReorder: {
          dataSrc: 1,
        },
        pageLength: -1,
        lengthMenu: [
          [10, 20, 60, -1],
          [10, 20, 60, "Todos"],
        ],
      });

      resumen_mod_otro();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function editar_producto_mod(num) {
  num = num - 1;
  //console.log(num);
  $("#moda_editar_articulo_mod").modal("show");
  cod_art = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[1].innerHTML;
  descripcion_art = $(
    $("#tabla_articulos_mod").find("tbody > tr")[num]
  ).children("td")[2].innerHTML;
  fecha_entrega = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[11].innerHTML;
  cantidad = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[6].innerHTML;
  unidad_medida = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[5].innerHTML;
  preciou = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[7].innerHTML;
  monto = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children("td")[9]
    .innerHTML;
  dscto_lin = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[8].innerHTML;
  catalogo = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[4].innerHTML;
  marca = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children("td")[3]
    .innerHTML;
  plazo_entrega = $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[10].innerHTML;

  $("#codigo_modificar_mod").val(cod_art);
  $("#descripcionitem_modificar_mod").val(descripcion_art);
  $("#fecha_prod_modificar_mod").val(fecha_entrega);
  $("#cantidad_modificar_mod").val(cantidad);
  $("#unidad_line_modificar_mod").val(unidad_medida);
  $("#preciou_modificar_mod").val(preciou);
  $("#preciou_ant_modificar_mod").val(preciou);
  $("#preciouigv_modificar_mod").val(parseFloat(monto).toFixed(2));
  $("#dsctoline_modificar_mod").val(dscto_lin);
  $("#catalogo_item_modificar_mod").val(catalogo);
  $("#marca_item_modificar_mod").val(marca);
  $("#plazo_entrega_modificar_mod").val(plazo_entrega);
  $("#num_mod_mod").val(num);
}

function actualizar_datos_prod_mod() {
  var multi_descuento = $("#dsctoline_modificar_mod").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === "") {
    var dsctoline = 0;
    var dsctoline2 = 0;
    var dsctoline3 = 0;
  }
  if (data.length == 1) {
    var dsctoline = data[0];
    var dsctoline2 = data[0];
    var dsctoline3 = 0;
  }
  if (data.length == 2) {
    var dsctoline2 = parseFloat(data[0]);
    var dsctoline3 = parseFloat(data[1]);

    var dsctoline = parseFloat(
      dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
    ).toFixed(2);
    //console.log(dsctoline);
  }

  var precio = parseFloat($("#preciou_modificar_mod").val()).toFixed(2);
  var cantidad = parseFloat($("#cantidad_modificar_mod").val()).toFixed(2);
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(2);
  num = $("#num_mod_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[1].innerHTML = $("#codigo_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[2].innerHTML = $("#descripcionitem_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[3].innerHTML = $("#marca_item_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[4].innerHTML = $("#catalogo_item_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[5].innerHTML = $("#unidad_line_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[6].innerHTML = $("#cantidad_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[7].innerHTML = $("#preciou_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[8].innerHTML = $("#dsctoline_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[9].innerHTML = monto;
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[10].innerHTML = $("#plazo_entrega_modificar_mod").val();
  $($("#tabla_articulos_mod").find("tbody > tr")[num]).children(
    "td"
  )[11].innerHTML = dsctoline;
  $("#moda_editar_articulo_mod").modal("hide");

  resumen_mod();
}

function resumen_mod() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      const cantidad = parseFloat($(this).find('input[id="cantidad_item2"]').val()) || 0;
      const montoItem = parseFloat($(this).find('input[id="monto_item2"]').val()) || 0;
      articulos += cantidad;
      monto += montoItem;
      //console.log(monto);
    });

    cmoneda = $("#lista_cmoneda_mod").children().val();
    console.log(monto);

    var el = document.getElementById("totales_mod");
    let num = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto);
    el.innerText = num;

    //alert(el)
    //$("#totales").html(monto.toFixed(2));
    montoigv = monto * 0.18;

    monto_total = monto + montoigv;
    //$("#totalesigv").html(montoigv.toFixed(2));
    var el = document.getElementById("totalesigv_mod");
    let num2 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(montoigv);
    el.innerText = num2;

    var el = document.getElementById("total_venta_mod");
    let num3 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto_total);
    el.innerText = num3;

    var el = document.getElementById("total_articulos_mod");
    el.innerText = articulos.toFixed(2);
    if (articulos > 0) {
      $("#btn-procesa").prop("disabled", false);
      $("#btn-cancela").prop("disabled", false);
      $("#btn-cancel").prop("disabled", false);
    } else {
      $("#btn-procesa").prop("disabled", true);
      $("#btn-cancela").prop("disabled", true);
      //$("#btn-cancel").prop('disabled', true);
    }
  });
}


function resumen_mod_otro() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    $("#tabla_art_ped_otro > tbody > tr").each(function () {
      const cantidad = parseFloat($(this).find('input[id="cantidad_item2"]').val()) || 0;
      const montoItem = parseFloat($(this).find('input[id="monto_item2"]').val()) || 0;
      articulos += cantidad;
      monto += montoItem;
      //console.log(monto);
    });

    cmoneda = $("#lista_cmoneda_mod_otro").children().val();
    console.log(monto);

    var el = document.getElementById("totales_mod_otro");
    let num = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto);
    el.innerText = num;

    //alert(el)
    //$("#totales").html(monto.toFixed(2));
    montoigv = monto * 0.18;

    monto_total = monto + montoigv;
    //$("#totalesigv").html(montoigv.toFixed(2));
    var el = document.getElementById("totalesigv_mod_otro");
    let num2 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(montoigv);
    el.innerText = num2;

    var el = document.getElementById("total_venta_mod_otro");
    let num3 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto_total);
    el.innerText = num3;

    var el = document.getElementById("total_articulos_mod_otro");
    el.innerText = articulos.toFixed(2);
    if (articulos > 0) {
      $("#btn-procesa").prop("disabled", false);
      $("#btn-cancela").prop("disabled", false);
      $("#btn-cancel").prop("disabled", false);
    } else {
      $("#btn-procesa").prop("disabled", true);
      $("#btn-cancela").prop("disabled", true);
      //$("#btn-cancel").prop('disabled', true);
    }
  });
}

function cerrar_cotizacion() {
  docentry = $("#docito").val();

  swal({
    title: "Cerrar Cotizacion?",
    text: "Desea Cerrar la Cotizacion!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        beforeSend: function () { },
        url: "eliminar_cotizacion_cre.php",
        type: "POST",
        data: { docentry: docentry },
      });

      swal("Se ha cerrado la cotizacion", {
        icon: "success",
        buttons: false,
        closeModal: true,
        timer: 2000,
      });
      lista_cotizacion();
    } else {
      swal("No se ha cerrado");
    }
  });
}


function genera_pdf_cotizacion() {
  docentry = $("#doc_sap").val();
  estado = $("#ESTADO").val();
  fec_ini = $("#fec_ini").val();
  fec_fin = $("#fec_fin").val();
  // Declara la variable ruta aquí para que esté disponible en todo el ámbito de la función
  var ruta = "";
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
      },
      url: "contador_lineascoty.php",
      type: "POST",
      data: { docentry: docentry },
      success: function (x) {
        doc = parseFloat(x.trim())
        console.log(doc);

        if (doc <= 18) {
          // var ruta = "pdf_cotizacion3_v2.php?docentry=" + docentry + "&IDestado=" + estado + "&fec_ini=" + fec_ini + "&fec_fin=" + fec_fin;
          // var ruta = "pdf_cotizacion3_v2_pru.php?docentry=" + docentry + "&IDestado=" + estado + "&fec_ini=" + fec_ini + "&fec_fin=" + fec_fin;
          var ruta = "pdf_cotizacion3.php?docentry=" + docentry + "&IDestado=" + estado + "&fec_ini=" + fec_ini + "&fec_fin=" + fec_fin;

          $('#modal_data_pdf').modal('show');
          $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', ruta);
          }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', '');
          });

          // $("#navegador").off('click').on('click', function () {
          //   window.open(ruta, '_blank');
          // });
          $("#navegador")
            .off("click")
            .on("click", function () {
              var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

              window.open(contenedorUrl, "_blank");
            });

          $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
          })

        }
        else {
          var ruta = "pdf_cotizacion4_v2.php?docentry=" + docentry + "&IDestado=" + estado + "&fec_ini=" + fec_ini + "&fec_fin=" + fec_fin;

          $('#modal_data_pdf').modal('show');
          $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', ruta);
          }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', '');
          });

          // $("#navegador").off('click').on('click', function () {
          //   window.open(ruta, '_blank');
          // });
          $("#navegador")
            .off("click")
            .on("click", function () {
              var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

              window.open(contenedorUrl, "_blank");
            });

          $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
          })
        }



      },
      error: function (jqXHR, estado, error) { },
    });
  });



  // javascript: window.open("pdf_cotizacion1.php?docentry=" + docentry + "&IDestado=" + estado + "");   //principal pdf 
  //javascript: window.open("pdf_cotizacionprueba.php?docentry=" + docentry +"&IDestado="+estado+"");

  // var ruta = "pdf_cotizacion4.php?docentry=" + docentry + "&IDestado=" + estado +"&fec_ini=" + fec_ini + "&fec_fin=" + fec_fin;

  // $('#modal_data_pdf').modal('show');
  // $('#modal_data_pdf').on('shown.bs.modal', function(){
  //   $(this).find('iframe').attr('src', ruta);
  // }).on('hidden.bs.modal', function(){
  //   $(this).find('iframe').attr('src', '');
  // });

  // $("#navegador").off('click').on('click', function(){
  //   window.open(ruta, '_blank');
  // });

  // $("#imprimir").off('click').on('click', function(){
  //   $('#modal_data_pdf').find('iframe')[0].contentWindow.print();  
  // })
}
function genera_Excel_cotizacion() {
  docentry = $("#docito").val();
  estado = $("#ESTADO").val();

  javascript: window.open("excel_cotizacion_venta.php?docentry=" + docentry + "" + "&estado=" + estado + "");
}

function procesa_modificacion() {
  if ($("#tipo_mod_dup").val() === "0") {
    actualizar_data_articulo();
    eliminar_lineas_producto();
  } else if ($("#tipo_mod_dup").val() === "1") {
    duplica_data_articulo();
  } else if ($("#tipo_mod_dup").val() === "2") {
    actualizar_data_articulo_aprob();
  }
  lista_cotizacion();

}

function procesa_modificacion_otro() {
  if ($("#tipo_mod_dup_otro").val() === "0") {
    actualizar_data_articulo();
    eliminar_lineas_producto();
  } else if ($("#tipo_mod_dup_otro").val() === "1") {
    duplica_data_articulo_otro();
  } else if ($("#tipo_mod_dup_otro").val() === "2") {
    actualizar_data_articulo_aprob();
  }
  lista_cotizacion();

}



function exportar_excel() {
  //vendedor = $("#selec_vendedorcito select").val();
  cliente = $("#lista_clients select").val();
  estado = $("#estado_1").val();

  fecha_inicio = $("#fec_ini").val();
  if (fecha_inicio === "") {
    fecha_inicio = "01-01-2024";
  } else {
    fecha_inicio = $("#fec_ini").val();
  }
  fechaf = $("#fec_fin").val();

  javascript: window.open(
    "reporte_excel_cotizacionVenta.php?&fechai=" +
    fecha_inicio +
    "&fechaf=" +
    fechaf +
    "&estado=" +
    estado +
    "&cliente=" +
    cliente +
    ""
  );
}





function actualizar_data_articulo_aprob() {
  docentry = $("#docentry_cot").val();
  credi = "1";
  fath = "";
  tipo_venta = "";
  clients = $("#idcliente_credito_mod").val();
  clientename = quitarAcentos($("#idcliente_razon_mod").val());
  comentarios = "";
  transportista = "";
  idcliente_parent = ""; //cliente vinculado;
  cpago = $("#lista_cpago_mod option:selected").val();
  moneda = $("#lista_cmoneda_mod option:selected").val();
  slpCode = "1";
  //cpago=document.getElementById("#pone_cpago").selectedIndex;
  fentrega = "2023-01-01";
  direntrega = "";
  validez = $("#validez_mod").val();
  n_ticket = docentry;
  idlp = ""; //lista de precios;
  U_IMOB_ESTADO = "Pendiente";
  U_IMOB_OBSERVACION = "";
  U_IMOB_OV = "";
  U_IMOB_FECOV = "";
  ref_req = $("#ref_req_mod").val();
  cod_vendedor = $("#vendedor1").val();
  direccion = $("#cap_dicc1").val();
  contacto_mod = $("#dirigido_coti_mod").val();
  correo_mod = $("#correo_dirigido_mod").val();
  telefeno_mod = $("#telefono_dirigido_mod").val();
  cpago = $("#cpago").val();
  modificado = "1";
  var subtotal_venta = 0.0;
  var total_venta = 0.0;

  $("#tabla_art_ped > tbody > tr").each(function () {
    // subtotal_venta += parseFloat($(this).find('td').eq(9).html());
    subtotal_venta += parseFloat(
      $(this).find("td").find('input[id="monto_item2"]').val()
    );
  });

  dscto = ""; //descuento total;

  total_venta = subtotal_venta + subtotal_venta * 0.18;

  $.ajax({
    beforeSend: function () { },
    url: "actualiza_cotizacion_cab.php",
    type: "POST",
    data:
      "docentry=" +
      docentry +
      "&ref_req_mod=" +
      ref_req +
      "&validez_mod=" +
      validez +
      "&cod_vendedor=" +
      cod_vendedor +
      "&comentarios=" +
      comentarios +
      "&direccion=" +
      direccion +
      "&subtotal_venta=" +
      subtotal_venta +
      "&total_venta=" +
      total_venta +
      "&moneda=" +
      moneda +
      "&contacto_mod=" +
      contacto_mod +
      "&correo_mod=" +
      correo_mod +
      "&telefeno_mod=" +
      telefeno_mod +
      "&cpago=" +
      cpago,
    success: function (x) {
      var n = noty({
        text: "Procesando venta...  articulo actual: " + docentry,
        theme: "relax",
        layout: "topLeft",
        type: "success",
        timeout: 2000,
      });
      global = parseInt(x);
      console.log(global);
      if (global == 0) {
        alertify.error("No Inserto");
      } else {
        $("#tabla_art_ped > tbody > tr").each(function () {

          var n_orden = $(this).find("td").eq(1).html();
          var line = $(this).find("td").eq(2).html();
          var cod = quitarAcentos($(this).find("td").eq(3).html());
          var descripcion_art = quitarAcentos($(this).find("td").eq(4).html());
          var marca = quitarAcentos($(this).find("td").eq(5).html());
          var catalogo = quitarAcentos($(this).find("td").eq(6).html());
          var unidad_medida = $(this).find("td").eq(7).html();
          var can = $(this).find("td").find('input[id="cantidad_item"]').val();
          var preciou = $(this).find("td").find('input[id="precio_uni"]').val();
          var dscto_lin = $(this)
            .find("td")
            .find('input[id="descuento_item"]')
            .val();
          var monto = $(this).find("td").find('input[id="monto_item"]').val();
          var plazo_entrega = quitarAcentos(
            $(this).find("td").find('input[id="plazoEntrega_item"]').val()
          );
          var tipo_venta = "";
          var fath = "";
          var modificado = "1";
          $.ajax({
            beforeSend: function () { },
            url: "actualiza_cotizacion_det.php",
            type: "POST",
            data:
              "&codigo=" +
              cod +
              "&descripcion_art=" +
              descripcion_art +
              "&cantidad=" +
              can +
              "&preciou=" +
              preciou +
              "&dscto_lin=" +
              dscto_lin +
              "&total_linea=" +
              monto +
              "&tipo_vta=" +
              tipo_venta +
              "&father=" +
              fath +
              "&docentry=" +
              docentry +
              "&line=" +
              line +
              "&unidad_medida=" +
              unidad_medida +
              "&plazo_entrega=" +
              plazo_entrega +
              "&marca=" +
              marca +
              "&catalogo=" +
              catalogo +
              "&modificado=" +
              modificado +
              "&multi_descuento=" +
              multi_descuento + "&n_orden=" +
              n_orden,
            success: function (data) {
              var n = noty({
                text: "Procesando venta...  articulo actual: " + cod,
                theme: "relax",
                layout: "topLeft",
                type: "success",
                timeout: 2000,
              });

              lista_cotizacion();
            },
            error: function (jqXHR, estado, error) {
              $("#errores").html("Error... " + estado + "  " + error);
            },
          });
        });
        $("#modal_modificar").modal("hide");
        lista_cotizacion();
      }
    },
  });
}

function duplica_data_articulo() {
  var n_tic;
  $.ajax({
    beforeSend: function () {
      $("#nro_ticket").html("Buscando...");
    },
    async: false,
    url: "busca_ticket_cotizacion.php",
    type: "POST",
    data: "caja=" + $("#ncaja").val(),
    success: function (x) {
      $("#nro_ticket").html(x);

      n_tic = parseInt(x.trim());
      //              alert(n_tic);
      //              return
      //return n_tic;
    },
    error: function (jqXHR, estado, error) {
      $("#nro_ticket").html("Hubo un error: " + estado + " " + error);
    },
  });
  console.log(n_tic);

  setTimeout(() => {
    ntic = parseInt(n_tic);
    credi = "1";
    fath = "";
    tipo_venta = "";
    clients = $("#idcliente_credito_mod").val();
    clientename = quitarAcentos($("#idcliente_razon_mod").val());
    comentarios = "";
    transportista = "";
    idcliente_parent = ""; //cliente vinculado;
    cpago = $("#lista_cpago_mod option:selected").val();
    cmoneda = $("#lista_cmoneda_mod option:selected").val();
    slpCode = $("#vendedor1").val();
    //cpago=document.getElementById("#pone_cpago").selectedIndex;
    fentrega = "2023-01-01";
    direntrega = "";
    validez = $("#validez_mod").val();
    contacto_mod = $("#dirigido_coti_mod").val();
    correo_mod = $("#correo_dirigido_mod").val();
    telefeno_mod = $("#telefono_dirigido_mod").val();
    n_ticket = n_tic;
    idlp = ""; //lista de precios;
    U_IMOB_ESTADO = "Pendiente";
    U_IMOB_OBSERVACION = "";
    U_IMOB_OV = "";
    U_IMOB_FECOV = "";
    ref_req = $("#ref_req_mod").val();
    band = true;
    modificado = "0";
    var subtotal_venta = 0.0;
    var total_venta = 0.0;

    $("#tabla_art_ped > tbody > tr").each(function () {
      subtotal_venta += parseFloat(
        $(this).find("td").find('input[id="monto_item2"]').val()
      );
    });

    dscto = ""; //descuento total;

    total_venta = subtotal_venta + subtotal_venta * 0.18;
    $("#tabla_art_ped > tbody > tr").each(function () {
      // var n_orden = $(this).find("td").eq(1).html();

      linea = $(this).find("td").eq(0).html();
      lina2 = linea;
      var can = $(this).find("td").find('input[id="cantidad_item2"]').val();
      var preciou = $(this).find("td").find('input[id="precio_uni2"]').val();
      let $precioInput = $(this).find('input[id="precio_uni2"]');
      let $montoInput = $(this).find('input[id="monto_item2"]');
      var dscto_lin = $(this)
        .find("td")
        .find('input[id="descuento_item2"]')
        .val();
      var monto = $(this).find("td").find('input[id="monto_item2"]').val();

      if (can === "" || can <= 0) {
        alertify.error("Linea: " + lina2 + " " + "Falta Cantidad Invalida");
        $(this).find("td").eq(6).css("background-color", "#F67280");
        band = false;
      } else {
        $(this).find("td").eq(6).css("background-color", "white");
      }
      // ❌ Validación solo si el campo NO está deshabilitado
      if (!$precioInput.prop("disabled") && preciou <= 0) {
        $precioInput.css("border", "2px solid red");
        error = true;
      } else {
        $precioInput.css("border", "");
      }

      if (!$montoInput.prop("disabled") && monto <= 0) {
        $montoInput.css("border", "2px solid red");
        error = true;
      } else {
        $montoInput.css("border", "");
      }
      if (dscto_lin.indexOf("+") !== -1) {
        alertify.error("Linea: " + lina2 + " " + "Falta Calcular Descuento");
        $(this).find("td").eq(9).css("background-color", "#F67280");
        band = false;
      } else {
        $(this).find("td").eq(9).css("background-color", "white");
      }
    });
    //band = false;
    if (band === true) {


      let cotizacionData = {
        clienteid: clients,
        credito: credi,
        comentarios: quitarAcentos(comentarios),
        idcliente_parent: "",
        cpago: cpago,
        cmoneda: cmoneda,
        fentrega: fentrega,
        fdoc: fentrega,
        direntrega: direntrega,
        validez: validez,
        dirigido_coti: contacto_mod,
        dirigido_coti_cod: '',
        correo_dirigido: correo_mod,
        contacto: contacto_mod,
        telefono_dirigido: telefeno_mod,
        cod_dire_entrega: '',
        orden_compra_coti: '',
        proyecto: '',
        flete_cargo: '',
        transportista: '',
        idlp: "1",
        caja: $("#ncaja").val(),
        U_IMOB_ESTADO: U_IMOB_ESTADO,
        father: "",
        U_IMOB_OBSERVACION: "",
        tipo_venta: "",
        U_IMOB_OV: "",
        U_IMOB_FECOV: "",
        ref_req: ref_req,
        modificado: "0",
        clientename: quitarAcentos(clientename),
        slpCode: slpCode,
        dscto: "", // Descuento total
        subtotal_venta: parseFloat(subtotal_venta).toFixed(2),
        total_venta: parseFloat(total_venta).toFixed(2),
        TIPO_COTIZACION: '01',
        n_tic: n_tic,
        tipo_vta: "",
        items: []
      };
      // **📌 Recorrer los artículos y agregarlos al JSON**
      $("#tabla_art_ped > tbody > tr").each(function () {
        let line = parseInt($(this).find("td").eq(2).html());
        let codigo = quitarAcentos($(this).find("td").eq(3).text());
        let descripcion, marca, catalogo;

        if (codigo === "21004146" || codigo === "21004147") {
          descripcion = $(this).find("td").find('input[id="descripcion_mod2"]').val() || "-";
          marca = $(this).find("td").find('input[id="marca_mod2"]').val() || "-";
          catalogo = $(this).find("td").find('input[id="catalogo_mod2"]').val() || "-";
        } else {
          descripcion = $(this).find("td").eq(4).find("input").length
            ? $(this).find("td").eq(4).find("input").val()
            : quitarAcentos($(this).find("td").eq(4).text().trim());

          marca = $(this).find("td").eq(5).find("input").length
            ? $(this).find("td").eq(5).find("input").val()
            : quitarAcentos($(this).find("td").eq(5).text().trim());

          catalogo = $(this).find("td").eq(6).find("input").length
            ? $(this).find("td").eq(6).find("input").val()
            : quitarAcentos($(this).find("td").eq(6).text().trim());
        }
        let $precioInput = $(this).find('input[id="precio_uni2"]');
        let unidad_medida = $(this).find("td").eq(7).html();
        let cantidad = $(this).find("td").find('input[id="cantidad_item2"]').val();
        let precio_unitario = $(this).find("td").find('input[id="precio_uni2"]').val();
        let descuento = $(this).find("td").find('input[id="descuento_item2"]').val();
        let monto = $(this).find("td").find('input[id="monto_item2"]').val();
        let plazo_entrega = quitarAcentos($(this).find("td").find('input[id="plazoEntrega_item2"]').val());
        let detalle_articulo = $(this).find("td").find('input[id="detalle_art2"]').val();
        // var detalle_art = $(this).find("td").find('input[id="detalle_art"]').val();
        // **Agregar el producto al array de items**
        if (parseFloat(precio_unitario) > 0.0000) {
          cotizacionData.items.push({
            line: line,
            codigo: codigo,
            descripcion: descripcion,
            marca: marca,
            catalogo: catalogo,
            cantidad: cantidad,
            precio_unitario: precio_unitario,
            descuento: descuento,
            monto: monto,
            unidad_medida: unidad_medida,
            plazo_entrega: plazo_entrega,
            marca: marca,
            catalogo: catalogo,
            detalle_articulo: detalle_articulo
          });
        }


        // **Actualizar el total de la cotización**
        // cotizacionData.subtotal_venta += parseFloat(monto);
      });
      console.log("Cotización Generada:", cotizacionData);
      $.ajax({
        beforeSend: function () {
          // Mostrar el loader antes de enviar la solicitud
          Swal.fire({
            title: "Migrando a SAP...",
            html: '<div class="spinner"></div>',
            allowOutsideClick: false, // Evita que el usuario cierre la alerta
            showConfirmButton: false // No muestra botón de confirmación
          });
        },
        url: "server_layer_duplicar_cotizacion.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(cotizacionData),
        success: function (response) {
          try {
            let res = typeof response === "string" ? JSON.parse(response) : response;

            if (res.success) {
              Swal.fire({
                icon: "success",
                title: "Cotización registrada",
                text: `Se ha insertado la cotización con éxito. DocEntry: ${res.message}`,
                timer: 2000,
                showConfirmButton: false
              });
              setTimeout(() => {
                location.reload(); // 🔄 Recargar la página automáticamente después de 2 segundos

              }, 3000);

            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res.message || "Ocurrió un error desconocido",
              });
            }
          } catch (error) {
            console.error("Error al procesar respuesta JSON:", error);
          }
        },

        error: function (jqXHR, estado, error) {
          Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
            confirmButtonText: "Cerrar"
          });
          console.error("Error AJAX:", estado, error);
        }
      });


      // $.ajax({
      //   beforeSend: function () { },
      //   url: "procesa_cotizacion.php",
      //   type: "POST",
      //   data:
      //     "clienteid=" +
      //     clients +
      //     "&credito=" +
      //     credi +
      //     "&comentarios=" +
      //     comentarios +
      //     "&idcliente_parent=" +
      //     idcliente_parent +
      //     "&cpago=" +
      //     cpago +
      //     "&cmoneda=" +
      //     cmoneda +
      //     "&fentrega=" +
      //     fentrega +
      //     "&direntrega=" +
      //     direntrega +
      //     "&dscto=" +
      //     dscto +
      //     "&subtotal_venta=" +
      //     subtotal_venta +
      //     "&total_venta=" +
      //     total_venta +
      //     "&total_linea=" +
      //     subtotal_venta +
      //     "&n_ticket=" +
      //     ntic +
      //     "&father=" +
      //     fath +
      //     "&tipo_vta=" +
      //     tipo_venta +
      //     "&transportista=" +
      //     transportista +
      //     "&idlp=" +
      //     idlp +
      //     "&caja=" +
      //     $("#ncaja").val() +
      //     "&U_IMOB_ESTADO=" +
      //     U_IMOB_ESTADO +
      //     "&U_IMOB_OBSERVACION=" +
      //     U_IMOB_OBSERVACION +
      //     "&U_IMOB_OV=" +
      //     U_IMOB_OV +
      //     "&U_IMOB_FECOV=" +
      //     U_IMOB_FECOV +
      //     "&clientename=" +
      //     clientename +
      //     "&slpCode=" +
      //     slpCode +
      //     "&ref_req=" +
      //     ref_req +
      //     "&validez=" +
      //     validez +
      //     "&modificado=" +
      //     modificado +
      //     "&modificado=" +
      //     modificado +
      //     "&dirigido_coti=" +
      //     contacto_mod +
      //     "&correo_dirigido=" +
      //     correo_mod +
      //     "&telefono_dirigido=" +
      //     telefeno_mod,
      //   success: function (x) {
      //     var n = noty({
      //       text: "Procesando venta...  articulo actual: " + ntic,
      //       theme: "relax",
      //       layout: "topLeft",
      //       type: "success",
      //       timeout: 2000,
      //     });
      //     global = parseInt(x);
      //     console.log(global);
      //     if (global == 0) {
      //       alertify.error("No Inserto");
      //     } else {
      //       $("#tabla_art_ped > tbody > tr").each(function () {
      //         var n_orden = $(this).find("td").eq(1).html();

      //         linea = $(this).find("td").eq(2).html();
      //         var line = parseInt(linea);
      //         var cod = quitarAcentos($(this).find("td").eq(3).html());
      //         if (cod == "21004147" || cod == "21004146") {
      //           var descripcion_art = quitarAcentos(
      //             $(this).find("td").find('input[id="descripcion_mod2"]').val()
      //           );
      //           var marca = quitarAcentos(
      //             $(this).find("td").find('input[id="marca_mod2"]').val()
      //           );
      //           var catalogo = quitarAcentos(
      //             $(this).find("td").find('input[id="catalogo_mod2"]').val()
      //           );
      //         } else {
      //           // var descripcion_art = quitarAcentos(
      //           //   $(this).find("td").eq(4).html()
      //           // );
      //           var descripcion_art = '-';
      //           var marca = quitarAcentos($(this).find("td").eq(5).html());
      //           var catalogo = quitarAcentos($(this).find("td").eq(6).html());
      //         }
      //         var unidad_medida = $(this).find("td").eq(7).html();
      //         var can = $(this)
      //           .find("td")
      //           .find('input[id="cantidad_item2"]')
      //           .val();
      //         var preciou = $(this)
      //           .find("td")
      //           .find('input[id="precio_uni2"]')
      //           .val();
      //         var dscto_lin = $(this)
      //           .find("td")
      //           .find('input[id="descuento_item2"]')
      //           .val();
      //         var monto = $(this)
      //           .find("td")
      //           .find('input[id="monto_item2"]')
      //           .val();
      //         var plazo_entrega = quitarAcentos(
      //           $(this).find("td").find('input[id="plazoEntrega_item2"]').val()
      //         );
      //         var fecha_prod = $(this).find("td").eq(11).html();
      //         var tipo_venta = "";
      //         var fath = "";
      //         var modificado = "0";
      //         var detalle_art = quitarAcentos(
      //           $(this).find("td").find('input[id="detalle_art2"]').val()
      //         );
      //         $.ajax({
      //           beforeSend: function () { },
      //           url: "procesa_cotizacion_det.php",
      //           type: "POST",
      //           data:
      //             "&codigo=" +
      //             cod +
      //             "&descripcion_art=" +
      //             descripcion_art +
      //             "&cantidad=" +
      //             can +
      //             "&preciou=" +
      //             preciou +
      //             "&dscto_lin=" +
      //             dscto_lin +
      //             "&total_linea=" +
      //             monto +
      //             "&tipo_vta=" +
      //             tipo_venta +
      //             "&father=" +
      //             fath +
      //             "&n_ticket=" +
      //             global +
      //             "&line=" +
      //             line +
      //             "&unidad_medida=" +
      //             unidad_medida +
      //             "&fecha_prod=" +
      //             fecha_prod +
      //             "&marca=" +
      //             marca +
      //             "&catalogo=" +
      //             catalogo +
      //             "&plazo_entrega=" +
      //             plazo_entrega +
      //             "&modificado=" +
      //             modificado +
      //             "&detalle_art=" +
      //             detalle_art,
      //           success: function (data) {
      //             var n = noty({
      //               text: "Procesando venta...  articulo actual: " + cod,
      //               theme: "relax",
      //               layout: "topLeft",
      //               type: "success",
      //               timeout: 2000,
      //             });
      //           },
      //           error: function (jqXHR, estado, error) {
      //             $("#errores").html("Error... " + estado + "  " + error);
      //           },
      //         });
      //         $("#modal_modificar").modal("hide");
      //         lista_cotizacion();
      //       });
      //     }
      //   },
      // });
    }
  }, 1000);
}


// function duplica_data_articulo_otro() {
//   var n_tic;
//   $.ajax({
//     beforeSend: function () {
//       $("#nro_ticket").html("Buscando...");
//     },
//     async: false,
//     url: "busca_ticket_cotizacion.php",
//     type: "POST",
//     data: "caja=" + $("#ncaja").val(),
//     success: function (x) {
//       $("#nro_ticket").html(x);

//       n_tic = parseInt(x.trim());
//     },
//     error: function (jqXHR, estado, error) {
//       $("#nro_ticket").html("Hubo un error: " + estado + " " + error);
//     },
//   });
//   console.log(n_tic);

//   setTimeout(() => {
//     ntic = parseInt(n_tic);
//     credi = "1";
//     fath = "";
//     tipo_venta = "";
//     clients = $("#idcliente_credito_mod_otro").val();
//     clientename = quitarAcentos($("#idcliente_razon_mod_otro").val());
//     comentarios = "";
//     transportista = "";
//     idcliente_parent = ""; //cliente vinculado;
//     cpago = $("#lista_cpago_mod_otro option:selected").val();
//     cmoneda = $("#lista_cmoneda_mod_otro option:selected").val();
//     slpCode = $("#vendedor1_otro").val();
//     //cpago=document.getElementById("#pone_cpago").selectedIndex;
//     fentrega = "2023-01-01";
//     direntrega = "";
//     validez = $("#validez_mod_otro").val();
//     contacto_mod = $("#dirigido_coti_mod_otro").val();
//     correo_mod = $("#correo_dirigido_mod_otro").val();
//     telefeno_mod = $("#telefono_dirigido_mod_otro").val();
//     n_ticket = n_tic;
//     idlp = ""; //lista de precios;
//     U_IMOB_ESTADO = "Pendiente";
//     U_IMOB_OBSERVACION = "";
//     U_IMOB_OV = "";
//     U_IMOB_FECOV = "";
//     ref_req = $("#ref_req_mod_otro").val();
//     band = true;
//     modificado = "0";
//     var subtotal_venta = 0.0;
//     var total_venta = 0.0;

//     $("#tabla_art_ped_otro > tbody > tr").each(function () {
//       subtotal_venta += parseFloat(
//         $(this).find("td").find('input[id="monto_item2"]').val()
//       );
//     });

//     dscto = ""; //descuento total;

//     total_venta = subtotal_venta + subtotal_venta * 0.18;
//     $("#tabla_art_ped_otro > tbody > tr").each(function () {
//       // var n_orden = $(this).find("td").eq(1).html();

//       linea = $(this).find("td").eq(0).html();
//       lina2 = linea;
//       var can = $(this).find("td").find('input[id="cantidad_item2"]').val();
//       var preciou = $(this).find("td").find('input[id="precio_uni2"]').val();
//       let $precioInput = $(this).find('input[id="precio_uni2"]');
//       let $montoInput = $(this).find('input[id="monto_item2"]');
//       var dscto_lin = $(this)
//         .find("td")
//         .find('input[id="descuento_item2"]')
//         .val();
//       var monto = $(this).find("td").find('input[id="monto_item2"]').val();

//       if (can === "" || can <= 0) {
//         alertify.error("Linea: " + lina2 + " " + "Falta Cantidad Invalida");
//         $(this).find("td").eq(6).css("background-color", "#F67280");
//         band = false;
//       } else {
//         $(this).find("td").eq(6).css("background-color", "white");
//       }
//       // ❌ Validación solo si el campo NO está deshabilitado
//       if (!$precioInput.prop("disabled") && preciou <= 0) {
//         $precioInput.css("border", "2px solid red");
//         error = true;
//       } else {
//         $precioInput.css("border", "");
//       }

//       if (!$montoInput.prop("disabled") && monto <= 0) {
//         $montoInput.css("border", "2px solid red");
//         error = true;
//       } else {
//         $montoInput.css("border", "");
//       }
//       if (dscto_lin.indexOf("+") !== -1) {
//         alertify.error("Linea: " + lina2 + " " + "Falta Calcular Descuento");
//         $(this).find("td").eq(9).css("background-color", "#F67280");
//         band = false;
//       } else {
//         $(this).find("td").eq(9).css("background-color", "white");
//       }
//     });
//     //band = false;
//     if (band === true) {

//       let validacion_descuento = false;

//       $("#tabla_art_ped_otro > tbody > tr").each(function () {
//         let dscto_lin = parseFloat($(this).find('input[id="descuento_item2"]').val() || 0);

//         if (dscto_lin > 10) {
//           validacion_descuento = true;
//         }
//       });

//       let cotizacionData = {
//         clienteid: clients,
//         credito: credi,
//         comentarios: quitarAcentos(comentarios),
//         idcliente_parent: "",
//         cpago: cpago,
//         cmoneda: cmoneda,
//         fentrega: fentrega,
//         fdoc: fentrega,
//         direntrega: direntrega,
//         validez: validez,
//         dirigido_coti: contacto_mod,
//         dirigido_coti_cod: '',
//         correo_dirigido: correo_mod,
//         contacto: contacto_mod,
//         telefono_dirigido: telefeno_mod,
//         cod_dire_entrega: '',
//         orden_compra_coti: '',
//         proyecto: '',
//         flete_cargo: '',
//         transportista: '',
//         idlp: "1",
//         caja: $("#ncaja").val(),
//         U_IMOB_ESTADO: U_IMOB_ESTADO,
//         father: "",
//         U_IMOB_OBSERVACION: "",
//         tipo_venta: "",
//         U_IMOB_OV: "",
//         U_IMOB_FECOV: "",
//         ref_req: ref_req,
//         modificado: "0",
//         clientename: quitarAcentos(clientename),
//         slpCode: slpCode,
//         dscto: "", // Descuento total
//         subtotal_venta: parseFloat(subtotal_venta).toFixed(2),
//         total_venta: parseFloat(total_venta).toFixed(2),
//         TIPO_COTIZACION: '01',
//         n_tic: n_tic,
//         tipo_vta: "",
//         validacion_descuento: validacion_descuento,
//         items: []
//       };
//       // **📌 Recorrer los artículos y agregarlos al JSON**
//       $("#tabla_art_ped_otro > tbody > tr").each(function () {
//         let line = parseInt($(this).find("td").eq(2).html());
//         let codigo = quitarAcentos($(this).find("td").eq(3).text());
//         let descripcion, marca, catalogo;

//         if (codigo === "21004146" || codigo === "21004147") {
//           descripcion = $(this).find("td").find('input[id="descripcion_mod2"]').val() || "-";
//           marca = $(this).find("td").find('input[id="marca_mod2"]').val() || "-";
//           catalogo = $(this).find("td").find('input[id="catalogo_mod2"]').val() || "-";
//         } else {
//           descripcion = $(this).find("td").eq(4).find("input").length
//             ? $(this).find("td").eq(4).find("input").val()
//             : quitarAcentos($(this).find("td").eq(4).text().trim());

//           marca = $(this).find("td").eq(5).find("input").length
//             ? $(this).find("td").eq(5).find("input").val()
//             : quitarAcentos($(this).find("td").eq(5).text().trim());

//           catalogo = $(this).find("td").eq(6).find("input").length
//             ? $(this).find("td").eq(6).find("input").val()
//             : quitarAcentos($(this).find("td").eq(6).text().trim());
//         }
//         let $precioInput = $(this).find('input[id="precio_uni2"]');
//         let unidad_medida = $(this).find("td").eq(7).html();
//         let cantidad = $(this).find("td").find('input[id="cantidad_item2"]').val();
//         let precio_unitario = $(this).find("td").find('input[id="precio_uni2"]').val();
//         let descuento = $(this).find("td").find('input[id="descuento_item2"]').val();
//         let monto = $(this).find("td").find('input[id="monto_item2"]').val();
//         let plazo_entrega = quitarAcentos($(this).find("td").find('input[id="plazoEntrega_item2"]').val());
//         let detalle_articulo = $(this).find("td").find('input[id="detalle_art2"]').val();
//         // var detalle_art = $(this).find("td").find('input[id="detalle_art"]').val();
//         // **Agregar el producto al array de items**
//         if (parseFloat(precio_unitario) > 0.0000) {
//           cotizacionData.items.push({
//             line: line,
//             codigo: codigo,
//             descripcion: descripcion,
//             marca: marca,
//             catalogo: catalogo,
//             cantidad: cantidad,
//             precio_unitario: precio_unitario,
//             descuento: descuento,
//             monto: monto,
//             unidad_medida: unidad_medida,
//             plazo_entrega: plazo_entrega,
//             marca: marca,
//             catalogo: catalogo,
//             detalle_articulo: detalle_articulo
//           });
//         }


//         // **Actualizar el total de la cotización**
//         // cotizacionData.subtotal_venta += parseFloat(monto);
//       });
//       console.log("Cotización Generada:", cotizacionData);
//       $.ajax({
//         beforeSend: function () {
//           // Mostrar el loader antes de enviar la solicitud
//           Swal.fire({
//             title: "Migrando a SAP...",
//             html: '<div class="spinner"></div>',
//             allowOutsideClick: false, // Evita que el usuario cierre la alerta
//             showConfirmButton: false // No muestra botón de confirmación
//           });
//         },
//         url: "server_layer_duplicar_cotizacion_otro.php",
//         type: "POST",
//         contentType: "application/json",
//         data: JSON.stringify(cotizacionData),
//         success: function (response) {
//           try {
//             let res = typeof response === "string" ? JSON.parse(response) : response;

//             if (res.success) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Cotización registrada",
//                 text: `Se ha insertado la cotización con éxito. DocEntry: ${res.message}`,
//                 timer: 2000,
//                 showConfirmButton: false
//               });
//               setTimeout(() => {
//                 location.reload(); // 🔄 Recargar la página automáticamente después de 2 segundos

//               }, 3000);

//             } else {
//               Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: res.message || "Ocurrió un error desconocido",
//               });
//             }
//           } catch (error) {
//             console.error("Error al procesar respuesta JSON:", error);
//           }
//         },

//         error: function (jqXHR, estado, error) {
//           Swal.fire({
//             icon: "error",
//             title: "Error de conexión",
//             text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
//             confirmButtonText: "Cerrar"
//           });
//           console.error("Error AJAX:", estado, error);
//         }
//       });
//     }
//   }, 1000);
// }

function duplica_data_articulo_otro() {
  var n_tic;

  // Variables globales para toda la función
  var subtotal_venta = 0.0;
  var total_venta = 0.0;

  $.ajax({
    beforeSend: function () {
      $("#nro_ticket").html("Buscando...");
    },
    async: false,
    url: "busca_ticket_cotizacion.php",
    type: "POST",
    data: "caja=" + $("#ncaja").val(),
    success: function (x) {
      $("#nro_ticket").html(x);
      n_tic = parseInt(x.trim());
    },
    error: function (jqXHR, estado, error) {
      $("#nro_ticket").html("Hubo un error: " + estado + " " + error);
    },
  });

  console.log(n_tic);

  setTimeout(() => {
    ntic = parseInt(n_tic);
    credi = "1";
    fath = "";
    tipo_venta = "";
    docito = $("#docito_otro").val();
    clients = $("#idcliente_credito_mod_otro").val();
    clientename = quitarAcentos($("#idcliente_razon_mod_otro").val());
    comentarios = "";
    transportista = "";
    idcliente_parent = "";
    cpago = $("#lista_cpago_mod_otro option:selected").val();
    cmoneda = $("#lista_cmoneda_mod_otro option:selected").val();
    slpCode = $("#vendedor1_otro").val();
    fentrega = "2023-01-01";
    direntrega = "";
    validez = $("#validez_mod_otro").val();
    contacto_mod = $("#dirigido_coti_mod_otro").val();
    correo_mod = $("#correo_dirigido_mod_otro").val();
    telefeno_mod = $("#telefono_dirigido_mod_otro").val();
    n_ticket = n_tic;
    idlp = "";
    U_IMOB_ESTADO = "Pendiente";
    U_IMOB_OBSERVACION = "";
    U_IMOB_OV = "";
    U_IMOB_FECOV = "";
    ref_req = $("#ref_req_mod_otro").val();
    band = true;
    modificado = "0";

    // Calcular subtotal
    subtotal_venta = 0.0;
    $("#tabla_art_ped_otro > tbody > tr").each(function () {
      subtotal_venta += parseFloat(
        $(this).find('input[id="monto_item2"]').val() || 0
      );
    });

    dscto = "";
    total_venta = subtotal_venta + subtotal_venta * 0.18;

    $("#tabla_art_ped_otro > tbody > tr").each(function () {
      linea = $(this).find("td").eq(0).html();
      var can = $(this).find('input[id="cantidad_item2"]').val();
      var preciou = $(this).find('input[id="precio_uni2"]').val();
      let $precioInput = $(this).find('input[id="precio_uni2"]');
      let $montoInput = $(this).find('input[id="monto_item2"]');
      var dscto_lin = $(this).find('input[id="descuento_item2"]').val();
      var monto = $(this).find('input[id="monto_item2"]').val();

      if (can === "" || can <= 0) {
        alertify.error("Linea: " + linea + " Falta Cantidad Invalida");
        $(this).find("td").eq(6).css("background-color", "#F67280");
        band = false;
      } else {
        $(this).find("td").eq(6).css("background-color", "white");
      }

      if (!$precioInput.prop("disabled") && preciou <= 0) {
        $precioInput.css("border", "2px solid red");
      } else {
        $precioInput.css("border", "");
      }

      if (!$montoInput.prop("disabled") && monto <= 0) {
        $montoInput.css("border", "2px solid red");
      } else {
        $montoInput.css("border", "");
      }

      if (dscto_lin.indexOf("+") !== -1) {
        alertify.error("Linea: " + linea + " Falta Calcular Descuento");
        $(this).find("td").eq(9).css("background-color", "#F67280");
        band = false;
      } else {
        $(this).find("td").eq(9).css("background-color", "white");
      }
    });

    if (band === true) {

      let validacion_descuento = false;

      $("#tabla_art_ped_otro > tbody > tr").each(function () {
        let dscto_lin = parseFloat($(this).find('input[id="descuento_item2"]').val() || 0);
        if (dscto_lin > 10) validacion_descuento = true;
      });

      // 🔥 Si hay descuento mayor a 10%, pedir confirmación
      if (validacion_descuento) {
        Swal.fire({
          title: "Descuento mayor al 10%",
          text: "Esta cotización pasará a aprobación. ¿Desea continuar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, continuar",
          cancelButtonText: "Cancelar",
        }).then((r) => {
          if (r.isConfirmed) {
            ejecutarRegistro(validacion_descuento);
          }
        });
        return;
      }

      ejecutarRegistro(validacion_descuento);
    }
  }, 1000);


  function ejecutarRegistro(validacion_descuento) {
    let cotizacionData = {
      clienteid: clients,
      credito: credi,
      comentarios: quitarAcentos(comentarios),
      idcliente_parent: "",
      cpago: cpago,
      docEntry: docito,
      cmoneda: cmoneda,
      fentrega: fentrega,
      fdoc: fentrega,
      direntrega: direntrega,
      validez: validez,
      dirigido_coti: contacto_mod,
      dirigido_coti_cod: '',
      correo_dirigido: correo_mod,
      contacto: contacto_mod,
      telefono_dirigido: telefeno_mod,
      cod_dire_entrega: '',
      orden_compra_coti: '',
      proyecto: '',
      flete_cargo: '',
      transportista: '',
      idlp: "1",
      caja: $("#ncaja").val(),
      U_IMOB_ESTADO: U_IMOB_ESTADO,
      father: "",
      U_IMOB_OBSERVACION: "",
      tipo_venta: "",
      U_IMOB_OV: "",
      U_IMOB_FECOV: "",
      ref_req: ref_req,
      modificado: "0",
      clientename: quitarAcentos(clientename),
      slpCode: slpCode,
      dscto: "",
      subtotal_venta: parseFloat(subtotal_venta).toFixed(2),
      total_venta: parseFloat(total_venta).toFixed(2),
      TIPO_COTIZACION: '01',
      n_tic: n_tic,
      tipo_vta: "",
      validacion_descuento: validacion_descuento,
      items: []
    };

    $("#tabla_art_ped_otro > tbody > tr").each(function () {
      let line = parseInt($(this).find("td").eq(2).html());
      let codigo = quitarAcentos($(this).find("td").eq(3).text());
      let descripcion, marca, catalogo;

      if (codigo === "21004146" || codigo === "21004147") {
        descripcion = $(this).find('input[id="descripcion_mod2"]').val() || "-";
        marca = $(this).find('input[id="marca_mod2"]').val() || "-";
        catalogo = $(this).find('input[id="catalogo_mod2"]').val() || "-";
      } else {
        descripcion = $(this).find("td").eq(4).find("input").length
          ? $(this).find("td").eq(4).find("input").val()
          : quitarAcentos($(this).find("td").eq(4).text().trim());

        marca = $(this).find("td").eq(5).find("input").length
          ? $(this).find("td").eq(5).find("input").val()
          : quitarAcentos($(this).find("td").eq(5).text().trim());

        catalogo = $(this).find("td").eq(6).find("input").length
          ? $(this).find("td").eq(6).find("input").val()
          : quitarAcentos($(this).find("td").eq(6).text().trim());
      }

      let unidad_medida = $(this).find("td").eq(7).html();
      let cantidad = $(this).find('input[id="cantidad_item2"]').val();
      let precio_unitario = $(this).find('input[id="precio_uni2"]').val();
      let descuento = $(this).find('input[id="descuento_item2"]').val();
      let monto = $(this).find('input[id="monto_item2"]').val();
      let plazo_entrega = quitarAcentos($(this).find('input[id="plazoEntrega_item2"]').val());
      let detalle_articulo = $(this).find('input[id="detalle_art2"]').val();

      if (parseFloat(precio_unitario) > 0.0000) {
        cotizacionData.items.push({
          line: line,
          codigo: codigo,
          descripcion: descripcion,
          marca: marca,
          catalogo: catalogo,
          cantidad: cantidad,
          precio_unitario: precio_unitario,
          descuento: descuento,
          monto: monto,
          unidad_medida: unidad_medida,
          plazo_entrega: plazo_entrega,
          detalle_articulo: detalle_articulo
        });
      }
    });

    enviarCotizacionDuplicada(cotizacionData);
  }


  function enviarCotizacionDuplicada(cotizacionData) {
    $.ajax({
      beforeSend: function () {
        Swal.fire({
          title: "Migrando a SAP...",
          html: '<div class="spinner"></div>',
          allowOutsideClick: false,
          showConfirmButton: false
        });
      },
      url: "server_layer_duplicar_cotizacion_otro.php",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(cotizacionData),
      success: function (response) {
        try {
          let res = typeof response === "string" ? JSON.parse(response) : response;

          if (res.success) {
            Swal.fire({
              icon: "success",
              title: "Cotización duplicada",
              text: res.message,
              // text: `Se ha insertado la cotización con éxito .\nDocEntry: ${res.DocEntry}, Ticket: ${res.ticket}`,
              // text: `Se ha insertado la cotización con éxito.`,
              timer: 2000,
              showConfirmButton: false
            });
            setTimeout(() => location.reload(), 3000);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.message || "Ocurrió un error desconocido",
            });
          }
        } catch (error) {
          console.error("Error al procesar respuesta JSON:", error);
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "Hubo un problema al comunicarse con el servidor.",
        });
      }
    });
  }
}



function actualizar_data_articulo() {
  let docentry = $("#docentry_cot").val();
  let doc_sap = $("#doc_sap").val();
  let ref_req_mod = $("#ref_req_mod").val();
  let validez_mod = $("#validez_mod").val();
  let cod_vendedor = $("#vendedor1").val();
  let comentarios = $("#comentarios1").val();
  let direccion = $("#cap_dicc1").val();
  let moneda = $("#lista_cmoneda_mod select").val();
  let contacto_mod = $("#dirigido_coti_mod").val();
  let correo_mod = $("#correo_dirigido_mod").val();
  let telefono_mod = $("#telefono_dirigido_mod").val();
  let doc_web = $("#docito").val();

  let cpago = $("#cpago_mod").val();

  let error = false; // Flag global para errores
  let subtotal_venta = 0.0;
  let total_venta = 0.0;
  let documentLines = [];

  $("#tabla_art_ped > tbody > tr").each(function () {

    let EsParteKIT = $(this).find("td").find('input[id="EsParteKIT"]').val()
    console.log(EsParteKIT);
    if (EsParteKIT === "N" || EsParteKIT === "S") {
      let linea = $(this).find("td").eq(2).html();

      let order = $(this).find("td").eq(1).html();

      //console.log(EsParteKIT);
      let $cantidadInput = $(this).find('input[id="cantidad_item2"]');
      let $precioInput = $(this).find('input[id="precio_uni2"]');
      let $montoInput = $(this).find('input[id="monto_item2"]');
      let codigo = quitarAcentos($(this).find("td").eq(1).html());
      let descripcion, marca, catalogo;
      let precio_unitario = $(this).find("td").eq(22).html();
      if (codigo === "21004146" || codigo === "21004147") {
        descripcion = ($(this).find("td").find('input[id="descripcion_mod2"]').val() || "").toUpperCase();
        //$(this).find("td").find('input[id="descripcion_mod2"]').val() || "-";
        marca = ($(this).find("td").find('input[id="marca_mod2"]').val() || "-").toUpperCase();
        // $(this).find("td").find('input[id="marca_mod2"]').val() || "-";
        catalogo = ($(this).find("td").find('input[id="catalogo_mod2"]').val() || "-").toUpperCase();
        //$(this).find("td").find('input[id="catalogo_mod2"]').val() || "-";
      } else {
        descripcion = $(this).find("td").eq(4).find("input").length
          ? $(this).find("td").eq(4).find("input").val()
          : quitarAcentos($(this).find("td").eq(4).text().trim());

        marca = $(this).find("td").eq(5).find("input").length
          ? $(this).find("td").eq(5).find("input").val()
          : quitarAcentos($(this).find("td").eq(5).text().trim());

        catalogo = $(this).find("td").eq(6).find("input").length
          ? $(this).find("td").eq(6).find("input").val()
          : quitarAcentos($(this).find("td").eq(6).text().trim());
      }


      let can = parseFloat($cantidadInput.val()) || 0;
      let preciou = parseFloat($precioInput.val()) || 0;
      let monto = parseFloat($montoInput.val()) || 0;
      let dscto_lin = parseFloat($(this).find('input[id="descuento_item2"]').val()).toFixed(4) || 0;

      let itemCode = $(this).find("td").eq(3).html();
      let linestatus = $(this).find("td[data-status]").text().trim() || "O";
      // let descripcion = $(this).find('input[id="descripcion_mod2"]').val();
      // let marca = $(this).find('input[id="marca_mod2"]').val();
      // let catalogo = $(this).find('input[id="catalogo_mod2"]').val();
      let plazo_entrega = ($(this).find("td").find('input[id="plazoEntrega_item2"]').val() || "").toUpperCase();
      //$(this).find("td").find('input[id="plazoEntrega_item2"]').val();
      let detalle_art = ($(this).find("td").find('input[id="detalle_art2"]').val() || "").toUpperCase();
      // $(this).find("td").find('input[id="detalle_art2"]').val()


      // ❌ Validaciones y resaltado de errores
      if (can <= 0) {
        $cantidadInput.css("border", "2px solid red");
        error = true;
      } else {
        $cantidadInput.css("border", "");
      }

      // ❌ Validación solo si el campo NO está deshabilitado
      if (!$precioInput.prop("disabled") && preciou <= 0) {
        $precioInput.css("border", "2px solid red");
        error = true;
      } else {
        $precioInput.css("border", "");
      }

      if (!$montoInput.prop("disabled") && monto <= 0) {
        $montoInput.css("border", "2px solid red");
        error = true;
      } else {
        $montoInput.css("border", "");
      }
      if (!$precioInput.prop("disabled") && parseFloat(precio_unitario) > parseFloat(preciou)) {
        $precioInput.css("border", "2px solid red"); // 🔴 Resaltar en rojo
        alertify.error("Precio Unitario Inferior al Precio de Lista");
        error = true;
      } else {
        $precioInput.css("border", ""); // ✅ Quitar borde rojo si está correcto
      }

      // ✅ Acumular totales si no hay errores en la línea
      if (!error) {
        subtotal_venta += monto;
        total_venta = subtotal_venta + subtotal_venta * 0.18;

        // 🔹 Agregar cada línea a la cotización en SAP
        documentLines.push({
          "ItemCode": itemCode,
          "Quantity": can,
          "Price": preciou,
          "DiscountPercent": dscto_lin,
          "LineNum": linea,
          "VisOrder": order,
          "linestatus": linestatus,
          "ItemName": descripcion,
          "Marca": marca,
          "Catalogo": catalogo,
          "monto": monto,
          "plazo_entrega": plazo_entrega,
          "detalle_art": detalle_art,
          "EsParteKIT": EsParteKIT

        });
      }

    } else {

    }


  });

  // 🚨 Si hubo errores, mostrar Swal.fire() y detener el proceso
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Datos incorrectos",
      text: "Revisa los campos resaltados en rojo y corrige los valores.",
      confirmButtonText: "Cerrar"
    });
    return;
  }

  // ✅ Si no hay errores, continuar con la cotización
  console.log("Total Venta:", total_venta);
  console.log("Document Lines:", documentLines);


  // if (!band) return; // Si hay errores, detener la ejecución

  let cotizacionSAP = {
    "DocEntry": parseInt(docentry),
    "doc_sap": parseInt(doc_sap),
    "DocDate": new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
    "DocTotal": total_venta,
    "SalesPersonCode": cod_vendedor,
    "Comments": comentarios,
    // "CardCode": ref_req_mod,
    "DocCurrency": moneda,
    "ContactPersonCode": contacto_mod,
    "Correo": correo_mod,
    "Telefono": telefono_mod,
    "Req": ref_req_mod,
    "Validez": validez_mod,
    "PaymentGroupCode": cpago,
    "doc_web": doc_web,
    "DocumentLines": documentLines
  };

  console.log("Enviando datos a SAP Service Layer:", cotizacionSAP);

  $.ajax({
    beforeSend: function () {
      Swal.fire({
        title: "Actualizando Cotización...",
        html: `
                <div class="spinner"></div>
                <br>Por favor, espera...
            `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false
      });
    },
    url: "server_layer_modificar_coti.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(cotizacionSAP),

    success: function (data) {
      try {
        let response = JSON.parse(data); // Convertir la respuesta a JSON
        if (response.success) {
          Swal.fire({
            title: "✅ Cotización Actualizada",
            text: response.message, // Mensaje de éxito desde el backend
            icon: "success",
            timer: 3000,
            showConfirmButton: false
          });

          // 🛑 Cerrar modal si la respuesta es positiva
          $("#modal_modificar").modal("hide");

          // ✅ Refrescar la lista de cotizaciones
          busca_coti();
        } else {
          Swal.fire({
            title: "❌ Error al Actualizar",
            text: response.message, // Mensaje de error desde el backend
            icon: "error",
            confirmButtonText: "Cerrar"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "❌ Error Inesperado",
          text: "No se pudo procesar la respuesta del servidor.",
          icon: "error",
          confirmButtonText: "Cerrar"
        });
      }
    },
    error: function (jqXHR, estado, error) {
      console.log("❌ Error en SAP:", estado, error, jqXHR.responseText);
      Swal.fire({
        title: "❌ Error en la Solicitud",
        text: "Hubo un problema al conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Cerrar"
      });
    }
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
    "&": "",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString()
    .replace(/['"]+/g, "");
}

// function busca_detalle_cotizacion(id) {
//   $("#modal_det_cotizacion").modal("show");
//   estado = $("#IDestado option:selected").text().trim();
//   $("#idpedido").val(id);
//   $.ajax({
//     url: "consulta_detalle_cot.php",

//     type: "POST",
//     data: "id=" + id,
//     success: function (x) {
//       $(".nuticket").html("");
//       $(".nuticket").append(
//         "Detalle de Cotizacion | <span class='label label-warning'>#: " +
//         id +
//         "</span>"
//       );
//       $("#pagos_realizados").html(x);
//     },
//     error: function (jqXHR, estado, error) { },
//   });
// }

function busca_detalle_cotizacion() {
  id = $("#doc_sap").val();


  console.log(id)
  $("#modal_det_cotizacion").modal("show");
  estado = $("#IDestado option:selected").text().trim();
  $("#idpedido").val(id);
  $.ajax({
    url: "consulta_detalle_venta_autorizaciones_cotizaciones2.php",

    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append(
        " Detalle de Cotizacion | <span class='label label-warning'>#: " +
        id +
        "</span>"
      );
      $("#pagos_realizados").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function agrega_a_lista_mod() {
  $(document).ready(function () {
    bandera = true;
    if ($("#cantidad2").val() > 0) {
      var articulo = $("#codigo2").val();
      var descripcion = document.getElementById("descripcionitem2").value;
      var precio = $("#preciou2").val();
      var cantidad = $("#cantidad2").val();
      var unidad = $("#unidad_line2").val();
      var fecha_prod = $("#fecha_prod2").val();
      var fecha_prod = $("#fecha_prod2").val();
      var catalogo_item = $("#catalogo_item2").val();
      var marca_item = $("#marca_item2").val();
      var preciou_ant = $("#preciou_ant2").val();
      var plazo_entrega = $("#plazo_entrega2").val();
      //var num = parseFloat(document.getElementById('tabla_articulos_mod').getElementsByTagName('tr').length)

      fil = ultimo_valor_fila_mod();
      //var tipovta = "V";
      if (fil === 0) {
        $("#tabla_articulos_mod > tbody > tr").remove();
      }
      var num = ultimo_valor_fila_mod() + 1;

      var multi_descuento = $("#dsctoline2").val();
      var data = multi_descuento.split("+");

      if (multi_descuento === "") {
        var dsctoline = 0;
        var dsctoline2 = 0;
        var dsctoline3 = 0;
      }
      if (data.length == 1) {
        var dsctoline = data[0];
        var dsctoline2 = data[0];
        var dsctoline3 = 0;
      }
      if (data.length == 2) {
        var dsctoline2 = parseFloat(data[0]);
        var dsctoline3 = parseFloat(data[1]);

        var dsctoline = parseFloat(
          dsctoline2 + dsctoline3 - parseFloat((dsctoline2 * dsctoline3) / 100)
        ).toFixed(2);
        //console.log(dsctoline);
      }

      var monto = parseFloat(
        cantidad * precio - cantidad * precio * (dsctoline / 100),
        2,
        ".",
        ""
      ).toFixed(2);
      if (articulo === "") {
        bandera = false;
        var n = noty({
          text: "Codigo vacio...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (descripcion === "") {
        bandera = false;
        var n = noty({
          text: "Descripcion vacia...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (cantidad === "") {
        bandera = false;
        var n = noty({
          text: "Cantidad vacia...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (precio === "") {
        bandera = false;
        var n = noty({
          text: "Precio S/IGV vacio...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (plazo_entrega === "") {
        bandera = false;
        var n = noty({
          text: "Plazo de entrega vacio vacio...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (precio <= 0) {
        bandera = false;
        var n = noty({
          text: "Precio NO VALIDO...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      //console.log(preciou_ant);console.log(precio);
      if (precio < preciou_ant) {
        bandera = false;
        var n = noty({
          text: "Precio no puede ser menor al precio base...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (dsctoline.indexOf("+") !== -1) {
        bandera = false;
        listar_noty("Falta Calcular");
      }
      if (bandera === true) {
        $("#tabla_articulos_mod > tbody").append(
          "<tr><td class='center'>" +
          num +
          "</td><td class='center'>" +
          articulo +
          "</td><td class='center'>" +
          descripcion +
          "</td><td class='center'>" +
          marca_item +
          "</td><td class='center'>" +
          catalogo_item +
          "</td><td class='center'>" +
          unidad +
          "</td><td class='center'>" +
          cantidad +
          "</td><td class='center'>" +
          precio +
          "</td><td class='center'>" +
          multi_descuento +
          "</td><td class='center'>" +
          monto +
          "</td><td class='center'>" +
          plazo_entrega +
          "</td><td class='center' style='display:none'>" +
          dsctoline +
          "</td><td class='center'><button class='btn  btn-danger btn-xs delete_mod'><i class='icon-trash bigger-120'></i>X</button><button onclick='editar_producto(" +
          num +
          ");' class='btn  btn-warning btn-xs'><i class='fa fa-edit bigger-120'></i></button></td></tr>"
        );
        $("#codigo2").val("");
        $("#cantidad2").val(0.0);
        $("#dsctoline2").val(0.0);
        $("#exis2").val(0.0);
        $("#monedaitem2").val("");
        $("#descripcionitem2").val("");
        $("#preciou2").val(0.0);
        $("#preciouigv2").val(0.0);
        //$("#preciou").attr("disabled", true);
        $("#codigo2").focus();
        $(".widget-user-desc").html("");
        $(".exis2").html(0);
        $(".preciol2").html(0.0);
        /*cancela_operacion();*/
        // $("#imagen").attr("src", 'dist/img/sin_foto.png');
        resumen_mod();
        $("#modal_articulo_2").modal("hide");
      }
    } else {
      var n = noty({
        text: "La cantidad es invalida...!",
        theme: "relax",
        layout: "center",
        type: "error",
        timeout: 2000,
      });
    }
  });
}

function busqueda_art_mod() {
  //$('#modal_articulo_2').modal('show');
  $("#modal_busqueda_arts_mod").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });
  $("#modal_busqueda_arts_mod").on("shown.bs.modal", function () {
    $("#lista_articulos_mod").html("");
    $("#articulo_buscar_mod").val("");
    $("#articulo_buscar_mod").focus();
  });
  lista_marca2();
}

// function busca_mod() {
//   cmoneda = $("#lista_cmoneda option:selected").val();
//   data_buscar = $("#articulo_buscar_mod").val();
//   var data = data_buscar.split("//");
//   firname = $("#listar_marca_art2 select").val();
//   if (data_buscar === '') {
//     datasupcatname = ''
//     data_descripcion = ''
//   }

//   if (data.length == 1) {
//     datasupcatname = data[0]
//     data_descripcion = ''
//   }
//   if (data.length == 2) {
//     datasupcatname = data[0]
//     data_descripcion = data[1]
//   }

//   //console.log(data);
//   $.ajax({
//     beforeSend: function () {
//       $("#lista_articulos_mod").html("");
//     },
//     url: "busca_data_articulo_nuevo2.php",
//     type: "POST",
//     data: {
//       descripcion: data_descripcion,
//       firname: firname,
//       supcatname: datasupcatname,
//     },
//     success: function (x) {
//       $("#lista_articulos_mod").html(x);
//       $("#tabla_art").DataTable();
//     },
//     error: function (jqXHR, estado, error) {
//       $("#lista_articulos_mod").html(
//         "Error en la peticion AJAX..." + estado + "      " + error
//       );
//     },
//   });
// }

function busca_mod() {
  cmoneda = $("#lista_cmoneda option:selected").val();
  data_buscar = $("#articulo_buscar_mod").val();
  var data = data_buscar.split("//");
  firname = $("#listar_marca_art2 select").val();
  if (data_buscar === "") {
    datasupcatname = "";
    data_descripcion = "";
    data_codigo = "";
  }

  if (data.length == 1) {
    datasupcatname = data[0];
    data_descripcion = "";
    data_codigo = "";
  }
  if (data.length == 2) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = "";
  }
  if (data.length == 3) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = data[2];
  }

  //console.log(data);
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos_mod").html("");
    },
    url: "busca_data_articulo_nuevo4.php",
    type: "POST",
    data: {
      descripcion: data_descripcion,
      firname: firname,
      supcatname: datasupcatname,
      data_codigo: data_codigo,
    },
    success: function (x) {
      $("#lista_articulos_mod").html(x);
      $("#tabla_art_mod").DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos_mod").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}


function busca_mod_otro() {
  cmoneda = $("#lista_cmoneda_otro option:selected").val();
  data_buscar = $("#articulo_buscar_mod_otro").val();
  var data = data_buscar.split("//");
  firname = $("#listar_marca_art2_otro select").val();
  if (data_buscar === "") {
    datasupcatname = "";
    data_descripcion = "";
    data_codigo = "";
  }

  if (data.length == 1) {
    datasupcatname = data[0];
    data_descripcion = "";
    data_codigo = "";
  }
  if (data.length == 2) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = "";
  }
  if (data.length == 3) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = data[2];
  }

  //console.log(data);
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos_mod_otro").html("");
    },
    url: "busca_data_articulo_nuevo4_otro.php",
    type: "POST",
    data: {
      descripcion: data_descripcion,
      firname: firname,
      supcatname: datasupcatname,
      data_codigo: data_codigo,
    },
    success: function (x) {
      $("#lista_articulos_mod_otro").html(x);
      $("#tabla_art_mod_otro").DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos_mod_otro").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

// function add_art_mod(art) {
//   //alert(art);
//   $("#modal_busqueda_arts_mod").modal("toggle");
//   $('#modal_articulo_2').modal('show');
//   $("#codigo2").val(art.trim());
//   busca_articulo_mod();
// }

function add_art_mod() {
  //alert(art);

  // $("#modal_busqueda_arts").modal("toggle");
  $("#modal_busqueda_arts_mod").modal("toggle");

  let codigo = '';

  // Recorremos el array '' y unimos sus elementos con una coma
  line_mod.forEach(function (item) {
    codigo += item + ",";  // Concatenamos cada código seguido de una coma
  });

  // Eliminar la última coma extra, si existe
  if (codigo.endsWith(",")) {
    codigo = codigo.slice(0, -1);
  }
  codigo = line_mod.toString();

  $("#codigo2").val(codigo);
  // console.log(codigo);
  busca_articulo_mod();

}

function add_art_mod_otro() {
  //alert(art);

  // $("#modal_busqueda_arts").modal("toggle");
  $("#modal_busqueda_arts_mod_otro").modal("toggle");

  let codigo = '';

  // Recorremos el array '' y unimos sus elementos con una coma
  line_mod.forEach(function (item) {
    codigo += item + ",";  // Concatenamos cada código seguido de una coma
  });

  // Eliminar la última coma extra, si existe
  if (codigo.endsWith(",")) {
    codigo = codigo.slice(0, -1);
  }
  codigo = line_mod.toString();

  $("#codigo2_otro").val(codigo);
  // console.log(codigo);
  busca_articulo_mod_otro();

}

function busca_articulo_mod() {
  $(document).ready(function () {
    var cod = $("#codigo2").val().toString();
    var tipcli = $("#tipocliente_mod").val().trim();
    var cmoneda = $("#lista_cmoneda_mod option:selected").val();
    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo").html("Buscando informacion del articulo...");
          },
          url: "busca_data_articulo_pventa.php",
          dataType: "json",
          type: "POST",
          data: {
            codigo: $("#codigo2").val(),
            idcliente_credito: $("#idcliente_credito_mod").val(),
            cmoneda: cmoneda,
          },
          success: function (data) {
            if (data == 0) {
              var n = noty({
                text: "No existe el articulo...!",
                theme: "relax",
                layout: "center",
                type: "error",
                timeout: 2000,
              });
            } else {
              for (let i = 0; i < data.length; i++) {
                fil = ultimo_valor_fila_mod();
                if (fil === 0) {
                  $("#tabla_art_ped > tbody > tr > td").remove();
                  // $("#tabla_articulos > tbody > tr > td").remove();
                }
                var num = ultimo_valor_fila_mod() + 1;

                precio = parseFloat(data[i].precio).toFixed(4);
                precio_igv = precio * 1.18;
                precioigv_parse = parseFloat(precio_igv).toFixed(4);

                li = parseFloat(num - 1).toFixed(0);
                // $("#tabla_art_ped > tbody").append("<tr><td class='center'>" + num + "</td>" +
                var htmlString =
                  "<tr>" +
                  "<td style='text-align: center;' class='reorder'><button class='icon-button btn-success' id='iconButton'> ≡ </button></td>" +
                  "<td class='center'>" + num + "</td>" +
                  "<td class='center' style='display:none'>" + num + "</td>" +
                  "<td class='center' style=''>" +
                  data[i].ItemCode +
                  "</td>";
                if (
                  data[i].ItemCode === "21004147" ||
                  data[i].ItemCode === "21004146"
                ) {
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='descripcion_mod2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].descripcion +
                    "'></td>";
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='marca_mod2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].Fabricante +
                    "'></td>";
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='catalogo_mod2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].Catalogo +
                    "'></td>";
                } else {
                  htmlString +=
                    "<td class='center'>" + data[i].descripcion + "</td>";
                  htmlString +=
                    "<td class='center'>" + data[i].Fabricante + "</td>";
                  htmlString +=
                    "<td class='center'>" + data[i].Catalogo + "</td>";
                }
                //"<td class='center'>" + data[0].Catalogo + "</td>"+
                htmlString +=
                  "<td class='center'>" +
                  data[i].unidad_medida +
                  "</td>";
                htmlString +=
                  "<td class='center'>" + parseFloat(data[i].STOCK_AYM).toFixed(2) + "</td>";
                htmlString +=
                  "<td class='center'>" + parseFloat(data[i].STOCK_COMPROMETIDO).toFixed(2) + "</td>";
                htmlString +=
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='cantidad_item2'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item2(this," +
                  li +
                  ")'  onchange='calcular_total_item2(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='precio_uni2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onchange='calcular_total_item2(this," +
                  li +
                  ");calcular_precio_igv2(this," +
                  li +
                  ")' onkeyup='calcular_total_item(2this," +
                  li +
                  ");calcular_precio_igv(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='descuento_item2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0'  onkeyup='detectarEnter2(event,this," +
                  li +
                  ")' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' disabled id='precio_decuento2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onkeyup='calcular_dscto_item2(this," +
                  li +
                  ")'  onchange='calcular_dscto_item2(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:right;display:none'><input type='text'  class='form-control pull-right' id='precio_igv2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precioigv_parse +
                  "' onkeyup='calcular_total_item2(this," +
                  li +
                  ")'  onchange='calcular_total_item2(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='monto_item2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item2(" +
                  li +
                  ")'  onchange='calcular_total_item2(" +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right;display:none'><input type='text'  class='form-control pull-right' id='monto_total2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot2(this," +
                  li +
                  ")'  onchange='calcular_monto_tot2(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='plazoEntrega_item2'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-sm delete rounded-circle' onclick='resumen_mod();'><i class='fa fa-trash'></i></button></td>" +
                  "<td class='center' style='display:none'>" +
                  precio +
                  "</td>" +
                  "<td style='text-align:center'><input type='text' class='form-control pull-right detalle_art2' id='detalle_art2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +

                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='EsParteKIT'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='N' disabled></td>";

                $("#tabla_art_ped > tbody").append(htmlString);

                if (data[0].cantidad2 <= 0) {
                  var n = noty({
                    text: "No hay suficiente existencia...!",
                    theme: "relax",
                    layout: "center",
                    type: "information",
                    timeout: 2000,
                  });

                  $("#cantidad2").focus();
                }
              }
            }
          },

          error: function (jqXHR, estado, error) {
            // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
            var n = noty({
              text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
              theme: "relax",
              layout: "center",
              type: "error",
              timeout: 2000,
            });
            //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
          },
        });
      });
    } else {
    }
  });
}


function busca_articulo_mod_otro() {
  $(document).ready(function () {
    var cod = $("#codigo2_otro").val().toString();
    var tipcli = $("#tipocliente_mod_otro").val().trim();
    var cmoneda = $("#lista_cmoneda_mod_otro option:selected").val();
    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo_otro").html("Buscando informacion del articulo...");
          },
          url: "busca_data_articulo_pventa.php",
          dataType: "json",
          type: "POST",
          data: {
            codigo: $("#codigo2_otro").val(),
            idcliente_credito: $("#idcliente_credito_mod_otro").val(),
            cmoneda: cmoneda,
          },
          success: function (data) {
            if (data == 0) {
              var n = noty({
                text: "No existe el articulo...!",
                theme: "relax",
                layout: "center",
                type: "error",
                timeout: 2000,
              });
            } else {
              for (let i = 0; i < data.length; i++) {
                fil = ultimo_valor_fila_mod_otro();
                if (fil === 0) {
                  $("#tabla_art_ped_otro > tbody > tr > td").remove();
                  // $("#tabla_articulos > tbody > tr > td").remove();
                }
                var num = ultimo_valor_fila_mod_otro() + 1;

                precio = parseFloat(data[i].precio).toFixed(4);
                precio_igv = precio * 1.18;
                precioigv_parse = parseFloat(precio_igv).toFixed(4);

                li = parseFloat(num - 1).toFixed(0);
                // $("#tabla_art_ped > tbody").append("<tr><td class='center'>" + num + "</td>" +
                var htmlString =
                  "<tr>" +
                  "<td style='text-align: center;' class='reorder'><button class='icon-button btn-success' id='iconButton'> ≡ </button></td>" +
                  "<td class='center'>" + num + "</td>" +
                  "<td class='center' style='display:none'>" + num + "</td>" +
                  "<td class='center' style=''>" +
                  data[i].ItemCode +
                  "</td>";
                if (
                  data[i].ItemCode === "21004147" ||
                  data[i].ItemCode === "21004146"
                ) {
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='descripcion_mod2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].descripcion +
                    "'></td>";
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='marca_mod2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].Fabricante +
                    "'></td>";
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='catalogo_mod2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].Catalogo +
                    "'></td>";
                } else {
                  htmlString +=
                    "<td class='center'>" + data[i].descripcion + "</td>";
                  htmlString +=
                    "<td class='center'>" + data[i].Fabricante + "</td>";
                  htmlString +=
                    "<td class='center'>" + data[i].Catalogo + "</td>";
                }
                //"<td class='center'>" + data[0].Catalogo + "</td>"+
                htmlString +=
                  "<td class='center'>" +
                  data[i].unidad_medida +
                  "</td>";
                htmlString +=
                  "<td class='center'>" + parseFloat(data[i].STOCK_AYM).toFixed(2) + "</td>";
                htmlString +=
                  "<td class='center'>" + parseFloat(data[i].STOCK_COMPROMETIDO).toFixed(2) + "</td>";
                htmlString +=
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='cantidad_item2'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item2_otro(this," +
                  li +
                  ")'  onchange='calcular_total_item2_otro(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='precio_uni2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onchange='calcular_total_item2_otro(this," +
                  li +
                  ");calcular_precio_igv2_otro(this," +
                  li +
                  ")' onkeyup='calcular_total_item2_otro(2this," +
                  li +
                  ");calcular_precio_igv2_otro(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='descuento_item2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0'  onkeyup='detectarEnter2(event,this," +
                  li +
                  ")' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' disabled id='precio_decuento2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onkeyup='calcular_dscto_item2_otro(this," +
                  li +
                  ")'  onchange='calcular_dscto_item2_otro(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:right;display:none'><input type='text'  class='form-control pull-right' id='precio_igv2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precioigv_parse +
                  "' onkeyup='calcular_total_item2_otro(this," +
                  li +
                  ")'  onchange='calcular_total_item2_otro(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='monto_item2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item2_otro(" +
                  li +
                  ")'  onchange='calcular_total_item2_otro(" +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right;display:none'><input type='text'  class='form-control pull-right' id='monto_total2'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot2(this," +
                  li +
                  ")'  onchange='calcular_monto_tot2(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='plazoEntrega_item2'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-sm delete rounded-circle' onclick='resumen_mod_otro();'><i class='fa fa-trash'></i></button></td>" +
                  "<td class='center' style='display:none'>" +
                  precio +
                  "</td>" +
                  "<td style='text-align:center'><input type='text' class='form-control pull-right detalle_art2' id='detalle_art2' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +

                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='EsParteKIT'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='N' disabled></td>";

                $("#tabla_art_ped_otro > tbody").append(htmlString);

                if (data[0].cantidad2 <= 0) {
                  var n = noty({
                    text: "No hay suficiente existencia...!",
                    theme: "relax",
                    layout: "center",
                    type: "information",
                    timeout: 2000,
                  });

                  $("#cantidad2_otro").focus();
                }
              }
            }
          },

          error: function (jqXHR, estado, error) {
            // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
            var n = noty({
              text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
              theme: "relax",
              layout: "center",
              type: "error",
              timeout: 2000,
            });
            //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
          },
        });
      });
    } else {
    }
  });
}

function eliminar_producto_mod(Id, button) {
  swal({
    title: "Desea Eliminar?",
    text: "Desea Eliminar temporalmente!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Se ha eliminado temporalmente, cuando le de actualizar eliminara", {
        icon: "success",
        buttons: false,
        closeModal: true,
        timer: 2000,
      });
      var fila = obtenerFila3(button);
      $($("#tabla_art_ped").find("tbody > tr")[fila]).remove();
      array_eliminar.push(Id);
      resumen_mod();
    } else {
      swal("No se ha eliminado");
    }
  });
  console.log(array_eliminar);
  /**/
}

function eliminar_producto_mod_otro(Id, button) {
  swal({
    title: "Desea Eliminar?",
    text: "Desea Eliminar temporalmente!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Se ha eliminado temporalmente, cuando le de actualizar eliminara", {
        icon: "success",
        buttons: false,
        closeModal: true,
        timer: 2000,
      });
      var fila = obtenerFila3(button);
      $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).remove();
      array_eliminar.push(Id);
      resumen_mod_otro();
    } else {
      swal("No se ha eliminado");
    }
  });
  console.log(array_eliminar);
  /**/
}

function eliminar_producto_proc(Id, button) {
  swal({
    title: "Desea Eliminar?",
    text: "Desea Eliminar temporalmente!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Se ha eliminado temporalmente, cuando le de actualizar eliminara", {
        icon: "success",
        buttons: false,
        closeModal: true,
        timer: 2000,
      });
      var fila = obtenerFila3(button);
      $($("#tabla_art_proc").find("tbody > tr")[fila]).remove();
      array_eliminar.push(Id);
      resumen_proc();
    } else {
      swal("No se ha eliminado");
    }
  });
  console.log(array_eliminar);
  /**/
}

function eliminar_lineas_producto() {
  for (let i = 0; i < array_eliminar.length; i++) {
    var element = array_eliminar[i];
    $.ajax({
      beforeSend: function () { },
      url: "eliminar_producto.php",
      type: "POST",
      data: { Id: element },
      success: function (x) { },
      error: function (jqXHR, estado, error) { },
    });
  }
}

$(document).on("keyup", "#preciou_modificar_mod", function () {
  var valor = $(this).val();
  var precio_sigv = $("#preciou_modificar_mod").val();
  var importe = valor;
  var importeTotal2 = 0.0;
  var importeigv = 0.0;

  total_importe = parseFloat(precio_sigv);
  importeigv = parseFloat(precio_sigv * 0.18).toFixed(2);
  importeTotal2 = parseFloat(precio_sigv) + parseFloat(importeigv);
  $("#preciouigv_modificar_mod").val(importeTotal2);
});



$(document).on("keyup", "#ref_req", function () {
  var valor = $(this).val();

  // Limita el campo a 50 caracteres
  if (valor.length > 50) {
    $(this).val(valor.substring(0, 50));  // Corta el texto a 50 caracteres
    valor = $(this).val();  // Actualiza el valor con el texto limitado
  }

  // Muestra un mensaje si el valor tiene exactamente 50 caracteres
  if (valor.length === 50) {
    alertify.error("Este campo solo admite 50 caracteres.");
  }
});



$(document).on("keyup", "#ref_req_mod", function () {
  var valor = $(this).val();

  // Limita el campo a 50 caracteres
  if (valor.length > 50) {
    $(this).val(valor.substring(0, 50));  // Corta el texto a 50 caracteres
    valor = $(this).val();  // Actualiza el valor con el texto limitado
  }

  // Muestra un mensaje si el valor tiene exactamente 50 caracteres
  if (valor.length === 50) {
    alertify.error("Este campo solo admite 50 caracteres.");
  }
});






function cliente_abrir() {
  window.location.href = "socio_negocio.php";
  // $("#modal_crear_cliente").modal("show");
  // lista_vendedores_clie();
  // lista_pais_clie();
  // lista_groupname();
  // lista_subgroupname();
}

function obtenerDatosJson(callback, json) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error("Error al cargar el archivo JSON");
        callback(null);
      }
    }
  };
  xhr.open("GET", json, true);
  xhr.send();
}

function obtenerDatosJson3(callback, json) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error("Error al cargar el archivo JSON");
        callback(null);
      }
    }
  };
  xhr.open("GET", json, true);
  xhr.send();
}
function obtenerCodigoUbigeo(data, nombre) {
  const departamento = data.find(
    (item) => item.nombre_ubigeo.toLowerCase() === nombre.toLowerCase()
  );
  return departamento
    ? {
      id_ubigeo: departamento.id_ubigeo,
      codigo_ubigeo: departamento.codigo_ubigeo,
    }
    : null;
}
function buscarPorIdYNombre(id, nombre, datos) {
  // Verifica si el ID existe en los datos
  if (datos[id]) {
    // Busca el objeto con el nombre proporcionado
    const resultado = datos[id].find(
      (item) => item.nombre_ubigeo.toLowerCase() === nombre.toLowerCase()
    );

    if (resultado) {
      return resultado;
    } else {
      console.log(
        `No se encontró un objeto con nombre_ubigeo igual a ${nombre} para el ID ${id}`
      );
      return null;
    }
  } else {
    console.log(`No se encontraron datos para el ID ${id}`);
    return null;
  }
}

function consultar_ruc() {

  ruc = $("#ruc_cliente").val();

  bandera = true;

  if (ruc.length === 11) {
    bandera = true;
    valida_cliente('ruc_cliente', true, 'Ruc válido.')
  } else {
    bandera = false;
    valida_cliente('ruc_cliente', false, 'Por favor, ingresa un Ruc válido.')
  }
  if (bandera === true) {
    $.ajax({
      beforeSend: function () {
        Swal.fire({
          title: "Consultando SUNAT...",
          html: '<div class="spinner"></div>',
          allowOutsideClick: false, // Evita que el usuario cierre la alerta
          showConfirmButton: false//, // No muestra botón de confirmación
          // time: 4500
        });
      },
      url: "consulta_ruc_sunat_api.php",
      type: "POST",
      dataType: "json",
      data: { ruc: ruc },
      success: function (data2) {
        console.log(data2);
        valido = data2.success;
        razon = data2.razonSocial; // ✅ Accede al dato directamente
        direccion = data2.direccion; // ✅ Corrige el acceso a la dirección

        var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
        //console.log(data2.result.establecimientos);
        //console.log(data2.result.establecimientos.length);

        if (valido == "false") {
          alertify.error("error ruc no existe");
        } else {
          // $("#rz_cliente").val(razon.replace(pattern, ''));
          setTimeout(() => {
            Swal.close();
            $("#rz_cliente").val(razon);

            var firstTwoDigits = ruc.toString().substring(0, 2);
            if (firstTwoDigits === '10') {
              // $("#rp_cliente").val(razon.replace(pattern, ''));
              $("#razonSocial").val(razon);
              $("#tipo_contribuyente").val('01').trigger("change");
              $("#pone_pais_cli select").val('PE').trigger("change");
            }
            if (firstTwoDigits === '20') {
              $("#tipo_contribuyente").val('02').trigger("change");
              $("#direccion_cliente").val(direccion).prop('disabled', true);
              $("#pone_pais_cli select").val('PE').trigger("change");
              const jsonFileName = 'departamento.json';
              const jsonFileName2 = 'provincia.json';
              const jsonFileName3 = 'distritos.json';

              obtenerDatosJson(function (data) {
                if (data) {
                  console.log("Respuesta completa:", data2); // 🔍 Verifica la estructura de data2

                  const nombreABuscar = data2.departamento;
                  const infoUbigeo = obtenerCodigoUbigeo(data, nombreABuscar);

                  if (infoUbigeo) {
                    //console.log(`ID Ubigeo para ${nombreABuscar}: ${infoUbigeo.id_ubigeo}`);
                    //console.log(`Código Ubigeo para ${nombreABuscar}: ${infoUbigeo.codigo_ubigeo}`);

                    setTimeout(() => {
                      $("#pone_dpto_cli select").val(infoUbigeo.codigo_ubigeo).trigger("change");
                      obtenerDatosJson2(function (data) {
                        const idBuscado = infoUbigeo.id_ubigeo;
                        const nombreBuscado = data2.provincia;
                        if (data) {
                          const resultadoBusqueda = buscarPorIdYNombre(idBuscado, nombreBuscado, data);

                          if (resultadoBusqueda) {
                            data_ubig = infoUbigeo.codigo_ubigeo + resultadoBusqueda.codigo_ubigeo;
                            setTimeout(() => {
                              $("#pone_prov_cli select").val(data_ubig).trigger("change");
                              obtenerDatosJson3(function (data) {
                                const idBuscado2 = resultadoBusqueda.id_ubigeo;
                                const nombreBuscado2 = data2.distrito;
                                if (data) {
                                  const resultadoBusqueda2 = buscarPorIdYNombre(idBuscado2, nombreBuscado2, data);

                                  if (resultadoBusqueda2) {
                                    data_ubig2 = infoUbigeo.codigo_ubigeo + resultadoBusqueda.codigo_ubigeo + resultadoBusqueda2.codigo_ubigeo;
                                    setTimeout(() => {
                                      $("#pone_dist_cli select").val(data_ubig2).trigger("change");
                                    }, 1000);

                                    //console.log(`Resultado de la búsqueda para ID ${data_ubig2} y nombre ${nombreBuscado}:`, resultadoBusqueda2);
                                  } else {
                                    console.log("No se encontraron resultados para la búsqueda.");
                                  }
                                }
                              }, jsonFileName3);
                            }, 1000);

                            //console.log(`Resultado de la búsqueda para ID ${data_ubig} y nombre ${nombreBuscado}:`, resultadoBusqueda);

                          } else {
                            console.log("No se encontraron resultados para la búsqueda.");
                          }
                        }
                      }, jsonFileName2);
                    }, 1000);
                  } else {

                  }
                }
              }, jsonFileName);

            }
            $('.Establecimientos_sunat').removeClass('disabledTab');
            $('.Establecimientos_sunat').addClass('activeTab');

            $("#tabla_establecimientos_sunat  > tbody > tr ").remove();
            $('#agente_ret').val('Y').trigger("change");
            $('#agente_per').val('NO').trigger("change");
            $('#estado_ruc').val('02').trigger("change");
            $('#condicion_ruc').val('02').trigger("change");
            $('#buen_cont_ruc').val('NO').trigger("change");

            // for (var i = 0; i < data2.localesAnexos.length; i++) {
            //   var tr = `<tr>
            //     <td  class='center'>`+ data2.localesAnexos[i].codigo + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].cod_tipo + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].tipo + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].direccion + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].departamento + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].provincia + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].distrito + `</td>
            //     <td  class='center'>`+ data2.localesAnexos[i].activida_economica + `</td>
            //     <td class='center'>
            //     <button id='defaulttt' class="btn-toggle btn-toggle-off" type="button" onclick="toggleButton(this)">NO</button>
            //   </td>
            //   </tr>`;
            //   $("#tabla_establecimientos_sunat").append(tr)
            // }
            for (var i = 0; i < data2.localesAnexos.length; i++) {
              var tr = `<tr>
                <td  class='center'>`+ "-" + `</td>
                <td  class='center'>`+ "-" + `</td>
                <td  class='center'>`+ "-" + `</td>
                <td  class='center'>`+ data2.localesAnexos[i].direccion + `</td>
                <td  class='center'>`+ data2.localesAnexos[i].departamento + `</td>
                <td  class='center'>`+ data2.localesAnexos[i].provincia + `</td>
                <td  class='center'>`+ data2.localesAnexos[i].distrito + `</td>
                <td  class='center'>`+ "-" + `</td>
                <td style='display: none;' class='center'>`+ data2.localesAnexos[i].ubigeo + `</td>
                <td class='center'>
                <button id='defaulttt' class="btn-toggle btn-toggle-off" type="button" onclick="toggleButton(this)">NO</button>
              </td>
              </tr>`;
              $("#tabla_establecimientos_sunat").append(tr)
            }


            // ✅ Agente de Retención
            if (data2.EsAgenteRetencion === true) {
              $('#agente_ret').val('Y').trigger("change");
            } else {
              $('#agente_ret').val('N').trigger("change");
            }

            // ✅ Buen Contribuyente
            if (data2.EsBuenContribuyente === true) {
              $('#buen_cont_ruc').val('SI').trigger("change");
            } else {
              $('#buen_cont_ruc').val('NO').trigger("change");
            }

            // ✅ Estado y Condición
            if (data2.estado && data2.estado.toUpperCase() === "ACTIVO") {
              $('#estado_ruc').val('01').trigger("change");
            } else {
              $('#estado_ruc').val('02').trigger("change"); // Si no es ACTIVO, asigna otro valor
            }

            if (data2.condicion && data2.condicion.toUpperCase() === "HABIDO") {
              $('#condicion_ruc').val('01').trigger("change");
            } else {
              $('#condicion_ruc').val('02').trigger("change"); // Si no es HABIDO, asigna otro valor
            }

          }, 1600);
        }
      },
      error: function (jqXHR, estado, error) { },
    });
  }

}

function toggleButton(button) {
  const buttons = document.querySelectorAll(".btn-toggle");

  // Desactivar todos los botones
  buttons.forEach((btn) => {
    if (btn !== button) {
      btn.classList.remove("btn-toggle-on");
      btn.classList.add("btn-toggle-off");
      btn.textContent = "NO";
    }
  });

  // Cambiar estado y texto del botón seleccionado
  button.classList.toggle("btn-toggle-on");
  button.classList.toggle("btn-toggle-off");

  if (button.classList.contains("btn-toggle-on")) {
    button.textContent = "SI";
  } else {
    button.textContent = "NO";
  }
}

function listar_clientes_reg() {
  $.ajax({
    url: "lista_clientes_cotizacion.php",

    type: "POST",
    data: null,
    success: function (x) {
      $("#idcliente_credito").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

$(document).on("change", "#idcliente_credito select", function () {
  var id = this.value.split("|");
  $("#idcliente_razon").val(id[1]);
  $("#idcliente_ruc").val(id[2]);
  $("#tipocliente").val(id[3]);
  $("#lineacredito").val(id[4]);
  $("#salpendiente").val(id[5]);
  $("#lin_disponible").val(id[6]);
  $("#btn-add-product").attr("disabled", false);
});

function lista_vendedores_clie() {
  $.ajax({
    beforeSend: function () {
      $("#pone_vendedores_cli").html("Recuperando proveedores...");
    },
    url: "pone_vendedores_cotizacion.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#pone_vendedores_cli").html(x);
      //console.log(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_pais_clie() {
  $.ajax({
    beforeSend: function () {
      $("#pone_pais_cli").html("Recuperando proveedores...");
    },
    url: "pone_pais_cotizacion.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#pone_pais_cli").html(x);

      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

$(document).on("change", "#pone_pais_cli select", function () {
  var id = this.value;
  if (id === "PE") {
    $.ajax({
      beforeSend: function () {
        $("#pone_dpto_cli").html("Recuperando proveedores...");
      },
      url: "pone_departamento_cotizacion.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_dpto_cli").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
    $("#pone_dpto_cli").removeClass("disabledTab");
    $("#pone_dpto_cli").addClass("activeTab");
    $("#pone_prov_cli").removeClass("disabledTab");
    $("#pone_prov_cli").addClass("activeTab");
    $("#pone_dist_cli").removeClass("disabledTab");
    $("#pone_dist_cli").addClass("activeTab");
    $("#dpto_cliente").removeClass("activeTab");
    $("#dpto_cliente").addClass("disabledTab");
    $("#prov_cliente").removeClass("activeTab");
    $("#prov_cliente").addClass("disabledTab");
    $("#dist_cliente").removeClass("activeTab");
    $("#dist_cliente").addClass("disabledTab");
  } else {
    $("#pone_dpto_cli").removeClass("activeTab");
    $("#pone_dpto_cli").addClass("disabledTab");
    $("#dpto_cliente").removeClass("activeTab");
    $("#dpto_cliente").addClass("disabledTab");
    $("#prov_cliente").removeClass("activeTab");
    $("#prov_cliente").addClass("disabledTab");
    $("#dist_cliente").removeClass("activeTab");
    $("#dist_cliente").addClass("disabledTab");
  }
});

$(document).on("change", "#pone_dpto_cli select", function () {
  var id = this.value;
  $.ajax({
    beforeSend: function () {
      $("#pone_prov_cli").html("Recuperando proveedores...");
    },
    url: "pone_provincia_cotizacion.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#pone_prov_cli").html(x);

      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
});

$(document).on("change", "#pone_prov_cli select", function () {
  var id = this.value;
  $.ajax({
    beforeSend: function () {
      $("#pone_dist_cli").html("Recuperando proveedores...");
    },
    url: "pone_distrito_cotizacion.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#pone_dist_cli").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
});

function procesa_socio_negocio_web() {
  $(document).ready(function () {

    let errores = []; // Lista de errores
    let camposIncompletos = []; // Para resaltar los campos en rojo

    let ruc_cliente = $("#ruc_cliente").val();
    let lista_grop = $("#lista_grop").val();
    let lista_subgrop = $("#lista_subgrop").val();

    // Verificar si la tabla tiene filas en <tbody>
    // let tablaVacia = $("#tabla_establecimientos_sunat > tbody > tr").length === 0;

    // Resetear estilos antes de validar
    $(".error-input").removeClass("error-input");
    $(".error-box").removeClass("error-box");

    // Validaciones individuales
    if (!ruc_cliente || ruc_cliente === '') {
      errores.push("Falta colocar el RUC.");
      camposIncompletos.push("#ruc_cliente");
    }

    if (!lista_grop || lista_grop === '') {
      errores.push("Falta seleccionar el Grupo.");
      camposIncompletos.push("#pone_groupname");
    }

    if (!lista_subgrop || lista_subgrop === '') {
      errores.push("Falta seleccionar el SubGrupo.");
      camposIncompletos.push("#pone_subgroupname");
    }

    // if (tablaVacia) {
    //   errores.push("La tabla de Estblecimientos esta vacio.");
    //   $("#tabla_establecimientos_sunat").closest(".box.box-primary").addClass("error-box");
    // }

    // Si hay errores, mostrar SweetAlert y resaltar los campos
    if (errores.length > 0) {
      // Pintar los campos vacíos de rojo
      camposIncompletos.forEach(selector => {
        $(selector).addClass("error-input");
      });

      // Mostrar alerta con todos los errores a la vez
      Swal.fire({
        title: "¡Campos incompletos!",
        html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
        icon: "error",
        timer: 3000, // Se cierra automáticamente en 3 segundos
        showConfirmButton: false,
        toast: false,
        position: "center"
      });

      return false; // Evitar que continúe la acción
    }

    let band = true;

    ejecutarSocioNegocio(band);
  });
}

function ejecutarSocioNegocio(band) {

  if (!band) return; // Si 'band' es falso, no hace nada

  let rucCliente = $("#ruc_cliente").val();
  let cardcode = "C" + rucCliente;

  // Luego usarla dentro del objeto
  let socioWebData = {
    cardcode: cardcode,
    ruc_cliente: rucCliente,
    razon_social: quitarAcentos($("#rz_cliente").val()),
    tipo_contribuyente: $("#tipo_contribuyente").val(),
    nombre_cliente: quitarAcentos($("#nombre_cliente").val()),
    priapellido_cliente: quitarAcentos($("#priapellido_cliente").val()),
    segapellido_cliente: quitarAcentos($("#segapellido_cliente").val()),
    pone_vendedores_cli: $("#pone_vendedores_cli select").val(),
    rp_cliente: quitarAcentos($("#rp_cliente").val()),
    tel_cliente: $("#tel_cliente").val(),
    cel_cliente: $("#cel_cliente").val(),
    email_cliente: quitarAcentos($("#email_cliente").val()),
    pone_pais_cli: $("#pone_pais_cli select").val(),
    pone_dpto_cli: $("#pone_dpto_cli select").val(),
    pone_prov_cli: $("#pone_prov_cli select").val(),
    pone_dist_cli: $("#pone_dist_cli select").val(),
    direccion_cliente: quitarAcentos($("#direccion_cliente").val()),
    agente_ret: $("#agente_ret").val(),
    agente_per: $("#agente_per").val(),
    estado_ruc: $("#estado_ruc").val(),
    condicion_ruc: $("#condicion_ruc").val(),
    buen_cont_ruc: $("#buen_cont_ruc").val(),
    lista_grop: $("#lista_grop").val(),
    lista_subgrop: $("#lista_subgrop").val(),
    establecimientos: [], // Aquí se almacenarán los establecimientos de la tabla
    BPAddresses: [] // Aquí se agregarán las direcciones de la tabla
  };

  // **Recorrer las filas de la tabla para agregar direcciones al JSON**
  $("#tabla_establecimientos_sunat > tbody > tr").each(function () {

    let direccion = $(this).find("td").eq(3).html();
    // let departamento = $(this).find("td").eq(4).html();
    let provincia = $(this).find("td").eq(5).html();
    let distrito = $(this).find("td").eq(6).html();
    // let ubigeo = $(this).find("td").eq(8).html();
    let ubigeo = $(this).find("td").eq(8).html().trim();
    let departamento = ubigeo.substring(0, 2);

    // Agregar cada dirección al arreglo BPAddresses
    socioWebData.BPAddresses.push({
      AddressName: direccion,     // Nombre de la dirección
      Street: direccion,          // Dirección
      ZipCode: ubigeo,         // Provincia
      distrito: distrito,         // Provincia
      // Block: departamento,     // Departamento
      // City: provincia,         // Provincia
      provincia: provincia,        // Distrito
      departamento: departamento        // Distrito
    });

    // También puedes agregar los establecimientos si es necesario
    let codigo = parseInt($(this).find("td").eq(0).html());
    let codtype = parseInt($(this).find("td").eq(1).html());
    let tipo = parseInt($(this).find("td").eq(2).html());
    let avtividad_eco = parseInt($(this).find("td").eq(7).html());

    // Agregar los establecimientos al array de items
    socioWebData.establecimientos.push({
      codigo: codigo,
      codtype: codtype,
      tipo: tipo,
      direccion: direccion,
      departamento: departamento,
      provincia: provincia,
      distrito: distrito,
      actividad_eco: avtividad_eco
    });

  });

  console.log("Socio de Negocio Generado: ", socioWebData);

  $.ajax({
    beforeSend: function () {
      // Mostrar el loader antes de enviar la solicitud
      Swal.fire({
        title: "Migrando Socio de Negocio a SAP...",
        html: '<div class="spinner"></div>',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta
        showConfirmButton: false // No muestra botón de confirmación
      });
    },
    url: "server_layer_crear_socio_negocio.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(socioWebData),
    success: function (response) {

      console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?
      try {
        let res = typeof response === "string" ? JSON.parse(response) : response;

        Swal.close();

        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Socio de Negocio registrado",
            // text: `Se ha insertado el socio de negocio con éxito .\nCardCode: ${res.CardCode}`,
            text: `Se ha insertado el socio de negocio con éxito.`,
            timer: 2000,
            showConfirmButton: false
          });



        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message || "Ocurrió un error desconocido",
          });
        }
      } catch (error) {
        console.error("Error al procesar respuesta JSON:", error);
      }
    },

    error: function (jqXHR, estado, error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
        confirmButtonText: "Cerrar"
      });
      console.error("Error AJAX:", estado, error);
    }

  });
}


function agregar_cliente() {
  //console.log("ENTROSS");
  ruc_cliente = $("#ruc_cliente").val();
  razon_social = quitarAcentos($("#rz_cliente").val());
  tipo_contribuyente = $("#tipo_contribuyente").val();
  nombre_cliente = quitarAcentos($("#nombre_cliente").val());
  priapellido_cliente = quitarAcentos($("#priapellido_cliente").val());
  segapellido_cliente = quitarAcentos($("#segapellido_cliente").val());
  pone_vendedores_cli = $("#pone_vendedores_cli select").val();
  rp_cliente = quitarAcentos($("#rp_cliente").val());
  tel_cliente = $("#tel_cliente").val();
  cel_cliente = $("#cel_cliente").val();
  email_cliente = quitarAcentos($("#email_cliente").val());
  pone_pais_cli = $("#pone_pais_cli select").val();
  pone_dpto_cli = $("#pone_dpto_cli select").val();
  pone_prov_cli = $("#pone_prov_cli select").val();
  pone_dist_cli = $("#pone_dist_cli select").val();
  direccion_cliente = quitarAcentos($("#direccion_cliente").val());
  agente_ret = $("#agente_ret").val();
  agente_per = $("#agente_per").val();
  estado_ruc = $("#estado_ruc").val();
  condicion_ruc = $("#condicion_ruc").val();
  buen_cont_ruc = $("#buen_cont_ruc").val();
  lista_grop = $("#lista_grop").val();

  bandera = true;
  if (ruc_cliente === "") {
    bandera = false;
    valida_cliente("ruc_cliente", false, "Por favor, ingresa un Ruc válido.");
  } else {
    valida_cliente("ruc_cliente", true, "");
  }
  if (razon_social === "") {
    bandera = false;
    valida_cliente(
      "rz_cliente",
      false,
      "Por favor, ingresa un Razon Social válido."
    );
  } else {
    valida_cliente("rz_cliente", true, "");
  }
  if (pone_vendedores_cli === "-1") {
    bandera = false;
    valida_cliente(
      "pone_vendedores_cli",
      false,
      "Por favor,Elije un Vendedor válido."
    );
  } else {
    valida_cliente("pone_vendedores_cli", true, "");
  }
  if (tipo_contribuyente === "") {
    bandera = false;
    valida_cliente(
      "tipo_contribuyente",
      false,
      "Por favor,Elije un Tipo Contribuyente válido."
    );
  } else {
    valida_cliente("tipo_contribuyente", true, "");
  }
  if (pone_pais_cli === "") {
    bandera = false;
    valida_cliente(
      "pone_pais_cli",
      false,
      "Por favor,Elije un Tipo Contribuyente válido."
    );
  } else {
    valida_cliente("pone_pais_cli", true, "");
  }
  if (lista_grop === "") {
    bandera = false;
    alertify.error("Por favor Eliga un GroupName");
  } else {
    valida_cliente("lista_grop", true, "");
  }
  if (pone_dpto_cli === "") {
    bandera = false;
    alertify.error("Por favor Eliga un Departamento");
  }
  if (pone_prov_cli === "") {
    bandera = false;
    alertify.error("Por favor Eliga una Provincia");
  }
  if (pone_dist_cli === "") {
    bandera = false;
    alertify.error("Por favor Eliga un Distrito");
  }
  if (tipo_contribuyente === '01') {

    if (nombre_cliente === '') {
      alertify.error('Es Persona Natural Porfavor Escriba Nombres')
      bandera = false;
    }
    if (priapellido_cliente === '') {
      alertify.error('Es Persona Natural Porfavor Escriba Primer Apellido')
      bandera = false;
    }
    if (segapellido_cliente === '') {
      alertify.error('Es Persona Natural Porfavor Escriba Segundo Apellido')
      bandera = false;
    }
  }
  if (bandera === true) {
    //agregar_cliente_establecimiento(ruc_cliente);
    $.post(
      "registrar_cliente_web.php",
      {
        ruc_cliente,
        razon_social,
        tipo_contribuyente,
        nombre_cliente,
        priapellido_cliente,
        segapellido_cliente,
        pone_vendedores_cli,
        rp_cliente,
        tel_cliente,
        cel_cliente,
        email_cliente,
        pone_pais_cli,
        pone_dpto_cli,
        pone_prov_cli,
        pone_dist_cli,
        direccion_cliente,
        agente_ret,
        agente_per,
        estado_ruc,
        condicion_ruc,
        buen_cont_ruc,
        lista_grop,
      },
      function (dat2) {
        global = parseInt(dat2);
        //console.log(global);
        if (global == 0) {
          swal("No Inserto!", "Cliente No Inserto", "error");
        } else if (global == -1) {
          swal("No Inserto!", "Cliente Existe en la WEB", "error");
        } else if (global == -2) {
          swal("No Inserto!", "Cliente Existe en SAP", "error");
        } else {
          $("#modal_crear_cliente").modal("hide");

          //listar_clientes_reg();
          agregar_cliente_establecimiento(ruc_cliente, global);
          swal("Inserto!", "Cliente Inserto", "success");
          limpiar_cliente();
        }
      }
    );
  }
}

function agregar_cliente_establecimiento(ruc_cliente, global) {
  //console.log('1');
  $("#tabla_establecimientos_sunat > tbody > tr").each(function () {
    console.log("1");
    codigo = $(this).find("td").eq(0).html();
    cod_tipo = $(this).find("td").eq(1).html();
    tipo = $(this).find("td").eq(2).html();
    direccion = quitarAcentos($(this).find("td").eq(3).html());
    departamento = quitarAcentos($(this).find("td").eq(4).html());
    provincia = quitarAcentos($(this).find("td").eq(5).html());
    distrito = quitarAcentos($(this).find("td").eq(6).html());
    actividad_eco = quitarAcentos($(this).find("td").eq(7).html());
    default1 = quitarAcentos(
      $(this).find("td").eq(8).find("#defaulttt").html()
    );

    $.ajax({
      beforeSend: function () { },
      url: "registrar_cliente_web_establecimiento.php",
      type: "POST",
      data: {
        codigo,
        cod_tipo,
        tipo,
        direccion,
        departamento,
        provincia,
        distrito,
        actividad_eco,
        ruc_cliente,
        global,
      },
      success: function (data) { },
      error: function (jqXHR, estado, error) {
        // $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  });
}

function valida_cliente(id, desicion, mensaje) {
  if (desicion == false) {
    $("#" + id).css("border-color", "red");
    $("#" + id).css("color", "red");
    $("#" + id + "-error")
      .text(mensaje)
      .css("color", "red");
    $('label[for="' + id + '"]').css("color", "red");
    $("#" + id + "-icon")
      .removeClass("fa-check")
      .addClass("fa-times")
      .css("color", "red");
  } else {
    $("#" + id).css("border-color", "green");
    $("#" + id).css("color", "green");
    $("#" + id + "-error")
      .text("")
      .css("color", "none");
    $('label[for="' + id + '"]').css("color", "green");
    $("#" + id + "-icon")
      .removeClass("fa-times")
      .addClass("fa-check")
      .css("color", "green");
  }
}


function limpiar_cliente() {
  $("#pone_pais_cli select").val("PE").trigger("change");
  $("#pone_prov_cli select").val("").trigger("change");
  $("#pone_vendedores_cli select").val("-1").trigger("change");
  $("#rz_cliente").val();
  $("#ruc_cliente").val();
  $("#nombre_cliente").val();
  $("#priapellido_cliente").val();
  $("#segapellido_cliente").val();
  $("#rp_cliente").val();
  $("#tel_cliente").val();
  $("#email_cliente").val();
  $("#direccion_cliente").val();
  $("#tabla_establecimientos_sunat  > tbody > tr").remove();
}

class Excel {
  constructor(content) {
    this.content = content;
  }

  header() {
    return this.content[0];
  }

  rows() {
    return new RowCollection(this.content.slice(1, this.content.length));
  }
}

class RowCollection {
  constructor(rows) {
    this.rows = rows;
  }

  first() {
    return new Row(this.rows[0]);
  }

  get(index) {
    return new Row(this.rows[index]);
  }

  count() {
    return this.rows.length;
  }

  whereCountry(countryName) { }
}

class Row {
  constructor(row) {
    this.row = row;
  }

  cod_prod() {
    return this.row[0];
  }

  descripcion() {
    return this.row[1];
  }

  marca() {
    return this.row[2];
  }

  catalogo() {
    return this.row[3];
  }
  unidad() {
    return this.row[4];
  }
  cantidad() {
    return this.row[5];
  }
  precio_unitario() {
    return this.row[6];
  }
  descuento() {
    return this.row[7];
  }
  monto() {
    return this.row[8];
  }
  plazo_entrega() {
    return this.row[9];
  }
}

class ExcelPrinter {
  static print(tableId, excel) {
    const table = document.getElementById(tableId);
    /* excel.header().forEach(title => {
        table.querySelector("thead>tr").innerHTML+=`<td>${title}</td>`
    })
*/
    for (let index = 0; index < excel.rows().count(); index++) {
      const row = excel.rows().get(index);
      table.querySelector("tbody").innerHTML += `
               <tr>
               <td>${index + 1}</td>
               <td>${row.cod_prod()}</td>
               <td>${row.descripcion()}</td>
               <td>${row.marca()}</td>
               <td>${row.catalogo()}</td>
               <td>${row.unidad()}</td>
               <td>${row.cantidad()}</td>
               <td>${row.precio_unitario()}</td>
               <td>${row.descuento()}</td>
               <td>${row.monto()}</td>
               <td style='display:none'> </td>
               <td style='display:none'> </td>
               <td>${row.plazo_entrega()}</td>
               <td style='display:none'> </td>
               <td class='center'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button><button onclick='editar_producto(${index + 1
        });' class='btn  btn-warning btn-xs'><i class='fa fa-edit bigger-120'></i></button></td>
            </tr>   
          `;
      //console.log(row.name());
    }
  }
}

// const excelInput = document.getElementById('excel-input')
// excelInput.addEventListener('change', async function () {
//   const content = await readXlsxFile(excelInput.files[0])
//   const excel = new Excel(content)

//   ExcelPrinter.print("tabla_articulos", excel);
//   $('#tabla_articulos').DataTable();
//   resumen();
// })

// function importar_excel() {
//   var miCheckbox = document.getElementById('miElementoCheckbox');

//   if (miCheckbox.checked) {
//     $('.excel').removeClass('disabledTab');
//     $('.excel').addClass('activeTab');
//   } else {
//     $('.excel').removeClass('activeTab');
//     $('.excel').addClass('disabledTab');
//   }

//   miCheckbox.addEventListener('click', function () {
//     if (miCheckbox.checked) {
//       $('.excel').removeClass('disabledTab');
//       $('.excel').addClass('activeTab');
//     } else {
//       $('.excel').removeClass('activeTab');
//       $('.excel').addClass('disabledTab');
//     }
//   });

// }

$(document).on("click", "#cotizacion_seg", function () {
  det = document.querySelectorAll("#cotizacion_seg:checked").length;
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {
      $("#enviar").removeClass("disabledTab");
      $("#enviar").addClass("activeTab");
    } else {
      $("#enviar").removeClass("activeTab");
      $("#enviar").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $("#enviar").removeClass("disabledTab");
      $("#enviar").addClass("activeTab");
    } else {
      $("#enviar").removeClass("activeTab");
      $("#enviar").addClass("disabledTab");
    }
  }
});

function add_art_add() {
  $("#modal_busqueda_arts").modal("toggle");

  let codigo = '';

  // Recorremos el array 'line2' y unimos sus elementos con una coma
  line2.forEach(function (item) {
    codigo += item + ",";  // Concatenamos cada código seguido de una coma
  });

  // Eliminar la última coma extra, si existe
  if (codigo.endsWith(",")) {
    codigo = codigo.slice(0, -1);
  }

  codigo = line2.toString();

  $("#codigo").val(codigo);
  busca_articulo_add();
}

function busca_articulo_add() {
  $(document).ready(function () {
    var cod = $("#codigo").val().toString();
    var tipcli = $("#tipocliente_mod").val().trim();
    var cmoneda = $("#lista_cmoneda option:selected").val();
    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo").html("Buscando informacion del articulo...");
          },
          url: "busca_data_articulo_pventa.php",
          dataType: "json",
          type: "POST",
          data: {
            codigo: $("#codigo").val().toString(),
            idcliente_credito: $("#idcliente_credito").val(),
            cmoneda: cmoneda,
          },
          success: function (data) {
            //console.log(data);

            if (data == 0) {
              var n = noty({
                text: "No existe el articulo...!",
                theme: "relax",
                layout: "center",
                type: "error",
                timeout: 2000,
              });
            } else {
              for (let i = 0; i < data.length; i++) {
                fil = ultimo_valor_fila();
                if (fil === 0) {
                  // $("#tabla_articulos_mod > tbody > tr > td").remove();
                  $("#tabla_articulos > tbody > tr > td").remove();
                }
                var num = ultimo_valor_fila() + 1;

                precio = parseFloat(data[i].precio).toFixed(4);
                precio_igv = precio * 1.18;
                precioigv_parse = parseFloat(precio_igv).toFixed(4);
                li = parseFloat(num - 1).toFixed(0);
                // $("#tabla_articulos > tbody").append("<tr><td class='center'>" + num + "</td>" +
                var htmlString =
                  "<tr><td class='row-number center'>" +
                  num +
                  "</td>";
                if (data[i].ItemCode.substring(0, 3) === "KIT") {
                  // Si es "KIT", mostramos el botón
                  htmlString +=
                    "<td class='center' style=''><button class='btn btn-secondary' style='color: black; font-size: 12px;' onclick='buscar_detalle_kit1(\"" + data[i].ItemCode + "\");'>" +
                    data[i].ItemCode +
                    "</button></td>";
                } else {
                  // Si no es "KIT", solo mostramos el ItemCode sin botón
                  htmlString +=
                    "<td class='center' style=''>" +
                    data[i].ItemCode +
                    "</td>";
                }
                // "<td class='center' style=''>" +
                // data[i].ItemCode +
                // "</td>";
                if (
                  data[i].ItemCode === "21004147" ||
                  data[i].ItemCode === "21004146"
                ) {
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='descripcion' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].descripcion +
                    "'></td>";
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='marca' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].Fabricante +
                    "'></td>";
                  htmlString +=
                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='catalogo' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                    data[i].Catalogo +
                    "'></td>";
                } else {
                  htmlString +=
                    "<td class='center'>" + data[i].descripcion + "</td>";
                  htmlString +=
                    "<td class='center'>" + data[i].Fabricante + "</td>";
                  htmlString +=
                    "<td class='center'>" + data[i].Catalogo + "</td>";
                }
                //"<td class='center'>" + data[0].Catalogo + "</td>"+
                htmlString +=
                  "<td class='center'>" +
                  data[i].unidad_medida +
                  "</td>" +
                  "<td class='center'>" +
                  parseFloat(data[i].STOCK).toFixed(0) +
                  "</td>" +
                  "<td class='center'>" +
                  parseFloat(data[i].STOCK_COMPROMETIDO).toFixed(0) +
                  "</td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='cantidad_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item(this," +
                  li +
                  ")'  onchange='calcular_total_item(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='precio_uni'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onchange='calcular_total_item(this," +
                  li +
                  ");calcular_precio_igv(this," +
                  li +
                  ")' onkeyup='calcular_total_item(this," +
                  li +
                  ");calcular_precio_igv(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='descuento_item'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0'  onkeyup='detectarEnter(event,this," +
                  li +
                  ")' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='precio_decuento'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;'disabled value='" +
                  precio +
                  "' onkeyup='calcular_dscto_item(this," +
                  li +
                  ")'  onchange='calcular_dscto_item(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +
                  "<td style='text-align:right;display:none'><input type='text'  class='form-control pull-right' id='precio_igv'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='" +
                  precioigv_parse +
                  "' onkeyup='calcular_total_item(this," +
                  li +
                  ")'  onchange='calcular_total_item(this," +
                  li +
                  ")' ></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='monto_item'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot(this," +
                  li +
                  ")'  onchange='calcular_monto_tot(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:right ;display:none'><input type='text'  class='form-control pull-right' id='monto_final'  autocomplete='off' style='font-size: 12px; text-align:right; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item(this," + li + ")'  onchange='calcular_total_item(this," + li + ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right plazoEntrega_item' id='plazoEntrega_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-sm delete rounded-circle'><i class='fa fa-trash'></i></button></td>" +
                  "<td class='center' style='display:none'>" +
                  precio +
                  "</td>" +
                  "<td style='text-align:center'><input type='text' class='form-control pull-right detalle_art' id='detalle_art' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                  "<td style='text-align:center ;display:none'><input type='text'  class='form-control pull-right detalle_art2' id='EsParteKIT'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='N' disabled></td>";
                $("#tabla_articulos > tbody").append(htmlString);
                $("#btn-procesa").prop("disabled", false);
                $('#tabla_articulos tbody tr:last input[type="text"]').first().focus();

                if (data[0].cantidad2 <= 0) {
                  var n = noty({
                    text: "No hay suficiente existencia...!",
                    theme: "relax",
                    layout: "center",
                    type: "information",
                    timeout: 2000,
                  });

                  $("#cantidad2").focus();
                }
              }
            }
          },

          error: function (jqXHR, estado, error) {
            // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
            var n = noty({
              text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
              theme: "relax",
              layout: "center",
              type: "error",
              timeout: 2000,
            });
            //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
          },
        });
      });
    } else {
    }
  });
}

function validar_numero(event) {
  console.log(event);
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    alertify.error('No puede ingresar letras');
    return false;
  }
  return true;
}

function calcular_monto_tot_1(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[8]
      .children[0].value
  );
  monto_final = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[14]
      .children[0].value
  );
  precio_linea = parseFloat(precio * cantidad * 1.18);

  dcto = parseFloat(
    ((precio_linea - monto_final) / precio_linea) * 100
  ).toFixed(4);
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dcto / 100)
  ).toFixed(4);
  var precio_cigv = parseFloat(
    (cantidad * precio - cantidad * precio * (dcto / 100)) / (cantidad / 1.18)
  ).toFixed(4);
  var precio_sigv = parseFloat(
    (cantidad * precio - cantidad * precio * (dcto / 100)) / (cantidad)
  ).toFixed(4);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = precio_cigv;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[11].children[0].value = precio_sigv;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[10].children[0].value = dcto;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = monto;
  //calcular_total_item(input,linea)
  resumen();
}
function calcular_monto_tot(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[8]
      .children[0].value
  );
  monto_final = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[13]
      .children[0].value
  );
  precio_linea = parseFloat(precio * cantidad);

  dcto = parseFloat(
    ((precio_linea - monto_final) / precio_linea) * 100
  ).toFixed(4);
  //   xd =  cantidad * precio - cantidad * precio * (dcto / 100)
  // console.log(xd);
  var monto = parseFloat(
    monto_final * 1.18
  ).toFixed(2);
  var precio_cigv = parseFloat(
    ((monto_final) / (cantidad)) * 1.18
  ).toFixed(4);
  var precio_sigv = parseFloat(
    (monto_final) / (cantidad)
  ).toFixed(4);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = precio_cigv;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[11].children[0].value = precio_sigv;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[10].children[0].value = dcto;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[14].children[0].value = monto;
  //calcular_total_item(input,linea)
  resumen();
}
function calcular_monto_tot2(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  monto_final = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[15]
      .children[0].value
  );

  precio_linea = parseFloat(precio * cantidad);


  dcto = parseFloat(
    ((precio_linea - monto_final) / precio_linea) * 100
  ).toFixed(2);

  let precio_unitario = parseFloat(monto_final / cantidad + monto_final / cantidad * dcto / 100).toFixed(4);
  //   xd =  cantidad * precio - cantidad * precio * (dcto / 100)

  var monto = parseFloat(
    monto_final * 1.18
  ).toFixed(2);
  var precio_cigv = parseFloat(
    ((monto_final) / (cantidad)) * 1.18
  ).toFixed(4);
  var precio_sigv = parseFloat(
    (monto_final) / (cantidad)
  ).toFixed(4);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[14].children[0].value = precio_cigv;
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = precio_sigv;
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = dcto;
  // $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
  //   "td"
  // )[11].children[0].value = precio_unitario;
  // $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
  //   "td"
  // )[17].children[0].value = monto;
  //calcular_total_item(input,linea)
  resumen_mod();
}

function calcular_monto_tot2_otro(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  monto_final = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[15]
      .children[0].value
  );

  precio_linea = parseFloat(precio * cantidad);


  dcto = parseFloat(
    ((precio_linea - monto_final) / precio_linea) * 100
  ).toFixed(2);

  let precio_unitario = parseFloat(monto_final / cantidad + monto_final / cantidad * dcto / 100).toFixed(4);
  //   xd =  cantidad * precio - cantidad * precio * (dcto / 100)

  var monto = parseFloat(
    monto_final * 1.18
  ).toFixed(2);
  var precio_cigv = parseFloat(
    ((monto_final) / (cantidad)) * 1.18
  ).toFixed(4);
  var precio_sigv = parseFloat(
    (monto_final) / (cantidad)
  ).toFixed(4);
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[14].children[0].value = precio_cigv;
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = precio_sigv;
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = dcto;
  // $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
  //   "td"
  // )[11].children[0].value = precio_unitario;
  // $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
  //   "td"
  // )[17].children[0].value = monto;
  //calcular_total_item(input,linea)
  resumen_mod_otro();
}

function calcular_monto_tot3(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  monto_final = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[14]
      .children[0].value
  );
  precio_linea = parseFloat(precio * cantidad);
  //   xd =  cantidad * precio - cantidad * precio * (dcto / 100)
  // console.log(xd);
  dcto = parseFloat(
    ((precio_linea - monto_final) / precio_linea) * 100
  ).toFixed(4);
  var monto = parseFloat(
    monto_final * 1.18
  ).toFixed(2);
  var precio_cigv = parseFloat(
    ((monto_final) / (cantidad)) * 1.18
  ).toFixed(4);
  var precio_sigv = parseFloat(
    (monto_final) / (cantidad)
  ).toFixed(4);
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = precio_cigv;
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = precio_sigv;
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[11].children[0].value = dcto;
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[15].children[0].value = monto;
  //calcular_total_item(input,linea)
  resumen_proc();
}

function calcular_total_item(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[8]
      .children[0].value
  );
  dsctoline = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(4);
  var preciii = parseFloat(precio * 1.18 - (precio * 1.18 * dsctoline) / 100);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = monto;
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = parseFloat(preciii).toFixed(4);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[14].children[0].value = parseFloat(monto * 1.18).toFixed(4);
  resumen();
}

function calcular_dscto_item(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  precio_dscto = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  ).toFixed(4);
  descuento = parseFloat(((precio - precio_dscto) / precio) * 100).toFixed(4);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[10].children[0].value = descuento;
  calcular_total_item(input, linea);
}

function calcular_dscto_item2(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  precio_dscto = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  descuento = parseFloat(((precio - precio_dscto) / precio) * 100).toFixed(4);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[10].children[0].value = descuento;
  calcular_total_item2(input, linea);
}

function calcular_dscto_item2_otro(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  precio_dscto = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  descuento = parseFloat(((precio - precio_dscto) / precio) * 100).toFixed(4);
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[10].children[0].value = descuento;
  calcular_total_item2(input, linea);
}

function calcular_precio_igv(input, linea) {
  var fila = obtenerFila3(input);
  //console.log(fila);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  precio_igv = parseFloat(precio * 1.18).toFixed(4);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[11].children[0].value = precio_igv;
  resumen();
}

function calcular_total_item2(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  dsctoline = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[12]
      .children[0].value
  );
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(4);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[15].children[0].value = monto;
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[16].children[0].value = parseFloat(monto * 1.18).toFixed(4);
  resumen_mod();
}


function calcular_total_item2_otro(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  dsctoline = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[12]
      .children[0].value
  );
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(4);
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[15].children[0].value = monto;
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[16].children[0].value = parseFloat(monto * 1.18).toFixed(4);
  resumen_mod_otro();
}

function calcular_precio_igv2(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  precio_igv = parseFloat(precio * 1.18).toFixed(2);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = precio_igv;
  resumen_mod();
  console.log(precio_igv);
}

function calcular_precio_igv2_otro(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  precio_igv = parseFloat(precio * 1.18).toFixed(2);
  $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = precio_igv;
  resumen_mod();
  console.log(precio_igv);
}

function detectarEnter(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila(input);
    var valorInput = event.target.value;
    var multi_descuento = valorInput.split("+");

    if (multi_descuento === "") {
      var dsctoline1 = 0;
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 1) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 2) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = parseFloat(multi_descuento[1]);
      //calcular_total_item(linea)
    }
    var dsctoline = parseFloat(
      dsctoline1 + dsctoline2 - parseFloat((dsctoline1 * dsctoline2) / 100)
    ).toFixed(2);
    event.target.value = isNaN(dsctoline) ? 0 : dsctoline;
    calcular_total_item(input, linea);
  } else {
    var valorInput = event.target.value;
    var dsctoline = valorInput;
    if (valorInput.indexOf("+") == -1) {
      var fila = obtenerFila3(input);
      event.target.value = dsctoline;
      precio = parseFloat(
        $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9]
          .children[0].value
      );
      precio_igv = parseFloat(
        $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[12]
          .children[0].value
      );
      precio_nuev = parseFloat(precio - (precio * dsctoline) / 100);
      precioigv_nuev = parseFloat(precio_igv - (precio_igv * dsctoline) / 100);
      console.log(precio);
      console.log(precio_nuev);
      $($("#tabla_articulos").find("tbody > tr")[fila]).children(
        "td"
      )[11].children[0].value = parseFloat(precio_nuev).toFixed(4);
      $($("#tabla_articulos").find("tbody > tr")[fila]).children(
        "td"
      )[12].children[0].value = precioigv_nuev;
      calcular_total_item(input, linea);
    } else {
    }
  }
  //console.log(dsctoline);
}

function detectarEnter2(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila3(input);
    var valorInput = event.target.value;
    var multi_descuento = valorInput.split("+");

    if (multi_descuento === "") {
      var dsctoline1 = 0;
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 1) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 2) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = parseFloat(multi_descuento[1]);
      //calcular_total_item(linea)
    }
    var dsctoline = parseFloat(
      dsctoline1 + dsctoline2 - parseFloat((dsctoline1 * dsctoline2) / 100)
    ).toFixed(2);
    event.target.value = isNaN(dsctoline) ? 0 : dsctoline;
    calcular_total_item2(input, linea);
  } else {
    var valorInput = event.target.value;
    var fila = obtenerFila3(input);
    var dsctoline = valorInput;
    if (valorInput.indexOf("+") == -1) {
      event.target.value = dsctoline;

      precio = parseFloat(
        $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11]
          .children[0].value
      );
      precio_nuev = parseFloat(precio - (precio * dsctoline) / 100).toFixed(4);
      console.log(precio);
      console.log(precio_nuev);
      $($("#tabla_art_ped").find("tbody > tr")[fila]).children(
        "td"
      )[13].children[0].value = precio_nuev;
      calcular_total_item2(input, linea);
    } else {
    }
  }

  //console.log(dsctoline);
}

function detectarEnter2_otro(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila3(input);
    var valorInput = event.target.value;
    var multi_descuento = valorInput.split("+");

    if (multi_descuento === "") {
      var dsctoline1 = 0;
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 1) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 2) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = parseFloat(multi_descuento[1]);
      //calcular_total_item(linea)
    }
    var dsctoline = parseFloat(
      dsctoline1 + dsctoline2 - parseFloat((dsctoline1 * dsctoline2) / 100)
    ).toFixed(2);
    event.target.value = isNaN(dsctoline) ? 0 : dsctoline;
    calcular_total_item2_otro(input, linea);
  } else {
    var valorInput = event.target.value;
    var fila = obtenerFila3(input);
    var dsctoline = valorInput;
    if (valorInput.indexOf("+") == -1) {
      event.target.value = dsctoline;

      precio = parseFloat(
        $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children("td")[11]
          .children[0].value
      );
      precio_nuev = parseFloat(precio - (precio * dsctoline) / 100).toFixed(4);
      console.log(precio);
      console.log(precio_nuev);
      $($("#tabla_art_ped_otro").find("tbody > tr")[fila]).children(
        "td"
      )[13].children[0].value = precio_nuev;
      calcular_total_item2_otro(input, linea);
    } else {
    }
  }

  //console.log(dsctoline);
}

function poner_direcion_proc() {
  direccion = $("#pone_cdireccion_procesa select option:selected").text();

  if (direccion != "") {
    $("#cap_dicc1_procesa").val(direccion);
  } else {
    alert("no se selecciono nada.");
  }
}

$(document).on("keydown", "#cantidad_item3", function (e) {
  console.log("go");
  if (e.which === 113) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(2)").text();
    var name = $(this).closest("tr").find("td:nth-child(3)").text();
    var fila = $(this).closest("tr");
    var posicionDeFila = fila.index();

    console.log(posicionDeFila);
    $("#modal_stock_item3").modal("show");
    $("#cod_producto3").html(columna1Datos);
    $("#name_producto3").html(name);
    $("#numline_producto_almacen3").val(posicionDeFila);
    $.ajax({
      url: "consulta_stockalmacenes_procesa.php",
      type: "POST",
      data: { itemcode: columna1Datos },
      success: function (x) {
        $("#lista_stock3").html(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  }
});
function cambiarAlmacen3(fila) {
  $("#modal_stock_item3").modal("hide");
}
function cambiarAlmacen4(fila) {
  $("#modal_stock_item3").modal("hide");
}

$(document).on("keydown", "#cantidad_item", function (e) {
  console.log("go");
  if (e.which === 113) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(2)").text();
    var name = $(this).closest("tr").find("td:nth-child(3)").text();
    var fila = $(this).closest("tr");
    var posicionDeFila = fila.index();

    console.log(posicionDeFila);
    $("#modal_stock_item2").modal("show");
    $("#cod_producto2").html(columna1Datos);
    $("#name_producto2").html(name);
    $("#numline_producto_almacen2").val(posicionDeFila);
    $.ajax({
      url: "consulta_stockalmacenes_procesa1.php",
      type: "POST",
      data: { itemcode: columna1Datos },
      success: function (x) {
        $("#lista_stock2").html(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  }
});


$(document).on("keydown", "#tabla_art_ped tr td #cantidad_item2", function (e) {
  if (e.which === 113) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(4)").text();
    var name = $(this).closest("tr").find("td:nth-child(5)").text();
    var fila = $(this).closest("tr");
    var posicionDeFila = fila.index();

    console.log(posicionDeFila);
    $("#modal_stock_item0").modal("show");
    //$("#modal_stock_item2").data('bs.modal').options.keyboard = false;

    $("#cod_producto0").html(columna1Datos);
    $("#name_producto0").html(name);
    $("#numline_producto_almacen0").val(posicionDeFila);
    $.ajax({
      url: "consulta_stockalmacenes_procesa1_new.php",
      type: "POST",
      data: { itemcode: columna1Datos },
      success: function (x) {
        $("#lista_stock0").html(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  }
});





function cambiarAlmacen3(fila) {
  $("#modal_stock_item2").modal("hide");
}

$(document).on("keydown", "#tabla_art_proc tr td #precio_uni3", function (e) {
  if (e.which === 115) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(2)").text();
    var name = $(this).closest("tr").find("td:nth-child(3)").text();
    var fila = $(this).closest("tr");
    var posicionDeFila = fila.index();

    console.log(posicionDeFila);
    $("#modal_precio_item3").modal("show");
    $("#cod_producto_precio3").html(columna1Datos);
    $("#name_producto_precio3").html(name);
    $("#numline_producto_precio3").val(posicionDeFila);
  }

  $.ajax({
    url: "consulta_precioalmacenes3.php",
    type: "POST",
    data: { itemcode: columna1Datos },
    success: function (x) {
      $("#lista_precio3").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
});


$(document).on("keydown", "#tabla_articulos tr td #precio_uni", function (e) {
  if (e.which === 115) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(2)").text();
    var name = $(this).closest("tr").find("td:nth-child(3)").text();
    var fila = $(this).closest("tr");
    var posicionDeFila = fila.index();

    console.log(posicionDeFila);
    $("#modal_precio_item").modal("show");
    $("#cod_producto_precio").html(columna1Datos);
    $("#name_producto_precio").html(name);
    $("#numline_producto_precio").val(posicionDeFila);
  }

  $.ajax({
    url: "consulta_precioalmacenes1.php",
    type: "POST",
    data: { itemcode: columna1Datos },
    success: function (x) {
      $("#lista_precio").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
});



$(document).on("keydown", "#tabla_art_ped tr td #precio_uni2", function (e) {
  if (e.which === 115) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(4)").text();
    var name = $(this).closest("tr").find("td:nth-child(5)").text();
    var fila = $(this).closest("tr");
    var posicionDeFila = fila.index();

    console.log(posicionDeFila);
    $("#modal_precio_item").modal("show");
    $("#cod_producto_precio").html(columna1Datos);
    $("#name_producto_precio").html(name);
    $("#numline_producto_precio").val(posicionDeFila);
  }

  $.ajax({
    url: "consulta_precioalmacenes1.php",
    type: "POST",
    data: { itemcode: columna1Datos },
    success: function (x) {
      $("#lista_precio").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
});

// $(document).on("keydown", "#tabla_articulos tr td #precio_uni", function (e) {
//   if (e.which === 115) {
//     e.preventDefault();
//     var columna1Datos = $(this).closest("tr").find("td:nth-child(2)").text();
//     var name = $(this).closest("tr").find("td:nth-child(3)").text();
//     var fila = $(this).closest("tr");
//     var posicionDeFila = fila.index();

//     console.log(posicionDeFila);
//     $("#modal_precio_item2").modal("show");
//     $("#cod_producto_precio2").html(columna1Datos);
//     $("#name_producto_precio2").html(name);
//     $("#numline_producto_precio2").val(posicionDeFila);
//   }

//   $.ajax({
//     url: "consulta_precioalmacenes1.php",
//     type: "POST",
//     data: { itemcode: columna1Datos },
//     success: function (x) {
//       $("#lista_precio2").html(x);
//     },
//     error: function (jqXHR, estado, error) { },
//   });
// });
$(document).on("keydown", "#precio_uni3", function (e) {
  if (e.which === 117) {
    e.preventDefault();
    var columna1Datos = $(this).closest("tr").find("td:nth-child(2)").text();
    var name = $(this).closest("tr").find("td:nth-child(3)").text();

    console.log(name);
    $("#modal_precio_historico3").modal("show");
    $("#cod_producto_histo3").html(columna1Datos);
    $("#name_producto_histo3").html(name);
  }

  $.ajax({
    url: "consulta_historicoprecioalmacenes_procesa.php",
    type: "POST",
    data: { itemcode: columna1Datos },
    success: function (x) {
      $("#lista_preciohisto3").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
});



function cambiarAlmacen(fila) {
  var almacen = fila.querySelector("td[id]").id;
  numline = $("#numline_producto_almacen").val();
  console.log(almacen);
  //console.log("Precio recibido: " + precio);
  $($("#tabla_articulos").find("tbody > tr")[numline]).children(
    "td"
  )[14].children[0].value = almacen;

  //resumen();
  //calcular_total_item(input, numline)

  $("#modal_stock_item").modal("hide");
}

function cambiarAlmacen2(fila) {
  var almacen = fila.querySelector("td[id]").id;
  numline = $("#numline_producto_almacen2").val();
  console.log(almacen);
  //console.log("Precio recibido: " + precio);
  $($("#tabla_art_ped").find("tbody > tr")[numline]).children(
    "td"
  )[14].children[0].value = almacen;

  //resumen();
  //calcular_total_item(input, numline)

  $("#modal_stock_item").modal("hide");

  $("#modal_stock_item2").modal("hide");
}

function calcular_total_item3(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[9]
      .children[0].value
  );
  dsctoline = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[11]
      .children[0].value
  );
  var monto = parseFloat(
    cantidad * precio - cantidad * precio * (dsctoline / 100)
  ).toFixed(4);
  var precio_dscto = parseFloat(precio - precio * (dsctoline / 100)).toFixed(4);
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[14].children[0].value = monto;
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[15].children[0].value = parseFloat(monto * 1.18).toFixed(4);
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[12].children[0].value = parseFloat(precio_dscto).toFixed(4);
  resumen_proc();
}

function calcular_precio_igv3(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  precio_igv = parseFloat(precio * 1.18).toFixed(2);
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[13].children[0].value = precio_igv;
  resumen_proc();
  console.log(precio_igv);
}

function calcular_dscto_item3(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[10]
      .children[0].value
  );
  precio_dscto = parseFloat(
    $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[12]
      .children[0].value
  );
  descuento = parseFloat(((precio - precio_dscto) / precio) * 100).toFixed(4);
  $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
    "td"
  )[11].children[0].value = descuento;
  calcular_total_item3(input, linea);
}

function detectarEnter3(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila3(input);
    var valorInput = event.target.value;
    var multi_descuento = valorInput.split("+");

    if (multi_descuento === "") {
      var dsctoline1 = 0;
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 1) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 2) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = parseFloat(multi_descuento[1]);
    }
    var dsctoline = parseFloat(
      dsctoline1 + dsctoline2 - parseFloat((dsctoline1 * dsctoline2) / 100)
    ).toFixed(2);
    event.target.value = isNaN(dsctoline) ? 0 : dsctoline;
    calcular_total_item3(input, linea);
  } else {
    var valorInput = event.target.value;
    var fila = obtenerFila3(input);
    var dsctoline = valorInput;
    if (valorInput.indexOf("+") == -1) {
      event.target.value = dsctoline;

      precio = parseFloat(
        $($("#tabla_art_proc").find("tbody > tr")[fila]).children("td")[10]
          .children[0].value
      );
      precio_nuev = parseFloat(precio - (precio * dsctoline) / 100).toFixed(4);
      console.log(precio);
      console.log(precio_nuev);
      $($("#tabla_art_proc").find("tbody > tr")[fila]).children(
        "td"
      )[12].children[0].value = precio_nuev;
      calcular_total_item3(input, linea);
    } else {
    }
  }

  //console.log(dsctoline);
}

function obtenerFila3(elemento) {
  var index = $(elemento).closest("tr").index();
  //console.log(index);
  return index;
}
function obtenerFila(elemento) {
  // Navegar hacia arriba en la jerarquía DOM para encontrar la fila
  while (elemento && elemento.tagName !== "TR") {
    elemento = elemento.parentNode;
  }
  return elemento;
}

/* function detectarEnter2(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila2(input);
    var valorInput = event.target.value;
    var multi_descuento = valorInput.split('+');
 
    if (multi_descuento === '') {
      var dsctoline1 = 0;
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 1) {
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = 0;
    }
    if (multi_descuento.length == 2) {
      var dsctoline1 = parseFloat(multi_descuento[0])
      var dsctoline2 = parseFloat(multi_descuento[1])
      //calcular_total_item(linea)
    }
    var dsctoline = parseFloat((dsctoline1 + dsctoline2) - parseFloat(dsctoline1 * dsctoline2 / 100)).toFixed(2);
    event.target.value = dsctoline
    calcular_total_item2(linea)
  } else {
    var valorInput = event.target.value;
    var dsctoline = parseFloat(valorInput);
    if (valorInput.indexOf('+') == -1) {
      event.target.value = dsctoline
      calcular_total_item2(linea)
 
    } else {
 
    }
 
  }
  //console.log(dsctoline);
} */

function obtenerFila2(elemento) {
  // Navegar hacia arriba en la jerarquía DOM para encontrar la fila
  while (elemento && elemento.tagName !== "TR") {
    elemento = elemento.parentNode;
  }
  return elemento;
}

function actualizarCostos2() {
  var moneda_base = $("#monedaInicial2").val();
  var tc = $("#rate2").val();
  id = $("#cambioMoneda2").val();

  if (moneda_base == "USD" && id === "SOL") {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item2"]').val()
      );
      nuevo_monto = parseFloat(monto * tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni2"]').val()
      );
      nuevo_preciou = parseFloat(preciou * tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv2"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(4);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total2"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total * tc).toFixed(4);
      precio_unitario = parseFloat($(this).find("td").eq(22).html());
      nuevo_precio_unitario = parseFloat(precio_unitario * tc).toFixed(4);

      $(this).find("td").find('input[id="monto_item2"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni2"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv2"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total2"]').val(nuevo_monto_total);
      $(this).find("td").eq(22).html(nuevo_precio_unitario);

      resumen_mod();
    });
  }
  if (moneda_base == "SOL" && id === "USD") {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item2"]').val()
      );
      nuevo_monto = parseFloat(monto / tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni2"]').val()
      );
      nuevo_preciou = parseFloat(preciou / tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv2"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(4);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total2"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total / tc).toFixed(4);
      precio_unitario = parseFloat($(this).find("td").eq(22).html());
      nuevo_precio_unitario = parseFloat(precio_unitario / tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item2"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni2"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv2"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total2"]').val(nuevo_monto_total);
      $(this).find("td").eq(22).html(nuevo_precio_unitario);

      resumen_mod();
    });
  }
  if (moneda_base == "USD" && id === "USD") {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item2"]').val()
      );
      nuevo_monto = parseFloat(monto * tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni2"]').val()
      );
      nuevo_preciou = parseFloat(preciou * tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv2"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(4);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total2"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total * tc).toFixed(4);
      precio_unitario = parseFloat($(this).find("td").eq(22).html());
      nuevo_precio_unitario = parseFloat(precio_unitario * tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item2"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni2"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv2"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total2"]').val(nuevo_monto_total);
      $(this).find("td").eq(22).html(nuevo_precio_unitario);
      resumen_mod();
    });
  }
  if (moneda_base == "SOL" && id === "SOL") {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item2"]').val()
      );
      nuevo_monto = parseFloat(monto / tc).toFixed(4);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni2"]').val()
      );
      nuevo_preciou = parseFloat(preciou / tc).toFixed(4);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv2"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(4);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total2"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total / tc).toFixed(4);
      precio_unitario = parseFloat($(this).find("td").eq(22).html());
      nuevo_precio_unitario = parseFloat(precio_unitario / tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item2"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni2"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv2"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total2"]').val(nuevo_monto_total);
      $(this).find("td").eq(22).html(nuevo_precio_unitario);

      resumen_mod();
    });
  }
  $("#modalCambios2").modal("hide");
}

$(document).on("click", "#cotizacion_mod", function () {
  console.log("hola");
  det = document.querySelectorAll("#cotizacion_mod:checked").length;
  console.log(det);
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {
      $("#enviar_mod").removeClass("disabledTab");
      $("#enviar_mod").addClass("activeTab");
    } else {
      $("#enviar_mod").removeClass("activeTab");
      $("#enviar_mod").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $("#enviar_mod").removeClass("disabledTab");
      $("#enviar_mod").addClass("activeTab");
    } else {
      $("#enviar_mod").removeClass("activeTab");
      $("#enviar_mod").addClass("disabledTab");
    }
  }
});

$(document).on("click", "#cotizacion_mod_otro", function () {
  console.log("hola");
  det = document.querySelectorAll("#cotizacion_mod_otro:checked").length;
  console.log(det);
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {
      $("#enviar_mod_otro").removeClass("disabledTab");
      $("#enviar_mod_otro").addClass("activeTab");
    } else {
      $("#enviar_mod_otro").removeClass("activeTab");
      $("#enviar_mod_otro").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $("#enviar_mod_otro").removeClass("disabledTab");
      $("#enviar_mod_otro").addClass("activeTab");
    } else {
      $("#enviar_mod_otro").removeClass("activeTab");
      $("#enviar_mod_otro").addClass("disabledTab");
    }
  }
});

function pasar_pendiente2(docentry) {
  data = docentry.split("|");

  swal({
    title: "Procesar Cotizacion",
    text: "Desea procesar cotizacion?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      pasar_a_pedido(docentry);

      // swal("Procesando ", {
      //   icon: "success",
      //   timer: 3000,
      //   closeOnEsc: false,
      //   buttons: false,
      //   closeOnClickOutside: false,
      // });
      // $.post(
      //   "procesa_cotizacion_creada3.php",
      //   {
      //     codigo: data[0],
      //   },
      //   function (data1) {
      //     x = parseInt(data1.trim());

      //     if (x === 0) {
      //       pasar_a_pedido(docentry)
      //     }
      //   }
      // );
    } else {
      swal("No se pudo registrar");
    }
  });
}

function pasar_pendiente() {
  var docentry = $("#doc_sap").val();

  $.ajax({
    url: "busca_data_listado.php",

    type: "POST",
    data: { docentry, docentry },
    success: function (x) {

      var data = x;

      pasar_pendiente2(data);

    },
    error: function (jqXHR, estado, error) { },
  });
}


// function procesa_pedido_proc_ant() {
//   var monto = 0.0;
//   var montoigv = 0.0;
//   $("#tabla_art_proc > tbody > tr").each(function () {
//     monto += parseFloat(
//       $(this).find("td").find('input[id="monto_item3"]').val()
//     );
//   });
//   montoigv = parseFloat(monto * 0.18).toFixed(2);
//   doc_cotiza = $("#doc_procesa").val();
//   orden_compra = $("#orden_compra_procesa").val();
//   fecha_entrega = $("#fecha_procesa").val();
//   dir_entrega = $("#cap_dicc1_procesa").val();
//   moneda = $("#lista_cmoneda_procesa select").val();
//   contacto_coti = $("#contacto_proce").val();
//   telefono_coti = $("#telefono_contact_proce").val();
//   correo_coti = $("#correo_contact_proce").val();
//   cod_dire_entrega = $("#pone_cdireccion_procesa option:selected").val();
//   sub_total = monto;
//   total = montoigv;
//   band = true;

//   $("#tabla_art_proc > tbody > tr").each(function () {
//     linea = $(this).find("td").eq(0).html();
//     lina2 = linea;
//     var line = parseInt(linea);
//     var cod = quitarAcentos($(this).find("td").eq(1).html());
//     var can = $(this).find("td").find('input[id="cantidad_item3"]').val();
//     var preciou = $(this).find("td").find('input[id="precio_uni3"]').val();
//     var dscto_lin = $(this)
//       .find("td")
//       .find('input[id="descuento_item3"]')
//       .val();
//     var monto = $(this).find("td").find('input[id="monto_item3"]').val();

//     if (can === "" || can <= 0) {
//       alertify.error("Linea: " + lina2 + " " + "Falta Cantidad Invalida");
//       $(this).find("td").eq(6).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(6).css("background-color", "white");
//     }
//     if (preciou === "" || preciou <= 0) {
//       alertify.error("Linea: " + linlina2ea + " " + "Falta Precio Invalido");
//       $(this).find("td").eq(7).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(7).css("background-color", "white");
//     }
//     if (monto === "" || monto <= 0) {
//       alertify.error("Linea: " + lina2 + " " + "Falta Precio Invalido");
//       $(this).find("td").eq(11).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(1).css("background-color", "white");
//     }
//     if (dscto_lin.indexOf("+") !== -1) {
//       alertify.error("Linea: " + lina2 + " " + "Falta Calcular Descuento");
//       $(this).find("td").eq(8).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(8).css("background-color", "white");
//     }
//     if (cod === "60000001" || cod === "60000002") {
//       alertify.error(
//         "Linea: " + lina2 + " " + "No puede procesar Codigos Libres"
//       );
//       $(this).find("td").css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").css("background-color", "white");
//     }
//   });
//   if (dir_entrega == "SELECCIONE DIRECCION") {
//     band = false;
//     alertify.error("Seleccione una Direccion");
//   }
//   // band = false;
//   if (band === true) {

//     $.post(
//       "procesa_cotizacion_creada3.php",
//       {
//         codigo: doc_cotiza,
//       },
//       function (data1) {
//         x = parseInt(data1.trim());

//         if (x === 0) {
//           $.ajax({
//             beforeSend: function () { },
//             url: "procesa_cotizacion_pedido.php",
//             type: "POST",
//             data: {
//               montoigv: montoigv,
//               orden_compra: orden_compra,
//               fecha_entrega: fecha_entrega,
//               dir_entrega: dir_entrega,
//               moneda: moneda,
//               sub_total: sub_total,
//               total: total,
//               doc_cotiza: doc_cotiza,
//               contacto_coti: contacto_coti,
//               telefono_coti: telefono_coti,
//               correo_coti: correo_coti,
//               cod_dire_entrega: cod_dire_entrega
//             },
//             success: function (x) {
//               global = parseInt(x);
//               console.log(global);
//               if (global === 0) {
//                 alertify.error("No Inserto");
//               } else {
//                 //alertify.success("Inserto");
//                 // procesa_pedido_intercompany(global);
//                 $("#tabla_art_proc > tbody > tr").each(function () {
//                   linea = $(this).find("td").eq(0).html();
//                   var line = parseInt(linea);
//                   var cod = quitarAcentos($(this).find("td").eq(1).html());
//                   var descripcion_art = quitarAcentos("");
//                   var marca = quitarAcentos($(this).find("td").eq(3).html());
//                   var catalogo = quitarAcentos($(this).find("td").eq(4).html());
//                   var unidad_medida = $(this).find("td").eq(8).html();
//                   var can = $(this)
//                     .find("td")
//                     .find('input[id="cantidad_item3"]')
//                     .val();
//                   var preciou = $(this)
//                     .find("td")
//                     .find('input[id="precio_uni3"]')
//                     .val();
//                   var dscto_lin = $(this)
//                     .find("td")
//                     .find('input[id="descuento_item3"]')
//                     .val();
//                   var monto = $(this)
//                     .find("td")
//                     .find('input[id="monto_item3"]')
//                     .val();
//                   var plazo_entrega = quitarAcentos(
//                     $(this)
//                       .find("td")
//                       .find('input[id="plazoEntrega_item3"]')
//                       .val()
//                   );
//                   var fecha_prod = "";
//                   var multi_descuento = "";
//                   var tipo_venta = "";
//                   var fath = "";
//                   var modificado = "0";

//                   $.ajax({
//                     beforeSend: function () { },
//                     url: "procesa_cotizacion_pedido_det.php",
//                     type: "POST",
//                     data:
//                       "&codigo=" +
//                       cod +
//                       "&descripcion_art=" +
//                       descripcion_art +
//                       "&cantidad=" +
//                       can +
//                       "&preciou=" +
//                       preciou +
//                       "&dscto_lin=" +
//                       dscto_lin +
//                       "&total_linea=" +
//                       monto +
//                       "&tipo_vta=" +
//                       tipo_venta +
//                       "&father=" +
//                       fath +
//                       "&n_ticket=" +
//                       global +
//                       "&line=" +
//                       line +
//                       "&unidad_medida=" +
//                       unidad_medida +
//                       "&fecha_prod=" +
//                       fecha_prod +
//                       "&marca=" +
//                       marca +
//                       "&catalogo=" +
//                       catalogo +
//                       "&plazo_entrega=" +
//                       plazo_entrega +
//                       "&modificado=" +
//                       modificado +
//                       "&multi_descuento=" +
//                       multi_descuento +
//                       "&doc_cotiza=" +
//                       doc_cotiza,
//                     success: function (data) {
//                       $("#modal_procesar_cotizacion").modal("hide");
//                     },
//                     error: function (jqXHR, estado, error) {
//                       $("#errores").html("Error... " + estado + "  " + error);
//                     },
//                   });
//                 });
//               }
//               //migrar_sap_cotizacion(doc_cotiza,global)
//               lista_cotizacion();
//             },
//             error: function (jqXHR, estado, error) {
//               $("#errores").html("Error... " + estado + "  " + error);
//             },
//           });
//         } else {
//           $("#modal_procesar_cotizacion").modal("hide");
//           swal("Observacion!", "Descuento mayor al permitido, se requiere aprobacion", "warning");

//           correo_val(docentry);
//         }
//       }
//     );
//   }
// }

// function procesa_pedido_proc() {
//   let monto = 0.0;
//   let montoigv = 0.0;
//   let band = true;  // Control de validación general
//   let hasHighDiscount = false; // Control específico para descuentos >= 10%

//   // Sumar todos los montos de las líneas
//   $("#tabla_art_proc > tbody > tr").each(function () {
//     monto += parseFloat($(this).find('input[id="monto_item3"]').val() || 0);
//   });

//   // Calcular monto IGV como 18% del monto total
//   montoigv = parseFloat(monto * 0.18).toFixed(2);

//   // Obtener valores de los elementos en el DOM
//   let doc_cotiza = $("#doc_procesa").val();
//   let orden_compra = quitarAcentos($("#orden_compra_procesa").val());
//   let fecha_entrega = $("#fecha_procesa").val();
//   let dir_entrega = $("#cap_dicc1_procesa").val();
//   let moneda = $("#lista_cmoneda_procesa select").val();
//   let contacto_coti = $("#contacto_proce").val();
//   let telefono_coti = $("#telefono_contact_proce").val();
//   let correo_coti = $("#correo_contact_proce").val();
//   let cod_dire_entrega = $("#pone_cdireccion_procesa option:selected").val();
//   let modDespacho = $("#lista_modD").val();


//   let sub_total = monto;
//   let total = montoigv;

//   // Validar cada línea en la tabla y actualizar `band` en caso de error
//   $("#tabla_art_proc > tbody > tr").each(function () {
//     let linea = $(this).find("td").eq(0).html();
//     let cod = quitarAcentos($(this).find("td").eq(1).html());
//     let can = $(this).find('input[id="cantidad_item3"]').val();
//     let preciou = $(this).find('input[id="precio_uni3"]').val();
//     let dscto_lin = parseFloat($(this).find('input[id="descuento_item3"]').val() || 0);
//     let monto_linea = $(this).find('input[id="monto_item3"]').val();

//     // Validación de cantidad
//     if (!can || can <= 0) {
//       alertify.error("Línea: " + linea + " - Cantidad inválida o faltante");
//       $(this).find("td").eq(6).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(6).css("background-color", "white");
//     }

//     // Validación de precio unitario
//     if (!preciou || preciou <= 0) {
//       alertify.error("Línea: " + linea + " - Precio inválido o faltante");
//       $(this).find("td").eq(7).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(7).css("background-color", "white");
//     }

//     // Validación de monto
//     if (!monto_linea || monto_linea <= 0) {
//       alertify.error("Línea: " + linea + " - Monto inválido o faltante");
//       $(this).find("td").eq(11).css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").eq(11).css("background-color", "white");
//     }

//     // Verificar si hay algún descuento mayor o igual a 10%
//     if (dscto_lin >= 10) {
//       hasHighDiscount = true; // Se marca como verdadero si se detecta un descuento alto
//       $(this).find("td").eq(8).css("background-color", "#F67280");
//     } else {
//       $(this).find("td").eq(8).css("background-color", "white");
//     }

//     // Validación de códigos libres
//     if (cod === "60000001" || cod === "60000002") {
//       alertify.error("Línea: " + linea + " - No puede procesar códigos libres");
//       $(this).find("td").css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").css("background-color", "white");
//     }
//   });

//   // Validación de dirección de entrega
//   if (dir_entrega == "SELECCIONE DIRECCION") {
//     band = false;
//     alertify.error("Seleccione una Dirección");
//   }
//   if (modDespacho === "0") {
//     band = false;
//     alertify.error("Seleccione Modalidad de Despacho");
//     return;
//   }
//   if (cod_dire_entrega === 'FISCAL') {
//     band = false;
//     alertify.error("La direccion no puede ser FISCAL");
//     return;
//   }

//   // Si todas las líneas son válidas, verificar el descuento
//   if (band) {
//     if (hasHighDiscount) {
//       // Mostrar swal para confirmación si hay algún descuento mayor o igual al 10%
//       swal({
//         title: "Descuento elevado",
//         text: "Algunas líneas tienen un descuento mayor o igual al 10%. ¿Deseas continuar?",
//         icon: "warning",
//         buttons: {
//           cancel: {
//             text: "No",
//             value: false,
//             visible: true,
//             closeModal: true
//           },
//           confirm: {
//             text: "Sí",
//             value: true,
//             visible: true,
//             closeModal: true
//           }
//         },
//         dangerMode: true,
//       }).then((willProceed) => {
//         if (willProceed) {
//           console.log("Descuento mayor al 10%");

//           $.post(
//             "procesa_cotizacion_creada3.php",
//             {
//               codigo: doc_cotiza,
//             },
//             function (data1) {
//               x = parseInt(data1.trim());

//               if (x === 0) {
//                 $.ajax({
//                   beforeSend: function () { },
//                   url: "procesa_cotizacion_pedido.php",
//                   type: "POST",
//                   data: {
//                     montoigv: montoigv,
//                     orden_compra: orden_compra,
//                     fecha_entrega: fecha_entrega,
//                     dir_entrega: dir_entrega,
//                     moneda: moneda,
//                     sub_total: sub_total,
//                     total: total,
//                     doc_cotiza: doc_cotiza,
//                     contacto_coti: contacto_coti,
//                     telefono_coti: telefono_coti,
//                     correo_coti: correo_coti,
//                     cod_dire_entrega: cod_dire_entrega,
//                     modDespacho: modDespacho
//                   },
//                   success: function (x) {
//                     global = parseInt(x);
//                     console.log(global);
//                     if (global === 0) {
//                       alertify.error("No Inserto");
//                     } else {
//                       //alertify.success("Inserto");
//                       // procesa_pedido_intercompany(global);
//                       $("#tabla_art_proc > tbody > tr").each(function () {
//                         linea = $(this).find("td").eq(0).html();
//                         var line = parseInt(linea);
//                         var cod = quitarAcentos($(this).find("td").eq(1).html());
//                         var descripcion_art = quitarAcentos("");
//                         var marca = quitarAcentos($(this).find("td").eq(3).html());
//                         var catalogo = quitarAcentos($(this).find("td").eq(4).html());
//                         var unidad_medida = $(this).find("td").eq(8).html();
//                         var can = $(this)
//                           .find("td")
//                           .find('input[id="cantidad_item3"]')
//                           .val();
//                         var preciou = $(this)
//                           .find("td")
//                           .find('input[id="precio_uni3"]')
//                           .val();
//                         var dscto_lin = $(this)
//                           .find("td")
//                           .find('input[id="descuento_item3"]')
//                           .val();
//                         var monto = $(this)
//                           .find("td")
//                           .find('input[id="monto_item3"]')
//                           .val();
//                         var plazo_entrega = quitarAcentos(
//                           $(this)
//                             .find("td")
//                             .find('input[id="plazoEntrega_item3"]')
//                             .val()
//                         );
//                         var fecha_prod = "";
//                         var multi_descuento = "";
//                         var tipo_venta = "";
//                         var fath = "";
//                         var modificado = "0";

//                         $.ajax({
//                           beforeSend: function () { },
//                           url: "procesa_cotizacion_pedido_det.php",
//                           type: "POST",
//                           data:
//                             "&codigo=" +
//                             cod +
//                             "&descripcion_art=" +
//                             descripcion_art +
//                             "&cantidad=" +
//                             can +
//                             "&preciou=" +
//                             preciou +
//                             "&dscto_lin=" +
//                             dscto_lin +
//                             "&total_linea=" +
//                             monto +
//                             "&tipo_vta=" +
//                             tipo_venta +
//                             "&father=" +
//                             fath +
//                             "&n_ticket=" +
//                             global +
//                             "&line=" +
//                             line +
//                             "&unidad_medida=" +
//                             unidad_medida +
//                             "&fecha_prod=" +
//                             fecha_prod +
//                             "&marca=" +
//                             marca +
//                             "&catalogo=" +
//                             catalogo +
//                             "&plazo_entrega=" +
//                             plazo_entrega +
//                             "&modificado=" +
//                             modificado +
//                             "&multi_descuento=" +
//                             multi_descuento +
//                             "&doc_cotiza=" +
//                             doc_cotiza,
//                           success: function (data) {
//                             $("#modal_procesar_cotizacion").modal("hide");
//                           },
//                           error: function (jqXHR, estado, error) {
//                             $("#errores").html("Error... " + estado + "  " + error);
//                           },
//                         });
//                       });
//                     }
//                     //migrar_sap_cotizacion(doc_cotiza,global)
//                     lista_cotizacion();
//                   },
//                   error: function (jqXHR, estado, error) {
//                     $("#errores").html("Error... " + estado + "  " + error);
//                   },
//                 });
//               } else {
//                 $("#modal_procesar_cotizacion").modal("hide");
//                 swal("Observacion!", "Descuento mayor al permitido, se requiere aprobacion", "warning");

//                 correo_val(docentry);
//               }
//             }
//           );
//         }
//       });
//     } else {
//       // Si no hay descuentos altos, simplemente ejecutar el proceso normal
//       swal({
//         title: "¿Estás seguro?",
//         text: "¿Deseas continuar con el proceso?",
//         icon: "warning",
//         buttons: {
//           cancel: {
//             text: "No",
//             value: false,
//             visible: true,
//             closeModal: true
//           },
//           confirm: {
//             text: "Sí",
//             value: true,
//             visible: true,
//             closeModal: true
//           }
//         },
//         dangerMode: true,
//       }).then((willProceed) => {
//         if (willProceed) {
//           console.log("Proceso aprobado con descuento menor al 10%");
//           $.post(
//             "procesa_cotizacion_creada3.php",
//             {
//               codigo: doc_cotiza,
//             },
//             function (data1) {
//               x = parseInt(data1.trim());

//               if (x === 0) {
//                 $.ajax({
//                   beforeSend: function () { },
//                   url: "procesa_cotizacion_pedido.php",
//                   type: "POST",
//                   data: {
//                     montoigv: montoigv,
//                     orden_compra: orden_compra,
//                     fecha_entrega: fecha_entrega,
//                     dir_entrega: dir_entrega,
//                     moneda: moneda,
//                     sub_total: sub_total,
//                     total: total,
//                     doc_cotiza: doc_cotiza,
//                     contacto_coti: contacto_coti,
//                     telefono_coti: telefono_coti,
//                     correo_coti: correo_coti,
//                     cod_dire_entrega: cod_dire_entrega,
//                     modDespacho: modDespacho
//                   },
//                   success: function (x) {
//                     global = parseInt(x);
//                     console.log(global);
//                     if (global === 0) {
//                       alertify.error("No Inserto");
//                     } else {
//                       //alertify.success("Inserto");
//                       // procesa_pedido_intercompany(global);
//                       $("#tabla_art_proc > tbody > tr").each(function () {
//                         linea = $(this).find("td").eq(0).html();
//                         var line = parseInt(linea);
//                         var cod = quitarAcentos($(this).find("td").eq(1).html());
//                         var descripcion_art = quitarAcentos("");
//                         var marca = quitarAcentos($(this).find("td").eq(3).html());
//                         var catalogo = quitarAcentos($(this).find("td").eq(4).html());
//                         var unidad_medida = $(this).find("td").eq(8).html();
//                         var can = $(this)
//                           .find("td")
//                           .find('input[id="cantidad_item3"]')
//                           .val();
//                         var preciou = $(this)
//                           .find("td")
//                           .find('input[id="precio_uni3"]')
//                           .val();
//                         var dscto_lin = $(this)
//                           .find("td")
//                           .find('input[id="descuento_item3"]')
//                           .val();
//                         var monto = $(this)
//                           .find("td")
//                           .find('input[id="monto_item3"]')
//                           .val();
//                         var plazo_entrega = quitarAcentos(
//                           $(this)
//                             .find("td")
//                             .find('input[id="plazoEntrega_item3"]')
//                             .val()
//                         );
//                         var fecha_prod = "";
//                         var multi_descuento = "";
//                         var tipo_venta = "";
//                         var fath = "";
//                         var modificado = "0";

//                         $.ajax({
//                           beforeSend: function () { },
//                           url: "procesa_cotizacion_pedido_det.php",
//                           type: "POST",
//                           data:
//                             "&codigo=" +
//                             cod +
//                             "&descripcion_art=" +
//                             descripcion_art +
//                             "&cantidad=" +
//                             can +
//                             "&preciou=" +
//                             preciou +
//                             "&dscto_lin=" +
//                             dscto_lin +
//                             "&total_linea=" +
//                             monto +
//                             "&tipo_vta=" +
//                             tipo_venta +
//                             "&father=" +
//                             fath +
//                             "&n_ticket=" +
//                             global +
//                             "&line=" +
//                             line +
//                             "&unidad_medida=" +
//                             unidad_medida +
//                             "&fecha_prod=" +
//                             fecha_prod +
//                             "&marca=" +
//                             marca +
//                             "&catalogo=" +
//                             catalogo +
//                             "&plazo_entrega=" +
//                             plazo_entrega +
//                             "&modificado=" +
//                             modificado +
//                             "&multi_descuento=" +
//                             multi_descuento +
//                             "&doc_cotiza=" +
//                             doc_cotiza,
//                           success: function (data) {
//                             $("#modal_procesar_cotizacion").modal("hide");
//                           },
//                           error: function (jqXHR, estado, error) {
//                             $("#errores").html("Error... " + estado + "  " + error);
//                           },
//                         });
//                       });
//                     }
//                     //migrar_sap_cotizacion(doc_cotiza,global)
//                     lista_cotizacion();
//                   },
//                   error: function (jqXHR, estado, error) {
//                     $("#errores").html("Error... " + estado + "  " + error);
//                   },
//                 });
//               } else {
//                 $("#modal_procesar_cotizacion").modal("hide");
//                 swal("Observacion!", "Descuento mayor al permitido, se requiere aprobacion", "warning");

//                 correo_val(docentry);
//               }
//             }
//           );
//         }
//       });
//     }
//   }
// }

function valida_form_datos_adicionales() {
  let bandera = true;

  let id_observaciones = quitarAcentos($("#id_observaciones").val().toUpperCase().trim());
  let id_emp = quitarAcentos($("#id_emp").val());
  let id_dir_trans = quitarAcentos($("#id_dir_trans").val());
  let id_ubicacion = $("#id_ubicacion").val();
  let id_dir_destino = $("#id_dir_destino").val();
  let id_moda_destino = $("#id_moda_destino option:selected").val();
  let id_moda_pago = $("#id_moda_pago option:selected").val();

  if (id_observaciones === "") {
    bandera = false;
    alertify.error("Debe ingresar las Instrucciones para el Despacho");
  } else if (id_observaciones.length >= 201) {
    bandera = false;
    alertify.error("Las observaciones deben tener menos de 200 caracteres");
  }

  if (id_emp === "") {
    bandera = false;
    alertify.error("Debe ingresar la Empresa de Transporte");
  }

  if (id_dir_trans === "") {
    bandera = false;
    alertify.error("Debe ingresar la Dirección del Transportista");
  }

  if (id_ubicacion === "") {
    bandera = false;
    alertify.error("Debe ingresar la Ubicación del Transporte");
  }

  if (id_dir_destino === "") {
    bandera = false;
    alertify.error("Debe ingresar la Dirección de Destino");
  }

  if (id_moda_destino === "-1" || id_moda_destino === "") {
    bandera = false;
    alertify.error("Seleccione la Modalidad de Destino");
  }

  if (id_moda_pago === "-1" || id_moda_pago === "") {
    bandera = false;
    alertify.error("Seleccione la Modalidad de Pago");
  }

  if (!bandera) {
    swal({
      title: "Campos incompletos",
      text: "Revisa los campos en 'Datos Adicionales'.",
      icon: "warning",
      button: "Entendido"
    });

    const boton = $("#btn_datos_adicionales");
    boton.addClass("btn-danger").removeClass("btn-info");
    boton.fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
    setTimeout(() => {
      boton.removeClass("btn-danger").addClass("btn-info");
    }, 3000);
  }

  return bandera;
}

function procesa_pedido_proc_validacion() {
  const mod_despacho = $("#lista_modD").val();

  if (mod_despacho == 2) {
    console.log("Modalidad 2 → validando y guardando datos adicionales...");

    // ⛔ Si las validaciones fallan, detenemos el proceso
    let validado = guarda_form_datos_adicionales();
    if (!validado) {
      console.warn("No se procesó el pedido por errores en los datos adicionales.");
      return; // 🚫 No continúa
    }

    // ✅ Si pasó validaciones y guardó correctamente, procesamos el pedido
    procesa_pedido_proc();
    // swal("Se proceso correctamente", { icon: "success", timer: 2000, buttons: false });

  } else {
    // 🟡 Otras modalidades → solo procesamos el pedido
    procesa_pedido_proc();
    // swal("Se proceso correctamente", { icon: "success", timer: 2000, buttons: false });
  }
}

// function procesa_pedido_proc_validacion() {
//   const mod_despacho = $("#lista_modD").val();

//   if (mod_despacho == 2) {
//     console.log("Modalidad 2 → validando datos adicionales...");

//     // ⛔ Solo validamos, NO guardamos aún
//     let validado = valida_form_datos_adicionales();
//     if (!validado) {
//       console.warn("No se procesó el pedido por errores en los datos adicionales.");
//       return; // 🚫 No continúa
//     }

//     // ✅ Si pasó validaciones, procesamos el pedido
//     procesa_pedido_proc();

//   } else {
//     // 🟡 Otras modalidades → solo procesamos directamente
//     procesa_pedido_proc();
//   }
// }


function procesa_pedido_proc() {
  console.log('entroxd');

  let monto = 0.0;
  let montoigv = 0.0;
  let band = true;  // Control de validación general
  let hasHighDiscount = false; // Control específico para descuentos >= 10%

  // Sumar todos los montos de las líneas
  $("#tabla_art_proc > tbody > tr").each(function () {
    monto += parseFloat($(this).find('input[id="monto_item3"]').val() || 0);
  });

  // Calcular monto IGV como 18% del monto total
  montoigv = parseFloat(monto * 0.18).toFixed(2);

  // Obtener valores de los elementos en el DOM
  let doc_cotiza = $("#doc_procesa").val();
  let orden_compra = quitarAcentos($("#orden_compra_procesa").val());
  let fecha_entrega = $("#fecha_procesa").val();
  let dir_entrega = $("#cap_dicc1_procesa").val();
  let moneda = $("#lista_cmoneda_procesa select").val();
  let contacto_coti = $("#contacto_proce").val();
  // -----------------------------------------------------
  let telefono_coti = $("#telefono_contact_proce").val();
  let correo_coti = $("#correo_contact_proce").val();
  // -----------------------------------------------------
  let cod_dire_entrega = $("#pone_cdireccion_procesa option:selected").val();
  let mod_despacho = $("#lista_modD").val();

  let sub_total = monto;
  let total = montoigv;

  // Validar cada línea en la tabla y actualizar `band` en caso de error
  $("#tabla_art_proc > tbody > tr").each(function () {
    let linea = $(this).find("td").eq(0).html();
    let cod = quitarAcentos($(this).find("td").eq(1).html());
    let can = $(this).find('input[id="cantidad_item3"]').val();
    let preciou = $(this).find('input[id="precio_uni3"]').val();
    let dscto_lin = parseFloat($(this).find('input[id="descuento_item3"]').val() || 0);
    let monto_linea = $(this).find('input[id="monto_item3"]').val();

    // Validación de códigos libres
    if (cod === "21004146" || cod === "21004147") {
      alertify.error("Línea: " + linea + " - No puede procesar códigos libres");
      $(this).find("td").css("background-color", "#F67280");
      band = false;
    } else {
      $(this).find("td").css("background-color", "white");
    }

    //   // Validación de cantidad
    //   if (!can || can <= 0) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Línea: " + linea,
    //       text: "Cantidad inválida o faltante",
    //       timer: 3000,
    //       showConfirmButton: false
    //     });
    //     $(this).find("td").eq(6).css("background-color", "#F67280");
    //     band = false;
    //   } else {
    //     $(this).find("td").eq(6).css("background-color", "white");
    //   }

    //   // Validación de precio unitario
    //   if (!preciou || preciou <= 0) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Línea: " + linea,
    //       text: "Precio inválido o faltante",
    //       timer: 3000,
    //       showConfirmButton: false
    //     });
    //     $(this).find("td").eq(7).css("background-color", "#F67280");
    //     band = false;
    //   } else {
    //     $(this).find("td").eq(7).css("background-color", "white");
    //   }

    //   // Validación de monto
    //   if (!monto_linea || monto_linea <= 0) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Línea: " + linea,
    //       text: "Monto inválido o faltante",
    //       timer: 3000,
    //       showConfirmButton: false
    //     });
    //     $(this).find("td").eq(11).css("background-color", "#F67280");
    //     band = false;
    //   } else {
    //     $(this).find("td").eq(11).css("background-color", "white");
    //   }
    //   console.log(dscto_lin);

    //   // Verificar si hay algún descuento mayor o igual a 10%
    if (dscto_lin >= 10) {
      hasHighDiscount = true; // Se marca como verdadero si se detecta un descuento alto
      $(this).find("td").eq(8).css("background-color", "#F9A602");
    }

  });
  hasHighDiscount = false;
  // Validación de dirección de entrega
  if (dir_entrega == "SELECCIONE DIRECCION") {
    band = false;
    alertify.error("Seleccione una Dirección");
  }

  console.log("bandera= ", band);

  // Si todas las líneas son válidas, verificar el descuento
  if (band) {
    if (hasHighDiscount) {
      // Mostrar swal para confirmación si hay algún descuento mayor o igual al 10%
      Swal.fire({
        title: "Descuento elevado",
        text: "Algunas líneas tienen un descuento mayor o igual al 10%. ¿Deseas continuar?..",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        dangerMode: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Descuento mayor al 10%");

          $.post(
            "procesa_cotizacion_creada_nuevo.php",
            {
              codigo: doc_cotiza,
            },
            function (data1) {
              Swal.fire({
                title: "¡Observación!",
                text: "Descuento mayor al permitido, se requiere aprobación",
                icon: "warning"
              });
              correo_val(docentry);
              $("#modal_procesar_cotizacion").modal("hide");
            });
        }
      });
    } else {
      // Si no hay descuentos altos, simplemente ejecutar el proceso normal
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas continuar con el proceso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        dangerMode: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Proceso aprobado con descuento menor al 10%");

          $.ajax({
            beforeSend: function () {
              Swal.fire({
                title: "Actualizando Cotización...",
                html: `
                              <div class="spinner"></div>
                              <br>Por favor, espera...
                          `,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
              });
            },
            url: "server_layer_crear_pedido.php",
            type: "POST",
            contentType: "application/json", // Enviar datos como JSON
            data: JSON.stringify({
              montoigv: montoigv,
              orden_compra: orden_compra,
              fecha_entrega: fecha_entrega,
              dir_entrega: dir_entrega,
              moneda: moneda,
              sub_total: sub_total,
              total: total,
              doc_cotiza: $("#doc_sap").val(),
              contacto_coti: contacto_coti,
              telefono_coti: telefono_coti,
              correo_coti: correo_coti,
              cod_dire_entrega: cod_dire_entrega,
              mod_despacho: mod_despacho,
              items: $("#tabla_art_proc > tbody > tr").map(function () {
                return {
                  linea: parseInt($(this).find("td").eq(0).html()),
                  cod: quitarAcentos($(this).find("td").eq(1).html()),
                  descripcion_art: quitarAcentos(""),
                  marca: quitarAcentos($(this).find("td").eq(3).html()),
                  catalogo: quitarAcentos($(this).find("td").eq(4).html()),
                  unidad_medida: $(this).find("td").eq(8).html(),
                  cantidad: $(this).find("td").find('input[id="cantidad_item3"]').val(),
                  preciou: $(this).find("td").find('input[id="precio_uni3"]').val(),
                  dscto_lin: $(this).find("td").find('input[id="descuento_item3"]').val(),
                  monto: $(this).find("td").find('input[id="monto_item3"]').val(),
                  plazo_entrega: quitarAcentos($(this).find("td").find('input[id="plazoEntrega_item3"]').val()),
                  fecha_prod: "",
                  multi_descuento: "",
                  tipo_venta: "",
                  fath: "",
                  modificado: "0",
                  doc_cotiza: $("#doc_sap").val(),
                  doc_web: $("#docito").val()
                };
              }).get()
            }),
            success: function (data) {
              try {
                let response = JSON.parse(data); // Convertir la respuesta a JSON
                if (response.success) {
                  Swal.fire({
                    title: "✅ El Pedido Fue Procesado",
                    text: response.message, // Mensaje de éxito desde el backend
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false
                  });

                  // 🛑 Cerrar modal si la respuesta es positiva
                  $("#modal_procesar_cotizacion").modal("hide");

                  // ✅ Refrescar la lista de cotizaciones
                  busca_coti();
                } else {
                  Swal.fire({
                    title: "❌ Error al Procesar",
                    text: response.message, // Mensaje de error desde el backend
                    icon: "error",
                    confirmButtonText: "Cerrar"
                  });
                }
              } catch (error) {
                Swal.fire({
                  title: "❌ Error Inesperado",
                  text: "No se pudo procesar la respuesta del servidor.",
                  icon: "error",
                  confirmButtonText: "Cerrar"
                });
              }
            },
          });

        }
      });

    }
  }
}

// function procesa_pedido_proc() {
//   console.log('entroxd');

//   let monto = 0.0;
//   let montoigv = 0.0;
//   let band = true;  // Control de validación general
//   let hasHighDiscount = false; // Control específico para descuentos >= 10%

//   // Sumar todos los montos de las líneas
//   $("#tabla_art_proc > tbody > tr").each(function () {
//     monto += parseFloat($(this).find('input[id="monto_item3"]').val() || 0);
//   });

//   // Calcular monto IGV como 18% del monto total
//   montoigv = parseFloat(monto * 0.18).toFixed(2);

//   // Obtener valores de los elementos en el DOM
//   let doc_cotiza = $("#doc_procesa").val();
//   let orden_compra = quitarAcentos($("#orden_compra_procesa").val());
//   let fecha_entrega = $("#fecha_procesa").val();
//   let dir_entrega = $("#cap_dicc1_procesa").val();
//   let moneda = $("#lista_cmoneda_procesa select").val();
//   let contacto_coti = $("#contacto_proce").val();
//   let telefono_coti = $("#telefono_contact_proce").val();
//   let correo_coti = $("#correo_contact_proce").val();
//   let cod_dire_entrega = $("#pone_cdireccion_procesa option:selected").val();
//   let mod_despacho = $("#lista_modD").val();

//   let sub_total = monto;
//   let total = montoigv;

//   // Validar cada línea en la tabla
//   $("#tabla_art_proc > tbody > tr").each(function () {
//     let linea = $(this).find("td").eq(0).html();
//     let cod = quitarAcentos($(this).find("td").eq(1).html());
//     let dscto_lin = parseFloat($(this).find('input[id="descuento_item3"]').val() || 0);

//     // Validación de códigos libres
//     if (cod === "21004146" || cod === "21004147") {
//       alertify.error("Línea: " + linea + " - No puede procesar códigos libres");
//       $(this).find("td").css("background-color", "#F67280");
//       band = false;
//     } else {
//       $(this).find("td").css("background-color", "white");
//     }

//     // Verificar si hay algún descuento mayor o igual a 10%
//     if (dscto_lin >= 10) {
//       hasHighDiscount = true;
//       $(this).find("td").eq(8).css("background-color", "#F9A602");
//     }
//   });

//   // Validación de dirección de entrega
//   if (dir_entrega == "SELECCIONE DIRECCION") {
//     band = false;
//     alertify.error("Seleccione una Dirección");
//   }

//   console.log("bandera= ", band);

//   // Si todas las líneas son válidas
//   if (band) {

//     if (hasHighDiscount) {
//       // ⚠️ Confirmación para descuentos >=10%
//       Swal.fire({
//         title: "Descuento elevado",
//         text: "Algunas líneas tienen un descuento mayor o igual al 10%. ¿Deseas continuar?..",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Sí",
//         cancelButtonText: "No",
//         dangerMode: true
//       }).then((result) => {
//         if (result.isConfirmed) {
//           console.log("Descuento mayor al 10%");

//           $.post(
//             "procesa_cotizacion_creada_nuevo.php",
//             { codigo: doc_cotiza },
//             function (data1) {
//               Swal.fire({
//                 title: "¡Observación!",
//                 text: "Descuento mayor al permitido, se requiere aprobación",
//                 icon: "warning"
//               });
//               correo_val(docentry);
//               $("#modal_procesar_cotizacion").modal("hide");
//             }
//           );
//         }
//       });

//     } else {
//       // 🟡 Confirmación general del proceso
//       Swal.fire({
//         title: "¿Estás seguro?",
//         text: "¿Deseas continuar con el proceso?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Sí",
//         cancelButtonText: "No",
//         dangerMode: true
//       }).then((result) => {
//         if (result.isConfirmed) {
//           console.log("Usuario confirmó el proceso");

//           // ⚙️ Si la modalidad de despacho es 2, primero guardamos datos adicionales
//           if (mod_despacho == 2) {
//             console.log("Guardando datos adicionales antes del procesamiento...");

//             let validado = guarda_form_datos_adicionales(); // 🔹 Esta función ya valida internamente

//             if (!validado) {
//               console.warn("❌ No se pudo guardar los datos adicionales. Proceso detenido.");
//               return; // 🚫 No continúa si el guardado falló
//             }
//           }

//           // ✅ Si todo bien, procesamos normalmente el pedido
//           console.log("Procesando pedido final...");

//           $.ajax({
//             beforeSend: function () {
//               Swal.fire({
//                 title: "Actualizando Cotización...",
//                 html: `
//                   <div class="spinner"></div>
//                   <br>Por favor, espera...
//                 `,
//                 allowOutsideClick: false,
//                 allowEscapeKey: false,
//                 showConfirmButton: false
//               });
//             },
//             url: "server_layer_crear_pedido.php",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify({
//               montoigv: montoigv,
//               orden_compra: orden_compra,
//               fecha_entrega: fecha_entrega,
//               dir_entrega: dir_entrega,
//               moneda: moneda,
//               sub_total: sub_total,
//               total: total,
//               doc_cotiza: $("#doc_sap").val(),
//               contacto_coti: contacto_coti,
//               telefono_coti: telefono_coti,
//               correo_coti: correo_coti,
//               cod_dire_entrega: cod_dire_entrega,
//               mod_despacho: mod_despacho,
//               items: $("#tabla_art_proc > tbody > tr").map(function () {
//                 return {
//                   linea: parseInt($(this).find("td").eq(0).html()),
//                   cod: quitarAcentos($(this).find("td").eq(1).html()),
//                   descripcion_art: quitarAcentos(""),
//                   marca: quitarAcentos($(this).find("td").eq(3).html()),
//                   catalogo: quitarAcentos($(this).find("td").eq(4).html()),
//                   unidad_medida: $(this).find("td").eq(8).html(),
//                   cantidad: $(this).find("td").find('input[id="cantidad_item3"]').val(),
//                   preciou: $(this).find("td").find('input[id="precio_uni3"]').val(),
//                   dscto_lin: $(this).find("td").find('input[id="descuento_item3"]').val(),
//                   monto: $(this).find("td").find('input[id="monto_item3"]').val(),
//                   plazo_entrega: quitarAcentos($(this).find("td").find('input[id="plazoEntrega_item3"]').val()),
//                   fecha_prod: "",
//                   multi_descuento: "",
//                   tipo_venta: "",
//                   fath: "",
//                   modificado: "0",
//                   doc_cotiza: $("#doc_sap").val(),
//                   doc_web: $("#docito").val()
//                 };
//               }).get()
//             }),
//             success: function (data) {
//               try {
//                 let response = JSON.parse(data); // Convertir la respuesta a JSON
//                 if (response.success) {
//                   Swal.fire({
//                     title: "✅ El Pedido Fue Procesado",
//                     text: response.message,
//                     icon: "success",
//                     timer: 3000,
//                     showConfirmButton: false
//                   });

//                   $("#modal_procesar_cotizacion").modal("hide");
//                   busca_coti(); // 🔄 Refrescar lista
//                 } else {
//                   Swal.fire({
//                     title: "❌ Error al Procesar",
//                     text: response.message,
//                     icon: "error",
//                     confirmButtonText: "Cerrar"
//                   });
//                 }
//               } catch (error) {
//                 Swal.fire({
//                   title: "❌ Error Inesperado",
//                   text: "No se pudo procesar la respuesta del servidor.",
//                   icon: "error",
//                   confirmButtonText: "Cerrar"
//                 });
//               }
//             },
//           });
//         } else {
//           console.log("El usuario canceló el proceso.");
//         }
//       });
//     }
//   }
// }


function procesa_pedido_intercompany(docentry) {
  bandera = false;
  $("#tabla_art_proc > tbody > tr").each(function () {
    // Verificar si el switch está activo en la fila actual
    var switchBtn = $(this).find(".switch-btn");
    var switchEstado = switchBtn.hasClass("active");

    // Procesar solo las filas con el switch activo
    if (switchEstado) {
      // Obtener otros datos de la fila
      var itemCode = $(this).find("td").eq(1).text();
      var descripcion = $(this).find("td").eq(2).text();
      var marca = $(this).find("td").eq(3).text();
      var catalogo = $(this).find("td").eq(4).text();
      var unidadMedida = $(this).find("td").eq(8).text();
      var precio_dscto = parseFloat(
        $(this).find("td").find('input[id="precio_dscto3"]').val()
      ).toFixed(4);
      var cantidad = $(this)
        .find("td")
        .find('input[id="cantidad_item3"]')
        .val();
      var monto = parseFloat(
        $(this).find("td").find('input[id="monto_item3"]').val()
      ).toFixed(4);
      var codSapCoinsa = $(this).find("td").eq(20).text();

      // console.log(`Item Code: ${itemCode}, Descripción: ${descripcion}, Marca: ${marca}, Catálogo: ${catalogo}, Unidad de Medida: ${unidadMedida}, Precio Descuento: ${precio_dscto}, Cantidad: ${cantidad}, Monto: ${monto}, COD SAP COINSA: ${codSapCoinsa}`);

      $.ajax({
        beforeSend: function () { },
        url: "procesa_solicitud_compra_intercompany.php",
        type: "POST",
        data: {
          docentry: docentry,
          itemCode: itemCode,
          descripcion: descripcion,
          marca: marca,
          catalogo: catalogo,
          unidadMedida: unidadMedida,
          precio_dscto: precio_dscto,
          cantidad: cantidad,
          monto: monto,
          codSapCoinsa: codSapCoinsa,
        },
        success: function (x) {
          bandera = true;
        },
      });
    }
    bandera = false;
  });
  setTimeout(() => {
    var correoEnviado = false;

    $("#tabla_art_proc > tbody > tr").each(function () {
      // Verificar si el switch está activo en la fila actual
      var switchBtn = $(this).find(".switch-btn");
      var switchEstado = switchBtn.hasClass("active");

      if (switchEstado && !correoEnviado) {
        enviar_correo(docentry);
        correoEnviado = true;
      }
    });
  }, 3000);
}
function lista_cmoneda_proc(moneda) {
  console.log(moneda);
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cmoneda_procesa").html("Recuperando Lista ...");
      },
      url: "lista_moneda_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cmoneda_procesa").html(x);
        $(".select2").select2();
        setTimeout(() => {
          $("#lista_cmoneda_procesa select")
            .val(moneda)
            .trigger("change.select2");
        }, 2000);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}
function lista_cpago_proc(cpago) {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cpago_procesa").html("Recuperando Lista ...");
      },
      url: "lista_cpago_venta.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cpago_procesa").html(x);
        $(".select2").select2();
        $("#pone_vendedores_ped select").val(cpago).trigger("change.select2");
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function consultar_data_proc_det(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion_det7.php",

    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      $("#data_articulo_det_procesa").html(x);
      setTimeout(() => {
        resumen_proc();
      }, 3000);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function resumen_proc() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    // $('#tabla_articulos > tbody > tr').each(function () {
    $("#tabla_art_proc > tbody > tr").each(function () {
      articulos += parseFloat(
        $(this).find("td").find('input[id="cantidad_item3"]').val()
      );
      monto += parseFloat(
        $(this).find("td").find('input[id="monto_item3"]').val()
      );
    });

    // setTimeout(() => {
    //   cmoneda = $("#lista_cmoneda_procesa option:selected").val();
    // }, 1000);

    cmoneda = $("#lista_cmoneda_procesa option:selected").val();

    var el = document.getElementById("totales_procesa");
    let num = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto);
    el.innerText = num;

    //alert(el)
    //$("#totales").html(monto.toFixed(2));
    montoigv = monto * 0.18;

    monto_total = monto + montoigv;
    //$("#totalesigv").html(montoigv.toFixed(2));
    var el = document.getElementById("totalesigv_procesa");
    let num2 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(montoigv);
    el.innerText = num2;

    var el = document.getElementById("total_venta_procesa");
    let num3 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto_total);
    el.innerText = num3;

    var el = document.getElementById("total_articulos_procesa");
    el.innerText = articulos.toFixed(2);
  });
}

function tipo_cambio_hoy3() {
  $.ajax({
    beforeSend: function () {
      $("#tc_hoy_procesa").html("Recuperando Lista ...");
    },
    url: "Consulta_TC_Actual2.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#tc_hoy_procesa").html(x);
      tc = $("[name='tc_actual2']").text().trim();
      var el = document.getElementById("tipo_cambio_procesa");
      console.log(tc);
      //$("#lista_cmoneda_mod2").val('SOL')
      let num2 = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "SOL",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(tc);
      // console.log(num2);
      el.innerText = num2;
    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_direccion_proc(cardcode, docentry) {
  var idcliente3 = "";
  idcliente3 = cardcode;
  $(document).ready(function () {
    $.ajax({
      url: "lista_direccion_venta_client_pedido1.php",

      type: "POST",
      data: { idcliente3, docentry },
      success: function (x) {
        $("#pone_cdireccion_procesa").html(x);
        $(".select2").select2();
        //poner_direcion_proc();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function pasar_a_pedido(docentry) {
  $("#modal_procesar_cotizacion").modal("show");
  //console.log(docentry);
  var idcl = docentry.split("|");

  var valor = idcl[0].replace(/\s+/g, '');

  let doc_sap = $("#doc_sap").val();
  // console.log(docentry);
  //  console.log(idcl);
  $(".nombreClie_procesar").html("");
  $("#doc_procesa").val(idcl[0]);
  $("#docentry_procesa").val(idcl[0]);
  $("#lista_cmoneda_proce").val(idcl[3]);
  $("#lista_correo_procesa").val(idcl[2]);
  $("#contacto_proce").val(idcl[6]);
  //$("#lista_cmoneda_proc3").val(idcl[3]);
  $(".nombreClie_procesar").append(
    "Procesar Cotizacion | <span class='label label-warning'>Cliente: " +
    idcl[4] +
    "</span>" +
    "<span class='label label-warning'>-</span>" +
    "<span class='label label-warning'># Cotizacion: " +
    idcl[0] + " | # SAP: " + idcl[7] +
    "</span>"
  );
  setTimeout(() => {
    lista_cmoneda_proc(idcl[3]);
    lista_cpago_proc(idcl[5]);
    consultar_data_proc_det(doc_sap);
    setTimeout(() => {
      tipo_cambio_hoy3();
    }, 500);

    lista_modalidadDespacho();
    lista_direccion_proc(idcl[1], valor);
  }, 1000);
}

function busca_cliente_mod() {
  ruc = $("#clie_mod").val();

  $(document).ready(function () {
    $("#modal_tabla_clientes_mod").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
    $.ajax({
      beforeSend: function () {
        $("#lista_clientes").html("Cargando los clientes...");
      },
      url: "lista_clientes2.php",
      type: "POST",
      data: { ruc: ruc.toUpperCase() },
      success: function (x) {
        $("#lista_clientes_mod").html(x);
        $("#tabla_clien").DataTable();
        //$('#clie').val('');
      },
      error: function (jqXHR, estado, error) {
        $("#lista_clientes_mod").html("Hubo un error: " + estado + " " + error);
      },
    });
  });
}

function busca_cliente_mod_otro() {
  ruc = $("#clie_mod_otro").val();

  $(document).ready(function () {
    $("#modal_tabla_clientes_mod_otro").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
    $.ajax({
      beforeSend: function () {
        $("#lista_clientes_mod_otro").html("Cargando los clientes...");
      },
      url: "lista_clientes2_otro.php",
      type: "POST",
      data: { ruc: ruc.toUpperCase() },
      success: function (x) {
        $("#lista_clientes_mod_otro").html(x);
        $("#tabla_clien").DataTable();
        //$('#clie').val('');
      },
      error: function (jqXHR, estado, error) {
        $("#lista_clientes_mod_otro").html("Hubo un error: " + estado + " " + error);
      },
    });
  });
}

function actualiza_cliente(elid) {
  // console.log(elid);
  var client = elid;
  var idcl = client.split("|");
  var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
  $("#idcliente_credito_mod").val(idcl[0]);
  $("#idcliente_razon_mod").val(idcl[1].replace(pattern, ""));
  $("#idcliente_ruc_mod").val(idcl[2]);
  // $("#idcliente_parent").val(idcl[3]);
  $("#tipocliente_mod").val(idcl[4]);
  $("#codigocp").val(idcl[5]);

  //rend_linea = idcl[6]/10000
  // console.log(idcl[6])
  $("#lineacredito_mod").val(parseFloat(idcl[6]).toFixed(2));
  $("#salpendiente_mod").val(parseFloat(idcl[7]).toFixed(2));

  $("#lin_disponible_mod").val(parseFloat(idcl[8]).toFixed(2));
  $("#vendedor1").val(parseFloat(idcl[9]).toFixed(2));

  pone_cpago = idcl[5];
  $("#lista_cpago_mod").val(pone_cpago).trigger("change.select2");
  pone_ven = idcl[9];
  $("#vendedor1").val(pone_ven).trigger("change.select2");

  $("#modal_tabla_clientes_mod").modal("hide");

  lista_direccion_condicion_mod();
}


function actualiza_cliente_otro(elid) {
  // console.log(elid);
  var client = elid;
  var idcl = client.split("|");
  var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
  $("#idcliente_credito_mod_otro").val(idcl[0]);
  $("#idcliente_razon_mod_otro").val(idcl[1].replace(pattern, ""));
  $("#idcliente_ruc_mod_otro").val(idcl[2]);
  // $("#idcliente_parent").val(idcl[3]);
  $("#tipocliente_mod_otro").val(idcl[4]);
  $("#codigocp_otro").val(idcl[5]);

  //rend_linea = idcl[6]/10000
  // console.log(idcl[6])
  $("#lineacredito_mod_otro").val(parseFloat(idcl[6]).toFixed(2));
  $("#salpendiente_mod_otro").val(parseFloat(idcl[7]).toFixed(2));

  $("#lin_disponible_mod_otro").val(parseFloat(idcl[8]).toFixed(2));
  $("#vendedor1_otro").val(parseFloat(idcl[9]).toFixed(2));

  pone_cpago = idcl[5];
  $("#lista_cpago_mod_otro").val(pone_cpago).trigger("change.select2");
  pone_ven = idcl[9];
  $("#vendedor1_otro").val(pone_ven).trigger("change.select2");

  $("#modal_tabla_clientes_mod_otro").modal("hide");

  lista_direccion_condicion_mod_otro();
}

function lista_direccion_condicion_mod_otro() {
  var idcliente3 = "";
  idcliente3 = $("#idcliente_credito").val();
  $(document).ready(function () {
    $.ajax({
      url: "lista_direccion_venta_client_pedido.php",

      type: "POST",
      data: { idcliente3 },
      success: function (x) {
        $("#pone_cdireccion2").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function lista_direccion_condicion_mod_otro() {
  var idcliente3 = "";
  idcliente3 = $("#idcliente_credito_otro").val();
  $(document).ready(function () {
    $.ajax({
      url: "lista_direccion_venta_client_pedido.php",

      type: "POST",
      data: { idcliente3 },
      success: function (x) {
        $("#pone_cdireccion2_otro").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function revision_aprobacion(docentry) {
  console.log(docentry);
  $.ajax({
    url: "revisar_aprobacion.php",
    type: "POST",
    data: {
      docentry: docentry,
    },
    success: function (x) {
      //   swal({
      //     title: "Precaución",
      //     text: "Se enviará un correo porque el descuento supera el 10%.",
      //     icon: "warning",  // Icono de precaución
      //     timer: 3000,  // Muestra la alerta durante 3 segundos
      //     showConfirmButton: false  // No muestra el botón de confirmación
      // });
      var docentry = x.trim(); // Esto elimina espacios alrededor de la cadena

      console.log(x);
      if (docentry === "0") {
      } else {
        correo_val(docentry);
      }
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}
function correo_val(docentry) {
  console.log(docentry);
  $.ajax({
    url: "correo_coti_aprobacion.php",
    type: "POST",
    data: {
      docentry: docentry,
    },
    success: function (x) {
      //  alertify.success('Se envio Correo')
      console.log("go");
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}

function lista_marca3() {
  $.ajax({
    beforeSend: function () {
      $("#listar_marca_procesa").html("");
    },
    url: "busca_data_articulo_marca.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#listar_marca_procesa").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
      $("#listar_marca_procesa").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

function modal_art_procesa() {
  $("#modal_busqueda_arts_proc").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });
  $("#modal_busqueda_arts_proc").on("shown.bs.modal", function () {
    $("#lista_articulos_procesa").html("");
    $("#articulo_buscar_procesa").val("");
    $("#articulo_buscar_procesa").focus();
  });
  lista_marca3();
}
function busca_proc() {
  cmoneda = $("#lista_cmoneda_procesa select").val();
  data_buscar = $("#articulo_buscar_procesa").val();
  var data = data_buscar.split("//");
  firname = $("#listar_marca_procesa select").val();

  if (data_buscar === "") {
    datasupcatname = "";
    data_descripcion = "";
    data_codigo = "";
  }

  if (data.length == 1) {
    datasupcatname = data[0];
    data_descripcion = "";
    data_codigo = "";
  }
  if (data.length == 2) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = "";
  }
  if (data.length == 3) {
    datasupcatname = data[0];
    data_descripcion = data[1];
    data_codigo = data[2];
  }

  //console.log(data);
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos_procesa").html("");
    },
    url: "busca_data_articulo_nuevo_2.php",
    type: "POST",
    data: {
      descripcion: data_descripcion,
      firname: firname,
      supcatname: datasupcatname,
      data_codigo: data_codigo,
    },
    success: function (x) {
      $("#lista_articulos_procesa").html(x);
      $("#tabla_art_proce").DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos_procesa").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

$(document).on("click", "#tabla_art_proce tbody tr", function () {
  //console.log("entr");
  var checkbox = $(this).find("#cotizacion_proc");
  checkbox.prop("checked", !checkbox.prop("checked"));

  actualizarFila3(checkbox);
});

function actualizarFila3(checkbox) {
  //console.log("basi");
  var checkbox2 = $("#tabla_art_proce tbody tr").find("#cotizacion_proc");
  var cant = checkbox2.closest("tr").find("#cotizacion_proc:checked").length;
  //console.log(cant);
  if (checkbox.is(":checked")) {
    checkbox.closest("tr").find("td").css("background-color", "LightGreen");
  } else {
    checkbox.closest("tr").find("td").css("background-color", "white");
  }
  if (cant > 0) {
    $("#enviar_procesa").removeClass("disabledTab");
    $("#enviar_procesa").addClass("activeTab");
  } else {
    $("#enviar_procesa").removeClass("activeTab");
    $("#enviar_procesa").addClass("disabledTab");
  }
}

function add_art_proc() {
  $("#modal_busqueda_arts_proc").modal("toggle");

  let line = [];

  $('#tabla_art_proce input[type="checkbox"]:checked').each(function (e) {
    codigo = $(this).closest("tr").children("td:eq(1)").text();
    line.push(codigo);
  });
  codigo = line.toString();

  $("#codigo").val(codigo);
  busca_articulo_proc();
}

function ultimo_valor_fila_proc() {
  //let tableBody = document.getElementById('tabla_articulos_mod');
  let line = [];
  $("#tabla_art_proc > tbody > tr").each(function () {
    articulos = parseFloat($(this).find("td").eq(0).html());
    line.push(articulos);
    //console.log(articulos);
  });

  line.sort(function (a, b) {
    return a - b;
  });
  cantidad = line.length;
  data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1];
  return data;
}

function busca_articulo_proc() {
  $(document).ready(function () {
    var cod = $("#codigo").val().toString();
    //console.log(cod);
    var tipcli = "";
    var cmoneda = $("#lista_cmoneda_procesa select").val();
    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo").html("Buscando informacion del articulo...");
          },
          url: "busca_data_articulo_pventa.php",
          dataType: "json",
          type: "POST",
          data: {
            codigo: $("#codigo").val().toString(),
            idcliente_credito: $("#idcliente_credito").val(),
            cmoneda: cmoneda,
          },
          success: function (data) {
            $("#enviar_procesa").removeClass("activeTab");
            $("#enviar_procesa").addClass("disabledTab");

            // console.log(data);

            if (data == 0) {
              var n = noty({
                text: "No existe el articulo...!",
                theme: "relax",
                layout: "center",
                type: "error",
                timeout: 2000,
              });
            } else {
              for (let i = 0; i < data.length; i++) {
                fil = ultimo_valor_fila_proc();
                if (fil === 0) {
                  // $("#tabla_articulos_mod > tbody > tr > td").remove();
                  $("#tabla_art_proc > tbody > tr > td").remove();
                }
                var num = ultimo_valor_fila_proc() + 1;
                console.log(num);

                precio = parseFloat(data[i].precio).toFixed(4);
                precio_igv = precio * 1.18;
                precioigv_parse = parseFloat(precio_igv).toFixed(4);
                li = parseFloat(num - 1).toFixed(0);
                $("#tabla_art_proc > tbody").append(
                  "<tr><td class='center'>" +
                  num +
                  "</td>" +
                  // $("#tabla_articulos > tbody").append("<tr><td class='center'>" + num + "</td>"+

                  "<td class='center' style='display:none'>" +
                  data[i].ItemCode +
                  "</td>" +
                  "<td style='text-align:center'> " +
                  data[i].descripcion +
                  "</td>" +
                  "<td style='text-align:center'>" +
                  data[i].Fabricante +
                  "</td>" +
                  "<td style='text-align:center'>" +
                  data[i].Catalogo +
                  "</td>" +
                  "<td style='text-align:center'>" +
                  parseFloat(data[i].STOCK_AYM).toFixed(2) +
                  "</td>" +
                  "<td style='display:none'>" +
                  parseFloat(data[i].STOCK_COINSA).toFixed(2) +
                  "</td>" +
                  "<td style='display:none'>" +
                  "<button class='switch-btn' data-index='" +
                  num +
                  "' onclick='cambiarEstado(" +
                  num +
                  ")'></button>" +
                  "</td>" +
                  //"<td class='center'>" + data[0].Catalogo + "</td>"+
                  "<td class=''>" +
                  data[i].unidad_medida +
                  "</td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='cantidad_item3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item3(this," +
                  li +
                  ")'  onchange='calcular_total_item3(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='precio_uni3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onchange='calcular_total_item3(this," +
                  li +
                  ");calcular_precio_igv3(this," +
                  li +
                  ")' onkeyup='calcular_total_item3(this," +
                  li +
                  ");calcular_precio_igv3(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='descuento_item3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0'  onkeyup='detectarEnter3(event,this," +
                  li +
                  ")' ></td>" +
                  "<td style='text-align:center'><input type='text' disabled class='form-control pull-right' id='precio_dscto3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onchange='calcular_dscto_item3(this," +
                  li +
                  ")' onkeyup='calcular_dscto_item3(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;' ></td>" +
                  "<td style='text-align:center;display:none'><input type='text'  class='form-control pull-right' id='precio_igv3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                  precioigv_parse +
                  "' onkeyup='calcular_total_item3(this," +
                  li +
                  ")'  onchange='calcular_total_item3(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +
                  "<td style='text-align:center;;display:none'><input type='text'  class='form-control pull-right' id='monto_item3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot3(this," +
                  li +
                  ")'  onchange='calcular_monto_tot3(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;' ></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='monto_total3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot3(this," +
                  li +
                  ")'  onchange='calcular_monto_tot3(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;' ></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='plazoEntrega_item3'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-sm delete rounded-circle' onclick='resumen_proc();'><i class='fa fa-trash'></i></button></td>" +
                  "<td style='text-align:center'><input type='text'   class='form-control pull-right detalle_art2' id='EsParteKIT'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='N' disabled ></td>"
                );
                $("#btn-procesa").prop("disabled", false);
                $("#cantidad_item3").focus();
                resumen_proc();
                if (data[0].cantidad2 <= 0) {
                  var n = noty({
                    text: "No hay suficiente existencia...!",
                    theme: "relax",
                    layout: "center",
                    type: "information",
                    timeout: 2000,
                  });

                  $("#cantidad2").focus();
                }
              }
            }
          },

          error: function (jqXHR, estado, error) {
            // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
            var n = noty({
              text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
              theme: "relax",
              layout: "center",
              type: "error",
              timeout: 2000,
            });
            //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
          },
        });
      });
    } else {
    }
  });
}

$(document).on("change", "#lista_cmoneda_procesa select", function () {
  var id = this.value;
  lista_cmoneda_xd = id;
  lista_cmoneda_xd2 = $("#lista_cmoneda_proce").val();
  $("#monedaInicial3").val(lista_cmoneda_xd2);
  $("#cambioMoneda3").val(lista_cmoneda_xd);
  $("#rate3").val(parseFloat($("#tc_actual").text()).toFixed(3));
  $("#modalCambios3").modal("show");
  $("#lista_cmoneda_proce").val(id);
});



function listar_contacto(cardcode) {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#dirigido_coti").html("Cargando ...");
      },
      url: "listar_contactos.php",
      type: "POST",
      data: { cardcode },
      success: function (x) {
        $("#dirigido_coti").html(x);
        $(".select2").select2();
        //console.log(x);


        setTimeout(() => {
          dirigido_coti_antes = $("#dirigido_coti option:selected").val();
          var idcl = dirigido_coti_antes.split("|");

          if (dirigido_coti_antes === '|||') {
            $("#dirigido_coti").hide();
            $("#dirigido_coti_new").show();
          } else {
            $("#dirigido_coti").show();
            $("#dirigido_coti_new").hide();
          }

          $("#correo_dirigido").val(idcl[2]);

          telefono = idcl[1];

          celular = idcl[3];

          if (telefono === '') {
            $("#telefono_dirigido").val(celular);
          } else {
            $("#telefono_dirigido").val(telefono);
          }
        }, 100);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function actualizarCostos3() {
  var moneda_base = $("#monedaInicial3").val();
  var tc = $("#rate3").val();
  id = $("#cambioMoneda3").val();

  if (moneda_base == "USD" && id === "SOL") {
    var monto = 0.0;
    $("#tabla_art_proc > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item3"]').val()
      );
      nuevo_monto = parseFloat(monto * tc).toFixed(2);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total3"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total * tc).toFixed(2);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni3"]').val()
      );
      nuevo_preciou = parseFloat(preciou * tc).toFixed(2);
      precio_dscto = parseFloat(
        $(this).find("td").find('input[id="precio_dscto3"]').val()
      );
      nuevo_precio_dscto = parseFloat(precio_dscto * tc).toFixed(2);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv3"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(2);

      $(this).find("td").find('input[id="monto_item3"]').val(nuevo_monto);
      $(this)
        .find("td")
        .find('input[id="monto_total3"]')
        .val(nuevo_monto_total);
      $(this).find("td").find('input[id="precio_uni3"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv3"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_dscto3"]')
        .val(nuevo_precio_dscto);
      resumen_proc();
    });
  }
  if (moneda_base == "SOL" && id === "USD") {
    var monto = 0.0;
    $("#tabla_art_proc > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item3"]').val()
      );
      nuevo_monto = parseFloat(monto / tc).toFixed(2);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni3"]').val()
      );
      nuevo_preciou = parseFloat(preciou / tc).toFixed(2);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv3"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(2);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total3"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total / tc).toFixed(2);
      precio_dscto = parseFloat(
        $(this).find("td").find('input[id="precio_dscto3"]').val()
      );
      nuevo_precio_dscto = parseFloat(precio_dscto / tc).toFixed(2);

      $(this).find("td").find('input[id="monto_item3"]').val(nuevo_monto);
      $(this)
        .find("td")
        .find('input[id="monto_total3"]')
        .val(nuevo_monto_total);
      $(this).find("td").find('input[id="precio_uni3"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv3"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_dscto3"]')
        .val(nuevo_precio_dscto);
      resumen_proc();
    });
  }
  if (moneda_base == "USD" && id === "USD") {
    var monto = 0.0;
    $("#tabla_art_proc > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item3"]').val()
      );
      nuevo_monto = parseFloat(monto * tc).toFixed(2);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni3"]').val()
      );
      nuevo_preciou = parseFloat(preciou * tc).toFixed(2);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv3"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(2);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total3"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total * tc).toFixed(2);
      precio_dscto = parseFloat(
        $(this).find("td").find('input[id="precio_dscto3"]').val()
      );
      nuevo_precio_dscto = parseFloat(precio_dscto * tc).toFixed(2);
      $(this).find("td").find('input[id="monto_item3"]').val(nuevo_monto);
      $(this)
        .find("td")
        .find('input[id="monto_total3"]')
        .val(nuevo_monto_total);
      $(this).find("td").find('input[id="precio_uni3"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv3"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_dscto3"]')
        .val(nuevo_precio_dscto);
      resumen_proc();
    });
  }
  if (moneda_base == "SOL" && id === "SOL") {
    var monto = 0.0;
    $("#tabla_art_proc > tbody > tr").each(function () {
      monto = parseFloat(
        $(this).find("td").find('input[id="monto_item3"]').val()
      );
      nuevo_monto = parseFloat(monto / tc).toFixed(2);
      preciou = parseFloat(
        $(this).find("td").find('input[id="precio_uni3"]').val()
      );
      nuevo_preciou = parseFloat(preciou / tc).toFixed(2);
      precioigv = parseFloat(
        $(this).find("td").find('input[id="precio_igv3"]').val()
      );
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(2);
      monto_total = parseFloat(
        $(this).find("td").find('input[id="monto_total3"]').val()
      );
      nuevo_monto_total = parseFloat(monto_total / tc).toFixed(2);
      precio_dscto = parseFloat(
        $(this).find("td").find('input[id="precio_dscto3"]').val()
      );
      nuevo_precio_dscto = parseFloat(precio_dscto / tc).toFixed(2);
      $(this).find("td").find('input[id="monto_item3"]').val(nuevo_monto);
      $(this)
        .find("td")
        .find('input[id="monto_total3"]')
        .val(nuevo_monto_total);
      $(this).find("td").find('input[id="precio_uni3"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv3"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_dscto3"]')
        .val(nuevo_precio_dscto);
      resumen_proc();
    });
  }
  $("#modalCambios3").modal("hide");
}

function enviar_correo(docentry) {
  // docentry1 = parseInt(docentry);

  $.ajax({
    url: "correo_compra_intercompany.php",
    type: "POST",
    data: {
      docentry: docentry,
    },
    success: function (x) {
      //  alertify.success('Se envio Correo')
      console.log("go");
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}



function mapa_relaciones(docentry) {
  docentry = $("#docito").val();


  $("#modalmapa1").modal("show");
  // console.log("entra en mapa relaciones docentry: ", docentry);
  // 
  $.ajax({

    url: "mapa_relaciones.php",
    type: "POST",
    dataType: "json",
    data: {
      docentry: docentry,
    },
    success: function (x) {
      $("#drawflow").html(x);
      //console.log("entra: ", x);

      var id = document.getElementById("drawflow");
      var editor = new Drawflow(id);
      editor.reroute = true;
      let xy = 0;
      let cotizaciones = [];
      let pedidos = [];
      // for (let i = 0; i < x.length; i++) {
      //   let cotizacion = {
      //     id: i + 1,
      //     name: "Cotizacion1",
      //     data: {},
      //     class: "welcome",
      //     html:
      //    '\n <div>\n <div class="title-box">📝 Cotizacion</div>\n <div class="box">\n 🔑<b>SAP: #' +
      //     x[i].doc_sap +
      //     '</b>\n <br>\n 🌎<b>IMOB: #' +
      //     x[i].doc_coti +
      //     '</b>\n <br>\n 📅  ' +
      //     x[i].fecha_coti + "<br>\n 💲" +
      //     x[i].total_coti + ' ' +
      //     x[i].moneda_coti + "<br>\n <br>\n </div>\n </div>\n",

      //     typenode: false,
      //     inputs: {},
      //     outputs: {
      //       output_1: {
      //         connections: [{ node: 1, output: "input_1" }],
      //       },
      //     },
      //     pos_x: 50,
      //     pos_y: 50
      //   };
      //   cotizaciones.push(cotizacion);
      // }
      for (let i = 0; i < x.length; i++) {
        // x[i].doc_sap ='02'

        let status = x[i].status_coti;
        let html;

        if (status === "02") {
          html =
            '\n <div style="position: relative; background-color: rgba(255, 0, 0, 0.1);">\n' +
            '<div class="title-box">📝 Cotizacion</div>\n' +
            '<div class="box">\n 🔑<b>SAP: #' +
            x[i].doc_sap +
            "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
            x[i].doc_coti +
            "</b>\n <br>\n 📅  " +
            x[i].fecha_coti +
            "<br>\n 💲" +
            x[i].total_coti +
            " " +
            x[i].moneda_coti +
            "</b>\n <br>\n 📦  " +
            "" + x[i].oc_coti + "</b>\n <br>\n" +
            '</div>\n' +
            "<br>\n <br>\n </div>\n" +
            '<div style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; color: rgba(255, 0, 0, 0.3); z-index: 0; pointer-events: none;">❌</div>\n' +
            "</div>\n";
        } else {
          html =
            '\n <div>\n <div class="title-box">📝 Cotizacion</div>\n <div class="box">\n 🔑<b>SAP: #' +
            x[i].doc_sap +
            "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
            x[i].doc_coti +
            "</b>\n <br>\n 📅  " +
            x[i].fecha_coti +
            "<br>\n 💲" +
            x[i].total_coti +
            " " +
            x[i].moneda_coti +
            "</b>\n <br>\n 📦  " +
            "" + x[i].oc_coti + "</b>\n <br>\n" +
            '</div>\n' +
            "<br>\n <br>\n </div>\n </div>\n";
        }

        let cotizacion = {
          id: i + 1,
          name: "Cotizacion1",
          data: {},
          class: "welcome",
          html: html, // Asignar el HTML generado al objeto
          typenode: false,
          inputs: {},
          outputs: {
            output_1: {
              connections: [{ node: 1, output: "input_1" }],
            },
          },
          pos_x: 50,
          pos_y: 50,
        };
        cotizaciones.push(cotizacion);
      }
      $.ajax({
        url: "mapa_relaciones2.php",
        type: "POST",
        dataType: "json",
        data: {
          docentry: docentry,
        },
        success: function (y) {
          for (let j = 0; j < y.length; j++) {
            let status = y[j].status_pedido;
            let html;

            // Lógica condicional para el contenido del HTML
            if (status === "2") {
              html =
                '\n <div style="position: relative;">\n' +
                '<div class="title-box">🏷️ Pedido</div>\n' +
                '<div class="box" >\n 🔑<b>' +
                (y[j].doc_sap
                  ? "SAP: # " + y[j].doc_sap
                  : "SAP:😞 No Migrado") +
                "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                y[j].doc_pedi +
                "</b>\n <br>\n 📅" +
                y[j].fecha_des +
                "<br>\n 💲 " +
                y[j].total_pedido +
                " " +
                y[j].moneda_pedido +
                "</b>\n <br>\n 📦  " +
                "" + y[j].oc_coti + "</b>\n <br>\n" +
                "<br>\n <br>\n </div>\n" +
                '<div style="position: relative;">\n' +
                '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
                //'<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
                "</div>\n" +
                "</div>\n";
            } else {
              html =
                '\n <div>\n <div class="title-box">🏷️ Pedido</div>\n <div class="box">\n 🔑<b>' +
                (y[j].doc_sap
                  ? "SAP: # " + y[j].doc_sap
                  : "SAP:😞 No Migrado") +
                "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                y[j].doc_pedi +
                "</b>\n <br>\n 📅" +
                y[j].fecha_des +
                "<br>\n 💲 " +
                y[j].total_pedido +
                " " +
                y[j].moneda_pedido +
                "</b>\n <br>\n 📦  " +
                "" + y[j].oc_coti + "</b>\n <br>\n" +
                "<br>\n <br>\n </div>\n </div>\n";
            }

            let pedido = {
              id: 2,
              name: "pedido2",
              data: {},
              class: "welcome",
              html: html, // Asignar el HTML generado según la condición
              typenode: false,
              inputs: {
                input_1: { connections: [{ node: 1, input: "output_1" }] },
              },
              outputs: {
                output_1: { connections: [{ node: (1 + y.length), output: "input_1" }] },
              },
              pos_x: 300,
              pos_y: 50,
            };

            cotizaciones.push(pedido);
          }

          $.ajax({
            url: "mapa_relaciones3.php",
            type: "POST",
            dataType: "json",
            data: {
              docentry: docentry,
            },
            success: function (z) {
              console.log(z);
              xy = 1;
              let previousNodeId = null; // Variable para almacenar el ID del nodo anterior

              // if (z[0].doc_sap ==null) {

              // }else{
              for (let k = 0; k < z.length; k++) {
                let status = "03";
                let html;

                if (z[k].doc_des === null) {
                  continue; // Continúa con la siguiente iteración
                }

                if (status === "02") {
                  console.log('entro');

                  // Suponiendo que '2' es el valor de interés
                  html =
                    '\n <div style="position: relative;">\n' +
                    '<div class="title-box">🚚 Despacho</div>\n' +
                    '<div class="box" style="background-color: rgba(255, 0, 0, 0.1);">\n 🔑<b>' +
                    (z[k].doc_sap
                      ? "SAP: # " + z[k].doc_sap
                      : "SAP:😞 No Migrado") +
                    "\n <br>\n  📅 " +
                    z[k].fecha_des +
                    "<br>\n 💲 " +
                    z[k].total_des +
                    " " +
                    z[k].moneda_des +
                    "</b>\n <br>\n 📦  " +
                    "" + z[k].oc_coti + "</b>\n <br>\n" +
                    "<br>\n <br>\n </div>\n" +
                    '<div style="position: relative;">\n' +
                    '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
                    // '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
                    "</div>\n" +
                    "</div>\n";
                } else {
                  html =
                    '\n <div>\n <div class="title-box">🚚 Despacho</div>\n <div class="box">\n 🔑<b>' +
                    (z[k].doc_sap
                      ? "SAP: # " + z[k].doc_sap
                      : "SAP:😞 No Migrado") +
                    "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    z[k].doc_des +
                    "\n <br>\n  📅 " +
                    z[k].fecha_des +
                    "<br>\n 💲 " +
                    z[k].total_des +
                    " " +
                    z[k].moneda_des +
                    "</b>\n <br>\n 📦  " +
                    "" + z[k].oc_coti + "</b>\n <br>\n" +
                    "<br>\n <br>\n </div>\n </div>\n";
                }

                let despacho = {
                  id: x.length + y.length + 1, // Incrementar ID para cada despacho
                  name: "despacho3",
                  data: {},
                  class: "welcome",
                  html: html, // Asignar el HTML generado según la condición
                  typenode: false,
                  inputs: {
                    input_1: { connections: [{ node: (2), input: "output_1" }] },
                  },
                  outputs: {
                    output_1: {
                      connections: [{ node: (x.length + y.length + 1 + 1), output: "input_1" }],
                    },
                  },
                  pos_x: 700,
                  pos_y: 50,
                };

                // if (k.length > y.length + 1) {
                //   despacho.outputs.output_1.connections.push({
                //     node: x.length + y.length + z.length + 1, // ID del siguiente nodo
                //     output: "input_1",
                //   });
                // }
                cotizaciones.push(despacho);
                xy++;
              }
            },
            error: function (jqXHR, estado, error) { },
          });
          $.ajax({
            url: "mapa_relaciones4.php",
            type: "POST",
            dataType: "json",
            data: {
              docentry: docentry,
            },
            success: function (w) {
              console.log(w);
              z = xy + 1;
              // if (z[0].doc_sap ==null) {

              // }else{
              for (let l = 0; l < w.length; l++) {
                let status = 2;
                let html;
                if (w[l].doc_fact === null) {
                  continue; // Continúa con la siguiente iteración
                }
                // Lógica condicional para ajustar el HTML según el status
                if (status === "2") {
                  // Suponiendo que '2' es el estado de interés
                  html =
                    '\n <div style="position: relative;">\n' +
                    '<div class="title-box">📑 Fact. de Clientes</div>\n' +
                    '<div class="box" >\n 🔑<b>SAP: #' +
                    w[l].doc_fact +
                    //"</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    //w[l].doc_factura_web +
                    "\n <br>\n 📅 " +
                    w[l].fecha_fact +
                    "<br>\n 💲 " +
                    w[l].total_fact +
                    " " +
                    w[l].moneda_fact +
                    "</b>\n <br>\n 📦  " +
                    "" + w[l].oc_coti + "</b>\n <br>\n" +
                    "<br>\n <br>\n </div>\n" +
                    '<div style="position: relative;">\n' +
                    '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
                    //  '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
                    "</div>\n" +
                    "</div>\n";
                } else {
                  html =
                    '\n <div>\n <div class="title-box">📑 Fact. de Clientes</div>\n <div class="box">\n 🔑<b>SAP: #' +
                    w[l].doc_fact +
                    //"</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    //w[l].doc_factura_web +
                    "\n <br>\n 📅 " +
                    w[l].fecha_fact +
                    "<br>\n 💲 " +
                    w[l].total_fact +
                    " " +
                    w[l].moneda_fact +
                    "</b>\n <br>\n 📦  " +
                    "" + w[l].oc_coti + "</b>\n <br>\n" +
                    "<br>\n <br>\n </div>\n </div>\n";
                }

                let factura = {
                  id: x.length + y.length + z.length + 1, // Generar un ID único
                  name: "fact_prov5",
                  data: {},
                  class: "welcome",
                  html: html, // Asignar el HTML generado según la condición
                  typenode: false,
                  inputs: {
                    input_1: {
                      connections: [{ node: (x.length + y.length + 1), input: "output_1" }],
                    },
                  },
                  outputs: {
                    // Puedes agregar conexiones aquí si es necesario
                  },
                  pos_x: 950,
                  pos_y: 50,
                };

                cotizaciones.push(factura);
                xy++;
              }
            },
            error: function (jqXHR, estado, error) { },
          });
        },
        error: function (jqXHR, estado, error) { },
      });

      editor.drawflow.drawflow.Home.data = cotizaciones;
      //console.log(cotizaciones);

      setTimeout(() => {
        editor.start();
      }, 500);
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}





//

// function mapa_relaciones(docentry) {
//   $("#modalmapa1").modal("show");
//   console.log("entra en mapa relaciones docentry: ", docentry);

//   $.ajax({
//     url: "mapa_relaciones.php",
//     type: "POST",
//     dataType: "json",
//     data: {
//       docentry: docentry,
//     },
//     success: function (x) {
//       $("#drawflow").html(x);
//       console.error("Error:", x);

//       var id = document.getElementById("drawflow");
//       var editor = new Drawflow(id);
//       editor.reroute = true;

//       let cotizaciones = [];
//       let pedidos = [];
//       // for (let i = 0; i < x.length; i++) {
//       //   let cotizacion = {
//       //     id: i + 1,
//       //     name: "Cotizacion1",
//       //     data: {},
//       //     class: "welcome",
//       //     html:
//       //    '\n <div>\n <div class="title-box">📝 Cotizacion</div>\n <div class="box">\n 🔑<b>SAP: #' +
//       //     x[i].doc_sap +
//       //     '</b>\n <br>\n 🌎<b>IMOB: #' +
//       //     x[i].doc_coti +
//       //     '</b>\n <br>\n 📅  ' +
//       //     x[i].fecha_coti + "<br>\n 💲" +
//       //     x[i].total_coti + ' ' +
//       //     x[i].moneda_coti + "<br>\n <br>\n </div>\n </div>\n",

//       //     typenode: false,
//       //     inputs: {},
//       //     outputs: {
//       //       output_1: {
//       //         connections: [{ node: 1, output: "input_1" }],
//       //       },
//       //     },
//       //     pos_x: 50,
//       //     pos_y: 50
//       //   };
//       //   cotizaciones.push(cotizacion);
//       // }
//       for (let i = 0; i < x.length; i++) {
//         // x[i].doc_sap ='02'

//         let status = x[i].status_coti;
//         let html;
//         console.error("Error mmmm:", x);

//         if (status === "02") {
//           html =
//             '\n <div style="position: relative; background-color: rgba(255, 0, 0, 0.1);">\n' +
//             '<div class="title-box">📝 Cotizacion</div>\n' +
//             '<div class="box">\n 🔑<b>SAP: #' +
//             x[i].doc_sap +
//             "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//             x[i].doc_coti +
//             "</b>\n <br>\n 📅  " +
//             x[i].fecha_coti +
//             "<br>\n 💲" +
//             x[i].total_coti +
//             " " +
//             x[i].moneda_coti +
//             "<br>\n <br>\n </div>\n" +
//             '<div style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; color: rgba(255, 0, 0, 0.3); z-index: 0; pointer-events: none;">❌</div>\n' +
//             "</div>\n";
//         } else {
//           html =
//             '\n <div>\n <div class="title-box">📝 Cotizacion</div>\n <div class="box">\n 🔑<b>SAP: #' +
//             x[i].doc_sap +
//             "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//             x[i].doc_coti +
//             "</b>\n <br>\n 📅  " +
//             x[i].fecha_coti +
//             "<br>\n 💲" +
//             x[i].total_coti +
//             " " +
//             x[i].moneda_coti +
//             "<br>\n <br>\n </div>\n </div>\n";
//         }

//         let cotizacion = {
//           id: i + 1,
//           name: "Cotizacion1",
//           data: {},
//           class: "welcome",
//           html: html, // Asignar el HTML generado al objeto
//           typenode: false,
//           inputs: {},
//           outputs: {
//             output_1: {
//               connections: [{ node: 1, output: "input_1" }],
//             },
//           },
//           pos_x: 50,
//           pos_y: 50,
//         };
//         cotizaciones.push(cotizacion);
//       }
//       $.ajax({
//         url: "mapa_relaciones2.php",
//         type: "POST",
//         dataType: "json",
//         data: {
//           docentry: docentry,
//         },
//         success: function (y) {
//           for (let j = 0; j < y.length; j++) {
//             let status = y[j].status_pedido;
//             let html;
//             console.error("Error y:", y);

//             // Lógica condicional para el contenido del HTML
//             if (status === "2") {
//               html =
//                 '\n <div style="position: relative;">\n' +
//                 '<div class="title-box">🏷️ Pedido</div>\n' +
//                 '<div class="box" >\n 🔑<b>' +
//                 (y[j].doc_sap
//                   ? "SAP: # " + y[j].doc_sap
//                   : "SAP:😞 No Migrado") +
//                 "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//                 y[j].doc_pedi +
//                 "</b>\n <br>\n 📅" +
//                 y[j].fecha_des +
//                 "<br>\n 💲 " +
//                 y[j].total_pedido +
//                 " " +
//                 y[j].moneda_pedido +
//                 "<br>\n <br>\n </div>\n" +
//                 '<div style="position: relative;">\n' +
//                 '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
//                 '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
//                 "</div>\n" +
//                 "</div>\n";
//             } else {
//               html =
//                 '\n <div>\n <div class="title-box">🏷️ Pedido</div>\n <div class="box">\n 🔑<b>' +
//                 (y[j].doc_sap
//                   ? "SAP: # " + y[j].doc_sap
//                   : "SAP:😞 No Migrado") +
//                 "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//                 y[j].doc_pedi +
//                 "</b>\n <br>\n 📅" +
//                 y[j].fecha_des +
//                 "<br>\n 💲 " +
//                 y[j].total_pedido +
//                 " " +
//                 y[j].moneda_pedido +
//                 "<br>\n <br>\n </div>\n </div>\n";
//             }

//             let pedido = {
//               id: 2,
//               name: "pedido2",
//               data: {},
//               class: "welcome",
//               html: html, // Asignar el HTML generado según la condición
//               typenode: false,
//               inputs: {
//                 input_1: { connections: [{ node: 1, input: "output_1" }] },
//               },
//               outputs: {
//                 output_1: {
//                   connections: [{ node: 1 + y.length, output: "input_1" }],
//                 },
//               },
//               pos_x: 300,
//               pos_y: 50,
//             };

//             cotizaciones.push(pedido);
//           }

//           $.ajax({
//             url: "mapa_relaciones3.php",
//             type: "POST",
//             dataType: "json",
//             data: {
//               docentry: docentry,
//             },
//             success: function (z) {
//               console.log(z);
//               xy = 1;
//               let previousNodeId = null; // Variable para almacenar el ID del nodo anterior

//               // if (z[0].doc_sap ==null) {

//               // }else{
//               for (let k = 0; k < z.length; k++) {
//                 let status = z[k].status_des;
//                 let html;

//                 if (z[k].doc_des === null) {
//                   continue; // Continúa con la siguiente iteración
//                 }

//                 if (status === "02") {
//                   // Suponiendo que '2' es el valor de interés
//                   html =
//                     '\n <div style="position: relative;">\n' +
//                     '<div class="title-box">🚚 Despacho</div>\n' +
//                     '<div class="box" style="background-color: rgba(255, 0, 0, 0.1);">\n 🔑<b>' +
//                     (z[k].doc_sap
//                       ? "SAP: # " + z[k].doc_sap
//                       : "SAP:😞 No Migrado") +
//                     "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//                     z[k].doc_des +
//                     "\n <br>\n  📅 " +
//                     z[k].fecha_des +
//                     "<br>\n 💲 " +
//                     z[k].total_des +
//                     " " +
//                     z[k].moneda_des +
//                     "<br>\n <br>\n </div>\n" +
//                     '<div style="position: relative;">\n' +
//                     '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
//                     '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
//                     "</div>\n" +
//                     "</div>\n";
//                 } else {
//                   html =
//                     '\n <div>\n <div class="title-box">🚚 Despacho</div>\n <div class="box">\n 🔑<b>' +
//                     (z[k].doc_sap
//                       ? "SAP: # " + z[k].doc_sap
//                       : "SAP:😞 No Migrado") +
//                     "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//                     z[k].doc_des +
//                     "\n <br>\n  📅 " +
//                     z[k].fecha_des +
//                     "<br>\n 💲 " +
//                     z[k].total_des +
//                     " " +
//                     z[k].moneda_des +
//                     "<br>\n <br>\n </div>\n </div>\n";
//                 }

//                 let despacho = {
//                   id: x.length + y.length + xy + 1, // Incrementar ID para cada despacho
//                   name: "despacho3",
//                   data: {},
//                   class: "welcome",
//                   html: html, // Asignar el HTML generado según la condición
//                   typenode: false,
//                   inputs: {
//                     input_1: {
//                       input_1: previousNodeId ? { connections: [{ node: previousNodeId, input: "output_1" }] } : {},
//                     },
//                   },
//                   outputs: {
//                     output_1: {
//                       connections: [{ node: 1 + y.length, output: "input_1" }],
//                     },
//                   },
//                   pos_x: 700,
//                   pos_y: 50,
//                 };

//                 if (w.length > l + 1) {
//                   despacho.outputs.output_1.connections.push({
//                     node: x.length + y.length + z.length + l + 2, // ID del siguiente nodo
//                     output: "input_1",
//                   });
//                 }
//                 cotizaciones.push(despacho);
//                 xy++;
//               }
//             },
//             error: function (jqXHR, estado, error) { },
//           });
//           $.ajax({
//             url: "mapa_relaciones4.php",
//             type: "POST",
//             dataType: "json",
//             data: {
//               docentry: docentry,
//             },
//             success: function (w) {
//               console.log(w);
//               z = xy + 1;
//               // if (z[0].doc_sap ==null) {

//               // }else{
//               for (let l = 0; l < w.length; l++) {
//                 let status = w[l].status_fact;
//                 let html;

//                 // Lógica condicional para ajustar el HTML según el status
//                 if (status === "2") {
//                   // Suponiendo que '2' es el estado de interés
//                   html =
//                     '\n <div style="position: relative;">\n' +
//                     '<div class="title-box">📑 Fact. de Clientes</div>\n' +
//                     '<div class="box" >\n 🔑<b>SAP: #' +
//                     w[l].doc_fact +
//                     "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//                     w[l].doc_factura_web +
//                     "\n <br>\n 📅 " +
//                     w[l].fecha_fact +
//                     "<br>\n 💲 " +
//                     w[l].total_fact +
//                     " " +
//                     w[l].moneda_fact +
//                     "<br>\n <br>\n </div>\n" +
//                     '<div style="position: relative;">\n' +
//                     '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
//                     '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
//                     "</div>\n" +
//                     "</div>\n";
//                 } else {
//                   html =
//                     '\n <div>\n <div class="title-box">📑 Fact. de Clientes</div>\n <div class="box">\n 🔑<b>SAP: #' +
//                     w[l].doc_fact +
//                     "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
//                     w[l].doc_factura_web +
//                     "\n <br>\n 📅 " +
//                     w[l].fecha_fact +
//                     "<br>\n 💲 " +
//                     w[l].total_fact +
//                     " " +
//                     w[l].moneda_fact +
//                     "<br>\n <br>\n </div>\n </div>\n";
//                 }

//                 let despacho = {
//                   id: x.length + y.length + z.length + l + 1, // Generar un ID único
//                   name: "fact_prov5",
//                   data: {},
//                   class: "welcome",
//                   html: html, // Asignar el HTML generado según la condición
//                   typenode: false,
//                   inputs: {
//                     input_1: {
//                       connections: [{ node: xy + 1, input: "output_1" }],
//                     },
//                   },
//                   outputs: {
//                     // Puedes agregar conexiones aquí si es necesario
//                   },
//                   pos_x: 900,
//                   pos_y: 50,
//                 };

//                 cotizaciones.push(despacho);
//                 xy++;
//               }
//             },
//             error: function (jqXHR, estado, error) { },
//           });
//         },
//         error: function (jqXHR, estado, error) { },
//       });

//       editor.drawflow.drawflow.Home.data = cotizaciones;
//       console.log(cotizaciones);

//       setTimeout(() => {
//         editor.start();
//       }, 500);
//     },
//     error: function (jqXHR, estado, error) {


//     },
//   });
// }

$(document).ready(function () {
  // Hacer que las filas del tbody sean arrastrables
  $("#tabla_articulos tbody").sortable({
    items: "tr", // Solo permite arrastrar filas
    cursor: "move",
    axis: "y", // Restringir el movimiento al eje vertical
    stop: function (event, ui) {
      actualizarNumeros();
      // Resaltar la fila movida temporalmente
      ui.item.addClass("cambio-fila");

      // Remover la clase después de unos segundos
      setTimeout(function () {
        ui.item.removeClass("cambio-fila");
      }, 1000); // 1000 ms = 1 segundo
    }
  });

  // Función para actualizar la numeración de las filas
  function actualizarNumeros() {
    $("#tabla_articulos tbody tr").each(function (index) {
      $(this).find(".row-number").text(index + 1); // Asigna el nuevo número de fila
    });
  }

  // Llamar a actualizarNumeros al cargar la página para asegurarse de que la numeración esté correcta
  actualizarNumeros();
});

function procesar_datos_contacto() {
  $(document).ready(function () {

    let errores = []; // Lista de errores
    let camposIncompletos = []; // Para resaltar los campos en rojo

    let nombre = $("#contacto_nombre").val();
    let posicion = $("#posicion").val();
    let telefono = $("#telefono1").val();
    let correo = $("#correo").val();

    $(".error-input").removeClass("error-input");
    $(".error-box").removeClass("error-box");

    // Validación de nombre
    if (nombre.trim() === '') {
      errores.push("El nombre no puede estar vacío.");
      camposIncompletos.push("#contacto_nombre");
    }

    // Validación de teléfono
    const telefonoRegex = /^9\d{8}$/;
    if (telefono.trim() === '') {
      errores.push("El teléfono no puede estar vacío.");
      camposIncompletos.push("#telefono1");
    } else if (!telefonoRegex.test(telefono)) {
      errores.push("El teléfono debe tener 9 dígitos y comenzar con 9.");
      camposIncompletos.push("#telefono1");
    }

    // Validación de correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gob|gov|es|pe|mx|cl|co|ar|hotmail|gmail|yahoo)(\.[a-z]{2,})?$/i;
    if (correo.trim() === '') {
      errores.push("El correo no puede estar vacío.");
      camposIncompletos.push("#correo");
    } else if (!correo.includes("@")) {
      errores.push("El correo debe contener el símbolo '@'.");
      camposIncompletos.push("#correo");
    } else if (!correoRegex.test(correo)) {
      errores.push("El correo debe tener un formato válido y terminar con un dominio correcto (ej. .com, .pe, .hotmail).");
      camposIncompletos.push("#correo");
    }

    if (errores.length > 0) {
      camposIncompletos.forEach(selector => {
        $(selector).addClass("error-input");
      });

      Swal.fire({
        title: "¡Campos incompletos o inválidos!",
        html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
        toast: false,
        position: "center"
      });

      return false;
    }

    let band = true;
    ejecutarRegistroContacto(band);
  });
}

function ejecutarRegistroContacto(band) {

  if (!band) return; // Si 'band' es falso, no hace nada

  let contactoData = {
    cardcode: $("#codigo_cardcode").val(),
    nombre: $("#contacto_nombre").val(),
    apellido: $("#contacto_apellidos").val(),
    posicion: $("#posicion").val(),
    telefono: $("#telefono1").val(),
    correo_electronico: $("#correo").val(),
    observaciones: $("#observaciones2").val(),
  }

  console.log("Contacto Generado:", contactoData);

  $.ajax({
    beforeSend: function () {
      // Mostrar el loader antes de enviar la solicitud
      Swal.fire({
        title: "Migrando Contacto a SAP...",
        html: '<div class="spinner"></div>',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta
        showConfirmButton: false // No muestra botón de confirmación
      });
    },
    url: "server_layer_crear_contacto.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(contactoData),
    success: function (response) {

      console.log(JSON.stringify(contactoData));
      console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?

      try {
        let res = typeof response === "string" ? JSON.parse(response) : response;

        Swal.close();

        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Contacto registrado",
            text: `Se ha insertado el Contacto con éxito.`,
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            $('#modal_registrar_contacto').modal('hide');
          }, 1500);

        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message || "Ocurrió un error desconocido",
          });
        }
      } catch (error) {
        console.error("Error al procesar respuesta JSON:", error);
      }
    },

    error: function (jqXHR, estado, error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
        confirmButtonText: "Cerrar"
      });
      console.error("Error AJAX:", estado, error);
    }
  });
}


let valorAgencia = null;
let valorModaPago = null;
let valorModaDestino = null;

function datos_adicionales() {
  // Guardar los valores actuales antes de volver a cargar (si existen)
  valorAgencia = $("#id_agencia select").val() || valorAgencia;
  valorModaPago = $("#id_moda_pago select").val() || valorModaPago;
  valorModaDestino = $("#id_moda_destino select").val() || valorModaDestino;

  // Mostrar el modal
  $("#modal_datos_adicionales").modal("show");
  var doc = $("#doc_sap").val();

  $("#id_observaciones").val("");

  var emp = "C";
  $("#docito_adicionales").val(doc);
  $("#empresa_adicionales").val(emp);

  // Cargar listas
  lista_agencia();
  lista_mod_pago();
  lista_modalidad_destino();
}

function lista_agencia() {
  $.ajax({
    beforeSend: function () {
      $("#id_agencia").html("Recuperando Lista ...");
    },
    url: "lista_agencias_coti.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#id_agencia").html(x);
      $(".select2").select2();

      // ✅ Reaplicar selección anterior
      if (valorAgencia) {
        $("#id_agencia select").val(valorAgencia).trigger("change");
      }
    },
    error: function (jqXHR, estado, error) {
      console.error("Error en lista_agencia:", error);
    },
  });
}

function lista_mod_pago() {
  $.ajax({
    beforeSend: function () {
      $("#id_moda_pago").html("Recuperando Lista ...");
    },
    url: "lista_mod_pago_coti.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#id_moda_pago").html(x);
      $(".select2").select2();

      // ✅ Reaplicar selección anterior
      if (valorModaPago) {
        $("#id_moda_pago select").val(valorModaPago).trigger("change");
      }
    },
    error: function (jqXHR, estado, error) {
      console.error("Error en lista_mod_pago:", error);
    },
  });
}

function lista_modalidad_destino() {
  $.ajax({
    beforeSend: function () {
      $("#id_moda_destino").html("Recuperando Lista ...");
    },
    url: "lista_modalidad_destino_coti.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#id_moda_destino").html(x);
      $(".select2").select2();

      // ✅ Reaplicar selección anterior
      if (valorModaDestino) {
        $("#id_moda_destino select").val(valorModaDestino).trigger("change");
      }
    },
    error: function (jqXHR, estado, error) {
      console.error("Error en lista_modalidad_destino:", error);
    },
  });
}

function pon_almacen() {
  agencia = $("#id_agencia option:selected").val();

  $.ajax({
    beforeSend: function () {

    },
    url: "coloca_agencia.php",
    type: "POST",
    data: { agencia },
    success: function (x) {

      var data = x;
      var idcl = data.split("|");

      $("#id_emp").val(idcl[1]);
      $("#id_dir_trans").val(idcl[2]);

    },
    error: function (jqXHR, estado, error) { },
  });
}

function guarda_form_datos_adicionales() {
  let id_docentry = $("#docito_adicionales").val();
  // let id_observaciones = quitarAcentos($("#id_observaciones").val().toUpperCase().trim());
  let id_observaciones = $("#id_observaciones").val().toUpperCase();
  let id_emp = quitarAcentos($("#id_emp").val());
  let id_dir_trans = quitarAcentos($("#id_dir_trans").val());
  let id_ubicacion = $("#id_ubicacion").val();
  let id_dir_destino = $("#id_dir_destino").val();
  let id_moda_destino = $("#id_moda_destino option:selected").val();
  let id_moda_pago = $("#id_moda_pago option:selected").val();

  let archivo = [];
  let archivoguia = [];
  let empresa = "C";
  let bandera = true;

  // ✅ Validaciones
  if (id_observaciones === "") {
    bandera = false;
    alertify.error("Debe ingresar las Instrucciones para el Despacho");
    $("#id_observaciones").focus();
  } else if (id_observaciones.length >= 201) {
    bandera = false;
    alertify.error("Las observaciones deben tener menos de 200 caracteres");
  }

  if (id_emp === "") {
    bandera = false;
    alertify.error("Debe ingresar la Empresa de Transporte");
  } else if (id_emp.length >= 101) {
    bandera = false;
    alertify.error("La Empresa de Transporte debe tener menos de 100 caracteres");
  }

  if (id_dir_trans === "") {
    bandera = false;
    alertify.error("Debe ingresar la Dirección del Transportista");
  } else if (id_dir_trans.length >= 201) {
    bandera = false;
    alertify.error("La Dirección del Transportista debe tener menos de 200 caracteres");
  }

  if (id_ubicacion === "") {
    bandera = false;
    alertify.error("Debe ingresar la Ubicación del Transporte");
  } else if (id_ubicacion.length >= 201) {
    bandera = false;
    alertify.error("La Ubicación del Transporte debe tener menos de 200 caracteres");
  }

  if (id_dir_destino === "") {
    bandera = false;
    alertify.error("Debe ingresar la Dirección de Destino");
  } else if (id_dir_destino.length >= 201) {
    bandera = false;
    alertify.error("La Dirección de Destino debe tener menos de 200 caracteres");
  }

  if (id_moda_destino === "-1" || id_moda_destino === "") {
    bandera = false;
    alertify.error("Seleccione la Modalidad de Destino");
  }

  if (id_moda_pago === "-1" || id_moda_pago === "") {
    bandera = false;
    alertify.error("Seleccione la Modalidad de Pago");
  }

  // ❌ Si hay errores, mostramos alerta general y destacamos el botón
  if (!bandera) {
    // 🔔 Alerta general
    swal({
      title: "Campos incompletos",
      text: "Algunos campos en 'Datos Adicionales' deben ser completados. Haz clic en el botón 'Datos Adicionales' para revisarlos.",
      icon: "warning",
      button: "Entendido"
    });

    // ✳️ Resalta el botón (parpadeo rojo)
    const boton = $("#btn_datos_adicionales");
    boton.addClass("btn-danger").removeClass("btn-info");

    // Efecto parpadeo suave
    boton.fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);

    // Luego de 3s vuelve a su color original
    setTimeout(() => {
      boton.removeClass("btn-danger").addClass("btn-info");
    }, 3000);

    return false;
  }

  // ✅ Recolectar archivos
  $("#tabla_archivos_registrados tbody tr").each(function () {
    let nombreArchivo = $(this).find("td").eq(1).text().trim();
    if (nombreArchivo) archivo.push(nombreArchivo);
  });

  $("#tabla_archivos_guia tbody tr").each(function () {
    let nombreArchivo = $(this).find("td").eq(1).text().trim();
    if (nombreArchivo) archivoguia.push(nombreArchivo);
  });

  let archivos = archivo.join(",");
  let archivosGuia = archivoguia.join(",");

  // ✅ Recolectar contactos
  let comta1 = "", dni1 = "", tele1 = "";
  let comta2 = "", dni2 = "", tele2 = "";
  let comta3 = "", dni3 = "", tele3 = "";

  $("#miTabla > tbody > tr").each(function () {
    comta1 = $(this).find("input[id='conta1']").val();
    dni1 = $(this).find("input[id='dni1']").val();
    tele1 = $(this).find("input[id='tele1']").val();
  });

  $("#miTabla1 > tbody > tr").each(function () {
    comta2 = $(this).find("input[id='conta2']").val();
    dni2 = $(this).find("input[id='dni2']").val();
    tele2 = $(this).find("input[id='tele2']").val();
  });

  $("#miTabla2 > tbody > tr").each(function () {
    comta3 = $(this).find("input[id='conta3']").val();
    dni3 = $(this).find("input[id='dni3']").val();
    tele3 = $(this).find("input[id='tele3']").val();
  });

  // ✅ Enviar datos
  $.ajax({
    url: "insertar_datos_adicionales_despacho.php",
    type: "POST",
    data: {
      id_docentry: id_docentry,
      id_observaciones: id_observaciones,
      id_emp: id_emp,
      id_dir_trans: id_dir_trans,
      id_ubicacion: id_ubicacion,
      id_dir_destino: id_dir_destino,
      id_moda_destino: id_moda_destino,
      id_moda_pago: id_moda_pago,
      comta1: comta1,
      dni1: dni1,
      tele1: tele1,
      comta2: comta2,
      dni2: dni2,
      tele2: tele2,
      comta3: comta3,
      dni3: dni3,
      tele3: tele3,
      archivo: archivos,
      archivoguia: archivosGuia,
      empresa: empresa
    },

    success: function () {
      console.log("Datos adicionales registrados correctamente");
    },
    error: function (jqXHR, estado, error) {
      $("#errores").html("Error... " + estado + "  " + error);
    }
  });

  return true; // ✅ Todo OK
}

// function guarda_form_datos_adicionales() {
//   let id_docentry = $("#docito_adicionales").val();
//   let id_observaciones = quitarAcentos($("#id_observaciones").val().toUpperCase().trim());
//   let id_emp = quitarAcentos($("#id_emp").val());
//   let id_dir_trans = quitarAcentos($("#id_dir_trans").val());
//   let id_ubicacion = $("#id_ubicacion").val();
//   let id_dir_destino = $("#id_dir_destino").val();
//   let id_moda_destino = $("#id_moda_destino option:selected").val();
//   let id_moda_pago = $("#id_moda_pago option:selected").val();
//   let empresa = "C";

//   let archivo = [];
//   let archivoguia = [];

//   // ✅ Recolectar archivos
//   $("#tabla_archivos_registrados tbody tr").each(function () {
//     let nombreArchivo = $(this).find("td").eq(1).text().trim();
//     if (nombreArchivo) archivo.push(nombreArchivo);
//   });

//   $("#tabla_archivos_guia tbody tr").each(function () {
//     let nombreArchivo = $(this).find("td").eq(1).text().trim();
//     if (nombreArchivo) archivoguia.push(nombreArchivo);
//   });

//   let archivos = archivo.join(",");
//   let archivosGuia = archivoguia.join(",");

//   // ✅ Recolectar contactos
//   let comta1 = "", dni1 = "", tele1 = "";
//   let comta2 = "", dni2 = "", tele2 = "";
//   let comta3 = "", dni3 = "", tele3 = "";

//   $("#miTabla > tbody > tr").each(function () {
//     comta1 = $(this).find("input[id='conta1']").val();
//     dni1 = $(this).find("input[id='dni1']").val();
//     tele1 = $(this).find("input[id='tele1']").val();
//   });

//   $("#miTabla1 > tbody > tr").each(function () {
//     comta2 = $(this).find("input[id='conta2']").val();
//     dni2 = $(this).find("input[id='dni2']").val();
//     tele2 = $(this).find("input[id='tele2']").val();
//   });

//   $("#miTabla2 > tbody > tr").each(function () {
//     comta3 = $(this).find("input[id='conta3']").val();
//     dni3 = $(this).find("input[id='dni3']").val();
//     tele3 = $(this).find("input[id='tele3']").val();
//   });

//   // ✅ Enviar datos
//   return $.ajax({
//     url: "insertar_datos_adicionales_despacho.php",
//     type: "POST",
//     data: {
//       id_docentry,
//       id_observaciones,
//       id_emp,
//       id_dir_trans,
//       id_ubicacion,
//       id_dir_destino,
//       id_moda_destino,
//       id_moda_pago,
//       comta1, dni1, tele1,
//       comta2, dni2, tele2,
//       comta3, dni3, tele3,
//       archivo: archivos,
//       archivoguia: archivosGuia,
//       empresa
//     }
//   })
//     .done(function () {
//       console.log("✅ Datos adicionales registrados correctamente");
//     })
//     .fail(function (jqXHR, estado, error) {
//       console.error("❌ Error al guardar datos adicionales:", estado, error);
//       alertify.error("No se pudieron guardar los datos adicionales");
//     });
// }


function Cargar_O_C() {
  $('#modal_regi_evi_oc').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });

  $('#modal_regi_evi_oc').on('show.bs.modal', function () {
    $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
  });

  doc = $("#doc_sap").val();
  nmeempresa = $("#CLIENTE").val();
  emp = "C";
  n_sap = $("#num_cliente").val().trim();
  oc_carga = $("#orden_compra_procesa").val();
  $('#fileToUpload_OC2').val('');
  // console.log(oc_carga);

  setTimeout(() => {
    $("#docentry_OC_subir").val(doc);
    $("#name_client_ocevi").val(nmeempresa);
    $("#empresa_oc_evi").val(emp);
    $("#nguia_ocevi").val(oc_carga);
  }, 500);

  listar_data_pdf_oc(doc);


  $('#modal_regi_evi_oc').on('hidden.bs.modal', function () {
    // Limpiar input file
    const fileInput = document.getElementById('fileToUpload_OC2');
    if (fileInput) fileInput.value = '';

    // Limpiar vista previa
    const previewArea = document.getElementById('preview-area');
    if (previewArea) previewArea.innerHTML = '';

    // Quitar posibles clases de estado visual
    $('#drop-area').removeClass('dragover');
  });

}

function Cargar_O_C() {
  $('#modal_regi_evi_oc').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });

  $('#modal_regi_evi_oc').on('show.bs.modal', function () {
    $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
  });

  doc = $("#doc_sap").val();
  nmeempresa = $("#CLIENTE").val();
  emp = "C";
  n_sap = $("#num_cliente").val().trim();
  oc_carga = $("#orden_compra_procesa").val();
  $('#fileToUpload_OC2').val('');
  // console.log(oc_carga);

  setTimeout(() => {
    $("#docentry_OC_subir").val(doc);
    $("#name_client_ocevi").val(nmeempresa);
    $("#empresa_oc_evi").val(emp);
    $("#nguia_ocevi").val(oc_carga);
  }, 500);

  listar_data_pdf_oc(doc);


  $('#modal_regi_evi_oc').on('hidden.bs.modal', function () {
    // Limpiar input file
    const fileInput = document.getElementById('fileToUpload_OC2');
    if (fileInput) fileInput.value = '';

    // Limpiar vista previa
    const previewArea = document.getElementById('preview-area');
    if (previewArea) previewArea.innerHTML = '';

    // Quitar posibles clases de estado visual
    $('#drop-area').removeClass('dragover');
  });

}

function listar_data_pdf_oc(id) {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#data_pdf_todos_OC").html("Buscando las ventas, un momento...");
      },
      url: "listar_despacho_pdf_oc_coti.php",
      type: "POST",
      data: { id: id },
      success: function (res) {
        $("#data_pdf_todos_OC").html(res);
        // $(document).ready(function () {
        //   $("#tabla_pfd_oc").DataTable();
        // });
      },
      error: function (jqXHR, estado, error) {
        alert(
          "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
        );
        $("#data_pdf_todos_OC").html(estado + "     " + error);
      },
    });
  });
}

$(document).ready(function () {
  $("form#data2").submit(function (event) {
    var formData = new FormData($(this)[0]);
    // var files = $("#fileToUpload_OC2")[0].files[0];
    var files = $("#fileToUpload_OC2")[0].files[0] || (droppedFiles ? droppedFiles[0] : undefined);

    var card_code = '-';
    var titulo = document.getElementById("docentry_OC_subir").value;
    var num = document.getElementById("docentry_OC_subir").value;
    var movi = '';
    var emp = 'C';
    var tipo = 'W'
    var comentario = '-'

    console.log(files);

    if (files === undefined) {
      alertify.error("no existe documento ");
      return false;
    }
    else {
      formData.append("file", files);
      formData.append("card_code", card_code);
      formData.append("titulo", titulo);
      formData.append("num", num);
      formData.append("movi", movi);
      formData.append("emp", emp);
      formData.append("comentario", comentario);
      formData.append("tipo", tipo);

      $.ajax({
        url: "registrar_pdf_despacho_OC_coti.php",
        type: "post",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
          $("#archivo_reg").val("");
          $("#titulo_reg").val("");
          $("#modal_registrar_evi").modal("hide");

          $("#fileToUpload_OC2").val("");
          previewArea.innerHTML = ""; // opcional: limpiar vista previa

          listar_data_pdf_oc(num)
        },
      });
      return false;
    }
  });
});

function ver_manual_pdf(id, ruta) {
  $global_id = id;
  $global_ruta = ruta;
  //console.log(id)
  $('#modal_data_pdf_guia').modal('show');
  $('.modal_data_pdf').on('shown.bs.modal', function () {      //correct here use 'shown.bs.modal' event which comes in bootstrap3
    $(this).find('iframe').attr('src', $global_ruta)
  })
  $("#navegador_guia").on('click', function () {
    //window.location.href = $global_ruta
    window.open($global_ruta);

  })
  $("#imprimir_guia").on('click', function () {
    $('#imprimir_guia')[0].contentWindow.print();
    //window.print();

  })
}

function elimnar_evi_oc(id, id_pedido, emp) {
  var num = document.getElementById("docentry_OC_subir").value;

  swal({
    title: "Desea Eliminar la OC?",
    text: "Está seguro que desea borrar el archivo seleccionado?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        beforeSend: function () {
          // $("#data_pdf_todos").html("Buscando las ventas, un momento...");
          swal_carga()
        },
        url: "eliminar_evidencia_oc.php",
        type: "POST",
        data: { id: id, emp: emp },
        success: function (res) {
          setTimeout(function () {
            swal.close(); // Cerrar el SweetAlert después del retraso
            swal("Archivo Eliminado", {
              icon: "success",
              buttons: false,
              closeModal: true,
              timer: 2000,
            });
            listar_data_pdf_oc(num)
          }, 1500); // 1500 milisegundos = 1.5 segundos
        },
        error: function (jqXHR, estado, error) {
          alert(
            "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
          );
          $("#data_pdf_todos").html(estado + "     " + error);
        },
      });
    } else {
      swal("No se ha eliminado");
    }
  });
}

function abrir_modal_detalle_articulo_transito() {
  $("#modal_detalle_articulo_transito").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    url: "consulta_detalle_transito_articulo.php",
    type: "POST",
    data: {},
    success: function (x) {
      $("#detalle_articulo_transito").html(x);
      $("#tabla_det_tran").DataTable({
        // dom: '<"top"lBf>rt<"bottom"ip>',
        // buttons: [
        //   {
        //     extend: "copy",
        //     text: '<i class="fa fa-copy"></i> Copiar',
        //     titleAttr: "Copiar",
        //     className: "btn btn-copy",
        //   }
        // ],
        // order: [[0, "desc"]],
        pageLength: 20,
        lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
        ordering: false, // ❌ Deshabilita la opción de ordenar columnas
        language: {
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
          Show: "Mostrar",
          search: "Buscar:",
          sLengthMenu: "Mostrar _MENU_ registros",
          sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        },
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function abrir_modal_detalle_comprometido(id) {
  console.log(id);
  const [itemcode, descripcion, catalogo, marca] = id.split('|'); // Divide el ID en partes

  $("#codigo_articulo_c").val(itemcode);
  $("#nombre_articulo_c").val(descripcion);
  $("#catalogo_articulo_c").val(catalogo);
  $("#marca_articulo_c").val(marca);

  $("#modal_detalle_comprometido").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });


  $.ajax({
    url: "consulta_pedido_pendientes_articulo_comprometido.php",
    type: "POST",
    data: { itemcode: itemcode },
    success: function (x) {
      $("#listado_comprometido").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function abrir_log_modificaciones(doc) {

  $("#modal_log_modificaciones").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    url: "consulta_listado_log_modificaciones.php",
    type: "POST",
    data: { doc: doc },
    success: function (x) {
      $("#listado_log_modificaciones").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function muestra_detalle_pedido3(num_ticket) {
  var tic = num_ticket.split("|");

  $("#modal_detalle_venta3").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $("#cliente_ped3").val(tic[1]);
  $("#vendedor_ped3").val(tic[2]);
  $("#moneda3").val(tic[3]);
  $("#orden_compra3").val(tic[4]);
  $("#fec_registro_oc3").val(tic[5]);
  $("#nro_pedido3").val(tic[6]);
  $("#nro_cotizacion3").val(tic[7]);
  $("#condicion_pago3").val(tic[8]);


  $.ajax({
    beforeSend: function () {
    },
    url: 'consulta_detalle_ventapedido3.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de pedido | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta3").html(x);
      $('#tabla_detalle3').DataTable(
        {
          dom: '<"top"lBf>rt<"bottom"ip>',
          buttons: [
            {
              extend: 'copy',
              text: '<i class="fa fa-copy"></i> Copiar',
              titleAttr: 'Copiar',
              className: 'btn btn-copy'
            },
          ],
          order: [[0, "desc"]],
          // pageLength: -1,
          pageLength: 10,
          lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
          // ordering: false, // ❌ Deshabilita la opción de ordenar columnas
          language: {
            paginate: {
              first: "Primero",
              last: "Último",
              next: "Siguiente",
              previous: "Anterior",
            },
            Show: "Mostrar",
            search: "Buscar:",
            sLengthMenu: "Mostrar _MENU_ registros",
            sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
          },
        }

      );
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta3").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
