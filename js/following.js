let followingCardContainer = document.querySelector(".following_cards");
let clientId = "987534eb2d868e67daf9";
let clientSecrets = "d148aeea12d7f0d852a03eeaf01f123e84ed722b";
let profileSection = document.querySelector(".profile")

let followersURL;
let followersPage = "followers.html"

let username = localStorage.getItem("user")
console.log(username);




fetch(
    `https://api.github.com/search/users?q=${username}&client_id=${clientId}&client_secret=${clientSecrets}`
)
    .then((response) => response.json())
    .then((data) => {


        let profileInfo = data.items[0].url
        fetch(profileInfo).then((respon) => respon.json()).then((data) => {
            myName = data.name;
            username = data.login;
            // localStorage.setItem("user", username)
            followers = data.followers;
            // console.log(followers); 

            following = data.following;
            profileImg = data.avatar_url;
            // myImg.setAttribute("src", profileImg)
            if (followers > 0) {
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
            href="#"
          >
            <span class="text-bold color-fg-default profile_following">${following}</span>
            following
          </a>
        </div>
        `;
            }
            else {
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
            href="#"
          >
            <span class="text-bold color-fg-default profile_following">${following}</span>
            following
          </a>
        </div>`
                followingCardContainer.innerHTML = ` <h3 id = "no_following" > No Following</h3 > `
            }



        });







        followersURL = data.items[0].following_url;
        // console.log(data.items[0].following);
        fetch(`https://api.github.com/users/${username}/following`)
            .then((response) => response.json())
                    .then((followers) => {



                        followers.forEach((follower) => {
                            // console.log(follower.login);
                            followingCardContainer.innerHTML += `
                <div class="col-9">
          <div
            class="row d-flex flex-nowrap justify-content-between align-items-center profile_following"
          >
            <div class="d-flex gap-4 align-items-center">
              <img id="follower_img" src="${follower.avatar_url}" alt="" />
              <p>${follower.login}</p>
            </div>
            <button >Follow</button>
          </div>
        </div>
        <hr style="color: #525e70;">
                `;
                        });
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
