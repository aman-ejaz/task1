
const buildSearchQuery = (queryString, defaultOrderBy) => {
  let searchQuery = {
    attributes: {
      exclude: []
    },
    order: defaultOrderBy
  };

  if (queryString.filter) {
    addLimitAndOffset(queryString, searchQuery);
    addWhereCondition(queryString, searchQuery);
    addOrderBy(queryString, searchQuery);
    fieldsToSelect(queryString, searchQuery);
  }

  return searchQuery;
};

const addLimitAndOffset = (queryString, searchQuery) => {
  if (queryString.filter.limit) {
    validateLimitandOffset(searchQuery, queryString, 'limit');
  }
  if (queryString.filter.offset) {
    validateLimitandOffset(searchQuery, queryString, 'offset');
  }
};

const addOrderBy = (queryString, searchQuery) => {
  if (queryString.filter.order) {
    if (typeof queryString.filter.order == 'string' && validateOrderBy(queryString.filter.order.split(' ')) == true) {
      searchQuery.order = [queryString.filter.order.split(' ')];
    } else {
      throw new Error('Invalid order query');
    }
  }
};

const fieldsToSelect = (queryString, searchQuery) => {
  if (queryString.filter.fields) {
    let fieldsToSelect = []; //fields to select in query
    let fieldsToExclude = ['id']; //fields to exclude in query
    for (let field in queryString.filter.fields) {
      /* if value is false means field is not to be included else if it is passed it is to be included*/
      if (
        queryString.filter.fields.hasOwnProperty(field) &&
        queryString.filter.fields[field].toLowerCase() != 'false'
      ) {
        fieldsToSelect.push(field);
      } else if (queryString.filter.fields[field].toLowerCase() == 'false') {
        fieldsToExclude.push(field);
      }
    }

    if (fieldsToSelect.length > 0) {
      searchQuery.attributes = fieldsToSelect; // add attribute to search query
    }
    if (!searchQuery.attributes) {
      searchQuery.attributes = {};
    }
    searchQuery.attributes.exclude = fieldsToExclude;
  }
};

const addWhereCondition = (queryString, searchQuery) => {
  if (queryString.filter.where) {
    searchQuery.where = queryString.filter.where;
  }
};

const validateOrderBy = orderby => {
  let isError = false;

  if ((orderby.length == 2 && orderby[1].toUpperCase() == 'ASC') || orderby[1].toUpperCase() == 'DESC') {
    isError = true;
  }
  return isError;
};

const validateLimitandOffset = (searchQuery, queryString, type) => {
  searchQuery[type] = parseInt(queryString.filter[type]);
  if (isNaN(searchQuery[type])) {
    throw new Error(`Invalid ${type} in search string`);
  }
};

module.exports = { buildSearchQuery };