var removeDuplicates = function(nums) {
  var len = nums.length;
  var count = 0;
  for(var i = 1;i < len;i++){
    if(nums[i] != nums[i - 1]){
      // 根据重复数字的记录，将未重复的值前移count位
      nums[i-count] = nums[i]
    }else{
      count++;
    }
  }
  return len - count;
};
var r = removeDuplicates([1,1,2,2,3,4,5])
console.log(r)