interface Parser {
  (tokens: Token[]): Program;
}

interface ProgramNode {
  type: string;
}

// in future we will have multiple expression types, for now
// just number literals
type ExpressionNode = NumberLiteralNode;

// in future we will have multiple statement types, for now
// just print statements
type StatementNode = PrintStatementNode;

type Program = StatementNode[];

interface NumberLiteralNode extends ProgramNode {
  type: "numberLiteral";
  value: number;
}

interface IdentifierNode extends ProgramNode {
  type: "identifier";
  value: string;
}

interface PrintStatementNode extends ProgramNode {
  type: "printStatement";
  expression: ExpressionNode;
}

interface ParserStep<T extends ProgramNode> {
  (): T;
}
