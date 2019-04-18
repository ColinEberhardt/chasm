interface Tokenizer {
  (input: string): Token[];
}

type TokenType =
  | "number"
  | "keyword"
  | "whitespace"
  | "parens"
  | "operator";

interface Token {
  type: TokenType;
  value: string;
  line?: number;
  char?: number;
}

interface Matcher {
  (input: string, index: number): Token | null;
}
