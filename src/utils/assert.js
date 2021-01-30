const assert = (_statement, _function, _positiveOutcome) => {
  const out = 
    JSON.stringify(_function) === JSON.stringify(_positiveOutcome)
    ? `YES! It works, ooph!`
    : `NOPE! Something works WRONG!!!`;
  console.log(
  `
  -------------------------------------
         STATEMENT: ${_statement}
  POSITIVE OUTCOME: ${JSON.stringify(_positiveOutcome)}
       REAL OUTPUT: ${JSON.stringify(_function)}
       TEST REPORT: ${out}
  ------------------------------------
  `
  );
  return;
};

//export {assert};
module.exports = assert;
