export const darkBackground = [{ name: 'Dark', value: '#202020', default: true }]

// the generated readme includes escape characters which actually get rendered, remove them
export const parseReadme = (str) => str.replace(/ \\\| /g, ' | ');