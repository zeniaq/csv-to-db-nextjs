export const inputForm = [
	{
		label: "Nombre",
		name: "firstName",
		type: "text",
		icon: "/icons/user.svg",
		required: true,
	},
	{
		label: "Apellidos",
		name: "lastName",
		type: "text",
		icon: "/icons/user.svg",
		required: true,
	},
	{
		label: "Correo",
		name: "email",
		type: "email",
		icon: "/icons/envelope.svg",
		required: true,
	},
	{
		label: "Número de télefono",
		name: "phone",
		type: "tel",
		icon: "/icons/phone.svg",
		required: false,
	},
	{
		label: "Status",
		name: "status",
		type: "select",
		options: ["Prospecto", "Aspirante", "Inscrito"],
		required: true,
	},
];

export const selectCsv = [
	{
		label: "File",
		name: "files",
		type: "file",
	},
];
