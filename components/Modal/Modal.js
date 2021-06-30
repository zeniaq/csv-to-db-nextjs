import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Box,
} from "@chakra-ui/react";
import { saveCsv } from "../csv/toCsv";

const DataMap = ({ wrongData }) =>
	wrongData.map((item) => (
		<Tr key={`TrElement-${item.idDB}`}>
			<Td key={`Td0-${item.idDB}`}>{item.error}</Td>
			<Td key={`Td1-${item.idDB}`}>{item.idDB}</Td>
			<Td key={`Td2-${item.idDB}`}>{item.firstNameDB}</Td>
			<Td key={`Td3-${item.idDB}`}>{item.idCsv}</Td>
			<Td key={`Td4-${item.idDB}`}>{item.firstNameCsv}</Td>
			<Td key={`Td5-${item.idDB}`}>{item.lastNameCsv}</Td>
			<Td key={`Td6-${item.idDB}`}>{item.phoneCsv}</Td>
			<Td key={`Td7-${item.idDB}`}>{item.emailCsv}</Td>
			<Td key={`Td8-${item.idDB}`}>{item.statusCsv}</Td>
		</Tr>
	));

const Tab = ({ wrongData }) => (
	<Table variant="striped" colorScheme="teal" size="md">
		<TableCaption>Verificar todos los datos</TableCaption>
		<Thead>
			<Tr>
				<Th>Error</Th>
				<Th>ID (BDD)</Th>
				<Th>Nombre (BDD)</Th>
				<Th>ID (CSV)</Th>
				<Th>Nombre (CSV)</Th>
				<Th>Apellido (CSV)</Th>
				<Th>Télefono (CSV)</Th>
				<Th>Correo (CSV)</Th>
				<Th>Estado (CSV)</Th>
			</Tr>
		</Thead>
		<Tbody>{wrongData && <DataMap wrongData={wrongData} />}</Tbody>
	</Table>
);

const VerticallyCenter = ({ isOpen, onClose, wrongData }) => (
	<>
		<Modal onClose={onClose} isOpen={isOpen} isCentered size="full" scrollBehavior="inside">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Datos incongruentes</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Button onClick={() => saveCsv(wrongData, "errorsLog")}>
						Descargar log en CSV
					</Button>
					<Box maxW="100%" overflowX="scroll">
						{wrongData && <Tab wrongData={wrongData} />}
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	</>
);

export default VerticallyCenter;
