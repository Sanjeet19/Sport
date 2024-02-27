const Tour = require('../models/tour');
const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching({ store: 'memory' });

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }
    //added cacheing for faster lookups, pagination could also have been used, 
    //but page size and page number would also have to sent in the query parameters, which would change the request format
    let cachedData = await memoryCache.get(name); 
    if (cachedData){
        return cachedData
    }

    let res =  await Tour.getMatchesByTourName(params);
    await memoryCache.set(params, result, 60 * 60); //cache for 1 hour, can be modified based on the usage
    return res
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}