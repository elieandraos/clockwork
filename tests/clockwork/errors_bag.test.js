import Clockwork from '../../src/clockwork'

const clockwork = new Clockwork()

test('it sets error bag for a failed data validation', () => {
    let rules = {
        name: 'required | string | starts_with:foo',
    }

    let data = {
        name: 12,
    }

    clockwork.setRules(rules).setData(data).passes()

    expect(clockwork.hasErrors('name')).toBe(true)
    expect(clockwork.getErrors('name').length).toBe(2)
    expect(clockwork.getFirstError('name')).toBe(
        clockwork.defaultErrorMessages['string']
    )
})

test("it doesn't set any error for a correct data validation", () => {
    let rules = {
        email: 'string | email',
    }

    let data = {
        email: 'foo@bar.com',
    }

    clockwork.setRules(rules).setData(data).passes()

    expect(clockwork.hasErrors('email')).toBe(false)
    expect(clockwork.getErrors('email').length).toBe(0)
    expect(clockwork.getFirstError('email')).toBe(null)
})

test('it sets custom error messages', () => {
    let customErrorMessages = {
        'foo.required': 'foo is required',
        'bar.integer': 'bar must be an integer',
    }
    clockwork.setCustomErrorMessages(customErrorMessages)

    expect(clockwork.getCustomErrorMessages() === customErrorMessages).toBe(
        true
    )
})

test('it fails to set invalid custom error messages', () => {
    let setArrayData = () => {
        clockwork.setCustomErrorMessages([])
    }
    let setStringData = () => {
        clockwork.setCustomErrorMessages('')
    }
    let setNumberData = () => {
        clockwork.setCustomErrorMessages(123)
    }
    let setNullData = () => {
        clockwork.setCustomErrorMessages(null)
    }
    let setUndefinedData = () => {
        clockwork.setCustomErrorMessages(undefined)
    }

    expect(setArrayData).toThrow(Error)
    expect(setStringData).toThrow(Error)
    expect(setNumberData).toThrow(Error)
    expect(setNullData).toThrow(Error)
    expect(setUndefinedData).toThrow(Error)
})

test('it returns custom error message after a failed validation', () => {
    let rules = {
        first_name: 'required | alpha',
    }

    let data = {
        first_name: 'foo 123',
    }

    clockwork.setCustomErrorMessages({
        'first_name.alpha': 'it name must only contain letters!',
    })
    clockwork.setRules(rules).setData(data).passes()

    expect(clockwork.getFirstError('first_name')).toBe(
        'it name must only contain letters!'
    )
})

test('it parses the rule argument correctly in custom error messages', () => {
    let rules = {
        word: 'required | min:5',
    }

    let data = {
        word: 'foo',
    }

    clockwork.setCustomErrorMessages({
        'word.min': 'it should be at least {param} characters.',
    })
    clockwork.setRules(rules).setData(data).passes()

    expect(clockwork.getFirstError('word')).toBe(
        'it should be at least 5 characters.'
    )
})

test('it parses a dynamic rule argument correctly in custom error message', () => {
    let rules = {
        word: 'required | min:nbChars',
    }

    let data = {
        word: 'foo',
        nbChars: 5,
    }

    clockwork.setCustomErrorMessages({
        'word.min': 'it should be at least {param} characters.',
    })
    clockwork.setRules(rules).setData(data).passes()

    expect(clockwork.getFirstError('word')).toBe(
        'it should be at least 5 characters.'
    )
})
