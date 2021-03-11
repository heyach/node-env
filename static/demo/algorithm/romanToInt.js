var romanToInt = function (s) {
  var spec = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
  }
  var spec2 = [
    { key: "IV", value: 4 },
    { key: "IX", value: 9 },
    { key: "XL", value: 40 },
    { key: "XC", value: 90 },
    { key: "CD", value: 400 },
    { key: "CM", value: 900 },
  ]
  var c = 0;
  for (var i = 0; i < spec2.length; i++) {
    if (s.indexOf(spec2[i].key) != -1) {
      c += spec2[i].value;
      s = s.replace(spec2[i].key, "");
    }
  }
  for (var j = 0; j < s.length; j++) {
    c += spec[s[j]];
  }
  return c;
};