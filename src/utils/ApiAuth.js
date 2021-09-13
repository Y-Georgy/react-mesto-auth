class ApiAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.')
    }
  }

  register(dataAuth) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAuth),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject(`Пользователь с таким Email уже зарегистрирован!`)
      } else {
        return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.')
      }
    })
  }

  login(dataAuth) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAuth),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        return Promise.reject(`Пользователь с таким Email не найден или пароль введён не верно!`)
      } else {
        return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.')
      }
    })
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        return Promise.reject(`Токен не валиден`)
      } else {
        return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.')
      }
    })
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co',
})
