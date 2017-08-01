import store from '../store'
import * as generators from '../generators'
import {pascalCase} from '../util'

export default function generateName() {
	const {form} = store.state
	const generator = createGenerator(form)

	store.setState({generating: true})

	let startTime = new Date()

	generator.generate().then(result => {
		const now = new Date()
		const remaining = Math.max(0, startTime.getTime() + 1000 - now)

		setTimeout(() => {
			store.setState({result, generating: false})
		}, remaining)
	})
}

function createGenerator(form) {
	const {theme} = form

	// 'business' => 'BusinessGenerator'
	const generatorClassName = `${pascalCase(theme)}Generator`

	const Generator = generators[generatorClassName]
	return new Generator(form)
}