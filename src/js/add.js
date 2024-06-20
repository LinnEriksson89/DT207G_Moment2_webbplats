"use strict";

//URL for the API and other variables.
let url = "http://127.0.0.1:4000/api/work";
const companynameInput = document.getElementById("companyname");
const jobtitleInput = document.getElementById("jobtitle");
const locationInput = document.getElementById("location");
const startdateInput = document.getElementById("startdate");
const enddateInput = document.getElementById("enddate");
const descriptionInput = document.getElementById("description");
const submitJob = document.getElementById("submitjob");

//On load run init.
window.onload = init();

//Function init that adds edventlistener to submit-button.
function init() {
    submitJob.addEventListener("click", createJob);
}

//Use fetch to create job.
function createJob (event) {
    event.preventDefault();

    //Variables
    let companyname = companynameInput.value;
    let jobtitle = jobtitleInput.value;
    let location = locationInput.value;
    let startdate = startdateInput.value;
    let enddate = enddateInput.value;
    let description = descriptionInput.value;
    let jsonString = JSON.stringify({
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    });

    //Fetch with post.
    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonString
    })
    .then(response => {
        if(response.status != 201) {
            //Show error message if adding fails.
            let message = document.getElementById("jobmessage");
            message.innerHTML = "Jobbet kunde inte skapas."
            return
        } else {
            //Show information if adding is success.
            let message = document.getElementById("jobmessage");
            message.innerHTML = "Jobbet har lagts till!"
        }
        return response.json()
        .then(clearForm)
        .catch(err => console.log(err))
    })
}

//Clear form
function clearForm() {
    companynameInput.value = "";
    jobtitleInput.value = "";
    locationInput.value = "";
    startdateInput.value = "";
    enddateInput.value = "";
    descriptionInput.value = "";
}