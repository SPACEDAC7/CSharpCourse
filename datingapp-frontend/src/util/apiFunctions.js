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

export async function Login(username, password) {
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
  });
  console.log(res);
  const values = await (res.status === 200 ? res.json() : {});
  console.log(values);
  return values;
}