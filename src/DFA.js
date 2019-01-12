class DFA {
  constructor(tuple) {
    this.state = tuple.state;
    this.alphabets = tuple.alphabets;
    this.transitionFunction = tuple.transitionFunction;
    this.startingState = tuple.startingState;
    this.acceptableStates = tuple.acceptableStates;
  }

  validateAlphabet(alphabet) {
    if (!this.alphabets.includes(alphabet)) {
      throw `Unknown symbol '${alphabet}'`;
    }
  }

  changeState(finalState, alphabet) {
    return this.transitionFunction[finalState][alphabet];
  }

  doesAccept(string) {
    let finalState = this.startingState;
    string.split("").forEach(alphabet => {
      this.validateAlphabet(alphabet);
      finalState = this.changeState(finalState, alphabet);
    });

    return this.acceptableStates.includes(finalState);
  }
}

module.exports = DFA;
