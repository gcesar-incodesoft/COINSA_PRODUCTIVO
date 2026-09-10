function lista_clientes2() {
  //console.log('hola');
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "pone_clientes_asig_pedido.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#pone_clientes").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}
function lista_almaceneros() {
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "pone_almacenerosuser.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#poner_almaceneros").html(x);
      $(document).ready(function () {
        $(".select2").select2();
      });
    },
    error: function (jqXHR, estado, error) {},
  });
}
function buscar_pedido() {
  //console.log('hola');
  var fi = $("#fi").val();
  var ff = $("#ff").val();
  var idcliente = $("#cliente").val().toString();
  var almaceneros = $("#almaceneros").val().toString();
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "consulta_pedido_cliente_asiguser.php",
    type: "POST",
    data: { idcliente: idcliente, almaceneros: almaceneros, fi: fi, ff: ff },
    success: function (x) {
      $("#tabla_consulta").html(x);
      // $('#tabla_pedido').DataTable();
      buscar_pedido_alistado();
    },
    error: function (jqXHR, estado, error) {},
  });
}
function ver_detalle(docentry) {
  console.log(docentry);
  $("#modal_detalle").modal("show");
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "consulta_pedido_cliente_asigdet_user.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      $("#detalle").html(x);
      // $('#tabla_pedido').DataTable();
    },
    error: function (jqXHR, estado, error) {},
  });
}

function alistar_pedido(cardcode, docnum, docentry) {
  console.log("CardCode: " + cardcode);
  console.log("DocNum: " + docnum);
  console.log("Docentry: " + docentry);
  //.toString();
  var cardcode1 = cardcode.toString();
  var docnum1 = docnum.toString();
  var docentry1 = docentry.toString();
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "alista_pedido.php",
    type: "POST",
    data: { cardcode1: cardcode1, docnum1: docnum1, docentry1: docentry1 },
    success: function (x) {
      buscar_pedido();
      $("#modal_detalle").modal("hide");
    },
    error: function (jqXHR, estado, error) {},
  });
}

function buscar_pedido_alistado() {
  console.log("hola");
  var idcliente = $("#cliente").val().toString();
  var almaceneros = $("#almaceneros").val().toString();
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "consulta_pedido_alistado_asiguser.php",
    type: "POST",
    data: { idcliente: idcliente, almaceneros: almaceneros },
    success: function (x) {
      $("#tabla_proceso").html(x);
      // $('#tabla_pedido').DataTable();
    },
    error: function (jqXHR, estado, error) {},
  });
}
function ver_detalle1(docentry) {
  $("#modal_detalle").modal("show");
  console.log(docentry);
  $.ajax({
    beforeSend: function () {
      // $("#pone_clientes").html("Recuperando proveedores...");
    },
    url: "consulta_pedido_cliente_asigdet_user1.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      $("#detalle").html(x);
      // $('#tabla_pedido').DataTable();
    },
    error: function (jqXHR, estado, error) {},
  });
}

function exportarPDF(docentry) {
  console.log("Docentry: " + docentry);
  var docentry1 = docentry.toString();
  // javascript: window.open('pdf_pedido_asig.php?docentry1=' + docentry1);

  var ruta = "pdf_pedido_asig.php?docentry1=" + docentry1;

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
