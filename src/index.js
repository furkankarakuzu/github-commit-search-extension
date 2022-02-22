import { Octokit } from "octokit";
const octockit = new Octokit();
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
const owner = repo[0];
const repoName = repo[1];
const branchName = repo[3];
// let allCommits = [];
// fetch(
//   `https://api.github.com/repos/${username}/${repoName}/commits?sha=${branchName}&per_page=100`
// ).then((res) => {
//   res.json().then((response) => {
//     allCommits = response;
//   });
// });

let commitsContainer = document.querySelector("div.js-navigation-container ");
const noSearchItems = commitsContainer.innerHTML;
input.addEventListener("keyup", async (e) => {
  if (e.target.value != "") {
    commitsContainer.innerHTML = "";
    let query = e.target.value;
    let filteredCommits = [];
    // await octockit.rest.search
    //   .commits({
    //     owner,
    //     repo: repoName,
    //     q,
    //   })
    //   .then((res) => (filteredCommits = res.data.items));
    // await octockit.request({
    //   owner,
    //   repo: repoName,
    //   url: `/repos/${owner}/${repoName}/commits`,
    //   method: "GET",
    //   q,
    // });
    await octockit
      .request("GET /search/commits", {
        q: `${query} repo:${owner}/${repoName}`,
      })
      .then((res) => (filteredCommits = res.data.items));
    filteredCommits.map((item) => {
      let commitDate = new Date(Date.parse(item.commit.committer.date));

      commitDate = commitDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      commitsContainer.innerHTML += `<div class="TimelineItem TimelineItem--condensed pt-0 pb-2">
      <div class="TimelineItem-badge">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
              class="octicon octicon-git-commit">
              <path fill-rule="evenodd"
                  d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z">
              </path>
          </svg>
      </div>
      <div class="TimelineItem-body">
          <h2 class="f5 text-normal">Commits on ${commitDate}</h2>
          <ol class="mt-3 list-style-none Box Box--condensed ml-n6 ml-sm-0 position-relative">
              <li class="Box-row Box-row--focus-gray mt-0 d-flex js-commits-list-item js-navigation-item js-details-container Details js-socket-channel js-updatable-content">

                  <div class="flex-auto min-width-0">
                      <p class="mb-1">
                          <a class="Link--primary text-bold js-navigation-open markdown-title"
                              data-pjax="#repo-content-pjax-container"
                              href=${item.html_url}>${item.commit.message}</a>

                      </p>


                      <div class="d-flex flex-items-center mt-1">

                          <div class="AvatarStack flex-self-start ">
                              <div class="AvatarStack-body" aria-label=${
                                item.author.login
                              }>
                                  <a class="avatar avatar-user" data-skip-pjax="true" data-hovercard-type="user"
                                      data-hovercard-url="/users/${
                                        item.author.login
                                      }/hovercard"
                                      data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self"
                                      style="width:20px;height:20px;" href="/${
                                        item.author.login
                                      }">
                                      <img height="20" width="20" alt="@${
                                        item.author.login
                                      }"
                                          src=${item.author.avatar_url}
                                          class=" avatar-user">
                                  </a>
                              </div>
                          </div>

                          <div class="f6 color-fg-muted min-width-0">

                              <a href="/${
                                item.author.login
                              }/${repoName}/commits?author=${item.author.login}"
                                  class="commit-author user-mention"
                                  title="View all commits by ${
                                    item.author.login
                                  }">${item.author.login}</a>


                              committed
                              <relative-time datetime="${
                                item.commit.committer.date
                              }" class="no-wrap"
                                  title="${
                                    item.commit.committer.date
                                  }">on ${commitDate}</relative-time>

                          </div>
                          <div class="ml-1">


                          </div>
                      </div>
                  </div>

                  <div class="d-none d-md-block flex-shrink-0" data-pjax="#repo-content-pjax-container">





                      <div class="BtnGroup">
                          <clipboard-copy value="${item.sha}"
                              aria-label="Copy the full SHA" class="btn btn-outline BtnGroup-item" tabindex="0"
                              role="button">
                              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                  data-view-component="true" class="octicon octicon-copy">
                                  <path fill-rule="evenodd"
                                      d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z">
                                  </path>
                                  <path fill-rule="evenodd"
                                      d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z">
                                  </path>
                              </svg>
                          </clipboard-copy>

                          <a href=${item.html_url}
                              class="text-mono f6 btn btn-outline BtnGroup-item">
                              ${item.sha.substring(0, 7)}
                          </a>
                      </div>
                      <div class="BtnGroup">
                          <a href="/${item.author.login}/${repoName}/tree/${
        item.sha
      }"
                              aria-label="Browse the repository at this point in the history"
                              class="BtnGroup-item btn btn-outline tooltipped tooltipped-sw" rel="nofollow"><svg
                                  aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                  data-view-component="true" class="octicon octicon-code">
                                  <path fill-rule="evenodd"
                                      d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z">
                                  </path>
                              </svg></a>
                      </div>
                  </div>

              </li>

          </ol>
      </div>
  </div>`;
    });
  } else {
    commitsContainer.innerHTML = noSearchItems;
  }
});
