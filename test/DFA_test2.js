const dfaInfos = require('../utils/DFA_infos.json');
const DFA = require('../src/DFA.js');
const assert = require('chai').assert;

describe('#DFA', () => {
	let dfas = {};
	before(() => {
		dfaInfos.map(dfaInfo => {
			dfas[dfaInfo.name] = new DFA(dfaInfo.tuple);
		});
	});

	it('should run all the tests on all the dfa_infos mentioned in the file', () => {
		dfaInfos.forEach(dfaInfo => {
			dfaInfo.passCases.forEach(passCase => {
				assert.ok(dfas[dfaInfo.name].doesAccept(passCase));
			});

			dfaInfo.failCases.forEach(failCase => {
				assert.ok(!dfas[dfaInfo.name].doesAccept(failCase));
			});
		});
	});
});
