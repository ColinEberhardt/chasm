interface Parser {
  (tokens: Token[]): Program;
}

interface ProgramNode {
  type: string;
}

type Operator = "+" | "-" | "/" | "*" | "==" | ">" | "<" | "&&";

type ExpressionNode = NumberLiteralNode | BinaryExpressionNode | IdentifierNode;

type StatementNode = PrintStatementNode | VariableDeclarationNode;

type Program = StatementNode[];

interface VariableDeclarationNode extends ProgramNode {
  type: "variableDeclaration";
  name: string;
  initializer: ExpressionNode;
}

interface NumberLiteralNode extends ProgramNode {
  type: "numberLiteral";
  value: number;
}

interface IdentifierNode extends ProgramNode {
  type: "identifier";
  value: string;
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
