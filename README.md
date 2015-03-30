# ui-router.stateHelper
A helper module for AngularUI Router, which allows you to define your states as an object tree.

## Installation
1. `bower install angular-ui-router.stateHelper` or `npm install angular-ui-router.statehelper`
2. Reference `stateHelper.min.js`.
3. Add a dependency on `ui.router.stateHelper` in your app module.

## Usage
``` javascript
// NOTE: when using child states with views you should make sure that its parent has a template containing a `ui-view` directive.
angular.module('myApp', [ 'ui.router', 'ui.router.stateHelper' ])
    .config(function(stateHelperProvider){
        stateHelperProvider
            .state({
                name: 'root',
                templateUrl: 'root.html',
                children: [
                    {
                        name: 'contacts',
                        template: '<ui-view />',
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
            })
            .state({
                name: 'rootSibling',
                templateUrl: 'rootSibling.html'
            });
    });
```

## Options

 * keepOriginalNames (default _false_)
 * siblingTraversal (default _false_)

### Dot notation name conversion
By default, all state names are converted to use ui-router's dot notation (e.g. `parentStateName.childStateName`).
This can be disabled by calling `.state()` with options `options.keepOriginalNames = true`.
For example:

``` javascript
angular.module('myApp', ['ui.router', 'ui.router.stateHelper'])
	.config(function(stateHelperProvider){
		stateHelperProvider.state({
			name: 'root',
			templateUrl: 'root.html',
			children: [
				{
					name: 'contacts',
					templateUrl: 'contacts.html'
				}
			]
		}, { keepOriginalNames: true });
	});
```

### Sibling Traversal
Child states may optionally receive a reference to the name of the previous state (if available) and the next state (if available) in order to facilitate sequential state traversal as in the case of building wizards or multi-part forms. Enable this by setting `options.siblingTraversal = true`.

Example:
``` javascript

angular.module('myApp', ['ui.router', 'ui.router.stateHelper'])
	.config(function(stateHelperProvider){
		stateHelperProvider.state({
			name: 'resume',
			children: [
				{
					name: 'contactInfo',
				},
				{
					name: 'experience',
				},
				{
					name: 'education',
				}
			]
		}, { siblingTraversal: true });
	});

console.log($state.get('resume.contactInfo').previousSibling) // undefined
console.log($state.get('resume.contactInfo').nextSibling) // 'resume.experience' 

console.log($state.get('resume.experience').previousSibling) // 'resume.contactInfo' 
console.log($state.get('resume.experience').nextSibling) // 'resume.education' 

console.log($state.get('resume.education').previousSibling) // 'resume.experience' 
console.log($state.get('resume.education').nextSibling) // undefined
```


## Name change
Before 1.2.0 `.setNestedState` was used instead of `.state`. In 1.2.0 `setNestedState` was deprecated in favour of `.state`, and chaining was added. This makes it easier to switch between `$stateProvider` and `stateHelperProvider`.
