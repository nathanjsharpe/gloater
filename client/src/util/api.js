function api({ baseUrl = process.env.GLOATER_API_URL }) {
  let currentUrl = baseUrl;

  return {
    toString,
    gloats,
  }

  function toString() { return currentUrl; }

  function gloats() {
    currentUrl = `${currentUrl}/gloats`;
    return this;
  }
}

export default api;
