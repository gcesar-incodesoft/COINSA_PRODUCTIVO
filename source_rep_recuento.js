
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

function lista_ubicaciones() {

    $.ajax({
        beforeSend: function () {
            $("#lista_ubicaciones_rack").html("Recuperando Ubicaciones...");
        },
        url: 'Lista_ubicaciones_rack.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#lista_ubicaciones_rack").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) {
        }
    });

}

function lista_almacen() {
    $.ajax({
        beforeSend: function () {
            $("#lista_almacen").html("Recuperando lista...");
        },
        url: "lista_almacen_2.php",
        type: "POST",
        success: function (x) {
            $("#lista_almacen").html(x);
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
    almacen = $("#lista_almacen option:selected").val();
    ubicacion = $("#lista_ubicaciones_rack select").val().toString();
    tiene_stock = $("#tiene_stock").is(":checked");

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
            url: "listado_articulos_recuento.php",
            type: "POST",
            data: {
                marca: marca,
                almacen: almacen,
                ubicacion: ubicacion,
                stock: tiene_stock
            },
            success: function (x) {

                // Retrasar el cierre del Swal 1.5 segundos
                setTimeout(() => {
                    swal.close();
                    $("#data").html(x);
                    // $('#tabla').DataTable();

                    $("#tabla").DataTable({

                        dom: '<"top"lBf>rt<"bottom"ip>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="fa fa-copy"></i> Copiar',
                                titleAttr: 'Copiar',
                                className: 'btn btn-copy'
                            },
                        ],
                        aoColumnDefs: [
                            { sType: "date-dmy", aTargets: [2] }, // en tal columna
                        ],
                        order: [[0, "desc"]],
                        pageLength: 20,
                        lengthMenu: [
                            [10, 20, 60, -1],
                            [10, 20, 60, "Todos"],
                        ],
                    });

                }, 1500);
            },
            error: function (jqXHR, estado, error) {
            },
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

function exportar_pdf() {

    marca = $("#lista_Marca select").val().toString();
    almacen = $("#lista_almacen option:selected").val();
    ubicacion = $("#lista_ubicaciones_rack select").val().toString();
    tiene_stock = $("#tiene_stock").is(":checked");

    var ruta = "pdf_rep_recuento.php?marca=" + marca + "&almacen=" + almacen + "&ubicacion=" + ubicacion + "&stock=" + tiene_stock;

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

    var checkboxes = $('#tabla .chkCheckBoxId');
    var checkbox2 = $("#tabla tbody tr").find("#precio_id");
    var checkboxesActivados = checkboxes.filter(':checked').length;
    var cant = checkbox2.closest("tr").find("#precio_id:checked").length;
    //console.log(cant);
    if (checkbox.is(":checked") && !checkbox.is(":disabled")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }
    if (checkboxesActivados > 0) {
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
    const almacen = $("#listado_almacen select").val();

    const rackActivo = $("#ubi_rack").is(":checked");
    const filaActivo = $("#ubi_fila").is(":checked");
    const colActivo = $("#ubi_columna").is(":checked");

    const ubicacion_rack = rackActivo ? $("#lista_rack select").val() : '';
    const ubicacion_fila = filaActivo ? $("#lista_fila select").val() : '';
    const ubicacion_columna = colActivo ? $("#lista_col select").val() : '';

    // === VALIDACIONES ===
    if (!almacen || almacen === "0") {
        swal("Debe seleccionar un almacén para continuar.", {
            icon: "warning",
            button: "Entendido",
        });
        return;
    }

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
            procesa_actualizacion(almacen, ubicacion_rack, ubicacion_fila, ubicacion_columna);
        }
    });
}

function procesa_actualizacion(almacen, ubicacion_rack, ubicacion_fila, ubicacion_columna) {
    const seleccionados = $('#tabla input[type="checkbox"]:checked');

    if (seleccionados.length === 0) {
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

    let total = seleccionados.length;
    let procesados = 0;

    seleccionados.each(function () {
        const codigo = $(this).closest("tr").children("td:eq(1)").text().trim();

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

                // Cuando termine todos los registros
                if (procesados === total) {
                    // Cerrar swal de carga y mostrar éxito
                    swal("Actualización completada correctamente.", {
                        icon: "success",
                        timer: 2000,
                        buttons: false,
                    });

                    // Cerrar modal después de un pequeño delay
                    setTimeout(() => {
                        $("#modal_procesar").modal("hide");
                        busca_AuditoriaStock();
                    }, 1800);
                }
            },
            error: function (jqXHR, estado, error) {
                console.error("Error al actualizar", codigo, error);
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