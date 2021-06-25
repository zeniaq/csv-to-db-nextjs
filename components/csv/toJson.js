/* eslint-disable no-undef */
const toJson = (hookFormData, setJsonCsv) => {
	if (hookFormData) {
		if (window.File && window.FileReader) {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = (() => (e) => {
					// eslint-disable-next-line global-require
					const csv = require("csvtojson");
					const csvStr = e.target.result;
					(async () => {
						const jsonObj = await csv().fromString(csvStr);
						setJsonCsv(jsonObj);
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
