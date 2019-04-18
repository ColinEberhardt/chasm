import { runtime } from "../src/compiler";
import apps from "./apps";

const executeCode = async (code: string, done: jest.DoneCallback) => {
  const output: any[] = [];

  try {
    const tick = await runtime(code, {
      print: d => output.push(d)
    });
    tick();

    done();
    return { output };
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
    });
  });
});
