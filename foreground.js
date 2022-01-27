const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search..");
input.style.width = "100%";
input.style.padding = "5px 10px";
input.style.marginBottom = "10px";
input.style.background = "black";
input.style.border = "1px solid #21262d";
input.style.outlineOffset = "-1000px";
input.setAttribute("id", "custom-commit-search-input");
const container = document.getElementById("repo-content-pjax-container");
container.insertBefore(input, container.firstChild);
let repo = window.location.href.split("github.com/")[1];
repo = repo.split("/");
const username = repo[0];
const repoName = repo[1];
const branchName = repo[3];
let allCommits = [];
fetch(
  `https://api.github.com/repos/${username}/${repoName}/commits?sha=${branchName}&per_page=100`
).then((res) => {
  res.json().then((response) => {
    allCommits = response;
  });
});
input.addEventListener("keyup", (e) => {
  const filteredCommits = allCommits.filter((commit) => {
    if (
      commit.commit.message.toUpperCase().includes(e.target.value.toUpperCase())
    )
      return true;
  });
  console.log(filteredCommits);
});
