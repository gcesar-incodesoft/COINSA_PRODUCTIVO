
$('#validausr').submit(function (e) {
  e.preventDefault();
  var usuario = $.trim($("#username").val());
  var pass = $.trim($("#Pass").val());
  if (usuario.length == "" || pass == "") {

    swal({

      title: "Debe ingresar un usuario o password",

      icon: "warning"
    });

    return false;
  } else {
    $.ajax({
      beforeSend: function () { },
      url: "valida_login.php",
      type: "POST",
      data: { usuario: usuario, pass: pass },
      success: function (data) {
        console.log(data);
        dat = parseInt(data);
        if (dat == 0) {
          swal(
            "Nombre o contraseña invalidos",
            "Por favor verifique sus datos " +
            usuario + " e intente nuevamente",
            "error"
          );
        } else {
          swal("¡Bienvenido!", "Sistema WEB - COINSA", "success");

          if (usuario === 'telev') {
            document.location.href = "Lista_Control_almacen.php";
            // setTimeout(() => {
            //   launchFullScreen();
            // }, 5000);

          } else {
            document.location.href = "inicio.php";
          }
        }
      },
    });

  }
});


// $(document).keydown(function (event) {
//   if (event.key === "Enter") {
//     launchFullScreen(); // Activar pantalla completa si presiona "Enter"
//   }
// });



// function launchFullScreen() {
//   var el = document.documentElement;
//   if (el.requestFullscreen) {
//     el.requestFullscreen();
//   } else if (el.mozRequestFullScreen) {
//     el.mozRequestFullScreen();
//   } else if (el.webkitRequestFullscreen) {
//     el.webkitRequestFullscreen();
//   } else if (el.msRequestFullscreen) {
//     el.msRequestFullscreen();
//   }
  
//   // Guardar en localStorage que debe mantenerse pantalla completa
//   localStorage.setItem("mantenerPantallaCompleta", "true");
// }
