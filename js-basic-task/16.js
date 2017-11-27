function regGolf () {
  "use strict";

  let str = `how delicious, spacious room, ruinous, consciousness`;

  let regCarCat = /ca[rt]/gi;
  let regPopProp = /pr?op/gi;
  let regFerretFerryFerrari = /ferr(et|y|ari)/gi;
  let regWordIous = /\w+(ious)(?=\W)/gi;
  let spaceDotCommaColonSemicolon = /\s[.,:;]/gi;
  let moreSixLetters = /\w{7,}/gi;
  let noEsWords = /\b[^e\W\d]+\b/gi;

  let result = str.match(regWordIous);
  console.log(result);
}

regGolf();