const apps = [
  { name: "an empty program", input: "", output: [] },
  { name: "a print statement", input: "print 8", output: [8] },
  {
    name: "multiple statements",
    input: "print 8 print 24",
    output: [8, 24]
  },
  {
    name: "binary expressions",
    input: "print(2+ 4)",
    output: [6]
  },
  {
    name: "nested binary expressions",
    input: "print ((6-4)+10)",
    output: [12]
  },
  {
    name: "variable declaration",
    input: "var f = 22 print f",
    output: [22]
  },
  {
    name: "floating point variable declaration",
    input: "var f = 22.5 print f",
    output: [22.5]
  },
  {
    name: "variable assignment",
    input: "var f = 22 f = (f+1) print f",
    output: [23]
  },
  {
    name: "floating point variable assignment",
    input: "var f = 22.5 f = (f+1.5) print f",
    output: [24]
  },
  {
    name: "while statements",
    input: "var f = 0 while (f < 5) f = (f + 1) print f endwhile",
    output: [1, 2, 3, 4, 5]
  },
  {
    name: "setpixel statements",
    input: "setpixel 1 2 3",
    output: [] as any[],
    pixels: [[201, 3]]
  }
];

// https://github.com/facebook/jest/issues/7280
test.skip("skip", () => {});

export default apps;
