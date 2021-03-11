var isValidBrackets = function (s) {
  var arr = [];
  var len = s.length;
  if (len % 2) return false
  for (var i = 0; i < len; i++) {
    var str = s[i];
    switch (str) {
      case "(": {
        arr.push(str)
        break;
      }
      case "[": {
        arr.push(str)
        break;
      }
      case "{": {
        arr.push(str)
        break;
      }
      case ")": {
        if (arr.pop() !== "(") return false
        break;
      }
      case "]": {
        if (arr.pop() !== "[") return false
        break;
      }
      case "}": {
        if (arr.pop() !== "{") return false
        break;
      }
    }
  }
  return !arr.length
};