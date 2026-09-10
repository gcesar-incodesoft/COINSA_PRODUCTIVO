function lista_clientes2() {
    //console.log('hola');
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#pone_clientes").html("Recuperando proveedores...");
            },
            url: 'pone_clientes_cartera.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_clientes").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}
/**********************************************************************/
function busca_cuentas_cliente() {
    var checkboxState = $("#cbox1").is(":checked") ? '1' : '0';
    var tipo = checkboxState;

    if (!checkboxState) {
        //console.log("Marque los  Asociados");
        $.ajax({
            beforeSend: function () {
                $("#cartera_clientes").html("Consultando información...");
            },
            url: 'consulta_cuenta_cliente.php',
            type: 'POST',
            data: 'idcliente=' + $("#cliente").val() + '&tipo=' + checkboxState, // Enviamos 1 cuando el checkbox está desmarcado
            success: function (x) {
                $("#cartera_clientes").html(x);
                $('#tabla_cliente_cartera').DataTable();
            },
            error: function (jqXHR, estado, error) {
                $("#cartera_clientes").html(estado + "    " + error);
            }
        });

    } else {
        //console.log("Se Marco Asociados");
        $.ajax({
            beforeSend: function () {
                $("#cartera_clientes").html("Consultando información...");
            },
            url: 'consulta_cuenta_cliente.php',
            type: 'POST',
            data: 'idcliente=' + $("#cliente").val() + '&tipo=' + checkboxState, // Enviamos 0 cuando el checkbox está marcado
            success: function (x) {
                $("#cartera_clientes").html(x);
                $('#tabla_cliente_cartera').DataTable();
            },
            error: function (jqXHR, estado, error) {
                $("#cartera_clientes").html(estado + "    " + error);
            }
        });
    }
}

/****************************************************************************/
function abona_ticket(ti) {
    var de = ti.split("|");
    var id_client = de[0];
    var nombre_cliente = de[1];
    var serie = de[2];
    var numero = de[3];
    var abonado = de[5];
    var total_ticket = de[4];
    //alert(ti);
    $("#modal_abono_ticket").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $('#modal_abono_ticket').on('shown.bs.modal', function () {
        $("#abono").val("");
        //$("#el_resto").val("");
        $("#abono").select();
        $('#abono').focus();
    });
    $("#elidcliente").val(id_client);
    $("#abonado").val(abonado);
    $("#nombre_c").val(nombre_cliente);
    $("#s_ticket").val(serie);
    $("#n_ticket").val(numero);
    $("#total_de_ticket").val(total_ticket);
    calcula_resto();
}
/**********************************************************************************/
function calcula_resto() {
    var m1 = $("#total_de_ticket").val();
    m1 = m1.replace(",", "");
    var m2 = $("#abono").val();
    var m3 = $("#abonado").val();
    m3 = m3.replace(",", "");
    var change = parseFloat(m1) - parseFloat(m3);
    $("#el_resto").val(change.toFixed(2));
}
/***********************************************************************************/
function verifica_abono() {
    var m4 = $("#abono").val();
    m4 = m4.replace(",", "");
    var m5 = $("#el_resto").val();
    m5 = m5.replace(",", "");
    var dif = parseFloat(m5) - parseFloat(m4);
    if (dif >= 0) {
        $("#btn-procesa-abono").attr("disabled", false);
    } else {
        $("#btn-procesa-abono").attr("disabled", true)
    }
}
/***********************************************************************************/
function procesa_abono() {
    $(document).ready(function () {
        var n = noty({
            text: "Seguro que desea preocesar el abono...?",
            theme: 'relax',
            layout: 'center',
            type: 'information',
            buttons: [
                {
                    addClass: 'btn btn-primary',
                    text: 'Si',
                    onClick: function ($noty) {
                        $noty.close();
                        var serie = $("#s_ticket").val();
                        var numero = $("#n_ticket").val();
                        var monto = $("#abono").val();
                        var id_cliente = $("#elidcliente").val();
                        $.ajax({
                            beforeSend: function () {
                                $("#btn-procesa-abono").html("Procesando...");
                            },
                            url: 'procesa_abono_ticket.php',
                            type: 'POST',
                            data: 'serie=' + serie + '&numero=' + numero + '&monto=' + monto + '&id_cliente=' + id_cliente,
                            success: function (x) {
                                if (x == '0') {
                                    alert("Ocurrio un error al registrar el pago, reporte a Soporte inmediatamente...");
                                } else {
                                    $("#btn-procesa-abono").html("<i class='fa fa-print'></i> Procesar");
                                    $('#modal_abono_ticket').modal('toggle');
                                    busca_cuentas_cliente();
                                }
                            },
                            error: function (jqXHR, estado, error) {
                                $("#btn-procesa-abono").html(estado + "    " + error);
                            }
                        });
                    }
                },
                {
                    addClass: 'btn btn-danger',
                    text: 'No',
                    onClick: function ($noty) {
                        $("#btn_cancela").prop("disabled", false);
                        $noty.close();
                    }
                }
            ]
        });
    });
}
/***********************************************************************************/
function revisa_pagos(nt) {
    var nt = nt.split("|");
    var id_client = nt[0];
    var nombre_cliente = nt[1];
    var serie = nt[2];
    var numero = nt[3];
    //alert(ti);
    $.ajax({
        beforeSend: function () {
            $("#pagos_realizados").html("Buscando... <img src='dist/img/default.gif'></img>");
        },
        url: 'busca_abonos_declientes.php',
        type: 'POST',
        data: 'idcliente=' + $("#cliente").val() + '&serie=' + serie + '&numero=' + numero,
        success: function (x1) {
            $("#pagos_realizados").html(x1);
            $("#modal_revisa_pagos").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
        },
        error: function (jqXHR, estado, error) {
            alert("Ocurrio un error, reporte a soporte..." + estado + "     " + error);
        }
    });
}
/**************************************************************************************/
function print_pagos() {
    $(".print_abonos").printArea();
}
/***************************************************************************************/
function lista_vendedores() {
    $(document).ready(function () {

        $.ajax({
            beforeSend: function () {
                $("#pone_vendedores").html("Recuperando proveedores...");
            },
            url: 'pone_vendedores_cartera.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_vendedores").html(x);

                $(".select2").select2();

                $("#pone_vendedores select").val('-1').trigger('change.select2');
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}
/**********************************************************************/

$(document).ready(function () {
    setTimeout(function () {
        $("#anio").val('2024').trigger('change.select2');
    }, 100);
});

/***************************************************************************************/
function lista_cmeses() {
    $(document).ready(function () {

        $.ajax({
            beforeSend: function () {
                $("#pone_cmeses").html("Recuperando meses...");
            },
            url: 'pone_cmeses.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#pone_cmeses").html(x);

                $(".select2").select2();


                var urlParams = new URLSearchParams(window.location.search);
                var valMesesito = urlParams.get('val');
                var yearAnte = urlParams.get('year');


                // Asignar el valor del mes si existe en la URL, de lo contrario usar mes_actual
                if (valMesesito) {
                    $("#pone_cmeses select").val(valMesesito).trigger("change");

                    $("#anio").val(yearAnte).trigger("change");
                } else {
                    var fecha = new Date();
                    var mes_actual = fecha.getMonth() + 1;
                    $("#pone_cmeses select").val(mes_actual).trigger("change");
                }

            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}
/**********************************************************************/

function busca_cuentas_vendedores() {
    var idcliente = $("#cliente").val();
    var idmes = $("#cmeses").val();
    var anio = $("#anio option:selected").val();

    bandera = true;
    if (idcliente == "" || (idmes == "")) {
        bandera = false;
        alertify.error("Falta seleccionar campos");
    }

    if (bandera === true) {
        $(document).ready(function () {
            $.ajax({
                beforeSend: function () {
                    // $("#cartera_vendedores").html("Consultando informacion...");
                    // $("#cartera_vendedores").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i></div>');
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
                url: 'consulta_comparativo_vtsM.php',
                type: 'POST',
                data: 'idcliente=' + $("#cliente").val() + '&idmes=' + $("#cmeses").val() + '&anio=' + $("#anio").val(),
                success: function (x) {

                    // Retrasar el cierre del Swal 1.5 segundos
                    setTimeout(() => {
                        swal.close();
                        $("#cartera_vendedores").html(x);
                        $('#tabla_cliente_cartera2').DataTable(
                            {
                                dom: '<"top"lBf>rt<"bottom"ip>',
                                buttons: [
                                    {
                                        extend: 'copy',
                                        text: '<i class="fa fa-copy"></i> Copiar',
                                        titleAttr: 'Copiar',
                                        className: 'btn btn-copy'
                                    },
                                    // {
                                    //     extend: 'csv',
                                    //     text: '<i class="fa fa-file"></i> Exportar CSV',
                                    //     titleAttr: 'Exportar a CSV',
                                    //     className: 'btn btn-csv'
                                    // },
                                    // {
                                    //     extend: 'excel',
                                    //     text: '<i class="fa fa-file"></i> Exportar Excel',
                                    //     titleAttr: 'Exportar a Excel',
                                    //     className: 'btn btn-excel'
                                    // },
                                    // {
                                    //     extend: 'pdf',
                                    //     text: '<i class="fa fa-file"></i> Exportar PDF',
                                    //     titleAttr: 'Exportar a PDF',
                                    //     className: 'btn btn-pdf',
                                    //     orientation: 'landscape',
                                    //     pageSize: 'A4',
                                    // },
                                    {
                                        extend: 'print',
                                        text: '<i class="fa fa-print"></i> Imprimir',
                                        titleAttr: 'Imprimir',
                                        className: 'btn btn-print'
                                    }
                                ],
                            }
                        );
                    }, 1500); // Retraso de 1.5 segundos
                },
                error: function (jqXHR, estado, error) {
                    $("#cartera_vendedores").html(estado + "    " + error);
                }
            });
        });
    }

}
/****************************************************************************/

/**********************************************************************/
function busca_ventas_resumen_anual() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#cartera_vendedores").html("Consultando informacion...");
            },
            url: 'consulta_ventas_resumen_anual.php',
            type: 'POST',
            data: 'idcliente=' + $("#cliente").val(),
            success: function (x) {
                $("#cartera_vendedores").html(x);
            },
            error: function (jqXHR, estado, error) {
                $("#cartera_vendedores").html(estado + "    " + error);
            }
        });
    });
}
/****************************************************************************/

/****************************************************************************/

function pdf_whatsap(CODE) {

    correo = 'notificacionesccoinsa@gmail.com';

    $("#modalcorreo").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });


    //alert(CODE);
    $("#text").val(correo);
    //$("#cardcode").val(CODE);
    document.querySelector('#cardcode').innerText = CODE;
    $("#cardcode").hide();
    $("#text").prop('disabled', true);
}



function editar_correo(CODE) {

    $("#text").prop('disabled', false);
    $("#text").val('');
}


function enviar_correo() {


    correo = $("#text").val();
    code = $("#cardcode").text();
    // javascript: window.open('reporte_EC_Cliente.php?card_code=' + card_code+'&card_name='+card_name);
    alertify.success('correo enviado');
    $('#modalcorreo').modal('hide');

    $.post("enviarpdf_corre.php", { CODE: code, correo: correo },

        function (data) {


        }
    );
}


function Consultar_Det_vende(periodo, cod) {


    $.post("listar_report_detalle.php", { periodo: periodo, cod: cod },

        function (xdata) {


            //alert(ti);
            $("#modal_detalle_factura").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

            $("#detalle_de_OP").html(xdata);
            $('#tabladetalle').DataTable();


            // vendedor

        });
}


