# strict-enum
A JavaScript enum implementation, closely resembling that of other languages.

## Install

```
	npm install strict-enum
```

##Syntax

The package exposes a single default object. The Enum constructor.

```javascript
var Enum = require('strict-enum');
```
It can be used with or without the `new` keyword and will return the exact same result either way. The
method without `new` is recommended to keep code cleaner.

```javascript
new Enum('ENUM_ITEM')
// Equivalent to
Enum('ENUM_ITEM')
```
There are three ways to create Enums. By passing Strings, an Array or an Object. It's recommended to
use uppercase for both the Enum name and values, using underscores got gaps.

```javascript
var COLORS = Enum('RED', 'BLUE', 'GREEN');
var SIZES = Enum(['SMALL', 'MEDIUM', 'LARGE']);
var PET_TYPES = Enum({ DOG: 'CANINE', CAT: 'FELINE' });

// To access a specific Enum property
COLORS.RED // ==> Symbol(RED);
```
As you can see, `strict-enum` turns all property values to Symbols. As for the different methods
The first two methods are identical and as such, the first one is recommended to keep code clean.
The third method not only sets the name of the Enum, but also the identifier. As you'll find out
the enum identifiers are mostly useful for debugging purposes.

The difference between this constructor and other enum libraries, and the reason 'strict' makes up half of its name is that all declared properties are unique, constant and enumerable.

```javascript
// This means that given these Enums
var NUMBERS = Enum('ONE', 'TWO', 'THREE');
var POSITIONS = Enum('ONE', 'TWO', 'THREE');

// Despite having a seemingly equal value
// associated with their 'ONE' member
NUMBERS.ONE // ==> Symbol(ONE)
NUMBERS.ONE //

// If we try to compare items from both
NUMBERS.ONE === NUMBERS.ONE // ==> true
NUMBERS.ONE === POSITIONS.ONE // ==> false
// We see that the Symbol will only match with itself.

// The reason for this is that Symbol are unique

// Additionally after an Enum is created its frozen and
// values can no longer be set, added or removed
NUMBERS.ONE = 'Something else';
NUMBERS.FOUR = Symbol(4);
delete NUMBERS.TWO;

// It remains unchanged
NUMBERS // ==> { ONE: Symbol(ONE), TWO: Symbol(TWO), THREE: Symbol(THREE) }

// Enums can be enumarated. The only properties they'll return are their Enum members.
Object.keys(POSITIONS) // ==> ['ONE', 'TWO', 'THREE'];
```
## Usage

Strict Enums might seem limiting, but they help you stick to good practices and standards.
Here's a real world application for them, using them to define a State Machine.

```javascript
var PLAYER_STATES = ('IDLE', 'WALKING', 'RUNNING', 'JUMPING', 'FALLING', 'ATTACKING');

player.state = PLAYER_STATES.IDLE;

// Define different behaviors
switch(state) {
	case PLAYER_STATES.IDLE:
	// Callback for idling
	case PLAYER_STATES.WALKING:
	// Callback for walking
	case PLAYER_STATES.RUNNING:
	// Callback for running
	case PLAYER_STATES.JUMPING:
	// Callback for jumping
	// etc..
}
```