function lista_clientes2() {
    //console.log('hola');
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#pone_clientes").html("Recuperando proveedores...");
            },
            url: 'pone_clientes_cartera.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_clientes").html(x);
                $(".select2").select2();


            },
            error: function (jqXHR, estado, error) {
            }
        });
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


function lista_vendedores2() {
    //console.log('hola');
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#pone_vendedores").html("Recuperando proveedores...");
            },
            url: 'pone_vendedo.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_vendedores").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}


function lista_vendedores() {
    $(document).ready(function () {

        $.ajax({
            beforeSend: function () {
                $("#pone_vendedores").html("Recuperando proveedores...");
            },
            url: 'pone_vendedores_cartera_new.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_vendedores").html(x);

                $(".select2").select2();

                $("#pone_vendedores select").val('-1').trigger('change.select2');
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}




function lista_cotizacion() {
    fechai = $("#fechai").val();
    fechaf = $("#fechaf").val();
    cliente = $("#pone_clientes option:selected").val();


    $.ajax({
        beforeSend: function () {
            $("#datapedidospendientes").html("Recuperando proveedores...");
        },
        url: 'listado_pedidos_migrados.php',
        type: 'POST',
        data: { fechai: fechai, fechaf: fechaf, cliente: cliente },
        success: function (x) {
            $("#datapedidospendientes").html(x);
            $("#tabla_cot").DataTable({
                dom: '<"top"lBf>rt<"bottom"ip>',
                buttons: [
                    {
                        extend: 'copy',
                        text: '<i class="fa fa-copy"></i> Copiar',
                        titleAttr: 'Copiar',
                        className: 'btn btn-copy'
                    },
                    {
                      extend: 'csv',
                      text: '<i class="fa fa-file"></i> Exportar CSV',
                      titleAttr: 'Exportar a CSV',
                      className: 'btn btn-csv'
                    },
                    {
                      extend: 'excel',
                      text: '<i class="fa fa-file"></i> Exportar Excel',
                      titleAttr: 'Exportar a Excel',
                      className: 'btn btn-excel'
                    },
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
                order: [[0, "desc"]],
            });

        },
        error: function (jqXHR, estado, error) {
        }
    });
}



$(document).on("dblclick", "#datapedidospendientes tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(1)").text();

    console.log(doc)
    var num_cliente = $fila.find("td:nth-child(3)").text();
    var cliente = $fila.find("td:nth-child(4)").text();
    var estado = $fila.find("td:nth-child(10)").text();

    $("#lista_cotizacion tbody tr").removeClass("fila-resaltada"); // Quitar clase de fila resaltada de todas las filas
    $fila.addClass("fila-resaltada");


    $("#modal_id_botones").modal("show");
    // $("#modal_registrar_evidencia").modal("show");
    $("#docito").val(doc);
    $("#num_cliente").val(num_cliente).css("font-size", "12px");
    $("#CLIENTE").val(cliente).css("font-size", "12px");
    $("#ESTADO").val(estado).css("font-size", "12px");

    $("#docito_Modal").val(doc).css("font-size", "12px");
    $("#docentry_Modal").val(doc).css("font-size", "12px");
    $("#docentry_Modal_OC").val(doc).css("font-size", "12px");
    $("#docito_Modal_oc").val(doc).css("font-size", "12px");
    $("#docito_Modal_guia").val(doc).css("font-size", "12px");

    // $("#docentry_Modal").val(doc);


    setTimeout(() => {
        // consultar_boton(doc);
        // consultar_boton2();
    }, 500);
});





function busca_detalle_cotizacion() {
    id = $("#docito").val();

    $("#modal_det_cotizacion").modal("show");

    $("#idpedido").val(id);
    $.ajax({
        url: "det_pedidos_migrados.php",

        type: "POST",
        data: "id=" + id,
        success: function (x) {
            $(".nuticket").html("");
            $(".nuticket").append(
                "Detalle | <span class='label label-warning'>Ticket: " +
                id +
                "</span>"
            );
            $("#pagos_realizados").html(x);

        },
        error: function (jqXHR, estado, error) { },
    });
}


