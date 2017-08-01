// @flow

import translate from 'google-translate-api'
import wordlist from 'data/business.json'
import {sample} from '../util'

export default class BusinessGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		const keyword = sample(this.form.keywords)
		const suffix  = sample(wordlist)
		const translated = await translate(keyword, {from: 'NL', to: 'EN'})

		return {
			name: `${translated} ${suffix}`
		}
	}

}