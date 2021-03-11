
var minArray = function(numbers) {
  if(numbers.length <= 0){
    return false;
  }
  var tmp = numbers[0];
  for(var i = 0;i < numbers.length;i++){
    if(numbers[i] < tmp){
      tmp = numbers[i]
    }
  }
  return tmp;
};

var minArray2 = function(numbers) {
  if(numbers.length <= 0){
    return false;
  }
  if(numbers[0] < numbers[numbers.length - 1]){
    return numbers[0]
  }
  for(var i = 1;i < numbers.length;i++){
    if(numbers[i - 1] > numbers[i]){
      return numbers[i]
    }
  }
  return numbers[0]
};