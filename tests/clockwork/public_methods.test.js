import Clockwork from '../../src/clockwork'

const clockwork = new Clockwork()

test('it creates an instance of the class', () => {
    expect(clockwork instanceof Clockwork).toBe(true)
    expect(clockwork.getData()).toMatchObject({})
    expect(clockwork.getRules()).toMatchObject({})
})

test('it sets data', () => {
    let data = { foo: 'bar', age: 35 }
    clockwork.setState(data)

    expect(clockwork.getData() === data).toBe(true)
})

test('it fails to set invalid data', () => {
    let setArrayData = () => {
        clockwork.setState([])
    }
    let setStringData = () => {
        clockwork.setState('')
    }
    let setNumberData = () => {
        clockwork.setState(123)
    }
    let setNullData = () => {
        clockwork.setState(null)
    }
    let setUndefinedData = () => {
        clockwork.setState(undefined)
    }

    expect(setArrayData).toThrow(Error)
    expect(setStringData).toThrow(Error)
    expect(setNumberData).toThrow(Error)
    expect(setNullData).toThrow(Error)
    expect(setUndefinedData).toThrow(Error)
})

test('it sets rules', () => {
    let rules = { foo: 'required | string', age: 'required | min:18' }
    clockwork.setRules(rules)

    expect(clockwork.getRules() === rules).toBe(true)
})

test('it fails to set invalid rules data type', () => {
    let setArrayRules = () => {
        clockwork.setRules([])
    }
    let setStringRules = () => {
        clockwork.setRules('required')
    }
    let setNumberRules = () => {
        clockwork.setRules(123)
    }
    let setNullRules = () => {
        clockwork.setRules(null)
    }
    let setUndefinedRules = () => {
        clockwork.setRules(undefined)
    }

    expect(setArrayRules).toThrow(Error)
    expect(setStringRules).toThrow(Error)
    expect(setNumberRules).toThrow(Error)
    expect(setNullRules).toThrow(Error)
    expect(setUndefinedRules).toThrow(Error)
})

test('it fails to validate if rules are not set', () => {
    clockwork.setRules({})
    let withEmptyRules = () => {
        clockwork.passes()
    }

    expect(withEmptyRules).toThrow(Error)
})

test('it fails to validate if data are not set', () => {
    clockwork.setRules({ foo: 'required' }).setState({})
    let withEmptyData = () => {
        clockwork.passes()
    }

    expect(withEmptyData).toThrow(Error)
})
