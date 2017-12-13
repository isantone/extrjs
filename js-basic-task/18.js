"use strict";

function findJsNumbers () {
  let regEx = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/gim;
  let str =
`1
-1
+15
1.55
.5
5.
1.3e2
1E-4
1e+12
1a
+-1
1.2.3
1+1
1e4.5
.5.
1f5
.`;
  let result = str.match(regEx);
  console.log(result);
}
findJsNumbers();