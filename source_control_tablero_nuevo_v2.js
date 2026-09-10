function ver_detalle_guia(docentry, empresa) {
  $('#modal_detalle_guia').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });
  $("#modal_detalle_guia").modal("show");

  console.log(empresa);

  $.ajax({
    beforeSend: function () {
      //swal_carga()
    },
    url: "consulta_reporte_guia_det.php",
    type: "POST",
    data: { id: docentry, empresa: empresa },
    success: function (x) {
      $("#tabla_detalle_2").html(x);
      $("#tabla_despdet").DataTable({
        order: [[8, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}


function exportar_guia_pdf_preiew() {
  docentry = $("#docito_adicionales").val();
  emp = $("#empresa_adicionales").val();
  exportar_guia_pdf(docentry, emp)
}

function exportar_guia_pdf(docentry, empresa) {
  if (empresa === "C") {
    var xd = "pdf_preguia.php?docentry=" + docentry + "&empresa=" + empresa;
  } else {
    var xd = "pdf_preguia_aym.php?docentry=" + docentry + "&empresa=" + empresa;
  }

  $('#modal_pdf_guia').modal('show');
  $('#modal_pdf_guia').on('shown.bs.modal', function () {
    $(this).find('iframe').attr('src', xd);
  }).on('hidden.bs.modal', function () {
    $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
  });

  // $("#navegador_guia2").off('click').on('click', function () {
  //   console.log(xd);

  //   window.open(xd, '_blank');
  // });
  $("#navegador_guia2")
    .off("click")
    .on("click", function () {
      var contenedorUrl = "container.php?ruta_pdf=" + encodeURIComponent(xd); /*+
          "&titulo=" + encodeURIComponent("IncodeMob | PDF Cotizacion") +
          "&favicon=" + encodeURIComponent("image/incodesoft.ico");*/

      window.open(contenedorUrl, "_blank");
    });

  $("#imprimir_guia").off('click').on('click', function () {
    $('#modal_pdf_guia').find('iframe')[0].contentWindow.print();
  });
}


function registrar_comentario_guia() {
  docentry = $("#docentry_desp").val();
  comentario = $("#comentario_despacho").val();
  empresa = $("#empresa_desp").val();

  if (comentario === "") {
    alertify.error("Falta Comentario");
    return;
  } else {
    $.ajax({
      url: 'registra_comentario_despacho.php',
      type: 'POST',
      data: { docentry: docentry, comentario: comentario, empresa: empresa },
      success: function (response) {
        swal({
          title: "Registrad!",
          text: "Se Registro Comentario!",
          icon: "success",
          showConfirmButton: false,  // Sin el botón de confirmación
          timer: 1000  // El tiempo en milisegundos (1000ms = 1 segundo)
        });
        $('#modal_detalle_guia').modal('hide');
      },
      error: function (jqXHR, estado, error) {
        // Manejar el error
        //console.error("Error en la solicitud Ajax:", error);
      }
    });
  }

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
    "&": "",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString()
    .replace(/['"]+/g, "");
}


function listar_comentarios_despacho(docentry, empresa) {
  $('#modal_comenta_new').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });


  $("#modal_comenta_new").modal("show");
  $.ajax({
    beforeSend: function () {
      //swal_carga()
    },
    url: "consulta_comentarios_despacho.php",
    type: "POST",
    data: { docentry: docentry, empresa: empresa },
    success: function (x) {

      // console.log(x);
      let observacionLimpia = x.replace(/^\s+|\s+$/g, '');
      // format_observacion = quitarAcentos(observacionLimpia);
      
      // $("#comentario_despacho_new").val(format_observacion);
      $("#comentario_despacho_new").val(observacionLimpia);

    
    },
    error: function (jqXHR, estado, error) { },
  });
}



function listar_instrucciones_despacho(docentry) {
  $('#modal_instrucciones_new').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });


  $("#modal_instrucciones_new").modal("show");
  $.ajax({
    beforeSend: function () {
      //swal_carga()
    },
    url: "consulta_instrucciones_despacho.php",
    type: "POST",
    data: { docentry: docentry },
    success: function (x) {

      //console.log(x);
      let observacionLimpia = x.replace(/^\s+|\s+$/g, '');
      $("#comentario_instrucciones_new").val(observacionLimpia);

    
    },
    error: function (jqXHR, estado, error) { },
  });
}


function modal_codigo_lectura(docentry, empresa) {
  $('#modal_lectura_codigo').modal({
    backdrop: 'static', // Evita el cierre al hacer clic fuera del modal
    keyboard: false     // Evita el cierre al presionar "Esc"
  });
  $("#modal_lectura_codigo").modal("show");
  // $("#docentry_cod_barra").val(docentry);
  // $("#empresa_cod_barra").val(empresa);
  $("#lec_codigo_barra").focus()
  //console.log(docentry);
  limpiar_data_cod_barra()
}

function busca_cod_barra() {
  // empresa= $("#empresa_cod_barra").val();
  let docnum = $("#lec_codigo_barra").val();

  // Extraer el primer carácter
  let empresa = docnum.charAt(0); // O docnum.substring(0, 1)

  // Extraer el resto de la cadena
  let resto = docnum.substring(1); // O docnum.slice(1)
  console.log(resto);

  if (empresa === '0') {
    alertify.error("Elija Empresa");
    return
  } if (docnum === '') {
    alertify.error("Lea Codigo de Barras");

  } else {

    $.ajax({
      beforeSend: function () {
        //swal_carga()
      },
      url: "consulta_codbarra_estado.php",
      type: "POST",
      data: { docnum: resto, empresa: empresa },
      success: function (x) {
        //console.log(x);
        partes = x.split(',');

        nom_estado = partes[1].trim();
        id_estado = partes[0].trim();
        modalidad = partes[2].trim();

        $("#nombre_estado_codbarra").val(nom_estado);
        $("#id_estado_codbarra").val(id_estado);
        $("#modo_codigo_barra").val(modalidad);//C68000881

        console.log(modalidad);
        console.log(id_estado);


        if (id_estado === "1") {
          alertify.error("Los estados Listo Para Alistar no se pueden Pistolear");
          return;
        }
        if (id_estado === "3" && modalidad === "4") {
          console.log("entro");
          id_estado = "5";//C68000879
        }

        $(document).ready(function () {
          $.ajax({
            beforeSend: function () {
              $("#nuevo_estado_codbarra").html("Recuperando Lista ...");
            },
            url: "lista_estados_cambios_prepo_new.php",
            type: "POST",
            data: { cod_estad: id_estado.trim() },
            success: function (x) {
              $("#nuevo_estado_codbarra").html(x);
              $(".select2").select2();

              setTimeout(() => {
                cambio_estado_codbarra();
                limpiar_data_cod_barra();
              }, 3000);

            },
            error: function (jqXHR, estado, error) { },
          });
        });

        $("#tabla_detalle1").DataTable();
      },
      error: function (jqXHR, estado, error) { },
    });
  }


}

function limpiar_data_cod_barra() {
  $("#lec_codigo_barra").val('');
  $("#nombre_estado_codbarra").val('');
  $("#nuevo_estado_codbarra").html('');
  $("#empresa_cod_barra").val('');
  $("#docentry_cod_barra").val('');
}

$('#lec_codigo_barra').on('keydown', function (event) {
  if (event.key === "Enter") {
    busca_cod_barra();  // Ejecuta la función al presionar Enter
  }
});


function cambio_estado_codbarra() {
  estado = $("#nuevo_estado_codbarra select").val();
  id_docentry = $("#lec_codigo_barra").val();
  empresa = id_docentry.charAt(0);
  let resto = id_docentry.substring(1); // O docnum.slice(1)
  tipo_ori = 'S'
  bandera = true;

  if (estado === "" || estado === undefined) {
    alertify.error("Seleccione Estado");
    bandera = false;
  }


  if (bandera === true) {
    $.ajax({
      beforeSend: function () { },
      url: "actualizar_estados_mostrados.php",
      type: "POST",
      data:
        "id_docentry=" +
        resto +
        "&estado=" +
        estado +
        "&empresa=" +
        empresa +
        "&tipo=" +
        tipo_ori,

      success: function () {


        $("#modal_lectura_codigo").modal("hide");


        swal("Se actualizo correctamente", {
          icon: "success",
          timer: 2000, // tiempo en milisegundos
          buttons: false, // desactiva el botón para cerrar
        });

        busca_listosDespachos();
        busca_Lista()

      },
      error: function (jqXHR, estado, error) {
        $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  }



}

function swal_carga() {
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
}

// $(document).ready(function () {
//   $("form#data").submit(function (event) {
//       var formData = new FormData($(this)[0]);
//       var files = $("#fileToUpload_OC")[0].files[0];
//       var card_code ='-';
//       var titulo = document.getElementById("oc_ocevi").value;
//       var num = document.getElementById("docentry_OC_subir").value;
//       var movi = '4'
//       var emp = $("#empresa_oc_evi").val();
//       var tipo = 'W'
//       var comentario = 'OC';

//       console.log('DocEntry:', docEntry);
//       console.log('Empresa:', emp);
//       console.log('Cliente:', name);
//       console.log('CardCode:', cardcode);
//       console.log('Serie:', serie);
//       console.log('Tipo:', tipo);

//       console.log(files);

//       if (titulo === "") {
//           alertify.error("Falta titulo");
//           return false;
//       }
//       if (files === undefined) {
//           alertify.error("no existe documento ");
//           return false;
//       }
//       else {
//           //var num_fix = $('#num_fix').val();
//           formData.append("file", files);

//           formData.append("card_code", card_code);
//           formData.append("titulo", titulo);
//           formData.append("num", num);
//           formData.append("movi", movi);
//           formData.append("emp", emp);
//           formData.append("comentario", comentario);
//           formData.append("tipo", tipo);


//           //formData.append('desc_arte', descrip_reg);
//           // alert(files);
//           //formData.append('num_fix', num_fix);

//           // $("#archivo_reg").val('');
//           //$("#titulo_reg").val('');
//           $.ajax({
//               url: "registrar_pdf_despacho_alma.php",
//               type: "post",
//               data: formData,
//               async: false,
//               cache: false,
//               contentType: false,
//               processData: false,
//               success: function (response) {
//                   //  alert(response);

//                   //    $.post("conviertepdf.php", {  },

//                   //  function(data){

//                   //
//                   //                      alert(data)
//                   //                });

//                   $("#archivo_reg").val("");
//                   $("#titulo_reg").val("");
//                   // listar_data_pdf(va)
//                   $("#modal_registrar_evi").modal("hide");

//                   listar_data_pdf_todos1(num, 'TD', emp, tipo)
//               },
//           });
//           return false;
//       }
//   });
// });

function elimnar_evi_oc(id, id_pedido, emp) {

  swal({
    title: "Desea Eliminar la OC?",
    text: "Está seguro que desea borrar el archivo seleccionado?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {



      $.ajax({
        beforeSend: function () {
          // $("#data_pdf_todos").html("Buscando las ventas, un momento...");
          swal_carga()
        },
        url: "eliminar_evidencia_oc.php",
        type: "POST",
        data: { id: id, emp: emp },
        success: function (res) {
          setTimeout(function () {
            swal.close(); // Cerrar el SweetAlert después del retraso


            swal("Archivo Eliminado", {
              icon: "success",
              buttons: false,
              closeModal: true,
              timer: 2000,
            });



            listar_data_pdf_oc(id_pedido)
          }, 1500); // 1500 milisegundos = 1.5 segundos




        },
        error: function (jqXHR, estado, error) {
          alert(
            "Hubor un error al buscar las ventas...por favor reporte a soporte...!"
          );
          $("#data_pdf_todos").html(estado + "     " + error);
        },
      });




    } else {
      swal("No se ha eliminado");
    }
  });





}