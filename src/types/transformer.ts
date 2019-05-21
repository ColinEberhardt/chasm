type TransformedProgram = ProcStatementNode[];

interface ASTTransformer {
  (ast: Program): TransformedProgram;
}
