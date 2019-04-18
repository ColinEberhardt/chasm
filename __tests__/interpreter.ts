import { runtime } from "../src/interpreter";
import apps from "./apps";

// execute the app, recording print statements and pixel writes
const executeCode = async (code: string) => {
  const output: any[] = [];
 
  const tick = await runtime(code, {
    print: d => output.push(d)
  });
  tick();

  return { output };
};

describe("interpreter", () => {
  apps.forEach(app => {
    test(app.name, async () => {
      const result = await executeCode(app.input);
      expect(result.output).toEqual(app.output);
    });
  });
});
