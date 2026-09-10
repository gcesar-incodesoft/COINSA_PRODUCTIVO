$("#nombre_c").on('keypress', function (e) {
    if (e.which == 13) {
        // Acciones a realizar, por ej: enviar formulario.

        descri = $(this).val();
        $("#lista_detalleDESCRI").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');

        $.post("Listar_Descripcion.php", { descri: descri },
            function (data) {
                $('#nombre_c').val('');
                $("#lista_detalleDESCRI").html(data);
                $('#escp').DataTable();
            })
    }
});


$("#btnBusa").on('click', function (s) {
    descri = $('#nombre_c').val();
    $("#lista_detalleDESCRI").html('<div class="spinner-container"><i class="fas fa-spinner fa-spin"></i> </div>');

    $.post("Listar_Descripcion.php", { descri: descri },
        function (data) {
            $('#nombre_c').val('');
            $("#lista_detalleDESCRI").html(data);
            $('#escp').DataTable();
        });
});


///IMPRIMIR ETIQUETAS
function imprimir_etiqueta() {

    stepd = 0;
    conta = 0;

    var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {

            blob = new Blob([data], { tipo: 'texto / plano' }),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());
    cantiImPRE = $("#ulti").val();

    for (let stepd = 0; stepd < cantiImPRE; stepd++) {
        $("input[name=chetimp]:checked").each(function (key) {

            conta++

            var codebar = $(this).parents("tr").find("td").eq(1).text();
            var numer = $(this).parents("tr").find("td").eq(4).text();
            var marca = $(this).parents("tr").find("td").eq(3).text();
            //   var qr= 'Itemcodes='+carcod+',Ubicacion ='+rack+', Columna='+col+', fila='+fila+' '

            //  var carnam=carna.substring(0,30);
            //var carnam2=carna.substring(30,150);

            var etique = $('input:checkbox[name=etique]:checked').val();

            if (etique == undefined) {

                if (conta == 1) {
                    par1 = 'CT~~CD,~CC^~CT~        ^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD20^JUS^LRN^CI0^XZ        ^XA        ^MMT        ^PW774        ^LL0150        ^LS0        ^BY2,3,62^FT80,71^BCN,,Y,N        ^FD>:' + codebar + '^FS'
                
                } else if (conta == 2) {
                    conta = 0;
                    part2 = ' ^BY2,3,62^FT422,71^BCN,,Y,N ^FD>:' + codebar + '^FS ^PQ1,0,1,Y^XZ '

                    var data = [];
                    var estructura = par1 + part2
                    //alert(estructura);
                    data.push(estructura);
                    fileName = "etiqimob.prn";
                    saveData(data, fileName);

                }

                if (typeof part2 == "undefined") {
                    alertify.error("Tiene que seleccionar multiplo de 2");
                }

            } else {
                if (conta == 1) {
                    par12 = 'CT~~CD,~CC^~CT~          ^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR13,13~SD15^JUS^LRN^CI0^XZ          ^XA          ^MMT          ^PW831          ^LL0200          ^LS0          ^BY4,3,73^FT31,148^BCN,,Y,N          ^FD>;' + codebar + '^FS          ^FT117,41^A0N,17,16^FH\^FD' + numer + '^FS          ^FT31,41^A0N,17,16^FH\^FDCATALOGO:^FS         ^FT31,66^A0N,17,16^FH\^FDMARCA:^FS          ^FT117,66^A0N,17,14^FH\^FD' + marca + '^FS'

                } else if (conta == 2) {
                    conta = 0;
                    part22 = '^BY4,3,73^FT467,148^BCN,,Y,N     ^FD>;' + codebar + '^FS     ^FT553,41^A0N,17,16^FH\^FD' + numer + '^FS     ^FT467,41^A0N,17,16^FH\^FDCATALOGO:^FS     ^FT467,66^A0N,17,16^FH\^FDMARCA:^FS     ^FT553,66^A0N,17,14^FH\^FD' + marca + '^FS     ^PQ1,0,1,Y^XZ'
                    var data = [];

                    var estructura = par12 + part22
                    //alert(estructura);
                    data.push(estructura);

                    fileName = "etiqimob.prn";
                    saveData(data, fileName);
                }

                if (typeof part22 == "undefined") {
                    alertify.error("Tiene que seleccionar multiplo de 2");
                }
            }
        })
    }
}



$(document).on("click", "#escp tbody tr", function () {

    var checkbox = $(this).find("#che");
    checkbox.prop("checked", !checkbox.prop("checked"));

    actualizarFila2(checkbox);

});

function actualizarFila2(checkbox) {
    var checkbox2 = $('#escp tbody tr').find("#che");
    // var cant = checkbox2.closest("tr").find("#che:checked").length;  
    //console.log(cant);
    if (checkbox.is(":checked")) {
        checkbox.closest("tr").find("td").css("background-color", "LightGreen");
        
        codesap = $(this).parents("tr").find("td").eq(1).text();
        desc = $(this).parents("tr").find("td").eq(2).text();
        uni = $(this).parents("tr").find("td").eq(3).text();
        rack = $(this).parents("tr").find("td").eq(4).text();
        col = $(this).parents("tr").find("td").eq(5).text();
        fila = $(this).parents("tr").find("td").eq(6).text();
        //ccost=$(this).parents("tr").find("td").eq(4).text();
        //turn=$("#IdTurno option:selected").val();
        fechac = $("#fecha").val();
        //+ alert($fecha);
        $("#tabla_Costo > tbody ").append("<tr><td style='text-align: center;'><input class='CheckedAK' type='checkbox' id='chet' name='chetimp'  checked disabled ></td> <td class='center'>" + codesap + "</td><td class='center'>" + desc + "</td><td class='center'>" + uni + "</td><td class='center'>" + rack + "</td><td class='center'>" + col + "</td><td class='center'>" + fila + "</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
    } else {
        checkbox.closest("tr").find("td").css("background-color", "white");       
    }
}


///mover a la otra tabla
$(document).on('click', '#che', function () {
    //alert("inge");
    //Revisa en que status está el checkbox y controlalo según lo //desees
    if ($(this).is(':checked')) {
        codesap = $(this).parents("tr").find("td").eq(1).text();
        desc = $(this).parents("tr").find("td").eq(2).text();
        uni = $(this).parents("tr").find("td").eq(3).text();
        rack = $(this).parents("tr").find("td").eq(4).text();
        col = $(this).parents("tr").find("td").eq(5).text();
        fila = $(this).parents("tr").find("td").eq(6).text();
        //ccost=$(this).parents("tr").find("td").eq(4).text();
        //turn=$("#IdTurno option:selected").val();
        fechac = $("#fecha").val();
        //+ alert($fecha);
        $("#tabla_Costo > tbody ").append("<tr><td style='text-align: center;'><input class='CheckedAK' type='checkbox' id='chet' name='chetimp'  checked disabled ></td> <td class='center'>" + codesap + "</td><td class='center'>" + desc + "</td><td class='center'>" + uni + "</td><td class='center'>" + rack + "</td><td class='center'>" + col + "</td><td class='center'>" + fila + "</td><td class='center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
    };
});

$(function () {
    // Evento que selecciona la fila y la elimina
    $(document).on("click", ".delete", function () {
        var parent = $(this).parents().parents().get(0);
        id = $(this).parents("tr").find("td").eq(1).text();
        $(parent).remove();
        resumen(id)
    });
});

function resumen(id) {
    contador = 1;
    $("#escp tr").find('td:eq(1)').each(function () {
        codigo = $(this).html();
        if (codigo === id) {
            trDelResultado = $(this).parent();
            encontradoResultado3 = true;
            //console.log(trDelResultado.children[0]);
            celdas3 = document.getElementById("escp").rows[contador].cells
            celdas3[0].children[0].checked = false
        }
        contador++;
    })
}