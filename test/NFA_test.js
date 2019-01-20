const assert = require('chai').assert;
const _ = require('underscore')._;
const NFA = require('../src/NFA.js');

describe('#NFA', () => {
	describe('#NFA which accepts sting with alternate characters beginning and ending with same letter', () => {
		let nfa;
		before(() => {
			nfa = new NFA({
				'states': ['q1', 'q3', 'q7', 'q2', 'q5', 'q6', 'q4'],
				'alphabets': [
					'1',
					'0'
				],
				'transitionFunction': {
					'q1': {
						'e': ['q2', 'q5']
					},
					'q2': {
						'0': ['q3']
					},
					'q3': {
						'1': ['q4']
					},
					'q4': {
						'0': ['q3']
					},
					'q5': {
						'1': ['q6']
					},
					'q6': {
						'0': ['q7']
					},
					'q7': {
						'1': ['q6']
					}
				},
				'startingState': 'q1',
				'acceptableStates': ['q3', 'q6']
			});
		});

		describe('addEpsilon', () => {
			it('should add states to current states without any input if epsilon transition is present', () => {
				let currentStates = ['q1'];
				let expected = ['q1', 'q2', 'q5'];

				nfa.addEpsilons(currentStates);
				assert.deepEqual(currentStates, expected);
			});

			it('should not add any states to current states if epsilon transition is not present', () => {
				let currentStates = ['q2'];

				nfa.addEpsilons(currentStates);
				assert.ok(!_.isEmpty(currentStates));
			});
		});
	});
});

