const apps = [
  { name: "an empty program", input: "", output: [] },
  { name: "a print statement", input: "print 8", output: [8] },
  {
    name: "multiple statements",
    input: "print 8 print 24",
    output: [8, 24]
  }
];

// https://github.com/facebook/jest/issues/7280
test.skip("skip", () => { });

export default apps;