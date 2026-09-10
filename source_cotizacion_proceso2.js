function modificar_pedido(sapdocentry, docentry_pedido) {
  $("#modal_editar_pedido").modal("show");
  lista_cpago_ped();
  $.ajax({
    beforeSend: function () {
      //$("#data_pedido").html("Recuperando Lista ...");
    },
    url: "buscar_data_pedido_cab.php",
    type: "POST",
    dataType: "json",
    data: { docentry_pedido: docentry_pedido },
    success: function (x) {
      console.log(x[0].CARDCODE);
      $("#codCli_ped").val(x[0].CARDCODE);
      $("#ruc_ped").val(x[0].RUC);
      $("#docentry_ped").val(docentry_pedido);
      $("#razSocial_ped").val(x[0].CARDNAME);
      $("#codVen_ped").val(x[0].SLPCODE);
      $("#nomVen_ped").val(x[0].VENDEDOR);
      $("#dirEntrega_ped").val(x[0].DIR_ENTREGA);
      $("#moneda_ped").val(x[0].MONEDA);
      $("#lista_cpago_ped select")
        .val(x[0].CONDICION_PAGO)
        .trigger("change.select2");
      $("#refReq_ped").val(x[0].REF);
      $("#validez_ped").val(x[0].VALIDEZ);
      consultar_data_det(docentry_pedido);
    },
    error: function (jqXHR, estado, error) {},
  });
}
function consultar_data_det(docentry_pedido) {
  $.ajax({
    url: "buscar_data_pedidodet.php",

    type: "POST",
    data: {
      docentry_pedido: docentry_pedido,
    },
    success: function (x) {
      $("#pedido_det").html(x);
      $("#tabla_art_ped").DataTable({
        order: [[0, "asc"]],
      });
      resumen_art();
    },
    error: function (jqXHR, estado, error) {},
  });
}
function lista_cpago_ped() {
  $.ajax({
    beforeSend: function () {
      $("#lista_cpago_ped").html("Recuperando Lista ...");
    },
    url: "lista_cpago_venta.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_cpago_ped").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {},
  });
}

function actualiza_cpago_temp() {}

function resumen_art() {
  $(document).ready(function () {
    var articulos = 0.0;
    var monto = 0.0;
    var montoigv = 0.0;
    $("#tabla_art_ped > tbody > tr").each(function () {
      articulos += parseFloat($(this).find("td").eq(6).html());
      monto += parseFloat($(this).find("td").eq(9).html());
      console.log(monto);
    });

    cmoneda = $("#moneda_ped").val();
    console.log(cmoneda);

    var el = document.getElementById("total_mod");
    let num = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto);
    el.innerText = num;

    //alert(el)
    //$("#totales").html(monto.toFixed(2));
    montoigv = monto * 0.18;

    monto_total = monto + montoigv;
    //$("#totalesigv").html(montoigv.toFixed(2));
    var el = document.getElementById("total_igv_mod");
    let num2 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(montoigv);
    el.innerText = num2;
    console.log(montoigv);

    var el = document.getElementById("totalventa_mod");
    let num3 = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cmoneda,
    }).format(monto_total);
    el.innerText = num3;

    var el = document.getElementById("total_art_mod");
    el.innerText = articulos.toFixed(2);
    if (articulos > 0) {
      $("#btn-procesa").prop("disabled", false);
      $("#btn-cancela").prop("disabled", false);
      $("#btn-cancel").prop("disabled", false);
    } else {
      $("#btn-procesa").prop("disabled", true);
      $("#btn-cancela").prop("disabled", true);
      //$("#btn-cancel").prop('disabled', true);
    }
  });
}

function editar_produc(num) {
  num = num - 1;
  console.log(num);
  $("#modal_editar_articulo").modal("show");
  cod_art = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[1]
    .innerHTML;
  descripcion_art = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[2]
    .innerHTML;
  fecha_entrega = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[11]
    .innerHTML;
  cantidad = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[6]
    .innerHTML;
  unidad_medida = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[5]
    .innerHTML;
  preciou = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[7]
    .innerHTML;
  monto = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[9]
    .innerHTML;
  dscto_lin = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[8]
    .innerHTML;
  catalogo = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[4]
    .innerHTML;
  marca = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[3]
    .innerHTML;
  plazo_entrega = $($("#tabla_art_ped").find("tbody > tr")[num]).children("td")[10]
    .innerHTML;

  $("#codigo_modificado").val(cod_art);
  $("#descripcionitem_modificado").val(descripcion_art);
  $("#fecha_prod_modificado").val(fecha_entrega);
  $("#cantidad_modificado").val(cantidad);
  $("#unidad_line_modificado").val(unidad_medida);
  $("#preciou_modificado").val(preciou);
  $("#preciou_ant_modificar_mod").val(preciou);
  $("#preciouigv_modificado").val(monto);
  $("#dsctoline_modificado").val(dscto_lin);
  $("#catalogo_item_modificado").val(catalogo);
  $("#marca_item_modificado").val(marca);
  $("#plazo_entrega_modificado").val(plazo_entrega);
  $("#num_mod_mod").val(num);
}

function actualizar_datos_prod_mod() {
  if ($("#dsctoline_modificado").val() == 0) {
    var dsctoline = 0;
  } else {
    var dsctoline = $("#dsctoline_modificado").val();
  }

  var precio = $("#preciou_modificado").val();
  var cantidad = $("#cantidad_modificado").val();
  var monto = (cantidad * precio) - ((cantidad * precio) * (dsctoline / 100));
  monto1= monto.toFixed(2)
  num=$('#num_mod_mod').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[1].innerHTML = $('#codigo_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[2].innerHTML = $('#descripcionitem_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[3].innerHTML = $('#marca_item_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[4].innerHTML = $('#catalogo_item_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[5].innerHTML = $('#unidad_line_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[6].innerHTML = $('#cantidad_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[7].innerHTML = $('#preciou_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[8].innerHTML = $('#dsctoline_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[9].innerHTML = monto1;
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[10].innerHTML = $('#plazo_entrega_modificado').val();
  $($('#tabla_art_ped').find('tbody > tr')[num]).children('td')[11].innerHTML = $('#fecha_prod_modificado').val();
  $('#modal_editar_articulo').modal('hide');

  
  resumen_art();
}


function procesa_actualizacion() {
  docentry = $("#docentry_ped").val();
  ref_req_mod = $("#refReq_ped").val();
  validez_mod = $("#validez_ped").val();
  cod_vendedor = $("#codVen_ped").val();
  //nom_vendedor = $("#vendedor").val();
  comentarios = $("#comentarios1").val();
  direccion = $("#dirEntrega_ped").val();
  var subtotal_venta = 0.00;
  var total_venta = 0.00;
  //modificado = '0' ;

  $('#tabla_art_ped > tbody > tr').each(function () {
    subtotal_venta += parseFloat($(this).find('td').eq(9).html());
  });

  dscto = '' //descuento total;

  total_venta = subtotal_venta + (subtotal_venta * 0.18);
  $.ajax({
    beforeSend: function () { },
    url: "actualiza_pedido_cab.php",
    type: "POST",
    data:
      "docentry=" +
      docentry +
      "&ref_req_mod=" +
      ref_req_mod +
      "&validez_mod=" +
      validez_mod + "&cod_vendedor=" + cod_vendedor + "&comentarios=" + comentarios +
      "&direccion=" + direccion + '&subtotal_venta=' + subtotal_venta + '&total_venta=' + total_venta,

    success: function (data) {
      var n = noty({
        text: "Procesando venta...  actualizacion: " + docentry,
        theme: "relax",
        layout: "topLeft",
        type: "success",
        timeout: 2000,
      });
    },
    error: function (jqXHR, estado, error) {
      $("#errores").html("Error... " + estado + "  " + error);
    },
  });


  $("#tabla_art_ped > tbody > tr").each(function () {
    var line = $(this).find("td").eq(0).html();
    var cod = $(this).find("td").eq(1).html();
    var descripcion_art = $(this).find("td").eq(2).html();
    var marca = $(this).find("td").eq(3).html();
    var catalogo = $(this).find("td").eq(4).html();
    var unidad_medida = $(this).find("td").eq(5).html();
    var can = $(this).find("td").eq(6).html();
    var preciou = $(this).find("td").eq(7).html();
    var dscto_lin = $(this).find("td").eq(8).html();
    var monto = $(this).find("td").eq(9).html();
    var plazo_entrega = $(this).find("td").eq(10).html();
    //var fecha_prod = $(this).find("td").eq(11).html();
    var tipo_venta = "";
    var fath = "";
    var modificado = '0';
    $.ajax({
      beforeSend: function () { },
      url: "actualiza_pedido_det.php",
      type: "POST",
      data:
        "&codigo=" +
        cod +
        "&descripcion_art=" +
        descripcion_art +
        "&cantidad=" +
        can +
        "&preciou=" +
        preciou +
        "&dscto_lin=" +
        dscto_lin +
        "&total_linea=" +
        monto +
        "&tipo_vta=" +
        tipo_venta +
        "&father=" +
        fath +
        "&docentry=" +
        docentry +
        "&line=" +
        line +
        "&unidad_medida=" +
        unidad_medida +
        "&plazo_entrega=" +
        plazo_entrega +
        "&marca=" +
        marca +
        "&catalogo=" +
        catalogo +
        "&modificado=" +
        modificado,
      success: function (data) {
        var n = noty({
          text: "Procesando venta...  articulo actual: " + cod,
          theme: "relax",
          layout: "topLeft",
          type: "success",
          timeout: 2000,
        });
        $('#modal_editar_pedido').modal("hide"); 
      },
      error: function (jqXHR, estado, error) {
        $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  });
}



function existen_registros3() {
  let filas = $("#tabla_art_ped").find('tbody tr').length;

  if (filas > 0) {
    return filas;
  }
  else {
    return 0;
  }
}

function agrega_a_lista_mod() {
  $(document).ready(function () {
    bandera = true;
    if ($("#cantidad2").val() > 0) {
      var articulo = $("#codigo2").val();
      var descripcion = document.getElementById('descripcionitem2').value
      var precio = $("#preciou2").val();
      precio1 = parseInt(precio, 2);
      var cantidad = $("#cantidad2").val();
      // cantidad1 = parseInt(cantidad, 2);
//  console.log(cantidad1);
      var unidad = $("#unidad_line2").val();
      var fecha_prod = $("#fecha_prod2").val();
      var fecha_prod = $("#fecha_prod2").val();
      var catalogo_item = $("#catalogo_item2").val();
      var marca_item = $("#marca_item2").val();
      var preciou_ant = $("#preciou_ant2").val();
      preciou_ant1 = parseInt(preciou_ant, 2);
      var plazo_entrega = $("#plazo_entrega2").val();
      fil = existen_registros3()
      if (fil ===0) {
        $("#tabla_art_ped > tbody").remove();
      }
      var num = existen_registros3() +1;
      //var tipovta = "V";
      if ($("#dsctoline2").val() == 0) {
        var dsctoline = 0;
      } else {
        var dsctoline = $("#dsctoline2").val();
      }
      var monto =parseFloat((cantidad * precio) - ((cantidad * precio) * (dsctoline / 100))).toFixed(2) ;
      if (articulo === '') {
        bandera = false;
        var n = noty({
          text: "Codigo vacio...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      if (descripcion === '') {
        bandera = false;
        var n = noty({
          text: "Descripcion vacia...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      if (cantidad === '') {
        bandera = false;
        var n = noty({
          text: "Cantidad vacia...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      if (precio === '') {
        bandera = false;
        var n = noty({
          text: "Precio S/IGV vacio...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      if (plazo_entrega === '') {
        bandera = false;
        var n = noty({
          text: "Plazo de entrega vacio vacio...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      if (precio <= 0) {
        bandera = false;
        var n = noty({
          text: "Precio NO VALIDO...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      //console.log(preciou_ant);console.log(precio);
      if (precio <preciou_ant) {
        bandera = false;
        var n = noty({
          text: "Precio no puede ser menor al precio base...!",
          theme: 'relax',
          layout: 'center',
          type: 'error',
          timeout: 2000,
        });
      }
      if (bandera === true) {
        $("#tabla_art_ped > tbody").append("<tr><td class='center'>" + num + "</td><td class='center'>" + articulo + "</td><td class='center'>" + descripcion + "</td><td class='center'>" + marca_item +"</td><td class='center'>" + catalogo_item +"</td><td class='center'>" + unidad + "</td><td class='center'>" + cantidad + "</td><td class='center'>" + precio1 + "</td><td class='center'>" + dsctoline + "</td><td class='center'>" + monto + "</td><td class='center'>" + plazo_entrega + "</td><td class='center' style='display:none'>" + fecha_prod + "</td><td class='center'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button><button onclick='editar_producto("+num+");' class='btn  btn-warning btn-xs'><i class='fa fa-edit bigger-120'></i></button></td></tr>");
        $("#codigo2").val("");
        $("#cantidad2").val(0.00);
        $("#dsctoline2").val(0.00);
        $("#exis2").val(0.00);
        $("#monedaitem2").val("");
        $("#descripcionitem2").val("");
        $("#preciou2").val(0.00);
        $("#preciouigv2").val(0.00);
        //$("#preciou").attr("disabled", true);
        $("#codigo2").focus();
        $(".widget-user-desc").html("");
        $(".exis2").html(0);
        $(".preciol2").html(0.00);
        /*cancela_operacion();*/
        // $("#imagen").attr("src", 'dist/img/sin_foto.png');
        resumen_art();
        $('#modal_articulo_2').modal('hide');
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

function mapa_relaciones() {
  docentry = $("#docito").val();

  $("#modalmapaRelacion").modal("show");
    console.log("entra en mapa relaciones docentry: ", docentry);
// 
  $.ajax({

    url: "mapa_relacionesPedido.php",
    type: "POST",
    dataType: "json",
    data: {
      docentry: docentry,
    },
    success: function (x) {
      $("#drawflow").html(x);
    console.log("entra: ", x);

      var id = document.getElementById("drawflow");
      var editor = new Drawflow(id);
      editor.reroute = true;

      let cotizaciones = [];
      let pedidos = [];
      
      for (let i = 0; i < x.length; i++) {
        // x[i].doc_sap ='02'

        let status = x[i].status_coti;
        let html;

        if (status === "02") {
          html =
            '\n <div style="position: relative; background-color: rgba(255, 0, 0, 0.1);">\n' +
            '<div class="title-box">📝 Cotizacion</div>\n' +
            '<div class="box">\n 🔑<b>SAP: #' +
            x[i].doc_sap +
            "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
            x[i].doc_coti +
            "</b>\n <br>\n 📅  " +
            x[i].fecha_coti +
            "<br>\n 💲" +
            x[i].total_coti +
            " " +
            x[i].moneda_coti +
            "<br>\n <br>\n </div>\n" +
            '<div style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; color: rgba(255, 0, 0, 0.3); z-index: 0; pointer-events: none;">❌</div>\n' +
            "</div>\n";
        } else {
          html =
            '\n <div>\n <div class="title-box">📝 Cotizacion</div>\n <div class="box">\n 🔑<b>SAP: #' +
            x[i].doc_sap +
            "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
            x[i].doc_coti +
            "</b>\n <br>\n 📅  " +
            x[i].fecha_coti +
            "<br>\n 💲" +
            x[i].total_coti +
            " " +
            x[i].moneda_coti +
            "<br>\n <br>\n </div>\n </div>\n";
        }

        let cotizacion = {
          id: i + 1,
          name: "Cotizacion1",
          data: {},
          class: "welcome",
          html: html, // Asignar el HTML generado al objeto
          typenode: false,
          inputs: {},
          outputs: {
            output_1: {
              connections: [{ node: 1, output: "input_1" }],
            },
          },
          pos_x: 50,
          pos_y: 50,
        };
        cotizaciones.push(cotizacion);
      }
      $.ajax({
        
   
        url: "mapa_relaciones2.php",
        type: "POST",
        dataType: "json",
        data: {
          docentry: docentry,
        },
        success: function (y) {
          console.log("entra en : ", y);
          for (let j = 0; j < y.length; j++) {
            let status = y[j].status_pedido;
            let html;

            // Lógica condicional para el contenido del HTML
            if (status === "2") {
              html =
                '\n <div style="position: relative;">\n' +
                '<div class="title-box">🏷️ Pedido</div>\n' +
                '<div class="box" >\n 🔑<b>' +
                (y[j].doc_sap
                  ? "SAP: # " + y[j].doc_sap
                  : "SAP:😞 No Migrado") +
                "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                y[j].doc_pedi +
                "</b>\n <br>\n 📅" +
                y[j].fecha_des +
                "<br>\n 💲 " +
                y[j].total_pedido +
                " " +
                y[j].moneda_pedido +
                "<br>\n <br>\n </div>\n" +
                '<div style="position: relative;">\n' +
                '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
                '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
                "</div>\n" +
                "</div>\n";
            } else {
              html =
                '\n <div>\n <div class="title-box">🏷️ Pedido</div>\n <div class="box">\n 🔑<b>' +
                (y[j].doc_sap
                  ? "SAP: # " + y[j].doc_sap
                  : "SAP:😞 No Migrado") +
                "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                y[j].doc_pedi +
                "</b>\n <br>\n 📅" +
                y[j].fecha_des +
                "<br>\n 💲 " +
                y[j].total_pedido +
                " " +
                y[j].moneda_pedido +
                "<br>\n <br>\n </div>\n </div>\n";
            }

            let pedido = {
              id: 2,
              name: "pedido2",
              data: {},
              class: "welcome",
              html: html, // Asignar el HTML generado según la condición
              typenode: false,
              inputs: {
                input_1: { connections: [{ node: 1, input: "output_1" }] },
              },
              outputs: {
                output_1: {
                  connections: [{ node: 1 + y.length, output: "input_1" }],
                },
              },
              pos_x: 300,
              pos_y: 50,
            };

            cotizaciones.push(pedido);
          }

          $.ajax({
            url: "mapa_relaciones3.php",
            type: "POST",
            dataType: "json",
            data: {
              docentry: docentry,
            },
            success: function (z) {
              console.log("entra en z: ", z);
              console.log(z);
              xy = 1;
              let previousNodeId = null; // Variable para almacenar el ID del nodo anterior

              // if (z[0].doc_sap ==null) {

              // }else{
              for (let k = 0; k < z.length; k++) {
                let status = z[k].status_des;
                let html;

                if (z[k].doc_des === null) {
                  continue; // Continúa con la siguiente iteración
                }

                if (status === "02") {
                  // Suponiendo que '2' es el valor de interés
                  html =
                    '\n <div style="position: relative;">\n' +
                    '<div class="title-box">🚚 Despacho</div>\n' +
                    '<div class="box" style="background-color: rgba(255, 0, 0, 0.1);">\n 🔑<b>' +
                    (z[k].doc_sap
                      ? "SAP: # " + z[k].doc_sap
                      : "SAP:😞 No Migrado") +
                    "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    z[k].doc_des +
                    "\n <br>\n  📅 " +
                    z[k].fecha_des +
                    "<br>\n 💲 " +
                    z[k].total_des +
                    " " +
                    z[k].moneda_des +
                    "<br>\n <br>\n </div>\n" +
                    '<div style="position: relative;">\n' +
                    '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
                    '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
                    "</div>\n" +
                    "</div>\n";
                } else {
                  html =
                    '\n <div>\n <div class="title-box">🚚 Despacho</div>\n <div class="box">\n 🔑<b>' +
                    (z[k].doc_sap
                      ? "SAP: # " + z[k].doc_sap
                      : "SAP:😞 No Migrado") +
                    "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    z[k].doc_des +
                    "\n <br>\n  📅 " +
                    z[k].fecha_des +
                    "<br>\n 💲 " +
                    z[k].total_des +
                    " " +
                    z[k].moneda_des +
                    "<br>\n <br>\n </div>\n </div>\n";
                }

                let despacho = {
                  id: x.length + y.length + xy + 1, // Incrementar ID para cada despacho
                  name: "despacho3",
                  data: {},
                  class: "welcome",
                  html: html, // Asignar el HTML generado según la condición
                  typenode: false,
                  inputs: {
                    input_1: {
                      input_1: previousNodeId ? { connections: [{ node: previousNodeId, input: "output_1" }] } : {},
                    },
                  },
                  outputs: {
                    output_1: {
                      connections: [{ node: 1 + y.length, output: "input_1" }],
                    },
                  },
                  pos_x: 700,
                  pos_y: 50,
                };

                if (w.length > l + 1) {
                  despacho.outputs.output_1.connections.push({
                    node: x.length + y.length + z.length + l + 2, // ID del siguiente nodo
                    output: "input_1",
                  });
                }
                cotizaciones.push(despacho);
                xy++;
              }
            },
            error: function (jqXHR, estado, error) { },
          });
          $.ajax({
            url: "mapa_relaciones4.php",
            type: "POST",
            dataType: "json",
            data: {
              docentry: docentry,
            },
            success: function (w) {
              console.log("entra en w: ", w);

              console.log(w);
              z = xy + 1;
              // if (z[0].doc_sap ==null) {

              // }else{
              for (let l = 0; l < w.length; l++) {
                let status = w[l].status_fact;
                let html;

                // Lógica condicional para ajustar el HTML según el status
                if (status === "2") {
                  // Suponiendo que '2' es el estado de interés
                  html =
                    '\n <div style="position: relative;">\n' +
                    '<div class="title-box">📑 Fact. de Clientes</div>\n' +
                    '<div class="box" >\n 🔑<b>SAP: #' +
                    w[l].doc_fact +
                    "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    w[l].doc_factura_web +
                    "\n <br>\n 📅 " +
                    w[l].fecha_fact +
                    "<br>\n 💲 " +
                    w[l].total_fact +
                    " " +
                    w[l].moneda_fact +
                    "<br>\n <br>\n </div>\n" +
                    '<div style="position: relative;">\n' +
                    '<div style="position: absolute; top: 80%; left: 50%; transform: translate(-50%, -120%); font-size: 50px; z-index: 0; pointer-events: none;">' +
                    '<img src="image/prohibido.png" alt="Prohibido" style="width: 100px; height: 100px; opacity: 0.3;">' +
                    "</div>\n" +
                    "</div>\n";
                } else {
                  html =
                    '\n <div>\n <div class="title-box">📑 Fact. de Clientes</div>\n <div class="box">\n 🔑<b>SAP: #' +
                    w[l].doc_fact +
                    "</b>\n <br>\n <img src='image/incodesoft.ico'><b>IMOB: #" +
                    w[l].doc_factura_web +
                    "\n <br>\n 📅 " +
                    w[l].fecha_fact +
                    "<br>\n 💲 " +
                    w[l].total_fact +
                    " " +
                    w[l].moneda_fact +
                    "<br>\n <br>\n </div>\n </div>\n";
                }

                let despacho = {
                  id: x.length + y.length + z.length + l + 1, // Generar un ID único
                  name: "fact_prov5",
                  data: {},
                  class: "welcome",
                  html: html, // Asignar el HTML generado según la condición
                  typenode: false,
                  inputs: {
                    input_1: {
                      connections: [{ node: xy + 1, input: "output_1" }],
                    },
                  },
                  outputs: {
                    // Puedes agregar conexiones aquí si es necesario
                  },
                  pos_x: 900,
                  pos_y: 50,
                };

                cotizaciones.push(despacho);
                xy++;
              }
            },
            error: function (jqXHR, estado, error) { },
          });
        },
        error: function (jqXHR, estado, error) { },
      });

      editor.drawflow.drawflow.Home.data = cotizaciones;
      console.log(cotizaciones);

      setTimeout(() => {
        editor.start();
      }, 500);
    },
    error: function (jqXHR, estado, error) {
      // Maneja los errores aquí
    },
  });
}
