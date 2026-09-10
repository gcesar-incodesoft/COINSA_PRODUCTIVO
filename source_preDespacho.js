/////////////////////////
//LISTA los clientes con pedidos
/////////////////////////
function lista_Pedidos_Despacho() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_cliente").html("Recuperando proveedores...");
      },
      url: "Lista_Clientes_Pedidos_Despachp.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_cliente").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {},
    });
  });
}

//combo cliente cuando seleccione
$(document).ready(function () {
  $("#lista_cliente").on("change", function () {
    $("#lista_cliente option:selected").each(function () {
      elegido = $(this).val();
      $global = elegido;

      //   $('#btnLeer').attr("disabled", true);

      $.post(
        "lista_Pedidos_Despacho_clientes.php",
        { elegido2: elegido },

        function (data) {
          $("#lista_Item").html("");

          $("#lista_pedidos").html(data);
          $(".select2").select2();
          lista_pedidos_predes();
        }
      );
    });
  });
});

/// listar pedidos

function lista_Pedidos_Despacho2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_pedidos").html("Recuperando proveedores...");
      },
      url: "lista_Pedidos_Despacho_clientes.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_pedidos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {},
    });
  });
}
/// listar almacenes

function lista_Almacenes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_almacenes").html("Recuperando Almacenes...");
      },
      url: "Lista_Almacen_Despacho.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_almacenes").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {},
    });
  });
}

/// abre el modal para leer los codigos de barra
function leer_codigos() {
  pedido = $("#lista_pedidos option:selected").val();

  if (pedido === "Seleccione un Pedido") {
    alertify.error("Selecione un Pedido");
  } else {
    $("#modal_leeer").modal("show");

    pedido = $("#lista_pedidos option:selected").val();
    cliente = $("#lista_cliente option:selected").val();

    $.post(
      "lista_Despachofaltante.php",
      { cliente: cliente, pedido: pedido },

      function (data) {
        $("#detalle_de_venta2").html(data);
      }
    );
  }
}

////acion escribri del campo

function activar() {
  //alert("ss");

  var $tblrows = $("#lispedid tbody tr");

  $tblrows.each(function (index) {
    var $tblrow = $(this);

    $tblrow.find(".qty").on("change", function () {
      var qty = $tblrow.find("[name=base]").val();
      var falt = $tblrow.find("[name=falta]").text();

      var resta = falt - qty;

      if (resta >= 0) {
        $tblrow.find("#che").prop("checked", true);
      } else {
        alertify.error("Error,Valor en cantidad es superior a lo pendiente");
        $tblrow.find("#che").prop("checked", false);
      }

      //if (!isNaN(subTotal)) {

      //  $tblrow.find('.subtot').val(subTotal.toFixed(2));
      //var grandTotal = 0;

      // $(".subtot").each(function () {
      //   var stval = parseFloat($(this).val());
      //  grandTotal += isNaN(stval) ? 0 : stval;
      //});

      //$('.grdtot').val(grandTotal.toFixed(2));
      //}
    });
  });
}

////acion escribri del campo

function btninsret() {
  //alert("ss");
  var id = [];

  $(":checkbox:checked").each(function (key) {
    id[key] = $(this).parents("tr").find("td").eq(1).text();
  });
  if (id.length === 0) {
    alertify.success("Seleccione algun Pedido f");
  } else {
    cardcod = $("#lista_cliente option:selected").val();

    cardnam = $("#lista_cliente option:selected").text();
    pedido = $("#lista_pedidos option:selected").val();
    $.post(
      "insertar_EncabezadoPredespa.php",
      { cardcod: cardcod, cardnam: cardnam, pedido: pedido },

      function (data) {
        $("#nguia").html(data);
        $("#nguia").hide();

        valor = $("#valor").val();
        //alert(valor);
        doc = $("#idguia").text();
        if ((valor = 5)) {
          $(":checkbox:checked").each(function (key) {
            $cod = $(this).parents("tr").find("td").eq(1).text().trim();
            $des = $(this).parents("tr").find("td").eq(2).text().trim();

            $cant = $(this).parents("tr").find("td").eq(3).text().trim();

            $entre = $(this).parents("tr").find("td").eq(4).text().trim();

            $fal = $(this).parents("tr").find("td").eq(5).text().trim();

            $ate = $(this).parents("tr").find("[name=base]").val().trim();

            $.post(
              "Insertar_DetallepreDespa.php",
              {
                doc: doc,
                cod: $cod,
                des: $des,
                cant: $cant,
                entre: $entre,
                fal: $fal,
                ate: $ate,
              },
              function (data1) {
                swal("Su Guia fue Generada", "Cargando...", "success", 2000);
              }
            );
            setTimeout("location.reload()", 2000);
          });
        } else {
          alertify.error("Error al insertar despacho");
        }
      }
    );
  }
}

//////mostrar los pedidos de todos los clientes

function lista_pedidos_predes() {
  cardcod = $("#lista_cliente option:selected").val();

  $.post("Listar_ped_predes.php", { cardcod: cardcod }, function (dat2) {
    $("#lista_predes").html(dat2);
    $("#Tabla_Esca").DataTable();
  });
}
//////mostrar detalle enm tabla

function muestra_detalle_predes(card_code) {
  $("#modal_detalle_predespa").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.post("reporte_ped_predes.php", { cardcod: card_code }, function (dat2) {
    $("#lista_Repor_detpro").html(dat2);
    $("#Tabla_Esca").DataTable();
  });
}
//////mostrar detalleen pdf

function muestra_detalle_predes_pdf(card_code) {
  // javascript: window.open('reporte_predes_pdf.php?card_code=' + card_code);

  var ruta = "reporte_predes_pdf.php?card_code=" + card_code;

  $("#modal_data_pdf").modal("show");
  $("#modal_data_pdf")
    .on("shown.bs.modal", function () {
      $(this).find("iframe").attr("src", ruta);
    })
    .on("hidden.bs.modal", function () {
      $(this).find("iframe").attr("src", "");
    });

  $("#navegador")
    .off("click")
    .on("click", function () {
      window.open(ruta, "_blank");
    });

  $("#imprimir")
    .off("click")
    .on("click", function () {
      $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
    });
}
