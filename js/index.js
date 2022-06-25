// side menu logic
let sideMenuWidth = $("#side-menu").innerWidth()

// side menu logic
$("#menu-btn").click(function(){
    console.log(sideMenuWidth);
    let leftMenu = $("#side-menu").css("left")

    if (leftMenu == "0px") {
        $("#menu-btn").removeClass("bi-x-lg")
        $("#menu-btn").addClass("bi-list")
        $("#side-menu-btn-container").animate({left:0})
        $("#side-menu").animate({left:-250})
    } else {
        $("#menu-btn").removeClass("bi-list")
        $("#menu-btn").addClass("bi-x-lg")
        $("#side-menu-btn-container").animate({left:sideMenuWidth})
        $("#side-menu").animate({left:0})
    }
})


// api calling logic
const nowPlayingMoviesAPI = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
const popularMoviesAPI = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
const topRatedrMoviesAPI = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
const trendingMoviesAPI = "https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
const upcomingMoviesAPI = "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
const searchAPI = "https://api.themoviedb.org/3/search/movie?query=doc&api_key=eba8b9a7199efdcb0ca1f96879b83c44"

async function getNowPlayingMovies() {
    let response =  await fetch(nowPlayingMoviesAPI)
    let responseData = await response.json()
    let result =   responseData.results
    return result
}
async function getPopularMovies() {
    let response =  await fetch(popularMoviesAPI)
    let responseData = await response.json()
    let result =   responseData.results
    return result
}
async function getTopRatedrMoviesMovies() {
    let response =  await fetch(topRatedrMoviesAPI)
    let responseData = await response.json()
    let result =   responseData.results
    return result
}
async function getTrendingMovies() {
    let response =  await fetch(trendingMoviesAPI)
    let responseData = await response.json()
    let result =   responseData.results
    return result
}
async function getUpcomingMovies() {
    let response =  await fetch(upcomingMoviesAPI)
    let responseData = await response.json()
    let result =   responseData.results
    return result
}
async function getSearchMovies() {
    let searchQuery = $("#search").val()
    let response =  await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1&include_adult=false`)
    let responseData = await response.json()
    let result =   responseData.results
    return result
}


async function displayData(resultFunction) {
    let data = await resultFunction()
    let html = '';
    for (let i = 0; i < data.length; i++) {
        let htmlSegment = `
        <div class="col-md-4">
                <div class="img-container">
                    <img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" class="w-100" alt="${data[i].title}">
                    <div class="image-overlay">
                        <h3>${data[i].title}</h3>
                        <p>${data[i].overview}</p>
                        <span>rate: ${data[i].vote_average}</span>
                        <span>${data[i].release_date}</span>
                    </div>
                </div>
        </div>
        `
        html += htmlSegment;
    }
    $("#dataContainer").html(html)
}

$(window).ready(function(){
    displayData(getNowPlayingMovies)
});
$("#nowPlaying").click(function(){
    displayData(getNowPlayingMovies)
});
$("#popular").click(function(){
    displayData(getPopularMovies)
});
$("#topRated").click(function(){
    displayData(getTopRatedrMoviesMovies)
});
$("#trending").click(function(){
    displayData(getTrendingMovies)
});
$("#upcoming").click(function(){
    displayData(getUpcomingMovies)
});

$("#search").keyup(function(){
    displayData(getSearchMovies)
});


// Contact form validation logic

function checkName(nameInputValue) {
    let namePattern =  /^[a-z\d]{5,12}$/i
    let nameValid = false
    if (namePattern.test(nameInputValue)) {
        nameValid = true
    }else
    {
        nameValid = false
    }
    return nameValid
}
$("#userNameInput").keyup(function(){
    let currentUserName = $("#userNameInput").val()
    if (checkName(currentUserName)) {
        $(".userNameMessage").addClass("d-none")
    }else{
        $(".userNameMessage").removeClass("d-none")
    }
})

function checkEmail(emailInputValue) {
    let emailPattern =  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    let emailValid = false
    if (emailPattern.test(emailInputValue)) {
        emailValid = true
    }else
    {
        emailValid = false
    }
    return emailValid
}
$("#emailInput").keyup(function(){
    let currentEmail = $("#emailInput").val()
    if (checkEmail(currentEmail)) {
        $(".emailMessage").addClass("d-none")
    }else{
        $(".emailMessage").removeClass("d-none")
    }
})

function checkPhone(phoneInputValue) {
    let phonePattern =  /^\d{11}$/
    let phoneValid = false
    if (phonePattern.test(phoneInputValue)) {
        phoneValid = true
    }else
    {
        phoneValid = false
    }
    return phoneValid
}
$("#phoneInput").keyup(function(){
    let currentPhone = $("#phoneInput").val()
    if (checkPhone(currentPhone)) {
        $(".phoneMessage").addClass("d-none")
    }else{
        $(".phoneMessage").removeClass("d-none")
    }
})

function checkAge(ageInputValue) {
    let ageValid = false
    if (ageInputValue > 5 && ageInputValue <= 90) {
        ageValid = true
    }else
    {
        ageValid = false
    }
    return ageValid
}
$("#ageInput").keyup(function(){
    let currentAge = $("#ageInput").val()
    if (checkAge(currentAge)) {
        $(".ageMessage").addClass("d-none")
    }else{
        $(".ageMessage").removeClass("d-none")
    }
})

function checkPass(passInputValue) {
    let passPattern =  /^[#\w@_-]{8,20}$/
    let passValid = false
    if (passPattern.test(passInputValue)) {
        passValid = true
    }else
    {
        passValid = false
    }
    return passValid
}
$("#passInput").keyup(function(){
    let currentPass = $("#passInput").val()
    if (checkPass(currentPass)) {
        $(".passMessage").addClass("d-none")
    }else{
        $(".passMessage").removeClass("d-none")
    }
})

function checkRePass(repassInputValue) {
    let repassPattern =  /^[#\w@_-]{8,20}$/
    let repassValid = false
    if (repassPattern.test(repassInputValue) && $("#repassInput").val() == $("#passInput").val()) {
        repassValid = true
    }else
    {
        repassValid = false
    }
    return repassValid
}
$("#repassInput").keyup(function(){
    let currentrePass = $("#repassInput").val()
    if (checkRePass(currentrePass)) {
        $(".repassMessage").addClass("d-none")
    }else{
        $(".repassMessage").removeClass("d-none")
    }
})

let notEmpty =false
let allValid = false;

function isNotEmpty() {
    if (($("#userNameInput").val() != "") && ($("#emailInput").val() != "") && ($("#phoneInput").val() != "") && ($("#ageInput").val() != "") && ($("#passInput").val() != "") && ($("#repassInput").val() != "")) {
        notEmpty = true
    }else
    {
        notEmpty = false
    }
    return notEmpty
}
function isAllValid() {
    if(checkName($("#userNameInput").val()) && checkEmail($("#emailInput").val()) && checkPhone($("#phoneInput").val()) && checkAge($("#ageInput").val()) && checkPass($("#passInput").val()) && checkRePass($("#repassInput").val())){
        allValid = true
    }else
    {
        allValid = false
    }
    return allValid
}

if (isNotEmpty() && isAllValid()) {
    $("#submit").removeClass("disabled")
}else
{
    $("#submit").addClass("disabled")
}

$(".form-container .form-control").focusout(function(){
    
    if (isNotEmpty() && isAllValid()) {
        $("#submit").removeClass("disabled")
    }else
    {
        $("#submit").addClass("disabled")
    }
  });

