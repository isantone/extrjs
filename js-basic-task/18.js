function findJsNumbers () {
  let regEx = /(?:\D)\d+(?:\D)/gi;
  let str = `" 123"`;
  let result = str.match(regEx);
  console.log(result);
}
findJsNumbers();