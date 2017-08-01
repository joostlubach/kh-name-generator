import store from '../store'

export default function startOver() {
	store.setState({result: null})
}