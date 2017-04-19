var axios = require('axios');

//in case of rate limiting
// var id = "YOUR_CLIENT_ID";
// var sec = "YOUR_SECRET_ID";
// var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
	return axios.get('https://api.github.com/users/' + username)
	.then((user) => {
		return user.data
	});
}

function getRepos(username) {
	return axios.get('https://api.github.com/users/' + username + '/repos?&per_page=100')
}

function getStarCount (repos) {
	return repos.data.reduce((count, repo) => {
		return count + repo.stargazers_count;
	}, 0);
}

function calculateScore (profile, repos) {
	var followers = profile.followers;
	var totalStars = getStarCount(repos);

	return (followers * 3) + totalStars;
}
module.exports = {
	battle: function(players) {

	},
	fetchPopularRepos: function(language) {
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');


		return axios.get(encodedURI)
		.then((res) => {
			return res.data.items;
		})
	}
}
