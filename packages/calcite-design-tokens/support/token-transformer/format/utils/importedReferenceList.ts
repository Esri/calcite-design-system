import { relative } from "path";

export function importedReferenceList(references: string[], outputFileDir: string): string[] {
  return references
    ? references.reduce((acc, ref) => {
        const refLink = ref
          .replace(/(semantic|core)./, "global.")
          .replace("/src/", "/dist/scss/")
          .replace("component/", "");
        const relativeLink = relative(outputFileDir, refLink);
        const useLink = `@use "${relativeLink.slice(0, relativeLink.lastIndexOf("."))}";`;

        if (!acc.includes(useLink)) {
          acc.push(useLink);
        }

        return acc;
      }, [])
    : [];
}
