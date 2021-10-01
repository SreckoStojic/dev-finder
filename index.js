$(document).ready(async function(){
    const response = await fetch('https://api.github.com/users/octocat');
    const data = await response.json()

    $(".js-card-profile").attr("src", data.avatar_url);                
    $(".js-name").html(data.name);                         
    $(".js-joinedDate").html(`Joined ${formatDate(data.created_at)}`);
    $(".js-login").html(`@${data.login}`);
    $(".js-bio").html((data.bio !== null) ? data.bio : `This profile has no bio.`);
    $(".js-repos").html(data.public_repos);  
    $(".js-followers").html(data.followers);
    $(".js-following").html(data.following);
    $(".js-location").html(data.location);
    $(".js-twitter").html((data.twitter_username !== null) ? data.twitter_username : `Not Available`);
    $(".js-website").html(data.blog);
    $(".js-company").attr("href", data.html_url).html(data.company.replace('@',''));                             
});


function formatDate(date) {
    const splitStringT = date.split("T");
    const splitStringDash = splitStringT[0].split("-");
    const newDate = new Date(splitStringDash[0], splitStringDash[1], splitStringDash[2]);
    const [day, month, year] = [newDate.getDate(), newDate.getMonth(), newDate.getFullYear()];
    const monthName = newDate.toLocaleString('default', { month: 'long' });

    return `${day}  ${monthName}  ${year}`;
}