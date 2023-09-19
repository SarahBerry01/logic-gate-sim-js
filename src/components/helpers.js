export function getInputOne(element){
  return document.querySelector(
    `[row="${element.getAttribute(
      "inOneRow"
    )}"][col="${element.getAttribute("inOneCol")}"]`
  );
}

export function getInputZero(element){
  return document.querySelector(
    `[row="${element.getAttribute(
      "inZeroRow"
    )}"][col="${element.getAttribute("inZeroCol")}"]`
  );
}