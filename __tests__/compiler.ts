import { runtime } from "../src/compiler";
import apps from "./apps";

const executeCode = async (code: string, done: jest.DoneCallback) => {
  const output: any[] = [];
  const display = new Uint8Array(10000);
  const pixels: any[] = [];

  try {
    const tick = await runtime(code, {
      print: d => output.push(d),
      display
    });
    tick();

    // find any pixels that have been written to
    display.forEach((value, index) => {
      if (value !== 0) {
        pixels.push([index, value]);
      }
    });

    done();
    return { output, pixels };
  } catch (e) {
    console.error(e);
    done.fail();
  }
};

describe("compiler", () => {
  apps.forEach(app => {
    test(app.name, async done => {
      const result = await executeCode(app.input, done);
      expect(result.output).toEqual(app.output);
      if (app.pixels || result.pixels.length) {
        expect(result.pixels).toEqual(app.pixels);
      }
    });
  });
});
