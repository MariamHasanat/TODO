let elements;
let limit;
let loading = true;
const getELements = async () => {
    let response = await fetch('https://dummyjson.com/todos');
    let JsonData = await response.json();
    elements = JsonData.todos;
    limit = JsonData.limit;
}

const renderDataFunction = async () => {
    const tr = elements.map((value, key) => {
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
    document.getElementById('table_body').innerHTML = tr.join('');
    document.getElementById('total_task_no').innerHTML = limit;

}

window.onload = async function () {
    await getELements();
    await setTimeout(() => {
        renderDataFunction();
    }, 1000);
}
