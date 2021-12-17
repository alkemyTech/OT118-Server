const activitiesService = require('../services/activities');

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { content } = req.body;

        if(name && content) {
            const data = {
                name: name,
                content: content,
                image: req.body.image,
            }
            await activitiesService.create(data);
        }        
        res.status(200).json({
            msg: `Activitie created succesfully`,
            data: data,
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    create
}