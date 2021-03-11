const addString = (num1, num2) => {
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
var multiply = function(num1, num2) {
  if(num1 == "0" || num2 == "0"){
    return "0";
  }
  let len = num1.length;
  let len2 = num2.length;
  let carry = 0;
  let tmp = "";
  let res = [];
  for(let i = len2 - 1;i >= 0;i--){
    for(let j = len - 1;j >= 0;j--){
      let r = +num2[i] * +num1[j] + carry;
      carry = Math.floor(r / 10);
      let f = r % 10;
      tmp += f;
      if(j == 0 && carry != 0){
        tmp += carry;
      }
    }
    res.push(tmp.split("").reverse().join(""));
    tmp = "";
    carry = 0;
  }
  let len3 = res.length;
  let r = "";
  for(let i = 0;i < len3;i++){
    let c = "";
    for(let j = 0;j < i;j++){
      c += "0";
    }
    let d = res[i] + c;
    r = addString(r, d);
  }
  console.log(r)
};
multiply("5678","458")