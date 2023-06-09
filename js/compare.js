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
let leftResult = document.getElementById("left_result")
let rightResult = document.getElementById("right_result")
let celebrationLeft = document.querySelector(".left")
let celebrationRight = document.querySelector(".right")

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
          myName = data.login;
          followers = data.followers;
          following = data.following;
          profileImg = data.avatar_url;
          reposCount = data.public_repos;
          leftRepoCount = reposCount;
          leftContainer.innerHTML = `
                    <h1 id="left_result"></h1>
                    <img class="my_img" src=${profileImg} alt="" />
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
  celebrationLeft.innerHTML = ''
  celebrationRight.innerHTML = ''
  leftResult = ''
  rightResult = ''


})



searchInputRight.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {

    let search = searchInputRight.value;
    fetch(`https://api.github.com/search/users?q=${search}&client_id=${clientId}&client_secret=${clientSecrets}`)
      .then((response) => response.json())
      .then((data) => {
        let profileInfo = data.items[0].url
        fetch(profileInfo).then((respon) => respon.json()).then((data) => {
          myName = data.login;
          followers = data.followers;
          following = data.following;
          profileImg = data.avatar_url;
          reposCount = data.public_repos;
          rightRepoCount = reposCount;

          rightContainer.innerHTML = `
                    <h1 id="right_result"></h1>
                    <img class="my_img" src=${profileImg} alt="" />
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
    celebrationRight.innerHTML = ''
    celebrationLeft.innerHTML = ''
    leftResult = ''
    rightResult = ''
  }
})

let celeb = document.querySelector(".confetti")
VS.addEventListener("click", () => {
  let leftResult = document.getElementById("left_result")
  let rightResult = document.getElementById("right_result")
  if (leftRepoCount > rightRepoCount) {
    leftResult.textContent = "Winner"
    rightResult.textContent = "Losser"
    celebrationRight.innerHTML = ''
    celebrationLeft.innerHTML = `
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>`
    celeb.style.display = "flex"

  }
  else if (leftRepoCount < rightRepoCount) {
    rightResult.textContent = "Winner"
    leftResult.textContent = "Losser"
    celebrationLeft.innerHTML = ''
    celebrationRight.innerHTML = `
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>`
    celeb.style.display = "flex"

  }
  else {
    rightResult.textContent = "Draw"
    leftResult.textContent = "Draw"
  }
})