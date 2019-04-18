interface Traverse {
  (nodes: ProgramNode[] | ProgramNode, visitor: Visitor): void;
}

interface Visitor {
  (node: ProgramNode): void;
}
