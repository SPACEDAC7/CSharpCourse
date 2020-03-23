const host = 'https://localhost:44356/';

function updateHeaders(response) {
  response.headers.forEach( (value, key) => {
    if(key === 'pagination'){
      var pagination = JSON.parse(value);

      localStorage.setItem("currentPage", pagination.currentPage);
      localStorage.setItem("itemsPerPage", pagination.itemsPerPage);
      localStorage.setItem("totalItems", pagination.totalItems);
      localStorage.setItem("totalPages", pagination.totalPages);
    }
  });
}

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

export async function register(username, password, gender, knownAs, dateOfBirth, city, country) {
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
      gender: gender,
      knownAs: knownAs,
      dateOfBirth: dateOfBirth,
      city: city,
      country: country
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

export async function getUsers(pageNumber = 1, pageSize = 5){
  var url = host + 'api/users?pageNumber='+ pageNumber +'&pageSize=' + pageSize; 
  const res = await fetch(url, {
    method: 'Get',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
  })
    .then(response => {
      updateHeaders(response);
      return response.json();
    })
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

export async function getFilteredUsers(minAge, maxAge, gender){
  var url = host + 'api/users?minAge='+ minAge +'&maxAge=' + maxAge +'&gender=' + gender; 
  const res = await fetch(url, {
    method: 'Get',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
  })
    .then(response => {
      updateHeaders(response);
      return response.json();
    })
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
      console.log("Update main photo picture: ",res);
      return res;
    })
    .catch(error => {
      console.log("Ellor - ", error);
      return false;
    });

  return res;
}

export async function deletePicture(userId, photoId) {
  var url = host + 'api/users/' + userId + '/photos/' + photoId; 
  const res = await fetch(url, {
    method: 'Delete',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') ,
    },
  })
    .then(response => response.json())
    .then(res => {
      console.log("Delete picture: ",res);
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