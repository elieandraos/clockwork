import Clockwork  from "../src";

const clockwork = new Clockwork();

test("it creates an instance of the class", () => {
    expect( clockwork instanceof Clockwork ).toBe(true);
    expect( clockwork.data === null ).toBe(true);
    expect( clockwork.validationRules === null ).toBe(true);
})

test("it sets data", () => {
    let data = { foo: 'bar', age: 35 }

    clockwork.setData(data)
    expect( clockwork.data === data ).toBe(true);
})

test("it sets rules", () => {
    let rules = { foo: 'required | string', age: 'required | min:18' };

    clockwork.setRules(rules)
    expect( clockwork.validationRules === rules ).toBe(true);
})

test("it fails to set invalid rules format", () => {
    let setRules = function() {
        clockwork.setRules([])
    }
    expect( setRules ).toThrow();
});
