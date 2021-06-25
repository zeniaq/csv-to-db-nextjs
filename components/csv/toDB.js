/* eslint-disable no-return-await */
import { updateUser, readUser } from "../../utils/supabaseClient";
import toJson from "./toJson";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve(), ms));

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

const definitiveComparison = (obj1, obj2) => {
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

const updateRegistry = (fromCsv) => {
	allDataDB()
		.then(async (fromDB) => {
			fromDB.map(async (item, index) => {
				if (!definitiveComparison(item, fromCsv[index])) {
					if (item.id !== parseInt(fromCsv[index].id, 10)) {
						return console.log(
							`El id de la DB: \n${JSON.stringify(
								item.id,
							)}\n No coincide con el csv id: \n${JSON.stringify(
								parseInt(fromCsv[index].id, 10),
							)}`,
						);
					}
					console.log(
						`El elemento de la DB: \n${JSON.stringify(
							item,
						)}\n No coincide con: \n${JSON.stringify(fromCsv[index])}`,
					);
					updateUser(fromCsv[index])
						.then(async (result) => {
							if (!result.error) {
								console.log(
									`Se guardo el elemento: ${JSON.stringify(result.data)}`,
								);
								return await sleep(500);
							}
							return () => {
								console.log(
									`Error en la operación de inserción: ${JSON.stringify(
										result.error,
									)}`,
								);
							};
						})
						.catch((error) => {
							console.log(`Error en la conexión a la base de datos ${error}`);
						});
				}
				return null;
			});
		})
		.catch((e) => console.log(`Error en: ${e}`));
};

const toDB = (hookFormData, setJsonCsv) => {
	toJson(hookFormData, setJsonCsv)
		.then((fromCsv) => {
			// console.log(`fromCsv: ${JSON.stringify(fromCsv)}`);
			updateRegistry(fromCsv);
		})
		.catch((e) => console.log(`error on: ${JSON.stringify(e)}`));
};

export default toDB;
