import { tokenize } from "./tokenizer";
import { parse } from "./parser";

const applyOperator = (operator: string, left: number, right: number) => {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "==":
      return left == right ? 1 : 0;
    case ">":
      return left > right ? 1 : 0;
    case "<":
      return left < right ? 1 : 0;
    case "&&":
      return left && right;
  }
  throw Error(`Unknown binary operator ${operator}`);
};

export const runtime: Runtime = async (src, { print }) => () => {
  const tokens = tokenize(src);
  const program = parse(tokens);

  const evaluateExpression = (expression: ExpressionNode): number => {
    switch (expression.type) {
      case "numberLiteral":
        return expression.value;
      case "binaryExpression":
        return applyOperator(
          expression.operator,
          evaluateExpression(expression.left),
          evaluateExpression(expression.right)
        );
    }
  };

  const executeStatements = (statements: StatementNode[]) => {
    statements.forEach(statement => {
      switch (statement.type) {
        case "printStatement":
          print(evaluateExpression(statement.expression));
          break;
      }
    });
  };

  executeStatements(program);
};
