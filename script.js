// Skapa en tom array för att lagra uppgifterna
const tasks = [];

// Hämta referenser till DOM-elementen
const taskInput = document.querySelector("#taskInput"); // Input-fältet där användaren skriver uppgifter
const addTaskButton = document.querySelector("#addTaskButton"); // Knappen för att lägga till uppgifter
const taskList = document.querySelector("#taskList"); // Listan där uppgifterna visas
const completedTasks = document.querySelector("#completedTasks"); // Antalet klara uppgifter

// Lägg till en klickhändelse på knappen för att lägga till uppgifter
addTaskButton.addEventListener("click", addTask);

// Funktion för att lägga till en ny uppgift
function addTask() {
    // Hämta texten från input-fältet och ta bort eventuell överflödig whitespace
    const taskText = taskInput.value;

    // Kontrollera om texten är tom
    if (taskText !== "") {
        // Skapa ett uppgiftsobjekt med texten och ett flagga för om den är klar
        const task = { text: taskText, completed: false };
        
        // Lägg till uppgiften i tasks-arrayen
        tasks.push(task);

        // Skapa ett nytt <li>-element för att representera uppgiften
        const listItem = document.createElement("li");
        const listItemText = document.createElement("p");
        listItemText.innerText = task.text;

        // Lägg till en klickhändelse på uppgiften för att markera den som klar eller omvänt
        listItem.addEventListener("click", () => {
            task.completed = !task.completed; // Växla uppgiftens klar-status
            if (task.completed) {
                listItemText.classList.add("completed"); // Lägg till klassen om uppgiften är klar
            } else {
                listItemText.classList.remove("completed"); // Ta bort klassen om uppgiften inte är klar
            }
            updateCompletedCount(); // Uppdatera räkningen av klara uppgifter
        });

        // Skapa en knapp (<span>) för att radera uppgiften
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "&#128465;"; // Lägg till papperskorgsikonen
        
        // Lägg till en klickhändelse på knappen för att ta bort uppgiften
        deleteButton.addEventListener("click", () => {
            const index = tasks.indexOf(task); // Hitta index för uppgiften i arrayen
            if (index !== -1) {
                tasks.splice(index, 1); // Ta bort uppgiften från arrayen
                taskList.removeChild(listItem); // Ta bort <li>-elementet från listan
                updateCompletedCount(); // Uppdatera räkningen av klara uppgifter
            }
        });

        // Lägg till raderingsknappen i uppgiften och sedan uppgiften i listan
        listItem.appendChild(listItemText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        // Rensa input-fältet efter att uppgiften har lagts till
        taskInput.value = "";
    } else {
        // Visa ett meddelande om användaren försöker lägga till en tom uppgift
        alert("Du måste skriva något!");
    }
}

// Funktion för att uppdatera antalet klara uppgifter
function updateCompletedCount() {
    // Använd filter-funktionen för att filtrera uppgifterna i 'tasks' arrayen
    // och returnera en ny array som endast innehåller de uppgifter där 'completed' är true.
    const completedTasksArray = tasks.filter(task => task.completed === true);

    // Beräkna längden (antalet) på den filtrerade arrayen, vilket ger antalet klara uppgifter.
    const completedCount = completedTasksArray.length;

    // Uppdatera innehållet av DOM-elementet 'completedTasks' med antalet klara uppgifter.
    completedTasks.innerText = completedCount;
}