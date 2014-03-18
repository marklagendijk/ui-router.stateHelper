# ui-router.stateHelper
A helper module for AngularUI Router, which allows you to define your states as an object tree.

## Installation
1. `bower install angular-ui-router.stateHelper`
2. Reference `stateHelper.min.js`.
3. Add a dependency on `ui.router.stateHelper` in your app module.

## Usage
``` javascript
angular.module('myApp', ['ui.router', 'ui.router.stateHelper'])
	.config(function(stateHelperProvider){
		stateHelperProvider.setNestedState({
			name: 'root',
			templateUrl: 'root.html',
			children: [
				{
					name: 'contacts',
					templateUrl: 'contacts.html',
					children: [
						{
							name: 'list',
							templateUrl: 'contacts.list.html'
						}
					]
				},
				{
					name: 'products',
					templateUrl: 'products.html',
					children: [
						{
							name: 'list',
							templateUrl: 'products.list.html'
						}
					]
				}
			]
		});
	});
```

## Options
### Dot notation name conversion
By default, all state names are converted to use ui-router's dot notation (e.g. `parentStateName.childStateName`).
This can be disabled by calling `.setNestedState()` with an optional second parameter of `true`.
For example:

``` javascript
angular.module('myApp', ['ui.router', 'ui.router.stateHelper'])
	.config(function(stateHelperProvider){
		stateHelperProvider.setNestedState({
			name: 'root',
			templateUrl: 'root.html',
			children: [
				{
					name: 'contacts',
					templateUrl: 'contacts.html'
				}
			]
		}, true);
	});
```
