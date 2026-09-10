function pone_lista_evento(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_evento").html("Recuperando proveedores...");
        },
        url: 'consulta_evento.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_evento").html(x);
          $("#tabla_evento").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function reg_evento() {
    $('#modal_registrar').modal('show');
}
function lista_maquinaria(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#maquina").html("Recuperando Estructura...");
        },
        url: 'Lista_Maquinaria.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#maquina").html(x);
            $(".select2").select2();
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
function tipo_evento(){
    opcion=$("#evento option:selected").val().trim();
    $(document).ready(function() {
        $.post("buscar_tevento_maq.php", {id:opcion}, 
        function(data){
       
           $("#tipo_evento").html(data);
           
         
        });
    });
}
function lista_evento(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#evento").html("Recuperando Estructura...");
        },
        url: 'Lista_Evento.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#evento").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}

function registrar_datos(){
    fecha=document.getElementById('fecha').value;
    maquina=$("#maquina option:selected").val().trim();
    operador=$("#operacor option:selected").val().trim();
    turno=$("#turno option:selected").text().trim();
    hora_ini=document.getElementById('hora_ini').value;
    hora_fin='';
    evento=$("#evento option:selected").val().trim();
    tipo_evento2=document.getElementById('tipo_eventos').value;
    observacion=document.getElementById('observacion').value;
    if (fecha ==="" ){
        alertify.error('Falta fecha');
    }
    if (maquina ==="Seleccione" ){
        alertify.error('Falta elegir la maquina');
    }
    if (operador ==="Seleccione" ){
        alertify.error('Falta elegir el operador');
    }
    if (turno ==="Seleccione" ){
        alertify.error('Falta elegir el turno');
    }
    if (hora_ini ==="" ){
        alertify.error('Falta la hora de inicio');
    }
    if (evento ==="" ){
        alertify.error('Falta elegir el evento');
    }
   
    if (fecha !== "" && maquina !== "Seleccione" && operador !== "Seleccione" && 
        turno !== "Seleccione" && hora_ini !== "" && evento !== "") {
            
        $(document).ready(function() {
            
            $.post("registrar_evento_maq.php", {fecha:fecha,maquina:maquina,operador:operador,turno:turno,hora_ini:hora_ini,
            hora_fin:hora_fin,evento:evento,tipo_evento:tipo_evento2,observacion:observacion}, 
            function(data2){  
                console.log('hola');    
                $('#modal_registrar').modal('hide');
                pone_lista_evento()
            });
        });
    }

    
}
function finalizar_evento(id) {
    var code=id;
    document.getElementById('code_fin').value=id;
    $('#modal_finalizar').modal('show');
    $.post("buscar_evento_maq.php", {code:code}, 
        function(data){    
            $("#datos_finalizar").html(data);  
            document.getElementById('fecha_fin').value=$("[name='fecha']").text().trim();
            document.getElementById('maquina_fin').value=$("[name='maquina']").text().trim();
            document.getElementById('operario_fin').value=$("[name='operador']").text().trim();
            document.getElementById('turno_fin').value=$("[name='turno']").text().trim();
            document.getElementById('hora_ini_fin').value=$("[name='hora_ini']").text().trim();
            document.getElementById('evento_fin').value=$("[name='evento']").text().trim();
            document.getElementById('tipo_evento_fin').value=$("[name='tipo_evento']").text().trim();
        });
}
function finalizar_even(){
    code=document.getElementById('code_fin').value;
    hora_fin=document.getElementById('hora_fin_fin').value;
    fecha_fin=document.getElementById('fecha_fin_fin').value;
    observacion=document.getElementById('observacion_fin').value;
    if (fecha_fin ==="" ){
        alertify.error('Falta la fecha de final');
    }
    if (hora_fin ==="" ){
        alertify.error('Falta la hora de final');
    }
    if (hora_fin !==""  && fecha_fin !=="") {
        $.post("finalizar_evento_maq.php", {code:code,hora_fin:hora_fin,observacion:observacion,fecha_fin:fecha_fin}, 
            function(data){    
                $('#modal_finalizar').modal('hide');
                pone_lista_evento()
            });
    }
}
function ver_evento(id) {
    var code=id;
    document.getElementById('code_ver').value=id;
    document.getElementById('codig_ver').innerText=id;
    $('#modal_ver').modal('show');
    $.post("buscar_evento_maq.php", {code:code}, 
        function(data){    
            $("#datos_finalizar").html(data);  
            document.getElementById('fecha_ver').value=$("[name='fecha']").text().trim();
            document.getElementById('fecha_ver2').value=$("[name='fecha_fin']").text().trim();
            document.getElementById('maquina_ver').value=$("[name='maquina']").text().trim();
            document.getElementById('maquina_ver2').value=$("[name='maquina']").text().trim();
            document.getElementById('operario_ver').value=$("[name='operador']").text().trim();
            document.getElementById('operario_ver2').value=$("[name='operador']").text().trim();
            document.getElementById('turno_ver').value=$("[name='turno']").text().trim();
            document.getElementById('turno_ver2').value=$("[name='turno']").text().trim();
            document.getElementById('hora_ini_ver').value=$("[name='hora_ini']").text().trim();
            document.getElementById('hora_fin_ver2').value=$("[name='hora_fin']").text().trim();
            document.getElementById('evento_ver').value=$("[name='evento']").text().trim();
            document.getElementById('evento_ver2').value=$("[name='evento']").text().trim();
            document.getElementById('tipo_evento_ver').value=$("[name='tipo_evento']").text().trim();
            document.getElementById('tipo_evento_ver2').value=$("[name='tipo_evento']").text().trim();
            document.getElementById('observacion_ver').value=$("[name='observacion']").text().trim();
            document.getElementById('observacion_ver2').value=$("[name='observacion2']").text().trim();
            
        });
}
/* function mueveReloj(){
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    segundo = momentoActual.getSeconds()

    str_segundo = new String (segundo)
    if (str_segundo.length == 1)
       segundo = "0" + segundo

    str_minuto = new String (minuto)
    if (str_minuto.length == 1)
       minuto = "0" + minuto

    str_hora = new String (hora)
    if (str_hora.length == 1)
       hora = "0" + hora

    horaImprimible = hora + " : " + minuto + " : " + segundo

    document.form_reloj.reloj.value = horaImprimible

    setTimeout("mueveReloj()",1000)
} */