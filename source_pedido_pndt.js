function lista_clientes1() {
  $.ajax({
    beforeSend: function () {
      $("#pone_clientes").html("Cargando Datos......");
    },
    url: "pone_clientes_pedpendiente.php",
    type: "POST",
    data: {},
    success: function (x) {
      $("#pone_clientes").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}
function listar_pedido(cardcode) {
  $.ajax({
    beforeSend: function () {
      $("#pone_pedido").html("Cargando Datos......");
    },
    url: "pone_pedido_pedpendiente.php",
    type: "POST",
    data: { cardcode: cardcode },
    success: function (x) {
      $("#pone_pedido").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}


function busca_detalle() {
  var cardcode = $("#cliente").val().toString();
  var docentry = $("#docentry").val().toString();
  //$('#pone_pedido select option:selected').text()


    if (docentry === "") {
      alertify.error("Error: Debes ingresar un número de entrada.");
      return;
    }
    if (cardcode !== "" && docentry !== "") {
      $.ajax({
        beforeSend: function () {
          $("#tabla_detalle").html("Cargando Datos......");
        },
        url: "consulta_pedido_pend2.php",
        type: "POST",
        data: { cardcode: cardcode, docentry: docentry },
        success: function (x) {
          $("#tabla_detalle").html(x);
          $("#tabla_det").DataTable();
        },
        error: function (jqXHR, estado, error) { },
      });
    }


}

function calcularResta(campo1, cantidad, combinedID) {
  campo1 = campo1 !== null ? parseFloat(campo1) : 0;
  var resultado = cantidad - campo1;
  // console.log(cantidad);
  // console.log(campo1);

  var campoResultado = document.querySelector(
    '[name="campo2_' + combinedID + '"]'
  );
  if (campoResultado) {
    campoResultado.value = resultado.toFixed(2);
    if (campo1 > cantidad) {
      campoResultado.style.backgroundColor = "red";
      campoResultado.style.color = "white";
      campoResultado.style.fontWeight = "bold";
      alertify.error("Cantidad a despachar errónea");
    } else {
      campoResultado.style.backgroundColor = ""; // Restaurar el color original si no hay error
    }
  }
}

$(document).on("click", "#cotizacion_seg", function () {
  det = document.querySelectorAll("#cotizacion_seg:checked").length;
  console.log(det);
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    num = $(this).parents("tr").find("td:eq(9)").text();
    //console.log(num);
    num = parseFloat(num);
    num = isNaN(num) ? 0 : Math.abs(num);
    $(this).parents("tr").find('input[id="datos1"]').val(num);
    
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
   
  }
});

$(document).on("click", "#miCheckbox1", function () {
  if ($(this).is(":checked")) {
    $("#tabla_det input[type='checkbox'][id='cotizacion_seg']").prop("checked", true).closest("tr").css("background-color", "LightGreen").each(function () {
      var valorStockGeneral = $(this).find("td:eq(7)").text();
      //console.log("Stock General:", valorStockGeneral);
  
   
      var valorColumna9 = $(this).find("td:eq(9)").text();
      //console.log("Valor de Columna 9:", valorColumna9);
      $(this).closest("tr").find('input[id="datos1"]').val(valorColumna9);
    });
    $("#tomar-accion").show();

    
    setTimeout(function () {
      // Verifica si hay algún checkbox seleccionado
      var checked = $("#tabla_det input[type='checkbox'][id='cotizacion_seg']:checked").length > 0;

      // Activa el botón si hay algún checkbox seleccionado
      $("#miBoton").prop("disabled", !checked);
    }, 100);
  } else {
    $("#tabla_det input[type='checkbox'][id='cotizacion_seg']").prop("checked", false).closest("tr").css("background-color", "white").find('input[id="datos1"]').val("");
    $("#tomar-accion").hide();

    // Verifica si hay algún checkbox seleccionado
    var checked = $("#tabla_det input[type='checkbox'][id='cotizacion_seg']:checked").length > 0;

    // Activa el botón si hay algún checkbox seleccionado
    $("#miBoton").prop("disabled", !checked);
  }
});


function mod_datos_guia() {
  bandera = true;
  $i=1;
  $("[name='seg_modal[]']:checked").each(function () {
    var stock_general = parseFloat($(this).parents("tr").find('td:eq(7)').text()).toFixed(2);
    var cantidad_pendiente = parseFloat($(this).parents("tr").find('td:eq(9)').text()).toFixed(2);
    var cantidadDespachar = parseFloat($(this).parents("tr").find('input[id="datos1"]').val()).toFixed(2);
    console.log(cantidadDespachar);
    console.log(cantidad_pendiente);
    console.log(stock_general);
    if (cantidadDespachar === '' || cantidadDespachar <= 0) {
      alertify.error('Linea: ' + $i + ' ' + 'Falta Cantidad Invalida');
      $(this).parents("tr").find('td').eq(8).css("background-color", "#F67280");
      bandera = false;
    } else {
      $(this).parents("tr").find('td').eq(8).css("background-color", "green");
    }
    if (parseFloat(cantidad_pendiente) < parseFloat(cantidadDespachar)) {
      alertify.error('Linea: ' + $i + ' ' + 'Cantidad Invalida');
      $(this).parents("tr").find('td').eq(8).css("background-color", "#F67280");
      bandera = false;
      //console.log('hola');
    } else {
      $(this).parents("tr").find('td').eq(8).css("background-color", "green");
    }
    if (stock_general == 0) {
      alertify.error('Linea: ' + $i + ' ' + 'Producto sin Stock');
      $(this).parents("tr").find('td').eq(7).css("background-color", "#F67280");
      bandera = false;
    } else {
      $(this).parents("tr").find('td').eq(7).css("background-color", "green");
    }
    if (parseFloat(stock_general) < parseFloat(cantidadDespachar)) {
      alertify.error('Linea: ' + $i + ' ' + 'Producto con poco stock');
      $(this).parents("tr").find('td').eq(7).css("background-color", "#F67280");
      bandera = false;
    } else {
      $(this).parents("tr").find('td').eq(7).css("background-color", "green");
    }

    var resultadoResta = ( parseFloat(cantidad_pendiente) - parseFloat(cantidadDespachar)).toFixed(2);
    $(this).parents("tr").find('input[id="datos2"]').val(resultadoResta);


    $i++;

  });
  if( bandera === true){
    //$(this).addClass("fila-verde");
    $("#myModal").modal("show");
    cargar_ubigeollegada();
    listar_serie();
    listar_correlativo();
    Openclick();
    lista_direccion_condicion();
   };
}

function insertar1(docentry) {
  var cardcode = $("#cliente").val();
  var cardname = $("#pone_clientes select option:selected").text();
  //$('#pone_clientes select').val();

  $.ajax({
    url: "insertar_cab_procesaped.php",
    type: "POST",
    data: { cardcode: cardcode, cardname: cardname },
    success: function (x) {
      insertar_detalle(docentry);
      // migrar_sap_despacho(docentry);
      console.log("paso2");
    },
    error: function (jqXHR, estado, error) { },
  });
}

function insertar_detalle(docentry_cab) {
  $("[name='seg_modal[]']:checked").each(function () {
    console.log("paso1");
    // var docentry = $(this).find('td').eq(0).html();
    //var stock_general =$(this).parents("tr").find('td:eq(6)').text();
    var codigo = $(this).parents("tr").find('td:eq(2)').text();
    var descripcion = $(this).parents("tr").find('td:eq(4)').text();
    var almacen = $(this).parents("tr").find('td:eq(6)').text();
    var total =  $(this).parents("tr").find('td:eq(7)').text();
    var stock =  $(this).parents("tr").find('td:eq(8)').text();
    var cantidad_procesada = $(this).parents("tr").find('input[id="datos1"]').val()
    var docentry = $(this).parents("tr").find('td:eq(10)').text()
    var basetype =  $(this).parents("tr").find('td:eq(11)').text()
    var linenum =  $(this).parents("tr").find('td:eq(12)').text()
    var BaseDocNum =  $(this).parents("tr").find('td:eq(1)').text()
    var doc_asig =  $(this).parents("tr").find('td:eq(13)').text()
    // console.log(docentry);
    // console.log(basetype);
    // console.log(linenum);
    $.ajax({
      url: "insertar_det_procesaped.php",
      type: "POST",
      data: {
        docentry: docentry,
        basetype: basetype,
        linenum: linenum,
        codigo: codigo,
        descripcion: descripcion,
        almacen: almacen,
        stock: stock,
        cantidad_procesada: cantidad_procesada,
        total: total,
        docentry_cab: docentry_cab,
        BaseDocNum: BaseDocNum,
        doc_asig: doc_asig
      },
      success: function (x) {
        $("#myModal").modal("hide");
        //busca_detalle();

        //location.reload();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function migrar_sap_despacho(docentry) {
  $.ajax({
    beforeSend: function () {
      $("#migrado_sap").html("");
    },
    url: "migradores/migrar_despacho_sap.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {
      $("#migrado_sap").html(x);
      estado_migrado = $("#estado_mig").text().trim();
      docentry_new = $("#docentry_mig").text().trim();
      if (estado_migrado === "02") {
        $messegae = "Migro a SAP" + docentry_new;
        swal("Aceptada!", $messegae, "success");
        enviar_sunat(docentry, 'VE')
      } else {
        $messegae = "NO Migro a SAP : " + docentry_new;
        swal("Error!", $messegae, "error");
      }
      console.log(x);
    },
    error: function (jqXHR, estado, error) {
      //$("#lista_sol_tras").html("Error en la peticion AJAX..." + estado + "      " + error);
    },
  });
}

function enviar_sunat(codigo_guia, tipo_gre) {
  if (
    tipo_gre === "VE"
  ) {
    $.post(
      "ENVIAR_JSON.php",
      {
        DocEntry: codigo_guia,
        tipo_gre: tipo_gre,
      },
      function (data1) {
        $("#data_json").html(data1);
        //*console.log(data1);
        stado = $("[name='cod_sunat']").text().trim();
        if (stado == "0") {
          $("#modal_detalle").modal("hide");
          swal("Aceptada!", "Guia Aceptada", "success");
        } else {
          $("#modal_detalle").modal("hide");
          swal("Error!", "Guia Observada", "error");
        }
        //generar_pdf(codigo_guia, tipo_gre);
      }
    );
  }
}
function listar_serie() {
  $.post("Lista_Seri_Preguia.php", {}, function (data2) {
    $("#lista_Srie").html(data2);
    $(".select2").select2();
  });
}
function listar_correlativo() {
  $.post("Lista_correlativo_Preguia.php", {}, function (data2) {
    $("#ulti").html(data2);
    console.log(data2);
    // $(".select2").select2();
  });
}
function cargar_ubigeo3() {
  depar = $("#direccion_llegada_gre option:selected").val();
  if (depar == "1") {
    num_der = 15;
  }
  $.ajax({
    beforeSend: function () {
      $("#lista_ubigeollegada").html("Cargando Datos.....");
    },
    url: "lista_ubigeo_departamento_llega2.php",
    type: "POST",
    data: { num_der: num_der },
    success: function (x) {
      $("#lista_ubigeollegada").html(x);
      cargar_ubigeoprovincia3();
      //  $(".select2").select2({ dropdownParent: "#modal_detalle_items"
      // });
      //$(".form-select").select2();
      $(".select2").select2({
        width: "80%",
        dropdownParent: $("#modal_detalle_items"),
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function cargar_ubigeoprovincia3() {
  depar = $("#direccion_llegada_gre option:selected").val();
  num_prov = "";
  if (depar == "1") {
    num_prov = "1501";
  } else {
    num_prov = "1501";
  }
  $.ajax({
    beforeSend: function () {
      $("#lista_ubigeoprovinllegada").html("Cargando Datos.....");
    },
    url: "lista_ubigeo_provincia2.php",
    type: "POST",
    data: { depar: 15, num_prov: num_prov },
    success: function (x) {
      $("#lista_ubigeoprovinllegada").html(x);
      $(".select2").select2();
      cargar_ubigeodistpart3();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function cargar_ubigeodistpart3() {
  id = $("#lista_ubigeoprovinllegada option:selected").val();
  dir = $("#direccion_llegada_gre option:selected").val();
  distri = "";
  if (dir == "1") {
    distri = "150101";
  } else if (dir == "2") {
    distri = "150101";
  }
  // console.log(distri);
  $.ajax({
    beforeSend: function () {
      $("#lista_ubigeodistrillegada").html("Cargando Datos......");
    },
    url: "lista_ubigeo_distripar2.php",
    type: "POST",
    data: { distri: distri },
    success: function (x) {
      $("#lista_ubigeodistrillegada").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function Gprebtn() {
  Serie = $("#lista_Srie option:selected").val();
  // Serie = '0';
  Numero = $("#ulti").val().trim();
  // Numero = '0';
  fecha = $("#fecha").val();
  fechaEn = $("#fechaEn").val();
  cadcod = $("#cliente option:selected").val();
  clietex = $("#cliente option:selected").text();
  modalidad_tras = $("#mod_tras_gre option:selected").val(); //nuevo
  motivo_tras = $("#mot_tras_gre option:selected").val(); //nuevo
  client = clietex
    .replace(/[\*\^\'\!]/g, "")
    .split(" ")
    .join(" ");
  IdCli = $("#Envi option:selected").val();
  IdDes = $("#EnviD option:selected").val();
  ////DIRECCION///
  dire_partida_gre = quitarAcentos($("#direccion_llegada_gre option:selected").text()); //nuevo
  dire_partida_ubi = $("#lista_ubigeodistrillegada option:selected").val(); //nuevo
  Direcioncli = $("#Direc").val().trim();
  // DirecionD = $("#DirecD").val().trim();
  DirecionD = '';

  dire_llegada_ubi = $("#lista_ubigeodistri2 option:selected").val(); //nuevo;
  ////TRASNPORTISTA////
  // NTRAPORo = $("#NTRASP").val().trim();
  // NTRAPOR = NTRAPORo.replace(/[\*\^\'\!]/g, "")
  //   .split(" ")
  //   .join(" ");
  // RUCTRAN = $("#Ructran").val().trim();
  // DIRECTRANS = quitarAcentos($("#DTra").val().trim());
  // nro_mtc = $("#mtc_trans").val().trim(); //nuevo
  NTRAPORo = '';
  NTRAPOR = '';
  RUCTRAN = '';
  DIRECTRANS = '';
  nro_mtc = ''; //nuevo
  ///CONDUCTOR/////
  // Licencia = $("#licencia_conduc_gre").val().trim();
  // Conductor = quitarAcentos($("#nombre_conduc_gre").val().trim());
  // Conductor_apellido = quitarAcentos($("#apellido_conduc_gre").val().trim()); //nuevo
  // Conductor_dni = $("#dni_conduc_gre").val().trim(); //nuevo
  Licencia = '';
  Conductor = '';
  Conductor_apellido = ''; //nuevo
  Conductor_dni = ''; //nuevo
  /////VEHICULO////
  // Placa = $("#nplaca").val().trim();
  // Vehi = $("#placacon").val().trim();
  // nro_tuc = $("#mtc_trans").val().trim(); //nuevo

  Placa = '';
  Vehi = '';
  nro_tuc = '';
  //////////////
  Dpartida = quitarAcentos($("#Dpartida").val().trim());
  Dllegada = quitarAcentos($("#Dllegada").val().trim());
  Trasnspor = quitarAcentos($("#Trasnspor").val().trim());
  Truc = $("#Truc").val().trim();
  Tdirec = quitarAcentos($("#Tdirec").val().trim());
  Ncontenedor = $("#Ncontenedor").val().trim();
  Nprecinto = $("#Nprecinto").val().trim();
  Nprecinto2 = $("#Nprecinto2").val().trim();
  Nprecinto3 = $("#Nprecinto3").val().trim();
  Nprecinto4 = $("#Nprecinto4").val().trim();
  Ginter = $("#Ginter").val().trim();
  Gruc = $("#Gruc").val().trim();
  GDinter = $("#GDinter").val().trim();
  observaciones = quitarAcentos($("#observacion_gre_compras").val()); //nuevo
  num_bultos = $("#num_bultos").val().trim();
  peso_total = $("#peso_total").val().trim();

  //Placa =$("#lista_Placa option:selected").val();

  if (client === "Selecione un Cliente") {
    alertify.error("Selecione un Cliente");
  } else if (Serie === "Selecione una Serie") {
    alertify.error("Selecione una Serie");
  } else {
    if (id.length === 0) {
      alertify.success("Seleccione algun Pedido");
    } else {
      $.ajax({
        url: "InsertarEncabezadoPreGuia2.php",
        type: "POST",
        data: {
          fecha: fecha,
          fechaEn: fechaEn,
          card: cadcod,
          client: client,
          Direcioncli: Direcioncli,
          DirecionD: DirecionD,
          Serie: Serie,
          Numero: Numero,
          Licencia: Licencia,
          Conductor: Conductor,
          Placa: Placa,
          Vehi: Vehi,
          Dpartida: Dpartida,
          Dllegada: Dllegada,
          Trasnspor: Trasnspor,
          Truc: Truc,
          Tdirec: Tdirec,
          Ncontenedor: Ncontenedor,
          Nprecinto: Nprecinto,
          Nprecinto2: Nprecinto2,
          Nprecinto3: Nprecinto3,
          Nprecinto4: Nprecinto4,
          Ginter: Ginter,
          Gruc: Gruc,
          GDinter: GDinter,
          IdCli: IdCli,
          IdDes: IdDes,
          NTRAPOR: NTRAPOR,
          RUCTRAN: RUCTRAN,
          DIRECTRANS: DIRECTRANS,
          ////////////////////////////
          modalidad_tras: modalidad_tras,
          motivo_tras: motivo_tras,
          dire_partida_gre: dire_partida_gre,
          dire_partida_ubi: dire_partida_ubi,
          dire_llegada_ubi: dire_llegada_ubi,
          nro_mtc: nro_mtc,
          Conductor_apellido: Conductor_apellido,
          Conductor_dni: Conductor_dni,
          nro_tuc: nro_tuc,
          observaciones: observaciones,
          num_bultos: num_bultos,
          peso_total: peso_total
        },

        success: function (x) {
          va = $("#valor").text().trim();
          //console.log(x);
          docentry = parseInt(x);
          if (docentry == 0) {
            alertify.error("No Inserto");
            if (va == 1) {
            }
          } else {
            insertar1(docentry);
            // migrar_sap_despacho(docentry);
            Swal.fire({
              icon: 'success',
              title: '¡Inserción exitosa!',
              text: 'El registro se ha insertado correctamente.',
              timer: 3000, // Cerrar automáticamente después de 3 segundos (3000 ms)
              showConfirmButton: false, // Ocultar el botón de confirmación

            });
          }

        },
      });
    }
  }
}

function consultar() {
  ruc = $("#Ructran").val();
  // document.getElementById('#consult').disabled = false;
  $.ajax({
    beforeSend: function () {
      //$("#correlativo_grt").html("Recuperando proveedores...");
    },
    url: "post_ruc_gre.php",
    type: "POST",
    dataType: "json",
    data: { ruc: ruc },
    success: function (data2) {
      console.log(data2);

      valido = data2.success;

      razon = data2.result.razon_social;
      direccion = data2.result.direccion;

      //console.log(data2.result.razon_social);
      if (valido == "false") {
        alertify.error("error ruc no existe");
      } else {
        $("#NTRASP").val(razon);
        $("#DTra").val(direccion);
      }
    },
    error: function (jqXHR, estado, error) { },
  });
}

function Openclick() {
  cargar_ubigeollegada(0, 0, 0);
}

function cargar_ubigeollegada(dep, prov, dist) {
  $.ajax({
    beforeSend: function () {
      $("#lista_ubigeopartida2").html("Cargando Datos.....");
    },
    url: "lista_ubigeo_departamento_pre.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_ubigeopartida2").html(x);
      $(".js-example-basic-single").select2();
      if (dep !== 0) {
        $("#lista_ubigeopartida2 select").val(dep).trigger("change");
        cargar_ubigeoprovincia(dep, prov, dist);
      }
    },
    error: function (jqXHR, estado, error) { },
  });
}

function cargar_ubigeoprovincia(dep, prov, dist) {
  depar = $("#lista_ubigeopartida2 option:selected").val();
  $.ajax({
    beforeSend: function () {
      $("#lista_ubigeoprovinpar2").html("Cargando Datos......");
    },
    url: "lista_ubigeo_provincia_pre.php",
    type: "POST",
    data: { depar: depar },
    success: function (x) {
      $("#lista_ubigeoprovinpar2").html(x);
      $(".select2").select2();
      if (dep !== 0) {
        $("#lista_ubigeoprovinpar2 select").val(prov).trigger("change");
        cargar_ubigeodistpart(dep, prov, dist);
      }
    },
    error: function (jqXHR, estado, error) { },
  });
}

function cargar_ubigeodistpart(dep, prov, dist) {
  id = $("#lista_ubigeoprovinpar2 option:selected").val();

  $.ajax({
    beforeSend: function () {
      $("#lista_ubigeodistri2").html("Cargando Datos......");
    },
    url: "lista_ubigeo_distripar.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#lista_ubigeodistri2").html(x);
      $(".select2").select2();
      if (dep !== 0) {
        $("#lista_ubigeodistri2 select").val(dist).trigger("change");
      }
    },
    error: function (jqXHR, estado, error) { },
  });
}


function quitarAcentos(cadena) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ñ: "N",
    ñ: "n",
    ç: "c",
    Ç: "C",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
    "&": ""

  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString().replace(/['"]+/g, '');
}

function lista_direccionfiscal() {
  var cardcode = $("#cliente").val();
  $.ajax({
    beforeSend: function () {

    },
    url: "pone_direccionfiscal.php",
    type: "POST",
    data: { cardcode: cardcode },
    success: function (x) {
      $("#DirecD").html(x);

    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_direccion_condicion() {
  var cardcode = '';
  var cardcode = $("#cliente").val().toString();
  $(document).ready(function () {
    $.ajax({
      //          beforeSend: function(){
      //            $("#montolp").html("Recuperando Lista Precios...");
      //           },
      url: 'lista_direccion_venta_client1.php',

      type: 'POST',
      data:
        { cardcode },
      success: function (x) {
        $("#pone_cdireccion").html(x);
        $(".select2").select2();
        // console.log(x);

      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function poner_direcion1() {
  direccion = $("#pone_cdireccion option:selected").text();

  if (direccion != "") {
    $('#Direc').val(direccion);

  } else
    alert("no se selecciono nada.")
}



// function insertar() {
//   var bandera= true;

//   $("#tabla_det > tbody > tr").each(function() {
//     valorCelda = $(this).find("td").eq(6).html();
//      cantidadDespachar = parseFloat($(this).find('input[type="number"]').val());
//      stockDisponible = parseFloat(valorCelda);
//   });
//     if (cantidadDespachar === 0 || isNaN(cantidadDespachar)) {
//       alertify.error("Cantidad a despachar no puede ser 0 o vacía");
//       var $row = $(this);
//       var $button = $("#miBoton");
//       $row.removeClass("fila-verde");
//       $button.prop("disabled", true);
//      bandera = false;
//     }


//     if (cantidadDespachar > stockDisponible) {
//       alertify.error("Cantidad a despachar no puede ser mayor al stock disponible");
//       var $row = $(this);
//       var $button = $("#miBoton");
//       $row.removeClass("fila-verde");
//       $button.prop("disabled", true);
//       bandera = false;
//     }
  
//     // Si al menos una validación es exitosa, marcar como true
//    if( bandera = true){
//     $(this).addClass("fila-verde");
//     $("#myModal").modal("show");
//     cargar_ubigeollegada();
//     listar_serie();
//     listar_correlativo();
//     Openclick();
//     lista_direccion_condicion();
//    };



// }
