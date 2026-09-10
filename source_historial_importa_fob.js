
function listar_ProveedoresX() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_proveedores").html("Recuperando proveedores...");
      },
      url: "lista_proveedores.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_proveedores").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function listar_Fabrincantes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Fabricantes").html("Recuperando proveedores...");
      },
      url: 'Lista_Fabricantes.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Fabricantes").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function listar_Familias() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_Familia").html("Recuperando proveedores...");
      },
      url: 'Lista_Familias.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_Familia").html(x);
        $(".select2").select2();



      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function lista_SubFamilia_Despacho() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_SubFamilia").html("Recuperando Sub Familia...");
      },
      url: 'Lista_SubFamilia_Despacho.php',
      type: 'POST',
      data: 'fami=' + $("#lista_Familia option:selected").val(),
      success: function (x) {
        $("#lista_SubFamilia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}



function lista_subfami2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_subfamilia2").html("Recuperando Sub Familia2...");
      },
      url: 'lista_subfami2.php',
      type: 'POST',
      data: 'fami=' + $("#lista_SubFamilia option:selected").val(),
      success: function (x) {
        $("#lista_subfamilia2").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}



function procesa_Busqueda() {
  fabricante = $("#lista_Fabricantes option:selected").val();
  familia = $("#lista_Familia option:selected").val();
  Subfamilia = $("#lista_SubFamilia option:selected").val();
  Subfamilia2 = $("#lista_subfamilia2 option:selected").val();
  proveedor = $("#lista_proveedores option:selected").val();
  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();

  // $("#lista_historial_importa_fob").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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

  $.post("lista_histo_importa_fob.php", { fabricante: fabricante, 
                                          familia: familia, 
                                          Subfamilia: Subfamilia, 
                                          Subfamilia2: Subfamilia2, 
                                          proveedor: proveedor, 
                                          fechai: fechai, 
                                          fechaf: fechaf },
    function (dat2) {
      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_historial_importa_fob").html(dat2);
        $('#tabla_IPF').DataTable(
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
    });

}
function exportar_excel() {

  fabricante = $("#lista_Fabricantes option:selected").val();
  familia = $("#lista_Familia option:selected").val();
  Subfamilia = $("#lista_SubFamilia option:selected").val();
  Subfamilia2 = $("#lista_subfamilia2 option:selected").val();
  proveedor = $("#lista_proveedores option:selected").val();
  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();

  javascript: window.open('reporte_histo_importa_fob_excel.php?fabricante=' + fabricante + 
                                                             '&familia=' + familia + 
                                                             '&Subfamilia=' + Subfamilia + 
                                                             '&Subfamilia2=' + Subfamilia2 + 
                                                             '&proveedor=' + proveedor + 
                                                             '&fechai=' + fechai + 
                                                             '&fechaf=' + fechaf);
}


