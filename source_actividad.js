
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




function lista_accion() {
    //console.log('entro');
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#actividad").html("Cargando...");
            },
            url: "lista_actividad.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#actividad").html(x);
                $(".select2").select2();
                //console.log(x);
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}

function capturar_horaActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;

    $("#horaInicioHora").val(horaActual);
    $("#horaFinHora").val(horaActual);

}



function busca_cliente() {
    ruc = $("#clie").val();

    $(document).ready(function () {
        $("#modal_tabla_clientes").modal({
            show: true,
            backdrop: "static",
            keyboard: false,
        });

        $("#modal_tabla_clientes").on("shown.bs.modal", function () {
            $("#clie").focus();
        });



        $.ajax({
            beforeSend: function () {
                $("#lista_clientes").html("Cargando los clientes...");
            },
            url: "lista_clientes1.php",
            type: "POST",
            data: { ruc: ruc.toUpperCase() },
            success: function (x) {
                $("#lista_clientes").html(x);
                $("#tabla_clien").DataTable();
                //$('#clie').val('');
            },
            error: function (jqXHR, estado, error) {
                $("#lista_clientes").html("Hubo un error: " + estado + " " + error);
            },
        });
    });
}


$(document).on("dblclick", ".fila-cliente", function (e) {
    // Si el doble clic fue sobre un botón, salimos
    if ($(e.target).closest("button").length > 0) return;

    let elidcliente = $(this).data("idcliente");
    pone_cliente(elidcliente);
    //lista_direccion_condicion();
});


function listar_contacto(cardcode) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#dirigido_coti").html("Cargando ...");
            },
            url: "listar_contactos.php",
            type: "POST",
            data: { cardcode },
            success: function (x) {
                $("#dirigido_coti").html(x);
                $(".select2").select2();
                //console.log(x);


                setTimeout(() => {
                    dirigido_coti_antes = $("#dirigido_coti option:selected").val();
                    var idcl = dirigido_coti_antes.split("|");

                    if (dirigido_coti_antes === '|||') {
                        $("#dirigido_coti").hide();
                        $("#dirigido_coti_new").show();
                    } else {
                        $("#dirigido_coti").show();
                        $("#dirigido_coti_new").hide();
                    }

                    $("#correo_dirigido").val(idcl[2]);

                    telefono = idcl[1];

                    celular = idcl[3];

                    if (telefono === '') {
                        $("#telefono_dirigido").val(celular);
                    } else {
                        $("#telefono_dirigido").val(telefono);
                    }
                }, 100);
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function pone_cliente(elid) {
    // $("#secundarios").show();
    $("#btn-cancela").prop("disabled", false);
    var client = elid;
    var idcl = client.split("|");
    var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
    var carcud = idcl[0];
    //console.log(carcud);

    listar_contacto(carcud);



    $("#idcliente_credito").val(idcl[0]);
    $("#idcliente_razon").val(quitarAcentos(idcl[1]).replace(pattern, ""));
    $("#idcliente_ruc").val(idcl[2]);
    $("#idcliente_parent").val(idcl[3]);
    $("#tipocliente").val(idcl[4]);
    $("#codigocp").val(idcl[5]);

    //rend_linea = idcl[6]/10000
    // console.log(idcl[6])
    $("#lineacredito").val(parseFloat(idcl[6]).toFixed(2));
    $("#salpendiente").val(parseFloat(idcl[7]).toFixed(2));

    $("#lin_disponible").val(parseFloat(idcl[8]).toFixed(2));
    // $("#pone_vendedores").val(parseFloat(idcl[9]).toFixed(2));

    pone_cpago = idcl[5];
    $("#cpago").val(pone_cpago).prop("disabled", false).trigger("change.select2");


    pone_ven = idcl[9];

    if (idcl[0] === 'C99999999999') {
        $("#pone_ven").val(pone_ven).prop("disabled", false).select2();
    } else {
        $("#pone_ven").val(pone_ven).prop("disabled", true).select2();
    }



    // $('#pone_ven').val(pone_ven).trigger('change.select2');


    $("#modal_tabla_clientes").modal("hide");
    $("#tipo_de_venta").html(
        "<button class='btn btn-danger btn-xs' onclick='quita_cliente();'>Quitar</button> Cliente: " +
        idcl[1]
    );
    $("#btn_cre").attr("disabled", true);
    // document.getElementById("ccode_pdf").value = idcl[0];
    // document.getElementById("clie_pdf").value = idcl[1];
    $(".entrega").removeClass("disabledTab");
    $(".entrega").addClass("activeTab");
    $(".transporte").removeClass("disabledTab");
    $(".transporte").addClass("activeTab");
    $("#btn-add-product").attr("disabled", false);
    //window.alert(client);
    //lista_direccion_condicion();
    //desactivar_datos();
}


function reg_contacto(elid) {
    // $('#modal_registrar_contacto').modal('show');
    // limpiar_campos_contacto();

    var client = elid;
    var idcl = client.split("|");

    // $("#codigo_cardcode").val(idcl[0]);
    // $("#razon_social_contacto").val(idcl[1]);

    window.location.href = `form_contactos.php?val0=${encodeURIComponent(idcl[0])}&val1=${encodeURIComponent(idcl[1])}`;
}



function cliente_abrir() {
    window.location.href = "socio_negocio.php";
    // $("#modal_crear_cliente").modal("show");
    // lista_vendedores_clie();
    // lista_pais_clie();
    // lista_groupname();
    // lista_subgroupname();
}


function llamar_accion() {
    var valorSeleccionado = $('#lista_acc').val();
    $('#div_comentarios, #div_hora_inicio, #div_hora_fin, #div_duracion, #div_prioridad, #div_localidad, #div_calle, #div_ciudad, #div_sala, #div_estado_arriba, #div_estado, #div_pais, #div_repeticion, #div_recordatorio, #div_tiempo_recordatorio, #div_checkboxes, #div_btn_seguimiento').hide();

    if (valorSeleccionado === '1') {

        $('#div_comentarios').show();
        $('#div_hora_inicio').show();
        $('#div_hora_fin').show();
        $('#div_duracion').show();
        $('#div_prioridad').show();
        $('#div_localidad').show();
        $('#div_repeticion').show();
        $('#div_recordatorio').show();
        $('#div_tiempo_recordatorio').show();
        $('#div_checkboxes').show();
        $('#div_btn_seguimiento').show();

    } else if (valorSeleccionado === '2') {
        // Mostrar todo igual que en imagen (también dirección)
        $('#div_comentarios').show();
        $('#div_hora_inicio').show();
        $('#div_hora_fin').show();
        $('#div_duracion').show();
        $('#div_prioridad').show();
        $('#div_localidad').show();
        $('#div_repeticion').show();
        $('#div_recordatorio').show();
        $('#div_tiempo_recordatorio').show();
        $('#div_checkboxes').show();
        $('#div_btn_seguimiento').show();
        $('#div_calle').show();
        $('#div_ciudad').show();
        $('#div_sala').show();
        $('#div_estado').show();
        $('#div_pais').show();

    } else if (valorSeleccionado === '3') {
        $('#div_comentarios').show();
        $('#div_hora_inicio').show();
        $('#div_hora_fin').show();
        $('#div_duracion').show();
        $('#div_estado_arriba').show(); // estado es clave aquí
        $('#div_prioridad').show();
        $('#div_localidad').show();
        $('#div_repeticion').show();
        $('#div_recordatorio').show();
        $('#div_tiempo_recordatorio').show();
        $('#div_checkboxes').show();
        $('#div_btn_seguimiento').show();

    } else if (valorSeleccionado === '4') {
        $('#div_comentarios').show();
        $('#div_hora_inicio').show();
        $('#div_prioridad').show();
        $('#div_recordatorio').show();
        $('#div_tiempo_recordatorio').show();
        $('#div_checkboxes').show();
        $('#div_btn_seguimiento').show();

    } else if (valorSeleccionado === '5') {
        $('#div_comentarios').show();
        $('#div_hora_inicio').show();
        $('#div_hora_fin').show();
        $('#div_duracion').show();
        $('#div_prioridad').show();
        $('#div_localidad').show();
        $('#div_repeticion').show();
        $('#div_recordatorio').show();
        $('#div_tiempo_recordatorio').show();
        $('#div_checkboxes').show();
        $('#div_btn_seguimiento').show();

    } else if (valorSeleccionado === '6') {
        $('#div_comentarios').show();
        $('#div_hora_inicio').show();
        $('#div_hora_fin').show();
        $('#div_duracion').show();
        $('#div_prioridad').show();
        $('#div_localidad').show();
        $('#div_recordatorio').show();
        $('#div_tiempo_recordatorio').show();
        $('#div_checkboxes').show();
        $('#div_btn_seguimiento').show();

    }

    capturar_horaActual()
}




$("#duracion").on("keypress", function (e) {
    if (e.which === 13) { // Tecla Enter
        e.preventDefault();

        // Obtener duración en minutos
        const duracionMin = parseInt($(this).val());
        if (isNaN(duracionMin)) return;

        // Obtener hora de inicio
        const horaInicioStr = $("#horaInicioHora").val();
        const [horas, minutos] = horaInicioStr.split(":").map(Number);

        // Crear objeto Date con hora de inicio
        const ahora = new Date();
        ahora.setHours(horas);
        ahora.setMinutes(minutos);

        // Sumar duración
        ahora.setMinutes(ahora.getMinutes() + duracionMin);

        // Formatear nueva hora
        const horasFin = ahora.getHours().toString().padStart(2, '0');
        const minutosFin = ahora.getMinutes().toString().padStart(2, '0');
        const horaFinal = `${horasFin}:${minutosFin}`;

        // Asignar a campo de horaFin
        $("#horaFinHora").val(horaFinal);
    }
});


function limpiarFormularioActividad() {
    $("#actividad").val('');
    $("#tipo").val('');
    $("#asunto").val('');
    $("#numero").val('');

    $("#idcliente_credito").val('');
    $("#idcliente_razon").val('');
    $("#asignado_a").val('');
    $("#consultor").val('');
    $("#personal").prop("checked", false);

    $("#telefono").val('');
    $("#comentarios").val('');

    $("#horaInicioFecha").val('');
    $("#horaInicioHora").val('');
    $("#horaFinFecha").val('');
    $("#horaFinHora").val('');
    $("#duracion").val('');

    $("#estado_arriba").val('');
    $("#prioridad").val('');
    $("#localidad").val('');

    $("#calle").val('');
    $("#ciudad").val('');
    $("#sala").val('');
    $("#estado").val('');
    $("#pais").val('');

    $("#repeticion").val('');
    $("#recordatorio").prop("checked", false);
    $("#tiempoRecordatorio").val('');

    $("#chk_posible").prop("checked", false);
    $("#chk_inactivo").prop("checked", false);
    $("#chk_cerrado").prop("checked", false);

    $("#id_contenido").val('');
    $("#enlazarDocumento").prop("checked", false);
    $("#claseDocumento").val('');
    $("#tipoObjetoOrigen").val('');
    $("#numeroDocumento").val('');
    $("#numeroObjetoOrigen").val('');
    $("#visualizarRelacionadosSN").prop("checked", false);
    $("#actividadPrevia").val('');
}






function procesa_actividad() {
    let actividadData = {
        actividad: $("#actividad").val(),
        tipo: $("#tipo").val(),
        asunto: $("#asunto").val(),
        numero: $("#numero").val(),

        cliente_id: $("#idcliente_credito").val(),
        cliente_nombre: $("#idcliente_razon").val(),
        asignado_a: $("#asignado_a").val(),
        consultor: $("#consultor").val(),
        personal: $("#personal").is(":checked"),

        telefono: $("#telefono").val(),
        comentarios: quitarAcentos($("#comentarios").val()),

        hora_inicio_fecha: $("#horaInicioFecha").val(),
        hora_inicio_hora: $("#horaInicioHora").val(),
        hora_fin_fecha: $("#horaFinFecha").val(),
        hora_fin_hora: $("#horaFinHora").val(),
        duracion: $("#duracion").val(),

        estado: $("#estado_arriba").val(),
        prioridad: $("#prioridad").val(),
        localidad: $("#localidad").val(),

        calle: $("#calle").val(),
        ciudad: $("#ciudad").val(),
        sala: $("#sala").val(),
        estado2: $("#estado").val(), // hay dos campos con id "estado"
        pais: $("#pais").val(),

        repeticion: $("#repeticion").val(),
        recordatorio: $("#recordatorio").is(":checked"),
        tiempo_recordatorio: $("#tiempoRecordatorio").val(),

        chk_posible: $("#chk_posible").is(":checked"),
        chk_inactivo: $("#chk_inactivo").is(":checked"),
        chk_cerrado: $("#chk_cerrado").is(":checked"),

        contenido: $("#id_contenido").val(),
        enlazar_documento: $("#enlazarDocumento").is(":checked"),
        clase_documento: $("#claseDocumento").val(),
        tipo_objeto_origen: $("#tipoObjetoOrigen").val(),
        numero_documento: $("#numeroDocumento").val(),
        numero_objeto_origen: $("#numeroObjetoOrigen").val(),
        visualizar_relacionados_sn: $("#visualizarRelacionadosSN").is(":checked"),
        actividad_previa: $("#actividadPrevia").val()
    };

    $.ajax({
        beforeSend: function () {
            Swal.fire({
                title: "Guardando actividad...",
                html: '<div class="spinner"></div>',
                allowOutsideClick: false,
                showConfirmButton: false
            });
        },
        url: "server_guardar_actividad.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(actividadData),
        success: function (response) {
            console.log("Respuesta recibida:", response);
            try {
                let res = typeof response === "string" ? JSON.parse(response) : response;
                Swal.close();

                if (res.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Actividad registrada",
                        text: `La actividad se guardó correctamente.`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    limpiarFormularioActividad();

                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.message || "Ocurrió un error desconocido"
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
                text: "Hubo un problema al comunicarse con el servidor.",
                confirmButtonText: "Cerrar"
            });
            console.error("Error AJAX:", estado, error);
        }
    });
}
