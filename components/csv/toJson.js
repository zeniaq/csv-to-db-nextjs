const toJson = (hookFormData) => {
	const regex = / *\([^)]*\) */g;
	const replaceRequired = (obj) => obj.replace(regex, "");
	if (hookFormData) {
		// eslint-disable-next-line no-undef
		if (window.File && window.FileReader) {
			return new Promise((resolve) => {
				// eslint-disable-next-line no-undef
				const reader = new FileReader();
				reader.onload = (() => (e) => {
					// eslint-disable-next-line global-require
					const csv = require("csvtojson");
					const csvStr = replaceRequired(e.target.result);
					(async () => {
						const jsonObj = await csv().fromString(csvStr);
						setTimeout(resolve(jsonObj), 1000);
					})();
				})(hookFormData[0]);

				reader.readAsText(hookFormData.files[0]);
			});
		}
	}
	return null;
};

export default toJson;
