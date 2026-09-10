function pone_lista_usuarios() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_users").html("Recuperando usuarios...");
            },
            url: 'consulta_personal.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_users").html(x);
                $("#tabla_users").DataTable();
            },
            error: function (jqXHR, estado, error) { }
        });
    });
}
function activar_usuario(codigo) {
    var id2 = codigo;
    console.log(codigo)
    alertify.confirm('Activar', 'Desea Activar?', function (E) {

        activar_usuario_2(id2);
        // alertify.success('Activado') ;


    }, function () { alertify.error('Cancelado') });
    //  var bool=confirm("Seguro de eliminar el dato?");
}
/*******************************************************************************************/
function activar_usuario_2(id) {
    var item = id;
    $(document).ready(function () {

        $.post("activar_usuario.php",
            { item: item },
            function (data) {
                pone_lista_usuarios()
                $("#lista_scaneo6").html(data);
                alertify.success('El Usuario fue ACTIVADO correctamente.');
            });
    });


}
function dar_baja(codigo) {
    var id2 = codigo;
    console.log(codigo)
    alertify.confirm('Eliminar', 'Desea Eliminar?', function (E) {

        dar_baja_2(id2);
        // alertify.success('Eliminado') ;


    }, function () { alertify.error('Cancelado') });
    //  var bool=confirm("Seguro de eliminar el dato?");
}
/*******************************************************************************************/
function dar_baja_2(id) {
    var item = id;
    $(document).ready(function () {

        $.post("dar_baja_personal.php",
            { item: item },
            function (data) {
                pone_lista_usuarios()
                $("#lista_scaneo6").html(data);
                alertify.error('El Usuario fue dado de BAJA correctamente.');
            });
    });


}
function modificar_usuario(id) {
    var item = id;
    $('#modal_modificar').modal('show');
    $.post("busca_datos_personal.php",
        { item: item },
        function (data) {
            $("#dataxd").html(data);
            setTimeout(() => {
                
                document.getElementById("codigo_modi").value = $("[name='codi']").text().trim();


                document.getElementById("nombre_modi").value = $("[name='nomi']").text().trim();
               
                lista_departa_mod();
                lista_area_list();
            }, 500);

            
            setTimeout(() => {
                COD_DEP = $('#COD_DEP').text().trim();
                $('#departamento_modi').val(COD_DEP).trigger('change.select2');

                COD_AREA = $('#COD_AREA').text().trim();
                $('#area_modi').val(COD_AREA).trigger('change.select2');

            }, 1000);
         

        });

}

function modificar_datos() {
    codigo = document.getElementById("codigo_modi").value;
    nombre = document.getElementById("nombre_modi").value;
    // tipo = document.getElementById("tipo_modi").value;
    // bodega = document.getElementById("bodega_modi").value;
    // vendedor = $("#pone_vendedores1 select").val();
    departamento = $("#dep_modi option:selected").val();
    area = $("#area_modi option:selected").val();


    $.post("modificar_datos_personal.php",
        {nombre: nombre, departamento: departamento, area: area, codigo:codigo },
        function (data) {
            pone_lista_usuarios()
            $("#lista_scaneo6").html(data);
            alertify.success('Los datos fueron actualizados correctamente.');
        });
}
function mostrarContrasena() {
    var tipo = document.getElementById("pass_reg");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}


function lista_departa() {
    $.ajax({
        beforeSend: function () {
            $("#pone_departamento").html("Recuperando Lista ...");
        },
        url: "lista_departament.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#pone_departamento").html(x);
            $(".select2").select2();


        },
        error: function (jqXHR, estado, error) { },
    });
}




function lista_departa_mod() {
    $.ajax({
        beforeSend: function () {
            $("#dep_modi").html("Recuperando Lista ...");
        },
        url: "lista_departament_modi.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#dep_modi").html(x);
            $(".select2").select2();


        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_area_modi(valor) {
    console.log("Valor seleccionado:", valor);


    $.ajax({
        url: 'listar_area_modi.php',
        type: 'POST',
        data: { valor: valor },
        success: function (x) {
            $("#area_modi").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}


function lista_area_list() {
  


    $.ajax({
        url: 'listar_area_lista.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#area_modi").html(x);
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
            $("#pone_area").html(x);
            $(".select2").select2();
        },
        error: function () {
            alert('Error al cargar subcategorías');
        }
    });
}




function reg_usu(id) {

    $("#modal_registrar").modal("toggle");
    document.getElementById("cod_oass").value = id;
    lista_departa();
}

function registrar_datos() {
    codigo = document.getElementById("codigo_reg").value;
    nombre = document.getElementById("nombre_reg").value;
    departamento = $("#pone_departamento option:selected").val();
    area = $("#pone_area option:selected").val();
    bandera = true;

    if (nombre === '') {
        alertify.error('Nombre vacio');
        bandera = false;
    }

    // if (codigo === '') {
    //     alertify.error('Codigo vacio');
    //     bandera = false;
    // }

    if (departamento === '0') {
        alertify.error('Seleccione departamento');
        bandera = false;
    }

    if (bandera === true) {
        $.post("registrar_datos_personal.php",
            { codigo: codigo, nombre: nombre, departamento: departamento, area: area },
            function (data) {
                alertify.success('El personal se registró correctamente.');
                $("#modal_registrar").modal("hide");
                $("#codigo_reg").val("");
                $("#nombre_reg").val("");
                pone_lista_usuarios();
            });
    }

}
function cambiar_pass(id) {
    $('#modal_pass').modal('show');
    document.getElementById("cod_oass").value = id
}
function cambiar_pass2() {
    codigo = document.getElementById("cod_oass").value
    pass2 = document.getElementById("pass2").value;
    pass3 = document.getElementById("pass3").value;
    if (pass2 === pass3) {
        $.post("modificar_pass_usu.php",
            { pass2: pass2, codigo: codigo },
            function (data) {
                alertify.success('La Contraseña fue actualizada correctamente.');
            });
    } else {
        alertify.error('No coinciden contraseñas');
    }

    //
}

function lista_vendedores() {
    $(document).ready(function () {

        $.ajax({
            beforeSend: function () {
                $("#pone_vendedores").html("Recuperando proveedores...");
            },
            url: 'pone_vendedores_cartera2.php',
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

function lista_vendedores2() {
    $(document).ready(function () {

        $.ajax({
            beforeSend: function () {
                $("#pone_vendedores1").html("Recuperando proveedores...");
            },
            url: 'pone_vendedores_cartera2.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_vendedores1").html(x);

                $(".select2").select2();

                $("#pone_vendedores1 select").val('-1').trigger('change.select2');

            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}
