import { apiHandler, topicsRepo } from '../helpers/topics'

function create(req, res) {
	// split out password from user details
	const { user } = req.body

	topicsRepo.create(user)
	return res.status(200).json({})
}

export default apiHandler({
	post: create
})
