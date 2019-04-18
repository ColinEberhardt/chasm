import { tokenize } from "./tokenizer";
import { parse } from "./parser";

export const runtime: Runtime = async (src, { print }) => () => {
  const tokens = tokenize(src);
  const program = parse(tokens);

  const evaluateExpression = (expression: ExpressionNode): number => {
    switch (expression.type) {
      case "numberLiteral":
        return expression.value;
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
