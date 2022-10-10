
const port = {
  ports : 
  [
    {
    ticker : Symbol(), 
    shares : 0, }, 
  ]
}


  function addTicker(ticker, share){
    if(share > 0){
      if (port['ports'][0].shares == 0 && port['ports'].length == 1 ) {
        port['ports'][0].shares = share; 
        port['ports'][0].ticker = ticker; 
      } else{
        var change = false; 
        for(i = 0; i < port['ports'].length; i++){
          if(port['ports'][i].ticker == ticker){
            port['ports'][i].shares = share; 
            change = true;
          }
        }
        if(change == false){
          port['ports'].push({'ticker' : ticker, 'shares' : share});
        }
      }
      // console.log(port); 
  }
}

function scale (ticker, share) {
    for(i = 0; i < port['ports'].length; i++){
      if(port['ports'][i].ticker == ticker){
        port['ports'][i].shares -= share; 
        if(port['ports'][i].shares == 0){
          // console.log(i)
          port['ports'].splice(i, 1); 
        } else if(port['ports'][i].shares < 0){
            port['ports'][i].shares += share; 
            throw new Error("ShareSaleException");
            
        }
      }
    }
  }

  function numShares(ticker) {
    for(i = 0; i < port['ports'].length; i++){
      if(port['ports'][i].ticker == ticker){
        found = true; 
        return port['ports'][i].shares; 
      }
    }
    return 0; 
  }

function uniqueCount(){
  if (port['ports'][0].shares == 0){
    return 0; 
  } else{
    var count = 0; 
    for(i = 0; i < port['ports'].length; i++){
      if(port['ports'][i].shares != 0){
        count += 1;
      }
    }
    return count; 
  }
}

function isEmpty(){
  // console.log(port['ports']); 
  if (port['ports'][0].ticker == Symbol()) {
    return true; 
  }
  else {
    for(i = 0; i < port['ports'].length; i++){
      if(port['ports'][i].shares != 0){
        return false; 
      }
    }
    return true; 
  }
}

// function ShareSaleException(message){
//   const error = new Error(message); 
//   return error 
// }
     

exports.isEmpty = isEmpty;
exports.uniqueCount = uniqueCount;
exports.addTicker = addTicker;
exports.scale = scale;
exports.numShares = numShares;
// exports.ShareSaleException = ShareSaleException; 
exports.port = port; 
