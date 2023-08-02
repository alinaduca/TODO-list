function addNewToDo() {
    const table = document.getElementById('todo-table');
    var dataTr = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var inputField = document.createElement("input");
    inputField.type="text";
    inputField.placeholder = "My new activity.";
    inputField.id='activity-name';
    inputField.classList.add("input-field");
    cell3.classList.add("centered");
    var addButton = document.createElement('button');
    addButton.innerText = "Add";
    addButton.classList.add("add-button");
    dataTr.setAttribute("id", "newest-line-added")
    addButton.onclick = addingNewActivityInTheDatabase();
    cell2.appendChild(inputField);
    cell3.appendChild(addButton);
    dataTr.appendChild(cell1);
    dataTr.appendChild(cell2);
    dataTr.appendChild(cell3);
    table.appendChild(dataTr);
}

function addingNewActivityInTheDatabase() {
    return function() {
        addActivity();
    }
}

function addActivity() {
    const activityName = document.getElementById('activity-name').value;
    console.log(activityName);
    var newTr = document.getElementById('newest-line-added');
    newTr.remove();
    const table = document.getElementById('todo-table');
    var dataTr = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");

    fetch('get-activities')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            cell1.innerText = data.length+1;
        }).then(() => {
        fetch(`add-in-database/${activityName}`)
            .then(response => {
                cell2.innerText = activityName;
            });
    });

    var checkButton= document.createElement("input");
    checkButton.type="checkbox";
    checkButton.addEventListener('change', checkboxChangeHandler);
    cell1.classList.add("centered");
    cell3.classList.add("centered");
    cell3.appendChild(checkButton);

    var cell4 = document.createElement("td");
    cell4.classList.add("delete-cell");
    var deleteIcon = document.createElement("img");
    deleteIcon.src="https://i.ibb.co/GJRpLmW/delete.png";
    deleteIcon.addEventListener('click', imageClickedHandler);
    cell4.appendChild(deleteIcon);

    dataTr.appendChild(cell1);
    dataTr.appendChild(cell2);
    dataTr.appendChild(cell3);
    dataTr.appendChild(cell4);
    table.appendChild(dataTr);
}

fetch('get-activities')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('todo-table');
        var index=0;
        for(act of data) {
            index=index+1;
            var dataTr = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            var checkButton = document.createElement("input");
            checkButton.type="checkbox";
            cell1.innerText=index;
            cell2.innerText=act.activity;
            if(act.done === "yes") {
                checkButton.checked=true;
            }
            cell1.classList.add("centered");
            cell3.classList.add("centered");
            cell3.appendChild(checkButton);
            dataTr.appendChild(cell1);
            dataTr.appendChild(cell2);
            dataTr.appendChild(cell3);
            var cell4 = document.createElement("td");
            cell4.classList.add("delete-cell");
            var deleteIcon = document.createElement("img");
            deleteIcon.src="https://i.ibb.co/GJRpLmW/delete.png";
            cell4.appendChild(deleteIcon);
            dataTr.appendChild(cell4);
            table.appendChild(dataTr);
        }

        var checkboxes = document.querySelectorAll("input[type=checkbox]");

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', checkboxChangeHandler);
        });

        var images = document.querySelectorAll("img");

        images.forEach((image) => {
            image.addEventListener('click', imageClickedHandler);
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });

function checkboxChangeHandler(event) {
    if (event.target.checked) {
        var activityLine = event.target.parentElement.parentElement;
        var activityName = activityLine.children[1].innerText;
        fetch(`activity-done/${activityName}`)
            .then(response => {});
    } else {
        event.target.checked=true;
    }
}

function imageClickedHandler(event) {
    var activityLine = event.target.parentElement.parentElement;
    console.log(activityLine);
    var activityName = activityLine.children[1].innerText;
    activityLine.remove();
    fetch(`delete-activity/${activityName}`)
        .then(response => {});
}