
function lista_grupo() {

    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_grupo").html("Recuperando proveedores...");
            },
            url: 'listar_grupo.php',
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
/////LISTA LOS SUB GRUPOS SEGUN EL GRUPO ELEGIDO
$(document).ready(function () {

    $("#lista_grupo ").on('change', function () {
        $("#lista_grupo  option:selected").each(function () {
            elegido = $(this).val();


            $.post("Listar_Sub_grupos.php",
                { grupo: elegido },
                function (data2) {
                    $("#lista_Subgrupo").html(data2);
                    $(".select2").select2();




                });


        });
    });
});




///////////////////
function busca_cliente() {

    ruc = $("#idruc").val();
    cantidadruc = $("#idruc").val().length;
    // document.getElementById('#consult').disabled = false;
    //alert(cantidadruc);


    if (cantidadruc>10 && cantidadruc<21) {
        $.ajax({
            beforeSend: function () {
                //alertify.notify("Cargando datos");
                var n = noty({
                    text: "CARGANDO DATOS...",
                    theme: 'relax',
                    layout: 'center',
                    type: 'warning',
                    timeout: 2000,
                   });

            },
            url: "post_ruc.php",
            type: "POST",
            dataType: 'json',
            data: { ruc: ruc },
            success: function (x) {
                console.log(x);
                
                if (x === 0) {
                    alertify.success("El usuario ya existe");
                } else {
                    valido = x.success;

                    razon = x.result.razon_social;

                    if (valido == 'false') {
                        alertify.error("error ruc no existe");
                        //  document.getElementById('#consult').disabled = true;
                    }
                    else {
                        // ruc=$("#idruc").val();
                        CODIGO = 'C' + ruc;
                        //    document.getElementById('#consult').disabled = true;
                        $("#idrazon").val(razon);
                        document.querySelector('#idrazon').innerText = razon;

                        $("#idcodigo").val(CODIGO);
                        document.querySelector('#idcodigo').innerText = CODIGO;

                    }

                }


            },
            error: function (jqXHR, estado, error) { },
        });
    } else {
        alertify.error("error ruc invalido");
    }
};



// funcion para validar el correo
function caracteresCorreoValido() {

    var email = $(idcorreo).val();
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false) {
        // $(div).hide().removeClass('hide').slideDown('fast');
        ///alert("error");

        alertify.error("error correo no valido");
        return false;
    } else {


        // $(div).hide().addClass('hide').slideDown('slow');
        //        $(div).html('');
        return true;
    }
}
/////////////////contacto
function modal_contacto() {

    $('#modal_contacto').modal('show');



}
function agrega_a_lista() {
    var datoscont = 1;



    correo = $('#idcorreo').val().toUpperCase();
    if (correo == '') {
        contact = $('#idcontacto').val().toUpperCase();
        nombre = $('#idNombre').val().toUpperCase();
        telefo = $('#idtele').val().toUpperCase();
       
        
        if (contact == '') {
            alertify.error("Agregar el IdContacto");
            datoscont++;
        }
        if (nombre == '') {
            alertify.error("Agregar un Nombre");
            datoscont++;

        }

        if (datoscont == 1) {

            $("#tabla_contactos > tbody").append("<tr><td class='center'>" + contact + "</td><td class='center'>" + nombre + "</td><td class='center'>" + telefo + "</td><td class='center' >" + correo + "</td><td class='center' ><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button></td></tr>");
            $('#modal_contacto').modal('hide');
            $('#idcontacto').val('');
            $('#idNombre').val('');
            $('#idtele').val('');
            $('#idcorreo').val('');

        }


    } else {
        var valido = caracteresCorreoValido();




        if (valido == true) {
            contact = $('#idcontacto').val().toUpperCase();
            nombre = $('#idNombre').val().toUpperCase();
            telefo = $('#idtele').val().toUpperCase();
       
            
            

            if (contact == '') {
                alertify.error("Agregar el IdContacto");
                datoscont++;
            }
            if (nombre == '') {
                alertify.error("Agregar un Nombre");
                datoscont++;

            }

            if (datoscont == 1) {
                $("#tabla_contactos > tbody").append("<tr><td class='center'>" + contact + "</td><td class='center'>" + nombre + "</td><td class='center'>" + telefo + "</td><td class='center' >" + correo + "</td><td class='center' ><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button></td></tr>");
                $('#modal_contacto').modal('hide');
                $('#idcontacto').val('');
                $('#idNombre').val('');
                $('#idtele').val('');
                $('#idcorreo').val('');
            }

        }
    }
}



$(document).on("click", ".delete", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();

});


/////
function socio_negocio() {

    var datos = 1;
    ruc = $('#idruc').val();
    idcodigo = $('#idcodigo').val();
    razon = $('#idrazon').val();
    grupo = $("#lista_grupo option:selected").val();
    subgrupo = $("#lista_Subgrupo option:selected").val();


    if (idcodigo == '' || razon == '') {

        alertify.error("Error Ingrese un ruc");
        datos++;
    }

    if (grupo == 'Seleccione') {
        alertify.error("Error Seleccione un grupo");
        datos++;
    }
    if (subgrupo == 'Seleccione') {
        alertify.error("Error Seleccione un sub grupo");
        datos++;
    }

    if (datos == 1) {
        var listaContacto = parseFloat(
            document.getElementById("tabla_contactos").getElementsByTagName("tr").length -
            1
        );
        if (listaContacto == 0) {
            var n = noty({
                text: "¿Deseas agregar sin contacto...?",
                theme: 'relax',
                layout: 'center',
                type: 'success',
                buttons: [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Si, Quiero!',
                        onClick: function ($noty) {

                            $("#modal_registrar_evi").modal({
                                show: true,
                                backdrop: 'static',
                                keyboard: false
                            });
                            $.post(
                                "insertar_socioNegocio.php",
                                {
                                    idruc: ruc, idcodigo: idcodigo,
                                    idrazon: razon,
                                    lista_grupo: grupo,
                                    lista_Subgrupo: subgrupo
                                },
                                function (data1) {
                                    docentry = parseInt(data1);
                    
                                    if (docentry == 0) {
                                        alertify.error("No inserto");
                                    } else {                    
                                    }
                    
                                });
                           

                            $noty.close();
                            alertify.success("Se registro correctamente");

                            $('#idruc').val('');
                            $('#idcodigo').val('');
                            $('#idrazon').val('');
                            $('#lista_grupo').val('');
                            $('#lista_Subgrupo').val('');
                            $('#tabla_contactos').val('');

                        }

                    },
                    {
                        addClass: 'btn btn-danger',
                        text: 'No, cancelar',
                        onClick: function ($noty) {
                            $('#modal_contacto').modal('show');
                            $noty.close();
                        }
                    }
                ]
            });

        }else {
            //$('#modal_contacto').modal('show');

            $.post(
                "insertar_socioNegocio.php",
                {
                    idruc: ruc, idcodigo: idcodigo,
                    idrazon: razon,
                    lista_grupo: grupo,
                    lista_Subgrupo: subgrupo
                },
                function (data1) {
                    docentry = parseInt(data1);
    
                    if (docentry == 0) {
                        alertify.error("No inserto");
                    } else {
                        $('#tabla_contactos > tbody > tr').each(function () {

                            var contact = $(this).find('td').eq(0).html();
                            var nombre = $(this).find('td').eq(1).html();
                            var telefo = $(this).find('td').eq(2).html();
                            var correo = $(this).find('td').eq(3).html();
            
            
                            $.post("insertar_tabla_socioN.php", {
                                docentry: docentry,
                                idcontacto: contact,
                                idNombre: nombre,
                                idtele: telefo,
                                idcorreo: correo,
            
                            },
            
            
                                function (data1) { }
                            );
                            alertify.success("Se registro correctamente");
                            $('#idruc').val('');
                            $('#idcodigo').val('');
                            $('#idrazon').val('');
                            $('#lista_grupo').val('');
                            $('#lista_Subgrupo').val('');
                            $('#tabla_contactos').val('');
                        });
    
                    }
    
                });
            
          


        }
        





    }



}