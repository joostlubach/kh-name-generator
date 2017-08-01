import store from '../store'
import * as generators from '../generators'
import {pascalCase} from '../util'

export default async function generateName() {
	const {form} = store.state
	const generator = createGenerator(form)

	store.setState({generating: true})

	let startTime = new Date()

	try {
		let result = null
		let attempt = 0
		while (result == null && attempt < 20) {
			result = await tryGenerate(generator)
			attempt += 1
		}

		const now = new Date()
		const remaining = Math.max(0, startTime.getTime() + 1000 - now)

		setTimeout(() => {
			if (result == null) {
				store.setState({exhausted: true, generating: false})
				return
			}

			const {generated} = store.state
			store.setState({
				result,
				generated: [...generated, result.name],
				generating: false
			})
		}, remaining)
	} catch (error) {
		store.setState({error: true, generating: false})
	}
}

async function tryGenerate(generator) {
	const {generated} = store.state
	const result = await generator.generate()
	if (generated.includes(result.name)) { return null }

	return result
}

function createGenerator(form) {
	const {theme} = form

	// 'business' => 'BusinessGenerator'
	const generatorClassName = `${pascalCase(theme)}Generator`
	const Generator = generators[generatorClassName]

	return new Generator(form)
}