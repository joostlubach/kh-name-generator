import {sample} from '../util'

export default class HipGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		const keyword = sample(this.form.keywords)

		return {
			name: keyword.toUpperCase()
		}
	}

}