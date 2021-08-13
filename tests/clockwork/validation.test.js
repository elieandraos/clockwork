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

test("it parses arguments and validates correctly", () => {
    let rules = { name: 'required | string | starts_with:foo | min:5'};
    let data = { name: 'foobar' };
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(true);

    data = { name: 'foo' };
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(false);

    data = { name: 'barons' };
    clockwork.setRules(rules).setData(data);

    expect(clockwork.passes()).toBe(false);
});

test("it can also parse arguments from the data object and validates correctly.", () => {
    let rules = { name: 'required | string | starts_with:shouldStartWith'};
    let data = { name: 'foobar', shouldStartWith: 'foo' };

    clockwork.setRules(rules).setData(data);
    expect(clockwork.passes()).toBe(true);
});

test("it throws an error if a rule is not defined", () => {
    let rules = { name: 'whatever'};
    let data = { name: 'foo'};

    clockwork.setRules(rules).setData(data);

    let withUndefinedRule = () => { clockwork.passes() };
    expect(withUndefinedRule).toThrow(Error);
});

test("it fails if it doesn't find the data property.", () => {
    let rules = { age: 'integer'};
    let data = { name: 'foobar' };

    clockwork.setRules(rules).setData(data);
    expect(clockwork.passes()).toBe(false);
});

test("it parses nested data and validates correctly", () => {
    let rules = { 'person.age': 'required | integer | min:30'};
    let data = {
        person: {
            age: 20
        }
    };

    clockwork.setRules(rules).setData(data);
    expect(clockwork.passes()).toBe(false);
});