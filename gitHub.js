fetch("https://api.github.com/users", {
    method: "GET"
  }).then((data) => data.json())
  .then((data) => {
    const allUsers = document.querySelector(".users");
    data.forEach(user => {
      const userConatiner = document.createElement("div");
      userConatiner.className = "container";
      userConatiner.innerHTML = `
        <img class="imm" src="${user.avatar_url}" alt="Profile" height = "100px">
        <h4 class="user-name">${user.login}</h4>
        <button class="inn" onclick="searchUser('${user.login}')"> View Repository </button>
        <button class="inn" onclick="window.location.href='${user.html_url}'" target = "_blank"> Visit Profile</button>
      `;
      allUsers.append(userConatiner);
    })
  })

function addUser(name) {
  fetch("https://api.github.com/users/"+name, {
      method: "GET"
    }).then((data) => data.json())
    .then((user) => {
      const allUsers = document.querySelector(".users");
        const userConatiner = document.createElement("div");
        userConatiner.className = "container";
        userConatiner.innerHTML = `
          <img class="imm" src="${user.avatar_url}" alt="Profile" height = "100px">
          <h4 class="user-name">${user.login}</h4>
          <button class="inn" onclick="searchUser('${user.login}')"> View Repository </button>
          <button class="inn" onclick="window.location.href='${user.html_url}'" target = "_blank"> Visit Profile</button>
        `;
        allUsers.append(userConatiner);
    })    
}  

function searchUser(name) {
  const name1 = name === undefined ? document.querySelector(".search-user-name").value : name
  console.log(name1, document.querySelector(".search-user-name").value);
  fetch("https://api.github.com/users/" + name1 + "/repos", {
      method: "GET"
    }).then((data) => data.json())
    .then((data) => {
      document.querySelector(".result").innerHTML = "";
      const h = document.createElement("h3");
      h.innerText = name1 + "/Repository{" + data.length + "}"
      h.style.color = "#4ca1af";
      document.querySelector(".result").append(h);
      data.forEach(d => {
        const para = document.createElement("p");
        para.innerText = d.name;
        document.querySelector(".result").append(para);
        console.log(d.name)
      })
    })
    name === undefined ? addUser(name1) : "";
  document.querySelector(".search-user-name").value = "";
}

function searchRepo() {
  fetch("https://api.github.com/users", {
      method: "GET"
    }).then((data) => data.json())
    .then((data) => {
      console.log(data);
      data.forEach(d => {
        searchFiles(d.login);
      })
    })
}

function searchFiles(name) {
  const value = document.querySelector(".search-repo-name").value;
  fetch("https://api.github.com/users/" + name + "/repos", {
      method: "GET"
    }).then((data) => data.json())
    .then((data) => {
      data.forEach(d => {
        if (d.name === value) {
          console.log("true", "https://api.github.com/repos/" + name + "/" + value + "/git/trees/master?recursive=1")
          fetch("https://api.github.com/repos/" + name + "/" + value + "/git/trees/master?recursive=1", {
              method: "GET"
            })
            .then((data) => data.json())
            .then((data) => {
              console.log(data.tree);
              document.querySelector(".result").innerHTML = "";
              const h = document.createElement("h3");
              h.innerText = name + "/Files{" + data.tree.length + "}"
              h.style.color = "#ffc371";
              document.querySelector(".result").append(h);
              data.tree.forEach(d => {
                const para = document.createElement("p");
                para.innerText = d.path;
                document.querySelector(".result").append(para);
                console.log(d.path);
              })
              document.querySelector(".search-repo-name").value = "";
            })
        }
      })
    })
}