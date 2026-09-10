
function busca_Lista() {
    var fechai = $("#fechai").val();
    var fechaf = $("#fechaf").val();
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                swal_carga();

            },
            url: 'Lista_control_alma.php',
            type: 'POST',
            data: { fechai, fechaf },
            success: function (x) {

                // Retrasar el cierre del Swal 1.5 segundos
                setTimeout(() => {
                    swal.close();
                    $("#data_PRECIO").html(x);
                    $("#tabla_listado").DataTable({
                        ordering: false, // Habilita el ordenamiento global

                    });

                }, 1500); // Retraso de 1.5 segundos
            }

        });
    });
}

function busca_Lista_finalizados() {
    var fechai = $("#fechai2").val();
    var fechaf = $("#fechaf2").val();
    var cliente = $("#lista_clients option:selected").val();

    $.ajax({
        beforeSend: function () {
            swal_carga()
        },
        url: 'Lista_control_alma_finalizados.php',
        type: 'POST',
        data: { fechai, fechaf, cliente },
        success: function (x) {
            setTimeout(function () {
                swal.close();
                $("#tabla_finalizados").html(x);

                var table = $("#tabla_listado_finalizados").DataTable({

                });

                $("#tabla_listado_finalizados thead tr").clone(true).appendTo("#tabla_listado_finalizados thead");
                $("#tabla_listado_finalizados thead tr:eq(0) th").hide();

                $("#tabla_listado_finalizados thead tr:eq(1) th").each(function (i) {
                    if (i == 2) {
                        var $th = $(this);
                        filter($th, table, i);
                    }
                });

                // Botón para mostrar todos
                $("#mostrar-todos").on("click", function () {
                    $('#tabla_listado_finalizados').DataTable().column(5).search("").draw();
                });


                $("#tabla_listado_finalizados").DataTable();

            }, 1500);
        }
    });
}



function busca_Lista_finalizados_new() {
    var fechai = $("#fechai2_new").val();
    var fechaf = $("#fechaf2_new").val();
    var cliente = $("#lista_clients_new option:selected").val();

    $.ajax({
        beforeSend: function () {
            swal_carga()
        },
        url: 'Lista_control_alma_finalizados_new.php',
        type: 'POST',
        data: { fechai, fechaf, cliente },
        success: function (x) {
            setTimeout(function () {
                swal.close();
                $("#tabla_finalizados_new").html(x);

                var table = $("#tabla_listado_finalizados_new").DataTable({

                });

                $("#tabla_listado_finalizados_new thead tr").clone(true).appendTo("#tabla_listado_finalizados_new thead");
                $("#tabla_listado_finalizados_new thead tr:eq(0) th").hide();

                $("#tabla_listado_finalizados_new thead tr:eq(1) th").each(function (i) {
                    if (i == 2) {
                        var $th = $(this);
                        filter($th, table, i);
                    }
                });

                // Botón para mostrar todos
                $("#mostrar-todos").on("click", function () {
                    $('#tabla_listado_finalizados_new').DataTable().column(5).search("").draw();
                });


                $("#tabla_listado_finalizados_new").DataTable();

            }, 1500);
        }
    });
}




$(document).on("dblclick", "#tabla_listado_finalizados_new tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(1)").text();
    var emp = $fila.find("td:nth-child(2)").text();
    var oc = $fila.find("td:nth-child(8)").text();

    var sap = $fila.find("td:nth-child(6)").text();
    var guia = $fila.find("td:nth-child(17)").text().trim();
    var cliente = $fila.find("td:nth-child(9)").text();
    var estado = $fila.find("td:nth-child(10)").text();
    var idestado = $fila.find("td:nth-child(11)").text();
    var nom_despacho = $fila.find("td:nth-child(13)").text();
    var alistado = $fila.find("td:nth-child(14)").text();
    var usuario = $fila.find("td:nth-child(15)").text();
    var nombre_usuario = $fila.find("td:nth-child(16)").text();

    console.log("doc:" + doc);
    console.log("emp:" + emp);
    console.log("sap:" + sap);
    console.log("guia:" + guia);
    console.log("cliente:" + cliente);
    console.log("estado:" + estado);
    console.log("idestado:" + idestado);
    console.log("oc:" + oc);

    setTimeout(() => {
        $("#modal_id_botones_finalizados").modal("show");
        $("#generar_rotulo").hide();
        $("#btn_cierre_pedido").hide();
        $("#btn_alista").hide();
        $("#button_ad1").hide();
        $("#button_ad").hide();
        $("#button_ad2").show();
        $("#btn_det_entrega").show();

    }, 500);
    $("#docito_despa_fin").val(doc);
    $("#NUM_SAP_despa_fin").val(sap);
    $("#NUM_GUIA_despa_fin").val(guia);
    $("#CLIENTE_despa_fin").val(cliente);
    $("#ESTADO_despa_fin").val(estado);
    $("#empresa_despa_fin").val(emp);
    $("#idESTADO_despa_fin").val(idestado);
    $("#OC_NAME5_fin").val(oc);
    $("#forma_despacho_fin").val(nom_despacho);
    $("#nombre_alistado_por").val(alistado);
    $("#usuario_sesion").val(usuario);
    $("#nombre_usuario_sesion").val(nombre_usuario);
    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    $("#docito_Modal_oc").val(doc);

    $("#docito_Modal_guia").val(doc);
    // $("#docentry_Modal").val(doc);




    setTimeout(() => {
        // consultar_boton();
        consultar_boton2();
    }, 500);
});




// function busca_Lista_finalizados_ulti() {
//     var fechai = $("#fechaiu").val();
//     var fechaf = $("#fechafu").val();
//     var cliente = $("#lista_clients_ulti option:selected").val();
//     // setTimeout(() => {
//     $.ajax({
//         beforeSend: function () {
//             swal_carga()
//         },
//         url: 'Lista_control_alma_ulti.php',
//         type: 'POST',
//         data: { fechai, fechaf, cliente },
//         success: function (x) {

//             // Retrasar el cierre del Swal 1.5 segundos
//             setTimeout(() => {
//                 swal.close();
//                 $("#tabla_finalizados_ulti").html(x);
//                 $("#tabla_ulti").DataTable();

//             }, 1500); // Retraso de 1.5 segundos
//         }

//     });
//     // }, 1000);
// }

function busca_Lista_Despachos() {
    var fechai = $("#fechai3").val();
    var fechaf = $("#fechaf3").val();
    var cliente = $("#lista_clientes option:selected").val();
    setTimeout(() => {
        $.ajax({
            beforeSend: function () {
                swal_carga()
            },
            url: 'Lista_control_alma_despachados.php',
            type: 'POST',
            data: { fechai, fechaf, cliente },
            success: function (x) {
                swal.close();
                $("#tabla_Despachados").html(x);
                //  $("#tabla_listado_despachados").DataTable();


            }

        });
    }, 1200);

}



function busca_Lista_programados() {
    // var fechai = $("#fechaip").val();
    // var fechaf = $("#fechafp").val();
    // var cliente = $("#lista_clientespr option:selected").val();


    $.ajax({
        beforeSend: function () {
            swal_carga()
        },
        url: 'Lista_control_alma_programados.php',
        type: 'POST',
        // data: { fechai, fechaf, cliente },
        data: null,

        success: function (x) {
            // Retrasar el cierre del Swal 1.5 segundos

            setTimeout(function () {
                $("#tabla_programados").html(x); // Cargar el contenido de la tabla
                swal.close(); // Cerrar el SweetAlert después del retraso

                // Inicializar DataTable después de cargar el contenido
                // $('#tabla_listado_progra').DataTable({
                //     "order": [] // Desactivar el orden predeterminado
                // });
            }, 1500); // Retraso de 1.5 segundos
        }

    });


}

function busca_listosDespachos() {
    // var fechai = $("#fechaip").val();
    // var fechaf = $("#fechafp").val();
    // var cliente = $("#lista_clientespr option:selected").val();

    setTimeout(() => {
        $.ajax({
            beforeSend: function () {
                swal_carga();
            },
            url: 'Lista_control_listoDespacho.php',
            type: 'POST',
            data: null,
            success: function (x) {

                // Retrasar el cierre del Swal 1.5 segundos
                setTimeout(() => {
                    swal.close();
                    $("#tabla_listosDespachos").html(x);
                    $(".select2").select2();
                    $("#tabla_listoDespa").DataTable({
                        autoWidth: false, // Desactiva el ancho automático predeterminado
                        // order: [[3, "asc"]],
                        pageLength: -1,
                        lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]]
                    });
                }, 1500); // Retraso de 1.5 segundos
            }

        });
    }, 1000);

}

function lista_conductor() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_conductor").html("Recuperando Lista ...");
            },
            url: "lista_conductor.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_conductor").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}


function lista_transportista() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_transportista").html("Recuperando Lista ...");
            },
            url: "listado_transportista.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_transportista").html(x);
                $(".select2").select2();

                const cardCode = $("#transportista").val();
                if (cardCode) {
                    lista_conductor_v2(cardCode);
                    lista_unidad_v2(cardCode);
                }
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}


$(document).on('change', '#transportista', function () {
    var cardCode = $(this).val();

    lista_conductor_v2(cardCode);
    lista_unidad_v2(cardCode);
});

function lista_conductor_v2(cardCode) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_conductor").html("Recuperando Lista ...");
            },
            url: "lista_conductorv2.php",
            type: "POST",
            data: {
                cardCode: cardCode
            },
            success: function (x) {
                $("#id_conductor").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_unidad_v2(cardCode) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_unidad").html("Recuperando Lista ...");
            },
            url: "lista_unidadv2.php",
            type: "POST",
            data: {
                cardCode: cardCode
            },
            success: function (x) {
                $("#id_unidad").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

function abrir_form_data() {
    codigo = $("#id_transportista option:selected").val();
    transportista = $("#id_transportista option:selected").text().trim();

    $("#modal_add_conductor").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
    });

    $("#codigo_cardcode").val(codigo)
    $("#razon_social_contacto").val(transportista)
}

function abrir_form_data_2() {
    codigo = $("#id_transportista option:selected").val();
    transportista = $("#id_transportista option:selected").text().trim();

    $("#modal_add_vehiculo").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
    });

    $("#codigo_cardcode_vehi").val(codigo)
    $("#razon_social_contacto_vehi").val(transportista)
}

function procesar_datos_contacto() {
    $(document).ready(function () {

        let errores = [];
        let camposIncompletos = [];

        let nombre = $("#contacto_nombre").val();
        let apellidos = $("#contacto_apellidos").val();
        let tipo_documento = $("#tipo_documento option:selected").val();
        let numero_documento = $("#numero_documento").val().trim();

        $(".error-input").removeClass("error-input");
        $(".error-box").removeClass("error-box");

        if (nombre.trim() === '') {
            errores.push("El nombre no puede estar vacío.");
            camposIncompletos.push("#contacto_nombre");
        }

        if (apellidos.trim() === '') {
            errores.push("El apeliido no puede estar vacío.");
            camposIncompletos.push("#contacto_apellidos");
        }

        if (numero_documento === '') {
            errores.push("El número de documento no puede estar vacío.");
            camposIncompletos.push("#numero_documento");
        } else {
            if (!/^\d+$/.test(numero_documento)) {
                errores.push("El número de documento debe contener solo números.");
                camposIncompletos.push("#numero_documento");
            }

            if (tipo_documento === "1" && numero_documento.length !== 8) {
                errores.push("El DNI debe tener exactamente 8 dígitos.");
                camposIncompletos.push("#numero_documento");
            }
        }

        if (errores.length > 0) {
            camposIncompletos.forEach(selector => {
                $(selector).addClass("error-input");
            });

            Swal.fire({
                title: "¡Campos incompletos o inválidos!",
                html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
                icon: "error",
                timer: 3000,
                showConfirmButton: false,
                toast: false,
                position: "center"
            });

            return false;
        }

        let band = true;
        ejecutarRegistroContacto(band);
    });
}

function ejecutarRegistroContacto(band) {

    cod_cliente = $("#id_transportista option:selected").val();

    if (!band) return; // Si 'band' es falso, no hace nada

    const nombreCompleto = $("#contacto_nombre").val().trim();
    const apellidosCompletos = $("#contacto_apellidos").val().trim();

    const primerNombre = nombreCompleto.split(" ")[0] || "";
    const primerApellido = apellidosCompletos.split(" ")[0] || "";

    let contactoData = {
        cardcode: $("#codigo_cardcode").val(),
        nombre: $("#contacto_nombre").val(),
        apellido: $("#contacto_apellidos").val(),
        licencia: "Q" + $("#numero_documento").val(),
        tipo_documento: $("#tipo_documento option:selected").val(),
        numero_documento: $("#numero_documento").val(),
        name: `${primerNombre} ${primerApellido}`
    }

    console.log("Conductor Generado:", contactoData);

    $.ajax({
        beforeSend: function () {
            Swal.fire({
                title: "Migrando Conductor a SAP...",
                html: '<div class="spinner"></div>',
                allowOutsideClick: false, // Evita que el usuario cierre la alerta
                showConfirmButton: false // No muestra botón de confirmación
            });
        },
        url: "server_layer_crear_conductor.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(contactoData),
        success: function (response) {

            console.log(JSON.stringify(contactoData));
            console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?

            try {
                let res = typeof response === "string" ? JSON.parse(response) : response;

                Swal.close();

                if (res.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Conductor registrado",
                        text: `Se ha insertado el Conductor con éxito.`,
                        timer: 2000,
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        $('#modal_add_conductor').modal('hide');
                        $("#contacto_nombre").val("")
                        $("#contacto_apellidos").val("")
                        $("#numero_documento").val("")

                        const cod_cliente = $("#id_transportista option:selected").val();
                        const nuevoConductor = contactoData.name;

                        $.ajax({
                            url: "lista_conductorv2.php",
                            type: "POST",
                            data: { cardCode: cod_cliente },
                            success: function (html) {
                                $("#conductor").html($(html).html());

                                $("#conductor option").filter(function () {
                                    return $(this).text().trim() === nuevoConductor;
                                }).prop("selected", true);

                                if ($("#conductor").data('select2')) {
                                    $("#conductor").trigger('change.select2');
                                }
                            },
                            error: function () {
                                console.error("Error al recargar la lista de conductores");
                            }
                        });
                    }, 1500);

                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.message || "Ocurrió un error desconocido",
                    });
                }
            } catch (error) {
                console.error("Error al procesar respuesta JSON:", error);
            }
        },

        error: function (jqXHR, estado, error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
                confirmButtonText: "Cerrar"
            });
            console.error("Error AJAX:", estado, error);
        }
    });
}

function procesar_datos_vehiculo() {
    $(document).ready(function () {

        let errores = [];
        let camposIncompletos = [];

        let placa = $("#placa_vehiculo").val().trim();
        let color = $("#color_vehiculo").val().trim();
        let marca = $("#marca_vehiculo").val().trim();
        let modelo = $("#modelo_vehiculo").val().trim();

        $(".error-input").removeClass("error-input");
        $(".error-box").removeClass("error-box");


        // 🔹 Placa: no vacía, solo letras y números, exactamente 6 caracteres
        if (placa === '') {
            errores.push("La placa no puede estar vacía.");
            camposIncompletos.push("#placa_vehiculo");
        } else if (!/^[A-Za-z0-9]+$/.test(placa)) {
            errores.push("La placa solo puede contener letras y números (sin espacios ni símbolos).");
            camposIncompletos.push("#placa_vehiculo");
        } else if (placa.length !== 6) {
            errores.push("La placa debe contener exactamente 6 caracteres.");
            camposIncompletos.push("#placa_vehiculo");
        }

        if (color === '') {
            errores.push("El campo Color no puede estar vacío.");
            camposIncompletos.push("#color_vehiculo");
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(color)) {
            errores.push("El campo Color solo puede contener letras.");
            camposIncompletos.push("#color_vehiculo");
        }

        if (marca === '') {
            errores.push("El campo Marca no puede estar vacío.");
            camposIncompletos.push("#marca_vehiculo");
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(marca)) {
            errores.push("El campo Marca solo puede contener letras.");
            camposIncompletos.push("#marca_vehiculo");
        }

        if (modelo === '') {
            errores.push("El campo Modelo no puede estar vacío.");
            camposIncompletos.push("#modelo_vehiculo");
        }

        if (errores.length > 0) {
            camposIncompletos.forEach(selector => {
                $(selector).addClass("error-input");
            });

            Swal.fire({
                title: "¡Campos incompletos o inválidos!",
                html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
                icon: "error",
                timer: 4000,
                showConfirmButton: false,
                toast: false,
                position: "center"
            });

            return false;
        }

        let band = true;
        ejecutarRegistroVehiculo(band);
    });
}

function ejecutarRegistroVehiculo(band) {

    cod_cliente = $("#id_transportista option:selected").val();

    if (!band) return; // Si 'band' es falso, no hace nada

    let placa = $("#placa_vehiculo").val().trim().toUpperCase();
    let nombre = placa.length >= 6
        ? placa.substring(0, 3) + "-" + placa.substring(3)
        : placa;

    let vehiculoData = {
        cardcode: $("#codigo_cardcode_vehi").val(),
        placa: $("#placa_vehiculo").val(),
        nombre: nombre,
        color: $("#color_vehiculo").val(),
        marca: $("#marca_vehiculo").val(),
        modelo: $("#modelo_vehiculo").val(),
    }

    console.log("Vehiculo Generado:", vehiculoData);

    $.ajax({
        beforeSend: function () {
            Swal.fire({
                title: "Migrando Vehiculo a SAP...",
                html: '<div class="spinner"></div>',
                allowOutsideClick: false, // Evita que el usuario cierre la alerta
                showConfirmButton: false // No muestra botón de confirmación
            });
        },
        url: "server_layer_crear_vehiculo.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(vehiculoData),
        success: function (response) {

            console.log(JSON.stringify(vehiculoData));
            console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?

            try {
                let res = typeof response === "string" ? JSON.parse(response) : response;

                Swal.close();

                if (res.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Vehiculo registrado",
                        text: `Se ha insertado el Vehiculo con éxito.`,
                        timer: 2000,
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        $('#modal_add_vehiculo').modal('hide');
                        $("#placa_vehiculo").val("");
                        $("#color_vehiculo").val("");
                        $("#marca_vehiculo").val("");
                        $("#modelo_vehiculo").val("");

                        const cod_cliente = $("#id_transportista option:selected").val();
                        const nuevaUnidad = vehiculoData.placa;

                        $.ajax({
                            url: "lista_unidadv2.php",
                            type: "POST",
                            data: { cardCode: cod_cliente },
                            success: function (html) {
                                $("#id_unidad").html(html);

                                $("#id_unidad select").select2();

                                $("#id_unidad select option").filter(function () {
                                    return $(this).text().trim() === nuevaUnidad;
                                }).prop("selected", true);

                                $("#id_unidad select").trigger('change.select2');
                            },
                            error: function () {
                                console.error("Error al recargar la lista de unidades");
                            }
                        });
                    }, 1500);

                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.message || "Ocurrió un error desconocido",
                    });
                }
            } catch (error) {
                console.error("Error al procesar respuesta JSON:", error);
            }
        },

        error: function (jqXHR, estado, error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
                confirmButtonText: "Cerrar"
            });
            console.error("Error AJAX:", estado, error);
        }
    });
}

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

function lista_conductor_moda() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_conductor_moda").html("Recuperando Lista ...");
            },
            url: "lista_conductor.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_conductor_moda").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_conductor_prepo() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_conductor").html("Recuperando Lista ...");
            },
            url: "lista_conductor.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_conductor_prepo").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_usuariosp() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_usuario_pedi").html("Recuperando Lista ...");
            },
            url: "lista_usuariosp.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_usuario_pedi").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function pon_almacen() {
    agencia = $("#id_agencia option:selected").val();

    $.ajax({
        beforeSend: function () {

        },
        url: "coloca_agencia.php",
        type: "POST",
        data: { agencia },
        success: function (x) {

            var data = x;
            var idcl = data.split("|");

            $("#id_emp").val(idcl[1]);
            $("#id_dir_trans").val(idcl[2]);

        },
        error: function (jqXHR, estado, error) { },
    });
}

function pon_almacen_pro2() {
    agencia = $("#id_agencia_pro option:selected").val();

    $.ajax({
        beforeSend: function () {

        },
        url: "coloca_agencia.php",
        type: "POST",
        data: { agencia },
        success: function (x) {

            var data = x;
            var idcl = data.split("|");

            $("#id_emp_pro").val(idcl[1]);
            $("#id_dir_trans_pro").val(idcl[2]);

        },
        error: function (jqXHR, estado, error) { },
    });
}

function pon_almacen_pro3() {
    agencia = $("#id_agencia_pro3 option:selected").val();

    $.ajax({
        beforeSend: function () {

        },
        url: "coloca_agencia.php",
        type: "POST",
        data: { agencia },
        success: function (x) {

            var data = x;
            var idcl = data.split("|");

            $("#id_emp_pro3").val(idcl[1]);
            $("#id_dir_trans_pro3").val(idcl[2]);

        },
        error: function (jqXHR, estado, error) { },
    });
}

function pon_almacen_fin() {
    agencia = $("#id_agencia_fin option:selected").val();

    $.ajax({
        beforeSend: function () {

        },
        url: "coloca_agencia.php",
        type: "POST",
        data: { agencia },
        success: function (x) {

            var data = x;
            var idcl = data.split("|");

            $("#id_emp_fin").val(idcl[1]);
            $("#id_dir_trans_fin").val(idcl[2]);

        },
        error: function (jqXHR, estado, error) { },
    });
}
function lista_agencia() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_agencia").html("Recuperando Lista ...");
            },
            url: "lista_agencias.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_agencia").html(x);
                $(".select2").select2();

                $("#modalidad_destino").prop("disabled", true);
                $("#moda_pago").prop("disabled", true);
                $("#agencia").prop("disabled", true);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_agencia_fin() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_agencia_fin").html("Recuperando Lista ...");
            },
            url: "lista_agencias_fin.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_agencia_fin").html(x);
                $(".select2").select2();

                $("#modalidad_destino_fin").prop("disabled", true);
                $("#moda_pago_fin").prop("disabled", true);
                $("#agencia_fin").prop("disabled", true);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}


function lista_agencia_pro4() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_agencia_pro4").html("Recuperando Lista ...");
            },
            url: "lista_agencias.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_agencia_pro4").html(x);
                $(".select2").select2();

                $("#id_moda_destino_pro4 select").prop("disabled", true);
                $("#id_moda_pago_pro4 select").prop("disabled", true);
                $("#id_agencia_pro4 select").prop("disabled", true);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_agencia_pro5() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_agencia_pro5").html("Recuperando Lista ...");
            },
            url: "lista_agencias.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_agencia_pro5").html(x);
                $(".select2").select2();

                $("#id_moda_destino_pro5 select").prop("disabled", true);
                $("#id_moda_pago_pro5 select").prop("disabled", true);
                $("#id_agencia_pro5 select").prop("disabled", true);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function lista_agencia_pro() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_agencia_pro").html("Recuperando Lista ...");
            },
            url: "lista_agencias_pro.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_agencia_pro").html(x);
                $(".select2").select2();

                $("#modalidad_destino").prop("disabled", true);
                $("#moda_pago").prop("disabled", true);
                $("#agencia").prop("disabled", true);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_agencia_pro3() {

    $.ajax({
        beforeSend: function () {
            $("#id_agencia_pro3").html("Recuperando Lista ...");
        },
        url: "lista_agencias2.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#id_agencia_pro3").html(x);
            $(".select2").select2();

            $("#modalidad_destino").prop("disabled", true);
            $("#moda_pago").prop("disabled", true);
            $("#agencia").prop("disabled", true);

            $("#pon_almacen_pro3").prop("disabled", true).trigger("change");


        },
        error: function (jqXHR, estado, error) { },
    });

}








function listado_estados(idestado) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_estados_cambiar").html("Recuperando Lista ...");
            },
            url: "lista_estados_cambios_1.php",
            type: "POST",
            data: { idestado },
            success: function (x) {
                $("#id_estados_cambiar").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function listado_estados_prepo(cod_estad) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function (cod_estad) {
                $("#id_estados_cambiar_prepo").html("Recuperando Lista ...");
            },
            url: "lista_estados_cambios_prepo.php",
            type: "POST",
            data: { cod_estad },
            success: function (x) {
                $("#id_estados_cambiar_prepo").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function listado_estados_prepo3(cod_estad) {
    console.log(cod_estad);

    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_estados_cambiar_prepo3").html("Recuperando Lista ...");
            },
            url: "lista_estados_cambios_2.php",
            type: "POST",
            data: { cod_estad },
            success: function (x) {
                $("#id_estados_cambiar_prepo3").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function listado_estados_prepo4(cod_estad) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_estados_cambiar_prepo3").html("Recuperando Lista ...");
            },
            url: "lista_estados_cambios_prepo_new.php",
            type: "POST",
            data: { cod_estad },
            success: function (x) {
                $("#id_estados_cambiar_prepo").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}


function listado_estados_despacho(cod_estad) {
    console.log(cod_estad);

    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_estados_cambiar_despa").html("Recuperando Lista ...");
            },
            url: "lista_estados_cambios_2.php",
            type: "POST",
            data: { cod_estad },
            success: function (x) {
                $("#id_estados_cambiar_despa").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}





function lista_cliente_tablero() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clients").html("Recuperando Lista ...");
            },
            url: "lista_cliente_tablero.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clients").html(x);
                $(".select2").select2();


                // Obtener la fecha actual
                var fechaActual = new Date();

                // Restar 5 días
                fechaActual.setDate(fechaActual.getDate() - 5);

                // Formatear la fecha en el formato YYYY-MM-DD
                var dia = fechaActual.getDate().toString().padStart(2, '0');
                var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
                var anio = fechaActual.getFullYear();

                var fecha5DiasAntes = dia + '-' + mes + '-' + anio;

                // Asignar la fecha al campo 'fechai2'
                $("#fechai2").val(fecha5DiasAntes);

                setTimeout(() => {
                    busca_Lista_finalizados();
                }, 1000);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}





function lista_cliente_tablero_new() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clients_new").html("Recuperando Lista ...");
            },
            url: "lista_cliente_tablero.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clients_new").html(x);
                $(".select2").select2();


                // Obtener la fecha actual
                var fechaActual = new Date();

                // Restar 5 días
                fechaActual.setDate(fechaActual.getDate() - 5);

                // Formatear la fecha en el formato YYYY-MM-DD
                var dia = fechaActual.getDate().toString().padStart(2, '0');
                var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
                var anio = fechaActual.getFullYear();

                var fecha5DiasAntes = dia + '-' + mes + '-' + anio;

                // Asignar la fecha al campo 'fechai2'
                $("#fechai2").val(fecha5DiasAntes);

                setTimeout(() => {
                    busca_Lista_finalizados_new();
                }, 1000);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}





function lista_cliente_ulti() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clients_ulti").html("Recuperando Lista ...");
            },
            url: "lista_cliente_ulti.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clients_ulti").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_clientes_tablero() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clientes").html("Recuperando Lista ...");
            },
            url: "lista_clientes_tablero.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clientes").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_Clientes_programados() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clientespr").html("Recuperando Lista ...");
            },
            url: "lista_clientes_progra.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clientespr").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}







function lista_unidad() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_unidad").html("Recuperando Lista ...");
            },
            url: "lista_unidad.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_unidad").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function lista_unidad_moda() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_unidad_moda").html("Recuperando Lista ...");
            },
            url: "lista_unidad.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_unidad_moda").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}






function lista_unidad_prepo() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_unidad").html("Recuperando Lista ...");
            },
            url: "lista_unidad.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_unidad_prepo").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}







function lista_modalidad_destino() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_destino").html("Recuperando Lista ...");
            },
            url: "lista_modalidad_destino.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_destino").html(x);
                // $("#id_moda_destino select");
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_modalidad_destino_fin() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_destino_fin").html("Recuperando Lista ...");
            },
            url: "lista_modalidad_destino.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_destino_fin").html(x);
                // $("#id_moda_destino select");
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_modalidad_destino_pro4() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_destino_pro4").html("Recuperando Lista ...");
            },
            url: "lista_modalidad_destino.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_destino_pro4").html(x);
                // $("#id_moda_destino select");
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}


function lista_modalidad_destino_pro5() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_destino_pro5").html("Recuperando Lista ...");
            },
            url: "lista_modalidad_destino.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_destino_pro5").html(x);
                // $("#id_moda_destino select");
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function lista_modalidad_destino_pro() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_destino_pro").html("Recuperando Lista ...");
            },
            url: "lista_modalidad_destino.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_destino_pro").html(x);
                // $("#id_moda_destino select");
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function lista_modalidad_destino_pro3() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_destino_pro3").html("Recuperando Lista ...");
            },
            url: "lista_modalidad_destino.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_destino_pro3").html(x);
                // $("#id_moda_destino select");
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_mod_pago() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_pago").html("Recuperando Lista ...");
            },
            url: "lista_mod_pago.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_pago").html(x);
                // $("#id_moda_pago  select");

                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_mod_pago_fin() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_pago_fin").html("Recuperando Lista ...");
            },
            url: "lista_mod_pago.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_pago_fin").html(x);
                // $("#id_moda_pago  select");

                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function lista_mod_pago_pro4() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_mod_pago_pro4").html("Recuperando Lista ...");
            },
            url: "lista_mod_pago.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_pago_pro4").html(x);
                // $("#id_moda_pago  select");

                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}
function lista_mod_pago_pro5() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_mod_pago_pro5").html("Recuperando Lista ...");
            },
            url: "lista_mod_pago.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_pago_pro5").html(x);
                // $("#id_moda_pago  select");

                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_mod_pago_pro() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_pago_pro").html("Recuperando Lista ...");
            },
            url: "lista_mod_pago.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_pago_pro").html(x);
                // $("#id_moda_pago  select");

                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_mod_pago_pro3() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_moda_pago_pro3").html("Recuperando Lista ...");
            },
            url: "lista_mod_pago.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_moda_pago_pro3").html(x);
                // $("#id_moda_pago  select");

                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}





function lista_ayudante() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_ayudante").html("Recuperando Lista ...");
            },
            url: "lista_ayudante.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_ayudante").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function lista_ayudante_moda() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_ayudante_moda").html("Recuperando Lista ...");
            },
            url: "lista_ayudante.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_ayudante_moda").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}





function lista_ayudante_prepo() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#id_ayudante").html("Recuperando Lista ...");
            },
            url: "lista_ayudante.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#id_ayudante_prepo").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}




function alista_pedido() {
    $('#modal_alista_pedido').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_alista_pedido").modal("show");


    var doc = $("#docito").val();
    var emp = $("#empresa").val();


    $("#doc_alista").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    $("#docentry_OC_subir").val(doc);

    consulta_datos();
    lista_usuariosp();
    consulta_empresa2(emp);

    $("#id_empresa2").val(emp);
}





function registrar_ruta_prepo() {
    fecha = $("#fecha_prepo").val();
    id_conductor = $("#id_conductor_prepo option:selected").val();
    id_ayudante = $("#id_ayudante_prepo option:selected").val();
    id_unidad = $("#id_unidad_prepo option:selected").val();
    docentry = $("#docito_asigna_ruta_prepo").val();
    empresa = $("#empresa2").val();
    tipo = 'S';
    var bandera = true;



    if (bandera === true) {



        $.ajax({
            beforeSend: function () { },
            url: "registrar_ruta.php",
            type: "POST",
            data:
                "docentry=" +
                docentry +
                "&fecha=" +
                fecha +
                "&id_conductor=" +
                id_conductor +
                "&id_ayudante=" +
                id_ayudante +
                "&id_unidad=" +
                id_unidad +
                "&empresa=" +
                empresa +
                "&tipo=" +
                tipo,
            success: function () {

                //console.log(global);
                // $("#num_tick_act").val(global);
                // $("#comentarios").val("");
                $("#modal_asignar_ruta_prepo").modal("hide");


                swal("Se registró correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });



            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }

}




const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("id_contra_pedi");

togglePassword.addEventListener("click", function () {
    // Cambiar el tipo de input entre 'password' y 'text'
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    // Cambiar el ícono entre ojo abierto y cerrado
    this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

function registrar_usuario_pedido() {
    contra_usuario = $("#id_contra_pedi").val();
    // contra_codigo = $("#id_contra_codi").val();
    empresa = $("#empresa").val();
    nombre_usuario = $("#id_usuario_pedi option:selected").text().trim();
    usuario_val = $("#id_usuario_pedi option:selected").val();
    var data = usuario_val.split("|");

    usuario = data[0];
    password = data[1];

    docentry = $("#doc_alista").val();

    bandera = true;


    if (contra_usuario != password) {
        bandera = false;
        alertify.error("Contraseña Incorrecta")

    }

    if (contra_usuario === "") {
        bandera = false;
        alertify.error("Ingresar Contraseña")
    }


    if (bandera === true) {
        $.ajax({
            url: "insertar_alista_pedidos.php",

            type: "POST",
            data: { docentry, usuario, nombre_usuario, empresa },
            success: function (x) {
                //console.log(x);

                x = x.replace(/\s+/g, "");


                if (x === "1") { // Verifica si la respuesta es "1"
                    $("#modal_alista_pedido").modal("hide");
                    $("#modal_id_botones").modal("hide");
                    $("#id_contra_pedi").val("");

                    swal("Se registró correctamente", {
                        icon: "success",
                        timer: 1000, // tiempo en milisegundos
                        buttons: false, // desactiva el botón para cerrar
                    });

                    setTimeout(() => {
                        impri_picking_fuera(docentry, empresa);
                    }, 2000);

                    busca_Lista();



                } else if (x === "0") { // Verifica si la respuesta es "0"
                    swal("Fallo en la inserción de datos", {
                        icon: "error",
                        timer: 1500, // tiempo en milisegundos
                        buttons: false, // desactiva el botón para cerrar
                    });
                    busca_Lista();
                } else {
                    swal("Respuesta inesperada", {
                        icon: "warning",
                        timer: 1500, // tiempo en milisegundos
                        buttons: false, // desactiva el botón para cerrar
                    });
                    busca_Lista();
                }
            },

            error: function (jqXHR, estado, error) { },
        });
    }

}


function Cerrar_pedido() {
    docentry = $("#docito").val();
    empresa = $("#empresa").val();

    swal({
        title: "Desea cerrar?",
        text: "Desea cerrar pedido ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            swal("Pedido Cerrado", {
                icon: "success",
                buttons: false,
                closeModal: true,
                timer: 2000,
            });

            cerrar_pedido(docentry, empresa);
        } else {
            swal("No se cerro");
        }
    });
}



function cerrar_pedido(docentry, empresa) {
    $.ajax({
        url: "cerrar_pedido.php",

        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            $("#modal_id_botones").modal("hide");
            busca_Lista();
        },
        error: function (jqXHR, estado, error) { },
    });


}



$(document).on("click", "#btn_progD", function () {
    $(".chkCheckBoxId").prop("disabled", false);
});




$(document).on("click", "#gen_peso", function () {
    let suma = 0;
    let cant = 0;
    let existe = true; // Para verificar si existe distrito

    // Recorremos los checkboxes seleccionados
    $("#gen_peso:checked").each(function () {
        let num = $(this).parents("tr").find("td:eq(10)").text();  // Obtener el valor numérico
        let distrito = $(this).parents("tr").find("td:eq(12)").text();  // Verificar si existe un distrito

        suma += parseFloat(num) || 0;  // Sumar el valor (si no es un número, se ignora)
        cant++;  // Contar la cantidad de checkboxes seleccionados

        // Si no hay distrito, poner la bandera
        if (distrito === 'NO') {
            existe = false;  // Si no hay distrito, marcar que no existe
        }
    });

    // Si no existe un distrito asignado, mostrar mensaje de error y desmarcar el checkbox
    // if (!existe) {
    //     alertify.error('No se asignó distrito de despacho');
    //     // Desmarcar el checkbox
    //     $("#gen_peso:checked").prop("checked", false);
    // }

    // Si hay al menos un checkbox seleccionado, habilitar el botón de asignar distrito
    $("#btn_dist").toggle(cant > 0);

    // Mostrar el campo de peso total y el botón de asignar
    $("#id_peso").show();
    $("#btn_asig").show();
    $("#pesoTotal").val(suma.toFixed(2));

    // Aquí vamos a aplicar la lógica para cambiar color y desbloquear los select2 de manera secuencial
    var checkedRows = $("#gen_peso:checked").parents("tr"); // Obtener las filas que tienen el checkbox marcado
    var i = 0;
    var interval = setInterval(function () {
        if (i < checkedRows.length) {
            var row = $(checkedRows[i]); // Fila actual
            row.find("td").css("background-color", "LightGreen");  // Cambiar el color de fondo
            row.find(".distri").prop("disabled", false).select2("enable", true);  // Habilitar select2 en la fila
            i++;
        } else {
            clearInterval(interval);  // Detener el intervalo cuando se hayan procesado todas las filas
        }
    }, 500);  // Intervalo de 500 ms entre cada fila, ajustable

    // Restaurar el estado original cuando el checkbox no está marcado
    $("#gen_peso:not(:checked)").each(function () {
        var row = $(this).parents("tr"); // Fila actual
        row.find("td").css("background-color", "white");  // Restaurar el color de fondo
        row.find(".distri").prop("disabled", true).select2("enable", false);  // Deshabilitar select2 en la fila
    });
});





function asignar_recorrido() {
    var checkedCount = $("#tabla_listoDespa #gen_peso:checked").length;

    console.log('entro');
    if (checkedCount === 0) {
        // Mostrar alerta de error si no hay ningún checkbox marcado
        alertify.error("Debe activar al menos un despacho.");
    } else {

        $("#gen_peso:checked").each(function () {
            var fila = $(this).closest('tr');
            var encontradoLightGreen = false; // Control para verificar LightGreen

            fila.find('td').each(function () {
                var bgColor = $(this).css("background-color");
                console.log("Color de fondo celda: " + bgColor); // Log para depurar

                // Verifica si el color es LightGreen (rgb(144, 238, 144))
                if (bgColor === "rgb(144, 238, 144)" && !encontradoLightGreen) {
                    console.log("Esta celda tiene fondo LightGreen.");
                    $('#modal_ruta_valido').modal({
                        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
                        keyboard: false     // Evita el cierre al presionar "Esc"
                    });
                    // Acciones relacionadas con LightGreen
                    $("#modal_ruta_valido").modal("show");
                    var valor = $("#pesoTotal").val();
                    lista_conductor_moda();
                    lista_ayudante_moda();
                    lista_unidad_moda();

                    $("#fecha_moda").val('');
                    $("#id_peso_moda").val(valor);

                    encontradoLightGreen = true; // Marca que ya encontramos LightGreen en esta fila
                }
            });

            // Si no se encontró LightGreen en toda la fila
            if (!encontradoLightGreen) {
                console.log("No se encontró ninguna celda con fondo LightGreen en esta fila.");
                alertify.error('Eliga Distrito de Destino');
            }
        });
    }
}




function registrar_ruta_moda() {
    fecha = $("#fecha_moda").val();
    id_conductor = $("#id_conductor_moda option:selected").val();
    id_ayudante = $("#id_ayudante_moda option:selected").val();
    id_unidad = $("#id_unidad_moda option:selected").val();
    if (condition) {

    }


    $.ajax({
        url: "numeracion_ruta.php",
        type: "POST",
        data: null,
        success: function (x) {

            console.log(x);
            //alertify.success('Se registro correctamente');
            global = parseInt(x);
            console.log(global);
            //aqui comienza el deta
            if (global == 0) {
                alertify.error("No inserto");
            } else {
                // $("#gen_peso:checked").each(function () {
                //     console.log('entro');

                //     var fila = $(this).closest('tr');

                //     // Verifica si el fondo de la fila es LightGreen
                //     var bgColor = fila.css("background-color");
                //     console.log(bgColor);


                //     // Verifica si el fondo es LightGreen en formato rgb
                //     if (bgColor === "rgb(144, 238, 144)" || bgColor === "LightGreen") {
                //         console.log('entro css');

                //         var doc = $(this).parents("tr").find('td:eq(1)').text();
                //         var empresa = $(this).parents("tr").find('td:eq(2)').text();


                //         $.ajax({
                //             beforeSend: function () { },
                //             url: "reg_ruta_pedidos.php",
                //             type: "POST",
                //             data:
                //                 "doc=" +
                //                 doc +
                //                 "&empresa=" +
                //                 empresa +
                //                 "&fecha=" +
                //                 fecha +
                //                 "&id_conductor=" +
                //                 id_conductor +
                //                 "&id_ayudante=" +
                //                 id_ayudante +
                //                 "&id_unidad=" +
                //                 id_unidad +
                //                 "&global=" +
                //                 global,
                //             success: function (data) {

                //                 $("#modal_ruta_valido").modal("hide"); //cerrar modal
                //                 //alertify.success('Se registro correctamente');

                //                 //bloquearCheckboxesSeleccionados();
                //                 //$('#tabla_insertar tbody').empty();
                //                 //resumen();

                //                 $($('#tabla_listosDespachos').find('tbody > tr')).children('td').children().prop('checked', false);
                //                 $($('#tabla_listosDespachos').find('tbody > tr')).children('td').css("background-color", "white");
                //                 //$('#btn-det').hide();
                //                 $('#btn_asig').hide();




                //             },

                //             error: function (jqXHR, estado, error) {

                //             },
                //         });
                //     }
                //     });

                $("#gen_peso:checked").each(function () {
                    var fila = $(this).closest('tr');
                    var encontradoLightGreen = false;
                    var encontradoAmarillo = false;

                    // Verifica cada celda dentro de la fila antes de hacer la llamada AJAX
                    fila.find('td').each(function () {
                        var bgColor = $(this).css("background-color");
                        console.log("Color de fondo celda: " + bgColor); // Log para depurar

                        // Verifica si el color es LightGreen (rgb(144, 238, 144))
                        if (bgColor === "rgb(144, 238, 144)" && !encontradoLightGreen) {
                            console.log("Esta celda tiene fondo LightGreen.");
                            encontradoLightGreen = true; // Marca que ya encontramos LightGreen en esta fila
                        }
                        // Verifica si el color es Amarillo (rgb(255, 255, 0))
                        else if (bgColor === "rgb(255, 255, 0)" && !encontradoAmarillo) {
                            console.log("Esta celda tiene fondo Amarillo.");
                            encontradoAmarillo = true; // Marca que ya encontramos Amarillo en esta fila
                        }
                        // Si no se encuentra LightGreen ni Amarillo
                        else if (bgColor !== "rgb(144, 238, 144)" && bgColor !== "rgb(255, 255, 0)") {
                            console.log("Esta celda no tiene fondo LightGreen ni Amarillo.");
                        }
                    });

                    // Solo ejecutamos AJAX si se encuentra LightGreen o Amarillo
                    if (encontradoLightGreen) {
                        var doc = fila.find('td:eq(1)').text();
                        var empresa = fila.find('td:eq(2)').text();

                        // Llamada AJAX
                        $.ajax({
                            url: "reg_ruta_pedidos.php",
                            type: "POST",
                            data: {
                                doc: doc,
                                empresa: empresa,
                                fecha: fecha,
                                id_conductor: id_conductor,
                                id_ayudante: id_ayudante,
                                id_unidad: id_unidad,
                                global: global
                            },
                            success: function (data) {
                                // Realiza la acción de éxito de AJAX
                                console.log("Datos enviados correctamente.");
                                $("#modal_ruta_valido").modal("hide"); // Cierra el modal
                                // window.location.reload();
                                busca_listosDespachos();

                                // Reinicia las celdas de color y los checkboxes
                                $($('#tabla_listosDespachos').find('tbody > tr')).children('td').children().prop('checked', false);
                                $($('#tabla_listosDespachos').find('tbody > tr')).children('td').css("background-color", "white");
                                $('#btn_asig').hide();
                            },
                            error: function (jqXHR, estado, error) {
                                console.error("Error en la solicitud AJAX: ", error);
                            }
                        });
                    }
                });


            }
        },
        error: function (jqXHR, estado, error) {
        }
    });
}





function datos_adicionales() {
    $('#modal_datos_adicionales').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_datos_adicionales").modal("show");

    var doc = $("#docito").val();

    $("#id_observaciones").val("");

    var emp = $("#empresa").val();
    $("#docito_adicionales").val(doc);
    $("#empresa_adicionales").val(emp);

    consulta_data_AD(doc);

    bloquearForm();
    lista_modalidad_destino();
    lista_mod_pago();
    lista_agencia();

    setTimeout(() => {
        consulta_data_AD_NEW(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";
}

function datos_adicionales_pediDespa() {
    $('#modal_datos_adicionales').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_datos_adicionales").modal("show");

    var doc = $("#docito_despa").val();

    $("#id_observaciones").val("");

    var emp = $("#empresa_despa").val();
    $("#docito_adicionales").val(doc);
    $("#empresa_adicionales").val(emp);

    consulta_data_AD(doc);

    bloquearForm();
    lista_modalidad_destino();
    lista_mod_pago();
    lista_agencia();

    setTimeout(() => {
        consulta_data_AD_NEW(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";


}

function datos_adicionales_finalizados() {
    // $('#modal_datos_adicionales').modal({
    //     backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    //     keyboard: false     // Evita el cierre al presionar "Esc"
    // });
    // $("#modal_datos_adicionales").modal("show");

    $('#modal_datos_adicionales_finalizados').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_datos_adicionales_finalizados").modal("show");

    var doc = $("#docito_despa_fin").val();

    $("#id_observaciones_fin").val("");

    var emp = $("#empresa_despa_fin").val();
    $("#docito_adicionales_fin").val(doc);
    $("#empresa_adicionales_fin").val(emp);

    consulta_data_AD_fin(doc);

    bloquearForm_Fin();
    lista_modalidad_destino_fin();
    lista_mod_pago_fin();
    lista_agencia_fin();

    setTimeout(() => {
        consulta_data_AD_NEW_fin(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";


}

function datos_adicionales_pro() {

    $("#modal_datos_adicionales_pro").modal("show");

    var doc = $("#docito_pro").val();

    $("#docito_adicionales_pro").val(doc);
    $("#id_observaciones_pro").val("");
    var emp = $("#empresa2").val();
    $("#empresa_adicionales_pro").val(emp);

    bloquearForm_pro();
    lista_modalidad_destino_pro();
    lista_mod_pago_pro();
    lista_agencia_pro();

    setTimeout(() => {
        consulta_data_AD_NEW_pro(doc);
        consulta_data_AD_pro(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";

}

function datos_adicionales_pro3() {

    $("#modal_datos_adicionales_pro3").modal("show");

    var doc = $("#docito_pro3").val();

    $("#docito_adicionales_pro3").val(doc);



    bloquearForm_pro3();
    lista_modalidad_destino_pro3();
    lista_mod_pago_pro3();
    lista_agencia_pro3();

    setTimeout(() => {
        consulta_data_AD_NEW_pro3(doc);
        consulta_data_AD_pro3(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";


}

function dat_add_pediemDespa() {
    $('#modal_datos_adicionales_pro4').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_datos_adicionales_pro4").modal("show");

    var doc = $("#docito_despa").val();

    $("#id_observaciones_pro4").val("");

    var emp = $("#empresa_despa").val();
    $("#docito_adicionales_pro4").val(doc);
    $("#empresa_adicionales_pro4").val(emp);



    bloquearForm4();
    lista_modalidad_destino_pro4();
    lista_mod_pago_pro4();
    lista_agencia_pro4();

    setTimeout(() => {
        consulta_data_AD_NEW_pro4(doc);
        consulta_data_AD_pro4(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";


}

function dat_add_pedifina() {
    $('#modal_datos_adicionales_pro5').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_datos_adicionales_pro5").modal("show");

    var doc = $("#docito_despa_fin").val();

    $("#id_observaciones_pro5").val("");

    var emp = $("#empresa_despa_fin").val();
    $("#docito_adicionales_pro5").val(doc);
    $("#empresa_adicionales_pro5").val(emp);



    bloquearForm5();
    lista_modalidad_destino_pro5();
    lista_mod_pago_pro5();
    lista_agencia_pro5();

    setTimeout(() => {
        consulta_data_AD_NEW_pro5(doc);
        consulta_data_AD_pro5(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";


}

function datos_adicionales_pro5() {

    $("#modal_datos_adicionales_pro5").modal("show");

    var doc = $("#docito_despa_fin").val();

    $("#docito_adicionales_pro5").val(doc);
    $("#id_observaciones_pro5").val("");
    var emp = $("#empresa_despa_fin").val();
    $("#empresa_adicionales_pro5").val(emp);

    bloquearForm5();
    lista_modalidad_destino_pro5();
    lista_mod_pago_pro5();
    lista_agencia_pro5();

    setTimeout(() => {
        consulta_data_AD_NEW_pro5(doc);
        consulta_data_AD_pro5(doc);
    }, 1000);

    // document.getElementById("btn_guardar").style.display = "block";
    // document.getElementById("btn_actualizar").style.display = "none";


}




function bloquearForm() {

    document.getElementById("id_observaciones").disabled = true;
    document.getElementById("id_emp").disabled = true;
    document.getElementById("id_dir_trans").disabled = true;
    document.getElementById("id_ubicacion").disabled = true;
    document.getElementById("id_dir_destino").disabled = true;
    document.getElementById("id_moda_destino").disabled = true;
    document.getElementById("id_moda_pago").disabled = true;

    DeshabilitarInputs()
}

function bloquearForm_Fin() {

    document.getElementById("id_observaciones_fin").disabled = true;
    document.getElementById("id_emp_fin").disabled = true;
    document.getElementById("id_dir_trans_fin").disabled = true;
    document.getElementById("id_ubicacion_fin").disabled = true;
    document.getElementById("id_dir_destino_fin").disabled = true;
    
    $("#id_moda_destino_fin select").prop("disabled", true);
    $("#id_moda_pago_fin select").prop("disabled", true);
    $("#id_agencia_fin select").prop("disabled", true);

    DeshabilitarInputs_fin();
}

function bloquearForm4() {

    document.getElementById("id_observaciones_pro4").disabled = true;
    document.getElementById("id_emp_pro4").disabled = true;
    document.getElementById("id_dir_trans_pro4").disabled = true;
    document.getElementById("id_ubicacion_pro4").disabled = true;
    document.getElementById("id_dir_destino_pro4").disabled = true;
    
    $("#id_moda_destino_pro4 select").prop("disabled", true);
    $("#id_moda_pago_pro4 select").prop("disabled", true);
    $("#id_agencia_pro4 select").prop("disabled", true);

    DeshabilitarInput4()
}
function bloquearForm5() {

    document.getElementById("id_observaciones_pro5").disabled = true;
    document.getElementById("id_emp_pro5").disabled = true;
    document.getElementById("id_dir_trans_pro5").disabled = true;
    document.getElementById("id_ubicacion_pro5").disabled = true;
    document.getElementById("id_dir_destino_pro5").disabled = true;
    
    $("#id_moda_destino_pro5 select").prop("disabled", true);
    $("#id_moda_pago_pro5 select").prop("disabled", true);
    $("#id_agencia_pro5 select").prop("disabled", true);

    DeshabilitarInputs_pro5()
}

function DeshabilitarInputs_pro5() {
    const inputs2 = document.querySelectorAll("#miTabla2_pro5_3 input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro5_2 input");

    const inputs = document.querySelectorAll("#miTabla1_pro5_1 input");

    inputs.forEach(input => {
        input.disabled = true;
    });

    inputs1.forEach(input => {
        input.disabled = true;
    });

    inputs2.forEach(input => {
        input.disabled = true;
    });

}
function DeshabilitarInputs() {
    const inputs2 = document.querySelectorAll("#miTabla2 input");

    const inputs1 = document.querySelectorAll("#miTabla1 input");

    const inputs = document.querySelectorAll("#miTabla input");

    inputs.forEach(input => {
        input.disabled = true;
    });

    inputs1.forEach(input => {
        input.disabled = true;
    });

    inputs2.forEach(input => {
        input.disabled = true;
    });

}
function DeshabilitarInputs_fin() {
    const inputs2 = document.querySelectorAll("#miTabla2_fin input");

    const inputs1 = document.querySelectorAll("#miTabla1_fin input");

    const inputs = document.querySelectorAll("#miTabla_fin input");

    inputs.forEach(input => {
        input.disabled = true;
    });

    inputs1.forEach(input => {
        input.disabled = true;
    });

    inputs2.forEach(input => {
        input.disabled = true;
    });

}
function DeshabilitarInput4() {
    const inputs2 = document.querySelectorAll("#miTabla_pro4_1 input");

    const inputs1 = document.querySelectorAll("#miTabla_pro4_2 input");

    const inputs = document.querySelectorAll("#miTabla_pro4_3 input");

    inputs.forEach(input => {
        input.disabled = true;
    });

    inputs1.forEach(input => {
        input.disabled = true;
    });

    inputs2.forEach(input => {
        input.disabled = true;
    });

}
function bloquearForm_pro() {

    document.getElementById("id_observaciones_pro").disabled = true;
    document.getElementById("id_emp_pro").disabled = true;
    document.getElementById("id_dir_trans_pro").disabled = true;
    document.getElementById("id_ubicacion_pro").disabled = true;
    document.getElementById("id_dir_destino_pro").disabled = true;
    
    $("#id_moda_destino_pro select").prop("disabled", true);
    $("#id_moda_pago_pro select").prop("disabled", true);
    $("#id_agencia_pro select").prop("disabled", true);

    DeshabilitarInputs_pro()
}



function DeshabilitarInputs_pro() {
    const inputs2 = document.querySelectorAll("#miTabla2_pro input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro input");

    const inputs = document.querySelectorAll("#miTabla_pro input");

    inputs.forEach(input => {
        input.disabled = true;
    });

    inputs1.forEach(input => {
        input.disabled = true;
    });

    inputs2.forEach(input => {
        input.disabled = true;
    });

}
function bloquearForm_pro3() {

    document.getElementById("id_observaciones_pro3").disabled = true;
    document.getElementById("id_emp_pro3").disabled = true;
    document.getElementById("id_dir_trans_pro3").disabled = true;
    document.getElementById("id_ubicacion_pro3").disabled = true;
    document.getElementById("id_dir_destino_pro3").disabled = true;
    document.getElementById("id_moda_destino_pro3").disabled = true;
    document.getElementById("id_moda_pago_pro3").disabled = true;
    bloquearSelect();   // document.getElementById("id_moda_pago_pro3").disabled = true;
    DeshabilitarInputs_pro3()
}

function DeshabilitarInputs_pro3() {
    const inputs2 = document.querySelectorAll("#miTabla2_pro3 input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro3 input");

    const inputs = document.querySelectorAll("#miTabla_pro3 input");

    inputs.forEach(input => {
        input.disabled = true;
    });

    inputs1.forEach(input => {
        input.disabled = true;
    });

    inputs2.forEach(input => {
        input.disabled = true;
    });

}
function bloquearSelect() {
    $("#pon_almacen_pro3").prop("disabled", true).trigger("change");
}


function estado_pedidos() {
    $('#modal_estado_pedidos').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_estado_pedidos").modal("show");
    var doc = $("#docito").val();
    $("#doc_estado_pedido").val(doc);

    var estado = $("#ESTADO").val();
    var idestado = $("#idESTADO").val();
    console.log(idestado);
    listado_estados(idestado);

    var emp = $("#empresa").val();
    consulta_estaditos(estado);
    consulta_emp(emp);

}



function estado_pedidos_pro() {
    $('#modal_estado_pedidos_pepro').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_estado_pedidos_pepro").modal("show");
    cod_estad = $("#codESTADO2").val();
    listado_estados_prepo4(cod_estad);
    var doc = $("#docito_pro").val();
    $("#doc_estado_pedido_prepo").val(doc);

    var estado = $("#ESTADO2").val();
    var emp = $("#empresa2").val();
    consulta_estaditos(estado);
    consulta_emp(emp);

}




function estado_pedidos_pro3() {
    $('#modal_estado_pedidos_pepro3').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_estado_pedidos_pepro3").modal("show");
    cod_estad = $("#codESTADO3").val();
    setTimeout(() => {
        listado_estados_prepo3(cod_estad);
    }, 500);

    var doc = $("#docito_pro3").val();
    $("#doc_estado_pedido_prepo3").val(doc);



    var estado = $("#ESTADO3").val();
    var emp = $("#empresa3").val();
    consulta_estaditos(estado);
    consulta_emp(emp);

}



function estado_pedidos_despacho() {
    $('#modal_estado_pedidos_despacho').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_estado_pedidos_despacho").modal("show");
    cod_estad = $("#idESTADO_despa").val();
    setTimeout(() => {
        listado_estados_despacho(cod_estad);
    }, 500);

    var doc = $("#docito_despa").val();
    $("#doc_estado_pedido_despa").val(doc);



    var estado = $("#ESTADO_despa").val();
    var emp = $("#empresa_despa").val();
    consulta_estaditos(estado);
    consulta_emp(emp);

}



function consulta_estaditos(estado) {
    $("#id_estado_Actual").val(estado);
    $("#id_estado_Actual_prepo").val(estado);
    $("#id_estado_Actual_prepo3").val(estado);
    $("#id_estado_Actual_despa").val(estado);

}


function consulta_empresa2(emp) {
    // $("#id_empresa2").val(emp);
}


function consulta_emp(emp) {
    $("#id_emp_actual").val(emp);
    $("#id_emp_actual_prepo").val(emp);
    $("#id_emp_actual_prepo3").val(emp);
    $("#id_emp_actual_despa").val(emp);
}






// function consulta_data_AD(docentry) {
//     $.ajax({
//         url: "busca_data_AD.php",
//         type: "POST",
//         data: { docentry },
//         success: function (x) {
//             var data = x;
//             var idcl = data.split("|");

//             $("#id_observaciones").val(idcl[0].toString().trim());
//             $("#id_emp").val(idcl[1]);
//             $("#id_dir_trans").val(idcl[2]);
//             $("#id_ubicacion").val(idcl[3]);
//             $("#id_dir_destino").val(idcl[4]);


//             moda_destino = idcl[5];
//             //$("#id_moda_destino").children().val(moda_destino).trigger("change.select2")
//             // $("#id_moda_destino option: selected").text(idcl[5]);

//             // $("#id_moda_pago option: selected").text(idcl[6]);

//             moda_pago = idcl[6];
//             //$("#id_moda_pago").children().val(moda_pago).trigger("change.select2")

//             $("#conta1").val(idcl[7]);
//             $("#dni1").val(idcl[8]);
//             $("#tele1").val(idcl[9]);

//             $("#conta2").val(idcl[10]);
//             $("#dni2").val(idcl[11]);
//             $("#tele2").val(idcl[12]);

//             $("#conta3").val(idcl[13]);
//             $("#dni3").val(idcl[14]);
//             $("#tele3").val(idcl[15]);

//             var doc_comparacion = idcl[16];

//             // Control de botones
//             if (docentry === doc_comparacion) {
//                 $("#btn_guardar").hide();
//                 $("#btn_actualizar").show();
//             } else {
//                 $("#btn_actualizar").hide();
//                 $("#btn_guardar").show();
//             }
//         },
//         error: function (jqXHR, estado, error) {
//             console.error("Error en la solicitud:", error);
//         },
//     });
// }



function cambiar_estado() {
    estado = $("#id_estados_cambiar option:selected").val();
    id_docentry = $("#doc_estado_pedido").val();
    empresa = $("#id_emp_actual").val();
    tipo = 'S'

    $.ajax({
        beforeSend: function () { },
        url: "actualizar_estados_mostrados2.php",
        type: "POST",
        data:
            "id_docentry=" +
            id_docentry +
            "&estado=" +
            estado +
            "&empresa=" +
            empresa +
            "&tipo=" +
            tipo,

        success: function () {


            $("#modal_estado_pedidos").modal("hide");


            swal("Se actualizo correctamente", {
                icon: "success",
                timer: 2000, // tiempo en milisegundos
                buttons: false, // desactiva el botón para cerrar
            });

            busca_Lista();
            busca_listosDespachos();

        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });

}

function cambiar_estado1() {
    estado = $("#id_estados_cambiar_prepo option:selected").val();
    id_docentry = $("#doc_estado_pedido_prepo").val();
    empresa = $("#empresa_despa").val();
    tipo = 'S'

    $.ajax({
        beforeSend: function () { },
        url: "actualizar_estados_mostrados1.php",
        type: "POST",
        data:
            "id_docentry=" +
            id_docentry +
            "&estado=" +
            estado +
            "&empresa=" +
            empresa +
            "&tipo=" +
            tipo,

        success: function () {


            $("#modal_estado_pedidos").modal("hide");


            swal("Se actualizo correctamente", {
                icon: "success",
                timer: 2000, // tiempo en milisegundos
                buttons: false, // desactiva el botón para cerrar
            });

            busca_Lista();
            busca_listosDespachos();

        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });

}



function cambiar_estado_prepo() {
    estado = $("#id_estados_cambiar_prepo option:selected").val();
    id_docentry = $("#doc_estado_pedido_prepo").val();
    empresa = $("#id_emp_actual_prepo").val();
    tipo_ori = 'S'

    $.ajax({
        beforeSend: function () { },
        url: "actualizar_estados_mostrados1.php",
        type: "POST",
        data:
            "id_docentry=" +
            id_docentry +
            "&estado=" +
            estado +
            "&empresa=" +
            empresa +
            "&tipo=" +
            tipo_ori,

        success: function () {


            $("#modal_estado_pedidos_pepro").modal("hide");


            swal("Se actualizo correctamente", {
                icon: "success",
                timer: 2000, // tiempo en milisegundos
                buttons: false, // desactiva el botón para cerrar
            });

            busca_Lista_programados();

        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });

}




function cambiar_estado_prepo3() {
    estado = $("#id_estados_cambiar_prepo3 option:selected").val();
    id_docentry = $("#doc_estado_pedido_prepo3").val();
    empresa = $("#id_emp_actual_prepo3").val();
    tipo_ori = 'S'

    $.ajax({
        beforeSend: function () { },
        url: "actualizar_estados_mostrados1.php",
        type: "POST",
        data:
            "id_docentry=" +
            id_docentry +
            "&estado=" +
            estado +
            "&empresa=" +
            empresa +
            "&tipo=" +
            tipo_ori,


        success: function () {


            $("#modal_estado_pedidos_pepro3").modal("hide");


            swal("Se actualizo correctamente", {
                icon: "success",
                timer: 2000, // tiempo en milisegundos
                buttons: false, // desactiva el botón para cerrar
            });

            busca_listosDespachos();

        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });

}







function actualizar_form() {
    id_docentry = $("#docito_adicionales").val();
    let id_observaciones = quitarAcentos($("#id_observaciones").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans").val());
    let id_ubicacion = quitarAcentos($("#id_ubicacion").val());
    let id_dir_destino = quitarAcentos($("#id_dir_destino").val());
    let id_moda_destino = $("#id_moda_destino option:selected").val();
    let id_moda_pago = $("#id_moda_pago option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa").val();

    $("#tabla_archivos_registrados tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#modalidad_destino").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago").focus();
    }


    $("#miTabla > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1"]').val();
        dni1 = $(this).find("td").find('input[id="dni1"]').val();
        tele1 = $(this).find("td").find('input[id="tele1"]').val();
    });


    $("#miTabla1 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2"]').val();
        dni2 = $(this).find("td").find('input[id="dni2"]').val();
        tele2 = $(this).find("td").find('input[id="tele2"]').val();
    });


    $("#miTabla2 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3"]').val();
        dni3 = $(this).find("td").find('input[id="dni3"]').val();
        tele3 = $(this).find("td").find('input[id="tele3"]').val();
    });

    if ($("#id_ubicacion").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_datos_adicionales.php",
            type: "POST",
            data:
                "id_docentry=" +
                id_docentry +
                "&id_observaciones=" +
                id_observaciones +
                "&id_emp=" +
                id_emp +
                "&id_dir_trans=" +
                id_dir_trans +
                "&id_ubicacion=" +
                id_ubicacion +
                "&id_dir_destino=" +
                id_dir_destino +
                "&id_moda_destino=" +
                id_moda_destino +
                "&id_moda_pago=" +
                id_moda_pago +
                "&comta1=" +
                comta1 +
                "&dni1=" +
                dni1 +
                "&tele1=" +
                tele1 +
                "&comta2=" +
                comta2 +
                "&dni2=" +
                dni2 +
                "&tele2=" +
                tele2 +
                "&comta3=" +
                comta3 +
                "&dni3=" +
                dni3 +
                "&tele3=" +
                tele3 +
                // "&archivo=" +
                // archivo +
                // "&archivoguia="
                // + archivoguia,
                "&archivo=" +
                archivos +
                "&archivoguia=" +
                archivosGuia +
                "&empresa=" +
                empresa,

            success: function () {


                $("#modal_datos_adicionales").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}

function guarda_actualiza_form() {
    id_docentry = $("#docito_adicionales").val();
    let id_observaciones = quitarAcentos($("#id_observaciones").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans").val());
    let id_ubicacion = $("#id_ubicacion").val();
    let id_dir_destino = $("#id_dir_destino").val();
    let id_moda_destino = $("#id_moda_destino option:selected").val();
    let id_moda_pago = $("#id_moda_pago option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa").val();

    $("#tabla_archivos_registrados tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#modalidad_destino").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago").focus();
    }


    $("#miTabla > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1"]').val();
        dni1 = $(this).find("td").find('input[id="dni1"]').val();
        tele1 = $(this).find("td").find('input[id="tele1"]').val();
    });


    $("#miTabla1 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2"]').val();
        dni2 = $(this).find("td").find('input[id="dni2"]').val();
        tele2 = $(this).find("td").find('input[id="tele2"]').val();
    });


    $("#miTabla2 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3"]').val();
        dni3 = $(this).find("td").find('input[id="dni3"]').val();
        tele3 = $(this).find("td").find('input[id="tele3"]').val();
    });

    if ($("#id_ubicacion").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_guarda_datos_adicionales.php",
            type: "POST",
            data: {
                id_docentry: id_docentry,
                id_observaciones: id_observaciones,
                id_emp: id_emp,
                id_dir_trans: id_dir_trans,
                id_ubicacion: id_ubicacion,
                id_dir_destino: id_dir_destino,
                id_moda_destino: id_moda_destino,
                id_moda_pago: id_moda_pago,
                comta1: comta1,
                dni1: dni1,
                tele1: tele1,
                comta2: comta2,
                dni2: dni2,
                tele2: tele2,
                comta3: comta3,
                dni3: dni3,
                tele3: tele3,
                archivo: archivos,
                archivoguia: archivosGuia,
                empresa: empresa
            },
            success: function () {


                $("#modal_datos_adicionales").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}

function guarda_actualiza_form4() {
    id_docentry = $("#docito_adicionales_pro4").val();
    let id_observaciones = quitarAcentos($("#id_observaciones_pro4").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp_pro4").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans_pro4").val());
    let id_ubicacion = $("#id_ubicacion_pro4").val();
    let id_dir_destino = $("#id_dir_destino_pro4").val();
    let id_moda_destino = $("#id_moda_destino_pro4 option:selected").val();
    let id_moda_pago = $("#id_moda_pago_pro4 option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa_adicionales_pro4").val();

    $("#tabla_archivos_registrados4 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia4 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones4").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp_pro4").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans_pro4").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion_pro4").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino_pro4").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#id_moda_destino_pro4 select").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago_pro4 select").focus();
    }


    $("#miTabla_pro4_1 > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro4"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro4"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro4"]').val();
    });


    $("#miTabla1_pro4_2 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro4"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro4"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro4"]').val();
    });


    $("#miTabla2_pro4_3 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro4"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro4"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro4"]').val();
    });

    if ($("#id_ubicacion_pro4").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_guarda_datos_adicionales.php",
            type: "POST",
            data: {
                id_docentry: id_docentry,
                id_observaciones: id_observaciones,
                id_emp: id_emp,
                id_dir_trans: id_dir_trans,
                id_ubicacion: id_ubicacion,
                id_dir_destino: id_dir_destino,
                id_moda_destino: id_moda_destino,
                id_moda_pago: id_moda_pago,
                comta1: comta1,
                dni1: dni1,
                tele1: tele1,
                comta2: comta2,
                dni2: dni2,
                tele2: tele2,
                comta3: comta3,
                dni3: dni3,
                tele3: tele3,
                archivo: archivos,
                archivoguia: archivosGuia,
                empresa: empresa
            },
            success: function () {


                $("#modal_datos_adicionales_pro4").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}



function guarda_actualiza_form5() {
    id_docentry = $("#docito_adicionales_pro5").val();
    let id_observaciones = quitarAcentos($("#id_observaciones_pro5").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp_pro5").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans_pro5").val());
    let id_ubicacion = $("#id_ubicacion_pro5").val();
    let id_dir_destino = $("#id_dir_destino_pro5").val();
    let id_moda_destino = $("#id_moda_destino_pro5 option:selected").val();
    let id_moda_pago = $("#id_moda_pago_pro5 option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa_adicionales_pro5").val();

    $("#tabla_archivos_registrados5 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia5 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones_pro5").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp_pro5").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans_pro5").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion_pro5").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino_pro5").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#id_moda_destino_pro5 select").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago_pro5 select").focus();
    }


    $("#miTabla_pro5_1 > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro5"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro5"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro5"]').val();
    });


    $("#miTabla1_pro5_2 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro5"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro5"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro5"]').val();
    });


    $("#miTabla2_pro5_3 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro5"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro5"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro5"]').val();
    });

    if ($("#id_ubicacion_pro5").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_guarda_datos_adicionales.php",
            type: "POST",
            data: {
                id_docentry: id_docentry,
                id_observaciones: id_observaciones,
                id_emp: id_emp,
                id_dir_trans: id_dir_trans,
                id_ubicacion: id_ubicacion,
                id_dir_destino: id_dir_destino,
                id_moda_destino: id_moda_destino,
                id_moda_pago: id_moda_pago,
                comta1: comta1,
                dni1: dni1,
                tele1: tele1,
                comta2: comta2,
                dni2: dni2,
                tele2: tele2,
                comta3: comta3,
                dni3: dni3,
                tele3: tele3,
                archivo: archivos,
                archivoguia: archivosGuia,
                empresa: empresa
            },
            success: function () {


                $("#modal_datos_adicionales_pro5").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}


function guarda_actualiza_form_fin() {
    id_docentry = $("#docito_adicionales_fin").val();
    let id_observaciones = quitarAcentos($("#id_observaciones_fin").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp_fin").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans_fin").val());
    let id_ubicacion = $("#id_ubicacion_fin").val();
    let id_dir_destino = $("#id_dir_destino_fin").val();
    let id_moda_destino = $("#id_moda_destino_fin option:selected").val();
    let id_moda_pago = $("#id_moda_pago_fin option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa_adicionales_fin").val();

    $("#tabla_archivos_registrados_fin tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia_fin tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones_fin").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp_fin").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans_fin").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion_fin").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino_fin").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#id_moda_destino_fin select").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago_fin select").focus();
    }


    $("#miTabla_fin > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_fin"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_fin"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_fin"]').val();
    });


    $("#miTabla1_fin > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_fin"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_fin"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_fin"]').val();
    });


    $("#miTabla2_fin > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_fin"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_fin"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_fin"]').val();
    });

    if ($("#id_ubicacion_fin").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_guarda_datos_adicionales.php",
            type: "POST",
            data: {
                id_docentry: id_docentry,
                id_observaciones: id_observaciones,
                id_emp: id_emp,
                id_dir_trans: id_dir_trans,
                id_ubicacion: id_ubicacion,
                id_dir_destino: id_dir_destino,
                id_moda_destino: id_moda_destino,
                id_moda_pago: id_moda_pago,
                comta1: comta1,
                dni1: dni1,
                tele1: tele1,
                comta2: comta2,
                dni2: dni2,
                tele2: tele2,
                comta3: comta3,
                dni3: dni3,
                tele3: tele3,
                archivo: archivos,
                archivoguia: archivosGuia,
                empresa: empresa
            },
            success: function () {


                $("#modal_datos_adicionales_finalizados").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}




function actualizar_form_pro() {
    id_docentry = $("#docito_adicionales_pro").val();
    let id_observaciones = quitarAcentos($("#id_observaciones_pro").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp_pro").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans_pro").val());
    let id_ubicacion = quitarAcentos($("#id_ubicacion_pro").val());
    let id_dir_destino = quitarAcentos($("#id_dir_destino_pro").val());
    let id_moda_destino = $("#id_moda_destino_pro option:selected").val();
    let id_moda_pago = $("#id_moda_pago_pro option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa_adicionales_pro").val();

    $("#tabla_archivos_registrados tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones_pro").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp_pro").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans_pro").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion_pro").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino_pro").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#id_moda_destino_pro select").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago_pro select").focus();
    }


    $("#miTabla_pro > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro"]').val();
    });


    $("#miTabla1_pro > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro"]').val();
    });


    $("#miTabla2_pro > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro"]').val();
    });

    if ($("#id_ubicacion_pro").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_datos_adicionales.php",
            type: "POST",
            data: {
                id_docentry: id_docentry,
                id_observaciones: id_observaciones,
                id_emp: id_emp,
                id_dir_trans: id_dir_trans,
                id_ubicacion: id_ubicacion,
                id_dir_destino: id_dir_destino,
                id_moda_destino: id_moda_destino,
                id_moda_pago: id_moda_pago,
                comta1: comta1,
                dni1: dni1,
                tele1: tele1,
                comta2: comta2,
                dni2: dni2,
                tele2: tele2,
                comta3: comta3,
                dni3: dni3,
                tele3: tele3,
                archivo: archivos,
                archivoguia: archivosGuia,
                empresa: empresa
            },
            success: function () {


                $("#modal_datos_adicionales_pro").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}


function actualizar_form_pro3() {
    id_docentry = $("#docito_adicionales_pro3").val();
    let id_observaciones = quitarAcentos($("#id_observaciones_pro3").val().toUpperCase().trim());
    let id_emp = quitarAcentos($("#id_emp_pro3").val());
    let id_dir_trans = quitarAcentos($("#id_dir_trans_pro3").val());
    let id_ubicacion = quitarAcentos($("#id_ubicacion_pro3").val());
    let id_dir_destino = quitarAcentos($("#id_dir_destino_pro3").val());
    let id_moda_destino = $("#id_moda_destino_pro3 option:selected").val();
    let id_moda_pago = $("#id_moda_pago_pro3 option:selected").val();
    // var archivoInput = document.getElementById("archico-input");
    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    empresa = $("#empresa3").val();

    $("#tabla_archivos_registrados_pro3 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivo.push(nombreArchivo);
        }
    });
    $("#tabla_archivos_guia_pro3 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim();
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo);
        }
    });

    let bandera = true;

    if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
        bandera = false;
        alertify.error("Las observaciones deben tener menos de 200 caracteres");
        $("#id_observaciones_pro3").focus();
    }

    if (id_emp.length > 0 && id_emp.length >= 101) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_emp_pro3").focus();
    }

    if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
        bandera = false;
        alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
        $("#id_dir_trans_pro3").focus();
    }

    if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
        bandera = false;
        alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
        $("#id_ubicacion_pro3").focus();
    }
    if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
        bandera = false;
        alertify.error("La direccion destino deben tener menos de 200 caracteres");
        $("#id_dir_destino_pro3").focus();
    }



    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de destino");
        $("#modalidad_destino_pro3").focus();
    }
    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione la modalidad de pago");
        $("#id_moda_pago_pro3").focus();
    }


    $("#miTabla_pro3 > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro3"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro3"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro3"]').val();
    });


    $("#miTabla1_pro3 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro3"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro3"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro3"]').val();
    });


    $("#miTabla2_pro3 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro3"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro3"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro3"]').val();
    });

    if ($("#id_ubicacion_pro3").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {
        let archivos = archivo.join(',');
        let archivosGuia = archivoguia.join(',');

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_datos_adicionales.php",
            type: "POST",
            data: {
                id_docentry: id_docentry,
                id_observaciones: id_observaciones,
                id_emp: id_emp,
                id_dir_trans: id_dir_trans,
                id_ubicacion: id_ubicacion,
                id_dir_destino: id_dir_destino,
                id_moda_destino: id_moda_destino,
                id_moda_pago: id_moda_pago,
                comta1: comta1,
                dni1: dni1,
                tele1: tele1,
                comta2: comta2,
                dni2: dni2,
                tele2: tele2,
                comta3: comta3,
                dni3: dni3,
                tele3: tele3,
                archivo: archivos,
                archivoguia: archivosGuia,
                empresa: empresa
            },
            success: function () {


                $("#modal_datos_adicionales_pro3").modal("hide");


                swal("Se actualizo correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }


}

let array_docs = [];

function asignar_ruta() {
    let suma = 0;
    let cant = 0;
    let doc = "";
    array_docs = []
    let allValid = true;  // Bandera para verificar si todas las filas tienen distrito asignado
    var checkedCount = $("#tabla_listoDespa #gen_peso:checked").length;
    console.log(checkedCount);

    if (checkedCount === 0) {
        // Mostrar alerta de error si no hay ningún checkbox marcado
        alertify.error("Debe activar al menos un despacho.");
        return
    } else {
        $("#gen_peso:checked").each(function () {
            let num = $(this).parents("tr").find("td:eq(10)").text();  // Obtener el valor numérico
            doc = $(this).parents("tr").find("td:eq(1)").text();
            tipo = $(this).parents("tr").find("td:eq(14)").text();
            empresa = $(this).parents("tr").find("td:eq(2)").text();    // Obtener el valor numérico
            array_docs.push({ docentry: doc, tipo: tipo, empresa: empresa });
            //array_docs.push(doc);
            var selectDistrito = $(this).parents("tr").find('#distri'); // Buscar el select de distrito en la fila actual
            var distrito = selectDistrito.val();  // Obtener el valor seleccionado

            // Verificar si el campo distrito está vacío
            if (distrito === '') {
                allValid = false; // Si algún distrito está vacío, poner la bandera en false
                return false; // Salir del loop inmediatamente
            }

            suma += parseFloat(num) || 0;  // Sumar el valor (si no es un número, se ignora)
            cant++;  // Contar la cantidad de checkboxes seleccionados
        });
        console.log(array_docs);

        // Si alguna fila no tiene distrito asignado, mostrar el mensaje de error y salir de la función
        if (!allValid) {
            alertify.error("Hay un Despacho sin Distrito Asignado");
            return;  // Salir de la función sin hacer nada más
        }

        // Si todas las filas tienen distrito asignado, continuar con la lógica
        $('#modal_asignar_ruta').modal({
            backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
            keyboard: false     // Evita el cierre al presionar "Esc"
        });
        $("#modal_asignar_ruta").modal("show");
        $("#peso_tot").val(suma.toFixed(2));

        // var doc = $("#docito").val();
        $("#docito_asigna_ruta").val(doc);
        $("#tipo_asignar_ruta").val(tipo);
        $("#empresa_asignar_ruta").val(empresa);

        // Llamar a las funciones para cargar las listas de conductores, unidades y ayudantes
        if (tipo === "W") {
            $("#peso_tot").prop("disabled", true);
        } else {
            $("#peso_tot").prop("disabled", false);
        }

        // lista_conductor();
        // lista_unidad();
        lista_ayudante();
        lista_transportista();
    }
}




function asignar_ruta_prepo() {
    $('#modal_asignar_ruta_prepo').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_asignar_ruta_prepo").modal("show");

    var doc = $("#docito_pro").val();

    $("#docito_asigna_ruta_prepo").val(doc);

    lista_conductor_prepo();
    lista_unidad_prepo();
    lista_ayudante_prepo();
}





function generar_rotulo() {
    $('#modal_generar_rotulo').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_generar_rotulo").modal("show");
    $("#id_paquete").val("");

    var doc = $("#docito").val();
    $("#docito_ge_rotulo").val(doc);

    var empresa = $("#empresa").val();

    $.ajax({
        beforeSend: function () {
            $("#tabla_generar_rotulo_despa").html("Cargando...");

        },

        url: 'lista_generar_rotulo.php',
        type: 'POST',
        data: { doc: doc, empresa: empresa },
        success: function (x) {
            $("#tabla_generar_rotulo_despa").html(x);
            $("#tabla_rotulo").DataTable({
                order: [[1, "asc"]],
            });
            consulta_data_rotulo(doc)


        }

    });
}


function generar_rotulo_pediemDespa() {
    $('#modal_generar_rotulo_despa').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_generar_rotulo_despa").modal("show");
    $("#id_paquete_Des").val("");

    var doc = $("#docito_despa").val();
    var cliente = $("#CLIENTE_despa").val();
    var oc = $("#OC_NAME5").val();
    var num_guia = $("#NUM_GUIA_despa").val();

    $("#docito_ge_rotulo_Des").val(doc);
    $("#id_ro_cliente_Des").val(cliente);
    $("#id_ro_oc_Des").val(oc);
    $("#id_ro_guiaRe_Des").val(num_guia);

    var empresa = $("#empresa_despa").val();

    $.ajax({
        beforeSend: function () {
            $("#tabla_generar_rotulo_despacho").html("Cargando...");
        },
        url: 'lista_generar_rotulo_despa.php',
        type: 'POST',
        data: { doc: doc, empresa: empresa },
        success: function (x) {
            $("#tabla_generar_rotulo_despacho").html(x);
            $("#tabla_rotulo_depas").DataTable({
                order: [[1, "asc"]],
            });
            consulta_data_rotulo_despa(doc)
        }
    });
}


function generar_rotulo_pro3() {
    $('#modal_generar_rotulo_pro3').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_generar_rotulo_pro3").modal("show");
    $("#id_paquete3").val("");

    var doc = $("#docito_pro3").val();
    var cliente = $("#CLIENTE3").val();
    var num_guia = $("#NUM_GUIA3").val();
    var oc = $("#OC_NAME3").val();

    $("#docito_ge_rotulo_pro3").val(doc);
    $("#id_ro_cliente_pro3").val(cliente);
    $("#id_ro_oc_pro3").val(oc);
    $("#id_ro_guiaRe_pro3").val(num_guia);

    var empresa = $("#empresa3").val();

    $.ajax({
        beforeSend: function () {
            $("#tabla_generar_rotulo_pro3").html("Cargando...");

        },

        url: 'lista_generar_rotulo_pro3.php',
        type: 'POST',
        data: { doc: doc, empresa: empresa },
        success: function (x) {
            $("#tabla_generar_rotulo_pro3").html(x);
            $("#tabla_rotulo_pro3").DataTable({
                order: [[1, "asc"]],
            });
            consulta_data_rotulo_pro3(doc)


        }

    });
}


function generar_rotulo_pro() {
    $('#modal_generar_rotulo_pro').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_generar_rotulo_pro").modal("show");
    $("#id_paquete2").val("");

    var doc = $("#docito_pro").val();
    $("#docito_ge_rotulo_pro").val(doc);

    var empresa = $("#empresa2").val();

    $.ajax({
        beforeSend: function () {
            $("#tabla_generar_rotulo_pro").html("Cargando...");

        },

        url: 'lista_generar_rotulo_pro.php',
        type: 'POST',
        data: { doc: doc, empresa: empresa },
        success: function (x) {
            $("#tabla_generar_rotulo_pro").html(x);
            $("#tabla_rotulo_pro").DataTable({
                order: [[1, "asc"]],
            });
            consulta_data_rotulo_pro(doc)


        }

    });
}




// function generar_rotulo4() {
//     $('#modal_generar_rotulo').modal({
//         backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
//         keyboard: false     // Evita el cierre al presionar "Esc"
//     });
//     $("#modal_generar_rotulo").modal("show");
//     $("#id_paquete4").val("");

//     var doc = $("#docito_despa").val();
//     $("#docito_ge_rotulo_pro4").val(doc);

//     var empresa = $("#empresa2").val();

//     $.ajax({
//         beforeSend: function () {
//             $("#tabla_generar_rotulo_pro4").html("Cargando...");

//         },

//         url: 'lista_generar_rotulo.php',
//         type: 'POST',
//         data: { doc: doc, empresa: empresa },
//         success: function (x) {
//             $("#tabla_generar_rotulo_pro4").html(x);
//             $("#tabla_rotulo").DataTable({
//                 order: [[1, "asc"]],
//             });
//             consulta_data_rotulo(doc)


//         }

//     });
// }


function impri_picking() {
    var docentry = $("#docito_adicionales").val();
    var empresa = $("#empresa").val();

    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });
}



function impri_picking_fuera(docentry, empresa) {


    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });


}



function impri_picking_finalizados() {
    var docentry = $("#docito_adicionales_fin").val();
    var empresa = $("#empresa_adicionales_fin").val();

    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });
}




function impri_picking_pro() {
    var docentry = $("#docito_adicionales_pro").val();
    var empresa = $("#empresa2").val();

    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });


}


function impri_picking_pro3() {
    var docentry = $("#docito_adicionales_pro3").val();
    var empresa = $("#empresa3").val();

    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });


}

function impri_picking_pro4() {
    var docentry = $("#docito_adicionales_pro4").val();
    var empresa = $("#empresa_despa").val();

    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });


}
function impri_picking_pro5() {
    var docentry = $("#docito_adicionales_pro5").val();
    var empresa = $("#empresa_despa").val();

    var xd = "pdf_picking.php?docentry=" + docentry + "&empresa=" + empresa;

    $('#modal_data_pdf_picking').modal('show');
    $('#modal_data_pdf_picking').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', xd);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });

    $("#navegadorP").off('click').on('click', function () {
        window.open(xd, '_blank');
    });

    $("#imprimirP").off('click').on('click', function () {
        $('#modal_data_pdf_picking').find('iframe')[0].contentWindow.print();
    });


}




function validar_numero(event) {
    //console.log(event);
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        alertify.error("No puede ingresar letras");
        return false;
    }
    return true;
}

function consulta_data_rotulo(docentry) {
    docentry = $("#docito").val();
    empresa = $("#empresa").val();

    $.ajax({
        url: "busca_data_rotulo.php",

        type: "POST",
        data: {
            docentry, empresa
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");


            $("#id_ro_cliente").val(idcl[2]);
            $("#id_ro_oc").val(idcl[3]);
            $("#id_ro_guiaRe").val(idcl[1]);

        },
        error: function (jqXHR, estado, error) { },
    });
}


function consulta_data_rotulo_despa(docentry) {
    docentry = $("#docito_despa").val();
    empresa = $("#empresa_despa").val();

    $.ajax({
        url: "busca_data_rotulo.php",

        type: "POST",
        data: {
            docentry, empresa
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");


            $("#id_ro_cliente_Des").val(idcl[2]);
            $("#id_ro_oc_Des").val(idcl[3]);
            $("#id_ro_guiaRe_Des").val(idcl[1]);

        },
        error: function (jqXHR, estado, error) { },
    });
}



function consulta_data_rotulo_pro3(docentry) {
    docentry = $("#docito_pro3").val();
    empresa = $("#empresa3").val();

    $.ajax({
        url: "busca_data_rotulo.php",

        type: "POST",
        data: {
            docentry, empresa
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");


            $("#id_ro_cliente_pro3").val(idcl[2]);
            $("#id_ro_oc_pro3").val(idcl[3]);
            $("#id_ro_guiaRe_pro3").val(idcl[1]);

        },
        error: function (jqXHR, estado, error) { },
    });
}



function consulta_data_rotulo_pro(docentry) {
    docentry = $("#docito_pro").val();
    empresa = $("#empresa2").val();

    $.ajax({
        url: "busca_data_rotulo.php",

        type: "POST",
        data: {
            docentry, empresa
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");


            $("#id_ro_cliente_pro").val(idcl[2]);
            $("#id_ro_oc_pro").val(idcl[3]);
            $("#id_ro_guiaRe_pro").val(idcl[1]);

        },
        error: function (jqXHR, estado, error) { },
    });
}






$(document).on("click", "#tabla_rotulo tbody tr", function (event) {
    let row = $(this);
    let checkbox = row.find("#gen_rotulo");

    // Si el click fue dentro del input de cantidad o item_oc, solo marcar y pintar, no alternar el estado
    if ($(event.target).is("#item_oc") || $(event.target).is("#cantidad_ingresar")) {
        if (!checkbox.prop("checked")) {
            checkbox.prop("checked", true);
            actualizarFila(checkbox);
        }
        return;
    }

    // Cambia el estado del checkbox si el click fue fuera de los inputs
    checkbox.prop("checked", !checkbox.prop("checked"));
    actualizarFila(checkbox);
});

// Al hacer click en el input de cantidad, marcar checkbox y pintar la fila
$(document).on("click", "#cantidad_ingresar", function () {
    let row = $(this).closest("tr");
    let checkbox = row.find("#gen_rotulo");

    // Marcar el checkbox si aún no está marcado
    if (!checkbox.prop("checked")) {
        checkbox.prop("checked", true);
    }

    actualizarFila(checkbox);
});


function actualizarFila(checkbox) {
    var checkbox2 = $("#tabla_art tbody tr").find("#gen_rotulo");
    var cant = checkbox2.closest("tr").find("#gen_rotulo:checked").length;
    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }

    if (cant > 0) {
        // $("#enviar").removeClass("disabledTab");
        // $("#enviar").addClass("activeTab");
    } else {
        // $("#enviar").removeClass("activeTab");
        // $("#enviar").addClass("disabledTab");
    }
}





$(document).on("click", "#tabla_rotulo_pro3 tbody tr", function (event) {
    // Verifica si el clic fue en el input con id item_oc_pro
    if ($(event.target).is("#item_oc_pro3")) {
        return;  // No hacer nada si se hace clic en ese input
    }

    if ($(event.target).is("#cantidad_ingresar_pro3")) {
        return;  // No hacer nada si se hace clic en ese input
    }


    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#gen_rotulo_pro3");

    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila_pro3(checkbox);
});

// Al hacer click en el input de cantidad, marcar checkbox y pintar la fila
$(document).on("click", "#cantidad_ingresar_pro3", function () {
    let row = $(this).closest("tr");
    let checkbox = row.find("#gen_rotulo_pro3");

    // Marcar el checkbox si aún no está marcado
    if (!checkbox.prop("checked")) {
        checkbox.prop("checked", true);
    }

    actualizarFila_pro3(checkbox);
});

function actualizarFila_pro3(checkbox) {
    var checkbox2 = $("#tabla_art tbody tr").find("#gen_rotulo_pro3");
    var cant = checkbox2.closest("tr").find("#gen_rotulo_pro3:checked").length;
    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }

    if (cant > 0) {
        // $("#enviar").removeClass("disabledTab");
        // $("#enviar").addClass("activeTab");
    } else {
        // $("#enviar").removeClass("activeTab");
        // $("#enviar").addClass("disabledTab");
    }
}




$(document).on("click", "#tabla_rotulo_pro tbody tr", function (event) {

    // Verifica si el clic fue en el input con id item_oc_pro
    if ($(event.target).is("#item_oc_pro")) {
        return;  // No hacer nada si se hace clic en ese input
    }

    if ($(event.target).is("#cantidad_ingresar_pro")) {
        return;  // No hacer nada si se hace clic en ese input
    }

    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#gen_rotulo_pro");

    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila_pro(checkbox);
});

// Al hacer click en el input de cantidad, marcar checkbox y pintar la fila
$(document).on("click", "#cantidad_ingresar_pro", function () {
    let row = $(this).closest("tr");
    let checkbox = row.find("#gen_rotulo_pro");

    // Marcar el checkbox si aún no está marcado
    if (!checkbox.prop("checked")) {
        checkbox.prop("checked", true);
    }

    actualizarFila_pro(checkbox);
});

function actualizarFila_pro(checkbox) {
    var checkbox2 = $("#tabla_art tbody tr").find("#gen_rotulo_pro");
    var cant = checkbox2.closest("tr").find("#gen_rotulo_pro:checked").length;
    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }

    if (cant > 0) {
        // $("#enviar").removeClass("disabledTab");
        // $("#enviar").addClass("activeTab");
    } else {
        // $("#enviar").removeClass("activeTab");
        // $("#enviar").addClass("disabledTab");
    }
}




$(document).on("click", "#tabla_rotulo_depas tbody tr", function (event) {

    // Verifica si el clic fue en el input con id item_oc_pro
    if ($(event.target).is("#item_oc_despa")) {
        return;  // No hacer nada si se hace clic en ese input
    }

    if ($(event.target).is("#cantidad_ingresar_des")) {
        return;  // No hacer nada si se hace clic en ese input
    }

    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#gen_rotulo_des");


    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila(checkbox);
});

// Al hacer click en el input de cantidad, marcar checkbox y pintar la fila
$(document).on("click", "#cantidad_ingresar_des", function () {
    let row = $(this).closest("tr");
    let checkbox = row.find("#gen_rotulo_des");

    // Marcar el checkbox si aún no está marcado
    if (!checkbox.prop("checked")) {
        checkbox.prop("checked", true);
    }

    actualizarFilaDespa(checkbox);
});


function actualizarFilaDespa(checkbox) {
    var checkbox2 = $("#tabla_rotulo_depas tbody tr").find("#gen_rotulo_des");
    var cant = checkbox2.closest("tr").find("#gen_rotulo_des:checked").length;
    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }

    if (cant > 0) {
        // $("#enviar").removeClass("disabledTab");
        // $("#enviar").addClass("activeTab");
    } else {
        // $("#enviar").removeClass("activeTab");
        // $("#enviar").addClass("disabledTab");
    }
}




function confirmarImpresion() {

    var selectedRow = document.querySelector('#gen_idr_ruta:checked'); // Captura el checkbox marcado

    if (selectedRow) {
        var row = selectedRow.closest('.table-row');  // Busca la fila contenedora del checkbox


        // Captura la primera columna de la fila
        var idr = row.cells[1].innerText; // O .textContent si prefieres ese formato
        var fecha = row.cells[3].innerText;
        // console.log(fecha);

        var unidad = row.cells[4].innerText;
        var conductor = row.cells[5].innerText;
        var ayudante = row.cells[6].innerText;

        // Crea la URL para la impresión en PDF
        var url = "pdf_impresion_ruta.php?idr=" + idr + "&fecha=" + fecha + "&unidad=" + unidad + "&conductor=" + conductor + "&ayudante=" + ayudante;

        // Abre la URL en una nueva pestaña
        // window.open(url, '_blank');
        $(document).ready(function () {
            var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(url); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

            window.open(contenedorUrl, "_blank");
        });
    } else {
        alert('Por favor seleccione una fila.');
    }

}




function imprimir_r1() {

    var docentry = $("#docito_ge_rotulo").val();
    var empresa = $("#empresa").val();
    var paquete = $("#id_paquete").val();
    bandera = true;

    let doc = [];

    $("[name='gen_rotulo[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
        codsap = $(this).parents("tr").find("td:eq(3)").text();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cantidad_fija = $(this).parents("tr").find("td:eq(7)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();
        um = $(this).parents("tr").find("td:eq(9)").text();
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            codsap: codsap,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cantidad_fija: cantidad_fija,
            cant: cant,
            um: um
        };

        // Agrega el objeto al array doc
        doc.push(itemData);
    });



    if (cant === '0') {
        alertify.error("Valor invalido");
        bandera = false;
    } else if (cant > cantidad_fija) {
        alertify.error("El valor no puede ser mayor a " + cantidad_fija);
        bandera = false;
    } else if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        // var xd = "pdf_rotulo1.php?docentry=" + docentry + "&itemgr=" + itemgr + "&itemoc=" + itemoc + "&codsap=" + codsap + "&descripcion=" + descripcion + "&catalogo=" + catalogo + "&marca=" + marca + "&cant=" + cant + "&um=" + um+ "&doc=" + doc;

        var xd = "pdf_rotulo1_v2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa + "&paquete=" + paquete;


        // var xd = "pdf_gre_sunat_new_prue.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;


        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }


}

// function imprimir_r1() {

//     var docentry = $("#docito_ge_rotulo").val();
//     var empresa = $("#empresa").val();
//     var paquete = $("#id_paquete").val();
//     var bandera = true;

//     let doc = [];

//     $("[name='gen_rotulo[]']:checked").each(function (key) {

//         let itemgr = $(this).parents("tr").find("td:eq(1)").text();
//         let itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
//         let codsap = $(this).parents("tr").find("td:eq(3)").text();
//         let descripcion = $(this).parents("tr").find("td:eq(4)").text();
//         let catalogo = $(this).parents("tr").find("td:eq(5)").text();
//         let marca = $(this).parents("tr").find("td:eq(6)").text();
//         let cantidad_fija = $(this).parents("tr").find("td:eq(7)").text();
//         let cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();
//         let um = $(this).parents("tr").find("td:eq(9)").text();

//         // Validaciones básicas
//         if (cant === '0') {
//             alertify.error("Valor invalido");
//             bandera = false;
//             return false;
//         } else if (cant > cantidad_fija) {
//             alertify.error("El valor no puede ser mayor a " + cantidad_fija);
//             bandera = false;
//             return false;
//         } else if (cant === '') {
//             alertify.error("Ingresar Cantidad");
//             bandera = false;
//             return false;
//         }

//         // Crear objeto con los datos del ítem
//         let itemData = {
//             itemgr: itemgr,
//             itemoc: itemoc,
//             codsap: codsap,
//             descripcion: descripcion,
//             catalogo: catalogo,
//             marca: marca,
//             cantidad_fija: cantidad_fija,
//             cant: cant,
//             um: um
//         };

//         // Agregar al array
//         doc.push(itemData);
//     });

//     if (bandera === true && doc.length > 0) {

//         // Crear un formulario temporal para enviar los datos por POST
//         var form = $('<form>', {
//             method: 'POST',
//             action: 'pdf_rotulo1_v2.php',
//             target: 'iframe_pdf' // el iframe dentro del modal
//         });

//         // Agregar los datos al formulario
//         form.append($('<input>', { type: 'hidden', name: 'doc', value: JSON.stringify(doc) }));
//         form.append($('<input>', { type: 'hidden', name: 'docentry', value: docentry }));
//         form.append($('<input>', { type: 'hidden', name: 'empresa', value: empresa }));
//         form.append($('<input>', { type: 'hidden', name: 'paquete', value: paquete }));

//         // Agregar el formulario al body
//         $('body').append(form);

//         // Mostrar el modal y cargar el PDF
//         $('#modal_data_pdf').modal('show');
//         $('#modal_data_pdf').on('shown.bs.modal', function () {
//             $(this).find('iframe').attr('name', 'iframe_pdf');
//             form[0].submit(); // envía el formulario al iframe
//         }).on('hidden.bs.modal', function () {
//             $(this).find('iframe').attr('src', ''); // limpiar el iframe al cerrar
//         });

//         // Abrir en navegador nuevo (contenedor PDF)
//         $("#navegador").off("click").on("click", function () {
//             // Crear un formulario temporal para abrir en nueva pestaña
//             var formNav = $('<form>', {
//                 method: 'POST',
//                 action: 'pdf_rotulo1_v2.php',
//                 target: '_blank'
//             });
//             formNav.append($('<input>', { type: 'hidden', name: 'doc', value: JSON.stringify(doc) }));
//             formNav.append($('<input>', { type: 'hidden', name: 'docentry', value: docentry }));
//             formNav.append($('<input>', { type: 'hidden', name: 'empresa', value: empresa }));
//             formNav.append($('<input>', { type: 'hidden', name: 'paquete', value: paquete }));
//             $('body').append(formNav);
//             formNav[0].submit();
//             formNav.remove();
//         });

//         // Botón de impresión directa desde el iframe
//         $("#imprimir").off('click').on('click', function () {
//             $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//         });

//         // Limpiar formulario temporal después de enviarlo
//         form.remove();
//     }
// }




function imprimi_ruta() {
    $("#modal_id_imprimir_ruta").modal("show");

    $.ajax({
        beforeSend: function () {
            $("#tabla_ruta_imprimir").html("Buscando las ventas, un momento...");
        },
        url: "lista_idr_ruta.php",
        type: "POST",
        data: null,
        success: function (res) {
            // console.log(res);
            $("#tabla_ruta_imprimir").html(res);
            $("#tabla_idr_ruta").DataTable();

        },
        error: function (jqXHR, estado, error) {
            $("#tabla_ruta_imprimir").html(estado + "     " + error);
        },
    });

}

function imprimi_ruta_directo_indi(id) {
    console.log(id);

    const [idr, doc_guia, conductor, unidad, ayudante, fecha] = id.split('/'); // Divide el ID en partes


    var url = "pdf_impresion_ruta_linea2.php?idr=" + idr + "&fecha=" + fecha + "&unidad=" + unidad + "&conductor=" + conductor + "&ayudante=" + ayudante + "&doc_guia=" + doc_guia;


    $('#modal_data_pdf_control_ruta_indi').modal('show');
    $('#modal_data_pdf_control_ruta_indi').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', url);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', '');
    });

    $("#navegador_2")
        .off("click")
        .on("click", function () {
            var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(url);

            window.open(contenedorUrl, "_blank");
        });

    $("#imprimir_2").off('click').on('click', function () {
        $('#modal_data_pdf_control_ruta_indi').find('iframe')[0].contentWindow.print();
    });

}

function imprimi_ruta_directo_indi_pro(id) {
    console.log(id);

    const [idr, doc_guia, conductor, unidad, ayudante, fecha] = id.split('/'); // Divide el ID en partes


    var url = "pdf_impresion_ruta_linea3.php?idr=" + idr + "&fecha=" + fecha + "&unidad=" + unidad + "&conductor=" + conductor + "&ayudante=" + ayudante + "&doc_guia=" + doc_guia;


    $('#modal_data_pdf_control_ruta_indi').modal('show');
    $('#modal_data_pdf_control_ruta_indi').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', url);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', '');
    });

    $("#navegador_2")
        .off("click")
        .on("click", function () {
            var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(url);

            window.open(contenedorUrl, "_blank");
        });

    $("#imprimir_2").off('click').on('click', function () {
        $('#modal_data_pdf_control_ruta_indi').find('iframe')[0].contentWindow.print();
    });

}




// function imprimir_r1_pro3() {

//     var docentry = $("#docito_ge_rotulo_pro3").val();
//     var empresa = $("#empresa3").val();
//     var paquete = $("#id_paquete3").val();
//     bandera = true;

//     let doc = [];

//     $("[name='gen_rotulo_pro3[]']:checked").each(function (key) {

//         itemgr = $(this).parents("tr").find("td:eq(1)").text();
//         itemoc = $(this).parents("tr").find('input[id="item_oc_pro3"]').val();
//         codsap = $(this).parents("tr").find("td:eq(3)").text();
//         descripcion = $(this).parents("tr").find("td:eq(4)").text();
//         catalogo = $(this).parents("tr").find("td:eq(5)").text();
//         marca = $(this).parents("tr").find("td:eq(6)").text();
//         cantidad_fija = $(this).parents("tr").find("td:eq(7)").text();
//         cant = $(this).parents("tr").find('input[id="cantidad_ingresar_pro3"]').val();
//         um = $(this).parents("tr").find("td:eq(9)").text();
//         let itemData = {
//             itemgr: itemgr,
//             itemoc: itemoc,
//             codsap: codsap,
//             descripcion: descripcion,
//             catalogo: catalogo,
//             marca: marca,
//             cantidad_fija: cantidad_fija,
//             cant: cant,
//             um: um
//         };

//         // Agrega el objeto al array doc
//         doc.push(itemData);
//     });


//     if (cant === '0') {
//         alertify.error("Valor invalido");
//         bandera = false;
//     } else if (cant > cantidad_fija) {
//         alertify.error("El valor no puede ser mayor a " + cantidad_fija);
//         bandera = false;
//     } else if (cant == '') {
//         alertify.error("Ingresar Cantidad");
//         bandera = false;
//     }



//     if (bandera === true) {
//         // var xd = "pdf_rotulo1.php?docentry=" + docentry + "&itemgr=" + itemgr + "&itemoc=" + itemoc + "&codsap=" + codsap + "&descripcion=" + descripcion + "&catalogo=" + catalogo + "&marca=" + marca + "&cant=" + cant + "&um=" + um+ "&doc=" + doc;

//         var xd = "pdf_rotulo1_v2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa + "&paquete=" + paquete;


//         // var xd = "pdf_gre_sunat_new_prue.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;


//         $('#modal_data_pdf').modal('show');
//         $('#modal_data_pdf').on('shown.bs.modal', function () {
//             $(this).find('iframe').attr('src', xd);
//         }).on('hidden.bs.modal', function () {
//             $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
//         });

//         // $("#navegador").off('click').on('click', function () {
//         //     window.open(xd, '_blank');
//         // });
//         $("#navegador")
//             .off("click")
//             .on("click", function () {
//                 var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
//           "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
//           "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

//                 window.open(contenedorUrl, "_blank");
//             });

//         $("#imprimir").off('click').on('click', function () {
//             $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//         });
//     }


// }

function imprimir_r1_pro3() {
    var docentry = $("#docito_ge_rotulo_pro3").val();
    var empresa = $("#empresa3").val();
    var paquete = $("#id_paquete3").val();
    var bandera = true;

    let doc = [];

    $("[name='gen_rotulo_pro3[]']:checked").each(function () {
        let itemgr = $(this).parents("tr").find("td:eq(1)").text();
        let itemoc = $(this).parents("tr").find('input[id="item_oc_pro3"]').val();
        let codsap = $(this).parents("tr").find("td:eq(3)").text();
        let descripcion = $(this).parents("tr").find("td:eq(4)").text();
        let catalogo = $(this).parents("tr").find("td:eq(5)").text();
        let marca = $(this).parents("tr").find("td:eq(6)").text();
        let cantidad_fija = $(this).parents("tr").find("td:eq(7)").text();
        let cant = $(this).parents("tr").find('input[id="cantidad_ingresar_pro3"]').val();
        let um = $(this).parents("tr").find("td:eq(9)").text();

        if (cant === '0') {
            alertify.error("Valor inválido");
            bandera = false;
            return false;
        } else if (cant > cantidad_fija) {
            alertify.error("El valor no puede ser mayor a " + cantidad_fija);
            bandera = false;
            return false;
        } else if (cant === '') {
            alertify.error("Ingresar Cantidad");
            bandera = false;
            return false;
        }

        doc.push({
            itemgr, itemoc, codsap, descripcion, catalogo, marca,
            cantidad_fija, cant, um
        });
    });

    if (bandera && doc.length > 0) {
        // Crear formulario temporal para enviar datos por POST
        var form = $('<form>', {
            method: 'POST',
            action: 'pdf_rotulo1_v2_prueba.php',
            target: 'iframe_pdf' // debe coincidir con name del iframe
        });

        form.append($('<input>', { type: 'hidden', name: 'doc', value: JSON.stringify(doc) }));
        form.append($('<input>', { type: 'hidden', name: 'docentry', value: docentry }));
        form.append($('<input>', { type: 'hidden', name: 'empresa', value: empresa }));
        form.append($('<input>', { type: 'hidden', name: 'paquete', value: paquete }));

        $('body').append(form);

        // Mostrar el modal
        $('#modal_data_pdf_v2').modal('show');

        // Enviar el formulario al iframe
        form[0].submit();

        // Limpiar formulario temporal después de enviarlo
        form.remove();

        // Botón "Abrir en navegador"
        $("#navegador_v2").off("click").on("click", function () {
            var formNav = $('<form>', {
                method: 'POST',
                action: 'pdf_rotulo1_v2_prueba.php',
                target: '_blank'
            });
            formNav.append($('<input>', { type: 'hidden', name: 'doc', value: JSON.stringify(doc) }));
            formNav.append($('<input>', { type: 'hidden', name: 'docentry', value: docentry }));
            formNav.append($('<input>', { type: 'hidden', name: 'empresa', value: empresa }));
            formNav.append($('<input>', { type: 'hidden', name: 'paquete', value: paquete }));
            $('body').append(formNav);
            formNav[0].submit();
            formNav.remove();
        });
    }
}


function imprimir_r1_pro() {

    var docentry = $("#docito_ge_rotulo_pro").val();
    var empresa = $("#empresa2").val();
    var paquete = $("#id_paquete2").val();
    bandera = true;

    let doc = [];

    $("[name='gen_rotulo_pro[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc_pro"]').val();
        codsap = $(this).parents("tr").find("td:eq(3)").text();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cantidad_fija = $(this).parents("tr").find("td:eq(7)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar_pro"]').val();
        um = $(this).parents("tr").find("td:eq(9)").text();
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            codsap: codsap,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cantidad_fija: cantidad_fija,
            cant: cant,
            um: um
        };

        // Agrega el objeto al array doc
        doc.push(itemData);
    });




    if (cant === '0') {
        alertify.error("Valor invalido");
        bandera = false;
    } else if (cant > cantidad_fija) {
        alertify.error("El valor no puede ser mayor a " + cantidad_fija);
        bandera = false;
    } else if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        // var xd = "pdf_rotulo1.php?docentry=" + docentry + "&itemgr=" + itemgr + "&itemoc=" + itemoc + "&codsap=" + codsap + "&descripcion=" + descripcion + "&catalogo=" + catalogo + "&marca=" + marca + "&cant=" + cant + "&um=" + um+ "&doc=" + doc;

        var xd = "pdf_rotulo1_v2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa + "&paquete=" + paquete;


        // var xd = "pdf_gre_sunat_new_prue.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;


        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }

}


function imprimir_r1_Des() {

    var docentry = $("#docito_ge_rotulo_Des").val();
    var empresa = $("#empresa_despa").val();
    var paquete = $("#id_paquete_Des").val();
    bandera = true;

    let doc = [];

    $("[name='gen_rotulo_des[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc_despa"]').val();
        codsap = $(this).parents("tr").find("td:eq(3)").text();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cantidad_fija = $(this).parents("tr").find("td:eq(7)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar_des"]').val();
        um = $(this).parents("tr").find("td:eq(9)").text();
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            codsap: codsap,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cantidad_fija: cantidad_fija,
            cant: cant,
            um: um
        };

        // Agrega el objeto al array doc
        doc.push(itemData);
    });



    if (cant === '0') {
        alertify.error("Valor invalido");
        bandera = false;
    } else if (cant > cantidad_fija) {
        alertify.error("El valor no puede ser mayor a " + cantidad_fija);
        bandera = false;
    } else if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        // var xd = "pdf_rotulo1.php?docentry=" + docentry + "&itemgr=" + itemgr + "&itemoc=" + itemoc + "&codsap=" + codsap + "&descripcion=" + descripcion + "&catalogo=" + catalogo + "&marca=" + marca + "&cant=" + cant + "&um=" + um+ "&doc=" + doc;

        var xd = "pdf_rotulo1_v2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa + "&paquete=" + paquete;


        // var xd = "pdf_gre_sunat_new_prue.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;


        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }


}



function imprimir_r2() {

    var docentry = $("#docito_ge_rotulo").val();
    var empresa = $("#empresa").val();
    bandera = true;
    let doc = [];
    $("[name='gen_rotulo[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

        //console.log(descripcion)
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cant: cant,
        };
        doc.push(itemData);

    });


    if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        var xd = "pdf_rotulo2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }

}

function imprimir_r2_pro3() {

    var docentry = $("#docito_ge_rotulo_pro3").val();
    var empresa = $("#empresa3").val();
    bandera = true;
    let doc = [];
    $("[name='gen_rotulo_pro3[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc_pro3"]').val();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar_pro3"]').val();

        //console.log(descripcion)
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cant: cant,
        };
        doc.push(itemData);

    });


    if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        var xd = "pdf_rotulo2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }

}

function imprimir_r2_pro() {

    var docentry = $("#docito_ge_rotulo_pro").val();
    var empresa = $("#empresa2").val();
    bandera = true;
    let doc = [];
    $("[name='gen_rotulo_pro[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc_pro"]').val();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar_pro"]').val();

        //console.log(descripcion)
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cant: cant,
        };
        doc.push(itemData);

    });


    if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        var xd = "pdf_rotulo2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }

}



function imprimir_r2_Des() {

    var docentry = $("#docito_ge_rotulo_Des").val();
    var empresa = $("#empresa_despa").val();
    bandera = true;
    let doc = [];
    $("[name='gen_rotulo_des[]']:checked").each(function (key) {

        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc_despa"]').val();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar_des"]').val();

        //console.log(descripcion)
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cant: cant,
        };
        doc.push(itemData);

    });


    if (cant == '') {
        alertify.error("Ingresar Cantidad");
        bandera = false;
    }

    if (bandera === true) {
        var xd = "pdf_rotulo2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }

}



function imprimir_r_agencia() {

    var docentry = $("#docito_pro").val();
    var empresa = $("#empresa2").val();
    bandera = true;
    // let doc = [];
    // $("[name='gen_rotulo[]']:checked").each(function (key) {

    //     itemgr = $(this).parents("tr").find("td:eq(1)").text();
    //     itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
    //     descripcion = $(this).parents("tr").find("td:eq(4)").text();
    //     catalogo = $(this).parents("tr").find("td:eq(5)").text();
    //     marca = $(this).parents("tr").find("td:eq(6)").text();
    //     cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

    //     //console.log(descripcion)
    //     let itemData = {
    //         itemgr: itemgr,
    //         itemoc: itemoc,
    //         descripcion: descripcion,
    //         catalogo: catalogo,
    //         marca: marca,
    //         cant: cant,
    //     };
    //     doc.push(itemData);

    // });


    // if (cant == '') {
    //     alertify.error("Ingresar Cantidad");
    //     bandera = false;
    // }

    if (bandera === true) {
        // var xd = "pdf_rotulo3_agencia.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;
        var xd = "pdf_rotulo3_agencia.php?&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf_agencia').modal('show');
        $('#modal_data_pdf_agencia').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador4")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf_agencia').find('iframe')[0].contentWindow.print();
        });
    }

}

function imprimir_r_agencia_pro() {

    var docentry = $("#docito_ge_rotulo_pro").val();
    var empresa = $("#empresa2").val();
    bandera = true;
    // let doc = [];
    // $("[name='gen_rotulo[]']:checked").each(function (key) {

    //     itemgr = $(this).parents("tr").find("td:eq(1)").text();
    //     itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
    //     descripcion = $(this).parents("tr").find("td:eq(4)").text();
    //     catalogo = $(this).parents("tr").find("td:eq(5)").text();
    //     marca = $(this).parents("tr").find("td:eq(6)").text();
    //     cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

    //     //console.log(descripcion)
    //     let itemData = {
    //         itemgr: itemgr,
    //         itemoc: itemoc,
    //         descripcion: descripcion,
    //         catalogo: catalogo,
    //         marca: marca,
    //         cant: cant,
    //     };
    //     doc.push(itemData);

    // });


    // if (cant == '') {
    //     alertify.error("Ingresar Cantidad");
    //     bandera = false;
    // }

    if (bandera === true) {
        // var xd = "pdf_rotulo3_agencia.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;
        var xd = "pdf_rotulo3_agencia.php?&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf_agencia').modal('show');
        $('#modal_data_pdf_agencia').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador4")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf_agencia').find('iframe')[0].contentWindow.print();
        });
    }

}

function imprimir_r_agencia_pro3() {

    var docentry = $("#docito_ge_rotulo_pro3").val();
    var empresa = $("#empresa3").val();
    bandera = true;
    // let doc = [];
    // $("[name='gen_rotulo[]']:checked").each(function (key) {

    //     itemgr = $(this).parents("tr").find("td:eq(1)").text();
    //     itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
    //     descripcion = $(this).parents("tr").find("td:eq(4)").text();
    //     catalogo = $(this).parents("tr").find("td:eq(5)").text();
    //     marca = $(this).parents("tr").find("td:eq(6)").text();
    //     cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

    //     //console.log(descripcion)
    //     let itemData = {
    //         itemgr: itemgr,
    //         itemoc: itemoc,
    //         descripcion: descripcion,
    //         catalogo: catalogo,
    //         marca: marca,
    //         cant: cant,
    //     };
    //     doc.push(itemData);

    // });


    // if (cant == '') {
    //     alertify.error("Ingresar Cantidad");
    //     bandera = false;
    // }

    if (bandera === true) {
        // var xd = "pdf_rotulo3_agencia.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;
        var xd = "pdf_rotulo3_agencia.php?&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf_agencia').modal('show');
        $('#modal_data_pdf_agencia').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador4")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf_agencia').find('iframe')[0].contentWindow.print();
        });
    }

}



function imprimir_r_agencia_Des() {

    var docentry = $("#docito_ge_rotulo_Des").val();
    var empresa = $("#empresa_despa").val();
    bandera = true;
    // let doc = [];
    // $("[name='gen_rotulo[]']:checked").each(function (key) {

    //     itemgr = $(this).parents("tr").find("td:eq(1)").text();
    //     itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
    //     descripcion = $(this).parents("tr").find("td:eq(4)").text();
    //     catalogo = $(this).parents("tr").find("td:eq(5)").text();
    //     marca = $(this).parents("tr").find("td:eq(6)").text();
    //     cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

    //     //console.log(descripcion)
    //     let itemData = {
    //         itemgr: itemgr,
    //         itemoc: itemoc,
    //         descripcion: descripcion,
    //         catalogo: catalogo,
    //         marca: marca,
    //         cant: cant,
    //     };
    //     doc.push(itemData);

    // });


    // if (cant == '') {
    //     alertify.error("Ingresar Cantidad");
    //     bandera = false;
    // }

    if (bandera === true) {
        // var xd = "pdf_rotulo3_agencia.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;
        var xd = "pdf_rotulo3_agencia.php?&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf_agencia').modal('show');
        $('#modal_data_pdf_agencia').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador4")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf_agencia').find('iframe')[0].contentWindow.print();
        });
    }

}



function imprimir_r_agencia_r3() {

    var docentry = $("#docito").val();
    var empresa = $("#empresa").val();
    bandera = true;
    // let doc = [];
    // $("[name='gen_rotulo[]']:checked").each(function (key) {

    //     itemgr = $(this).parents("tr").find("td:eq(1)").text();
    //     itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
    //     descripcion = $(this).parents("tr").find("td:eq(4)").text();
    //     catalogo = $(this).parents("tr").find("td:eq(5)").text();
    //     marca = $(this).parents("tr").find("td:eq(6)").text();
    //     cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

    //     //console.log(descripcion)
    //     let itemData = {
    //         itemgr: itemgr,
    //         itemoc: itemoc,
    //         descripcion: descripcion,
    //         catalogo: catalogo,
    //         marca: marca,
    //         cant: cant,
    //     };
    //     doc.push(itemData);

    // });


    // if (cant == '') {
    //     alertify.error("Ingresar Cantidad");
    //     bandera = false;
    // }

    if (bandera === true) {
        // var xd = "pdf_rotulo3_agencia.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry + "&empresa=" + empresa;
        var xd = "pdf_rotulo3_agencia.php?&docentry=" + docentry + "&empresa=" + empresa;

        $('#modal_data_pdf_agencia').modal('show');
        $('#modal_data_pdf_agencia').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });

        // $("#navegador").off('click').on('click', function () {
        //     window.open(xd, '_blank');
        // });
        $("#navegador4")
            .off("click")
            .on("click", function () {
                var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

                window.open(contenedorUrl, "_blank");
            });

        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf_agencia').find('iframe')[0].contentWindow.print();
        });
    }

}



function registrar_ruta() {
    fecha = $("#fecha").val();
    id_conductor = $("#id_conductor option:selected").val();
    id_ayudante = $("#id_ayudante option:selected").val();
    id_unidad = $("#id_unidad option:selected").val();
    docentry = $("#docito_asigna_ruta").val();
    empresa = $("#empresa_asignar_ruta").val();
    tipo = $("#tipo_asignar_ruta").val();
    var bandera = true;

    if (id_conductor === '0') {
        alertify.error("Elija Conductor")
        bandera = false;
        return
    }
    if (id_unidad === '0') {
        alertify.error("Elija Unidad")
        bandera = false;
        return
    }
    if (fecha === '') {
        alertify.error("Elija Fecha de Despacho")
        bandera = false;
        return
    }

    if (bandera === true) {
        var idr_nuevo = 0;
        $.ajax({
            beforeSend: function () {
                // Se puede agregar un swal de carga aquí si se desea
            },
            url: 'consulta_max_idr.php',
            type: 'POST',
            data: null,
            success: function (x) {
                console.log("IDR Recibido:", x);
                idr_nuevo = parseInt(x.trim());

                // Iniciamos el registro de pedidos SOLO después de recibir el IDR
                for (let i = 0; i < array_docs.length; i++) {
                    console.log(`Registrando Docentry: ${array_docs[i].docentry} con IDR: ${idr_nuevo}`);

                    $.ajax({
                        url: "registrar_ruta.php",
                        type: "POST",
                        data:
                            "docentry=" +
                            array_docs[i].docentry +
                            "&fecha=" +
                            fecha +
                            "&id_conductor=" +
                            id_conductor +
                            "&id_ayudante=" +
                            id_ayudante +
                            "&id_unidad=" +
                            id_unidad +
                            "&empresa=" +
                            array_docs[i].empresa +
                            "&tipo=" +
                            array_docs[i].tipo +
                            "&idr=" +
                            idr_nuevo,
                        success: function () {
                            // Éxito individual
                        },
                        error: function (jqXHR, estado, error) {
                            $("#errores").html("Error... " + estado + "  " + error);
                        },
                    });
                }

                // Finalizamos el proceso después de lanzar todas las peticiones
                // Usamos un pequeño delay para asegurar que el backend procese antes de recargar las listas
                setTimeout(() => {
                    $("#modal_asignar_ruta").modal("hide");
                    swal("Se registró correctamente", {
                        icon: "success",
                        timer: 1500,
                        buttons: false,
                    });
                    busca_listosDespachos();
                    busca_Lista_programados();
                }, 1000);
            },
            error: function (jqXHR, estado, error) {
                alertify.error("Error al obtener IDR: " + error);
            }
        });
    }

}

function imprimir_r3() {
    var docentry = $("#docito_ge_rotulo").val();
    bandera = true;
    let doc = [];
    $("[name='gen_rotulo[]']:checked").each(function (key) {
        itemgr = $(this).parents("tr").find("td:eq(1)").text();
        itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
        descripcion = $(this).parents("tr").find("td:eq(4)").text();
        catalogo = $(this).parents("tr").find("td:eq(5)").text();
        marca = $(this).parents("tr").find("td:eq(6)").text();
        cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();
        let itemData = {
            itemgr: itemgr,
            itemoc: itemoc,
            descripcion: descripcion,
            catalogo: catalogo,
            marca: marca,
            cant: cant,
        };
        doc.push(itemData);
    });
    if (bandera === true) {
        var xd = "pdf_rotulo3.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry;
        $('#modal_data_pdf').modal('show');
        $('#modal_data_pdf').on('shown.bs.modal', function () {
            $(this).find('iframe').attr('src', xd);
        }).on('hidden.bs.modal', function () {
            $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
        });
        $("#navegador").off('click').on('click', function () {
            window.open(xd, '_blank');
        });
        $("#imprimir").off('click').on('click', function () {
            $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
        });
    }

}


$(document).on("click", "#cantidad_ingresar", function () {
    var valor = $(this).val();

    if (valor.length > 0) {
        if ($(this).is('input[type="number"]')) {
            $(this).parents("tr").find("td").css("background-color", "LightGreen");

            $(this)
                .parents("tr")
                .find('td:eq(0) input[type="checkbox"]')
                .prop("checked", true);
        } else {
            $(this).parents("tr").find("td").css("background-color", "white");
            console.log("ssasds");

        }
    } else {
        $(this).closest("tr").find("td").css("background-color", "");
        $(this)
            .parents("tr")
            .find('td:eq(0) input[type="checkbox"]')
            .prop("checked", false);
    }
});


$(document).on("click", "#item_oc", function () {
    var valor = $(this).val();

    if (valor.length > 0) {
        if ($(this).is('input[type="number"]')) {
            $(this).parents("tr").find("td").css("background-color", "LightGreen");

            $(this)
                .parents("tr")
                .find('td:eq(0) input[type="checkbox"]')
                .prop("checked", true);
        } else {
            $(this).parents("tr").find("td").css("background-color", "white");

        }
    } else {
        $(this).closest("tr").find("td").css("background-color", "");
        $(this)
            .parents("tr")
            .find('td:eq(0) input[type="checkbox"]')
            .prop("checked", false);
    }
});







function quitarAcentos(cadena) {
    const acentos = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
        Á: "A",
        É: "E",
        Í: "I",
        Ó: "O",
        Ú: "U",
        Ñ: "N",
        ñ: "n",
        ç: "c",
        Ç: "C",
        à: "a",
        è: "e",
        ì: "i",
        ò: "o",
        ù: "u",
        À: "A",
        È: "E",
        Ì: "I",
        Ò: "O",
        Ù: "U",
        "&": "",
    };
    return cadena
        .split("")
        .map((letra) => acentos[letra] || letra)
        .join("")
        .toString()
        .replace(/['"]+/g, "");
}




function guardar_form() {

    id_docentry = $("#docito_adicionales").val();
    id_observaciones = quitarAcentos($("#id_observaciones").val());
    id_emp = quitarAcentos($("#id_emp").val());
    id_dir_trans = quitarAcentos($("#id_dir_trans").val());
    id_ubicacion = quitarAcentos($("#id_ubicacion").val());
    id_dir_destino = quitarAcentos($("#id_dir_destino").val());
    id_moda_destino = $("#id_moda_destino option:selected").val();
    id_moda_pago = $("#id_moda_pago option:selected").val();
    empresa = $("#empresa").val();




    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    // Obtén el nombre del archivo de la tabla
    $("#tabla_archivos tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivo.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    $("#tabla_archivos_guia tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    // console.log(archivo, "archivo?");
    // console.log(archivoguia, "archivo?");

    var bandera = true;


    $("#miTabla > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1"]').val();
        dni1 = $(this).find("td").find('input[id="dni1"]').val();
        tele1 = $(this).find("td").find('input[id="tele1"]').val();
    });


    $("#miTabla1 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2"]').val();
        dni2 = $(this).find("td").find('input[id="dni2"]').val();
        tele2 = $(this).find("td").find('input[id="tele2"]').val();
    });


    $("#miTabla2 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3"]').val();
        dni3 = $(this).find("td").find('input[id="dni3"]').val();
        tele3 = $(this).find("td").find('input[id="tele3"]').val();
    });


    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad Destino");
    }

    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad de Pago");
    }

    if ($("#id_ubicacion").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {

        $.ajax({
            beforeSend: function () { },
            url: "registrar_datos_adicionales.php",
            type: "POST",
            data:
                "id_docentry=" +
                id_docentry +
                "&id_observaciones=" +
                id_observaciones +
                "&id_emp=" +
                id_emp +
                "&id_dir_trans=" +
                id_dir_trans +
                "&id_ubicacion=" +
                id_ubicacion +
                "&id_dir_destino=" +
                id_dir_destino +
                "&id_moda_destino=" +
                id_moda_destino +
                "&id_moda_pago=" +
                id_moda_pago +
                "&comta1=" +
                comta1 +
                "&dni1=" +
                dni1 +
                "&tele1=" +
                tele1 +
                "&comta2=" +
                comta2 +
                "&dni2=" +
                dni2 +
                "&tele2=" +
                tele2 +
                "&comta3=" +
                comta3 +
                "&dni3=" +
                dni3 +
                "&tele3=" +
                tele3 +
                "&archivo=" +
                archivo +
                "&archivoguia="
                + archivoguia +
                "&empresa="
                + empresa,
            success: function () {

                //console.log(global);
                // $("#num_tick_act").val(global);
                // $("#comentarios").val("");
                $("#modal_datos_adicionales").modal("hide");


                swal("Se registró correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

                $("#docito_adicionales").val("");
                $("#id_observaciones").val("");
                $("#id_emp").val("");
                $("#id_dir_trans").val("");
                $("#id_ubicacion").val("");
                $("#id_dir_destino").val("");
                // $("#id_moda_destino option:selected").val("");
                // $("#id_moda_pago option:selected").val("");



            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }
}






function guardar_form_pro() {

    id_docentry = $("#docito_adicionales_pro").val();
    id_observaciones = quitarAcentos($("#id_observaciones_pro").val());
    id_emp = quitarAcentos($("#id_emp_pro").val());
    id_dir_trans = quitarAcentos($("#id_dir_trans_pro").val());
    id_ubicacion = quitarAcentos($("#id_ubicacion_pro").val());
    id_dir_destino = quitarAcentos($("#id_dir_destino_pro").val());
    id_moda_destino = $("#id_moda_destino_pro option:selected").val();
    id_moda_pago = $("#id_moda_pago_pro option:selected").val();
    empresa = $("#empresa2").val();




    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    // Obtén el nombre del archivo de la tabla
    $("#tabla_archivos tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivo.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    $("#tabla_archivos_guia tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    // console.log(archivo, "archivo?");
    // console.log(archivoguia, "archivo?");

    var bandera = true;


    $("#miTabla_pro > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro"]').val();
    });


    $("#miTabla1_pro > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro"]').val();
    });


    $("#miTabla2_pro > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro"]').val();
    });


    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad Destino");
    }

    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad de Pago");
    }

    if ($("#id_ubicacion_pro").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {

        $.ajax({
            beforeSend: function () { },
            url: "registrar_datos_adicionales.php",
            type: "POST",
            data:
                "id_docentry=" +
                id_docentry +
                "&id_observaciones=" +
                id_observaciones +
                "&id_emp=" +
                id_emp +
                "&id_dir_trans=" +
                id_dir_trans +
                "&id_ubicacion=" +
                id_ubicacion +
                "&id_dir_destino=" +
                id_dir_destino +
                "&id_moda_destino=" +
                id_moda_destino +
                "&id_moda_pago=" +
                id_moda_pago +
                "&comta1=" +
                comta1 +
                "&dni1=" +
                dni1 +
                "&tele1=" +
                tele1 +
                "&comta2=" +
                comta2 +
                "&dni2=" +
                dni2 +
                "&tele2=" +
                tele2 +
                "&comta3=" +
                comta3 +
                "&dni3=" +
                dni3 +
                "&tele3=" +
                tele3 +
                "&archivo=" +
                archivo +
                "&archivoguia="
                + archivoguia +
                "&empresa="
                + empresa,
            success: function () {

                //console.log(global);
                // $("#num_tick_act").val(global);
                // $("#comentarios").val("");
                $("#modal_datos_adicionales_pro").modal("hide");


                swal("Se registró correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

                $("#docito_adicionales_pro").val("");
                $("#id_observaciones_pro").val("");
                $("#id_emp_pro").val("");
                $("#id_dir_trans_pro").val("");
                $("#id_ubicacion_pro").val("");
                $("#id_dir_destino_pro").val("");
                // $("#id_moda_destino option:selected").val("");
                // $("#id_moda_pago option:selected").val("");



            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }
}







function guardar_form_pro3() {

    id_docentry = $("#docito_adicionales_pro3").val();
    id_observaciones = quitarAcentos($("#id_observaciones_pro3").val());
    id_emp = quitarAcentos($("#id_emp_pro3").val());
    id_dir_trans = quitarAcentos($("#id_dir_trans_pro3").val());
    id_ubicacion = quitarAcentos($("#id_ubicacion_pro3").val());
    id_dir_destino = quitarAcentos($("#id_dir_destino_pro3").val());
    id_moda_destino = $("#id_moda_destino_pro3 option:selected").val();
    id_moda_pago = $("#id_moda_pago_pro3 option:selected").val();
    empresa = $("#empresa3").val();




    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    // Obtén el nombre del archivo de la tabla
    $("#tabla_archivos_pro3 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivo.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    $("#tabla_archivos_guia_pro3 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    // console.log(archivo, "archivo?");
    // console.log(archivoguia, "archivo?");

    var bandera = true;


    $("#miTabla_pro3 > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro3"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro3"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro3"]').val();
    });


    $("#miTabla1_pro3 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro3"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro3"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro3"]').val();
    });


    $("#miTabla2_pro3 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro3"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro3"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro3"]').val();
    });


    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad Destino");
    }

    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad de Pago");
    }

    if ($("#id_ubicacion_pro3").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {

        $.ajax({
            beforeSend: function () { },
            url: "registrar_datos_adicionales.php",
            type: "POST",
            data:
                "id_docentry=" +
                id_docentry +
                "&id_observaciones=" +
                id_observaciones +
                "&id_emp=" +
                id_emp +
                "&id_dir_trans=" +
                id_dir_trans +
                "&id_ubicacion=" +
                id_ubicacion +
                "&id_dir_destino=" +
                id_dir_destino +
                "&id_moda_destino=" +
                id_moda_destino +
                "&id_moda_pago=" +
                id_moda_pago +
                "&comta1=" +
                comta1 +
                "&dni1=" +
                dni1 +
                "&tele1=" +
                tele1 +
                "&comta2=" +
                comta2 +
                "&dni2=" +
                dni2 +
                "&tele2=" +
                tele2 +
                "&comta3=" +
                comta3 +
                "&dni3=" +
                dni3 +
                "&tele3=" +
                tele3 +
                "&archivo=" +
                archivo +
                "&archivoguia="
                + archivoguia +
                "&empresa="
                + empresa,
            success: function () {

                //console.log(global);
                // $("#num_tick_act").val(global);
                // $("#comentarios").val("");
                $("#modal_datos_adicionales_pro3").modal("hide");


                swal("Se registró correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

                $("#docito_adicionales_pro3").val("");
                $("#id_observaciones_pro3").val("");
                $("#id_emp_pro3").val("");
                $("#id_dir_trans_pro3").val("");
                $("#id_ubicacion_pro3").val("");
                $("#id_dir_destino_pro3").val("");
                // $("#id_moda_destino option:selected").val("");
                // $("#id_moda_pago option:selected").val("");



            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }
}
function guarda_actualiza_form3() {

    id_docentry = $("#docito_adicionales_pro3").val();
    id_observaciones = quitarAcentos($("#id_observaciones_pro3").val());
    id_emp = quitarAcentos($("#id_emp_pro3").val());
    id_dir_trans = quitarAcentos($("#id_dir_trans_pro3").val());
    id_ubicacion = quitarAcentos($("#id_ubicacion_pro3").val());
    id_dir_destino = quitarAcentos($("#id_dir_destino_pro3").val());
    id_moda_destino = $("#id_moda_destino_pro3 option:selected").val();
    id_moda_pago = $("#id_moda_pago_pro3 option:selected").val();
    empresa = $("#empresa3").val();




    let archivo = []; // Inicializa el nombre del archivo
    let archivoguia = [];
    // Obtén el nombre del archivo de la tabla
    $("#tabla_archivos_pro3 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivo.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    $("#tabla_archivos_guia_pro3 tbody tr").each(function () {
        let nombreArchivo = $(this).find("td").eq(1).text().trim(); // Obtener el texto de la segunda celda y eliminar espacios
        if (nombreArchivo) {
            archivoguia.push(nombreArchivo); // Agregar el nombre del archivo al array
        }
    });

    // console.log(archivo, "archivo?");
    // console.log(archivoguia, "archivo?");

    var bandera = true;


    $("#miTabla_pro3 > tbody > tr").each(function () {
        comta1 = $(this).find("td").find('input[id="conta1_pro3"]').val();
        dni1 = $(this).find("td").find('input[id="dni1_pro3"]').val();
        tele1 = $(this).find("td").find('input[id="tele1_pro3"]').val();
    });


    $("#miTabla1_pro3 > tbody > tr").each(function () {
        comta2 = $(this).find("td").find('input[id="conta2_pro3"]').val();
        dni2 = $(this).find("td").find('input[id="dni2_pro3"]').val();
        tele2 = $(this).find("td").find('input[id="tele2_pro3"]').val();
    });


    $("#miTabla2_pro3 > tbody > tr").each(function () {
        comta3 = $(this).find("td").find('input[id="conta3_pro3"]').val();
        dni3 = $(this).find("td").find('input[id="dni3_pro3"]').val();
        tele3 = $(this).find("td").find('input[id="tele3_pro3"]').val();
    });


    if (id_moda_destino === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad Destino");
    }

    if (id_moda_pago === '-1') {
        bandera = false;
        alertify.error("Seleccione modalidad de Pago");
    }

    if ($("#id_ubicacion_pro3").is(':disabled')) {
        bandera = false;
        alertify.error("Desbloquea los campos con el boton Editar");
    }


    if (bandera === true) {

        $.ajax({
            beforeSend: function () { },
            url: "actualizar_guarda_datos_adicionales.php",
            type: "POST",
            data:
                "id_docentry=" +
                id_docentry +
                "&id_observaciones=" +
                id_observaciones +
                "&id_emp=" +
                id_emp +
                "&id_dir_trans=" +
                id_dir_trans +
                "&id_ubicacion=" +
                id_ubicacion +
                "&id_dir_destino=" +
                id_dir_destino +
                "&id_moda_destino=" +
                id_moda_destino +
                "&id_moda_pago=" +
                id_moda_pago +
                "&comta1=" +
                comta1 +
                "&dni1=" +
                dni1 +
                "&tele1=" +
                tele1 +
                "&comta2=" +
                comta2 +
                "&dni2=" +
                dni2 +
                "&tele2=" +
                tele2 +
                "&comta3=" +
                comta3 +
                "&dni3=" +
                dni3 +
                "&tele3=" +
                tele3 +
                "&archivo=" +
                archivo +
                "&archivoguia="
                + archivoguia +
                "&empresa="
                + empresa,
            success: function () {

                //console.log(global);
                // $("#num_tick_act").val(global);
                // $("#comentarios").val("");
                $("#modal_datos_adicionales_pro3").modal("hide");


                swal("Se registró correctamente", {
                    icon: "success",
                    timer: 2000, // tiempo en milisegundos
                    buttons: false, // desactiva el botón para cerrar
                });

                $("#docito_adicionales_pro3").val("");
                $("#id_observaciones_pro3").val("");
                $("#id_emp_pro3").val("");
                $("#id_dir_trans_pro3").val("");
                $("#id_ubicacion_pro3").val("");
                $("#id_dir_destino_pro3").val("");
                // $("#id_moda_destino option:selected").val("");
                // $("#id_moda_pago option:selected").val("");



            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
    }
}







function consulta_datos() {
    $.ajax({
        url: "busca_datos.php",

        type: "POST",
        data: null,
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");


            // $("#id_usuario_pedi").val(idcl[1]);
            // $("#id_contra_codi").val(idcl[2]);
            // $("#id_usuario_cod").val(idcl[0]);

        },
        error: function (jqXHR, estado, error) { },
    });

}



function consulta_data_AD(docentry) {
    $.ajax({
        url: "busca_data_AD.php",
        type: "POST",
        data: { docentry },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            $("#id_observaciones").val(idcl[20].toString().trim());
            $("#id_emp").val(idcl[1]);
            $("#id_dir_trans").val(idcl[2]);
            $("#id_ubicacion").val(idcl[3]);
            $("#id_dir_destino").val(idcl[4]);

            console.log(idcl[4]);


            moda_destino = idcl[5];
            moda_pago = idcl[6];
            $("#conta1").val(idcl[7]);
            $("#dni1").val(idcl[8]);
            $("#tele1").val(idcl[9]);

            $("#conta2").val(idcl[10]);
            $("#dni2").val(idcl[11]);
            $("#tele2").val(idcl[12]);

            $("#conta3").val(idcl[13]);
            $("#dni3").val(idcl[14]);
            $("#tele3").val(idcl[15]);
            $("#n_guia").val(idcl[21]);
            // $("#n_guia").val(idcl[21]);
            $("#oc_cargar").val(idcl[22]);

            console.log(idcl[21], "n guia");

            $("#docentry_OC_subir").val(docentry);
            var doc_comparacion = idcl[16];
            // var archivos = idcl[18];
            // var archivo_guia = idcl[19];
            // let archivosTable_OC = $("#tabla_archivos_registrados tbody");
            // archivosTable_OC.empty();

            // if (archivos && archivos.length > 0) {
            //     var archivoArray = archivos.split(",");
            //     archivoArray.forEach(function (archivo, index) {
            //         var row_guia = archivosTable_OC[0].insertRow();

            //         var cellNum = row_guia.insertCell(0);
            //         var cellNombre = row_guia.insertCell(1);
            //         var cellAccion = row_guia.insertCell(2);

            //         cellNum.textContent = index + 1;

            //         cellNombre.textContent = archivo;

            //         cellAccion.innerHTML = `
            //             <button onclick="eliminarArchivo(this)">Eliminar</button>
            //             <button onclick="abrirModalVisualizarArchivo('${archivo}', '${archivo}')">Imprimir</button>
            //         `;
            //     });
            // } else {
            //     console.log("No hay archivos para mostrar");
            // }
            // let archivosTable = $("#tabla_archivos_oc tbody");
            // if (archivos) {
            //     var row_guia = archivosTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivos;
            // }
            // let archivoGuiaTable = $("#tabla_archivos_guia tbody");
            // if (archivo_guia) {
            //     var row_guia = archivoGuiaTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivo_guia;
            // }
            // Control de botones
            $("#btn_guardarAC").show();

            // if (docentry === doc_comparacion) {
            //     $("#btn_guardar").hide();
            //     $("#btn_actualizar").show();
            // } else {
            //     $("#btn_actualizar").hide();
            //     $("#btn_guardar").show();
            // }
        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}

function consulta_data_AD_fin(docentry) {
    $.ajax({
        url: "busca_data_AD.php",
        type: "POST",
        data: { docentry },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            $("#id_observaciones_fin").val(idcl[20].toString().trim());
            $("#id_emp_fin").val(idcl[1]);
            $("#id_dir_trans_fin").val(idcl[2]);
            $("#id_ubicacion_fin").val(idcl[3]);
            $("#id_dir_destino_fin").val(idcl[4]);

            moda_destino = idcl[5];
            moda_pago = idcl[6];
            $("#conta1_fin").val(idcl[7]);
            $("#dni1_fin").val(idcl[8]);
            $("#tele1_fin").val(idcl[9]);

            $("#conta2_fin").val(idcl[10]);
            $("#dni2_fin").val(idcl[11]);
            $("#tele2_fin").val(idcl[12]);

            $("#conta3_fin").val(idcl[13]);
            $("#dni3_fin").val(idcl[14]);
            $("#tele3_fin").val(idcl[15]);
            $("#n_guia_fin").val(idcl[21]);
            // $("#n_guia").val(idcl[21]);
            $("#oc_cargar_fin").val(idcl[22]);

            console.log(idcl[21], "n guia");

            $("#docentry_OC_subir").val(docentry);
            var doc_comparacion = idcl[16];
            // var archivos = idcl[18];
            // var archivo_guia = idcl[19];
            // let archivosTable_OC = $("#tabla_archivos_registrados tbody");
            // archivosTable_OC.empty();

            // if (archivos && archivos.length > 0) {
            //     var archivoArray = archivos.split(",");
            //     archivoArray.forEach(function (archivo, index) {
            //         var row_guia = archivosTable_OC[0].insertRow();

            //         var cellNum = row_guia.insertCell(0);
            //         var cellNombre = row_guia.insertCell(1);
            //         var cellAccion = row_guia.insertCell(2);

            //         cellNum.textContent = index + 1;

            //         cellNombre.textContent = archivo;

            //         cellAccion.innerHTML = `
            //             <button onclick="eliminarArchivo(this)">Eliminar</button>
            //             <button onclick="abrirModalVisualizarArchivo('${archivo}', '${archivo}')">Imprimir</button>
            //         `;
            //     });
            // } else {
            //     console.log("No hay archivos para mostrar");
            // }
            // let archivosTable = $("#tabla_archivos_oc tbody");
            // if (archivos) {
            //     var row_guia = archivosTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivos;
            // }
            // let archivoGuiaTable = $("#tabla_archivos_guia tbody");
            // if (archivo_guia) {
            //     var row_guia = archivoGuiaTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivo_guia;
            // }
            // Control de botones
            $("#btn_guardarAC_fin").show();

            // if (docentry === doc_comparacion) {
            //     $("#btn_guardar").hide();
            //     $("#btn_actualizar").show();
            // } else {
            //     $("#btn_actualizar").hide();
            //     $("#btn_guardar").show();
            // }
        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}




function consulta_data_AD_pro(docentry) {
    $.ajax({
        url: "busca_data_AD.php",
        type: "POST",
        data: { docentry },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            $("#id_observaciones_pro").val(idcl[0].toString().trim());
            $("#id_emp_pro").val(idcl[1]);
            $("#id_dir_trans_pro").val(idcl[2]);
            $("#id_ubicacion_pro").val(idcl[3]);
            $("#id_dir_destino_pro").val(idcl[4]);

            moda_destino = idcl[5];
            moda_pago = idcl[6];
            $("#conta1_pro").val(idcl[7]);
            $("#dni1_pro").val(idcl[8]);
            $("#tele1_pro").val(idcl[9]);

            $("#conta2_pro").val(idcl[10]);
            $("#dni2_pro").val(idcl[11]);
            $("#tele2_pro").val(idcl[12]);

            $("#conta3_pro").val(idcl[13]);
            $("#dni3_pro").val(idcl[14]);
            $("#tele3_pro").val(idcl[15]);

            var doc_comparacion = idcl[16];
            // var archivos = idcl[18];
            // var archivo_guia = idcl[19];
            // let archivosTable_OC = $("#tabla_archivos_registrados tbody");
            // archivosTable_OC.empty();

            // if (archivos && archivos.length > 0) {
            //     var archivoArray = archivos.split(",");
            //     archivoArray.forEach(function (archivo, index) {
            //         var row_guia = archivosTable_OC[0].insertRow();

            //         var cellNum = row_guia.insertCell(0);
            //         var cellNombre = row_guia.insertCell(1);
            //         var cellAccion = row_guia.insertCell(2);

            //         cellNum.textContent = index + 1;

            //         cellNombre.textContent = archivo;

            //         cellAccion.innerHTML = `
            //             <button onclick="eliminarArchivo(this)">Eliminar</button>
            //             <button onclick="abrirModalVisualizarArchivo('${archivo}', '${archivo}')">Imprimir</button>
            //         `;
            //     });
            // } else {
            //     console.log("No hay archivos para mostrar");
            // }
            // let archivosTable = $("#tabla_archivos_oc tbody");
            // if (archivos) {
            //     var row_guia = archivosTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivos;
            // }
            // let archivoGuiaTable = $("#tabla_archivos_guia tbody");
            // if (archivo_guia) {
            //     var row_guia = archivoGuiaTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivo_guia;
            // }
            // Control de botones
            if (docentry === doc_comparacion) {
                $("#btn_guardar_pro").hide();
                $("#btn_actualizar_pro").show();
            } else {
                $("#btn_actualizar_pro").hide();
                $("#btn_guardar_pro").show();
            }
        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}






function consulta_data_AD_pro3(docentry) {
    $.ajax({
        url: "busca_data_AD.php",
        type: "POST",
        data: { docentry },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");




            $("#id_observaciones_pro3").val(idcl[0].toString().trim());
            $("#id_emp_pro3").val(idcl[1]);
            $("#id_dir_trans_pro3").val(idcl[2]);
            $("#id_ubicacion_pro3").val(idcl[3]);
            $("#id_dir_destino_pro3").val(idcl[4]);

            moda_destino = idcl[5];
            moda_pago = idcl[6];
            $("#conta1_pro3").val(idcl[7]);
            $("#dni1_pro3").val(idcl[8]);
            $("#tele1_pro3").val(idcl[9]);

            $("#conta2_pro3").val(idcl[10]);
            $("#dni2_pro3").val(idcl[11]);
            $("#tele2_pro3").val(idcl[12]);

            $("#conta3_pro3").val(idcl[13]);
            $("#dni3_pro3").val(idcl[14]);
            $("#tele3_pro3").val(idcl[15]);

            var doc_comparacion = idcl[16];

            if (docentry === doc_comparacion) {
                $("#btn_guardar_pro3").hide();
                $("#btn_actualizar_pro3").show();
            } else {
                $("#btn_actualizar_pro3").hide();
                $("#btn_guardar_pro3").show();
            }




        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}



function consulta_data_AD_pro5(docentry) {
    $.ajax({
        url: "busca_data_AD.php",
        type: "POST",
        data: { docentry },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            $("#id_observaciones_pro5").val(idcl[0].toString().trim());
            $("#id_emp_pro5").val(idcl[1]);
            $("#id_dir_trans_pro5").val(idcl[2]);
            $("#id_ubicacion_pro5").val(idcl[3]);
            $("#id_dir_destino_pro5").val(idcl[4]);

            moda_destino = idcl[5];
            moda_pago = idcl[6];
            $("#conta1_pro5").val(idcl[7]);
            $("#dni1_pro5").val(idcl[8]);
            $("#tele1_pro5").val(idcl[9]);

            $("#conta2_pro5").val(idcl[10]);
            $("#dni2_pro5").val(idcl[11]);
            $("#tele2_pro5").val(idcl[12]);

            $("#conta3_pro5").val(idcl[13]);
            $("#dni3_pro5").val(idcl[14]);
            $("#tele3_pro5").val(idcl[15]);

            var doc_comparacion = idcl[16];
            // var archivos = idcl[18];
            // var archivo_guia = idcl[19];
            // let archivosTable_OC = $("#tabla_archivos_registrados tbody");
            // archivosTable_OC.empty();

            // if (archivos && archivos.length > 0) {
            //     var archivoArray = archivos.split(",");
            //     archivoArray.forEach(function (archivo, index) {
            //         var row_guia = archivosTable_OC[0].insertRow();

            //         var cellNum = row_guia.insertCell(0);
            //         var cellNombre = row_guia.insertCell(1);
            //         var cellAccion = row_guia.insertCell(2);

            //         cellNum.textContent = index + 1;

            //         cellNombre.textContent = archivo;

            //         cellAccion.innerHTML = `
            //             <button onclick="eliminarArchivo(this)">Eliminar</button>
            //             <button onclick="abrirModalVisualizarArchivo('${archivo}', '${archivo}')">Imprimir</button>
            //         `;
            //     });
            // } else {
            //     console.log("No hay archivos para mostrar");
            // }
            // let archivosTable = $("#tabla_archivos_oc tbody");
            // if (archivos) {
            //     var row_guia = archivosTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivos;
            // }
            // let archivoGuiaTable = $("#tabla_archivos_guia tbody");
            // if (archivo_guia) {
            //     var row_guia = archivoGuiaTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivo_guia;
            // }
            // Control de botones
            if (docentry === doc_comparacion) {
                $("#btn_guardar_pro5").hide();
                $("#btn_actualizar_pro5").show();
            } else {
                $("#btn_actualizar_pro5").hide();
                $("#btn_guardar_pro5").show();
            }
        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}




function consulta_data_AD_pro4(docentry) {
    $.ajax({
        url: "busca_data_AD.php",
        type: "POST",
        data: { docentry },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            $("#id_observaciones_pro4").val(idcl[0].toString().trim());
            $("#id_emp_pro4").val(idcl[1]);
            $("#id_dir_trans_pro4").val(idcl[2]);
            $("#id_ubicacion_pro4").val(idcl[3]);
            $("#id_dir_destino_pro4").val(idcl[4]);

            moda_destino = idcl[5];
            moda_pago = idcl[6];
            $("#conta1_pro4").val(idcl[7]);
            $("#dni1_pro4").val(idcl[8]);
            $("#tele1_pro4").val(idcl[9]);

            $("#conta2_pro4").val(idcl[10]);
            $("#dni2_pro4").val(idcl[11]);
            $("#tele2_pro4").val(idcl[12]);

            $("#conta3_pro4").val(idcl[13]);
            $("#dni3_pro4").val(idcl[14]);
            $("#tele3_pro4").val(idcl[15]);

            var doc_comparacion = idcl[16];
            // var archivos = idcl[18];
            // var archivo_guia = idcl[19];
            // let archivosTable_OC = $("#tabla_archivos_registrados tbody");
            // archivosTable_OC.empty();

            // if (archivos && archivos.length > 0) {
            //     var archivoArray = archivos.split(",");
            //     archivoArray.forEach(function (archivo, index) {
            //         var row_guia = archivosTable_OC[0].insertRow();

            //         var cellNum = row_guia.insertCell(0);
            //         var cellNombre = row_guia.insertCell(1);
            //         var cellAccion = row_guia.insertCell(2);

            //         cellNum.textContent = index + 1;

            //         cellNombre.textContent = archivo;

            //         cellAccion.innerHTML = `
            //             <button onclick="eliminarArchivo(this)">Eliminar</button>
            //             <button onclick="abrirModalVisualizarArchivo('${archivo}', '${archivo}')">Imprimir</button>
            //         `;
            //     });
            // } else {
            //     console.log("No hay archivos para mostrar");
            // }
            // let archivosTable = $("#tabla_archivos_oc tbody");
            // if (archivos) {
            //     var row_guia = archivosTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivos;
            // }
            // let archivoGuiaTable = $("#tabla_archivos_guia tbody");
            // if (archivo_guia) {
            //     var row_guia = archivoGuiaTable[0].insertRow();
            //     var cell = row_guia.insertCell();
            //     cell.textContent = archivo_guia;
            // }
            // Control de botones
            if (docentry === doc_comparacion) {
                $("#btn_guardarAC4").hide();
                $("#btn_actualizar_pro4").show();
            } else {
                $("#btn_actualizar_pro4").hide();
                $("#btn_guardarAC4").show();
            }
        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}







function Imprimir_O_C() {
    var docentry = $("#docito_Modal_oc").val();
    console.log("Entrando en imprimir OC");

    // Limpia la tabla y muestra el modal
    $('#tabla_archivos_oc tbody').empty();
    $('#modal_imprimir_OC').modal('show');

    // Primero agregar los archivos que se registraron manualmente
    archivosRegistrados.forEach(function (archivo, index) {
        var archivoSinExtension = archivo.split('.')[0];
        var rutaArchivo = archivo;

        var nuevaFila = `
            <tr>
                <td>${index + 1}</td>
                <td>${archivoSinExtension}</td>
                <td><button class="btn btn-primary" onclick="abrirModalVisualizarArchivo('${rutaArchivo}', '${archivoSinExtension}')">Ver</button></td>
            </tr>
        `;
        $('#tabla_archivos_oc tbody').append(nuevaFila);
    });

    // Luego agregar los archivos obtenidos por AJAX
    var docentry = $("#docito_Modal_oc").val();
    $.ajax({
        url: "pdf_Archivos_OC.php",
        type: "POST",
        data: { docentry: docentry },
        success: function (response) {
            var idcl = response.split("|"); // Dividir la respuesta para obtener los archivos
            var archivos = idcl[18] ? idcl[18].split(',') : []; // Obtener los nombres de los archivos

            // Agregar cada archivo a la tabla con un botón "Ver"
            archivos.forEach(function (archivo, index) {
                var archivoSinExtension = archivo.split('.')[0];
                var rutaArchivo = archivo;

                // Crear una fila en la tabla para cada archivo con un botón "Ver"
                var nuevaFila = `
                    <tr>
                        <td>${index + 1 + archivosRegistrados.length}</td>
                        <td>${archivoSinExtension}</td>
                        <td><button class="btn btn-primary" onclick="abrirModalVisualizarArchivo('${rutaArchivo}', '${archivoSinExtension}')">Ver</button></td>
                    </tr>
                `;
                $('#tabla_archivos_oc tbody').append(nuevaFila);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
            alert("No se pudieron cargar los archivos.");
        }
    });
}



function consulta_data_AD_NEW(docentry) {
    empresa = $("#empresa").val();

    $.ajax({
        url: "busca_data_AD_new.php",
        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            console.log(x);

            var data = x;
            var idcl = data.split("|");
            moda_destino = idcl[2];
            moda_pago = idcl[1];

            if (moda_destino === '') {
                $("#id_moda_destino").children().val('-').trigger("change.select2");

            } else {
                $("#id_moda_destino").children().val(moda_destino).trigger("change.select2");

            }


            if (moda_pago === '') {
                $("#id_moda_pago").children().val('-').trigger("change.select2");

            } else {
                $("#id_moda_pago").children().val(moda_pago).trigger("change.select2");

            }

        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}


function consulta_data_AD_NEW_fin(docentry) {
    empresa = $("#empresa_despa_fin").val();

    $.ajax({
        url: "busca_data_AD_new.php",
        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            console.log(x);

            var data = x;
            var idcl = data.split("|");
            moda_destino = idcl[2];
            moda_pago = idcl[1];

            console.log(moda_destino);
            console.log(moda_pago);

            if (moda_destino === '') {
                $("#id_moda_destino_fin").children().val('-').trigger("change.select2");

            } else {
                $("#id_moda_destino_fin").children().val(moda_destino).trigger("change.select2");

            }


            if (moda_pago === '') {
                $("#id_moda_pago_fin").children().val('-').trigger("change.select2");

            } else {
                $("#id_moda_pago_fin").children().val(moda_pago).trigger("change.select2");

            }

        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}







function consulta_data_AD_NEW_pro(docentry) {
    empresa = $("#empresa2").val();
    $.ajax({
        url: "busca_data_AD_new.php",
        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            moda_destino = idcl[2];
            moda_pago = idcl[1];

            if (moda_destino === '') {
                $("#id_moda_destino_pro").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_destino_pro").children().val(moda_destino).trigger("change.select2");
            }


            if (moda_pago === '') {
                $("#id_moda_pago_pro").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_pago_pro").children().val(moda_pago).trigger("change.select2");
            }





        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}




function consulta_data_AD_NEW_pro3(docentry) {
    empresa = $("#empresa3").val();
    $.ajax({
        url: "busca_data_AD_new.php",
        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            moda_destino = idcl[2];
            moda_pago = idcl[1];


            if (moda_destino === '') {
                $("#id_moda_destino_pro3").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_destino_pro3").children().val(moda_destino).trigger("change.select2");
            }


            if (moda_pago === '') {
                $("#id_moda_pago_pro3").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_pago_pro3").children().val(moda_pago).trigger("change.select2");
            }




        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}


function consulta_data_AD_NEW_pro5(docentry) {
    empresa = $("#empresa_despa").val();
    $.ajax({
        url: "busca_data_AD_new.php",
        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            moda_destino = idcl[2];
            moda_pago = idcl[1];


            if (moda_destino === '') {
                $("#id_moda_destino_pro5").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_destino_pro5").children().val(moda_destino).trigger("change.select2");
            }


            if (moda_pago === '') {
                $("#id_moda_pago_pro5").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_pago_pro5").children().val(moda_pago).trigger("change.select2");
            }




        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}




function consulta_data_AD_NEW_pro4(docentry) {
    empresa = $("#empresa_despa").val();
    $.ajax({
        url: "busca_data_AD_new.php",
        type: "POST",
        data: { docentry, empresa },
        success: function (x) {
            var data = x;
            var idcl = data.split("|");

            moda_destino = idcl[2];
            moda_pago = idcl[1];


            if (moda_destino === '') {
                $("#id_moda_destino_pro4").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_destino_pro4").children().val(moda_destino).trigger("change.select2");
            }


            if (moda_pago === '') {
                $("#id_moda_pago_pro4").children().val('-').trigger("change.select2");
            } else {
                $("#id_moda_pago_pro4").children().val(moda_pago).trigger("change.select2");
            }




        },
        error: function (jqXHR, estado, error) {
            console.error("Error en la solicitud:", error);
        },
    });
}













function consultar_boton() {

    docentry = $("#docito").val();
    //console.log(docentry);


    $.ajax({
        url: "busca_doc_boton.php",

        type: "POST",
        data: {
            docentry: docentry,
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");

            var doc_comparacion = idcl[0].trim();

            //console.log(doc_comparacion)
            //console.log(docentry)


            if (docentry === doc_comparacion) {
                $("#btn_alista").hide();
                //console.log("Ocultando el botón");
            } else {
                $("#btn_alista").show();
                //console.log("Muestra el botón");
            }


        },
        error: function (jqXHR, estado, error) { },
    });

}




function consultar_boton2() {

    docentry = $("#docito").val();
    //console.log(docentry);


    $.ajax({
        url: "busca_doc_boton_ruta.php",

        type: "POST",
        data: {
            docentry: docentry,
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");

            var doc_comparacion = idcl[0].trim();

            //console.log(doc_comparacion)
            //console.log(docentry)


            if (docentry === doc_comparacion) {
                $("#btn_ruta").hide();
                //console.log("Ocultando el botón");
            } else {
                $("#btn_ruta").show();
                //console.log("Muestra el botón");
            }


        },
        error: function (jqXHR, estado, error) { },
    });
}






function cargar_data_no_conformidades() {
    $('#modal_no_confomidades').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_no_confomidades").modal("show");

    id = $("#docito_despa_fin").val();
    ciente = $("#CLIENTE_despa_fin").val();
    docnum = $("#NUM_SAP_despa_fin").val();
    emp = $("#empresa_despa_fin").val();
    tipo = $("#tipo_crea_evi").val();
    n_guia = $("#NUM_GUIA_despa_fin").val();
    n_oc = $("#OC_NAME5_fin").val();
    nom_despacho = $("#forma_despacho_fin").val();
    estado_des = $("#ESTADO_despa_fin").val();
    alistado = $("#nombre_alistado_por").val();
    usuario = $("#usuario_sesion").val();
    nombre_usuario = $("#nombre_usuario_sesion").val();

    document.getElementById("cliente_conformidad").value = ciente;
    document.getElementById("n_guia_conformidad").value = n_guia;
    document.getElementById("num_orden_conformidad").value = n_oc;
    document.getElementById("estado_des").value = estado_des;
    document.getElementById("alistado_conformidad").value = alistado;
    document.getElementById("usuario_sesion_ok").value = nombre_usuario;
    document.getElementById("empresa_relacionada").value = emp;
    document.getElementById("num_pedido_conf").value = id;

    lista_almaceneros();
    busca_lista_no_conformidades();
    $("#btn_reg_confor").hide();
}


function cargar_data_no_conformidades_pro4() {
    $('#modal_no_confomidades').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_no_confomidades").modal("show");

    id = $("#docito_despa").val();
    ciente = $("#CLIENTE_despa").val();
    docnum = $("#NUM_SAP_despa").val();
    emp = $("#empresa_despa").val();
    tipo = $("#tipo_crea_evi").val();
    n_guia = $("#NUM_GUIA_despa").val();
    n_oc = $("#OC_NAME5").val();
    nom_despacho = $("#forma_despacho").val();
    estado_des = $("#ESTADO_despa").val();
    alistado = $("#nombre_alistado_por_despa").val();
    usuario = $("#usuario_sesion_despa").val();

    document.getElementById("cliente_conformidad").value = ciente;
    document.getElementById("n_guia_conformidad").value = n_guia;
    document.getElementById("num_orden_conformidad").value = n_oc;
    document.getElementById("estado_des").value = estado_des;
    document.getElementById("alistado_conformidad").value = alistado;
    document.getElementById("usuario_sesion_ok").value = usuario;
    document.getElementById("empresa_relacionada").value = emp;
    document.getElementById("num_pedido_conf").value = id;

    lista_almaceneros();
    busca_lista_no_conformidades();
    $("#btn_reg_confor").hide();
}

function cargar_data_no_conformidades_pro3() {
    $('#modal_no_confomidades').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_no_confomidades").modal("show");

    id = $("#docito_pro3").val();
    ciente = $("#CLIENTE3").val();
    docnum = $("#NUM_SAP3").val();
    emp = $("#empresa3").val();
    tipo = $("#tipo_crea_evi").val();
    n_guia = $("#NUM_GUIA3").val();
    n_oc = $("#OC_NAME3").val();
    nom_despacho = $("#forma_despacho").val();
    estado_des = $("#codESTADO3").val();
    alistado = $("#nombre_alistado_por_3").val();
    usuario = $("#usuario_sesion_3").val();

    document.getElementById("cliente_conformidad").value = ciente;
    document.getElementById("n_guia_conformidad").value = n_guia;
    document.getElementById("num_orden_conformidad").value = n_oc;
    document.getElementById("estado_des").value = estado_des;
    document.getElementById("alistado_conformidad").value = alistado;
    document.getElementById("usuario_sesion_ok").value = usuario;
    document.getElementById("empresa_relacionada").value = emp;
    document.getElementById("num_pedido_conf").value = id;

    lista_almaceneros();
    busca_lista_no_conformidades();
    $("#btn_reg_confor").hide();
}

function cargar_data_no_conformidades_pro() {
    $('#modal_no_confomidades').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_no_confomidades").modal("show");

    id = $("#docito_pro").val();
    ciente = $("#CLIENTE2").val();
    docnum = $("#NUM_SAP2").val();
    emp = $("#empresa2").val();
    tipo = $("#tipo_crea_evi").val();
    n_guia = $("#NUM_GUIA2").val();
    n_oc = $("#OC_NAME4").val();
    nom_despacho = $("#forma_despacho").val();
    estado_des = $("#codESTADO2").val();
    alistado = $("#nombre_alistado_por_gen2").val();
    usuario = $("#usuario_sesion_gen2").val();

    document.getElementById("cliente_conformidad").value = ciente;
    document.getElementById("n_guia_conformidad").value = n_guia;
    document.getElementById("num_orden_conformidad").value = n_oc;
    document.getElementById("estado_des").value = estado_des;
    document.getElementById("alistado_conformidad").value = alistado;
    document.getElementById("usuario_sesion_ok").value = usuario;
    document.getElementById("empresa_relacionada").value = emp;
    document.getElementById("num_pedido_conf").value = id;

    lista_almaceneros();
    busca_lista_no_conformidades();
    $("#btn_reg_confor").hide();
}

function cargar_data_no_conformidades_general() {
    $('#modal_no_confomidades').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_no_confomidades").modal("show");

    id = $("#docito").val();
    ciente = $("#CLIENTE").val();
    docnum = $("#NUM_SAP").val();
    emp = $("#empresa").val();
    tipo = $("#tipo_crea_evi").val();
    n_guia = $("#NUM_GUIA").val();
    n_oc = $("#OC_DET").val();
    nom_despacho = $("#forma_despacho").val();
    estado_des = $("#ESTADO").val();
    alistado = $("#nombre_alistado_por_gen").val();
    usuario = $("#usuario_sesion_gen").val();

    document.getElementById("cliente_conformidad").value = ciente;
    document.getElementById("n_guia_conformidad").value = n_guia;
    document.getElementById("num_orden_conformidad").value = n_oc;
    document.getElementById("estado_des").value = estado_des;
    document.getElementById("alistado_conformidad").value = alistado;
    document.getElementById("usuario_sesion_ok").value = usuario;
    document.getElementById("empresa_relacionada").value = emp;
    document.getElementById("num_pedido_conf").value = id;

    lista_almaceneros();
    busca_lista_no_conformidades();
    $("#btn_reg_confor").hide();
}

function cargar_data_no_conformidades_detalle(docentry_guia, cliente, empresa, n_guia, nro_oc) {
    $('#modal_no_confomidades_detalle').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_no_confomidades_detalle").modal("show");


    document.getElementById("cliente_conformidad_det").value = cliente;
    document.getElementById("n_guia_conformidad_det").value = n_guia;
    document.getElementById("num_orden_conformidad_det").value = nro_oc;

    busca_lista_no_conformidades_detalle(docentry_guia, empresa);
}

function lista_almaceneros() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#listado_responsables").html("Recuperando Lista ...");
            },
            url: "lista_almaceneros.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#listado_responsables").html(x);
                $(".select2").select2();

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

$(document).ready(function () {
    $("#btn_agregar_conformidad").click(function (e) {
        e.preventDefault();

        const id = 0;
        const code_responsable = $("#listado_responsables option:selected").val();
        const responsable = $("#listado_responsables option:selected").text().trim();
        const descripcion = $("#descripcion_confor").val().trim();
        const alistado_por = $("#alistado_conformidad").val().trim();
        const usuario = $("#usuario_sesion_ok").val().trim();

        if (responsable === 'SELECCIONE') {
            swal("Seleccione un responsable primero", {
                icon: "warning",
                timer: 2000,
                buttons: false,
            });
            return;
        }

        if (descripcion === '') {
            swal("Describa el detalle de la inexactitud", {
                icon: "warning",
                timer: 2000,
                buttons: false,
            });
            return;
        }


        const fecha = new Date();
        const fechaFormateada = `${String(fecha.getDate()).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${fecha.getFullYear()}`;

        const nuevaFila = `
            <tr class="text-center">
                <td style='display: none;'>${id}</td>
                <td>${fechaFormateada}</td>
                <td>${usuario}</td>
                <td>${alistado_por}</td>
                <td style="display: none;">${code_responsable}</td>
                <td>${responsable}</td>
                <td>${descripcion}</td>
                <td></td>
                <td style='display:none;'>${usuario}</td>
            </tr>
        `;

        $("#tabla_registros_conformidades tbody").append(nuevaFila);
        $("#descripcion_confor").val('');
        $("#listado_responsables select").val('0');
        $("#btn_reg_confor").show();
    });
});

function registrar_no_conformidades() {
    const doc_pedido = $("#num_pedido_conf").val();
    let filas = $("#tabla_registros_conformidades tbody tr");

    if (filas.length === 0) {
        swal("No hay registros para guardar", {
            icon: "warning",
            timer: 2000,
            buttons: false,
        });
        return;
    }

    swal({
        title: "Registrando ...",
        text: "Por favor, espera un momento.",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        content: {
            element: "div",
            attributes: {
                innerHTML: `<div class="spinner" style="text-align:center;"><i class="fa fa-spinner fa-spin fa-2x"></i></div>`
            }
        }
    });

    filas.each(function () {
        let columnas = $(this).find("td");

        let id = columnas.eq(0).text().trim();
        let code_responsable = columnas.eq(4).text().trim();
        let responsable = columnas.eq(5).text().trim();
        let descripcion = columnas.eq(6).text().trim();

        $.ajax({
            url: 'insertar_registro_inexactitud.php',
            type: 'POST',
            data: {
                doc_pedido: doc_pedido,
                cod_responsable: code_responsable,
                responsable: responsable,
                descripcion: descripcion,
                id: id
            },
            success: function (response) {
                console.log("Registro insertado:", response);
            },
            error: function () {
                console.error("Error al insertar el registro.");
            }
        });
    });

    setTimeout(() => {
        swal.close();
        busca_lista_no_conformidades();
        actualizar_estado_pedido();
        $("#btn_reg_confor").hide();
    }, 2000);
}

function actualizar_estado_pedido() {
    var doc = $("#num_pedido_conf").val();
    var value = 10;
    var comentario = ""
    var emp_ori = $("#empresa_relacionada").val();
    var tipo_ori = "S";

    console.log(doc);
    console.log(value);
    console.log(comentario);

    $.ajax({
        beforeSend: function () {
        },
        url: 'registrar_desicion_despacho.php',
        type: 'POST',
        data: { doc, value, comentario, emp_ori, tipo_ori },
        success: function (x) {
            $.ajax({
                beforeSend: function () { },
                url: "actualizar_estados_observado.php",
                type: "POST",
                data:
                    "id_docentry=" +
                    doc +
                    "&estado=" +
                    value +
                    "&empresa=" +
                    emp_ori +
                    "&tipo=" +
                    tipo_ori,

                success: function () {
                    // $("#modal_registrar_desicion").modal("hide");
                    // swal("Se actualizo correctamente", {
                    //     icon: "success",
                    //     timer: 2000,
                    //     buttons: false,
                    // });

                    // setTimeout(function () {
                    //     swal.close();
                    //     $("#docentry_desp").val("");
                    //     $("#comentariosautorizacion").val("");
                    //     $("#emp_ori").val("");
                    //     $("#value").val("");
                    //     busca_Lista_programados()
                    //     $("#modal_detalle_venta").modal("hide");
                    // }, 1500); 

                },
                error: function (jqXHR, estado, error) {
                    $("#errores").html("Error... " + estado + "  " + error);
                },
            });


        }

    });


}

function busca_lista_no_conformidades() {

    var doc_pedido = $("#num_pedido_conf").val();
    var cliente = $("#cliente_conformidad").val();
    var num_guia = $("#n_guia_conformidad").val();
    var oc = $("#num_orden_conformidad").val();
    var empresa = $("#empresa_relacionada").val();

    $.ajax({
        beforeSend: function () { },
        url: 'listado_no_conformidades_registradas.php',
        type: 'POST',
        data: {
            doc_pedido: doc_pedido,
            cliente: cliente,
            num_guia: num_guia,
            oc: oc,
            empresa: empresa,
        },
        success: function (x) {
            $("#listado_registros_conformidades").html(x);
        }
    });
}

function busca_lista_no_conformidades_detalle(docentry_guia, empresa) {
    console.log(docentry_guia);
    console.log(empresa);

    $.ajax({
        beforeSend: function () { },
        url: 'listado_no_conformidades_registradas_detalle.php',
        type: 'POST',
        data: {
            doc_pedido: docentry_guia,
            empresa: empresa,
        },
        success: function (x) {
            $("#listado_registros_conformidades_det").html(x);
        }
    });
}

function muestra_modal_evidencia_no_conformidad(doc_pedido, empresa, num_guia, cliente, oc, id_confor) {
    // console.log(id);
    // $("#guardar_actualizar_btn_conf").hide();
    // const tipo = 'S';

    // const [docEntry, emp, name, oc, serie, id_conf] = id.split('/');

    // console.log(id_conf);

    $("#serienum_modalevi_confo").val(num_guia);
    $("#num_oc_modalevi_confo").val(oc);
    $("#cliente_confo").val(cliente);
    $("#id_conformidad").val(id_confor);

    $("#modal_evidencia_no_conformidades").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    listar_data_conformidades(doc_pedido, 'TD', emp, tipo, id_confor);
}

function muestra_modal_evidencia_no_conformidad_detalle(id) {

    const tipo = 'S';
    const guia = $("#n_guia_conformidad_det").val();
    const cliente = $("#cliente_conformidad_det").val();
    const oc = $("#num_orden_conformidad_det").val();
    const emp = "C";

    const [docEntry, id_conf] = id.split('/');

    $("#serienum_modalevi_confo_det").val(guia);
    $("#num_oc_modalevi_confo_det").val(oc);
    $("#cliente_confo_det").val(cliente);

    $("#modal_evidencia_no_conformidades_detalle").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    listar_data_conformidades_detalle(docEntry, 'TD', emp, tipo, id_conf);
}

function listar_data_conformidades(id, movi, emp, tipo, id_conf) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#data_pdf_conformidades").html("Buscando las ventas, un momento...");
            },
            url: "listar_data_pdf_conformidades.php",
            type: "POST",
            data: {
                id: id,
                emp: emp,
                id_conf: id_conf,
            },
            success: function (res) {
                $("#data_pdf_conformidades").html(res);
            },
            error: function (jqXHR, estado, error) {
            },
        });
    });
}

function listar_data_conformidades_detalle(id, movi, emp, tipo, id_conf) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#data_pdf_conformidades_det").html("Buscando las ventas, un momento...");
            },
            url: "listar_data_pdf_conformidades.php",
            type: "POST",
            data: {
                id: id,
                emp: emp,
                id_conf: id_conf,
            },
            success: function (res) {
                $("#data_pdf_conformidades_det").html(res);
            },
            error: function (jqXHR, estado, error) {
            },
        });
    });
}

function subir_evidencia_conformidad() {
    var id = $("#docentry").val();

    $("#modal_registrar_evi_conformidad").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
    });

    name = $("#cliente_confo").val();
    empresa = $("#empresa_despa_fin").val();
    serie_num = $("#serienum_modalevi_confo").val();

    document.getElementById("titulo_reg_conformidad").value = serie_num;
    $("#fileToUpload_1_confor").val("");
}

$(document).ready(function () {
    $("form#data1").submit(function (event) {
        event.preventDefault();

        var card_code = document.getElementById("cliente_reg").value;
        var titulo = document.getElementById("titulo_reg_conformidad").value;
        var num = document.getElementById("num_pedido_conf").value;
        var tipo = "S";
        var emp = $("#empresa_relacionada").val();
        var id_confo = $("#id_conformidad").val();

        var file = $("#fileToUpload_1_confor")[0].files[0];

        if (!file) {
            alert("Por favor, selecciona un archivo.");
            return false;
        }

        var formData = new FormData();
        formData.append("fileToUpload_1_confor", file);
        formData.append("card_code", "");
        formData.append("titulo", $("#titulo_reg_conformidad").val());
        formData.append("num", $("#num_pedido_conf").val());
        formData.append("movi", "3");
        formData.append("emp", $("#empresa_relacionada").val());
        formData.append("comentario", "");
        formData.append("tipo", "S");
        formData.append("id_conformidad", $("#id_conformidad").val());

        $.ajax({
            url: "registrar_pdf_evidencia_conformidad.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log("✅ Respuesta del servidor:", response);
                $("#titulo_reg_conformidad").val("");
                $("#modal_registrar_evi_conformidad").modal("hide");
                listar_data_conformidades(num, 'TD', emp, tipo, id_confo)
            },
            error: function (xhr, status, error) {
                console.error("❌ Error en la solicitud AJAX:");
                console.error("Estado:", status);
                console.error("Error:", error);
                console.error("Respuesta del servidor:", xhr.responseText);
                alert("❌ Error al subir el archivo. Revisa la consola para más detalles.");
            }
        });
    });
});

function ver_manual_pdf_conformidad(id, ruta) {
    $global_id = id;
    $global_ruta = ruta;

    $('#modal_data_pdf_conformidad').modal('show');
    $('.modal_data_pdf_conformidad').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', $global_ruta)
    })
    $("#navegador_conf").on('click', function () {
        //window.location.href = $global_ruta
        window.open($global_ruta);

    })
    $("#imprimir_conf").on('click', function () {
        $('#imprimir_conf')[0].contentWindow.print();

    })
}






// function imprimir_Form() {
//     $("#modal_datos_adicionales").modal("show");
//     var doc = $("#docito").val();
//     $("#docito_adicionales").val(doc);
//     imprimir_Form1(doc);
//     // document.getElementById("btn_guardar").style.display = "block";
//     // document.getElementById("btn_actualizar").style.display = "none";
// }


function imprimir_Form() {

    doc = $("#docito_adicionales").val();
    console.log(doc);
    console.log("entro");
    var ruta = "pdf_Form2.php?doc=" + doc;
    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });
    $("#navegador").off('click').on('click', function () {
        window.open(ruta, '_blank');
    });
    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    });

}



function imprimir_Form_pro() {

    doc = $("#docito_adicionales_pro").val();
    console.log(doc);
    console.log("entro");
    var ruta = "pdf_Form2.php?doc=" + doc;
    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });
    $("#navegador").off('click').on('click', function () {
        window.open(ruta, '_blank');
    });
    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    });

}


function imprimir_Form_finalizados() {

    doc = $("#docito_adicionales_fin").val();
    console.log(doc);
    console.log("entro");
    var ruta = "pdf_Form2.php?doc=" + doc;
    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });
    $("#navegador").off('click').on('click', function () {
        window.open(ruta, '_blank');
    });
    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    });

}




function imprimir_Form_pro3() {

    doc = $("#docito_adicionales_pro3").val();
    console.log(doc);
    console.log("entro");
    var ruta = "pdf_Form2.php?doc=" + doc;
    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });
    $("#navegador").off('click').on('click', function () {
        window.open(ruta, '_blank');
    });
    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    });

}
function imprimir_Form_pro4() {

    doc = $("#docito_adicionales_pro4").val();
    console.log(doc);
    console.log("entro");
    var ruta = "pdf_Form2.php?doc=" + doc;
    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });
    $("#navegador").off('click').on('click', function () {
        window.open(ruta, '_blank');
    });
    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    });

}

function imprimir_Form_pro5() {

    doc = $("#docito_adicionales_pro5").val();
    console.log(doc);
    console.log("entro");
    var ruta = "pdf_Form2.php?doc=" + doc;
    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function () {
        $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function () {
        $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
    });
    $("#navegador").off('click').on('click', function () {
        window.open(ruta, '_blank');
    });
    $("#imprimir").off('click').on('click', function () {
        $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    });

}





function validar_numero(event) {
    console.log(event);
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        alertify.error('No puede ingresar letras');
        return false;
    }
    return true;
}




function muestra_detalle_precio(num_ticket) {
    var tic = num_ticket.split("|");
    $("#modal_detalle_GENERAL").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $.ajax({
        beforeSend: function () {
            $("#detalle_de_venta").html("Consultando detalle pedidos pendientes...");
        },
        url: 'consulta_detalle_precio_general.php',
        type: 'POST',
        data: 'tic=' + tic[0],
        success: function (x) {
            $(".nuticket").html("");
            $("#idpedido").val(tic[0]);
            $(".nuticket").append("Detalle de Precio | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
            $("#detalle_de_venta").html(x);

            $('#tabla_detalle').DataTable();
        },
        error: function (jqXHR, estado, error) {
            $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}


function editar_form() {

    document.getElementById("id_observaciones").disabled = false;
    document.getElementById("id_emp").disabled = false;
    document.getElementById("id_dir_trans").disabled = false;
    document.getElementById("id_ubicacion").disabled = false;
    document.getElementById("id_dir_destino").disabled = false;
    document.getElementById("id_moda_destino").disabled = false;
    document.getElementById("id_moda_pago").disabled = false;

    $("#modalidad_destino").prop("disabled", false);
    $("#moda_pago").prop("disabled", false);
    $("#agencia").prop("disabled", false);
    // document.getElementById("btn_guardar").style.display = "none";
    // document.getElementById("btn_actualizar").style.display = "block";


    habilitarInputs()
}
function editar_form_pro4() {

    document.getElementById("id_observaciones_pro4").disabled = false;
    document.getElementById("id_emp_pro4").disabled = false;
    document.getElementById("id_dir_trans_pro4").disabled = false;
    document.getElementById("id_ubicacion_pro4").disabled = false;
    document.getElementById("id_dir_destino_pro4").disabled = false;
    document.getElementById("id_moda_destino_pro4").disabled = false;
    document.getElementById("id_moda_pago_pro4").disabled = false;

    $("#id_moda_destino_pro4 select").prop("disabled", false);
    $("#id_moda_pago_pro4 select").prop("disabled", false);
    $("#id_agencia_pro4 select").prop("disabled", false);
    // document.getElementById("btn_guardar").style.display = "none";
    // document.getElementById("btn_actualizar").style.display = "block";


    habilitarInputs_pro4()
}
function editar_form_pro5() {

    document.getElementById("id_observaciones_pro5").disabled = false;
    document.getElementById("id_emp_pro5").disabled = false;
    document.getElementById("id_dir_trans_pro5").disabled = false;
    document.getElementById("id_ubicacion_pro5").disabled = false;
    document.getElementById("id_dir_destino_pro5").disabled = false;
    document.getElementById("id_moda_destino_pro5").disabled = false;
    document.getElementById("id_moda_pago_pro5").disabled = false;

    $("#id_moda_destino_pro5 select").prop("disabled", false);
    $("#id_moda_pago_pro5 select").prop("disabled", false);
    $("#id_agencia_pro5 select").prop("disabled", false);
    // document.getElementById("btn_guardar").style.display = "none";
    // document.getElementById("btn_actualizar").style.display = "block";


    habilitarInputs_pro5()
}

function editar_form_fin() {

    document.getElementById("id_observaciones_fin").disabled = false;
    document.getElementById("id_emp_fin").disabled = false;
    document.getElementById("id_dir_trans_fin").disabled = false;
    document.getElementById("id_ubicacion_fin").disabled = false;
    document.getElementById("id_dir_destino_fin").disabled = false;
    document.getElementById("id_moda_destino_fin").disabled = false;
    document.getElementById("id_moda_pago_fin").disabled = false;

    $("#id_moda_destino_fin select").prop("disabled", false);
    $("#id_moda_pago_fin select").prop("disabled", false);
    $("#id_agencia_fin select").prop("disabled", false);
    // document.getElementById("btn_guardar").style.display = "none";
    // document.getElementById("btn_actualizar").style.display = "block";


    habilitarInputs_fin()
}


function habilitarInputs() {
    const inputs2 = document.querySelectorAll("#miTabla2 input");

    const inputs1 = document.querySelectorAll("#miTabla1 input");

    const inputs = document.querySelectorAll("#miTabla input");

    inputs.forEach(input => {
        input.disabled = false;
    });

    inputs1.forEach(input => {
        input.disabled = false;
    });

    inputs2.forEach(input => {
        input.disabled = false;
    });

}

function habilitarInputs_pro4() {
    const inputs2 = document.querySelectorAll("#miTabla1_pro4_1 input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro4_2 input");

    const inputs = document.querySelectorAll("#miTabla2_pro4_3 input");

    inputs.forEach(input => {
        input.disabled = false;
    });

    inputs1.forEach(input => {
        input.disabled = false;
    });

    inputs2.forEach(input => {
        input.disabled = false;
    });

}



function habilitarInputs_pro5() {
    const inputs2 = document.querySelectorAll("#miTabla1_pro5_1 input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro5_2 input");

    const inputs = document.querySelectorAll("#miTabla2_pro5_3 input");

    inputs.forEach(input => {
        input.disabled = false;
    });

    inputs1.forEach(input => {
        input.disabled = false;
    });

    inputs2.forEach(input => {
        input.disabled = false;
    });

}

function habilitarInputs_fin() {
    const inputs2 = document.querySelectorAll("#miTabla2_fin input");

    const inputs1 = document.querySelectorAll("#miTabla1_fin input");

    const inputs = document.querySelectorAll("#miTabla_fin input");

    inputs.forEach(input => {
        input.disabled = false;
    });

    inputs1.forEach(input => {
        input.disabled = false;
    });

    inputs2.forEach(input => {
        input.disabled = false;
    });

}

function editar_form_pro() {

    document.getElementById("id_observaciones_pro").disabled = false;
    document.getElementById("id_emp_pro").disabled = false;
    document.getElementById("id_dir_trans_pro").disabled = false;
    document.getElementById("id_ubicacion_pro").disabled = false;
    document.getElementById("id_dir_destino_pro").disabled = false;
    document.getElementById("id_moda_destino_pro").disabled = false;
    document.getElementById("id_moda_pago_pro").disabled = false;

    $("#modalidad_destino").prop("disabled", false);
    $("#moda_pago").prop("disabled", false);
    $("#agencia").prop("disabled", false);
    // document.getElementById("btn_guardar").style.display = "none";
    // document.getElementById("btn_actualizar").style.display = "block";


    habilitarInputs_pro()
}




function habilitarInputs_pro() {
    const inputs2 = document.querySelectorAll("#miTabla2_pro input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro input");

    const inputs = document.querySelectorAll("#miTabla_pro input");

    inputs.forEach(input => {
        input.disabled = false;
    });

    inputs1.forEach(input => {
        input.disabled = false;
    });

    inputs2.forEach(input => {
        input.disabled = false;
    });

}






function editar_form_pro3() {

    document.getElementById("id_observaciones_pro3").disabled = false;
    document.getElementById("id_emp_pro3").disabled = false;
    document.getElementById("id_dir_trans_pro3").disabled = false;
    document.getElementById("id_ubicacion_pro3").disabled = false;
    document.getElementById("id_dir_destino_pro3").disabled = false;
    document.getElementById("id_moda_destino_pro3").disabled = false;
    document.getElementById("id_moda_pago_pro3").disabled = false;
    document.getElementById("pon_almacen_pro3").disabled = false;
    $("#modalidad_destino").prop("disabled", false);
    $("#moda_pago").prop("disabled", false);
    $("#agencia").prop("disabled", false);
    // document.getElementById("btn_guardar").style.display = "none";
    // document.getElementById("btn_actualizar").style.display = "block";
    //$("#pon_almacen_pro3").prop("disabled", false).trigger("change");



    habilitarInputs_pro3()





}




function habilitarInputs_pro3() {
    const inputs2 = document.querySelectorAll("#miTabla2_pro3 input");

    const inputs1 = document.querySelectorAll("#miTabla1_pro3 input");

    const inputs = document.querySelectorAll("#miTabla_pro3 input");

    inputs.forEach(input => {
        input.disabled = false;
    });

    inputs1.forEach(input => {
        input.disabled = false;
    });

    inputs2.forEach(input => {
        input.disabled = false;
    });

}







// document.getElementById("tuTabla").addEventListener("click", function() {
//     const ventanaFlotante = document.getElementById('ventanaFlotante' + datoS[DOCENTRY]);
//     ventanaFlotante.style.display = 'block'; // Mostrar la ventana
// });



// $(document).on("dblclick", "#tabla_listado tbody tr", function () {
//     // Obtener el ID de la fila
//     var filaId = $(this).attr('id');

//     // Extraer solo el número de la fila usando una expresión regular
//     var numeroFila = filaId.match(/\d+/); // Esto busca uno o más dígitos en la cadena

//     // Si se encuentra un número, lo obtenemos como cadena
//     if (numeroFila) {
//         numeroFila = numeroFila[0];// Obtenemos el primer resultado
//     }
//     // Mostrar el número de la fila en la consola
//     console.log("Número de la fila seleccionada: " + numeroFila);

//     $("#modal_id_botones").modal("show");
//     $("#docito").val(numeroFila);


//     // $("#NUM_SAP").val(Numsap);
//     // $("#NUM_GUIA").val(Numsap);
//     // $("#CLIENTE").val(Numsap);
//     // $("#ESTADO").val(Numsap);
//     setTimeout(() => {
//         consultar_boton();
//         consultar_boton2();
//     }, 500);

// });

$(document).on("dblclick", "#tabla_listado tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(1)").text();
    var emp = $fila.find("td:nth-child(2)").text();
    var sap = $fila.find("td:nth-child(5)").text();
    var guia = $fila.find("td:nth-child(6)").text();
    var oc = $fila.find("td:nth-child(7)").text();
    var cliente = $fila.find("td:nth-child(8)").text();
    var estado = $fila.find("td:nth-child(3)").text();
    var idestado = $fila.find("td:nth-child(12)").text();
    var alistado_por = $fila.find("td:nth-child(15)").text();
    var usuario = $fila.find("td:nth-child(16)").text();


    $("#modal_id_botones").modal("show");

    $("#docito").val(doc);
    $("#NUM_SAP").val(sap);
    $("#NUM_GUIA").val(guia);
    $("#CLIENTE").val(cliente);
    $("#ESTADO").val(estado);
    $("#empresa").val(emp);
    $("#idESTADO").val(idestado);
    $("#OC_DET").val(oc);
    $("#nombre_alistado_por_gen").val(alistado_por);
    $("#usuario_sesion_gen").val(usuario);


    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    $("#docito_Modal_oc").val(doc);

    $("#docito_Modal_guia").val(doc);
    // $("#docentry_Modal").val(doc);


    setTimeout(() => {
        consultar_boton();
        consultar_boton2();
    }, 500);
});

$(document).on("dblclick", "#tabla_listado_despachados tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    var numeroFila = $fila.index() + 1; // +1 para que empiece desde 1 en lugar de 0

    console.log("Número de la fila seleccionada: " + numeroFila);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(2)").text();
    var emp = $fila.find("td:nth-child(3)").text();
    var sap = $fila.find("td:nth-child(12)").text();
    var guia = $fila.find("td:nth-child(17)").text().trim();
    var cliente = $fila.find("td:nth-child(6)").text();
    var oc = $fila.find("td:nth-child(7)").text();
    var estado = $fila.find("td:nth-child(10)").text();
    var idestado = $fila.find("td:nth-child(13)").text();
    var alistado_por = $fila.find("td:nth-child(15)").text();
    var usuario = $fila.find("td:nth-child(16)").text();

    // console.log("doc:" + doc);
    // console.log("emp:"+emp);
    // console.log("sap:"+sap);
    // console.log("guia:"+guia);
    // console.log("cliente:"+cliente);
    // console.log("estado:"+estado);
    // console.log("idestado:"+idestado);
    // console.log("oc:"+oc);


    setTimeout(() => {
        $("#modal_id_botones_pediDespa").modal("show");
        $("#generar_rotulo").hide();
        $("#btn_cierre_pedido").hide();
        $("#btn_alista").hide();
        $("#button_ad1").hide();
        $("#button_ad2").hide();
        $("#button_ad").show();
    }, 500);

    $("#docito_despa").val(doc);
    $("#NUM_SAP_despa").val(sap);
    $("#NUM_GUIA_despa").val(guia);
    $("#CLIENTE_despa").val(cliente);
    $("#ESTADO_despa").val(estado);
    $("#empresa_despa").val(emp);
    $("#idESTADO_despa").val(idestado);
    $("#OC_NAME5").val(oc);
    $("#nombre_alistado_por_despa").val(alistado_por);
    $("#usuario_sesion_despa").val(usuario);


    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    $("#docito_Modal_oc").val(doc);

    $("#docito_Modal_guia").val(doc);
    // $("#docentry_Modal").val(doc);




    // setTimeout(() => {
    //     consultar_boton();
    //     consultar_boton2();
    // }, 500);
});

$(document).on("dblclick", "#tabla_listado_finalizados tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(1)").text();
    var emp = $fila.find("td:nth-child(2)").text();
    var oc = $fila.find("td:nth-child(8)").text();

    var sap = $fila.find("td:nth-child(6)").text();
    var guia = $fila.find("td:nth-child(17)").text().trim();
    var cliente = $fila.find("td:nth-child(9)").text();
    var estado = $fila.find("td:nth-child(10)").text();
    var idestado = $fila.find("td:nth-child(11)").text();
    var nom_despacho = $fila.find("td:nth-child(13)").text();
    var alistado = $fila.find("td:nth-child(14)").text();
    var usuario = $fila.find("td:nth-child(15)").text();
    var nombre_usuario = $fila.find("td:nth-child(16)").text();

    console.log("doc:" + doc);
    console.log("emp:" + emp);
    console.log("sap:" + sap);
    console.log("guia:" + guia);
    console.log("cliente:" + cliente);
    console.log("estado:" + estado);
    console.log("idestado:" + idestado);
    console.log("oc:" + oc);

    setTimeout(() => {
        $("#modal_id_botones_finalizados").modal("show");
        $("#generar_rotulo").hide();
        $("#btn_cierre_pedido").hide();
        $("#btn_alista").hide();
        $("#button_ad1").show();
        $("#button_ad").hide();
        $("#button_ad2").hide();
        $("#btn_det_entrega").show();

    }, 500);
    $("#docito_despa_fin").val(doc);
    $("#NUM_SAP_despa_fin").val(sap);
    $("#NUM_GUIA_despa_fin").val(guia);
    $("#CLIENTE_despa_fin").val(cliente);
    $("#ESTADO_despa_fin").val(estado);
    $("#empresa_despa_fin").val(emp);
    $("#idESTADO_despa_fin").val(idestado);
    $("#OC_NAME5_fin").val(oc);
    $("#forma_despacho_fin").val(nom_despacho);
    $("#nombre_alistado_por").val(alistado);
    $("#usuario_sesion").val(usuario);
    $("#nombre_usuario_sesion").val(nombre_usuario);
    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    $("#docito_Modal_oc").val(doc);

    $("#docito_Modal_guia").val(doc);
    // $("#docentry_Modal").val(doc);




    setTimeout(() => {
        // consultar_boton();
        consultar_boton2();
    }, 500);
});

// $(document).on("dblclick", "#tabla_listado_progra tbody tr", function () {
//     var $fila = $(this);

//     var filaId = $fila.attr('id');

//     //console.log("Número de la fila seleccionada: " + filaId);

//     // Obtener los datos de las celdas
//     var doc = $fila.find("td:nth-child(1)").text();

//     var emp = $fila.find("td:nth-child(2)").text();
//     //var sap = $fila.find("td:nth-child(5)").text();
//     var guia = $fila.find("td:nth-child(4)").text();
//     var cliente = $fila.find("td:nth-child(5)").text();
//     var estado = $fila.find("td:nth-child(9)").text();

//     console.log(cliente);


//     $("#modal_id_botones_pepro").modal("show");

//     $("#docito_pro").val(doc);
//     //$("#NUM_SAP2").val(sap);
//     $("#NUM_GUIA2").val(guia);
//     $("#CLIENTE2").val(cliente);
//     $("#ESTADO2").val(estado);
//     $("#empresa2").val(emp);

//     //console.log(emp)
//     //de cargar o/c
//     $("#docito_Modal").val(doc);
//     $("#docentry_Modal").val(doc);
//     $("#docentry_Modal_OC").val(doc);
//     // setTimeout(() => {
//     //     consultar_boton();
//     //     consultar_boton2();
//     // }, 500);
// });

$(document).on("dblclick", "#tabla_listado_progra tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    //console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(2)").text();
    var emp = $fila.find("td:nth-child(3)").text();
    //var sap = $fila.find("td:nth-child(5)").text();
    var guia = $fila.find("td:nth-child(5)").text().trim();
    var cliente = $fila.find("td:nth-child(6)").text();
    var oc = $fila.find("td:nth-child(7)").text();

    var estado = $fila.find("td:nth-child(10)").text();
    var codestado = $fila.find("td:nth-child(14)").text();
    var alistado_por = $fila.find("td:nth-child(15)").text();
    var usuario = $fila.find("td:nth-child(16)").text();


    console.log(codestado);


    $("#modal_id_botones_pepro").modal("show");

    $("#docito_pro").val(doc);
    //$("#NUM_SAP2").val(sap);
    $("#NUM_GUIA2").val(guia);
    $("#CLIENTE2").val(cliente);
    $("#ESTADO2").val(estado);
    $("#empresa2").val(emp);
    //codESTADO2
    $("#codESTADO2").val(codestado);
    $("#OC_NAME4").val(oc);
    $("#nombre_alistado_por_gen2").val(alistado_por);
    $("#usuario_sesion_gen2").val(usuario);


    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    // setTimeout(() => {
    //     consultar_boton();
    //     consultar_boton2();
    // }, 500);
});

$(document).on("dblclick", "#tabla_listoDespa tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    //console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(2)").text();
    var emp = $fila.find("td:nth-child(3)").text();
    //var sap = $fila.find("td:nth-child(5)").text();
    var guia = $fila.find("td:nth-child(19)").text().trim();
    var oc = $fila.find("td:nth-child(7)").text().trim();

    var cliente = $fila.find("td:nth-child(8)").text();
    var estado = $fila.find("td:nth-child(4)").text();
    var codestado = $fila.find("td:nth-child(14)").text();
    var alistado_por = $fila.find("td:nth-child(17)").text();
    var usuario = $fila.find("td:nth-child(18)").text();


    console.log(codestado);


    $("#modal_id_botones_pepro3").modal("show");

    $("#docito_pro3").val(doc);
    //$("#NUM_SAP2").val(sap);
    $("#NUM_GUIA3").val(guia);
    $("#CLIENTE3").val(cliente);
    $("#ESTADO3").val(estado);
    $("#empresa3").val(emp);
    $("#codESTADO3").val(codestado);
    $("#OC_NAME3").val(oc);
    $("#nombre_alistado_por_3").val(alistado_por);
    $("#usuario_sesion_3").val(usuario);


    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    // setTimeout(() => {
    //     consultar_boton();
    //     consultar_boton2();
    // }, 500);
});



function mostrarModalLiberar() {
    $.ajax({
        url: 'Listado_idr.php',
        type: 'POST',
        success: function (res) {
            $("#idr-listado").html(res);
            $('#modal_id_Liberar_despacho').modal('show');
        },
        error: function () {
            alert("Hubo un error al cargar los pedidos.");
        }
    });
}

// function ConfirmarLiberacion() {
//     $('#modalConfirmacion').modal('show');
// }

function ConfirmarLiberacion() {
    if ($("#gen_idr:checked").length === 0) {
        alertify.error("Por favor, seleccione al menos un despacho.");
        return; // Sale de la función si no hay checkbox seleccionados
    }
    // Mostrar modal de confirmación
    swal({
        title: "¿Estás seguro?",
        text: "¿Deseas liberar los despachos seleccionados?",
        icon: "warning",
        buttons: ["No", "Sí"], // Botones personalizados
        dangerMode: true, // Resalta el botón negativo
    }).then((willProceed) => {
        if (willProceed) {
            // Si el usuario confirma, ejecuta la lógica
            $("#gen_idr:checked").each(function () {
                var doc = $(this).closest("tr").find('td:eq(2)').text();
                var empresa = $(this).closest("tr").find('td:eq(3)').text();
                var idr = $(this).closest("tr").find('td:eq(1)').text();
                var tipo = $(this).closest("tr").find('td:eq(5)').text();

                $.ajax({
                    url: "liberar_despacho_Programado.php",
                    type: "POST",
                    data: { doc: doc, empresa: empresa, idr: idr, tipo: tipo },
                    beforeSend: function () {
                        console.log("Liberando despacho para: Documento = " + doc + ", Empresa = " + empresa + ", IDR = " + idr);
                    },
                    success: function (data) {
                        console.log("Procesado exitosamente: " + data);
                        // Actualiza la página después de procesar
                        // location.reload();
                        // busca_Lista_programados();
                        //location.reload();
                    },
                    error: function (jqXHR, estado, error) {
                        console.error("Error procesando documento " + doc + ": " + error);
                    }
                });
            });

            // Ocultar modal manual si lo necesitas
            $("#modal_id_Liberar_despacho").modal("hide");
        } else {
            // Si el usuario cancela, no se realiza ninguna acción
            console.log("Liberación cancelada por el usuario.");
        }
    });

}

$(document).on("click", "#tabla_idr tbody tr", function () {
    var clickedCheckbox = $(this).find("#gen_idr"); // Checkbox dentro de la fila clickeada

    if (clickedCheckbox.is(":disabled")) {
        return; // Salir si el checkbox está deshabilitado
    }

    var idr = $(this).find("td:nth-child(2)").text().trim(); // Obtener el valor de la columna IDR

    var isChecked = !clickedCheckbox.is(":checked"); // Obtener el nuevo estado del checkbox
    clickedCheckbox.prop("checked", isChecked); // Actualizar el checkbox clickeado

    // Actualizar todas las filas con el mismo IDR
    $("#tabla_idr tbody tr").each(function () {
        var currentIDR = $(this).find("td:nth-child(2)").text().trim(); // Obtener el IDR de la fila actual
        var checkbox = $(this).find("#gen_idr");

        if (currentIDR === idr) { // Si el IDR coincide
            checkbox.prop("checked", isChecked); // Sincronizar estado de los checkboxes

            if (isChecked) {
                $(this).find("td").css("background-color", "LightGreen"); // Pintar de verde
                checkbox.prop("disabled", false); // Mantener habilitados
            } else {
                $(this).find("td").css("background-color", "white"); // Restaurar color
            }
        } else {
            // Si el IDR no coincide y el checkbox está marcado, deshabilitarlo
            if (isChecked) {
                checkbox.prop("disabled", true); // Deshabilitar otros checkboxes
                $(this).find("td").css("background-color", "#f5f5f5"); // Pintar de gris
            } else {
                checkbox.prop("disabled", false); // Rehabilitar checkboxes
                $(this).find("td").css("background-color", "white"); // Restaurar color
            }
        }
    });
});

$(document).on("click", "#tabla_idr_ruta tbody tr", function () {
    var clickedCheckbox = $(this).find("#gen_idr_ruta"); // Checkbox dentro de la fila clickeada

    if (clickedCheckbox.is(":disabled")) {
        return; // Salir si el checkbox está deshabilitado
    }

    var idr = $(this).find("td:nth-child(2)").text().trim(); // Obtener el valor de la columna IDR

    var isChecked = !clickedCheckbox.is(":checked"); // Obtener el nuevo estado del checkbox
    clickedCheckbox.prop("checked", isChecked); // Actualizar el checkbox clickeado

    // Actualizar todas las filas con el mismo IDR
    $("#tabla_idr_ruta tbody tr").each(function () {
        var currentIDR = $(this).find("td:nth-child(2)").text().trim(); // Obtener el IDR de la fila actual
        var checkbox = $(this).find("#gen_idr_ruta");

        if (currentIDR === idr) { // Si el IDR coincide
            checkbox.prop("checked", isChecked); // Sincronizar estado de los checkboxes

            if (isChecked) {
                $(this).find("td").css("background-color", "LightGreen"); // Pintar de verde
                checkbox.prop("disabled", false); // Mantener habilitados
                $('#btn_cerrarr').hide();
                $('#id_btnruta').show();

            } else {
                $(this).find("td").css("background-color", "white"); // Restaurar color
                $('#btn_cerrarr').show();
                $('#id_btnruta').hide();
            }
        } else {
            // Si el IDR no coincide y el checkbox está marcado, deshabilitarlo
            if (isChecked) {
                checkbox.prop("disabled", true); // Deshabilitar otros checkboxes
                $(this).find("td").css("background-color", "#f5f5f5"); // Pintar de gris
                $('#btn_cerrarr').hide();
                $('#id_btnruta').show();
            } else {
                checkbox.prop("disabled", false); // Rehabilitar checkboxes
                $(this).find("td").css("background-color", "white"); // Restaurar color
                $('#btn_cerrarr').show();
                $('#id_btnruta').hide();
            }
        }
    });
});

$(document).on("click", "#tabla_idr_eliminar tbody tr", function () {
    var clickedCheckbox = $(this).find("#gen_idr"); // Checkbox dentro de la fila clickeada

    if (clickedCheckbox.is(":disabled")) {
        return; // Salir si el checkbox está deshabilitado
    }

    var idr = $(this).find("td:nth-child(2)").text().trim(); // Obtener el valor de la columna IDR (columna 1 es checkbox, columna 2 es IDR)

    var isChecked = !clickedCheckbox.is(":checked"); // Obtener el nuevo estado del checkbox
    clickedCheckbox.prop("checked", isChecked); // Actualizar el checkbox clickeado

    // Cambiar el color de la fila clickeada según el estado del checkbox
    // if (isChecked) {
    //     $(this).find("td").css("background-color", "LightGreen");
    // } else {
    //     $(this).find("td").css("background-color", "white");
    // }

    // Actualizar todos los checkboxes con el mismo IDR
    $("#tabla_idr_eliminar tbody tr").each(function () {
        var currentIDR = $(this).find("td:nth-child(2)").text().trim(); // Obtener el IDR de la fila actual
        var checkbox = $(this).find("#gen_idr");

        if (currentIDR === idr) { // Comparar si es igual al IDR clickeado
            checkbox.prop("checked", isChecked);
            if (isChecked) {
                $(this).find("td").css("background-color", "LightGreen"); // Pintar de verde
                checkbox.prop("disabled", false); // Mantener habilitados
            } else {
                $(this).find("td").css("background-color", "white"); // Restaurar color
            }

            // var checkbox = $(this).find("#gen_idr");
            // checkbox.prop("checked", isChecked); // Actualizar el estado del checkbox
            // // Cambiar el color de la fila
            // if (isChecked) {
            //     $(this).find("td").css("background-color", "LightGreen");
            // } else {
            //     $(this).find("td").css("background-color", "white");
            // }
        } else {
            // Si el IDR no coincide y el checkbox está marcado, deshabilitarlo
            if (isChecked) {
                checkbox.prop("disabled", true); // Deshabilitar otros checkboxes
                $(this).find("td").css("background-color", "#f5f5f5"); // Pintar de gris
            } else {
                checkbox.prop("disabled", false); // Rehabilitar checkboxes
                $(this).find("td").css("background-color", "white"); // Restaurar color
            }
        }


    });
});

function Editar_ped_programados() {
    if (filaSeleccionada) {
        console.log("Editar pedido programado para la fila ID: " + filaSeleccionada);

    } else {
        alert("No se ha seleccionado ninguna fila para editar.");
    }
}

function Liberar_A_despacho_pedProgra() {
    $.ajax({
        beforeSend: function () {
            $("#idr-listado").html("Cargando los datos...");
        },
        url: "Listado_idr.php",
        type: "POST",
        data: { tipoAccion: "liberar" },
        success: function (res) {
            $("#idr-listado").html(res);

            $(document).ready(function () {
                $("#tabla_idr").DataTable();
            });

            console.log("Mostrando modal para liberar...");
            $('#modal_id_Liberar_despacho').modal({
                backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
                keyboard: false     // Evita el cierre al presionar "Esc"
            });
            $("#modal_id_Liberar_despacho").modal("show");
        },
        error: function (jqXHR, estado, error) {
            alert("Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo.");
            console.log(estado + " - " + error);
        }
    });
}

function Eliminar_ped_programados() {
    $.ajax({
        beforeSend: function () {
            $("#idr-eliminar").html("Cargando los datos...");
        },
        url: "Listado_idr_eliminar.php",
        type: "POST",
        data: { tipoAccion: "eliminar" },
        success: function (res) {
            $("#idr-eliminar").html(res);

            $(document).ready(function () {
                $("#tabla_idr_eliminar").DataTable();
            });

            console.log("Mostrando modal para eliminar...");
            $('#modal_id_eliminar_despacho').modal({
                backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
                keyboard: false     // Evita el cierre al presionar "Esc"
            });
            $("#modal_id_eliminar_despacho").modal("show");
        },
        error: function (jqXHR, estado, error) {
            alert("Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo.");
            console.log(estado + " - " + error);
        }
    });
}

function ConfirmarEliminacion() {
    var checkedCount = $("#tabla_idr_eli #gen_idr_eli:checked").length;

    console.log('entro');
    if (checkedCount === 0) {
        // Mostrar alerta de error si no hay ningún checkbox marcado
        alertify.error("Debe activar al menos un IDR.");
    } else {
        $('#modaleliminacion').modal('show');

    }

}

function mostrarModalEliminar() {
    $.ajax({
        url: 'Listado_idr_eliminar.php',
        type: 'POST',
        success: function (res) {
            $("#idr-listado").html(res);
            $('#modal_id_eliminar_despacho').modal('show');
        },
        error: function () {
            alert("Hubo un error al cargar los pedidos.");
        }
    });
}

$("#btnEliminar").click(function () {

    $("#gen_idr_eli:checked").each(function () {
        var doc = $(this).closest("tr").find('td:eq(2)').text();
        var empresa = $(this).closest("tr").find('td:eq(3)').text();
        var idr = $(this).closest("tr").find('td:eq(1)').text();
        var tipo_creacion = $(this).closest("tr").find('td:eq(8)').text();

        // console.log("doc:"+doc);
        // console.log("empresa:"+empresa);
        // console.log("idr:"+idr);
        // console.log("tipo_creacion:"+tipo_creacion);

        $.ajax({
            url: "eliminar_despacho_Programado.php",
            type: "POST",
            data: { doc: doc, empresa: empresa, idr: idr, tipo_creacion: tipo_creacion },
            beforeSend: function () {
                console.log("eliminar despacho para: Documento = " + doc + ", Empresa = " + empresa + ", IDR = " + idr + ", tipo_creacion= " + tipo_creacion);
            },
            success: function (data) {
                console.log("Procesado exitosamente: " + data);
                // busca_Lista_Despachos();
                // busca_listosDespachos();
                // location.reload();

            },
            error: function (jqXHR, estado, error) {
                console.error("Error procesando documento " + doc + ": " + error);
            }
        });
    });

    // $("#modaleliminacion").modal("hide");
    // $("#modal_id_eliminar_despacho").modal("hide");

});

$(document).on("click", "#tabla tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#precio_id");

    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila(checkbox);
});

function actualizarFila(checkbox) {

    var checkboxes = $('#tabla .chkCheckBoxId');
    var checkbox2 = $("#tabla tbody tr").find("#precio_id");
    var checkboxesActivados = checkboxes.filter(':checked').length;
    var cant = checkbox2.closest("tr").find("#precio_id:checked").length;
    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }
    if (checkboxesActivados > 0) {
        $("#enviar").show();
    } else {
        $("#enviar").hide();
    }
}

$(document).on("dblclick", "#tabla_archivos_registrados tbody tr", function () {
    var $fila = $(this);

    var filaId = $fila.attr('id');

    console.log("Número de la fila seleccionada: " + filaId);

    // Obtener los datos de las celdas
    var doc = $fila.find("td:nth-child(1)").text();
    var emp = $fila.find("td:nth-child(2)").text();
    var sap = $fila.find("td:nth-child(5)").text();
    var guia = $fila.find("td:nth-child(6)").text();
    var cliente = $fila.find("td:nth-child(8)").text();
    var estado = $fila.find("td:nth-child(3)").text();
    cargarDatosArchivos(filaId); // Se pasa el ID de la fila

    $("#modal_id_botones").modal("show");
    // $("#modal_registrar_evidencia").modal("show");
    $("#docito").val(doc);
    $("#NUM_SAP").val(sap);
    $("#NUM_GUIA").val(guia);
    $("#CLIENTE").val(cliente);
    $("#ESTADO").val(estado);
    $("#empresa").val(emp);

    //console.log(emp)
    //de cargar o/c
    $("#docito_Modal").val(doc);
    $("#docentry_Modal").val(doc);
    $("#docentry_Modal_OC").val(doc);
    $("#docito_Modal_oc").val(doc);
    $("#docito_Modal_guia").val(doc);
    // $("#docentry_Modal").val(doc);


    setTimeout(() => {
        consultar_boton();
        consultar_boton2();
    }, 500);
});



function Cargar_guia() {
    $('#modal_CARGAR_guia').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_CARGAR_guia").modal("show");
    doc = $("#docentry_Modal").val();
    listar_data_pdf(doc);

}




function Cargar_guia_pro3() {
    $('#modal_CARGAR_guia').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_CARGAR_guia").modal("show");
    doc = $("#docentry_Modal").val();
    listar_data_pdf(doc);

}


function Cargar_guia_pro() {
    $('#modal_CARGAR_guia').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_CARGAR_guia").modal("show");
    doc = $("#docentry_Modal").val();
    listar_data_pdf(doc);

}



function listar_data_pdf(id) {

    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();

        $.ajax({
            beforeSend: function () {
                // $("#data_pdf_todos").html("Buscando las ventas, un momento...");
            },
            url: "listar_despacho_pdf_otro.php",
            type: "POST",
            data: { id: id },
            success: function (res) {
                // console.log(res);
                $("#data_pdf_todos").html(res);
                $(document).ready(function () {
                    $("#tabla_pfd").DataTable();
                });
            },
            error: function (jqXHR, estado, error) {
                alert(
                    "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
                );
                $("#data_pdf_todos").html(estado + "     " + error);
            },
        });
    });
}



function ver_manual_pdf(id, ruta) {
    $global_id = id;
    $global_ruta = ruta;
    //console.log(id)
    $('#modal_data_pdf_guia').modal('show');
    $('.modal_data_pdf').on('shown.bs.modal', function () {      //correct here use 'shown.bs.modal' event which comes in bootstrap3
        $(this).find('iframe').attr('src', $global_ruta)
    })
    $("#navegador_guia").on('click', function () {
        //window.location.href = $global_ruta
        window.open($global_ruta);

    })
    $("#imprimir_guia").on('click', function () {
        $('#imprimir_guia')[0].contentWindow.print();
        //window.print();

    })
}





// $(document).ready(function () {
//     // Manejar clic en el botón
//     $("#miBoton").click(function () {
//         submitForm();

//     });

//     // Manejar envío del formulario
//     $("form#data").submit(function (event) {
//         // Evitar que el formulario se envíe automáticamente al presionar Enter
//         event.preventDefault();

//         submitForm();
//     });

//     function submitForm() {


//         var formData = new FormData($("form#data")[0]);
//         var files = $("#fileToUpload_guia")[0].files[0];
//         var num = $("#docentry_Modal").val();
//         var emp = $("#docentry_Modal").val();


//         var movi = '';

//         var nuevoValor = "GUIA-" + num;

//         // Hacer algo con el nuevo valor, por ejemplo, mostrarlo en el consola
//         console.log("Nuevo Valor:", nuevoValor);
//         var titulo = nuevoValor;


//         if (titulo === "") {
//             alertify.error("Falta titulo");
//             return false;
//         }
//         if (files === undefined) {
//             alertify.error("no existe documento ");
//             return false;
//         } else {
//             formData.append("file", files);
//             //formData.append("clienteNos", clienteNos);
//             formData.append("titulo", titulo);
//             formData.append("num", num);
//             //formData.append("movi", movi);

//             $.ajax({
//                 url: "registrar_pdf_despacho_otro.php",
//                 type: "post",
//                 data: formData,
//                 async: false,
//                 cache: false,
//                 contentType: false,
//                 processData: false,
//                 success: function (response) {
//                     $("#archivo_reg").val("");
//                     $("#titulo_reg").val("");
//                     listar_data_pdf(num);
//                 },
//             });
//             return false;
//         }
//     }
// });







function Cargar_O_C() {
    // $('#modal_registrar_evidencia').modal({
    //     backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    //     keyboard: false     // Evita el cierre al presionar "Esc"
    // });
    // // $("#modal_CARGAR_OC").modal("show");
    // $("#modal_registrar_evidencia").modal("show");
    $('#modal_regi_evi_oc').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    // $("#modal_CARGAR_OC").modal("show");
    $('#modal_regi_evi_oc').on('show.bs.modal', function () {
        $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
    });

    // doc = $("#docentry_Modal_OC").val();
    doc = $("#docito").val();
    nmeempresa = $("#CLIENTE").val();
    emp = $("#empresa").val();

    n_guia = $("#NUM_GUIA").val().trim();
    // oc_carga = $("#oc_cargar").val();
    oc_carga = $("#OC_DET").val();
    console.log(oc_carga);



    setTimeout(() => {
        $("#docentry_OC_subir").val(doc);
        // $("#nguia_ocevi").val(n_guia);
        $("#name_client_ocevi").val(nmeempresa);
        $("#empresa_oc_evi").val(emp);
        $("#nguia_ocevi").val(oc_carga);
    }, 500);

    listar_data_pdf_oc(doc);

}


function Cargar_O_C_pro3() {


    $('#modal_regi_evi_oc').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    // $("#modal_CARGAR_OC").modal("show");
    $('#modal_regi_evi_oc').on('show.bs.modal', function () {
        $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
    });

    // doc = $("#docentry_Modal_OC").val();
    doc = $("#docito_pro3").val();
    nmeempresa = $("#CLIENTE3").val();
    emp = $("#empresa3").val();

    // n_guia = $("#NUM_GUIA").val().trim();
    // oc_carga = $("#oc_cargar").val();
    oc_carga = $("#OC_NAME3").val();
    console.log(oc_carga);



    setTimeout(() => {
        $("#docentry_OC_subir").val(doc);
        // $("#nguia_ocevi").val(n_guia);
        $("#name_client_ocevi").val(nmeempresa);
        $("#empresa_oc_evi").val(emp);
        $("#nguia_ocevi").val(oc_carga);
    }, 500);

    listar_data_pdf_oc(doc);

}
function Cargar_O_C_pro4() {


    $('#modal_regi_evi_oc').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    // $("#modal_CARGAR_OC").modal("show");
    $('#modal_regi_evi_oc').on('show.bs.modal', function () {
        $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
    });

    // doc = $("#docentry_Modal_OC").val();
    doc = $("#docito_despa").val();
    nmeempresa = $("#CLIENTE_despa").val();
    emp = $("#empresa_despa").val();

    // n_guia = $("#NUM_GUIA").val().trim();
    // oc_carga = $("#oc_cargar").val();
    oc_carga = $("#OC_NAME5").val();
    console.log(oc_carga);



    setTimeout(() => {
        $("#docentry_OC_subir").val(doc);
        // $("#nguia_ocevi").val(n_guia);
        $("#name_client_ocevi").val(nmeempresa);
        $("#empresa_oc_evi").val(emp);
        $("#nguia_ocevi").val(oc_carga);
    }, 500);

    listar_data_pdf_oc(doc);

}
function Cargar_O_C_pro5() {


    $('#modal_regi_evi_oc').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    // $("#modal_CARGAR_OC").modal("show");
    $('#modal_regi_evi_oc').on('show.bs.modal', function () {
        $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
    });

    // doc = $("#docentry_Modal_OC").val();
    doc = $("#docito_despa").val();
    nmeempresa = $("#CLIENTE_despa").val();
    emp = $("#empresa_despa").val();

    // n_guia = $("#NUM_GUIA").val().trim();
    // oc_carga = $("#oc_cargar").val();
    oc_carga = $("#OC_NAME5").val();
    console.log(oc_carga);



    setTimeout(() => {
        $("#docentry_OC_subir").val(doc);
        // $("#nguia_ocevi").val(n_guia);
        $("#name_client_ocevi").val(nmeempresa);
        $("#empresa_oc_evi").val(emp);
        $("#nguia_ocevi").val(oc_carga);
    }, 500);

    listar_data_pdf_oc(doc);

}
function Cargar_O_C_pro() {
    // $('#modal_registrar_evidencia').modal({
    //     backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    //     keyboard: false     // Evita el cierre al presionar "Esc"
    // });
    // // $("#modal_CARGAR_OC").modal("show");
    // $("#modal_registrar_evidencia").modal("show");
    $('#modal_regi_evi_oc').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    // $("#modal_CARGAR_OC").modal("show");
    $('#modal_regi_evi_oc').on('show.bs.modal', function () {
        $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
    });

    // doc = $("#docentry_Modal_OC").val();
    doc = $("#docito_pro").val();
    nmeempresa = $("#CLIENTE2").val();
    emp = $("#empresa2").val();

    // n_guia = $("#NUM_GUIA").val().trim();
    // oc_carga = $("#oc_cargar").val();
    oc_carga = $("#OC_NAME4").val();
    console.log(oc_carga);



    setTimeout(() => {
        $("#docentry_OC_subir").val(doc);
        // $("#nguia_ocevi").val(n_guia);
        $("#name_client_ocevi").val(nmeempresa);
        $("#empresa_oc_evi").val(emp);
        $("#nguia_ocevi").val(oc_carga);
    }, 500);

    listar_data_pdf_oc(doc);

}

function Cargar_O_C_finalizados() {
    // $('#modal_registrar_evidencia').modal({
    //     backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    //     keyboard: false     // Evita el cierre al presionar "Esc"
    // });
    // // $("#modal_CARGAR_OC").modal("show");
    // $("#modal_registrar_evidencia").modal("show");
    $('#modal_regi_evi_oc').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    // $("#modal_CARGAR_OC").modal("show");
    $('#modal_regi_evi_oc').on('show.bs.modal', function () {
        $('#fileToUpload_OC2').val(''); // Limpia el valor del input file
    });

    // doc = $("#docentry_Modal_OC").val();
    doc = $("#docito_despa_fin").val();
    nmeempresa = $("#CLIENTE_despa_fin").val();
    emp = $("#empresa_despa_fin").val();

    n_guia = $("#NUM_GUIA_despa_fin").val().trim();
    // oc_carga = $("#oc_cargar").val();
    oc_carga = $("#OC_NAME5_fin").val();
    console.log(oc_carga);



    setTimeout(() => {
        $("#docentry_OC_subir").val(doc);
        // $("#nguia_ocevi").val(n_guia);
        $("#name_client_ocevi").val(nmeempresa);
        $("#empresa_oc_evi").val(emp);
        $("#nguia_ocevi").val(oc_carga);
    }, 500);

    listar_data_pdf_oc(doc);

}




function listar_data_pdf_oc(id) {

    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();

        $.ajax({
            beforeSend: function () {
                $("#data_pdf_todos_OC").html("Buscando las ventas, un momento...");
            },
            url: "listar_despacho_pdf_oc.php",
            type: "POST",
            data: { id: id },
            success: function (res) {
                // console.log(res);
                $("#data_pdf_todos_OC").html(res);
                $(document).ready(function () {
                    $("#tabla_pfd_oc").DataTable();
                });
            },
            error: function (jqXHR, estado, error) {
                alert(
                    "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
                );
                $("#data_pdf_todos_OC").html(estado + "     " + error);
            },
        });
    });
}



function ver_manual_pdf(id, ruta) {
    $global_id = id;
    $global_ruta = ruta;
    //console.log(id)
    $('#modal_data_pdf_OC').modal('show');
    $('.modal_data_pdf').on('shown.bs.modal', function () {      //correct here use 'shown.bs.modal' event which comes in bootstrap3
        $(this).find('iframe').attr('src', $global_ruta)
    })
    $("#navegador_OC").on('click', function () {
        //window.location.href = $global_ruta
        window.open($global_ruta);

    })
    $("#imprimir_OC").on('click', function () {
        $('#imprimir_OC')[0].contentWindow.print();
        //window.print();

    })
}



var fileCounter = 0; // Contador para los archivos

var archivosRegistrados = []; // Variable global para almacenar los archivos registrados

function REGISTRAR_EVIDENCIA_O_C() {
    var archivoInput = document.getElementById("fileToUpload");
    var archivo = archivoInput.files[0];

    if (archivo) {
        fileCounter++;
        var table = document.getElementById("tabla_archivos_registrados").getElementsByTagName('tbody')[0];
        var row = table.insertRow();

        var cellNum = row.insertCell(0);
        var cellNombre = row.insertCell(1);
        var cellAccion = row.insertCell(2);
        var rutaArchivo = "/archivos/" + archivo.name; //FIJA
        var formData = new FormData();
        formData.append('archivo', archivo);
        // Crear una URL temporal para el archivo y agregar la información a la tabla
        // var rutaArchivo = URL.createObjectURL(archivo);
        cellNum.innerHTML = fileCounter;
        cellNombre.innerHTML = archivo.name;
        cellAccion.innerHTML = `
            <button onclick="eliminarArchivo(this)">Eliminar</button>
            <button onclick="abrirModalVisualizarArchivo('${rutaArchivo}', '${archivo.name}')">Imprimir</button>
        `;

        archivoInput.value = ""; // Limpiar el input para permitir cargar nuevos archivos

        archivosRegistrados.push(archivo.name);
        mostrarArchivosRegistrados();

    } else {
        alert("Por favor selecciona un archivo antes de agregar.");
    }
}

// function eliminarArchivo(button) {
//     var row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
//     fileCounter--; // Ajustar el contador si es necesario
// }

function eliminarArchivo(button) {
    var row = button.parentNode.parentNode; // La fila de la tabla
    var archivoNombre = row.cells[1].textContent; // Obtener el nombre del archivo desde la celda

    row.parentNode.removeChild(row);

    archivos = archivos.split(","); // Convertir la cadena a un array si es necesario
    archivos = archivos.filter(function (archivo) {
        return archivo !== archivoNombre; // Filtrar el archivo que se eliminó
    });


    archivos = archivos.join(",");

    console.log("Archivo eliminado:", archivoNombre);
}

function mostrarArchivosRegistrados() {
    // Limpiar la tabla antes de volver a cargarla
    var table = document.getElementById("tabla_archivos_registrados").getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Limpiar el contenido actual de la tabla

    // Recorrer el array de archivos registrados y mostrarlos en la tabla
    archivosRegistrados.forEach(function (archivo, index) {
        var row = table.insertRow();

        var cellNum = row.insertCell(0);
        var cellNombre = row.insertCell(1);
        var cellAccion = row.insertCell(2);

        // Crear una URL temporal para el archivo
        var rutaArchivo = URL.createObjectURL(new Blob([archivo])); // Este es un ejemplo, ajusta según el archivo real

        // Agregar la información a la tabla
        cellNum.innerHTML = index + 1;
        cellNombre.innerHTML = archivo;
        cellAccion.innerHTML = `
            <button onclick="eliminarArchivo(this)">Eliminar</button>
            <button onclick="abrirModalVisualizarArchivo('${rutaArchivo}', '${archivo}')">Imprimir</button>
        `;
    });
}

function Imprimir_O_C() {
    var docentry = $("#docito_Modal_oc").val();
    console.log("Entrando en imprimir OC");

    // Limpia la tabla y muestra el modal
    $('#tabla_archivos_oc tbody').empty();
    $('#modal_imprimir_OC').modal('show');

    archivosRegistrados.forEach(function (archivo, index) {
        var archivoSinExtension = archivo.split('.')[0];  // Eliminar la extensión del archivo
        var rutaArchivo = archivo;  // Usar el nombre del archivo como la "ruta"

        // Crear una fila en la tabla para cada archivo con un botón "Ver"
        var nuevaFila = `
            <tr>
                <td>${index + 1}</td>
                <td>${archivoSinExtension}</td>
                <td><button class="btn btn-primary" onclick="abrirModalVisualizarArchivo('${rutaArchivo}', '${archivoSinExtension}')">Ver</button></td>
            </tr>
        `;
        $('#tabla_archivos_oc tbody').append(nuevaFila);  // Agregar la fila a la tabla
    });

    // Luego agregar los archivos obtenidos por AJAX (si los hay)
    $.ajax({
        url: "pdf_Archivos_OC.php",
        type: "POST",
        data: { docentry: docentry },
        success: function (response) {
            var idcl = response.split("|");  // Dividir la respuesta para obtener los archivos
            var archivos = idcl[18] ? idcl[18].split(',') : [];  // Obtener los nombres de los archivos

            // Agregar cada archivo a la tabla con un botón "Ver"
            archivos.forEach(function (archivo, index) {
                var archivoSinExtension = archivo.split('.')[0];  // Eliminar la extensión del archivo
                var rutaArchivo = archivo;  // Usar el nombre del archivo como la "ruta"

                // Crear una fila en la tabla para cada archivo con un botón "Ver"
                var nuevaFila = `
                <tr>
                    <td>${index + 1 + archivosRegistrados.length}</td>
                    <td>${archivoSinExtension}</td>
                    <td><button class="btn btn-primary" onclick="abrirModalVisualizarArchivo('${rutaArchivo}', '${archivoSinExtension}')">Ver</button></td>
                </tr>
            `;

                $('#tabla_archivos_oc tbody').append(nuevaFila);  // Agregar la fila a la tabla
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
            alert("No se pudieron cargar los archivos.");
        }
    });
}

function abrirModalVisualizarArchivo(rutaArchivo, nombreArchivo) {
    // const archivoExtension = nombreArchivo.split('.').pop().toLowerCase();
    // const modalContent = document.getElementById("modalArchivoContent");
    console.log("Abriendo archivo:", rutaArchivo);
    $('#modalArchivo').modal('show');
    $("#modalArchivoContent").empty();
    var fileExtension = rutaArchivo.split('.').pop().toLowerCase();
    if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
        // Si es una imagen, la mostramos en el modal
        var imgElement = `<img src="${rutaArchivo}" alt="${nombreArchivo}" style="width: 100%; max-height: 500px; object-fit: contain;" />`;
        $("#modalArchivoContent").html(imgElement);
    } else if (fileExtension === "pdf") {
        // Si es un PDF, podemos usar un visor de PDF
        var pdfElement = `<embed src="${rutaArchivo}" width="100%" height="500px" type="application/pdf" />`;
        $("#modalArchivoContent").html(pdfElement);
    } else {
        // Si es otro tipo de archivo, mostramos un mensaje
        $("#modalArchivoContent").html(`<p>No se puede previsualizar este archivo: ${nombreArchivo}</p>`);
    }
    // Limpia el contenido previo del modal
    // modalContent.innerHTML = "";

    // Configura el contenido del modal según el tipo de archivo
    // if (['jpg', 'jpeg', 'png', 'gif'].includes(archivoExtension)) {
    //     // Muestra la imagen en el modal
    //     modalContent.innerHTML = `<img src="${rutaArchivo}" alt="${nombreArchivo}" style="width:100%; height:auto;">`;
    // } else if (archivoExtension === 'pdf') {
    //     // Muestra el PDF en un iframe
    //     modalContent.innerHTML = `<iframe src="${rutaArchivo}" style="width:100%; height:500px;" frameborder="0"></iframe>`;
    // } else {
    //     // Mensaje si el tipo de archivo no es compatible
    //     modalContent.innerHTML = `<p>Formato de archivo no compatible para vista previa.</p>`;
    // }

    // Abre el modal
    $('#modalArchivo').modal('show');
}



function guadar_distrito(distrito, docentry, empresa, tipo) {
    console.log(distrito);
    console.log(docentry);
    console.log(empresa);
    $.ajax({
        beforeSend: function () {
            swal_carga()
        },
        url: 'insertar_almacen_despacho.php',
        type: 'POST',
        data: { distrito, docentry, empresa, tipo },
        success: function (x) {

            setTimeout(function () {
                swal.close(); // Cerrar el SweetAlert después del retraso
                // window.location.reload();
                busca_listosDespachos()
            }, 1500); // 1500 milisegundos = 1.5 segundos

        }

    });

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

function muestra_detalle_autorizaciones_despacho(id) {
    console.log(id);
    $("#guardar_actualizar_btn").hide();

    const [docEntry, emp, name, cardcode, serie, tipo] = id.split('/'); // Divide el ID en partes
    console.log('DocEntry:', docEntry);
    console.log('Empresa:', emp);
    console.log('Cliente:', name);
    console.log('CardCode:', cardcode);
    console.log('Serie:', serie);
    console.log('Tipo:', tipo);

    // serie_num = serie + "-" + numero;

    $("#docentry").val(docEntry);
    $("#empresa").val(emp);
    $("#cardcode").val(cardcode);
    $("#cliente").val(name);
    // $("#cliente").val(name);
    $("#tipo_crea_evi").val(tipo);

    $("#serienum_modalevi").val(serie);
    $("#num_modalevi").val(docEntry);
    $("#cliente_modevi").val(name);
    if (tipo) {
        $("#tipo_crea_evi").val(tipo.trim());
    }


    $(".nuticket2").html('');
    // $('#modal_detalle_venta').modal('show'); // Asegúrate de que el modal esté visible
    $("#modal_desi_evi").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    listar_data_pdf_todos1(docEntry, 'TD', emp, tipo);
    setTimeout(() => {
        listar_comentario_evidesi()

    }, 200);

    $(".nuticket2").append("Registro de Evidencia y Decisión| <span class='label' style='background-color: royalblue'>" + serie + "</span>");


    // $.ajax({
    //   beforeSend: function () {
    //     $("#detalle_de_venta").html("Consultando detalle despachos...");
    //   },
    //   url: 'consulta_detalle_venta_autorizaciones_despacho.php',
    //   type: 'POST',
    //   data: 'serie=' + tic[0] + '&numero=' + tic[1],
    //   success: function (x) {
    //     $(".nuticket").html("");
    //     $("#idpedido").val(tic[0]);
    //     $(".nuticket").append("Detalle de despachos | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
    //     $("#detalle_de_venta").html(x);

    //     var idpedido = '';
    //     idpedido = tic[0];
    //     $(document).ready(function () {
    //       $.ajax({
    //         //          beforeSend: function(){
    //         //            $("#montolp").html("Recuperando Lista Precios...");
    //         //           },
    //         url: 'pone_modelo_autoriza_venta_condicion.php',

    //         type: 'POST',
    //         data:
    //           { idpedido },
    //         success: function (x) {
    //           $("#idmodelo").val("");
    //           $("#comentariosaut").val("");
    //           $("#pone_cmodelo").html(x);
    //           $(".select2").select2();
    //           //              alert($("#totales").html())
    //           //$("#montolp2").val($("#montolp").val());

    //         },
    //         error: function (jqXHR, estado, error) {
    //         }
    //       });
    //     });

    //   },
    //   error: function (jqXHR, estado, error) {
    //     $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    //   }
    // });

    // 🔽 Aquí va la lógica para mostrar u ocultar el botón "Decisión"
    const isTab2Active = document.querySelector('#Tab2')?.classList.contains('active');
    const decisionBtn = document.getElementById('btn_decision');

    if (decisionBtn) {
        decisionBtn.style.display = isTab2Active ? 'none' : ''; // Oculta si Tab2 está activo
    }

}
function mostrar_evidencia() {

    // var doc = id;
    $('#modal_mostrar_evi').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_mostrar_evi").modal("show");
    id = $("#docentry").val();
    ciente = $("#cliente").val();
    emp = $("#empresa").val();
    tipo = $("#tipo_crea_evi").val();
    num_tick = $(".nuticket2").text();
    const [texto, serie_num] = num_tick.split('|'); // Divide el ID en partes


    document.getElementById("num_mos").value = id;
    document.getElementById("cliente_mos").value = ciente;
    document.getElementById("serie_num_field").value = serie_num;
    document.getElementById("tipo_crea_evidencia").value = tipo;
    listar_data_pdf_todos(id, "TD", emp, tipo);
}

function mostrar_detalle_entrega() {

    // var doc = id;
    $('#modal_mostrar_detalle_entrega').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_mostrar_detalle_entrega").modal("show");
    id = $("#docito_despa_fin").val();
    ciente = $("#CLIENTE_despa_fin").val();
    docnum = $("#NUM_SAP_despa_fin").val();
    emp = $("#empresa_despa_fin").val();
    tipo = $("#tipo_crea_evi").val();
    n_guia = $("#NUM_GUIA_despa_fin").val();
    n_oc = $("#OC_NAME5_fin").val();
    nom_despacho = $("#forma_despacho_fin").val();
    estado_des = $("#ESTADO_despa_fin").val();


    // document.getElementById("num_mos_det").value = id;
    document.getElementById("cliente_mos_det").value = ciente;
    document.getElementById("serie_num_field_det").value = n_guia;
    document.getElementById("num_oc_det").value = n_oc;
    document.getElementById("for_entrega").value = nom_despacho;
    document.getElementById("estado_des").value = estado_des;
    // document.getElementById("tipo_crea_evidencia_det").value = tipo;
    listar_detalle_entrega(docnum, emp);
}

function listar_detalle_entrega(docnum, emp) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#detalle_entrega_ped").html("Buscando las ventas, un momento...");
            },
            url: "listado_detalle_entrega.php",
            type: "POST",
            data: {
                docnum: docnum,
                emp: emp,
            },
            success: function (res) {
                $("#detalle_entrega_ped").html(res);
                // $("#tabla_pfd").DataTable();
            },
            error: function (jqXHR, estado, error) {
            },
        });
    });
}


function modal_desicion() {
    $('#modal_detalle_venta').on('shown.bs.modal', function () {
        $('body').addClass('modal-open'); // Asegura que el modal permanezca abierto
    });
    id = $("#docentry").val();
    name = $("#empresa").val();


    tipo = $("#tipo_crea_evi").val();
    emp = $("#empresa").val();

    swal({
        title: "Selecciona una acción",
        text: "¿Qué deseas hacer con este despacho?",
        icon: "info",
        buttons: {
            regresar: {
                text: "REPROGRAMAR DESPACHO",
                value: "regresar",
                className: "btn btn-danger"
            },
            enviado: {
                text: "ENTREGADO CON OBS",
                value: "enviado",
                className: "btn btn-warning"
            },
            entregado: {
                text: "ENTREGADO",
                value: "entregado",
                className: "btn btn-success"
            },
            rechazado: {
                text: "RECHAZADO",
                value: "rechazado",
                className: "btn btn-secondary"
            },
            cancel: {
                text: "Cancelar",
                value: "cancel",
                className: "btn btn-light"
            }
        }
    }).then((value) => {

        switch (value) {
            case "regresar":
                // Acción para "Regresar a Almacén"
                console.log("El usuario seleccionó 'Regresar a Almacén'");
                //alertify.success("Regresando a Almacén...");

                procesa_decision_despacho(id, 3, name, cliente, tipo)
                updatear_rutas(id, emp, tipo)

                break;

            case "enviado":
                // Acción para "Enviado"
                console.log("El usuario seleccionó 'Enviado'");
                //alertify.success("Despacho marcado como Enviado.");
                procesa_decision_despacho(id, 7, name, cliente, tipo)

                break;

            case "entregado":
                // Acción para "Entregado"  
                console.log("El usuario seleccionó 'Entregado'");
                //alertify.success("Despacho marcado como Entregado.");
                procesa_decision_despacho(id, 6, name, cliente, tipo)
                break;

            case "rechazado":
                // Acción para "Rechazado"
                console.log("El usuario seleccionó 'Rechazado'");
                //alertify.error("Despacho marcado como Rechazado.");
                procesa_decision_despacho(id, 8, name, cliente, tipo)
                correo_ped_rechazado(id)
                break;

            case "cancel":
                // Acción para "Cancelar"
                console.log("El usuario canceló la acción.");
                //alertify.message("Acción cancelada.");
                break;

            default:
                console.log("No se realizó ninguna acción.");
                break;
        }
    });
}

function procesa_decision_despacho(id, value, emp_ori, cliente, tipo) {
    // $("#modal_registrar_desicion").modal({
    //     show: true,
    //     backdrop: "static",
    //     keyboard: false,
    // });
    $("#docentry_desp").val(id);
    $("#value_desp").val(value);
    $("#emp_ori").val(emp_ori);
    $("#tipo_ori").val(tipo);
    registrar_desicion();
    // document.getElementById("num_reg").value = id;
    // document.getElementById("cliente_reg").value = name;
    // document.getElementById("tipor").value = 2;

}

function listar_data_pdf_todos1(id, movi, emp, tipo) {
    // num = document.getElementById("num_reg").value;
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
            beforeSend: function () {
                $("#data_pdf_todos").html("Buscando las ventas, un momento...");
            },
            // url: "listar_pdf_oc_almacen.php",
            url: "listar_despacho_pdf_almacen1.php",
            type: "POST",
            data: { id: id, movi: movi, emp: emp, tipo: tipo.trim() },
            success: function (res) {
                // console.log(res);
                $("#data_pdf_todos_3").html(res);
                // $(document).ready(function () {
                //     $("#tabla_pfd").DataTable();
                // });
            },
            error: function (jqXHR, estado, error) {
                alert(
                    "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
                );
                $("#data_pdf_todos").html(estado + "     " + error);
            },
        });
    });
}
function listar_data_pdf_todos(id, movi, emp, tipo) {
    // num = document.getElementById("num_reg").value;
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
            beforeSend: function () {
                // $("#data_pdf_todos_2").html("Buscando las ventas, un momento...");
            },
            url: "listar_despacho_pdf_almacen1.php",
            type: "POST",
            data: { id: id, movi: movi, emp: emp, tipo: tipo.trim() },
            success: function (res) {
                // console.log(res);
                $("#data_pdf_todos_2").html(res);
                $(document).ready(function () {
                    $("#tabla_pfd").DataTable();
                });
            },
            error: function (jqXHR, estado, error) {
                alert(
                    "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
                );
                $("#data_pdf_todos").html(estado + "     " + error);
            },
        });
    });
}
function subir_evidencia(id) {
    $("#modal_registrar_evi").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
    });
    name = $("#cliente").val();
    empresa = $("#emmpresa").val();
    serie_num = $("#serie_num_field").val();
    tipo = $("#tipo_crea_evi").val();
    console.log(tipo);


    document.getElementById("num_reg").value = id;
    document.getElementById("cliente_reg").value = name;
    document.getElementById("titulo_reg").value = serie_num;
    document.getElementById("serie_num_field2").value = serie_num;
    document.getElementById("tipor").value = 3;

    // listar_data_pdf(id, 3);
}
function subir_evidencia1() {
    var id = $("#docentry").val();

    $("#modal_registrar_evi").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
    });
    name = $("#cliente").val();
    empresa = $("#emmpresa").val();
    // serie_num = $("#serie_num_field").val();
    serie_num = $("#serienum_modalevi").val();
    tipo = $("#tipo_crea_evi").val();
    console.log(tipo);


    document.getElementById("num_reg").value = id;
    document.getElementById("cliente_reg").value = name;
    document.getElementById("titulo_reg").value = serie_num;
    document.getElementById("serie_num_field2").value = serie_num;
    document.getElementById("tipor").value = 3;
    $("#fileToUpload_1").val(""); // Esto resetea el input file

    // listar_data_pdf(id, 3);
}
$(document).ready(function () {
    $("form#data").submit(function (event) {
        event.preventDefault();
        var card_code = document.getElementById("cliente_reg").value;
        var titulo = document.getElementById("titulo_reg").value;
        var num = document.getElementById("num_reg").value;
        var movi = $("#tipor").val();
        var emp = $("#empresa").val();
        var tipo = $("#tipo_crea_evi").val();
        var comentario = $("#comentariosautri_1").val();
        var file = $("#fileToUpload_1")[0].files[0];
        if (!file) {
            alert("Por favor, selecciona un archivo.");
            return false;
        }
        // alert("📂 Archivo seleccionado:\n" + 
        //     "Nombre: " + file.name + "\n" + 
        //     "Tipo: " + file.type + "\n" + 
        //     "Tamaño: " + (file.size / 1024).toFixed(2) + " KB");
        var formData = new FormData();
        formData.append("fileToUpload_1", file);
        formData.append("card_code", $("#cliente_reg").val());
        formData.append("titulo", $("#titulo_reg").val());
        formData.append("num", $("#num_reg").val());
        formData.append("movi", $("#tipor").val());
        formData.append("emp", $("#empresa").val());
        formData.append("comentario", $("#comentariosautri_1").val());
        formData.append("tipo", $("#tipo_crea_evi").val());

        $.ajax({
            url: "registrar_pdf_despacho_almanew.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log("✅ Respuesta del servidor:", response);
                // alert(response);
                $("#archivo_reg").val("");
                $("#titulo_reg").val("");
                $("#modal_registrar_evi").modal("hide");
                listar_data_pdf_todos1(num, 'TD', emp, tipo.trim())
            },
            error: function (xhr, status, error) {
                console.error("❌ Error en la solicitud AJAX:");
                console.error("Estado:", status);
                console.error("Error:", error);
                console.error("Respuesta del servidor:", xhr.responseText);
                alert("❌ Error al subir el archivo. Revisa la consola para más detalles.");
            }
        });
    });
});
// $(document).ready(function () {
//     $("form#data").submit(function (event) {
//         var formData = new FormData($(this)[0]);
//         var files = $("#fileToUpload_1")[0].files[0];
//         var card_code = document.getElementById("cliente_reg").value;
//         var titulo = document.getElementById("titulo_reg").value;
//         var num = document.getElementById("num_reg").value;
//         var movi = $("#tipor").val();
//         var emp = $("#empresa").val();
//         var tipo = $("#tipo_crea_evi").val();
//         var comentario = $("#comentariosaut").val();

//         console.log(files);

//         // if (titulo === "") {
//         //     alertify.error("Falta titulo");
//         //     return false;
//         // }
//         if (files === undefined) {
//             alertify.error("no existe documento ");
//             return false;
//         }
//         else {
//             //var num_fix = $('#num_fix').val();
//             formData.append("file", files);

//             formData.append("card_code", card_code);
//             formData.append("titulo", titulo);
//             formData.append("num", num);
//             formData.append("movi", movi);
//             formData.append("emp", emp);
//             formData.append("comentario", comentario);
//             formData.append("tipo", tipo);


//             //formData.append('desc_arte', descrip_reg);
//             // alert(files);
//             //formData.append('num_fix', num_fix);

//             // $("#archivo_reg").val('');
//             //$("#titulo_reg").val('');
//             $.ajax({
//                 url: "registrar_pdf_despacho_alma.php",
//                 type: "post",
//                 data: formData,
//                 async: false,
//                 cache: false,
//                 contentType: false,
//                 processData: false,
//                 success: function (response) {
//                     //  alert(response);

//                     //    $.post("conviertepdf.php", {  },

//                     //  function(data){

//                     //
//                     //                      alert(data)
//                     //                });

//                     $("#archivo_reg").val("");
//                     $("#titulo_reg").val("");
//                     // listar_data_pdf(va)
//                     $("#modal_registrar_evi").modal("hide");

//                     listar_data_pdf_todos1(num, 'TD', emp, tipo)
//                 },
//             });
//             return false;
//         }
//     });
// });
$(document).ready(function () {
    $("form#data2").submit(function (event) {
        var formData = new FormData($(this)[0]);
        var files = $("#fileToUpload_OC2")[0].files[0];
        var card_code = '-';
        var titulo = document.getElementById("docentry_OC_subir").value;
        var num = document.getElementById("docentry_OC_subir").value;
        var movi = $("#tipor").val();
        var emp = $("#empresa_oc_evi").val();
        var tipo = 'W'
        var comentario = '-'

        console.log(files);

        // if (titulo === "") {
        //     alertify.error("Falta titulo");
        //     return false;
        // }
        if (files === undefined) {
            alertify.error("no existe documento ");
            return false;
        }
        else {
            //var num_fix = $('#num_fix').val();
            formData.append("file", files);

            formData.append("card_code", card_code);
            formData.append("titulo", titulo);
            formData.append("num", num);
            formData.append("movi", movi);
            formData.append("emp", emp);
            formData.append("comentario", comentario);
            formData.append("tipo", tipo);


            //formData.append('desc_arte', descrip_reg);
            // alert(files);
            //formData.append('num_fix', num_fix);

            // $("#archivo_reg").val('');
            //$("#titulo_reg").val('');
            $.ajax({
                url: "registrar_pdf_despacho_OC.php",
                type: "post",
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    //  alert(response);

                    //    $.post("conviertepdf.php", {  },

                    //  function(data){

                    //
                    //                      alert(data)
                    //                });

                    $("#archivo_reg").val("");
                    $("#titulo_reg").val("");
                    // listar_data_pdf(va)
                    $("#modal_registrar_evi").modal("hide");

                    listar_data_pdf_oc(num)
                },
            });
            return false;
        }
    });
});

function registrar_desicion() {
    var doc = $("#docentry_desp").val();
    var value = $("#value_desp").val();
    var comentario = $("#comentariosautri_1").val();
    var emp_ori = $("#emp_ori").val();
    var tipo_ori = $("#tipo_ori").val();

    console.log(doc);
    console.log(value);
    console.log(comentario);

    $.ajax({
        beforeSend: function () {
            swal_carga()
        },
        url: 'registrar_desicion_despacho.php',
        type: 'POST',
        data: { doc, value, comentario, emp_ori, tipo_ori },
        success: function (x) {
            $.ajax({
                beforeSend: function () { },
                url: "actualizar_estados_mostrados2.php",
                type: "POST",
                data:
                    "id_docentry=" +
                    doc +
                    "&estado=" +
                    value +
                    "&empresa=" +
                    emp_ori +
                    "&tipo=" +
                    tipo_ori,

                success: function () {


                    $("#modal_registrar_desicion").modal("hide");


                    swal("Se actualizo correctamente", {
                        icon: "success",
                        timer: 2000, // tiempo en milisegundos
                        buttons: false, // desactiva el botón para cerrar
                    });
                    setTimeout(function () {
                        swal.close(); // Cerrar el SweetAlert después del retraso
                        // window.location.reload();
                        $("#docentry_desp").val("");
                        $("#comentariosautorizacion").val("");
                        $("#emp_ori").val("");
                        $("#value").val("");
                        busca_Lista_programados()
                        busca_Lista_Despachos()
                        busca_listosDespachos()
                        $("#modal_detalle_venta").modal("hide");
                    }, 1500); // 1500 milisegundos = 1.5 segundos

                },
                error: function (jqXHR, estado, error) {
                    $("#errores").html("Error... " + estado + "  " + error);
                },
            });


        }

    });


}


$(document).on("click", "#btn_dist", function () {
    $(".chkCheckBoxId").prop("disabled", false);
    $(this).text("Distrito Registrado");

    // Cambiar la clase del botón (puedes agregar otras clases si deseas cambiar el estilo)
    $(this).removeClass("btn-info").addClass("btn-success");
    // $("#distri").prop("disabled", false).select2("enable", true);
    var nuevoBoton = $("<button>")
        .addClass("btn2 btn-success")  // Añade una clase para el nuevo botón
        .attr("id", "btn_dist_registered")  // Cambiar el id si es necesario
        .attr("onclick", "reg_distrito();")  // El mismo onclick
        .text("Registrar");  // Cambiar el texto del nuevo botón

    // Reemplazar el botón original con el nuevo
    $(this).replaceWith(nuevoBoton);
    $("#btn_asig").prop("disabled", true);
    $("#bton_recojo").prop("disabled", true);
    $("#bton_codebar2").prop("disabled", true);
    $("#btn_unlock").show();


})

$(document).on("click", "#bton_recojo", function () {


    // Deshabilitar otros botones
    // $("#btn_dist").prop("disabled", true);
    // $("#btn_asig").prop("disabled", true);
    // $("#bton_codebar").prop("disabled", true);

    // Reiniciar el peso total
    $("#pesoTotal").val("0.00");
});




$(document).on("click", "#btn_asig", function () {
    $(".chkCheckBoxId").prop("disabled", false);
    // $(this).text("Distrito Registrado");

    // Cambiar la clase del botón (puedes agregar otras clases si deseas cambiar el estilo)
    $(this).removeClass("btn-info").addClass("btn-success");
    // $("#distri").prop("disabled", false).select2("enable", true);
    var nuevoBoton = $("<button>")
        .addClass("btn2 btn-success")  // Añade una clase para el nuevo botón
        .attr("id", "asignar_recorrido")  // Cambiar el id si es necesario
        .attr("onclick", "asignar_ruta();")  // El mismo onclick
        .text("Asignar");  // Cambiar el texto del nuevo botón
    $("#btn_dist, #bton_recojo, #bton_codebar2").each(function () {
        $(this).addClass("disabled-button");
    });
    // Reemplazar el botón original con el nuevo
    $(this).replaceWith(nuevoBoton);
    $("#btn_dist").prop("disabled", true);
    $("#bton_recojo").prop("disabled", true);
    $("#bton_codebar2").prop("disabled", true);
    $("#pesoTotal").val("0.00");
    $("#btn_unlock").show();


})


function reg_distrito() {
    var checkedCount = $("#tabla_listoDespa #gen_peso:checked").length;

    console.log('entro');
    if (checkedCount === 0) {
        // Mostrar alerta de error si no hay ningún checkbox marcado
        alertify.error("Debe activar al menos un despacho.");
    } else {
        $("#tabla_listoDespa #gen_peso:checked").each(function () {
            var fila = $(this).closest('tr');
            var selectDistrito = fila.find('#distri');
            var docentry = fila.find("td").eq(1).html();
            var empresa = fila.find("td").eq(2).find("span").text();
            var tipo = fila.find("td").eq(14).html();
            var distrito = selectDistrito.val();  // Obtiene el valor seleccionado

            if (distrito) {
                // Si hay distrito seleccionado, llamamos la función para guardar el distrito
                guadar_distrito(distrito, docentry, empresa, tipo);
            } else {
                // Si no hay distrito seleccionado, se cambia el color del fondo del select a rojo
                selectDistrito.css('background-color', 'red');  // Cambia el color de fondo a rojo
                alertify.error('¡Por favor elija un distrito!');  // Muestra un mensaje con Alertify
            }
        });
    }
}

function desbloquear_campos_recojo() {
    // 🔓 Inputs normales
    $("#fecha_recojo").prop("disabled", false);
    $("#instru_recojo").prop("disabled", false);

    // 🔓 Select simples o con Select2
    var camposSelect = [
        '#empresa_recojo',
        '#provee',
        '#docnum_select',
        '#prio_sap',
        '#client'
    ];

    camposSelect.forEach(function (id) {
        var $campo = $(id);
        if ($campo.hasClass('select2-hidden-accessible')) {
            // 🟢 Si es Select2, habilitar también el control visual
            $campo.prop('disabled', false);
            $campo.data('select2').$container.removeClass('select2-container--disabled');
            $campo.data('select2').$selection.css('pointer-events', 'auto');
            $campo.trigger('change.select2');
        } else {
            // 🟢 Si es select normal
            $campo.prop('disabled', false);
        }
    });

    // 🔓 Mostrar el botón nuevamente
    $("#btn_recoj").show();
}




function modal_recojo_merc() {
    $('#modal_asig_recojo').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });
    $("#modal_asig_recojo").modal("show");
    desbloquear_campos_recojo();
    listar_provee_merclocal();
    listar_priorida_sap();
    listar_cliente_merclocal();
    // $("#fecha_recojo").val();
    $("#oc_recojo").val("");
    $("#instru_recojo").val("");
    $('#empresa_recojo').val('0').trigger('change');
    $('#docnum_select').val('0').trigger('change');
    $("#fecha_recojo").val("");
}

function mostrar_evidencia1(id, cliente, emp) {
    // Mostrar modal
    $('#modal_mostrar_evi').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });

    $("#modal_mostrar_evi").modal("show");

    setTimeout(function () {
        if ($("#bton_evidencia").length) {
            $("#bton_evidencia").hide();
            console.log("Botón encontrado y ocultado.");
        } else {
            console.log("Botón aún no encontrado.");
        }
    }, 100); // Ajusta el tiempo si es necesario

    document.getElementById("num_mos").value = id;
    document.getElementById("cliente_mos").value = cliente;
    document.getElementById("serie_num_field").value = id;
    listar_data_pdf_todos1(id, "TD", emp);
}
function mostrar_evidencia2(id, cliente, emp, nguia, tipo) {
    // Mostrar modal
    $('#modal_mostrar_evi').modal({
        backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
        keyboard: false     // Evita el cierre al presionar "Esc"
    });

    $("#modal_mostrar_evi").modal("show");

    setTimeout(function () {
        if ($("#bton_evidencia").length) {
            $("#bton_evidencia").hide();
            console.log("Botón encontrado y ocultado.");
        } else {
            console.log("Botón aún no encontrado.");
        }
    }, 100); // Ajusta el tiempo si es necesario

    document.getElementById("num_mos").value = id;
    document.getElementById("cliente_mos").value = cliente;
    document.getElementById("serie_num_field").value = nguia;
    listar_data_pdf_todos(id, "TD", emp, tipo);
}

function registrar_recojo_merc() {
    var fecha_recojo = $("#fecha_recojo").val();

    // Verificar el estado del proveedor (select o input)
    var proveedor = $("#prove_merc_local select").length > 0
        ? $("#prove_merc_local select").val()
        : "-"; // Si es input, se envía un guion como proveedor
    var proveedor_manual = $("#prove_merc_local select").length === 0
        ? $("#input_provee").val()
        : "-"; // Si es select, el campo manual estará vacío

    // Verificar el estado del cliente (select o input)
    var client = $("#client_merc_local select").length > 0
        ? $("#client_merc_local select").val()
        : "-"; // Si es input, se envía un guion como cliente
    var cliente_manual = $("#client_merc_local select").length === 0
        ? $("#input_client").val()
        : "-"; // Si es select, el campo manual estará vacío

    // var oc_recojo = $("#oc_recojo").val();
    var oc_recojo = $("#listado_docnum select").val();
    var prioridad_recojo = $("#priori_sap select").val();
    var instru_recojo = $("#instru_recojo").val();
    var empresa_recojo = $("#empresa_recojo").val();

    console.log("Proveedor (select):", proveedor);
    console.log("Proveedor Manual (input):", proveedor_manual);


    console.log("Cliente (select):", client);
    console.log("Cliente Manual (input):", cliente_manual);


    // Validaciones
    if (fecha_recojo === '') {
        alertify.error('Elija Fecha de Recojo');
        return;
    }
    if (empresa_recojo === '0') {
        alertify.error('Elija Empresa');
        return;
    }

    if (proveedor === '' || proveedor_manual === '') {
        alertify.error('Elija o Digite Proveedor');
        return;
    }

    if (client === '' || cliente_manual === '') {
        alertify.error('Elija o Digite Cliente');
        return;
    }

    if (oc_recojo === '') {
        alertify.error('Digite la Orden de Compra');
        return;
    }

    // Enviar datos por AJAX
    $.ajax({
        beforeSend: function () {
            swal_carga(); // Mostrar el loader de SweetAlert
        },
        url: 'insertar_recojo_merc.php',
        type: 'POST',
        data: {
            fecha_recojo,
            proveedor,
            proveedor_manual, // Enviar el valor manual si existe
            client,
            cliente_manual, // Enviar el cliente manual si existe
            oc_recojo,
            prioridad_recojo,
            instru_recojo,
            empresa_recojo
        },
        success: function (x) {
            setTimeout(function () {
                swal.close(); // Cerrar SweetAlert después de 1.5 segundos
                $("#modal_asig_recojo").modal("hide");
                busca_listosDespachos();

                // window.location.reload(); // Si necesitas recargar la página, descomenta esta línea
            }, 1500);
        }
    });
}

function listar_provee_merclocal() {
    $.ajax({
        beforeSend: function () {
        },
        url: 'pone_provee_merclocal.php',
        type: 'POST',
        data: {},
        success: function (x) {
            $("#prove_merc_local").html(x);
            $(".select2").select2();
            $('#provee').val('0').trigger('change');
        }
    });
}

$(document).on('change', '#provee', function () {
    var cardCode = $(this).val();

    if (cardCode !== '0') {
        $.ajax({
            url: 'traer_docnums_por_proveedor.php',
            type: 'POST',
            data: { cardCode },
            success: function (html) {
                $('#listado_docnum').html(html);
                $(".select2").select2();

                var selectedDoc = $('#docnum_select').val();
                if (selectedDoc) {
                    traerDatosPorDocnum(selectedDoc);
                }

                $('#oc_recojo').val('');
                $('#instru_recojo').val('');
            },
            error: function () {
                // $('#listado_docnum').html('<span style="color:red;">Error al cargar DocNum</span>');
            }
        });
    }
});

$(document).on('change', '#docnum_select', function () {
    var docnum = $(this).val();
    if (docnum) {
        traerDatosPorDocnum(docnum);
    } else {
        // $('#oc_recojo').val('');
        $('#instru_recojo').val('');
    }
});

function traerDatosPorDocnum(docnum) {
    $.ajax({
        url: 'traer_datos_por_docnum.php',
        type: 'POST',
        data: { docnum },
        success: function (response) {
            var data = JSON.parse(response);

            if (data && data.OC) {
                // $('#oc_recojo').val(data.OC || '');
                $('#instru_recojo').val(data.COMENTARIOS || '');
            } else {
                // $('#oc_recojo').val('');
                $('#instru_recojo').val('');
            }
        },
        error: function () {
            // alert('Error al obtener datos del documento.');
        }
    });
}


function listar_cliente_merclocal() {
    $.ajax({
        beforeSend: function () {
        },
        url: 'pone_cliente_merclocal.php',
        type: 'POST',
        data: {},
        success: function (x) {
            $("#client_merc_local").html(x);
            $(".select2").select2();
            $('#client').val('0').trigger('change');
        }

    });

}

function listar_priorida_sap() {
    $.ajax({
        beforeSend: function () {
        },
        url: 'pone_prioridad_sap.php',
        type: 'POST',
        data: {},
        success: function (x) {
            $("#priori_sap").html(x);
            $(".select2").select2()
        }

    });
}

$(document).on("change", "#prove_merc_local select", function () {
    let provee = $(this).val();

    if (provee === '-1') {
        // Reemplazar el select con un input text
        $("#prove_merc_local").html('<input type="text" id="input_provee" class="form-control" placeholder="Ingrese proveedor">');

        // Enfocar automáticamente el input text
        $("#input_provee").focus();
    }
});


$(document).on("change", "#client_merc_local select", function () {
    let provee = $(this).val();

    if (provee === '-1') {
        // Reemplazar el select con un input text
        $("#client_merc_local").html('<input type="text" id="input_client" class="form-control" placeholder="Ingrese Cliente">');

        // Enfocar automáticamente el input text
        $("#input_client").focus();
    }
});
// $(document).ready(function () {
//     console.log("Archivo JavaScript cargado!");

//     $(document).on("click", "#btn_unlock", function () {
//         alert("Botón Desbloquear presionado!");
//     });
// });

$(document).ready(function () {
    // Manejar el evento de clic en el botón "Desbloquear"
    $(document).on("click", "#btn_unlock", function () {
        console.log("Ejecutando acciones al desbloquear...");

        // Restaurar el botón "Asignar Recorrido" a su estado original
        var botonOriginalAsig = $("<button>")
            .addClass("btn2 btn-warning") // Clase original
            .attr("id", "btn_asig") // Id original
            .text("Prog. Despacho"); // Texto original
        $("#asignar_recorrido").replaceWith(botonOriginalAsig);

        // Restaurar el botón "Registrar Distrito" a su estado original
        var botonOriginalDist = $("<button>")
            .addClass("btn2 btn-info") // Clase original
            .attr("id", "btn_dist") // Id original
            .text("Registrar Distrito"); // Texto original
        $("#btn_dist_registered").replaceWith(botonOriginalDist);

        // Desbloquear los botones
        $("#btn_asig").prop("disabled", false);
        $("#btn_dist").prop("disabled", false);
        $("#bton_recojo").prop("disabled", false);
        $("#bton_codebar2").prop("disabled", false);

        // Deshabilitar los checkboxes
        $(".chkCheckBoxId").prop("checked", false).prop("disabled", true);

        // Ocultar el botón "Desbloquear"
        $(this).hide();

        console.log("Botones restaurados, desbloqueados, checkboxes bloqueados y botón oculto.");
    });

    // Manejar el evento de clic en el botón "Registrar Distrito"
    $(document).on("click", "#btn_dist", function () {
        console.log("Registrar Distrito clicado");
        $(this).text("Distrito Registrado").removeClass("btn-info").addClass("btn-success");

        // Crear un nuevo botón dinámico
        var nuevoBotonDist = $("<button>")
            .addClass("btn2 btn-success")
            .attr("id", "btn_dist_registered")
            .text("Registrar");

        // Reemplazar el botón original con el nuevo
        $(this).replaceWith(nuevoBotonDist);

        // Deshabilitar el botón "Asignar"
        $("#btn_asig").prop("disabled", true);
    });

    // Manejar el evento para revertir "Registrar Distrito"
    $(document).on("click", "#btn_dist_registered", function () {
        console.log("Revertir Registro Distrito");

        // Restaurar el botón original
        var botonOriginalDist = $("<button>")
            .addClass("btn2 btn-info") // Clase original
            .attr("id", "btn_dist") // Id original
            .text("Registrar Distrito"); // Texto original

        $(this).replaceWith(botonOriginalDist);

        // Rehabilitar el botón "Asignar"
        $("#btn_asig").prop("disabled", false);
    });

    // Manejar el evento de clic en el botón "Asignar"
    $(document).on("click", "#btn_asig", function () {
        console.log("Asignar clicado");

        // Crear un nuevo botón dinámico
        var nuevoBotonAsig = $("<button>")
            .addClass("btn2 btn-success")
            .attr("id", "asignar_recorrido")
            .text("Asignar");

        // Reemplazar el botón original con el nuevo
        $(this).replaceWith(nuevoBotonAsig);
    });
});
function correo_ped_rechazado(docentry) {
    var comentario = $("#comentariosautri_1").val();
    var guia = $("#serienum_modalevi").val();
    var emp = $("#empresa").val();


    console.log(docentry);
    $.ajax({
        url: "corre_ped_rechazado.php",
        type: "POST",
        data: {
            docentry: docentry,
            comentario: comentario,
            guia: guia,
            emp: emp
        },
        success: function (x) {
            //  alertify.success('Se envio Correo')
            console.log("go");
        },
        error: function (jqXHR, estado, error) {
            // Maneja los errores aquí
        },
    });
}

function obtener_det_recojo(docentry, empresa) {
    modal_recojo_merc();
    $("#btn_recoj").hide();
    $.ajax({
        beforeSend: function () {

        },
        url: "trae_datos_recojo.php",
        type: "POST",
        data: { docentry: docentry, empresa: empresa },
        success: function (x) {

            var data = x;
            var idcl = data.split("|");
            setTimeout(function () {
                $("#fecha_recojo").val(idcl[0]).prop("disabled", true);
                $('#empresa_recojo').val(idcl[1]).trigger('change').prop("disabled", true);
                $('#provee').val(idcl[2]).trigger('change').prop("disabled", true);
                $('#prio_sap').val(idcl[4]).trigger('change').prop("disabled", true);
                $('#client').val(idcl[5]).trigger('change').prop("disabled", true);
            }, 500);
            setTimeout(function () {
                $('#docnum_select').val(idcl[3]).trigger('change').prop("disabled", true);
                $("#instru_recojo").val(idcl[6]).prop("disabled", true);

            }, 1000);

        },
        error: function (jqXHR, estado, error) { },
    });
}



function guardaupdatea_comentario_evidesi() {
    var doc = $("#docentry").val();
    var emp = $("#empresa").val();
    var comentario = $("#comentariosautri_1").val();
    var tipo_creacio = $("#tipo_crea_evi").val();

    $.ajax({
        url: "actualizar_guarda_comenario_evidesi.php",
        type: "POST",
        data: {
            doc: doc,
            tipo_creacio: tipo_creacio,
            emp: emp,
            comentario: comentario
        },
        success: function (x) {
            //  alertify.success('Se envio Correo')
            console.log("go");
            $("#modal_desi_evi").modal('hide')
            $('#modal_desi_evi').on('hidden.bs.modal', function () {
                // Limpiar los campos
                $("#docentry").val('');
                $("#empresa").val('');
                $("#cardcode").val('');
                $("#cliente").val('');
                $("#tipo_crea_evi").val('');
                $("#serienum_modalevi").val('');
                $("#num_modalevi").val('');
                $(".nuticket2").html(''); // Limpiar contenido HTML de este elemento
                $("#cliente_modevi").val('');
                $("#guardar_actualizar_btn").hide();
            });
        },
        error: function (jqXHR, estado, error) {
            // Maneja los errores aquí
        },
    });

}

function listar_comentario_evidesi() {
    var doc = $("#docentry").val();
    var emp = $("#empresa").val();
    var tipo_creacio = $("#tipo_crea_evi").val();

    $.ajax({
        url: "listar_comenario_evidesi.php",
        // url: "listar_comenario_evidesi2.php",
        type: "POST",
        data: {
            doc: doc,
            tipo_creacio: tipo_creacio,
            emp: emp,
        },
        success: function (x) {
            comen = x.trim()
            $("#comentariosautri_1").val(comen);
            console.log(comen);

        },
        error: function (jqXHR, estado, error) {
            // Maneja los errores aquí
        },
    });
}

function listar_comentario_evidesi_onkey() {
    var comentario = $("#comentariosautri_1").val(); // Captura el valor del input
    var doc = $("#docentry").val();
    var emp = $("#empresa").val();
    var tipo_creacio = $("#tipo_crea_evi").val();

    if (comentario.trim() === "") {
        console.log("No hay comentario ingresado.");
        return; // Evita hacer la consulta si no hay comentario
    }

    $.ajax({
        url: "listar_comenario_evidesi_onakey.php",
        type: "POST",
        data: {
            doc: doc,
            tipo_creacio: tipo_creacio,
            emp: emp,
            comentario: comentario
        },
        success: function (response) {
            console.log("Respuesta recibida: ", response.trim());

            // Lógica para mostrar el botón y cambiar su texto
            if (response.trim() === "NO") {
                $("#guardar_actualizar_btn").text("Guardar Comentario"); // No encontró registros
                $("#guardar_actualizar_btn").show(); // Mostrar el botón
            } else if (response.trim() === "SI") {
                $("#guardar_actualizar_btn").text("Actualizar Comentario"); // Existe el comentario
                $("#guardar_actualizar_btn").show(); // Mostrar el botón
            } else {
                console.error("Respuesta inesperada: ", response.trim());
                $("#guardar_actualizar_btn").hide(); // Ocultar el botón si hay un error
            }
        },


        error: function (jqXHR, estado, error) {
            console.error("Error al consultar: ", error);
        },
    });
}

$(document).on("click", "#tabla_idr_eli tbody tr", function () {
    var clickedCheckbox = $(this).find("#gen_idr_eli"); // Checkbox dentro de la fila clickeada

    if (clickedCheckbox.is(":disabled")) {
        return; // Salir si el checkbox está deshabilitado
    }

    var idr = $(this).find("td:nth-child(2)").text().trim(); // Obtener el valor de la columna IDR

    var isChecked = !clickedCheckbox.is(":checked"); // Obtener el nuevo estado del checkbox
    clickedCheckbox.prop("checked", isChecked); // Actualizar el checkbox clickeado

    // Actualizar todas las filas con el mismo IDR
    $("#tabla_idr_eli tbody tr").each(function () {
        var currentIDR = $(this).find("td:nth-child(2)").text().trim(); // Obtener el IDR de la fila actual
        var checkbox = $(this).find("#gen_idr_eli");

        if (currentIDR === idr) { // Si el IDR coincide
            checkbox.prop("checked", isChecked); // Sincronizar estado de los checkboxes

            if (isChecked) {
                $(this).find("td").css("background-color", "LightGreen"); // Pintar de verde
                checkbox.prop("disabled", false); // Mantener habilitados
            } else {
                $(this).find("td").css("background-color", "white"); // Restaurar color
            }
        } else {
            // Si el IDR no coincide y el checkbox está marcado, deshabilitarlo
            if (isChecked) {
                checkbox.prop("disabled", true); // Deshabilitar otros checkboxes
                $(this).find("td").css("background-color", "#f5f5f5"); // Pintar de gris
            } else {
                checkbox.prop("disabled", false); // Rehabilitar checkboxes
                $(this).find("td").css("background-color", "white"); // Restaurar color
            }
        }
    });
});