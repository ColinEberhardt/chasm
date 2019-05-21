export const transformer: ASTTransformer = (ast: Program) => {

  // do we have a main proc?
  if (!ast.find(a => a.type === "procStatement" && a.name === "main")) {
    // if not - collect up any 'free' statements and add one.
    const freeStatements = ast.filter(a => a.type !== "procStatement");
    const mainProc: ProcStatementNode = {
      type: "procStatement",
      name: "main",
      args: [],
      statements: freeStatements
    };

    ast = [mainProc, ...ast.filter(a => a.type === "procStatement")];
  }

  return ast.map(a => a as ProcStatementNode);
};
