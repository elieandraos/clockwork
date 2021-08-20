import Clockwork from '../../src/clockwork'

const clockwork = new Clockwork()

test('it can validate a custom rule', () => {
    let rules = {
        age: 'required | greater_than_ten',
    }

    let data = {
        age: 8,
    }

    clockwork
        .setRules(rules)
        .setData(data)
        .setCustomErrorMessages({
            'age.greater_than_ten': 'age should be greater than 10!',
        })
        .extend('greater_than_ten', (value) => {
            return value > 10
        })

    expect(clockwork.passes()).toBe(false)
    expect(clockwork.getFirstError('age')).toBe(
        'age should be greater than 10!'
    )

    clockwork.setData({ age: 12 })
    expect(clockwork.passes()).toBe(true)
    expect(clockwork.hasErrors('age')).toBe(false)
})

test('it can validate a custom rule', () => {
    let rules = {
        age: 'required | greater_than:8',
    }

    let data = {
        age: 5,
    }

    clockwork
        .setRules(rules)
        .setData(data)
        .setCustomErrorMessages({
            'age.greater_than': 'age should be greater than {param}!',
        })
        .extend('greater_than', (value, arg) => {
            return value > arg
        })

    expect(clockwork.passes()).toBe(false)
    expect(clockwork.getFirstError('age')).toBe('age should be greater than 8!')

    clockwork.setData({ age: 12 })
    expect(clockwork.passes()).toBe(true)
    expect(clockwork.hasErrors('age')).toBe(false)
})

test('it throws an error if the name and closure arguments are not provided', () => {
    let withoutName = () => {
        clockwork.extend(null, null)
    }
    expect(withoutName).toThrow(Error)
})

test('it throws an error if the rule already exist', () => {
    let ruleExists = () => {
        clockwork.extend('starts_with', () => {
            return true
        })
    }
    expect(ruleExists).toThrow(Error)
})

test('it throws an error if the closure does not return a boolean', () => {
    let closure = () => {
        clockwork.extend('foo', () => {})
    }
    expect(closure).toThrow(Error)
})

test('it throws an error if the closure is not a function', () => {
    let undefinedClosure = () => {
        clockwork.extend('greater_than', undefined)
    }
    expect(undefinedClosure).toThrow(Error)

    let arrayClosure = () => {
        clockwork.extend('greater_than', [])
    }
    expect(arrayClosure).toThrow(Error)

    let stringClosure = () => {
        clockwork.extend('greater_than', '')
    }
    expect(stringClosure).toThrow(Error)

    let nullClosure = () => {
        clockwork.extend('greater_than', null)
    }
    expect(nullClosure).toThrow(Error)

    let objectClosure = () => {
        clockwork.extend('greater_than', {})
    }
    expect(objectClosure).toThrow(Error)

    let booleanClosure = () => {
        clockwork.extend('greater_than', true)
    }
    expect(booleanClosure).toThrow(Error)
})
