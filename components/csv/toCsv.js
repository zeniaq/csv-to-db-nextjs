/* eslint-disable no-console */
/* eslint-disable no-undef */
const toCsv = (items) => {
	const fileTitle = "users";
	const replacer = (key, value) => (value === null ? "" : value);
	const header = Object.keys(items[0]);
	const csv = [
		header.join(","), // header row first
		...items.map((row) =>
			header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(","),
		),
	].join("\r\n");

	const exportedFilenmae = `${fileTitle}.csv` || "export.csv";

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, exportedFilenmae);
	} else {
		const link = document.createElement("a");
		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", exportedFilenmae);
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	console.log(csv);
};

export default toCsv;
