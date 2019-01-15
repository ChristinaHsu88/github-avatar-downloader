 var arg = process.argv.slice(2);
 
 
 var request = require('request');
 var secret = require('./secret');
 var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

if (arg[1] === undefined || arg[2] === undefined) {
    console.log('there is no such file/person!');
    return;
}

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

getRepoContributors(arg[1], arg[2], function(err, result) {
    if (err) {
        console.log('ERROR: ', err);
        return;
    }
    //console.log(arg[1], arg[2]);
    console.log("Errors:", err);
    var fileName = '';
    var url = '';
    result.forEach(function(contributor) {
        url = contributor.avatar_url;
        fileName = './uploads/' + contributor.login + '.jpg';
        downloadImageByURL(url, fileName);
    });   
});

function downloadImageByURL(url, filePath) {
    console.log(filePath);
    request(url)
        .on('error', function(err) {
            throw err;
        })
        .pipe(fs.createWriteStream(filePath))
        .on('finish', function() {
            console.log('download finished');
        })
}

