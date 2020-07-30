function gen(counts: number[]): string {
  return counts
    .map((count) => {
      let out = "";
      for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return out;
    })
    .join("-");
}

export const guid = (): string => gen([2, 1, 1, 1, 3]);
