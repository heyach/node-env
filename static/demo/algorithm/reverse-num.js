var reverse = function (x) {
  var f = false;
  if (x < 0) {
    f = true;
  }
  if (x > Math.pow(2, 31) - 1 || x < -Math.pow(31)) {
    return 0;
  }
  x = x.toString().split("");
  x.reverse();
  if (f) {
    return -parseInt(x.join("")) < -Math.pow(2, 31) ? 0 : -parseInt(x.join(""));
  }
  return parseInt(x.join("")) > Math.pow(2, 31) - 1 ? 0 : parseInt(x.join(""));
};

var reverse2 = function (x) {
  var r = 0;
  while(x != 0){
    var t = x % 10;
    r = r * 10 + t;
    x = parseInt(x / 10);
  }
  if(r > Math.pow(2, 31) - 1 || r < -Math.pow(2, 31)){
    return 0;
  }
  return r;
};