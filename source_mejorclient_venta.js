

////muestra datos


function procesa_Busqueda() {

   text = $("#text").val();

   cmeses = $("#cmeses").val();

   cgrupo = $("#cgrupo").val();
   caños = $("#caños option:selected").val();

   if (text == '') {
      txt = '0';
   } else {
      txt = text;
   }
   if (cmeses == '-1') {
      cmeses = '';
   } else {
      cmeses = cmeses;
   }

   if (cgrupo == '-1') {
      cgrupo = '';
   } else {
      cgrupo = cgrupo;
   }


   //alert(text);
   //alert(fechai);
   //alert(fechaf);
   /////traer datos 
   //   $.post("Lista_Datos_mejorclient_venta.php", {top:top,fechai:fechai,fechaf:fechaf},
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
   $.post("Lista_mejorclient_venta.php", { text: txt, idmes: cmeses, idgrupo: cgrupo, caños: caños },
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

            $("#Tabla_Esca thead tr").clone(true).appendTo("#Tabla_Esca thead");
            $("#Tabla_Esca thead tr:eq(0) th").hide();

            $("#Tabla_Esca thead tr:eq(1) th").each(function (i) {
               if (i == 1) {
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

$(document).ready(function () {
   setTimeout(function () {
      $("#caños").val('2026').trigger('change.select2');
   }, 100);
});


function lista_cmeses() {
   $(document).ready(function () {

      $.ajax({
         beforeSend: function () {
            $("#pone_cmeses").html("Recuperando meses...");
         },
         url: 'pone_cmeses.php',
         type: 'POST',
         data: null,
         success: function (x) {
            $("#pone_cmeses").html(x);

            $(".select2").select2();

            var urlParams = new URLSearchParams(window.location.search);
            var valMesesito = urlParams.get('val');
            var yearAnte = urlParams.get('year');


            // Asignar el valor del mes si existe en la URL, de lo contrario usar mes_actual
            if (valMesesito) {
               $("#pone_cmeses select").val(valMesesito).trigger("change");

               $("#anio").val(yearAnte).trigger("change");
            } else {
               var fecha = new Date();
               var mes_actual = fecha.getMonth() + 1;
               $("#pone_cmeses select").val(mes_actual).trigger("change");
            }

         },
         error: function (jqXHR, estado, error) {
         }
      });
   });
}

function lista_cgrupo() {
   $(document).ready(function () {

      $.ajax({
         beforeSend: function () {
            $("#pone_cgrupo").html("Recuperando Grupo...");
         },
         url: 'pone_cgrupo_cliente.php',
         type: 'POST',
         data: null,
         success: function (x) {
            $("#pone_cgrupo").html(x);

            $(".select2").select2();

            $("#pone_cgrupo select").val('-1').trigger('change.select2');
         },
         error: function (jqXHR, estado, error) {
         }
      });
   });
}