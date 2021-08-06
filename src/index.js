import * as availableRules from "./rules";
import { is_object, is_empty_object } from "./utils";


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
            throw new Error('setData() argument must be an object.');
        }

        this.#data = data;
        return this;
    }

    setRules(rules) {
        if( !is_object(rules) ) {
            throw new Error('setRules() argument must be an object.');
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

    validate() {
        if( is_empty_object(this.#rules))
            throw new Error('the validation rules are missing. Use Clockwork.setRules() to set them');

        if( is_empty_object(this.#data))
            throw new Error('the validation data are missing. Use Clockwork.setData() to set them');

        for (let [_dataKey, _rules] of Object.entries(this.#rules)) {
            console.log(_dataKey);
            console.log(_rules);
        }
        //return true;
    }
}

export default Clockwork;
