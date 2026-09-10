function lista_users() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_users").html("Recuperando Estructura...");
      },
      url: "buscar_usuarios_form.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_users").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function lista_users2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_users2").html("Recuperando Estructura...");
      },
      url: "buscar_usuarios_form2.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_users2").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function lista_cod_inventario() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_codigo_inventario").html("Recuperando Códigos...");
      },
      url: "lista_codigo_inventario.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_codigo_inventario").html(x);
        $(".select2").select2();

        $("#codigo_inventario").on("change", function () {
          const cod = $(this).val();
          if (cod !== "0") {
            obtenerDatosInventario(cod);
          }
        });
      },
      error: function (jqXHR, estado, error) {
        console.log("Error cargando códigos:", error);
      },
    });
  });
}

function obtenerDatosInventario(codigo) {
  $.ajax({
    url: "trae_datos_inventario.php",
    type: "POST",
    data: { codigo_inventario: codigo },
    dataType: "json",
    beforeSend: function () {
      console.log("Buscando datos para código:", codigo);
    },
    success: function (res) {
      console.log("Respuesta:", res);

      if (res.error) {
        alert(res.error);
        return;
      }

      const planta = res.PLANTA?.trim() || "";
      const marca = res.MARCA?.trim() || "";
      const tipo_equipo = res.TIPO_EQUIPO?.trim() || "";
      const usuario = res.USUARIO?.trim() || "";

      if ($("#id_planta option[value='" + planta + "']").length > 0) {
        $("#id_planta").val(planta).trigger("change");
      } else {
        $("#id_planta option").filter(function () {
          return $(this).text().trim().toUpperCase() === planta.toUpperCase();
        }).prop("selected", true).trigger("change");
      }

      $("#marca").val(marca);
      $("#tipo_equipo").val(tipo_equipo);
      $("#usuario").val(usuario);
      const textoPlanta = $("#id_planta option:selected").text();
      $("#ubicacion").val(textoPlanta);
      $("#departamento").val("LIMA");
    },
    error: function (xhr, status, error) {
      console.log("Error en obtenerDatosInventario:", error);
    },
  });
}



function num_cod() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_num_form").html("Recuperando formularios...");
      },
      url: "busca_num_form.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#num_form").html(x);
        //console.log(x);
        // console.log(document.getElementById("seriessxd").innerText);
        //var  serie = document.getElementById("num_fichaxd").innerText;
        //ficha_especificacion(serie);
        //pone_lista_recuento();
        //console.log(serie);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

$(document).ready(function () {
  $.ajax({
    url: 'busca_num_form2.php',
    type: 'POST',
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        $('#num_form2').val(response.codigo);
      } else {
        console.error('Error al generar el código');
      }
    },
    error: function (xhr, status, error) {
      console.error('Error en la petición AJAX:', error);
    }
  });
});

// function num_cod2() {
//   $(document).ready(function () {
//     $.ajax({
//       beforeSend: function () {
//         $("#pone_num_form").html("Recuperando formularios...");
//       },
//       url: "busca_num_form2.php",
//       type: "POST",
//       data: null,
//       success: function (x) {
//         $("#num_form2").html(x);
//         $("#num_form2").val(x);
//       },
//       error: function (jqXHR, estado, error) { },
//     });
//   });
// }

function pone_lista_formulario1() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_formularios").html("Recuperando proveedores...");
      },
      url: "consulta_formulario.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_formularios").html(x);
        $("#tabla_fichas").DataTable({
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
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function pone_lista_formulario2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_formularios").html("Recuperando proveedores...");
      },
      url: "consulta_formulario2.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_formularios").html(x);
        $("#tabla_fichas2").DataTable();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function reportes_form01(id, value) {
  var num_form_lista = id;
  var tipo_lista = value;
  $global_num = num_form_lista;
  $global_ser = tipo_lista;
  console.log(tipo_lista);
  console.log(num_form_lista);

  javascript: window.open("reporte_form01.php?id=" + id + "");
}

function reportes_form02(id, value) {
  var num_form_lista = id;
  var tipo_lista = value;
  $global_num = num_form_lista;
  $global_ser = tipo_lista;
  console.log(tipo_lista);
  console.log(num_form_lista);

  javascript: window.open("reporte_form02.php?id=" + id + "");
  /* $(document).ready(function() {
        $('#modalForm01').modal('show');


        $("#btnReporteTotal").on('click', function() {
            
            $('.modalForm01').on('shown.bs.modal',function(){      
                $(this).find('iframe').attr('src','reporte_form01.php?num_form='+$global_num+'&tipo='+$global_ser)
            })
            $("#navegador2").on('click', function() {
                javascript:window.open('reporte_form01.php?num_form='+$global_num+'&tipo='+$global_ser);
                //window.location.href = 'reporte_form01.php?num_form='+$global_num+'&tipo='+$global_ser
            })
            $("#imprimir2").on('click', function() {
                 $('#imprimir2')[0].contentWindow.print(); 
                //window.print();
               
            })
           // window.location.href = 'reporte_ficha.php?num_ficha='+$global_num
         });
         
    });  */
}

/****************************************************************************/
function reporte_EC_Cliente() {
  var checkboxState = $("#cbox1").is(":checked") ? "1" : "0";
  var tipo = checkboxState;

  $(document).ready(function () {
    idcliente = $("#cliente").val();
    card_name = $("#cliente option:selected").text();
    idvendedor = $("#vendedor").val();

    // javascript: window.open(
    //   "reporte_EC_Cliente.php?idcliente=" +
    //     idcliente +
    //     "&tipo=" +
    //     checkboxState +
    //     "&idvendedor=" +
    //     idvendedor +
    //     "&card_name=" +
    //     card_name
    // );

    var ruta =
      "reporte_EC_Cliente.php?idcliente=" +
      idcliente +
      "&tipo=" +
      checkboxState +
      "&idvendedor=" +
      idvendedor +
      "&card_name=" +
      card_name;

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
  });
}

function reporte_EC_Proveedor() {
  $(document).ready(function () {
    card_code = $("#cliente").val();
    card_name = $("#cliente option:selected").text();
    if (card_code == "") {
      alertify.error("Seleccione un Proveedor");
    } else {
      var ruta =
        "reporte_EC_Proveedor.php?card_code=" +
        card_code +
        "&card_name=" +
        card_name;

      $("#modal_data_pdf").modal("show");
      $("#modal_data_pdf")
        .on("shown.bs.modal", function () {
          $(this).find("iframe").attr("src", ruta);
        })
        .on("hidden.bs.modal", function () {
          $(this).find("iframe").attr("src", "");
        });

      $("#navegador")
        .off("click")
        .on("click", function () {
          window.open(ruta, "_blank");
        });

      $("#imprimir")
        .off("click")
        .on("click", function () {
          $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
        });
    }
  });
}

/*****************/

function reporte_EC_Cliente_excel() {
  var cliente = $("#cliente option:selected").val();
  var vendedor = $("#vendedor option:selected").val();
  var checkboxState = $("#cbox1").is(":checked") ? '1' : '0';
  var tipo = checkboxState;

  javascript: window.open("reporte_EC_Cliente_excel.php?cliente=" + cliente + "&vendedor=" + vendedor + "&tipo=" + tipo);
}


function reporte_EC_Cliente_excel_General() {
  var checkboxState = $("#cbox1").is(":checked") ? '1' : '0';
  var tipo = checkboxState;
  var cliente = $("#cliente").val();
  var vendedor = $("#vendedor").val();

  if (!checkboxState) {
    javascript: window.open("reporte_EC_Cliente_Excel_General.php?id_cliente=" + cliente + "&tipo=" + tipo + "&id_vendedor=" + vendedor);
  } else {
    javascript: window.open("reporte_EC_Cliente_Excel_General.php?id_cliente=" + cliente + "&tipo=" + tipo + "&id_vendedor=" + vendedor);
  }
}


function reporte_EC_Proveedor_excel() {
  javascript: window.open("reporte_EC_Proveedor_excel.php");
}

function reg_form1() {
  $("#modal_registrar").modal("show");
  lista_cod_inventario();
}


function registrar_datos() {
  $("#mensaje_cargando").show();

  planta = $("#id_planta option:selected").text().trim();
  marca = $("#marca").val();
  ci = $("#codigo_inventario").val();
  ubicacion = $("#ubicacion").val();
  departamento = $("#departamento").val();
  modelo = $("#tipo_equipo").val();
  fecha = $("#fecha_f").val();
  num_form = $("#num_form2").val();
  usuario = $("#usuario").val();
  tecnico = $("#tecnico").val();

  $.post(
    "registrar_form02_cab.php",
    {
      planta: planta,
      marca: marca,
      ci: ci,
      ubicacion: ubicacion,
      usuario: usuario,
      departamento: departamento,
      fecha: fecha,
      num_form: num_form,
      modelo: modelo,
      tecnico: tecnico
    },
    function (data) {
    }
  );

  item = "1";
  actividad = $(".titulo_01_02").text().trim();
  valor = "";
  estado = $("#estado_01_02 option:selected").text().trim();
  observacion = $("#observacion_01_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "2";
  actividad = $(".titulo_02_02").text().trim();
  valor = "";
  estado = $("#estado_02_02 option:selected").text().trim();
  observacion = $("#observacion_02_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "3";
  actividad = $(".titulo_03_02").text().trim();
  valor = "";
  estado = $("#estado_03_02 option:selected").text().trim();
  observacion = $("#observacion_03_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "4";
  actividad = $(".titulo_04_02").text().trim();
  valor = "";
  estado = $("#estado_04_02 option:selected").text().trim();
  observacion = $("#observacion_04_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "5";
  actividad = $(".titulo_05_02").text().trim();
  valor = "";
  estado = $("#estado_05_02 option:selected").text().trim();
  observacion = $("#observacion_05_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "6";
  actividad = $(".titulo_06_02").text().trim();
  valor = "";
  estado = $("#estado_06_02 option:selected").text().trim();
  observacion = $("#observacion_06_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "7";
  actividad = $(".titulo_07_02").text().trim();
  valor = "";
  estado = $("#estado_07_02 option:selected").text().trim();
  observacion = $("#observacion_07_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "8";
  actividad = $(".titulo_08_02").text().trim();
  valor = "";
  estado = $("#estado_08_02 option:selected").text().trim();
  observacion = $("#observacion_08_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "9";
  actividad = $(".titulo_09_02").text().trim();
  valor = "";
  estado = $("#estado_09_02 option:selected").text().trim();
  observacion = $("#observacion_09_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "10";
  actividad = $(".titulo_10_02").text().trim();
  valor = "";
  estado = $("#estado_10_02 option:selected").text().trim();
  observacion = $("#observacion_10_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "11";
  actividad = $(".titulo_11_02").text().trim();
  valor = "";
  estado = $("#estado_11_02 option:selected").text().trim();
  observacion = $("#observacion_11_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "12";
  actividad = $(".titulo_12_02").text().trim();
  valor = "";
  estado = $("#estado_12_02 option:selected").text().trim();
  observacion = $("#observacion_12_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "13";
  actividad = $(".titulo_13_02").text().trim();
  valor = "";
  estado = $("#estado_13_02 option:selected").text().trim();
  observacion = $("#observacion_13_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "14";
  actividad = $(".titulo_14_02").text().trim();
  valor = "";
  estado = $("#estado_14_02 option:selected").text().trim();
  observacion = $("#observacion_14_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  item = "15";
  actividad = $(".titulo_15_02").text().trim();
  valor = "";
  estado = $("#estado_15_02 option:selected").text().trim();
  observacion = $("#observacion_15_02").val();
  num_form = $("#num_form2").val();
  tipo_form = "02";
  unidad_medida = "";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );

  $("#mensaje_cargando").hide();

  // Mostrar mensaje de confirmación
  alert("Registro completado correctamente.");
  $("#modal_registrar").modal("show");
  pone_lista_formulario1();
}

// function registrar_datos() {
//   // Mostrar "Cargando"
//   $("#mensaje_cargando").show();

//   planta = $("#id_planta option:selected").text().trim();
//   marca = $("#marca").val();
//   ci = $("#codigo_inventario").val();
//   ubicacion = $("#ubicacion").val();
//   departamento = $("#departamento").val();
//   modelo = $("#tipo_equipo").val();
//   fecha = $("#fecha_f").val();
//   num_form = $("#num_form2").val();
//   usuario = $("#usuario").val();

//   // Primera llamada
//   let promesas = [];
//   promesas.push(
//     $.post(
//       "registrar_form02_cab.php",
//       {
//         planta: planta,
//         marca: marca,
//         ci: ci,
//         ubicacion: ubicacion,
//         usuario: usuario,
//         departamento: departamento,
//         fecha: fecha,
//         num_form: num_form,
//         modelo: modelo,
//       }
//     )
//   );

//   // Arreglo para enviar todos los detalles con loop
//   for (let i = 1; i <= 15; i++) {
//     let actividad = $(".titulo_0" + (i < 10 ? "0" + i : i) + "_02").text().trim();
//     let estado = $("#estado_0" + (i < 10 ? "0" + i : i) + "_02 option:selected").text().trim();
//     let observacion = $("#observacion_0" + (i < 10 ? "0" + i : i) + "_02").val();

//     promesas.push(
//       $.post(
//         "registrar_form_det.php",
//         {
//           actividad: actividad,
//           valor: "",
//           observacion: observacion,
//           num_form: num_form,
//           tipo_form: "02",
//           item: i.toString(),
//           unidad_medida: "",
//           estado: estado,
//         }
//       )
//     );
//   }

//   // Esperar a que todas terminen
//   $.when.apply($, promesas).done(function () {
//     // Ocultar "Cargando"
//     $("#mensaje_cargando").hide();

//     // Mostrar mensaje de confirmación
//     alert("Registro completado correctamente.");

//     // Cerrar modal
//     $("#modal_registrar").modal("hide");

//     // Actualizar lista
//     pone_lista_formulario1();
//   });
// }

function reg_form2() {
  $("#modal_registrar2").modal("show");
}


function registrar_datos2() {
  planta = $("#id_planta_01 option:selected").text().trim();
  host_name = document.getElementById("host_name_01").value;
  ip_host = document.getElementById("ip_host_01").value;
  usuario = document.getElementById("lista_users2").value;
  departamento = document.getElementById("departamente_01").value;
  fecha = document.getElementById("datepicker").value;
  num_form = $("#num_form").text().trim();
  $.post(
    "registrar_form01_cab.php",
    {
      planta: planta,
      host_name: host_name,
      ip_host: ip_host,
      usuario: usuario,
      departamento: departamento,
      fecha: fecha,
      num_form: num_form,
    },
    function (data) { }
  );
  //Item 01-01
  item = 1;
  actividad = $(".titulo_01_01").text().trim();
  valor = document.getElementById("datepicker2").value;
  observacion = document.getElementById("observacion_01_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = "";
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  //Item 02-01
  item = 2;
  actividad = $(".titulo_02_01").text().trim();
  valor = $("#valor_02_01 option:selected").text().trim();
  observacion = document.getElementById("observacion_02_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = "";
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  //Item 03-01
  item = 3;
  actividad = $(".titulo_03_01").text().trim();
  valor = document.getElementById("valor_03_01").value;
  observacion = document.getElementById("observacion_03_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = "";
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  //Item 04-01
  item = 4;
  actividad = $(".titulo_04_01").text().trim();
  valor = $("#valor_04_01 option:selected").text().trim();
  observacion = document.getElementById("observacion_04_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = "";
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  //Item 05-01
  item = 5;
  actividad = $(".titulo_05_01").text().trim();
  valor = document.getElementById("valor_01").value;
  observacion = document.getElementById("observacion_04_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = $("#valor_05_01 option:selected").text().trim();
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  //Item 06-01
  item = 6;
  actividad = $(".titulo_06_01").text().trim();
  valor = $("#valor_06_01 option:selected").text().trim();
  observacion = document.getElementById("observacion_06_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = "";
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  //Item 07-01
  item = 7;
  actividad = $(".titulo_07_01").text().trim();
  valor = $("#valor_07_01 option:selected").text().trim();
  observacion = document.getElementById("observacion_07_01").value;
  num_form = $("#num_form").text().trim();
  tipo_form = "01";
  unidad_medida = "";
  estado = "01";
  $.post(
    "registrar_form_det.php",
    {
      actividad: actividad,
      valor: valor,
      observacion: observacion,
      num_form: num_form,
      tipo_form: tipo_form,
      item: item,
      unidad_medida: unidad_medida,
      estado: estado,
    },
    function (data) { }
  );
  pone_lista_formulario2();
}
