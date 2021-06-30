export const inputForm = [
	{
		label: "Nombre",
		name: "firstName",
		type: "text",
		icon: "/icons/user.svg",
	},
	{
		label: "Apellidos",
		name: "lastName",
		type: "text",
		icon: "/icons/user.svg",
	},
	{
		label: "Correo",
		name: "email",
		type: "email",
		icon: "/icons/envelope.svg",
	},
	{
		label: "Número de télefono",
		name: "phone",
		type: "tel",
		icon: "/icons/phone.svg",
	},
	{
		label: "Status",
		name: "status",
		type: "select",
		options: ["Prospecto", "Aspirante", "Inscrito"],
	},
];

export const selectCsv = [
	{
		label: "File",
		name: "files",
		type: "file",
	},
];
