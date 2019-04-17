let defaultToken = null
try {
  if (localStorage.token) {
    defaultToken = localStorage.token
  }
} catch (e) {}

export default {
  token: defaultToken
}
