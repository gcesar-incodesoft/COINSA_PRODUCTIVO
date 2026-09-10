
function lista_clients() {
  //console.log('entro');
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_clients").html("Recuperando Lista ...");
      },
      url: "lista_clientes_contactos.php",
      type: "POST",
      data: null,
      success: function (x) {
        $("#lista_clients").html(x);
        $(".select2").select2();

        setTimeout(() => {
          pone_lista_contactos();
        }, 1000);
        //console.log(x);
      },
      error: function (jqXHR, estado, error) { },
    });
  });
}

function pone_lista_contactos() {
  let cardcode = $("#lista_clients11").val();

  if (cardcode === '') {
    cardcode = 'P99999';
  } else {
    cardcode = $("#lista_clients11").val();
  }

  // setTimeout(() => {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
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
      },
      url: 'consulta_listado_contactos.php',
      type: 'POST',
      data: {
        cardcode: cardcode,
      },
      success: function (x) {
        setTimeout(() => {
          swal.close();
          $("#lista_contactos").html(x);
          $("#tabla_contact").DataTable({
            pageLength: 10,
            lengthMenu: [[10, 20, 60, -1], [10, 20, 60, "Todos"]],
            ordering: false,
            language: {
              paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",
              },
              Show: "Mostrar",
              search: "Buscar:",
              sLengthMenu: "Mostrar _MENU_ registros",
              sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            },
          });
        }, 1500); // Retraso de 1.5 segundos
      },
      error: function (jqXHR, estado, error) { }
    });
  });
  // }, 500);
}

function busca_cliente_mod() {
  ruc = $("#clie_mod").val();

  $(document).ready(function () {
    $("#modal_tabla_clientes_mod").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
    $.ajax({
      beforeSend: function () {
        $("#lista_clientes").html("Cargando los clientes...");
      },
      url: "lista_clientes_contac.php",
      type: "POST",
      data: { ruc: ruc.toUpperCase() },
      success: function (x) {
        $("#lista_clientes_mod").html(x);
        $("#tabla_clien").DataTable();
        //$('#clie').val('');
      },
      error: function (jqXHR, estado, error) {
        $("#lista_clientes_mod").html("Hubo un error: " + estado + " " + error);
      },
    });
  });
}

function actualiza_cliente(elid) {
  var client = elid;
  var idcl = client.split("|");
  var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;

  $("#codigo_cardcode").val(idcl[0]);
  $("#razon_social_contacto").val(idcl[1].replace(pattern, ""));

  // Habilita campos antes del focus
  $("#contacto_nombre, #posicion, #telefono1, #correo").prop("disabled", false);

  var $modal = $("#modal_tabla_clientes_mod");

  // Función robusta de focus
  function focusContacto() {
    var $inp = $("#contacto_nombre:visible:enabled");
    if ($inp.length) {


      // Dos intentos: inmediato y post-transición
      $inp.trigger("focus").select();
      setTimeout(function () { $inp.trigger("focus").select(); }, 150); // fallback por animación
    }
  }

  // Evita handlers duplicados y enfoca cuando el modal ya se ocultó
  $modal.off("hidden.bs.modal.focusfix")
    .one("hidden.bs.modal.focusfix", function () {
      // Espera a que Bootstrap quite clases del body
      if (window.requestAnimationFrame) {
        requestAnimationFrame(focusContacto);
      } else {
        setTimeout(focusContacto, 0);
      }
    })
    .modal("hide");

  // Si por alguna razón el modal ya estaba oculto, enfoca igual
  if (!$modal.is(":visible")) {
    setTimeout(focusContacto, 0);
  }
}


function procesar_datos_contacto() {
  $(document).ready(function () {

    let errores = []; // Lista de errores
    let camposIncompletos = []; // Para resaltar los campos en rojo

    let nombre = $("#contacto_nombre").val();
    let posicion = $("#posicion").val();
    let telefono = $("#telefono1").val();
    let correo = $("#correo").val();

    $(".error-input").removeClass("error-input");
    $(".error-box").removeClass("error-box");

    // Validación de nombre
    if (nombre.trim() === '') {
      errores.push("El nombre no puede estar vacío.");
      camposIncompletos.push("#contacto_nombre");
    }

    // Validación de teléfono
    const telefonoRegex = /^9\d{8}$/;
    // if (telefono.trim() === '') {
    //   errores.push("El teléfono no puede estar vacío.");
    //   camposIncompletos.push("#telefono1");
    // } else if (!telefonoRegex.test(telefono)) {
    //   errores.push("El teléfono debe tener 9 dígitos y comenzar con 9.");
    //   camposIncompletos.push("#telefono1");
    // }

    // Validación de correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gob|gov|es|pe|mx|cl|co|ar|hotmail|gmail|yahoo)(\.[a-z]{2,})?$/i;
    if (correo.trim() === '') {
      errores.push("El correo no puede estar vacío.");
      camposIncompletos.push("#correo");
    } else if (!correo.includes("@")) {
      errores.push("El correo debe contener el símbolo '@'.");
      camposIncompletos.push("#correo");
    } else if (!correoRegex.test(correo)) {
      errores.push("El correo debe tener un formato válido y terminar con un dominio correcto (ej. .com, .pe, .hotmail).");
      camposIncompletos.push("#correo");
    }

    if (errores.length > 0) {
      camposIncompletos.forEach(selector => {
        $(selector).addClass("error-input");
      });

      Swal.fire({
        title: "¡Campos incompletos o inválidos!",
        html: `<ul style="text-align: left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
        toast: false,
        position: "center"
      });

      return false;
    }

    let band = true;
    ejecutarRegistroContacto(band);
  });
}

function ejecutarRegistroContacto(band) {

  if (!band) return; // Si 'band' es falso, no hace nada

  let contactoData = {
    cardcode: $("#codigo_cardcode").val(),
    nombre: $("#contacto_nombre").val(),
    apellido: $("#contacto_apellidos").val(),
    posicion: $("#posicion").val(),
    telefono: $("#telefono1").val(),
    correo_electronico: $("#correo").val(),
    observaciones: $("#observaciones2").val(),
  }

  console.log("Contacto Generado:", contactoData);

  $.ajax({
    beforeSend: function () {
      // Mostrar el loader antes de enviar la solicitud
      Swal.fire({
        title: "Migrando Contacto a SAP...",
        html: '<div class="spinner"></div>',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta
        showConfirmButton: false // No muestra botón de confirmación
      });
    },
    url: "server_layer_crear_contacto.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(contactoData),
    success: function (response) {

      console.log(JSON.stringify(contactoData));
      console.log("Respuesta recibida:", response); // ✅ ¿Esto aparece en la consola?

      try {
        let res = typeof response === "string" ? JSON.parse(response) : response;

        Swal.close();

        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Contacto registrado",
            text: `Se ha insertado el Contacto con éxito.`,
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            pone_lista_contactos();
            $('#modal_registrar_contacto').modal('hide');
          }, 1500);

        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.message || "Ocurrió un error desconocido",
          });
        }
      } catch (error) {
        console.error("Error al procesar respuesta JSON:", error);
      }
    },

    error: function (jqXHR, estado, error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Hubo un problema al comunicarse con el servidor. Inténtelo de nuevo.",
        confirmButtonText: "Cerrar"
      });
      console.error("Error AJAX:", estado, error);
    }
  });
}



function eliminar_contacto(docentry) {

  swal({
    title: "Eliminar contacto?",
    text: "Desea eliminar el contacto!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        beforeSend: function () { },
        url: "eliminar_contact.php",
        type: "POST",
        data: { docentry: docentry },
      });

      swal("Se ha eliminado el contacto", {
        icon: "success",
        buttons: false,
        closeModal: true,
        timer: 2000,
      });
      pone_lista_contactos();
    } else {
      swal("No se ha eliminado");
    }
  });
}
