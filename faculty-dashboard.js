// ==========================================
// FACULTY DASHBOARD
// ==========================================


// ==========================================
// LOAD FACULTY NAME
// ==========================================

function loadFacultyData() {

    const savedUser =
        localStorage.getItem("campusconnect_user");


    if (!savedUser) {

        window.location.href =
            "facultylogin.html";

        return;

    }


    const user =
        JSON.parse(savedUser);


    // Make sure this is faculty

    if (user.role !== "faculty") {

        alert("Faculty access required.");

        window.location.href =
            "facultylogin.html";

        return;

    }


    const facultyName =
        user.fullname || "Faculty";


    const nameElement =
        document.getElementById(
            "faculty-name"
        );


    const welcomeElement =
        document.getElementById(
            "welcome-name"
        );


    if (nameElement) {

        nameElement.textContent =
            facultyName;

    }


    if (welcomeElement) {

        welcomeElement.textContent =
            facultyName;

    }

}


// ==========================================
// SHOW PAGE
// ==========================================

function showPage(pageName) {

    const pages = [

        "home",
        "notices",
        "materials",
        "events",
        "students",
        "profile"

    ];


    pages.forEach(function (page) {

        const element =
            document.getElementById(
                page + "-page"
            );


        if (element) {

            element.classList.add(
                "hidden"
            );

        }

    });


    const selectedPage =
        document.getElementById(
            pageName + "-page"
        );


    if (selectedPage) {

        selectedPage.classList.remove(
            "hidden"
        );

    }


    // Active sidebar item

    document
        .querySelectorAll(".sidebar-link")
        .forEach(function (link) {

            link.classList.remove(
                "active"
            );

        });


    const activeLink =
        document.querySelector(
            `.sidebar-link[data-page="${pageName}"]`
        );


    if (activeLink) {

        activeLink.classList.add(
            "active"
        );

    }


    // Load profile

    if (pageName === "profile") {

        loadFacultyProfile();

    }

}


// ==========================================
// LOAD FACULTY PROFILE
// ==========================================

function loadFacultyProfile() {

    const container =
        document.getElementById(
            "faculty-profile-container"
        );


    if (!container) {
        return;
    }


    fetch("facultyprofile.html")

        .then(function (response) {

            return response.text();

        })

        .then(function (data) {

            container.innerHTML =
                data;


            loadFacultyProfileData();

        })

        .catch(function (error) {

            console.error(
                "Faculty profile error:",
                error
            );

        });

}


// ==========================================
// DISPLAY FACULTY PROFILE DATA
// ==========================================

function loadFacultyProfileData() {

    const savedUser =
        localStorage.getItem(
            "campusconnect_user"
        );


    if (!savedUser) {
        return;
    }


    const user =
        JSON.parse(savedUser);


    const name =
        document.getElementById(
            "profile-name"
        );


    const facultyId =
        document.getElementById(
            "profile-faculty-id"
        );


    const department =
        document.getElementById(
            "profile-department"
        );


    const email =
        document.getElementById(
            "profile-email"
        );


    const about =
        document.getElementById(
            "profile-about"
        );


    if (name) {

        name.textContent =
            user.fullname ||
            "Not available";

    }


    if (facultyId) {

        facultyId.textContent =
            user.faculty_id ||
            "Not available";

    }


    if (department) {

        department.textContent =
            user.department ||
            "Not available";

    }


    if (email) {

        email.textContent =
            user.email ||
            "Not available";

    }


    if (about) {

        about.textContent =
            user.about_me ||
            "Tell us something about yourself.";

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "campusconnect_token"
    );


    localStorage.removeItem(
        "campusconnect_user"
    );


    window.location.href =
        "facultylogin.html";

}


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

document
    .querySelectorAll(
        ".sidebar-link[data-page]"
    )
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const page =
                    link.getAttribute(
                        "data-page"
                    );


                showPage(page);

            }
        );

    });


// ==========================================
// QUICK ACTIONS
// ==========================================

document
    .querySelectorAll(
        ".action-btn[data-page]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const page =
                    button.getAttribute(
                        "data-page"
                    );


                showPage(page);

            }
        );

    });


// ==========================================
// LOGOUT BUTTON
// ==========================================

const logoutButton =
    document.getElementById(
        "logout-btn"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            logout();

        }
    );

}


// ==========================================
// START
// ==========================================

loadFacultyData();