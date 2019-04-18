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
  const result: any = await WebAssembly.instantiate(wasm, {
    env
  });
  return () => {
    result.instance.exports.run();
  };
};