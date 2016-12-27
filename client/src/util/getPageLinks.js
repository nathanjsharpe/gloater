const getLink = (linkHeader, rel) => {
  const result = linkHeader.match(new RegExp(`<([^>]+)> rel="${rel}"`));
  return result && result.length > 1 && result[1];
}

const getPageLinks = response => {
  const linkHeader = response.headers.get('Link');
  return ['prev', 'next', 'last', 'first']
    .reduce((result, rel) => ({ ...result, [rel]: getLink(linkHeader, rel) }), {});
};

export {
  getLink,
};

export default getPageLinks;
