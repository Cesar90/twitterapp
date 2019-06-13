export function getLocalStorageData() {

  let columns = JSON.parse(localStorage.getItem("columnsPositions"));
  let numberTwittes = parseInt(localStorage.getItem("numberTwittes"));

  if(!numberTwittes){
      numberTwittes = 30;
  }

  if(!columns){
      columns = [
        {position:"First",name:"Versaagency"},
        {position:"Second",name:"RainAgency"},
        {position:"Third",name:"Alexadevs"}];
  }

  return { numberTwittes, columns }
}