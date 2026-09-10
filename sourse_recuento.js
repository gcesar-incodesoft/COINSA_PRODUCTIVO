/*******************************************************************************************/
function pone_lista_recuento(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#pone_clientes").html("Recuperando proveedores...");
        },
        url: 'consulta_recuento_simple.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_scaneo5").html(x);
        },
        error: function(jqXHR,estado,error){}
        });
     });
     //setTimeout('location.reload()',2000); 
  }
  
function serie_recuento(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#pone_clientes").html("Recuperando proveedores...");
        },
        url: 'Insertar_Recuento_Serie.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#seriessxd").html(x);
          //console.log(x);
         // console.log(document.getElementById("seriessxd").innerText);
          var  serie = document.getElementById("seriessxd").innerText;
          serie2(serie);
          //pone_lista_recuento();
          console.log(serie);
        },
        error: function(jqXHR,estado,error){}
        });
        
     });
     
    }
    function serie2(serie) {
      var seriexd = serie;
      console.log(seriexd)
      $.post("consulta_recuento_simple.php", { series3:serie,},
      function(data1){
        $("#lista_scaneo5").html(data1);
        
      });
    }
    
  function Eliminar_Recuento_Simple(id,user){
      var id2= id;
      var user= user;
  
      alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){
  
      Eliminar_RecuentoS(id2,user);
      alertify.success('Eliminado') ;
  
  
  }, function(){ alertify.error('Cancelado')});
  //  var bool=confirm("Seguro de eliminar el dato?");
  } 
  /*******************************************************************************************/
  function Eliminar_Recuento_Usuario(id,user){
    var id2= id;
    var user= user;
  
    alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){
  
    Eliminar_RecuentoU(id2,user);
    alertify.success('Eliminado') ;
  
  
  }, function(){ alertify.error('Cancelado')});
  //  var bool=confirm("Seguro de eliminar el dato?");
  } 
  /*******************************************************************************************/
  function Eliminar_RecuentoS(id,user){
    var item= id;
   console.log(user);
    var user =user;
      
    $(document).ready(function() {  
  
      $.post("Eliminar_RecuentoSimp.php", 
        {item:item,user:user}, 
        function(data){
  
          $("#lista_scaneo6").html(data);
          $.post("consulta_recuento_simple.php", 
            {series3:user}, 
              function(data){
                console.log(data);
                $("#lista_scaneo5").html(data);
                      
              });
      }); 
          
    }) ;
  
  
  
  }
  /*******************************************************************************************/
  function Eliminar_RecuentoU(id,user){
    var item= id;
  
    var user =user;
      
    $(document).ready(function() {  
  
      $.post("Eliminar_Recuento_User.php", 
        {item:item,user:user}, 
        function(data){
  
       
         pone_lista_recuento_usuario()
        }); 
    }) ;
  
  
  
  }
  /*******************************************************************************************/
  
   ///detalle de Recuento Simple
  function Consultar_Recuento_Simple(id,user){
  
       var itemco= id;
       user= user;
  
      
  
       $itemglo=itemco;
       $userglo=user;
           
  
    
  
    $(document).ready(function() {
       $('#modal_CODIGOS').modal('show');
  
  
  
  $.post("Listar_Detalle_Recuento_Simple.php", {user:user,item:itemco}, 
        function(data){
  
     $("#lista_scaneo").html(data);
          }); 
     }) ;
  } 
  /*******************************************************************************************/
  function Consultar_Recuento_Usuario(id,user){
  
    var itemco= id;
    user= user;
  
   
  
    $itemglo=itemco;
    $userglo=user;
        
  
  
  
  $(document).ready(function() {
    $('#modal_Recuento').modal('show');
  
  
  
  $.post("Listar_Detalle_Recuento_Usuario.php", {user:user,item:itemco}, 
     function(data){
  
  $("#lista_scaneo2").html(data);
       }); 
  }) ;
  } 
  function Consultar_Recuento_nuevo(id){
  
    var itemco= id;
    
    $itemglo=itemco;
  
        
  
  
  
  $(document).ready(function() {
    
  
  $.post("consulta_recuento_nuevo", {item:itemco}, 
     function(data){
  
  $("#lista_scaneo2").html(data);
       }); 
  }) ;
  }
  /*******************************************************************************************/
  function pone_lista_recuento_modificar(id,user){
    var itemco= id;
    user= user;
    $itemglo=itemco;
    $userglo=user;
    $.post("Lista_Detalle_Recuento_Modificar.php", { item:itemco, user:user},
      function(data1){
        $("#lista_scaneo6").html(data1);
        console.log(data1)
      });
  }
  
  /*******************************************************************************************/
  function lista_Serie_Recuento(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#lista_Licen").html("Recuperando Licencias...");
      },
     url: 'Lista_Seri_Preguia.php',
     type: 'POST',
     data: null,
     success: function(x){
       $("#lista_Srie").html(x);
          $(".select2").select2();
      },
      error: function(jqXHR,estado,error){
      }
      });
     });
    } 
  /*******************************************************************************/
  function pone_lista_stock(){
          $.ajax({
           beforeSend: function(){
             $("#lista_lineas").html("Actualizando la lista de productos...");
            },
           url: 'lista_stock.php',
           type: 'POST',
           data: null,
           success: function(y){
             $("#lista_stock").html(y);
             $(document).ready(function() {
                  $('#tabla_de_stock').DataTable();
                   });
             },
           error: function(jqXHR,estado,error){
            }
          });
        }
  /*******************************************************************************/
  function Eliminar_Item_Recuento_Sim(id,value){
    var id2= id;
    var value2 = value;
  
    alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){
  
      Eliminar_Item_Recuento(id2,value2);
      alertify.success('Eliminado') ;
      
  
    }, function(){ alertify.error('Cancelado')});
    //  var bool=confirm("Seguro de eliminar el dato?");
  }
  //eliminnar registrros scaneados
  
  function Eliminar_Item_Recuento(id2,value2){
          var id3= id2;
          console.log(id2);
          console.log(value2);
          var serie3 =value2;
            
  $(document).ready(function() {
  
   
    $.post("Eliminar_Items_RecuentoSim.php", 
      {codebar:id3,item:value2}, 
      function(data){
  
       // $("#lista_scaneo6").html(data);
        serie3 =$('#seriessxd').text().trim();    
        $.post("consulta_recuento_simple.php", 
          {series3:serie3}, 
          function(data){
            //console.log(data);
            $("#lista_scaneo5").html(data);
                  
        });
        $.post("Listar_Detalle_Recuento_Simple.php", {user:value2,item:serie3}, 
          function(data){
  
          $("#lista_scaneo").html(data);
        }); 
     
   
                
    }); 
  
  
  }) ;
  
  
  
  }
  /**********************************************************************************/
  function pone_lista_recuento_usuario(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#pone_clientes").html("Recuperando proveedores...");
        },
        url: 'consulta_recuento_usuario.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_leidos2").html(x);
        },
        error: function(jqXHR,estado,error){}
        });
     });
    }
      /**********************************************************************************/
function datos_bb(item_code,descrip,almac){
    console.log(item_code);
    num= parseFloat(document.getElementById('material').getElementsByTagName('tr').length -1)
    real= parseFloat(num+1); 
    $("#material > tbody").append("<tr><td style='text-align: center;'><input type='checkbox' id='che' val='che'></td><td style='text-align:center'>"+item_code+"</td><td style='text-align:center'>"+descrip+"</td><td style='text-align:center'>"+almac+"</td><td style='text-align:center'><button class='btn btn-block btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i> Eliminar</button></td></tr>");
}
     //LISTA ALMACEN        
/////////////////////////
function lista_Almacenes(){
  $(document).ready(function() {
   $.ajax({
   beforeSend: function(){
     $("#lista_Almacen").html("Recuperando proveedores...");
    },
   url: 'Lista_Almacen_Despacho.php',
   type: 'POST',
   data: null,
   success: function(x){
     $("#lista_Almacen").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
  }