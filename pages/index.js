import { Box, useDisclosure, Button, Center, ButtonGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Formulario from "../components/Form/Formulario";
import toCsv from "../components/csv/toCsv";
import Modal from "../components/Modal";
import { inputForm, selectCsv } from "../components/Form/formData";

export default function Home() {
	const [viewForm, setViewForm] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [wrongData, setWrongData] = useState();
	const [result, setResult] = useState(null);

	return (
		<Box w="100%" h="auto" align="center" justify="center">
			<Stack w="90%" align="center" justify="center">
				<Button
					colorScheme="teal"
					w="200px"
					type="button"
					onClick={() => setViewForm(false)}
				>
					Insertar datos
				</Button>
				<Button
					colorScheme="teal"
					type="button"
					w="200px"
					onClick={() => setViewForm(true)}
				>
					Importar CSV
				</Button>
				<Button w="200px" colorScheme="teal" type="button" onClick={() => toCsv(setResult)}>
					Exportar todo en CSV
				</Button>
			</Stack>
			{/* Hola {result && JSON.stringify(result)} */}
			<Formulario onOpen={onOpen} setWrongData={setWrongData} viewForm={viewForm} />
			<Modal isOpen={isOpen} onClose={onClose} wrongData={wrongData} />
		</Box>
	);
}
