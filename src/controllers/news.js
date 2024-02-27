const News = require('../models/news');


const createNews = async params => {
    return await News.createNews();
}

const getNewsBySearch = async params => {
    const { name } = params;
    const { id } = params;

    if (!name || !id) {
        throw new Error('Missing required parameter');
    }

    if (params.name == 'sport'){
        return await News.getNewsBySport(params);
    }

    else if (params.name == 'match'){
        return await News.getNewsByMatch(params);
    }

    else if (params.name == 'tour'){
        return await News.getNewsByTour(params);
    }
    
    else{
        throw new Error('Wrong value provided: name')
    }
}


module.exports = {
    createNews: createNews,
    getNewsBySearch: getNewsBySearch,
}