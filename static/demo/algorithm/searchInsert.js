var searchInsert = function(nums, target) {
  var len = nums.length;
  for(var i = 0;i < len;i++){
    // 第一个小于target的即是插入位置
    if(target <= nums[i]){
      return i;
    }
  }
  // 否则插入到最后，nums长度会加1，所在位置为len
  return len;
};
console.log(searchInsert([1],0))