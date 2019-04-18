const { parse } = require("../src/parser");

test("parses single statements", () => {
  const tokens = [
    { type: "keyword", value: "print" },
    { type: "number", value: "22" }
  ];

  const ast = parse(tokens);
  expect(ast.length).toEqual(1);
});

test("parses multiple homogenous statements", () => {
  const tokens = [
    // print 22
    { type: "keyword", value: "print" },
    { type: "number", value: "22" },
    // print 22
    { type: "keyword", value: "print" },
    { type: "number", value: "22" }
  ];

  const ast = parse(tokens);
  expect(ast.length).toEqual(2);
});

test("parses print statement with unary expression", () => {
  const tokens = [
    {
      type: "keyword",
      value: "print"
    },
    {
      type: "number",
      value: "22"
    }
  ];

  const ast = parse(tokens);
  const node = ast[0];

  expect(node).toEqual({
    type: "printStatement",
    expression: { type: "numberLiteral", value: 22 }
  });
});
