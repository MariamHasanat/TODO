// declare functions

const getELements = async () => {
    let response = await fetch('https://dummyjson.com/todos').catch((err) => {
        console.log(err);
    })
    let JsonData = await response.json();
    console.log(JsonData);
    const elements = JsonData.todos;
    const limit = JsonData.limit;
    return { elements, limit }
}

const postELements = async (e) => {
    let { elements, limit } = JSON.parse(localStorage.getItem('data'));
    let updatedID = elements.length + 1
    elements.push({
        completed: false,
        id: updatedID,
        todo: titleOfTask,
        userId: Number(userID),
    });
    limit++;
    const data = { elements, limit }

    localStorage.setItem('data', JSON.stringify(data));
    renderDataFunction(data);

    await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: titleOfTask,
            completed: false,
            userId: Number(userID),
            id: updatedID,
        })
    }).then((res) => res.json())
        .catch((error) => {
            console.log(error);
        });
}

const renderDataFunction = async (data) => {
    const elements = data.elements;
    const limit = data.limit;
    const tr = elements?.map((value, key) => {
        return `
    <tr key=${key}>
        <td class="ID">${value.id}</td>
        <td class="Description">${value.todo}</td>
        <td class="UserID">${value.userId}</td>
        <td class="Status">${value.completed}</td>
        <td class="Action">
                <button>edit</button>
                <button style="background-color: white; border: 0; margin: 0; padding: 0;">
                    done
                </button>
                <button>delete</button>
            </td>
    </tr>
`;
    });

    document.getElementById('table_body').innerHTML = '';//clear the table content  
    document.getElementById('table_body').innerHTML = tr.join('');//remove commas from the array
    document.getElementById('total_task_no').innerHTML = limit;

}
const getDataFromServer = async () => {
    const data = await getELements();
    localStorage.setItem("data", JSON.stringify(data));
    await renderDataFunction(data);
}

const getDataFromLocalStorage = () => {
    const dataArray = JSON.parse(localStorage.getItem("data"));
    renderDataFunction(dataArray);
}
//start the program 

let dataIsFoundInStorage = localStorage.key("data");

window.onload = async function () {
    dataIsFoundInStorage === null
        ?
        getDataFromServer()
        :
        getDataFromLocalStorage()
}

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    postELements(e);
    document.getElementById('addUserId').value = '';
    document.getElementById('addTitle').value = '';
});
const addUserID = document.getElementById('addUserId');
let userID;
addUserID.addEventListener('change', (e) => {
    userID = e.target.value;
})
//add a title
const addTitle = document.getElementById('addTitle');
let titleOfTask;
addTitle.addEventListener('change', (e) => {
    titleOfTask = e.target.value;
})
