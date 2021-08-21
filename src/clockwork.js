const Model = require('dot-prop')
import * as availableRules from './rules'
import { is_object, is_empty_object, defaultErrorMessages } from './utils'

class Clockwork {
    /** public class properties **/
    availableRules
    defaultErrorMessages
    customErrorMessages

    /** private class properties **/
    #data
    #rules
    #errorsBag

    constructor() {
        this.#data = {}
        this.#rules = {}
        this.#errorsBag = []

        this.availableRules = availableRules
        this.defaultErrorMessages = defaultErrorMessages
        this.customErrorMessages = {}
    }

    setState(data) {
        if (!is_object(data)) {
            throw new Error('setState() argument must be an object.')
        }

        this.#data = data
        return this
    }

    setRules(rules) {
        if (!is_object(rules)) {
            throw new Error('setRules() argument must be an object.')
        }

        this.#rules = rules
        return this
    }

    setCustomErrorMessages(errorMessages) {
        if (!is_object(errorMessages)) {
            throw new Error(
                'setCustomErrorMessages() argument must be an object.'
            )
        }

        this.customErrorMessages = errorMessages
        return this
    }

    getData() {
        return this.#data
    }

    getRules() {
        return this.#rules
    }

    getCustomErrorMessages() {
        return this.customErrorMessages
    }

    passes() {
        return this.#validate()
    }

    fails() {
        return !this.passes()
    }

    hasErrors(dataKey) {
        return !!this.getErrors(dataKey).length
    }

    // should add getAllErrors()
    // returns an object of { dataKey: [allDataKeyErrors] }

    getErrors(dataKey) {
        return this.#errorsBag
            .filter((error) => error.dataKey === dataKey)
            .map((item) => item.message)
    }

    //should be renamed to getError() with second optional argument as rule name.
    // if rule name is not passed, by default returns the first error
    // if rule is name passed, get the dataKey.rule error.
    getFirstError(dataKey) {
        return this.hasErrors(dataKey) ? this.getErrors(dataKey)[0] : null
    }

    extend(name, closure) {
        if (!name || !closure) {
            throw new Error(
                'extend() requires two arguments: name string and callback function'
            )
        }

        if (this.availableRules.hasOwnProperty(name)) {
            throw new Error('The rule "' + name + '" exists.')
        }

        if (
            typeof closure !== 'function' ||
            {}.toString.call(closure) !== '[object Function]'
        ) {
            throw new Error(
                'The closure of the custom rule "' +
                    name +
                    '" should be a function.'
            )
        }

        if (typeof closure() !== 'boolean')
            throw new Error(
                `The closure of the custom rule ${name} should return a boolean`
            )

        this.availableRules[name] = closure

        return this
    }

    #validate() {
        if (is_empty_object(this.#rules))
            throw new Error(
                'the rules object is missing. Use setRules() to set it'
            )

        if (is_empty_object(this.#data))
            throw new Error(
                'the state object is missing. Use setState() to set it'
            )

        this.#errorsBag = []

        for (let [dataKey, rulesString] of Object.entries(this.#rules)) {
            let value = Model.has(this.#data, dataKey)
                ? Model.get(this.#data, dataKey)
                : dataKey
            let rules = this.#toArray(rulesString)

            // do not validate any other rule if value is null and 'sometimes' rule exists.
            if (rules.includes('sometimes') && !value) {
                continue
            }

            rules.forEach((rule) => {
                // do not execute the 'sometimes' rule, skip it & continue the loop
                if (rule === 'sometimes') return

                this.#executeRule(value, rule, dataKey)
            })
        }

        return !this.#errorsBag.length
    }

    #toArray(rulesString) {
        let rules = rulesString.split('|')

        rules.forEach((rule, k) => {
            rules[k] = rule.trim()
        })

        return rules
    }

    #parse(ruleString) {
        let rule = ruleString
        let arg = null

        if (
            typeof ruleString === 'string' &&
            ruleString.split(':').length > 1
        ) {
            rule = ruleString.split(':')[0].trim()
            arg = ruleString.split(':')[1].trim()

            if (Model.has(this.#data, arg)) arg = Model.get(this.#data, arg)
        }

        return { rule: rule, arg: arg }
    }

    #executeRule(value, ruleString, dataKey) {
        // check if the rule string contains any given argument
        let { rule, arg } = this.#parse(ruleString)

        // check if the rule exists in the available rules
        if (!this.availableRules.hasOwnProperty(rule)) {
            throw new Error('the rule "' + rule + '" does not exist.')
        }

        // run the rule
        if (this.availableRules[rule](value, arg)) return

        // add error to #errorsBag in case of failure
        let errorMessage = this.#getErrorMessage(dataKey, rule, arg)
        this.#addError(dataKey, rule, errorMessage)
    }

    #getErrorMessage(dataKey, rule, arg = null) {
        let message
        let key = dataKey + '.' + rule

        if (this.customErrorMessages.hasOwnProperty(key))
            message = this.customErrorMessages[key]
        else {
            if (this.defaultErrorMessages.hasOwnProperty(rule))
                message = this.defaultErrorMessages[rule]
            else
                throw new Error(
                    `Set a customer error message for the rule ${rule}`
                )
        }
        return message.replace('{param}', arg)
    }

    #addError(dataKey, rule, errorMessage) {
        let key = dataKey + '.' + rule

        this.#errorsBag.push({
            key: key,
            dataKey: dataKey,
            message: errorMessage,
        })
    }
}

export default Clockwork
