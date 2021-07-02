import { Box, useDisclosure, Button, Center, ButtonGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Formulario from "../components/Form/Formulario";
import toCsv from "../components/csv/toCsv";
import Modal from "../components/Modal";

export default function Home() {
	const [viewForm, setViewForm] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [wrongData, setWrongData] = useState();
	const [result, setResult] = useState(null);

	const arr = ["hola", "adios", "(hola)", "(adios"];
	const prueba = (texto) => {
		if (arr.includes(texto)) {
			return console.log(`Si existe ${texto}`);
		}
		return console.log(`No existe ${texto}`);
	};

	return (
		<Box w="100%" h="auto" align="center" justify="center">
			<Stack w="90%" align="center" justify="center">
				<Button colorScheme="teal" w="240px" type="button" onClick={() => prueba("(hola)")}>
					Insertar datos
				</Button>
				<Button
					colorScheme="teal"
					type="button"
					w="240px"
					onClick={() => setViewForm(true)}
				>
					Importar CSV
				</Button>
				<Button
					w="240px"
					colorScheme="teal"
					type="button"
					onClick={() => toCsv(setResult, "full")}
				>
					Exportar todo en CSV
				</Button>
				<Button
					w="240px"
					colorScheme="teal"
					type="button"
					onClick={() => toCsv(setResult, "header")}
				>
					Exportar la plantilla en CSV
				</Button>
			</Stack>
			{/* Hola {result && JSON.stringify(result)} */}
			<Formulario onOpen={onOpen} setWrongData={setWrongData} viewForm={viewForm} />
			<Modal isOpen={isOpen} onClose={onClose} wrongData={wrongData} />
		</Box>
	);
}
