import translate from '../translate'
import {sample, namePrefix, titleCase, shuffle} from '../util'

export default class RomanticGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		const parts = []

		const firstName = this.form.ownName.split(/\s+/)[0]

		const url = `${window.NameGenerator.basePath}/data/romantic/suffixes.json`
		const response = await fetch(url)
		if (response.status !== 200) {
			throw new Error()
		}

		const suffixes = await response.json()
		const suffix  = sample(suffixes)

		let firstNamePrefix = namePrefix(firstName)
		firstNamePrefix = firstNamePrefix.replace(/([aeiou\u00C0-\u017F])\1/ig, '$1')
		firstNamePrefix = firstNamePrefix.replace(/([^aeiou\u00C0-\u017F])[^aeiou\u00C0-\u017F]+$/i, '$1')

		parts.push(`${firstNamePrefix}${suffix}`)

		if (this.form.keywords.length > 0) {
			const keyword = sample(this.form.keywords)
			const translated = await translate(keyword, 'nl', 'fr')
			parts.push(translated)
		}

		return {
			name: titleCase(shuffle(parts).join(' '))
		}
	}

}