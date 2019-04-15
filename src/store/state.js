let defaultToken = '上海'
try {
  if (localStorage.token) {
    defaultToken = localStorage.token
  }
} catch (e) {}

export default {
  token: defaultToken
}
