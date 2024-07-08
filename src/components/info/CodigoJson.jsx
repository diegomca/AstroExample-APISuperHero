import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

// solo hago esto para aplicar color a los bloques de codigo, lo iba a programar aca, pero solo importando prismjs ya funciona, pero lo deje para que vean que se puede aplicar react con astro
function codigoJson() {

useEffect(() => {
  Prism.highlightAll();
}, []);

  return (
<></>
  );
}

export default codigoJson;
