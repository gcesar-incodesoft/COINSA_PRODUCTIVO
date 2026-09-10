function lista_estructura(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_estructura").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Estructura.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_estructura").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_clientes2(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#pone_clientes2").html("Recuperando proveedores...");
      },
     url: 'pone_clientes_cartera2.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#pone_clientes2").html(x);
       $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
};
function lista_estructura2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_estructura2").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Estructura.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_estructura2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_estructura3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_estructura3").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Estructura.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_estructura3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_estructura4(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_estructura4").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Estructura.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_estructura4").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_imprimir(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_imprimir").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Estructura.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_imprimir").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
///////////////////////////////////////////////////////////////////////////
function lista_sentido(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_sentido").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Sentido.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_sentido").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_sentido2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_sentido2").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Sentido.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_sentido2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_sentido3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_sentido3").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Sentido.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_sentido3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_sentido5(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_sentido5").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Sentido.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_sentido5").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_sentido7(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_sentido7").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Sentido.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_sentido7").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
///////////////////////////////////////////////////////////////////////////
function lista_desarrollo(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_desarrollo").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Desarrollo.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_desarrollo").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
///////////////////////////////////////////////////////////////////////////
function lista_adhesivo(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_adhesivo").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Adhesivo.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_adhesivo").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_adhesivo2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_adhesivo2").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Adhesivo.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_adhesivo2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_adhesivo3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_adhesivo3").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Adhesivo.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_adhesivo3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
///////////////////////////////////////////////////////////////////////////
function lista_catalizador(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_catalizador").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Catalizador.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_catalizador").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_catalizador2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_catalizador2").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Catalizador.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_catalizador2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_catalizador3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_catalizador3").html("Recuperando Estructura...");
        },
        url: 'Lista_Ficha_Catalizador.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_catalizador3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
///////////////////////////////////////////////////////////////////////////
function lista_proceso(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_proceso").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_proceso").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_proceso2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_proceso2").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_proceso2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_proceso3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_proceso3").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_proceso3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_proceso4(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_proceso4").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_proceso4").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
///////////////////////////////////////////////////////////////////
function lista_datos(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_datos").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Datos.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_datos").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_datos2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_datos2").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Datos.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_datos2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
///////////////////////////////////////////////////////////////////
function lista_impresion(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_impresion").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Impresion.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_impresion").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
///////////////////////////////////////////////////////////////////
function lista_impresora(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_impresora").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Impresora.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_impresora").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
///////////////////////////////////////////////////////////////////
function lista_proc(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_pro").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_pro").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_proc2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_pro2").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_pro2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista_proc3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_pro3").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_pro3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
////////////////////////////////////////////////////////////////////
function lista2_proc(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha2_pro").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha2_pro").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista2_proc2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha2_pro2").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha2_pro2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
function lista2_proc3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha2_pro3").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_Proceso2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha2_pro3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};
//////////////////////////////////////////////////////////////////
function lista_sello(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#ficha_sello2").html("Recuperando Procesos...");
        },
        url: 'Lista_Ficha_sello.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#ficha_sello2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
};