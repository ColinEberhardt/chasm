import { emitter } from "../src/emitter";

describe("emitter", () => {
  test("doesn't barf when loading the module", async () => {
    const wasm = emitter();
    await WebAssembly.instantiate(wasm);
  });
});
