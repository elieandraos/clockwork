import Clockwork  from "../src";

const clockwork = new Clockwork();

test("it creates an instance of the class", () => {
    expect( clockwork instanceof Clockwork ).toBe(true);
    expect( clockwork.getData() ).toMatchObject({});
    expect( clockwork.getRules() ).toMatchObject({});
})

test("it sets data", () => {
    let data = { foo: 'bar', age: 35 }

    clockwork.setData(data)
    expect( clockwork.getData() === data ).toBe(true);
})

test("it fails to set invalid data", () => {
    let setArrayData = () => { clockwork.setData([]) };
    let setStringData = () => { clockwork.setData('') };
    let setNumberData = () => { clockwork.setData(123) };
    let setNullData = () => { clockwork.setData(null) };
    let setUndefinedData = () => { clockwork.setData(undefined) };

    expect( setArrayData).toThrow(Error);
    expect( setStringData).toThrow(Error);
    expect( setNumberData).toThrow(Error);
    expect( setNullData).toThrow(Error);
    expect( setUndefinedData).toThrow(Error);
});

test("it sets rules", () => {
    let rules = { foo: 'required | string', age: 'required | min:18' };

    clockwork.setRules(rules)
    expect( clockwork.getRules() === rules ).toBe(true);
})

test("it fails to set invalid rules data type", () => {
    let setArrayRules = () => { clockwork.setRules([]) };
    let setStringRules = () => { clockwork.setRules('required') };
    let setNumberRules = () => { clockwork.setRules(123) };
    let setNullRules = () => { clockwork.setRules(null) };
    let setUndefinedRules = () => { clockwork.setRules(undefined) };

    expect( setArrayRules).toThrow(Error);
    expect( setStringRules).toThrow(Error);
    expect( setNumberRules).toThrow(Error);
    expect( setNullRules).toThrow(Error);
    expect( setUndefinedRules).toThrow(Error);
});

test("it fails to validate if rules are not set", () => {
    clockwork.setRules({});

    let withEmptyRules = () => {
        clockwork.passes()
    };

    expect(withEmptyRules).toThrow(Error);
});

test("it fails to validate if data are not set", () => {
    clockwork.setRules({ foo: 'required'}).setData({});

    let withEmptyData = () => {
        clockwork.passes()
    };

    expect(withEmptyData).toThrow(Error);
});

test("it passes all the rules", () => {
    let rules = { name: 'required | string', age: 'required | integer' };
    let data = { name: 'foo', age: 55 };

    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);
    expect(clockwork.fails()).toBe(false);
    // test error bag is empty
});

test("it fails when a rule do not pass", () => {
    let rules = { name: 'required | string | starts_with:gra', age: 'required | integer | min:minAge' };
    let data = { name: 'grace', age: 25, minAge: 18 };

    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);
    expect(clockwork.fails()).toBe(false);
    // test error bag is not empty
});

// validate:
//    - test args: minimum:8 minimum:foo
//    - test sometimes rule placed first, placed in the middle etc...
//    - test rule not available
//    - test nested data keys
//    - test error bags
//    - test extend