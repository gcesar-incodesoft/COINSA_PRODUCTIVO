/**********************************************************************/
$(document).ready(function(){
             $('#tabla_proveedores').jtable({
                          title: 'Movimientos de Proveedores',
                          paging: true,
                          sorting: true,
				          pageSize: 10,
                          pageSizeChangeArea: false,
                          defaultSorting: 'id ASC',
                          gotoPageArea: 'none',
                          //selecting: true,
                          //multiselect: true, //Allow multiple selecting
                          //selectingCheckboxes: true,
                          actions: {
                                   listAction: 'busca_proveedores.php',
                                   updateAction: 'update_proveedores.php',
                                   //deleteAction:'elimina_proveedor.php',
                                   createAction:'add_proveedor.php',
                                   },
                          fields: {
                                  id: {
                                   title: 'ID Proveedor',
                                   width: '10%',
                                   key: true,
                                   list: true
                                     },
                                  nombre: {
                                   title: 'Nombre',
                                   width: '30%',
                                   list: true,
                                   create: true,
                                   edit: true
                                     },
                                  telefono: {
                                   title: 'Telefono',
                                   width: '10%',
                                   list: true,
                                   create: true,
                                   edit: true
                                     },
                                  domicilio: {
                                   title: 'Domicilio',
                                   width: '10%',
                                   list: true,
                                   create: true,
                                   edit: true
                                   },
                                  ciudad: {
                                    title: 'Ciudad',
                                    width: '10%',
                                    list: true,
                                    create: true,
                                    edit: true
                                  }
                                  }
                               });

            //Re-load records when user click 'load records' button.
             $('#CargarRegistros').click(function (e){
             e.preventDefault();
             $('#tabla_proveedores').jtable('load', {
                nombre: $('#name').val()
            });
        });

        //Cargar todos los registros cuando se muestre por primera vez
        $('#CargarRegistros').click();
         });
/**********************************************************************/
///
function genera_opcion_Compras(){
  $(document).ready(function(){
    $.ajax({
      beforeSend: function(){
         $("#pone_opcion").html("Poniendo opciones...");
       },
      url: 'Mostrar_Fecha_GuiaEmi.php',
      type: 'POST',
      data: 'option='+1,
      success: function(res){
        $("#pone_opcion").html(res);
           $(function(){
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
       var xstart=start.format('YYYY-MM-DD');
       var xend=end.format('YYYY-MM-DD');
       

       $("#fi").val(xstart);
       $("#ff").val(xend);
       //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
      }
     );
    });
     $("#numero_caja").select2();
     $("#numero_ticket").inputmask('mask',{'alias':'numeric','autogroup':true,'digits':0,'digitsOptional': false});
       },
      error: function(jqXHR,estado,error){
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado+"     "+error);
       }
     });
  })

}
/*********************************************************************/


  /******************************* Reporte de Facturas**************************************/


  function  ReportedeFacturasEmitidas(){
    $(document).ready(function(){
      if($("#fi").val()!=""||$("#ff").val()!=""){
      $.ajax({
          beforeSend: function(){
             $("#data").html("Buscando Facturas, un momento...");
           },
          
          url: 'Listar_Report_Facturas_EmitidasCompras.php',
          type: 'POST',
          data: 'fechai='+$("#fi").val()+
          '&fechaf='+$("#ff").val()+
          '&sed='+$("#sed option:selected").val(),
        
          success: function(data2){
             
    
          $("#lista_Repor_Consumo").html(data2);
             $('#Tabla_factu').DataTable(); 
             
          },
          error: function(jqXHR,estado,error){
            alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
            $("#tbpr1").hmtl(estado+"     "+error);
           }
         });
         }else{
          alertify.error("Selecciona un rango de fechas para poder continuar...!");
    }
    })
    }
  /*******************************************************************************/
   /******************************* Reporte de Facturas**************************************/


   function  ReportedeFacturasEmitidasLoad(){
    $(document).ready(function(){
      if($("#fi").val()!=""||$("#ff").val()!=""){
        let date = new Date();
        let fech = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0') ;
      $.ajax({
          beforeSend: function(){
             $("#data").html("Buscando Facturas, un momento...");
           },
          
          url: 'Listar_Report_Facturas_EmitidasCompras.php',
          type: 'POST',
          data: 'fechai='+fech+
          '&fechaf='+fech+
          '&sed='+1,
          success: function(x){
            $("#lista_Repor_Consumo").html(x);
            $('#Tabla_factu').DataTable(); 

          },
          error: function(jqXHR,estado,error){
            alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
            $("#tbpr1").hmtl(estado+"     "+error);
           }
         });
         }else{
          alertify.error("Selecciona un rango de fechas para poder continuar...!");
    }
    })
    }
  /*******************************************************************************/

  
  /******************************* Reporte de Facturas**************************************/


  function  ReportedeCotizacionesdeVentas(){
    $(document).ready(function(){
      if($("#fi").val()!=""||$("#ff").val()!=""){
      $.ajax({
          beforeSend: function(){
             $("#data").html("Buscando Facturas, un momento...");
           },
          
          url: 'Listar_Report_Cotizaciones_de_Ventas.php',
          type: 'POST',
          data: 'fechai='+$("#fi").val()+
          '&fechaf='+$("#ff").val()+
          '&sed='+$("#sed option:selected").val(),
        
          success: function(data2){
             
    
          $("#lista_Repor_Consumo").html(data2);
             $('#Tabla_factu').DataTable(); 
             
          },
          error: function(jqXHR,estado,error){
            alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
            $("#Tabla_factu").hmtl(estado+"     "+error);
           }
         });
         }else{
          alertify.error("Selecciona un rango de fechas para poder continuar...!");
    }
    })
    }
  /*******************************************************************************/

  /******************************* Reporte de Facturas**************************************/


  function  ReportedeCotizacionesdeVentasLoad(){
    $(document).ready(function(){
      if($("#fi").val()!=""||$("#ff").val()!=""){

        
  let date = new Date();
  let fech = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0') ;
      $.ajax({
          beforeSend: function(){
             $("#data").html("Buscando Facturas, un momento...");
           },
          
          url: 'Listar_Report_Cotizaciones_de_Ventas.php',
          type: 'POST',
          data: 'fechai='+fech+
          '&fechaf='+fech+
          '&sed='+1,
        
          success: function(data2){
             
    
          $("#lista_Repor_Consumo").html(data2);
             $('#Tabla_factu').DataTable(); 
             
          },
          error: function(jqXHR,estado,error){
            alert("Hubor un error al buscar el reporte de consumos...por favor reporte a soporte...!");
            $("#Tabla_factu").hmtl(estado+"     "+error);
           }
         });
         }else{
          alertify.error("Selecciona un rango de fechas para poder continuar...!");
    }
    })
    }
  /*******************************************************************************/

  /*****************************************************************
GC Muestra Detalle Facturas de Ventas
************/
function muestra_detalle_facturas_de_compras(num_ticket){
  var tic=num_ticket.split("|");
  $("#modal_detalle_venta").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#detalle_de_venta").html("Consultando detalle de facturas...");
                         },
                         url: 'consulta_detalle_facturas_de_compras.php',
                         type: 'POST',
                         data: 'serie='+tic[0]+'&numero='+tic[1],
                         success: function(x){
                           $(".nuticket").html("");
             $("#idpedido").val(tic[0]);
                           $(".nuticket").append("Detalle de Facturas | <span class='label' style='background-color: royalblue'>#: "+tic[0]+"</span>");
                           $("#detalle_de_venta").html(x);
               
                 var idpedido='';
 idpedido=tic[0];
              
                          },
                         error: function(jqXHR,estado,error){
                           $("#detalle_de_venta").html('Hubo un error: '+estado+' '+error);
                         }
                      });
 }
 /**********************************************************************************/

   /*****************************************************************
GC Muestra Detalle Cotizaciones de Ventas
************/
function muestra_detalle_cotizaciones_de_ventas(num_ticket){
  var tic=num_ticket.split("|");
  $("#modal_detalle_venta").modal({
                     show:true,
                     backdrop: 'static',
                     keyboard: false
                   });
                      $.ajax({
                         beforeSend: function(){
                           $("#detalle_de_venta").html("Consultando detalle de Cotizacion...");
                         },
                         url: 'consulta_detalle_cotizacion_de_venta.php',
                         type: 'POST',
                         data: 'serie='+tic[0]+'&numero='+tic[1],
                         success: function(x){
                           $(".nuticket").html("");
             $("#idpedido").val(tic[0]);
                           $(".nuticket").append("Detalle de Cotizacion | <span class='label' style='background-color: royalblue'>#: "+tic[0]+"</span>");
                           $("#detalle_de_venta").html(x);
               
                 var idpedido='';
 idpedido=tic[0];
              
                          },
                         error: function(jqXHR,estado,error){
                           $("#detalle_de_venta").html('Hubo un error: '+estado+' '+error);
                         }
                      });
 }
 /**********************************************************************************/