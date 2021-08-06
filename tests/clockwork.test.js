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

    expect( setArrayData).toThrow(TypeError);
    expect( setStringData).toThrow(TypeError);
    expect( setNumberData).toThrow(TypeError);
    expect( setNullData).toThrow(TypeError);
    expect( setUndefinedData).toThrow(TypeError);
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

    expect( setArrayRules).toThrow(TypeError);
    expect( setStringRules).toThrow(TypeError);
    expect( setNumberRules).toThrow(TypeError);
    expect( setNullRules).toThrow(TypeError);
    expect( setUndefinedRules).toThrow(TypeError);
});
