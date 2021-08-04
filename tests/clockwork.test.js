import Clockwork  from "../src";

test("it creates an instance of the class", () => {
    let clockwork = new Clockwork();
    expect( clockwork instanceof Clockwork ).toBe(true);
})
