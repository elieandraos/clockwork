import Clockwork from "../../src";

const clockwork = new Clockwork();

test("it passes when all the rules pass", () => {
    let rules = {name: 'required | string', age: 'required | integer'};
    let data = {name: 'foo', age: 55};
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);
    expect(clockwork.fails()).toBe(false);
    // test error bag is empty
});

test("it fails when at least one rule fails", () => {
    let rules = {name: 'required | string', age: 'required | integer'};
    let data = {name: 11, age: 25};
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(false);
    expect(clockwork.fails()).toBe(true);
    // test error bag is not empty
});