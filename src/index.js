const Model = require('dot-prop');
import * as availableRules from "./rules";
import { is_object, is_empty_object } from "./utils";

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
            let rules = this.#toArray(rulesString);

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

    #toArray(rulesString) {
        let rules = rulesString.split('|');

        rules.forEach( (rule, k) => {
            rules[k] = rule.trim();
        });

        return rules;
    }

    #parse(ruleString) {
        let rule = ruleString;
        let arg = null;

        if( typeof ruleString === 'string' && ruleString.split(':').length > 1 ) {
            rule = ruleString.split(':')[0].trim();
            arg = ruleString.split(':')[1].trim();

            if(Model.has(this.#data, arg))
                arg = Model.get(this.#data, arg);
        }

        return { rule: rule, arg: arg };
    }

    #executeRule(value, ruleString, dataKey) {
        // check if the rule string contains any given argument
        let { rule, arg } = this.#parse(ruleString);

        // check if the rule exists in the available rules
        if(!this.availableRules[rule]) {
            throw new Error('the rule "' + rule + '" does not exist.');
        }

        // run the rule
        if(this.availableRules[rule](value, arg))
            return;

        // add Error to errorsBag in case of failure
        this.#addError(dataKey, rule, 'message');
    }

    #addError(dataKey, rule, errorMessage) {
        let key = dataKey + '.' + rule;

        this.#errorsBag.push({
            key: key,
            dataKey: dataKey,
            message: errorMessage
        });
    }
}

export default Clockwork;
