export const userService = {
  login,
  logout,
  register
};

async function login(username, pwd) {
  return fetch(`http://localhost:3000/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: username,
      password: pwd,
    }),
  }).then(handleResponse)
    .then((user) => {
      if (user.auth_token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

async function register(email, name, pwd) {
  return fetch(`http://localhost:3000/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: pwd,
    }),
  }).then(handleResponse)
    .then((user) => {
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}


function handleResponse(response) {
  return response.text()
    .then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
        }
      }

      return data;
    });
}
