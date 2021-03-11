var findMagicIndex = function(nums) {
  for(var i = 0;i < nums.length;i++){
    if(nums[i] == i){
      return i
    }
  }
  return -1;
};

var findMagicIndex2 = function(nums) {
  for(var i = 0;i < nums.length;i++){
    if(nums[i] == i){
      return i
    }
    if(nums[i] > i + 1){
      i = nums[i] - 1;
    }
  }
  return -1;
};