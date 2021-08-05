import * as predefinedRules from "./rules";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Clockwork {
    availableRules;
    data;
    validationRules;

    constructor() {
        this.availableRules = predefinedRules;
        this.data = null;
        this.validationRules = null;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setRules(rules) {
        if(typeof rules !== 'object') {
            console.log('not valid');
            //throw new Error('passed argument must be an object.');
        }

        this.validationRules = rules;
        return this;

    }
}

export default Clockwork;
