const sendRequest = (url, options = {}) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
  .then(resp => resp.json());

function api({ baseUrl } = {}) {
  let currentUrl = baseUrl || process.env.GLOATER_API_URL;

  return {
    toString,
    gloats,
    gloat,
    users,
    user,
    apiToken,
    get: get,
    post,
  }

  function toString() { return currentUrl; }

  function apiToken() {
    currentUrl = `${currentUrl}/api_token`;
    return this;
  }

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
    return sendRequest(currentUrl);
  }

  function post(data) {
    return sendRequest(currentUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export default api;
