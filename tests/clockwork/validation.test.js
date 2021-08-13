import Clockwork from "../../src";

const clockwork = new Clockwork();

test("it passes when all the rules pass", () => {
    let rules = {name: 'required | string', age: 'required | integer'};
    let data = {name: 'foo', age: 55};
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);
    expect(clockwork.fails()).toBe(false);
});

test("it fails when at least one rule fails", () => {
    let rules = {name: 'required | string', age: 'required | integer'};
    let data = {name: 11, age: 25};
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(false);
});

test("'sometimes' rule prevents the other rules from executing if the data is not present", () => {
    let rules = { name: 'sometimes | string | email'};
    let data = { name: null };
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);
});

test("'sometimes' rule allows the other rules to execute if the data is present", () => {
    let rules = { name: 'sometimes | string | email'};
    let data = { name: 'foo' };
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(false);
});

test("'sometimes' order in the rule string does not matter", () => {
    let rules = { name: 'string | email | sometimes'};
    let data = { name: null };
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);
});
