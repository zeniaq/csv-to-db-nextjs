/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import { Flex, Stack, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { inputForm, selectCsv } from "./formData";
import HookForms from "./HookForms";
import { createUser } from "../../utils/supabaseClient";
import toDB from "../csv/toDB";
import Toast from "../Toast/Toast";

const Formulario = ({ onOpen, setWrongData, viewForm }) => {
	const toast = useToast();
	const [dataInput, setDataInput] = useState(inputForm);
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = handleSubmit(async (hookFormData) => {
		if (hookFormData) {
			if (viewForm) {
				return toDB(hookFormData, onOpen, setWrongData, toast);
			}
			return createUser(hookFormData)
				.then((data) => {
					if (!data.error) {
						Toast(toast, null, null, "insert");
						reset();
					} else {
						console.log(`Error al insertar datos: ${JSON.stringify(data.error)}`);
					}
				})
				.catch((error) => {
					console.log(`Error en la conexión a la base de datos ${error}`);
				});
		}
		return null;
	});
	useEffect(() => setDataInput(viewForm ? selectCsv : inputForm), [viewForm && viewForm]);

	const inputsForm =
		dataInput &&
		dataInput.map((item) => (
			<HookForms
				key={item.label}
				register={register}
				errors={errors}
				formObj={item}
				watch={watch}
			/>
		));

	return (
		<form onSubmit={onSubmit} style={{ width: "100%", height: "auto" }} id="form-registry">
			<Flex direction="column" w="100%" align="center" justify="center" h="auto" py="20px">
				{inputsForm}

				<Stack
					w="100%"
					h="auto"
					direction="row"
					align="center"
					justify="center"
					spacing={8}
				>
					<Button type="submit" w="130px" variant="solid" colorScheme="teal">
						{viewForm ? "Actualizar" : "Guardar"}
					</Button>

					<Button
						type="button"
						w="130px"
						variant="solid"
						colorScheme="red"
						onClick={() => reset()}
					>
						Borrar todo
					</Button>
				</Stack>
			</Flex>
		</form>
	);
};

Formulario.propTypes = {
	onOpen: PropTypes.func,
	setWrongData: PropTypes.func,
	viewForm: PropTypes.bool,
};

Formulario.defaultProps = {
	onOpen: null,
	setWrongData: null,
	viewForm: false,
};

export default Formulario;
