function reg_activo() {
    $('#modal_registrar').modal('show');
}
function registrar_datos() {
    cod_admin = document.getElementById('cod_admin_activo').value;
    ne = document.getElementById('ne_activo').value;
    te = $("#te_activo option:selected").val(); //tipo
    subte = $("#te_sub_activo option:selected").val(); //sub tipo
    empresa_activo = $("#empresa_activo option:selected").val(); 
    tipo = $("#tipo_activo option:selected").val().trim();
    sede = $("#sede_activo option:selected").val().trim();
    codigo = document.getElementById('cod_activo2').value;
    codigo_barra = document.getElementById('cod_barra_activo').value;
    descripcion = document.getElementById('desc_activo').value;
    marca = document.getElementById('marca_activo').value;
    modelo = document.getElementById('modelo_activo').value;
    sn = document.getElementById('sn_activo').value;
    id_departamento = $("#id_departamento option:selected").val(); 
    id_area = $("#id_area option:selected").val(); 
    if (cod_admin === "") {
        alertify.error('Falta codigo administrativo');
    }
    if (tipo === "Seleccione") {
        alertify.error('Falta elegir la maquina');
    }
    if (te === "0") {
        alertify.error('Falta elegir tipo de equipo');
    }

    if (sede === "Seleccione") {
        alertify.error('Falta elegir la maquina');
    }
    if (codigo_barra === "") {
        alertify.error('Falta el codigo de barra');
    }
    if (descripcion === "") {
        alertify.error('Falta elegir la descripcion');
    }
    if (marca === "") {
        alertify.error('Falta elegir la marca');
    }
    if (modelo === "") {
        alertify.error('Falta elegir el modelo');
    }
    if (sn === "") {
        alertify.error('Falta el numero de serie');
    }

    if (id_departamento === "0") {
        alertify.error('Seleccione departamento');
    }


    if (cod_admin !== "" && tipo !== "Seleccione" && codigo_barra !== "" && descripcion !== "" && marca !== "" && modelo !== "" && sede !== "Seleccione") {

        $(document).ready(function () {

            $.post("registrar_equipo_activo.php", { cod_admin: cod_admin, tipo: tipo, codigo: codigo, descripcion: descripcion, marca: marca, modelo: modelo, codigo_barra: codigo_barra, sn: sn, ne: ne, te: te, sede: sede, subte: subte , empresa_activo:empresa_activo, id_departamento:id_departamento, id_area:id_area},
                function (data2) {
                    console.log('hola');
                    $('#modal_registrar').modal('hide');

                    Swal.fire({
                        icon: "success",
                        title: "Activo registrada",
                        text: `Se ha insertado el Activo con éxito`,
                        timer: 1200,
                        showConfirmButton: false
                    });
                    //$("#cod_activo2").val() = parseInt(parseInt($("#cod_activo2").val())+1)
                    codigo_dat();
                    //pone_lista_evento()
                    limpiar_campos();
                    pone_lista_activo();
                    pone_lista_activo2();
                    pone_lista_activo3();
                });
        });
    }
}

function limpiar_campos() {
    document.getElementById('cod_admin_activo').value = '';
    document.getElementById('ne_activo').value = '';
    document.getElementById('te_activo').value = '';
    $('#tipo_activo').val('').trigger('change.select2');
    $('#sede_activo').val('').trigger('change.select2');
    document.getElementById('cod_barra_activo').value = '';
    document.getElementById('desc_activo').value = '';
    document.getElementById('marca_activo').value = '';
    document.getElementById('modelo_activo').value = '';
    document.getElementById('sn_activo').value = '';
}

function modificar_activo(id, value) {


    $('#modal_modificar').modal('show');
    lista_categoria_modi();
    lista_subcategoria_m();
    lista_departa_mod();
    lista_area_list();


    document.getElementById('cod_activo_modi').value = id;


    $(document).ready(function () {
        $.post("consulta_activo_datos2.php", { codigo: id },
            function (data2) {
                $("#datos-det2").html(data2);
                document.getElementById('cod_admin_modifi').value = $("[name='codigo_admin_modi']").text().trim();

                document.getElementById('codigo_com_modifi').value = $("[name='CODIGO_COM_MODI']").text().trim();


                document.getElementById('ne_modifi').value = $("[name='nombre_equipo_modi']").text().trim();
                document.getElementById('cod_barra_modifi').value = $("[name='codigo_barra_modi']").text().trim();
                document.getElementById('desc_modifi').value = $("[name='descripcion_modi']").text().trim();
                document.getElementById('marca_modifi').value = $("[name='marca_modi']").text().trim();
                document.getElementById('sn_modifi').value = $("[name='numero_serie_modi']").text().trim();
                document.getElementById('modelo_modifi').value = $("[name='modelo_modi']").text().trim();
                // document.getElementById('te_modifi').value = $("[name='tipo_equipo_modi']").text().trim();


                te_modi = $('#tipo_modi').text().trim();
                $('#tipo_modifi').val(te_modi).trigger('change.select2');
                se_modi = $("[name='sede_modi']").text().trim();
                $('#sede_modifi').val(se_modi).trigger('change.select2');

                AREA = $("[name='AREA']").text().trim();
                $('#area_modi').val(AREA).trigger('change.select2');

                DEPARTAMENTO = $("[name='DEPARTAMENTO']").text().trim();
                $('#departamento_modi').val(DEPARTAMENTO).trigger('change.select2');

                setTimeout(() => {
                    tipo_equipo_modi = $('#tipo_equipo_modi').text().trim();
                    $('#categoria_modi').val(tipo_equipo_modi).trigger('change.select2');


                    sub_tipo_equipo_modi = $('#sub_tipo_equipo_modi').text().trim();
                    $('#sub_categoria_modi').val(sub_tipo_equipo_modi).trigger('change.select2');

                    console.log(tipo_equipo_modi);
                    console.log(sub_tipo_equipo_modi);

                }, 500);
            });
    });

}
function modificar_datos() {
    cod_admin = document.getElementById('cod_admin_modifi').value;
    ne = document.getElementById('ne_modifi').value;
    // te = document.getElementById('te_modifi').value;
    te = $("#te_modifi option:selected").val();
    subte = $("#sub_te_modifi option:selected").val();

    tipo = $("#tipo_modifi option:selected").val().trim();
    codigo = document.getElementById('cod_activo_modi').value;
    codigo_barra = document.getElementById('cod_barra_modifi').value;
    descripcion = document.getElementById('desc_modifi').value;
    marca = document.getElementById('marca_modifi').value;
    modelo = document.getElementById('modelo_modifi').value;
    sn = document.getElementById('sn_modifi').value;
    sede = $("#sede_modifi option:selected").val().trim();

    id_departamento_modi = $("#id_departamento_modi option:selected").val();
    id_area_modi = $("#id_area_modi option:selected").val();


    if (cod_admin === "") {
        alertify.error('Falta codigo administrativo');
    }
    if (tipo === "Seleccione") {
        alertify.error('Falta elegir la maquina');
    }
    if (codigo_barra === "") {
        alertify.error('Falta el codigo de barra');
    }
    if (descripcion === "") {
        alertify.error('Falta elegir la descripcion');
    }
    if (marca === "") {
        alertify.error('Falta elegir la marca');
    }
    /*  if (modelo ==="" ){
         alertify.error('Falta elegir el modelo');
     }
     if (sn ==="" ){
         alertify.error('Falta el numero de serie');
     } */
    if (cod_admin !== "" && tipo !== "Seleccione" && codigo_barra !== "" && descripcion !== "" && marca !== "") {

        $(document).ready(function () {

            $.post("modificar_equipo_activo.php", { cod_admin: cod_admin, tipo: tipo, codigo: codigo, descripcion: descripcion, marca: marca, modelo: modelo, codigo_barra: codigo_barra, sn: sn, ne: ne, te: te, sede: sede, subte: subte , id_departamento_modi:id_departamento_modi , id_area_modi:id_area_modi},
                function (data2) {
                    //console.log('hola');
                    Swal.fire({
                        title: "Modificado!",
                        text: "El equipo ha sido modificado correctamente.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        position: "center"
                    });


                    $('#modal_modificar').modal('hide');
                    pone_lista_activo();
                    //$("#cod_activo2").val() = parseInt(parseInt($("#cod_activo2").val())+1)
                    //codigo_dat();
                    //pone_lista_evento()



                });
        });
    }
}


function lista_departa() {
    $.ajax({
        beforeSend: function () {
            $("#id_departamento").html("Recuperando Lista ...");
        },
        url: "lista_departament.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#id_departamento").html(x);
            $(".select2").select2();


        },
        error: function (jqXHR, estado, error) { },
    });
}



function lista_departa_mod() {
    $.ajax({
        beforeSend: function () {
            $("#id_departamento_modi").html("Recuperando Lista ...");
        },
        url: "lista_departament_modi.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#id_departamento_modi").html(x);
            $(".select2").select2();


        },
        error: function (jqXHR, estado, error) { },
    });
}



function lista_area_list() {
  


    $.ajax({
        url: 'listar_area_lista.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#id_area_modi").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}



function lista_area_modi(valor) {
    console.log("Valor seleccionado:", valor);


    $.ajax({
        url: 'listar_area_modi.php',
        type: 'POST',
        data: { valor: valor },
        success: function (x) {
            $("#id_area_modi").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}




function lista_area(valor) {
    console.log("Valor seleccionado:", valor);


    $.ajax({
        url: 'listar_area.php',
        type: 'POST',
        data: { valor: valor },
        success: function (x) {
            $("#id_area").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}



function codigo_dat() {

    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#cod_activo").html("Recuperando proveedores...");
            },
            url: 'consulta_equipo_cod.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#cod_activo").html(x);
                document.getElementById('cod_activo2').value = $("[name='cod_prinxd']").text().trim();

                document.getElementById('cod_admin_activo').value = $("[name='cod_prinxd']").text().trim();
                console.log($("#cod_activo"));

                lista_categoria();
                lista_departa();
            },
            error: function (jqXHR, estado, error) { }
        });

    });

}
function codigo_dat_print() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#cod_activo").html("Recuperando proveedores...");
            },
            url: 'consulta_equipo_cod.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#cod_activo").html(x);
                document.getElementById('code_det').value = $("[name='cod_prinxd2']").text().trim();
                console.log($("#cod_activo"));
            },
            error: function (jqXHR, estado, error) { }
        });

    });

}
function reg_det_activo(id) {
    $('#modal_detalle').modal('show');
    document.getElementById('cod_prin_det').value = id
    $(document).ready(function () {
        $.post("consulta_activo_datos2.php", { codigo: id },
            function (data2) {
                $("#datos-det2").html(data2);
                document.getElementById('nequipo_det').value = $("[name='nombre_equipo_modi']").text().trim();
                se_modi = $("[name='sede_modi']").text().trim();
                $('#sede_det').val(se_modi).trigger('change.select2');
            });
    });


    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#usuario_det").html("Recuperando Lista ...");
            },
            url: "lista_usuariosp_2.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#usuario_det").html(x);
                $(".select2").select2();


            },
            error: function (jqXHR, estado, error) { },
        });
    });



}


function lista_categoria() {
    $.ajax({
        beforeSend: function () {
            $("#te_activo").html("Recuperando Lista ...");
        },
        url: "lista_cat_activos.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#te_activo").html(x);
            $(".select2").select2();


        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_categoria_modi() {
    $.ajax({
        beforeSend: function () {
            $("#te_modifi").html("Recuperando Lista ...");
        },
        url: "lista_cat_activos_modi.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#te_modifi").html(x);
            $(".select2").select2();


        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_subcategoria_m() {



    $.ajax({
        url: 'listar_subcategorias_modi.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#sub_te_modifi").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}




function lista_subcategoria_modi(valor) {
    console.log("Valor seleccionado:", valor);
    
    codigo = $("#codigo_com_modifi").val();

    $.ajax({
        url: 'listar_subcategorias.php',
        type: 'POST',
        data: { valor: valor },
        success: function (x) {
            $("#sub_te_modifi").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}


function lista_subcategoria(valor) {
    console.log("Valor seleccionado:", valor);


    $.ajax({
        url: 'listar_subcategorias.php',
        type: 'POST',
        data: { valor: valor },
        success: function (x) {
            $("#te_sub_activo").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}




function agregar_principal() {
    $('#modal_agregar_principal').modal('show');
}
function pone_lista_activo() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_activo").html("Recuperando proveedores...");
            },
            url: 'consulta_activo.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_activo").html(x);
                $("#tabla_activo").DataTable(
                    {
                        dom: '<"top"lBf>rt<"bottom"ip>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="fa fa-copy"></i> Copiar',
                                titleAttr: 'Copiar',
                                className: 'btn btn-copy'
                            }
                        ],
                    }
                );
            },
            error: function (jqXHR, estado, error) { }
        });
    });
}
function pone_lista_activo2() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_activo2").html("Recuperando proveedores...");
            },
            url: 'consulta_activo2.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_activo2").html(x);
                $("#tabla_activo2").DataTable(
                    {
                        dom: '<"top"lBf>rt<"bottom"ip>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="fa fa-copy"></i> Copiar',
                                titleAttr: 'Copiar',
                                className: 'btn btn-copy'
                            }
                        ],
                    }
                );
            },
            error: function (jqXHR, estado, error) { }
        });
    });
}
function pone_lista_activo3() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_activo3").html("Recuperando proveedores...");
            },
            url: 'consulta_activo3.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_activo3").html(x);
                $("#tabla_activo3").DataTable(
                    {
                        dom: '<"top"lBf>rt<"bottom"ip>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="fa fa-copy"></i> Copiar',
                                titleAttr: 'Copiar',
                                className: 'btn btn-copy'
                            }
                        ],
                    }
                );
            },
            error: function (jqXHR, estado, error) { }
        });
    });
}
function pone_lista_equipo_princial() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_equipo_principal").html("Recuperando proveedores...");
            },
            url: 'consulta_equipo_principal.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_equipo_principal").html(x);
                $("#tabla_equipo_principal").DataTable();
            },
            error: function (jqXHR, estado, error) { }
        });
    });
}
function agregar_dato_prin(id) {
    document.getElementById('cod_prin_det').value = id;
    $('#modal_agregar_principal').modal('hide');
}
function agregar_det_equipo() {
    $('#modal_agregar_detalle').modal('show');
}
function agregar_det_equipo2() {
    $('#modal_agregar_detalle2').modal('show');
}
function pone_lista_equipo_det() {
    $(document).ready(function () {
        cod = document.getElementById("cod_prin_det").value;
        $.ajax({
            beforeSend: function () {
                $("#lista_equipo_det").html("Recuperando proveedores...");
            },
            url: 'consulta_equipo_detalle.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_equipo_det").html(x);
                $("#tabla_equipo_det").DataTable();
            },
            error: function (jqXHR, estado, error) { }

        });

    });
}
function pone_lista_equipo_det2() {
    $(document).ready(function () {
        cod = document.getElementById("cod_prin_det").value;
        $.ajax({
            beforeSend: function () {
                $("#lista_equipo_det2").html("Recuperando proveedores...");
            },
            url: 'consulta_equipo_detalle.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_equipo_det2").html(x);
                $("#tabla_equipo_det").DataTable();
                $("#tablaSeleccionados tbody tr").remove();
            },
            error: function (jqXHR, estado, error) { }

        });

    });
}


function agregar_dato_det(id) {
    var $cod = [];
    var $des = [];
    var $tipo = [];

    $("[name='detallitos[]']:checked").each(function (key) {

        num = parseFloat(document.getElementById('detalle_prin').getElementsByTagName('tr').length - 1)
        real = parseFloat(num + 1);
        $cod = $(this).parents("tr").find('td:eq(2)').text();
        $des = $(this).parents("tr").find('td:eq(3)').text();
        $tipo = $(this).parents("tr").find('td:eq(6)').text();
        $(this).closest('tr').remove();
        $("#detalle_prin > tbody").append("<tr><td style='text-align:center'>" + real + "</td><td style='text-align:center'>" + $cod + "</td><td style='text-align:center'>" + $des + "</td><td style='text-align:center'>" + $tipo + "</td></tr>");
    });
    $('#modal_agregar_detalle').modal('hide');
}
function registrar_datos_cab() {
    cod = document.getElementById('code_det').value
    fecha = document.getElementById('fecha_det').value;
    cod_prin = document.getElementById('cod_prin_det').value;
    usuario = $("#usuario_det option:selected").val();
    departamento = document.getElementById('departamento_det').value;
    nequipo = document.getElementById('nequipo_det').value;
    observaciones = '';
    ubicacion = '';
    sede = $("#sede_det option:selected").val().trim();
    if (cod_prin === "") {
        alertify.error('Falta codigo principal');
    }
    if (fecha === "") {
        alertify.error('Falta fecha');
    }
    if (sede === "Seleccione") {
        alertify.error('Falta elegir la sede');
    }
    if (usuario === "") {
        alertify.error('Falta el usuario');
    }
    // if (departamento === "") {
    //     alertify.error('Falta el departamento');
    // }
    if (nequipo === "") {
        alertify.error('Falta el nombre de equipo');
    }

    if (cod_prin !== "" && sede !== "Seleccione" && usuario !== "" && nequipo !== "" && fecha !== "") {

        $(document).ready(function () {

            $.post("registrar_equipo_cab.php", { fecha: fecha, cod_prin: cod_prin, codigo: cod, usuario: usuario, departamento: departamento, nequipo: nequipo, observaciones: observaciones, sede: sede, ubicacion: ubicacion },
                function (data2) {
                    console.log('hola');

                    //$("#cod_activo2").val() = parseInt(parseInt($("#cod_activo2").val())+1)
                    codigo_dat_print();
                    //pone_lista_evento()

                    registrar_datos_det();

                    setTimeout(() => {
                        $('#modal_detalle').modal('hide');
                        pone_lista_activo();
                    }, 1000);
                });
        });
    }


}
function registrar_datos_det() {
    console.log('hola');
    cod = document.getElementById('code_det').value
    cod_prin = document.getElementById('cod_prin_det').value;
    fecha = document.getElementById('fecha_det').value;
    var codigo = [];
    var dsc = [];
    var tipo = [];
    $('#detalle_prin > tbody > tr').each(function () {
        $codigo_equipo = $(this).find('td').eq(1).html();
        $dsc = $(this).find('td').eq(2).html();
        $tipo = $(this).find('td').eq(3).html();
        $.post("registrar_equipo_det.php", {
            dsc: $dsc, tipo: $tipo, cod: cod, cod_prin: cod_prin, fecha: fecha, codigo_equipo: $codigo_equipo
        },
            function (data) {

            });
    });

}
function ver_detalle(id, value) {
    document.getElementById('codig_ver').innerText = value
    ver_detalle_det(id)
    $('#modal_ver').modal('show');
    $(document).ready(function () {
        $.post("consulta_activo_datos.php", { codigo: id },
            function (data2) {
                $("#datos-det").html(data2);
                document.getElementById('usuario_ver').value = $("[name='usuario_det']").text().trim();
                document.getElementById('nequipo_ver').value = $("[name='nombre_equipo_det']").text().trim();
                document.getElementById('cod_admin_ver').value = $("[name='codigo_admin_det']").text().trim();
                document.getElementById('cod_barra_ver').value = $("[name='codigo_barra_det']").text().trim();
                document.getElementById('desc_ver').value = $("[name='descripcion_det']").text().trim();
                document.getElementById('marca_ver').value = $("[name='marca_det']").text().trim();
                document.getElementById('modelo_ver').value = $("[name='modelo_det']").text().trim();
                document.getElementById('sn_ver').value = $("[name='numero_serie_det']").text().trim();
                document.getElementById('id_activo_cab_ver').value = $("[name='id_activo_cab']").text().trim();
                document.getElementById('id_equipo_ver').value = $("[name='id_equipo']").text().trim();
                document.getElementById('codigo_com').value = $("[name='CODIGO_COM']").text().trim();
            });
    });
}
function ver_detalle_det(id) {

    $(document).ready(function () {
        $.post("consulta_activo_datos_det.php", { codigo: id },
            function (data2) {
                $("#lista_det_activo").html(data2);
                $("#tabla_activo2").DataTable();
            });
    });
}

function liberar_equipo(id, value, name) {
    swal({
        title: "Liberar Equipo",
        text: "¿Desea liberar el equipo?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            liberar_equipo2(id, value, name);

            Swal.fire({
                title: "¡Liberado!",
                text: "El equipo ha sido liberado correctamente.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                position: "center"
            });
        } else {
            Swal.fire({
                title: "Cancelado",
                text: "La acción ha sido cancelada.",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
                position: "center"
            });
        }
    });
}

function liberar_equipo2(id, value, name) {
    $(document).ready(function () {
        $.post("liberar_activo_det.php", { codigo: id, value: value },
            function (data2) {
                ver_detalle_det(name)

            });
    });
}


function dar_baja_equipo(id, value, name) {
    swal({
        title: "Dar de baja Equipo",
        text: "¿Desea eliminar el activo?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.post("dar_baja_activo_det.php", { codigo: id, value: value }, function (data2) {
                ver_detalle_det(name);

                Swal.fire({
                    title: "Dado de baja",
                    text: "El equipo fue dado de baja correctamente.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "center"
                });
            });
        } else {
            Swal.fire({
                title: "Cancelado",
                text: "La acción ha sido cancelada.",
                icon: "info",
                timer: 1500,
                showConfirmButton: false,
                position: "center"
            });
        }
    });
}



// Detecta selección o deselección

$(document).on("change", "input[name='detallitos[]']", function () {
    const fila = $(this).closest("tr");

    // Si está seleccionado -> verde
    if ($(this).is(":checked")) {
        fila.css({
            "background-color": "LightGreen",  // verde suave
            "transition": "background-color 0.3s ease"
        });
    } else {
        fila.css({
            "background-color": "white",  // vuelve a blanco
            "transition": "background-color 0.3s ease"
        });
    }

    actualizarTablaSeleccionados();
});

function actualizarTablaSeleccionados() {
    const seleccionados = $("input[name='detallitos[]']:checked");
    const tbody = $("#tablaSeleccionados tbody");
    tbody.empty();

    seleccionados.each(function () {
        const fila = $(this).closest("tr");
        const idCheck = $(this).val(); // código o valor único
        const codigo = fila.find("td:eq(2)").text();
        const descripcion = fila.find("td:eq(3)").text();
        const marca = fila.find("td:eq(4)").text();
        const modelo = fila.find("td:eq(5)").text();
        const tipo = fila.find("td:eq(6)").text();

        const nuevaFila = `
        <tr data-id="${idCheck}">
          <td>${codigo}</td>
          <td>${descripcion}</td>
          <td>${marca}</td>
          <td>${modelo}</td>
          <td>${tipo}</td>
          <td style="text-align:center;">
            <button type="button" class="btn btn-danger btn-sm"  value="${codigo}" 
                  onclick="eliminarSeleccion('${codigo}')"  
                    title="Quitar">
              <i class="fa fa-times"></i>
            </button>
          </td>
        </tr>
      `;
        tbody.append(nuevaFila);
    });

    if (seleccionados.length === 0) {
        tbody.append(`<tr><td colspan="6" style="text-align:center;color:gray;">Sin selección</td></tr>`);
    }

    $("#tituloSeleccionados").text(`Seleccionados (${seleccionados.length})`);
}

// 🔹 Nueva función para eliminar ítem por código
function eliminarSeleccion(codigo) {
    // Buscar el checkbox en la tabla izquierda que tenga ese código
    $("input[name='detallitos[]']").each(function () {
        const fila = $(this).closest("tr");
        const codigoFila = fila.find("td:eq(2)").text().trim();
        if (codigoFila === codigo.trim()) {
            $(this).prop("checked", false); // desactiva el check

            fila.css({
                "background-color": "white",
                "transition": "background-color 0.3s ease"
            });
        }
    });

    // Quitar la fila de la tabla derecha
    $("#tablaSeleccionados tbody tr").each(function () {
        const codigoFila = $(this).find("td:eq(0)").text().trim();
        if (codigoFila === codigo.trim()) {
            $(this).fadeOut(150, function () {
                $(this).remove();
                actualizarTablaSeleccionados(); // actualiza contador y contenido
            });
        }
    });
}



// function dar_baja_equipo(id, value, name) {
//     $(document).ready(function () {
//         $.post("dar_baja_activo_det.php", { codigo: id, value: value },
//             function (data2) {
//                 ver_detalle_det(name)

//             });
//     });
// }


function agregar_dato_det2(id) {
    const seleccionados = $("[name='detallitos[]']:checked");

    // ✅ Validación previa antes del swal
    if (seleccionados.length === 0) {
        Swal.fire({
            title: "⚠️ Atención",
            text: "No hay ningún equipo seleccionado.",
            // icon: "warning",
            timer: 2000,
            showConfirmButton: false,
            position: "center"
        });
        return; // Detiene ejecución si no hay seleccionados
    }


    swal({
        title: "Agregar Datos",
        text: "¿Desea agregar los activos seleccionados?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {


            cod = document.getElementById('id_activo_cab_ver').value
            cod_prin = document.getElementById('id_equipo_ver').value
            fecha = document.getElementById('fecha_ver').value;
            var $codigo_equipo = [];
            var $dsc = [];
            var $tipo = [];
            //name = document.getElementById('id_activo_cab_ver').value
            $("[name='detallitos[]']:checked").each(function (key) {
                $codigo_equipo = $(this).parents("tr").find('td:eq(2)').text();
                $dsc = $(this).parents("tr").find('td:eq(3)').text();
                $tipo = $(this).parents("tr").find('td:eq(6)').text();
                $.post("registrar_equipo_det.php", {
                    dsc: $dsc, tipo: $tipo, cod: cod, cod_prin: cod_prin, fecha: fecha, codigo_equipo: $codigo_equipo
                },
                    function (data) {
                        setTimeout(() => {
                            ver_detalle_det(cod);
                        }, 1000);
                    });
            });
            $('#modal_agregar_detalle2').modal('hide');

            Swal.fire({
                title: "¡Agregado!",
                text: "Los equipos seleccionados fueron agregados.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                position: "center"
            });
        } else {
            Swal.fire({
                title: "Cancelado",
                text: "No se agregaron los activos.",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
                position: "center"
            });
        }
    });
}

function registrar_datos_det2() {
    console.log('hola');
}
function busca_activo() {
    $('#modal_buscar_cod').modal('show');
}
function busca_activo_detalle() {
    cod = document.getElementById('cod_buscar_det').value
    $.post("consultar_equipo_codebar.php", {
        cod: cod
    },
        function (data) {
            $("#detalle_de_act").html(data);
            //ver_detalle_det(name)
            va = $("#valor").text();
            va2 = $("#valor2").text();
            if (va == 1) {
                alertify.error('Codigo no existente');
            }
            if (va == 2) {
                alertify.error('Codigo no asignado');
            } else {
                busca_activo_detalle2(va, va2)
            }

        });
}
function busca_activo_detalle2(va, va2) {
    // console.log(va);
    $('#modal_buscar_cod2').modal('show');
    $.post("consultar_equipo_codebar2.php", { codigo: va, tipo: va2 },
        function (data2) {
            $("#prueba").html(data2);
        });
}

function asignar_usuario(id, value) {

    document.getElementById('codig_asig_us').innerText = value
    $('#modal_asig_usu').modal('show');
    $(document).ready(function () {
        $.post("consulta_activo_datos.php", { codigo: id },
            function (data2) {
                $("#datos-det").html(data2);
                //  document.getElementById('usuario_asig_us').value=$("[name='usuario_det']").text().trim();
                document.getElementById('nequipo_asig_us').value = $("[name='nombre_equipo_det']").text().trim();
                document.getElementById('cod_admin_asig_us').value = $("[name='codigo_admin_det']").text().trim();
                document.getElementById('cod_barra_asig_us').value = $("[name='codigo_barra_det']").text().trim();
                document.getElementById('desc_asig_us').value = $("[name='descripcion_det']").text().trim();
                document.getElementById('marca_asig_us').value = $("[name='marca_det']").text().trim();
                document.getElementById('modelo_asig_us').value = $("[name='modelo_det']").text().trim();
                document.getElementById('sn_asig_us').value = $("[name='numero_serie_det']").text().trim();
                document.getElementById('id_activo_cab_asig_us').value = $("[name='id_activo_cab']").text().trim();
                document.getElementById('id_equipo_asig_us').value = $("[name='id_equipo']").text().trim();
            });
    });

    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#usuario_asig_us").html("Recuperando Lista ...");
            },
            url: "lista_usuariosp_2.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#usuario_asig_us").html(x);
                $(".select2").select2();


            },
            error: function (jqXHR, estado, error) { },
        });
    });




}

function asignar_nombre_usuario() {
    usuario = $("#usuario_asig_us option:selected").val();
    nombre_equipo = document.getElementById('codig_asig_us').innerText
    if (usuario === "") {
        alertify.error('Falta elegir la marca');
    }

    if (usuario !== "") {

        $(document).ready(function () {

            $.post("modificar_equipo_usuario.php", { usuario: usuario, nombre_equipo: nombre_equipo },
                function (data2) {
                    //console.log('hola');
                    Swal.fire({
                        title: "Modificado!",
                        text: "El usuario ha sido modificado correctamente.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        position: "center"
                    });

                    $('#modal_asig_usu').modal('hide');
                    pone_lista_activo();
                    //$("#cod_activo2").val() = parseInt(parseInt($("#cod_activo2").val())+1)
                    //codigo_dat();
                    //pone_lista_evento()
                });
        });
    }
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

function ver_ficha(id, value) {

    var ruta = "pdf_ficha_activos.php?id=" + id;

    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', '');
    });

    // $("#navegador").off('click').on('click', function () {
    //   window.open(ruta, '_blank');
    // });
    $("#navegador")
        .off("click")
        .on("click", function () {
            var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
            "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
            "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

            window.open(contenedorUrl, "_blank");
        });

    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    })
}