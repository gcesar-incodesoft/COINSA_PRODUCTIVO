function lista_maquinaria() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#maquina").html("Recuperando Estructura...");
            },
            url: 'Lista_Maquinaria.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#maquina").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {}
        });
    });
}

function reg_manual() {
    $('#modal_registrar').modal('show');
}
function listar_data_pdf(id) {
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
          beforeSend: function () {
            $("#data_pdf").html("Buscando las ventas, un momento...");
          },
          url: 'listar_manual_pdf.php',
          type: 'POST',
          data: 'id=' + id,
          success: function (res) {
           // console.log(res);
            $("#data_pdf").html(res);
            $(document).ready(function () {
              $('#tabla_pfd').DataTable();
            });
          },
          error: function (jqXHR, estado, error) {
            alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
            $("#data_pdf").html(estado + "     " + error);
          }
        });
    
    
      })
}
function listar_data_pdf2(id) {
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
          beforeSend: function () {
            $("#data_pdf2").html("Buscando las ventas, un momento...");
          },
          url: 'listar_manual_pdf.php',
          type: 'POST',
          data: 'id=' + id,
          success: function (res) {
           // console.log(res);
            $("#data_pdf2").html(res);
            $(document).ready(function () {
              $('#tabla_pfd').DataTable();
            });
          },
          error: function (jqXHR, estado, error) {
            alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
            $("#data_pdf2").html(estado + "     " + error);
          }
        });
    
    
      })
}
function listar_data_pdf3(id) {
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
          beforeSend: function () {
            $("#data_pdf3").html("Buscando las ventas, un momento...");
          },
          url: 'listar_manual_pdf.php',
          type: 'POST',
          data: 'id=' + id,
          success: function (res) {
           // console.log(res);
            $("#data_pdf3").html(res);
            $(document).ready(function () {
              $('#tabla_pfd').DataTable();
            });
          },
          error: function (jqXHR, estado, error) {
            alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
            $("#data_pdf3").html(estado + "     " + error);
          }
        });
    
    
      })
}
function listar_manual() {
    $(document).ready(function () {
        //estado = $("#IDestado option:selected").text().trim();
        $.ajax({
          beforeSend: function () {
            $("#lista_manual").html("Buscando las ventas, un momento...");
          },
          url: 'listar_manual.php',
          type: 'POST',
          data: null,
          success: function (res) {
           // console.log(res);
            $("#lista_manual").html(res);
            $(document).ready(function () {
              $('#tabla_manual').DataTable();
            });
          },
          error: function (jqXHR, estado, error) {
            alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
            $("#lista_manual").html(estado + "     " + error);
          }
        });
    
    
      })
}

function ver_manual_pdf(id,ruta) {
    $global_id= id;
    $global_ruta= ruta;
    //console.log(id)
    $('#modal_data_pdf').modal('show');
    $('.modal_data_pdf').on('shown.bs.modal',function(){      //correct here use 'shown.bs.modal' event which comes in bootstrap3
        $(this).find('iframe').attr('src',$global_ruta)
    })
    $("#navegador").on('click', function() {
        //window.location.href = $global_ruta
        window.open($global_ruta);
        
    })
    $("#imprimir").on('click', function() {
         $('#imprimir1')[0].contentWindow.print(); 
        //window.print();
       
    })
}
function registrar_data() {
    if($("#data_pdf").html()!==""){
        id = $("#valor").text();
        descripcion = document.getElementById('descrip_reg').value;
        //titulo = document.getElementById('titulo_reg').value;
        maquina = $('#maquina').children().val();
        bandera = true;
        if (descripcion === "") {
            bandera = false
            alertify.error('Falta la descripcion');
        }
        if (maquina === "Seleccione") {
            bandera = false
            alertify.error('Falta elegir maquina');
        }
        
        if (bandera===true) {
            $(document).ready(function () {

                $.post("registrar_manual.php", {
                    id: id,
                    descripcion: descripcion,
                    maquina: maquina,
                  },
                  function (data2) {
                    console.log('hola');
                    $('#modal_registrar').modal('hide');
                    listar_manual()
                  });
              });
        }
    }else{
        alertify.error('Falta Manuales');
    }
   
}
function agregar_manual(id,maquina) {
    $('#modal_agregar_pdf').modal('show');
    document.getElementById('codig_agre').innerText = id;
    listar_data_pdf2(id)
    $.post("buscar_manual_data.php", {
        code: id
        },
        function (data) {
        $("#datos_agregar_pdf").html(data);
        document.getElementById('maquina_agre').value = $("[name='maquina']").text().trim();
        document.getElementById('descrip_agre').value = $("[name='descripcion']").text().trim();
        //document.getElementById('descripcion_fin').value=$("[name='descripcion']").text().trim();
        }); 
}
function ver_detalle(id,maquina) {
    $('#modal_ver_detalle').modal('show');
    document.getElementById('codig_det').innerText = id;
    listar_data_pdf3(id)
    $.post("buscar_manual_data.php", {
        code: id
        },
        function (data) {
        $("#datos_agregar_pdf").html(data);
        document.getElementById('maquina_det').value = $("[name='maquina']").text().trim();
        document.getElementById('descrip_det').value = $("[name='descripcion']").text().trim();
        //document.getElementById('descripcion_fin').value=$("[name='descripcion']").text().trim();
        }); 
}