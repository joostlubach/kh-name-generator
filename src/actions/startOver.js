import store from '../store'
import initialState from '../initialState'

export default function startOver(clearForm) {
	store.setState({generated: [], result: null, error: false, exhausted: false})

	if (clearForm) {
		store.setState({form: {...initialState.form}})
	}
}