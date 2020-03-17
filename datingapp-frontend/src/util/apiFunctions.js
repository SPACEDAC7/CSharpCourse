const host = 'https://localhost:44356/';

export async function logIn(username, password) {
  console.log('We are login with username: ', username ,' y paswword: ', password);
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
      localStorage.setItem('token', res.token);
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
  console.log("Registrar con el usuario: ", username, " y contrasenya: ", password);
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

export async function getUsers(){
  var url = host + 'api/users'; 
  const res = await fetch(url, {
    method: 'Get',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
  })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}

export async function getUserById(id){
  var url = host + 'api/users/' + id; 
  const res = await fetch(url, {
    method: 'Get',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
  })
    .then(response => response.json())
    .then(res => {
      console.log("Get user by id: ",res);
      return res;
    })
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}

export async function uploadFile(id, file){
  var url = host + 'api/users/' + id + '/photos'; 
  var formData = new FormData();
  formData.append('File', file[0][0]);
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
    body: formData
  })
    .then(response => response.json())
    .then(res => {
      console.log("Uploaded picture: ",res);
      return res;
    })
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}

export async function updateMainPicture(userId, photoId) {
  var url = host + 'api/users/' + userId + '/photos/' + photoId + '/setMain'; 
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
  })
    .then(response => response.json())
    .then(res => {
      console.log("Uploaded picture: ",res);
      return res;
    })
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}

export async function apiUpdateUser(id, username) {
  console.log("update user",username)
  var url = host + 'api/users/' + id;
  const res = await fetch(url, {
    method: 'Put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
    body: JSON.stringify({
      KnownAs: username.knownAs,
      Introduction: username.introduction,
      LookingFor: username.lookingFor,
      Interests: username.interests,
      City: username.city,
    })
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}