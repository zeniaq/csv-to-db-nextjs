import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { readUser } from "../utils/supabaseClient";
import Formulario from "../components/Form/Formulario";
import toCsv from "../components/csv/toCsv";

export default function Home() {
	const [result, setResult] = useState(null);
	const onSubmit = () => {
		readUser("hola")
			.then((data) => {
				if (!data.error) {
					setResult(data.data);
					console.log("Todo ok");
					console.log(JSON.stringify(data.data));
					toCsv(data.data);
				} else {
					console.log("Error");
				}
			})
			.catch((error) => {
				console.log(`Error en ${error}`);
			});
	};
	return (
		<Box>
			<button type="button" onClick={() => onSubmit()}>
				Click
			</button>{" "}
			Hola {result && JSON.stringify(result)}
			<Formulario />
		</Box>
	);
}
