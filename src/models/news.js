const mysql = require('../lib/mysql');

const createNews = async params => {
    const statement = 'insert into news (title, description, matchId, tourId, sportId) values(?,?,?,?,?)';
    const {match, tour, sport} = params 
    
    //handles cases when only 1 is passed as key in the payload, 2 are passed or their values are null or undefiined
    if (match && !tour){
        tour = mysql.query('select tourId from matches where id = ?', match)
    }
    if (tour && !sport){
        sport = mysql.query('select sportId from tours where id = ?', sport)
    }

    const parameters = [params.title, params.description, match, sport, tour];
    return await mysql.query(statement, parameters);
}

const getNewsByMatch = async params => {
    const statement = 'select * from news where matchId = ? order by id desc';
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

const getNewsByTour = async params => {
    const statement = 'select * from news where tourId = ? order by id desc';
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

const getNewsBySport = async params => {
    const statement = 'select * from news where sportId = ? order by id desc';
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}


module.exports = {
    createNews: createNews,
    getNewsByMatch: getNewsByMatch,
    getNewsByTour:getNewsByTour,
    getNewsBySport:getNewsBySport,
}