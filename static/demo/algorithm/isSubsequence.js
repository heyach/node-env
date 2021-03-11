var isSubsequence = function(s, t) {
  var sLen = s.length;
  var tLen = t.length;
  var i = 0, j = 0;
  while(i < tLen){
    if(t[i] == s[j]){
      j++
    }
    i++;
  }
  console.log(i, j)
  if(i == tLen && j == sLen){
    return true;
  }else{
    return false;
  }
};

var isSubsequence2 = function(s, t) {
  var sLen = s.length;
  var tLen = t.length;
  var i = 0, j = 0;
  while(i < tLen && j < sLen){
    if(t[i] == s[j]){
      j++
    }
    i++;
  }
  return j == sLen;
};