// call the api for octocat username on page load event
$(document).ready(async function(){
    const onLoadUsername = "octocat";
    renderData(onLoadUsername);                 
});

// search event
$(".js-form-search-bar").on("submit", async function(e){
    e.preventDefault();
    renderData(e.target.elements.searchInput.value);

});

// render data function
async function renderData (searchInput) {
    const response = await fetch(`https://api.github.com/users/${searchInput}`);
    const statusOK = 200;
    if(response.status === statusOK){
        const data = await response.json();
        $(".js-error-msg").removeClass("css-error-msg-visible");
        $(".js-card-profile").attr("src", data.avatar_url);                
        $(".js-name").html((data.name !== null) ? `${data.name}` : `${data.login.replace('@','')}`);                         
        $(".js-joinedDate").html(`Joined ${formatDate(data.created_at)}`);
        $(".js-login").html(`@${data.login}`);
        $(".js-bio").html((data.bio !== null) ? `${data.bio}` : `This profile has no bio.`);
        $(".js-repos").html(data.public_repos);  
        $(".js-followers").html(data.followers);
        $(".js-following").html(data.following);

        console.log(data.location)
        console.log(data.twitter_username)
        console.log(data.blog)
        console.log(data.company)

        if (data.location !== null) {
            $(".js-location").html(`${data.location}`);
            $('.js-location-image').removeClass("css-not-available");
            $(".js-location").removeClass("css-not-available");
        } else {
            $(".js-location").html(`Not Available`);
            $('.js-location-image').addClass("css-not-available");
            $(".js-location").addClass("css-not-available");
        }

        if (data.twitter_username !== null) {
            $(".js-twitter").html(`${data.twitter_username}`);
            $('.js-twitter-image').removeClass("css-not-available");
            $(".js-twitter").removeClass("css-not-available");
        } else {
            $(".js-twitter").html(`Not Available`);
            $('.js-twitter-image').addClass("css-not-available");
            $(".js-twitter").addClass("css-not-available");
        }
        
        if (data.blog !== '') {
            $(".js-website").attr("href", data.blog).html(`${data.blog}`);
            $('.js-website-image').removeClass("css-not-available");
            $(".js-website").removeClass("css-not-available");
        } else {
            $(".js-website").html(`Not Available`);
            $('.js-website-image').addClass("css-not-available");
            $(".js-website").addClass("css-not-available");
        }

        if (data.company !== null) {
            $(".js-company").attr("href", data.html_url).html(data.company);
            $('.js-company-image').removeClass("css-not-available");
            $(".js-company").removeClass("css-not-available");
        } else {
            $(".js-company").html(`Not Available`);
            $('.js-company-image').addClass("css-not-available");
            $(".js-company").addClass("css-not-available");
        }

        $(".js-search-input").val('');
    
    } else {
        $(".js-error-msg").addClass("css-error-msg-visible");
        $(".js-search-input").val('');
    }
}

// color theme btn click event
$(".js-toggle-theme").on("click", function() {
    const LIGHT = "LIGHT";
    const DARK = "DARK";
    let themeColor = LIGHT;
    if($(".js-main").hasClass("css-main-dark") === true) {
        themeColor = DARK;
    }
    if (themeColor === LIGHT) {    
        $(".js-toggle-theme-img").attr("src", 'assets/icon-sun.svg');
        $(".js-main").addClass("css-main-dark");
    } else if (themeColor === DARK) {
        $(".js-toggle-theme-img").attr("src", 'assets/icon-moon.svg');
        $(".js-main").removeClass("css-main-dark");
    }
});


// format date function
function formatDate(date) {
    const splitStringT = date.split("T");
    const splitStringDash = splitStringT[0].split("-");
    const newDate = new Date(splitStringDash[0], splitStringDash[1], splitStringDash[2]);
    const [day, month, year] = [newDate.getDate(), newDate.getMonth(), newDate.getFullYear()];
    const monthName = newDate.toLocaleString('default', { month: 'long' });

    return `${day}  ${monthName}  ${year}`;
}