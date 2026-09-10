

function listar_Fabrincantes() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_Fabricantes").html("Recuperando proveedores...");
            },
            url: 'Lista_Fabricantes_multi.php',
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



function listar_grupo() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_grupo").html("Recuperando proveedores...");
            },
            url: 'Lista_grupos.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_grupo").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}


function listar_ProveedoresM() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_proveedores").html("Recuperando proveedores...");
            },
            url: 'lista_proveedores_multi.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_proveedores").html(x);
                $(".select2").select2();



            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}




function procesa_Busqueda(){
    proveedor = $("#lista_proveedores select").val();
    marca = $("#lista_Fabricantes select").val();
    grupo = $("#lista_grupo select").val();
    selec = $("#estado_1 option:selected").val();
    fechai = $("#fechai2").val();
    fechaf = $("#fechaf2").val();

    $.ajax({
        beforeSend: function () {
            $("#tabla_analisis").html("Recuperando proveedores...");
        },
        url: 'consulta_analisis_compra.php',
        type: 'POST',
        data: {
            proveedor:proveedor, 
            marca:marca,
            grupo:grupo,
            selec:selec,
            fechai:fechai, 
            fechaf:fechaf
        },
        success: function (x) {
            $("#tabla_analisis").html(x);
            $(".select2").select2();



        },
        error: function (jqXHR, estado, error) {
        }
    });


}