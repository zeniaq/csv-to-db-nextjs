/* eslint-disable no-return-await */
import { useToast } from "@chakra-ui/react";
import { updateUser, readUser } from "../../utils/supabaseClient";
import toJson from "./toJson";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve(), ms));

const Toast = (toast, counts, action) =>
	toast({
		title: "Estado de la actualización",
		description: `Datos totales actualizados: ${counts[0]}	||	Datos con incongruencias: ${counts[1]}`,
		status: "info",
		duration: 5000,
		isClosable: true,
		onCloseComplete: () => action(),
	});

const allDataDB = () =>
	new Promise((resolve) => {
		readUser()
			.then((data) => {
				if (!data.error) {
					return setTimeout(resolve(data.data), 500);
				}
				return console.log("Error al guardar los registros");
			})
			.catch((error) => {
				console.log(`Error al consultar: ${error}`);
			});
	});

const dataComparison = (obj1, obj2) => {
	const objs = [obj1];
	const objComparison = objs.filter(
		(obj) =>
			obj.id === parseInt(obj2.id, 10) &&
			obj.firstName === obj2.firstName &&
			obj.lastName === obj2.lastName &&
			obj.email === obj2.email &&
			obj.phone === parseInt(obj2.phone, 10) &&
			obj.status === obj2.status,
	);

	return objComparison.length > 0;
};

const updateRegistry = (fromCsv, onOpen, setWrongData, toast) => {
	const wrongData = [];
	let countDataSuccess = 0;
	let countDataWrong = 0;
	allDataDB()
		.then(async (fromDB) => {
			fromDB.map(async (item, index) => {
				if (!dataComparison(item, fromCsv[index])) {
					if (item.id !== parseInt(fromCsv[index].id, 10)) {
						const noMatchObj = {
							idDB: item.id,
							firstNameDB: item.firstName,
							idCsv: Number.isNaN(parseInt(fromCsv[index].id, 10))
								? ""
								: parseInt(fromCsv[index].id, 10),
							firstNameCsv: fromCsv[index].firstName,
						};
						wrongData.push(noMatchObj);
						countDataWrong++;
						return console.log(`El ID no coincide: ${JSON.stringify(noMatchObj)}`);
					}

					console.log(
						`El elemento de la DB: \n${JSON.stringify(
							item,
						)}\n Se reemplazará por: \n${JSON.stringify(fromCsv[index])}`,
					);
					updateUser(fromCsv[index])
						.then(async (result) => {
							if (!result.error) {
								console.log(
									`Se actualizó el registro: ${JSON.stringify(result.data)}`,
								);
								countDataSuccess++;
								return await sleep(500);
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
			setWrongData(wrongData);
			const counts = [countDataSuccess, countDataWrong];
			await sleep(100);
			Toast(toast, counts, onOpen);
			console.log(`Todas las incongruencias: ${JSON.stringify(wrongData)}`);
		})
		.catch((e) => console.log(`Error en: ${e}`));
};

const toDB = (hookFormData, setJsonCsv, onOpen, setWrongData, toast) => {
	toJson(hookFormData, setJsonCsv)
		.then((fromCsv) => {
			// console.log(`fromCsv: ${JSON.stringify(fromCsv)}`);
			updateRegistry(fromCsv, onOpen, setWrongData, toast);
		})
		.catch((e) => console.log(`error en toDB: ${JSON.stringify(e)}`));
};

export default toDB;
