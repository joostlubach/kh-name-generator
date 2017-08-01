export default function pascalCase(string) {
	return string.replace(/(^|\W)(\w)/g, (_, a, b) => `${a}${b.toUpperCase()}`)
}