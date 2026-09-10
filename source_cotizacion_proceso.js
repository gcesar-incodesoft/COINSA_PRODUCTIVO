//tipo cambio actual

function lista_cotizacion() {

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
    url: "consulta_listado_cotizacion_procesa.php",
    type: "POST",
    data: "",
    success: function (x) {

      setTimeout(() => {
        swal.close();
        $("#lista_cotizacion").html(x);
        var table = $("#tabla_cot").DataTable({
          order: [[0, "desc"]],
        });

        $("#tabla_cot thead tr").clone(true).appendTo("#tabla_cot thead");
        $("#tabla_cot thead tr:eq(0) th").hide();

        $("#tabla_cot thead tr:eq(1) th").each(function (i) {
          if (i == 3 || i == 4 || i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#tabla_cot').DataTable().column(5).search("").draw();
        });

      }, 2500);
    },
    error: function (jqXHR, estado, error) { },
  });
}
function lista_modalidadDespacho() {
  //console.log('entro');
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
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
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



$(document).on("dblclick", "#lista_cotizacion tbody tr", function () {
  var $fila = $(this);

  var filaId = $fila.attr('id');

  console.log("Número de la fila seleccionada: " + filaId);

  // Obtener los datos de las celdas
  var doc = $fila.find("td:nth-child(1)").text();
  var num_cliente = $fila.find("td:nth-child(3)").text();
  var cliente = $fila.find("td:nth-child(4)").text();
  var estado = $fila.find("td:nth-child(9)").text();

  $("#lista_cotizacion tbody tr").removeClass("fila-resaltada"); // Quitar clase de fila resaltada de todas las filas
  $fila.addClass("fila-resaltada");


  $("#modal_id_botones").modal("show");
  // $("#modal_registrar_evidencia").modal("show");
  //$("#docito").val(doc);
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
    consultar_boton(doc);
    // consultar_boton2();
  }, 500);
});


function consultar_boton(docentry) {

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




// function genera_pdf_cotizacion() {
//   docentry = $("#docito").val();

//   $.ajax({
//     url: "busca_data_listado_pedido.php",

//     type: "POST",
//     data: { docentry, docentry },
//     success: function (x) {

//       var data = x;
//       var idcl = data.split("|");
//       var docentry = idcl[0].replace(/\s+/g, '');
//       var estado_desc = idcl[3];
//       var tipo = idcl[1];


//       setTimeout(() => {
//         genera_pdf_cotizacion2(docentry, estado_desc, tipo);
//       }, 1000);
//     },
//     error: function (jqXHR, estado, error) { },
//   });
// }



function genera_pdf_cotizacion() {

  estado = $("#ESTADO").val();

  if (estado === 'PEDIDO') {
    docentry = $("#docito").val();
  } else {
    docentry = $("#docito_cot").val();
  }



  $.ajax({
    url: "busca_data_listado_pedido.php",

    type: "POST",
    data: { docentry, docentry },
    success: function (x) {

      var data = x;
      var idcl = data.split("|");
      //var docentry = parseInt(idcl[0].replace(/\s+/g, ''), 10);
      var estado_desc = 'Aprobado';
      var tipo = parseInt(1);


      console.log(tipo);
      console.log(docentry);
      console.log(estado_desc);

      setTimeout(() => {

        if (tipo === 0) {


          // javascript: window.open("pdf_cotizacion.php?docentry=" +docentry+"&IDestado="+estado_desc+"");

          var ruta =
            "pdf_cotizacion1.php?docentry=" +
            docentry +
            "&IDestado=" +
            estado_desc +
            "";

          $("#modal_data_pdf").modal("show");
          $("#modal_data_pdf")
            .on("shown.bs.modal", function () {
              $(this).find("iframe").attr("src", ruta);
            })
            .on("hidden.bs.modal", function () {
              $(this).find("iframe").attr("src", "");
            });

          // $("#navegador")
          //   .off("click")
          //   .on("click", function () {
          //     window.open(ruta, "_blank");
          //   });
          $("#navegador")
            .off("click")
            .on("click", function () {
              var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

              window.open(contenedorUrl, "_blank");
            });

          $("#imprimir")
            .off("click")
            .on("click", function () {
              $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
            });
        }
        if (tipo === 1) {
          // javascript: window.open("pdf_pedido.php?docentry=" + docentry + "&IDestado=" + estado_desc + "");

          var ruta = "pdf_pedido.php?docentry=" + docentry + "&IDestado=" + estado_desc + "";

          $("#modal_data_pdf").modal("show");
          $("#modal_data_pdf")
            .on("shown.bs.modal", function () {
              $(this).find("iframe").attr("src", ruta);
            })
            .on("hidden.bs.modal", function () {
              $(this).find("iframe").attr("src", "");
            });

          // $("#navegador")
          //   .off("click")
          //   .on("click", function () {
          //     window.open(ruta, "_blank");
          //   });
          $("#navegador")
            .off("click")
            .on("click", function () {
              var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

              window.open(contenedorUrl, "_blank");
            });

          $("#imprimir")
            .off("click")
            .on("click", function () {
              $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
            });
        }

      }, 500);
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




function busca_detalle_cotizacion() {
  id = $("#docito_cot").val();

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

function lista_direccion_condicion(cardcode) {
  var idcliente3 = "";
  idcliente3 = cardcode;
  //console.log(cardcode);
  $(document).ready(function () {
    $.ajax({
      //          beforeSend: function(){
      //            $("#montolp").html("Recuperando Lista Precios...");
      //           },
      url: "lista_direccion_venta_client.php",

      type: "POST",
      data: { idcliente3 },
      success: function (x) {
        $("#pone_cdireccion").html(x);
        $(".select2").select2();
        //              alert($("#totales").html())
        //$("#montolp2").val($("#montolp").val());
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function pasar_a_pedido() {

  docentry = $("#docito_cot").val();

  $.ajax({
    url: "busca_data_listado_pedido.php",

    type: "POST",
    data: { docentry, docentry },
    success: function (x) {

      $("#modal_procesar_cotizacion").modal("show");
      //console.log(docentry);
      var idcl = x.split("|");
      lista_cmoneda_mod(idcl[7]);
      $("#doc_cotiza").val(idcl[0].replace(/\s+/g, ''));
      lista_direccion_condicion(idcl[4]);
      consultar_data_cot_det(idcl[0].replace(/\s+/g, ''));
      tipo_cambio_hoy();
      lista_modalidadDespacho();
      $(".nombreClie_procesar").html("");
      $(".nombreClie_procesar").append(
        "Procesar Cotizacion | <span class='label label-warning'># Cotizacion: " +
        idcl[0] + " | # SAP: " + idcl[8] +
        "</span>"
      );

    },
    error: function (jqXHR, estado, error) { },
  });
}

function procesa_pedido() {
  var monto = 0.0;
  var montoigv = 0.0;
  $("#tabla_articulos_mod > tbody > tr").each(function () {
    monto += parseFloat(
      $(this).find("td").eq(9).html()
    );
  });
  montoigv = parseFloat(monto * 0.18).toFixed(2);
  sub_total = monto;
  total = montoigv;
  doc_cotiza = $("#doc_cotiza").val();
  orden_compra = $("#orden_compra").val();
  fecha_entrega = $("#fecha").val();
  dir_entrega = $("#cap_dicc1").val();
  moneda = $("#lista_cmoneda_mod select").val();
  contacto_coti = '';
  telefono_coti = '';
  correo_coti = '';
  cod_dire_entrega = $("#pone_cdireccion option:selected").val();
  let modDespacho = $("#lista_modD").val();
  // if (modDespacho === "0") {
  //   band = false;
  //   alertify.error("Seleccione Modalidad de Despacho");
  //   return;
  // }

  if (modDespacho === "0") {
    band = false;
    swal("Error", "Seleccione Modalidad de Despacho", "error");
    return;
  };
  //migrar_sap(doc_cotiza)
  $.ajax({
    beforeSend: function () { },
    url: "procesa_cotizacion_pedido.php",
    type: "POST",
    data: {
      montoigv: montoigv,
      orden_compra: orden_compra,
      fecha_entrega: fecha_entrega,
      dir_entrega: dir_entrega,
      moneda: moneda,
      sub_total: sub_total,
      total: total,
      doc_cotiza: doc_cotiza,
      contacto_coti: contacto_coti,
      telefono_coti: telefono_coti,
      correo_coti: correo_coti,
      cod_dire_entrega: cod_dire_entrega,
      modDespacho: modDespacho
    },
    success: function (x) {
      global = parseInt(x);
      console.log(global);
      if (global === 0) {
        alertify.error("No Inserto");
      } else {
        alertify.success("Inserto");
        $("#tabla_articulos_mod > tbody > tr").each(function () {
          linea = $(this).find("td").eq(0).html();
          var line = parseInt(linea);
          var cod = quitarAcentos($(this).find("td").eq(1).html());
          var descripcion_art = quitarAcentos($(this).find("td").eq(2).html());
          var marca = quitarAcentos($(this).find("td").eq(3).html());
          var catalogo = quitarAcentos($(this).find("td").eq(4).html());
          var unidad_medida = $(this).find("td").eq(5).html();
          var can = $(this).find("td").eq(6).html();
          var preciou = $(this).find("td").eq(7).html();
          var dscto_lin = $(this).find("td").eq(8).html();
          var monto = $(this).find("td").eq(9).html();
          var plazo_entrega = quitarAcentos($(this).find("td").eq(10).html());
          var fecha_prod = '';
          var tipo_venta = "";
          var fath = "";
          var modificado = "0";
          $.ajax({
            beforeSend: function () { },
            url: "procesa_cotizacion_pedido_det.php",
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
              "&n_ticket=" +
              global +
              "&line=" +
              line +
              "&unidad_medida=" +
              unidad_medida +
              "&fecha_prod=" +
              fecha_prod +
              "&marca=" +
              marca +
              "&catalogo=" +
              catalogo +
              "&plazo_entrega=" +
              plazo_entrega +
              "&modificado=" +
              modificado +
              "&doc_cotiza=" +
              doc_cotiza,
            success: function (data) { },
            error: function (jqXHR, estado, error) {
              $("#errores").html("Error... " + estado + "  " + error);
            },
          });
          $("#modal_procesar_cotizacion").modal("hide");
        });
      }
      //migrar_sap_cotizacion(doc_cotiza)
      lista_cotizacion();
    },
    error: function (jqXHR, estado, error) {
      $("#errores").html("Error... " + estado + "  " + error);
    },
  });
}

// function migrar_sap_cotizacion(docentry, baseentry) {
//   $.ajax({
//     beforeSend: function () {},
//     url: "migradores/migrar_cotizacion_sap.php",
//     type: "POST",
//     data: { docentry: docentry, baseentry: baseentry },
//     success: function (x) {
//       $("#migrado_sap").html(x);
//       estado_migrado = $("#estado_mig").text().trim();
//       docentry_new = $("#docentry_mig").text().trim();
//       if (estado_migrado === "02") {
//         $messegae = "Migro a SAP: " + docentry_new;
//         swal("Aceptada!", $messegae, "success");
//         migrar_sap(docentry, docentry_new);
//         //enviar_sunat(docentry, 'VE')
//       } else {
//         $messegae = "NO Migro a SAP : " + docentry_new;
//         swal("Error!", $messegae, "error");
//       }
//       console.log(x);
//       console.log(estado_migrado);
//     },
//     error: function (jqXHR, estado, error) {
//       $("#errores").html("Error... " + estado + "  " + error);
//     },
//   });
// }

// function migrar_sap(docentry, baseentry) {
//   $.ajax({
//     beforeSend: function () {},
//     url: "migradores/migrar_pedido_sap.php",
//     type: "POST",
//     data: { docentry: docentry, baseentry: baseentry },
//     success: function (x) {
//       $("#migrado_sap_pedido").html(x);
//       estado_migrado = $("#estado_mig").text().trim();
//       docentry_new = $("#docentry_mig").text().trim();
//       if (estado_migrado === "02") {
//         $messegae = "Migro a SAP" + docentry_new;
//         swal("Aceptada!", $messegae, "success");
//         //enviar_sunat(docentry, 'VE')
//       } else {
//         $messegae = "NO Migro a SAP : " + docentry_new;
//         swal("Error!", $messegae, "error");
//       }
//       console.log(x);
//       console.log(estado_migrado);
//     },
//     error: function (jqXHR, estado, error) {
//       $("#errores").html("Error... " + estado + "  " + error);
//     },
//   });
// }


function migrar_sap_pedido() {

  docentry = $("#docito").val();




  $.ajax({
    beforeSend: function () { },
    url: "insertar_cola_service_cotizacion.php",
    type: "POST",
    data: { docentry: docentry, tipo_doc: '10', objtype: '17' },
    success: function (x) {
      docentry = x.trim();
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        timer: 3000
      });
      lista_cotizacion()
      //migrar_sap_cotizacion(docentry)
    },
    error: function (jqXHR, estado, error) {
      $("#errores").html("Error... " + estado + "  " + error);
    },
  });



}

function migrar_sap_cotizacion() {

  docentry = $("#docito").val();



  $.ajax({
    beforeSend: function () { },
    url: "insertar_cola_service_cotizacion.php",
    type: "POST",
    data: { docentry: docentry, tipo_doc: '9', objtype: '23' },
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
      // $("#tabla_articulos_mod").DataTable({
      //   order: [[0, "asc"]],
      // });
      setTimeout(() => {
        resumen_mod();
      }, 3000);
    },
    error: function (jqXHR, estado, error) { },
  });
}

// function editar_producto_mod(num) {
//   num=num -1 ;
//   console.log(num);
//   $('#moda_editar_articulo_mod').modal('show');
//   cod_art =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[1].innerHTML;
//   descripcion_art =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[2].innerHTML;
//   fecha_entrega =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[11].innerHTML;
//   cantidad =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[6].innerHTML;
//   unidad_medida =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[5].innerHTML;
//   preciou =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[7].innerHTML;
//   monto =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[9].innerHTML;
//   dscto_lin =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[8].innerHTML;
//   catalogo =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[4].innerHTML;
//   marca =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[3].innerHTML;
//   plazo_entrega =$($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[10].innerHTML;

//   $('#codigo_modificar_mod').val(cod_art);
//   $('#descripcionitem_modificar_mod').val(descripcion_art);
//   $('#fecha_prod_modificar_mod').val(fecha_entrega);
//   $('#cantidad_modificar_mod').val(cantidad);
//   $('#unidad_line_modificar_mod').val(unidad_medida);
//   $('#preciou_modificar_mod').val(preciou);
//   $('#preciou_ant_modificar_mod').val(preciou);
//   $('#preciouigv_modificar_mod').val(monto);
//   $('#dsctoline_modificar_mod').val(dscto_lin);
//   $('#catalogo_item_modificar_mod').val(catalogo);
//   $('#marca_item_modificar_mod').val(marca);
//   $('#plazo_entrega_modificar_mod').val(plazo_entrega);
//   $('#num_mod_mod').val(num);
// }

// function actualizar_datos_prod_mod() {
//   if ($("#dsctoline_modificar_mod").val() == 0) {
//     var dsctoline = 0;
//   } else {
//     var dsctoline = $("#dsctoline_modificar_mod").val();
//   }

//   var precio = $("#preciou_modificar_mod").val();
//   var cantidad = $("#cantidad_modificar_mod").val();
//   var monto = (cantidad * precio) - ((cantidad * precio) * (dsctoline / 100));
//   num=$('#num_mod_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[1].innerHTML = $('#codigo_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[2].innerHTML = $('#descripcionitem_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[3].innerHTML = $('#marca_item_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[4].innerHTML = $('#catalogo_item_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[5].innerHTML = $('#unidad_line_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[6].innerHTML = $('#cantidad_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[7].innerHTML = $('#preciou_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[8].innerHTML = $('#dsctoline_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[9].innerHTML = monto;
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[10].innerHTML = $('#plazo_entrega_modificar_mod').val();
//   $($('#tabla_articulos_mod').find('tbody > tr')[num]).children('td')[11].innerHTML = $('#fecha_prod_modificar_mod').val();
//   $('#moda_editar_articulo_mod').modal('hide');

//   resumen_mod();
// }

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
      var el = document.getElementById("tipo_cambio");

      let num2 = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "SOL",
      }).format(tc);
      el.innerText = num2;
    },
    error: function (jqXHR, estado, error) { },
  });
}

function resumen_mod() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    $("#tabla_articulos_mod > tbody > tr").each(function () {
      articulos += parseFloat($(this).find("td").eq(6).html());
      monto += parseFloat($(this).find("td").eq(9).html());
      //console.log(monto);
    });

    cmoneda = $("#lista_cmoneda_mod").children().val();

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

function lista_cmoneda_mod(moneda) {
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

        setTimeout(() => {
          $("#lista_cmoneda_mod select")
            .val(moneda)
            .trigger("change.select2");
        }, 2000);


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

function modal_art_mod() {
  //$('#modal_articulo').modal('show');
  $("#modal_articulo_2").modal("show");
}

function busqueda_art_mod() {
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
}

function busca_mod() {
  cmoneda = $("#lista_cmoneda_mod option:selected").val();
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos_mod").html("");
    },
    url: "busca_articulos_ayuda2.php",
    type: "POST",
    data: "articulo=" + $("#articulo_buscar_mod").val() + "&cmoneda=" + cmoneda,
    success: function (x) {
      $("#lista_articulos_mod").html(x);
      $("#tabla_art").DataTable();
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos_mod").html(
        "Error en la peticion AJAX..." + estado + "      " + error
      );
    },
  });
}

function add_art_mod(art) {
  //alert(art);
  $("#modal_busqueda_arts_mod").modal("toggle");
  $("#codigo2").val(art.trim());
  busca_articulo_mod();
}

function busca_articulo_mod() {
  $(document).ready(function () {
    var cod = $("#codigo2").val().trim();
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
          data:
          //PERMITE HACER MULTIPLE CONSULTA GC
          {
            codigo: $("#codigo2").val(),
            idcliente_credito: $("#idcliente_credito_mod").val(),
            cmoneda: cmoneda,
          },
          //              'codigo='+$("#codigo").val(),
          success: function (data) {
            precio = Number(data[0].precio).toFixed(4);
            precio_igv = precio * 1.18;
            precioigv_parse = Number(precio_igv).toFixed(4);
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

              $("#codigo2").val("");
              $("#codigo2").focus();
              $("#cantidad2").attr("disabled", true);
              $("#cantidad2").val(0.0);
              $("#dsctoline2").attr("disabled", true);
              $("#dsctoline2").val(0.0);
              $("#monedaitem2").attr("disabled", true);
              $("#monedaitem2").val("");
              $("#descripcionitem2").val("");
              //$("#preciou").attr("disabled", true);
              $("#preciou2").val(0.0);
              $("#preciouigv2").attr("disabled", true);
              $("#preciouigv2").val(0.0);
              $(".widget-user-desc").html("");
              $(".exis2").html(0);
              $(".preciol2").html(0.0);
              $("#imagen2").attr("src", "dist/img/sin_foto.png");
            } else {
              $("#cantidad2").val(0.0);
              $("#dsctoline2").val(0.0);
              $("#monedaitem2").val("");
              $("#preciou2").val(0.0);
              $("#preciou_ant2").val(precio);
              $(".widget-user-desc").html(data[0].descripcion);
              $("#descripcionitem2").val(data[0].descripcion);
              /* if (data[0].cantidad2 < 1) {
                document.getElementsByClassName("exis")[0].style.color = "red";
                document.getElementsByClassName("exis")[0].style.fontWeight = "bolder";
              } else {
                document.getElementsByClassName("exis")[0].style.color = "blue";
                document.getElementsByClassName("exis")[0].style.fontWeight = "bolder";
              } */
              $("#exis").val(data[0].cantidad2);
              $(".preciol2").html(precio);
              $("#monedaitem2").attr("disabled", true);
              $("#monedaitem2").val(data[0].moneda);
              // $("#preciou").attr("disabled", true);
              //$('#preciou').number(true, 2);
              $("#preciou2").val(precio);
              $("#unidad_line2").val(data[0].unidad_medida);
              $("#catalogo_item2").val(data[0].Catalogo);
              $("#marca_item2").val(data[0].Fabricante);
              //console.log(data[0].precio);
              // SI TIPO CLIENTE = 115 = EXTRANJERO
              if (data[0].tipocliente == 115) {
                $("#preciouigv2").val(precio);
              } else {
                $("#preciouigv2").val(precio_igv);
              }
              //$('#cantidad2').number(true, 2);
              $("#cantidad2").attr("disabled", false);
              $("#cantidad2").val(0.0);
              $("#dsctoline2").attr("disabled", false);
              $("#dsctoline2").val(0.0);
              $("#preciou2").select();
              $("#cantidad2").focus();
              if (data[0].imagen != "") {
                $("#imagen2").attr("src", "img_articulos/" + data[0].imagen);
              } else {
                $("#imagen2").attr("src", "dist/img/sin_foto.png");
              }
              if (data[0].cantidad2 <= 0) {
                // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                var n = noty({
                  text: "No hay suficiente existencia...!",
                  theme: "relax",
                  layout: "center",
                  type: "information",
                  timeout: 2000,
                });
                //                alert("No hay suficiente existencia...!")
                //                 $("#codigo2").val("");
                //                 $("#codigo2").focus();
                //                 $("#cantidad2").attr("disabled", true);
                //                $("#dsctoline2").attr("disabled", true);
                //                 $("#preciou").attr("disabled", true);
                $("#cantidad2").focus();
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
