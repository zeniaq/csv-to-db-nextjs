import { readUser } from "../../utils/supabaseClient";
import { inputForm } from "../Form/formData";

export const saveCsv = (items, nameFile, type) => {
	const fileTitle = nameFile;
	const replacer = (key, value) => (value === null ? "" : value);
	const header = Object.keys(items[0]);
	const headerOK = ["id (required)"];
	const headerForErrors = ["error", "idDB", "firstNameDB", "id (required)"];
	const whichHeader =
		nameFile !== "errorsLog"
			? ["id (required)"]
			: ["error", "idDB", "firstNameDB", "id (required)"];
	const result = header.map((item) =>
		inputForm.find((value) => {
			const fixName = value.name;
			return value.name === item || `${fixName}Csv` === item;
		}),
	);
	result.map((item) => {
		if (item !== undefined) {
			if (item.required) {
				if (item.name === "status") {
					return whichHeader.push(`${item.name} (Prospecto || Aspirante || Inscrito)`);
				}
				return whichHeader.push(`${item.name} (required)`);
			}
			return whichHeader.push(item.name);
		}
		return null;
	});
	let csv = [];
	if (type === "header") {
		csv = [
			whichHeader.join(","), // header row first
		].join("\r\n");
	}
	if (type === "full") {
		csv = [
			whichHeader.join(","), // header row first
			...items.map((row) =>
				header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(","),
			),
		].join("\r\n");
	}

	const exportedFileName = `${fileTitle}.csv` || "export.csv";

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, exportedFileName);
	} else {
		const link = document.createElement("a");
		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", exportedFileName);
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	console.log(csv);
};

const toCsv = (setResult, type) => {
	readUser("hola")
		.then((data) => {
			if (!data.error) {
				setResult(data.data);
				console.log("Todo ok");
				console.log(JSON.stringify(data.data));
				saveCsv(data.data, "users", type);
			} else {
				console.log("Error");
			}
		})
		.catch((error) => {
			console.log(`Error en ${error}`);
		});
};

export default toCsv;
