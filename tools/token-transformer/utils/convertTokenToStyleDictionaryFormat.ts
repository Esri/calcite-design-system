/**
 * Some tokens defined in Figma Token Studio do not used the common { [variable.name] } for token references.
 * This function loops over each value, finds custom token references and converts them to the expected Style Dictionary format.
 *
 * @param customReferenceTokenIndicator a regex to find the token references
 * @returns the reference format expected by Style Dictionary "{ [variable.name] }"
 */
export function convertTokenToStyleDictionaryFormat(customReferenceTokenIndicator: RegExp) {
  return (value: string | number) => {
    let newValue = `${value}`;
    const matchesArr = [...newValue.matchAll(customReferenceTokenIndicator)];
    matchesArr.forEach((match) => {
      const figmaVariable = match[0];
      newValue = newValue.replace(figmaVariable, `{${figmaVariable.slice(1)}}`);
    });
    return newValue;
  };
}
