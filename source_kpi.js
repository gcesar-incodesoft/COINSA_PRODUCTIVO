
function lista_cpago() {
  // console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_condicion_pago").html("Recuperando Lista ...");
      },
      url: "lista_cpago_general.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_condicion_pago").html(x);
        $("#pone_condicion_pago select").val("-1").trigger("change")
        $(".select2").select2();
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function lista_cpago2() {
  // console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_condicion_pago2").html("Recuperando Lista ...");
      },
      url: "lista_cpago_general.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#pone_condicion_pago2").html(x);
        $("#pone_condicion_pago2 select").val("-1").trigger("change")
        $(".select2").select2();
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function Reporte_kpi_entregaspro() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = $("#pone_ven option:selected").val();
  cliente = $("#pone_clientes option:selected").val();

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

    url: 'Listar_Report_kpi_entregaspro.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente
    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              }
            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 1 | i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}
/*******************************************************************************/

function Reporte_kpi_cotizaciones() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = $("#pone_ven option:selected").val();
  cliente = $("#pone_clientes option:selected").val();
  cpago = $("#cpago").val();


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

    url: 'Listar_Report_kpi_cotizaciones.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente,
      cpago: cpago

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
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
              /*
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
                   */
            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 1 | i == 6) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}


function busca_detalle_cotizacion(docentry) {
  $("#modal_det_cotizacion").modal("show");
  $.ajax({
    url: "consulta_detalle_venta_autorizaciones_cotizaciones2.php",

    type: "POST",
    data: "id=" + docentry,
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append(
        " Detalle de Cotizacion | <span class='label label-warning'>#: " +
        docentry +
        "</span>"
      );
      $("#pagos_realizados").html(x);
    },
    error: function (jqXHR, estado, error) { },
  });
}

function Reporte_kpi_cotizacionesReload() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = "-1";
  cliente = "C99999999999";
  cpago = $("#cpago").val();


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

    url: 'Listar_Report_kpi_cotizaciones.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente,
      cpago: cpago

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
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
              /*
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
                   */
            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 1 | i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}



/*******************************************************************************/

function Reporte_kpi_cobranzas() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = $("#pone_ven option:selected").val();
  cliente = $("#pone_clientes option:selected").val();
  cpago = $("#cpago").val();


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


    url: 'Listar_Report_kpi_cobranzas.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      cliente: cliente,
      vendedor: vendedor,
      cpago: cpago

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            /*
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              },

            ],
            */
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 1 | i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}

function Reporte_kpi_eficiencia_atencion_pedidos() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = $("#pone_ven option:selected").val();
  cliente = $("#pone_clientes option:selected").val();


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

    url: 'Listar_Report_kpi_eficiencia_atencion_pedidos.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            order: [[1, 'desc']],
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
              /*
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
                   */
            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 0 | i == 6) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

        mostrar_grafico_tendencia_atencion(fechai, fechaf, vendedor, cliente);
      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}

function Reporte_kpi_exactitud_pedido() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = $("#pone_ven option:selected").val();
  cliente = $("#pone_clientes option:selected").val();


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

    url: 'Listar_Report_kpi_exactitud_pedido.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            order: [[2, 'desc']],
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
              /*
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
                   */
            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 0 | i == 3 | i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

        mostrar_grafico_tendencia_exactitud(fechai, fechaf, vendedor, cliente);

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}

function Reporte_kpi_recuento_inventario() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  //vendedor = $("#pone_ven option:selected").val();
  //cliente = $("#pone_clientes option:selected").val();


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

    url: 'Listar_Report_kpi_recuento_inventario.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            order: [[2, 'desc']],
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              },

            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 0 | i == 3 | i == 5) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

        mostrar_grafico_tendencia_exactitud(fechai, fechaf, vendedor, cliente);

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}


function cargar_data_no_conformidades_detalle(docentry_guia, cliente, empresa, n_guia, nro_oc) {
  $('#modal_no_confomidades_detalle').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });
  $("#modal_no_confomidades_detalle").modal("show");


  document.getElementById("cliente_conformidad_det").value = cliente;
  document.getElementById("n_guia_conformidad_det").value = n_guia;
  document.getElementById("num_orden_conformidad_det").value = nro_oc;

  busca_lista_no_conformidades_detalle(docentry_guia, empresa);
}

function busca_lista_no_conformidades_detalle(docentry_guia, empresa) {
  console.log(docentry_guia);
  console.log(empresa);

  $.ajax({
    beforeSend: function () { },
    url: 'listado_no_conformidades_registradas_detalle.php',
    type: 'POST',
    data: {
      doc_pedido: docentry_guia,
      empresa: empresa,
    },
    success: function (x) {
      $("#listado_registros_conformidades_det").html(x);
    }
  });
}

function muestra_modal_evidencia_no_conformidad_detalle(id) {

  const tipo = 'S';
  const guia = $("#n_guia_conformidad_det").val();
  const cliente = $("#cliente_conformidad_det").val();
  const oc = $("#num_orden_conformidad_det").val();
  const emp = "C";

  const [docEntry, id_conf] = id.split('/');

  $("#serienum_modalevi_confo_det").val(guia);
  $("#num_oc_modalevi_confo_det").val(oc);
  $("#cliente_confo_det").val(cliente);

  $("#modal_evidencia_no_conformidades_detalle").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  listar_data_conformidades_detalle(docEntry, 'TD', emp, tipo, id_conf);
}

function listar_data_conformidades_detalle(id, movi, emp, tipo, id_conf) {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#data_pdf_conformidades_det").html("Buscando las ventas, un momento...");
      },
      url: "listar_data_pdf_conformidades.php",
      type: "POST",
      data: {
        id: id,
        emp: emp,
        id_conf: id_conf,
      },
      success: function (res) {
        $("#data_pdf_conformidades_det").html(res);
      },
      error: function (jqXHR, estado, error) {
      },
    });
  });
}

function ver_manual_pdf_conformidad(id, ruta) {
  $global_id = id;
  $global_ruta = ruta;

  $('#modal_data_pdf_conformidad').modal('show');
  $('.modal_data_pdf_conformidad').on('shown.bs.modal', function () {
    $(this).find('iframe').attr('src', $global_ruta)
  })
  $("#navegador_conf").on('click', function () {
    //window.location.href = $global_ruta
    window.open($global_ruta);

  })
  $("#imprimir_conf").on('click', function () {
    $('#imprimir_conf')[0].contentWindow.print();

  })
}

function Reporte_kpi_recojo_mercaderia() {

  let fechai = $("#fechai").val();
  let fechaf = $("#fechaf").val();
  let pedidoOC = $("#pedidoOC option:selected").val();
  let cliente = $("#pone_clientes option:selected").val();

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
                      0%, 80%, 100% { transform: scale(0); }
                      40% { transform: scale(1); }
                  }
              </style>
            `
          }
        },
        buttons: false,
        closeOnClickOutside: false
      });
    },

    url: 'Listar_Report_kpi_recojo_mercaderia.php',
    type: 'POST',
    data: { fechai: fechai, fechaf: fechaf, pedidoOC: pedidoOC, cliente: cliente },

    success: function (data2) {
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        $('#tablaResultados').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            order: [[2, 'desc']],
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
              /*
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
                   */
            ],
          }
        );

        // === Destruir DataTable si ya existe ===
        // if ($.fn.DataTable.isDataTable('#tablaResultados')) {
        //   $('#tablaResultados').DataTable().clear().destroy();
        // }

        // // === Inicializar DataTable con botón Copiar ===
        // $('#tablaResultados').DataTable({
        //   dom: 'Bfrtip',
        //   buttons: [
        //     {
        //       extend: 'copyHtml5',
        //       text: '<i class="fa fa-copy"></i> Copiar',
        //       titleAttr: 'Copiar al portapapeles',
        //       className: 'btn btn-primary btn-sm',
        //       action: function (e, dt, node, config) {
        //         // Acción original
        //         $.fn.dataTable.ext.buttons.copyHtml5.action.call(this, e, dt, node, config);

        //         // SweetAlert2 de confirmación
        //         Swal.fire({
        //           icon: 'success',
        //           title: '¡Copiado!',
        //           text: 'Los datos se han copiado al portapapeles.',
        //           showConfirmButton: false,
        //           timer: 1600,
        //           timerProgressBar: true
        //         });
        //       }
        //     }
        //   ],
        //   order: [[1, 'desc']],
        //   pageLength: 20,
        //   language: {
        //     url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
        //   },
        //   initComplete: function () {
        //     $('#tablaResultados thead').addClass('thead-dark');
        //   }
        // });

        // // === Mejora visual ===
        // $(".dataTables_wrapper .dataTables_length select").css({
        //   "border": "1px solid #ccc",
        //   "border-radius": "6px",
        //   "padding": "4px"
        // });
        // $(".dataTables_filter input").css({
        //   "border": "1px solid #ccc",
        //   "border-radius": "6px",
        //   "padding": "4px"
        // });

        mostrar_grafico_tendencia_cumplimiento(fechai, fechaf, pedidoOC, cliente);
      }, 1200);
    },

    error: function (jqXHR, estado, error) {
      swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al cargar el reporte. Por favor, comuníquelo a soporte.'
      });
      console.error("Error:", estado, error);
    }
  });
}


function Reporte_kpi_eficiencia_programacion_despacho() {

  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  vendedor = $("#pone_ven option:selected").val();
  cliente = $("#pone_clientes option:selected").val();

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

    url: 'Listar_Report_kpi_eficiencia_programacion_despacho.php',
    type: 'POST',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente

    },

    success: function (data2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_Repor_Consumo").html(data2);
        var table = $('#Tabla_factu').DataTable(
          {
            dom: '<"top"lBf>rt<"bottom"ip>',
            order: [[1, 'desc']],
            buttons: [
              {
                extend: 'copy',
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: 'Copiar',
                className: 'btn btn-copy'
              },
            ],
          }
        );

        $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
        $("#Tabla_factu thead tr:eq(0) th").hide();

        $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
          if (i == 0 | i == 6) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_factu').DataTable().column(5).search("").draw();
        });

        mostrar_grafico_tendencia_eficiencia(fechai, fechaf, vendedor, cliente);

      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) {
      alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
      $("#Tabla_factu").hmtl(estado + "     " + error);
    }
  });
}



function mostrar_grafico_tendencia_eficiencia(fechai, fechaf, vendedor, cliente) {
  $.ajax({
    url: 'grafico_tendencia_eficiencia.php',
    type: 'POST',
    dataType: 'json',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente
    },
    success: function (data) {
      if (!data || data.length === 0) {
        console.warn("No se encontraron datos para el gráfico de tendencia.");
        return;
      }

      const labels = data.map(item => item.mes);
      const dataProgramadas = data.map(item => item.programadas);
      const dataReprogramadas = data.map(item => item.reprogramadas);

      const ctx = document.getElementById('graficoTendencia').getContext('2d');

      // Si ya existe un gráfico anterior, destruirlo para evitar errores
      if (window.chartTendencia) {
        window.chartTendencia.destroy();
      }

      window.chartTendencia = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Entregas Programadas',
              data: dataProgramadas,
              backgroundColor: '#4CAF50',
              borderColor: '#4CAF50',
              fill: false
            },
            {
              label: 'Entregas Reprogramadas',
              data: dataReprogramadas,
              backgroundColor: '#E53935',
              borderColor: '#E53935',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Tendencia Mensual de Programación vs Reprogramación'
            },
            // Habilitamos datalabels
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#111',
              font: {
                weight: 'bold'
              },
              formatter: function (value, context) {
                return value;
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Entregas'
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener los datos del gráfico:", status, error);
    }
  });
}

function mostrar_grafico_tendencia_atencion(fechai, fechaf, vendedor, cliente) {
  $.ajax({
    url: 'grafico_tendencia_atencion.php',
    type: 'POST',
    dataType: 'json',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente
    },
    success: function (data) {
      if (!data || data.length === 0) {
        console.warn("No se encontraron datos para el gráfico de tendencia.");
        return;
      }

      const labels = data.map(item => item.mes);
      const dataAtiempo = data.map(item => item.atiempo);
      const dataPocaDemora = data.map(item => item.pocaDemora);
      const dataDemoraExcesiva = data.map(item => item.demoraExcesiva);

      const ctx = document.getElementById('graficoTendenciaAtencion').getContext('2d');

      // Destruir gráfico previo si existe
      if (window.chartTendencia) {
        window.chartTendencia.destroy();
      }

      window.chartTendencia = new Chart(ctx, {
        type: 'line', // Cambia a 'bar' si prefieres barras
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Entregas A Tiempo',
              data: dataAtiempo,
              backgroundColor: '#8BC34A',
              borderColor: '#8BC34A',
              fill: false,
              tension: 0.3
            },
            {
              label: 'Con Poca Demora',
              data: dataPocaDemora,
              backgroundColor: '#FFEB3B',
              borderColor: '#FFEB3B',
              fill: false,
              tension: 0.3
            },
            {
              label: 'Con Demora Excesiva',
              data: dataDemoraExcesiva,
              backgroundColor: '#F5D9CB',
              borderColor: '#F5D9CB',
              fill: false,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Tendencia Mensual de Atención de Pedidos'
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#111',
              font: {
                weight: 'bold'
              },
              formatter: function (value) {
                return value;
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad de Entregas'
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener los datos del gráfico:", status, error);
    }
  });
}

function mostrar_grafico_tendencia_exactitud(fechai, fechaf, vendedor, cliente) {
  $.ajax({
    url: 'grafico_tendencia_exactitud.php',
    type: 'POST',
    dataType: 'json',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente
    },
    success: function (data) {
      if (!data || data.length === 0) {
        console.warn("No se encontraron datos para el gráfico de tendencia.");
        return;
      }

      const labels = data.map(item => item.mes);
      const dataConformes = data.map(item => item.conformes);
      const dataObservadas = data.map(item => item.observadas);

      const ctx = document.getElementById('graficoTendenciaExactitud').getContext('2d');

      // Si ya existe un gráfico anterior, destruirlo
      if (window.chartTendenciaExactitud) {
        window.chartTendenciaExactitud.destroy();
      }

      window.chartTendenciaExactitud = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Entregas Conformes',
              data: dataConformes,
              backgroundColor: '#8BC34A',
              borderColor: '#8BC34A',
              fill: false,
              tension: 0.3,
              pointBackgroundColor: '#8BC34A',
              pointBorderColor: '#8BC34A'
            },
            {
              label: 'Entregas Observadas',
              data: dataObservadas,
              backgroundColor: '#FFEB3B',
              borderColor: '#FFEB3B',
              fill: false,
              tension: 0.3,
              pointBackgroundColor: '#FFEB3B',
              pointBorderColor: '#FFEB3B'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Tendencia Mensual de Conformes vs Observadas'
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#111',
              font: {
                weight: 'bold'
              },
              formatter: function (value) {
                return value;
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Entregas'
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener los datos del gráfico:", status, error);
    }
  });
}

function mostrar_grafico_tendencia_cumplimiento(fechai, fechaf, pedidoOC, cliente) {
  $.ajax({
    url: 'grafico_tendencia_cumplimiento.php',
    type: 'POST',
    dataType: 'json',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      pedidoOC: pedidoOC,
      cliente: cliente
    },
    success: function (data) {
      if (!data || data.length === 0) {
        console.warn("No se encontraron datos para el gráfico de tendencia.");
        return;
      }

      const labels = data.map(item => item.mes);
      const dataEoportuna = data.map(item => item.eoportuna);
      const dataDemoraTolerable = data.map(item => item.edemoraTolerable);
      const dataDemoraExcesiva = data.map(item => item.edemoraExcesiva);

      const ctx = document.getElementById('graficoTendenciaCumplimiento').getContext('2d');

      // Destruir gráfico previo si existe
      if (window.chartTendencia) {
        window.chartTendencia.destroy();
      }

      window.chartTendencia = new Chart(ctx, {
        type: 'line', // Cambia a 'bar' si prefieres barras
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Entregas Oportunas',
              data: dataEoportuna,
              backgroundColor: '#8BC34A',
              borderColor: '#8BC34A',
              fill: false,
              tension: 0.3
            },
            {
              label: 'Entregas Con Demora Tolerable',
              data: dataDemoraTolerable,
              backgroundColor: '#FFEB3B',
              borderColor: '#FFEB3B',
              fill: false,
              tension: 0.3
            },
            {
              label: 'Entregas Con Demora Excesiva',
              data: dataDemoraExcesiva,
              backgroundColor: '#F5D9CB',
              borderColor: '#F5D9CB',
              fill: false,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Tendencia Mensual de Cumplimiento del Plazo de Entrega de Proveedores ML'
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#111',
              font: {
                weight: 'bold'
              },
              formatter: function (value) {
                return value;
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad de Entradas'
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener los datos del gráfico:", status, error);
    }
  });
}


function mostrar_grafico_tendencia_recuento_inventario(fechai, fechaf, vendedor, cliente) {
  $.ajax({
    url: 'grafico_tendencia_recuento_inventario.php',
    type: 'POST',
    dataType: 'json',
    data: {
      fechai: fechai,
      fechaf: fechaf,
      vendedor: vendedor,
      cliente: cliente
    },
    success: function (data) {
      if (!data || data.length === 0) {
        console.warn("No se encontraron datos para el gráfico de tendencia.");
        return;
      }

      const labels = data.map(item => item.mes);
      const dataConformes = data.map(item => item.conformes);
      const dataObservadas = data.map(item => item.observadas);

      const ctx = document.getElementById('graficoTendenciaExactitud').getContext('2d');

      // Si ya existe un gráfico anterior, destruirlo
      if (window.chartTendenciaExactitud) {
        window.chartTendenciaExactitud.destroy();
      }

      window.chartTendenciaExactitud = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Entregas Conformes',
              data: dataConformes,
              backgroundColor: '#8BC34A',
              borderColor: '#8BC34A',
              fill: false,
              tension: 0.3,
              pointBackgroundColor: '#8BC34A',
              pointBorderColor: '#8BC34A'
            },
            {
              label: 'Entregas Observadas',
              data: dataObservadas,
              backgroundColor: '#FFEB3B',
              borderColor: '#FFEB3B',
              fill: false,
              tension: 0.3,
              pointBackgroundColor: '#FFEB3B',
              pointBorderColor: '#FFEB3B'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Recuento de Inventario'
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#111',
              font: {
                weight: 'bold'
              },
              formatter: function (value) {
                return value;
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Entregas'
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener los datos del gráfico:", status, error);
    }
  });
}
