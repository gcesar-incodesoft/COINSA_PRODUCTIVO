function initMap() {
  var center = { lat: -12.056809, lng: -77.038607 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: center
  });

  // Creamos el servicio de direcciones
  var directionsService = new google.maps.DirectionsService();

  fetch('lista_coordenadas_mapa.php')
    .then(response => response.json())
    .then(coordenadas => {

      coordenadas.forEach(coord => {
        var coordInicio = coord.inicio.split(', ');
        var coordLlegada = coord.llegada.split(', ');

        var start = { lat: parseFloat(coordInicio[0]), lng: parseFloat(coordInicio[1]) };
        var end = { lat: parseFloat(coordLlegada[0]), lng: parseFloat(coordLlegada[1]) };

        // Definir el ícono personalizado para los puntos de inicio y llegada
        var pointIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 13, // tamaño del círculo
          fillColor: '#47a1ff', // color de relleno
          fillOpacity: 2,
          strokeColor: '#7fcaff', // color del borde
          strokeWeight: 4
        };

        var directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true
        });
        directionsRenderer.setMap(map);

        // Solicitar la ruta entre los dos puntos
        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        };

        // Llamar al servicio de direcciones para obtener la ruta
        directionsService.route(request, function (result, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            // Dibujar la ruta en el mapa, sin los íconos de ubicación
            directionsRenderer.setDirections(result);
          } else {
            console.error("Error al calcular la ruta: " + status);
          }
        });

        // Crear el marcador personalizado para el punto de inicio
        var marcadorInicio = new google.maps.Marker({
          position: start,
          map: map,
          icon: pointIcon,
          title: 'Punto de Inicio'
        });

        // Crear el marcador personalizado para el punto de llegada
        var marcadorLlegada = new google.maps.Marker({
          position: end,
          map: map,
          icon: pointIcon,
          title: 'Punto de Llegada'
        });

        // Añadir animación a los marcadores después de que se haya dibujado la ruta
        google.maps.event.addListener(directionsRenderer, 'directions_changed', function () {
          animateMarker(marcadorInicio);
          animateMarker(marcadorLlegada);
        });

        // Función para animar los marcadores con un efecto de entrada
        function animateMarker(marker) {
          // Establecer una animación de escala y desvanecimiento con CSS
          marker.setAnimation(null); // Detener cualquier animación previa

          // Para aplicar la animación de entrada con un "zoom-in"
          var markerElement = marker.getIcon();

          // Añadir clase de animación al marcador
          var animationClass = 'marker-animate';
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#47a1ff',
            fillOpacity: 2,
            strokeColor: '#7fcaff',
            strokeWeight: 4
          });

          // Usar un "setTimeout" para simular un tiempo de animación
          setTimeout(function () {
            markerElement.style.animation = 'scale-up 1s ease-out';
          }, 2000);

          // Simular un "bounce" si es necesario.
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        // Mostrar un tooltip con más información al hacer clic en los marcadores
        var infoWindow = new google.maps.InfoWindow();

        marcadorInicio.addListener('click', function () {
          infoWindow.setContent(`
            <div>
              <strong>Nombre Ruta:</strong> ${coord.nombre_ruta}<br>
              <strong>Punto de Inicio:</strong> ${coord.inicio}<br>
              <strong>Fecha de Creación:</strong> ${coord.fecha_creacion}<br>
              <strong>Hora de Creación:</strong> ${coord.hora_creacion}
            </div>
          `);
          infoWindow.open(map, marcadorInicio);
        });

        marcadorLlegada.addListener('click', function () {
          infoWindow.setContent(`
            <div>
              <strong>Nombre Ruta:</strong> ${coord.nombre_ruta}<br>
              <strong>Punto de Llegada:</strong> ${coord.llegada}<br>
              <strong>Fecha de Creación:</strong> ${coord.fecha_creacion}<br>
              <strong>Hora de Creación:</strong> ${coord.hora_creacion}
            </div>
          `);
          infoWindow.open(map, marcadorLlegada);
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar las coordenadas:', error);
    });
}
