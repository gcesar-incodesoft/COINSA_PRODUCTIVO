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
      $("#lista_cmoneda2").val("USD");
      let num2 = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "SOL",
      }).format(tc);
      el.innerText = num2;
    },
    error: function (jqXHR, estado, error) { },
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
        $("#lista_cmoneda select").val("USD").trigger("change.select2");
        setTimeout(() => {
          $("#Serie").val("S001");
        }, 100);

      },

      error: function (jqXHR, estado, error) { },
    });
  });
}


function mostrar_folio() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cmoneda").html("Recuperando Lista ...");
      },
      url: "lista_num_folioS.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#Nro_folio").val(x);

      },

      error: function (jqXHR, estado, error) { },
    });
  });
}





/***************************************************************************/
function pone_Grupo_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Grupo_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_Grupo_Articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Grupo_Articulos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

/***************************************************************************/
function pone_clas_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_clas_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_clas_Articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_clas_Articulos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function pone_Imp_Comp() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Imp_Comp").html("Recuperando articulos...");
      },
      url: 'pone_Imp_Comp.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Imp_Comp").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_Familia() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Familia").html("Recuperando articulos...");
      },
      url: 'pone_Familia.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Familia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_SubFamilia() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_SubFamilia").html("Recuperando articulos...");
      },
      url: 'pone_SubFamilia.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_SubFamilia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_TIPO_EXIST_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_TIPO_EXIST_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_TIPO_EXIST_Articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_TIPO_EXIST_Articulos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_Imp_Vent() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Imp_Vent").html("Recuperando articulos...");
      },
      url: 'pone_Imp_Vent.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Imp_Vent").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
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



function genera_opcion_GE() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'Mostrar_Fecha_Mercaderia_Salida.php',
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
              $("#fechaii").val(xstart);
              $("#fechaf").val(xend);
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





function busca_cliente_RUC() {
  ruc = $("#Codigo_Ruc").val();

  bandera = true;

  if (ruc.length === 11) {
    bandera = true;
    valida_cliente("Codigo_Ruc", true, "Ruc válido.");
  } else {
    bandera = false;
    valida_cliente("Codigo_Ruc", false, "Por favor, ingresa un Ruc válido.");
  }

  if (bandera === true) {
    $.ajax({
      beforeSend: function () {
        //$("#correlativo_grt").html("Recuperando proveedores...");
      },
      url: "consulta_ruc_sunat.php",
      type: "POST",
      dataType: "json",
      data: { ruc: ruc },
      success: function (data2) {
        console.log(data2);

        valido = data2.success;
        razon = data2.result.razon_social;
        direccion = data2.result.direccion;
        var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
        //console.log(data2.result.establecimientos);
        //console.log(data2.result.establecimientos.length);

        if (valido == "false") {
          alertify.error("error ruc no existe");
        } else {
          $("#NomProveedor").val(razon.replace(pattern, ""));

        }
      },
      error: function (jqXHR, estado, error) { },
    });
  }
}



function modal_art() {
  //$('#modal_articulo').modal('show');
  //$('#modal_articulo').modal('show');
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

let global = 0;


function lista_arti() {
  // estado = $("#estado_1").val();
  // cardcode = $("#lista_clients11").val();
  fec_ini = $("#fechaii").val();
  if (fec_ini === "") {
    fec_ini = '2024-01-01';
  } else {
    fec_ini = $("#fechaii").val();
  }
  fec_fin = $("#fechaf").val();

  $.ajax({
    beforeSend: function () {
      // $("#lista_cotizacion").html("Recuperando Lista ...");
      // $("#lista_cotizacion").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
    url: "consulta_lista_arti_salida.php",
    type: "POST",
    data: { fec_ini: fec_ini, fec_fin: fec_fin, tipo: 'S' },
    success: function (x) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_cotizacion").html(x);
        $("#tabla_cot").DataTable({
          order: [[0, "desc"]],
        });
      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) { },
  });
}



function exportar_excel() {
  fec_ini = $("#fechaii").val();
  if (fec_ini === "") {
    fec_ini = '2024-01-01';
  } else {
    fec_ini = $("#fechaii").val();
  }
  fec_fin = $("#fechaf").val();

  javascript: window.open("reporte_salida_excel.php?fec_ini=" + fec_ini + "&fec_fin=" + fec_fin);
}


function anular_operacion() {
  id= $("#docito").val();


  $("#modal_anular_ope").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });


  $("#modal_anular_ope").on("shown.bs.modal", function () {
    $("#comentarios_anulacion").css({
      "border": "2px solid rgb(65, 138, 148)",
      "outline": "none"
    }).focus();
  });


  $("#docentry_anula").val(id);

}


function anular_ope2() {
  id = $("#docentry_anula").val();
  fecha = $("#fecha_anula").val();
  comentario = $("#comentarios_anulacion").val();

  $.ajax({
    url: "anular_operacion_entrada.php",

    type: "POST",
    data: { id: id, fecha: fecha, comentario: comentario },
    success: function (x) {
      $("#modal_anular_ope").modal("hide");

      swal("Se anuló la operación correctamente", {
        icon: "success",
      });


    },
    error: function (jqXHR, estado, error) { },
  });



}


function busca_detalle() {
  id= $("#docito").val();

  $("#modal_list_articulos").modal("show");

  $.ajax({
    url: "consulta_detalle_art.php",

    type: "POST",
    data: "id=" + id,
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append(
        "Detalle de Cotizacion | <span class='label label-warning'>#: " +
        id +
        "</span>"
      );
      $("#lista_articulos_mod").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
}



function Registrar() {
  let Codigo_Ruc = $("#Codigo_Ruc").val();
  let NomProveedor = $("#NomProveedor").val().toUpperCase();
  let proveedor = $("#eli_prove option:selected").val();
  let Comentario = $("#Comentario").val();
  let moneda = $("#lista_cmoneda option:selected").val();
  //FALTA FECHA 
  let fecha = $("#fechai").val();
  let Serie = $("#Serie").val(); // Obtener el valor
  let Nro_folio = $("#Nro_folio").val(); // Obtener el valor
  let bandera = true;
  let tipo_entrada = 'S';

  // Validación
  // if (Codigo_Ruc === '') {
  //   bandera = false;
  //   alertify.error("Ingresar Codigo o Ruc");
  // } else if (Codigo_Ruc.length !== 11) {
  //   bandera = false;
  //   alertify.error("RUC inválido");
  // }

  $("#tabla_articulos > tbody > tr").each(function () {
    var almacen2 = $(this).find("td").find("#almacen option:selected").val().trim();
    var can = $(this).find("td").find('input[id="cantidad_item"]').val();
    var cantidad = parseFloat(can);
    var stock = $(this).find("td").eq(4).html();

    if (almacen2 === "") {
      bandera = false;
      alertify.error("No Selecciono Almacen");
      $(this).find("td").eq(8).css("background-color", "#F67280");
      band = false;
    } else {
      $(this).find("td").eq(8).css("background-color", "white");
    }


    if (cantidad > stock) {
      bandera = false;
      alertify.error("Cantidad invalida");
      $(this).find("td").eq(5).css("background-color", "#F67280");
    } else {
      $(this).find("td").eq(5).css("background-color", "white");
    }

  });



  // if (Codigo_Ruc === '') {
  //   bandera = false;
  //   alertify.error("Ingresar Codigo o Ruc");
  // }





  if (bandera === true) {
    $.ajax({
      url: 'procesa_EnAlmacen.php',
      type: 'POST',
      data: {
        Codigo_Ruc: Codigo_Ruc,
        NomProveedor: NomProveedor,
        Comentario: Comentario,
        Serie: Serie,
        Nro_folio: Nro_folio,
        fecha: fecha,
        moneda: moneda,
        tipo_entrada: tipo_entrada,
        proveedor: proveedor
      },
      success: function (data) {
        // console.log("Response from server:", data); // Para depuración
        let global = parseInt(data);
        if (global == 0) {
          alertify.error("No se pudo insertar");
        } else {
          console.log("3")
          $("#tabla_articulos > tbody > tr").each(function () {
            linea = $(this).find("td").eq(0).html();
            var line = parseInt(linea);
            var codigo = $(this).find("td").eq(1).html();
            var descripcion = $(this).find("td").eq(2).html();
            var Catalogo = $(this).find("td").eq(3).html();
            var Marca = $(this).find("td").eq(4).html();

            var unidad = $(this).find("td").eq(5).html();

            var stock = $(this).find("td").eq(6).html();

            var almacen = $(this).find("td").find("#almacen option:selected").val().trim();


            var can = $(this)
              .find("td")
              .find('input[id="cantidad_item"]')
              .val();
            var preciou = $(this)
              .find("td")
              .find('input[id="precio_uni"]')
              .val();

            var monto = $(this)
              .find("td")
              .find('input[id="monto_item"]')
              .val();

            $.ajax({
              beforeSend: function () { },
              url: "procesa_EnAlmacen_det.php",
              type: "POST",
              data:
                "&codigo=" +
                codigo +
                "&descripcion=" +
                descripcion +
                "&unidad=" +
                unidad +
                "&stock=" +
                stock +
                "&can=" +
                can +
                "&preciou=" +
                preciou +
                "&monto=" +
                monto +
                "&n_ticket=" +
                global +

                "&almacen=" +
                almacen +
                "&Catalogo=" +
                Catalogo +
                "&Marca=" +
                Marca +


                "&line=" +
                line,
              success: function (data) {
                // var n = noty({
                //   text: "Procesando venta...  articulo actual: " + cod,
                //   theme: "relax",
                //   layout: "topLeft",
                //   type: "success",
                //   timeout: 2000,
                // });
              },
              error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
              },
            });
          });


          $("#tabla_articulos > tbody:last").children().remove();
          $("#Codigo_Ruc").val("");
          $("#NomProveedor").val("");
          $("#Comentario").val("");
          // $("#Serie").val("");
          // $("#Nro_folio").val("");
          // $("#familia_articulo").val("");
          // $("#unid_Medida").val('');
          // $("#codigo_um_compras").val('');

          swal("Se registró correctamente", {
            icon: "success",
            timer: 2000, // tiempo en milisegundos
            buttons: false, // desactiva el botón para cerrar
          });
        }
        // lista_datos_ma();
        lista_arti();
        mostrar_folio();
      },
      error: function (jqXHR, estado, error) {
        // console.error('Error en la solicitud AJAX', estado, error); // Para depuración
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });
  }
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

      precio_unitario = parseFloat($(this).find("td").eq(19).html());
      nuevo_precio_unitario = parseFloat(precio_unitario * tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(19).html(nuevo_precio_unitario);
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

      precio_unitario = parseFloat($(this).find("td").eq(19).html());
      nuevo_precio_unitario = parseFloat(precio_unitario / tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(19).html(nuevo_precio_unitario);
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
      precio_unitario = parseFloat($(this).find("td").eq(19).html());
      nuevo_precio_unitario = parseFloat(precio_unitario * tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(19).html(nuevo_precio_unitario);
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

      precio_unitario = parseFloat($(this).find("td").eq(19).html());
      nuevo_precio_unitario = parseFloat(precio_unitario / tc).toFixed(4);
      $(this).find("td").find('input[id="monto_item"]').val(nuevo_monto);
      $(this).find("td").find('input[id="precio_uni"]').val(nuevo_preciou);
      $(this).find("td").find('input[id="precio_igv"]').val(nuevo_precioigv);
      $(this)
        .find("td")
        .find('input[id="precio_decuento"]')
        .val(nuevo_precio_decuento);
      $(this).find("td").find('input[id="monto_final"]').val(nuevo_monto_final);
      $(this).find("td").eq(19).html(nuevo_precio_unitario);
      resumen();
    });
  }
  $("#modalCambios").modal("hide");
}




function lista_marca() {
  $.ajax({
    beforeSend: function () {
      $("#listar_marca_art").html("");
    },
    url: "busca_data_articulo_marca_almacen.php",
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

function busca1() {
  data_buscar = $("#articulo_buscar").val();
  firname = $("#listar_marca_art select").val(); // Selected brand
  let data_descripcion = "";

  if (data_buscar) {
    data_descripcion = data_buscar;
  }

  // AJAX request
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos").html("");
    },
    url: "busca_data_articulo_almace_otro.php",
    type: "POST",
    data: {
      data_descripcion: data_descripcion,
      firname: firname,
    },
    success: function (response) {
      $("#lista_articulos").html(response); // Populate the results
      $("#tabla_art").DataTable(); // Initialize DataTable
    },
    error: function (jqXHR, estado, error) {
      $("#lista_articulos").html(
        "Error en la peticion AJAX: " + estado + " " + error
      );
    },
  });
}

function updateNumArticuloForGroup(value) {
  return value;
}
function registrar_datos_modal() {
  swal({
    title: "Quiere Regsitrar Articulo?",
    text: "Reguistre Articulo",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {

        Registrar();

      } else {
        swal("No se Registro Articulo");
      }
    });
}
function updateNumArticuloForFamily(value) {
  let groupValue = $("#pone_Grupo_Articulos select").val();
  return groupValue + value;
}

function updateNumArticuloForSubFamily(value) {
  let groupValue = $("#pone_Grupo_Articulos select").val();
  let familyValue = $("#pone_Familia select").val();
  return groupValue + familyValue + value;
}
function handleSelectChange(selector, nextElement, url, updateValueFunction, resetElements = []) {
  $(document).on("change", selector, function () {
    let originalValue = this.value;

    // Llamamos a la función que actualizará el valor de num_articulo
    let updatedValue = updateValueFunction(originalValue);
    $("#num_articulo").val(updatedValue);

    // Reiniciar los elementos dependientes si hay alguno
    resetElements.forEach(function (element) {
      $(element).html("").trigger("change");  // Reinicia el valor y desencadena el evento change para limpiar select2
    });

    $.ajax({
      beforeSend: function () {
        $(nextElement).html("Cargando...");
      },
      url: url,
      type: 'POST',
      data: { docentry: originalValue },
      success: function (response) {
        $(nextElement).html(response);
        $(".select2").select2();

        // Solo en el último select hacemos la lógica adicional
        if (nextElement === "#codigo_sap_articulo") {
          let numericValue = parseInt(response, 10);
          let newValue = (numericValue + 1).toString().padStart(response.length, '0');
          let finalValue = updatedValue + newValue;
          $("#num_articulo").val(finalValue);
        }
      },
      error: function (jqXHR, estado, error) {
        console.error('Error en la solicitud AJAX', error);
      }
    });
  });
}

function lista_datos_ma() {
  fechai = $("#fechai").val();
  if (fechai === "") {
    fechai = '01-01-2024';
  } else {
    fechai = $("#fechai").val();
  }
  fechaf = $("#ff").val();

  $.ajax({
    beforeSend: function () {
      $("#lista_datos_maestros").html("Recuperando Lista ...");
    },
    url: "consulta_listado_maestros.php",
    type: "POST",
    data: { fechai: fechai, fechaf: fechaf },
    success: function (x) {
      $("#lista_datos_maestros").html(x);
      $("#tabla_cot").DataTable({
        order: [[0, 'desc']],
        columnDefs: [{
          width: "120px",
          targets: 1
        }
        ]
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}


$(document).on("change", "#pone_Grupo_Articulos select", function () {
  var id = this.value
  $("#num_articulo").val(id);

  $.ajax({
    beforeSend: function () {
      $("#pone_Familia").html("Cargando...");
    },
    url: 'pone_Familia.php',
    type: 'POST',
    data: { docentry: id },
    success: function (x) {
      $("#pone_Familia").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });
})
$(document).on("change", "#pone_Familia select", function () {
  $("#num_articulo").val('');
  id = $("#pone_Grupo_Articulos select").val();
  id2 = id + this.value
  $("#num_articulo").val(id2);

  $.ajax({
    beforeSend: function () {
      $("#pone_SubFamilia").html("Cargando...");
    },
    url: 'pone_SubFamilia.php',
    type: 'POST',
    data: { docentry: this.value },
    success: function (x) {
      $("#pone_SubFamilia").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });
})
$(document).on("change", "#pone_SubFamilia select", function () {
  $("#num_articulo").val('');
  id = $("#pone_Grupo_Articulos select").val();
  id2 = $("#pone_Familia select").val();
  id3 = id + id2 + this.value
  $("#num_articulo").val(id3);

  $.ajax({
    beforeSend: function () {
      // $("#subfamilia_articulo").html("Cargando...");
    },
    url: 'lista_codigo_sap_oitm.php',
    type: 'POST',
    data: { docentry: id3 },
    success: function (x) {
      console.log(x);

      id = $("#num_articulo").val();
      value = x;
      let numericValue = parseInt(value, 10);
      let newValue = (numericValue + 1).toString();

      // Añadir ceros a la izquierda si es necesario (4 dígitos)
      while (newValue.length < value.length) {
        newValue = '0' + newValue;
      }
      let resultText = `${newValue}`;
      console.log(resultText)
      id2 = id + resultText

      $("#num_articulo").val(id2);
    },
    error: function (jqXHR, estado, error) {
    }
  });
})
$(document).on("change", "#grupo_medida select", function () {
  id = this.value;

  $('#codigo_um_compras').val(id);
  $('#cod_um_recuento').val(id);
})


$(document).on("click", "#tabla_art tbody tr", function () {
  // Encuentra el checkbox dentro de la fila actual
  var checkbox = $(this).find("#cotizacion_seg");

  // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
  checkbox.prop("checked", !checkbox.prop("checked"));

  // Actualiza la apariencia y el botón según el estado del checkbox
  actualizarFila(checkbox);
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
  let line = [];

  $('#tabla_art input[type="checkbox"]:checked').each(function (e) {
    codigo = $(this).closest("tr").children("td:eq(1)").text();
    line.push(codigo);
  });
  codigo = line.toString();

  $("#codigo").val(codigo);
  busca_articulo_add();
}


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


function validar_numero(event) {
  console.log(event);
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    alertify.error('No puede ingresar letras');
    return false;
  }
  return true;
}

$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", ".delete", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();

    // num_filas = document.getElementById("tabla_articulos").rows.length - 1;
    // $i = 1;
    for (var i = 0; i < num_filas; i++) {
      $("#tabla_articulos tbody tr")
        .eq(i)
        .find("td:first")
        .text(i + 1);
    }
  });
});


function busca_articulo_add() {
  $(document).ready(function () {
    var cod = $("#codigo").val().toString();
    var cmoneda = $("#lista_cmoneda option:selected").val();

    if (cod.trim() != "") {
      $(document).ready(function () {
        $.ajax({
          beforeSend: function () {
            $("#data_articulo").html("Buscando informacion del articulo...");
          },
          url: "busca_data_articulo_almacenint_otro.php",
          dataType: "json",
          type: "POST",
          data: {
            codigo: $("#codigo").val().toString(),
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

                precio = parseFloat(data[i].PRECIO).toFixed(2);

                // precio = parseFloat(data[i].precio).toFixed(4);
                // precio_igv = precio * 1.18;
                // precioigv_parse = parseFloat(precio_igv).toFixed(4);
                li = parseFloat(num - 1).toFixed(0);
                // $("#tabla_articulos > tbody").append("<tr><td class='center'>" + num + "</td>" +
                var htmlString =
                  "<tr><td class='center'>" +
                  num +
                  "</td>" +
                  "<td class='center' style=''>" +
                  data[i].NUMERO_ARTICULO +
                  "</td>";

                htmlString +=
                  "<td class='center' style='min-width: 200px;'>" + data[i].DESCRIPCION + "</td>";
                htmlString +=
                  "<td class='center'>" + data[i].CATALOGO + "</td>";
                htmlString +=
                  "<td class='center'>" + data[i].MARCA + "</td>";
                htmlString +=
                  "<td class='center'>" + data[i].unidad_medida + "</td>";

                //"<td class='center'>" + data[0].Catalogo + "</td>"+
                htmlString +=
                  "<td class='center'>" +
                  parseFloat(data[i].STOCK_NUEVO).toFixed(0) +
                  "</td>" +
                  "<td style='text-align:center ;max-width: 50px;'><input type='text'  class='form-control pull-right' id='cantidad_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item(this," +
                  li +
                  ")'  onchange='calcular_total_item(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +
                  "<td style='text-align:right;max-width: 50px;'><input type='text'  class='form-control pull-right' id='precio_uni'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" +
                  precio +
                  "' onchange='calcular_total_item(this," +
                  li +
                  ")' onkeyup='calcular_total_item(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +

                  "<td style='text-align:center;max-width: 50px;'><input type='text'  class='form-control pull-right' id='monto_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot(this," +
                  li +
                  ")'  onchange='calcular_monto_tot(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:center; max-width: 80px;'> <select class='form-control' onchange='' data-placeholder='Seleccione un Almacen' style='width: 100%;font-size:12px;' tabindex='-1' aria-hidden='true' id='almacen'><option value='' >ELIJA ALMA.</option>"
                  + "<option value='ALMV' SELECTED> LURIN 1ER PISO </option>"
                  + "<option value='ALMLUR2'> LURIN 2DO PISO </option>"
                  + "<option value='ALMLUR3'> LURIN 3ER  PISO </option>"
                  + "<option value='ALMCONC'>CONCHAN </option>"
                  // + "<option value='ALMCONL'> CONCHAN Y LURIN</option>"
                  // + "<option value='ALMLURI'>LIMA </option>"
                  // + "<option value='ALMLIMA'>LURIN </option>"
                  + "</select></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-sm delete rounded-circle'><i class='fa fa-trash'></i></button></td>";
                console.log(precio);
                $("#tabla_articulos > tbody").append(htmlString);
                $("#btn-procesa").prop("disabled", false);

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

function obtenerFila3(elemento) {
  var index = $(elemento).closest("tr").index();
  //console.log(index);
  return index;
}

// function calcular_total_item(input, linea) {
//   var fila = obtenerFila3(input);
//   console.log(fila);
//   precio = parseFloat(
//     $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[6]
//       .children[0].value
//   );
//   cantidad = parseFloat(
//     $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[5]
//       .children[0].value
//   );
//   // dsctoline = parseFloat(
//   //   $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[10]
//   //     .children[0].value
//   // );

//   var monto = parseFloat(
//     cantidad * precio
//   ).toFixed(4);
//   // var preciii = parseFloat(precio * 1.18 - (precio * 1.18 * dsctoline) / 100);
//   // $($("#tabla_articulos").find("tbody > tr")[fila]).children(
//   //   "td"
//   // )[13].children[0].value = monto;

//   // $($("#tabla_articulos").find("tbody > tr")[fila]).children(
//   //   "td"
//   // )[12].children[0].value = parseFloat(preciii).toFixed(4);

//   $($("#tabla_articulos").find("tbody > tr")[fila]).children(
//     "td"
//   )[7].children[0].value = parseFloat(monto * 1.18).toFixed(4);
//   resumen();
// }

function calcular_total_item(input, linea) {
  var fila = obtenerFila3(input);
  // console.log(fila);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[8]
      .children[0].value
  );

  // console.log(precio);

  cantidad = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[7]
      .children[0].value
  );
  // console.log(cantidad);

  // dsctoline = parseFloat(
  //   $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[10]
  //     .children[0].value
  // );

  var monto = parseFloat(
    cantidad * precio
  ).toFixed(4);
  // console.log(monto);
  //4

  // var preciii = parseFloat(precio * 1.18 - (precio * 1.18 * dsctoline) / 100);
  // $($("#tabla_articulos").find("tbody > tr")[fila]).children(
  //   "td"
  // )[13].children[0].value = monto;

  // $($("#tabla_articulos").find("tbody > tr")[fila]).children(
  //   "td"
  // )[12].children[0].value = parseFloat(preciii).toFixed(4);

  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[9].children[0].value = parseFloat(monto * 1.18).toFixed(4);
  resumen();
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


$(document).on("dblclick", "#tabla_cot tbody tr", function () {
  var $fila = $(this);

  var filaId = $fila.attr('id');

  console.log("Número de la fila seleccionada: " + filaId);

  // Obtener los datos de las celdas
  var doc = $fila.find("td:nth-child(1)").text();
  var sap = $fila.find("td:nth-child(5)").text();
  // var emp = $fila.find("td:nth-child(6)").text();
  var proveedor = $fila.find("td:nth-child(4)").text().trim();

  // var guia = $fila.find("td:nth-child(6)").text().trim();
  // var cliente = $fila.find("td:nth-child(9)").text();
  // var estado = $fila.find("td:nth-child(10)").text();
  // var idestado = $fila.find("td:nth-child(11)").text();

  console.log("doc:" + doc);
  console.log("pro:" + proveedor);
  console.log("sap:" + sap);


  setTimeout(() => {
      $("#modal_id_botones").modal("show");
      // $("#generar_rotulo").hide();
      // $("#btn_cierre_pedido").hide();
      // $("#btn_alista").hide();

  }, 500);
  $("#docito").val(doc);
  $("#NUM_SAP").val(sap);
  $("#Proveedor").val(proveedor);
  // busca_detalle(docito);
  // anular_operacion(docito);
  // $("#CLIENTE").val(cliente);
  // $("#ESTADO").val(estado);
  // $("#empresa").val(emp);
  // $("#idESTADO").val(idestado);

  //console.log(emp)
  //de cargar o/c
  // $("#docito_Modal").val(doc);
  // $("#docentry_Modal").val(doc);
  // $("#docentry_Modal_OC").val(doc);
  // $("#docito_Modal_oc").val(doc);

  // $("#docito_Modal_guia").val(doc);
  // $("#docentry_Modal").val(doc);




  setTimeout(() => {
      // consultar_boton();
      // consultar_boton2();
  }, 500);
});