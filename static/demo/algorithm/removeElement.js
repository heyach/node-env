var removeElement = function (nums, val) {
  var len = nums.length;
  var repeatCount = 0;
  for(var i = 0;i < len;i++){
    if(nums[i] != val){
      nums[i - repeatCount] = nums[i]
    }else{
      repeatCount++;
    }
  }
  return len - repeatCount;
};