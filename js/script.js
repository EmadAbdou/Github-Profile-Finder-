$(document).ready(function () {
    $('#searchField').keyup(function (e) {
        let username = e.target.value;
        // Communicate with Github
        $.ajax({
            type: "Get",
            url: "https://api.github.com/users/"+ username,
            data: {
                client_id : 'c3d6e98fb1bebc16e084',
                client_secret : '05d1ea830000e90c517e1bd08259cdf7f976c04e'
            },
            success: function (user) {
                // Another request for Repos
                $.ajax({
                    type: "Get",
                    url: "https://api.github.com/users/"+ username +'/repos',
                    data: {
                        client_id : 'c3d6e98fb1bebc16e084',
                        client_secret : '05d1ea830000e90c517e1bd08259cdf7f976c04e',
                        sort : 'created: asc',
                        per_page : 5
                    },
                    success: function (repos) {
                        $.each(repos, function (index, repo) {
                             $('#repos').append(`
                             <div class="repocont">
                                <div class="d-block">
                                    <div class=" col-lg-6 col-md-6 repores">
                                        <strong> ${repo.name} </strong>: ${repo.description}
                                    </div>
                                    <div class=" col-lg-3 col-md-3 repores">
                                        <span class="badge badge-dark ">Forks : ${repo.forks_count}</span>
                                        <span class="badge badge-info ">Watches : ${repo.watchers_count}</span>
                                        <span class="badge badge-primary ">Stars : ${repo.stargazers_count}</span>
                                    </div>
                                    <div class="col-lg-3 col-md-3  repores">
                                       <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                                    </div>
                                </div>
                             </div>
                             `);
                        });
                    }
                });
                $('.result').html(`
                <div class=" col-lg-12 profile">
                    <div class="card">
                        <div class="card-header">
                            ${user.login}
                        </div>
                        <div class="card-body row">
                            <div class="img col-lg-3 col-md-3">
                                <img src="${user.avatar_url}" class="thumbnail">
                                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}"> View Profile</a>
                            </div>
                            <div class="col-lg-9 col-md-9">
                                <div class="spans">
                                    <span class="badge badge-dark">Public Repos : ${user.public_repos}</span>
                                    <span class="badge badge-info">Public Gists : ${user.public_gists}</span>
                                    <span class="badge badge-primary">Followers : ${user.followers}</span>
                                    <span class="badge badge-secondary">Following : ${user.following}</span>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item">Company : ${user.company} </li>
                                    <li class="list-group-item">Website/Blog : ${user.blog}</li>
                                    <li class="list-group-item">Location : ${user.location}</li>
                                    <li class="list-group-item">Member Since : ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            Latest Repositories
                        </div>
                        <div class="card-body row" id="repos">
                        </div>
                    </div>
                </div>
                `
                );
            }
        });
    });
});