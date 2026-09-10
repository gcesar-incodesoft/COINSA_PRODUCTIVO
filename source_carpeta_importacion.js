function listaCarpeta() {
  $.ajax({
    beforeSend: function () {
      $("#nCarpeta").html("Recuperando Lista ...");
    },
    url: "listarNroCarpeta.php",
    type: "POST",
    data: "",
    success: function (x) {
      $("#nCarpeta").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {},
  });
}

function listaDatos2() {
  setTimeout(() => {
    $.ajax({
      beforeSend: function () {
        $("#lista_carpeta").html('<i class="fas fa-spinner fa-spin"></i> Cargando datos');
      },
      url: "listado_carpeta_importacion.php",
      type: "POST",
      data: "nCarpeta=" + $("#nCarpeta option:selected").val(),
      success: function (x) {
        $("#lista_carpeta").html(x);
        $("#tabla_carpeta").DataTable({
          order: [[0, "asc"]],
        });
      },
      error: function (jqXHR, estado, error) {},
    });
  }, 1000);
}

$(document).on("click", "#procesar", function () {
  cant = document.querySelectorAll("#procesar:checked").length / 2;
  //console.log('hola');
  if ($(this).is(":checked")) {
    if (cant > 0) {
      $("#btn-det").show();
    } else {
      $("#btn-det").hide();
    }
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (cant > 0) {
      $("#btn-det").show();
    } else {
      $("#btn-det").hide();
    }
  }
});

function procesar_datos() {
  $("#modal_modificar").modal("show"); // abri

  let materiales = [];
  $('#tabla_carpeta input[type="checkbox"]:checked').each(function (e) {
    if ($(this).prop("checked")) {
      materiales[e] = $(this).closest("tr").children("td:eq(1)").text();
    }
  });
  //console.log(materiales);
  cargar_consumo(materiales);

  numCarpeta = $("#nCarpeta option:selected").val();
  consultar_data_mercancia(numCarpeta);
  listarConcepto();
  insertarProveedor();
  $("#tablaCostosList tbody").empty();
}

function cargar_consumo(id) {
  $.ajax({
    beforeSend: function () {
      $("#data_consumo").html("Buscando informacion...");
    },
    url: "busca_data_salida_numero.php",
    type: "POST",
    data: null,
    success: function (z) {
      $("#numcito").html(z);
      //document.getElementById('codig_ver').innerText = z;
      //  console.log(z);
    },
    error: function (jqXHR, estado, error) {
      alert(
        "Ocurrio un error al consultar la informacion del articulo...reporte a soporte...!    " +
          estado +
          "    " +
          error
      );
    },
  });

  tamano = parseInt(id.length * 2);
  let id2 = [];
  if (id != "") {
    $(document).ready(function () {
      $id2 = id[0];
      $.post(
        "busca_data_consumo.php",
        {
          codigo: id,
        },
        function (data1) {
          $("#data_consumo").html(data1);
          $(".select2").select2();
        }
      );
      $.ajax({
        beforeSend: function () {
          $("#tabla_consumo_det").html("Consultando informacion...");
        },
        url: "detalle_CarpetaDet.php",
        type: "POST",
        data: "codigo=" + id + "&tamano=" + tamano,
        success: function (data1) {
          $("#tabla_consumo_det").html(data1);
          $(".select2").select2();
        },
        error: function (jqXHR, estado, error) {
          $("#tabla_consumo_det").html(estado + "    " + error);
        },
      });
    });
  } else {
  }
}

$(document).on("click", "#salida_2", function () {
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    document.getElementById("regist_sal").disabled = false;
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    document.getElementById("regist_sal").disabled = true;
  }
});

$(document).on("input", "#ingresarCant", function () {
  var valor = $(this).val();

  if (valor.length > 0) {
    if ($(this).is('input[type="number"]')) {
      $(this).parents("tr").find("td").css("background-color", "LightGreen");
      document.getElementById("regist_sal").disabled = false;
      $(this)
        .parents("tr")
        .find('td:eq(0) input[type="checkbox"]')
        .prop("checked", true);
    } else {
      $(this).parents("tr").find("td").css("background-color", "white");
      document.getElementById("regist_sal").disabled = true;
    }
  } else {
    $(this).closest("tr").find("td").css("background-color", "");
    document.getElementById("regist_sal").disabled = true;
    $(this)
      .parents("tr")
      .find('td:eq(0) input[type="checkbox"]')
      .prop("checked", false);
  }
});

function consultar_data_mercancia(numCarpeta) {
  $.ajax({
    url: "detalle_CarpetaCab.php",

    type: "POST",
    data: {
      numCarpeta: numCarpeta,
    },
    success: function (x) {
      //console.log(x);
      var data = x;
      var idcl = data.split("|");
      //linea_credito =idcl[4];

      // $("#docentry").val(docentry);
      //$("#nroDua").val(idcl[0]);
      $("#nroCarpetaImpo").val(idcl[0]);
      $("#data_moneda").val(idcl[1]);
      $("#serie_folio").val(idcl[2]);
      $("#numero_folio").val(idcl[3]);
      //$("#comentarios").val(idcl[5]);

      //consultar_data_cot_det(docentry);
    },
    error: function (jqXHR, estado, error) {},
  });
}

function listarConcepto() {
  $.ajax({
    beforeSend: function () {
      $("#conceptoCostos").html("Recuperando Lista ...");
    },
    url: "listarConceptoCostos.php",
    type: "POST",
    data: "",
    success: function (x) {
      $("#conceptoCostos").html(x);
      $(".select2").select2();
      resumen();
    },
    error: function (jqXHR, estado, error) {},
  });
}

//$("#conceptoCostos option:selected").val();

function ultimo_valor_fila() {
  //let tableBody = document.getElementById('tabla_articulos_mod');
  let line = [];
  $("#tablaCostosList > tbody > tr").each(function () {
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

function insertarCostos() {
  $("#modal_modificar").modal("hide");
  $("#modald").modal("show");
  $("#importeCIGV").val(0);
}

function registroCostos() {
  $("#modald").modal("hide");
  $("#modal_modificar").modal("show");

  $(document).ready(function () {
    bandera = true;

    var conceptoCostos = $("#conceptoCostos option:selected").text().trim();
    var importeTotal = $("#importeTotal").val();
    var codConcepto = $("#conceptoCostos option:selected").val();
    var importe = $("#importe").val();
    var igvs = $("#igvs option:selected").text().trim();
    var importeCIGV = $("#importeCIGV").val();

    //var igv = $("#conceptoCostos option:selected").val();

    fil = ultimo_valor_fila();
    if (fil === 0) {
      $("#tablaCostosList > tbody > tr > td").remove();
    }
    var num = ultimo_valor_fila() + 1;
    //var tipovta = "V";

    if (conceptoCostos === "Seleccione") {
      bandera = false;
      var n = noty({
        text: "Campo vacio...!",
        theme: "relax",
        layout: "center",
        type: "error",
        timeout: 2000,
      });
    }
    if (igvs === "Opciones") {
      bandera = false;
      var n = noty({
        text: "Campo vacio...!",
        theme: "relax",
        layout: "center",
        type: "error",
        timeout: 2000,
      });
    }
    if (importe === "") {
      bandera = false;
      var n = noty({
        text: "Importe vacio...!",
        theme: "relax",
        layout: "center",
        type: "error",
        timeout: 2000,
      });
    }

    if (bandera === true) {
      $("#tablaCostosList > tbody").append(
        "<tr><td class='center'>" +
          num +
          "</td><td class='center'>" +
          codConcepto +
          "</td><td class='center'>" +
          conceptoCostos +
          "</td><td class='center'>" +
          igvs +
          "</td><td class='center'>" +
          parseFloat(importe).toFixed(2) +
          "</td><td class='center'>" +
          parseFloat(importeCIGV).toFixed(2) +
          "</td><td class='center'>" +
          parseFloat(importeTotal).toFixed(2) +
          "</td><td class='center'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button></td></tr>"
      );
      $("#conceptoCostos").val("Seleccione");
      $("#importeTotal").val("");
      $("#importeCIGV").val("");
      $("#importe").val("");
    }
    resumen();
    resumenGastos();
    lisCost();
  });
}

$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", ".delete", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();
    //resumen();
    num_filas = document.getElementById("tablaCostosList").rows.length - 1;
    resumen();
    resumenGastos();
    lisCost();
  });
});

$(document).on("keyup", "#importe", function () {
  var valor = $(this).val();
  var seleccionar = $("#igvs option:selected").val();
  var importe = valor;
  var importeTotal2 = 0.0;
  var importeigv = 0.0;

  if (seleccionar == -1) {
    alertify.error("Eligir Tipo Igv");
  } else {
    if (seleccionar === "1") {
      importeTotal2 = $("#importeTotal").val(importe);
    }
    if (seleccionar === "2") {
      importeigv = parseFloat(importe * 0.18).toFixed(2);
      importeTotal2 = parseFloat(importe) + parseFloat(importeigv);
      $("#importeTotal").val(importeTotal2);
      $("#importeCIGV").val(importeigv);
    }
  }
});

function insertarProveedor() {
  //$("#modal_insertar").modal("show");
  let materiales = [];
  let materiales2 = [];
  nCarpeta = $("#nCarpeta option:selected").val();
  $('#tabla_carpeta input[type="checkbox"]:checked').each(function (e) {
    if ($(this).prop("checked")) {
      materiales2[e] = $(this).closest("tr").children("td:eq(1)").text();
    }
  });

  materiales_2 = materiales2.toString();
  //console.log(materiales2);
  traerDatos(materiales_2);
}

function traerDatos(docentry) {
  if (docentry != "") {
    $.ajax({
      beforeSend: function () {},
      url: "insertarProveedores_Costo.php",
      type: "POST",
      data: "docentry=" + docentry,
      success: function (x) {
        $("#tablaProveedores_Costos").html(x);
        $("#tablaProveC").DataTable();
      },
      error: function (jqXHR, estado, error) {
        $("#tablaProveedores_Costos").html(
          "Hubo un error: " + estado + " " + error
        );
      },
    });
  } else {
  }
}

//costos y proveedor
function registrar_datos2(global) {
  bandera = true;

  if (bandera === true) {
    $("#tablaCostosList > tbody > tr").each(function () {
      var baseentry = $(this).find("td").eq(0).html();
      var codConcepto = $(this).find("td").eq(1).html();
      var concepto = $(this).find("td").eq(2).html();
      var tipoigv = $(this).find("td").eq(3).html();
      var importe = $(this).find("td").eq(4).html();
      var importecigv = $(this).find("td").eq(5).html();
      var importetotal = $(this).find("td").eq(6).html();

      $.ajax({
        url: "registrar_ci_costo.php",
        type: "POST",
        data:
          "&baseentry=" +
          baseentry +
          "&codConcepto=" +
          codConcepto +
          "&concepto=" +
          concepto +
          "&tipoigv=" +
          tipoigv +
          "&importe=" +
          importe +
          "&importecigv=" +
          importecigv +
          "&importetotal=" +
          importetotal +
          "&docentry=" +
          global,
        success: function (x) {
          //console.log(x);
          //alertify.success('Se registro correctamente');
        },
        error: function (jqXHR, estado, error) {},
      });
    });
  }

  $("#tablaProveC > tbody > tr").each(function () {
    var baseentry = $(this).find("td").eq(0).html();
    var codproveedor = $(this).find("td").eq(1).html();
    var proveedor = $(this).find("td").eq(2).html();

    $.ajax({
      beforeSend: function () {},
      url: "registrar_ci_proveedor.php",
      type: "POST",
      data:
        "&baseentry=" +
        baseentry +
        "&codproveedor=" +
        codproveedor +
        "&proveedor=" +
        proveedor +
        "&docentry=" +
        global,

      success: function (data) {
        //alertify.success("Se registro correctamente");
        // $("#modal_procesarProgramacion").modal("hide"); //cerrar modal
        // bloquearCheckboxesSeleccionados();
        $("#tablaCostosList tbody").empty();
        $("#tablaProveC tbody").empty();
        $("#comentarios").val("");
        $("#nroDua").val("");
        // resumen();
        $($("#tabla_carpeta").find("tbody > tr"))
          .children("td")
          .children()
          .children()
          .prop("checked", false);
        $($("#tabla_carpeta").find("tbody > tr"))
          .children("td")
          .css("background-color", "white");
        // $('#btn-det').hide();
        // $('#btn-pro').hide();
      },

      error: function (jqXHR, estado, error) {},
    });
  });
}

function registrar_datos() {
  fecha_cont_salida = $("#fecha_cont_salida").val();
  fecha_ven_salida = $("#fecha_ven_salida").val();
  nroDua = $("#nroDua").val();
  nroCarpetaImpo = $("#nroCarpetaImpo").val();
  data_moneda = $("#data_moneda").val();
  serie_folio = $("#serie_folio").val();
  numero_folio = $("#numero_folio").val();
  seguro = $("#seguro").val();
  percepcion = $("#percepcion").val();
  bandera = true;
  bandera2 = true;
  //det = document.querySelectorAll("#salida_2:checked").length;
  if (nroDua === "") {
    bandera = false;
    alertify.error("Ingrese NroDua");
  }
  if (seguro === "") {
    bandera = false;
    alertify.error("Ingrese seguro");
  }
  if (percepcion === "") {
    bandera = false;
    alertify.error("Ingrese percepcion");
  }

  if (bandera === true) {
    $("[name='salida_mer[]']:checked").each(function (key) {
      var baseentry = $(this).parents("tr").find("td:eq(1)").text();
      var itemcode = $(this).parents("tr").find("td:eq(2)").text();
      var descripcion = $(this).parents("tr").find("td:eq(3)").text();
      var quantity = $(this).parents("tr").find("td:eq(4)").text();
      var preciofob = $(this).parents("tr").find("td:eq(5)").text();
      var totalfob = $(this).parents("tr").find("td:eq(6)").text();

      let data_array = [];
      var variable = $(this).parents("tr").find("td:eq(7) select").val();
      for (let i = 0; i < variable.length; i++) {
        data1 = variable[i].split(",");
        data_array.push(data1[0]);
      }
      var listadeCostos = data_array.toString();
      //var listadeCostos = $(this).parents("tr").find('td:eq(7)').text();

      var gastosunited = $(this).parents("tr").find("td:eq(8)").text();
      var totalcgastos = $(this).parents("tr").find("td:eq(9)").text();
      var ingresarcantidad = $(this)
        .parents("tr")
        .find('input[id="ingresarCant"]')
        .val(); //ADUANA
      var ingresarcantidad2 = parseFloat(ingresarcantidad);
      var total = $(this).parents("tr").find("td:eq(11)").text();
      var comentarios = $("#comentarios").val();

      if (0 > ingresarcantidad2) {
        bandera2 = false;
        alertify.error("Cantidad no valida");
        $(this)
          .parents("tr")
          .find("td:eq(10)")
          .css("background-color", "#F67280");
      }
      if (ingresarcantidad === "") {
        bandera2 = false;
        alertify.error("Falta llenar la cantidad");
        $(this)
          .parents("tr")
          .find("td:eq(10)")
          .css("background-color", "#F67280");
      }
      if (ingresarcantidad2 > 100) {
        bandera2 = false;
        alertify.error(
          itemcode + " | " + "No puedes ingresar una cantidad superior a 100"
        );
      }
    });

    if (bandera2 === true) {
      $.ajax({
        url: "inserta_datos_cpCab.php",
        type: "POST",
        data: {
          fecha_cont_salida: fecha_cont_salida,
          fecha_ven_salida: fecha_ven_salida,
          nroDua: nroDua,
          nroCarpetaImpo: nroCarpetaImpo,
          data_moneda: data_moneda,
          serie_folio: serie_folio,
          numero_folio: numero_folio,
          seguro: seguro,
          percepcion: percepcion,
        },
        success: function (x) {
          //console.log(x);
          //alertify.success('Se registro correctamente');
          global = parseInt(x);
          //console.log(global);
          registrar_datos2(global);
          //aqui comienza el deta
          if (global == 0) {
            alertify.error("No inserto");
          } else {
            $("[name='salida_mer[]']:checked").each(function (key) {
              var baseentry = $(this).parents("tr").find("td:eq(1)").text();
              var itemcode = $(this).parents("tr").find("td:eq(2)").text();
              var descripcion = $(this).parents("tr").find("td:eq(3)").text();
              var quantity = $(this).parents("tr").find("td:eq(4)").text();
              var preciofob = $(this).parents("tr").find("td:eq(5)").text();
              var totalfob = $(this).parents("tr").find("td:eq(6)").text();

              let data_array = [];
              var variable = $(this)
                .parents("tr")
                .find("td:eq(7) select")
                .val();
              for (let i = 0; i < variable.length; i++) {
                data1 = variable[i].split(",");
                data_array.push(data1[0]);
              }
              var listadeCostos = data_array.toString();

              var gastosunited = $(this).parents("tr").find("td:eq(8)").text();
              var totalcgastos = $(this).parents("tr").find("td:eq(9)").text();
              var ingresarcantidad = $(this)
                .parents("tr")
                .find('input[id="ingresarCant"]')
                .val(); //ADUANA
              var ingresarcantidad2 = parseFloat(ingresarcantidad);
              var total = $(this).parents("tr").find("td:eq(11)").text();
              var comentarios = $("#comentarios").val();

              $.ajax({
                beforeSend: function () {},
                url: "inserta_datos_cpDet.php",
                type: "POST",
                data:
                  "&baseentry=" +
                  baseentry +
                  "&itemcode=" +
                  itemcode +
                  "&descripcion=" +
                  descripcion +
                  "&quantity=" +
                  quantity +
                  "&preciofob=" +
                  preciofob +
                  "&totalfob=" +
                  totalfob +
                  "&listadeCostos=" +
                  listadeCostos +
                  "&gastosunited=" +
                  gastosunited +
                  "&totalcgastos=" +
                  totalcgastos +
                  "&ingresarcantidad=" +
                  ingresarcantidad2 +
                  "&total=" +
                  total +
                  "&comentarios=" +
                  comentarios +
                  "&docentry=" +
                  global,
                success: function (data) {
                  //registrar_datos2();
                  $("#modal_modificar").modal("hide"); //cerrar modal
                  //alertify.success('Se registro correctamente');
                  Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: 'Se registro Carpeta correctamente.',
                    showConfirmButton: false, // Oculta el botón "Aceptar"
                    timer: 2000
                  }).then(function () {
                    // Actualizar la página
                    // location.reload();
                  });
                },

                error: function (jqXHR, estado, error) {},
              });
            });
          }
        },
        error: function (jqXHR, estado, error) {},
      });
    }
  }
}

function resumen() {
  $(document).ready(function () {
    var totalI = 0.0;
    var data_moneda = $("#data_moneda").val();

    $("#tablaCostosList > tbody > tr").each(function () {
      totalI += parseFloat($(this).find("td").eq(6).html());
    });
    //console.log(totalI);

    $("#totales").html(
      "TOTAL IMPORTE: " + data_moneda + " " + totalI.toFixed(2)
    );
  });
}
function prueba_suma_array(linea) {
  let data2 = [];
  let data3 = 0;
  var rowIndex = linea; // Especifica el índice de la fila que deseas obtener
  var selectedValues = [];

  // Obtener el elemento <select> de la fila especificada
  var selectElement = $(
    "#tabla_consumo_det tbody > tr:eq(" + rowIndex + ") select"
  )[0];

  // Iterar sobre las opciones seleccionadas en el elemento <select>
  $(selectElement)
    .find("option:selected")
    .each(function () {
      selectedValues.push($(this).val());
    });

  for (let i = 0; i < selectedValues.length; i++) {
    data2.push(selectedValues[i].split(","));
  }
  for (let i = 0; i < data2.length; i++) {
    data3 += parseFloat(data2[i][1]);
  }
  $($("#tabla_consumo_det").find("tbody > tr")[linea]).children(
    "td"
  )[9].innerHTML =data3
}
function lisCost() {
  // let codigo_concepto = [];
  // var valueToPush = {}
  // $('#tablaCostosList > tbody > tr').each(function () {

  //     cost = $(this).find('td').eq(2).html()
  //     cod = $(this).find('td').eq(1).html()
  //     impoT = $(this).find('td').eq(6).html()

  //     valueToPush["costoID"] = cod;
  //     valueToPush["costoNom"] = cost;
  //     valueToPush["costoImp"] = impoT;
  //     codigo_concepto.push(valueToPush);
  //     //codigo_concepto.push(cost, cod, impoT)

  // });

  // //$('#ponCost').empty();
  // $('[id^=ponCost]').empty();

  // for (let i = 0; i < codigo_concepto.length; i++) {
  //     $value = codigo_concepto[i]["costoID"] + ',' + codigo_concepto[i]["costoImp"];

  //     //$('#ponCost').append($('<option>', {
  //     $('[id^=ponCost]').append($('<option>', {

  //         value: $value,
  //         text: codigo_concepto[i]["costoNom"]
  //     }));

  // }

  let codigo_concepto = [];

  // Recolectar datos de la tabla
  $("#tablaCostosList > tbody > tr").each(function () {
    let cost = $(this).find("td").eq(2).html();
    let cod = $(this).find("td").eq(1).html();
    let impoT = $(this).find("td").eq(6).html();

    let valueToPush = {
      costoID: cod,
      costoNom: cost,
      costoImp: impoT,
    };

    codigo_concepto.push(valueToPush);
  });

  //   let array2 =[]
  //   $("#tabla_consumo_det tr").each (function() {
  //     array2.push($(this).find("td:eq(7) select option:selected").val());
  //   });

  $("[id^=ponCost]").empty();

  for (let i = 0; i < codigo_concepto.length; i++) {
    let $value =
      codigo_concepto[i]["costoID"] +
      "," +
      codigo_concepto[i]["costoImp"] +
      "," +
      codigo_concepto[i]["costoNom"];

    $("[id^=ponCost]").append(
      $("<option>", {
        value: $value,
        text: codigo_concepto[i]["costoNom"],
      })
    );
  }

  //console.log(codigo_concepto);
  //console.log(guardarDatos);
  //console.log(valor);
}

// $(document).on("change", "[id^=ponCost]", function () {
//     var id = this.value.split(",");
//     var selectedRow = $(this).closest('tr'); // Obtener la fila más cercana
//     selectedRow.find('#totalgastos').html(id[1]); // Actualizar el campo en esa fila
// });

// $(document).on("change", "[id^=ponCost]", function () {
//     var id = this.value.split(",");
//     var selectedRow = $(this).closest('tr');

//     if (this.value) {

//         selectedRow.find('#totalgastos').html(id[1]);
//     } else {

//         selectedRow.find('#totalgastos').html('');
//     }
// });



// $($("#tabla_salida_det").find("tbody > tr")[0]).children(
//     "td"
// )[2].innerHTML = 'bbcita'

function resumenGastos() {
  $(document).ready(function () {
    var totalI = 0.0;
    var totalDetalle = 0.0;
    var valorDeFilas = 0.0;
    var cantidad = 0.0;
    var costoU = 0.0;
    var totalReal = 0.0;
    var totalDeVerdad = 0.0;

    $("#tabla_salida_det > tbody > tr").each(function () {
      totalDetalle += parseFloat($(this).find("td").eq(6).html());
    });

    $("#tablaCostosList > tbody > tr").each(function () {
      totalI += parseFloat($(this).find("td").eq(6).html());
    });

    $("#tabla_salida_det > tbody > tr").each(function () {
      valorDeFilas = $(this).find("td").eq(6).html();

      totalDeVerdad = parseFloat(
        (valorDeFilas / totalDetalle) * totalI
      ).toFixed(2);
      //$(this).find('td').eq(9).html(totalDeVerdad)

      cantidad = $(this).find("td").eq(4).html();
      costoU = parseFloat(totalDeVerdad / cantidad).toFixed(4);
      $(this).find("td").eq(8).html(costoU);

      totalReal = parseFloat(
        (parseFloat(totalDeVerdad) + parseFloat(valorDeFilas)).toFixed(2)
      );
      $(this).find("td").eq(11).html(totalReal);
      //console.log(totalReal);
    });
  });
}
