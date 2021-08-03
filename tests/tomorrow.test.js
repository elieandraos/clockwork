import { tomorrow } from "./../src/index";

test("passes with valid condition", () => {
    let d = new Date();
    d.setDate(d.getDate()+1);

    expect( tomorrow(d) ).toBe(true);
})

test("passes with invalid condition", () => {
    let d = new Date();
    expect( tomorrow(d) ).toBe(false);

    d.setDate(d.getDate() - 1);
    expect( tomorrow(d) ).toBe(false);
})

test("fails with null", () => {
    expect( tomorrow(null) ).toBe(false);
})

test("fails with string", () => {
    expect( tomorrow('foo') ).toBe(false);
})

test("fails with array", () => {
    expect( tomorrow([]) ).toBe(false);
})

test("fails with object", () => {
    expect( tomorrow({}) ).toBe(false);
})
