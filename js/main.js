let searchInput = document.querySelector(".search__input");
let clientId = "987534eb2d868e67daf9"
let clientSecrets = "d148aeea12d7f0d852a03eeaf01f123e84ed722b"


let myName;
let username;
let followers;
let following;
let profileImg;


let profileSection = document.querySelector(".profile")
let reposSection = document.getElementById("repos_sectios")
let myImg = document.getElementById("myImg");

let followersPage = "followers.html"
let followingPage = "following.html"

searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    let search = searchInput.value;
    fetch(`https://api.github.com/search/users?q=${search}&client_id=${clientId}&client_secret=${clientSecrets}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items[0]);
        let profileInfo = data.items[0].url
        fetch(profileInfo).then((respon) => respon.json()).then((data) => {
          myName = data.name;
          username = data.login;
          localStorage.setItem("user", username)
          followers = data.followers;
          following = data.following;
          profileImg = data.avatar_url;
          // myImg.setAttribute("src", profileImg)
          profileSection.innerHTML = `<img id="myImg" src=${profileImg} alt="" />
                    <h3 id="my_name">${myName}</h3>
        <p style="color: rgb(99, 97, 97)">${username}</p>
        <button>Follow</button>
        <div class="mb-3">
          <a
            class="text-secondary no-underline no-wrap"
            href=${followersPage}
          >
            <img id="icon_people" src="icn/people.svg" alt="" />
            <span class="text-bold color-fg-default profile_following">${followers}</span>
            followers
          </a>
          ·
          <a
            class="text-secondary Link--secondary no-underline no-wrap"
            href=${followingPage}
          >
            <span class="text-bold color-fg-default profile_following">${following}</span>
            following
          </a>
        </div>
        `;



        });

        let repos = data.items[0].repos_url
        fetch(repos).then((response) => response.json()).then((data) => {
          for (let i = 0; i < 6; i++) {
            // console.log(data[i].language)
            reposSection.innerHTML += `
                        <div
          id="repos_sectios"
          class="row row-cols-1 row-cols-md-2 g-4 col-mid-5 gap-4"
        >
          <div class="col">
            <div class="repo__item">
              <div>
                <h5 class="reponame">${data[i].name}</h5>
                <h5 class="public">Public</h5>
              </div>
              <h5 class="language">${data[i].language}</h5>
            </div>
          </div>
          </div>
          `
          }


        });
        reposSection.innerHTML = ""
      })
      .catch((error) => {
        console.error(error);
      })
  }
})





