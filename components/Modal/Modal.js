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

const DataMap = ({ wrongData }) =>
	wrongData.map((item) => (
		<Tr key={`TrElement-${item.idDB}`}>
			<Td key={`Td1-${item.idDB}`}>{item.idDB}</Td>
			<Td key={`Td2-${item.idDB}`}>{item.firstNameDB}</Td>
			<Td key={`Td3-${item.idDB}`}>{item.idCsv}</Td>
			<Td key={`Td4-${item.idDB}`}>{item.firstNameCsv}</Td>
		</Tr>
	));

const Tab = ({ wrongData }) => (
	<Table variant="striped" colorScheme="teal" size="md">
		<TableCaption>El ID no coincide o no esta asignado</TableCaption>
		<Thead>
			<Tr>
				<Th>ID en BDD</Th>
				<Th>Nombre en BDD</Th>
				<Th>ID en CSV</Th>
				<Th>Nombre en CSV</Th>
			</Tr>
		</Thead>
		<Tbody>{wrongData && <DataMap wrongData={wrongData} />}</Tbody>
	</Table>
);

const VerticallyCenter = ({ isOpen, onClose, wrongData }) => (
	<>
		<Modal onClose={onClose} isOpen={isOpen} isCentered size="full">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Datos incongruentes</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
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
