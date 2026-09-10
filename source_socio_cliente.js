function lista_pais_clie() {
    $.ajax({
        beforeSend: function () {
            $("#pone_pais_cli").html("Recuperando proveedores...");
        },
        url: "pone_pais_cotizacion.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#pone_pais_cli").html(x);

            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_pais_clie_modal() {
    $.ajax({
        beforeSend: function () {
            $("#pone_pais_cli_modal").html("Recuperando proveedores...");
        },
        url: "pone_pais_cotizacion.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#pone_pais_cli_modal").html(x);

            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}



function lista_vendedores_clie() {
    $.ajax({
        beforeSend: function () {
            $("#pone_vendedores_cli").html("Recuperando proveedores...");
        },
        url: "pone_vendedores_cotizacion.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#pone_vendedores_cli").html(x);
            //console.log(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_groupname() {
    $.ajax({
        beforeSend: function () {
            $("#pone_groupname").html("Recuperando grupos...");
        },
        url: "lista_groupname.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#pone_groupname").html(x);
            //console.log(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_subgroupname() {
    $.ajax({
        beforeSend: function () {
            $("#pone_subgroupname").html("Recuperando subgrupos...");
        },
        url: "lista_subgroupname.php",
        type: "POST",
        data: {
            cod: $("#pone_groupname select").val(),
        },
        success: function (x) {
            $("#pone_subgroupname").html(x);
            //console.log(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}

function valida_cliente(id, desicion, mensaje) {
    if (desicion == false) {
        $("#" + id).css("border-color", "red");
        $("#" + id).css("color", "red");
        $("#" + id + "-error")
            .text(mensaje)
            .css("color", "red");
        $('label[for="' + id + '"]').css("color", "red");
        $("#" + id + "-icon")
            .removeClass("fa-check")
            .addClass("fa-times")
            .css("color", "red");
    } else {
        $("#" + id).css("border-color", "green");
        $("#" + id).css("color", "green");
        $("#" + id + "-error")
            .text("")
            .css("color", "none");
        $('label[for="' + id + '"]').css("color", "green");
        $("#" + id + "-icon")
            .removeClass("fa-times")
            .addClass("fa-check")
            .css("color", "green");
    }
}


function toggleButton(button) {
    const buttons = document.querySelectorAll(".btn-toggle");

    // Desactivar todos los botones
    buttons.forEach((btn) => {
        if (btn !== button) {
            btn.classList.remove("btn-toggle-on");
            btn.classList.add("btn-toggle-off");
            btn.textContent = "NO";
        }
    });

    // Cambiar estado y texto del botón seleccionado
    button.classList.toggle("btn-toggle-on");
    button.classList.toggle("btn-toggle-off");

    if (button.classList.contains("btn-toggle-on")) {
        button.textContent = "SI";
    } else {
        button.textContent = "NO";
    }
}


function obtenerCodigoUbigeo(data, nombre) {
    const departamento = data.find(
        (item) => item.nombre_ubigeo.toLowerCase() === nombre.toLowerCase()
    );
    return departamento
        ? {
            id_ubigeo: departamento.id_ubigeo,
            codigo_ubigeo: departamento.codigo_ubigeo,
        }
        : null;
}

function obtenerDatosJson(callback, json) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(data);
            } else {
                console.error("Error al cargar el archivo JSON");
                callback(null);
            }
        }
    };
    xhr.open("GET", json, true);
    xhr.send();
}


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

function obtenerDatosJson2(callback, json) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(data);
            } else {
                console.error("Error al cargar el archivo JSON");
                callback(null);
            }
        }
    };
    xhr.open("GET", json, true);
    xhr.send();
}


function obtenerDatosJson3(callback, json) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(data);
            } else {
                console.error("Error al cargar el archivo JSON");
                callback(null);
            }
        }
    };
    xhr.open("GET", json, true);
    xhr.send();
}


function buscarPorIdYNombre(id, nombre, datos) {
    // Verifica si el ID existe en los datos
    if (datos[id]) {
        // Busca el objeto con el nombre proporcionado
        const resultado = datos[id].find(
            (item) => item.nombre_ubigeo.toLowerCase() === nombre.toLowerCase()
        );

        if (resultado) {
            return resultado;
        } else {
            console.log(
                `No se encontró un objeto con nombre_ubigeo igual a ${nombre} para el ID ${id}`
            );
            return null;
        }
    } else {
        console.log(`No se encontraron datos para el ID ${id}`);
        return null;
    }
}

function consultar_ruc() {

    ruc = $("#ruc_cliente").val();

    bandera = true;

    if (ruc.length === 11) {
        bandera = true;
        valida_cliente('ruc_cliente', true, 'Ruc válido.')
    } else {
        bandera = false;
        valida_cliente('ruc_cliente', false, 'Por favor, ingresa un Ruc válido.')
    }
    if (bandera === true) {
        $.ajax({
            beforeSend: function () {
                Swal.fire({
                    title: "Consultando SUNAT...",
                    html: '<div class="spinner"></div>',
                    allowOutsideClick: false, // Evita que el usuario cierre la alerta
                    showConfirmButton: false//, // No muestra botón de confirmación
                    // time: 4500
                });
            },
            url: "consulta_ruc_sunat_api.php",
            type: "POST",
            dataType: "json",
            data: { ruc: ruc },
            success: function (data2) {
                console.log(data2);
                valido = data2.success;
                razon = data2.razon_social; // ✅ Accede al dato directamente
                direccion = data2.direccion; // ✅ Corrige el acceso a la dirección

                var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
                //console.log(data2.result.establecimientos);
                //console.log(data2.result.establecimientos.length);

                if (valido == "false") {
                    alertify.error("error ruc no existe");
                } else {
                    // $("#rz_cliente").val(razon.replace(pattern, ''));
                    setTimeout(() => {
                        Swal.close();
                        $("#rz_cliente").val(razon);

                        var firstTwoDigits = ruc.toString().substring(0, 2);
                        if (firstTwoDigits === '10') {
                            // $("#rp_cliente").val(razon.replace(pattern, ''));
                            $("#razonSocial").val(razon);
                            $("#tipo_contribuyente").val('01').trigger("change");
                            $("#pone_pais_cli select").val('PE').trigger("change");
                        }
                        if (firstTwoDigits === '20') {
                            $("#tipo_contribuyente").val('02').trigger("change");
                            $("#direccion_cliente").val(direccion).prop('disabled', true);
                            $("#pone_pais_cli select").val('PE').trigger("change");
                            const jsonFileName = 'departamento.json';
                            const jsonFileName2 = 'provincia.json';
                            const jsonFileName3 = 'distritos.json';

                            obtenerDatosJson(function (data) {
                                if (data) {
                                    console.log("Respuesta completa:", data2); // 🔍 Verifica la estructura de data2

                                    const nombreABuscar = data2.departamento;
                                    const infoUbigeo = obtenerCodigoUbigeo(data, nombreABuscar);

                                    if (infoUbigeo) {
                                        //console.log(`ID Ubigeo para ${nombreABuscar}: ${infoUbigeo.id_ubigeo}`);
                                        //console.log(`Código Ubigeo para ${nombreABuscar}: ${infoUbigeo.codigo_ubigeo}`);

                                        setTimeout(() => {
                                            $("#pone_dpto_cli select").val(infoUbigeo.codigo_ubigeo).trigger("change");
                                            obtenerDatosJson2(function (data) {
                                                const idBuscado = infoUbigeo.id_ubigeo;
                                                const nombreBuscado = data2.provincia;
                                                if (data) {
                                                    const resultadoBusqueda = buscarPorIdYNombre(idBuscado, nombreBuscado, data);

                                                    if (resultadoBusqueda) {
                                                        data_ubig = infoUbigeo.codigo_ubigeo + resultadoBusqueda.codigo_ubigeo;
                                                        setTimeout(() => {
                                                            $("#pone_prov_cli select").val(data_ubig).trigger("change");
                                                            obtenerDatosJson3(function (data) {
                                                                const idBuscado2 = resultadoBusqueda.id_ubigeo;
                                                                const nombreBuscado2 = data2.distrito;
                                                                if (data) {
                                                                    const resultadoBusqueda2 = buscarPorIdYNombre(idBuscado2, nombreBuscado2, data);

                                                                    if (resultadoBusqueda2) {
                                                                        data_ubig2 = infoUbigeo.codigo_ubigeo + resultadoBusqueda.codigo_ubigeo + resultadoBusqueda2.codigo_ubigeo;
                                                                        setTimeout(() => {
                                                                            $("#pone_dist_cli select").val(data_ubig2).trigger("change");
                                                                        }, 1000);

                                                                        //console.log(`Resultado de la búsqueda para ID ${data_ubig2} y nombre ${nombreBuscado}:`, resultadoBusqueda2);
                                                                    } else {
                                                                        console.log("No se encontraron resultados para la búsqueda.");
                                                                    }
                                                                }
                                                            }, jsonFileName3);
                                                        }, 1000);

                                                        //console.log(`Resultado de la búsqueda para ID ${data_ubig} y nombre ${nombreBuscado}:`, resultadoBusqueda);

                                                    } else {
                                                        console.log("No se encontraron resultados para la búsqueda.");
                                                    }
                                                }
                                            }, jsonFileName2);
                                        }, 1000);
                                    } else {

                                    }
                                }
                            }, jsonFileName);

                        }
                        $('.Establecimientos_sunat').removeClass('disabledTab');
                        $('.Establecimientos_sunat').addClass('activeTab');

                        $("#tabla_establecimientos_sunat  > tbody > tr ").remove();
                        $('#agente_ret').val('Y').trigger("change");
                        $('#agente_per').val('NO').trigger("change");
                        $('#estado_ruc').val('02').trigger("change");
                        $('#condicion_ruc').val('02').trigger("change");
                        $('#buen_cont_ruc').val('NO').trigger("change");

                        // for (var i = 0; i < data2.localesAnexos.length; i++) {
                        //   var tr = `<tr>
                        //     <td  class='center'>`+ data2.localesAnexos[i].codigo + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].cod_tipo + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].tipo + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].direccion + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].departamento + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].provincia + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].distrito + `</td>
                        //     <td  class='center'>`+ data2.localesAnexos[i].activida_economica + `</td>
                        //     <td class='center'>
                        //     <button id='defaulttt' class="btn-toggle btn-toggle-off" type="button" onclick="toggleButton(this)">NO</button>
                        //   </td>
                        //   </tr>`;
                        //   $("#tabla_establecimientos_sunat").append(tr)
                        // }
                        for (var i = 0; i < data2.locales_anexos.length; i++) {
                            var tr = `<tr>
                <td  class='center'>`+ i + `</td>
                <td  class='center'>`+ "-" + `</td>
                <td  class='center'>`+ "-" + `</td>
                <td  class='center'>`+ data2.locales_anexos[i].direccion + `</td>
                <td  class='center'>`+ data2.locales_anexos[i].departamento + `</td>
                <td  class='center'>`+ data2.locales_anexos[i].provincia + `</td>
                <td  class='center'>`+ data2.locales_anexos[i].distrito + `</td>
                <td  class='center'>`+ "-" + `</td>
                <td style='display: none;' class='center'>`+ data2.locales_anexos[i].ubigeo + `</td>
                <td class='center'>
                <button id='defaulttt' class="btn-toggle btn-toggle-off" type="button" onclick="toggleButton(this)">NO</button>
              </td>
              </tr>`;
                            $("#tabla_establecimientos_sunat").append(tr)
                        }


                        // ✅ Agente de Retención
                        if (data2.es_agente_retencion === true) {
                            $('#agente_ret').val('Y').trigger("change");
                        } else {
                            $('#agente_ret').val('N').trigger("change");
                        }

                        // ✅ Buen Contribuyente
                        if (data2.es_buen_contribuyente === true) {
                            $('#buen_cont_ruc').val('SI').trigger("change");
                        } else {
                            $('#buen_cont_ruc').val('NO').trigger("change");
                        }

                        // ✅ Estado y Condición
                        if (data2.estado && data2.estado.toUpperCase() === "ACTIVO") {
                            $('#estado_ruc').val('01').trigger("change");
                        } else {
                            $('#estado_ruc').val('02').trigger("change"); // Si no es ACTIVO, asigna otro valor
                        }

                        if (data2.condicion && data2.condicion.toUpperCase() === "HABIDO") {
                            $('#condicion_ruc').val('01').trigger("change");
                        } else {
                            $('#condicion_ruc').val('02').trigger("change"); // Si no es HABIDO, asigna otro valor
                        }

                    }, 1600);
                }
            },
            error: function (jqXHR, estado, error) { },
        });
    }

}


$(document).on("change", "#pone_pais_cli select", function () {
    var id = this.value;
    if (id === "PE") {
        $.ajax({
            beforeSend: function () {
                $("#pone_dpto_cli").html("Recuperando proveedores...");
            },
            url: "pone_departamento_cotizacion.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#pone_dpto_cli").html(x);

                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) { },
        });
        $("#pone_dpto_cli").removeClass("disabledTab");
        $("#pone_dpto_cli").addClass("activeTab");
        $("#pone_prov_cli").removeClass("disabledTab");
        $("#pone_prov_cli").addClass("activeTab");
        $("#pone_dist_cli").removeClass("disabledTab");
        $("#pone_dist_cli").addClass("activeTab");
        $("#dpto_cliente").removeClass("activeTab");
        $("#dpto_cliente").addClass("disabledTab");
        $("#prov_cliente").removeClass("activeTab");
        $("#prov_cliente").addClass("disabledTab");
        $("#dist_cliente").removeClass("activeTab");
        $("#dist_cliente").addClass("disabledTab");
    } else {
        $("#pone_dpto_cli").removeClass("activeTab");
        $("#pone_dpto_cli").addClass("disabledTab");
        $("#dpto_cliente").removeClass("activeTab");
        $("#dpto_cliente").addClass("disabledTab");
        $("#prov_cliente").removeClass("activeTab");
        $("#prov_cliente").addClass("disabledTab");
        $("#dist_cliente").removeClass("activeTab");
        $("#dist_cliente").addClass("disabledTab");
    }
});

$(document).on("change", "#pone_dpto_cli select", function () {
    var id = this.value;
    $.ajax({
        beforeSend: function () {
            $("#pone_prov_cli").html("Recuperando proveedores...");
        },
        url: "pone_provincia_cotizacion.php",
        type: "POST",
        data: { id: id },
        success: function (x) {
            $("#pone_prov_cli").html(x);

            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
});

$(document).on("change", "#pone_prov_cli select", function () {
    var id = this.value;
    $.ajax({
        beforeSend: function () {
            $("#pone_dist_cli").html("Recuperando proveedores...");
        },
        url: "pone_distrito_cotizacion.php",
        type: "POST",
        data: { id: id },
        success: function (x) {
            $("#pone_dist_cli").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
});


function procesa_socio_negocio_web() {
    $(document).ready(function () {

        let errores = []; // Lista de errores
        let camposIncompletos = []; // Para resaltar los campos en rojo

        let ruc_cliente = $("#ruc_cliente").val();
        let lista_grop = $("#lista_grop").val();
        let lista_subgrop = $("#lista_subgrop").val();

        // Verificar si la tabla tiene filas en <tbody>
        // let tablaVacia = $("#tabla_establecimientos_sunat > tbody > tr").length === 0;

        // Resetear estilos antes de validar
        $(".error-input").removeClass("error-input");
        $(".error-box").removeClass("error-box");

        // Validaciones individuales
        if (!ruc_cliente || ruc_cliente === '') {
            errores.push("Falta colocar el RUC.");
            camposIncompletos.push("#ruc_cliente");
        }

        if (!lista_grop || lista_grop === '') {
            errores.push("Falta seleccionar el Grupo.");
            camposIncompletos.push("#pone_groupname");
        }

        if (!lista_subgrop || lista_subgrop === '') {
            errores.push("Falta seleccionar el SubGrupo.");
            camposIncompletos.push("#pone_subgroupname");
        }

        // if (tablaVacia) {
        //   errores.push("La tabla de Estblecimientos esta vacio.");
        //   $("#tabla_establecimientos_sunat").closest(".box.box-primary").addClass("error-box");
        // }

        // Si hay errores, mostrar SweetAlert y resaltar los campos
        if (errores.length > 0) {
            // Pintar los campos vacíos de rojo
            camposIncompletos.forEach(selector => {
                $(selector).addClass("error-input");
            });

            // Mostrar alerta con todos los errores a la vez
            Swal.fire({
                title: "¡Campos incompletos!",
                html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
                icon: "error",
                timer: 3000, // Se cierra automáticamente en 3 segundos
                showConfirmButton: false,
                toast: false,
                position: "center"
            });

            return false; // Evitar que continúe la acción
        }

        let band = true;

        ejecutarSocioNegocio(band);
    });
}

function ejecutarSocioNegocio(band) {

    if (!band) return; // Si 'band' es falso, no hace nada

    let rucCliente = $("#ruc_cliente").val();
    let cardcode = "C" + rucCliente;

    let agenteRetencion = rucCliente.startsWith("10")
    ? "N"
    : $("#agente_ret").val();


    // Luego usarla dentro del objeto
    let socioWebData = {
        cardcode: cardcode,
        ruc_cliente: rucCliente,
        razon_social: $("#rz_cliente").val(),
        tipo_contribuyente: $("#tipo_contribuyente").val(),
        nombre_cliente: quitarAcentos($("#nombre_cliente").val()),
        priapellido_cliente: quitarAcentos($("#priapellido_cliente").val()),
        segapellido_cliente: quitarAcentos($("#segapellido_cliente").val()),
        pone_vendedores_cli: $("#pone_vendedores_cli select").val(),
        rp_cliente: quitarAcentos($("#rp_cliente").val()),
        tel_cliente: $("#tel_cliente").val(),
        cel_cliente: $("#cel_cliente").val(),
        email_cliente: quitarAcentos($("#email_cliente").val()),
        pone_pais_cli: $("#pone_pais_cli select").val(),
        pone_dpto_cli: $("#pone_dpto_cli select").val(),
        pone_prov_cli: $("#pone_prov_cli select").val(),
        pone_dist_cli: $("#pone_dist_cli select").val(),
        dptoText : $("#pone_dpto_cli select option:selected").text().trim(),
        pone_prov_cli_text : $("#pone_prov_cli select option:selected").text().trim(),
        pone_dist_cli_text : $("#pone_dist_cli select option:selected").text().trim(),
        direccion_cliente: quitarAcentos($("#direccion_cliente").val()),
        // agente_ret: $("#agente_ret").val(),
        agente_ret: agenteRetencion,
        agente_per: $("#agente_per").val(),
        estado_ruc: $("#estado_ruc").val(),
        condicion_ruc: $("#condicion_ruc").val(),
        buen_cont_ruc: $("#buen_cont_ruc").val(),
        lista_grop: $("#lista_grop").val(),
        lista_subgrop: $("#lista_subgrop").val(),
        establecimientos: [], // Aquí se almacenarán los establecimientos de la tabla
        BPAddresses: [] // Aquí se agregarán las direcciones de la tabla
    };

    // **Recorrer las filas de la tabla para agregar direcciones al JSON**
    $("#tabla_establecimientos_sunat > tbody > tr").each(function () {

        let direccion = $(this).find("td").eq(3).html();
        // let departamento = $(this).find("td").eq(4).html();
        let provincia_u = $(this).find("td").eq(5).html().trim();
        let distrito_u = $(this).find("td").eq(6).html().trim();
        // let ubigeo = $(this).find("td").eq(8).html();
        let ubigeo = $(this).find("td").eq(8).html().trim();
        let departamento = ubigeo.substring(0, 2);

        let provincia_clean = provincia_u;
        if (provincia_u.toUpperCase() === "PROV. CONST. DEL CALLAO") {
            provincia_clean = "PROV. DEL CALLAO";
        }

        let provincia = provincia_clean.substring(0, 23);
        let distrito = distrito_u.substring(0, 20);

        // Agregar cada dirección al arreglo BPAddresses
        socioWebData.BPAddresses.push({
            AddressName: direccion,     // Nombre de la dirección
            Street: direccion,          // Dirección
            ZipCode: ubigeo,         // Provincia
            distrito: distrito,         // Provincia
            // Block: departamento,     // Departamento
            // City: provincia,         // Provincia
            provincia: provincia,        // Distrito
            departamento: departamento        // Distrito
        });

        // También puedes agregar los establecimientos si es necesario
        let codigo = parseInt($(this).find("td").eq(0).html());
        let codtype = parseInt($(this).find("td").eq(1).html());
        let tipo = parseInt($(this).find("td").eq(2).html());
        let avtividad_eco = parseInt($(this).find("td").eq(7).html());

        // Agregar los establecimientos al array de items
        socioWebData.establecimientos.push({
            codigo: codigo,
            codtype: codtype,
            tipo: tipo,
            direccion: direccion,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito,
            actividad_eco: avtividad_eco
        });

    });


    console.log("Socio de Negocio Generado: ", socioWebData);

    $.ajax({
        beforeSend: function () {
            // Mostrar el loader antes de enviar la solicitud
            Swal.fire({
                title: "Migrando Socio de Negocio a SAP...",
                html: '<div class="spinner"></div>',
                allowOutsideClick: false, // Evita que el usuario cierre la alerta
                showConfirmButton: false // No muestra botón de confirmación
            });
        },
        url: "server_layer_crear_socio_cliente.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(socioWebData),
        success: function (response) {

            console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?
            try {
                let res = typeof response === "string" ? JSON.parse(response) : response;

                Swal.close();

                if (res.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Socio de Negocio registrado",
                        text: `Se ha insertado el socio de negocio con éxito.`,
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        // Recargar la página después de que se cierre el mensaje de éxito
                        location.reload();
                    });


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



function lista_clients() {
    //console.log('entro');
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_clients").html("Recuperando Lista ...");
            },
            url: "lista_clients_nego.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_clients").html(x);
                $(".select2").select2();

                setTimeout(() => {
                    lista_cotizacion()
                }, 100);
                //console.log(x);
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}



function lista_cotizacion() {

    cardcode = $("#lista_clients11").val();

    //   fec_ini = $("#fec_ini").val();
    //   if (fec_ini === "") {
    //     fec_ini = '2024-01-01';
    //   } else {
    //     fec_ini = $("#fec_ini").val();
    //   }
    //   fec_fin = $("#fec_fin").val();
    setTimeout(() => {
        $.ajax({
            beforeSend: function () {

            },
            url: "listado_socio_negocio.php",
            type: "POST",
            data: { cardcode: cardcode },
            success: function (x) {

                // Retrasar el cierre del Swal 1.5 segundos
                setTimeout(() => {
                    swal.close();
                    $("#lista_cotizacion").html(x);
                    $("#tabla_cot_1").DataTable({
                        pageLength: -1,
                        lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
                        ordering: false, // ❌ Deshabilita la opción de ordenar columnas
                        language: {
                            paginate: {
                                first: "Primero",
                                last: "Último",
                                next: "Siguiente",
                                previous: "Anterior",
                            },
                            Show: "Mostrar",
                            search: "Buscar:",
                            sLengthMenu: "Mostrar _MENU_ registros",
                            sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                        },
                    });



                }, 1500); // Retraso de 1.5 segundos
            },
            error: function (jqXHR, estado, error) { },
        });
    }, 1000);

}





$(document).on("change", "#pone_pais_cli_modal select", function () {
    var id = this.value;
    if (id === "PE") {
        $.ajax({
            beforeSend: function () {
                $("#pone_dpto_cli_modal").html("Recuperando proveedores...");
            },
            url: "pone_departamento_cotizacion.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#pone_dpto_cli_modal").html(x);

                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) { },
        });
        $("#pone_dpto_cli_modal").removeClass("disabledTab");
        $("#pone_dpto_cli_modal").addClass("activeTab");
        $("#pone_prov_cli_modal").removeClass("disabledTab");
        $("#pone_prov_cli_modal").addClass("activeTab");
        $("#pone_dist_cli_modal").removeClass("disabledTab");
        $("#pone_dist_cli_modal").addClass("activeTab");
        $("#dpto_cliente_modal").removeClass("activeTab");
        $("#dpto_cliente_modal").addClass("disabledTab");
        $("#prov_cliente_modal").removeClass("activeTab");
        $("#prov_cliente_modal").addClass("disabledTab");
        $("#dist_cliente_modal").removeClass("activeTab");
        $("#dist_cliente_modal").addClass("disabledTab");
    } else {
        $("#pone_dpto_cli_modal").removeClass("activeTab");
        $("#pone_dpto_cli_modal").addClass("disabledTab");
        $("#dpto_cliente_modal").removeClass("activeTab");
        $("#dpto_cliente_modal").addClass("disabledTab");
        $("#prov_cliente_modal").removeClass("activeTab");
        $("#prov_cliente_modal").addClass("disabledTab");
        $("#dist_cliente_modal").removeClass("activeTab");
        $("#dist_cliente_modal").addClass("disabledTab");
    }
});


function lista_direccion(id) {
    //console.log("dsfvi")
    $.ajax({
        beforeSend: function () {
            $("#tabla_direccion").html("Cargando ...");
        },
        url: "pone_direcciones.php",
        type: "POST",
        data: { id: id },
        success: function (x) {
            $("#tabla_direccion").html(x);

        },
        error: function (jqXHR, estado, error) { },
    });
}



$(document).on("change", "#pone_dpto_cli_modal select", function () {
    var id = this.value;
    $.ajax({
        beforeSend: function () {
            $("#pone_prov_cli_modal").html("Recuperando proveedores...");
        },
        url: "pone_provincia_cotizacion.php",
        type: "POST",
        data: { id: id },
        success: function (x) {
            $("#pone_prov_cli_modal").html(x);

            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
});

$(document).on("change", "#pone_prov_cli_modal select", function () {
    var id = this.value;
    $.ajax({
        beforeSend: function () {
            $("#pone_dist_cli_modal").html("Recuperando proveedores...");
        },
        url: "pone_distrito_cotizacion.php",
        type: "POST",
        data: { id: id },
        success: function (x) {
            $("#pone_dist_cli_modal").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
});

function modificar_datos_socios(ruc) {

    id = 'C' + ruc;
    console.log(id)
    $("#modal_modi_direccion").modal({
        show: true,
        backdrop: "static",
        keyboard: false,
    });
    $("#conte_ruc").val(id);
    lista_pais_clie_modal();
    lista_direccion(id);
}




function añadir_direccion() {

    let socioWebData = {

        ruc_cliente: $("#conte_ruc").val(),
        pone_pais_cli: $("#pone_pais_cli_modal select").val(),
        pone_dpto_cli: $("#pone_dpto_cli_modal select").val(),
        //pone_prov_cli: $("#pone_prov_cli_modal select").val(),
        //pone_dist_cli: $("#pone_dist_cli_modal select").val(),
            pone_prov_cli: $("#pone_prov_cli_modal select option:selected").text().toUpperCase(),
        pone_dist_cli: $("#pone_dist_cli_modal select option:selected").text().toUpperCase(),
        direccion_cliente: quitarAcentos($("#direccion_cliente_modal").val()),

    };



    console.log("Socio de Negocio Generado: ", socioWebData);

    $.ajax({
        beforeSend: function () {
            // Mostrar el loader antes de enviar la solicitud
            Swal.fire({
                title: "Migrando direccion...",
                html: '<div class="spinner"></div>',
                allowOutsideClick: false, // Evita que el usuario cierre la alerta
                showConfirmButton: false // No muestra botón de confirmación
            });
        },
        url: "server_layer_insertar_direccion.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(socioWebData),
        success: function (response) {

            console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?
            try {
                let res = typeof response === "string" ? JSON.parse(response) : response;

                Swal.close();

                if (res.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Direccion registrado",
                        text: `Se ha insertado la direccion con éxito.`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    $("#modal_modi_direccion").modal("hide");

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