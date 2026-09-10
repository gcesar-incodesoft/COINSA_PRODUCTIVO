function lista_mercancia() {
    fi = $("#fi").val();
    ff = $("#ff").val();

    $.ajax({
        beforeSend: function () {
            $("#lista_mercaderia").html("Recuperando Lista ...");
        },
        url: "consultar_listado_mercancia.php",
        type: "POST",
        data: 
        "fi=" +
        fi +
        "&ff=" +
        ff,

        success: function (x) {
            $("#lista_mercaderia").html(x);
            $("#tabla_listado").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
}


function muestra_detalle_entradamercancia(id) {
    
    $("#modal_procesar").modal("show"); // abrir
    $.ajax({
        beforeSend: function () {
            
        },
        url: 'detalle_mercancia.php',
        type: 'POST',
        data: 'id=' + id,
        success: function (x) {
            $("#data_consumo").html(x);
            $('#tabla_detalle').DataTable(); 
        },
        error: function (jqXHR, estado, error) {
            $("#tabla_detalle").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}
