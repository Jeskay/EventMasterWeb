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

function postreviewQuery(text, avatar, username, author, discriminator){
	return format(`
	INSERT INTO review (text, avatar, "name", "createdAt", "authorId", discriminator) VALUES (%L, %L, %L, NOW()::timestamp, %L, %L) 
	ON CONFLICT DO NOTHING
	`,text, avatar, username, author, discriminator);
}
function getReviewQuery(authorId) {
	return format(`
	SELECT * FROM public.review
	WHERE "authorId" = %L
	`, authorId);
}
function removeReviewQuery(authorId) {
	return format(`
	DELETE FROM review
	WHERE "authorId" = %L
	`, authorId);
}
function updateReviewQuery(authorId, text) {
	return format(`
		UPDATE public.review SET text = %L 
		WHERE "authorId" = %L
	`, text, authorId);
}
module.exports = {userQuery, reviewsQuery, postreviewQuery, getReviewQuery, removeReviewQuery, updateReviewQuery};