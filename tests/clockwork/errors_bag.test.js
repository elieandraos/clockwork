import Clockwork from "../../src";

const clockwork = new Clockwork();

test("it sets custom error messages", () => {
    let customErrorMessages = { 'foo.required': 'foo is required', 'bar.integer': 'bar must be an integer' };
    clockwork.setCustomErrorMessages(customErrorMessages)

    expect(clockwork.getCustomErrorMessages() === customErrorMessages).toBe(true);
})

test("it fails to set invalid custom error messages", () => {
    let setArrayData = () => { clockwork.setCustomErrorMessages([]) };
    let setStringData = () => { clockwork.setCustomErrorMessages('') };
    let setNumberData = () => { clockwork.setCustomErrorMessages(123) };
    let setNullData = () => { clockwork.setCustomErrorMessages(null) };
    let setUndefinedData = () => { clockwork.setCustomErrorMessages(undefined) };

    expect(setArrayData).toThrow(Error);
    expect(setStringData).toThrow(Error);
    expect(setNumberData).toThrow(Error);
    expect(setNullData).toThrow(Error);
    expect(setUndefinedData).toThrow(Error);
});