import { Box, useDisclosure, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Formulario from "../components/Form/Formulario";
import toCsv from "../components/csv/toCsv";
import Modal from "../components/Modal";

export default function Home() {
	const [viewForm, setViewForm] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [wrongData, setWrongData] = useState();

	return (
		<Box w="100%" h="auto" align="center" justify="center">
			<Stack w="90%" align="center" justify="center">
				<Button
					colorScheme="teal"
					w="240px"
					type="button"
					onClick={() => setViewForm(false)}
				>
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
				<Button w="240px" colorScheme="teal" type="button" onClick={() => toCsv("full")}>
					Exportar todo en CSV
				</Button>
				<Button w="240px" colorScheme="teal" type="button" onClick={() => toCsv("header")}>
					Exportar la plantilla en CSV
				</Button>
			</Stack>
			<Formulario onOpen={onOpen} setWrongData={setWrongData} viewForm={viewForm} />
			<Modal isOpen={isOpen} onClose={onClose} wrongData={wrongData} />
		</Box>
	);
}
