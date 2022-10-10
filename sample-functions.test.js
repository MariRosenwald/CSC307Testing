const myFunctions = require("./sample-functions.js");

test("Testing create -- success", () => {

  const target = {};
  const result = Object.create(myFunctions.port);
  expect(target).toStrictEqual(result);


});

test("Testing empty -- success", () => {

  const target = true;
  const result = myFunctions.isEmpty();
  expect(target).toStrictEqual(result);

  myFunctions.port['ports'] = [{ ticker : 'a', shares : 1, }, ] ; 
  const result2 = myFunctions.isEmpty();
  expect(false).toStrictEqual(result2);

  myFunctions.port['ports'] = [{ ticker : 'a', shares : 0, }, ] ; 
  const result3 = myFunctions.isEmpty();
  expect(true).toStrictEqual(result3);

  myFunctions.port['ports'] = [{ ticker : 'a', shares : 1, }, 
  { ticker : 'b', shares : 2, }, ] ; 
  const result4 = myFunctions.isEmpty();
  expect(false).toStrictEqual(result4);
});

test("Testing unique -- success", () => {

  myFunctions.port['ports'] = [{ ticker : Symbol(), shares : 0, }, ] ; 
  const target = 0;
  const result = myFunctions.uniqueCount();
  expect(target).toBe(result);

  myFunctions.port['ports'] = [{ ticker : 'a', shares : 1, }, 
  { ticker : 'b', shares : 2, }, 
  { ticker : 'c', shares : 2, },] ; 
  const result2 = myFunctions.uniqueCount();
  expect(3).toBe(result2);

  //assume based on add case this won't happen 
  // myFunctions.port['ports'] = [{ ticker : 'a', shares : 1, }, 
  // { ticker : 'b', shares : 2, }, 
  // { ticker : 'c', shares : 2, },
  // { ticker : 'c', shares : 2, },
  // { ticker : 'd', shares : 2, },] ; 

  myFunctions.port['ports'] = [{ ticker : 'a', shares : 1, }, 
  { ticker : 'b', shares : 2, }, 
  { ticker : 'c', shares : 2, },
  { ticker : 'd', shares : 2, },] ; 
  const result3 = myFunctions.uniqueCount();
  expect(4).toBe(result3);
});

test("Testing add -- success", () => {
  myFunctions.port['ports'] = [{ ticker : Symbol(), shares : 0, }, ] ; 
  myFunctions.addTicker('a', 8); 
  const target = [{ ticker : 'a', shares : 8, },];
  expect(target).toStrictEqual(myFunctions.port['ports']); 

  myFunctions.addTicker('a', 8); 
  myFunctions.addTicker('b', 2); 
  myFunctions.addTicker('c', 3); 
  myFunctions.addTicker('a', 5); 

  const target2 = [{ ticker : 'a', shares : 5, }, 
  { ticker : 'b', shares : 2, }, 
  { ticker : 'c', shares : 3, },] ;
  expect(target2).toStrictEqual(myFunctions.port['ports']); 

});

test("Testing scale -- success", () => {
  myFunctions.port['ports'] = [{ ticker : 'a', shares : 8, }, ] ; 
  myFunctions.scale('a', 5); 
  const target = [{ ticker : 'a', shares : 3, },];
  expect(target).toStrictEqual(myFunctions.port['ports']); 

  myFunctions.addTicker('a', 8); 
  myFunctions.addTicker('b', 2); 
  myFunctions.addTicker('c', 3); 
  myFunctions.addTicker('a', 5); 

  myFunctions.scale('b', 1); 
  myFunctions.scale('c', 2); 

  const target2 = [{ ticker : 'a', shares : 5, }, 
  { ticker : 'b', shares : 1, }, 
  { ticker : 'c', shares : 1, },] ;
  expect(target2).toStrictEqual(myFunctions.port['ports']); 

  const target3 = [ { ticker : 'b', shares : 1, }, 
  { ticker : 'c', shares : 1, },] ;
  myFunctions.scale('a', 5); 
  expect(target3).toStrictEqual(myFunctions.port['ports']); 

  myFunctions.addTicker('a', 5); 

  const target4 = [{ ticker : 'b', shares : 1, }, 
  { ticker : 'c', shares : 1, },
  { ticker : 'a', shares : 5, },] ;

  // console.log(myFunctions.port);
  
  // const t = () => {
  //   throw new ErrorEvent('ShareSaleException'); 
  // }

  // expect(t).toThrow(myFunctions.scale('a', 6)); 
  expect(target4).toStrictEqual(myFunctions.port['ports']); 

});

test("Testing numShares -- success", () => {
  myFunctions.port['ports'] = [{ ticker : 'a', shares : 8, }, ] ; 
  const ex = myFunctions.numShares('a'); 
  expect(8).toStrictEqual(ex); 

  myFunctions.addTicker('a', 8); 
  myFunctions.addTicker('b', 2); 
  myFunctions.addTicker('c', 3); 
  myFunctions.addTicker('a', 5); 

  const target2 = myFunctions.numShares('a')
  expect(target2).toStrictEqual(5); 

  const target3 = myFunctions.numShares('b')
  expect(target3).toStrictEqual(2); 

  const target4 = myFunctions.numShares('c')
  expect(target4).toStrictEqual(3); 

  const target5 = myFunctions.numShares('d')
  expect(target5).toStrictEqual(0); 

});





