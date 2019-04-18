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
  }
];

// https://github.com/facebook/jest/issues/7280
test.skip("skip", () => {});

export default apps;
