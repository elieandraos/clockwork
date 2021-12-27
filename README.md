![GitHub Workflow Status](https://img.shields.io/github/workflow/status/elieandraos/clockwork/CI%20build%20&%20tests)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@elieandraos/clockwork)
[![Coverage Status](https://coveralls.io/repos/github/elieandraos/clockwork/badge.svg?branch=master)](https://coveralls.io/github/elieandraos/clockwork?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/elieandraos/clockwork/badge)](https://www.codefactor.io/repository/github/elieandraos/clockwork)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@elieandraos/clockwork)
![downloads](https://img.shields.io/npm/dt/@elieandraos/clockwork)

- :technologist: Minimal model-based javascript validation library
- :bricks: Can be used with any javascript framework
- :green_heart: Offers 30+ built-in validation rules
- :children_crossing: Easy to use api, inspired from the Laravel validation syntax
- :test_tube: High test coverage

# Installation
```shell
npm install @elieandraos/clockwork --save
```

# Usage
```javascript
import Clockwork from '@elieandraos/clockwork'
const validator = new Clockwork()
```

# Basic validation
Clockwork validates a given data object against a given rules object
```javascript
// define the data and rules objects
validator
   .setData({
      name: '',
      email: ''
   })
   .setRules({
        name: 'required',
        email: 'required'
    })

if ( validator.passes() ) {
    // ... do something when input data are valid
}

// alternately, you could do the inverse
if (validator.fails() ) {
    // ... do something when input data are not valid
}
```

# Complex model validation
- "dot annotations" for nested object properties validation
- multiple rules are separated with a pipe
- rules that accept an additional paramter are suffixed with a semi column followed by the parameter
- rule paramter can be static or from the data object itself

```javascript
validator
   .setData({
      person: {
         name: null,
         age: null,
         email: null
      },
      domain: 'leadwithprimitive.com'
   })
    .setRules({
        'person.name': 'required | alpha',
        'person.age': 'required | integer | min:18',
        'person.email': 'required | email | ends_with:domain' // here domain will be evaluated as 'leadwithprimitive.com'
    })
```

# Accessing the error bag
Clockwork provides 4 helper methods to access any validation error:
```javascript
validator
   .setData({ name: null, age: 10 })
   .setRules({ name: 'required', age: 'min:12' })

if(validator.fails()) {
    validator.hasErrors() // checks if there is any error
    validator.hasErrors('name') // checks if there is any error for the 'name' field
    
    validator.getErrors() // returns all the error messages
    validator.getErrors('name') // returns all the error messages of the 'name' field

    validator.getFirstError() // returns the first error message found
    validator.getFirstError('name') // returns the first error message found of the 'name' field
    
    validator.getErrorBag() // returns the error bag object as it is
}
```

# Custom error messages
Custom error message can be defined with `setCustomErrorMesssages()` method. This method accepts an object of key/value pairs:
- The key is the data property concatenated with the rule name
- The value is the custom message

```javascript
validator
   .setData({ name: null })
   .setRules({ name: 'required' })
   .setCustomErrorMessages({ 'name.required' : 'You must enter your name' })
```

# Custom rules
Custom rules can be created with the `extend()` method. This method accepts three parameters: 
- The first, is the name of the rule name
- The second, is the closure (should return a boolean) that should be executed when calling the rule
- The third (optional), is the rule's error message (default: 'Invalid')

```javascript
validator
   .setData({ age: null })
   .setRules({ age: 'greater_than:18' })
   .extend( 'greated_than', (value, arg) => {
      return value > arg
   }, 'Age must be greater than {param}')
```

# Built-in rules

| Rules                       | Description                                                                                                                 |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **after**:_date_            | The field under validation must be a value after a given date                                                               |
| **after_or_equal**:_date_   | The field under validation must be a value after or equal a given date                                                      |
| **alpha**                   | The field under validation must be entirely alphabetic characters                                                           |
| **alpha_dash**              | The field under validation may have alpha characters, as well as dashes and underscores                                     |
| **alpha_numeric**           | The field under validation may have alpha-numeric characters                                                                |
| **array**                   | The field under validation must be an array                                                                                 |
| **before**:_date_           | The field under validation must be a value before a given date                                                              |
| **before_or_equal**:_date_  | The field under validation must be a value before or equal a given date                                                     |
| **boolean**                 | The field under validation must be able to be cast as a boolean                                                             |
| **date**                    | The field under validation must be a valid javascript date                                                                  |
| **date_format**:_string_    | The field under validation must match the given format                                                                      |
| **different**:_value_       | The field under validation must not match the given value                                                                   |
| **email**                   | The field under validation must be formatted as an email address                                                            |
| **ends_with**:_string_      | The field under validation must end with the given value                                                                    |
| **is_in**:_value_           | The field under validation must be included in the given value. Accepted values are comma seperated string or array         |
| **integer**                 | The field under validation must be an integer                                                                               |
| **json**                    | The field under validation must be a valid JSON object                                                                      |
| **leap_year**               | The field under validation must be a leap year date                                                                         |
| **max**:_value_             | The field under validation must be less than or equal to a maximum value. Accepted values are string, numerics and array    |
| **matches_regex**:_pattern_ | The field under validation must not match the given regular expression                                                      |
| **multiple_of**:_number_    | The field under validation must a be multiple of the given number                                                           |
| **min**:_value_             | The field under validation must be greater than or equal to a minimum value. Accepted values are string, numerics and array |
| **not_in**:_value_          | The field under validation must not be included in the given value. Accepted values are comma seperated string or array     |
| **numberic**                | The field under validation must be a numeric (integer or decimal)                                                           |
| **required**                | The field under validation must be present in the input data and not empty                                                  |
| **same**:_value_            | The field under validation must match the given value                                                                       |
| **size**:_value_            | The field under validation must have a length matching the given value. Accepted value are string and array                 |
| **sometimes**               | The field will only ve validated if present                                                                                 |
| **starts_with**:_string_    | The field under validation must end with the given value                                                                    |
| **string**                  | The field under validation must be a string                                                                                 |
| **today**                   | The field under validation must be a date equal to today                                                                    |
| **tomorrow**                | The field under validation must be a date equal to tomorrow                                                                 |
| **url**                     | The field under validation must be a valid url                                                                              |
| **uuid**                    | The field under validation must be a valid RFC 4122 (version 1, 3, 4, or 5) universally unique identifier (UUID)            |
| **yesterday**               | The field under validation must be a date equal to yesterday                                                                |