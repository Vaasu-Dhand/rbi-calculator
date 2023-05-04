export function isNumber(str: string): boolean {
  return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
}

export function endsWithANumber(str: string): boolean {
  const lastCharacter = str.charAt(str.length - 1);
  return isNumber(lastCharacter);
}
