import store from '../store'

export default function startOver() {
	store.setState({generated: [], result: null, error: false, exhausted: false})
}