# VBank
Value Bank<br>

Rutas que ofrece el back:

<h2>/user/register:</h2> 

Recibirá por body:<br>
lastName: String<br>
firstName: String<br>
email: String, se valida en el back<br>
username: String, debe contener mínimamente 6 caracteres, una mayúscula, un número y una minúscula<br>
password: String, se hashea en el back, debe contener mínimamente 6 caracteres, una mayúscula, un número y una minúscula<br>
dni: Number<br>

Devuelve: <br>
Status 200, 400
