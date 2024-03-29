import { has, get } from 'dot-prop'
import * as availableRules from './rules'
import { is_object, is_empty_object, defaultErrorMessages } from './utils'

function Clockwork() {
    this.data = {}
    this.rules = {}
    this.errorsBag = []
    this.availableRules = availableRules
    this.defaultErrorMessages = defaultErrorMessages
    this.customErrorMessages = {}

    this.setData = (data) => {
        if (!is_object(data)) {
            throw new Error('setData() argument must be an object')
        }

        this.data = data
        return this
    }

    this.setRules = (rules) => {
        if (!is_object(rules)) {
            throw new Error('setRules() argument must be an object')
        }

        this.rules = rules
        return this
    }

    this.setCustomErrorMessages = (errorMessages) => {
        if (!is_object(errorMessages)) {
            throw new Error(
                'setCustomErrorMessages() argument must be an object'
            )
        }

        this.customErrorMessages = errorMessages
        return this
    }

    this.getData = () => {
        return this.data
    }

    this.getRules = () => {
        return this.rules
    }

    this.getCustomErrorMessages = () => {
        return this.customErrorMessages
    }

    this.passes = () => {
        return this.validate()
    }

    this.fails = () => {
        return !this.passes()
    }

    this.getErrorBag = () => {
        return this.errorsBag
    }

    this.getErrors = (key = null) => {
        return key
            ? this.getErrorBag()
                  .filter(({ dataKey }) => dataKey === key)
                  .map((item) => item.message)
            : this.getErrorBag().map((item) => item.message)
    }

    this.hasErrors = (key = null) => {
        return !!this.getErrors(key).length
    }

    this.getFirstError = (key = null) => {
        return this.hasErrors(key) ? this.getErrors(key)[0] : null
    }

    this.extend = (name, closure, message = 'Invalid') => {
        if (!name || !closure) {
            throw new Error(
                'extend() requires three arguments: name string, callback function and error message string'
            )
        }

        if (Object.prototype.hasOwnProperty.call(this.availableRules, name)) {
            throw new Error('The rule "' + name + '" exists')
        }

        if (
            typeof closure !== 'function' ||
            {}.toString.call(closure) !== '[object Function]'
        ) {
            throw new Error(
                `The closure of the custom rule ${name} should be a function`
            )
        }

        if (typeof closure() !== 'boolean')
            throw new Error(
                `The closure of the custom rule ${name} should return a boolean`
            )

        this.availableRules[name] = closure
        this.defaultErrorMessages[name] = message

        return this
    }

    this.validate = () => {
        if (is_empty_object(this.rules))
            throw new Error(
                'the rules object is missing. Use setRules() to set it'
            )

        if (is_empty_object(this.data))
            throw new Error(
                'the state object is missing. Use setData() to set it'
            )

        this.errorsBag = []

        for (let [dataKey, rulesString] of Object.entries(this.rules)) {
            let value = has(this.data, dataKey)
                ? get(this.data, dataKey)
                : dataKey
            let rules = this.toArray(rulesString)

            // do not validate any other rule if value is null and 'sometimes' rule exists.
            if (rules.includes('sometimes') && !value) {
                continue
            }

            rules.forEach((rule) => {
                // do not execute the 'sometimes' rule, skip it & continue the loop
                if (rule === 'sometimes') return

                this.executeRule(value, rule, dataKey)
            })
        }

        return !this.errorsBag.length
    }

    this.toArray = (rulesString) => {
        let rules = rulesString.split('|')

        rules.forEach((rule, k) => {
            rules[k] = rule.trim()
        })

        return rules
    }

    this.parse = (ruleString) => {
        let rule = ruleString
        let arg = null

        if (
            typeof ruleString === 'string' &&
            ruleString.split(':').length > 1
        ) {
            rule = ruleString.split(':')[0].trim()
            arg = ruleString.split(':')[1].trim()

            if (has(this.data, arg)) arg = get(this.data, arg)
        }

        return { rule: rule, arg: arg }
    }

    this.executeRule = (value, ruleString, dataKey) => {
        // check if the rule string contains any given argument
        let { rule, arg } = this.parse(ruleString)

        // check if the rule exists in the available rules
        if (!Object.prototype.hasOwnProperty.call(this.availableRules, rule)) {
            throw new Error('the rule "' + rule + '" does not exist.')
        }

        // run the rule
        if (this.availableRules[rule](value, arg)) return

        // add error to #errorsBag in case of failure
        let errorMessage = this.getErrorMessage(dataKey, rule, arg)
        this.addError(dataKey, rule, errorMessage)
    }

    this.getErrorMessage = (dataKey, rule, arg = null) => {
        let message
        let key = dataKey + '.' + rule

        message = Object.prototype.hasOwnProperty.call(
            this.customErrorMessages,
            key
        )
            ? this.customErrorMessages[key]
            : this.defaultErrorMessages[rule]

        return message.replace('{param}', arg)
    }

    this.addError = (dataKey, rule, errorMessage) => {
        let key = dataKey + '.' + rule

        this.errorsBag.push({
            key: key,
            dataKey: dataKey,
            message: errorMessage,
        })
    }

    this.reset = () => {
        this.data = {}
        this.rules = {}
        this.errorsBag = []
        this.customErrorMessages = {}
    }
}

export default Clockwork
