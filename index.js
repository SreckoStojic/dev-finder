import { qS, formatDate } from './utils.js';

// call the api for octocat username on page load event
document.addEventListener("DOMContentLoaded", async function(){
    const onLoadUsername = "octocat";
    renderData(onLoadUsername);
});

// search event
qS(".js-form-search-bar").addEventListener("submit", async function(e){
    e.preventDefault();
    renderData(e.target.elements.searchInput.value);
});

// render data function
async function renderData (searchInput) {
    try {
        var response = await fetch(`https://api.github.com/users/${searchInput}`);
    } catch (error) {
        console.error(error);
    }
    if(response.ok){
        const data = await response.json();
        console.log(qS(".js-error-msg"));
        qS(".js-error-msg").classList.remove("css-error-msg-visible");
        qS(".js-card-profile").setAttribute("src", data.avatar_url);                
        qS(".js-name").innerHTML = (data.name !== null) ? `${data.name}` : `${data.login.replace('@','')}`;                         
        qS(".js-joinedDate").innerHTML = `Joined ${formatDate(data.created_at)}`;
        qS(".js-login").innerHTML = `@${data.login}`;
        qS(".js-bio").innerHTML = (data.bio !== null) ? `${data.bio}` : `This profile has no bio.`;
        qS(".js-repos").innerHTML = data.public_repos;  
        qS(".js-followers").innerHTML = data.followers;
        qS(".js-following").innerHTML = data.following;

        if (data.location !== null) {
            qS(".js-location").innerHTML = `${data.location}`;
            qS('.js-location-image').classList.remove("css-not-available");
            qS(".js-location").classList.remove("css-not-available");
        } else {
            qS(".js-location").innerHTML = `Not Available`;
            qS('.js-location-image').classList.add("css-not-available");
            qS(".js-location").classList.add("css-not-available");
        }

        if (data.twitter_username !== null) {
            qS(".js-twitter").innerHTML = `${data.twitter_username}`;
            qS('.js-twitter-image').classList.remove("css-not-available");
            qS(".js-twitter").classList.remove("css-not-available");
        } else {
            qS(".js-twitter").innerHTML = `Not Available`;
            qS('.js-twitter-image').classList.add("css-not-available");
            qS(".js-twitter").classList.add("css-not-available");
        }
        
        if (data.blog !== '') {
            qS(".js-website").setAttribute("href", data.blog);
            qS(".js-website").innerHTML = `${data.blog}`;
            qS('.js-website-image').classList.remove("css-not-available");
            qS(".js-website").classList.remove("css-not-available");
        } else {
            qS(".js-website").innerHTML = `Not Available`;
            qS('.js-website-image').classList.add("css-not-available");
            qS(".js-website").classList.add("css-not-available");
        }

        if (data.company !== null) {
            qS(".js-company").setAttribute("href", data.innerHTML_url);
            qS('.js-company').innerHTML = data.company;
            qS('.js-company-image').classList.remove("css-not-available");
            qS(".js-company").classList.remove("css-not-available");
        } else {
            qS(".js-company").innerHTML = `Not Available`;
            qS('.js-company-image').classList.add("css-not-available");
            qS(".js-company").classList.add("css-not-available");
        }

        qS(".js-search-input").value = '';
    
    } else {
        qS(".js-error-msg").classList.add("css-error-msg-visible");
        qS(".js-search-input").value = '';
    }
}

// color theme btn click event
qS(".js-toggle-theme").addEventListener("click", function() {
    const LIGHT = "LIGHT";
    const DARK = "DARK";
    let themeColor = LIGHT;
    if(qS(".js-main").classList.contains("css-main-dark") === true) {
        themeColor = DARK;
    }
    if (themeColor === LIGHT) {    
        qS(".js-toggle-theme-img").setAttribute("src", 'assets/icon-sun.svg');
        qS(".js-main").classList.add("css-main-dark");
    } else if (themeColor === DARK) {
        qS(".js-toggle-theme-img").setAttribute("src", 'assets/icon-moon.svg');
        qS(".js-main").classList.remove("css-main-dark");
    }
});