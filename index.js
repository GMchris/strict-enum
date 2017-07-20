/**
* Enum - Constructor which can be called as a function.
* Defines are reuseable, enumerable and  constant list of unique elements.
* @param {string[]|string|object} arguments[0] - A collection of items for the enum
* @param {string} arguments[1...] - Any amount of items to add to the enum
*/
exports.default.Enum = function() {
	// If used as a function rather than a constructor, call with new and use the passed arguments.
	if (!new.target) {
		var args = arguments;
		// With this method, the first argument is ignored, so insert a wasted value at the front.
		Array.prototype.unshift.call(arguments, null);
		return new (Function.prototype.bind.apply(Enum, args));
	}

	var items = arguments[0];
	var iterator = 0;
	var map = {};

	if (Array.isArray(items)) {
		items.forEach(function(item) {
			if (typeof item === 'string') {
				map[item] = item;
			}
		});
	} else if (typeof items === 'object' && items !== null) {
		var map = items;
	}

	// Any string arguments are turned into enum items with unique symbols
	Array.prototype.forEach.call(arguments, function(arg) {
		if (typeof arg === 'string') {
			map[arg] = arg;
		}
	});

	for (var item in map) {
		if (map.hasOwnProperty(item)) {
			var value = map[item];

			if (!Number.isInteger(value) && typeof value !== 'string') {
				value = ++iterator;
			}

			Object.defineProperty(this, item, {
				enumerable: true,
				configureable: false,
				writable: false,
				value: Symbol(value)
			});
		}
	}
	// Enum is constant. No properties can be added, altered or removed after construction.
	Object.freeze(this);
}
