const format = require('pg-format');

export function userQuery(id){
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

export function reviewsQuery(){
	return format(`
	SELECT * FROM public.review
	ORDER BY "createdAt" DESC 
	`);
}

export function postreviewQuery(text, score, author){
	return format(`
	INSERT INTO review (text, score, "createdAt", "authorId") VALUES (%L, %L, NOW()::timestamp, %L) 
	ON CONFLICT DO NOTHING
	`,text, score, author);
}

