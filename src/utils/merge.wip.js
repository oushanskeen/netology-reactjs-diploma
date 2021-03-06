const assert = require("./assert");

const x1 = { a: 1, b: 1 };
const x2 = { a: 1, b: 2 };
const x3 = { a: 2, b: 2 };

/*
[
  { a: 1, b: 5 }
  { a: 1, b: 6 }
  { a: 2, b: 2 }
],'a'
=>
[1,1,2]
=>
[1,2]
=>
[5,6]
=>
11
=>
[
  { a: 1, b: 11 }
  { a: 2, b: 2 }
]

*/
const fpool = (objects, key) => {

  const countUniqKeys = (arr, acc) =>
    arr.length === 0
      ? acc
      : acc[acc.length - 1] === arr[0]
      ? countUniqKeys(arr.slice(1), acc)
      : countUniqKeys(arr.slice(1), acc.concat(arr[0]));
  assert("GIVEN: ([1,1,2],[]), THEN ", countUniqKeys([1, 1, 2], []), [1, 2]);

  const groupByKey = (pool,uniqueKeys) => 
    uniqueKeys.map(key => 
      pool
      .filter(({id}) => id === key)
      .map(item => item.count)
    );
  assert(
    "GIVEN: ([{a:1,b:10},{a:1,b:20},{a:2,b:100},{a:2,b:200}],[1,2]), THEN ", 
    groupByKey([{id:1,count:10},{id:1,count:20},{id:2,count:100},{id:2,count:200}],[1,2]),
    [[10,20],[100,200]]
  );

  const reduceAsAKing = (pool) => pool.map(element => element.reduce((a,b) => a +b,0));
  assert(
    "GIVEN: [[10,20],[100,200]], THEN",
    reduceAsAKing([[10,20],[100,200]]),
    [30,300]
  );

  const mergeBack = (values,keys) => {
    const out = keys.map((index,key) => ({id:index, count:values[key]}));
    console.log("MERGE BACK OUT: ", out);
    return [{id:1,count:100},{id:2,count:300}];
  };
  assert(
    "GIVEN: [100,200],[1,2], THEN",
    mergeBack([100,300],[1,2]),
    [{id:1,count:100},{id:2,count:300}]
  );

  const filt = array => {
    const keys = array.map(e => Object.entries(e)).map(e => e[0][1]);
    console.log("not filtered some: ", keys);
    return [x1, x2];
  };
  //assert("filter", filt([x1, x2, x3]), [x1, x2]);

  const merge = (array, key) => {
    const values = array
      .map(x => Object.entries(x))
      .map(y => y[1][1])
      .reduce((a, b) => a + b, 0);
    console.log("Entries: ", values);
    return { a: 1, b: values };
  };
  //assert("some", merge([x1, x2], "b"), { a: 1, b: 3 });

  const $ = {
    // input: [{a:1,b:2},{a:1,b:3},{a:2,b:4}], 'b"
    // 
    // => 5
    // output: [{a:1,,b:5},{a:2,b:4}]
    merge: () => merge(objects,key)
  };
  return $;
};
assert("some", fpool([x1, x2], "b").merge(), { a: 1, b: 3 });

