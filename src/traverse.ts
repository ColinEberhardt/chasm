// post order ast walker
const traverse: Traverse = (nodes, visitor) => {
  nodes = Array.isArray(nodes) ? nodes : [nodes];
  nodes.forEach(node => {
    Object.keys(node).forEach((prop: keyof ProgramNode) => {
      const value = node[prop];
      const valueAsArray: string[] = Array.isArray(value) ? value : [value];
      valueAsArray.forEach((childNode: any) => {
        if (typeof childNode.type === "string") {
          traverse(childNode, visitor);
        }
      });
    });
    visitor(node);
  });
};

export default traverse;
