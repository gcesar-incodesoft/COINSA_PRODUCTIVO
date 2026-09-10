function lista_clients() {
    //console.log('entro');
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clients").html("Recuperando Lista ...");
            },
            url: "lista_clients.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clients").html(x);
                $(".select2").select2();
                //console.log(x);
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}
function lista_vendedores() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#pone_vendedores").html("Recuperando proveedores...");
            },
            url: "pone_vendedores_cotizacion.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#pone_vendedores").html(x);

                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function busca_datos() {
    setTimeout(() => {
    vendedor = $("#pone_ven").val();
    cardcode = $("#lista_clients11").val();
    fec_ini = $("#fec_ini").val();
    if (fec_ini === "") {
      fec_ini = '2024-01-01';
    } else {
      fec_ini = $("#fec_ini").val();
    }
    fec_fin = $("#fec_fin").val();
 
     $.ajax({
      beforeSend: function () {
        swal_carga();
      },
      url: "consulta_listado_status_pedido.php",
      type: "POST",
      data: { vendedor: vendedor, cardcode: cardcode, fec_ini: fec_ini, fec_fin: fec_fin },
      success: function (x) {
  
        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
        swal.close();
        $("#lista_datos").html(x);
        // Verificar si la tabla ya está inicializada
    if ($.fn.DataTable.isDataTable("#tabla_cot_1")) {
        // Destruir la tabla anterior si ya existe
        $("#tabla_cot_1").DataTable().destroy();
      }
  
        $("#tabla_cot_1").DataTable({
          order: [[0, "desc"]],
        });
      }, 1500); // Retraso de 1.5 segundos
      },
      error: function (jqXHR, estado, error) { },
    });
  }, 1000);
   
  }

  
function swal_carga() {
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
}