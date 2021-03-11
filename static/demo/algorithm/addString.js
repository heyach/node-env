var addStrings = function(num1, num2) {
  return StringToNum(num1) + StringToNum(num2) + "";
};
const StringToNum = (num) => {
  var n = 1;
  var res = 0;
  for(var i = num.length - 1;i >= 0;i--){
    res = res + num[i] * n;
    n *= 10;
    console.log(res)
  }
  return res;
}

const addStrings2 = (num1, num2) => {
  while (num1.length > num2.length){
    num2 = '0' + num2;
  }
  while (num1.length < num2.length){
    num1 = '0' + num1; 
  }
  let res = '';    
  let t = 0;   
  for (let i = num1.length - 1; i >= 0; i--) { 
    const sum = (+num1[i]) + (+num2[i]) + t;   
    res = sum % 10 + res;                      
    t = sum > 9 ? 1 : 0;
  }
  return t == 1 ? '1' + res : res;
};
