$(document).ready(function () {
    busca_Lista();
    setInterval(function () {
        location.reload();
        // }, 24000); 
    }, 300000);
});





function busca_Lista() {
    // var fechai = $("#fechai").val();
    // var fechaf = $("#fechaf").val();

    $.ajax({
        beforeSend: function () {
            //$("#data").html("Buscando informacion del articulo...");

        },
        url: 'Lista_control_alma_lista.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#data_PRECIO").html(x);
            //$("#tabla_listado").DataTable();


        }
    });

}


function busca_Lista_nuevo() {
    var fechai = $("#fechai").val();
    var fechaf = $("#fechaf").val();

    $.ajax({
        beforeSend: function () {
            //swal_carga();

        },
        url: 'Lista_control_alma.php',
        type: 'POST',
        data: { fechai, fechaf },
        success: function (x) {

            // Retrasar el cierre del Swal 1.5 segundos
            setTimeout(() => {
                //swal.close();
                $("#data_PRECIO").html(x);
                $("#tabla_listado").DataTable({
                    ordering: false, // Habilita el ordenamiento global

                });

            }, 1500); // Retraso de 1.5 segundos
        }

    });
    $.ajax({
        beforeSend: function () {
            // swal_carga()
        },
        url: 'Lista_control_alma_programados.php',
        type: 'POST',
        // data: { fechai, fechaf, cliente },
        data: null,

        success: function (x) {

            // Retrasar el cierre del Swal 1.5 segundos

            setTimeout(function () {
                $("#tabla_programados").html(x); // Cargar el contenido de la tabla
                //swal.close(); // Cerrar el SweetAlert después del retraso

                // Inicializar DataTable después de cargar el contenido
                // $('#tabla_listado_progra').DataTable({
                //     "order": [] // Desactivar el orden predeterminado
                // });
            }, 1500); // Retraso de 1.5 segundos
        }

    });


}




function busca_Lista_alistados() {
    // var fechai = $("#fechai").val();
    // var fechaf = $("#fechaf").val();
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                //$("#data").html("Buscando informacion del articulo...");

            },
            url: 'Lista_control_alma_lista_alistados.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#tabla_programados").html(x);
                //$("#tabla_listado").DataTable();


            }

        });
    });
}


function busca_Lista_cerrados() {
    // var fechai = $("#fechai").val();
    // var fechaf = $("#fechaf").val();
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                //$("#data").html("Buscando informacion del articulo...");

            },
            url: 'Lista_control_alma_lista_cerrados.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#data_PRECIO_cierre").html(x);
                //$("#tabla_listado").DataTable();


            }

        });
    });
}



// function lista_conductor() {
//     $(document).ready(function () {
//         $.ajax({
//             beforeSend: function () {
//                 $("#id_conductor").html("Recuperando Lista ...");
//             },
//             url: "lista_conductor.php",
//             type: "POST",
//             data: null,
//             success: function (x) {
//                 $("#id_conductor").html(x);
//                 $(".select2").select2();

//             },
//             error: function (jqXHR, estado, error) { },
//         });
//     });
// }



// function lista_unidad() {
//     $(document).ready(function () {
//         $.ajax({
//             beforeSend: function () {
//                 $("#id_unidad").html("Recuperando Lista ...");
//             },
//             url: "lista_unidad.php",
//             type: "POST",
//             data: null,
//             success: function (x) {
//                 $("#id_unidad").html(x);
//                 $(".select2").select2();

//             },
//             error: function (jqXHR, estado, error) { },
//         });
//     });
// }




// function lista_modalidad_destino() {
//     $(document).ready(function () {
//         $.ajax({
//             beforeSend: function () {
//                 $("#id_moda_destino").html("Recuperando Lista ...");
//             },
//             url: "lista_modalidad_destino.php",
//             type: "POST",
//             data: null,
//             success: function (x) {
//                 $("#id_moda_destino").html(x);
//                 // $("#id_moda_destino select");
//                 $(".select2").select2();

//             },
//             error: function (jqXHR, estado, error) { },
//         });
//     });
// }



// function lista_mod_pago() {
//     $(document).ready(function () {
//         $.ajax({
//             beforeSend: function () {
//                 $("#id_moda_pago").html("Recuperando Lista ...");
//             },
//             url: "lista_mod_pago.php",
//             type: "POST",
//             data: null,
//             success: function (x) {
//                 $("#id_moda_pago").html(x);
//                 // $("#id_moda_pago  select");

//                 $(".select2").select2();

//             },
//             error: function (jqXHR, estado, error) { },
//         });
//     });
// }







// function lista_ayudante() {
//     $(document).ready(function () {
//         $.ajax({
//             beforeSend: function () {
//                 $("#id_ayudante").html("Recuperando Lista ...");
//             },
//             url: "lista_ayudante.php",
//             type: "POST",
//             data: null,
//             success: function (x) {
//                 $("#id_ayudante").html(x);
//                 $(".select2").select2();

//             },
//             error: function (jqXHR, estado, error) { },
//         });
//     });
// }



// function alista_pedido() {

//     $("#modal_alista_pedido").modal("show");

//     var doc = $("#docito").val();
//     $("#doc_alista").val(doc);
//     consulta_datos();

// }


// function registrar_usuario_pedido() {
//     contra_usuario = $("#id_contra_pedi").val();
//     contra_codigo = $("#id_contra_codi").val();
//     usuario = $("#id_usuario_cod").val();
//     nombre_usuario = $("#id_usuario_pedi").val();
//     docentry = $("#doc_alista").val();
//     bandera = true;


//     if (contra_usuario != contra_codigo) {
//         bandera = false;
//         alertify.error("Contraseña Incorrecta")

//     }

//     if (contra_usuario === "") {
//         bandera = false;
//         alertify.error("Ingresar Contraseña")
//     }


//     if (bandera === true) {
//         $.ajax({
//             url: "insertar_alista_pedidos.php",

//             type: "POST",
//             data: { docentry, usuario, nombre_usuario },
//             success: function (x) {

//                 $("#modal_alista_pedido").modal("hide");
//                 $("#modal_id_botones").modal("hide");
//                 $("#id_contra_pedi").val("");

//                 swal("Se registró correctamente", {
//                     icon: "success",
//                     timer: 2000, // tiempo en milisegundos
//                     buttons: false, // desactiva el botón para cerrar
//                 });

//                 busca_Lista();


//             },
//             error: function (jqXHR, estado, error) { },
//         });
//     }

// }



// function datos_adicionales() {

//     $("#modal_datos_adicionales").modal("show");

//     var doc = $("#docito").val();

//     $("#docito_adicionales").val(doc);

//     consulta_data_AD(doc);
//     bloquearForm();
//     lista_modalidad_destino(doc);

//     lista_mod_pago(doc);

//     // document.getElementById("btn_guardar").style.display = "block";
//     // document.getElementById("btn_actualizar").style.display = "none";


// }



// function bloquearForm() {

//     document.getElementById("id_observaciones").disabled = true;
//     document.getElementById("id_emp").disabled = true;
//     document.getElementById("id_dir_trans").disabled = true;
//     document.getElementById("id_ubicacion").disabled = true;
//     document.getElementById("id_dir_destino").disabled = true;
//     document.getElementById("id_moda_destino").disabled = true;
//     document.getElementById("id_moda_pago").disabled = true;

//     DeshabilitarInputs()
// }




// function DeshabilitarInputs() {
//     const inputs2 = document.querySelectorAll("#miTabla2 input");

//     const inputs1 = document.querySelectorAll("#miTabla1 input");

//     const inputs = document.querySelectorAll("#miTabla input");

//     inputs.forEach(input => {
//         input.disabled = true;
//     });

//     inputs1.forEach(input => {
//         input.disabled = true;
//     });

//     inputs2.forEach(input => {
//         input.disabled = true;
//     });

// }



// function actualizar_form() {
//     id_docentry = $("#docito_adicionales").val();
//     let id_observaciones = $("#id_observaciones").val().toUpperCase().trim();
//     let id_emp = $("#id_emp").val();
//     let id_dir_trans = $("#id_dir_trans").val();
//     let id_ubicacion = $("#id_ubicacion").val();
//     let id_dir_destino = $("#id_dir_destino").val();
//     let id_moda_destino = $("#id_moda_destino option:selected").val();
//     let id_moda_pago = $("#id_moda_pago option:selected").val();
//     let bandera = true;

//     if (id_observaciones.length > 0 && id_observaciones.length >= 201) {
//         bandera = false;
//         alertify.error("Las observaciones deben tener menos de 200 caracteres");
//         $("#id_observaciones").focus();
//     }

//     if (id_emp.length > 0 && id_emp.length >= 101) {
//         bandera = false;
//         alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
//         $("#id_emp").focus();
//     }

//     if (id_dir_trans.length > 0 && id_dir_trans.length >= 201) {
//         bandera = false;
//         alertify.error("La empresa de transporte deben tener menos de 200 caracteres");
//         $("#id_dir_trans").focus();
//     }

//     if (id_ubicacion.length > 0 && id_ubicacion.length >= 201) {
//         bandera = false;
//         alertify.error("La ubicacion de transporte deben tener menos de 200 caracteres");
//         $("#id_ubicacion").focus();
//     }
//     if (id_dir_destino.length > 0 && id_dir_destino.length >= 201) {
//         bandera = false;
//         alertify.error("La direccion destino deben tener menos de 200 caracteres");
//         $("#id_dir_destino").focus();
//     }



//     if (id_moda_destino === '-1') {
//         bandera = false;
//         alertify.error("Seleccione la modalidad de destino");
//         $("#modalidad_destino").focus();
//     }
//     if (id_moda_pago === '-1') {
//         bandera = false;
//         alertify.error("Seleccione la modalidad de pago");
//         $("#id_moda_pago").focus();
//     }


//     $("#miTabla > tbody > tr").each(function () {
//         comta1 = $(this).find("td").find('input[id="conta1"]').val();
//         dni1 = $(this).find("td").find('input[id="dni1"]').val();
//         tele1 = $(this).find("td").find('input[id="tele1"]').val();
//     });


//     $("#miTabla1 > tbody > tr").each(function () {
//         comta2 = $(this).find("td").find('input[id="conta2"]').val();
//         dni2 = $(this).find("td").find('input[id="dni2"]').val();
//         tele2 = $(this).find("td").find('input[id="tele2"]').val();
//     });


//     $("#miTabla2 > tbody > tr").each(function () {
//         comta3 = $(this).find("td").find('input[id="conta3"]').val();
//         dni3 = $(this).find("td").find('input[id="dni3"]').val();
//         tele3 = $(this).find("td").find('input[id="tele3"]').val();
//     });

//     if ($("#id_ubicacion").is(':disabled')) {
//         bandera = false;
//         alertify.error("Desbloquea los campos con el boton Editar");
//     }


//     if (bandera === true) {

//         $.ajax({
//             beforeSend: function () { },
//             url: "actualizar_datos_adicionales.php",
//             type: "POST",
//             data:
//                 "id_docentry=" +
//                 id_docentry +
//                 "&id_observaciones=" +
//                 id_observaciones +
//                 "&id_emp=" +
//                 id_emp +
//                 "&id_dir_trans=" +
//                 id_dir_trans +
//                 "&id_ubicacion=" +
//                 id_ubicacion +
//                 "&id_dir_destino=" +
//                 id_dir_destino +
//                 "&id_moda_destino=" +
//                 id_moda_destino +
//                 "&id_moda_pago=" +
//                 id_moda_pago +
//                 "&comta1=" +
//                 comta1 +
//                 "&dni1=" +
//                 dni1 +
//                 "&tele1=" +
//                 tele1 +
//                 "&comta2=" +
//                 comta2 +
//                 "&dni2=" +
//                 dni2 +
//                 "&tele2=" +
//                 tele2 +
//                 "&comta3=" +
//                 comta3 +
//                 "&dni3=" +
//                 dni3 +
//                 "&tele3=" +
//                 tele3,
//             success: function () {


//                 $("#modal_datos_adicionales").modal("hide");


//                 swal("Se actualizo correctamente", {
//                     icon: "success",
//                     timer: 2000, // tiempo en milisegundos
//                     buttons: false, // desactiva el botón para cerrar
//                 });

//             },
//             error: function (jqXHR, estado, error) {
//                 $("#errores").html("Error... " + estado + "  " + error);
//             },
//         });
//     }


// }


// function asignar_ruta() {
//     $("#modal_asignar_ruta").modal("show");

//     var doc = $("#docito").val();

//     $("#docito_asigna_ruta").val(doc);

//     lista_conductor();
//     lista_unidad();
//     lista_ayudante();
// }



// function generar_rotulo() {
//     $("#modal_generar_rotulo").modal("show");

//     var doc = $("#docito").val();
//     $("#docito_ge_rotulo").val(doc);



//     $.ajax({
//         beforeSend: function () {
//             $("#tabla_generar_rotulo").html("Cargando...");

//         },

//         url: 'lista_generar_rotulo.php',
//         type: 'POST',
//         data: { doc: doc },
//         success: function (x) {
//             $("#tabla_generar_rotulo").html(x);
//             $("#tabla_rotulo").DataTable({
//                 order: [[1, "desc"]],
//             });
//             consulta_data_rotulo(doc)


//         }

//     });
// }

// function validar_numero(event) {
//     //console.log(event);
//     var charCode = event.which ? event.which : event.keyCode;
//     if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
//         alertify.error("No puede ingresar letras");
//         return false;
//     }
//     return true;
// }

// function consulta_data_rotulo(docentry) {
//     //docentry = $("#docito").val();


//     $.ajax({
//         url: "busca_data_rotulo.php",

//         type: "POST",
//         data: {
//             docentry,
//         },
//         success: function (x) {
//             //console.log(x);
//             var data = x;
//             var idcl = data.split("|");


//             $("#id_ro_cliente").val(idcl[2]);
//             $("#id_ro_oc").val(idcl[3]);
//             $("#id_ro_guiaRe").val(idcl[1]);

//         },
//         error: function (jqXHR, estado, error) { },
//     });
// }





// $(document).on("click", "#tabla_rotulo tbody tr", function () {
//     // Encuentra el checkbox dentro de la fila actual
//     var checkbox = $(this).find("#gen_rotulo");

//     // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
//     checkbox.prop("checked", !checkbox.prop("checked"));

//     // Actualiza la apariencia y el botón según el estado del checkbox
//     actualizarFila(checkbox);
// });

// function actualizarFila(checkbox) {
//     var checkbox2 = $("#tabla_art tbody tr").find("#gen_rotulo");
//     var cant = checkbox2.closest("tr").find("#gen_rotulo:checked").length;
//     //console.log(cant);
//     if (checkbox.is(":checked")) {
//         checkbox.closest("tr").find("td").css("background-color", "LightGreen");
//     } else {
//         checkbox.closest("tr").find("td").css("background-color", "white");
//     }

//     if (cant > 0) {
//         // $("#enviar").removeClass("disabledTab");
//         // $("#enviar").addClass("activeTab");
//     } else {
//         // $("#enviar").removeClass("activeTab");
//         // $("#enviar").addClass("disabledTab");
//     }
// }



// function imprimir_r1() {

//     var docentry = $("#docito_ge_rotulo").val();
//     bandera = true;

//     let doc = [];

//     $("[name='gen_rotulo[]']:checked").each(function (key) {

//         itemgr = $(this).parents("tr").find("td:eq(1)").text();
//         itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
//         codsap = $(this).parents("tr").find("td:eq(3)").text();
//         descripcion = $(this).parents("tr").find("td:eq(4)").text();
//         catalogo = $(this).parents("tr").find("td:eq(5)").text();
//         marca = $(this).parents("tr").find("td:eq(6)").text();
//         cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();
//         um = $(this).parents("tr").find("td:eq(8)").text();
//         let itemData = {
//             itemgr: itemgr,
//             itemoc: itemoc,
//             codsap: codsap,
//             descripcion: descripcion,
//             catalogo: catalogo,
//             marca: marca,
//             cant: cant,
//             um: um
//         };

//         // Agrega el objeto al array doc
//         doc.push(itemData);
//     });




//     if (cant == '') {
//         alertify.error("Ingresar Cantidad");
//         bandera = false;
//     }

//     if (bandera === true) {
//         // var xd = "pdf_rotulo1.php?docentry=" + docentry + "&itemgr=" + itemgr + "&itemoc=" + itemoc + "&codsap=" + codsap + "&descripcion=" + descripcion + "&catalogo=" + catalogo + "&marca=" + marca + "&cant=" + cant + "&um=" + um+ "&doc=" + doc;

//         var xd = "pdf_rotulo1.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry;


//         // var xd = "pdf_gre_sunat_new_prue.php?docentry=" + docentry + "&tipo_gre=" + tipo_gre;


//         $('#modal_data_pdf').modal('show');
//         $('#modal_data_pdf').on('shown.bs.modal', function () {
//             $(this).find('iframe').attr('src', xd);
//         }).on('hidden.bs.modal', function () {
//             $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
//         });

//         $("#navegador").off('click').on('click', function () {
//             window.open(xd, '_blank');
//         });

//         $("#imprimir").off('click').on('click', function () {
//             $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//         });
//     }


// }


// function imprimir_r2() {

//     var docentry = $("#docito_ge_rotulo").val();
//     bandera = true;
//     let doc = [];
//     $("[name='gen_rotulo[]']:checked").each(function (key) {

//         itemgr = $(this).parents("tr").find("td:eq(1)").text();
//         itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
//         descripcion = $(this).parents("tr").find("td:eq(4)").text();
//         catalogo = $(this).parents("tr").find("td:eq(5)").text();
//         marca = $(this).parents("tr").find("td:eq(6)").text();
//         cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();

//         console.log(descripcion)
//         let itemData = {
//             itemgr: itemgr,
//             itemoc: itemoc,
//             descripcion: descripcion,
//             catalogo: catalogo,
//             marca: marca,
//             cant: cant,
//         };
//         doc.push(itemData);

//     });


//     if (cant == '') {
//         alertify.error("Ingresar Cantidad");
//         bandera = false;
//     }

//     if (bandera === true) {
//         var xd = "pdf_rotulo2.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry;

//         $('#modal_data_pdf').modal('show');
//         $('#modal_data_pdf').on('shown.bs.modal', function () {
//             $(this).find('iframe').attr('src', xd);
//         }).on('hidden.bs.modal', function () {
//             $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
//         });

//         $("#navegador").off('click').on('click', function () {
//             window.open(xd, '_blank');
//         });

//         $("#imprimir").off('click').on('click', function () {
//             $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//         });
//     }

// }


// function registrar_ruta() {
//     fecha = $("#fecha").val();
//     id_conductor = $("#id_conductor option:selected").val();
//     id_ayudante = $("#id_ayudante option:selected").val();
//     id_unidad = $("#id_unidad option:selected").val();
//     docentry = $("#docito_asigna_ruta").val();
//     var bandera = true;



//     if (bandera === true) {

//         $.ajax({
//             beforeSend: function () { },
//             url: "registrar_ruta.php",
//             type: "POST",
//             data:
//                 "docentry=" +
//                 docentry +
//                 "&fecha=" +
//                 fecha +
//                 "&id_conductor=" +
//                 id_conductor +
//                 "&id_ayudante=" +
//                 id_ayudante +
//                 "&id_unidad=" +
//                 id_unidad,
//             success: function () {

//                 //console.log(global);
//                 // $("#num_tick_act").val(global);
//                 // $("#comentarios").val("");
//                 $("#modal_asignar_ruta").modal("hide");


//                 swal("Se registró correctamente", {
//                     icon: "success",
//                     timer: 2000, // tiempo en milisegundos
//                     buttons: false, // desactiva el botón para cerrar
//                 });



//             },
//             error: function (jqXHR, estado, error) {
//                 $("#errores").html("Error... " + estado + "  " + error);
//             },
//         });
//     }

// }

// function imprimir_r3() {
//     var docentry = $("#docito_ge_rotulo").val();
//     bandera = true;
//     let doc = [];
//     $("[name='gen_rotulo[]']:checked").each(function (key) {
//         itemgr = $(this).parents("tr").find("td:eq(1)").text();
//         itemoc = $(this).parents("tr").find('input[id="item_oc"]').val();
//         descripcion = $(this).parents("tr").find("td:eq(4)").text();
//         catalogo = $(this).parents("tr").find("td:eq(5)").text();
//         marca = $(this).parents("tr").find("td:eq(6)").text();
//         cant = $(this).parents("tr").find('input[id="cantidad_ingresar"]').val();
//         let itemData = {
//             itemgr: itemgr,
//             itemoc: itemoc,
//             descripcion: descripcion,
//             catalogo: catalogo,
//             marca: marca,
//             cant: cant,
//         };
//         doc.push(itemData);
//     });
//     if (bandera === true) {
//         var xd = "pdf_rotulo3.php?doc=" + encodeURIComponent(JSON.stringify(doc)) + "&docentry=" + docentry;
//         $('#modal_data_pdf').modal('show');
//         $('#modal_data_pdf').on('shown.bs.modal', function () {
//             $(this).find('iframe').attr('src', xd);
//         }).on('hidden.bs.modal', function () {
//             $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
//         });
//         $("#navegador").off('click').on('click', function () {
//             window.open(xd, '_blank');
//         });
//         $("#imprimir").off('click').on('click', function () {
//             $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//         });
//     }

// }


// // $(document).on("click", "#item_oc", function () {
// //     var valor = $(this).val();

// //     if (valor.length > 0) {
// //         if ($(this).is('input[type="number"]')) {
// //             $(this).parents("tr").find("td").css("background-color", "LightGreen");

// //             $(this)
// //                 .parents("tr")
// //                 .find('td:eq(0) input[type="checkbox"]')
// //                 .prop("checked", true);
// //         } else {
// //             $(this).parents("tr").find("td").css("background-color", "white");

// //         }
// //     } else {
// //         $(this).closest("tr").find("td").css("background-color", "");
// //         $(this)
// //             .parents("tr")
// //             .find('td:eq(0) input[type="checkbox"]')
// //             .prop("checked", false);
// //     }
// // });


// $(document).on("click", "#cantidad_ingresar", function () {
//     var valor = $(this).val();

//     if (valor.length > 0) {
//         if ($(this).is('input[type="number"]')) {
//             $(this).parents("tr").find("td").css("background-color", "LightGreen");

//             $(this)
//                 .parents("tr")
//                 .find('td:eq(0) input[type="checkbox"]')
//                 .prop("checked", true);
//         } else {
//             $(this).parents("tr").find("td").css("background-color", "white");

//         }
//     } else {
//         $(this).closest("tr").find("td").css("background-color", "");
//         $(this)
//             .parents("tr")
//             .find('td:eq(0) input[type="checkbox"]')
//             .prop("checked", false);
//     }
// });



// $(document).on("click", "#item_oc", function () {
//     var valor = $(this).val();

//     if (valor.length > 0) {
//         if ($(this).is('input[type="number"]')) {
//             $(this).parents("tr").find("td").css("background-color", "LightGreen");

//             $(this)
//                 .parents("tr")
//                 .find('td:eq(0) input[type="checkbox"]')
//                 .prop("checked", true);
//         } else {
//             $(this).parents("tr").find("td").css("background-color", "white");

//         }
//     } else {
//         $(this).closest("tr").find("td").css("background-color", "");
//         $(this)
//             .parents("tr")
//             .find('td:eq(0) input[type="checkbox"]')
//             .prop("checked", false);
//     }
// });










// function guardar_form() {

//     id_docentry = $("#docito_adicionales").val();
//     id_observaciones = $("#id_observaciones").val();
//     id_emp = $("#id_emp").val();
//     id_dir_trans = $("#id_dir_trans").val();
//     id_ubicacion = $("#id_ubicacion").val();
//     id_dir_destino = $("#id_dir_destino").val();
//     id_moda_destino = $("#id_moda_destino option:selected").val();
//     id_moda_pago = $("#id_moda_pago option:selected").val();
//     var bandera = true;


//     $("#miTabla > tbody > tr").each(function () {
//         comta1 = $(this).find("td").find('input[id="conta1"]').val();
//         dni1 = $(this).find("td").find('input[id="dni1"]').val();
//         tele1 = $(this).find("td").find('input[id="tele1"]').val();
//     });


//     $("#miTabla1 > tbody > tr").each(function () {
//         comta2 = $(this).find("td").find('input[id="conta2"]').val();
//         dni2 = $(this).find("td").find('input[id="dni2"]').val();
//         tele2 = $(this).find("td").find('input[id="tele2"]').val();
//     });


//     $("#miTabla2 > tbody > tr").each(function () {
//         comta3 = $(this).find("td").find('input[id="conta3"]').val();
//         dni3 = $(this).find("td").find('input[id="dni3"]').val();
//         tele3 = $(this).find("td").find('input[id="tele3"]').val();
//     });


//     if (id_moda_destino === '-1') {
//         bandera = false;
//         alertify.error("Seleccione modalidad Destino");
//     }

//     if (id_moda_pago === '-1') {
//         bandera = false;
//         alertify.error("Seleccione modalidad de Pago");
//     }

//     if ($("#id_ubicacion").is(':disabled')) {
//         bandera = false;
//         alertify.error("Desbloquea los campos con el boton Editar");
//     }


//     if (bandera === true) {

//         $.ajax({
//             beforeSend: function () { },
//             url: "registrar_datos_adicionales.php",
//             type: "POST",
//             data:
//                 "id_docentry=" +
//                 id_docentry +
//                 "&id_observaciones=" +
//                 id_observaciones +
//                 "&id_emp=" +
//                 id_emp +
//                 "&id_dir_trans=" +
//                 id_dir_trans +
//                 "&id_ubicacion=" +
//                 id_ubicacion +
//                 "&id_dir_destino=" +
//                 id_dir_destino +
//                 "&id_moda_destino=" +
//                 id_moda_destino +
//                 "&id_moda_pago=" +
//                 id_moda_pago +
//                 "&comta1=" +
//                 comta1 +
//                 "&dni1=" +
//                 dni1 +
//                 "&tele1=" +
//                 tele1 +
//                 "&comta2=" +
//                 comta2 +
//                 "&dni2=" +
//                 dni2 +
//                 "&tele2=" +
//                 tele2 +
//                 "&comta3=" +
//                 comta3 +
//                 "&dni3=" +
//                 dni3 +
//                 "&tele3=" +
//                 tele3,
//             success: function () {

//                 //console.log(global);
//                 // $("#num_tick_act").val(global);
//                 // $("#comentarios").val("");
//                 $("#modal_datos_adicionales").modal("hide");


//                 swal("Se registró correctamente", {
//                     icon: "success",
//                     timer: 2000, // tiempo en milisegundos
//                     buttons: false, // desactiva el botón para cerrar
//                 });

//                 $("#docito_adicionales").val("");
//                 $("#id_observaciones").val("");
//                 $("#id_emp").val("");
//                 $("#id_dir_trans").val("");
//                 $("#id_ubicacion").val("");
//                 $("#id_dir_destino").val("");
//                 // $("#id_moda_destino option:selected").val("");
//                 // $("#id_moda_pago option:selected").val("");



//             },
//             error: function (jqXHR, estado, error) {
//                 $("#errores").html("Error... " + estado + "  " + error);
//             },
//         });
//     }
// }


// function consulta_datos() {
//     $.ajax({
//         url: "busca_datos.php",

//         type: "POST",
//         data: null,
//         success: function (x) {
//             //console.log(x);
//             var data = x;
//             var idcl = data.split("|");


//             $("#id_usuario_pedi").val(idcl[1]);
//             $("#id_contra_codi").val(idcl[2]);
//             $("#id_usuario_cod").val(idcl[0]);

//         },
//         error: function (jqXHR, estado, error) { },
//     });

// }



// function consulta_data_AD(docentry) {
//     $.ajax({
//         url: "busca_data_AD.php",
//         type: "POST",
//         data: { docentry },
//         success: function (x) {
//             var data = x;
//             var idcl = data.split("|");

//             $("#id_observaciones").val(idcl[0]);
//             $("#id_emp").val(idcl[1]);
//             $("#id_dir_trans").val(idcl[2]);
//             $("#id_ubicacion").val(idcl[3]);
//             $("#id_dir_destino").val(idcl[4]);


//             moda_destino = idcl[5];
//             $("#id_moda_destino").children().val(moda_destino).trigger("change.select2")
//             // $("#id_moda_destino option: selected").text(idcl[5]);

//             // $("#id_moda_pago option: selected").text(idcl[6]);

//             moda_pago = idcl[6];
//             $("#id_moda_pago").children().val(moda_pago).trigger("change.select2")

//             $("#conta1").val(idcl[7]);
//             $("#dni1").val(idcl[8]);
//             $("#tele1").val(idcl[9]);

//             $("#conta2").val(idcl[10]);
//             $("#dni2").val(idcl[11]);
//             $("#tele2").val(idcl[12]);

//             $("#conta3").val(idcl[13]);
//             $("#dni3").val(idcl[14]);
//             $("#tele3").val(idcl[15]);

//             var doc_comparacion = idcl[16];

//             // Control de botones
//             if (docentry === doc_comparacion) {
//                 $("#btn_guardar").hide();
//                 $("#btn_actualizar").show();
//             } else {
//                 $("#btn_actualizar").hide();
//                 $("#btn_guardar").show();
//             }
//         },
//         error: function (jqXHR, estado, error) {
//             console.error("Error en la solicitud:", error);
//         },
//     });
// }

// function consultar_boton() {

//     docentry = $("#docito").val();
//     //console.log(docentry);


//     $.ajax({
//         url: "busca_doc_boton.php",

//         type: "POST",
//         data: {
//             docentry: docentry,
//         },
//         success: function (x) {
//             //console.log(x);
//             var data = x;
//             var idcl = data.split("|");

//             var doc_comparacion = idcl[0].trim();

//             //console.log(doc_comparacion)
//             //console.log(docentry)


//             if (docentry === doc_comparacion) {
//                 $("#btn_alista").hide();
//                 //console.log("Ocultando el botón");
//             } else {
//                 $("#btn_alista").show();
//                 //console.log("Muestra el botón");
//             }


//         },
//         error: function (jqXHR, estado, error) { },
//     });

// }




// function consultar_boton2() {

//     docentry = $("#docito").val();
//     //console.log(docentry);


//     $.ajax({
//         url: "busca_doc_boton_ruta.php",

//         type: "POST",
//         data: {
//             docentry: docentry,
//         },
//         success: function (x) {
//             //console.log(x);
//             var data = x;
//             var idcl = data.split("|");

//             var doc_comparacion = idcl[0].trim();

//             //console.log(doc_comparacion)
//             //console.log(docentry)


//             if (docentry === doc_comparacion) {
//                 $("#btn_ruta").hide();
//                 //console.log("Ocultando el botón");
//             } else {
//                 $("#btn_ruta").show();
//                 //console.log("Muestra el botón");
//             }


//         },
//         error: function (jqXHR, estado, error) { },
//     });

// }



// // function imprimir_Form() {

// //     $("#modal_datos_adicionales").modal("show");

// //     var doc = $("#docito").val();

// //     $("#docito_adicionales").val(doc);

// //     imprimir_Form1(doc);

// //     // document.getElementById("btn_guardar").style.display = "block";
// //     // document.getElementById("btn_actualizar").style.display = "none";


// // }




// function imprimir_Form() {

//     doc = $("#docito_adicionales").val();
//     console.log(doc);
//     console.log("entro");
//     var ruta = "pdf_Form2.php?doc=" + doc;
//     $('#modal_data_pdf').modal('show');
//     $('#modal_data_pdf').on('shown.bs.modal', function () {
//         $(this).find('iframe').attr('src', ruta);
//     }).on('hidden.bs.modal', function () {
//         $(this).find('iframe').attr('src', ''); // Restablecer el contenido del iframe al cerrar el modal
//     });
//     $("#navegador").off('click').on('click', function () {
//         window.open(ruta, '_blank');
//     });
//     $("#imprimir").off('click').on('click', function () {
//         $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
//     });

// }



// function validar_numero(event) {
//     console.log(event);
//     var charCode = (event.which) ? event.which : event.keyCode;
//     if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
//         alertify.error('No puede ingresar letras');
//         return false;
//     }
//     return true;
// }




// function muestra_detalle_precio(num_ticket) {
//     var tic = num_ticket.split("|");
//     $("#modal_detalle_GENERAL").modal({
//         show: true,
//         backdrop: 'static',
//         keyboard: false
//     });
//     $.ajax({
//         beforeSend: function () {
//             $("#detalle_de_venta").html("Consultando detalle pedidos pendientes...");
//         },
//         url: 'consulta_detalle_precio_general.php',
//         type: 'POST',
//         data: 'tic=' + tic[0],
//         success: function (x) {
//             $(".nuticket").html("");
//             $("#idpedido").val(tic[0]);
//             $(".nuticket").append("Detalle de Precio | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
//             $("#detalle_de_venta").html(x);

//             $('#tabla_detalle').DataTable();
//         },
//         error: function (jqXHR, estado, error) {
//             $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
//         }
//     });
// }


// function editar_form() {

//     document.getElementById("id_observaciones").disabled = false;
//     document.getElementById("id_emp").disabled = false;
//     document.getElementById("id_dir_trans").disabled = false;
//     document.getElementById("id_ubicacion").disabled = false;
//     document.getElementById("id_dir_destino").disabled = false;
//     document.getElementById("id_moda_destino").disabled = false;
//     document.getElementById("id_moda_pago").disabled = false;


//     // document.getElementById("btn_guardar").style.display = "none";
//     // document.getElementById("btn_actualizar").style.display = "block";


//     habilitarInputs()
// }




// function habilitarInputs() {
//     const inputs2 = document.querySelectorAll("#miTabla2 input");

//     const inputs1 = document.querySelectorAll("#miTabla1 input");

//     const inputs = document.querySelectorAll("#miTabla input");

//     inputs.forEach(input => {
//         input.disabled = false;
//     });

//     inputs1.forEach(input => {
//         input.disabled = false;
//     });

//     inputs2.forEach(input => {
//         input.disabled = false;
//     });

// }




// // document.getElementById("tuTabla").addEventListener("click", function() {
// //     const ventanaFlotante = document.getElementById('ventanaFlotante' + datoS[DOCENTRY]);
// //     ventanaFlotante.style.display = 'block'; // Mostrar la ventana
// // });



// // $(document).on("dblclick", "#tabla_listado tbody tr", function () {
// //     // Obtener el ID de la fila
// //     var filaId = $(this).attr('id');

// //     // Extraer solo el número de la fila usando una expresión regular
// //     var numeroFila = filaId.match(/\d+/); // Esto busca uno o más dígitos en la cadena

// //     // Si se encuentra un número, lo obtenemos como cadena
// //     if (numeroFila) {
// //         numeroFila = numeroFila[0];// Obtenemos el primer resultado
// //     }
// //     // Mostrar el número de la fila en la consola
// //     console.log("Número de la fila seleccionada: " + numeroFila);

// //     $("#modal_id_botones").modal("show");
// //     $("#docito").val(numeroFila);


// //     // $("#NUM_SAP").val(Numsap);
// //     // $("#NUM_GUIA").val(Numsap);
// //     // $("#CLIENTE").val(Numsap);
// //     // $("#ESTADO").val(Numsap);
// //     setTimeout(() => {
// //         consultar_boton();
// //         consultar_boton2();
// //     }, 500);

// // });

// $(document).on("dblclick", "#tabla_listado tbody tr", function () {
//     var $fila = $(this);

//     var filaId = $fila.attr('id');

//     console.log("Número de la fila seleccionada: " + filaId);

//     // Obtener los datos de las celdas
//     var doc = $fila.find("td:nth-child(1)").text();

//     var sap = $fila.find("td:nth-child(5)").text();
//     var guia = $fila.find("td:nth-child(6)").text();
//     var cliente = $fila.find("td:nth-child(8)").text();
//     var estado = $fila.find("td:nth-child(3)").text();

//     $("#modal_id_botones").modal("show");

//     $("#docito").val(doc);
//     $("#NUM_SAP").val(sap);
//     $("#NUM_GUIA").val(guia);
//     $("#CLIENTE").val(cliente);
//     $("#ESTADO").val(estado);


//     setTimeout(() => {
//         consultar_boton();
//         consultar_boton2();
//     }, 500);
// });






// $(document).on("click", "#tabla tbody tr", function () {
//     // Encuentra el checkbox dentro de la fila actual
//     var checkbox = $(this).find("#precio_id");

//     // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
//     checkbox.prop("checked", !checkbox.prop("checked"));

//     // Actualiza la apariencia y el botón según el estado del checkbox
//     actualizarFila(checkbox);
// });

// function actualizarFila(checkbox) {

//     var checkboxes = $('#tabla .chkCheckBoxId');
//     var checkbox2 = $("#tabla tbody tr").find("#precio_id");
//     var checkboxesActivados = checkboxes.filter(':checked').length;
//     var cant = checkbox2.closest("tr").find("#precio_id:checked").length;
//     //console.log(cant);
//     if (checkbox.is(":checked")) {
//         checkbox.closest("tr").find("td").css("background-color", "LightGreen");
//     } else {
//         checkbox.closest("tr").find("td").css("background-color", "white");
//     }
//     if (checkboxesActivados > 0) {
//         $("#enviar").show();
//     } else {
//         $("#enviar").hide();
//     }
// }
