declare var CodeMirror: any;
declare var $: any;

const interpreterRuntime = require("../src/interpreter").runtime;
const compilerRuntime = require("../src/compiler").runtime;
const { keywords, operators } = require("../src/tokenizer");

const compileButton = document.getElementById("compile");
const interpretButton = document.getElementById("interpret");
const codeArea = document.getElementById("code") as HTMLTextAreaElement;
const outputArea = document.getElementById("output") as HTMLTextAreaElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const shareUrl = document.getElementById("shareUrl") as HTMLInputElement;
const copyUrl = document.getElementById("copyUrl") as HTMLInputElement;

if (window.location.hash) {
  const encoded = window.location.href.split("#")[1];
  codeArea.value = atob(decodeURIComponent(encoded));
}

// quick and dirty image data scaling
// see: https://stackoverflow.com/questions/3448347/how-to-scale-an-imagedata-in-html-canvas
const scaleImageData = (
  imageData: ImageData,
  scale: number,
  ctx: CanvasRenderingContext2D
) => {
  const scaled = ctx.createImageData(
    imageData.width * scale,
    imageData.height * scale
  );
  const subLine = ctx.createImageData(scale, 1).data;
  for (let row = 0; row < imageData.height; row++) {
    for (let col = 0; col < imageData.width; col++) {
      const sourcePixel = imageData.data.subarray(
        (row * imageData.width + col) * 4,
        (row * imageData.width + col) * 4 + 4
      );
      for (let x = 0; x < scale; x++) subLine.set(sourcePixel, x * 4);
      for (let y = 0; y < scale; y++) {
        const destRow = row * scale + y;
        const destCol = col * scale;
        scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4);
      }
    }
  }
  return scaled;
};

CodeMirror.defineSimpleMode("simplemode", {
  start: [
    {
      regex: new RegExp(`(${keywords.join("|")})`),
      token: "keyword"
    },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: "number"
    },
    { regex: /[-+\/*=<>!]+/, token: "operator" },
    { regex: /[a-z$][\w$]*/, token: "variable" }
  ]
});

const editor = CodeMirror.fromTextArea(codeArea, {
  mode: "simplemode",
  theme: "abcdef",
  lineNumbers: true
});

$("#shareModal").on("show.bs.modal", () => {
  const baseUrl = window.location.href.split("#")[0];
  const code = encodeURIComponent(btoa(editor.getValue()));
  shareUrl.value = `${baseUrl}#${code}`;
});

copyUrl.addEventListener("click", () =>
  navigator.clipboard.writeText(shareUrl.value)
);

const sleep = async (ms: number) =>
  await new Promise(resolve => setTimeout(resolve, ms));

let marker: any;

const logMessage = (message: string | number) =>
  (outputArea.value = outputArea.value + message + "\n");

const markError = (token: Token) => {
  marker = editor.markText(
    { line: token.line, ch: token.char },
    { line: token.line, ch: token.char + token.value.length },
    { className: "error" }
  );
};

const updateCanvas = (display: Uint8Array) => {
  const context = canvas.getContext("2d");
  const imgData = context.createImageData(100, 100);
  for (let i = 0; i < 100 * 100; i++) {
    imgData.data[i * 4] = display[i];
    imgData.data[i * 4 + 1] = display[i];
    imgData.data[i * 4 + 2] = display[i];
    imgData.data[i * 4 + 3] = 255;
  }
  const data = scaleImageData(imgData, 3, context);
  context.putImageData(data, 0, 0);
};

const run = async (runtime: Runtime) => {
  if (marker) {
    marker.clear();
  }

  await sleep(10);

  let tickFunction: TickFunction;

  try {
    const display = new Uint8Array(10000);
    tickFunction = await runtime(editor.getValue(), {
      print: logMessage,
      display
    });

    outputArea.value = "";
    logMessage(`Executing ... `);

    tickFunction();
    updateCanvas(display);

    interpretButton.classList.remove("active");
    compileButton.classList.remove("active");
  } catch (error) {
    logMessage(error.message);
    markError(error.token);
  }
};

interpretButton.addEventListener("click", async () => {
  interpretButton.classList.add("active");
  compileButton.classList.remove("active");
  await run(interpreterRuntime);
});

compileButton.addEventListener("click", async () => {
  compileButton.classList.add("active");
  interpretButton.classList.remove("active");
  await run(compilerRuntime);
});
