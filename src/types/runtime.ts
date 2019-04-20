interface Runtime {
  (src: string, environment: Environment): Promise<TickFunction>;
}

interface TickFunction {
  (): void;
}

interface Environment {
  print: PrintFunction;
  display: Uint8Array;
}

interface PrintFunction {
  (output: string | number): void;
}
