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
Status: 'ok' o 'failed'<br>
Data: ej 'User created'<br>

<h2>/user/login:</h2>

Recibirá por body:<br>
dni: Number <br>
password: String <br>
username: String <br>

Devuelve: <br>
Status 'ok' o 'failed'<br>
Data: ej 'User Loged In'<br>

<h2>/user/byUsername:</h2>

Recibirá por body: <br>
username: String<br>

Devuelve: <br>
{ <br>
  "status": "ok", <br>
  "data": { <br>
    "firstName": "Fuentes", <br>
    "lastName": "Facundo", <br>
    "email": "facufu@gmail.com", <br>
    "username": "FacuFu1", <br> <br>
    "dni": 16852479 <br>
  } <br>
} <br>

<h2>/transactions/new:</h2> 

Recibirá por body: <br>
amount: Float <br>
from: username del usuario que envía <br>
to: username del objectivo a enviar dinero <br>
description: algo bonito "Feliz cumple te envío 100 pesos" <br>
type: ['TRANSFER', 'CHARGE', 'REFUND'] <br>
branch: String <br>

Devuelve: <br>
{status: 'failed', data: error} <br>
o si salio bien <br>
devuelve la transacción completa <br>

<h2>/transactions</h2>

Recibirá por body: <br>
username: usuario del cual quieren ver las transacciones

Devuelve: <br>
{status: 'failed', data: error} <br>
o si salio bien <br>
las transacciones del usuario <br>
