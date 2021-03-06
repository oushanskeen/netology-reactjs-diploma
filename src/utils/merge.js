const assert = require("./assert");

const pooliIN = [
  { id: 1, quantity: 10 },
  { id: 1, quantity: 20 },
  { id: 2, quantity: 100 },
  { id: 2, quantity: 200 }
];
const poolOUT = [
  { id: 1, quantity: 30 },
  { id: 2, quantity: 300 }
];
const lifeExampleIN = [
  { id: "24", quantity: 1, size: "14 US", price: 2500 },
  { id: "24", quantity: 1, size: "14 US", price: 2500 },
  { id: "25", quantity: 1, size: "15 US", price: 3000 },
  { id: "25", quantity: 2, size: "15 US", price: 3000 }
];
const lifeExampleOUT = [
  { id: "24", quantity: 2, size: "14 US", price: 5000 },
  { id: "25", quantity: 3, size: "15 US", price: 6000 }
];

const mergeTheShopItems = (objects, key="quantity") => {
  const extractKeys = (objects, key) => objects.map(({ id }) => id);
  const extractSizeKeys = (objects, key) => objects.map(({ size }) => size);
/*
  assert(
    `GIVEN: ${JSON.stringify(pooliIN)}, THEN `,
    extractKeys(lifeExampleIN),
    ["24", "24", "25", "25"]
  );
*/
  const countUniqKeys = (arr, acc) =>
    arr.length === 0
      ? acc
      : acc[acc.length - 1] === arr[0]
      ? countUniqKeys(arr.slice(1), acc)
      : countUniqKeys(arr.slice(1), acc.concat(arr[0]));
/*
  assert("GIVEN: ([1,1,2],[]), THEN ", countUniqKeys([1, 1, 2], []), [1, 2]);
*/
  const reduceArrays = pool => {
    const out = pool.map((a, b) => a + b, [0, 0]);
    return out;
  };
  /*
  assert(
    "GIVEN: [[1,100],[2,200]], THEN",
    reduceArrays([
      [1, 100],
      [2, 200]
    ]),
    [3, 300]
  );
  */
  const groupByKey = (pool, uniqueKeys) => {
    console.log("POOL: ", pool);
    console.log("Unique Keys: ", uniqueKeys);
    const out = uniqueKeys.map(key =>
      pool
        .filter(({ id }) => id === key)
        .map(({ quantity, price }) => [quantity, price])
    );
    //const out2 = out.map(x => x.reduce((sum,cur) => ,0)
    //console.log("groupByKey out: ", out);
    return out;
  };
  /*
  assert(
    `GIVEN: ${JSON.stringify(lifeExampleIN)}, THEN`,
    groupByKey(lifeExampleIN, [1, 2]),
    [
      [10, 20],
      [100, 200]
    ]
  );
*/
  const zip = (x) => {
    console.log("zip IN: ", x);
    const out = x.reduce((a,b) => {
      //console.log("a: ", a); 
      return [a[0] + b[0],a[1] + b[1]]
    },[0,0]);
    //console.log(`WHEN zip on ${x} THEN: `, out);
    return out;
  }
  /*
  assert("GIVEN ", 
    zip([[10,20],[100,200]]),
    [110,220]
  );
*/

  const reduceAsAKing = pool => {
    console.log("reduceAsAKing pool: ", pool);
    const out = pool.map(element => {
      console.log("Element IN: ", element);
      const out =  zip(element);
      console.log("Element OUT: ", out);
      return out;
    });
    return out;
  }
  /*
  assert(
    "GIVEN: [[10,20],[100,200]], THEN",
    reduceAsAKing([
      [10, 20],
      [100, 200]
    ]),
    [30, 300]
  );
  */

const mergeBack = (values, keys, sizes) => {
   // console.log("Values: ", values);
   // console.log("Keys: ", keys);
    const out = keys.map((key,index) => 
     // [
        ({
          id:key,
          quantity:values[index][0],
          size:
              countUniqKeys(
              extractSizeKeys(objects)
              .map(x => x.split(" ")[0]),[]
             )[index] + " US"
            //),
          ,
          price: values[index][1]})
//        {id:'25',quantity:3,size:"15 US", price: 6000}
     // ]
    );
    return out;
    /*
    return (
      keys.map((index, key) => (
        { 
          id: index, 
          quantity: values[key],
          size: "15 US",
          price: 1000000 
        }))
    );
    */
  };
  /*
  assert("GIVEN: [[2,5000],[3,6000]],['24','25'], THEN",
    mergeBack([[2,5000],[3,6000]],['24','25']),
      [
        {id:'24',quantity:2,size:"15 US", price: 5000},
        {id:'25',quantity:3,size:"15 US", price: 6000}
      ]
  )
*/

  //console.log("EXTRACT SIZES: ", extractSizeKeys(objects));
  const $ = {

    // IN: lifeExampleIN => ["24","24","25","25"]
    extractKeys: () => extractKeys(objects),
    // IN: ["24","24","25","25"]
    //=> OUT: ["24","25"]
    countUniqKeys: () => countUniqKeys($.extractKeys(), []),

    // IN: lifeExampleIN 
    // => OUT: [[[1,2500],[1,2500]],[[1,3000],[2,3000]]]
    groupByKey: () => groupByKey(objects, $.countUniqKeys()),

    // IN: [[[1,2500],[1,2500]],[[1,3000],[2,3000]]]
    // OUT: [[2,5000],[3,6000]]
    reduceAsAKing: () => reduceAsAKing($.groupByKey()),

    // IN: [[2,5000],[3,6000]],['24','25'] 
    // => OUT: 
    //  [
    //    {id:'24',quantity:2,size:"15 US", price: 5000},
    //    {id:'25',quantity:3,size:"15 US", price: 6000}
    //  ]
    mergeBack: () => mergeBack(/*objects,*/ $.reduceAsAKing(), $.countUniqKeys(), extractSizeKeys(objects))
  };
  //return $.extractKeys();
  return $.mergeBack();
};
//assert("MAJOR OUTPUT", fpool(pooliIN, "quantity"), poolOUT);
/*
assert("MAJOR OUTPUT", mergeTheShopItems(lifeExampleIN), lifeExampleOUT);
*/
module.exports = mergeTheShopItems;
