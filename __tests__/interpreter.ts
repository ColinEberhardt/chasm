import { runtime } from "../src/interpreter";
import apps from "./apps";

// execute the app, recording print statements and pixel writes
const executeCode = async (code: string) => {
  const output: any[] = [];
  const pixels: any[] = [];
  const display = new Uint8Array(10000);

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

  return {
    output, pixels
  };
};

describe("interpreter", () => {
  apps.forEach(app => {
    test(app.name, async () => {
      const result = await executeCode(app.input);
      expect(result.output).toEqual(app.output);
      if (app.pixels || result.pixels.length) {
        expect(result.pixels).toEqual(app.pixels);
      }
    });
  });
});
