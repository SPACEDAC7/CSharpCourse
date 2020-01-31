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
        'Access-Controll-Allow-Origin':'*'
      },
    }).then(res => {
      console.log(res);
      return res.status === 200 ? res.json() : {}
    })
    .then(values => {
      console.log(values)
    });
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
  .then(res => res.json())
  .then(response => response.token);

  localStorage.setItem('token', res);

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
  console.log('we are going to register this user: ', username, password);
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
  .then(res => res.status)

  console.log("Response from registration: ", res);

  return res;
}