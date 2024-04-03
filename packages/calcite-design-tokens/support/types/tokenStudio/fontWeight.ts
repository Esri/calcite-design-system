// This extends the fontWeightMap used by the sd-transforms which is why some of the font weights are misspelled.
export const FontWeight = {
  black: 900,
  bold: 700,
  // This font weight name comes from token studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  buch: 400,
  demi: 600,
  demibold: 600,
  dreiviertelfett: 700,
  extrabold: 800,
  extrafett: 900,
  extraleicht: 200,
  extralight: 200,
  fett: 800,
  hairline: 1,
  halbfett: 600,
  heavy: 900,
  // This font weight name comes from token studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  kraeftig: 500,
  kräftig: 500,
  leicht: 300,
  light: 300,
  medium: 500,
  normal: 400,
  regular: 400,
  semibold: 600,
  super: 900,
  thin: 100,
  // This font weight name comes from token studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  ultabold: 800,
  ultra: 1000,
  ultralight: 200,
} as const;
