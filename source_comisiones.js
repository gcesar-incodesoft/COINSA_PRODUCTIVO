function lista_vendedores_factura() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#IDvendedores").html("Recuperando proveedores...");
      },
      url: "Listar_vendedores_Comisiones.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#IDvendedores").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}


function lista_vendedores_factura_new() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#IDvendedores_new").html("Recuperando proveedores...");
      },
      url: "Listar_vendedores_Comisiones.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#IDvendedores_new").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}



$(document).ready(function () {
  $("#IDvendedores_new").on("change", function () {
    $("#IDvendedores_new option:selected").each(function () {
      busca_comisiones_vendedores();
    });
  });
});
////////// FIN
////////// CONSULTAR FACTURAS DE VENDEDORES

$(document).ready(function () {
  $("#IDvendedores").on("change", function () {
    $("#IDvendedores option:selected").each(function () {
      document.getElementById('acti').checked = false;
      id = $("#IDvendedores option:selected").val();
      fini = $("#fechai").val();
      ffin = $("#fechaf").val();
      tipo_cam = $("#tc_cierre").val();
      bandera = true;

      if (tipo_cam === '') {
        alertify.error("No hay tipo de cambio");
        bandera = false;
      }

      if (bandera === true) {
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
            `,
            },
          },
          buttons: false,
          closeOnClickOutside: false,
        });

        $.post(
          "Consulta_Facturas_Comision.php",
          { code: id, fechai: fini, fechaf: ffin },
          //           data: 'fechai='+$("#fi").val()+
          // '&fechaf='+$("#ff").val()+
          // '&sed='+$("#sed option:selected").val(),
          function (data1) {
            // Retrasar el cierre del Swal 1.5 segundos
            setTimeout(() => {
              swal.close();
              $("#lista_leidos").html(data1);

              var table = $("#Tabla_factu").DataTable({
                dom: '<"top"lBf>rt<"bottom"ip>',
                buttons: [
                  {
                    extend: "copy",
                    text: '<i class="fa fa-copy"></i> Copiar',
                    titleAttr: "Copiar",
                    className: "btn btn-copy",
                  },
                ],
                pageLength: -1,
                lengthMenu: [
                  [10, 20, 60, -1],
                  [10, 20, 60, "Todos"],
                ],
              });

              $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
              $("#Tabla_factu thead tr:eq(0) th").hide();

              $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
                if (i == 18 || i == 19) {
                  var $th = $(this);
                  filter($th, table, i);
                }
              });

              // Botón para mostrar todos
              $("#mostrar-todos").on("click", function () {
                $('#Tabla_factu').DataTable().column(5).search("").draw();
              });

            }, 1500); // Retraso de 1.5 segundos
          }
        );
      }
    });
  });
});

////////// FIN

////////// CONSULTAR FACTURAS DE VENDEDORES

function reg_comentarios() {

  $("#modal_comentarios").modal("show");

  doc = $("#doc_comi").val();
  $("#doc_comi").val(doc);
}




function modificar_comentario(doc) {

  $("#modal_modificarComen").modal("show");
  $("#modi_doc").val(doc);
}


function modi_comentarios() {

  doc = $("#modi_doc").val();
  comentariosaut = $("#modi_comen").val();

  $.ajax({
    beforeSend: function () {
    },
    url: 'actualizar_comentarios.php',
    type: 'POST',
    data: 'doc=' + doc + '&comentariosaut=' + comentariosaut,
    success: function (x) {
      var n = noty({
        text: "Se actualizó el comentario #: " + doc,
        theme: 'relax',
        layout: 'topLeft',
        type: 'success',
        timeout: 2000,
      });
      $("#modi_comen").val("");
      $("#modal_modificarComen").modal("hide");
      muestra_comentarios_controldeguias(doc)


    }
    ,
    error: function (jqXHR, estado, error) {
      $("#errores").html('Error... ' + estado + '  ' + error);
    }
  });


}



function ActivarCasilla(casilla) {
  // Rescatamos todos los controles tipo Input
  const miscasillas = document.getElementsByClassName('che'); // Cambiamos a getElementsByClassName

  // Recorremos los controles
  for (let i = 0; i < miscasillas.length; i++) {
    // Sincroniza el estado
    miscasillas[i].checked = casilla.checked;

    // Encontramos la fila correspondiente del checkbox
    const fila = miscasillas[i].closest("tr");

    // Cambiamos el color de fondo de la fila según el estado del checkbox
    if (miscasillas[i].checked) {
      fila.style.backgroundColor = "LightGreen"; // Marcado
    } else {
      fila.style.backgroundColor = "white"; // Desmarcado
    }

    resumen_nuevo();
  }
}

function registrar_comentarios() {

  doc = $("#doc_comi").val();
  comentariosaut = $("#comentariosaut").val();

  $.ajax({
    beforeSend: function () {
    },
    url: 'procesa_comen_comisiones.php',
    type: 'POST',
    data: 'doc=' + doc + '&comentariosaut=' + comentariosaut,
    success: function (x) {
      var n = noty({
        text: "Se ha procedido con el registro de revisión para el documento #: " + doc,
        theme: 'relax',
        layout: 'topLeft',
        type: 'success',
        timeout: 2000,
      });
      $("#comentariosaut").val("");


    }
    ,
    error: function (jqXHR, estado, error) {
      $("#errores").html('Error... ' + estado + '  ' + error);
    }
  });


}



function muestra_comentarios_controldeguias(id) {

  var idcl = id.split("|");


  doc = idcl[0];


  $("#modal_comentarios_revisioncontrolguias").modal("show");

  $.ajax({
    beforeSend: function () {
      $("#detalle_de_comentarios").html("Consultando comentarios...");
    },
    url: "consulta_comen_comisiones.php",
    type: "POST",
    data: "doc=" + doc,
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(doc);
      $(".nuticket").append(
        "Comentarios Revisión de Guias | <span class='label' style='background-color: royalblue'>#: " +
        doc +
        "</span>"
      );
      $("#detalle_de_comentarios").html(x);
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_comentarios").html(
        "Hubo un error: " + estado + " " + error
      );
    },
  });

}

function lista_facturas_comision() {
  $(document).ready(function () {

    document.getElementById('acti').checked = false;
    tipo_cam = $("#tc_cierre").val();
    id = $("#IDvendedores option:selected").val();
    vendedorID = $("#IDvendedores option:selected").val();
    fini = $("#fechai").val();
    ffin = $("#fechaf").val();
    bandera = true;


    if (tipo_cam === '') {
      alertify.error("No hay tipo de cambio");
      bandera = false;
    }


    if (vendedorID === "-1") {
      alertify.error("Seleccione un Vendedor");
      bandera = false;
    }




    if (bandera === true) {
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
            `,
          },
        },
        buttons: false,
        closeOnClickOutside: false,
      });
      $.post(
        "Consulta_Facturas_Comision.php",
        { code: id, fechai: fini, fechaf: ffin },
        //           data: 'fechai='+$("#fi").val()+
        // '&fechaf='+$("#ff").val()+
        // '&sed='+$("#sed option:selected").val(),
        function (data1) {
          // Retrasar el cierre del Swal 1.5 segundos
          setTimeout(() => {
            swal.close();
            $("#lista_leidos").html(data1);

            var table = $("#Tabla_factu").DataTable({
              dom: '<"top"lBf>rt<"bottom"ip>',
              buttons: [
                {
                  extend: "copy",
                  text: '<i class="fa fa-copy"></i> Copiar',
                  titleAttr: "Copiar",
                  className: "btn btn-copy",
                },
              ],
              pageLength: -1,
              lengthMenu: [
                [10, 20, 60, -1],
                [10, 20, 60, "Todos"],
              ],
            });

            $("#Tabla_factu thead tr").clone(true).appendTo("#Tabla_factu thead");
            $("#Tabla_factu thead tr:eq(0) th").hide();

            $("#Tabla_factu thead tr:eq(1) th").each(function (i) {
              if (i == 18 || i == 19) {
                var $th = $(this);
                filter($th, table, i);
              }
            });

            // Botón para mostrar todos
            $("#mostrar-todos").on("click", function () {
              $('#Tabla_factu').DataTable().column(5).search("").draw();
            });

          }, 1500); // Retraso de 1.5 segundos
        }
      );
    }


  });
}
////////// FIN


$(document).on("click", ".btn-copy", function () {
  Swal.fire({
    title: '¡Copiado!',
    text: 'Los datos se han copiado al portapapeles.',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500 // Se cierra automáticamente después de 1.5 segundos
  });
});

function Pcomi_nuevaCabecera(codvende) {

  fechadoc = $("#fechapag").val();
  //    vendedor=$("#IDvendedores option:selected").text().trim();

  total = 0;
  totalPago = 0;
  $(":checkbox:checked").each(function (key) {
    $docent = $(this).parent().parent().find("td").eq(2).text();
    $pago = $(this).parent().parent().find("td").eq(3).text();
    $mo = $(this).parent().parent().find("td").eq(5).text();

    totalPago = parseFloat(totalPago) + parseFloat($pago);

    total = parseFloat(total) + parseFloat($mo);
  });
  observa = $("#DirecD").val().trim();

  $.post(
    "InsertarEncabezadoComision.php",
    { codvende: codvende, fechadoc: fechadoc, observa: observa },

    function (data1) {
      $("#nguia").html(data1);
      $("#nguia").hide();

      var nguia2 = $("#nguia").text().trim();
      // $(":checkbox:checked").each(function(key){
      $("input[name=che]:checked ").each(function (key) {
        baseentry = $(this).parent().parent().find("td").eq(15).text();
        docnum = $(this).parent().parent().find("td").eq(1).text();
        numatcard = $(this).parent().parent().find("td").eq(3).text();
        objtype = $(this).parent().parent().find("td").eq(16).text();
        doctotalmn = $(this).parent().parent().find("td").eq(9).text();
        doctotalme = $(this).parent().parent().find("td").eq(8).text();
        doccur = $(this).parent().parent().find("td").eq(7).text();
        porcom = $(this).parent().parent().find("td").eq(10).text();
        totalcom = $(this).parent().parent().find("td").eq(11).text();
        cardcode = $(this).parent().parent().find("td").eq(17).text();
        //vendedor_com2 = $(this).parent().parent().find("td").eq(22).text();
        //comision_vendedor2 = $(this).parent().parent().find("td").eq(21).text();
        //console.log(docnum);


        $.post(
          "Insertar_DetalleComision_new.php",
          {
            baseentry: baseentry,
            docnum: docnum,
            numatcard: numatcard,
            objtype: objtype,
            doctotalmn: doctotalmn,
            doctotalme: doctotalme,
            doccur: doccur,
            porcom: porcom,
            totalcom: totalcom,
            cardcode: cardcode,
          },
          function (data2) {
            console.log("Segunda Cabecera");

          }
        );
      });
    }
  );
  //CERRAR MODAL
  // swal("El proceso se realizó con éxito.", "Cargando...", "success", 3000);
  // setTimeout("location.reload()", 3000);
  // $("#modal_leeer").modal("hide");
}





function modificar_comision2(id) {
  $("#modal_modificar_comi").modal("show");

  var idcl = id.split("|");
  var moneda = idcl[6];
  var tipo_com = idcl[2];
  vendedores2();
  $("#doc_comi").val(idcl[0]);
  $("#sap_com").val(idcl[1]);
  $("#tipo_com").val(idcl[2]);
  $("#numfactu_com").val(idcl[3]);
  $("#fecha_com").val(idcl[4]);
  $("#cliente_com").val(idcl[6]);
  $("#moneda_com").val(idcl[7]);
  $("#comision_com_ge").val(parseFloat(idcl[9]).toFixed(2));
  $("#comision_com_ven").val(parseFloat(idcl[10]).toFixed(2));
  $("#comision_com_ven2").val(parseFloat(idcl[14]).toFixed(2));
  $("#comision_com_ge2").val(parseFloat(idcl[16]).toFixed(2));

  //console.log("Tipo_Comprobante".tipo_com);

  if (moneda === "USD") {
    $("#total_com").val(parseFloat(idcl[10]).toFixed(2));
  } else {
    $("#total_com").val(parseFloat(idcl[11]).toFixed(2));
  }

  $("#obj_comi").val(idcl[13]);

  vend_value = idcl[15];
  // console.log(idcl[15])
  console.log(idcl[16])

  if (vend_value === '') {
    setTimeout(() => {
      $("#vendedor2 select").val(-1).trigger("change.select2");
    }, 1500);
  } else {
    setTimeout(() => {
      $("#vendedor2 select").val(idcl[15]).trigger("change.select2");
    }, 1500);
  }


}




function procesa_modifi() {
  docentry = $("#doc_comi").val();
  comision_nueva = $("#comision_com_ge").val();
  comision_nueva_ven = $("#comision_com_ven").val();
  objtype = $("#obj_comi").val();
  tipo = $("#tipo_com").val();
  vendedor2 = $("#vendedor2 option:selected").val();
  comision_vendedor2 = $("#comision_com_ven2").val();
  nom_vende2 = $("#vendedor2 option:selected").text().trim();
  nom_vendedor = $("#IDvendedores option:selected").text().trim();
  comision_nueva2 = $("#comision_com_ge2").val();

  bandera = true;

  if (objtype === "") {
    objtype = 0;
  }

  // Validación cuando hay vendedor pero no comisión
  if (vendedor2 !== "-1" && comision_vendedor2 === '0.00') {
    alertify.error("Debe ingresar un valor en el campo de comisión");
    bandera = false;
  }

  // Validación cuando hay comisión pero no se ha seleccionado un vendedor
  if (comision_vendedor2 > '0.00' && vendedor2 === "-1") {
    alertify.error("Debe seleccionar un vendedor");
    bandera = false;
  }


  if (nom_vende2 === nom_vendedor) {
    alertify.error("No puede seleccionar el mismo Vendedor");
    bandera = false;
  }


  if (bandera === true) {
    $.ajax({
      url: "actualiza_comisiones.php",

      type: "POST",
      data: {
        docentry: docentry,
        comision_nueva: comision_nueva,
        comision_nueva_ven: comision_nueva_ven,
        objtype: objtype,
        vendedor2: vendedor2,
        comision_vendedor2: comision_vendedor2,
        comision_nueva2: comision_nueva2
      },
      success: function (x) {
        swal("Modifico!", "Comision Modificada", "success");
        $("#modal_modificar_comi").modal("hide");
        lista_facturas_comision();
      },
      error: function (jqXHR, estado, error) { },
    });
  }

}



function vendedores2() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#vendedor2").html("Recuperando proveedores...");
      },
      url: "pone_vende2.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#vendedor2").html(x);

        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}




function detalle(id) {
  $("#modal_detalle_comi").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });

  $.ajax({
    beforeSend: function () {
      $("#tabla_detalle_kit").html("Cargando ...");
    },
    url: "consulta_detalle_comi.php",
    type: "POST",
    data: { id: id },
    success: function (x) {
      $("#tabla_detalle_kit").html(x);
      $("#tabla_kit").DataTable({
        order: [[0, "desc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function validar_numero(event) {
  console.log(event);
  var charCode = event.which ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    alertify.error("No puede ingresar letras");
    return false;
  }
  return true;
}

function formatNumber(n) {
  n = String(n).replace(/\D/g, "");
  return n === "" ? n : Number(n).toLocaleString();
}
// abrir modal
$(document).ready(function () {
  $("#btnLeer").on("click", function () {
    var id = [];
    var docent = [];
    var obj = [];
    $("input[name=che]:checked ").each(function (key) {
      // $(":checkbox:checked").each(function(key){

      id[key] = $(this).parents("tr").find("td").eq(1).text();
      docent[key] = $(this).parents("tr").find("td").eq(6).text();
      obj[key] = $(this).parents("tr").find("td").eq(7).text();
    });

    if (id.length === 0) {
      alertify.error("Seleccione una Factura");
    } else {
      $("#modal_leeer").modal("show");

      $total = 0;
      $total1 = 0;

      $("input[name=che]:checked ").each(function (key) {
        $docent = $(this).parent().parent().find("td").eq(2).text();
        $obj = $(this).parent().parent().find("td").eq(3).text();

        $mo = $(this).parent().parent().find("td").eq(10).text();
        $comision = $(this).parent().parent().find("td").eq(11).text();

        $total1 = parseFloat($total1) + parseFloat($comision);
        // console.log("total 1  " + $total1);
        //$motosoles=parseFloat($mo) * parseFloat($cam);

        $total = parseFloat($total) + parseFloat($mo);
      });
      // totalsuPeDA = Number(total.toFixed(3));
      //t=formatNumber(totalsuPeDA);

      $("#canti").html($total);
    }
  });
});

/////////////// fin

/////////////// BOTON GUARDAR ORIGINAL

// function Pcomi_Original() {
//   codvende = $("#IDvendedores option:selected").val();
//   fechadoc = $("#fechapag").val();
//   tc_cierre = $("#tc_cierre").val();
//   //    vendedor=$("#IDvendedores option:selected").text().trim();

//   total = 0;
//   totalPago = 0;
//   $(":checkbox:checked").each(function (key) {
//     $docent = $(this).parent().parent().find("td").eq(2).text();
//     $pago = $(this).parent().parent().find("td").eq(3).text();
//     $mo = $(this).parent().parent().find("td").eq(5).text();

//     totalPago = parseFloat(totalPago) + parseFloat($pago);

//     total = parseFloat(total) + parseFloat($mo);
//   });
//   observa = $("#DirecD").val().trim();

//   $.post(
//     "InsertarEncabezadoComision.php",
//     { codvende: codvende, fechadoc: fechadoc, observa: observa, tc_cierre: tc_cierre },

//     function (data1) {
//       $("#nguia").html(data1);
//       $("#nguia").hide();

//       var nguia2 = $("#nguia").text().trim();
//       // $(":checkbox:checked").each(function(key){
//       $("input[name=che]:checked ").each(function (key) {
//         baseentry = $(this).parent().parent().find("td").eq(17).text();
//         docnum = $(this).parent().parent().find("td").eq(1).text();
//         numatcard = $(this).parent().parent().find("td").eq(3).text();
//         objtype = $(this).parent().parent().find("td").eq(18).text();
//         doctotalmn = $(this).parent().parent().find("td").eq(9).text();
//         doctotalme = $(this).parent().parent().find("td").eq(8).text();
//         doccur = $(this).parent().parent().find("td").eq(7).text();
//         porcom = $(this).parent().parent().find("td").eq(12).text();


//         if (doccur === 'USD') {
//           totalcom = $(this).parent().parent().find("td").eq(13).text(); //USD
//         } else {
//           totalcom = $(this).parent().parent().find("td").eq(14).text(); //SOL
//         }


//         cardcode = $(this).parent().parent().find("td").eq(19).text();
//         vendedor_com2 = $(this).parent().parent().find("td").eq(24).text();
//         comision_vendedor2 = $(this).parent().parent().find("td").eq(23).text();
//         //console.log(docnum);
//         $.post(
//           "Insertar_DetalleComision.php",
//           {
//             baseentry: baseentry,
//             docnum: docnum,
//             numatcard: numatcard,
//             objtype: objtype,
//             doctotalmn: doctotalmn,
//             doctotalme: doctotalme,
//             doccur: doccur,
//             porcom: porcom,
//             totalcom: totalcom,
//             cardcode: cardcode,
//           },
//           function (data2) {

//             // if (comision_vendedor2 === '0.00') {
//             //   console.log("no se repite")
//             // } else {
//             //   Pcomi_nuevaCabecera(vendedor_com2)
//             // }

//             $("#modalProcesandoComision").modal("show");

//             setTimeout(function () {
//               $("#modalProcesandoComision").modal("hide");
//               $("#modal_leeer").modal("hide");
//               swal({
//                 timer: 1500,
//                 icon: 'success',
//                 content: {
//                   element: "div",
//                   attributes: {
//                     innerHTML: `
//                       <br>
//                       <h2>Comision procesada con éxito!</h2>
//                       <div style="text-align: center; margin-bottom: 10px;">
//                         <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 55px;">
//                       </div>
//                       <style>
//                       .icon-check {
//                         display: inline-block; 
//                         font-size: 90px; 
//                         color: #008f39; 
//                         margin-bottom: 15px;
//                       }
//                       h2 {
//                         font-weight: bold; 
//                         font-size: 23px; 
//                         color: #545454; 
//                         margin: 10px 0;
//                       }
//                       </style>
//                     `,
//                   },
//                 },
//                 buttons: false,
//                 closeOnClickOutside: false,
//               });
//             }, 2000);
//             lista_facturas_comision();
//           }
//         );
//       });
//     }
//   );
//   //CERRAR MODAL
//   // swal("El proceso se realizó con éxito.", "Cargando...", "success", 3000);
//   // setTimeout("location.reload()", 3000);
//   // $("#modal_leeer").modal("hide");
// }

/////////////// BOTON GUARDAR

function Pcomi() {
  codvende = $("#IDvendedores option:selected").val();
  fechadoc = $("#fechapag").val();
  tc_cierre = $("#tc_cierre").val();
  //    vendedor=$("#IDvendedores option:selected").text().trim();

  total = 0;
  totalPago = 0;
  $(":checkbox:checked").each(function (key) {
    $docent = $(this).parent().parent().find("td").eq(2).text();
    $pago = $(this).parent().parent().find("td").eq(3).text();
    $mo = $(this).parent().parent().find("td").eq(5).text();

    totalPago = parseFloat(totalPago) + parseFloat($pago);

    total = parseFloat(total) + parseFloat($mo);
  });
  observa = $("#DirecD").val().trim();

  $.post(
    "InsertarEncabezadoComision.php",
    { codvende: codvende, fechadoc: fechadoc, observa: observa, tc_cierre: tc_cierre },

    function (data1) {
      $("#nguia").html(data1);
      $("#nguia").hide();

      var nguia2 = $("#nguia").text().trim();
      // $(":checkbox:checked").each(function(key){
      $("input[name=che]:checked ").each(function (key) {
        baseentry = $(this).parent().parent().find(".col-docentry").text();
        docnum = $(this).parent().parent().find(".col-docnum").text();
        numatcard = $(this).parent().parent().find(".col-numatcard").text();
        objtype = $(this).parent().parent().find(".col-objtype").text();
        doctotalmn = $(this).parent().parent().find(".col-totalmn").text();
        doctotalme = $(this).parent().parent().find(".col-totalme").text();
        doccur = $(this).parent().parent().find(".col-doccur").text();
        porcom = $(this).parent().parent().find(".col-porcom").text();


        if (doccur === 'USD') {
          totalcom = $(this).parent().parent().find(".col-comision-usd").text(); //USD
        } else {
          totalcom = $(this).parent().parent().find(".col-comision-sol").text(); //SOL
        }


        cardcode = $(this).parent().parent().find(".col-cardcode").text();
        vendedor_com2 = $(this).parent().parent().find(".col-vendedor2id").text();
        comision_vendedor2 = $(this).parent().parent().find(".col-com3").text();
        //console.log(docnum);
        $.post(
          "Insertar_DetalleComision.php",
          {
            baseentry: baseentry,
            docnum: docnum,
            numatcard: numatcard,
            objtype: objtype,
            doctotalmn: doctotalmn,
            doctotalme: doctotalme,
            doccur: doccur,
            porcom: porcom,
            totalcom: totalcom,
            cardcode: cardcode,
          },
          function (data2) {

            // if (comision_vendedor2 === '0.00') {
            //   console.log("no se repite")
            // } else {
            //   Pcomi_nuevaCabecera(vendedor_com2)
            // }

            $("#modalProcesandoComision").modal("show");

            setTimeout(function () {
              $("#modalProcesandoComision").modal("hide");
              $("#modal_leeer").modal("hide");
              swal({
                timer: 1500,
                icon: 'success',
                content: {
                  element: "div",
                  attributes: {
                    innerHTML: `
                      <br>
                      <h2>Comision procesada con éxito!</h2>
                      <div style="text-align: center; margin-bottom: 10px;">
                        <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 55px;">
                      </div>
                      <style>
                      .icon-check {
                        display: inline-block; 
                        font-size: 90px; 
                        color: #008f39; 
                        margin-bottom: 15px;
                      }
                      h2 {
                        font-weight: bold; 
                        font-size: 23px; 
                        color: #545454; 
                        margin: 10px 0;
                      }
                      </style>
                    `,
                  },
                },
                buttons: false,
                closeOnClickOutside: false,
              });
            }, 2000);
            lista_facturas_comision();
          }
        );
      });
    }
  );
  //CERRAR MODAL
  // swal("El proceso se realizó con éxito.", "Cargando...", "success", 3000);
  // setTimeout("location.reload()", 3000);
  // $("#modal_leeer").modal("hide");
}




function abrir_modal_procesa_ventas() {
  // Mostrar el modal de "Procesando Venta..."
  $("#modalProcesandoComision").modal("show");

  setTimeout(function () {
    $("#modalProcesandoComision").modal("hide");

    swal({
      timer: 1500,
      icon: 'success',
      content: {
        element: "div",
        attributes: {
          innerHTML: `
          <br>
            <h2>Comision procesada con éxito!</h2>
            <div style="text-align: center; margin-bottom: 10px;">
              <img src="image/IncodeMob.png" alt="incodemob" style="width: 75px; height: 55px;">
            </div>
            <style>
            h2 {
              font-weight: bold; 
              font-size: 23px; 
              color: #545454; 
              margin: 10px 0;
            }
            </style>
          `,
        },
      },
      buttons: false,
      closeOnClickOutside: false,
    });
  }, 2000);
}

///////////////

///////////////

///////////////
function Consultar_Detalle_Pago(doc, ob) {
  var doc = doc;
  var ob = ob;
  $doc = doc;
  $ob = ob;

  $(document).ready(function () {
    $("#modal_CODIGOS").modal("show");

    $.post("Listar_DetallePagos.php", { doc: doc, ob: ob }, function (data) {
      $("#lista_scaneo").html(data);
    });
  });
}

//////////
///////////////CAMBIO DE ESTADO
///////////// eliminar items del modal
function Eliminar_Item_Sca_Des(id) {
  var id2 = id;

  alertify.confirm(
    "Eliminar",
    "Desea Eliminar?",
    function (E) {
      Eliminar_Item_Sca2de(id2);
      alertify.success("Eliminado");
    },
    function () {
      alertify.error("Cancelado");
    }
  );
  //  var bool=confirm("Seguro de eliminar el dato?");
}
//eliminnar registrros scaneados

function Eliminar_Item_Sca2de(id) {
  var id = id;

  var doc = $doc;
  var ob = $ob;

  $(document).ready(function () {
    $.post("Eliminar_DetallePago.php", { id: id }, function (data) {
      $.post("Listar_DetallePagos.php", { doc: doc, ob: ob }, function (data) {
        $("#lista_scaneo").html(data);
      });
    });
  });
}

/*******************************************************************************/
////exportar en excel
//
$(document).ready(function () {
  $("#btnExportDetCom").click(function (e) {
    window.open(
      "data:application/vnd.ms-excel," +
      encodeURIComponent($("#lista_leidos").html())
    );
    e.preventDefault();
  });
});
$(document).ready(function () {
  $("#btnExportDetCom").click(function () {
    var export_type = $(this).data("export-type");
    $("#lista_leidos").tableExport({
      type: export_type,
      escape: "false",
      ignoreColumn: [],
    });
  });
});
/*******************************************************************************/

/***********************GENERAR EXCEL ALMACEN********************************************************/
function GenerarExcelReportComprobantesCom() {
  $(document).ready(function () {
    fechai = $("#fechai").val();
    fechaf = $("#fechaf").val();

    vendedor = $("#IDvendedores option:selected").text();
    idvendedor = $("#IDvendedores option:selected").val();
    // alertify.success(idvendedor) ;
    if (idvendedor == "-1") {
      alertify.error("Seleccione un Vendedor");
    } else {
      javascript: window.open(
        "Reporte_ComprobantesComision_Excel.php?fechai=" +
        fechai +
        "&fechaf=" +
        fechaf +
        "&idvendedor=" +
        idvendedor +
        "&vendedor=" +
        vendedor
      );
      // alertify.success('Reporte_ComprobantesComision_Excel.php?fechai='+ fechai+'&fechaf='+fechaf+'&idvendedor='+idvendedor+'&vendedor='+vendedor) ;
    }
  });

  // javascript:window.open('Reporte_ComprobantesComision_Excel.php');
  // alertify.success(fechai) ;
}
/*******************************************************************************/

// focus modal
//$('#modal_leeer').on('shown.bs.modal', function() {

//   $("#idPago").html(id);
// $.post("Listar_Combo_Banco.php", { },
//   function(data){

//       $("#Banco").html(data);
//        $(".select2").select2();

//});
//})

/**********************************************************************/
function busca_comisiones_vendedores() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        // $("#cartera_clientes").html("Consultando informacion...");

        // $("#cartera_clientes").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
            `,
            },
          },
          buttons: false,
          closeOnClickOutside: false,
        });
      },
      url: "consulta_calculocom_vendedor.php",
      type: "POST",
      data: "idvendedor=" + $("#IDvendedores_new option:selected").val(),
      success: function (x) {
        // Retrasar el cierre del Swal 1.5 segundos
        setTimeout(() => {
          swal.close();
          $("#cartera_clientes").html(x);
          $("#tabla_cliente_cartera").DataTable({
            dom: '<"top"lBf>rt<"bottom"ip>',
            buttons: [
              {
                extend: "copy",
                text: '<i class="fa fa-copy"></i> Copiar',
                titleAttr: "Copiar",
                className: "btn btn-copy",
              },
              // {
              //   extend: 'csv',
              //   text: '<i class="fa fa-file"></i> Exportar CSV',
              //   titleAttr: 'Exportar a CSV',
              //   className: 'btn btn-csv'
              // },
              // {
              //   extend: 'excel',
              //   text: '<i class="fa fa-file"></i> Exportar Excel',
              //   titleAttr: 'Exportar a Excel',
              //   className: 'btn btn-excel'
              // },
              {
                extend: "pdf",
                text: '<i class="fa fa-file"></i> Exportar PDF',
                titleAttr: "Exportar a PDF",
                className: "btn btn-pdf",
                // orientation: 'landscape',
                pageSize: "A4",
              },
              {
                extend: "print",
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: "Imprimir",
                className: "btn btn-print",
              },
            ],
          });
        }, 1500); // Retraso de 1.5 segundos
      },
      error: function (jqXHR, estado, error) {
        $("#cartera_clientes").html(estado + "    " + error);
      },
    });
  });
}
/****************************************************************************/

function DataPDF_ConsultaComi(per, codvendedor) {
  var num_form_lista = codvendedor;
  var text = per;
  // javascript: window.open('reporte_mantenimineto2.php?id=' + id + '');
  // javascript:window.open('reporte_comision_vendedor.php?per='+per+'&codvendedor='+codvendedor+'');

  var ruta =
    "reporte_comision_vendedor_v2.php?per=" +
    per +
    "&codvendedor=" +
    codvendedor;

  $("#modal_data_pdf").modal("show");
  $("#modal_data_pdf")
    .on("shown.bs.modal", function () {
      $(this).find("iframe").attr("src", ruta);
    })
    .on("hidden.bs.modal", function () {
      $(this).find("iframe").attr("src", "");
    });

  // $("#navegador")
  //   .off("click")
  //   .on("click", function () {
  //     window.open(ruta, "_blank");
  //   });
  $("#navegador")
    .off("click")
    .on("click", function () {
      var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(ruta); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

      window.open(contenedorUrl, "_blank");
    });

  $("#imprimir")
    .off("click")
    .on("click", function () {
      $("#modal_data_pdf").find("iframe")[0].contentWindow.print();
    });
}

/****************************************************************************/

/***********************GENERAR EXCEL ALMACEN********************************************************/
function DataExcel_ConsultaComi(perio, codvende) {
  vendedor = $("#IDvendedores_new option:selected").text().trim();

  javascript: window.open(
    "Reporte_Comision_vendedore_Excel.php?periodo=" +
    perio +
    "&idvendedor=" +
    codvende +
    "&vendedor=" +
    vendedor
  );
  // alertify.success('Reporte_ComprobantesComision_Excel.php?fechai='+ fechai+'&fechaf='+fechaf+'&idvendedor='+idvendedor+'&vendedor='+vendedor) ;
}

$(document).on("click", ".che", function () {
  resumen_nuevo();
});

function resumen_nuevo() {
  var tc = $("#tc_cierre").val();

  var monto2 = 0.0;
  var monto3 = 0.0;
  var monto4 = 0.0;
  var tot_com = 0.0;

  $("#Tabla_factu > tbody > tr").each(function () {
    monto2 += parseFloat($(this).find(".col-totalme").html());

    if ($(this).find(".che").prop("checked")) {
      // Usar clase 'che'
      monto3 += parseFloat($(this).find(".col-comision-sol").html());
      monto4 += parseFloat($(this).find(".col-comision-usd").html());

      tot_com = monto3 + monto4 * tc;

    }
    //console.log(monto3);
  });
  $("#impoPa").html("Comision SOL: " + monto3.toFixed(2));
  $("#impoPaUSD").html("Comision USD: " + monto4.toFixed(2));
  $("#comisin").html("Total Comisiones S/: " + tot_com.toFixed(2));
  // Aquí puedes actualizar los elementos que necesites con los montos
}
