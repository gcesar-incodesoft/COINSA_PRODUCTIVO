function busqueda_Producto() {
  var IdOri = $("#idOri").val().trim();
  var IdDest = $("#idDes").val().trim();
  if (IdOri.trim() == "Seleccione Sede") {
    var n = noty({
      text: "Debe seleccionar una Sede Origen...!",
      theme: 'relax',
      layout: 'center',
      type: 'error',
      timeout: 2000,
    });

  } else if (IdDest.trim() == "Seleccione Sede") {
    var n = noty({
      text: "Debe seleccionar una Sede Destino...!",
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







    });

  }
}




/*********************************bus PRODUCTOS SOLICITUDES*************************************************/

function buscaarticulocompras() {
  $.ajax({
    beforeSend: function () {
      $("#lista_articulos").html("<img src='dist/img/default.gif'></img>");
    },
    url: 'articulos_solicitudes_traslado.php',
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
/************************************************************************************/

/*********************************buscar*************************************************/

function add_art2(art) {
  //alert(art);
  $("#modal_busqueda_arts2").modal("toggle");
  $("#codigo").val(art.trim());
  $("#stock").val('');

  busca_articulo2();
  Lista_almacenOrigbe();
  Lista_almacenDestino();

  // busqueda_art2();
}
/************************************************************************************/
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



//////////////listar alamacenes

function Lista_almacenOrigbe() {


  idOri = $("#idOri option:selected").val();

  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#Lista_Almacenes").html("Recuperando Lista ...");
      },
      url: 'Lista_Almacenes.php',
      type: 'POST',
      data: 'id=' + idOri,
      success: function (x) {
        $("#AORIGI").html(x);
        //  $("#pone_ccosto2").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {}
    });
  });
}



function Lista_almacenDestino() {




  idDes = $("#idDes option:selected").val();

  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#Lista_Almacenes").html("Recuperando Lista ...");
      },
      url: 'Lista_Almacenes.php',
      type: 'POST',
      data: 'id=' + idDes,
      success: function (x) {
        $("#ADES").html(x);
        //  $("#pone_ccosto2").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {}
    });
  });
}


///consultar_stockalmacen


//Mostrar  CLientes con pedidos

$(document).ready(function () {

  $("#AORIGI").on('change', function () {
    $("#AORIGI option:selected").each(function () {
      elegido = $(this).val();
      cod = $("#codigo").val().trim();

      $.post("consultar_stockalmacen.php", {
          card: elegido,
          cod: cod
        },
        function (data2) {


          var inputNombre = document.getElementById("stock");

          inputNombre.value = data2.trim();


        });


    });
  });
});


////

/*************************************************************************************/
function agrega_a_lista2() {
  $(document).ready(function () {
    if ($("#cantidad").val() > 0) {
      var articulo = $("#codigo").val();
      var descripcion = $("#articulo_desc").val();
      var ori = $("#AORIGI option:selected").val();
      var dest = $("#ADES option:selected").val();
      var stock = $("#stock").val();
      var almacen = $("#UMCompras").val();
      var cantidad = $("#cantidad").val();
      bandera = true;

      if (ori == 'Seleccione un Almacen') {
        alertify.error('Falta elegir Almacen de origen');
        bandera = false
      }
      if (dest == 'Seleccione un Almacen') {
        alertify.error('Falta elegir Almacen de destino');
        bandera = false
      }
      if (stock == '') {
        alertify.error('Falta stock');
        bandera = false
      }
      if (cantidad == '') {
        alertify.error('Falta cantidad');
        bandera = false
      }
      if (cantidad < 0) {
        alertify.error('Cantidad incorrecta');
        bandera = false
      }
      if (bandera === true) {
        $("#tabla_articulos > tbody").append("<tr><td class='center'>" + articulo + "</td><td class='center'>" +
        descripcion + "<td class='center'>" + ori + "</td><td class='center'>" +
        dest + "</td><td class='center' >" + almacen + "</td><td class='center' >" + stock + "</td><td class='center' >" + cantidad + "</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
        $("#UMCompras").val("");
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
        $("#idOri").prop("disabled", true);
        $("#idDes").prop("disabled", true);
      }
     
      //   resumenreqcompras();
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
/************************************************************************************/
/************************************************************************************/

function Busca_Confirmacion() {

  $("#btn_cancela").prop("disabled", true);
  var n = noty({
    text: "¿Desea proceso el requerimiento de compra...?",
    theme: 'relax',
    layout: 'center',
    type: 'success',
    buttons: [{
        addClass: 'btn btn-primary',
        text: 'Si, Quiero!',
        onClick: function ($noty) {


          $noty.close();
          procesa_reqcompra();
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
}

/************************************************************************************/
/************************************************************************************/
function procesa_reqcompra() {
  $(document).ready(function () {

    fechadoc = $("#fecha").val().trim();
    fechasoli = $("#fechasolici").val().trim();
    sedeori = $("#idOri option:selected").val();
    sededes = $("#idDes option:selected").val();
    comentarios = $("#comentarios").val().trim();
    var num = parseFloat(document.getElementById('tabla_articulos').getElementsByTagName('tr').length - 1)
    var IdOri = $("#idOri").val().trim();
    var IdDest = $("#idDes").val().trim();
    var comen = $("#comentarios").val().trim();
    if (IdOri.trim() == "Seleccione Sede") {
      var n = noty({
        text: "Debe seleccionar una Sede Origen...!",
        theme: 'relax',
        layout: 'center',
        type: 'error',
        timeout: 2000,
      });

    } else if (IdDest.trim() == "Seleccione Sede") {
      var n = noty({
        text: "Debe seleccionar una Sede Origen...!",
        theme: 'relax',
        layout: 'center',
        type: 'error',
        timeout: 2000,
      });

    }else if (comen == "") {
      var n = noty({
        text: "Comentarios esta vacio...!",
        theme: 'relax',
        layout: 'center',
        type: 'error',
        timeout: 2000,
      });
    } if (num ==0){
      var n = noty({
        text: "Tabla vacia...!",
        theme: 'relax',
        layout: 'center',
        type: 'error',
        timeout: 2000,
      });
    }else {
      $.post("InsertarEncabezadoTraslado.php", {
          fechadoc: fechadoc,
          fechasoli: fechasoli,
          sedeori: sedeori,
          sededes: sededes,
          comentarios: comentarios
        },

        function (data1) {
          $("#nguia").html(data1);
          $("#nguia").hide();


          va = $("#valor").text().trim();
          if (va == 1) {
            alertify.error('El correlativo del documento ya se encuentra registrado');

          } else {

              LineNum = -1;
            //alertify.success('Se a insertado Correctamente');
            $('#tabla_articulos > tbody > tr').each(function () {
              id = $("#nguia").text().trim();
              var cod = $(this).find('td').eq(0).html();
              var descripcion_art = $(this).find('td').eq(1).html();
              var AL_ORI = $(this).find('td').eq(2).html();
              var AL_DES = $(this).find('td').eq(3).html();
              var umd = $(this).find('td').eq(4).html();
              var stock = $(this).find('td').eq(5).html();
              var cantidad = $(this).find('td').eq(6).html();
              //  alert(cod);
              LineNum ++;
             // alert(LineNum);
              $.post("InsertarDetalleTraslado.php", {
                  id: id,
                  LineNum:LineNum,
                  cod: cod,
                  descripcion_art: descripcion_art,
                  AL_ORI: AL_ORI,
                  AL_DES: AL_DES,
                  umd: umd,
                  stock: stock,
                  cantidad: cantidad
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
  })

}



///////////////////////////PHP DE REPORTE DE SOLCITUDES //////////////////////////////
///////////////////////////////MOSTRAR LAS FECHAS 
///
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












//////////////consultar detalle las solicitudes creadas

/*********************************************************************/
function busca_Guia_Emitida() {
  fechai = $("#fi").val();
  fechaf = $("#ff").val();
  estado = $("#idEstado option:selected").val();
  if (estado === "Seleccione un Estado") {
    alertify.error('Seleccione un Estado');

  } else if (fechai == "") {
    alertify.error('Seleccione un fecha inicio');
  } else if (fechaf == "") {
    alertify.error('Seleccione un fecha fin');
  } else {
    $.post("Listar_Solicitud_Traslado.php", {
        fechai: fechai,
        fechaf: fechaf,
        statu: estado
      },
      function (inf) {

        $("#data").html(inf);
        $('#escp').DataTable();


      });
  }


}
///ver el detalle de solcitud 
function ListaDetalleSoliTraslado(id) {

  idcabecera = id;

  $("#modal_detalle_Traslado").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.post("Listar_Detalle_SoliTraslado.php", {
      id: id
    },
    function (inf) {

      $("#detalle_de_traslado").html(inf);
      $('#escp').DataTable();


    });

}

///Cancelar detalle de solicitud 


function CancelarSoliTraslado(id, name,doce) {



  alertify.confirm('ADVERTENCIA!', 'Estas seguro de  Cerrar la linea con el items ' + name + '?', function (E) {


    cancelar_traslado(id, name,doce);


  }, function () {
    alertify.error('operación Cancelada')
  });

}

function cancelar_traslado(id, name,doce) {

  $.post("Cancelar_SoliTraslado.php", {
      id: id,
      doce:doce

    },
    function (inf) {

      stado = inf.trim();
      if (stado == 1) {

        alertify.error('El items  ' + name + '  no se puede cerrar por que  cuenta con registro pendiente')
      } else {

        $.post("Listar_Detalle_SoliTraslado.php", {
            id: idcabecera
          },
          function (inf) {

            $("#detalle_de_traslado").html(inf);
            $('#escp').DataTable();


          });

        alertify.success('El items  ' + name + ' del traslado  fue cerrado')

      }





      ///actualizar estado  

    }


  );


}





///Eliminar detalle de solicitud 
$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", ".delete", function () {
      var parent = $(this).parents().parents().get(0);
      $(parent).remove();
      //resumen_pre();
  });
});