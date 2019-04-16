import { emitter } from "../src/emitter";

describe("emitter", () => {
  test("doesn't barf when loading the module", async () => {
    const wasm = emitter();
    await WebAssembly.instantiate(wasm);
  });

  test("simple add function", async () => {
    const wasm = emitter();
    const { instance } = await WebAssembly.instantiate(wasm);
    expect(instance.exports.run(5, 6)).toEqual(11);
  });
});
