/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.objectOf(PropTypes.any),
};

MyApp.defaultProps = {
	pageProps: {},
};

export default MyApp;
