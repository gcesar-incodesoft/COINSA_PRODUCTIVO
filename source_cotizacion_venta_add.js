//import CONFIG from './pages/config.js';

$(document).on("change", "#dirigido_coti select", function () {
  var id = this.value;
  var idcl_coti = id.split("|");
  console.log(idcl_coti);
  $("#dirigido_coti_nombre").val(idcl_coti[4]);
  $("#correo_dirigido").val(idcl_coti[2]);
  $("#telefono_dirigido").val(idcl_coti[3]);
});

function procesa_cotizacion_desicion() {
  swal({
    title: "Desea Registrar?",
    text: "Desea Registrar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      procesa_cotizacion();
    } else {
      swal("No se ha registrado");
    }
  });
}

function modal_producto_virtual() {
  $("#moda_virtual").modal("show");
  $.ajax({
    beforeSend: function () {
      // $("#pone_vendedores").html("Recuperando proveedores...");
    },
    url: "busca_data_articulo_almace_ver.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#tabla_prod_virtual").html(x);
      $("#tabla_art").DataTable({
        order: [[0, "desc"]],
        "paging": true, // ✅ Activa la paginación
        "info": true, // ✅ Muestra la información del total de registros
        "language": {
          "lengthMenu": "Mostrar _MENU_ registros por página",
          "zeroRecords": "No se encontraron registros",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "infoEmpty": "No hay registros disponibles",
          "infoFiltered": "(filtrado de _MAX_ registros totales)",
          "search": "Buscar:",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        }
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}
