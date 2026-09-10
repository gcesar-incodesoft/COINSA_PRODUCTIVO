function listas_precios() {

    $.ajax({
        beforeSend: function () {
            $("#lista_precio").html("Recuperando proveedores...");
        },
        url: 'Lista_Listas_precios.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#lista_precio").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) {
        }
    });

}

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
function listar_Familias() {
    $.ajax({
        beforeSend: function () {
            $("#lista_Familia").html("Recuperando proveedores...");
        },
        url: 'Lista_Familias.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#lista_Familia").html(x);
            $(".select2").select2();



        },
        error: function (jqXHR, estado, error) {
        }
    });
}
function lista_SubFamilia_Despacho() {

    $.ajax({
        beforeSend: function () {
            $("#lista_SubFamilia").html("Recuperando Sub Familia...");
        },
        url: 'Lista_SubFamilia_Despacho.php',
        type: 'POST',
        data: 'fami=' + $("#lista_Familia option:selected").val(),
        success: function (x) {
            $("#lista_SubFamilia").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) {
        }
    });

}

function busca_AuditoriaStock() {
    // fechai=$("#fi").val();
    // fechaf = $("#fecha").val();
    //almacen = $("#lista_Almacen option:selected").val();
    marca = $("#lista_Marca select").val().toString();
    fami = $("#lista_Familia option:selected").val();
    subfami = $("#lista_SubFamilia option:selected").val();
    lista_precio = $("#lista_precio select").val();

    if (lista_precio == "-1") {
        alertify.error('Seleccione Lista de Precio');
    } else {
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
                url: "Lista_precios_articulo.php",
                type: "POST",
                data: {
                    marca: marca, fami: fami, subfami, subfami, lista_precio: lista_precio
                },
                success: function (x) {

                    // Retrasar el cierre del Swal 1.5 segundos
                    setTimeout(() => {
                        swal.close();
                        $("#data").html(x);
                        // $('#tabla').DataTable();

                        $("#tabla").DataTable({
                            aoColumnDefs: [
                              { sType: "date-dmy", aTargets: [2] }, // en tal columna
                            ],
                            order: [[0, "desc"]],
                            pageLength: -1,
                            lengthMenu: [
                              [10, 20, 60, -1],
                              [10, 20, 60, "Todos"],
                            ],
                          });

                    }, 1500); // Retraso de 1.5 segundos
                },
                error: function (jqXHR, estado, error) {
                    // Maneja los errores aquí
                },
            });
            // $.post("Listar_AuditoriaStock.php", {fechai:fechai,fechaf:fechaf,almacen:almacen},
            // $.post("Lista_precios_articulo.php", { marca: marca, fami: fami, subfami, subfami, lista_precio: lista_precio },
            //     function (x) {
            //         $("#data").html(x);
            //         $('#tabla').DataTable();
            //     });
        }



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

function reg_datos() {
    $("#modal_procesar").modal("show");

}

function registrar_precios() {
    $("#modal_procesar").modal("hide");
    fecha = $("#fechapag").val();
    observacion = $("#comentario").val();
    swal({
        title: "Desea Registrar?",
        text: "Desea Registrar Datos!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            swal("Se ha registrado", {
                icon: "success",
                buttons: false,
                closeModal: true,
                timer: 2000,
            });
            $.ajax({
                beforeSend: function () { },
                url: "procesa_precio_cab.php",
                type: "POST",
                data: { fecha, observacion },
                success: function (x) {
                    global = parseInt(x);

                    if (global == 0) {
                        alertify.error("No Inserto");
                    } else {
                        registrar_precios_det(global);
                        migrar_sap(global);
                        busca_AuditoriaStock();
                    }
                },
                error: function (jqXHR, estado, error) {
                    $("#errores").html("Error... " + estado + "  " + error);
                },
            });
        } else {
            swal("No se ha Registrado");
        }
    });

}
function registrar_precios_det(docentry) {
    var descriArt = document.getElementById('descri_art');
    var uniMedida = document.getElementById('uni_medida');

    // Variables para asignar "Sí" si está marcado o "No" si no lo está
    var valorDescriArt = descriArt.checked ? "Y" : "N";
    var valorUniMedida = uniMedida.checked ? "Y" : "N";
    $('#tabla input[type="checkbox"]:checked').each(function (e) {
        codigo = $(this).closest("tr").children("td:eq(1)").text();
        precio = $(this).closest("tr").children("td:eq(6)").text();
        cod_lista = $(this).closest("tr").children("td:eq(8)").text();
        nuevo_precio = $(this).closest("tr").find("#cantidad_item").val();
        $.ajax({
            beforeSend: function () { },
            url: "procesa_precio_det.php",
            type: "POST",
            data:
                { docentry, codigo, precio, cod_lista, nuevo_precio, valorDescriArt, valorUniMedida },
            success: function (x) {

            },
            error: function (jqXHR, estado, error) {
                $("#errores").html("Error... " + estado + "  " + error);
            },
        });
        //line.push(codigo);
    });
}

function migrar_sap(docentry) {
    $.ajax({
        beforeSend: function () { },
        url: "insertar_cola_service_cotizacion.php",
        type: "POST",
        data: { docentry: docentry, tipo_doc: '11', objtype: '23' },
        success: function (x) {

        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
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