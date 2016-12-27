const getGloatQueryParamsForFilter = filter => {
  switch(filter) {
    case 'popular':
      return { sort: 'popularity' };
    case 'stalked':
      return { stalked: true };
    case 'admired':
      return { admired: true };
    default:
      return {};
  }
}

export default getGloatQueryParamsForFilter;
