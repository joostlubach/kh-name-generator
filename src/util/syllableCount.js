export default function syllableCount(word) {
	// Very crude: count number of vowel groups.
	return Math.max(1, word.split(/[aeiuo\u00C0-\u017F]+/).length - 1)
}