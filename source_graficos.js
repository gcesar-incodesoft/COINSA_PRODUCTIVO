/*************************************************************************************/

function genera_graficos(){
 $(document).ready(function(){

        var jsonData = $.ajax({
          url: "genera_array_graficos_ventas_pais.php",
          dataType: "json",
          async: false
          }).responseText;
 // console.log(jsonData);
   var data = new google.visualization.DataTable(jsonData);

      var options = {
        title: "VENTAS",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
         is3D: true,
      };

  

 var chart = new google.visualization.ColumnChart(document.getElementById("line-chart-ventas"));
      chart.draw(data, options);
        var table = new google.visualization.Table(document.getElementById('table_div'));
var formatter = new google.visualization.BarFormat({width: 120});
formatter.format(data, 1); // Apply formatter to second column
  table.draw(data, {allowHtml: true,showRowNumber: true, width: '100%', height: '100%'});




           
       });

   }













function genera_graficos22(){
 $(document).ready(function(){

        var jsonData = $.ajax({
          url: "genera_array_graficos_ventas_pais.php",
          dataType: "json",
          async: false
          }).responseText;
 // console.log(jsonData);
   var data = new google.visualization.DataTable(jsonData);

    var options = {
      title: 'Ventas totales',
               'width': '100%',
               'height': 250,
               chartArea: {'width': '100%', 'height': '100%'},
          is3D: true,
        };

     var chart = new google.visualization.PieChart(document.getElementById('line-chart-ventas2'));
        chart.draw(data, options);


        var table = new google.visualization.Table(document.getElementById('table_div'));
var formatter = new google.visualization.BarFormat({width: 120});
formatter.format(data, 1); // Apply formatter to second column
  table.draw(data, {allowHtml: true,showRowNumber: true, width: '100%', height: '100%'});




           
       });

   }
function genera_graficos2(){
 $(document).ready(function(){

        var jsonData = $.ajax({
          url: "genera_array_graficos.php",
          dataType: "json",
          async: false
          }).responseText;
 // console.log(jsonData);
   var data = new google.visualization.DataTable(jsonData);

    var options = {
     
               'width': '100%',
               'height': 250,
               chartArea: {'width': '100%', 'height': '100%'},
          is3D: true,
        };

     var chart = new google.visualization.PieChart(document.getElementById('line-chart-ventas2'));
        chart.draw(data, options);

           
       });
   }




