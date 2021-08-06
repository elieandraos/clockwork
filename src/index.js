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
        if( !data || Array.isArray(data) || typeof data !== 'object' ) {
            throw new TypeError('passed argument must be an object.');
        }

        this.data = data;
        return this;
    }

    setRules(rules) {
        if( !rules || Array.isArray(rules) || typeof rules !== 'object' ) {
            throw new TypeError('passed argument must be an object.');
        }

        this.validationRules = rules;
        return this;
    }
}

export default Clockwork;
