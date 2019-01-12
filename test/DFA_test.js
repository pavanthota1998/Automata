const assert = require("chai").assert;
const DFA = require('../src/DFA.js');

describe("#DFA which accepts only ones", () => {
  let dfa;
  before(() => {
    dfa = new DFA({
      states: ['q1', 'q2'],
      startingState: 'q1',
      acceptableStates: ['q1'],
      transitionFunction: {
        'q1': {
          '0': 'q2',
          '1': 'q1'
        },
        'q2': {
          '0': 'q2',
          '1': 'q2'
        }
      },
      alphabets: ['1', '0']
    });
  });

  describe("acceptable conditions", () => {
    it('should accept 1', () => {
      assert.ok(dfa.doesAccept('1'));
    });

    it('should accept 11', () => {
      assert.ok(dfa.doesAccept('11'));
    });

    it('should accept 111', () => {
      assert.ok(dfa.doesAccept('111'));
    });
  })

  describe("failed conditions", () => {
    it('should not accept 100', () => {
      assert.ok(!dfa.doesAccept('100'));
    });

    it('should not accept 110', () => {
      assert.ok(!dfa.doesAccept('110'));
    });

    it('should not accept 011', () => {
      assert.ok(!dfa.doesAccept('011'));
    });

    it('should not accept 000', () => {
      assert.ok(!dfa.doesAccept('00'));
    });
  })

  describe("'Invalid Alphabet' exception", () => {
    it('should fail and say "Unknown symbol" if input string contains any thing otherthan acceptable alphabets', () => {
      try {
        dfa.doesAccept('102');
        assert.fail("Expected expection 'Unknown symbol'");
      } catch (exception) {
        assert.equal(exception, "Unknown symbol '2'");
      }
    })
  })
});

describe("#DFA which accepts only zeros", () => {
  let dfa;
  before(() => {
    dfa = new DFA({
      states: ['q1', 'q2'],
      startingState: 'q1',
      acceptableStates: ['q1'],
      transitionFunction: {
        'q1': {
          '1': 'q2',
          '0': 'q1'
        },
        'q2': {
          '1': 'q2',
          '0': 'q2'
        }
      },
      alphabets: ['1', '0']
    });
  });

  describe("acceptable conditions", () => {
    it('should accept 0', () => {
      assert.ok(dfa.doesAccept('0'));
    });

    it('should accept 00', () => {
      assert.ok(dfa.doesAccept('00'));
    });

    it('should accept 000', () => {
      assert.ok(dfa.doesAccept('000'));
    });
  })

  describe("failed conditions", () => {
    it('should not accept 100', () => {
      assert.ok(!dfa.doesAccept('100'));
    });

    it('should not accept 010', () => {
      assert.ok(!dfa.doesAccept('010'));
    });

    it('should not accept 001', () => {
      assert.ok(!dfa.doesAccept('001'));
    });

    it('should not accept 101', () => {
      assert.ok(!dfa.doesAccept('101'));
    });

    it('should not accept 110', () => {
      assert.ok(!dfa.doesAccept('110'));
    });

    it('should not accept 011', () => {
      assert.ok(!dfa.doesAccept('011'));
    });

    it('should not accept 111', () => {
      assert.ok(!dfa.doesAccept('111'));
    });
  })

  describe("'Invalid Alphabet' exception", () => {
    it('should fail and say "Unknown symbol" if input string contains any thing otherthan acceptable alphabets', () => {
      try {
        dfa.doesAccept('102');
        assert.fail("Expected expection 'Unknown symbol'");
      } catch (exception) {
        assert.equal(exception, "Unknown symbol '2'");
      }
    })
  })
});
