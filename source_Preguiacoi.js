
//////listar clientes PREGUIA 
function lista_Cliente() {
  $(document).ready(function () {
    $("#Generar").hide()
    $.ajax({
      beforeSend: function () {
        $("#lista_Clien").html("Recuperando proveedores...");
      },
      url: 'Lista_Clientes_Pedidos_Gui.php',
      type: 'POST',
      data: null,
      success: function (x) {


        $("#lista_Clien").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


///////////////////// evento de selecion del combo

//Mostrar  CLientes con pedidos

$(document).ready(function () {

  $("#lista_Clien").on('change', function () {
    $("#lista_Clien option:selected").each(function () {
      elegido = $(this).val();

      $.post("Consulta_Pedidos_Scaneados.php", { card: elegido },
        function (data1) {
          $("#lista_leidos").html(data1);
          $('#Tabla_Esca').DataTable();

        });


    });
  });
});
//////


////////////////////////////////////////////////SELECIONAR  PRODUCTO - EVETO CHECK
///totalizado con check

$(document).on('click', '#che', function () {

  //Revisa en que status está el checkbox y controlalo según lo //desees
  if ($(this).is(':checked')) {

    $("#Generar").show()

    $(this).parents("tr").find("td").css("background-color", "LightGreen");

    actual = $('#canti').text().trim();
    var canti = $(this).parents("tr").find("td").eq(9).text();
    totalsu = parseInt(actual) + parseInt(canti);

    document.querySelector('#canti').innerText = totalsu;




    peso = $('#pesr').text().trim();
    var pesoactu = $(this).parents("tr").find("td").eq(10).text();
    totalsuPe = parseFloat(peso) + parseFloat(pesoactu);
    totalsuPeDA = Number(totalsuPe.toFixed(2));



    document.querySelector('#pesr').innerText = totalsuPeDA;
  }

  else {

    //$(this).parents("tr").find("td").css( "color", "black" );
    $(this).parents("tr").find("td").css("background-color", "white");

    actulcanti = $('#canti').text().trim();
    var canti = $(this).parents("tr").find("td").eq(9).text();
    totaldes = parseInt(actulcanti) - parseInt(canti);
    document.querySelector('#canti').innerText = totaldes;


    actualpeso = $('#pesr').text().trim();
    var peso = $(this).parents("tr").find("td").eq(10).text();
    var totalpesoact = parseFloat(actualpeso) - parseFloat(peso);
    numero = Number(totalpesoact.toFixed(2));
    document.querySelector('#pesr').innerText = numero;
  }
});




/////////////////BOTON GUENERAR GUI -ABRE MODAL
$errados = 0;
$icount = 0;


function Openclick() {
  $icount = 0;
  $errados = 0;

  $(document).ready(function () {
    //lista direciones de clientes
    var id = [];
    $checked = $(":checkbox:checked").length;

    $(":checkbox:checked").each(function (key) {

      id[key] = $(this).parents("tr").find("td").eq(4).text();
      numdoc = $(this).parents("tr").find("td").eq(1).text().trim();
      $iteme = $(this).parents("tr").find("td").eq(5).text().trim();
      $Can = $(this).parents("tr").find("td").eq(9).text().trim();
      $almacen = $(this).parents("tr").find("td").eq(11).text().trim();



      //  $.post("Consulta_Docnum_Preguia.php", {iteme:$iteme,Can:$Can,almacen:$almacen},
      //         function(data){

      //});



      $.post("Consultar_Stock_Preguia.php", { iteme: $iteme, Can: $Can, almacen: $almacen },
        function (data1) {
          $prue = data1.trim();

          if ($prue == 1) {
            $icount++;


            if ($checked == $icount) {
              if ($errados === 0) {

                //alert($errados);
                $('#modal_Datos').modal('show');
                //traer el docnum
                //$.post("Consulta_Docnum_Preguia.php", {clien:elegido},
                $.post("Consulta_Docnum_Preguia.php", { numdocu: numdoc },
                  function (dataa) {

                    //NOMBRE DE EMPRESA DE TRANSPORTE
                    $.post("Lista_Nomb_Transporte_Agencia.php", { docNum: dataa },
                      function (dat) {

                        var inputNombre2 = document.getElementById("NTRASP");
                        inputNombre2.value = dat.trim();




                      });

                    //RUC DE EMPRESA DE TRANSPORTE
                    $.post("Lista_Ruc_Transporte_Agencia.php", { docNum: dataa },
                      function (dat1) {

                        var inputNombre2 = document.getElementById("Ructran");
                        inputNombre2.value = dat1.trim();




                      });

                    $.post("Lista_Direc_Transporte_Agencia.php", { docNum: dataa },
                      function (dat2) {

                        var inputNombre2 = document.getElementById("DTra");
                        inputNombre2.value = dat2.trim();




                      });

                  });

                $.post("Lista_DireccioSelec_PreGuia.php", { clien: elegido },
                  function (data1) {


                    var inputNombre2 = document.getElementById("DirecD");
                    inputNombre2.value = data1.trim();

                  });
                $.post("Lista_Direcciodest_PreGuia.php", { clien: elegido, numdoc: numdoc },
                  function (datades) {

                    var inputNombre = document.getElementById("Direc");
                    inputNombre.value = datades.trim();

                  });
                //lista numeros de serie
                $.post("Lista_Seri_Preguia.php", {},
                  function (data2) {
                    $("#lista_Srie").html(data2);
                    $(".select2").select2();


                  });


                //lista licencias
                $.post("Lista_Licencia_PreGuia.php", {},
                  function (data3) {
                    $("#lista_Licen").html(data3);
                    $(".select2").select2();


                  });
                //lista Placa
                $.post("Lista_Placa_PreGuia.php", {},
                  function (data4) {
                    $("#lista_Placa").html(data4);
                    $(".select2").select2();


                  });

              } else {
                alertify.error('Verificar stock de ' + $errados + ' productos de color rojo');

              }


            }

            else { }


          } else if ($prue === "") {

          }
          else {
            $errados++;
            $icount++;


            $("td:contains('" + $prue + "')").css("background-color", "red");



            if ($checked == $icount) {
              alertify.error('Verificar stock de ' + $errados + ' productos de color rojo');

            } else {


            }




          }
        });








    });

    if (id.length === 0) {

      alertify.success('Seleccione algun Pedido f');
    } else { }



  });
};


//evento click en el combo Serie -lista serie 
$(document).ready(function () {

  $("#lista_Srie").on('change', function () {
    $('#ulti').empty();
    $("#lista_Srie option:selected").each(function () {
      seri = $(this).val();


      $.post("Lista_UltimoNDocument_PreGuia.php", { elegido2: seri },

        function (data) {
          var inputNombre = document.getElementById("ulti");

          inputNombre.value = data.trim();

          // alertify.success(data);

        });
    });
  });
});


//EVENTO PARA MOSTRAR BOTONES
$(document).ready(function () {


  $("#Nprecinto").keypress(function () {
    $("#btp1").css("visibility", "visible");
  });
});


//BOTON PARA HABILITAR TEXTO PRECINTO2
$(document).on('click', '#btnAgregaPrecinto', function () {

  $("#pre2").css("visibility", "visible");
});



//EVENTO PARA MOSTRAR BOTON DE PRECINTO 2
$(document).ready(function () {


  $("#Nprecinto2").keypress(function () {
    $("#btp2").css("visibility", "visible");
  });
});



//BOTON PARA HABILITAR TEXTO PRECINTO3
$(document).on('click', '#btnAgregaPrecinto2', function () {

  $("#pre3").css("visibility", "visible");
});

//EVENTO PARA MOSTRAR BOTON DE PRECINTO 3
$(document).ready(function () {


  $("#Nprecinto3").keypress(function () {
    $("#btp3").css("visibility", "visible");
  });
});

//BOTON PARA HABILITAR TEXTO PRECINTO4
$(document).on('click', '#btnAgregaPrecinto3', function () {

  $("#pre4").css("visibility", "visible");
});



function Gprebtn() {

  fecha = $('#fecha').val();
  fechaEn = $('#fechaEn').val();
  cadcod = $("#lista_Clien option:selected").val();
  clietex = $("#lista_Clien option:selected").text();

  client = clietex.replace(/[\*\^\'\!]/g, '').split(' ').join(' ');

  IdCli = $("#Envi option:selected").val();
  IdDes = $("#EnviD option:selected").val();
  Direcioncli = $('#Direc').val().trim();
  DirecionD = $('#DirecD').val().trim();
  Serie = $("#lista_Srie option:selected").val();
  Numero = $("#ulti").val().trim();
  //Licencia=$("#lista_Licen option:selected").val();
  Licencia = $("#nLicencia").val().trim();
  Conductor = $('#Conductor').val().trim();
  //Placa=$("#lista_Placa option:selected").val();
  Placa = $("#nplaca").val().trim();
  Vehi = $('#placacon').val().trim();
  Dpartida = $('#Dpartida').val().trim();
  Dllegada = $('#Dllegada').val().trim();
  Trasnspor = $('#Trasnspor').val().trim();
  Truc = $('#Truc').val().trim();
  Tdirec = $('#Tdirec').val().trim();
  Ncontenedor = $('#Ncontenedor').val().trim();
  Nprecinto = $('#Nprecinto').val().trim();
  Nprecinto2 = $('#Nprecinto2').val().trim();
  Nprecinto3 = $('#Nprecinto3').val().trim();
  Nprecinto4 = $('#Nprecinto4').val().trim();
  Ginter = $('#Ginter').val().trim();
  Gruc = $('#Gruc').val().trim();
  GDinter = $('#GDinter').val().trim();

  NTRAPORo = $("#NTRASP").val().trim();
  NTRAPOR = NTRAPORo.replace(/[\*\^\'\!]/g, '').split(' ').join(' ');
  RUCTRAN = $("#Ructran").val().trim();
  DIRECTRANS = $("#DTra").val().trim();



  var id = [];
  var iteme = [];
  var obje = [];
  var line = [];
  var Des = [];
  var Can = [];
  var Pe = [];
  var CardCO = [];

  //Placa =$("#lista_Placa option:selected").val();


  if (client === "Selecione un Cliente") {
    alertify.error('Selecione un Cliente');

  }

  //else if($("#Direc").text() === "") {
  // alertify.success('La Direcion del Cliente no puede ser  vacio');

  //}
  //else if($("#DirecD").text() === "") {
  //alertify.success('La Direcion Destino no puede ser  vacio');

  //}
  else if (Serie === "Selecione una Serie") {
    alertify.error('Selecione una Serie');

  }
  // else if(Licencia === "Selecione una Licencia") {
  //alertify.error('Selecione una Licencia');

  // }
  // else if(Placa === "Selecione una Placa") {
  //alertify.error('Selecione una Placa');


  // }
  else {


    $(":checkbox:checked").each(function (key) {



      obje[key] = $(this).parents("tr").find("td").eq(2).text();

      line[key] = $(this).parents("tr").find("td").eq(3).text();
      id[key] = $(this).parents("tr").find("td").eq(4).text();


      iteme[key] = $(this).parents("tr").find("td").eq(5).text();
      CardCO[key] = $(this).parents("tr").find("td").eq(6).text();

      Des[key] = $(this).parents("tr").find("td").eq(8).text();

      Can[key] = $(this).parents("tr").find("td").eq(9).text();

      Pe[key] = $(this).parents("tr").find("td").eq(10).text();




    });
    if (id.length === 0) {

      alertify.success('Seleccione algun Pedido');
    } else {

      $.post("InsertarEncabezadoPreGuia.php", { fecha: fecha, fechaEn: fechaEn, card: cadcod, client: client, Direcioncli: Direcioncli, DirecionD: DirecionD, Serie: Serie, Numero: Numero, Licencia: Licencia, Conductor: Conductor, Placa: Placa, Vehi: Vehi, Dpartida: Dpartida, Dllegada: Dllegada, Trasnspor: Trasnspor, Truc: Truc, Tdirec: Tdirec, Ncontenedor: Ncontenedor, Nprecinto: Nprecinto, Nprecinto2: Nprecinto2, Nprecinto3: Nprecinto3, Nprecinto4: Nprecinto4, Ginter: Ginter, Gruc: Gruc, GDinter: GDinter, IdCli: IdCli, IdDes: IdDes, NTRAPOR: NTRAPOR, RUCTRAN: RUCTRAN, DIRECTRANS: DIRECTRANS },

        function (data1) {


          $("#nguia").html(data1);
          $("#nguia").hide();

          $("#validar").html(data1);

          va = $("#valor").text().trim();
          //alert(va);
          $('#validar').hide();

          if (va == 1) {
            alertify.error('El correlativo del documento ya se encuentra registrado');

          }


          else {


            alertify.success('Se a insertado Correctamente');



            var nguia2 = $("#idguia").text().trim();


            $.post("Actualizar_EstadoPreGuia.php", { card: CardCO, docen: id, nguia: nguia2, item: iteme },
              function (data1) {



              });

            $(":checkbox:checked").each(function (key) {



              $obje = $(this).parents("tr").find("td").eq(2).text().trim();

              $line = $(this).parents("tr").find("td").eq(3).text().trim();

              $id = $(this).parents("tr").find("td").eq(4).text().trim();

              $iteme = $(this).parents("tr").find("td").eq(5).text().trim();
              Unime = $(this).parents("tr").find("td").eq(7).text().trim();

              $Des = $(this).parents("tr").find("td").eq(8).text().trim();

              $Can = $(this).parents("tr").find("td").eq(9).text().trim();

              $Pe = $(this).parents("tr").find("td").eq(10).text().trim();
              $almacen = $(this).parents("tr").find("td").eq(11).text().trim();

              $desfu = $Des.replace(/[\*\^\'\!]/g, '').split(' ').join(' ');

              $.post("Insertar_DetallePreGuia.php", { nguia: nguia2, objet: $obje, docen: $id, linea: $line, item: $iteme, Desc: $desfu, Canti: $Can, Pes: $Pe, Unime: Unime, almacen: $almacen },
                function (data1) {


                });


              swal(
                "Su Guia fue Generada",
                "Cargando...",
                "success",
                2000,

              );


            });
            setTimeout('location.reload()', 2000);
          }
        });


    }

  }


}




///////LISTAR DETALLES DE PRE GUIA      
function Consultar_Detalle_Sca(ite, code) {

  var doce = code;
  var item = ite;
  var car = $("#lista_Clien option:selected").val();



  $item = item;
  $doce = doce;
  $car = car;

  $(document).ready(function () {
    $('#modal_sca').modal('show');



    $.post("Listar_Detalle_Pedido_Guia.php", { card: car, doc: doce, item: item },
      function (data) {

        $("#lista_scaneo2").html(data);
      });
  });
};


/*********************************************************************/

/**************************fechas***************************/
/*********************************************************************/
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
          $('#daterange-btn').daterangepicker(
            {
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
        $("#numero_ticket").inputmask('mask', { 'alias': 'numeric', 'autogroup': true, 'digits': 0, 'digitsOptional': false });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })
}
/*********************************************************************/

///////////////consultar detalle de las guias creadas

/*********************************************************************/
function busca_Guia_Emitida() {
  fechai = $("#fechai").val();
  fechaf = $("#fechaf").val();
  estado = $("#idEstado option:selected").val();
  if (estado === "Seleccione un Estado") {
    alertify.error('Seleccione un Estado');

  }

  else if (fechai == "") {
    alertify.error('Seleccione un fecha inicio');
  }
  else if (fechaf == "") {
    alertify.error('Seleccione un fecha fin');
  }

  else {

    // $("#data").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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

    $.post("Listar_Guias_Emitidas.php", { fechai: fechai, fechaf: fechaf, estado: estado },
      function (inf) {

        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#data").html(inf);
          $('#escp').DataTable();

        }, 1500); // Retraso de 1.5 segundos
      });
  }


}

/*****************************************************************
Muestra Detalle Preguias
************/
function muestra_detalle_Preguias(num_ticket) {
  var tic = num_ticket;
  // alert(num_ticket);
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle guias...");
    },
    url: 'consulta_detalle_preguia.php',
    type: 'POST',
    data: 'serie=' + tic,
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic);
      $(".nuticket").append("Detalle de Guias | <span class='label' style='background-color: royalblue'>#: " + tic + "</span>");
      $("#detalle_de_venta").html(x);


    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/*********************************FIN - GC Muestra Detalle Pedidos Pendientes *************************************************/
