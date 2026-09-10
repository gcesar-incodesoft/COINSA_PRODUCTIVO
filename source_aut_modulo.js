function pone_lista_query(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_modulo").html("Recuperando modulos...");
        },
        url: 'consulta_aut_query.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_modulo").html(x);
          $("#tabla_mod").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}

function pone_lista_aut(id){
  $(document).ready(function() {
    $.ajax({
      beforeSend: function(){
        $("#lista_modulo_query").html("Recuperando modulos...");
      },
      url: 'consulta_aut.php',
      type: 'POST',
      data: 'query=' + id ,
      success: function(x){
        $("#lista_modulo_query").html(x);
        $("#tabla_mod_query").DataTable();
      },
      error: function(jqXHR,estado,error){}
      });
  });
}

function agregar_usu(id) {
  $('#modal_agregar_usu').modal('show');  
  pone_lista_aut(id)
  lista_usuarios()
  document.getElementById('query_usu').value = id
}

function registrar_data () {
  area = $("#area_usu option:selected").val();
  tipo = $("#tipo_usu option:selected").val();
  id_usu = $('#pone_usuarios').children().val();
  query = $("#query_usu").val();
  bandera= true;
  if (area === "") {
    bandera = false
    alertify.error('Falta elegir el area');
  }
  if (tipo === "") {
    bandera = false
    alertify.error('Falta elegir el tipo');
  }
  if (id_usu === "") {
    bandera = false
    alertify.error('Falta el id');
  }
  swal({
    title: "Registrar?",
    icon: "warning",
    buttons: true,
    timer: 5000,
    dangerMode: true,
    //closeOnConfirm: false,
    closeOnEsc: false,
    closeOnClickOutside: false,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Registrado ", {
        icon: "success",
        timer: 5000,
        closeOnEsc: false,
        buttons: false,
        closeOnClickOutside: false,
      });
      if (bandera===true) {
        if (document.getElementById('check01').checked===true) {
          console.log('hola');
          sede=document.getElementById('check01').value;
          reg_dat_sede(area,id_usu,sede,query,tipo)
        }
        if (document.getElementById('check02').checked===true) {
          console.log('holax2');
          sede2=document.getElementById('check02').value;
          reg_dat_sede(area,id_usu,sede2,query,tipo)
        }
        if (document.getElementById('check03').checked===true) {
          console.log('holax3');
          sede3=document.getElementById('check03').value;
          reg_dat_sede(area,id_usu,sede3,query,tipo)
        }
      }
    } else {
      swal("No se pudo registrar");
    }
  });
  
  
}
function agregar_usu_normal(id,value){
  $('#modal_agregar_usu_normal').modal('show'); 
  document.getElementById('query_usu_normal').value = id;
  document.getElementById('area_usu_normal').value = value;
  lista_usuarios2()
}
function reg_dat_sede(area,id_usu,sede,query,tipo) {
  $(document).ready(function () {
    
    $.post("registrar_autorizacion_modulo.php", {
      area: area,
      id_usu: id_usu,
      sede: sede,
      query: query,
      tipo: tipo,
    },
    function (data2) {
      console.log('prueba');
      pone_lista_aut(query)
      //$('#modal_registrar').modal('hide');
      //pone_lista_orden()
    });
  }); 
}

function lista_usuarios(){
  $(document).ready(function() {
   $.ajax({
   beforeSend: function(){
     $("#pone_usuarios").html("Recuperando usuarios...");
    },
   url: 'pone_usuarios.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#pone_usuarios").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
}
function lista_usuarios2(){
  $(document).ready(function() {
   $.ajax({
   beforeSend: function(){
     $("#pone_usuarios2").html("Recuperando usuarios...");
    },
   url: 'pone_usuarios.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#pone_usuarios2").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
}