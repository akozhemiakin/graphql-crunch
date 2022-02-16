const { crunch, uncrunch } = require("../../src");

const key = '\u265B';

const baseCases = [
  ["null primitive", null, { version: 3, crunched: [null] }],
  ["number primitive", 0, { version: 3, crunched: [0] }],
  ["boolean primitive", true, { version: 3, crunched: [true] }],
  ["string primitive", "string", { version: 3, crunched: ["string"] }],
  ["empty array", [], { version: 3, crunched: [[]] }],
  ["single-item array", [null], { version: 3, crunched: [[null]] }],
  [
    "multi-primitive all distinct array",
    [null, 0, true, "string"],
    { version: 3, crunched: [[null, 0, true, "string"]] },
  ],
  [
    "multi-primitive repeated array",
    [true, true, true, true],
    { version: 3, crunched: [[true, true, true, true]] },
  ],
  [
    "one-level nested array",
    [[1, 2, 3]],
    { version: 3, crunched: [0, [[1, 2, 3]]] },
  ],
  [
    "two-level nested array",
    [[[1, 2, 3]]],
    { version: 3, crunched: [0, 0, [[[1, 2, 3]]]] },
  ],
  ["empty object", {}, { version: 3, crunched: [{}] }],
  ["single-item object", { a: null }, { version: 3, crunched: [{ a: null }] }],
  [
    "multi-item all distinct object",
    { a: null, b: 0, c: true, d: "string" },
    { version: 3, crunched: [{ a: null, b: 0, c: true, d: "string" }] },
  ],
  [
    "multi-item repeated object",
    { a: null, b: null, c: null, d: null },
    { version: 3, crunched: [{ a: null, b: null, c: null, d: null }] },
  ],
  [
    "complex array",
    [{ a: true, b: [1, 2, 3] }, [1, 2, 3]],
    { version: 3, crunched: [[1, 2, 3], 0, [{ a: true, b: { [key]: 0 } }, { [key]: 0 }]] },
  ],
  [
    "complex object",
    { a: true, b: [1, 2, 3], c: { a: true, b: [1, 2, 3] } },
    {
      version: 3,
      crunched: [[1, 2, 3], 0, { a: true, b: { [key]: 0 }, c: { a: true, b: { [key]: 0 } } }],
    },
  ],
  [
    "empty object/array",
    { a: {}, b: [] },
    { version: 3, crunched: [0, 0, { a: {}, b: [] }] },
  ],
  [
    "date",
    { a: new Date("2021-03-31T18:34:09.000Z") },
    { version: 3, crunched: [{ a: new Date("2021-03-31T18:34:09.000Z") }] },
  ],
];

baseCases.forEach(([description, uncrunched, crunched]) => {
  test(`Crunching ${description}.`, () => {
    expect(crunch(uncrunched, 3)).toEqual(crunched);
  });
  test(`Uncrunching ${description}.`, () => {
    expect(uncrunch(crunched)).toEqual(uncrunched);
  });
});
