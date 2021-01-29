// export const BASE_URL = "https://auth.nomoreparties.co";
// export const BASE_URL = "http://api.kolenhen.students.nomoredomains.icu";

export const BASE_URL = "http://localhost:3000";

export const register = (data) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {

            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();                
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => console.log(err));
};

export const authorize = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: data.id,
            email: data.email,
            password: data.password            
        })
    })
        .then((res) => {
            return res.json();
        })
        // .then((data) => {
        //     if (data.token) {
        //         localStorage.setItem('jwt', data.token);
        //         return data;
        //     }
        // })
        .catch((err) => console.log(err));
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }