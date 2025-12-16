import { FileTransformer } from "@arcgis/lumina-compiler";
import ts from "typescript";

export default function (): FileTransformer {
  return (sourceFile, context): readonly ts.Statement[] => {
    if (process.env.NODE_ENV !== "production") {
      return sourceFile.statements;
    }

    const testDataAttrPrefix = "data-test-";

    function removeTestDataAttr(node: ts.Node): ts.Node | undefined {
      return ts.isJsxAttribute(node) && node.name.getText(sourceFile).startsWith(testDataAttrPrefix)
        ? undefined
        : ts.visitEachChild(node, removeTestDataAttr, context.transformation);
    }

    return sourceFile.text.includes(testDataAttrPrefix)
      ? sourceFile.statements.map((statement) => ts.visitNode(statement, removeTestDataAttr) as ts.Statement)
      : sourceFile.statements;
  };
}
