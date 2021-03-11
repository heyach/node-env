var isPalindrome = function (x) {
  var a = x.toString().split("");
  var a2 = [];
  a2 = a2.concat(a);
  a.reverse();
  if (a.join("") == a2.join("")) {
    return true;
  } else {
    return false;
  }
};

var isPalindrome2 = function (x) {
  if(x < 0){
    return false;
  }
  x = x.toString();
  for(var i = 0;i < x.length / 2;i++){
    if(x[i] != x[x.length - 1 - i]){
      return false
    }
  }
  return true;
};

var isPalindrome3 = function (x) {
  if(x < 0 || (x % 10 == 0) && x != 0){
    return false
  }
  let reverse = 0;
  while(x > reverse){
    reverse = reverse * 10 + x % 10;
    x = Math.floor(x / 10)
  }
  return x == reverse || x == Math.floor(reverse / 10);
};
isPalindrome(121)