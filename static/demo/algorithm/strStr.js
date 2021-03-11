var strStr = function(haystack, needle) {
  if(needle.length == 0){
    return 0;
  }
  let i = 0, j = 0;
  let len = haystack.length;
  let len2 = needle.length;
  while(i < len && j < len2){
    if(needle[j] != haystack[i]){
      // 在不等的时候重置j，重导向i的位置
      if(j == 0){
        i++;
      }else{
        // 往前回滚相等的部分，否则会漏掉错位的部分
        i = i - j + 1;
      }
      j = 0;
    }else{
      i++;
      j++;
    }
  }
  if(j != len2){
    // 此时未完全匹配到needle
    return -1;
  }else{
    // 计算首位index
    return i - j;
  }
};
var r = strStr("mississippi", "issip");
console.log(r,22)
