let searchInput = document.querySelector(".search__input");
let clientId = "987534eb2d868e67daf9"
let clientSecrets = "89ec8661c7ffbd15745ba825ad03f7487987166a"
let URL = `https://api.github.com/search/users?q=hakamqadi&client_id=987534eb2d868e67daf9&client_secret=d148aeea12d7f0d852a03eeaf01f123e84ed722b`


let myName;
let username;
let followers;
let following;
let profileImg;


let profileSection = document.querySelector(".profile")
let reposSection = document.getElementById("repos_sectios")
let myImg = document.getElementById("myImg");


searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        let search = searchInput.value;
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                let profileInfo = data.items[0].url
                fetch(profileInfo).then((respon) => respon.json()).then((data) => {
                    myName = data.name;
                    username = data.login;
                    followers = data.followers;
                    following = data.following;
                    profileImg = data.avatar_url;
                    // myImg.setAttribute("src", profileImg)
                    profileSection.innerHTML = `<img id="myImg" src=${profileImg} alt="" />
                    <h3 style="color: white">${myName}</h3>
        <p style="color: rgb(99, 97, 97)">${username}</p>
        <button>Follow</button>
        <div class="mb-3">
          <a
            class="text-secondary no-underline no-wrap"
            href="https://github.com/imartinez?tab=followers"
          >
            <img id="icon_people" src="icn/people.svg" alt="" />
            <span class="text-white text-bold color-fg-default">${followers}</span>
            followers
          </a>
          ·
          <a
            class="text-secondary Link--secondary no-underline no-wrap"
            href="https://github.com/imartinez?tab=following"
          >
            <span class="text-white text-bold color-fg-default">${following}</span>
            following
          </a>
        </div>
        `;

                     reposSection.innerHTML+=``

                    // console.log(followers)
                    // console.log(following)

                })
            })
            .catch((error) => {
                console.error(error);
            })
    }
})