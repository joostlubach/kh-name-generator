import translate from '../translate'
import {sample, titleCase, shuffle} from '../util'

export default class BusinessGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		const parts = []

		if (this.form.keywords.length > 0) {
			const translated = await translate(this.form.keywords, 'nl', 'en')
			parts.push(...sample(translated, 2))
		}

		const response = await fetch('/data/business/words.json')
		if (response.status !== 200) {
			throw new Error()
		}

		const wordlist = await response.json()
		const suffix  = sample(wordlist)
		parts.push(suffix)

		return {
			name: titleCase(shuffle(parts).join(' '))
		}
	}

}