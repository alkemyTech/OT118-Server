const activitiesService = require('../services/activities');

const create = async (req, res, next) => {
    try {
        const newActivitie = await activitiesService.create(req.body);
        res.status(200).json({
            msg: `Activitie created succesfully`,
            data: newActivitie,
        })        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    create
}