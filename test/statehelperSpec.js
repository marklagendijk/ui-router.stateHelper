/* globals: beforeEach, describe, it, module, inject, expect */
describe('ui-router.stateHelper', function(){
    var stateHelperProvider, $stateProvider, rootState, expectedState;

    beforeEach(module('ui.router.stateHelper', function(_stateHelperProvider_, _$stateProvider_){
        stateHelperProvider = _stateHelperProvider_;
        $stateProvider = _$stateProvider_;
    }));

    beforeEach(inject(function(){
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

        spyOn($stateProvider, 'state');
    }));

    describe('.state', function(){
        beforeEach(inject(function(){
            expectedState = {
                name: 'root',
                children: [
                    {
                        name: 'root.login',
                        templateUrl: '/partials/views/login.html'
                    },
                    {
                        name: 'root.backup',
                        children: [
                            {
                                name: 'root.backup.dashboard'
                            }
                        ]
                    }
                ]
            };

            stateHelperProvider.state(rootState);
        }));

        it('should set each state', function(){
            expect($stateProvider.state.callCount).toBe(4);
        });

        it('should convert names to dot notation, set parent references', function(){
            // Since the states are objects which contain references to each other, we are testing the eventual
            // root state object (and not the root state object as it is passed to $stateProvider.$state).
            // Because of this we have to test everything at once

            expectedState.children[0].parent = expectedState;
            expectedState.children[1].parent = expectedState;
            expectedState.children[1].children[0].parent = expectedState.children[1];

            expect($stateProvider.state.argsForCall[0][0]).toEqual(expectedState);
        });

        it('should return itself to support chaining', function(){
            expect(stateHelperProvider.state(rootState)).toBe(stateHelperProvider);
        });
    });

    describe('.state with keepOriginalNames set to true', function(){
        beforeEach(inject(function(){
            expectedState = {
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

            stateHelperProvider.state(rootState, true);
        }));

        it('should not convert names to dot notation, set parent references', function(){
            // Since the states are objects which contain references to each other, we are testing the eventual
            // root state object (and not the root state object as it is passed to $stateProvider.$state).
            // Because of this we have to test everything at once

            expectedState.children[0].parent = expectedState;
            expectedState.children[1].parent = expectedState;
            expectedState.children[1].children[0].parent = expectedState.children[1];

            expect($stateProvider.state.argsForCall[0][0]).toEqual(expectedState);
        });
    });

    describe('.setNestedState', function(){
        it('should support .setNestedState as legacy name', function(){
            stateHelperProvider.setNestedState(rootState);
            expect($stateProvider.state.callCount).toBe(4);
        });
    });
});



