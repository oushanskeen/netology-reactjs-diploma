
//
//
const f2 = (arr,acc) => { 
  console.log("arr in root", arr);
  console.log("acc in root",acc);
  return arr.length === 0 
    ? acc 
    : +acc.slice(-1)[0]=== +arr[0] 
      ? f2(arr.slice(1),[acc.slice(-1)[0].concat(arr[0])])
      : f2(arr.slice(1),[...acc,[arr[0]]])
};
console.log(f2([1],[])); // [[1]]
console.log(f2([1,2],[])); // [[1],[2]]
console.log(f2([1,1,2],[])); // [[1],[2]]
//console.log(f2([1,2,3],[])); // [[1],[2],[3]]
//console.log(f2([1,1,2,3],[])); // [[1,1],[2],[3]]
console.log(f2([1,1,1,2,3],[])); // [[1,1],[2],[3]]
//console.log(f2([1,2,2],[]));
//(f2([1,1,2,2,2,3,3,3,3],[]));
