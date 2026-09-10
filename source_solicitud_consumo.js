

function busqueda_Producto() {
    var idTip = $("#idTipo").val().trim();
    var idSed = $("#idSede").val().trim();
    if (idTip.trim() == "Seleccione Tipo") {
        var n = noty({
            text: "Debe seleccionar una Tipo ...!",
            theme: 'relax',
            layout: 'center',
            type: 'error',
            timeout: 2000,
        });
    } else if (idSed.trim() == "Seleccione Sede") {
        var n = noty({
            text: "Debe seleccionar una Sede...!",
            theme: 'relax',
            layout: 'center',
            type: 'error',
            timeout: 2000,
        });
    } else {
        $("#modal_busqueda_arts").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        $('#modal_busqueda_arts2').on('shown.bs.modal', function () {
            $("#lista_articulos").html("");
            // $("#cantidad").val("");
            $("#cantidad").focus();
            pone_lista_ccostos2(idSed)

        });

    }
}

function escanear_Producto() {
    var idTip = $("#idTipo").val().trim();
    var idSed = $("#idSede").val().trim();
    if (idTip.trim() == "Seleccione Tipo") {
        var n = noty({
            text: "Debe seleccionar una Tipo ...!",
            theme: 'relax',
            layout: 'center',
            type: 'error',
            timeout: 2000,
        });
    } else if (idSed.trim() == "Seleccione Sede") {
        var n = noty({
            text: "Debe seleccionar una Sede...!",
            theme: 'relax',
            layout: 'center',
            type: 'error',
            timeout: 2000,
        });
    } else {
        $("#modal_escanear_arts").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        pone_lista_ccostos(idSed)

    }
}

function buscaarticulocompras() {
    $.ajax({
        beforeSend: function () {
            $("#lista_articulos").html("<img src='dist/img/default.gif'></img>");
        },
        url: 'articulos_solicitudes_consumo.php',
        type: 'POST',
        data: 'articulo=' + $("#articulo_buscar").val(),
        success: function (x) {
            $("#lista_articulos").html(x);
        },
        error: function (jqXHR, estado, error) {
            $("#lista_articulos").html("Error en la peticion AJAX..." + estado + "      " + error);
        }
    });
}

function showContent() {
    check = document.getElementById("opciones");
    if (check.checked) {
        $('.opcion1').removeClass('disabledTab');
        $('.opcion1').addClass('activeTab');
        $('.opcion2').removeClass('activeTab');
        $('.opcion2').addClass('disabledTab');
    } else {
        $('.opcion2').removeClass('disabledTab');
        $('.opcion2').addClass('activeTab');
        $('.opcion1').removeClass('activeTab');
        $('.opcion1').addClass('disabledTab');
    }
}

function add_art2(art) {
    //alert(art);
    $("#modal_busqueda_arts2").modal("toggle");
    $("#codigo").val(art.trim());
    $("#stock").val('');

    busca_articulo2();
    //Lista_almacenOrigbe();
    //Lista_almacenDestino();
}

function busca_articulo2() {
    $(document).ready(function () {
        var cod = $("#codigo").val().trim();
        //  var descrip=$("#articulo_desc").val().trim();
        //  var UMCompra=$("#UMCompra").val().trim();
        // var tipcli=$("#tipocliente").val().trim();
        if (cod.trim() != "") {
            $(document).ready(function () {
                $.ajax({
                    beforeSend: function () {
                        $("#data_articulo").html("Buscando informacion del articulo...");
                    },
                    url: 'busca_data_articulo_compras.php',
                    dataType: 'json',
                    type: 'POST',
                    data:
                    //PERMITE HACER MULTIPLE CONSULTA GC
                    {
                        codigo: $("#codigo").val(),
                        codigolp: $("#codigolp").val(),
                        idcliente_credito: $("#idcliente_credito").val()
                    },
                    //              'codigo='+$("#codigo").val(),
                    success: function (data) {
                        if (data == 0) {
                            //            alert("No existe el articulo...!");
                            var n = noty({
                                text: "No existe el articulo...!",
                                theme: 'relax',
                                layout: 'center',
                                type: 'error',
                                timeout: 2000,
                            });
                            $("#codigo").val("");
                            $("#codigo").focus();
                            $("#cantidad").attr("disabled", true);
                            $("#cantidad").val(0.00);
                            $("#dsctoline").attr("disabled", true);
                            $("#dsctoline").val(0.00);
                            $("#monedaitem").attr("disabled", true);
                            $("#monedaitem").val("");
                            //$("#preciou").attr("disabled", true);
                            $("#preciou").val(0.00);
                            $("#preciouigv").attr("disabled", true);
                            $("#preciouigv").val(0.00);
                            //  $("#articulo_desc").html("");
                            $("#articulo_desc").val("");
                            $("#UMCompras").val("");
                            $(".exis").html(0);
                            $(".preciol").html(0.00);
                            $("#imagen").attr("src", 'dist/img/sin_foto.png');
                        } else {
                            $("#cantidad").val(0.00);
                            $("#dsctoline").val(0.00);
                            $("#monedaitem").val("");
                            $("#preciou").val(0.00);
                            $("#articulo_desc").val(data[0].descripcion);
                            $("#UMCompras").val(data[0].UMCompra);
                            //  $("articulo_desc").html(data[0].descripcion);
                            $(".exis").html(data[0].cantidad);
                            $(".preciol").html(data[0].precio);
                            $("#monedaitem").attr("disabled", true);
                            $("#monedaitem").val(data[0].moneda);
                            // $("#preciou").attr("disabled", true);
                            //$('#preciou').number(true, 2);
                            $("#preciou").val(data[0].precio);
                            // SI TIPO CLIENTE = 115 = EXTRANJERO
                            if (data[0].tipocliente == 115) {
                                $("#preciouigv").val((data[0].precio));
                            } else {
                                $("#preciouigv").val((data[0].precio) * 1.18);
                            }
                            //$('#cantidad').number(true, 2);
                            $("#cantidad").attr("disabled", false);
                            $("#cantidad").val(0.00);
                            // $("#dsctoline").attr("disabled", false);
                            $("#dsctoline").val(0.00);
                            $("#preciou").select();
                            $("#cantidad").focus();
                            if (data[0].imagen != "") {
                                $("#imagen").attr("src", 'img_articulos/' + data[0].imagen);
                            } else {
                                $("#imagen").attr("src", 'dist/img/sin_foto.png');
                            }
                            if (data[0].cantidad <= 0) {
                                // GERSON: AGREGANDO VALIDACION VISUAL - Plugins=>Noty
                                var n = noty({
                                    text: "No hay suficiente existencia...!",
                                    theme: 'relax',
                                    layout: 'center',
                                    type: 'information',
                                    timeout: 2000,
                                });
                                //                alert("No hay suficiente existencia...!")
                                //                 $("#codigo").val("");
                                //                 $("#codigo").focus();
                                //                 $("#cantidad").attr("disabled", true);
                                //                $("#dsctoline").attr("disabled", true);
                                //                 $("#preciou").attr("disabled", true);
                                $("#cantidad").focus();
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
        } else {}
    })
}

function agrega_a_lista2() {
    $(document).ready(function () {
        if ($("#cantidad").val() > 0) {
            var articulo = $("#codigo").val();
            var descripcion = $("#articulo_desc").val();
            var unidad_medida = $("#UMCompras").val();

            var cantidad = $("#cantidad").val();
            var ccosto = $("#centro_cos2").val()
            var num = parseFloat(document.getElementById('tabla_articulos').getElementsByTagName('tr').length - 1)
            encontradoResultado = false;
            encontradoResultado2 = false;
            pos1=0;
            pos2=-1;
            if(ccosto=='-1'){
                alertify.error('Falta elegir Centro de costo'); 
            }else{
                $("#tabla_articulos tr").find('td:eq(1)').each(function(e,i) {

                    //obtenemos el codigo de la celda
                    dato = $(this).html();
    
                    //comparamos para ver si el código es igual a la busqueda
                    if (dato === articulo) {
                        console.log(e);
                        posicion=e+1;
                        //aqui ya que tenemos el td que contiene el codigo utilizaremos parent para obtener el tr.
                        trDelResultado = $(this).parent();
                        
                        console.log(trDelResultado);
                        encontradoResultado = true;
                        pos1=e;
                    }
    
                })
                $("#tabla_articulos tr").find('td:eq(3)').each(function(e,i) {
    
                    //obtenemos el codigo de la celda
                    dato2 = $(this).html();
    
                    //comparamos para ver si el código es igual a la busqueda
                    if (dato2 === ccosto) {
                        console.log(e);
                        posicion=e+1;
                        //aqui ya que tenemos el td que contiene el codigo utilizaremos parent para obtener el tr.
                        trDelResultado = $(this).parent();
                        
                        console.log(trDelResultado);
                        encontradoResultado2 = true;
                        pos2=e;
                    }
    
                })
                if (encontradoResultado === true  && encontradoResultado2 === true && pos1===pos2) {
                    alertify.error('Ya existe'); 
                }else{
                    alertify.success('Se agrego');
                    $("#tabla_articulos > tbody").append("<tr><td class='center'>"+num+"<td class='center'>" + articulo + "</td><td class='center'>" + descripcion + "<td class='center'>" + ccosto + "</td><td class='center' >" + cantidad + "</td><td class='center' >" + unidad_medida + "</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
        
                    $("#codigo").val("");
                    $("#articulo_desc").val("");
                    $("#articulo_buscar").val("");
        
                    $("#cantidad").val(0.00);
                    $("#dsctoline").val(0.00);
                    $("#monedaitem").val("");
                    $("#preciou").val(0.00);
                    $("#preciouigv").val(0.00);
                    $("#cantidad").attr("disabled", true);
                    $("#dsctoline").attr("disabled", true);
                    $("#Idtipoproducto").attr("disabled", true);
        
                    //$("#preciou").attr("disabled", true);
                    $("#codigo").focus();
                    $(".widget-user-desc").html("");
                    $(".exis").html(0);
                    $(".preciol").html(0.00);
                    /*cancela_operacion();*/
                    $("#imagen").attr("src", 'dist/img/sin_foto.png');
                    $("#servicio_desc").focus();
                    $('#modal_busqueda_arts2').modal('hide');
        
                    $('#modal_busqueda_arts').modal('hide');
                }
            }
        } else {
            var n = noty({
                text: "La cantidad es invalida...!",
                theme: 'relax',
                layout: 'center',
                type: 'error',
                timeout: 2000,
            });
        }
    })
}

function agrega_a_lista3() {
    $(document).ready(function () {
        if ($("#canti").val() > 0) {
            var codigo = $("#nombre_c2").val();
            var descripcion = $("#item_name").val();
            var unidad = $("#item_unidad").val();
            var ccosto = $("#centro_cos").val()
            //var stock = $("#centro_cos").val()
            var num = parseFloat(document.getElementById('tabla_articulos').getElementsByTagName('tr').length - 1)
           
            var cantidad = parseFloat($("#canti").val()).toFixed(4);
            var cantidad2 = 0.0000;
            encontradoResultado = false;
            encontradoResultado2 = false;
            pos1=0;
            pos2=-1;
            $("#tabla_articulos tr").find('td:eq(1)').each(function(e,i) {

                //obtenemos el codigo de la celda
                dato = $(this).html();

                //comparamos para ver si el código es igual a la busqueda
                if (dato === codigo) {
                    console.log(e);
                    posicion=e+1;
                    //aqui ya que tenemos el td que contiene el codigo utilizaremos parent para obtener el tr.
                    trDelResultado = $(this).parent();
                    
                    console.log(trDelResultado);
                    encontradoResultado = true;
                    pos1=e;
                }

            })
            $("#tabla_articulos tr").find('td:eq(3)').each(function(e,i) {

                //obtenemos el codigo de la celda
                dato2 = $(this).html();

                //comparamos para ver si el código es igual a la busqueda
                if (dato2 === ccosto) {
                    console.log(e);
                    posicion=e+1;
                    //aqui ya que tenemos el td que contiene el codigo utilizaremos parent para obtener el tr.
                    trDelResultado = $(this).parent();
                    
                    console.log(trDelResultado);
                    encontradoResultado2 = true;
                    pos2=e;
                }

            })

            if(codigo==''){
                alertify.error('Falta ItemCode'); 
            }
            if(descripcion==''){
                alertify.error('Falta Descripcion'); 
            }
            if(unidad==''){
                alertify.error('Falta Unidad'); 
            }
            if(ccosto=='-1'){
                alertify.error('Falta elegir Centro de costo'); 
            }
            if (codigo !=='' && descripcion !=='' && unidad !=='' && ccosto !=='-1') {
                if (encontradoResultado === true  && encontradoResultado2 === true && pos1===pos2) {
                    alertify.error('Ya existe'); 
                }else{
                    $("#tabla_articulos > tbody").append("<tr><td class='center'>"+num+"<td class='center'>" + codigo + "</td><td class='center'>" +
                    descripcion + "<td class='center'>" + ccosto + "</td><td class='center' >" + cantidad + "</td><td class='center' >" + unidad + "</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
    
                    $("#nombre_c2").val("");
                    $("#item_name").val("");
                    $("#item_unidad").val("");
                    //$("#centro_cos").html(0);
                    $("#canti").val(0.00);
                
                    $("#cantidad").attr("disabled", true);
                    $("#dsctoline").attr("disabled", true);
                    $("#Idtipoproducto").attr("disabled", true);
    
                    //$("#preciou").attr("disabled", true);
                    $("#codigo").focus();
                    $(".widget-user-desc").html("");
                    $(".exis").html(0);
                    $(".preciol").html(0.00);
                    /*cancela_operacion();*/
                    $("#imagen").attr("src", 'dist/img/sin_foto.png');
                    $("#servicio_desc").focus();
                    $('#modal_escanear_arts').modal('hide');
                    alertify.success('Se a insertado Correctamente');
                }
                   
                
                
            }
           
            //$("#idTipo").prop("disabled", true);
            //$("#idSede").prop("disabled", true);
            //   resumenreqcompras();
        } else {
            alertify.error('Cantidad Invalida'); 
        }
    })
}

function pone_lista_ccostos(idSed) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_CCOSTO2").html("Recuperando usuarios...");
            },
            url: 'Lista_centro_costo.php',
            type: 'POST',
            data: 'sede2=' + idSed,
            success: function (x) {
                $("#lista_CCOSTO2").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {}
        });
    });
}

function pone_lista_ccostos2(idSed) {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_CCOSTO3").html("Recuperando usuarios...");
            },
            url: 'Lista_centro_costo2.php',
            type: 'POST',
            data: 'sede2=' + idSed,
            success: function (x) {
                $("#lista_CCOSTO3").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {}
        });
    });
}
$(function () {
    // Evento que selecciona la fila y la elimina
    $(document).on("click", ".delete", function () {
        var parent = $(this).parents().parents().get(0);
        $(parent).remove();
        //resumen_pre();
    });
});

function Busca_Confirmacion() {

    $("#btn_cancela").prop("disabled", true);
    var n = noty({
        text: "¿Desea procesar la solicitud...?",
        theme: 'relax',
        layout: 'center',
        type: 'success',
        buttons: [{
                addClass: 'btn btn-primary',
                text: 'Si, Quiero!',
                onClick: function ($noty) {


                    $noty.close();
                    procesoa_solicitud();
                   
                    $("#idTipo").prop("disabled", false);
                    $("#idSede").prop("disabled", false);
                    //                          $("#tabla_articulos > tbody:last").children().remove();
                    //                          resumen();
                    //                          cancela_codigo();
                    //                          $("#codigo").focus();
                }
            },
            {
                addClass: 'btn btn-danger',
                text: 'No, Cancelar',
                onClick: function ($noty) {
                    //                      $("#btn_cancela").prop("disabled", false);
                    $noty.close();

                    //						    $('#modal_prepara_venta').modal('toggle');
                }
            }
        ]
    });
    /// $("#idTipo").val('')
       ///             $("#idSede").val('')
          //          $("#comentarios").val('')
}
//Agrega la solicitud de la tabla  temporal creada en el php
function procesoa_solicitud() {
    $(document).ready(function () {

        fechadoc = $("#fecha").val();
        fechasoli = $("#fechasolici").val();
        comentarios = $("#comentarios").val();
        idTipo2 =$("#idTipo").val();
        idSede2 = $("#idSede").val();
        canti_product=parseFloat(document.getElementById('tabla_articulos').getElementsByTagName('tr').length - 1)
     
        // console.log(idTipo2);
        //console.log(idSede2);
        if (idTipo2 == "Seleccione Tipo") {
            var n = noty({
                text: "Debe seleccionar una Sede Origen...!",
                theme: 'relax',
                layout: 'center',
                type: 'error',
                timeout: 2000,
            });
        } else if (idSede2 == "Seleccione Sede") {
            var n = noty({
                text: "Debe seleccionar una Sede Origen...!",
                theme: 'relax',
                layout: 'center',
                type: 'error',
                timeout: 2000,
        });


        } else  if (canti_product ==0){
            var n = noty({
              text: "Tabla vacia...!",
              theme: 'relax',
              layout: 'center',
              type: 'error',
              timeout: 2000,
            });
          }else {
            $.post("InsertarEncabezadoConsumo.php", {
                    fechadoc: fechadoc,
                    fechasoli: fechasoli,
                    idTip: idTipo2,
                    idSed: idSede2,
                    comentarios: comentarios
                },

                function (data1) {
                    $("#nguia").html(data1);
                    $("#nguia").hide();

                    console.log(data1);
                    va = $("#valor").text().trim();
                    if (va == 1) {
                        alertify.error('El correlativo del documento ya se encuentra registrado');

                    } else {
                        
                        $('#tabla_articulos > tbody > tr').each(function () {
                            id = $("#nguia").text().trim();
                            var line = $(this).find('td').eq(0).html();
                            var cod = $(this).find('td').eq(1).html();
                            var descripcion_art = $(this).find('td').eq(2).html();
                            var ccosto = $(this).find('td').eq(3).html();
                            var cantidad = $(this).find('td').eq(4).html();
                            var unidad = $(this).find('td').eq(5).html();
                            //  alert(cod);
                            $.post("InsertarDetalleConsumo.php", {
                                    id: id,
                                    line: line,
                                    cod: cod,
                                    descripcion_art: descripcion_art,
                                    ccosto: ccosto,
                                    cantidad: cantidad,
                                    unidad: unidad
                                },

                                function (data1) {

                                    //            $("#idcliente_credito").val("");
                                    $("#comentarios").val("");
                                    //            $("#idcliente_parent").val("");

                                    $("#tabla_articulos > tbody:last").children().remove();
                                    $("#Idtipoproducto").attr("disabled", false);
                                    //            $("#idcliente_razon").val("");
                                    //            $("#idcliente_ruc").val("");
                                    // quita_cliente();
                                    // pone_num_venta();



                                    //                               if(yapuso==0){
                                    //                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
                                    //                               yapuso=1;
                                    //                               }else{
                                    //                               llena_ticket_archivo(cod,can,preciou,descripcion_art,yapuso,monto,$("#totales").html(),$("#paga_con").val(),$("#el_cambio").val(),n_tic);
                                    //                               }
                                })
                        })
                    }

                });


        }
        $("#comentarios").val('');
        $("#idTipo").val('');
          $("#idSede").val('');
    })
  
  //  setTimeout('location.reload()',2000);
}

function busca_solicitud_au() {
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
            beforeSend: function () {
            $("#data").html("Buscando las ventas, un momento...");
            },
            url: 'busca_solconsumo_autorizacion.php',
            type: 'POST',
            data: 'estado=' + $("#IDestado option:selected").val().trim(),
            success: function (res) {
            $("#data").html(res);
            $(document).ready(function () {
                $('#tabla_sol_consumo').DataTable();
            });
            },
            error: function (jqXHR, estado, error) {
            alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
            $("#data").hmtl(estado + "     " + error);
            }
        });


        })
}

function muestra_detalle_autorizaciones(num_ticket) {
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
        url: 'consulta_detalle_solconsumo_autorizaciones.php',
        type: 'POST',
        data: 'codigo=' + tic,
        success: function (x) {
            $(".nuticket").html("");
            $("#idpedido").val(tic[1]);
            $(".nuticket").append("AUTORIZACIONES: Detalle  | <span class='label label-warning'>Codigo: " + tic + "</span>");
            $("#detalle_de_venta").html(x);
            $.post("busca_modelo_autorizacion.php", {
              },
              function(data) {
                $("#cont_aut").html(data);
                valor= $("#cont_aut").text().trim();
                if (valor=='a') {
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
                }else{
                    $('.comentar').removeClass('activeTab');
                    $('.comentar').addClass('disabledTab');
                    $('#pone_cmodelo').removeClass('activeTab');
                    $('#pone_cmodelo').addClass('disabledTab');
                }
              });
            /* if ($tipo_user !=='2' || $nombre_user ==='rvivas' ) {
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
            }else{
                $('.comentar').removeClass('activeTab');
                $('.comentar').addClass('disabledTab');
                $('#pone_cmodelo').removeClass('activeTab');
                    $('#pone_cmodelo').addClass('disabledTab');
            } */
            
            var idpedido = '';
            idpedido = tic[0];
            $(document).ready(function () {
                $.ajax({
                    //          beforeSend: function(){
                    //            $("#montolp").html("Recuperando Lista Precios...");
                    //           },
                    url: 'pone_modelo_autoriza_solCon_condicion.php',

                    type: 'POST',
                    data: {
                        idpedido
                    },
                    success: function (Y) {
                        $("#idmodelo").val("");
                        $("#comentariosaut").val("");
                        $("#pone_cmodelo").html(Y);
                        console.log(Y);
                        $(".select2").select2();
                        //              alert($("#totales").html())
                        //$("#montolp2").val($("#montolp").val());

                    },
                    error: function (jqXHR, estado, error) {}
                });
            });

        },
        error: function (jqXHR, estado, error) {
            $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}

function procesa_autorizacion(numero) {
    $(document).ready(function () {
  
      var idautoriza = '1';
      var id_ticket = '0';
      var idmodel = '';
      var comentaaut = '';
      // $('#modal_detalle_venta').modal('toggle');
      id_ticket = numero;
      idmodel = $("#idmodelo").val();
      comentaaut = $("#comentariosaut").val();
      if ($("#idmodelo").val() != "") {
        $.ajax({
          beforeSend: function () {},
          url: 'procesa_solCos_autorizacion.php',
          type: 'POST',
          data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
          success: function (x) {
            var n = noty({
              text: "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
              theme: 'relax',
              layout: 'topLeft',
              type: 'success',
              timeout: 2000,
            });
            $("#comentarios").val("");
            busca_solicitud_au()
          },
          error: function (jqXHR, estado, error) {
            $("#errores").html('Error... ' + estado + '  ' + error);
          }
        });
      } else {
        var n = noty({
          text: "Debe seleccionar un Modelo de Autorización...: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'warning',
          timeout: 2000,
        });
      }
    });
}

/*******PROCESA RECHAZO******************************/
function procesa_rechazo(numero) {
    $(document).ready(function () {
  
      var idautoriza = '0';
      var id_ticket = '0';
      var idmodel = '';
      var comentaaut = '';
      // $('#modal_detalle_venta').modal('toggle');
      id_ticket = numero
      idmodel = $("#idmodelo").val();
      comentaaut = $("#comentariosaut").val();
      if ($("#idmodelo").val() != "") {
        $.ajax({
          beforeSend: function () {},
          url: 'procesa_solCos_rechazo.php',
          type: 'POST',
          data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
          success: function (x) {
            var n = noty({
              text: "Se ha procedido al RECHAZO del pedido N°: " + id_ticket,
              theme: 'relax',
              layout: 'topLeft',
              type: 'warning',
              timeout: 2000,
            });
            busca_solicitud_au()
          },
          error: function (jqXHR, estado, error) {
            $("#errores").html('Error... ' + estado + '  ' + error);
          }
        });
      } else {
        var n = noty({
          text: "Debe seleccionar un Modelo de Autorización....: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'warning',
          timeout: 2000,
        });
      }
    });
  }
  /*********************************************************************/
  