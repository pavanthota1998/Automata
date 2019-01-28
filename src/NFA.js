const _ = require('underscore')._;

class NFA {
	constructor(tuple) {
		this.states = tuple.states;
		this.alphabets = tuple.alphabets;
		this.transitionFunction = tuple.transitionFunction;
		this.startingState = tuple.startingState;
		this.acceptableStates = tuple.acceptableStates;
	}

	addEpsilons(currentStates) {
		let temp = [];
		let statesToCheckForEpsilon = [...currentStates];
		let eplisonStates;
		do {
			statesToCheckForEpsilon.forEach((state) => {
				if (this.transitionFunction[state] && Object.keys(this.transitionFunction[state]).includes('e')) {
					eplisonStates = this.transitionFunction[state]['e'].filter((state) => {
						return !currentStates.includes(state);
					});
					currentStates.push(...eplisonStates);
					temp.push(...eplisonStates);
				}
			});
			statesToCheckForEpsilon = [...temp];
			temp = [];
		} while (statesToCheckForEpsilon.length != 0);
	}

	changeState(finalState, alphabet) {
		return this.transitionFunction[finalState] && this.transitionFunction[finalState][alphabet];
	}

	doesAccept(string) {
		let finalStates = [this.startingState];
		this.addEpsilons(finalStates);
		let nextStates;
		let temp = [];

		string.split('').forEach((alphabet) => {
			finalStates.forEach((state) => {
				nextStates = this.changeState(state, alphabet);
				!_.isEmpty(nextStates) && temp.push(...nextStates);
			});

			finalStates = [...temp];
			this.addEpsilons(finalStates);
			temp = [];
		});

		return this.acceptableStates.some((state) => {
			return finalStates.includes(state);
		});
	}
}

module.exports = NFA;