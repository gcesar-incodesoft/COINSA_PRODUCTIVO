function pone_lista_control(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_control").html("Recuperando proveedores...");
        },
        url: 'consulta_control_vel.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_control").html(x);
          $("#tabla_control2").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function reg_control() {
    $('#modal_registrar').modal('show');
}
function registrar_datos2(){
    fecha=document.getElementById('fecha').value;
    maquina=$("#maquina option:selected").val().trim();
    operador=$("#operacor option:selected").val().trim();
    turno=$("#turno option:selected").text().trim();
    hora=document.getElementById('hora').value;
    id_vel=document.getElementById('id_vel').value;
    velocidad=document.getElementById('velocidad').value;
    observacion=document.getElementById('observacion').value;
    if (fecha ==="" ){
        alertify.error('Falta fecha');
    }
    if (maquina ==="Seleccione" ){
        alertify.error('Falta elegir la maquina');
    }
    
    if (hora ==="" ){
        alertify.error('Falta la hora');
    }
    if (velocidad ==="" ){
        alertify.error('Falta la Velocidad');
    }
    if (fecha !=="" && maquina !=="Seleccione"  && hora !=="" && velocidad !=="") {
        $(document).ready(function() {
            $.post("registrar_control_vel.php", {fecha:fecha,maquina:maquina,operador:operador,turno:turno,hora:hora,velocidad:velocidad,
            id_vel:id_vel,observacion:observacion}, 
            function(data){      
                $('#modal_registrar').modal('hide');
                pone_lista_control()
            });
        });
    }

    
}
function lista_maquinaria(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#maquina").html("Recuperando Estructura...");
        },
        url: 'Lista_Maquinaria_Vel.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#maquina").html(x);
            $('.select2').select2({
                closeOnSelect: false
            });
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_operarios(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#operarios").html("Recuperando Estructura...");
        },
        url: 'Lista_Operarios.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#operarios").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}


function ver_evento(id) {
    var code=id;
    document.getElementById('code_ver').value=id;
    document.getElementById('codig_ver').innerText=id;
    $('#modal_ver').modal('show');
    $.post("buscar_control_vel.php", {code:code}, 
        function(data){    
            $("#datos_finalizar").html(data);  
            document.getElementById('fecha_ver').value=$("[name='fecha']").text().trim();
            document.getElementById('maquina_ver').value=$("[name='maquina']").text().trim();
            document.getElementById('operario_ver').value=$("[name='operador']").text().trim();
            document.getElementById('turno_ver').value=$("[name='turno']").text().trim();
            document.getElementById('velocidad_ver').value=$("[name='velocidad']").text().trim();
            document.getElementById('hora_ver').value=$("[name='hora']").text().trim();
            document.getElementById('vel_min_ver').value=$("[name='min']").text().trim();
            document.getElementById('vel_obj_ver').value=$("[name='obj']").text().trim();
            document.getElementById('observacion_ver').value=$("[name='observacion']").text().trim();
        }); 
}