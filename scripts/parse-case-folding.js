var utils = require('./utils.js');

var parseCaseFolding = function(version) {
	var caseFoldingMap = {};
	var source = utils.readDataFile(version, 'case-folding');
	if (!source) {
		return;
	}
	var lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		var data = line.trim().split(';');
		var codePoint = parseInt(data[0], 16);
		var status = data[1].trim();
		var mappings = data[2].trim().split(' ').map(function(codePoint) {
			return parseInt(codePoint, 16);
		}); // Note: this could be two characters!
		if (!caseFoldingMap[status]) {
			caseFoldingMap[status] = {};
		}
		caseFoldingMap[status][codePoint] = mappings.length == 1 ? mappings[0] : mappings;
	});
	return caseFoldingMap;
};

module.exports = parseCaseFolding;
