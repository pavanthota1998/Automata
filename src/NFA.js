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
				if (Object.keys(this.transitionFunction[state]).includes('e')) {
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
}

module.exports = NFA;