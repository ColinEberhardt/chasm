import traverse from "../src/traverse";

test("traverses post order - visiting leaves first", () => {
  const ast = {
    type: "foo",
    bar: {
      type: "baz"
    }
  };

  const visited: string[] = [];
  const visitor: Visitor = node => visited.push(node.type);
  traverse(ast, visitor);

  expect(visited).toEqual(["baz", "foo"]);
});

test("traverses array properties", () => {
  const ast = {
    type: "foo",
    bar: [
      {
        type: "baz"
      },
      {
        type: "bar"
      }
    ]
  };

  const visited: string[] = [];
  const visitor: Visitor = node => visited.push(node.type);
  traverse(ast, visitor);

  expect(visited).toEqual(["baz", "bar", "foo"]);
});

test("traverses array root", () => {
  const ast = [
    {
      type: "baz"
    },
    {
      type: "bar"
    }
  ];

  const visited: string[] = [];
  const visitor: Visitor = node => visited.push(node.type);
  traverse(ast, visitor);

  expect(visited).toEqual(["baz", "bar"]);
});
