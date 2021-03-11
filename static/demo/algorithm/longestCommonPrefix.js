var longestCommonPrefix = function(strs) {
  var res = "";
  var flag = true;
  if(strs.length == 0){
    return res;
  }
  for(var i = 0;i < strs[0].length;i++){
    for(var j = 0;j < strs.length;j++){
      if(strs[j][i] != strs[0][i]){
        flag = false;
      }
    }
    if(flag){
      res += strs[0][i];
    }
  }
  return res;
};