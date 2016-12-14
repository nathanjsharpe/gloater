function api({ baseUrl } = {}) {
  let currentUrl = baseUrl || process.env.GLOATER_API_URL;

  return {
    toString,
    gloats,
    gloat,
    users,
    user,
    get: get,
  }

  function toString() { return currentUrl; }

  function gloats() {
    currentUrl = `${currentUrl}/gloats`;
    return this;
  }

  function gloat(id) {
    currentUrl = `${currentUrl}/gloats/${id}`;
    return this;
  }

  function users() {
    currentUrl = `${currentUrl}/users`;
    return this;
  }

  function user(username) {
    currentUrl = `${currentUrl}/users/${username}`;
    return this;
  }

  function get() {
    return fetch(currentUrl)
    .then(resp => resp.json());
  }
}

export default api;
