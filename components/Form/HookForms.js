/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import {
	Input,
	Text,
	InputGroup,
	InputRightElement,
	Image,
	Center,
	Flex,
	Box,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

const ErrorMsg = ({ formObj, errors }) => (
	<Box my={1} bg="rgba(255,255,255,0.2)" rounded="15px">
		<Text textAlign="right" fontSize="10px" color="red.700" fontFamily="mono">
			<ErrorMessage errors={errors} name={formObj.name}>
				{({ messages }) =>
					messages &&
					Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
				}
			</ErrorMessage>
		</Text>
	</Box>
);

const InputIcon = ({ children, formObj, errors }) => (
	<InputGroup w="90%" h="auto">
		<InputRightElement
			align="center"
			justify="center"
			h="70"
			pointerEvents="none"
			children={
				<Center w="100%">
					{formObj && formObj.icon ? (
						<Image
							mr="10px"
							filter="invert(12%) sepia(0%) saturate(0%) hue-rotate(358deg) brightness(100%) contrast(87%)"
							objectFit="cover"
							w="auto"
							h="18px"
							fallbackSrc={formObj ? formObj.icon : ""}
							src={formObj ? formObj.icon : ""}
							alt={`icon-${formObj ? formObj.icon : ""}`}
						/>
					) : null}
				</Center>
			}
		/>

		<Flex w="100%" minH="90px" direction="column">
			{children}
			<ErrorMsg formObj={formObj} errors={errors} />
		</Flex>
	</InputGroup>
);

const typeInput = (formObj, register, errors, watch) => {
	if (formObj.type === "tel") {
		return (
			<InputIcon formObj={formObj} errors={errors}>
				<Input
					h="70px"
					rounded="10px"
					background="#fff"
					_placeholder={{ color: "#393939" }}
					color="#393939"
					paddingLeft="20px"
					textTransform="uppercase"
					type={formObj.type}
					name={formObj.name}
					id={formObj.name}
					key={formObj.name}
					placeholder={`${formObj.label}`}
					size="sm"
					{...register(formObj.name, {
						required: `⚠ ${formObj.label} es requerido`,
						pattern: {
							value: /^(\+\s?)?(1\s?)?(\(\d{3}\)|\d{3})((\s)|(-))?\d{3}((\s)|(-))?\d{4}$/,
							message: " ⚠ Número inválido",
						},
					})}
				/>
			</InputIcon>
		);
	}
	if (formObj.type === "date") {
		return (
			<InputIcon formObj={formObj} errors={errors}>
				<Input
					h="70px"
					rounded="10px"
					background="#fff"
					_placeholder={{ color: "#393939", textTransform: "uppercase" }}
					color="#393939"
					paddingLeft="20px"
					textTransform="uppercase"
					type="date"
					id="date"
					name={formObj.name}
					key={formObj.name}
					placeholder={`${formObj.label}`}
					size="sm"
					{...register(formObj.name, {
						required: `⚠ ${formObj.label} es requerido`,
					})}
				/>
			</InputIcon>
		);
	}
	if (formObj.name === "confirmEmail") {
		return (
			<InputIcon formObj={formObj} errors={errors}>
				<Input
					h="70px"
					rounded="10px"
					background="#fff"
					_placeholder={{ color: "#393939", textTransform: "uppercase" }}
					color="#393939"
					paddingLeft="20px"
					textTransform={formObj.type === "email" ? false : "uppercase"}
					type={formObj.type}
					name={formObj.name}
					id={formObj.name}
					key={formObj.name}
					placeholder={`${formObj.label}`}
					size="sm"
					{...register(formObj.name, {
						required: `⚠ ${formObj.label} es requerido`,
						validate: (value) =>
							value === watch("email") || "⚠ El correo eléctronico no coincide",
					})}
				/>
			</InputIcon>
		);
	}
	if (formObj.name === "files") {
		return (
			<InputIcon formObj={formObj} errors={errors}>
				<Input
					type={formObj.type}
					fontSize="14px"
					name={formObj.name}
					id={formObj.name}
					key={formObj.name}
					{...register(formObj.name, {
						required: `⚠ ${formObj.label} es requerido`,
					})}
					display="inline-block"
				/>
			</InputIcon>
		);
	}
	return (
		<InputIcon formObj={formObj} errors={errors}>
			<Input
				h="70px"
				rounded="10px"
				background="#fff"
				_placeholder={{ color: "#393939", textTransform: "uppercase" }}
				color="#393939"
				paddingLeft="20px"
				textTransform={formObj.type === "email" ? false : "uppercase"}
				type={formObj.type}
				name={formObj.name}
				id={formObj.name}
				key={formObj.name}
				placeholder={`${formObj.label}`}
				size="sm"
				{...register(formObj.name, {
					required: `⚠ ${formObj.label} es requerido`,
				})}
			/>
		</InputIcon>
	);
};

const HookForms = ({ register, errors, formObj, watch }) => (
	<Center w="100%" my={3} fontFamily="mono">
		{typeInput(formObj, register, errors, watch)}
	</Center>
);

HookForms.propTypes = {
	register: PropTypes.func,
	errors: PropTypes.objectOf(PropTypes.any),
	formObj: PropTypes.objectOf(PropTypes.any),
	watch: PropTypes.func,
};

HookForms.defaultProps = {
	register: null,
	errors: {},
	formObj: {},
	watch: null,
};

ErrorMsg.propTypes = {
	errors: PropTypes.objectOf(PropTypes.any),
	formObj: PropTypes.objectOf(PropTypes.any),
};

ErrorMsg.defaultProps = {
	errors: {},
	formObj: {},
};

InputIcon.propTypes = {
	errors: PropTypes.objectOf(PropTypes.any),
	formObj: PropTypes.objectOf(PropTypes.any),
	children: PropTypes.node.isRequired,
};

InputIcon.defaultProps = {
	errors: {},
	formObj: {},
};

export default HookForms;
