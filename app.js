const onSignup = () => {    
    const userName = document.getElementById("userName").value, email = document.getElementById("email").value, password = document.getElementById("password").value;
    const regBtn = document.getElementById("regBtn");
   if (userName && email && password) {
        const teamReporter = JSON.parse(localStorage.getItem("teamReporter")) || {};
                teamReporter.users = teamReporter.users || {};
               const validation = Object.keys(teamReporter.users);
                const userIdx = validation.findIndex(val => teamReporter.users[val]["email"].toLowerCase() === email.toLowerCase());
         if (userIdx === -1) {
            const uid = new Date().getTime();
            teamReporter.users[uid] = {
                uid, userName, email, password,
                admin: [],
                members: []
            }
            localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
            location.href = "./login.html";
        }
        else {
            regBtn.value = "Email Already Exist!";
            regBtn.classList.add("red-btn");
            regBtn.classList.remove("input-btn");
        }
    }
    else {
        regBtn.value = "All Fields Are Required!";
        regBtn.classList.add("red-btn");
        regBtn.classList.remove("input-btn");
    }
    setTimeout(() => {
        regBtn.value = "Register";
        regBtn.classList.remove("red-btn");
        regBtn.classList.add("input-btn");
    }, 2000);
}

const onLogin = () => {
    const email = document.getElementById("email").value, password = document.getElementById("password").value;
    let loginBtn = document.getElementById("loginBtn");
        if (email && password) {        
        const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));        
        let validation = Object.keys(teamReporter.users);        
        let userIdx = validation.find(val => teamReporter.users[val]["email"].toLowerCase() === email.toLowerCase());
        if (userIdx) {            
            let currentUser = validation.find(val => teamReporter.users[val].email.toLowerCase() === email.toLowerCase() && teamReporter.users[val].password === password);
            if (currentUser) {                
                localStorage.setItem("user", JSON.stringify(teamReporter.users[currentUser]));
                location.href = "./page1.html";
            } else {
                loginBtn.value = "Incorrect Password!";
                loginBtn.classList.remove("input-btn");
                loginBtn.classList.add("red-btn");
            }
        }
        else {
            loginBtn.value = "Email Not Registered!";
            loginBtn.classList.remove("input-btn");
            loginBtn.classList.add("red-btn");
        }
    }
    else {
        loginBtn.value = "All Fields Are Required!";
        loginBtn.classList.remove("input-btn");
        loginBtn.classList.add("red-btn");
    }    
    setTimeout(() => {
        loginBtn.value = "Login";
        loginBtn.classList.remove("red-btn");
        loginBtn.classList.add("input-btn");
    }, 2000);
}

const locationCheck = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        location.href = "./page1.html";
    }
}

const loggedIn = () => {
    localStorage.removeItem("currentTeam");
    localStorage.removeItem("currentMemberTeam");
    let user = JSON.parse(localStorage.getItem("user"));
    let teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    if (user) {
        const userName = user.userName.split(" ")[0];
        const fullName = userName.slice(0, 1).toUpperCase() + userName.slice(1).toLowerCase();
        const nameHead = document.getElementById("nameHead");
        nameHead.style.cursor = "default"
        nameHead.textContent = `Hi ${fullName}!`;
        if (user.admin.length !== 0) {
            let teamCardHolder = document.getElementById("teamCardHolder");
            teamCardHolder.style.display = "block";

            user.admin.find(val => {
                let anchorTag = teamCardHolder.appendChild(document.createElement("a"))
                anchorTag.setAttribute("href", "./page3.html");
                anchorTag.setAttribute("id", val);
                let div = anchorTag.appendChild(document.createElement("div"))
                div.classList.add("m-2", "alert", "alert-success");
                div.setAttribute("role", "alert");
                div.setAttribute("onclick", `currentTeam(${val})`);
                div.style.cursor = "pointer"
                let h4 = div.appendChild(document.createElement("h4"));
                h4.classList.add("alert-heading");
                h4.textContent = teamReporter.teams[val].category;
                let mark = div.appendChild(document.createElement("mark"));
                mark.classList.add("alert-success")
                mark.innerText = "Members: "
                mark.style.fontWeight = "bold";
                let small = div.appendChild(document.createElement("small"));
                small.classList.add("mb-0");
                let count = 0;
                teamReporter.teams[val].members.find(members => {
                    let memberName = teamReporter.users[members].userName;
                    if (teamReporter.teams[val].members.length == 1) {
                        small.textContent = memberName
                    }
                    else if (teamReporter.teams[val].members.length > 1) {
                        small.textContent += memberName;
                        if (count < teamReporter.teams[val].members.length - 2) {
                            small.textContent += ', ';
                        }
                        else if (count == teamReporter.teams[val].members.length - 2) {
                            small.textContent += ' & ';
                        }
                    }
                    count++;
                })

            })

            let h1 = teamCardHolder.appendChild(document.createElement("h1"));
            h1.classList.add("display-4", "text-center", "teal");
            h1.textContent = "Teams you own";
            h1.style.cursor = "default"
        }
        if (user.members.length !== 0) {
            let memberTeamCardHolder = document.getElementById("memberTeamCardHolder");
            memberTeamCardHolder.style.display = "block";

            user.members.find(val => {
                let anchorTag = memberTeamCardHolder.appendChild(document.createElement("a"))
                anchorTag.setAttribute("href", "./page2.html");
                let div = anchorTag.appendChild(document.createElement("div"))
                div.classList.add("m-2", "alert", "alert-success");
                div.setAttribute("role", "alert");
                div.setAttribute("onclick", `currentMemberTeam(${val})`);
                div.style.cursor = "pointer"
                let h4 = div.appendChild(document.createElement("h4"));
                h4.classList.add("alert-heading");
                h4.textContent = teamReporter.teams[val].category;
                let mark = div.appendChild(document.createElement("mark"));
                mark.classList.add("alert-success")
                mark.innerText = "Members: "
                mark.style.fontWeight = "bold";
                let small = div.appendChild(document.createElement("small"));
                small.classList.add("mb-0");
                let count = 0;
                teamReporter.teams[val].members.find(members => {
                    let memberName = teamReporter.users[members].userName;
                    if (teamReporter.teams[val].members.length == 1) {
                        small.textContent = memberName
                    }
                    
                    else if (teamReporter.teams[val].members.length > 1) {
                        small.textContent += memberName;
                        if (count < teamReporter.teams[val].members.length - 2) {
                            small.textContent += ', ';
                        }
                        else if (count == teamReporter.teams[val].members.length - 2) {
                            small.textContent += ' & ';
                        }
                    }
                    count++;
                })

            })

            let h1 = memberTeamCardHolder.appendChild(document.createElement("h1"));
            h1.classList.add("display-4", "text-center", "teal");
            h1.textContent = "Teams you are part of";
            h1.style.cursor = "default"
        }
    }
    else {
        location.href = "./login.html"
    }
}

const addTeam = () => {

    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {

        let teamName = document.getElementById("teamName").value;
        let category = document.getElementById("category").value;
        let emails = document.getElementById("emails").value;
        let saveBtn = document.getElementById("saveBtn");
        if (teamName && category && emails && category != "Category") {
            let teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
            teamReporter.users = teamReporter.users;
            let checkAdmin = user.email.toLowerCase() !== emails.toLowerCase();
            if (checkAdmin) {
                let validation = Object.keys(teamReporter.users);
                let userUId = validation.find(val => teamReporter.users[val]["email"].toLowerCase() === emails.toLowerCase());

                if (userUId) {
                    teamReporter.teams = teamReporter.teams || {};

                    let uid = new Date().getTime();
                    teamReporter.teams[uid] = {
                        uid,
                        admin: user.email,
                        adminName: user.userName,
                        teamName, category,
                        members: [],
                        questions: [],
                    }
                    teamReporter.teams[uid].members.push(userUId);
                    teamReporter.users[user.uid].admin.push(uid);
                    teamReporter.users[userUId].members.push(uid);
                    user = teamReporter.users[user.uid];
                    localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
                    localStorage.setItem("user", JSON.stringify(user));
                    location.href = "./page1.html";
                }
                else {
                    saveBtn.textContent = "Incorrect Email!";
                    saveBtn.classList.remove("theme-btn");
                    saveBtn.classList.add("btn-danger");
                }
            }
            else {
                saveBtn.textContent = "This Is Admin Email!";
                saveBtn.classList.remove("theme-btn");
                saveBtn.classList.add("btn-danger");
            }
        }
        else {
            saveBtn.textContent = "All Fields Are Required!";
            saveBtn.classList.remove("theme-btn");
            saveBtn.classList.add("btn-danger");
        }
        setTimeout(() => {
            saveBtn.textContent = "Save changes";
            saveBtn.classList.remove("btn-danger");
            saveBtn.classList.add("theme-btn");
        }, 2000);
    }
    else {
        location.href = "./login.html"
    }
}

const currentTeam = e => localStorage.setItem("currentTeam", e);

const currentMemberTeam = e => localStorage.setItem("currentMemberTeam", e);

const teamSetting = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    const selectedTeam = localStorage.getItem("currentTeam");
    const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    if (selectedTeam) {
        let membersBox = document.getElementById("membersBox");
        teamReporter.teams[selectedTeam].members.find(mem => {
            membersBox.innerHTML += ` <div class="members ms-4 my-2">${teamReporter.users[mem].email}<div class="cross" onclick="removeMember(${mem},this)">X</div>`
        });
        let memberNames = document.getElementById("memberNames")
        teamReporter.teams[selectedTeam].members.find(mem => {
            let memberNamesList = memberNames.appendChild(document.createElement("option"));
            memberNamesList.classList.add("nav-font", "bg-white")
            memberNamesList.innerText = teamReporter.users[mem].userName;
            memberNamesList.value = mem;
        });
        if (teamReporter.teams[selectedTeam].questions != []) {
            if (teamReporter.teams[selectedTeam].questions[0] != null) {
                document.getElementById("question1").placeholder = teamReporter.teams[selectedTeam].questions[0];
            }
            if (teamReporter.teams[selectedTeam].questions[1] != null) {
                document.getElementById("question2").placeholder = teamReporter.teams[selectedTeam].questions[1];
            }
            if (teamReporter.teams[selectedTeam].questions[2] != null) {
                document.getElementById("question3").placeholder = teamReporter.teams[selectedTeam].questions[2];
            }
        }

    }
    else {
        location.href = "./login.html";
    }
}

const addMember = () => {
    let emails = document.getElementById("addMemberField").value;
    let addBtn = document.getElementById("addBtn");
    if (emails) {
        let teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
        teamReporter.users = teamReporter.users;
        let user = JSON.parse(localStorage.getItem("user"));
        let checkAdmin = user.email.toLowerCase() !== emails.toLowerCase();
        if (checkAdmin) {
            let validation = Object.keys(teamReporter.users);
            let userUId = validation.find(val => teamReporter.users[val]["email"].toLowerCase() === emails.toLowerCase());

            if (userUId) {
                const uid = localStorage.getItem("currentTeam");

                let existingUser = teamReporter.teams[uid].members.find(e => e == userUId);
                if (!existingUser) {
                    teamReporter.teams[uid].members.push(userUId);
                    teamReporter.users[userUId].members.push(uid);
                    localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
                    let membersBox = document.getElementById("membersBox");
                    membersBox.innerHTML += ` <div class="members ms-4 my-2">${emails}<div class="cross" onclick="removeMember(${uid},this)">X</div>`
                    document.getElementById("addMemberField").value = "";
                }
                else {
                    addBtn.classList.remove("member-btn");
                    addBtn.classList.add("delete-btn");
                    addBtn.textContent = "Existing Email!";
                }
            }
            else {
                addBtn.classList.remove("member-btn");
                addBtn.classList.add("delete-btn");
                addBtn.textContent = "Unregistered Email!";
            }
        }
        else {
            addBtn.classList.remove("member-btn");
            addBtn.classList.add("delete-btn");
            addBtn.textContent = "This Is Admin Email!";
        }
    }
    else {
        addBtn.classList.remove("member-btn");
        addBtn.classList.add("delete-btn");
        addBtn.textContent = "Empty Field!"
    }
    setTimeout(() => {
        addBtn.classList.remove("delete-btn");
        addBtn.classList.add("member-btn");
        addBtn.textContent = "Add"
    }, 2000);
}

const removeMember = (e, f) => {
    let userUID = e;
    const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    const selectedTeam = localStorage.getItem("currentTeam");
    let teamIdx = teamReporter.users[e].members.findIndex(e => e == selectedTeam);
    teamReporter.users[e].members.splice(teamIdx, 1);
    let userIdx = teamReporter.teams[selectedTeam].members.findIndex(e => e == userUID);
    teamReporter.teams[selectedTeam].members.splice(userIdx, 1);
    localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
    f.parentNode.remove();
}

const addQuestions = () => {
    let question1 = document.getElementById("question1").value;
    let question2 = document.getElementById("question2").value;
    let question3 = document.getElementById("question3").value;
    let addQuestionsBtn = document.getElementById("addQuestionsBtn");
    if (question1 || question2 || question3) {
        const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
        const currentTeam = localStorage.getItem("currentTeam");
        if (question1) {
            teamReporter.teams[currentTeam].questions[0] = question1;
            document.getElementById("question1").placeholder = question1;
            document.getElementById("question1").value = "";
        }
        if (question2) {
            teamReporter.teams[currentTeam].questions[1] = question2;
            document.getElementById("question2").placeholder = question2;
            document.getElementById("question2").value = "";
        }
        if (question3) {
            teamReporter.teams[currentTeam].questions[2] = question3;
            document.getElementById("question3").placeholder = question3;
            document.getElementById("question3").value = "";
        }
        localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
    }
    else {
        addQuestionsBtn.classList.remove("member-btn");
        addQuestionsBtn.classList.add("delete-btn");
        addQuestionsBtn.textContent = "Empty Fields!"
    }
    setTimeout(() => {
        addQuestionsBtn.classList.remove("delete-btn");
        addQuestionsBtn.classList.add("member-btn");
        addQuestionsBtn.textContent = "Save Changes"
    }, 2000);
}

const deleteTeam = () => {
    const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    const selectedTeam = localStorage.getItem("currentTeam");
    const user = JSON.parse(localStorage.getItem("user"));
    const adminIdx = teamReporter.users[user.uid].admin.findIndex(e => e == selectedTeam);
    teamReporter.users[user.uid].admin.splice(adminIdx, 1);
    const memberUid = teamReporter.teams[selectedTeam].members;
    for (let i = 0; i < memberUid.length; i++) {
        let memberIdx = teamReporter.users[memberUid[i]].members.findIndex(e => e == selectedTeam);
        teamReporter.users[memberUid[i]].members.splice(memberIdx, 1);
    }
    delete teamReporter.teams[selectedTeam];
    localStorage.setItem("user", JSON.stringify(teamReporter.users[user.uid]));
    localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
    location.href = "./page1.html";
}

const responsePage = () => {
    const currentTeam = localStorage.getItem("currentMemberTeam");
    if (currentTeam) {
        let date = new Date().getDate();
        let month = new Date().getMonth();
        const year = new Date().getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
        month = monthNames[month];
        if (date == 1 || date == 21 || date == 31) {
            date = `${date}st`
        }
        else if (date == 2 || date == 22) {
            date = `${date}nd`
        }
        else if (date == 3 || date == 23) {
            date = `${date}rd`
        }
        else {
            date = `${date}th`
        }
        const currentDate = `${date} ${month} ${year}`
        let displayDate = document.getElementById("date");
        displayDate.innerHTML = currentDate;
        const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
        if (teamReporter.teams[currentTeam].questions.length != 0) {
            if (teamReporter.teams[currentTeam].questions[0]) {
                let question1 = document.getElementById("question_1");
                let answer1 = document.getElementById("answer1");
                question1.innerHTML = `Q. ${teamReporter.teams[currentTeam].questions[0]}`;
                question1.style.display = "block";
                answer1.style.display = "block";
            }
            if (teamReporter.teams[currentTeam].questions[1]) {
                let question2 = document.getElementById("question_2");
                let answer2 = document.getElementById("answer2");
                question2.innerHTML = `Q. ${teamReporter.teams[currentTeam].questions[1]}`;
                question2.style.display = "block";
                answer2.style.display = "block";
            }
            if (teamReporter.teams[currentTeam].questions[2]) {
                let question3 = document.getElementById("question_3");
                let answer3 = document.getElementById("answer3");
                question3.innerHTML = `Q. ${teamReporter.teams[currentTeam].questions[2]}`;
                question3.style.display = "block";
                answer3.style.display = "block";
            }
        }
        else {
            document.getElementById("submit").setAttribute("disabled", "disabled");
        }
        const today = new Date().getDate().toString() + (new Date().getMonth() + 1).toString() + new Date().getFullYear().toString();
        const user = JSON.parse(localStorage.getItem("user"));
        let getAnswers = teamReporter.response || false;
        if (getAnswers) {
            getAnswers = teamReporter.response[today] || false;
            if (getAnswers) {
                getAnswers = teamReporter.response[today][currentTeam] || false;
                if (getAnswers) {
                    getAnswers = teamReporter.response[today][currentTeam][user.uid] || false;
                    if (getAnswers) {

                        if (teamReporter.response[today][currentTeam][user.uid][0] != null) {
                            document.getElementById("answer1").placeholder = teamReporter.response[today][currentTeam][user.uid][0][1];
                        }
                        if (teamReporter.response[today][currentTeam][user.uid][1] != null) {
                            document.getElementById("answer2").placeholder = teamReporter.response[today][currentTeam][user.uid][1][1];
                        }
                        if (teamReporter.response[today][currentTeam][user.uid][2] != null) {
                            document.getElementById("answer3").placeholder = teamReporter.response[today][currentTeam][user.uid][2][1];
                        }
                    }
                }
            }
        }
    }
    else {
        location.href = "./page1.html";
    }
}

const submitResponse = () => {
    const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    teamReporter.response = teamReporter.response || {};
    const today = new Date().getDate().toString() + (new Date().getMonth() + 1).toString() + new Date().getFullYear().toString();
    const currentTeam = localStorage.getItem("currentMemberTeam");
    const user = JSON.parse(localStorage.getItem("user"));
    teamReporter.response[today] = teamReporter.response[today] || {};
    teamReporter.response[today][currentTeam] = teamReporter.response[today][currentTeam] || {};
    teamReporter.response[today][currentTeam][user.uid] = teamReporter.response[today][currentTeam][user.uid] || [];
    let answer1 = document.getElementById("answer1");
    let answer2 = document.getElementById("answer2");
    let answer3 = document.getElementById("answer3");
    let submit = document.getElementById("submit");
    teamReporter.response[today][currentTeam][user.uid][3] = document.getElementById("date").textContent;
    if (answer1.style.display == "block" && teamReporter.response[today][currentTeam][user.uid][0] == null) {
        if (answer1.value) {
            teamReporter.response[today][currentTeam][user.uid][0] = [teamReporter.teams[currentTeam].questions[0], answer1.value];
            localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
            answer1.placeholder = answer1.value;
            answer1.value = "";
        }
    }
    else {
        answer1.placeholder = "Response Already Submitted";
    }
    if (answer2.style.display == "block" && teamReporter.response[today][currentTeam][user.uid][1] == null) {
        if (answer2.value) {
            teamReporter.response[today][currentTeam][user.uid][1] = [teamReporter.teams[currentTeam].questions[1], answer2.value];
            localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
            answer2.placeholder = answer2.value;
            answer2.value = "";
        }
    }
    else {
        answer2.placeholder = "Response Already Submitted";
    }
    if (answer3.style.display == "block" && teamReporter.response[today][currentTeam][user.uid][2] == null) {
        if (answer3.value) {
            teamReporter.response[today][currentTeam][user.uid][2] = [teamReporter.teams[currentTeam].questions[2], answer3.value];
            localStorage.setItem("teamReporter", JSON.stringify(teamReporter));
            answer3.placeholder = answer3.value;
            answer3.value = "";
        }
    }
    else {
        answer3.placeholder = "Response Already Submitted";
    }
    setTimeout(() => {
        submit.classList.remove("delete-btn");
        submit.classList.add("member-btn");
        submit.textContent = "Submit"
    }, 2000);
}

const getResponse = () => {
    document.getElementById("allMemberResponses").style.display = "none";
    const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    const currentTeam = localStorage.getItem("currentTeam");
    let responseDate = document.getElementById("start").value
    responseDate = responseDate.split("-");
    responseDate = parseInt(responseDate[2]).toString() + parseInt(responseDate[1]).toString() + responseDate[0];
    let memberNamesList = document.getElementById("memberNames");
    let memberUid = memberNamesList.options[memberNamesList.selectedIndex].value;
    let responseData = teamReporter.response || false;
    if (memberUid == "All Members") {
        allMembersResponse(responseDate, currentTeam);
    }
    else {
        if (responseData) {
            responseData = teamReporter.response[responseDate] || false;
            if (responseData) {
                responseData = teamReporter.response[responseDate][currentTeam] || false;
                if (responseData) {
                    responseData = teamReporter.response[responseDate][currentTeam][memberUid] || false;
                    if (responseData) {
                        document.getElementById("noResponse").style.display = "none";
                        document.getElementById("memberResponses").style.display = "block";
                        let displayDate = document.getElementById("responseDate")
                        displayDate.textContent = responseData[3];
                        let respondedQ1 = document.getElementById("respondedQ1");
                        let respondedQ2 = document.getElementById("respondedQ2");
                        let respondedQ3 = document.getElementById("respondedQ3");
                        let respondedA1 = document.getElementById("respondedA1");
                        let respondedA2 = document.getElementById("respondedA2");
                        let respondedA3 = document.getElementById("respondedA3");
                        if (responseData[0][1] != null) {
                            respondedQ1.textContent = `Q. ${responseData[0][0]}`;
                            respondedA1.textContent = `A. ${responseData[0][1]}`;
                        }
                        else {
                            respondedQ1.style.display = "none"
                            respondedA1.textContent = "Response Not Submitted Yet!"
                        }
                        if (responseData[1] != null) {
                            respondedQ2.textContent = `Q. ${responseData[1][0]}`;
                            respondedA2.textContent = `A. ${responseData[1][1]}`;
                        }
                        else {
                            respondedQ2.style.display = "none"
                            respondedA2.textContent = "Response Not Submitted Yet!"
                        }
                        if (responseData[2] != null) {
                            respondedQ3.textContent = `Q. ${responseData[2][0]}`;
                            respondedA3.textContent = `A. ${responseData[2][1]}`;
                        }
                        else {
                            respondedQ3.style.display = "none"
                            respondedA3.textContent = "Response Not Submitted Yet!"
                        }
                    }
                    else {
                        document.getElementById("memberResponses").style.display = "none";
                        document.getElementById("noResponse").style.display = "block";
                    }
                }
                else {
                    document.getElementById("memberResponses").style.display = "none";
                    document.getElementById("noResponse").style.display = "block";
                }
            }
            else {
                document.getElementById("memberResponses").style.display = "none";
                document.getElementById("noResponse").style.display = "block";
            }
        }
        else {
            document.getElementById("memberResponses").style.display = "none";
            document.getElementById("noResponse").style.display = "block";
        }
    }

}

const allMembersResponse = (responseDate, teamID) => {
    let allMemberResponsesDiv = document.getElementById("allMemberResponses");
    document.getElementById("memberResponses").style.display = "none";
    document.getElementById("noResponse").style.display = "none";
    const teamReporter = JSON.parse(localStorage.getItem("teamReporter"));
    let responseData = teamReporter.response || false;
    if (responseData) {
        responseData = teamReporter.response[responseDate] || false;
        if (responseData) {
            responseData = teamReporter.response[responseDate][teamID] || false;
            if (responseData) {
                let totalMembersResponse = Object.keys(teamReporter.response[responseDate][teamID]);
                allMemberResponsesDiv.innerHTML = `<h2 class="mt-3 mx-3 display-6 fs-1">Filling for: <span>${teamReporter.response[responseDate][teamID][totalMembersResponse[0]][3]}</span></h2>`
                totalMembersResponse.find(e => {
                    allMemberResponsesDiv.innerHTML += `<h2 class="mt-3 mx-3 display-6 fs-2">${teamReporter.users[e].userName}</h2>`
                    const responseArray = responseData[e]
                    if (responseArray[0] != null) {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-4 ms-5 display-6 fs-2">Q. ${responseArray[0][0]}</h3>
                    <h3 class="mt-2  ms-5 display-6 fs-3">A. ${responseArray[0][1]}</h3>`
                    }
                    else {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-4 ms-5 display-6 fs-2">No Response Found!</h3>`
                    }
                    if (responseArray[1] != null) {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-4 ms-5 display-6 fs-2">Q. ${responseArray[1][0]}</h3>
                    <h3 class="mt-2  ms-5 display-6 fs-3">A. ${responseArray[1][1]}</h3>`;
                    }
                    else {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-4 ms-5 display-6 fs-2">No Response Found!</h3>`
                    }
                    if (responseArray[2] != null) {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-4 ms-5 display-6 fs-2">Q. ${responseArray[2][0]}</h3>
                    <h3 class="mt-2 ms-5 display-6 fs-3">A. ${responseArray[2][1]}</h3>`
                    }
                    else {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-4 ms-5 display-6 fs-2">No Response Found!</h3>`
                    }
                })
                if (teamReporter.teams[teamID].members.length != totalMembersResponse.length) {
                    const unsubmittedMembers = teamReporter.teams[teamID].members.filter(e => e != totalMembersResponse);
                    unsubmittedMembers.find(e => {
                        allMemberResponsesDiv.innerHTML += `<h3 class="mt-3 fw-normal ms-5 display-6 fs-2">${teamReporter.users[e].userName} didn't submitted</h3>`
                    })
                }
                allMemberResponsesDiv.style.display = "block";
            }
            else {
                allMemberResponsesDiv.style.display = "none";
                document.getElementById("noResponse").style.display = "block";
            }
        }
        else {
            allMemberResponsesDiv.style.display = "none";
            document.getElementById("noResponse").style.display = "block";
        }
    }
    else {
        allMemberResponsesDiv.style.display = "none";
        document.getElementById("noResponse").style.display = "block";
    }
}

const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user.userName.split(" ")[0];
    const fullName = userName.slice(0, 1).toUpperCase() + userName.slice(1).toLowerCase();
    const nameHead = document.getElementById("nameHead");
    nameHead.textContent = `Logging out ${fullName} :)`;
    localStorage.removeItem("user")
    setTimeout(() => {
        location.href = "login.html";
    }, 2000);
}