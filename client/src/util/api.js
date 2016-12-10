function api({ baseUrl = process.env.GLOATER_API_URL }) {
  let currentUrl = baseUrl;

  return {
    toString,
    gloats,
    gloat,
    users,
    user,
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
}

export default api;
