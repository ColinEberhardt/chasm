interface Parser {
  (tokens: Token[]): Program;
}

interface ProgramNode {
  type: string;
}

type Operator = "+" | "-" | "/" | "*" | "==" | ">" | "<" | "&&";

// in future we will have multiple expression types
type ExpressionNode = NumberLiteralNode | BinaryExpressionNode;

// in future we will have multiple statement types, for now
// just print statements
type StatementNode = PrintStatementNode;

type Program = StatementNode[];

interface NumberLiteralNode extends ProgramNode {
  type: "numberLiteral";
  value: number;
}

interface BinaryExpressionNode extends ProgramNode {
  type: "binaryExpression";
  left: ExpressionNode;
  right: ExpressionNode;
  operator: Operator;
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
