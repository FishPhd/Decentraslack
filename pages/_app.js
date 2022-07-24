import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<html lang="en" className="h-full bg-gray-100">
			<body className="h-full">
				<Component {...pageProps} />
			</body>
		</html>
	)
}

export default MyApp
