export function flatten(obj) {
	let result = "";
	function traverse(obj) {
		if (Array.isArray(obj)) {
			obj.forEach(item => traverse(item));
		} else if (typeof obj === "object") {
			for (let key in obj) {
				traverse(obj[key]);
			}
		} else {
			result += obj + ",";
		}
	}
	traverse(obj);
	return result.slice(0, -1); // Remove the last comma
}

module.exports = flatten;