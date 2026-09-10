function lista_proveedor2() {
    $.ajax({
        beforeSend: function () {
            $("#lista_proveedor").html("Cargando ...");
        },
        url: "listar_proveedores_prog_pagos.php",
        type: "POST",
        data: '',
        success: function (x) {
            $("#lista_proveedor").html(x);
            $(".select2").select2();
            //$('#fechai').val('2023-01-01');
        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_vendedor2() {
    $.ajax({
        beforeSend: function () {
            $("#lista_vendedor").html("Cargando ...");
        },
        url: "listar_vendedores_prog_pagos.php",
        type: "POST",
        data: '',
        success: function (x) {
            $("#lista_vendedor").html(x);
            $(".select2").select2();
            //$('#fechai').val('2023-01-01');
        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_metodPago() {
    $.ajax({
        beforeSend: function () {
            $("#lista_modalidadPago").html("Cargando ...");
        },
        url: "listar_metodoPago_prog_pagos.php",
        type: "POST",
        data: '',
        success: function (x) {
            $("#lista_modalidadPago").html(x);
            $(".select2").select2();
            $('#fechai').val('2023-06-01');
            consultar()
        },
        error: function (jqXHR, estado, error) { },
    });
}




function consultar() {

    //setTimeout(() => {
    $.ajax({
        beforeSend: function () {
            $("#lista_consultar").html('<i class="fas fa-spinner fa-spin"></i> Cargando datos');
        },
        url: "consulta_pago_proveedores.php",
        type: "POST",
        data: 'lista_proveedor=' + $("#lista_proveedor option:selected").val() + '&tipoDoc=' + $("#tipoDoc option:selected").val() + '&lista_modalidadPago=' + $("#lista_modalidadPago option:selected").val() + '&lista_vendedor=' + $("#lista_vendedor option:selected").val() + '&estadoP=' + $("#estadoP option:selected").val() + '&fechai=' + $("#fechai").val() + '&fechaf=' + $("#fechaf").val(),
        success: function (x) {
            $("#lista_consultar").html(x);
            $("#tabla_con").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
    //}, 1000);
}






$(document).on('click', '#procesar', function () {
    cant = document.querySelectorAll('#procesar:checked').length / 2;
    //console.log('hola');
    if ($(this).is(':checked')) {
        if (cant > 0) {
            $('#btn-pro').show();

        } else {
            $('#btn-pro').hide();

        }
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
    } else {
        $(this).parents("tr").find("td").css("background-color", "white");
        if (cant > 0) {

            $('#btn-pro').show();
        } else {
            $('#btn-pro').hide();
        }
    }
});



$(document).on("click", "#procesar", function () {

    if ($(this).is(":checked")) {
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
        num = $(this).parents("tr").find("td:eq(13)").text();
        //console.log(num);
        num = parseFloat(num);
        num = isNaN(num) ? 0 : Math.abs(num);
        $(this).parents("tr").find('input[type="number"]').val(num);

    } else {
        num = "";
        $(this).parents("tr").find("td").css("background-color", "white");
        $(this).parents("tr").find('input[type="number"]').val(num);
        //console.log(num);
    }
    resumen();
});


$(document).on("click", "#ingresarCant", function () {
    var valor = $(this).val();

    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    num = $(this).parents("tr").find("td:eq(13)").text();
    //console.log(num);
    num = parseFloat(num);
    num = isNaN(num) ? 0 : Math.abs(num);
    $(this).parents("tr").find('input[type="number"]').val(num);
    $(this).parents("tr").find('td:eq(0) input[type="checkbox"]').prop("checked", true);


    //////////////////////////////////////////////////////////////////////////////////////////
    numx = $(this).parents("tr").find("td:eq(19)").text();
    numx = parseFloat(numx);
    numx = isNaN(numx) ? 0 : Math.abs(numx);
    num2 = $(this).parents("tr").find('input[type="number"]').val();

    if (parseFloat(valor) > numx) {
        alertify.error("El valor ingresado no puede ser mayor que " + numx);
        // Limpiar el campo
        //return;
    }
    nuevo_valor = (numx - num2).toFixed(4);
    $(this).parents("tr").find("td:eq(13)").text(nuevo_valor);

    resumen()
    $('#btn-pro').show();
});



$(document).on("keyup", "#ingresarCant", function () {
    var valor = $(this).val();

    if (valor.length > 0) {
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
        $('#btn-pro').show();
        $(this).parents("tr").find('td:eq(0) input[type="checkbox"]').prop("checked", true);
        num = $(this).parents("tr").find("td:eq(19)").text();
        num = parseFloat(num);
        num = isNaN(num) ? 0 : Math.abs(num);
        num2 = $(this).parents("tr").find('input[type="number"]').val();

        if (parseFloat(valor) > num) {
            alertify.error("El valor ingresado no puede ser mayor que " + num);
            // Limpiar el campo
            //return;
        }

        nuevo_valor = (num - num2).toFixed(4);

        $(this).parents("tr").find("td:eq(13)").text(nuevo_valor);
    } else {
        $(this).closest("tr").find("td").css("background-color", "");
        $(this).parents("tr").find('td:eq(0) input[type="checkbox"]').prop("checked", false)
        $('#btn-pro').hide();

    }
    resumen();
});


// $(document).on('input', '#ingresarCant', function () {
//     var valor = $(this).val();

//     if (valor.length > 0) {
//         if ($(this).is('input[type="number"]')) {
//             $(this).parents("tr").find("td").css("background-color", "LightGreen");
//             document.getElementById('btn-det').disabled = false
//             $(this).parents("tr").find('td:eq(0) input[type="checkbox"]').prop("checked", true)

//         } else {
//             $(this).parents("tr").find("td").css("background-color", "white");
//             document.getElementById('btn-det').disabled = true

//         }
//     } else {
//         $(this).closest("tr").find("td").css("background-color", "");
//         document.getElementById('btn-det').disabled = true;
//         $(this).parents("tr").find('td:eq(0) input[type="checkbox"]').prop("checked", false)

//     }
// });



function muestra_detalle(id) {
    $("#modal_procesar").modal("show"); // abrir
    $.ajax({
        beforeSend: function () {

        },
        url: 'detalle_consulta_pago_proveedores.php',
        type: 'POST',
        data: 'id=' + id,
        success: function (x) {
            $("#data_consumo").html(x);
            $('#tabla_detalle').DataTable();


        },
        error: function (jqXHR, estado, error) {
            $("#tabla_detalle").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
    //consultar_data_mercancia(id)
}

/////////////////////////


/////////////////////////

$(function () {
    // Evento que selecciona la fila y la elimina
    $(document).on('click', '.delete', function () {
        var parent = $(this).parents().parents().get(0);
        $(parent).remove();
        num_filas = document.getElementById("tabla_insertar").rows.length - 1;
        numero = $(this).closest("tr").children("td:eq(15)").text();
        docentry = $(this).closest("tr").children("td:eq(0)").text();
        //console.log(numero);
        //$($('#tabla_con').find('tbody > tr')[numero]).children('td').children().children().prop('checked', false);
        //$($('#tabla_con').find('tbody > tr')[numero]).children('td').css("background-color", "white");






        var tabla = document.getElementById("tabla_insertar");
        if (tabla && tabla.tBodies[0].rows.length === 0) {
            $('#btn-pro').hide();
        }


        $("#tabla_con tr").find('td:eq(1)').each(function (e, i) {
            //obtenemos el codigo de la celda
            dato = $(this).html();
            //console.log(dato);
            //comparamos para ver si el código es igual a la busqueda
            if (dato === docentry) {
                //console.log(e);
                posicion = e + 1;

                //aqui ya que tenemos el td que contiene el codigo utilizaremos parent para obtener el tr.
                trDelResultado = $(this).parent();
                $($('#tabla_con').find('tbody > tr')[e]).children('td').children().children().prop('checked', false)
                $($('#tabla_con').find('tbody > tr')[e]).children('td').css("background-color", "white");

                $($('#tabla_con').find('tbody > tr')[e]).children('td').children().children().prop('disabled', false);

                // console.log(trDelResultado);
                encontradoResultado = true;
                pos1 = e;

            }
        })

        resumen();


    });
});



//////////////////////////////////////////////////////////////////////

// $(document).on('click', '#btn-det', function () {
//     $('#btn-pro').show();
// });



//////////////////////////////////////////////////////////////////////
function insertarSeleccionados() {
    //$("#modal_insertar").modal("show");
    let materiales = [];
    let materiales2 = [];
    proveedor = $("#lista_proveedor option:selected").val();
    $('#tabla_con input[type="checkbox"]:checked').each(function (
        e
    ) {
        if ($(this).prop("checked")) {
            materiales2[e] = $(this).closest("tr").children("td:eq(1)").text();

        }
    });
    alertify.success("Inserto")
    materiales_2 = materiales2.toString()
    //console.log(materiales2);
    traerDatos(materiales_2);
    bloquearCheckboxesSeleccionados();


}


function bloquearCheckboxesSeleccionados() {

    var tabla = document.getElementById("tabla_con");

    if (tabla) {
        var checkboxes = tabla.querySelectorAll('input[type="checkbox"][id="procesar"]:checked');

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].disabled = true;
        }
    }
}


function traerDatos(docnum) {
    if (docnum != "") {

        $.ajax({
            beforeSend: function () {

            },
            url: 'insertar_seleccionados_prog_pp.php',
            type: 'POST',
            data: 'docnum=' + docnum,
            success: function (x) {
                $("#tabla_com").html(x);
                $('#tabla_insertar').DataTable();
            },
            error: function (jqXHR, estado, error) {
                $("#tabla_com").html('Hubo un error: ' + estado + ' ' + error);
            }
        });

    } else {
    }
}



function procesar() {
    //$('#modal_insertar').modal('hide');
    lista_banco2();
    $("#modal_procesarProgramacion").modal("show");
}




function lista_banco2() {
    $.ajax({
        beforeSend: function () {
            $("#lista_banco").html("Recuperando Lista ...");
        },
        url: "lista_bancosPP.php",
        type: "POST",
        data: '',
        success: function (x) {
            $("#lista_banco").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}



function procesarGuardar() {
    fechapag = $("#fechapag").val();
    lista_banco = $("#lista_banco option:selected").text().trim();
    lista_codbanco = $("#lista_banco option:selected").val();
    DirecD = $("#DirecD").val();
    bandera = true;

    if (lista_banco === "Selecciona") {
        bandera = false
        alertify.error('Seleccione Banco');

    }

    if (bandera === true) {

        $.ajax({
            url: "registrar_programacionPP_cab.php",
            type: "POST",
            data: { fechapag: fechapag, lista_banco: lista_banco, lista_codbanco: lista_codbanco, DirecD: DirecD },
            success: function (x) {
                //console.log(x);
                //alertify.success('Se registro correctamente');
                global = parseInt(x);
                console.log(global);
                //aqui comienza el deta
                if (global == 0) {
                    alertify.error("No inserto");
                } else {
                    $("[name='procesar[]']:checked").each(function () {
                        var docentry = $(this).parents("tr").find('td:eq(1)').text();
                        var docnum = $(this).parents("tr").find('td:eq(2)').text();
                        var factproveedor = $(this).parents("tr").find('td:eq(3)').text();
                        var codproveedor = $(this).parents("tr").find('td:eq(4)').text();
                        var proveedor = $(this).parents("tr").find('td:eq(5)').text();
                        var fechafactura = $(this).parents("tr").find('td:eq(6)').text();
                        var fechavencimiento = $(this).parents("tr").find('td:eq(7)').text();
                        var diavencimiento = $(this).parents("tr").find('td:eq(8)').text();
                        var tipodoc = $(this).parents("tr").find('td:eq(9)').text();
                        var moneda = $(this).parents("tr").find('td:eq(10)').text();
                        var formapago = $(this).parents("tr").find('td:eq(11)').text();
                        var codformapago = $(this).parents("tr").find('td:eq(12)').text();
                        var saldo = $(this).parents("tr").find('td:eq(13)').text();
                        var importeApagar = $(this).parents("tr").find('input[id="ingresarCant"]').val();
                        var importeApagar2 = parseFloat(importeApagar);
                        var importe = $(this).parents("tr").find('td:eq(15)').text();




                        $.ajax({
                            beforeSend: function () { },
                            url: "registrar_programacionPP_det.php",
                            type: "POST",
                            data:
                                "docentry=" +
                                global +
                                "&docnum=" +
                                docnum +
                                "&factproveedor=" +
                                factproveedor +
                                "&codproveedor=" +
                                codproveedor +
                                "&proveedor=" +
                                proveedor +
                                "&fechafactura=" +
                                fechafactura +
                                "&fechavencimiento=" +
                                fechavencimiento +
                                "&diavencimiento=" +
                                diavencimiento +
                                "&tipodoc=" +
                                tipodoc +
                                "&moneda=" +
                                moneda +
                                "&formapago=" +
                                formapago +
                                "&codformapago=" +
                                codformapago +
                                "&saldo=" +
                                saldo +
                                "&importeApagar=" +
                                importeApagar2 +
                                "&importe=" +
                                importe,
                            success: function (data) {

                                $("#modal_procesarProgramacion").modal("hide"); //cerrar modal
                                //alertify.success('Se registro correctamente');
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registro Exitoso',
                                    text: 'El pago se programo correctamente.',
                                    showConfirmButton: false, // Oculta el botón "Aceptar"
                                    timer: 2000
                                  }).then(function () {
                                    // Actualizar la página
                                    // location.reload();
                                  });
                                //bloquearCheckboxesSeleccionados();
                                //$('#tabla_insertar tbody').empty();
                                //resumen();
                                $($('#tabla_con').find('tbody > tr')).find('input[id="ingresarCant"]').val('');
                                $($('#tabla_con').find('tbody > tr')).children('td').children().children().prop('checked', false);
                                $($('#tabla_con').find('tbody > tr')).children('td').css("background-color", "white");
                                //$('#btn-det').hide();
                                $('#btn-pro').hide();
                                $('#DirecD').val("");


                            },

                            error: function (jqXHR, estado, error) {

                            },
                        });
                    });
                }
            },
            error: function (jqXHR, estado, error) {
            }
        });
    }
}



function resumen() {
    $(document).ready(function () {
        var monto2 = 0.00;
        var monto3 = 0.00;
     
        $('#tabla_con > tbody > tr').each(function () {
            if ($(this).find('#procesar').prop('checked')) {
            monto3 += parseFloat($(this).find('input[type="number"]').val());
            monto2= monto2 + monto3
            //console.log(monto2);console.log(monto3);
            //monto2 += parseFloat($(this).find('td').eq(14).html());
            }
        });
       // console.log(monto2);

        $("#impoPa").html('Total Importe a pagar: ' + monto3.toFixed(2))

    })
}




function exportarExcel() {
    lista_proveedor = $("#lista_proveedor option:selected").val();
    tipoDoc = $("#tipoDoc option:selected").val();
    lista_modalidadPago = $("#lista_modalidadPago option:selected").val();
    lista_vendedor = $("#lista_vendedor option:selected").val();
    estadoP = $("#estadoP option:selected").val();
    fechai = $("#fechai").val();
    fechaf = $("#fechaf").val();



    javascript: window.open('reporte_excel_pp.php?lista_proveedor=' + lista_proveedor + '&tipoDoc=' + tipoDoc + '&lista_modalidadPago=' + lista_modalidadPago + '&lista_vendedor=' + lista_vendedor + '&estadoP=' + estadoP + '&fechai=' + fechai + '&fechaf=' + fechaf + '');


}


function exportarPDF() {
    lista_proveedor = $("#lista_proveedor option:selected").val();
    tipoDoc = $("#tipoDoc option:selected").val();
    lista_modalidadPago = $("#lista_modalidadPago option:selected").val();
    lista_vendedor = $("#lista_vendedor option:selected").val();
    estadoP = $("#estadoP option:selected").val();
    fechai = $("#fechai").val();
    fechaf = $("#fechaf").val();

    // javascript: window.open('reporte_pdf_pp.php?lista_proveedor=' + lista_proveedor + '&tipoDoc=' + tipoDoc + '&lista_modalidadPago=' + lista_modalidadPago + '&lista_vendedor=' + lista_vendedor + '&estadoP=' + estadoP + '&fechai=' + fechai + '&fechaf=' + fechaf + '');

    var ruta = "reporte_pdf_pp.php?lista_proveedor=" + lista_proveedor + "&tipoDoc=" + tipoDoc + "&lista_modalidadPago=" + lista_modalidadPago + "&lista_vendedor=" + lista_vendedor + "&estadoP=" + estadoP + "&fechai=" + fechai + "&fechaf=" + fechaf + "";

    $('#modal_data_pdf').modal('show');
    $('#modal_data_pdf').on('shown.bs.modal', function(){
      $(this).find('iframe').attr('src', ruta);
    }).on('hidden.bs.modal', function(){
      $(this).find('iframe').attr('src', '');
    });
  
    $("#navegador").off('click').on('click', function(){
      window.open(ruta, '_blank');
    });
  
    $("#imprimir").off('click').on('click', function(){
      $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
    })
}