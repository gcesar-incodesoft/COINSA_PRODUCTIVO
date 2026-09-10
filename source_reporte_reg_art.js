/***************************************************************************/
function pone_Grupo_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Grupo_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_Grupo_Articulos_entrada.php',
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
function lista_Marcas_Despacho() {

  $.ajax({
    beforeSend: function () {
      $("#lista_Marca").html("Recuperando Marcas...");
    },
    url: 'Lista_Marcas_articulo_entrada.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#lista_Marca").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });

}

function pone_Familia() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Familia").html("Recuperando articulos...");
      },
      url: 'pone_Familia_entrada.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Familia_entrada").html(x);
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
      url: 'pone_SubFamilia_entrada.php',
      type: 'POST',
      // data: null,
      data: 'fami=' + $("#pone_Familia_entrada option:selected").val(),
      success: function (x) {
        $("#pone_SubFamilia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function pone_SubFamilia2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_SubFamilia2").html("Recuperando articulos...");
      },
      url: 'pone_SubFamilia2_entrada.php',
      type: 'POST',
      data: 'subfami=' + $("#pone_SubFamilia option:selected").val(),
      // data: null,
      success: function (x) {
        $("#pone_SubFamilia2").html(x);
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

function lista_Almacenes_InternosOrden() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Almacen").html("Recuperando proveedores...");
      },
      url: 'Lista_Almacen_Despacho_STOCK.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Almacen").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
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
  // familia = $("#pone_Familia").val();
  // sub_familia = $("#pone_SubFamilia_stock").val();
  // marca = $("#marca_stock").val();

  fami = $("#pone_Familia_entrada option:selected").val();
  subfami = $("#pone_SubFamilia option:selected").val();
  subfami2 = $("#pone_SubFamilia2 option:selected").val();
  marca = $("#lista_Marca option:selected").val();
  almacen = $("#lista_Almacen option:selected").val();

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
    url: "consulta_lista_arti_stock.php",
    type: "POST",
    // data: {  familia: familia, sub_familia: sub_familia ,marca: marca},
    data: {
      marca: marca,
      fami: fami,
      subfami: subfami,
      subfami2: subfami2,
      almacen: almacen
    },

    success: function (x) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_cotizacion").html(x);
        $("#tabla_cot").DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              },
              // {
              //   extend: 'csv',
              //   text: '<i class="fa fa-file"></i> Exportar CSV',
              //   titleAttr: 'Exportar a CSV',
              //   className: 'btn btn-csv'
              // },
              // {
              //   extend: 'excel',
              //   text: '<i class="fa fa-file"></i> Exportar Excel',
              //   titleAttr: 'Exportar a Excel',
              //   className: 'btn btn-excel'
              // },
              {
                extend: 'pdf',
                text: '<i class="fa fa-file"></i> Exportar PDF',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-pdf',
                orientation: 'landscape',
                pageSize: 'A4',
              },
              {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                className: 'btn btn-print'
              }
            ],
          }
        );
      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) { },
  });
}



function exportar_excel_stock() {
  fami = $("#pone_Familia_entrada option:selected").val();
  subfami = $("#pone_SubFamilia option:selected").val();
  subfami2 = $("#pone_SubFamilia2 option:selected").val();
  marca = $("#lista_Marca option:selected").val();
  almacen = $("#lista_Almacen option:selected").val();

  javascript: window.open(
    "reporte_excel_stock_art.php?&fami=" +
    fami +
    "&subfami=" +
    subfami +
    "&subfami2=" +
    subfami2 +
    "&marca=" +
    marca +
    "&almacen=" +
    almacen +
    ""
  );
}



$(document).on("click", ".btn-copy", function () {
  Swal.fire({
    title: '¡Copiado!',
    text: 'Los datos se han copiado al portapapeles.',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500 // Se cierra automáticamente después de 1.5 segundos
  });
});






function busca_detalle(id) {
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
  let Comentario = $("#Comentario").val();
  let moneda = $("#lista_cmoneda option:selected").val();
  //FALTA FECHA 
  let fecha = $("#fechai").val();
  let Serie = $("#Serie").val(); // Obtener el valor
  let Nro_folio = $("#Nro_folio").val(); // Obtener el valor
  let bandera = true;
  let tipo_entrada = 'E';

  // Validación
  if (Codigo_Ruc === '') {
    bandera = false;
    alertify.error("Ingresar Codigo o Ruc");
  }


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
        tipo_entrada: tipo_entrada
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
            var unidad = $(this).find("td").eq(3).html();
            var stock = $(this).find("td").eq(4).html();

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
          $("#Serie").val("");
          $("#Nro_folio").val("");
          // $("#familia_articulo").val("");
          // $("#unid_Medida").val('');
          // $("#codigo_um_compras").val('');

          swal("Se registró correctamente", {
            icon: "success",
          });
        }
        // lista_datos_ma();
        lista_arti();
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
    url: "busca_data_articulo_almace.php",
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
  fechaf = $("#fechaf").val();

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
          url: "busca_data_articulo_almacenint.php",
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
                  "<td class='center'>" + data[i].DESCRIPCION + "</td>";
                htmlString +=
                  "<td class='center'>" + data[i].unidad_medida + "</td>";

                //"<td class='center'>" + data[0].Catalogo + "</td>"+
                htmlString +=
                  "<td class='center'>" +
                  parseFloat(data[i].STOCK).toFixed(0) +
                  "</td>" +
                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='cantidad_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_total_item(this," +
                  li +
                  ")'  onchange='calcular_total_item(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +
                  "<td style='text-align:right'><input type='text'  class='form-control pull-right' id='precio_uni'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onchange='calcular_total_item(this," +
                  li +
                  ")' onkeyup='calcular_total_item(this," +
                  li +
                  ")'onkeypress='return validar_numero(event)' ></td>" +

                  "<td style='text-align:center'><input type='text'  class='form-control pull-right' id='monto_item'  autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='calcular_monto_tot(this," +
                  li +
                  ")'  onchange='calcular_monto_tot(this," +
                  li +
                  ")' onkeypress='return validar_numero(event)'></td>" +
                  "<td style='text-align:center'><button class='btn  btn-danger btn-sm delete rounded-circle'><i class='fa fa-trash'></i></button></td>";
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

function calcular_total_item(input, linea) {
  var fila = obtenerFila3(input);
  console.log(fila);
  precio = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[6]
      .children[0].value
  );
  cantidad = parseFloat(
    $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[5]
      .children[0].value
  );
  // dsctoline = parseFloat(
  //   $($("#tabla_articulos").find("tbody > tr")[fila]).children("td")[10]
  //     .children[0].value
  // );

  var monto = parseFloat(
    cantidad * precio
  ).toFixed(4);
  // var preciii = parseFloat(precio * 1.18 - (precio * 1.18 * dsctoline) / 100);
  // $($("#tabla_articulos").find("tbody > tr")[fila]).children(
  //   "td"
  // )[13].children[0].value = monto;

  // $($("#tabla_articulos").find("tbody > tr")[fila]).children(
  //   "td"
  // )[12].children[0].value = parseFloat(preciii).toFixed(4);

  $($("#tabla_articulos").find("tbody > tr")[fila]).children(
    "td"
  )[7].children[0].value = parseFloat(monto * 1.18).toFixed(4);
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


