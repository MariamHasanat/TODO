// declare functions

const getELements = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos').catch((err) => {
        console.log(err);
    })
    let JsonData = await response.json();
    const elements = JsonData;
    const limit = JsonData.length;
    return { elements, limit }
}

const renderDataFunction = async (data) => {
    const elements = data.elements;
    const limit = data.limit;
    const tr = elements?.map((value, key) => {
        return `
    <tr key=${key}>
        <td class="ID">${value.id}</td>
        <td class="Description">${value.title}</td>
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
