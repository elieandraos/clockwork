import * as availableRules from "./rules";
import { is_object, is_empty_object } from "./utils";

const Model = require('dot-prop');

class Clockwork {
    /** public class properties **/
    availableRules;

    /** private class properties **/
    #data;
    #rules;
    #errorsBag;

    constructor() {
        this.availableRules = availableRules;
        this.#data = {};
        this.#rules = {};
        this.#errorsBag = [];
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

    passes() {
        if( is_empty_object(this.#rules))
            throw new Error('the validation rules object is missing. Use Clockwork.setRules() to set them');

        if( is_empty_object(this.#data))
            throw new Error('the validation data object is missing. Use Clockwork.setData() to set them');

        return this.#validate();
    }

    fails() {
        return !this.passes();
    }

    #validate() {
        this.#errorsBag = [];

        for (let [dataKey, rulesString] of Object.entries(this.#rules)) {
            let value = Model.has(this.#data, dataKey) ? Model.get(this.#data, dataKey) : dataKey;
            let rules = this.#parseGivenRulesString(rulesString);

            // do not validate any other rule if value is null and 'sometimes' rule exists.
            if(rules.includes('sometimes') && !value) {
                continue;
            }

            rules.forEach( (rule) => {
                // do not execute the 'sometimes' rule, skip it & continue the loop
                if (rule === 'sometimes')
                    return;

                this.#executeRule(value, rule, dataKey);
            })
        }

        return !this.#errorsBag.length;
    }

    #parseGivenRulesString(rulesString) {
        let rules = rulesString.split('|');

        rules.forEach( (rule, k) => {
            rules[k] = rule.trim();
        });

        return rules;
    }

    #executeRule(value, ruleString, dataKey) {
        let rule = ruleString;
        // check for args

        // run the rule
        if(this.availableRules[rule](value))
            return;

        // add Error to error bag
        console.log(dataKey+'.'+rule);
    }
}

export default Clockwork;
