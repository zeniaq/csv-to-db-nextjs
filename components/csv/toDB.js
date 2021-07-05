/* eslint-disable no-console */
import { updateUser, readUser } from "../../utils/supabaseClient";
import toJson from "./toJson";
import Toast from "../Toast/Toast";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve(), ms));

const allDataDB = () =>
	new Promise((resolve) => {
		readUser()
			.then((data) => {
				if (!data.error) {
					return setTimeout(resolve(data.data), 500);
				}
				return console.log(`Error al guardar los registros: ${JSON.stringify(data.error)}`);
			})
			.catch((error) => {
				console.log(`Error al consultar: ${error}`);
			});
	});

const dataComparison = (obj1, obj2) => {
	const objs = [obj1];
	const statusOK = ["prospecto", "aspirante", "inscrito"];
	const objComparison = objs.filter(
		(obj) =>
			obj.id === parseInt(obj2.id, 10) &&
			obj.firstName === obj2.firstName &&
			obj.lastName === obj2.lastName &&
			obj.email === obj2.email &&
			obj.phone === parseInt(obj2.phone, 10) &&
			obj.status === obj2.status &&
			statusOK.includes(obj2.status.toLowerCase()),
	);

	return objComparison.length > 0;
};

const updateRegistry = (fromCsv, onOpen, setWrongData, toast) => {
	let countDataSuccess = 0;
	let countDataWrong = 0;
	let countGeneral = 0;
	const statusOK = ["prospecto", "aspirante", "inscrito"];
	const wrongData = [];
	allDataDB()
		.then(async (fromDB) => {
			const actionRegistry = () =>
				new Promise((resolve) => {
					fromDB.map((item, index) => {
						if (!dataComparison(item, fromCsv[index])) {
							const idCsv = Number.isNaN(parseInt(fromCsv[index].id, 10))
								? ""
								: parseInt(fromCsv[index].id, 10);
							const phoneCsv = Number.isNaN(parseInt(fromCsv[index].phone, 10))
								? ""
								: parseInt(fromCsv[index].phone, 10);
							const statusCsv = fromCsv[index].status;

							const forComparison = [
								fromCsv[index].firstName,
								fromCsv[index].lastName,
								fromCsv[index].email,
								phoneCsv,
							];

							const pushArrayNoMatchData = (error) => {
								const noMatchObj = {
									error,
									idDB: item.id,
									firstNameDB: item.firstName,
									idCsv,
									firstNameCsv: fromCsv[index].firstName,
									lastNameCsv: fromCsv[index].lastName,
									phoneCsv,
									emailCsv: fromCsv[index].email,
									statusCsv,
								};
								return noMatchObj;
							};
							if (item.id !== parseInt(fromCsv[index].id, 10)) {
								countDataWrong += 1;
								countGeneral += 1;
								return wrongData.push(pushArrayNoMatchData("ID"));
							}

							if (forComparison.includes("")) {
								countDataWrong += 1;
								countGeneral += 1;
								return wrongData.push(pushArrayNoMatchData("FALTAN DATOS"));
							}

							if (!statusOK.includes(statusCsv.toString().toLowerCase())) {
								countDataWrong += 1;
								countGeneral += 1;
								return wrongData.push(pushArrayNoMatchData("STATUS"));
							}

							countGeneral += 1;

							updateUser(fromCsv[index])
								.then((result) => {
									if (!result.error) {
										countDataSuccess += 1;
										Toast(toast, countDataSuccess, onOpen, "success");
										return sleep(200);
									}
									return console.log(
										`Error en la operación de actualización: ${JSON.stringify(
											result.error,
										)}`,
									);
								})
								.catch((error) => {
									console.log(`Error al conectar a la base de datos.\n${error}`);
								});
						}
						return null;
					});
					return setTimeout(resolve("Saliendo del map"), 500);
				});

			// eslint-disable-next-line no-return-await
			return await actionRegistry()
				.then(async () => {
					setWrongData(wrongData);
					await sleep(500);
					if (countDataWrong === 0 && countGeneral === 0) {
						return Toast(toast, 0, onOpen, "nothing");
					}
					return Toast(toast, countDataWrong, onOpen, countDataWrong > 0 && "errors");
				})
				.catch((error) => console.log(`Ocurrio algún error: ${error}`));
		})
		.catch((e) => console.log(`Error en: ${e}`));
};

const toDB = (hookFormData, onOpen, setWrongData, toast) => {
	toJson(hookFormData)
		.then((fromCsv) => {
			updateRegistry(fromCsv, onOpen, setWrongData, toast);
		})
		.catch((e) => console.log(`error en toDB: ${JSON.stringify(e)}`));
};

export default toDB;
