interface Parser {
  (tokens: Token[]): Program;
}

interface ProgramNode {
  type: string;
}

type Operator = "+" | "-" | "/" | "*" | "==" | ">" | "<" | "&&";

type ExpressionNode = NumberLiteralNode | BinaryExpressionNode | IdentifierNode;

type StatementNode =
  | PrintStatementNode
  | VariableDeclarationNode
  | VariableAssignmentNode
  | WhileStatementNode
  | SetPixelStatementNode;

type Program = StatementNode[];

interface VariableDeclarationNode extends ProgramNode {
  type: "variableDeclaration";
  name: string;
  initializer: ExpressionNode;
}

interface VariableAssignmentNode extends ProgramNode {
  type: "variableAssignment";
  name: string;
  value: ExpressionNode;
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

interface SetPixelStatementNode extends ProgramNode {
  type: "setpixelStatement";
  x: ExpressionNode;
  y: ExpressionNode;
  color: ExpressionNode;
}

interface WhileStatementNode extends ProgramNode {
  type: "whileStatement";
  expression: ExpressionNode;
  statements: StatementNode[];
}

interface ParserStep<T extends ProgramNode> {
  (): T;
}
