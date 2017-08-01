import store from '../store'
import * as generators from '../generators'
import {pascalCase} from '../util'

export default function generateName() {
	const {form} = store.state
	const generator = createGenerator(form)

	store.setState({generating: true})

	generator.generate().then(result => {
		store.setState({result, generating: false})
	})
}

function createGenerator(form) {
	const {theme} = form

	// 'business' => 'BusinessGenerator'
	const generatorClassName = `${pascalCase(theme)}Generator`

	const Generator = generators[generatorClassName]
	return new Generator(form)
}