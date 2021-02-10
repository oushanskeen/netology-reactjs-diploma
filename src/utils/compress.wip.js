
//
//
const f2 = (arr,acc) => { 
  console.log("arr in root", arr);
  console.log("acc in root",acc);
  return arr.length === 0 
    ? acc 
    : +acc.slice(-1)[0]=== +arr[0] 
      ? (() => {
          //console.log(`state 1 = arr: ${arr}, acc:${acc}`);
          //console.log(`state 1 = acc.slice(-1): ${acc.slice(-1)}`);
          //console.log(`state 1 = arr[0]: ${arr[0]}`);
          //console.log("arr", arr);
          //console.log("acc",acc);
          f2(arr.slice(1),[acc.slice(-1).concat(arr[0])])
        })()
      : (() => {
          //console.log(acc.slice(-1)); 
          //console.log(`state 2 = arr: ${arr}, acc:${acc}`);
          //console.log(`state 2 = acc.slice(-1): ${acc.slice(-1)}`);
          //console.log(`state 2 = arr[0]: ${arr[0]}`);
          //console.log("arr", arr);
          //console.log("acc", acc);
          f2(arr.slice(1),[...acc,arr[0]])
        })()
};
console.log(f2([1,1,2],[]));

//console.log(f2([1,1,2,2,2,3,3,3,3],[]));
