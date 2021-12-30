export const login = (data: { username: string; password: string }) => {
  return fetch(`${import.meta.env.VITE_BASE_API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = () => Promise.resolve()
