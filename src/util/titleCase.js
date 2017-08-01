export default function titleCase(text) {
	return text
		.toLowerCase()
		.replace(/(^|[^\w\u00C0-\u017F])([\w\u00C0-\u017F])/g, (_, a, b) => `${a}${b.toUpperCase()}`)
}