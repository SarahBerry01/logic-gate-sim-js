export function findConnectionPoint(rect, x, y) {
  // Calculate the middle point of the right-hand side
  const tolerance = 10;
  const middleY = rect.top + rect.width / 2;
  const right = rect.right;
  const left = rect.left;
  const topIn = rect.top + rect.width / 3;
  const bottomIn = rect.top + (2 * rect.width) / 3;
  if (
    y >= middleY - tolerance &&
    y <= middleY + tolerance &&
    x >= right - tolerance &&
    x <= right + tolerance
  ) {
    return "out";
  }
  if (x >= left - tolerance && x <= left + tolerance) {
    if (y >= topIn - tolerance && y <= topIn + tolerance) {
      return "inputZero";
    }
    if (y >= bottomIn - tolerance && y <= bottomIn + tolerance) {
      return "inputOne";
    }
  }
}

export function connectionValid(idOne, idTwo, connOne, connTwo) {
    if (idOne === idTwo) {
    return {valid: false};
  }
  // check both are not outputs or both inputs
  if (connOne === "out" && connTwo !== "out"){
    return {valid: true, in:idTwo, inConn:connTwo, out:idOne}
  }
  if (connOne !== "out" && connTwo === "out"){
    return {valid: true, in:idOne, inConn:connOne, out:idTwo}
  }
  return false;
}
