const nfaInfos = require('../utils/NFA_infos.json');
const NFA = require('../src/NFA.js');
const assert = require('chai').assert;

describe('#NFA', () => {
	let nfas = {};
	before(() => {
		nfaInfos.map(nfaInfo => {
			nfas[nfaInfo.name] = new NFA(nfaInfo.tuple);
		});
	});

	it('should run all the tests on all the nfa_infos mentioned in the file', () => {
		nfaInfos.forEach(nfaInfo => {
			nfaInfo.passCases.forEach(passCase => {
				assert.ok(nfas[nfaInfo.name].doesAccept(passCase));
			});

			nfaInfo.failCases.forEach(failCase => {
				assert.ok(!nfas[nfaInfo.name].doesAccept(failCase));
			});
		});
	});
});
