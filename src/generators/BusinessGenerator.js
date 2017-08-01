export default class BusinessGenerator {

	constructor(form) {
		this.form = form
	}

	async generate() {
		return {
			name: `${this.form.ownName}'s Company`
		}
	}

}