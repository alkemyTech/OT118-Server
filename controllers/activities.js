const activitiesService = require('../services/activities');

const create = async (req, res, next) => {
    try {
        const newActivity = await activitiesService.create(req.body);
        res.status(200).json({
            msg: `Activity created succesfully`,
            data: newActivity,
        })        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    create
}