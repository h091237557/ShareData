/**
 * This method can select array objs enables keys 
 * Ex. [{"a":1,"b":1},{"a":1,"b":2}] ===> select b is enables keys
 * Ex. [{"a":1,"b":1},{"a":2,"b":2}] ===> select a,b is enables keys
 * @param {array} datas , array objs 
 * @returns {string} , return selected Key 
 */
function selectEnablesKeys(datas) {
  var hash = {},
    length = datas.length,
    keys = Object.keys(datas[0]),
    keyLength = keys.length,
    result = [];

  for (var j = 0; j < keyLength; j++) {
    if (!(typeof datas[0][keys[j]] === "number"))
      continue;

    hash = {};
    for (var i = 0; i < length; i++) {
      if (hash[datas[i][keys[j]]] > 0)
        break;

      hash[datas[i][keys[j]]] = 1;
      if (i === length - 1)
        result.push(keys[j]);
    }
  }

  return result;
}

module.exports = {
  "selectEnablesKeys": selectEnablesKeys
};
