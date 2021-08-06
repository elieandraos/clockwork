import * as availableRules from "./rules";
import { is_object, is_empty_object } from "./utils";

const Model = require('dot-prop');

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

    /**
     * Set the data property. must be an object only.
     */
    setData(data) {
        if( !is_object(data) ) {
            throw new Error('setData() argument must be an object.');
        }

        this.#data = data;
        return this;
    }

    /**
     * Set the rules property. must be an object only.
     */
    setRules(rules) {
        if( !is_object(rules) ) {
            throw new Error('setRules() argument must be an object.');
        }

        this.#rules = rules;
        return this;
    }

    /**
     * Get the data property.
     */
    getData() {
        return this.#data;
    }

    /**
     * Get the rules property.
     */
    getRules() {
        return this.#rules;
    }

    validate() {
        if( is_empty_object(this.#rules))
            throw new Error('the validation rules are missing. Use Clockwork.setRules() to set them');

        if( is_empty_object(this.#data))
            throw new Error('the validation data are missing. Use Clockwork.setData() to set them');

        for (let [dataKey, rulesString] of Object.entries(this.#rules)) {
            let value = Model.has(this.#data, dataKey) ? Model.get(this.#data, dataKey) : dataKey;
            let rules = this.parseGivenRulesString(rulesString);

            if(rules.includes('sometimes') && !value) {
                continue;
            }

            rules.forEach( (rule) => {
                if(rule === 'sometimes')
                    return;

                this.executeRule(value, rule);
            });
        }
    }

    /**
     * Parses a given rule string and returns it as an array of rules.
     */
    parseGivenRulesString(rulesString) {
        let rules = rulesString.split('|');

        rules.forEach( (rule, k) => {
            rules[k] = rule.trim();
        });

        return rules;
    }

    executeRule(value, rule) {
        console.log(rule + ':' + this.availableRules[rule](value));
    }
}

export default Clockwork;
