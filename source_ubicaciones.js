let articulosSeleccionados = new Map(); // Ejemplo: { "A123": "WH01", "B456": "WH02" }


function lista_Marcas_Despacho() {

    $.ajax({
        beforeSend: function () {
            $("#lista_Marca").html("Recuperando Marcas...");
        },
        url: 'Lista_Marcas_LP.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#lista_Marca").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) {
        }
    });

}

function lista_almacen() {
    $.ajax({
        beforeSend: function () {
            $("#listado_almacen").html("Recuperando lista...");
        },
        url: "lista_almacen.php",
        type: "POST",
        success: function (x) {
            $("#listado_almacen").html(x);
            $(".select2").select2();
        }
    });
}

function lista_rack() {
    $.ajax({
        beforeSend: function () {
            $("#lista_rack").html("Recuperando lista...");
        },
        url: "lista_rack.php",
        type: "POST",
        success: function (x) {
            $("#lista_rack").html(x);
            $(".select2").select2();
        }
    });
}

function lista_fila() {
    $.ajax({
        beforeSend: function () {
            $("#lista_fila").html("Recuperando lista...");
        },
        url: "lista_fila.php",
        type: "POST",
        success: function (x) {
            $("#lista_fila").html(x);
            $(".select2").select2();
        }
    });
}

function lista_col() {
    $.ajax({
        beforeSend: function () {
            $("#lista_col").html("Recuperando lista...");
        },
        url: "lista_col.php",
        type: "POST",
        success: function (x) {
            $("#lista_col").html(x);
            $(".select2").select2();
        }
    });
}



function busca_AuditoriaStock() {

    marca = $("#lista_Marca select").val().toString();
    almacen = $("#listado_almacen select").val();

    if (marca === "") {
        alertify.error('Selecione una Marca');
    }

    else {
        $.ajax({
            beforeSend: function () {
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
            },
            url: "listado_articulos.php",
            type: "POST",
            data: {
                marca: marca,
                almacen: almacen
            },
            success: function (x) {

                // Retrasar el cierre del Swal 1.5 segundos
                setTimeout(() => {
                    swal.close();
                    $("#data").html(x);
                    // $('#tabla').DataTable();

                    $("#tabla").DataTable({
                        aoColumnDefs: [
                            { sType: "date-dmy", aTargets: [2] },
                        ],
                        order: [[0, "desc"]],
                        pageLength: 20,
                        lengthMenu: [
                            [10, 20, 60, -1],
                            [10, 20, 60, "Todos"],
                        ],
                        drawCallback: function () {
                            // 🔁 Restaurar selección cuando se cambie de página
                            $('#tabla tbody tr').each(function () {
                                const codigo = $(this).children("td:eq(1)").text().trim();
                                const checkbox = $(this).find("input[type='checkbox']");

                                if (articulosSeleccionados.has(codigo)) {
                                    checkbox.prop("checked", true);
                                    $(this).find("td").css("background-color", "LightGreen");
                                } else {
                                    checkbox.prop("checked", false);
                                    $(this).find("td").css("background-color", "white");
                                }
                            });
                        }
                    });


                }, 1500);
            },
            error: function (jqXHR, estado, error) {
            },
        });
    }
}

$(document).on("click", "#tabla tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#precio_id");

    if (!checkbox.is(":disabled")) {
        // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
        checkbox.prop("checked", !checkbox.prop("checked"));

        // Actualiza la apariencia y el botón según el estado del checkbox
        actualizarFila(checkbox);
    }
});

function actualizarFila(checkbox) {
    const fila = $(checkbox).closest("tr");
    const codigo = fila.children("td:eq(1)").text().trim();
    const almacen = fila.children("td:eq(2)").text().trim();

    if ($(checkbox).is(":checked")) {
        articulosSeleccionados.set(codigo, almacen); // Guardar par código-almacén
        fila.find("td").css("background-color", "LightGreen");
    } else {
        articulosSeleccionados.delete(codigo); // Quitar si se desmarca
        fila.find("td").css("background-color", "white");
    }

    // Mostrar u ocultar botones según haya selección
    if (articulosSeleccionados.size > 0) {
        $("#enviar").show();
        $("#checkx").show();
    } else {
        $("#enviar").hide();
        $("#checkx").hide();
    }
}



$(document).ready(function () {
    $("#ubi_rack").change(function () {
        if ($(this).is(":checked")) {
            $("#lista_rack").slideDown();
            lista_rack();
        } else {
            $("#lista_rack").slideUp();
        }
    });

    $("#ubi_fila").change(function () {
        if ($(this).is(":checked")) {
            $("#lista_fila").slideDown();
            lista_fila();
        } else {
            $("#lista_fila").slideUp();
        }
    });

    $("#ubi_columna").change(function () {
        if ($(this).is(":checked")) {
            $("#lista_col").slideDown();
            lista_col();
        } else {
            $("#lista_col").slideUp();
        }
    });
});

function reg_datos() {
    lista_almacen();

    // Reiniciar los estados
    $("#ubi_rack, #ubi_fila, #ubi_columna").prop("checked", false);
    $("#lista_rack, #lista_fila, #lista_col").hide();

    $("#modal_procesar").modal("show");
}

function registrar_actu() {
    // const almacen = $("#listado_almacen select").val();

    const rackActivo = $("#ubi_rack").is(":checked");
    const filaActivo = $("#ubi_fila").is(":checked");
    const colActivo = $("#ubi_columna").is(":checked");

    const ubicacion_rack = rackActivo ? $("#lista_rack select").val() : '';
    const ubicacion_fila = filaActivo ? $("#lista_fila select").val() : '';
    const ubicacion_columna = colActivo ? $("#lista_col select").val() : '';

    // === VALIDACIONES ===
    // if (!almacen || almacen === "0") {
    //     swal("Debe seleccionar un almacén para continuar.", {
    //         icon: "warning",
    //         button: "Entendido",
    //     });
    //     return;
    // }

    if (!rackActivo && !filaActivo && !colActivo) {
        swal("Debe activar al menos (Rack, Fila o Columna) antes de continuar.", {
            icon: "warning",
            button: "Entendido",
        });
        return;
    }

    if (rackActivo && (!ubicacion_rack || ubicacion_rack === "0")) {
        swal("Debe seleccionar una opción en la lista de Ubicación Rack.", {
            icon: "warning",
            button: "Entendido",
        });
        return;
    }

    if (filaActivo && (!ubicacion_fila || ubicacion_fila === "0")) {
        swal("Debe seleccionar una opción en la lista de Ubicación Fila.", {
            icon: "warning",
            button: "Entendido",
        });
        return;
    }

    if (colActivo && (!ubicacion_columna || ubicacion_columna === "0")) {
        swal("Debe seleccionar una opción en la lista de Ubicación Columna.", {
            icon: "warning",
            button: "Entendido",
        });
        return;
    }

    // === CONFIRMACIÓN ===
    swal({
        title: "¿Desea Actualizar?",
        text: "Se actualizarán las ubicaciones seleccionadas.",
        icon: "warning",
        buttons: ["Cancelar", "Sí, actualizar"],
        dangerMode: true,
    }).then((willUpdate) => {
        if (willUpdate) {
            // procesa_actualizacion(almacen, ubicacion_rack, ubicacion_fila, ubicacion_columna);
            procesa_actualizacion(ubicacion_rack, ubicacion_fila, ubicacion_columna);
        }
    });
}

function procesa_actualizacion(ubicacion_rack, ubicacion_fila, ubicacion_columna) {
    if (articulosSeleccionados.size === 0) {
        swal("Debe seleccionar al menos un artículo para actualizar.", {
            icon: "info",
            button: "Entendido",
        });
        return;
    }

    swal({
        title: "Procesando actualización...",
        text: "Por favor espere un momento.",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        content: {
            element: "div",
            attributes: {
                innerHTML: `<div class="spinner-border text-primary" role="status" 
                            style="width: 3rem; height: 3rem; margin:10px auto;">
                            <span class="sr-only">Cargando...</span></div>`
            }
        }
    });

    let total = articulosSeleccionados.size;
    let procesados = 0;

    // 🔁 Recorremos todos los artículos seleccionados
    articulosSeleccionados.forEach((almacen, codigo) => {
        $.ajax({
            url: "procesa_actualizacion_ubicacion.php",
            type: "POST",
            data: {
                codigo: codigo,
                almacen: almacen,
                ubicacion_rack: ubicacion_rack,
                ubicacion_fila: ubicacion_fila,
                ubicacion_columna: ubicacion_columna
            },
            success: function () {
                procesados++;

                if (procesados === total) {
                    swal("Actualización completada correctamente.", {
                        icon: "success",
                        timer: 2000,
                        buttons: false,
                    });

                    setTimeout(() => {
                        $("#modal_procesar").modal("hide");
                        busca_AuditoriaStock();
                        articulosSeleccionados.clear(); // Limpia las selecciones
                    }, 1800);
                }
            },
            error: function (jqXHR, estado, error) {
                console.error(`Error al actualizar ${codigo}`, error);
            },
        });
    });
}


$(document).on("click", "#miCheckbox2", function () {
    if ($(this).is(":checked")) {
        $("#tabla input[type='checkbox'][id='precio_id']").prop(
            "checked",
            true
        );
        $("#tabla input[type='checkbox'][id='precio_id']")
            .closest("tr")
            .css("background-color", "LightGreen");
        $("#enviar").show();
    } else {
        $("#tabla input[type='checkbox'][id='precio_id']").prop(
            "checked",
            false
        );
        $("#tabla input[type='checkbox'][id='precio_id']")
            .closest("tr")
            .css("background-color", "white");
        $("#enviar").hide();
    }
});

function reg_datos2() {
    $("#modal_procesar_excel").modal("show");
}

async function procesar_actualizacion() {
    const input = document.getElementById("archivo_excel");

    // 🔹 Validación de archivo
    if (!input.files.length) {
        Swal.fire({
            title: "Archivo requerido",
            text: "Debe seleccionar un archivo Excel antes de continuar.",
            icon: "warning",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#3085d6"
        });
        return;
    }

    const formData = new FormData();
    formData.append("archivo_excel", input.files[0]);

    // 🔹 Mostrar loader
    Swal.fire({
        title: "Procesando archivo...",
        html: `
            <div class="d-flex flex-column align-items-center">
                <div class="loader"></div>
                <p class="mt-3 mb-0">Por favor espere mientras se actualizan las ubicaciones.</p>
            </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        background: "#f9f9f9",
    });

    // 🔹 Esperar 2 segundos antes de iniciar procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const resp = await $.ajax({
            url: "procesa_actualizacion_excel.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        });

        // 🔹 Mantener loader visible un poco más
        await new Promise(resolve => setTimeout(resolve, 500));

        let data;
        try {
            data = JSON.parse(resp);
        } catch (e) {
            console.error("Error interpretando respuesta:", e, resp);
            Swal.fire({
                title: "Error inesperado",
                text: "No se pudo interpretar la respuesta del servidor.",
                icon: "error",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
            });
            return;
        }

        // 🔹 Éxito
        if (data.ok) {
            let tablaErrores = "";

            if (data.omitidos && data.omitidos.length > 0) {
                tablaErrores = `
                    <hr>
                    <h5>⚠️ Filas omitidas por valores inválidos:</h5>
                    <div style="max-height:300px; overflow:auto;">
                        <table id="tabla_filas_omitidas" border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse; text-align: left;">
                            <thead style="background:#f2f2f2;">
                                <tr>
                                    <th>Fila</th>
                                    <th>ItemCode</th>
                                    <th>Almacén</th>
                                    <th>Campo</th>
                                    <th>Valor ingresado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.omitidos.map(f =>
                                    f.errores.map(e => `
                                        <tr>
                                            <td style="text-align: center; font-size: 13px;">${f.fila}</td>
                                            <td style="text-align: center; font-size: 13px;">${f.item}</td>
                                            <td style="text-align: center; font-size: 13px;">${f.almacen}</td>
                                            <td style="text-align: center; font-size: 13px;">${e.campo}</td>
                                            <td style="text-align: center; font-size: 13px;">${e.valor}</td>
                                        </tr>
                                    `).join("")
                                ).join("")}
                            </tbody>
                        </table>
                    </div>
                `;
            }

            Swal.fire({
                title: "✅ Actualización completada",
                html: `
                    <p>Se procesaron <b>${data.total}</b> filas.</p>
                    <p class="text-success">✔️ Filas Exitosas: <b>${data.exitos}</b></p>
                    <p class="text-danger">❌ Filas Erroneas: <b>${data.errores}</b></p>
                    ${tablaErrores}
                `,
                width: 750,
                icon: data.omitidos?.length > 0 ? "warning" : "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#28a745",
                didOpen: () => {
                    // 🔹 Inicializar DataTable con botón Copiar si hay tabla de errores
                    if ($('#tabla_filas_omitidas').length) {
                        $('#tabla_filas_omitidas').DataTable({
                            dom: '<"top"Bf>rt<"bottom"ip>',
                            buttons: [
                                {
                                    extend: 'copy',
                                    text: '<i class="fa fa-copy"></i> Copiar',
                                    titleAttr: 'Copiar',
                                    className: 'btn btn-copy'
                                }
                            ],
                            paging: true,
                            searching: true,
                            ordering: true,
                            info: true,
                            lengthChange: true
                        });
                    }
                }
            }).then(() => {
                $("#modal_procesar_excel").modal("hide");
                busca_AuditoriaStock();
            });

        } else {
            Swal.fire({
                title: "Error al procesar",
                text: data.msg || "Ocurrió un error al procesar el archivo.",
                icon: "error",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
            });
        }

    } catch (err) {
        console.error("Error AJAX:", err);
        Swal.fire({
            title: "Error de conexión",
            text: "No se pudo enviar el archivo al servidor.",
            icon: "error",
            confirmButtonText: "Reintentar",
            confirmButtonColor: "#3085d6"
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