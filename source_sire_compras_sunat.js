function lista_periodo_sap() {
    $.ajax({
        beforeSend: function () {
            $("#periodo").html("Cargando los clientes...");
        },
        url: "pone_periodo_compras_sap.php",
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

function consultar_periodo_sire() {
    periodo = $("#periodo select").val();
    consulta_propuesta_sap();
    consulta_propuesta_excluidos();
    consulta_propuesta_sire()
    consultar_no_domicilados_sire();
    $('#tabComprobantesSIRE').hide(); // Ocultar la pestaña en el nav
    $('#Tab3').removeClass('active'); // Quitar la clase active del tab correspondiente
    $('#validar-sunat').show();
    $('#reemplazaBtn').show();
    $('#reemplazaBtnND').show();
    // Activar la primera pestaña (Comprobantes SIRE)
    // $('#Tab1').addClass('active'); // Hacer visible el contenido del primer tab
    // $('a[href="#Tab1"]').parent().addClass('active'); // Activar la pestaña "Comprobantes SIRE"
    // insertar_cola_migracion_sire(periodo,4,'C');
    // insertar_cola_migracion_sire(periodo,5,'C');
    // insertar_cola_migracion_sire(periodo,6,'C');
}

// function modal_carga() {
//     swal({
//         title: "Consultando a SUNAT",
//         text: "Por favor, espere mientras procesamos los datos.",
//         content: {
//             element: "div",
//             attributes: {
//                 innerHTML: `
//                     <div style="text-align: center; margin-bottom: 10px;">
//                         <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 75px;">
//                     </div>
//                     <div style="width: 100%; height: 25px; background-color: #e0e0e0; border-radius: 5px; margin-top: 20px;">
//                         <div id="progress-bar" style="width: 0%; height: 100%; background-color: #007BFF; border-radius: 5px; transition: width 0.2s ease;"></div>
//                     </div>
//                     <div id="progress-text" style="text-align: center; margin-top: 10px;">0%</div>
//                 `
//             }
//         },
//         showConfirmButton: false,
//         allowOutsideClick: false
//     });

//     let progress = 0; // Reinicia el progreso cada vez que se llama
//     const progressBar = document.getElementById("progress-bar");
//     const progressText = document.getElementById("progress-text");

//     // Detener cualquier intervalo existente antes de iniciar uno nuevo
//     if (window.progressInterval) {
//         clearInterval(window.progressInterval);
//     }

//     // Simular progreso uniforme
//     window.progressInterval = setInterval(() => {
//         if (progress < 90) {
//             progress += 2; // Incrementa uniformemente hasta el 90%
//         } else if (progress < 100) {
//             progress += 1; // Incremento lento entre 90% y 100%
//         }
//         progress = Math.min(progress, 100); // Asegura que no pase del 100%
//         progressBar.style.width = `${progress}%`;
//         progressText.innerText = `${Math.floor(progress)}%`;

//         // Si llega al 100%, detener el intervalo
//         if (progress >= 100) {
//             clearInterval(window.progressInterval);
//         }
//     }, 100); // Actualiza cada 100 ms para una carga fluida

//     return window.progressInterval; // Retorna el intervalo para controlarlo
// }
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


function consulta_propuesta_sire() {
    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    let interval;
    let progress = 0;

    $.ajax({
        beforeSend: function () {
            progress = 0; // ✅ Asegurar que progress comienza en 0
            interval = modal_carga(); // ✅ Inicia el modal de carga y guarda el intervalo
            this.startTime = new Date().getTime(); // ✅ Marca el tiempo de inicio
        },
        url: "lista_propuesta_periodo_compras_sire.php",
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
        url: "lista_propuesta_periodo_compras_sap.php",
        type: "POST",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            // Este código se ejecuta después de la solicitud AJAX con éxito
            $("#lista_propuesta_sap").html(x);
            $("#tabla_sap").DataTable({
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
function consultar_no_domicilados_sire() {

    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    $.ajax({
        beforeSend: function () {

        },
        url: "lista_propuesta_periodo_compras_nodomici_sap.php",
        type: "POST",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            // Este código se ejecuta después de la solicitud AJAX con éxito
            $("#lista_propuesta_nodomiciliado").html(x);
            $("#tabla_sap_nodomici").DataTable({
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
                    timer: 30000  // Se cierra después de 30 segundos
                })
                setTimeout(() => {
                    consultar_periodo_sire();
                }, 30000);

                // swal.close(); 
                //   swal("Debe esperar 1 min para actualizar", {
                //     icon: "success",
                //   });
                insertar_cola_migracion_sire(periodo, 4, 'C');
                insertar_cola_migracion_sire(periodo, 5, 'C');
                insertar_cola_migracion_sire(periodo, 6, 'C');
            } else {
                swal("Cancelado!");
            }
        });

}

function consulta_propuesta_excluidos() {

    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    $.ajax({
        beforeSend: function () {

        },
        url: "lista_propuesta_periodo_compras_excluidos.php",
        type: "POST",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            // Este código se ejecuta después de la solicitud AJAX con éxito
            $("#lista_propuesta_excluidos").html(x);
            $("#tabla_sap_exclu").DataTable({
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

function validarSunat() {
    $('#tabComprobantesSIRE').show();  // Hacer visible la nueva pestaña
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
        url: "lista_validacion_sunat_compras.php",
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
            $("#lista_propuesta_sire").html("Hubo un error: " + estado + " " + error);
        },
    });
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
        url: "lista_ajustes_valida_compras_fact.php",
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
                language: {
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
        url: "lista_ajustes_valida_compras_sunat.php",
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
                language: {
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
    actualizarResumensap(); // Llamamos a la función para actualizar el resumen

    // Obtén el valor del código (si es necesario)
    let codigo = $(this).children("td:eq(1)").text();
    console.log("Código seleccionado:", codigo);
});
function actualizarResumensap() {
    let subtotalPEN = 0, impuestoPEN = 0, totalPEN = 0;
    let subtotalUSD = 0, impuestoUSD = 0, totalUSD = 0;
    console.log('entro check');

    // Recorre todos los checkboxes marcados y suma sus valores según la moneda
    $("#tabla_ajuste_sap tbody tr").each(function () {
        var checkbox = $(this).find("#check-sap");
        if (checkbox.prop("checked")) {
            let moneda = $(this).find("td:eq(5)").text().trim(); // Columna de MONEDA
            let subtotal = parseFloat($(this).find("td:eq(6)").text()) || 0;
            let impuesto = parseFloat($(this).find("td:eq(7)").text()) || 0;
            let total = parseFloat($(this).find("td:eq(8)").text()) || 0;

            if (moneda === "SOL") {
                subtotalPEN += subtotal;
                impuestoPEN += impuesto;
                totalPEN += total;
            } else if (moneda === "USD") {
                subtotalUSD += subtotal;
                impuestoUSD += impuesto;
                totalUSD += total;
            }
        }
    });

    // Construimos el HTML solo si hay valores seleccionados
    let resumenHTML = "";

    if (subtotalPEN > 0 || impuestoPEN > 0 || totalPEN > 0) {
        resumenHTML += `
            <table class='table table-bordered' style='margin-top: 10px;'>
                <thead>
                    <tr><th colspan="3" style='text-align: center; background: #d4edda;'>RESUMEN (PEN)</th></tr>
                    <tr>
                        <th style='text-align: center;'>SUBTOTAL</th>
                        <th style='text-align: center;'>IMPUESTO</th>
                        <th style='text-align: center;'>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align: center; font-weight: bold;'>${subtotalPEN.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${impuestoPEN.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${totalPEN.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    if (subtotalUSD > 0 || impuestoUSD > 0 || totalUSD > 0) {
        resumenHTML += `
            <table class='table table-bordered' style='margin-top: 10px;'>
                <thead>
                    <tr><th colspan="3" style='text-align: center; background: #cce5ff;'>RESUMEN (USD)</th></tr>
                    <tr>
                        <th style='text-align: center;'>SUBTOTAL</th>
                        <th style='text-align: center;'>IMPUESTO</th>
                        <th style='text-align: center;'>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align: center; font-weight: bold;'>${subtotalUSD.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${impuestoUSD.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${totalUSD.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    // Actualiza el div de resumen
    $("#resumen-ajuste_sap").html(resumenHTML);
    console.log(resumenHTML);

}

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
    actualizarResumen(); // Llamamos a la función para actualizar el resumen

    // Obtén el valor del código (si es necesario)
    let codigo = $(this).children("td:eq(1)").text();
    console.log("Código seleccionado:", codigo);
});

function actualizarResumen() {

    let subtotalPEN = 0, impuestoPEN = 0, totalPEN = 0;
    let subtotalUSD = 0, impuestoUSD = 0, totalUSD = 0;

    // Recorre todos los checkboxes marcados y suma sus valores según la moneda
    $("#tabla_ajuste_sunat tbody tr").each(function () {
        var checkbox = $(this).find("#check-sunat");
        if (checkbox.prop("checked")) {
            let moneda = $(this).find("td:eq(5)").text().trim(); // Columna de MONEDA
            let subtotal = parseFloat($(this).find("td:eq(6)").text()) || 0;
            let impuesto = parseFloat($(this).find("td:eq(7)").text()) || 0;
            let total = parseFloat($(this).find("td:eq(8)").text()) || 0;

            if (moneda === "PEN") {
                subtotalPEN += subtotal;
                impuestoPEN += impuesto;
                totalPEN += total;
            } else if (moneda === "USD") {
                subtotalUSD += subtotal;
                impuestoUSD += impuesto;
                totalUSD += total;
            }
        }
    });

    // Construimos el HTML solo si hay valores seleccionados
    let resumenHTML = "";

    if (subtotalPEN > 0 || impuestoPEN > 0 || totalPEN > 0) {
        resumenHTML += `
            <table class='table table-bordered' style='margin-top: 10px;'>
                <thead>
                    <tr><th colspan="3" style='text-align: center; background: #d4edda;'>RESUMEN (PEN)</th></tr>
                    <tr>
                        <th style='text-align: center;'>SUBTOTAL</th>
                        <th style='text-align: center;'>IMPUESTO</th>
                        <th style='text-align: center;'>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align: center; font-weight: bold;'>${subtotalPEN.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${impuestoPEN.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${totalPEN.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    if (subtotalUSD > 0 || impuestoUSD > 0 || totalUSD > 0) {
        resumenHTML += `
            <table class='table table-bordered' style='margin-top: 10px;'>
                <thead>
                    <tr><th colspan="3" style='text-align: center; background: #cce5ff;'>RESUMEN (USD)</th></tr>
                    <tr>
                        <th style='text-align: center;'>SUBTOTAL</th>
                        <th style='text-align: center;'>IMPUESTO</th>
                        <th style='text-align: center;'>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align: center; font-weight: bold;'>${subtotalUSD.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${impuestoUSD.toFixed(2)}</td>
                        <td style='text-align: center; font-weight: bold;'>${totalUSD.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    // Actualiza el div de resumen
    $("#resumen-ajuste").html(resumenHTML);
    console.log(resumenHTML);

}
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
                if (tipo === 2) {
                    generar_txt_eliminar(x.docentry);
                } else {
                    generar_txt_agregar(x.docentry)
                }
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

function generar_txt_eliminar(docentry) {
    console.log(docentry);

    let data_array = [];  // Suponiendo que los datos ya están disponibles, como en tu código anterior.

    $.ajax({
        url: 'consulta_agregar_sire_compras.php',
        type: 'POST',
        data: { tipo: '2', docentry },
        dataType: "json",
        success: function (x) {
            // Mapea el resultado para construir el archivo TXT
            let num = 0
            let periodo_new = '';
            data_array = x.map(item => {
                const nroCPDocRellenado = item.NRO_CP ? item.NRO_CP.toString().padStart(10, '0') : "0000000000";  // Valor por defecto si no existe
                num = parseInt(item.NUM) + 4;
                periodo_new = item.PERIODO;
                const concatenado = `${item.NRO_DOC_IDENTIDAD}0${item.TIPO_CP}${item.SERIE_CP}${nroCPDocRellenado}`;
                return {
                    ruc: "",
                    razonSocial: "",
                    periodoDetalle: "",
                    carSunat: concatenado || "",
                    fechaEmision: "",
                    fechaVctoPago: "",
                    tipoCPDoc: "",
                    serieCDP: "",
                    anioX: "",
                    nroCPDoc: "",
                    nroFinalRango: "",
                    tipoDocIdentidad: "",
                    nroDocIdentidad: "",
                    apellidosNombres: "",
                    biGravadoDG: "",
                    igvIpmDG: "",
                    biGravadoDGNG: "",
                    igvIpmDGNG: "",
                    biGravadoDNG: "",
                    igvIpmDNG: "",
                    valorAdqNG: "",
                    isc: "",
                    icbper: "",
                    otrosTributosCargos: "",
                    totalCP: "",
                    moneda: "",
                    tipoCambio: "",
                    fechaEmisionDocModificado: "",
                    tipoCPModificado: "",
                    serieCPModificado: "",
                    codDamODsi: "",
                    nroCPModificado: "",
                    clasifBssSSS: "",
                    idProyectoOperadores: "",
                    porcPart: "",
                    imb: "",
                    carOrigIndEoI: "1",
                    detraccion: "",
                    tipoNota: "",
                    estComp: "",
                    incal: "",
                    // CLUs vacíos, desde CLU1 a CLU39
                    clus: Array(39).fill("").join("|")
                };
            });

            // Crear el contenido del archivo TXT
            let contenido = "";

            // Recorrer el array de datos y construir el contenido del archivo
            data_array.forEach(item => {
                contenido += `${item.ruc}|${item.razonSocial}|${item.periodoDetalle}|${item.carSunat}|${item.fechaEmision}|${item.fechaVctoPago}|${item.tipoCPDoc}|${item.serieCDP}|${item.anioX}|${item.nroCPDoc}|${item.nroFinalRango}|${item.tipoDocIdentidad}|${item.nroDocIdentidad}|${item.apellidosNombres}|${item.biGravadoDG}|${item.igvIpmDG}|${item.biGravadoDGNG}|${item.igvIpmDGNG}|${item.biGravadoDNG}|${item.igvIpmDNG}|${item.valorAdqNG}|${item.isc}|${item.icbper}|${item.otrosTributosCargos}|${item.totalCP}|${item.moneda}|${item.tipoCambio}|${item.fechaEmisionDocModificado}|${item.tipoCPModificado}|${item.serieCPModificado}|${item.codDamODsi}|${item.nroCPModificado}|${item.clasifBssSSS}|${item.idProyectoOperadores}|${item.porcPart}|${item.imb}|${item.carOrigIndEoI}|${item.detraccion}|${item.tipoNota}|${item.estComp}|${item.incal}|${item.clus}\n`;
            });
            console.log(contenido);
            // Crear un Blob con el contenido
            // Crear un Blob con el contenido del archivo .txt
            let blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });

            // Crear el archivo ZIP
            let zip = new JSZip();

            // Agregar el archivo .txt al archivo ZIP
            zip.file("20538271366-RCEINEX-" + periodo_new + "-" + num + ".txt", blob);

            // Generar el archivo ZIP y descargarlo
            zip.generateAsync({ type: "blob" }).then(function (content) {
                // Crear un enlace para descargar el archivo ZIP
                let link = document.createElement('a');

                // Establecer el nombre del archivo ZIP
                let nombreArchivoZip = "20538271366-RCEINEX-" + periodo_new + "-" + num + ".zip";
                link.href = URL.createObjectURL(content);
                link.download = nombreArchivoZip; // Asignar el nombre al archivo ZIP

                // Simular un clic para descargar el archivo ZIP
                link.click();
            });
        },
        error: function (jqXHR, estado, error) {
            console.log("Error en la solicitud AJAX: " + error);
        }
    });
}

function generar_txt_agregar(docentry) {
    let data_array = [];  // Suponiendo que los datos ya están disponibles, como en tu código anterior.

    $.ajax({
        url: 'consulta_agregar_sire_compras.php',
        type: 'POST',
        data: { tipo: '1', docentry },
        dataType: "json",
        success: function (x) {
            // Mapea el resultado para construir el archivo TXT
            let num = 0
            let periodo_new = '';
            data_array = x.map(item => {
                const nroCPDocRellenado = item.NRO_CP ? item.NRO_CP.toString().padStart(10, '0') : "0000000000";  // Valor por defecto si no existe
                num = parseInt(item.NUM) + 7;
                periodo_new = item.PERIODO;
                const concatenado = `${item.NRO_DOC_IDENTIDAD}${item.SERIE_CP}${nroCPDocRellenado}`;
                return {
                    ruc: item.RUC || "20538271366",
                    razonSocial: item.RAZON_SOCIAL,
                    periodoDetalle: item.PERIODO,
                    carSunat: "",
                    fechaEmision: item.FECHA_EMISION_PAS,
                    fechaVctoPago: item.FECHA_VENCIMIENTO_PAS || "",
                    tipoCPDoc: item.TIPO_CP,
                    serieCDP: item.SERIE_CP,
                    anioX: item.ANIO,
                    nroCPDoc: item.NRO_CP,
                    nroFinalRango: item.NRO_FINAL,
                    tipoDocIdentidad: parseInt(item.TIPO_DOC_IDENTIDAD),
                    nroDocIdentidad: item.NRO_DOC_IDENTIDAD,
                    apellidosNombres: item.NOMBRE_CLIENTE,
                    biGravadoDG: parseFloat(item.BI_GRAVADA_DG).toFixed(2),
                    igvIpmDG: parseFloat(item.IGV_IPM_DG).toFixed(2),
                    biGravadoDGNG: item.BI_GRAVADA_DGNG,
                    igvIpmDGNG: item.IGV_IPM_DGNG,
                    biGravadoDNG: item.BI_GRAVADA_DNG,
                    igvIpmDNG: item.IGV_IPM_DNG || 0,
                    valorAdqNG: item.VALOR_ADQUIRIDO_NG,
                    isc: item.ISC,
                    icbper: item.ICBPER,
                    otrosTributosCargos: item.OTROS_TRIBUTOS,
                    totalCP: parseFloat(item.TOTAL_CP).toFixed(2),
                    moneda: item.MONEDA,
                    tipoCambio: "",
                    fechaEmisionDocModificado: item.FECHA_EMISION_MOD || "",
                    tipoCPModificado: item.TIPO_CP_MOD,
                    serieCPModificado: item.SERIE_CP_MOD,
                    codDamODsi: item.COD_DAM_DSI,
                    nroCPModificado: item.NRO_CP_MOD,
                    clasifBssSSS: item.CLAS_BSS || "",
                    idProyectoOperadores: item.ID_PROYECTO,
                    porcPart: item.PORC_PART,
                    imb: item.IMB,
                    carOrigIndEoI: item.CAR_ORI,
                    detraccion: item.DETRACCION,
                    tipoNota: item.TIPO_NOTA,
                    estComp: "",
                    incal: "",
                    // CLUs vacíos, desde CLU1 a CLU39
                    clus: Array(39).fill("").join("|")
                };
            });

            // Crear el contenido del archivo TXT
            let contenido = "";

            // Recorrer el array de datos y construir el contenido del archivo
            data_array.forEach(item => {
                contenido += `${item.ruc}|${item.razonSocial}|${item.periodoDetalle}|${item.carSunat}|${item.fechaEmision}|${item.fechaVctoPago}|${item.tipoCPDoc}|${item.serieCDP}|${item.anioX}|${item.nroCPDoc}|${item.nroFinalRango}|${item.tipoDocIdentidad}|${item.nroDocIdentidad}|${item.apellidosNombres}|${item.biGravadoDG}|${item.igvIpmDG}|${item.biGravadoDGNG}|${item.igvIpmDGNG}|${item.biGravadoDNG}|${item.igvIpmDNG}|${item.valorAdqNG}|${item.isc}|${item.icbper}|${item.otrosTributosCargos}|${item.totalCP}|${item.moneda}|${item.tipoCambio}|${item.fechaEmisionDocModificado}|${item.tipoCPModificado}|${item.serieCPModificado}|${item.codDamODsi}|${item.nroCPModificado}|${item.clasifBssSSS}|${item.idProyectoOperadores}|${item.porcPart}|${item.imb}|${item.carOrigIndEoI}|${item.detraccion}|${item.tipoNota}|${item.estComp}|${item.incal}|${item.clus}\n`;
            });
            console.log(contenido);

            // Crear un Blob con el contenido del archivo .txt
            let blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });

            // Crear el archivo ZIP
            let zip = new JSZip();

            // Agregar el archivo .txt al archivo ZIP
            zip.file("20538271366-CP-" + periodo_new + "-" + num + ".txt", blob);

            // Generar el archivo ZIP y descargarlo
            zip.generateAsync({ type: "blob" }).then(function (content) {
                // Crear un enlace para descargar el archivo ZIP
                let link = document.createElement('a');

                // Establecer el nombre del archivo ZIP
                let nombreArchivoZip = "20538271366-CP-" + periodo_new + "-" + num + ".zip";
                link.href = URL.createObjectURL(content);
                link.download = nombreArchivoZip; // Asignar el nombre al archivo ZIP

                // Simular un clic para descargar el archivo ZIP
                link.click();
            });

            // Simular un clic para descargar el archivo
            link.click();
        },
        error: function (jqXHR, estado, error) {
            console.log("Error en la solicitud AJAX: " + error);
        }
    });
}

function reemplazara_prop() {
    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();
    tip = ''
    $.ajax({
        beforeSend: function () {

        },
        url: "consulta_reemplazo_sire_compras.php",
        type: "POST",
        dataType: "json",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            data_array = x.map(item => {
                const nroCPDocRellenado = item.NRO_CP ? item.NRO_CP.toString().padStart(10, '0') : "0000000000";  // Valor por defecto si no existe
                num = 1;
                periodo_new = item.PERIODO;
                if (item.TC == 0) {
                    tip = ''
                } else {
                    tip = parseFloat(item.TC).toFixed(3)
                }
                console.log(tip);

                const concatenado = `${item.NRO_DOC_IDENTIDAD}${item.SERIE_CP}${nroCPDocRellenado}`;
                return {
                    ruc: "20538271366",
                    razonSocial: item.RAZON_SOCIAL || "CORPORACION COINSA S.A.C.",
                    periodoDetalle: periodo,
                    carSunat: "",
                    fechaEmision: item.FECHA_EMISION_PAS,
                    fechaVctoPago: item.FECHA_VENCIMIENTO_PAS || "",
                    tipoCPDoc: item.NUMERO_CP,
                    serieCDP: item.SERIE_CP,
                    anioX: item.Year_1,
                    nroCPDoc: item.Correlativo,
                    nroFinalRango: item.NRO_FINAL || "",
                    tipoDocIdentidad: parseInt(item.TipoSN),
                    nroDocIdentidad: item.RUC,
                    apellidosNombres: item.CardName,
                    biGravadoDG: parseFloat(item.BaseImponible).toFixed(2),
                    igvIpmDG: parseFloat(item.IGV).toFixed(2),
                    biGravadoDGNG: item.BI_GRAVADA_DGNG || 0,
                    igvIpmDGNG: item.IGV_IPM_DGNG || 0,
                    biGravadoDNG: item.BI_GRAVADA_DNG || 0,
                    igvIpmDNG: item.IGV_IPM_DNG || 0,
                    valorAdqNG: item.NoGravada,
                    isc: parseFloat(item.ISC).toFixed(2),
                    icbper: parseFloat(item.ICBPER).toFixed(2),
                    otrosTributosCargos: item.Otro,
                    totalCP: parseFloat(item.DocTotal).toFixed(2),
                    moneda: item.Moneda,
                    tipoCambio: tip,
                    fechaEmisionDocModificado: item.FECHA_EMISION_MOD || "",
                    tipoCPModificado: item.TipDocOr,
                    serieCPModificado: item.SerDocOr,
                    codDamODsi: item.COD_DAM_DSI || "",
                    nroCPModificado: item.CorrDocOr,
                    clasifBssSSS: item.CLAS_BSS || "",
                    idProyectoOperadores: item.ID_PROYECTO || "",
                    porcPart: item.PORC_PART || "",
                    imb: item.IMB || "0",
                    carOrigIndEoI: item.CAR_ORI || "",
                    detraccion: "",
                    tipoNota: item.TIPO_NOTA || "",
                    estComp: "",
                    incal: "",
                    // CLUs vacíos, desde CLU1 a CLU39
                    clus: Array(39).fill("").join("|")
                };
            });

            // Crear el contenido del archivo TXT
            let contenido = "";

            // Recorrer el array de datos y construir el contenido del archivo
            data_array.forEach(item => {
                contenido += `${item.ruc}|${item.razonSocial}|${item.periodoDetalle}|${item.carSunat}|${item.fechaEmision}|${item.fechaVctoPago}|${item.tipoCPDoc}|${item.serieCDP}|${item.anioX}|${item.nroCPDoc}|${item.nroFinalRango}|${item.tipoDocIdentidad}|${item.nroDocIdentidad}|${item.apellidosNombres}|${item.biGravadoDG}|${item.igvIpmDG}|${item.biGravadoDGNG}|${item.igvIpmDGNG}|${item.biGravadoDNG}|${item.igvIpmDNG}|${item.valorAdqNG}|${item.isc}|${item.icbper}|${item.otrosTributosCargos}|${item.totalCP}|${item.moneda}|${item.tipoCambio}|${item.fechaEmisionDocModificado}|${item.tipoCPModificado}|${item.serieCPModificado}|${item.codDamODsi}|${item.nroCPModificado}|${item.clasifBssSSS}|${item.idProyectoOperadores}|${item.porcPart}|${item.imb}|${item.carOrigIndEoI}|${item.detraccion}|${item.tipoNota}|${item.estComp}|${item.incal}|${item.clus}\n`;
            });
            console.log(contenido);

            // Crear un Blob con el contenido del archivo .txt
            let blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });

            // Crear el archivo ZIP
            let zip = new JSZip();

            // Agregar el archivo .txt al archivo ZIP
            zip.file("LE20538271366" + periodo + "00080400021112.txt", blob);

            // Generar el archivo ZIP y descargarlo
            zip.generateAsync({ type: "blob" }).then(function (content) {
                // Crear un enlace para descargar el archivo ZIP
                let link = document.createElement('a');

                // Establecer el nombre del archivo ZIP
                let nombreArchivoZip = "LE20538271366" + periodo + "00080400021112" + ".zip";
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
function reemplazara_prop_nd() {
    periodo = $("#periodo select").val();
    fec_ini = $("#fec_ini").val();
    fec_fin = $("#fec_fin").val();

    $.ajax({
        beforeSend: function () {

        },
        url: "consulta_reemplazo_sire_compras_nd.php",
        type: "POST",
        dataType: "json",
        data: { periodo, fec_ini, fec_fin },
        success: function (x) {
            data_array = x.map(item => {
                const nroCPDocRellenado = item.NRO_CP ? item.NRO_CP.toString().padStart(10, '0') : "0000000000";  // Valor por defecto si no existe
                num = 1;
                periodo_new = item.PERIODO;
                const concatenado = `${item.NRO_DOC_IDENTIDAD}${item.SERIE_CP}${nroCPDocRellenado}`;
                return {
                    ruc: item.RUC || "20538271366",
                    razonSocial: item.RAZON_SOCIAL,
                    periodoDetalle: periodo,
                    carSunat: "",
                    fechaEmision: item.FECHA_EMISION_PAS,
                    fechaVctoPago: item.FECHA_VENCIMIENTO_PAS || "",
                    tipoCPDoc: item.TIPO_CP,
                    serieCDP: item.SERIE_CP,
                    serieDua: item.folio_dua,
                    cardcode_dua: item.cardcode_dua,
                    anioX: "2025",
                    nroCPDoc: item.NRO_CP,
                    nroCPDUA: item.nro_dua || "",
                    retencionIGV: item.RENTENCION_IGV_FIS || "",
                    nroFinalRango: item.NRO_FINAL,
                    tipoDocIdentidad: parseInt(item.TIPO_DOC_IDENTIDAD),
                    nroDocIdentidad: item.NRO_DOC_IDENTIDAD,
                    apellidosNombres: item.NOMBRE_CLIENTE,
                    biGravadoDG: parseFloat(item.BI_GRAVADA_DG).toFixed(2),
                    igvIpmDG: parseFloat(item.IGV_IPM_DG).toFixed(2),
                    biGravadoDGNG: item.BI_GRAVADA_DGNG,
                    igvIpmDGNG: item.IGV_IPM_DGNG,
                    biGravadoDNG: item.BI_GRAVADA_DNG,
                    igvIpmDNG: item.IGV_IPM_DNG || 0,
                    valorAdqNG: parseFloat(item.VALOR_ADQUIRIDO_NG).toFixed(2),
                    isc: parseFloat(item.ISC).toFixed(2),
                    icbper: parseFloat(item.ICBPER).toFixed(2),
                    otrosTributosCargos: item.OTROS_TRIBUTOS,
                    totalCP: parseFloat(item.TOTAL_CP).toFixed(2),
                    moneda: item.MONEDA,
                    tipoCambio: item.TIPO_CAMBIO,
                    fechaEmisionDocModificado: item.FECHA_EMISION_MOD || "",
                    tipoCPModificado: item.TIPO_CP_MOD,
                    serieCPModificado: item.SERIE_CP_MOD,
                    codDamODsi: item.COD_DAM_DSI,
                    nroCPModificado: item.NRO_CP_MOD,
                    clasifBssSSS: item.CLAS_BSS || "",
                    idProyectoOperadores: item.ID_PROYECTO,
                    porcPart: item.PORC_PART,
                    imb: item.IMB,
                    carOrigIndEoI: item.CAR_ORI,
                    detraccion: item.DETRACCION,
                    tipoNota: item.TIPO_NOTA,
                    estComp: "",
                    domiExtranjero: "",
                    incal: "",
                    pais: item.Pais,
                    eviDobleImpo: "00",
                    tipoRente: "00",
                    // CLUs vacíos, desde CLU1 a CLU39
                    clus: Array(10).fill("").join("|")
                };
            });

            // Crear el contenido del archivo TXT
            let contenido = "";

            // Recorrer el array de datos y construir el contenido del archivo
            data_array.forEach(item => {
                contenido += `${periodo}|${item.carSunat}|${item.fechaEmision}|${item.tipoCPDoc}|${""}|${item.nroCPDoc}|${item.valorAdqNG}|${item.otrosTributosCargos}|${item.totalCP}|${51}|${item.serieDua}|${item.anioX}|${item.nroCPDUA}|${item.retencionIGV}|${item.moneda}|${item.tipoCambio}|${item.pais}|${item.apellidosNombres}|${item.domiExtranjero}|${item.cardcode_dua}|${item.domiExtranjero}|${item.apellidosNombres}|${item.domiExtranjero}|${item.domiExtranjero}|${item.domiExtranjero}|${item.domiExtranjero}|${item.domiExtranjero}|${item.domiExtranjero}|${item.domiExtranjero}|${item.eviDobleImpo}|${item.domiExtranjero}|${item.tipoRente}|${item.domiExtranjero}|${item.domiExtranjero}|${item.domiExtranjero}\n`;
            });
            console.log(contenido);

            // Crear un Blob con el contenido del archivo .txt
            let blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });

            // Crear el archivo ZIP
            let zip = new JSZip();

            // Agregar el archivo .txt al archivo ZIP
            zip.file("LE20538271366" + periodo + "00080500001112.txt", blob);

            // Generar el archivo ZIP y descargarlo
            zip.generateAsync({ type: "blob" }).then(function (content) {
                // Crear un enlace para descargar el archivo ZIP
                let link = document.createElement('a');

                // Establecer el nombre del archivo ZIP
                let nombreArchivoZip = "LE20538271366" + periodo + "00080500001112" + ".zip";
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

        var monto = 0.00;

        $('#tabla_sap > tbody > tr').each(function () {
            if ($(this).find('#procesar').prop('checked')) {
                monto += parseFloat($(this).find("td").eq(8).html());

            }
        });
        //console.log(monto);
        $("#monto").val(monto.toFixed(2))
    })
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
                    var docnum2 = $(this).parents("tr").find("td:eq(43)").text().trim();
                    var docnum = docnum2.split("-")[1];
                    var tipo_dato = $(this).parents("tr").find("td:eq(44)").text();
                    var tipo = 'FT';

                    console.log(docnum);

                    // if (tipo_dato = '01 - Factura') {
                    //     tipo = 'FT';
                    // } else {
                    //     tipo = 'O';
                    // }


                    $.ajax({
                        beforeSend: function () { },
                        url: "actualizar_datos_propuesta.php",
                        type: "POST",
                        data:
                            "&docnum=" +
                            docnum +
                            "&tipo=" +
                            tipo
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
                    var docnum2 = $(this).parents("tr").find("td:eq(43)").text().trim();
                    var docnum = docnum2.split("-")[1];
                    var tipo_dato = $(this).parents("tr").find("td:eq(44)").text();
                    var tipo = 'FT';

            

                    // if (tipo_dato = '01 - Factura') {
                    //     tipo = 'FT';
                    // } else {
                    //     tipo = 'O';
                    // }



                    $.ajax({
                        beforeSend: function () { },
                        url: "actualizar_datos_excluir.php",
                        type: "POST",
                        data:
                            "&docnum=" +
                            docnum +
                            "&tipo=" +
                            tipo
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