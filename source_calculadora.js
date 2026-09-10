function kg_saco() {
    ancho= parseFloat($('#ancho_saco').val() == ''?  0.00  : $('#ancho_saco').val()) 
    largo= parseFloat($('#largo_saco').val()== ''?  0.00  : $('#largo_saco').val() )
    gramaje= parseFloat($('#gramaje_saco').val() == ''?  0.00  : $('#gramaje_saco').val())

    dato_kg_saco=parseFloat((parseFloat(ancho/100)*parseFloat(largo/100)*parseFloat(gramaje)*2)/1000).toFixed(4)
    $('#kgsa_saco').val(dato_kg_saco)
    console.log(ancho);
    console.log(largo);
    console.log(gramaje);
}
function kg_millar() {
    kgsa_saco= $('#kgsa_saco').val()

    dato_kg_millar= parseFloat(kgsa_saco*1000).toFixed(2)
    $('#kgmi_saco').val(dato_kg_millar)
}
function suma_costo() {
    kgpr_saco= parseFloat($('#kgpr_saco').val() == ''?  0.00  : $('#kgpr_saco').val())
    gastof_saco=  parseFloat($('#gastof_saco').val() == ''?  0.00  : $('#gastof_saco').val())
    extra_saco=  parseFloat($('#extra_saco').val() == ''?  0.00  : $('#extra_saco').val())

    dato_costo_kg= parseFloat(kgpr_saco+gastof_saco+extra_saco).toFixed(2)
    $('#costokg_saco').val(dato_costo_kg)
}
function pre_millar() {
    kgmi_saco= parseFloat($('#kgmi_saco').val() == ''?  0.00  : $('#kgmi_saco').val())
    costokg_saco=  parseFloat($('#costokg_saco').val() == ''?  0.00  : $('#costokg_saco').val())

    dato_pre_millar= parseFloat(kgmi_saco*costokg_saco).toFixed(2)
    $('#milarpr_saco').val(dato_pre_millar)
}
function ancho_form() {
    ancho_saco= parseFloat($('#ancho_saco').val() == ''?  0.00  : $('#ancho_saco').val())

    dato_ancho_form= parseFloat(ancho_saco/100).toFixed(2)
    $('#ancho_form').val(dato_ancho_form)
}
function impre_form() {
    largo_saco= parseFloat($('#largo_saco').val() == ''?  0.00  : $('#largo_saco').val())
    cantidad_saco= parseFloat($('#cantidad_saco').val()  == ''?  0.00  : $('#cantidad_saco').val())

    dato_mimpre_form= parseFloat(largo_saco/100*cantidad_saco).toFixed(2)
    $('#mimpre_form').val(dato_mimpre_form)
}
function usd_form_2() {
    preciotin_form= parseFloat($('#preciotin_form').val() == ''?  0.00  : $('#preciotin_form').val())
    consu_form= parseFloat($('#consu_form').val() == ''?  0.00  : $('#consu_form').val())
    ancho_form2= parseFloat($('#ancho_form').val() == ''?  0.00  : $('#ancho_form').val())
    consugm_form= parseFloat($('#consugm_form').val() == ''?  0.00  : $('#consugm_form').val())
    mimpre_form= parseFloat($('#mimpre_form').val() == ''?  0.00  : $('#mimpre_form').val())
    porcor_form= parseFloat($('#porcor_form').val()/100)

    dato_usd_form= parseFloat(((ancho_form2*consugm_form*mimpre_form/1000)*(preciotin_form+consu_form))*porcor_form).toFixed(2)
    $('#usd_form').val(dato_usd_form)
}
function sumar_total_tabla() {
    var sum=0.00;
    var sum2=0.00;
    var sum3=0.00;
    $("td.total_por").each(function(){
        sum += parseFloat( $( this ).text() );
    });
    $("td.total_usd").each(function(){
        sum2+= parseFloat( $( this ).text() );
    });
    $("td.total_color").each(function(){
        sum3 += parseFloat( $( this ).text() );
    });
    $('#tabla_material tfoot tr th').eq(0).text(sum3);
    $('#tabla_material tfoot tr th').eq(6).text(sum);
    $('#tabla_material tfoot tr th').eq(7).text(sum2);
    usd_clisse()
    total_saquito()
    dolar_saco() 
    dolar_millar()
}

function area_cm() {
    ancho= parseFloat($('#ancho_saco').val() == ''?  0.00  : $('#ancho_saco').val())
    largo= parseFloat($('#largo_saco').val()== ''?  0.00  : $('#largo_saco').val() ) 
    
    dato_cm2= parseFloat(ancho*largo).toFixed(2)
    $('#area_cm2').val(dato_cm2)
}
function usd_clisse() {
    costo_clise= parseFloat($('#costo_clisse').val()== ''?  0.00  : $('#costo_clisse').val())
    area_cm2= parseFloat($('#area_cm2').val() ) 
    total_colors=$('#tabla_material tfoot tr th').eq(0).text()

    dato= parseFloat(costo_clise*area_cm2*total_colors).toFixed(2)
    $('#usd_2').val(dato)
    total_saquito()
}
function total_saquito() {
    usd_2= parseFloat($('#usd_2').val()) 
    toatal_usd=$('#tabla_material tfoot tr th').eq(7).text()

    dato= parseFloat(parseFloat(usd_2)+parseFloat(toatal_usd)).toFixed(2)
    $('#total_saco').val(dato)
}
function dolar_saco() {
    cantidad_saco= parseFloat($('#cantidad_saco').val()) 
    total_saco= parseFloat($('#total_saco').val()) 

    dato= parseFloat(total_saco/cantidad_saco).toFixed(4)
    $('#precio_do_saco').val(dato)
}
function dolar_millar() {
    precio_do_saco= parseFloat($('#precio_do_saco').val()) 

    dato= parseFloat(precio_do_saco*1000).toFixed(2)
    $('#precio_do_millar').val(dato)
}
function millar_impreso_2() {
    milarpr_saco= parseFloat($('#milarpr_saco').val()) 
    precio_do_millar=parseFloat($('#precio_do_millar').val()) 

    dato= parseFloat(parseFloat(milarpr_saco)+parseFloat(precio_do_millar)).toFixed(2)
    $('#millarimp_saco').val(dato)
}
$(function(){
    // Evento que selecciona la fila y la elimina
     $(document).on("click",".delete2",function(){
        var parent = $(this).parents().parents().get(0);
     $(parent).remove();
     //resumen()
     sumar_total_tabla()  
      });
});