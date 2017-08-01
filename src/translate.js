import GoogleTranslate from 'google-translate'

const CACHE = localStorage.translationCache == null ? {} : JSON.parse(localStorage.translationCache)

const apiKey = 'AIzaSyC2TwljtfendVaKI-wcGKwSj0YxL7_9klQ'
const translateAPI = GoogleTranslate(apiKey)

function translate(what, from, to) {
	let wasArray = true
	if (!Array.isArray(what)) {
		what = [what]
		wasArray = false
	}

	const translations = []
	const toLookUp = []
	for (const [i, word] of what.entries()) {
		const fromCache = fetchFromCache(word, from, to)
		if (fromCache) {
			translations[i] = fromCache
		} else {
			toLookUp.push([i, word])
		}
	}

	return new Promise((resolve, reject) => {
		if (toLookUp.length === 0) {
			resolve(wasArray ? translations : translations[0])
		} else {
			const words = toLookUp.map(entry => entry[1])
			translateAPI.translate(words, from, to, (error, results) => {
				if (error != null) {
					reject(error)
				} else {
					if (!Array.isArray(results)) {
						results = [results]
					}
					for (const [i, result] of results.entries()) {
						translations[toLookUp[i][0]] = result.translatedText
						storeInCache(result.originalText, result.translatedText, from, to)
					}

					resolve(wasArray ? translations : translations[0])
				}
			})
		}
	})

}

function fetchFromCache(word, from, to) {
	const key = `${from}-${to}`
	const cache = CACHE[key]
	if (cache) {
		return cache[word]
	} else {
		return null
	}
}

function storeInCache(word, translation, from, to) {
	const key = `${from}-${to}`
	let cache = CACHE[key]
	if (!cache) {
		CACHE[key] = cache = {}
	}

	cache[word] = translation
	window.localStorage.translationCache = JSON.stringify(CACHE)
}

window.translate = translate
export default translate