let searchInputLeft = document.querySelector(".search__input_left");
let searchInputRight = document.querySelector(".search__input_right");
let clientId = "987534eb2d868e67daf9"
let clientSecrets = "d148aeea12d7f0d852a03eeaf01f123e84ed722b"

let myName
let followers;
let following;
let profileImg;

let leftContainer = document.querySelector(".left_container")
let rightContainer = document.querySelector(".right_container")
let VS = document.getElementById("VS_img")

let leftRepoCount
let rightRepoCount



searchInputLeft.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        let search = searchInputLeft.value;
        fetch(`https://api.github.com/search/users?q=${search}&client_id=${clientId}&client_secret=${clientSecrets}`)
            .then((response) => response.json())
            .then((data) => {
                let profileInfo = data.items[0].url
                fetch(profileInfo).then((respon) => respon.json()).then((data) => {
                    myName = data.name;
                    followers = data.followers;
                    following = data.following;
                    profileImg = data.avatar_url;
                    reposCount = data.public_repos;
                    leftRepoCount = reposCount;
                    leftContainer.innerHTML = `<img class="my_img" src=${profileImg} alt="" />
                    <div class="repo__item">
                      <div class="name">
                        <p>${myName}</p>
                      </div>
                      <div class="info">
                        <p>Followers: ${followers}</p>
                        <p>Following: ${following}</p>
                        <p>Public Repos: ${leftRepoCount}</p>
                      </div>
                    </div>`;
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }
})


searchInputRight.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        let search = searchInputRight.value;
        fetch(`https://api.github.com/search/users?q=${search}&client_id=${clientId}&client_secret=${clientSecrets}`)
            .then((response) => response.json())
            .then((data) => {
                let profileInfo = data.items[0].url
                fetch(profileInfo).then((respon) => respon.json()).then((data) => {
                    myName = data.name;
                    followers = data.followers;
                    following = data.following;
                    profileImg = data.avatar_url;
                    reposCount = data.public_repos;
                    rightRepoCount = reposCount;

                    rightContainer.innerHTML = `<img class="my_img" src=${profileImg} alt="" />
                    <div class="repo__item">
                      <div class="name">
                        <p>${myName}</p>
                      </div>
                      <div class="info">
                        <p>Followers: ${followers}</p>
                        <p>Following: ${following}</p>
                        <p>Public Repos: ${rightRepoCount}</p>
                      </div>
                    </div>`;
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }
})

VS.addEventListener("click", () => {
    if (leftRepoCount > rightRepoCount) {
        console.log("left win");
    }
    else {
        console.log("right win");

    }
})