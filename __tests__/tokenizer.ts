const { tokenize } = require("../src/tokenizer");

describe("tokenize", () => {
  test("copes with a single token", () => {
    const input = " print";
    const tokens = tokenize(input);
    expect(tokens.length).toBe(1);
    expect(tokens[0].type).toBe("keyword");
  });

  test("copes with multiple tokens", () => {
    const input = " printprint";
    const tokens = tokenize(input);
    expect(tokens.length).toBe(2);
  });

  test("consumes whitespace", () => {
    const input = " print    print";
    const tokens = tokenize(input);
    expect(tokens.length).toBe(2);
  });

  test("barfs on unrecognized token", () => {
    expect(() => {
      const input = " print $   print";
      tokenize(input);
    }).toThrowError("Unexpected token $");
  });

  test("copes with multiple mixed tokens", () => {
    const input = " print 2";
    const tokens = tokenize(input);
    expect(tokens.length).toBe(2);
    expect(tokens[0].type).toBe("keyword");
    expect(tokens[1].type).toBe("number");
  });
});
