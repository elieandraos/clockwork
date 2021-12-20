- :technologist: Minimal model-based javascript validation library
- :bricks: Can be used natively or as part of any javascript framework
- :green_heart: Offers 25+ validation rules out of out the box
- :alien: Its api is inspired from the Laravel validation system
- :test_tube: High test coverage

# Installation
```shell
npm install @elieandraos/clockwork --save
```

# Usage
```javascript
import Clockwork from '@elieandraos/clockwork'
```

# Basic validation
Clockwork validates a given data object against a given rules object
```javascript
// define the data and rules objects
validator
   .setData({
      name: null,
      email: null
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
- it supports "dot annotations" for nested object properties validation
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
        'person.email': 'required | email | ends_with:domain'
    })
```

# Custom error messages
- Custom error message can be defined with the `setCustomErrorMesssages()` method.
- Its accepts an object of key/value pairs
- The key is the data property concatenated with the rule name

```javascript
validator
   .setData({ name: null })
   .setRules({ name: 'required' })
   .setCustomErrorMessages({ 'name.required' : 'You must enter your name' })
```

# Custom rules
Custom rules can be created with the `extend()` method. This method accepts two parameters: 
- The first, is the name of the rule name. 
- The second, is the closure that should be executed when calling the rule

```javascript
validator
   .setData({ age: null })
   .setRules({ age: 'greater_than:18' })
   .extend( 'greated_than', (value, arg) => {
      return value > arg
   })
```

# Built-in rules

| Rules                     | Description                                                                                                                   |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **after**:date            | _The field under validation must be a value after a given date_                                                               |
| **after_or_equal**:date   | _The field under validation must be a value after or equal a given date_                                                      |
| **alpha**                 | _The field under validation must be entirely alphabetic characters_                                                           |
| **alpha_dash**            | _The field under validation may have alpha characters, as well as dashes and underscores_                                     |
| **alpha_numeric**         | _The field under validation may have alpha-numeric characters_                                                                |
| **array**                 | _The field under validation must be an array_                                                                                 |
| **before**:date           | _The field under validation must be a value before a given date_                                                              |
| **before_or_equal**:date  | _The field under validation must be a value before or equal a given date_                                                     |
| **boolean**               | _The field under validation must be able to be cast as a boolean_                                                             |
| **date**                  | _The field under validation must be a valid javascript date_                                                                  |
| **date_format**:string    | _The field under validation must match the given format_                                                                      |
| **different**:value       | _The field under validation must not match the given value_                                                                   |
| **email**                 | _The field under validation must be formatted as an email address_                                                            |
| **ends_with**:string      | _The field under validation must end with the given value_                                                                    |
| **is_in**:value           | _The field under validation must be included in the given value. Accepted values are comma seperated string or array_         |
| **integer**               | _The field under validation must be an integer_                                                                               |
| **json**                  | _The field under validation must be a valid JSON object_                                                                      |
| **leap_year**             | _The field under validation must be a leap year date_                                                                         |
| **max**:value             | _The field under validation must be less than or equal to a maximum value. Accepted values are string, numerics and array_    |
| **matches_regex**:pattern | _The field under validation must not match the given regular expression_                                                      |
| **min**:value             | _The field under validation must be greater than or equal to a minimum value. Accepted values are string, numerics and array_ |
| **not_in**:value          | _The field under validation must not be included in the given value. Accepted values are comma seperated string or array_     |
| **numberic**              | _The field under validation must be a numeric (integer or decimal)_                                                           |
| **required**              | _The field under validation must be present in the input data and not empty_                                                  |
| **same**:value            | _The field under validation must match the given value_                                                                       |
| **size**:value            | _The field under validation must have a length matching the given value. Accepted value are string and array_                 |
| **sometimes**             | _Validate the field only if present_                                                                                          |
| **starts_with**:string    | _The field under validation must end with the given value_                                                                    |
| **string**                | _The field under validation must be a string_                                                                                 |
| **today**                 | _The field under validation must be a date equal to today_                                                                    |
| **tomorrow**              | _The field under validation must be a date equal to tomorrow_                                                                 |
| **url**                   | _The field under validation must be a valid url_                                                                              |
| **uuid**                  | _The field under validation must be a valid RFC 4122 (version 1, 3, 4, or 5) universally unique identifier (UUID)_            |
| **yesterday**             | _The field under validation must be a date equal to yesterday_                                                                |