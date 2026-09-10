
function busca_lista_kardex() {
    var fec_inicio = $("#f_inicio").val();
    if (fec_inicio === "") {
        fec_inicio = "01-01-2024";
    } else {
        fec_inicio = $("#f_inicio").val();
    }
    var fec_fin = $("#f_fin").val();
    // var marca = $("#lista_marca option:selected").val();
    var almacen = $("#lista_almacen option:selected").val();
    var cod_producto = $("#cod_producto").val();
    bandera = true;
    if (almacen === '00') {
        alertify.error('Seleccione un Almacen');
        bandera = false;
        return
    }
    if (cod_producto === '') {
        alertify.error('Falta Codigo');
        bandera = false;
        return
    }
    if (bandera === true) {


        $.ajax({
            beforeSend: function () {
                // $("#lista_kardex").html("Recuperando Lista ...");
                // $("#lista_kardex").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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

            url: "Listar_Reporte_Mov_Kardex_v2.php",
            type: "POST",
            data: {
                fec_inicio: fec_inicio,
                fec_fin: fec_fin,
                almacen: almacen,
                // marca: marca,
                cod_producto: cod_producto
            },
            success: function (x) {

                // Retrasar el cierre del Swal 1.5 segundos
                setTimeout(() => {
                    swal.close();
                    $("#lista_kardex").html(x);
                    $.fn.dataTable.ext.type.order['date-dd-mm-yyyy-pre'] = function (d) {
                        var parts = d.split('-');
                        return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
                    };

                    $('table[id^="tabla_kardex_"]').each(function () {
                        $(this).DataTable({
                            dom: '<"top"lBf>rt<"bottom"ip>',
                            buttons: [
                                {
                                    extend: 'copy',
                                    text: '<i class="fas fa-copy"></i> Copiar',
                                    titleAttr: 'Copiar',
                                    className: 'btn btn-copy'
                                },
                                {
                                    extend: 'csv',
                                    text: '<i class="fas fa-file-csv"></i> Exportar CSV',
                                    titleAttr: 'Exportar a CSV',
                                    className: 'btn btn-csv'
                                },
                                {
                                    extend: 'excel',
                                    text: '<i class="fas fa-file-excel"></i> Exportar Excel',
                                    titleAttr: 'Exportar a Excel',
                                    className: 'btn btn-excel'
                                },
                                {
                                    extend: 'pdf',
                                    text: '<i class="fas fa-file-pdf"></i> Exportar PDF',
                                    titleAttr: 'Exportar a PDF',
                                    className: 'btn btn-pdf'
                                },
                                {
                                    extend: 'print',
                                    text: '<i class="fas fa-print"></i> Imprimir',
                                    titleAttr: 'Imprimir',
                                    className: 'btn btn-print'
                                }
                            ],
                            pageLength: -1,
                            lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
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
                    });
                }, 1500); // Retraso de 1.5 segundos
            },
            error: function (jqXHR, estado, error) { },
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




function modal_art_2() {
    $("#modal_busqueda_arts").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $('#modal_busqueda_arts').on('shown.bs.modal', function () {
        $("#lista_articulos").html("");
        $("#articulo_buscar").val("");
        $("#articulo_buscar").focus();
    });
    lista_marca();
}

function lista_marca() {
    $.ajax({
        beforeSend: function () {
            $("#listar_marca_art").html("");
        },
        url: "busca_data_articulo_marca.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#listar_marca_art").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) {
            $("#listar_marca_art").html(
                "Error en la peticion AJAX..." + estado + "      " + error
            );
        },
    });
}

function buscar_art() {
    cmoneda = $("#lista_cmoneda option:selected").val();
    data_buscar = $("#articulo_buscar").val();
    var data = data_buscar.split("//");
    firname = $("#listar_marca_art select").val();

    let datasupcatname = '', data_descripcion = '', data_codigo = '';

    if (data.length == 1) {
        datasupcatname = data[0];
    } else if (data.length == 2) {
        datasupcatname = data[0];
        data_descripcion = data[1];
    } else if (data.length == 3) {
        datasupcatname = data[0];
        data_descripcion = data[1];
        data_codigo = data[2];
    }

    $.ajax({
        beforeSend: function () {
            $("#lista_articulos").html("");
        },
        url: "busca_data_articulo_nuevo_kardex.php",
        type: "POST",
        data: {
            descripcion: data_descripcion,
            firname: firname,
            supcatname: datasupcatname,
            data_codigo: data_codigo
        },
        success: function (x) {
            $("#lista_articulos").html(x);
            $("#tabla_art").DataTable();

            // Actualizar el campo de "Cod Producto" si hay resultados
            if ($("#lista_articulos").find("tr").length > 0) {
                const codigoProducto = $("#lista_articulos").find("tr").first().children("td:eq(1)").text();
                $('#cod_producto').val(codigoProducto); // Establece el código en el campo correspondiente
            } else {
                $('#cod_producto').val(''); // Limpiar el campo si no hay resultados
            }
        },
        error: function (jqXHR, estado, error) {
            $("#lista_articulos").html(
                "Error en la peticion AJAX..." + estado + "      " + error
            );
        },
    });
}


$(document).on("click", "#tabla_art tbody tr", function () {
    var radio = $(this).find("input[type='radio']");

    // seleccionado
    radio.prop("checked", true);
    $("#tabla_art tbody tr").removeClass("seleccionado");
    $(this).addClass("seleccionado");
});


function add_art_add() {
    $("#modal_busqueda_arts").modal("toggle");
    let line = [];
    let codigoProducto = "";
    // Obtener el código del artículo seleccionado

    $('#tabla_art input[name="seg_modal"]:checked').each(function (e) {
        codigo = $(this).closest("tr").children("td:eq(1)").text();
        line.push(codigo);
        codigoProducto = codigo;
    });

    // let codigoProducto = $("input[name='seg_modal']:checked").val();

    // Si se seleccionó un artículo, actualizar el campo "Cod Producto"
    if (codigoProducto) {
        $('#cod_producto').val(codigoProducto);
    } else {
        alert("Por favor, selecciona un artículo.");
    }

    // Continuar con la lógica que necesites aquí
}

function busca_articulo_add() {
    $(document).ready(function () {
        var cod = $("#codigo").val().toString();
        //console.log(cod);
        var tipcli = $("#tipocliente_mod").val().trim();
        var cmoneda = $("#lista_cmoneda option:selected").val();
        if (cod.trim() != "") {
            $(document).ready(function () {
                $.ajax({
                    beforeSend: function () {
                        $("#data_articulo").html("Buscando informacion del articulo...");
                    },
                    url: 'busca_data_articulo_pventa.php',
                    dataType: 'json',
                    type: 'POST',
                    data:
                    {
                        codigo: $("#codigo").val().toString(),
                        idcliente_credito: $("#idcliente_credito").val(),
                        cmoneda: cmoneda
                    },
                    success: function (data) {
                        $("#enviar").removeClass("activeTab");
                        $("#enviar").addClass("disabledTab");


                        // console.log(data);

                        if (data == 0) {
                            var n = noty({
                                text: "No existe el articulo...!",
                                theme: 'relax',
                                layout: 'center',
                                type: 'error',
                                timeout: 2000,
                            });
                        } else {

                            for (let i = 0; i < data.length; i++) {
                                fil = ultimo_valor_fila()
                                if (fil === 0) {
                                    // $("#tabla_articulos_mod > tbody > tr > td").remove();
                                    $("#tabla_articulos > tbody > tr > td").remove();
                                }
                                var num = ultimo_valor_fila() + 1;
                                stock_real = parseFloat(data[i].STOCK).toFixed(0) - parseFloat(data[i].DESPACHADO_WEB_BAMBAS).toFixed(0);
                                precio = parseFloat(data[i].precio).toFixed(4);
                                precio_igv = precio * 1.18;
                                precioigv_parse = parseFloat(precio_igv).toFixed(4);
                                li = parseFloat(num - 1).toFixed(0)
                                var htmlString = "<tr><td class='center'>" + num + "</td>" +
                                    "<td class='center'>" + data[i].ItemCode + "</td>";

                                if (data[i].ItemCode === '60108946') {
                                    htmlString += "<td style='text-align:center'><input type='text' class='form-control pull-right' id='descripcion' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + data[i].descripcion + "'></td>";
                                    htmlString += "<td style='text-align:center'><input type='text' class='form-control pull-right' id='marca' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + data[i].Fabricante + "'></td>";
                                    htmlString += "<td style='text-align:center'><input type='text' class='form-control pull-right' id='catalogo' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + data[i].Catalogo + "'></td>";
                                } else {
                                    htmlString += "<td class='center'>" + data[i].descripcion + "</td>";
                                    htmlString += "<td class='center'>" + data[i].Fabricante + "</td>";
                                    htmlString += "<td class='center'>" + data[i].Catalogo + "</td>";
                                }

                                htmlString += "<td class='center'>" + data[i].unidad_medida + "</td>" +
                                    "<td class='center'>" + parseFloat(stock_real).toFixed(0) + "</td>" +
                                    "<td class='center'>" + parseFloat(data[i].STOCK_COMPROMETIDO).toFixed(0) + "</td>" +
                                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='cantidad_item' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='' onkeyup='calcular_total_item(this," + li + ")'  onchange='calcular_total_item(this," + li + ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;' ></td>" +
                                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='precio_uni' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + precio + "' onchange='calcular_total_item(this," + li + ");calcular_precio_igv(this," + li + ")' onkeyup='calcular_total_item(this," + li + ");calcular_precio_igv(this," + li + ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;' ></td>" +

                                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='descuento_item' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='0' onkeyup='detectarEnter(event,this," + li + ")' ></td>" +

                                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='precio_igv' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='" + precioigv_parse + "' onkeyup='calcular_precio_uni(this," + li + ")'  onchange='calcular_precio_uni(this," + li + ")'  onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;'></td>" +

                                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='monto_item' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value='' onkeyup='calcular_total_item(this," + li + ")'  onchange='calcular_total_item(this," + li + ")' onkeypress='return validar_numero(event)' onselectstart='return false;' oncontextmenu='return false;' ></td>" +
                                    "<td style='text-align:center'><input type='text' class='form-control pull-right' id='plazoEntrega_item' autocomplete='off' style='font-size: 12px; text-align:center; color:black; font-weight: bold;' value=''></td>" +
                                    "<td style='text-align:center'> <select class='form-control' onchange='' data-placeholder='Seleccione un Estado' style='width: 100%;font-size:12px;' tabindex='-1' aria-hidden='true' id='almacen'><option value='' >ELIJA ALMA.</option>           <option value='ALM01' SELECTED> BAMBAS </option><option value='ALM02'> SAN JUAN</option><option value='ALMA00W' >VIRTUAL </option></select></td>" +
                                    "<td style='text-align:center'><button class='btn btn-danger btn-sm delete rounded-circle'><i class='fa fa-trash'></i></button></td>" + "<td class='center' style='display:none'>" + precio + "</td></tr>";

                                $("#tabla_articulos > tbody").append(htmlString);
                                $("#btn-procesa").prop("disabled", false);
                                $('#cantidad_item').focus();
                                resumen();
                                if (data[0].cantidad2 <= 0) {
                                    var n = noty({
                                        text: "No hay suficiente existencia...!",
                                        theme: 'relax',
                                        layout: 'center',
                                        type: 'information',
                                        timeout: 2000,
                                    });

                                    $("#cantidad2").focus();
                                }
                            }

                        }
                    },

                    error: function (jqXHR, estado, error) {
                        // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                        var n = noty({
                            text: "Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!",
                            theme: 'relax',
                            layout: 'center',
                            type: 'error',
                            timeout: 2000,
                        });
                        //            alert("Parece ser que hay un error por favor, reportalo a Soporte inmediatamente...!");
                    }
                });
            });
        } else {
        }
    })
}
/////////////////////////////////////////////////

function lista_Almacenes_InternosOrden() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_almacen").html("Recuperando Almacenes...");
            },
            url: "Lista_Almacen_Despacho_kardex.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_almacen").html(x);
                $(".select2").select2();


                var urlParams = new URLSearchParams(window.location.search);
                var val_cod = urlParams.get('item');
                if (val_cod) {
                    $("#cod_producto").val(val_cod);
                    $("#f_inicio").val("");

                    //  $("#anio").val(yearAnte).trigger("change");

                } else {
                    $("#cod_producto").val("");
                }


                setTimeout(() => {
                    //busca_lista_kardex();
                }, 1500);

            },
            error: function (jqXHR, estado, error) { },
        });
    });
}
///////////////////////
/*******************************************************************************************/

/////////////////////////////////////////////////

function lista_Marcas_Despacho() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_marca").html("Recuperando Marcas...");
            },
            url: "Lista_Marcas_Despacho.php",
            type: "POST",
            data: null,
            success: function (x) {
                $("#lista_marca").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) { },
        });
    });
}


function exportar_excel_kardex() {
    fec_inicio = $("#f_inicio").val();
    if (fec_inicio === "") {
        fec_inicio = "01-01-2024";
    } else {
        fec_inicio = $("#f_inicio").val();
    }
    fec_fin = $("#f_fin").val();
    almacen = $("#lista_almacen option:selected").val();
    // marca = $("#lista_marca option:selected").val();
    cod_producto = $("#cod_producto").val();

    javascript: window.open(
        "reporte_lista_kardex.php?fec_inicio=" +
        fec_inicio +
        "&fec_fin=" +
        fec_fin +
        "&almacen=" +
        almacen +
        // "&marca=" +
        // marca +
        "&cod_producto=" +
        cod_producto
    );
}