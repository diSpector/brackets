module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let strArr = str.split('');

  try {
    strArr.forEach(el => {
      let elArr = getPos(el, bracketsConfig); // в каком подмассиве находится символ строки
      let equalArr = (elArr[0] == elArr[1]); // одинаковы ли все элементы этого подмассива

      // работаем с пустым стеком
      if (stack.length == 0 && !equalArr){
          if (elArr.indexOf(el) == 1){ // закрывающий элемент 
              throw Error;
          } else { // открывающий элекмент
              stack.push(el);
              return;
          }
      } else if (stack.length == 0 && equalArr){ 
          stack.push(el);
          return;
      }

      // работаем с НЕпустым стеком
      let stackUpperEl = stack[stack.length - 1];

      if (stackUpperEl == el) {
        if (equalArr) {
          stack.pop();
          return;
        } else {
          stack.push(el);
          return;
        }
      } else {
        if (stackUpperEl == elArr[0] && el == elArr[1]) {
          stack.pop();
          return;
        } else if (el == elArr[1] && !equalArr) {
          throw Error;
        } else {
          stack.push(el)
          return;
        }
      }

    });
  } catch (Error) {
    return false;
  }

  return stack.length == 0;

  function getPos(char, bracketsConfig) { // возвращаем подмассив, в котором найден следующий подающийся на вход элемент
    let resArr = bracketsConfig.filter(el => {
      return el.indexOf(char) >= 0;
    });
    return resArr[0];
  }
}