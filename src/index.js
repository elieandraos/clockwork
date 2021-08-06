import { is_object } from "./utils";
import * as availableRules from "./rules";


class Clockwork {
    /** public class properties **/
    availableRules;

    /** private class properties **/
    #data;
    #rules;

    constructor() {
        this.availableRules = availableRules;
        this.#data = {};
        this.#rules = {};
    }

    setData(data) {
        if( !is_object(data) ) {
            throw new TypeError('passed argument must be an object.');
        }

        this.#data = data;
        return this;
    }

    setRules(rules) {
        if( !is_object(rules) ) {
            throw new TypeError('passed argument must be an object.');
        }

        this.#rules = rules;
        return this;
    }

    getData() {
        return this.#data;
    }

    getRules() {
        return this.#rules;
    }
}

export default Clockwork;
