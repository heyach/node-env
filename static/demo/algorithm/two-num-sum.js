var q = [2, 4, 7, 15];
var target = 9;
var twoSum = function (numbers, target) {
  for (var i = 0; i <= numbers.length; i++) {
    for (var j = 0; j <= numbers.length; j++) {
      if (numbers[i] + numbers[j] == target) {
        if (i < j) {
          return [i + 1, j + 1]
        }
      }
    }
  }
}
var res = twoSum(q, target)
console.log(111, res);


var twoSum2 = function (numbers, target) {
  var a = [];
  for (var i = 0; i < numbers.length; i++) {
    var tmp = target - numbers[i];
    a[numbers[i]] = i;
    if (a[tmp] != undefined) {
      return [a[tmp] + 1, i + 1];
    }
  }
}
var res2 = twoSum2(q, target);
console.log(222, res2)

var twoSum3 = function (numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    let tmp = target - numbers[i]
    let res = binarySearch(numbers, tmp)
    if (res != -1 && i != res) {
      return i < res ? [i + 1, res + 1] : [res + 1, i + 1]
    }
  }
  return []
}

const binarySearch = function (numbers, target) {
  let right = numbers.length
  let left = 0
  while (left <= right) {
    let mid = parseInt((left + right) / 2)
    if (numbers[mid] === target) {
      return mid
    } else if (numbers[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
};

var res3 = twoSum3(q, target);
console.log(333, res3)

var twoSum4 = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1]
    } else if (numbers[left] + numbers[right] > target) {
      right--
    } else {
      left++
    }
  }
}

var res4 = twoSum4(q, target);
console.log(444, res4)