import { emitter } from "./emitter";
import { tokenize } from "./tokenizer";
import { parse } from "./parser";

export const compile: Compiler = src => {
  const tokens = tokenize(src);
  const ast = parse(tokens);
  const wasm = emitter(ast);
  return wasm;
};

export const runtime: Runtime = async (src, env) => {
  const wasm = compile(src);
  const memory = new WebAssembly.Memory({ initial: 1 });
  const result: any = await WebAssembly.instantiate(wasm, {
    env: { ...env, memory }
  });
  return () => {
    result.instance.exports.run();
    env.display.set(new Uint8Array(memory.buffer, 0, 10000));
  };
};