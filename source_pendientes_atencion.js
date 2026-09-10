
function listar_Clientes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Clientes").html("Recuperando proveedores...");
      },
      url: 'Lista_Clientas_atencion.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Clientes").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}




///lista el combo de vendedores
function Vendedor() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Vendedor").html("Recuperando proveedores...");
      },
      url: 'Lista_vendedores_atencion.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Vendedor").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
///lista el combo de vendedores
function Grupo() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_grup").html("Recuperando proveedores...");
      },
      url: 'Lista_grupo_atencion.php',
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


function procesa_Busqueda_atencion() {
  clien = $("#lista_Clientes option:selected").val();
  vende = $("#lista_Vendedor option:selected").val();
  grup = $("#lista_grup option:selected").val();

  text = $("#text").val();

  if (text == '') {
    txt = '*';
  } else {
    txt = text;
  }
  // $("#lista_pendiente").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
  $.post("Lista_Datos_pendientes_aten.php", { clien: clien, vende: vende, grup: grup, txt: txt },
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
          if (i == 6) {
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