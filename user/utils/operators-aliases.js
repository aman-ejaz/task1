const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  eq: Op.eq,
  neq: Op.ne,
  gte: Op.gte,
  gt: Op.gt,
  lte: Op.lte,
  lt: Op.lt,
  not: Op.not,
  in: Op.in,
  notIn: Op.notIn,
  is: Op.is,
  like: Op.like,
  notLike: Op.notLike,
  iLike: Op.iLike,
  notILike: Op.notILike,
  regexp: Op.regexp,
  notRegexp: Op.notRegexp,
  iRegexp: Op.iRegexp,
  notIRegexp: Op.notIRegexp,
  between: Op.between,
  notBetween: Op.notBetween,
  overlap: Op.overlap,
  contains: Op.contains,
  contained: Op.contained,
  and: Op.and,
  or: Op.or
};
exports.operatorsAliases = operatorsAliases;
