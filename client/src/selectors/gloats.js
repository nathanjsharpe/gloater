import get from 'lodash.get';

const getGloatsByFilter = (state, filter) => {
  const ids = get(state, ['byFilter', filter, 'ids']) || [];
  return ids.map(id => state.byId[id]);
};

const getNextPageLinkByFilter = (state, filter) =>
  get(state, ['byFilter', filter, 'links', 'next']);

export {
  getGloatsByFilter,
  getNextPageLinkByFilter,
};
