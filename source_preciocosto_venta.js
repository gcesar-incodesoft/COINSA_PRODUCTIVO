
///lista el combo de vendedores
function Grupo() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_grup").html("Recuperando proveedores...");
      },
      url: 'Lista_grupo_costo_venta.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_grup").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}



////muestra datos


function procesa_Busqueda_costo() {

  grup = $("#lista_grup option:selected").val();


  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();

  // $("#lista_pendiente").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i></div>');
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


  /////traer datos 
  $.post("Lista_Datos_venta_costo.php", { grup: grup, fechai: fechai, fechaf: fechaf },
    function (dat2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_pendiente").html(dat2);
        var table = $('#Tabla_Esca').DataTable(
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
              // {
              //   extend: 'pdf',
              //   text: '<i class="fa fa-file"></i> Exportar PDF',
              //   titleAttr: 'Exportar a PDF',
              //   className: 'btn btn-pdf',
              //   orientation: 'landscape',
              //   pageSize: 'A4',
              // },
              {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                className: 'btn btn-print'
              }
            ],
          }
        );

        $("#Tabla_Esca thead tr").clone(true).appendTo("#Tabla_Esca thead");
        $("#Tabla_Esca thead tr:eq(0) th").hide();

        $("#Tabla_Esca thead tr:eq(1) th").each(function (i) {
          if (i == 0 || i == 1) {
            var $th = $(this);
            filter($th, table, i);
          }
        });

        // Botón para mostrar todos
        $("#mostrar-todos").on("click", function () {
          $('#Tabla_Esca').DataTable().column(5).search("").draw();
        });

      }, 1500); // Retraso de 1.5 segundos
    });






}

function busca_margen_ventas() {
  // const vendedor = $("#pone_vendedores option:selected").val() || "-1";
  const vendedor = $("#vendedor").val() || "-1";
  // const cliente = $("#pone_clientes option:selected").val() || "C99999999999";
  const cliente = $("#cliente").val() || "C99999999999";
  const marca = $("#cmarca").val() || "-1";
  const tipo = $("#lista_Tipo option:selected").val() || "-1";
  const fechai = $("#fechai").val();
  const fechaf = $("#fechaf").val();

  if (!fechai || !fechaf) { alertify.error("Seleccione el rango de fechas"); return; }

  swal({
    title: "Cargando...",
    text: "Espere un momento",
    content: {
      element: "div", attributes: {
        innerHTML:
          `<div style='text-align:center;margin-bottom:10px;'>
         <img src='image/IncodeMob.png' style='width:75px;height:75px;'>
       </div>
       <div style='display:flex;justify-content:center;align-items:center;margin-top:20px;'>
         <div style='width:10px;height:10px;margin:0 5px;background:#007BFF;border-radius:50%;animation:bounce .6s infinite ease-in-out;animation-delay:-.32s;'></div>
         <div style='width:10px;height:10px;margin:0 5px;background:#007BFF;border-radius:50%;animation:bounce .6s infinite ease-in-out;animation-delay:-.16s;'></div>
         <div style='width:10px;height:10px;margin:0 5px;background:#007BFF;border-radius:50%;animation:bounce .6s infinite ease-in-out;'></div>
       </div>
       <style>@keyframes bounce{0%,80%,100%{transform:scale(0);}40%{transform:scale(1);}}</style>`
      }
    },
    buttons: false, closeOnClickOutside: false
  });

  $.post("Listar_reporte_ventas_mar.php",
    { fechai, fechaf, vendedor, cliente, marca, tipo },
    function (resp) { setTimeout(() => { swal.close(); $("#lista_Repor_Consumo").html(resp); }, 1200); }
  ).fail(() => { swal.close(); alertify.error("Error al consultar el reporte"); });
}
