var request = require('request');
var secret = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    //make request inside the function
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + secret.GITHUB_TOKEN
        }
    };
        
        request(options, function(err, res, body) {
            var data = JSON.parse(body);
            cb(err, data);
            
    });

}

getRepoContributors('jquery', 'jquery', function(err, result) {
    console.log("Errors:", err);
    result.forEach(function(contributor) {
        console.log("Result:", contributor['avatar_url']);
    });
})