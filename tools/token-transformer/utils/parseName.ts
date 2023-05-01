/**
 * 
 * @param name the file name passed from the themes object
 * @param prefix an optional prefix for each file name 
 * @returns a camel case file name from the passed name, optionally starting with a prefix
 */
export function parseName(name: string, prefix?: string) {
  const regexWord = /^\w+$/;

  function createNewWord (acc: string, word: string, idx: number) {
    let newWord = '';
    if (idx === 0) {
      if (prefix) {
        const firstLetter = word.charAt(0).toUpperCase();
        newWord =  prefix + firstLetter + word.slice(1).toLowerCase();
      } else {
        newWord =  word.toLocaleLowerCase();
      }
    } else {
      const firstLetter = word.charAt(0).toUpperCase();
      const ord = word.slice(1).toLowerCase();
      newWord = firstLetter + ord;
    }

    acc += newWord;
    return acc;
  }

  return name.split(' ').filter((word) => regexWord.test(word)).reduce(createNewWord, '');
}
