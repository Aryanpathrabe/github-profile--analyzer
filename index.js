async function getProfile() {
  const username = document.getElementById("username").value;
  const profileDiv = document.getElementById("profile");
  const reposDiv = document.getElementById("repos");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  profileDiv.innerHTML = "";
  reposDiv.innerHTML = "";
  error.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");

    const user = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
    const repos = await repoRes.json();

    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src="${user.avatar_url}">
        <div>
          <h2>${user.name || user.login}</h2>
          <p>${user.bio || "No bio available"}</p>
          <div class="stats">
            <div class="stat">
              <h3>${user.followers}</h3>
              <p>Followers</p>
            </div>
            <div class="stat">
              <h3>${user.public_repos}</h3>
              <p>Repos</p>
            </div>
            <div class="stat">
              <h3>${user.following}</h3>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
    `;

    reposDiv.innerHTML = `
      <h2 style="margin-bottom:10px;">Top Repositories</h2>
      <div class="repo-grid">
        ${repos.map(repo => `
          <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description"}</p>
            ⭐ ${repo.stargazers_count}
          </div>
        `).join("")}
      </div>
    `;

  } catch (err) {
    error.textContent = err.message;
    error.classList.remove("hidden");
  }

  loading.classList.add("hidden");
}S