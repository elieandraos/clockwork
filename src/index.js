import * as predefinedRules from "./rules";

class Clockwork {
    /** public class properties **/
    availableRules;

    /** private class properties **/
    #data;
    #validationRules;

    constructor() {
        this.availableRules = predefinedRules;
        this.#data = {};
        this.#validationRules = {};
    }

    setData(data) {
        if( !data || Array.isArray(data) || typeof data !== 'object' ) {
            throw new TypeError('passed argument must be an object.');
        }

        this.#data = data;
        return this;
    }

    setRules(rules) {
        if( !rules || Array.isArray(rules) || typeof rules !== 'object' ) {
            throw new TypeError('passed argument must be an object.');
        }

        this.#validationRules = rules;
        return this;
    }

    getData() {
        return this.#data;
    }

    getRules() {
        return this.#validationRules;
    }
}

export default Clockwork;
