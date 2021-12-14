const format = require('pg-format');

function userQuery(id){
    return format(`
        SELECT 
	    id,
	    "eventsPlayed",
	    "eventsHosted",
	    score,
	    banned,
	    "minutesPlayed",
	    (
	    	SELECT 
	    	COUNT("subjectId")
	    	FROM player
	    	LEFT JOIN commend ON player.id = "subjectId" AND cheer
	    	WHERE player.id = id
	    ) AS likes,
	    (
	    	SELECT 
	    	COUNT("subjectId")
	    	FROM player
	    	LEFT JOIN commend ON player.id = "subjectId" AND NOT cheer
	    	WHERE player.id = id
	    ) AS dislikes
        FROM player WHERE player.id = %L`,
		id);
}

function reviewsQuery(){
	return format(`
	SELECT * FROM public.review
	ORDER BY "createdAt" DESC 
	`);
}

function postreviewQuery(text, score, author){
	return format(`
	INSERT INTO review (text, score, "createdAt", "authorId") VALUES (%L, %L, NOW()::timestamp, %L) 
	ON CONFLICT DO NOTHING
	`,text, score, author);
}

module.exports = {userQuery, reviewsQuery, postreviewQuery}