const host = 'https://localhost:44356/';

export function getValues() {
  console.log('we are going to call');
  var url = host + 'api/values';
  fetch(
    url,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Controll-Allow-Origin': '*'
      },
    }).then(res => {
      console.log(res);
      return res.status === 200 ? res.json() : {}
    })
    .then(values => {
      console.log(values)
    }).catch(error => console.log("Error - ", error));
}

export async function logIn(username, password) {
  console.log('we are going to login');
  var url = host + 'api/auth/login';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
    .then(res => {
        return res.json();
    })
    .catch(error => {
      console.log("Fallo - ", error)
      return {error : error};
    });

    console.log("TOKEN: ",res.token)
    console.log("RES: ",res)
    if(res.token !== undefined){
      localStorage.setItem('token', res);
    }

  return res;
}

export function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

export function logOut() {
  localStorage.removeItem('token');
  console.log("We are logged out");
}

export async function register(username, password) {
  var url = host + 'api/auth/register';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
    .then(res => {
      if (res.ok) {
        console.log("Respuesta correcta: ", res.json())
        return true;
      } else {
        return res.text().then(res => {
          console.log("ERROR REGISTRATION: ", res.json())
          return false;
        });
      }
    })
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}