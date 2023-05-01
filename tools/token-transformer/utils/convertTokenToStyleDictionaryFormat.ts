export function convertTokenToStyleDictionaryFormat(customReferenceTokenIndicator: RegExp) {
  return (value: string | number) => {
    let newValue = `${value}`;
    const matchesArr = [...newValue.matchAll(customReferenceTokenIndicator)];
    if (matchesArr.length > 0) {
      matchesArr.forEach((match) => {
        const figmaVariable  = match[0];
        newValue = newValue.replace(figmaVariable, `{${figmaVariable.slice(1)}}`);
      });
    }
    return newValue;
  }
}
