Servicio Tecnico:

El proyecto esta envuelto en un contenedor de docker para facilitar el desarrollo, para ejecutarlo primero se necesita crear un archivo .env con las variables de entorno determinadas.


Api:
NodeJs, expressJs, MongoDB.
Algunos de los paquetes utilizados: JWT, passport, bcryptjs, nodemailer, mongoose

Si bien el propósito principal es aprender tecnologías como docker, nginx, entre otras, también se le hizo mucho énfasis a que la app sea completa y funcione correctamente. 
  Para esto se tuvo que implementar lógica de manejo de usuarios, roles, envíos de mails de confirmación, restauración de contraseña, etc.
  Además, los datos de los "trabajos", o "tareas" se controlan mediante un CRUD que utiliza passport para verificar que el usuario que intenta realizar alguna acción, lo tenga permitido.
