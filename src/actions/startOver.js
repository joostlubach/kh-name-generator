import store from '../store'

export default function startOver() {
	store.setState({generated: [], result: null, exhausted: false})
}