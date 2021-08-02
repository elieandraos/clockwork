import { date } from "./../src/index";

test("passes with valid short versions date strings", () => {
    expect( date('2021-04-20') ).toBe(true);
    expect( date('04-20-2021') ).toBe(true);
    expect( date('2021/04/20') ).toBe(true);
    expect( date('04/20/2021') ).toBe(true);
})

test("passes with valid long versions date strings", () => {
    expect( date("Saturday, September 17, 2016") ).toBe(true);
    expect( date("Saturday, Sept 17, 2016") ).toBe(true);
})

test("fails with invalid date strings", () => {
    expect( date("17/17/17") ).toBe(false);
    expect( date("20 4") ).toBe(false);
    expect( date("Sept 37, 2018") ).toBe(false);
})

test("fails with null", () => {
    expect( date(null) ).toBe(false);
})

test("fails with string", () => {
    expect( date('foo') ).toBe(false);
})

test("fails with array", () => {
    expect( date([]) ).toBe(false);
})

test("fails with object", () => {
    expect( date({}) ).toBe(false);
})
