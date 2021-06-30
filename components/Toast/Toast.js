const Toast = (toast, counts, action, type) => {
	const toastId = "success-toast";
	if (counts > 0 && type === "errors") {
		return toast({
			title: "Estado de la actualización",
			description: `Datos con incongruencias: ${counts}`,
			status: "info",
			duration: 5000,
			isClosable: true,
			onCloseComplete: () => action(),
		});
	}
	if (type === "nothing") {
		return toast({
			title: "Nada que actualizar",
			description: "Datos actualizados",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	}
	if (type === "success") {
		if (!toast.isActive(toastId)) {
			return toast({
				id: toastId,
				title: "Actualización exitosa",
				description: `Datos actualizados: ${counts}`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
		return toast.update(toastId, {
			id: toastId,
			title: "Actualización exitosa",
			description: `Datos actualizados: ${counts}`,
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	}
	return null;
};

export default Toast;
