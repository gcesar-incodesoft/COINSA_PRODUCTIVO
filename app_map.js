
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
  center: myLatLng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

function calcRoute() {
  $("#modal_detalle_ubicacion").modal("show");

  var from = document.getElementById("from").value.trim();
  var to = document.getElementById("to").value.trim();

  // console.log("Origen:", from);
  // console.log("Destino:", to);

  if (from === "" || to === "") {
    alert("Por favor ingrese tanto el origen como el destino.");
    return;
  }

  var request = {
    origin: from,
    destination: to,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  }

  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      const output = document.querySelector('#output');
      output.innerHTML = "<div> Origen: " + from + ".<br />Destino: " + to + ". <br /> Distancia Recorrida: " + result.routes[0].legs[0].distance.text + ".<br />Duracion Recorrido: " + result.routes[0].legs[0].duration.text + ". </div>";
      directionsDisplay.setDirections(result);
    } else {
      directionsDisplay.setDirections({ routes: [] });
      map.setCenter(myLatLng);
      output.innerHTML = "<div class='alert-danger'><i class='fa fa-exclamation-triangle'></i> Error de distancia. </div>";
    }
  });
}

var options = {
  types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
