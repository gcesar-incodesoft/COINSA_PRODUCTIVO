function listar_Proveedores() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Proveedores").html("Recuperando proveedores...");
      },
      url: 'Lista_Provedores_ventas.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Proveedores").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
};



///PROCESAR DATA
////muestra data 
function procesa_Busqueda_pendientes() {
  prove = $("#lista_Proveedores option:selected").val();

  estado = $("#esta option:selected").val();
  fechai = $("#fechai").val();
  if (fechai === "") {
    fechai = '01-01-2024';
  } else {
    fechai = $("#fechai").val();
  }
  fechaf = $("#fechaf").val();
  // $("#lista_marca_familia").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
  $.post("Lista_Datos_carter_exterior.php", { prove: prove, estado: estado, fechai: fechai, fechaf: fechaf },
    function (dat2) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_marca_familia").html(dat2);
        $('#Tabla_Esca').DataTable(
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

        // $("#Tabla_Esca thead tr").clone(true).appendTo("#Tabla_Esca thead");
        // $("#Tabla_Esca thead tr:eq(0) th").hide();

        // $("#Tabla_Esca thead tr:eq(1) th").each(function (i) {
        //   if (i == 5 || i == 6) {
        //     var $th = $(this);
        //     filter($th, table, i);
        //   }
        // });

        // // Botón para mostrar todos
        // $("#mostrar-todos").on("click", function () {
        //   $('#Tabla_Esca').DataTable().column(5).search("").draw();
        // });

      }, 1500); // Retraso de 1.5 segundos

    });


};