///lista condiciones de pago

function lista_cotizacion() {
  var datos = 1;
  estado = $("#IDestado option:selected").val();
  if (estado == 'Seleccione un Estado') {
    alertify.error("Seleccione un estado");
    datos++;
  } else {
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

      url: "consulta_listado_cotizacion.php",
      type: "POST",
      data: "estado=" + $("#IDestado option:selected").val(),
      success: function (x) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#lista_cotizacion").html(x);
          var table = $("#tabla_cot").DataTable({
            pageLength: 10,
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

          $("#tabla_cot thead tr").clone(true).appendTo("#tabla_cot thead");
          $("#tabla_cot thead tr:eq(0) th").hide();

          $("#tabla_cot thead tr:eq(1) th").each(function (i) {
            if (i == 3 || i == 5) {
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
  }
}
// function mostrar_modal_error2(error1, linea) {
//   console.log(error1[0]);

//   swal({
//     icon: "error",
//     title: "Error  cotizacion",
//     content: {
//       element: "div",
//       attributes: {
//         innerHTML: "<strong>Error Migracion:</strong> " + error1[0].error_factura2
//       },
//     }
//   });
// }


function lista_cotizacion_onload() {
  var datos = 1;
  estado = 'Pendiente';

  $.ajax({
    beforeSend: function () {
      $("#lista_cotizacion").html("Recuperando Lista ...");

    },

    url: "consulta_listado_cotizacion.php",
    type: "POST",
    data: "estado=" + estado,
    success: function (x) {
      $("#lista_cotizacion").html(x);
      $("#tabla_cot").DataTable({
        order: [[1, 'asc']]
      });

    },
    error: function (jqXHR, estado, error) { },
  });
}

$(document).on("change", "#IDestado", function () {
  var id = this.value

  $('#regist_cot').removeClass('activeTab');
  $('#regist_cot').addClass('disabledTab');

});


// function busca_detalle_cotizacion(id) {
//   $("#modal_det_cotizacion").modal("show");
//   estado = $("#IDestado option:selected").text().trim();
//   $("#idpedido").val(id);
//   $.ajax({
//     url: "consulta_detalle_venta_autorizaciones_cotizaciones.php",

//     type: "POST",
//     data: "id=" + id,
//     success: function (x) {
//       $(".nuticket").html("");
//       $(".nuticket").append(
//         "Detalle de Cotizacion | <span class='label label-warning'># " +
//         id +
//         "</span>"
//       );
//       $("#pagos_realizados").html(x);
//       $.post(
//         "busca_modelo_autorizacion.php",
//         {
//           query: ["1"],
//         },
//         function (data) {
//           $("#cont_aut").html(data);
//           valor = $("#cont_aut").text().trim();
//           //console.log(valor);
//           if (valor == "a") {
//             //console.log('entro  a');
//             if (estado == "Pendiente") {
//               //console.log('entro  Pendiente');
//               $("#pone_cmodelo").removeClass("disabledTab");
//               $("#pone_cmodelo").addClass("activeTab");
//               $(".comentar").removeClass("disabledTab");
//               $(".comentar").addClass("activeTab");
//             } else {
//               $("#pone_cmodelo").removeClass("activeTab");
//               $("#pone_cmodelo").addClass("disabledTab");
//               $(".comentar").removeClass("activeTab");
//               $(".comentar").addClass("disabledTab");
//             }
//           } else {
//             $(".comentar").removeClass("activeTab");
//             $(".comentar").addClass("disabledTab");
//             $("#pone_cmodelo").removeClass("activeTab");
//             $("#pone_cmodelo").addClass("disabledTab");
//           }
//         }
//       );

//       var idpedido = "";
//       idpedido = id;
//       $(document).ready(function () {
//         $.ajax({
//           //          beforeSend: function(){
//           //            $("#montolp").html("Recuperando Lista Precios...");
//           //           },
//           url: "pone_modelo_autoriza_coti_condicion.php",

//           type: "POST",
//           data: {
//             idpedido,
//           },
//           success: function (x) {
//             $("#idmodelo").val("");
//             $("#comentariosaut").val("");
//             $("#pone_cmodelo").html(x);
//             $(".select2").select2();
//             //              alert($("#totales").html())
//             //$("#montolp2").val($("#montolp").val());
//           },
//           error: function (jqXHR, estado, error) { },
//         });
//       });
//     },
//     error: function (jqXHR, estado, error) { },
//   });
// }

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

function procesa_autorizacion(id) {
  console.log(id);
  // alertify.success("ENTRO");
  migrar_server_layer_apro(id)
  // let etapa = [];
  // $('#pone_cmodelo input[type="checkbox"]:checked').each(function (e) {
  //   if ($(this).prop("checked")) {
  //     modelo = $(this).closest("tr").children("td:eq(1)").text();
  //     etapa = $(this).closest("tr").children("td:eq(3)").text();

  //     var idautoriza = "1";
  //     var id_ticket = "0";
  //     var idmodel = "";
  //     var comentaaut = "";

  //     id_ticket = id;
  //     idmodel = modelo;
  //     id_etapa = etapa;
  //     comentaaut = "";
  //     $.ajax({
  //       beforeSend: function () { },
  //       url: "procesa_coti_autorizacion.php",
  //       type: "POST",
  //       data:
  //         "idautoriza=" +
  //         idautoriza +
  //         "&id_ticket=" +
  //         id_ticket +
  //         "&idquery=" +
  //         idmodel +
  //         "&comentario=" +
  //         comentaaut +
  //         "&id_etapa=" +
  //         id_etapa,
  //       success: function (x) {
  //         var n = noty({
  //           text:
  //             "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
  //           theme: "relax",
  //           layout: "topLeft",
  //           type: "success",
  //           timeout: 2000,
  //         });
  //         $("#comentarios").val("");
  //         correo_val(id_ticket)
  //         busca_cotizaciones_aprobadas(id_ticket);

  //       },
  //       error: function (jqXHR, estado, error) {
  //         $("#errores").html("Error... " + estado + "  " + error);
  //       },
  //     });
  //   }
  // });


  /* var idautoriza = '1';
  var id_ticket = '0';
  var idmodel = '';
  var comentaaut = '';
  // $('#modal_detalle_venta').modal('toggle');
  id_ticket = id;
  idmodel = $("#pone_cmodelo").val();
  id_etapa = $("#pone_cetapa").val();
  comentaaut = $("#comentariosaut").val();
  if ($("#pone_cmodelo").val() != "") {
    $.ajax({
      beforeSend: function () {},
      url: 'procesa_coti_autorizacion.php',
      type: 'POST',
      data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut +'&id_etapa=' + id_etapa,
      success: function (x) {
        var n = noty({
          text: "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'success',
          timeout: 2000,
        });
        $("#comentarios").val("");
        busca_cotizaciones_aprobadas(id_ticket)
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
  } */
}
function migrar_server_layer_apro(n_tic) {
  swal({
    title: "¿Deseas migrar la cotización a documento oficial?",
    icon: "warning",
    buttons: true,
    timer: 3000,
    dangerMode: true,
    closeOnEsc: false,
    closeOnClickOutside: false,
  }).then((willDo) => {
    if (willDo) {
      swal("Procesando...", {
        icon: "info",
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
        timer: 1000,
      });

      $.post("server_layer_crear_pedido_aprob.php", { docentry: n_tic })
        .done(function (data1) {
          let res;
          try {
            res = typeof data1 === 'string' ? JSON.parse(data1) : data1;
          } catch (e) {
            swal("❌ Error inesperado", "La respuesta del servidor no es válida.", "error");
            return;
          }
          if (res.success) {
            swal({
              title: "✅ Migración exitosa",
              text: res.message || "La cotización fue autorizada correctamente.",
              icon: "success",
              buttons: false,
              timer: 3000
            });

            // Cerrar modal de Bootstrap si aplica
            $('#modal_det_cotizacion').modal('hide');

          } else {
            swal({
              title: "❌ Error al migrar",
              text: res.message || "Ocurrió un error inesperado.",
              icon: "error",
              buttons: true // o false si también quieres autocierre
            });
          }

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          swal("❌ Fallo en la solicitud", "No se pudo contactar al servidor: " + errorThrown, "error");
        });
    }
  });
}






$(document).on("dblclick", "#lista_cotizacion tbody tr", function () {
  var $fila = $(this);

  var filaId = $fila.attr('id');

  console.log("Número de la fila seleccionada: " + filaId);

  // Obtener los datos de las celdas
  var doc = $fila.find("td:nth-child(1)").text();
  var num_cliente = $fila.find("td:nth-child(2)").text();
  var cliente = $fila.find("td:nth-child(4)").text();
  var estado = $fila.find("td:nth-child(9)").text();

  $("#lista_cotizacion tbody tr").removeClass("fila-resaltada"); // Quitar clase de fila resaltada de todas las filas
  $fila.addClass("fila-resaltada");


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


  // setTimeout(() => {
  //   consultar_boton(estado);
  //   // consultar_boton2();
  // }, 500);
});





function genera_pdf_cotizacion() {
  docentry = $("#docito").val();
  estado = $("#ESTADO").val();
  // Declara la variable ruta aquí para que esté disponible en todo el ámbito de la función
  var ruta = "pdf_cotizacion1.php?docentry=" + docentry + "&IDestado=" + estado;

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


function busca_detalle_cotizacion() {
  id = $("#docito").val();


  $("#modal_det_cotizacion").modal("show");
  estado = $("#IDestado option:selected").text().trim();
  $("#idpedido").val(id);
  $.ajax({
    url: "consulta_detalle_venta_autorizaciones_cotizaciones.php",

    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append(
        "Detalle de Cotizacion | <span class='label label-warning'># " +
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




// function procesa_rechazo(id) {
//   let etapa = [];
//   $('#pone_cmodelo input[type="checkbox"]:checked').each(function (e) {
//     if ($(this).prop("checked")) {
//       modelo = $(this).closest("tr").children("td:eq(1)").text();
//       etapa = $(this).closest("tr").children("td:eq(3)").text();

//       var idautoriza = "3";
//       var id_ticket = "0";
//       var idmodel = "";
//       var comentaaut = "";

//       id_ticket = id;
//       idmodel = modelo;
//       id_etapa = etapa;
//       comentaaut = "";
//       $.ajax({
//         beforeSend: function () { },
//         url: "procesa_coti_rechazo.php",
//         type: "POST",
//         data:
//           "idautoriza=" +
//           idautoriza +
//           "&id_ticket=" +
//           id_ticket +
//           "&idquery=" +
//           idmodel +
//           "&comentario=" +
//           comentaaut +
//           "&id_etapa=" +
//           id_etapa,
//         success: function (x) {
//           var n = noty({
//             text: "Se ha procedido al RECHAZO del pedido N°: " + id_ticket,
//             theme: "relax",
//             layout: "topLeft",
//             type: "danger",
//             timeout: 2000,
//           });
//           $("#comentarios").val("");
//           correo_val_rechazado(id_ticket)
//           // busca_cotizaciones_aprobadas(id_ticket);
//           lista_cotizacion();
//           $("#modal_det_cotizacion").modal("hide");
//           $("#modal_etapas").modal("hide")
//         },
//         error: function (jqXHR, estado, error) {
//           $("#errores").html("Error... " + estado + "  " + error);
//         },
//       });
//     }
//   });
// }



// function genera_pdf_cotizacion(docentry, estado) {
//   // javascript: window.open("pdf_cotizacion.php?docentry=" + docentry + "&IDestado=" + estado + "");

//   var ruta = "pdf_cotizacion1.php?docentry=" + docentry + "&IDestado=" + estado;

//   $('#modal_data_pdf').modal('show');
//   $('#modal_data_pdf').on('shown.bs.modal', function () {
//     $(this).find('iframe').attr('src', ruta);
//   }).on('hidden.bs.modal', function () {
//     $(this).find('iframe').attr('src', '');
//   });

//   // $("#navegador").off('click').on('click', function () {
//   //   window.open(ruta, '_blank');
//   // });
//   $("#navegador")
//     .off("click")
//     .on("click", function () {
//       var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
//           "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
//           "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

//       window.open(contenedorUrl, "_blank");
//     });

//   $("#imprimir").off('click').on('click', function () {
//     $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//   })
// }



$(document).on("click", "#cotiza_mod", function () {
  det = document.querySelectorAll("#cotiza_mod:checked").length;
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {
      $("#regist_cot").removeClass("disabledTab");
      $("#regist_cot").addClass("activeTab");
    } else {
      $("#regist_cot").removeClass("activeTab");
      $("#regist_cot").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $("#regist_cot").removeClass("disabledTab");
      $("#regist_cot").addClass("activeTab");
    } else {
      $("#regist_cot").removeClass("activeTab");
      $("#regist_cot").addClass("disabledTab");
    }
  }
});

function pasar_pendiente() {
  let materiales = [];
  let materiales2 = [];
  let materiales3 = [];

  $('#lista_cotizacion input[type="checkbox"]:checked').each(function (e) {
    if ($(this).prop("checked")) {
      materiales[e] = $(this).closest("tr").children("td:eq(1)").text();
      //materiales2[e]= materiales[e].split("-");
      //materiales3[e]= materiales2[e][1]
    }
  });
  //console.log(materiales);
  //console.log(materiales3);
  realizar_cotizacion(materiales);

}

function realizar_cotizacion(materiales) {
  if (materiales.length == 0) {
    alertify.error("Falta elegir almenos una solicitud");
  } else {
    swal({
      title: "Pasar a Pendiente?",
      icon: "warning",
      buttons: true,
      timer: 3000,
      dangerMode: true,
      //closeOnConfirm: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Procesando ", {
          icon: "success",
          timer: 3000,
          closeOnEsc: false,
          buttons: false,
          closeOnClickOutside: false,
        });
        $.post(
          "procesa_cotizacion_creada.php",
          {
            codigo: materiales,
          },
          function (data1) {
            lista_cotizacion();
          }
        );
      } else {
        swal("No se pudo registrar");
      }
    });
  }
}

function generar_correo(docentry, card_code) {
  $("#modalcorreo").modal("show"); // abri
  //alert(CODE);
  //$("#text").val(correo);
  $("#docentry_correo").val(docentry);
  $("#cardcode_correo").val(card_code);
  document.querySelector("#cardcode_correo").innerText = docentry;

  lista_correos(card_code);

  // $("#cardcode").hide();
  // $("#text").prop('disabled', true);
}

function enviar_correo() {
  correo = $("#textO").val();
  correo_alternativo = $("#correo_alternativo").val();
  code = $("#cardcode_correo").val();
  doc = $("#docentry_correo").val();

  correo.push(correo_alternativo);
  // javascript: window.open('reporte_EC_Cliente.php?card_code=' + card_code+'&card_name='+card_name);

  var n = noty({
    text: "¿Seguro de enviar correo...? " + correo + ", ",
    theme: "relax",
    layout: "center",
    type: "success",
    buttons: [
      {
        addClass: "btn btn-primary",
        text: "Si",
        onClick: function ($noty) {
          $.post(
            "enviarpdf_corre_cotizacion.php",
            { CODE: code, correo: correo, doc: doc },

            function (data) { }
          );
          alert("Se envio correctamente");
          $("#modalcorreo").modal("hide");

          $noty.close();
        },
      },
      {
        addClass: "btn btn-danger",
        text: "No",
        onClick: function ($noty) {
          $noty.close();
        },
      },
    ],
  });

  //generar_pdf(doc)
}

function generar_pdf(docentry) {
  javascript: window.open(
    "pdf_cotizacion_guarda.php?docentry=" + docentry + ""
  );
}

function lista_correos(card_code) {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_correo").html("cargando correos");
      },
      url: "pone_lista_correos.php",
      type: "POST",
      data: "CardCode=" + card_code,
      success: function (x) {
        $("#lista_correo").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function activar_campo(obj) {
  if (obj.checked) {
    document.getElementById("correo_alternativo").style.display = "";
  } else {
    document.getElementById("correo_alternativo").style.display = "none";
  }
}

function agregar_correo() {
  var correo = $("#textO").val();
  var correos_alternativos = correo.push($("#correo_alternativo").val());

  //console.log(correo);
  //console.log(correos_alternativos);
}

function ver_etapas_modelo(id) {
  $("#modal_etapas").modal("show");
  //console.log(id);
  var idpedido = "";
  idpedido = id;

  $.ajax({
    url: "pone_modelo_autoriza_coti_etapa.php",

    type: "POST",
    data: {
      idpedido,
    },
    success: function (x) {
      $("#idmodelo").val("");
      $("#comentariosaut").val("");
      $("#pone_cmodelo").html(x);
      //$("#tabla_etapa").DataTable();
    },
    error: function (jqXHR, estado, error) { },
  });
  /* $.ajax({   
    url: 'pone_modelo_autoriza_coti_condicion.php',

    type: 'POST',
    data: {
      idpedido
    },
    success: function (x) {
      //console.log(x);
     
      $(".select2").select2();

    },
    error: function (jqXHR, estado, error) {}
  }); */
}

$(document).on("click", "#cotiza_etapa", function () {
  det = document.querySelectorAll("#cotiza_etapa:checked").length;
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightBlue");
    if (det > 0) {
      $(".but").removeClass("disabledTab");
      $(".but").addClass("activeTab");
    } else {
      $(".but").removeClass("activeTab");
      $(".but").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $(".but").removeClass("disabledTab");
      $(".but").addClass("activeTab");
    } else {
      $(".but").removeClass("activeTab");
      $(".but").addClass("disabledTab");
    }
  }
});

$("#selectall").on("click", function () {
  $(".chkCheckBoxId3").prop("checked", this.checked);
});

// if all checkbox are selected, check the selectall checkbox and viceversa
$(".chkCheckBoxId3").on("click", function () {
  if ($(".chkCheckBoxId3").length == $(".chkCheckBoxId3:checked").length) {
    $("#selectall").prop("checked", true);
  } else {
    $("#selectall").prop("checked", false);
  }
});

$(document).on("click", "#selectall", function () {
  det = document.querySelectorAll("#cotiza_etapa:checked").length;
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightBlue");
    if (det > 0) {
      $(".but").removeClass("disabledTab");
      $(".but").addClass("activeTab");
    } else {
      $(".but").removeClass("activeTab");
      $(".but").addClass("disabledTab");
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      $(".but").removeClass("disabledTab");
      $(".but").addClass("activeTab");
    } else {
      $(".but").removeClass("activeTab");
      $(".but").addClass("disabledTab");
    }
  }
});

function abrir_log() {
  $("#modal_log").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });
  $("#modal_log").on("shown.bs.modal", function () {
    $("#lista_log").html("");
    $("#articulo_buscar").val("");
    $("#articulo_buscar").focus();
  });
}

function busca_log(id) {
  $("#modal_log").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });
  $.ajax({
    beforeSend: function () {
      $("#lista_log").html("");
    },
    url: "abrir_log2.php",
    type: "POST",
    data: "docentry=" + id,
    success: function (x) {
      $("#lista_log").html(x);
      $("#tabla_log").DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#lista_log").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

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
        //$("#lista_cmoneda").children().prop('disabled', false);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function lista_cpago() {
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
        //$("#lista_cpago").children().prop('disabled', true);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

$(document).on("change", "#lista_cmoneda select", function () {
  var id = this.value
  lista_cmoneda_mod_xd = id;
  lista_cmoneda_mod_xd2 = $("#lista_cmoneda2").val();
  $("#monedaInicial").val(lista_cmoneda_mod_xd2);
  $("#cambioMoneda").val(lista_cmoneda_mod_xd);
  $("#rate").val(parseFloat($("#tc_actual").text()).toFixed(3));
  $('#modalCambios').modal('show');
  $("#lista_cmoneda2").val(id);
})
function tipo_cambio_hoy2() {
  $.ajax({
    beforeSend: function () {
      $("#tc_hoy").html("Recuperando Lista ...");
    },
    url: 'Consulta_TC_Actual.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#tc_hoy_mod").html(x);
      tc = $("[name='tc_actual']").text().trim();
      var el = document.getElementById("tipo_cambio_mod");
      $("#lista_cmoneda2").val('USD')
      let num2 = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'SOL' }).format(tc);
      el.innerText = num2
    },
    error: function (jqXHR, estado, error) {
    }
  });
}

function calcular_multidscto() {
  var multi_descuento = $("#dsctoline").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === '') {
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

    var dsctoline = parseFloat((dsctoline2 + dsctoline3) - parseFloat(dsctoline2 * dsctoline3 / 100)).toFixed(2);
    $("#dsctoline").val(dsctoline);
    $("#multi_dscto").val(multi_descuento);
    //console.log(dsctoline);
  }
}
function actualizarCostos2() {
  var moneda_base = $("#monedaInicial").val();
  var tc = $("#rate").val();
  id = $("#cambioMoneda").val();

  if (moneda_base == 'USD' && id === 'SOL') {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat($(this).find("td").find('input[id="monto_item"]').val());
      nuevo_monto = parseFloat(monto * tc).toFixed(4)
      preciou = parseFloat($(this).find("td").find('input[id="precio_uni"]').val());
      nuevo_preciou = parseFloat(preciou * tc).toFixed(4)
      precioigv = parseFloat($(this).find("td").find('input[id="precio_igv"]').val());
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(4)
      monto_total = parseFloat($(this).find("td").find('input[id="monto_total"]').val());
      nuevo_monto_total = parseFloat(monto_total * tc).toFixed(4)
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total"]').val(nuevo_monto_total);
      resumen()
    });
  }
  if (moneda_base == 'SOL' && id === 'USD') {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat($(this).find("td").find('input[id="monto_item"]').val());
      nuevo_monto = parseFloat(monto / tc).toFixed(4)
      preciou = parseFloat($(this).find("td").find('input[id="precio_uni"]').val());
      nuevo_preciou = parseFloat(preciou / tc).toFixed(4)
      precioigv = parseFloat($(this).find("td").find('input[id="precio_igv"]').val());
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(4)
      monto_total = parseFloat($(this).find("td").find('input[id="monto_total"]').val());
      nuevo_monto_total = parseFloat(monto_total / tc).toFixed(4)
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total"]').val(nuevo_monto_total);
      resumen()
    });
  }
  if (moneda_base == 'USD' && id === 'USD') {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat($(this).find("td").find('input[id="monto_item"]').val());
      nuevo_monto = parseFloat(monto * tc).toFixed(4)
      preciou = parseFloat($(this).find("td").find('input[id="precio_uni"]').val());
      nuevo_preciou = parseFloat(preciou * tc).toFixed(4)
      precioigv = parseFloat($(this).find("td").find('input[id="precio_igv"]').val());
      nuevo_precioigv = parseFloat(precioigv * tc).toFixed(4)
      monto_total = parseFloat($(this).find("td").find('input[id="monto_total"]').val());
      nuevo_monto_total = parseFloat(monto_total * tc).toFixed(4)
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total"]').val(nuevo_monto_total);
      resumen()
    });
  }
  if (moneda_base == 'SOL' && id === 'SOL') {
    var monto = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      monto = parseFloat($(this).find("td").find('input[id="monto_item"]').val());
      nuevo_monto = parseFloat(monto / tc).toFixed(4)
      preciou = parseFloat($(this).find("td").find('input[id="precio_uni"]').val());
      nuevo_preciou = parseFloat(preciou / tc).toFixed(4)
      precioigv = parseFloat($(this).find("td").find('input[id="precio_igv"]').val());
      nuevo_precioigv = parseFloat(precioigv / tc).toFixed(4)
      monto_total = parseFloat($(this).find("td").find('input[id="monto_total"]').val());
      nuevo_monto_total = parseFloat(monto_total / tc).toFixed(4)
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this).find("td").find('input[id="monto_total"]').val(nuevo_monto_total);
      resumen()
    });
  }
  $('#modalCambios').modal('hide');
}

function modificar_cotizacon(docentry, tipo) {
  $("#modal_modificar").modal("show");
  $('#tipo_mod_dup').val(tipo);
  lista_cmoneda();
  lista_cpago();
  consultar_data_cot_cab(docentry);
  setTimeout(() => {
    resumen();
  }, 100);
  tipo_cambio_hoy2();
  if (tipo === 1) {
    $('#bcliente_modificar').removeClass('disabledTab');
    $('#bcliente_modificar').addClass('activeTab');
    console.log(1);
  } else {
    $('#bcliente_modificar').addClass('disabledTab');
    $('#bcliente_modificar').removeClass('activeTab');
  }
}



function procesa_modificacion() {
  if ($('#tipo_mod_dup').val() === '0') {
    actualizar_data_articulo();
  } else if ($('#tipo_mod_dup').val() === '1') {
    duplica_data_articulo();
  } else if ($('#tipo_mod_dup').val() === '2') {
    actualizar_data_articulo_aprob();
  }
}

function actualiza_cpago_temp() { }

function consultar_data_cot_cab(docentry) {
  $.ajax({
    url: "buscar_data_cotizacion.php",

    type: "POST",
    data: {
      docentry,
    },
    success: function (x) {
      //console.log(x);
      var data = x;
      var idcl = data.split("|");
      //linea_credito =idcl[4];

      let linea_credito = parseFloat(idcl[4]).toFixed(2);
      let saldo_pendiente = parseFloat(idcl[5]).toFixed(2);
      let linea_disponible = parseFloat(idcl[6]).toFixed(2);
      $("#docentry_cot").val(docentry);
      $("#idcliente_razon").val(idcl[0]);
      $("#idcliente_credito_mod").val(idcl[1]);
      $("#tipocliente").val(idcl[2]);
      $("#idcliente_ruc").val(idcl[3]);
      $("#lineacredito").val(linea_credito);
      $("#salpendiente").val(saldo_pendiente);
      $("#lin_disponible").val(linea_disponible);
      $("#fecha").val(idcl[7]);
      pone_cpago = idcl[8];
      $("#lista_cpago select").val(pone_cpago).trigger("change.select2");
      pone_cmoneda = idcl[9];
      $("#lista_cmoneda select").val(pone_cmoneda).trigger("change.select2");
      $("#ref_req").val(idcl[10]);
      $("#validez").val(idcl[11]);
      $("#vendedor").val(idcl[15]);
      $("#vendedor1").val(idcl[14]);
      $("#comentarios1").val(idcl[13]);
      $("#cap_dicc1").val(idcl[12]);
      $("#dirigido_coti").val(idcl[16]);
      $("#correo_dirigido").val(idcl[17]);
      $("#telefono_dirigido").val(idcl[18]);
      $("#lista_cmoneda2").val(pone_cmoneda);
      consultar_data_cot_det(docentry);
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
      $("#data_articulo").html(x);
      $("#tabla_articulos").DataTable({
        order: [[0, 'asc']]
      });
      resumen()
    },
    error: function (jqXHR, estado, error) { },
  });
}

function resumen() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      articulos += parseFloat($(this).find("td").find('input[id="cantidad_item"]').val());
      monto += parseFloat($(this).find("td").find('input[id="monto_item"]').val());
      //console.log(monto);
    });

    cmoneda = $("#cmoneda option:selected").val();

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
    if (articulos > 0) {
      $("#btn-procesa").prop("disabled", false);
      $("#btn-cancela").prop("disabled", false);
      $("#btn-cancel").prop("disabled", false);
    } else {
      $("#btn-cancela").prop("disabled", true);
      //$("#btn-cancel").prop('disabled', true);
    }
  });
}

function editar_producto_mod(num) {
  num = num - 1;
  $('#moda_editar_articulo').modal('show');
  cod_art = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[1].innerHTML;
  descripcion_art = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[2].innerHTML;
  fecha_entrega = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[11].innerHTML;
  cantidad = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[6].innerHTML;
  unidad_medida = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[5].innerHTML;
  preciou = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[7].innerHTML;
  monto = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[9].innerHTML;
  dscto_lin = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[8].innerHTML;
  catalogo = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[4].innerHTML;
  marca = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[3].innerHTML;
  plazo_entrega = $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[10].innerHTML;

  $('#codigo_modificar').val(cod_art);
  $('#descripcionitem_modificar').val(descripcion_art);
  $('#fecha_prod_modificar').val(fecha_entrega);
  $('#cantidad_modificar').val(cantidad);
  $('#unidad_line_modificar').val(unidad_medida);
  $('#preciou_modificar').val(preciou);
  $('#preciou_ant_modificar').val(preciou);
  $('#preciouigv_modificar').val(monto);
  $('#dsctoline_modificar').val(dscto_lin);
  $('#catalogo_item_modificar').val(catalogo);
  $('#marca_item_modificar').val(marca);
  $('#plazo_entrega_modificar').val(plazo_entrega);
  $('#num_mod').val(num);
}

function eliminar_producto_mod(Id) {
  $.ajax({
    beforeSend: function () {

    },
    url: "eliminar_producto.php",
    type: "POST",
    data: { Id: Id },
    success: function (x) {
      doc = $("#docentry_cot").val();
      consultar_data_cot_det(doc);
    },
    error: function (jqXHR, estado, error) { },
  });

}




function actualizar_datos_prod() {

  var multi_descuento = $("#dsctoline_modificar").val();
  var data = multi_descuento.split("+");

  if (multi_descuento === '') {
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

    var dsctoline = parseFloat((dsctoline2 + dsctoline3) - parseFloat(dsctoline2 * dsctoline3 / 100)).toFixed(2);
    //console.log(dsctoline);
  }

  var precio = $("#preciou_modificar").val();
  var cantidad = $("#cantidad_modificar").val();
  var monto = (cantidad * precio) - ((cantidad * precio) * (dsctoline / 100));
  num = $('#num_mod').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[1].innerHTML = $('#codigo_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[2].innerHTML = $('#descripcionitem_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[3].innerHTML = $('#marca_item_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[4].innerHTML = $('#catalogo_item_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[5].innerHTML = $('#unidad_line_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[6].innerHTML = $('#cantidad_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[7].innerHTML = $('#preciou_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[8].innerHTML = $('#dsctoline_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[9].innerHTML = monto;
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[10].innerHTML = $('#plazo_entrega_modificar').val();
  //$($('#tabla_articulos').find('tbody > tr')[num]).children('td')[11].innerHTML = $('#fecha_prod_modificar').val();
  $($('#tabla_articulos').find('tbody > tr')[num]).children('td')[11].innerHTML = dsctoline;
  $('#moda_editar_articulo').modal('hide');

  resumen();
}

function calcular_total_item(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
  cantidad = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[6].children[0].value);
  dsctoline = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[8].children[0].value);
  var monto = parseFloat((cantidad * precio) - ((cantidad * precio) * (dsctoline / 100))).toFixed(4);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11].children[0].value = monto
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[12].children[0].value = parseFloat(monto * 1.18).toFixed(4)
  resumen();
}

function calcular_monto_tot(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat($($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[9].children[0].value);
  cantidad = parseFloat($($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[8].children[0].value);
  monto_final = parseFloat($($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[14].children[0].value);
  precio_linea = parseFloat(precio * cantidad * 1.18);

  dcto = parseFloat((precio_linea - monto_final) / precio_linea * 100).toFixed(4);
  var monto = parseFloat((cantidad * precio) - ((cantidad * precio) * (dcto / 100))).toFixed(4);
  $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[10].children[0].value = dcto
  $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[13].children[0].value = monto
  //calcular_total_item(input,linea)
  resumen();
}


function calcular_dscto_item(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
  precio_dscto = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[9].children[0].value);
  descuento = parseFloat((precio - precio_dscto) / precio * 100).toFixed(4);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[8].children[0].value = descuento
  calcular_total_item2(input, linea)
}

function calcular_precio_igv(input, linea) {
  var fila = obtenerFila3(input);
  //console.log(fila);
  precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
  precio_igv = parseFloat(precio * 1.18).toFixed(4);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[10].children[0].value = precio_igv
  resumen()
}
function calcular_precio_igv2(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
  precio_igv = parseFloat(precio * 1.18).toFixed(2);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[10].children[0].value = precio_igv
  resumen();
  console.log(precio_igv);
}

function calcular_total_item2(input, linea) {
  var fila = obtenerFila3(input);
  precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
  cantidad = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[6].children[0].value);
  dsctoline = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[8].children[0].value);
  var monto = parseFloat((cantidad * precio) - ((cantidad * precio) * (dsctoline / 100))).toFixed(2);
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[11].children[0].value = monto;
  $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[12].children[0].value = parseFloat(monto * 1.18).toFixed(4)
  resumen();
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


function detectarEnter(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila(input);
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
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = parseFloat(multi_descuento[1]);
      //calcular_total_item(linea)
    }
    var dsctoline = parseFloat((dsctoline1 + dsctoline2) - parseFloat(dsctoline1 * dsctoline2 / 100)).toFixed(2);
    event.target.value = isNaN(dsctoline) ? 0 : dsctoline;
    calcular_total_item(input, linea)
  } else {
    var valorInput = event.target.value;
    var dsctoline = (valorInput);
    if (valorInput.indexOf('+') == -1) {
      var fila = obtenerFila3(input);
      event.target.value = dsctoline;
      precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
      precio_nuev = parseFloat(precio - (precio * dsctoline) / 100)
      console.log(precio); console.log(precio_nuev);
      $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[9].children[0].value = precio_nuev
      calcular_total_item(input, linea)

    } else {

    }

  }
  //console.log(dsctoline);
}

function detectarEnter2(event, input, linea) {
  if (event.key === "Enter") {
    var fila = obtenerFila3(input);
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
      var dsctoline1 = parseFloat(multi_descuento[0]);
      var dsctoline2 = parseFloat(multi_descuento[1]);
      //calcular_total_item(linea)
    }
    var dsctoline = parseFloat((dsctoline1 + dsctoline2) - parseFloat(dsctoline1 * dsctoline2 / 100)).toFixed(2);
    event.target.value = isNaN(dsctoline) ? 0 : dsctoline;
    calcular_total_item2(input, linea)
  } else {
    var valorInput = event.target.value
    var fila = obtenerFila3(input);
    var dsctoline = (valorInput);
    if (valorInput.indexOf('+') == -1) {
      event.target.value = dsctoline;

      precio = parseFloat($($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[7].children[0].value);
      precio_nuev = parseFloat(precio - (precio * dsctoline) / 100).toFixed(4)
      console.log(precio); console.log(precio_nuev);
      $($("#tabla_art_ped").find("tbody > tr")[fila]).children("td")[9].children[0].value = precio_nuev
      calcular_total_item2(input, linea)
    } else {

    }

  }

  //console.log(dsctoline);
}
function obtenerFila2(elemento) {
  // Navegar hacia arriba en la jerarquía DOM para encontrar la fila
  while (elemento && elemento.tagName !== "TR") {
    elemento = elemento.parentNode;
  }
  return elemento;
}
function obtenerFila(elemento) {
  // Navegar hacia arriba en la jerarquía DOM para encontrar la fila
  while (elemento && elemento.tagName !== "TR") {
    elemento = elemento.parentNode;
  }
  return elemento;
}

function actualizar_data_articulo() {
  docentry = $("#docentry_cot").val();
  ref_req_mod = $("#ref_req").val();
  validez_mod = $("#validez").val();
  cod_vendedor = $("#vendedor1").val();
  //nom_vendedor = $("#vendedor").val();
  comentarios = $("#comentarios1").val();
  direccion = $("#cap_dicc1").val();
  moneda = $("#lista_cmoneda select").val();
  correo_mod = $("#correo_dirigido").val();
  telefeno_mod = $("#telefono_dirigido").val();

  cpago = $("#cpago").val();
  var subtotal_venta = 0.00;
  var total_venta = 0.00;

  $('#tabla_art_ped > tbody > tr').each(function () {
    subtotal_venta += parseFloat($(this).find("td").find('input[id="monto_item"]').val());
  });

  dscto = '' //descuento total;

  total_venta = subtotal_venta + (subtotal_venta * 0.18);
  band = true;
  $('#tabla_art_ped > tbody > tr').each(function () {
    linea = $(this).find('td').eq(0).html()
    lina2 = linea;

    var can = $(this).find("td").find('input[id="cantidad_item"]').val();
    var preciou = $(this).find("td").find('input[id="precio_uni"]').val();
    var dscto_lin = $(this).find("td").find('input[id="descuento_item"]').val();
    var monto = $(this).find("td").find('input[id="monto_item"]').val();


    if (can === '' || can <= 0) {
      alertify.error('Linea: ' + lina2 + ' ' + 'Falta Cantidad Invalida');
      $(this).find('td').eq(6).css("background-color", "#F67280");
      band = false;
    } else {
      $(this).find('td').eq(6).css("background-color", "white");
    }
    if (preciou === '' || preciou <= 0) {
      alertify.error('Linea: ' + linlina2ea + ' ' + 'Falta Precio Invalido');
      $(this).find('td').eq(7).css("background-color", "#F67280");
      band = false;
    } else {
      $(this).find('td').eq(7).css("background-color", "white");
    }
    if (monto === '' || monto <= 0) {
      alertify.error('Linea: ' + lina2 + ' ' + 'Falta Precio Invalido');
      $(this).find('td').eq(11).css("background-color", "#F67280");
      band = false;
    } else {
      $(this).find('td').eq(11).css("background-color", "white");
    }
    if (dscto_lin.indexOf('+') !== -1) {
      alertify.error('Linea: ' + lina2 + ' ' + 'Falta Calcular Descuento');
      $(this).find('td').eq(8).css("background-color", "#F67280");
      band = false;
    } else {
      $(this).find('td').eq(8).css("background-color", "white");
    }
  });
  if (band === true) {
    $.ajax({
      beforeSend: function () { },
      url: "actualiza_cotizacion_cab.php",
      type: "POST",
      data:
        "docentry=" +
        docentry +
        "&ref_req_mod=" +
        ref_req_mod +
        "&validez_mod=" +
        validez_mod + "&cod_vendedor=" + cod_vendedor + "&comentarios=" + comentarios +
        "&direccion=" + direccion + '&subtotal_venta=' + subtotal_venta + '&total_venta=' + total_venta
        + '&moneda=' + moneda,
      success: function (data) {
        var n = noty({
          text: "Procesando venta...  actualizacion: " + docentry,
          theme: "relax",
          layout: "topLeft",
          type: "success",
          timeout: 2000,
        });
        $("#tabla_art_ped > tbody > tr").each(function () {
          var line = $(this).find("td").eq(0).html();
          var cod = quitarAcentos($(this).find('td').eq(1).html());
          var descripcion_art = quitarAcentos($(this).find('td').eq(2).html());
          var marca = quitarAcentos($(this).find('td').eq(3).html());
          var catalogo = quitarAcentos($(this).find('td').eq(4).html());
          var unidad_medida = $(this).find('td').eq(5).html();
          var can = $(this).find("td").find('input[id="cantidad_item"]').val();
          var preciou = $(this).find("td").find('input[id="precio_uni"]').val();
          var dscto_lin = $(this).find("td").find('input[id="descuento_item"]').val();
          var monto = $(this).find("td").find('input[id="monto_item"]').val();
          var plazo_entrega = quitarAcentos($(this).find("td").find('input[id="plazoEntrega_item"]').val());
          //var fecha_prod = $(this).find("td").eq(11).html();
          var tipo_venta = "";
          var fath = "";
          var modificado = '0';
          var multi_descuento = '';
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
              multi_descuento,
            success: function (data) {
              var n = noty({
                text: "Procesando venta...  articulo actual: " + cod,
                theme: "relax",
                layout: "topLeft",
                type: "success",
                timeout: 2000,
              });
              $('#modal_modificar').modal("hide");
            },
            error: function (jqXHR, estado, error) {
              $("#errores").html("Error... " + estado + "  " + error);
            },
          });
        });
      },
      error: function (jqXHR, estado, error) {
        $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  }

}

function actualizar_data_articulo_aprob() {
  docentry = $("#docentry_cot").val();
  credi = '1';
  fath = '';
  tipo_venta = '';
  clients = $("#idcliente_credito").val();
  clientename = quitarAcentos($("#idcliente_razon").val());
  comentarios = '';
  transportista = '';
  idcliente_parent = '' //cliente vinculado;
  cpago = $("#lista_cpago option:selected").val();
  cmoneda = $("#lista_cmoneda option:selected").val();
  slpCode = '1';
  //cpago=document.getElementById("#pone_cpago").selectedIndex;
  fentrega = '2023-01-01';
  direntrega = ''
  validez = $("#validez").val();
  n_ticket = docentry;
  idlp = '' //lista de precios;
  U_IMOB_ESTADO = 'Pendiente';
  U_IMOB_OBSERVACION = '';
  U_IMOB_OV = '';
  U_IMOB_FECOV = '';
  ref_req = $("#ref_req").val();

  modificado = '1'
  var subtotal_venta = 0.00;
  var total_venta = 0.00;

  $('#tabla_articulos > tbody > tr').each(function () {
    subtotal_venta += parseFloat($(this).find('td').eq(9).html());
  });

  dscto = '' //descuento total;

  total_venta = subtotal_venta + (subtotal_venta * 0.18);

  $.ajax({
    beforeSend: function () {
    },
    url: 'procesa_cotizacion.php',
    type: 'POST',
    data: 'clienteid=' + clients + '&credito=' + credi + '&comentarios=' + comentarios + '&idcliente_parent=' + idcliente_parent + '&cpago=' + cpago + '&cmoneda=' + cmoneda + '&fentrega=' + fentrega + '&direntrega=' + direntrega + '&dscto=' + dscto + '&subtotal_venta=' + subtotal_venta + '&total_venta=' + total_venta + '&total_linea=' + subtotal_venta + '&n_ticket=' + docentry + '&father=' + fath + '&tipo_vta=' + tipo_venta + '&transportista=' + transportista + '&idlp=' + idlp + '&caja=' + $("#ncaja").val() + '&U_IMOB_ESTADO=' + U_IMOB_ESTADO + '&U_IMOB_OBSERVACION=' + U_IMOB_OBSERVACION + '&U_IMOB_OV=' + U_IMOB_OV + '&U_IMOB_FECOV=' + U_IMOB_FECOV + '&clientename=' + clientename + '&slpCode=' + slpCode + '&ref_req=' + ref_req + '&validez=' + validez + '&modificado=' + modificado,
    success: function (x) {
      var n = noty({
        text: "Procesando venta...  articulo actual: " + docentry,
        theme: 'relax',
        layout: 'topLeft',
        type: 'success',
        timeout: 2000,
      });
      global = parseInt(x);
      //console.log(global);
      if (global == 0) {
        alertify.error("No Inserto");
      } else {
        $('#tabla_articulos > tbody > tr').each(function () {
          linea = $(this).find('td').eq(0).html()
          var line = parseInt(linea);
          var cod = quitarAcentos($(this).find('td').eq(1).html());
          var descripcion_art = quitarAcentos($(this).find('td').eq(2).html());
          var marca = quitarAcentos($(this).find('td').eq(3).html());
          var catalogo = quitarAcentos($(this).find('td').eq(4).html());
          var unidad_medida = $(this).find('td').eq(5).html();
          var can = $(this).find('td').eq(6).html();
          var preciou = $(this).find('td').eq(7).html();
          var dscto_lin = $(this).find('td').eq(8).html();
          var monto = $(this).find('td').eq(9).html();
          var plazo_entrega = quitarAcentos($(this).find('td').eq(10).html());
          //var fecha_prod = $(this).find('td').eq(11).html();
          var tipo_venta = '';
          var fath = '';
          var modificado = '1';
          $.ajax({
            beforeSend: function () {
            },
            url: 'procesa_cotizacion_det.php',
            type: 'POST',
            data: '&codigo=' + cod + '&descripcion_art=' + descripcion_art + '&cantidad=' + can + '&preciou=' + preciou +
              '&dscto_lin=' + dscto_lin + '&total_linea=' + monto + '&tipo_vta=' + tipo_venta + '&father=' + fath + '&n_ticket=' + docentry + '&line=' + line + '&unidad_medida=' + unidad_medida + '&fecha_prod=' + fecha_prod + '&marca=' + marca + '&catalogo=' + catalogo + '&plazo_entrega=' + plazo_entrega + '&modificado=' + modificado,
            success: function (data) {
              var n = noty({
                text: "Procesando venta...  articulo actual: " + cod,
                theme: 'relax',
                layout: 'topLeft',
                type: 'success',
                timeout: 2000,
              });
              $('#modal_modificar').modal('hide');
              lista_cotizacion()
            },
            error: function (jqXHR, estado, error) {
              $("#errores").html('Error... ' + estado + '  ' + error);
            }
          });
        });
        lista_cotizacion()
      }
    }
  });

}


function duplica_data_articulo() {
  var n_tic;
  $.ajax({
    beforeSend: function () {
      $("#nro_ticket").html("Buscando...");
    },
    async: false,
    url: 'busca_ticket_cotizacion.php',
    type: 'POST',
    data: 'caja=' + $("#ncaja").val(),
    success: function (x) {
      $("#nro_ticket").html(x);

      n_tic = x;
      //              alert(n_tic);
      //              return 
      return n_tic;

    },
    error: function (jqXHR, estado, error) {
      $("#nro_ticket").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
  ntic = parseInt(n_tic)
  credi = '1';
  fath = '';
  tipo_venta = '';
  clients = $("#idcliente_credito").val();
  clientename = quitarAcentos($("#idcliente_razon").val());
  comentarios = '';
  transportista = '';
  idcliente_parent = '' //cliente vinculado;
  cpago = $("#lista_cpago option:selected").val();
  cmoneda = $("#lista_cmoneda option:selected").val();
  slpCode = '1';
  //cpago=document.getElementById("#pone_cpago").selectedIndex;
  fentrega = '2023-01-01';
  direntrega = ''
  validez = $("#validez").val();
  n_ticket = n_tic;
  idlp = '' //lista de precios;
  U_IMOB_ESTADO = 'Pendiente';
  U_IMOB_OBSERVACION = '';
  U_IMOB_OV = '';
  U_IMOB_FECOV = '';
  ref_req = $("#ref_req").val();

  modificado = '0'
  var subtotal_venta = 0.00;
  var total_venta = 0.00;

  $('#tabla_articulos > tbody > tr').each(function () {
    subtotal_venta += parseFloat($(this).find('td').eq(9).html());
  });

  dscto = '' //descuento total;

  total_venta = subtotal_venta + (subtotal_venta * 0.18);

  $.ajax({
    beforeSend: function () {
    },
    url: 'procesa_cotizacion.php',
    type: 'POST',
    data: 'clienteid=' + clients + '&credito=' + credi + '&comentarios=' + comentarios + '&idcliente_parent=' + idcliente_parent + '&cpago=' + cpago + '&cmoneda=' + cmoneda + '&fentrega=' + fentrega + '&direntrega=' + direntrega + '&dscto=' + dscto + '&subtotal_venta=' + subtotal_venta + '&total_venta=' + total_venta + '&total_linea=' + subtotal_venta + '&n_ticket=' + ntic + '&father=' + fath + '&tipo_vta=' + tipo_venta + '&transportista=' + transportista + '&idlp=' + idlp + '&caja=' + $("#ncaja").val() + '&U_IMOB_ESTADO=' + U_IMOB_ESTADO + '&U_IMOB_OBSERVACION=' + U_IMOB_OBSERVACION + '&U_IMOB_OV=' + U_IMOB_OV + '&U_IMOB_FECOV=' + U_IMOB_FECOV + '&clientename=' + clientename + '&slpCode=' + slpCode + '&ref_req=' + ref_req + '&validez=' + validez + '&modificado=' + modificado,
    success: function (x) {
      var n = noty({
        text: "Procesando venta...  articulo actual: " + ntic,
        theme: 'relax',
        layout: 'topLeft',
        type: 'success',
        timeout: 2000,
      });
      global = parseInt(x);
      console.log(global);
      if (global == 0) {
        alertify.error("No Inserto");
      } else {
        $('#tabla_articulos > tbody > tr').each(function () {
          linea = $(this).find('td').eq(0).html()
          var line = parseInt(linea);
          var cod = quitarAcentos($(this).find('td').eq(1).html());
          var descripcion_art = quitarAcentos($(this).find('td').eq(2).html());
          var marca = quitarAcentos($(this).find('td').eq(3).html());
          var catalogo = quitarAcentos($(this).find('td').eq(4).html());
          var unidad_medida = $(this).find('td').eq(5).html();
          var can = $(this).find('td').eq(6).html();
          var preciou = $(this).find('td').eq(7).html();
          var dscto_lin = $(this).find('td').eq(8).html();
          var monto = $(this).find('td').eq(9).html();
          var plazo_entrega = quitarAcentos($(this).find('td').eq(10).html());
          var fecha_prod = $(this).find('td').eq(11).html();
          var tipo_venta = '';
          var fath = '';
          var modificado = '0';
          $.ajax({
            beforeSend: function () {
            },
            url: 'procesa_cotizacion_det.php',
            type: 'POST',
            data: '&codigo=' + cod + '&descripcion_art=' + descripcion_art + '&cantidad=' + can + '&preciou=' + preciou +
              '&dscto_lin=' + dscto_lin + '&total_linea=' + monto + '&tipo_vta=' + tipo_venta + '&father=' + fath + '&n_ticket=' + global + '&line=' + line + '&unidad_medida=' + unidad_medida + '&fecha_prod=' + fecha_prod + '&marca=' + marca + '&catalogo=' + catalogo + '&plazo_entrega=' + plazo_entrega + '&modificado=' + modificado,
            success: function (data) {
              var n = noty({
                text: "Procesando venta...  articulo actual: " + cod,
                theme: 'relax',
                layout: 'topLeft',
                type: 'success',
                timeout: 2000,
              });

            },
            error: function (jqXHR, estado, error) {
              $("#errores").html('Error... ' + estado + '  ' + error);
            }
          });
          $('#modal_modificar').modal('hide');
          lista_cotizacion()
        });
      }
    }
  });


}

// function modal_art() {
//   //$('#modal_articulo').modal('show');
//   // $("#modal_articulo_2").modal("show");
//   //console.log("go");
//   $("#modal_busqueda_arts").modal({
//     show: true,
//     backdrop: 'static',
//     keyboard: false
//   });
//   $('#modal_busqueda_arts').on('shown.bs.modal', function () {
//     $("#lista_articulos").html("");
//     $("#articulo_buscar").val("");
//     $("#articulo_buscar").focus();
//   });

// }

function modal_art() {
  //$('#modal_articulo').modal('show');
  $("#modal_busqueda_arts").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $('#modal_busqueda_arts').on('shown.bs.modal', function () {
    $("#lista_articulos").html("");
    $("#articulo_buscar").val("");
    $("#articulo_buscar").focus();
  });
  lista_marca2()
}

function busqueda_art() {
  $('#modal_articulo').modal('show');
}

/* function busqueda_art() {
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
  lista_marca2();
} */
function add_art(art) {
  //alert(art);
  $("#modal_busqueda_arts").modal("toggle");
  $("#codigo").val(art.trim());
  busca_articulo();
}
function cal_igv() {
  precio = $("#preciou").val();

  precio_igv = parseFloat(
    parseFloat(precio * 0.18) + parseFloat(precio)
  ).toFixed(4);

  precio_isnan = isNaN(precio_igv) ? 0 : precio_igv;

  $("#preciouigv").val(precio_igv);
}


function lista_marca2() {
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


function busca() {
  cmoneda = $("#lista_cmoneda option:selected").val();
  data_buscar = $("#articulo_buscar").val();
  var data = data_buscar.split("//");
  firname = $("#listar_marca_art select").val();
  if (data_buscar === '') {
    datasupcatname = ''
    data_descripcion = ''
  }

  if (data.length == 1) {
    datasupcatname = data[0]
    data_descripcion = ''
  }
  if (data.length == 2) {
    datasupcatname = data[0]
    data_descripcion = data[1]
  }


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
    },

    success: function (x) {
      $("#lista_articulos").html(x);
      $("#tabla_art").DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}
function add_art_mod(art) {
  //alert(art);
  $("#modal_busqueda_arts").modal("toggle");
  $('#modal_articulo_2').modal('show');
  $("#codigo").val(art.trim());
  busca_articulo();
}

function busca_articulo_add() {
  $(document).ready(function () {
    var cod = $("#codigo").val().toString();
    console.log(cod);
    var tipcli = '';
    var cmoneda = $("#lista_cmoneda option:selected").val();
    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo2").html("Buscando informacion del articulo...");
          },
          url: 'busca_data_articulo_pventa.php',
          dataType: 'json',
          type: 'POST',
          data:
          {
            codigo: $("#codigo").val().toString(),
            idcliente_credito: $("#idcliente_credito").val(),
            cmoneda: cmoneda
          },
          success: function (data) {
            console.log(data);

            if (data == 0) {
              var n = noty({
                text: "No existe el articulo...!",
                theme: 'relax',
                layout: 'center',
                type: 'error',
                timeout: 2000,
              });
            } else {

              for (let i = 0; i < data.length; i++) {
                fil = ultimo_valor_fila()
                if (fil === 0) {
                  // $("#tabla_articulos_mod > tbody > tr > td").remove();
                  $("#tabla_art_ped > tbody > tr > td").remove();
                }
                var num = ultimo_valor_fila() + 1;

                precio = parseFloat(data[i].precio).toFixed(2);
                precio_igv = precio * 1.18;
                precioigv_parse = parseFloat(precio_igv).toFixed(2);
                li = parseFloat(num - 1).toFixed(0)
                $("#tabla_art_ped > tbody").append("<tr><td class='center'>" + num + "</td>" +
                  "<td class='center' style=''>" + data[i].ItemCode + "</td>" +
                  "<td style='center'>" + data[i].descripcion + "</td>" +
                  "<td style='center'>" + data[i].Fabricante + "</td>" +
                  "<td style='center'>" + data[i].Catalogo + "</td>" +
                  //"<td class='center'>" + data[0].Catalogo + "</td>"+
                  "<td class='center'>" + data[i].unidad_medida + "</td>" +

                  "<td style='text-align:center'><input type='number'  class='form-control pull-right' id='cantidad_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item(this," + li + ")'  onchange='calcular_total_item(this," + li + ")' ></td>" +
                  "<td style='text-align:center'><input type='number'  class='form-control pull-right' id='precio_uni'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + precio + "' onchange='calcular_total_item(this," + li + ");calcular_precio_igv(this," + li + ")' onkeyup='calcular_total_item(this," + li + ");calcular_precio_igv(this," + li + ")' ></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='descuento_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0'  onkeyup='detectarEnter(event,this," + li + ")' ></td>" +
                  "<td style='text-align:center'><input type='number'  class='form-control pull-right' id='precio_decuento'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + precio + "' onkeyup='calcular_dscto_item(this," + li + ")'  onchange='calcular_dscto_item(this," + li + ")' ></td>" +

                  "<td style='text-align:center'><input type='number'  class='form-control pull-right' id='precio_igv'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + precioigv_parse + "' onkeyup='calcular_total_item(this," + li + ")'  onchange='calcular_total_item(this," + li + ")' ></td>" +

                  "<td style='text-align:center'><input type='number'  class='form-control pull-right' id='monto_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item(this," + li + ")'  onchange='calcular_total_item(this," + li + ")' ></td>" +
                  "<td style='text-align:center'><input type='number'  class='form-control pull-right' id='monto_final'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot(this," + li + ")'  onchange='calcular_monto_tot(this," + li + ")' ></td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='plazoEntrega_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button></td>" +
                  "<td class='center' style='display:none'>" + precio + "</td>"
                );
                $("#btn-procesa").prop("disabled", false);

                if (data[0].cantidad2 <= 0) {
                  var n = noty({
                    text: "No hay suficiente existencia...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'information',
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
              theme: 'relax',
              layout: 'center',
              type: 'error',
              timeout: 2000,
            });
            //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
          }
        });
      });
    } else {
    }
  })
}


function ultimo_valor_fila() {
  //let tableBody = document.getElementById('tabla_articulos_mod'); 
  let line = [];
  $("#tabla_art_ped > tbody > tr").each(function () {
    articulos = parseFloat($(this).find("td").eq(0).html());
    line.push(articulos)
    //console.log(articulos);
  });

  line.sort(function (a, b) { return a - b });
  cantidad = line.length
  data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1]

  return data;
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


      fil = ultimo_valor_fila()
      if (fil === 0) {
        $("#tabla_articulos > tbody > tr").remove();
      }
      var num = ultimo_valor_fila() + 1;
      //var tipovta = "V";
      var multi_descuento = $("#dsctoline").val();
      var data = multi_descuento.split("+");

      if (multi_descuento === '') {
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

        var dsctoline = parseFloat((dsctoline2 + dsctoline3) - parseFloat(dsctoline2 * dsctoline3 / 100)).toFixed(2);
        //console.log(dsctoline);
      }


      var monto = parseFloat((cantidad * precio) - ((cantidad * precio) * (dsctoline / 100)), 2, '.', '').toFixed(2);

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
      //console.log(preciou_ant);
      //console.log(precio);
      if (precio < parseFloat(preciou_ant).toFixed(2)) {
        bandera = false;
        var n = noty({
          text: "Precio no puede ser menor al precio base...!",
          theme: "relax",
          layout: "center",
          type: "error",
          timeout: 2000,
        });
      }
      if (dsctoline.indexOf('+') !== -1) {
        bandera = false;
        listar_noty('Falta Calcular')
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
          parseFloat(multi_descuento).toFixed(2) +
          "</td><td class='center'>" +
          parseFloat(monto).toFixed(2) +
          "</td><td class='center'>" +
          plazo_entrega +
          "</td><td class='center' style='display:none'>" + dsctoline + "</td><td class='center'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button><button onclick='editar_producto(" +
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
function add_art_add() {
  //alert(art);

  $("#modal_busqueda_arts").modal("toggle");
  // $("#modal_busqueda_arts_mod").modal("toggle");
  //$('#modal_articulo_2').modal('show');

  // $("#codigo2").val(art.trim());


  let line = [];

  $('#tabla_art input[type="checkbox"]:checked').each(function (e) {
    codigo = $(this).closest("tr").children("td:eq(1)").text();
    line.push(codigo)

  });
  codigo = line.toString();

  $('#codigo').val(codigo);
  // console.log(codigo);
  busca_articulo_add();
}


function desactivar_datos() {
  $('#cmoneda').prop('disabled', 'disabled');
  $('#cpago').prop('disabled', 'disabled');
  $('#bcliente').prop('disabled', 'disabled');
}

function guarda_actualizar() {

}

$(document).on("click", "#cotizacion_seg", function () {
  det = document.querySelectorAll("#cotizacion_seg:checked").length;
  console.log(det);
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {

      $("#enviar").removeClass("disabledTab");
      $("#enviar").addClass("activeTab");
    } else {
      $("#enviar").removeClass("activeTab");
      $("#enviar").addClass("disabledTab");
      ;
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

function correo_val(id_ticket) {
  console.log(id_ticket);
  $.ajax({
    url: "correo_coti_aprobada.php",
    type: "POST",
    data: {
      docentry: id_ticket

    },
    success: function (x) {
      //  alertify.success('Se envio Correo')
      console.log('go')
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}


function correo_val_rechazado(id_ticket) {
  console.log(id_ticket);
  $.ajax({
    url: "correo_coti_rechazado.php",
    type: "POST",
    data: {
      docentry: id_ticket

    },
    success: function (x) {
      //  alertify.success('Se envio Correo')
      console.log('go')
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}


function procesa_rechazo(docentry) {
  swal({
    title: "¿Está seguro de rechazar la solicitud?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    buttons: ["No, cancelar", "Sí, rechazar"],
    dangerMode: true,
  }).then((confirmado) => {
    if (confirmado) {
      // Si el usuario confirmó el rechazo
      $.ajax({
        url: "procesa_rechazo_borrador.php",
        type: "POST",
        data: { docentry: docentry },
        success: function (x) {
          swal({
            title: "❌ Autorización Rechazada",
            text: "La solicitud de autorización ha sido rechazada.",
            icon: "error",
            buttons: false,
            timer: 2000,
            dangerMode: true
          });
          $('#modal_det_cotizacion').modal('hide');
          lista_cotizacion();
        },
        error: function (jqXHR, estado, error) {
          swal("Error", "Ocurrió un error al procesar el rechazo.", "error");
        },
      });
    } else {
      // Si el usuario cancela
      swal({
        title: "Operación cancelada",
        text: "La solicitud no fue rechazada.",
        icon: "info",
        buttons: false,
        timer: 2000
      });
    }
  });
}
