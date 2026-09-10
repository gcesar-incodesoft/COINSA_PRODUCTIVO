/***************************************************************************/
// function lista_articulo() {
//   $(document).ready(function () {
//     $.ajax({
//       beforeSend: function () {
//         $("#pone_Articulos").html("Recuperando articulos...");
//       },
//       url: 'pone_articulos.php',
//       type: 'POST',
//       data: null,
//       success: function (x) {
//         $("#pone_Articulos").html(x);
//         $(".select2").select2();
//       },
//       error: function (jqXHR, estado, error) {
//       }
//     });
//   });
// }


function genera_opcion_GE() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'Mostrar_Fecha_Articulo.php',
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
              $("#fechai").val(xstart);
              $("#fechaf").val(xend);
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


/***************************************************************************/
function pone_Grupo_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Grupo_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_Grupo_Articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Grupo_Articulos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}



function pone_lista_precios() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_precios").html("Recuperando articulos...");
      },
      url: 'pone_lista_precios.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_precios").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_lista_precios_mod() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#lista_precios_mod").html("Recuperando articulos...");
      },
      url: 'pone_lista_precios.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#lista_precios_mod").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}





/***************************************************************************/
function pone_clas_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_clas_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_clas_Articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_clas_Articulos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function pone_Imp_Comp() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Imp_Comp").html("Recuperando articulos...");
      },
      url: 'pone_Imp_Comp.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Imp_Comp").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function pone_Familia() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Familia").html("Recuperando articulos...");
      },
      url: 'pone_Familia.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Familia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_Familia_mod() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Familia_mod").html("Recuperando articulos...");
      },
      url: 'pone_Familia.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Familia_mod").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_SubFamilia() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_SubFamilia").html("Recuperando articulos...");
      },
      url: 'pone_SubFamilia.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_SubFamilia").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}

function pone_SubFamilia_mod() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_SubFamilia_mod").html("Recuperando articulos...");
      },
      url: 'pone_SubFamilia.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_SubFamilia_mod").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_TIPO_EXIST_Articulos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_TIPO_EXIST_Articulos").html("Recuperando articulos...");
      },
      url: 'pone_TIPO_EXIST_Articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_TIPO_EXIST_Articulos").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
function pone_Imp_Vent() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_Imp_Vent").html("Recuperando articulos...");
      },
      url: 'pone_Imp_Vent.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_Imp_Vent").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}
let global = 0;

function Registrar() {
  let numero_articulo = $("#num_articulo").val();
  let descripcion_articulo = $("#descripcion_articulo").val().toUpperCase();
  let clase_articulo = $("#pone_clas_Articulos option:selected").val();
  let grupo_articulo = $("#pone_Grupo_Articulos option:selected").val();
  let unid_Medida = $("#lista_unidad_med select").val(); // Obtener el valor
  let Marca = $("#lista_Marca select").val();// Obtener el valor
  let sub_familia = $("#pone_SubFamilia select").val();
  let familia = $("#pone_Familia select").val();
  let catalogo = $("#catalogo_articulo").val();
  let lista_precios = $("#lista_precios select").val();
  let precios = $("#pone_precio").val();
  let costo = $("#costo").val();
  let bandera = true;

  // Validación
  // if (grupo_articulo === '0') {
  //   bandera = false;
  //   alertify.error("Ingresar Grupo de Articulo");
  // }
  if (descripcion_articulo === '') {
    bandera = false;
    alertify.error("Ingresar Descripcion");
  }
  if (sub_familia === '0') {
    bandera = false;
    alertify.error("Seleccione Sub-Familia");
  }
  if (familia === '0') {
    bandera = false;
    alertify.error("Seleccione Familia");
  }
  if (catalogo === '') {
    bandera = false;
    alertify.error("Falta Catalogo");
  }

  if (bandera === true) {
    $.ajax({
      url: 'procesa_articulo.php',
      type: 'POST',
      data: {
        numero_articulo: numero_articulo,
        descripcion_articulo: descripcion_articulo,
        clase_articulo: clase_articulo,
        grupo_articulo: grupo_articulo,
        sub_familia: sub_familia,
        familia: familia,
        unid_Medida: unid_Medida,
        Marca: Marca,
        catalogo: catalogo,
        lista_precios: lista_precios,
        precios: precios,
        costo: costo
      },
      success: function (data) {
        // console.log("Response from server:", data); // Para depuración
        let global = parseInt(data);
        if (global == 0) {
          alertify.error("No se pudo insertar");
        } else {
          $("#num_articulo").val("");
          $("#descripcion_articulo").val("");
          $("#clase_articulo").val("");
          $("#grupo_articulo").val("");
          $("#subfamilia_articulo").val("");
          $("#familia_articulo").val("");
          $("#unid_Medida").val('');
          $("#Marca").val('');
          $("#catalogo_articulo").val('');

          swal("Se registró correctamente", {
            icon: "success",
            timer: 2000, // tiempo en milisegundos
            buttons: false, // desactiva el botón para cerrar
          });
        }
        //lista_datos_ma();
      },
      error: function (jqXHR, estado, error) {
        // console.error('Error en la solicitud AJAX', estado, error); // Para depuración
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });
  }
}

function modifica_articulo(id) {
  console.log(id);
  $("#modal_modificacion").modal("show");

  $.ajax({
    url: "buscar_data_articulo_modificacion.php",
    type: "POST",
    data: {
      id: id
    },

    success: function (x) {
      var data = x.split("|");
      $("#num_articulo_mod").val(data[0]);
      $("#descripcion_articulo_mod").val(data[1]);
      $("#costo_mod").val(data[7]);
      $("#catalogo_articulo_mod").val(data[9]);
      $("#pone_precio_mod").val(data[10]);

      // Asignación de valores a los select
      lista_unid = data[6];
      $("#lista_unidad_med_mod")
        .children()
        .val(lista_unid)
        .trigger("change.select2");

      lista_marc = data[8];
      $("#lista_Marca_mod")
        .children()
        .val(lista_marc)
        .trigger("change.select2");

      lista_fam = data[4];
      $("#pone_Familia_mod")
        .children()
        .val(lista_fam)
        .trigger("change.select2");
      lista_subfam = data[5];
      $("#pone_SubFamilia_mod")
        .children()
        .val(lista_subfam)
        .trigger("change.select2");

      // listar_precio_modi = data[11];
      // $("#lista_precios_mod")
      //   .children()
      //   .val(listar_precio_modi)
      //   .trigger("change.select2");
      //   console.log($("#lista_precios_mod").html());

    },
  })
}
function registrar_datos_modal_modi() {
  // var num_Art = $("#num_articulo_mod").val();
  // var descripcion = $("#descripcion_articulo_mod").val();
  // var costo_mod = $("#costo_mod").val();
  // var catalogo = $("#catalogo_articulo_mod").val();
  // var precop_mod = $("#pone_precio_mod").val();
  // var med_mod = $("#lista_unidad_med_mod").val();
  // var marca = $("#lista_Marca_mod").val();
  // var familia = $("#pone_Familia_mod").val();
  // var subfam = $("#pone_SubFamilia_mod").val();
  // var precio_mo = $("#lista_precios_mod").val();


  let num_Art = $("#num_articulo_mod").val();
  let descripcion = $("#descripcion_articulo_mod").val().toUpperCase();
  // let clase_articulo = $("#pone_clas_Articulos option:selected").val();
  // let grupo_articulo = $("#pone_Grupo_Articulos option:selected").val();
  let med_mod = $("#lista_unidad_med_mod select").val(); // Obtener el valor
  let marca = $("#lista_Marca_mod select").val();// Obtener el valor
  let subfam = $("#pone_SubFamilia_mod select").val();
  let familia = $("#pone_Familia_mod select").val();
  let catalogo = $("#catalogo_articulo_mod").val();
  // let precio_mo = $("#lista_precios_mod select").val();
  let precop_mod = $("#pone_precio_mod").val();
  let costo_mod = $("#costo_mod").val();
  let bandera = true;

  band = true;
  if (band === true) {

    $.ajax({
      beforeSend: function () { },
      url: "actualiza_datos_articulo_maestro.php",
      type: "POST",
      data: {
        num_Art: num_Art,
        descripcion: descripcion,
        costo_mod: costo_mod,
        catalogo: catalogo,
        precop_mod: precop_mod,
        med_mod: med_mod,
        marca: marca,
        familia: familia,
        subfam: subfam,
        // precio_mo: precio_mo
        // numero_articulo: numero_articulo,
        // descripcion_articulo: descripcion_articulo,
        // clase_articulo: clase_articulo,
        // grupo_articulo: grupo_articulo,
        // sub_familia: sub_familia,
        // familia: familia,
        // unid_Medida: unid_Medida,
        // Marca: Marca,
        // catalogo: catalogo,
        // lista_precios: lista_precios,
        // precios: precios,
        // costo: costo

      },
      success: function (data) {
        var n = noty({
          text: "Procesando venta...  actualizacion articulo: " + num_Art,
          theme: "relax",
          layout: "topLeft",
          type: "success",
          timeout: 2000,
        });

        $("#modal_modificacion").modal("hide");

      }

    });


  }

  lista_datos_ma();

}
function updateNumArticuloForGroup(value) {
  return value;
}


function registrar_datos_modal() {
  swal({
    title: "Quiere Registrar Articulo?",
    text: "Registre Articulo",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {

        Registrar();

      } else {
        swal("No se Registro Articulo");
      }
    });
}
function updateNumArticuloForFamily(value) {
  let groupValue = $("#pone_Grupo_Articulos select").val();
  return groupValue + value;
}

function updateNumArticuloForSubFamily(value) {
  let groupValue = $("#pone_Grupo_Articulos select").val();
  let familyValue = $("#pone_Familia select").val();
  return groupValue + familyValue + value;
}
function handleSelectChange(selector, nextElement, url, updateValueFunction, resetElements = []) {
  $(document).on("change", selector, function () {
    let originalValue = this.value;

    // Llamamos a la función que actualizará el valor de num_articulo
    let updatedValue = updateValueFunction(originalValue);
    $("#num_articulo").val(updatedValue);

    // Reiniciar los elementos dependientes si hay alguno
    resetElements.forEach(function (element) {
      $(element).html("").trigger("change");  // Reinicia el valor y desencadena el evento change para limpiar select2
    });

    $.ajax({
      beforeSend: function () {
        $(nextElement).html("Cargando...");
      },
      url: url,
      type: 'POST',
      data: { docentry: originalValue },
      success: function (response) {
        $(nextElement).html(response);
        $(".select2").select2();

        // Solo en el último select hacemos la lógica adicional
        if (nextElement === "#codigo_sap_articulo") {
          let numericValue = parseInt(response, 10);
          let newValue = (numericValue + 1).toString().padStart(response.length, '0');
          let finalValue = updatedValue + newValue;
          $("#num_articulo").val(finalValue);
        }
      },
      error: function (jqXHR, estado, error) {
        console.error('Error en la solicitud AJAX', error);
      }
    });
  });
}
function lista_datos_ma() {
  fechai = $("#fec_ini").val();
  if (fechai === "") {
    fechai = '01-01-2024';
  } else {
    fechai = $("#fec_ini").val();
  }
  fechaf = $("#fec_fin").val();

  $.ajax({
    beforeSend: function () {
      // $("#lista_datos_maestros").html("Recuperando Lista ...");
      // $("#lista_datos_maestros").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');
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
    url: "consulta_listado_maestros.php",
    type: "POST",
    data: { fechai: fechai, fechaf: fechaf },
    success: function (x) {

      // Retrasar el cierre del Swal 1.5 segundos
      setTimeout(() => {
        swal.close();
        $("#lista_datos_maestros").html(x);
        $("#tabla_cot").DataTable({
          order: [[0, 'desc']],
          columnDefs: [{
            width: "120px",
            targets: 1
          }
          ]
        });
      }, 1500); // Retraso de 1.5 segundos
    },
    error: function (jqXHR, estado, error) { },
  });
}


$(document).on("change", "#pone_Grupo_Articulos select", function () {
  var id = 'A' + this.value
  $("#num_articulo").val(id);

  $.ajax({
    beforeSend: function () {
      $("#pone_Familia").html("Cargando...");
    },
    url: 'pone_Familia.php',
    type: 'POST',
    data: { docentry: id },
    success: function (x) {
      $("#pone_Familia").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });
})
$(document).on("change", "#pone_Familia select", function () {
  $("#num_articulo").val('');
  id = $("#pone_Grupo_Articulos select").val();
  id2 = 'A' + id + this.value
  $("#num_articulo").val(id2);

  $.ajax({
    beforeSend: function () {
      $("#pone_SubFamilia").html("Cargando...");
    },
    url: 'pone_SubFamilia.php',
    type: 'POST',
    data: { docentry: this.value },
    success: function (x) {
      $("#pone_SubFamilia").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });
})
$(document).on("change", "#pone_SubFamilia select", function () {
  $("#num_articulo").val('');
  id = $("#pone_Grupo_Articulos select").val();
  id2 = $("#pone_Familia select").val();
  id3 = 'A' + id + id2 + this.value
  $("#num_articulo").val(id3);

  $.ajax({
    beforeSend: function () {
      // $("#subfamilia_articulo").html("Cargando...");
    },
    url: 'lista_codigo_sap_oitm.php',
    type: 'POST',
    data: { docentry: id3 },
    success: function (x) {
      console.log(x);

      id = $("#num_articulo").val();

      console.log(id);

      id2 = id + x;

      $("#num_articulo").val(id2);
    },
    error: function (jqXHR, estado, error) {
    }
  });
})
$(document).on("change", "#grupo_medida select", function () {
  id = this.value;

  $('#codigo_um_compras').val(id);
  $('#cod_um_recuento').val(id);
})

function lista_Marcas_Despacho() {

  $.ajax({
    beforeSend: function () {
      $("#lista_Marca").html("Recuperando Marcas...");
    },
    url: 'Lista_Marcas_articulo.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#lista_Marca").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });

}
function lista_Marcas_Despacho_mod() {

  $.ajax({
    beforeSend: function () {
      $("#lista_Marca_mod").html("Recuperando Marcas...");
    },
    url: 'Lista_Marcas_articulo.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#lista_Marca_mod").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });

}

function lista_unida_med() {

  $.ajax({
    beforeSend: function () {
      $("#lista_unidad_med").html("Recuperando Marcas...");
    },
    url: 'Lista_unidad_medida_articulo.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#lista_unidad_med").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });

}

function lista_unida_med_mod() {

  $.ajax({
    beforeSend: function () {
      $("#lista_unidad_med_mod").html("Recuperando Marcas...");
    },
    url: 'Lista_unidad_medida_articulo.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#lista_unidad_med_mod").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) {
    }
  });

}