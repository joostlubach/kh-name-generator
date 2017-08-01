import translate from '../translate'
import wordlist from 'data/hip/words.json'
import {sample, namePrefix, titleCase, shuffle, syllableCount} from '../util'

export default class HipGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		const parts = []

		// Add name.
		const firstName = this.form.ownName.split(/\s+/)[0]

		// With 50% chance, perform an awful a -> å and o -> ø replacement.
		const firstNamePrefix = namePrefix(firstName).replace(/[aeiuo]+/ig, a => {
			if (Math.random() < 0.5) {
				return a.replace(/a/g, 'å').replace(/o/g, 'ø')
			} else {
				return a
			}
		})

		parts.push(firstNamePrefix)

		// Add translated single-syllable keywords, if found.
		if (this.form.keywords.length > 0) {
			const languages = ['sv', 'da', 'no']
			const language = sample(languages)
			const translated = await translate(this.form.keywords, 'nl', language)
			const fewSyllables = translated.filter(word => syllableCount(word) <= 2)
			parts.push(...fewSyllables)
		}

		parts.push(sample(wordlist))

		if (Math.random() < 0.5 && parts.length > 1) {
			// Take two parts, don't uppercase
			return {
				name: titleCase(shuffle(sample(parts, 2)).join(' '))
			}
		} else {
			// Take one part, uppercase.
			return {
				name: sample(parts).toUpperCase()
			}
		}
	}

}