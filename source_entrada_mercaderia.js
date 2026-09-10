function lista_cliente() {
    $.ajax({
        beforeSend: function () {
            $("#lista_cliente").html("Recuperando Lista ...");
        },
        url: "listar_clientes_mercancia.php",
        type: "POST",
        data: '',
        success: function (x) {
            $("#lista_cliente").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });
}


function lista_mercaderia() {

    $.ajax({
        beforeSend: function () {
            $("#lista_mercaderia").html("Recuperando Lista ...");
        },
        url: "listado_entrada_mercancia.php",
        type: "POST",
        data: 'lista_cliente=' + $("#lista_cliente option:selected").val(),
        success: function (x) {
            $("#lista_mercaderia").html(x);
            $("#tabla_cot").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
}



$(document).on('click', '#procesar', function () {
    cant = document.querySelectorAll('#procesar:checked').length / 2;
    //console.log('hola');
    if ($(this).is(':checked')) {
        if (cant > 0) {
            $('#btn-det').show();
        } else {
            $('#btn-det').hide();
        }
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
    } else {
        $(this).parents("tr").find("td").css("background-color", "white");
        if (cant > 0) {
            $('#btn-det').show();
        } else {
            $('#btn-det').hide();
        }

    }
});



function procesar_mercancia() {
    $("#modal_procesar").modal("show"); // abri

    let materiales = [];
    $('#tabla_cot input[type="checkbox"]:checked').each(function (
        e
    ) {
        if ($(this).prop("checked")) {
            materiales[e] = $(this).closest("tr").children("td:eq(1)").text();
        }
    });
    //console.log(materiales);
    cargar_consumo(materiales)
    cardcode = $("#lista_cliente option:selected").val();
    consultar_data_mercancia(cardcode);
}



function cargar_consumo(id) {

    $.ajax({
        beforeSend: function () {
            $("#data_consumo").html("Buscando informacion...");
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
            $.ajax({
                beforeSend: function () {
                    $("#tabla_consumo_det").html("Consultando informacion...");
                },
                url: 'busca_data_mercancia_det.php',
                type: 'POST',
                data: 'codigo=' + id + '&tamano=' + tamano,
                success: function (data1) {
                    $("#tabla_consumo_det").html(data1);
                    $(".select2").select2();
                },
                error: function (jqXHR, estado, error) {
                    $("#tabla_consumo_det").html(estado + "    " + error);
                }
            });

            /*  $.post("busca_data_mercancia_det.php", {
                     codigo: id,
                     tamano: tamano
                 },
                 function (data1) {
                     $("#tabla_consumo_det").html(data1);
                     $(".select2").select2();
 
 
                 }); */
        });
    } else { }
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


$(document).on('click', '#ingresarCant', function () {
    if ($(this).is('input[type="number"]')) {
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
        $(this).parents("tr").find('td:eq(0) input[type="checkbox"]').prop("checked",true)
        
    } else {
        $(this).parents("tr").find("td").css("background-color", "white");
        document.getElementById('regist_sal').disabled = true
    }
});
$('#ingresarCant').keyup(function() {
    //$(this).closest("tr").children("td:eq(1)").text();
    console.log('olg');
    //$(this).parents("tr").find("td:eq(0)").prop("checked",true)
  } );



function consultar_data_mercancia(cardcode) {
    $.ajax({
        url: "busca_data_mercancia.php",

        type: "POST",
        data: {
            cardcode: cardcode,
        },
        success: function (x) {
            //console.log(x);
            var data = x;
            var idcl = data.split("|");
            //linea_credito =idcl[4];

            // $("#docentry").val(docentry);
            $("#data_ruc").val(idcl[0]);
            $("#data_proveedor").val(idcl[1]);
            $("#data_contacto").val(idcl[2]);
            $("#data_referencia").val(idcl[3]);
            $("#data_moneda").val(idcl[4]);
            $("#data_folio").val(idcl[5]);
            $("#comentarios").val(idcl[6]);

            //consultar_data_cot_det(docentry);
        },
        error: function (jqXHR, estado, error) { },
    });
}




function registrar_datos() {
    fecha_cont_salida = $("#fecha_cont_salida").val();
    fecha_doc_salida = $("#fecha_doc_salida").val();
    fecha_ven_salida = $("#fecha_ven_salida").val();
    data_ruc = $("#data_ruc").val();
    data_proveedor = $("#data_proveedor").val();
    data_contacto = $("#data_contacto").val();
    data_referencia = $("#data_referencia").val();
    data_moneda = $("#data_moneda").val();
    data_folio = $("#data_folio").val();
    bandera = true;
    bandera2 = true;
    //det = document.querySelectorAll("#salida_2:checked").length;
    if (data_referencia === "") {
        bandera = false
        alertify.error('Ingrese referencia');

    }
    if (data_folio === "") {
        bandera = false
        alertify.error('Ingrese numero de folio');
    }
    if (bandera === true) {
        $("[name='salida_mer[]']:checked").each(function (key) {
            var BaseLineNum = $(this).parents("tr").find('td:eq(2)').text();
            var baseentry = $(this).parents("tr").find('td:eq(1)').text();
            var docnum = $(this).parents("tr").find('td:eq(3)').text();
            var itemcode = $(this).parents("tr").find('td:eq(4)').text();
            var descripcion = $(this).parents("tr").find('td:eq(5)').text();
            var preciou = $(this).parents("tr").find('td:eq(6)').text();
            var stock = $(this).parents("tr").find('td:eq(7)').text();
            var um = $(this).parents("tr").find('td:eq(8)').text();
            var cantidadpendiente = $(this).parents("tr").find('td:eq(9)').text();
            var ingresarcantidad = $(this).parents("tr").find('input[id="ingresarCant"]').val(); 
            var objtype = $(this).parents("tr").find('td:eq(11)').text();
            var ingresarcantidad2 = parseFloat(ingresarcantidad);
            

            if (0 > ingresarcantidad2) {
                bandera2 = false
                alertify.error('Cantidad no Validad');
                $(this).parents("tr").find('td:eq(10)').css("background-color", "#F67280");
            }
            if (ingresarcantidad === "") {
                bandera2 = false
                alertify.error('Falta llenar la cantidad');
                $(this).parents("tr").find('td:eq(10)').css("background-color", "#F67280");
            }
            if (ingresarcantidad2 > cantidadpendiente) {
                bandera2 = false
                alertify.error(itemcode + ' | ' +'No puedes ingresar una cantidad superior a la cantidad pendiente');
                
            }
        });
        if (bandera2 === true) {
            $.ajax({
                url: "inserta_datos_mercancia_cab.php",
                type: "POST",
                data: { fecha_cont_salida: fecha_cont_salida, fecha_doc_salida: fecha_doc_salida, fecha_ven_salida: fecha_ven_salida, data_ruc: data_ruc, data_proveedor: data_proveedor, data_contacto: data_contacto, data_referencia: data_referencia, data_moneda: data_moneda, data_folio: data_folio },
                success: function (x) {
                    //console.log(x);
                    //alertify.success('Se registro correctamente');
                    global = parseInt(x);
                    //console.log(global);
                    //aqui comienza el deta
                    if (global == 0) {
                        alertify.error("No inserto");
                    } else {
                        $("[name='salida_mer[]']:checked").each(function (key) {
                            var BaseLineNum = $(this).parents("tr").find('td:eq(2)').text();
                            var baseentry = $(this).parents("tr").find('td:eq(1)').text();
                            var docnum = $(this).parents("tr").find('td:eq(3)').text();
                            var itemcode = $(this).parents("tr").find('td:eq(4)').text();
                            var descripcion = $(this).parents("tr").find('td:eq(5)').text();
                            var preciou = $(this).parents("tr").find('td:eq(6)').text();
                            var stock = $(this).parents("tr").find('td:eq(7)').text();
                            var um = $(this).parents("tr").find('td:eq(8)').text();
                            var cantidadpendiente = $(this).parents("tr").find('td:eq(9)').text();
                            var ingresarcantidad = $(this).parents("tr").find('input[id="ingresarCant"]').val();
                            var objtype = $(this).parents("tr").find('td:eq(11)').text();
                            var ingresarcantidad2 = parseFloat(ingresarcantidad);
                           
                            $.ajax({
                                beforeSend: function () { },
                                url: "inserta_datos_mercancia_det.php",
                                type: "POST",
                                data:
                                  "&baseentry=" +
                                  baseentry +
                                  "&BaseLineNum=" +
                                  BaseLineNum +
                                  "&docnum=" +
                                  docnum +
                                  "&itemcode=" +
                                  itemcode +
                                  "&descripcion=" +
                                  descripcion +
                                  "&preciou=" +
                                  preciou +
                                  "&stock=" +
                                  stock +
                                  "&um=" +
                                  um +
                                  "&cantidadpendiente=" +
                                  cantidadpendiente +
                                  "&ingresarcantidad=" +
                                  ingresarcantidad2 +
                                  "&objtype=" +
                                  objtype +
                                  "&docentry=" +
                                  global,
                                success: function (data) {
                                  
                                  $("#modal_procesar").modal("hide"); //cerrar modal
                                  alertify.success('Se registro correctamente');
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





}




