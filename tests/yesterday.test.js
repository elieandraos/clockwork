import { yesterday } from "./../src/index";

test("passes with valid condition", () => {
    let d = new Date();
    d.setDate(d.getDate()-1);

    expect( yesterday(d) ).toBe(true);
})

test("passes with invalid condition", () => {
    let d = new Date();
    expect( yesterday(d) ).toBe(false);

    d.setDate(d.getDate() + 1);
    expect( yesterday(d) ).toBe(false);
})

test("fails with null", () => {
    expect( yesterday(null) ).toBe(false);
})

test("fails with string", () => {
    expect( yesterday('foo') ).toBe(false);
})

test("fails with array", () => {
    expect( yesterday([]) ).toBe(false);
})

test("fails with object", () => {
    expect( yesterday({}) ).toBe(false);
})
