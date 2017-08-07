import translate from '../translate'
import {sample, titleCase} from '../util'

export default class BusinessGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		const parts = []

		const keywords = sample(this.form.keywords, 2)
		if (keywords.length > 0) {
			const translated = await translate(keywords, 'nl', 'en')
			parts.push(...translated)
		}

		const url = `${window.NameGenerator.basePath}/data/business/words.json`
		const response = await fetch(url)
		if (response.status !== 200) {
			throw new Error()
		}

		const wordlist = await response.json()
		const suffix  = sample(wordlist)
		parts.push(suffix)

		return {
			name: titleCase(sample(parts, 2).join(' '))
		}
	}

}