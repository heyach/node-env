var countBinarySubstrings = function (s) {
  let splits = [],
      ans = 0,
      l = 0,
      len = s.length;
  for(let i = 0;i < s.length;i++){
    while(l < len){
      // 取遍历到的位置的首位找与之相同的
      let t = s[l];
      let count = 0;
      while(l < len && s[l] == t){
        l++;
        count++
      }
      splits.push(count)
    }
  }
  let len2 = splits.length;
  for(let i = 1;i < len2;i++){
    ans += Math.min(splits[i], splits[i - 1]);
  }
  return ans;
};