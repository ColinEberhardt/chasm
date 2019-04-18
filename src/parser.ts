export class ParserError extends Error {
  token: Token;
  constructor(message: string, token: Token) {
    super(message);
    this.token = token;
  }
}

const asOperator = (value: string): Operator => {
  // TODO: check it really is an operator
  return value as Operator;
};

export const parse: Parser = tokens => {
  const tokenIterator = tokens[Symbol.iterator]();
  let currentToken = tokenIterator.next().value;

  const eatToken = (value?: string) => {
    if (value && value !== currentToken.value) {
      throw new ParserError(
        `Unexpected token value, expected ${value}, received ${
        currentToken.value
        }`,
        currentToken
      );
    }
    currentToken = tokenIterator.next().value
  };
  
  const parseExpression: ParserStep<ExpressionNode> = () => {
    let node: ExpressionNode;
    switch (currentToken.type) {
      case "number":
        node = {
          type: "numberLiteral",
          value: Number(currentToken.value)
        };
        eatToken();
        return node;
      case "parens":
        eatToken("(");
        const left = parseExpression();
        const operator = currentToken.value;
        eatToken();
        const right = parseExpression();
        eatToken(")");
        return {
          type: "binaryExpression",
          left,
          right,
          operator: asOperator(operator)
        };
      default:
        throw new ParserError(
          `Unexpected token type ${currentToken.type}`,
          currentToken
        );
    }
  };

  const parseStatement: ParserStep<StatementNode> = () => {
    if (currentToken.type === "keyword") {
      switch (currentToken.value) {
        case "print":
          eatToken();
          return {
            type: "printStatement",
            expression: parseExpression()
          };
      }
    }
  };

  const nodes: StatementNode[] = [];
  while (currentToken) {
    nodes.push(parseStatement());
  }

  return nodes;
};
