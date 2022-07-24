const fs = require('fs')

let topics = require('./data/topics.json')

export const topicsRepo = {
	topics,
	create
}

function saveData() {
	fs.writeFileSync('./data/topics.json', JSON.stringify(topics, null, 4))
}

function create(topic) {
	topics.push(topic)
	saveData()
}
