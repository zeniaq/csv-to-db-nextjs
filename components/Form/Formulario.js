import { useForm } from "react-hook-form";
import { Flex, Stack, Box, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import registryData from "./formData";
import HookForms from "./HookForms";
import { createUser } from "../../utils/supabaseClient";
import toJson from "../csv/toJson";
import toDB from "../csv/toDB";

const Formulario = ({ onOpen, setWrongData }) => {
	const toast = useToast();
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
		reset,
	} = useForm();
	const [jsonCsv, setJsonCsv] = useState(null);

	const onSubmit = handleSubmit(async (hookFormData) => {
		if (hookFormData) {
			// toJson(hookFormData, setJsonCsv);
			toDB(hookFormData, setJsonCsv, onOpen, setWrongData, toast);
			// createUser(hookFormData)
			// 	.then((data) => {
			// 		if (!data.error) {
			// 			console.log("Operación exitosa");
			// 			console.log(`Datos: ${JSON.stringify(data)}`);
			// 		} else {
			// 			console.log(`Error al insertar datos: ${JSON.stringify(data.error)}`);
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.log(`Error en la conexión a la base de datos ${error}`);
			// 	});
		}
	});

	const inputsForm = registryData.map((item) => (
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
			<Flex
				direction="column"
				w="100%"
				align="center"
				justify="center"
				minH="100vh"
				py="20px"
			>
				{inputsForm}

				<Stack
					w="100%"
					h="auto"
					direction="column"
					align="center"
					justify="center"
					spacing={8}
				>
					<Button type="submit" variant="solid" colorScheme="teal">
						Save
					</Button>
					<Box w="90%" align="center" mt={1} pr={1} pos="relative">
						<Button
							type="button"
							variant="clear"
							onClick={() => {
								reset();
								setJsonCsv(null);
							}}
						>
							Borrar todo
						</Button>
					</Box>
				</Stack>
				{jsonCsv && (
					<Box w="100%" bg="red.100">
						{JSON.stringify(jsonCsv)}
					</Box>
				)}
			</Flex>
		</form>
	);
};

export default Formulario;
