function pone_lista_consumo(IdEstado, IdTipo) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_consumo").html("Recuperando usuarios...");
            },
            url: 'consulta_solicitud_consumo.php',
            type: 'POST',
            data: 'IdEstado=' + IdEstado + '&IdTipo=' + IdTipo,
            success: function (x) {
                $("#lista_consumo").html(x);
                $("#tabla_consumo").DataTable();
            },
            error: function (jqXHR, estado, error) {}
        });
    });
}


$(document).on('click', '#salida_2', function () {
    if ($(this).is(':checked')) {
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
        document.getElementById('regist_sal').disabled = false
    } else {
        $(this).parents("tr").find("td").css("background-color", "white");
        document.getElementById('regist_sal').disabled = true
    }
});

function registrar_datos_det(cod) {
    //alert(cod);
  
        //base = document.getElementById('codig_ver').innerText;
        base = cod;
        bandera = true;
        bandera_f = false;
        $("[name='salida_mer[]']:checked").each(function (key) {
            bandera_f = true;
            /*  cantidad2.push($(this).parents("tr").find('td:eq(6)').text());
             cantidad2.push($(this).parents("tr").find("#sede_xd option:selected").text().trim());
             console.log(); */
            $base_entry = $(this).parents("tr").find('td:eq(1)').text();
            $line_num = $(this).parents("tr").find('td:eq(2)').text();
            $item_code = $(this).parents("tr").find('td:eq(3)').text();
            $item_name = $(this).parents("tr").find('td:eq(4)').text();
            $ccosto = $(this).parents("tr").find('td:eq(5)').text();
            $cantidad = $(this).parents("tr").find('td:eq(6)').text();
            $open_quantity = $(this).parents("tr").find('td:eq(7)').text();
            $almacen = $(this).parents("tr").find("#sede_xd option:selected").text().trim();
            $stock = $(this).parents("tr").find('td:eq(9)').text();
            $despachar = $(this).parents("tr").find('input[type="number"]').val();
            $unidad = $(this).parents("tr").find('td:eq(11)').text();
            $cantidad2 = parseFloat($cantidad)
            $stok2 = parseFloat($stock)
            $despachar2 = parseFloat($despachar)
            $open_quantity2 = parseFloat($open_quantity)
            $stok3 = (isNaN($stok2) ? 0 : $stok2);
            //console.log($open_quantity2);
            //console.log($despachar2);
            //console.log($stok3);
            
          
                alertify.success('Agregado');
                console.log($almacen);
                $.post("InsertarDetalleSalidaMer.php", {
                        doc_entry: base,
                        base_entry: $base_entry,
                        line_num: $line_num,
                        item_code: $item_code,
                        item_name: $item_name,
                        ccosto: $ccosto,
                        cantidad: $cantidad,
                        almacen: $almacen,
                        open_quantity: $open_quantity2,
                        stock2: $stok3,
                        despachar: $despachar2,
                        unidad: $unidad
                    },

                    function (data1) {

                        pone_lista_consumo()
                        document.getElementById('regist_sal').disabled = true
                    });
            







        });


}

function registrar_datos() {
    id = document.getElementById('codig_ver').innerText;
    fecha_doc = $("#fecha_doc_salida").val().trim();
    fecha_cont = $("#fecha_cont_salida").val().trim();
    comentario = $("#comentario_salida").val().trim();
    usuario_solicitante = $("#usuario_salida").val().trim();
    sede = $("#sede_salida").val().trim();
    tipo = $("#tipo_salida").val().trim();
    bandera = true;
    det = document.querySelectorAll('#salida_2:checked').length;
    console.log(det);
    if (det <= 0) {
        bandera = false;
        alertify.error('Elegir Solicitud');
    }
    if ($("#comentario_salida").val().trim() === '') {
        bandera = false;
        alertify.error('Elegir Comentario');
    }
    if ($("#usuario_salida").val().trim() === '') {
        bandera = false;
        alertify.error('Elegir Usuario');
    }
    if ($("#fecha_doc_salida").val().trim() === '') {
        bandera = false;
        alertify.error('Elegir Fecha doc');
    }
    if ($("#fecha_cont_salida").val().trim() === '') {
        bandera = false;
        alertify.error('Elegir Fecha cont');
    }
    $("[name='salida_mer[]']:checked").each(function (key) {
        bandera_f = true;
        /*  cantidad2.push($(this).parents("tr").find('td:eq(6)').text());
         cantidad2.push($(this).parents("tr").find("#sede_xd option:selected").text().trim());
         console.log(); */
        $base_entry = $(this).parents("tr").find('td:eq(1)').text();
        $line_num = $(this).parents("tr").find('td:eq(2)').text();
        $item_code = $(this).parents("tr").find('td:eq(3)').text();
        $item_name = $(this).parents("tr").find('td:eq(4)').text();
        $ccosto = $(this).parents("tr").find('td:eq(5)').text();
        $cantidad = $(this).parents("tr").find('td:eq(6)').text();
        $open_quantity = $(this).parents("tr").find('td:eq(7)').text();
        $almacen = $(this).parents("tr").find("#sede_xd option:selected").text().trim();
        $stock = $(this).parents("tr").find('td:eq(9)').text();
        $despachar = $(this).parents("tr").find('input[type="number"]').val();
        $unidad = $(this).parents("tr").find('td:eq(11)').text();
        $cantidad2 = parseFloat($cantidad)
        $stok2 = parseFloat($stock)
        $despachar2 = parseFloat($despachar)
        $open_quantity2 = parseFloat($open_quantity)
        $stok3 = (isNaN($stok2) ? 0 : $stok2);
        //console.log($open_quantity2);
        //console.log($despachar2);
        //console.log($stok3);
        if (0 > $despachar2) {
            bandera = false
            //console.log('aca cambio x3');
            alertify.error($item_code + ' ' + 'Cantidad no Validad');
            $(this).parents("tr").find('td:eq(10)').css("background-color", "#F67280");
        }
        if ($despachar == '') {
            bandera = false
            //console.log('aca cambio x4');
            alertify.error($item_code + ' ' + 'Falta llenar cantidad');
            $(this).parents("tr").find('td:eq(10)').css("background-color", "#F67280");
        }
        if ($stok3 < $despachar2) {
            bandera = false
            //console.log('aca cambio');
            $(this).parents("tr").find("td:eq(9)").css("background-color", "#F67280");
            alertify.error($item_code + ' ' + 'No cuenta con stock suficiente');
        }
        if ($open_quantity2 < $despachar2) {
            bandera = false
            //console.log('aca cambio x2');
            alertify.error($item_code + ' ' + 'Cantidad superior a la solicitada');
            $(this).parents("tr").find('td:eq(10)').css("background-color", "#F67280");
        }








    });
    if (bandera === true) {
        swal({
                title: "Registrar?",
                icon: "warning",
                buttons: true,
                timer: 3000,
                dangerMode: true,
                //closeOnConfirm: false,
                closeOnEsc: false,
                closeOnClickOutside: false,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Registrado ", {
                        icon: "success",
                        timer: 3000,
                        closeOnEsc: false,
                        buttons: false,
                        closeOnClickOutside: false,
                    });


                    $.post("InsertarEncabezadoSalidaMer.php", {
                            id: id,
                            fecha_doc: fecha_doc,
                            fecha_cont: fecha_cont,
                            sede: sede,
                            tipo: tipo,
                            comentario: comentario,
                            usuario_solicitante: usuario_solicitante
                        },

                        function (data1) {
                            $("#codcito").html(data1);
                            valor = $("#codcito").text().trim();
                            //console.log(valor);
                            registrar_datos_det(valor)
                            //alertify.success('Registrado');
                            det = 0;
                            //$("#fecha_doc_salida").val('')
                            //$("#fecha_cont_salida").val('')
                            $("#comentario_salida").val('')
                            $("#usuario_salida").val('')
                            $("#sede_salida").val('')
                            $("#tipo_salida").val('')
                            $("#tabla_consumo_det").html('')
                            $("#modal_realizar").modal('hide');
                        });

                } else {
                    swal("No se pudo registrar");
                }
            });
    }

}

function busca_stock(id) {
    celdas = document.getElementById("tabla_salida_det").rows[id].cells
    almacen = celdas[8].children[0].value
    codes = celdas[3].textContent

    $.post("busca_salida_stock.php", {
            almacen: almacen,
            code: codes
        },
        function (data1) {
            $("#stocksito").html(data1);
           // console.log(data1);
            let celdas2 = document.getElementById("tabla_salida_det").rows[id].cells
            document.getElementById("tabla_salida_det").rows[id].style.backgroundColor = "LightGreen";
            celdas3 = document.getElementById("tabla_salida_det").rows[id].cells
            celdas3[0].children[0].checked = true
            //celdas2[7].innerHTML=$("[name='OnHand']").text().trim();
            celdas2[9].innerHTML = data1
            cant = document.querySelectorAll('#salida_2:checked').length;
            if (cant > 0) {
                document.getElementById('regist_sal').disabled = false
            } else {
                document.getElementById('regist_sal').disabled = true
            }
        });
}

function generar_salida() {
    let materiales = [];

    $('#tabla_consumo input[type="checkbox"]:checked').each(function (e) {
        if ($(this).prop("checked")) {

           // console.log(e);
            materiales[e] = $(this).closest('tr').children('td:eq(1)').text()
            //varch=String(materiales);
            // materiales.push($(this).closest('tr').children('td:eq(1)').text());                          
        }
    });
    //alertify(varch)
   // console.log(materiales);
    realizar_salida(materiales)
}

function realizar_salida(materiales) {
    if (materiales.length == 0) {
        alertify.error('Falta elegir almenos una solicitud');
    } else {
        $("#modal_realizar").modal('show');
       // console.log(materiales.length);
        cargar_consumo(materiales)
    }
}

function cargar_consumo(id) {

    $.ajax({
        beforeSend: function () {
            $("#data_consumo").html("Buscando informacion del articulo...");
        },
        url: 'busca_data_salida_numero.php',
        type: 'POST',
        data: null,
        success: function (z) {
            $("#numcito").html(z);
            document.getElementById('codig_ver').innerText = z;
          //  console.log(z);
        },
        error: function (jqXHR, estado, error) {
            alert("Ocurrio un error al consultar la informacion del articulo...reporte a soporte...!    " + estado + "    " + error);
        }
    });

    tamano = parseInt(id.length * 2);
    let id2 = [];
    if (id != "") {
        $(document).ready(function () {
            $id2 = id[0];
            $.post("busca_data_consumo.php", {
                    codigo: id,
                },
                function (data1) {
                    $("#data_consumo").html(data1);
                    $(".select2").select2();


                });
            /*  $.ajax({
                 beforeSend: function () {
                     $("#data_consumo").html("Buscando informacion del articulo...");
                 },
                 url: 'busca_data_consumo.php',
                 type: 'POST',
                 data: 'codigo=' + id,
                 success: function (x) {
                     $("#data_consumo").html(x);
                     //console.log(x);                  
                 },
                 error: function (jqXHR, estado, error) {
                     alert("Ocurrio un error al consultar la informacion del articulo...reporte a soporte...!    " + estado + "    " + error);
                 }
             }); */
            $.post("busca_data_consumo_det.php", {
                    codigo: id,
                    tamano: tamano
                },
                function (data1) {
                    $("#tabla_consumo_det").html(data1);
                    $(".select2").select2();


                });
            /* $.ajax({
                beforeSend: function () {
                    $("#data_consumo").html("Buscando informacion del articulo...");
                },
                url: 'busca_data_consumo_det.php',
                type: 'POST',
                data: 'codigo=' + id+'&tamano='+tamano,
                success: function (y) {
                  
                    //console.log(y);
                },
                error: function (jqXHR, estado, error) {
                    alert("Ocurrio un error al consultar la informacion del articulo...reporte a soporte...!    " + estado + "    " + error);
                }
            }); */
        });
    } else {}
}

function muestra_tabla() {
    var IdEstado = $("#IdEstado").val().trim();
    var IdTipo = $("#IdTipo").val().trim();
    if (IdEstado.trim() == "Seleccione un Tipo") {
        var n = noty({
            text: "Debe seleccionar una Tipo ...!",
            theme: 'relax',
            layout: 'center',
            type: 'error',
            timeout: 2000,
        });
    } else if (IdEstado.trim() == "Seleccione un Estado") {
        var n = noty({
            text: "Debe seleccionar una Estado...!",
            theme: 'relax',
            layout: 'center',
            type: 'error',
            timeout: 2000,
        });
    } else {
        if (IdEstado === '01') {
            $('#generar').removeClass('disabledTab');
            $('#generar').addClass('activeTab');
            //$('#generar').css( "display", "auto" ); 
        } else {
            $('#generar').removeClass('activeTab');
            $('#generar').addClass('disabledTab');
        }
        pone_lista_consumo(IdEstado, IdTipo)

    }
}

function lista_salidas() {
    $(document).ready(function () {
        fechai = $("#fi").val();
        fechaf = $("#ff").val();
        estado = $("#idEstado option:selected").val().trim();
        if (estado === "Seleccione un Estado") {
            alertify.error('Seleccione un Estado');

        } else if (fechai == "") {
            alertify.error('Seleccione un fecha inicio');
        } else if (fechaf == "") {
            alertify.error('Seleccione un fecha fin');
        } else {
            $.post("busca_sal_mercancia.php", {
                    fechai: fechai,
                    fechaf: fechaf,
                    statu: estado
                },
                function (inf) {

                    $("#data").html(inf);
                    $('#tabla_sal_mercancia').DataTable();


                });
        }

    })
}

function muestra_detalle_autorizaciones(num_ticket, estado) {
    var tic = num_ticket.split("|");
    estado = $("#IDestado option:selected").text().trim();
    $("#modal_solicitud_consumo").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $.ajax({
        beforeSend: function () {
            $("#detalle_de_venta").html("Consultando detalle...");
        },
        url: 'consulta_detalle_sal_mercancia.php',
        type: 'POST',
        data: 'codigo=' + tic + '&estado=' + estado,
        success: function (x) {
            $(".nuticket").html("");
            $("#idpedido").val(tic[1]);
            $(".nuticket").append(" Detalle  | <span class='label label-warning'>Codigo: " + tic + "</span>");
            $("#detalle_de_venta").html(x);
            if (estado == "Pendiente") {
                $('#pone_cmodelo').removeClass('disabledTab');
                $('#pone_cmodelo').addClass('activeTab');
                $('.comentar').removeClass('disabledTab');
                $('.comentar').addClass('activeTab');
            } else {
                $('#pone_cmodelo').removeClass('activeTab');
                $('#pone_cmodelo').addClass('disabledTab');
                $('.comentar').removeClass('activeTab');
                $('.comentar').addClass('disabledTab');
            }
            var idpedido = '';
            idpedido = tic[0];


        },
        error: function (jqXHR, estado, error) {
            $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}

function genera_opcion_GE() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#pone_opcion").html("Poniendo opciones...");
            },
            url: 'Mostrar_Fecha_GuiaEmi.php',
            type: 'POST',
            data: 'option=' + 1,
            success: function (res) {
                $("#pone_opcion").html(res);
                $(function () {
                    $('#daterange-btn').daterangepicker({
                            ranges: {
                                'Este dia': [moment(), moment()],
                                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                            },
                            startDate: moment().subtract(29, 'days'),
                            endDate: moment()
                        },
                        function (start, end) {
                            $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                            var xstart = start.format('YYYY-MM-DD');
                            var xend = end.format('YYYY-MM-DD');
                            $("#fi").val(xstart);
                            $("#ff").val(xend);
                            //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
                        }
                    );
                });
                $("#numero_caja").select2();
                $("#numero_ticket").inputmask('mask', {
                    'alias': 'numeric',
                    'autogroup': true,
                    'digits': 0,
                    'digitsOptional': false
                });
            },
            error: function (jqXHR, estado, error) {
                alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
                $("#pone_opcion").hmtl(estado + "     " + error);
            }
        });
    })
}