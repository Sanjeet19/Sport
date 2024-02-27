const News = require('../controllers/news');

module.exports = function(app) {
    app.post('/news', async (req, res, next) => {
        try {
            let params = req.body
            const { title, description, match, tour, sport } = params;
            if (!title || !description) {
                return res.status(400).json({ message: 'Missing required fields: title and description' });
            }
            if (!match && !sport && ! tour) {
                return res.status(400).json({ message: 'Missing fields: atleast one of match, tour or sport is required' }); //if none present, news becomes unserchable
            }
            await News.createNews(params)
            return res.status(200).json({message: 'Successfully added headline'});
        }catch (err) {
            return next(err);
        }
    });

    app.route('/news/search').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsBySearch(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
    

}