function revisa_compras() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_compras").html("Cargando... <img src='dist/img/default.gif'/>")
      },
      url: 'pone_compras_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_compras").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_compras").html("Ocurrio un error al cargar la informacion de compras..." + estado + "    " + error);
      }
    });
  })
}

/****************************************************/
function revisa_ventas() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_ventas").html("Cargando... <img src='dist/img/default.gif'/>")
      },
      url: 'pone_ventas_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_ventas").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_ventas").html("Ocurrio un error al cargar la informacion de ventas..." + estado + "    " + error);
      }
    });
  })
}
/*********************************************************************************/
function pone_gastos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_gastos").html("Cargando... <img src='dist/img/default.gif'></img>")
      },
      url: 'pone_gastos_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_gastos").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_gastos").html("Ocurrio un error al cargar la informacion de gastos..." + estado + "    " + error);
      }
    });
  })
}
/**************************************************************************************/
function pone_users() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_users").html("Cargando... <img src='dist/img/default.gif'></img>")
      },
      url: 'pone_users_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_users").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_users").html("Ocurrio un error al cargar la informacion de usuarios..." + estado + "    " + error);
      }
    });
  })
}
/*************************************************************************************/
function genera_grafica() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica.php", function (json) {

      var donut = new Morris.Donut({
        element: 'line-chart-ventas',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a63a", "#db1f07", "#b50987",
          "#055e65", "#40100a", "#88cb09",
          "#620d62", "#db8107", "#b50909",
          "#796679", "#463114", "#748b95"],
        data: json,
        hideHover: 'auto'
      });
    });

  });
}
/**************************************************************
GOOGLE CHART***************/

function drawChart() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica.php", function (json) {
      var data = google.visualization.arrayToDataTable([
        ['Tareas', 'Hours per Day'],
        ['Trabajo', 11],
        ['Comida', 2],
        ['Commute', 2],
        ['Ver TV', 2],
        ['Dormir', 7],
        ['Libre', 14]
      ]);

      var options = {
        title: 'Ventas x País',
        is3D: true,
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(data, options);
    });

  });
}
/*************************************************************
GENERAR GRAFICA BARRAS ***************/

function genera_grafica_barras() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Total USD', 'Cantidad'],
        hideHover: 'auto',
        xLabelAngle: 60,
      });;
    });

  });
}
/*************************************************************
GENERAR GRAFICA BARRAS PRODUCCION ***************/

function genera_grafica_barras_produccion() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_produccion.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Peso Kg', 'Scrap Kg'],
        hideHover: 'auto',
        xLabelAngle: 60,
      });;
    });

  });
}

/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS PRODUCCION TELAR 1 ***************/

function genera_grafica_barras_produccion_telar1() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_produccion_telar1.php", function (json) {

      var bar = new Morris.Bar({
        element: 'telar1',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Peso Kg', 'Scrap Kg'],
        hideHover: 'auto',
        xLabelAngle: 60,
      });;
    });

  });
}

/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS PRODUCCION ***************/

function genera_grafica_barras_ventas_gpoarticulos() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_ventas_gpoarticulos.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart-ventas',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        //      ykeys: ['a', 'b'],
        //      labels: ['Total USD', 'Cantidad'],
        ykeys: ['a', 'b'],
        labels: ['Total USD', 'PesoKG'],
        hideHover: 'auto',
        xLabelAngle: 30,
      });;
    });

  });
}

/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS VTAS VENDEDOR ***************/

function genera_grafica_barras_ventas_vendedor() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_ventas_vendedor.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart-ventas_vendedor',
        resize: true,
        data: json,
        barColors: ['#db1f07', '#459006'],
        xkey: 'y',
        //      ykeys: ['a', 'b'],
        //      labels: ['Total USD', 'Cantidad'],
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        hideHover: 'auto',
        xLabelAngle: 30,
      });

      var bar2 = new Morris.Bar({
        element: 'bar-chart-ventas_vendedor2',
        resize: true,
        data: json,
        barColors: ['#6d1004', '#59be04'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        hideHover: 'auto',
        xLabelAngle: 30,
      });
    });

  });
}

/*****************************************************************************/
/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS VTAS MENSUAL ***************/

function genera_grafica_barras_ventas_mensual() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_ventas_mensual.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart-ventas_mensual',
        resize: true,
        data: json,
        //  barColors: ['#db1f07', '#43a2b4'],
        xkey: 'y',
        //      ykeys: ['a', 'b'],
        //      labels: ['Total USD', 'Cantidad'],
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        //hideHover: 'auto',
        xLabelAngle: 30,
        //pointFillColors:['#a6bae0','#bcd8a5'],
        //pointStrokeColors: ['red','blue'],

        fillOpacity: 0.6,
        hideHover: 'auto',
        behaveLikeLine: true,
        resize: true,
        pointFillColors: ['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors: ['gray', 'red'],


      });

      var bar2 = new Morris.Line({
        element: 'bar-chart-ventas_mensual2',
        resize: true,
        data: json,
        barColors: ['#6d1004', '#59be04'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        hideHover: 'auto',
        xLabelAngle: 30,

      });
    });

  });
}

/*****************************************************************************/

function genera_grafica_existe() {
  $(document).ready(function () {
    $.getJSON("genera_array_existencias.php", function (json) {

      var line = new Morris.Line({
        element: 'line-chart-existe',
        resize: true,
        data: json,
        xkey: 'a',
        ykeys: ['item1'],
        labels: ['Cantidad'],
        lineColors: ['#3c8dbc'],
        hideHover: 'auto'
      });
    });

  });
}

/*****************************************************************************/

function abrirModalInformes() {
  $("#modal_informe").modal("show");
  console.log("help");
}

function abrirTopVentas() {
  javascript: window.open("top_ventas.php");
}

function abrirTopCompras() {
  javascript: window.open("top_compras.php");
}

function abrirKPICobranzas() {
  javascript: window.open("consulta_kpi_cobranzas.php");
}

function abrirRotacionInventario() {
  javascript: window.open("Lista_Rotacion_Inventario.php");
}

function abrirComparativoStock() {
  javascript: window.open("Lista_Comparativo_Mensual_Stock.php");
}

function abrirMargenVentas() {
  javascript: window.open("Lista_reporte_ventas_mar.php");
}


//logistica
function kpi_atencion() {
  javascript: window.open("kpi_efic_atencion.php");
}
function kpi_plazo_entrega() {
  javascript: window.open("consulta_kpi_recojo_mercaderia.php");
}
function kpi_exac_pedido() {
  javascript: window.open("consulta_kpi_exactitud_pedido.php");
}
function pki_efi_pro() {
  javascript: window.open("consulta_kpi_eficiencia_programacion_despacho.php");
}
function kpi_recuento() {
  javascript: window.open("consulta_kpi_recuento_inventario.php");
}

function kpi_despacho() {
  javascript: window.open("consulta_kpi_entregaspro.php");
}

//ventas
function kpi_cotizaciones() {
  javascript: window.open("consulta_kpi_cotizaciones.php");
}

function analisis_compras(){
  javascript: window.open("anaisis_compras.php");
}



function abrir_modal_detalle_articulo_transito() {
  $("#modal_detalle_articulo_transito").modal("show");

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

function abrir_log_modificaciones(doc) {

  $("#modal_log_modificaciones").modal("show");

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

$(document).on("click", ".btn-copy", function () {
  Swal.fire({
    title: '¡Copiado!',
    text: 'Los datos se han copiado al portapapeles.',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500 // Se cierra automáticamente después de 1.5 segundos
  });
});

function abrir_modal_detalle_comprometido(id) {
  console.log(id);
  const [itemcode, descripcion, catalogo, marca] = id.split('|'); // Divide el ID en partes

  $("#codigo_articulo_c").val(itemcode);
  $("#nombre_articulo_c").val(descripcion);
  $("#catalogo_articulo_c").val(catalogo);
  $("#marca_articulo_c").val(marca);

  $("#modal_detalle_comprometido").modal("show");


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

/*****************************************************************************/

function validar_tipocambio() {
  $.ajax({
    beforeSend: function () {

    },
    url: 'valida_tipo_cambio.php',
    type: 'POST',
    data: null,
    success: function (x) {
      t_c = parseInt(x)
      // console.log(t_c);
      if (t_c === 0) {
        // $('#tipocambio').modal({
        //   backdrop: 'static',  // Deshabilita la opción de cerrar el modal haciendo clic fuera
        //   keyboard: false      // Deshabilita la opción de cerrar el modal con la tecla Escape
        // });
        // $('#xd123').prop('disabled', true);

        // listar_moneda();
        $("#btn_coti").prop("disabled", true);
        $("#limpiarCacheBtn").prop("disabled", true);

        // $('#ver_det').each(function () {
        //   $(this).prop('href', '#');  // Remover la URL
        //   $(this).click(function (e) {
        //     e.preventDefault();  // Evitar la acción del clic
        //   });
        // });

        Swal.fire({
          title: "Falta Tipo de Cambio",
          text: "Inserte Tipo de Cambio!",
          icon: "error",
          // button: false, // Desactiva los botones
          showCloseButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: false,
          // timer: 3000, // Establece un temporizador para que la alerta se cierre después de 3000 milisegundos (3 segundos)

        });
      } else if (t_c === 1) {
        // Swal.fire({
        //   title: "Falta Tipo de Cambio",
        //   text: "Inserte Tipo de Cambio!",
        //   icon: "error",
        //   showCloseButton: false,
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   showCancelButton: false,
        // });

        // revisa_ventas_mes();
        // lista_permisos();
      } else {

      }
    },
    error: function (jqXHR, estado, error) {
    }
  });
}

/*****************************************************************************/
function revisa_caducidades() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#").html("Cargando... <img src='dist/img/default.gif'></img>")
      },
      url: 'analiza_cad_prods.php',
      type: 'POST',
      dataType: 'json',
      data: null,
      success: function (x) {
        if (x.length > 0) {
          $.each(x, function (y, item) {
            $(".arti_caducos").append("<li><a href='#'><i class='fa fa-barcode'></i>El producto " + x[y].codigo + " esta por caducar...!</a></li>");
          });

          $(".num_noti").html("");
          $(".num_noti").html(x.length);
        }
      },
      error: function (jqXHR, estado, error) {
      }
    });
  })
}

/****************** GC PONE VENTAS INI **********************************/
function revisa_ventas_mes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        // $("#pone_ventas_mes").html("Cargando... <img src='dist/img/default.gif'/>")
        $("#pone_ventas_mes").html("Cargando... ")
      },
      url: 'pone_ventas_mes_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_ventas_mes").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_ventas_mes").html("Ocurrio un error al cargar la informacion de compras..." + estado + "    " + error);
      }
    });
  })
}
/*****************************************************************
BUSCA MODAL GRAFICO VENTAS VENDEDOR
***************************/
function busca_grafico1() {
  $(document).ready(function () {
    $("#modal_tabla_grafico_ventas_vendedor").modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
  })
}
/******************************************************************************/
/****************** MA AUTORIZAR **********************************/

function Autoclick() {
  $(document).ready(function () {
    $("#modal_Tp_AUTO").modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
  })

}

/******************************************************************************/

document.getElementById("limpiarCacheBtn").addEventListener("click", function () {
  // Limpiar almacenamiento local
  window.localStorage.clear();

  // Limpiar almacenamiento de sesión
  window.sessionStorage.clear();


  location.reload();
  // Limpiar cookies
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }


  alert("Temporales y caché limpiados correctamente.");
});

/******************************************************************************/