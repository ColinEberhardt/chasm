interface Runtime {
  (src: string, environment: Environment): Promise<TickFunction>;
}

interface TickFunction {
  (): void;
}

interface Environment {
  print: PrintFunction;
}

interface PrintFunction {
  (output: string | number): void;
}
