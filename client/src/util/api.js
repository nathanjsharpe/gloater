import store from 'Store';
import get from 'lodash.get';

const sendRequest = (url, { method = 'GET', headers = {}, body, state = {} }) =>
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(state, 'auth.token'),
      ...headers,
    },
    body,
  })
  .then(response => response.json().then(body => ({ body, response })));

function api(baseUrl =  process.env.GLOATER_API_URL, {
  state = store.getState(),
} = {}) {
  let currentUrl = baseUrl;

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

  function gloats(params = {}) {
    currentUrl = `${currentUrl}/gloats`;

    if (Object.keys(params).length > 0) {
      const queryParams = Object.keys(params)
        .map(param => `${param}=${params[param]}`)
        .join('&');
      currentUrl = `${currentUrl}?${queryParams}`
    }

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
    return sendRequest(currentUrl, { state });
  }

  function post(data) {
    return sendRequest(currentUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      state,
    });
  }
}

export default api;
