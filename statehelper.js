/**
 * A helper module for AngularUI Router, which allows you to define your states as an object tree.
 * @author Mark Lagendijk <mark@lagendijk.info>
 * @license MIT
 */
angular.module('ui.router.stateHelper', ['ui.router'])
    .provider('stateHelper', ["$stateProvider", function($stateProvider){
        var self = this;

        /**
         * Recursively sets the states using $stateProvider.state.
         * Child states are defined via a `children` property.
         *
         * 1. Recursively calls itself for all descendant states, by traversing the `children` properties.
         * 2. Converts all the state names to dot notation, of the form `grandfather.father.state`.
         * 3. Sets `parent` property of the descendant states.
         *
         * @param {Object} state - A regular ui.router state object.
         * @param {Array} [state.children] - An optional array of child states.
         */
        this.setNestedState = function(state){
            fixStateName(state);
            $stateProvider.state(state);

            if(state.children && state.children.length){
                state.children.forEach(function(childState){
                    childState.parent = state;
                    self.setNestedState(childState);
                });
            }
        };

        self.$get = angular.noop;

        /**
         * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
         * @param state
         */
        function fixStateName(state){
            if(state.parent){
                state.name = state.parent.name + '.' + state.name;
            }
        }
    }])
;
