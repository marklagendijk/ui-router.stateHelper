/* globals: beforeEach, describe, it, module, inject, expect */
describe('ui-router.stateHelper', function(){
    var stateHelperProvider, $stateProvider, rootState, expectedState;

    var $injector;

    var stateHelperProviderState;

    beforeEach(module('ui.router.stateHelper', function(_stateHelperProvider_, _$stateProvider_){
        stateHelperProvider = _stateHelperProvider_;
        $stateProvider = _$stateProvider_;
    }));

    beforeEach(inject(function(_$injector_){
      $injector = _$injector_;

        rootState = {
            name: 'root',
            children: [
                {
                    name: 'login',
                    templateUrl: '/partials/views/login.html'
                },
                {
                    name: 'backup',
                    children: [
                        {
                            name: 'dashboard'
                        }
                    ]
                }
            ]
        };

        spyOn($stateProvider, 'state').and.callThrough();
    }));

    describe('.state', function(){
        beforeEach(inject(function(){
            expectedState = {
                name: 'root',
                children: [
                    {
                        name: 'root.login',
            //            nextSibling: 'root.backup',
                        templateUrl: '/partials/views/login.html'
                    },
                    {
                        name: 'root.backup',
           //             previousSibling: 'root.login',
                        children: [
                            {
                                name: 'root.backup.dashboard'
                            }
                        ]
                    }
                ]
            };

            stateHelperProviderState = stateHelperProvider.state(rootState, { siblingTraversal: false});
        }));

        it('should set each state', function(){
            expect($stateProvider.state.calls.count()).toBe(4);
        });

        it('should convert names to dot notation, set parent references', function(){
            // Since the states are objects which contain references to each other, we are testing the eventual
            // root state object (and not the root state object as it is passed to $stateProvider.$state).
            // Because of this we have to test everything at once

            expectedState.children[0].parent = expectedState;
            expectedState.children[1].parent = expectedState;
            expectedState.children[1].children[0].parent = expectedState.children[1];

            // expect($stateProvider.state.argsForCall[0][0]).toEqual(expectedState);
            expect($stateProvider.state.calls.argsFor(0)[0]).toEqual(expectedState);
        });

        it('should return itself to support chaining', function(){
            expect(stateHelperProviderState).toBe(stateHelperProvider);
        });
    });

    describe('.state with keepOriginalNames set to true', function(){
        beforeEach(inject(function(){
            expectedState = {
                name: 'root',
                children: [
                    {
                        name: 'login',
                        // nextSibling: 'backup',
                        templateUrl: '/partials/views/login.html'
                    },
                    {
                        name: 'backup',
                        // previousSibling: 'login',
                        children: [
                            {
                                name: 'dashboard'
                            }
                        ]
                    }
                ]
            };

            stateHelperProvider.state(rootState, { keepOriginalNames: true });
        }));

        it('should not convert names to dot notation, set parent references', function(){
            // Since the states are objects which contain references to each other, we are testing the eventual
            // root state object (and not the root state object as it is passed to $stateProvider.$state).
            // Because of this we have to test everything at once

            expectedState.children[0].parent = expectedState;
            expectedState.children[1].parent = expectedState;
            expectedState.children[1].children[0].parent = expectedState.children[1];

            expect($stateProvider.state.calls.argsFor(0)[0]).toEqual(expectedState);
        });
    });

    describe('.setNestedState', function(){
        it('should support .setNestedState as legacy name', function(){
            stateHelperProvider.setNestedState(rootState);
            expect($stateProvider.state.calls.count()).toBe(4);
        });
    });

    describe('children have references to siblings', function (){
        beforeEach(function () {
            stateHelperProvider.state(rootState, { siblingTraversal: true });
        });

        it('should see the next sibling', function (){
          var $state = $injector.get('$state');
          expect($state.get('root.login').nextSibling).toBeDefined();
          expect($state.get('root.login').nextSibling).toBe('root.backup');
        });

        it('should see the previous sibling', function (){
          var $state = $injector.get('$state');
          expect($state.get('root.backup').previousSibling).toBeDefined();
          expect($state.get('root.backup').previousSibling).toBe('root.login');
        });
    });
});



