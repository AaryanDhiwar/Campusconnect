
// ================================
// LOGGED-IN USER
// ================================

const savedUser =
    localStorage.getItem("campusconnect_user");


if (!savedUser) {

    // User is not logged in
    window.location.href = "studentlogin.html";

} else {

    const user = JSON.parse(savedUser);


    // Dashboard welcome message

    const welcomeUser =
        document.getElementById("welcome-user");


    if (welcomeUser) {

        welcomeUser.textContent =
            `Hello, ${user.fullname}!`;

    }


    // Top-right user name

    const navUserName =
        document.getElementById("nav-user-name");


    if (navUserName) {

        navUserName.textContent =
            user.fullname;

    }


    // Top-right role

    const navUserRole =
        document.getElementById("nav-user-role");


    if (navUserRole) {

        navUserRole.textContent =
            user.role === "student"
                ? "Student"
                : "Faculty";

    }

}


// for sidebar
const menuIcon = document.getElementById("menuIcon");
const sidebar = document.getElementById("Sidebar");
menuIcon.onclick = function () {
    sidebar.classList.toggle("hide");


    if (menuIcon.classList.contains("fa-bars")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

};


document.getElementById("profile-btn").addEventListener("click", function (e) {

    e.preventDefault();

    fetch("profile.html")

        .then(function (response) {
            return response.text();
        })

        .then(function (data) {

            document.getElementById("main-content").innerHTML = data;

            loadProfile();

            setupEditProfile();

        })

        .catch(function (error) {

            console.error("Profile loading error:", error);

        });

});
document.getElementById("notices-btn").addEventListener("click", function (e) {

    e.preventDefault();

    fetch("notices.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById("main-content").innerHTML = data;
        });
});
document.getElementById("material-btn").addEventListener("click", function (e) {

    e.preventDefault();

    fetch("materail.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById("main-content").innerHTML = data;
        });
});
document.getElementById("events-btn").addEventListener("click", function (e) {

    e.preventDefault();

    fetch("events.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById("main-content").innerHTML = data;
        });
});
document.getElementById("feedback-btn").addEventListener("click", function (e) {

    e.preventDefault();

    fetch("feedback.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById("main-content").innerHTML = data;
        });
});
const logoutBtn = document.getElementById("logout-btn");
const logoutPopup = document.getElementById("logoutPopup");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    logoutPopup.classList.add("show");
});

cancelLogout.addEventListener("click", function () {
    logoutPopup.classList.remove("show");
});

confirmLogout.addEventListener("click", function () {
    window.location.href = "index.html";
});

// ==========================================
// LOAD LOGGED-IN STUDENT PROFILE
// ==========================================

function loadProfile() {

    const savedUser =
        localStorage.getItem("campusconnect_user");


    if (!savedUser) {

        console.error("No logged-in user found.");

        return;

    }


    const user =
        JSON.parse(savedUser);

        const profileAbout =
    document.getElementById("profile-about");

if (profileAbout) {

    profileAbout.textContent =
        user.about_me ||
        "Tell us something about yourself.";

}


    // Name

    const profileName =
        document.getElementById("profile-name");

    if (profileName) {

        profileName.textContent =
            user.fullname || "Not available";

    }


    // Enrollment Number

    const profileEnrollment =
        document.getElementById("profile-enrollment");

    if (profileEnrollment) {

        profileEnrollment.textContent =
            user.enrollment_no || "Not available";

    }


    // Branch

    const profileBranch =
        document.getElementById("profile-branch");

    if (profileBranch) {

        profileBranch.textContent =
            user.branch || "Not available";

    }


    // Semester

    const profileSemester =
        document.getElementById("profile-semester");

    if (profileSemester) {

        profileSemester.textContent =
            user.semester
                ? user.semester
                : "Not available";

    }


    // Email

    const profileEmail =
        document.getElementById("profile-email");

    if (profileEmail) {

        profileEmail.textContent =
            user.email || "Not available";

    }

}

// ==========================================
// EDIT PROFILE
// ==========================================

function setupEditProfile() {

    const editButton =
        document.getElementById("edit-profile-btn");

    const editSection =
        document.getElementById("edit-profile-section");

    const saveButton =
        document.getElementById("save-profile-btn");

    const cancelButton =
        document.getElementById("cancel-edit-btn");


    if (!editButton) {

        return;

    }


    // ================================
    // OPEN EDIT FORM
    // ================================

    editButton.addEventListener(
        "click",
        function () {

            const savedUser =
                localStorage.getItem(
                    "campusconnect_user"
                );


            if (!savedUser) {

                alert("Please login again.");

                return;

            }


            const user =
                JSON.parse(savedUser);


            document.getElementById(
                "edit-fullname"
            ).value =
                user.fullname || "";


            document.getElementById(
                "edit-email"
            ).value =
                user.email || "";


            document.getElementById(
                "edit-enrollment"
            ).value =
                user.enrollment_no || "";


            document.getElementById(
                "edit-branch"
            ).value =
                user.branch || "";


            document.getElementById(
                "edit-semester"
            ).value =
                user.semester || "";


            document.getElementById(
                "edit-about"
            ).value =
                user.about_me || "";


            editSection.style.display =
                "block";


            editSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    );


    // ================================
    // CANCEL
    // ================================

    cancelButton.addEventListener(
        "click",
        function () {

            editSection.style.display =
                "none";

        }
    );


    // ================================
    // SAVE
    // ================================

    saveButton.addEventListener(
        "click",
        async function () {

            const savedUser =
                localStorage.getItem(
                    "campusconnect_user"
                );


            if (!savedUser) {

                alert("Please login again.");

                return;

            }


            const user =
                JSON.parse(savedUser);


            const updatedData = {

                id: user.id,

                fullname:
                    document.getElementById(
                        "edit-fullname"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "edit-email"
                    ).value.trim(),

                enrollment_no:
                    document.getElementById(
                        "edit-enrollment"
                    ).value.trim(),

                branch:
                    document.getElementById(
                        "edit-branch"
                    ).value.trim(),

                semester:
                    document.getElementById(
                        "edit-semester"
                    ).value,

                about_me:
                    document.getElementById(
                        "edit-about"
                    ).value.trim()

            };


            try {

                saveButton.disabled = true;

                saveButton.textContent =
                    "Saving...";


                const response =
                    await fetch(
                        "http://localhost:3000/api/students/profile",
                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    updatedData
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    alert(result.message);

                    return;

                }


                // Save updated user locally

                localStorage.setItem(

                    "campusconnect_user",

                    JSON.stringify(
                        result.user
                    )

                );


                // Update profile immediately

                loadProfile();


                editSection.style.display =
                    "none";


                alert(
                    "Profile updated successfully!"
                );


            } catch (error) {

                console.error(
                    "Profile update error:",
                    error
                );


                alert(
                    "Unable to connect to server."
                );


            } finally {

                saveButton.disabled =
                    false;

                saveButton.textContent =
                    "Save Changes";

            }

        }
    );

}



// ==========================================
// LOAD SENIOR CONTACT PAGE
// ==========================================

const seniorButton =
    document.getElementById("senior-btn");


if (seniorButton) {

    seniorButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            fetch("senior.html")

                .then(function (response) {

                    return response.text();

                })

                .then(function (data) {

                    document.getElementById(
                        "main-content"
                    ).innerHTML = data;


                    setupSeniorSearch();

                    setupConnectButtons();

                })

                .catch(function (error) {

                    console.error(
                        "Senior page loading error:",
                        error
                    );

                });

        }
    );

}

// ==========================================
// SENIOR SEARCH
// ==========================================

function setupSeniorSearch() {

    const searchInput =
        document.getElementById(
            "senior-search"
        );


    const seniorCards =
        document.querySelectorAll(
            ".senior-card"
        );


    const noSeniors =
        document.getElementById(
            "no-seniors"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            const search =
                searchInput.value
                    .toLowerCase()
                    .trim();


            let visibleCount = 0;


            seniorCards.forEach(
                function (card) {

                    const searchableText =
                        card
                            .getAttribute(
                                "data-search"
                            )
                            .toLowerCase();


                    if (
                        searchableText.includes(
                            search
                        )
                    ) {

                        card.style.display =
                            "flex";

                        visibleCount++;

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );


            if (visibleCount === 0) {

                noSeniors.style.display =
                    "block";

            } else {

                noSeniors.style.display =
                    "none";

            }

        }
    );

}

// ==========================================
// CONNECT BUTTONS
// ==========================================

function setupConnectButtons() {

    const buttons =
        document.querySelectorAll(
            ".connect-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Requested';

                    button.disabled = true;

                    button.style.opacity =
                        "0.7";

                }
            );

        }
    );

}