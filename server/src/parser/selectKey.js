function selectKey(datas) {
  var hash = {},
    length = datas.length,
    keys = Object.keys(datas[0]),
    keyLength = keys.length,
    result;

  for (var j = 0; j < keyLength; j++) {
    if (!(typeof datas[0][keys[j]] === "number"))
      continue;

    hash = {};
    for (var i = 0; i < length; i++) {
      if (hash[datas[i][keys[j]]] > 0)
        break;

      hash[datas[i][keys[j]]] = 1;
      if (i === length - 1)
        result = keys[j];
    }
    if (result)
      break;
  }
  return result;
}
module.exports = {
  "selectKey": selectKey
};
