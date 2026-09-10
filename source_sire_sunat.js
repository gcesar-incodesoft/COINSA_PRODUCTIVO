function lista_periodo_sap() {
    $.ajax({
        beforeSend: function () {
            $("#periodo").html("Cargando los clientes...");
        },
        url: "pone_periodo_sap.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#periodo").html(x);
            $(".select2").select2();
            //$('#clie').val('');
        },
        error: function (jqXHR, estado, error) {
            $("#periodo").html("Hubo un error: " + estado + " " + error);
        },
    });
}

function consulta_propuesta_sire() {
    const periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    let interval;
    let progress = 0;

    $.ajax({
        beforeSend: function () {
            interval = modal_carga(); // Inicia el modal de carga y guarda el intervalo
            this.startTime = new Date().getTime(); // Marca el tiempo de inicio
        },
        url: "lista_propuesta_periodo_sire.php",
        type: "POST",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            const elapsedTime = new Date().getTime() - this.startTime; // Tiempo transcurrido
            const delay = Math.max(1000 - elapsedTime, 0); // Asegura al menos 1 segundo

            // Asegurar que el progreso visual llegue al 100%
            const remainingTime = Math.max((100 - progress) * 100 / 2, delay); // Calcula el tiempo restante
            const completionInterval = setInterval(() => {
                if (progress < 100) {
                    progress += 2;
                    document.getElementById("progress-bar").style.width = `${progress}%`;
                    document.getElementById("progress-text").innerText = `${progress}%`;
                } else {
                    clearInterval(completionInterval); // Detiene el progreso al llegar al 100%
                    clearInterval(interval); // Detiene el intervalo inicial
                    swal.close(); // Cierra el modal
                    $("#lista_propuesta_sire").html(x);

                    // Inicializa DataTable
                    $("#tabla_sire").DataTable({
                        dom: '<"top"lBf>rt<"bottom"ip>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="fas fa-copy"></i> Copiar',
                                titleAttr: 'Copiar',
                                className: 'btn btn-copy'
                            },
                            // {
                            //     extend: 'csv',
                            //     text: '<i class="fas fa-file-csv"></i> Exportar CSV',
                            //     titleAttr: 'Exportar a CSV',
                            //     className: 'btn btn-csv'
                            // },
                            // {
                            //     extend: 'excel',
                            //     text: '<i class="fas fa-file-excel"></i> Exportar Excel',
                            //     titleAttr: 'Exportar a Excel',
                            //     className: 'btn btn-excel'
                            // },
                            {
                                extend: 'pdf',
                                text: '<i class="fas fa-file-pdf"></i> Exportar PDF',
                                titleAttr: 'Exportar a PDF',
                                className: 'btn btn-pdf'
                            },
                            // {
                            //     extend: 'print',
                            //     text: '<i class="fas fa-print"></i> Imprimir',
                            //     titleAttr: 'Imprimir',
                            //     className: 'btn btn-print'
                            // }
                        ],
                        fixedHeader: true,
                        responsive: true,
                        scrollX: true,
                        pageLength: -1,
                        lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
                        language: {
                            paginate: {
                                first: "Primero",
                                last: "Último",
                                next: "Siguiente",
                                previous: "Anterior"
                            },
                            Show: "Mostrar"
                        }
                    });
                }
            }, 100); // Actualiza cada 100 ms
        },
        error: function (jqXHR, estado, error) {
            clearInterval(interval); // Detiene el progreso inicial
            swal.close(); // Cierra el modal
            $("#lista_propuesta_sire").html("Hubo un error: " + estado + " " + error);
        }
    });
}
function consulta_propuesta_sap() {

    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    $.ajax({
        beforeSend: function () {

        },
        url: "lista_propuesta_periodo_sap.php",
        type: "POST",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            // Este código se ejecuta después de la solicitud AJAX con éxito
            $("#lista_propuesta_sap").html(x);
            $("#tabla_sap").DataTable({
                // scrollY: "400px", // Activa el scroll vertical
                scrollX: true, // Activa el scroll horizontal si es necesario
                dom: '<"top"lBf>rt<"bottom"ip>',
                buttons: [
                    {
                        extend: 'copy',
                        text: '<i class="fas fa-copy"></i> Copiar',
                        titleAttr: 'Copiar',
                        className: 'btn btn-copy'
                    },
                    // {
                    //     extend: 'csv',
                    //     text: '<i class="fas fa-file-csv"></i> Exportar CSV',
                    //     titleAttr: 'Exportar a CSV',
                    //     className: 'btn btn-csv'
                    // },
                    // {
                    //     extend: 'excel',
                    //     text: '<i class="fas fa-file-excel"></i> Exportar Excel',
                    //     titleAttr: 'Exportar a Excel',
                    //     className: 'btn btn-excel'
                    // },
                    {
                        extend: 'pdf',
                        text: '<i class="fas fa-file-pdf"></i> Exportar PDF',
                        titleAttr: 'Exportar a PDF',
                        className: 'btn btn-pdf'
                    },
                    // {
                    //     extend: 'print',
                    //     text: '<i class="fas fa-print"></i> Imprimir',
                    //     titleAttr: 'Imprimir',
                    //     className: 'btn btn-print'
                    // }
                ],
                fixedHeader: true,
                responsive: true,
                scrollX: true,
                pageLength: -1,
                lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
                language: {
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "Show": "Mostrar"
                }
            });
        },
        error: function (jqXHR, estado, error) {
            // En caso de error, mostrar el mensaje de error
            $("#lista_propuesta_sap").html("Hubo un error: " + estado + " " + error);
            swal("Error", "Hubo un problema con la solicitud", "error");
        },
    });
}
function modal_carga() {
    swal({
        title: "Consultando a SUNAT",
        text: "Por favor, espere mientras procesamos los datos.",
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                    <div style="text-align: center; margin-bottom: 10px;">
                        <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
                    </div>
                    <div style="width: 100%; height: 25px; background-color: #e0e0e0; border-radius: 5px; margin-top: 20px;">
                        <div id="progress-bar" style="width: 0%; height: 100%; background-color: #007BFF; border-radius: 5px; transition: width 0.2s ease;"></div>
                    </div>
                    <div id="progress-text" style="text-align: center; margin-top: 10px;">0%</div>
                `
            }
        },
        showConfirmButton: false,
        allowOutsideClick: false
    });

    let progress = 0; // Reinicia el progreso cada vez que se llama
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    // Detener cualquier intervalo existente antes de iniciar uno nuevo
    if (window.progressInterval) {
        clearInterval(window.progressInterval);
    }

    // Simular progreso uniforme
    window.progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += 2; // Incrementa uniformemente hasta el 90%
        } else if (progress < 100) {
            progress += 1; // Incremento lento entre 90% y 100%
        }
        progress = Math.min(progress, 100); // Asegura que no pase del 100%
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${Math.floor(progress)}%`;

        // Si llega al 100%, detener el intervalo
        if (progress >= 100) {
            clearInterval(window.progressInterval);
        }
    }, 100); // Actualiza cada 100 ms para una carga fluida

    return window.progressInterval; // Retorna el intervalo para controlarlo
}


/*function consulta_propuesta() {
    periodo = $("#periodo").val();

    $.ajax({
        beforeSend: function () {
            $("#lista_clientes").html("Cargando los clientes...");
        },
        url: "lista_propuesta_periodo.php",
        type: "POST",
        data: { periodo},
        success: function (x) {
            $("#lista_propuesta").html(x);
            $("#sample-table-3").DataTable();
            //$('#clie').val('');
        },
        error: function (jqXHR, estado, error) {
            $("#lista_clientes").html("Hubo un error: " + estado + " " + error);
        },
    });
}
 */

function registrar_sap(data) {
    console.log(data);

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

function consultar_sunat_datos() {
    periodo = $("#periodo select").val();


    swal({
        title: "Desea Consultar Sunat?",
        text: "Desea hacer la consulta con sunat",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal({
                    title: "Consultando Datos",
                    text: "Por favor, espere mientras consultamos los datos.",
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
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 20000  // Se cierra después de 30 segundos
                })
                setTimeout(() => {
                    consultar_periodo_sire();
                }, 20000);

                // swal.close(); 
                //   swal("Debe esperar 1 min para actualizar", {
                //     icon: "success",
                //   });
                insertar_cola_migracion_sire(periodo, 1, 'V');
                insertar_cola_migracion_sire(periodo, 2, 'V');
                insertar_cola_migracion_sire(periodo, 3, 'V');
            } else {
                swal("Cancelado!");
            }
        });

}
function consulta_tipo_consulta() {
    swal({
        title: "¿Qué deseas hacer?",
        text: "Elige el origen de la consulta",
        icon: "warning",
        buttons: {
            sire: {
                text: "✅ Consultar Datos",
                value: "sire",
                className: "btn btn-success"
            },
            sunat: {
                text: "🧾 SUNAT",
                value: "sunat",
                className: "btn btn-primary sunat-btn" // puedes aplicar estilos extra aquí
            }
        },
        dangerMode: true
    }).then((value) => {
        switch (value) {
            case "sire":
                consultar_periodo_sire();
                break;
            case "sunat":
                consultar_sunat_datos();
                break;
            default:
                // Cancelado o cerrado
                break;
        }
    })
}

function consultar_periodo_sire() {
    periodo = $("#periodo select").val();
    consulta_propuesta_sap();
    consulta_propuesta_sire()
    $('#tabComprobantesSIRE').hide(); // Ocultar la pestaña en el nav
    $('#Tab3').removeClass('active'); // Quitar la clase active del tab correspondiente
    $('#validar-sunat').show();
    $('#reemplazaBtn').show();
    // Activar la primera pestaña (Comprobantes SIRE)
    // $('#Tab1').addClass('active'); // Hacer visible el contenido del primer tab
    // $('a[href="#Tab1"]').parent().addClass('active'); // Activar la pestaña "Comprobantes SIRE"

}

function insertar_cola_migracion_sire(periodo, tipo, tipo_sire) {
    $.ajax({
        beforeSend: function () { },
        url: "insertar_cola_service_sire.php",
        type: "POST",
        dataType: "json",
        data: { periodo: periodo, tipo: tipo, tipo_sire: tipo_sire },
        success: function (x) {
            console.log('hola');

        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });
}

// function validarSunat() {
//     $('#tabComprobantesSIRE').show();  // Hacer visible la nueva pestaña
//     // Activar la pestaña "Comprobantes SUNAT"
//     $('a[href="#Tab3"]').tab('show');

//     let progress = 0;
//     let interval = setInterval(function () {
//         progress += 2;  // Aumenta el progreso
//         document.getElementById("progress-bar").style.width = progress + "%";
//         document.getElementById("progress-text").textContent = progress + "%";

//         // Detener el intervalo cuando el progreso llega a 100
//         if (progress >= 100) {
//             clearInterval(interval);
//             console.log("Proceso completado.");
//         }
//     }, 600);  // Actualiza la barra cada 600 ms

//     $.ajax({
//         beforeSend: function () {
//             // swal({
//             //     title: "Validando Datos",
//             //     text: "Por favor, espere mientras validamos los datos.",
//             //     content: {
//             //         element: "div",
//             //         attributes: {
//             //             innerHTML: `
//             //                 <div style="text-align: center; margin-bottom: 10px;">
//             //                     <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
//             //                 </div>
//             //                 <div style="width: 100%; height: 25px; background-color: #e0e0e0; border-radius: 5px; margin-top: 20px;">
//             //                     <div id="progress-bar" style="width: 0%; height: 100%; background-color: #007BFF; border-radius: 5px;"></div>
//             //                 </div>
//             //                 <div id="progress-text" style="text-align: center; margin-top: 10px;">0%</div>
//             //             `
//             //         }
//             //     },
//             //     showConfirmButton: false,
//             //     allowOutsideClick: false,
//             //     timer: 5000  // Se cierra después de 30 segundos
//             // })
//         },
//         url: "lista_validacion_sunat.php",
//         type: "POST",
//         data: { periodo },
//         success: function (x) {
//             setTimeout(() => {
//                 $("#lista_validacion_sunat").html(x);
//             }, 5100);

//             //$("#tabla_validacion_sap").DataTable({});
//             //$('#clie').val('');
//         },
//         error: function (jqXHR, estado, error) {
//             $("#lista_propuesta_sire").html("Hubo un error: " + estado + " " + error);
//         },
//     });
// }

function validarSunat() {
    $('#tabComprobantesSIRE').show(); // Hacer visible la nueva pestaña
    // Activar la pestaña "Comprobantes SUNAT"
    $('a[href="#Tab3"]').tab('show');

    let interval;

    periodo2 = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();

    $.ajax({
        beforeSend: function () {
            interval = modal_carga(); // Inicia el modal de carga
        },
        url: "lista_validacion_sunat.php",
        type: "POST",
        data: { periodo: periodo2, fec_ini, fec_fin },
        success: function (x) {
            let progress = 90; // Ajustar el progreso al 90% cuando llega la respuesta
            const progressBar = document.getElementById("progress-bar");
            const progressText = document.getElementById("progress-text");

            // Completar el progreso al 100% de forma uniforme
            const completeProgress = setInterval(() => {
                if (progress < 100) {
                    progress += 2; // Incremento uniforme
                    progressBar.style.width = `${progress}%`;
                    progressText.innerText = `${Math.floor(progress)}%`;
                } else {
                    clearInterval(completeProgress); // Detiene el intervalo al llegar al 100%
                    clearInterval(interval); // Detiene el intervalo inicial
                    swal.close(); // Cierra el modal
                    $("#lista_validacion_sunat").html(x); // Muestra los datos en el contenedor
                    $("#tabla_validacion_sap, #tabla_validacion_sap2, #tabla_validacion_sap3").DataTable({
                        dom: '<"top"lBf>rt<"bottom"ip>',
                        buttons: [
                            {
                                extend: 'copy',
                                text: '<i class="fas fa-copy"></i> Copiar',
                                titleAttr: 'Copiar',
                                className: 'btn btn-copy'
                            },

                            {
                                extend: 'pdf',
                                text: '<i class="fas fa-file-pdf"></i> Exportar PDF',
                                titleAttr: 'Exportar a PDF',
                                className: 'btn btn-pdf'
                            },
                        ],
                        paging: true,
                        searching: true,
                        ordering: true,
                        info: true,
                        autoWidth: false,
                        responsive: true,
                        columnDefs: [
                            { targets: "_all", className: "text-center" }
                        ],
                        "paging": true, // ✅ Activa la paginación
                        "info": true, // ✅ Muestra la información del total de registros
                        "language": {
                            "lengthMenu": "Mostrar _MENU_ registros por página",
                            "zeroRecords": "No se encontraron registros",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                            "infoEmpty": "No hay registros disponibles",
                            "infoFiltered": "(filtrado de _MAX_ registros en total)",
                            "search": "Buscar:",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        }
                    });
                }
            }, 50); // Intervalo rápido para completar al 100%
        },
        error: function (jqXHR, estado, error) {
            clearInterval(interval); // Detiene el progreso inicial
            swal.close(); // Cierra el modal
            $("#lista_propuesta_sire").html("Hubo un error: " + estado + " " + error);
        },
    });
}


function actualizar_propuesta() {
    swal({
        title: "Actualizando Propuesta SUNAT",
        text: "Por favor, espere mientras procesamos los datos.",
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                    <div style="text-align: center; margin-bottom: 10px;">
                        <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
                    </div>
                    <div style="width: 100%; height: 25px; background-color: #e0e0e0; border-radius: 5px; margin-top: 20px;">
                        <div id="progress-bar" style="width: 0%; height: 100%; background-color: #007BFF; border-radius: 5px;"></div>
                    </div>
                    <div id="progress-text" style="text-align: center; margin-top: 10px;">0%</div>
                `
            }
        },
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 30000  // Se cierra después de 30 segundos
    })
}

function actualizar_sap() {
    swal({
        title: "Actualizando SAP SUNAT",
        text: "Por favor, espere mientras procesamos los datos.",
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                    <div style="text-align: center; margin-bottom: 10px;">
                        <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
                    </div>
                    <div style="width: 100%; height: 25px; background-color: #e0e0e0; border-radius: 5px; margin-top: 20px;">
                        <div id="progress-bar" style="width: 0%; height: 100%; background-color: #007BFF; border-radius: 5px;"></div>
                    </div>
                    <div id="progress-text" style="text-align: center; margin-top: 10px;">0%</div>
                `
            }
        },
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 30000  // Se cierra después de 30 segundos
    })
}

function ajustar_diferencia(periodo, tipo) {
    console.log("✅ periodo =", periodo);
    console.log("✅ tipo =", tipo);
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    $("#modalAjuste").modal("show");
    $("#modalAjuste").modal({
        backdrop: "static", // Evitar cierre con clic fuera
        keyboard: false     // Evitar cierre con tecla Esc
    });
    // Cargar ambas tablas en paralelo
    $.ajax({
        beforeSend: function () {

        },
        url: "lista_ajustes_valida_ventas_fact.php",
        type: "POST",
        data: { periodo, tipo, fec_ini, fec_fin },
        success: function (x) {
            $("#lista_ajustes_fact").html(x);
            $("#tabla_ajuste_sap").DataTable({
                dom: '<"top"lBf>rt<"bottom"ip>',
                buttons: [
                    {
                        extend: 'copy',
                        text: '<i class="fas fa-copy"></i> Copiar',
                        titleAttr: 'Copiar',
                        className: 'btn btn-copy'
                    },
                    {
                        extend: 'pdf',
                        text: '<i class="fas fa-file-pdf"></i> Exportar PDF',
                        titleAttr: 'Exportar a PDF',
                        className: 'btn btn-pdf'
                    },

                ],
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
                columnDefs: [
                    { targets: "_all", className: "text-center" }
                ],
                "paging": true, // ✅ Activa la paginación
                "info": true, // ✅ Muestra la información del total de registros
                "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "No se encontraron registros",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "No hay registros disponibles",
                    "infoFiltered": "(filtrado de _MAX_ registros totales)",
                    "search": "Buscar:",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });
        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });
    $.ajax({
        beforeSend: function () {

        },
        url: "lista_ajustes_valida_venta_sunat.php",
        type: "POST",
        data: { periodo, tipo, fec_ini, fec_fin },
        success: function (x) {
            $("#lista_ajustes_sunat").html(x);
            $("#tabla_ajuste_sunat").DataTable({
                dom: '<"top"lBf>rt<"bottom"ip>',
                buttons: [
                    {
                        extend: 'copy',
                        text: '<i class="fas fa-copy"></i> Copiar',
                        titleAttr: 'Copiar',
                        className: 'btn btn-copy'
                    },
                    {
                        extend: 'pdf',
                        text: '<i class="fas fa-file-pdf"></i> Exportar PDF',
                        titleAttr: 'Exportar a PDF',
                        className: 'btn btn-pdf'
                    },

                ],
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
                columnDefs: [
                    { targets: "_all", className: "text-center" }
                ],
                "paging": true, // ✅ Activa la paginación
                "info": true, // ✅ Muestra la información del total de registros
                "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "No se encontraron registros",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "No hay registros disponibles",
                    "infoFiltered": "(filtrado de _MAX_ registros totales)",
                    "search": "Buscar:",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });
        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });

}


// Para la tabla SAP
$(document).on("click", "#tabla_ajuste_sap tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#check-sap");

    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Cambia el color de la fila según el estado del checkbox
    if (checkbox.prop("checked")) {
        $(this).css("background-color", "lightgreen"); // Marca la fila en verde
    } else {
        $(this).css("background-color", ""); // Restaura el color original
    }

    // Obtén el valor del código (si es necesario)
    let codigo = $(this).children("td:eq(1)").text();
    console.log("Código seleccionado:", codigo);
});


// Para la tabla SUNAT
$(document).on("click", "#tabla_ajuste_sunat tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#check-sunat");

    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Cambia el color de la fila según el estado del checkbox
    if (checkbox.prop("checked")) {
        $(this).css("background-color", "lightgreen"); // Marca la fila en verde
    } else {
        $(this).css("background-color", ""); // Restaura el color original
    }

    // Obtén el valor del código (si es necesario)
    let codigo = $(this).children("td:eq(1)").text();
    console.log("Código seleccionado:", codigo);
});


function guardar_ajustes_sunat() {

    let datosSeleccionadosSUNAT = [];


    // Recorrer las filas de la tabla SUNAT
    $('#tabla_ajuste_sunat tbody tr').each(function () {
        const checkbox = $(this).find('.check-sunat'); // Encuentra el checkbox de la fila
        if (checkbox.prop('checked')) {
            // Si está marcado, recoge los datos de las celdas
            const filaDatos = {
                docEntry: $(this).children('td:eq(10)').text().trim(), // Campo oculto ID
                fecha: $(this).children('td:eq(2)').text().trim(),
                factura: $(this).children('td:eq(3)').text().trim(),
                proveedor: $(this).children('td:eq(4)').text().trim(),
                moneda: $(this).children('td:eq(5)').text().trim(),
                subtotal: $(this).children('td:eq(6)').text().trim(),
                impuesto: $(this).children('td:eq(7)').text().trim(),
                total: $(this).children('td:eq(8)').text().trim(),
                tipoCambio: $(this).children('td:eq(9)').text().trim(),
            };
            datosSeleccionadosSUNAT.push(filaDatos);
        }
    });
    // Validar si hay al menos un checkbox seleccionado
    if (datosSeleccionadosSUNAT.length === 0) {
        alertify.error("Debes seleccionar al menos un registro.");
        return; // Detener la ejecución
    }
    // console.log("Datos seleccionados SUNAT:", datosSeleccionadosSUNAT);

    // return { sap: datosSeleccionadosSAP, sunat: datosSeleccionadosSUNAT };


    let resumenHTML = "<h4 style='margin-bottom: 10px;'></h4>";



    // Crear tabla para SUNAT si hay registros
    if (datosSeleccionadosSUNAT.length > 0) {
        resumenHTML += `
        <h4 class="resumen-titulo">
                <i class="fas fa-file-alt"></i> Registros SAP
         </h4>        
            <table class="resumen-tabla">
                <tr>
                <th style="border-bottom: 1px solid #ddd; padding: 5px;">#</th>
                <th style="border-bottom: 1px solid #ddd; padding: 5px;">Fecha</th>
                <th style="border-bottom: 1px solid #ddd; padding: 5px;">Factura</th>
                <th style="border-bottom: 1px solid #ddd; padding: 5px;">Proveedor</th>
                <th style="border-bottom: 1px solid #ddd; padding: 5px;">Total</th>
                <th style="border-bottom: 1px solid #ddd; padding: 5px;">Moneda</th>
            </tr>`;

        datosSeleccionadosSUNAT.forEach((fila, index) => {
            resumenHTML += `
            <tr>
                <td style="padding: 5px;">${index + 1}</td>
                <td style="padding: 5px;">${fila.fecha}</td>
                <td style="padding: 5px;">${fila.factura}</td>
                <td style="padding: 5px;">${fila.proveedor}</td>
                <td style="padding: 5px;">${fila.total}</td>
                <td style="padding: 5px;">${fila.moneda}</td>
            </tr>`;
        });

        resumenHTML += `</table>`;
        let totalFacturasSUNAT = datosSeleccionadosSUNAT.length;
        let sumaTotalSUNAT = datosSeleccionadosSUNAT.reduce((acc, fila) => acc + parseFloat(fila.total || 0), 0);

        // ✅ Agregar resumen directamente debajo de la tabla
        resumenHTML += `
             <div class="resumen-total">
            <p><i class="fas fa-receipt"></i> <strong>Total de Facturas:</strong> ${totalFacturasSUNAT}</p>
            <p><i class="fas fa-coins"></i> <strong>Suma Total de Facturas:</strong> ${sumaTotalSUNAT.toFixed(2)}</p>
        </div>`;
    }


    mostrarModalResumen(resumenHTML, datosSeleccionadosSUNAT, 2);

}

function guardar_ajustes_sap() {
    let datosSeleccionadosSAP = [];
    // Recorrer las filas de la tabla SAP
    $('#tabla_ajuste_sap tbody tr').each(function () {
        const checkbox = $(this).find('.check-sap'); // Encuentra el checkbox de la fila
        if (checkbox.prop('checked')) {
            // Si está marcado, recoge los datos de las celdas
            const filaDatos = {
                docEntry: $(this).children('td:eq(1)').text().trim(),
                fecha: $(this).children('td:eq(2)').text().trim(),
                factura: $(this).children('td:eq(3)').text().trim(),
                proveedor: $(this).children('td:eq(4)').text().trim(),
                moneda: $(this).children('td:eq(5)').text().trim(),
                subtotal: $(this).children('td:eq(6)').text().trim(),
                impuesto: $(this).children('td:eq(7)').text().trim(),
                total: $(this).children('td:eq(8)').text().trim(),
                tipoCambio: $(this).children('td:eq(9)').text().trim(),
            };
            datosSeleccionadosSAP.push(filaDatos);
        }
    });
    if (datosSeleccionadosSAP.length === 0) {
        alertify.error("Debes seleccionar al menos un registro.");
        return; // Detener la ejecución
    }
    console.log("Datos seleccionados SAP:", datosSeleccionadosSAP);
    let resumenHTML = "<h4 style='margin-bottom: 10px;'></h4>";

    // Crear tabla para SAP si hay registros
    if (datosSeleccionadosSAP.length > 0) {
        resumenHTML += `
  <h4 class="resumen-titulo">
        <i class="fas fa-file-alt"></i> Registros SAP
    </h4>            <table class="resumen-tabla">
                <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Factura</th>
                    <th>Proveedor</th>
                    <th>Total</th>
                    <th>Moneda</th>
                </tr>`;

        datosSeleccionadosSAP.forEach((fila, index) => {
            resumenHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${fila.fecha}</td>
                    <td>${fila.factura}</td>
                    <td>${fila.proveedor}</td>
                    <td>${fila.total}</td>
                    <td>${fila.moneda}</td>
                </tr>`;
        });

        resumenHTML += `</table>`; // ✅ Cerrar la tabla antes del resumen

        let totalFacturasSAP = datosSeleccionadosSAP.length;
        let sumaTotalSAP = datosSeleccionadosSAP.reduce((acc, fila) => acc + parseFloat(fila.total || 0), 0);

        // ✅ Agregar el resumen debajo de la tabla
        resumenHTML += `
            <div class="resumen-total">
            <p><i class="fas fa-receipt"></i> <strong>Total de Facturas:</strong> ${totalFacturasSAP}</p>
            <p><i class="fas fa-coins"></i> <strong>Suma Total de Facturas:</strong> ${sumaTotalSAP.toFixed(2)}</p>
        </div>`;
    }

    mostrarModalResumen(resumenHTML, datosSeleccionadosSAP, 1);


}

function mostrarModalResumen(resumenHTML, datosSeleccionadosSAP, estado) {
    console.log("Parámetros recibidos:", arguments); // Muestra todos los valores recibidos
    console.log("Estado recibido:", estado); // Revisa qué valor tiene estado    
    // Inserta el contenido dinámico en el modal
    $("#modalResumenHTML").html(resumenHTML);

    // Muestra el modal
    $("#modalVerificarDatos").modal("show");

    // Manejo del botón "Guardar"
    $("#btnGuardarDatos").off("click").on("click", function () {
        // console.log("Datos seleccionados SAP:", datosSeleccionadosSAP);
        // alertify.success("Datos guardados correctamente.");
        guardar_ajustes_BASE(datosSeleccionadosSAP, estado)
        // $("#modalVerificarDatos").modal("hide"); // Cierra el modal después de guardar
    });

    // Manejo del botón "Cancelar"
    $(".btn-secondary").off("click").on("click", function () {
        // alertify.warning("La acción fue cancelada.");
        $("#modalVerificarDatos").modal("hide"); // Cierra el modal después de guardar

    });
}
function guardar_ajustes_BASE(guardar_ajustes_sap, tipo) {
    console.log("Datos seleccionados SAP:", guardar_ajustes_sap);
    console.log("Datos tipo", tipo);

    $.ajax({
        beforeSend: function () {

        },
        url: "guardar_ajustes_sire.php",
        type: "POST",
        data: { guardar_ajustes_sap, tipo },
        dataType: "json", // Asegura que la respuesta se maneje como JSON
        success: function (x) {
            console.log("Respuesta recibida:", x); // Para depurar la respuesta

            if (x.status === "success" && parseInt(x.message) === 1) {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Se guardó con éxito.",
                    icon: "success",
                    timer: 3000, // Se cerrará automáticamente en 3 segundos (3000ms)
                    showConfirmButton: false
                });

                setTimeout(() => {
                    $("#modalVerificarDatos").modal("hide");
                    $("#modalAjuste").modal("hide");
                }, 2800);
            } else {
                Swal.fire({
                    title: "Error",
                    text: x.message || "Hubo un problema al guardar los datos.",
                    icon: "error",
                    timer: 1000, // Se cerrará automáticamente en 3 segundos (3000ms)
                    showConfirmButton: false
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error en la solicitud.",
                icon: "error",
                timer: 1000, // Se cerrará automáticamente en 3 segundos (3000ms)
                showConfirmButton: false
            });
        },






    })
}

function reemplazara_prop() {
    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();

    $.ajax({
        beforeSend: function () {

        },
        url: "consulta_reemplazo_sire_ventas.php",
        type: "POST",
        dataType: "json",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            data_array = x.map(item => {
                const nroCPDocRellenado = item.NRO_CP ? item.NRO_CP.toString().padStart(10, '0') : "0000000000";  // Valor por defecto si no existe
                num = 1;
                if (item.DocRate == 0) {
                    tip = ''
                } else {
                    tip = parseFloat(item.DocRate).toFixed(3)
                }
                const concatenado = `${item.NRO_DOC_IDENTIDAD}${item.SERIE_CP}${nroCPDocRellenado}`;
                if (item.Indicator === "07" && item.DocDate2.split("/")[1] !== item.FecDocOr.split("/")[1]) {
                    return {
                        ruc: "20538271366",
                        razonSocial: "CORPORACION COINSA S.A.C.",
                        periodoDetalle: periodo,
                        carSunat: "",
                        fechaEmision: item.DocDate2,
                        fechaVctoPago: item.DocDueDate || "",
                        tipoCPDoc: item.Indicator,
                        serieCDP: item.SerieDoc,
                        nroCPDoc: item.CorrelativoDoc,
                        nroFinalRango: "",
                        tipoDocIdentidad: parseInt(item.TipoCli),
                        nroDocIdentidad: item.LicTradNum,
                        apellidosNombres: item.CardName,
                        valorFacturado: 0,
                        biGravado: parseFloat(0).toFixed(2),
                        descuento_bi: parseFloat(item.BaseImponible).toFixed(2),
                        igvIpmDG: parseFloat(0).toFixed(2),
                        descuento_igv: parseFloat(item.IGV).toFixed(2),
                        mtoExonerado: parseFloat(item.Exonerada).toFixed(2),
                        mtoInafecta: parseFloat(item.Inafecta).toFixed(2),
                        isc: item.ISC,
                        bi_grav_ivap: parseFloat(0).toFixed(2),
                        ivap: parseFloat(0).toFixed(2),
                        icbper: item.ICBPER,
                        otrosTributosCargos: item.OTR,
                        totalCP: parseFloat(item.DocTotal).toFixed(2),
                        moneda: item.Moneda,
                        tipoCambio: tip,
                        fechaEmisionDocModificado: item.FecDocOr || "",
                        tipoCPModificado: item.TipDocOr,
                        serieCPModificado: item.SerieDocOr,
                        nroCPModificado: item.CorrDocOr,
                        idProyectoOperadores: "",
                        tipoNota: "",
                        estadoComp: "1",
                        valorFob: item.FOB,
                        valorOp: 0,
                        tipoOperacion: "101",
                        Dam: "",
                        clu: "",
                        // CLUs vacíos, desde CLU1 a CLU39
                        clus: Array(39).fill("").join("|")
                    };
                } else {
                    return {
                        ruc: "20538271366",
                        razonSocial: "CORPORACION COINSA S.A.C.",
                        periodoDetalle: periodo,
                        carSunat: "",
                        fechaEmision: item.DocDate2,
                        fechaVctoPago: item.DocDueDate || "",
                        tipoCPDoc: item.Indicator,
                        serieCDP: item.SerieDoc,
                        nroCPDoc: item.CorrelativoDoc,
                        nroFinalRango: "",
                        tipoDocIdentidad: parseInt(item.TipoCli),
                        nroDocIdentidad: item.LicTradNum,
                        apellidosNombres: item.CardName,
                        valorFacturado: 0,
                        biGravado: parseFloat(item.BaseImponible).toFixed(2),
                        descuento_bi: parseFloat(item.DescuentoGlobal).toFixed(2),
                        igvIpmDG: parseFloat(item.IGV).toFixed(2),
                        descuento_igv: parseFloat(0).toFixed(2),
                        mtoExonerado: parseFloat(item.Exonerada).toFixed(2),
                        mtoInafecta: parseFloat(item.Inafecta).toFixed(2),
                        isc: item.ISC,
                        bi_grav_ivap: parseFloat(0).toFixed(2),
                        ivap: parseFloat(0).toFixed(2),
                        icbper: item.ICBPER,
                        otrosTributosCargos: item.OTR,
                        totalCP: parseFloat(item.DocTotal).toFixed(2),
                        moneda: item.Moneda,
                        tipoCambio: item.DocRate,
                        fechaEmisionDocModificado: item.FecDocOr || "",
                        tipoCPModificado: item.TipDocOr,
                        serieCPModificado: item.SerieDocOr,
                        nroCPModificado: item.CorrDocOr,
                        idProyectoOperadores: "",
                        tipoNota: "",
                        estadoComp: "1",
                        valorFob: item.FOB,
                        valorOp: 0,
                        tipoOperacion: "101",
                        Dam: "",
                        clu: "",
                        // CLUs vacíos, desde CLU1 a CLU39
                        clus: Array(39).fill("").join("|")
                    };
                }

            });

            // Crear el contenido del archivo TXT
            let contenido = "";

            // Recorrer el array de datos y construir el contenido del archivo
            data_array.forEach(item => {
                contenido += `${item.ruc}|${item.razonSocial}|${item.periodoDetalle}|${item.carSunat}|${item.fechaEmision}|${item.fechaVctoPago}|${item.tipoCPDoc}|${item.serieCDP}|${item.nroCPDoc}|${item.nroFinalRango}|${item.tipoDocIdentidad}|${item.nroDocIdentidad}|${item.apellidosNombres}|${item.valorFacturado}|${item.biGravado}|${item.descuento_bi}|${item.igvIpmDG}|${item.descuento_igv}|${item.mtoExonerado}|${item.mtoInafecta}|${item.isc}|${item.bi_grav_ivap}|${item.ivap}|${item.icbper}|${item.otrosTributosCargos}|${item.totalCP}|${item.moneda}|${item.tipoCambio}|${item.fechaEmisionDocModificado}|${item.tipoCPModificado}|${item.serieCPModificado}|${item.nroCPModificado}|${item.idProyectoOperadores}\n`;

            });
            console.log(contenido);

            // Crear un Blob con el contenido del archivo .txt
            let blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });

            // Crear el archivo ZIP
            let zip = new JSZip();
            //LE205382713662025020014040002
            // Agregar el archivo .txt al archivo ZIP
            zip.file("LE20538271366" + periodo + "00140400021112.txt", blob);

            // Generar el archivo ZIP y descargarlo
            zip.generateAsync({ type: "blob" }).then(function (content) {
                // Crear un enlace para descargar el archivo ZIP
                let link = document.createElement('a');

                // Establecer el nombre del archivo ZIP
                let nombreArchivoZip = "LE20538271366" + periodo + "00140400021112" + ".zip";
                link.href = URL.createObjectURL(content);
                link.download = nombreArchivoZip; // Asignar el nombre al archivo ZIP

                // Simular un clic para descargar el archivo ZIP
                link.click();
            });

            // Simular un clic para descargar el archivo
            link.click();
        }
    })
}






$(document).on("click", "#tabla_sap tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#procesar");

    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));

    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila(checkbox);
});

$(document).on("click", "#procesar", function (event) {
    // Detiene la propagación del clic del checkbox para evitar que se active dos veces
    event.stopPropagation();

    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila($(this));
});


function actualizarFila(checkbox) {
    var checkbox2 = $("#tabla_sap tbody tr").find("#procesar");
    var cant = checkbox2.closest("tr").find("#procesar:checked").length;

    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");
    }

    if (cant > 0) {
        $("#tomar-accion").removeClass("disabledTab");
        $("#tomar-accion").addClass("activeTab");
    } else {
        $("#tomar-accion").removeClass("activeTab");
        $("#tomar-accion").addClass("disabledTab");
    }
}


function tomar_accion() {
    $("#modal_total_confirmar").modal("show");

    resumenmonto()
}


function resumenmonto() {
    $(document).ready(function () {
        var montoF001 = 0.00;
        var montoFC01 = 0.00;

        $('#tabla_sap > tbody > tr').each(function () {
            if ($(this).find('#procesar').prop('checked')) {
                var tipo = $(this).find("td").eq(35).html();
                var montoFila = parseFloat($(this).find("td").eq(9).html());

                if (tipo.includes("F001")) {
                    montoF001 += montoFila;
                } else if (tipo === "FC01") {
                    montoFC01 += montoFila;
                }
            }
        });

        $("#monto").val(montoF001.toFixed(2));
        $("#monto_nc").val(montoFC01.toFixed(2));
    });
}




function conf_propuesta() {


    swal({
        title: "Desea Confirmar?",
        text: "Confirmacion de Propuesta",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("[name='procesar[]']:checked").each(function (key) {
                    var doc = $(this).parents("tr").find("td:eq(34)").text().trim();
                    var tipo_dato = $(this).parents("tr").find("td:eq(35)").text();


                    $.ajax({
                        beforeSend: function () { },
                        url: "actualizar_datos_propuesta_ventas.php",
                        type: "POST",
                        data:
                            "&doc=" +
                            doc +
                            "&tipo_dato=" +
                            tipo_dato
                        ,
                        success: function (data) {
                            $("#modal_total_confirmar").modal("hide");
                        },

                        error: function (jqXHR, estado, error) { },
                    });

                });

            } else {
                swal("No se confirmo");
            }

        });
}





function excluir_propuesta() {

    swal({
        title: "Desea Excluir?",
        text: "Excluir Propuesta",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {


                $("[name='procesar[]']:checked").each(function (key) {
                    var doc = $(this).parents("tr").find("td:eq(34)").text().trim();
                    var tipo_dato = $(this).parents("tr").find("td:eq(35)").text();




                    $.ajax({
                        beforeSend: function () { },
                        url: "actualizar_datos_excluir_ventas.php",
                        type: "POST",
                        data:
                            "&doc=" +
                            doc +
                            "&tipo_dato=" +
                            tipo_dato
                        ,
                        success: function (data) {
                            $("#modal_total_confirmar").modal("hide");
                        },

                        error: function (jqXHR, estado, error) { },
                    });

                });


            } else {
                swal("No se excluyo");
            }

        });


}



