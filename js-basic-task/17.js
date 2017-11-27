function replaceApostrophe() {
  "use strict";

  let book = `'Safe side!' repeated the captain, laughing. 'You'd guard against a sun-stroke, with that old hat, in an Ice Pack. Wa'al! What have you made out at the Post-office?'
'It is the Post-office, sir.'
'What's the Post-office?' said the captain.
'The name, sir. The name keeps the Post-office at 12 o'clock.'
'A coincidence's not here!' said the captain. 'A lucky bit! Show me where it is. Good-bye, shipmates, for the present! I shall come and have another look at you, afore I leave, this afternoon.'
This was addressed to all there, but especially the young fisherman; so all there aren't acknowledged it, but especially the young fisherman. 'He's a sailor!' sad boy. `;

  let regExLeft = /(?:\s|^)(')/g;
  let regExRight = /\W'\W/g;

  console.log("Text with dialogs in apostrophes:");
  console.log(book);
  console.log("");
  console.log("Text with dialogs in quotes:");
  book = book.replace(regExLeft, replaceApostrophe);
  book = book.replace(regExRight, replaceApostrophe);
  console.log(book);

  function replaceApostrophe(str) {
    return str.replace("'", "\"");
  }
}
replaceApostrophe();
