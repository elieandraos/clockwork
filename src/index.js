import * as predefinedRules from "./rules";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Clockwork {
    availableRules;
    data;
    validationRules;

    constructor() {
        this.availableRules = predefinedRules;
        this.data = {};
        this.validationRules = {};
    }
}

export default Clockwork;
