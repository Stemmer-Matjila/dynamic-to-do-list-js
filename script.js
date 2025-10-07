// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // --- Select DOM Elements ---
    const addButton = document.getElementById('add-task-btn');  // "Add Task" button
    const taskInput = document.getElementById('task-input');    // Input field for tasks
    const taskList = document.getElementById('task-list');      // Unordered list to display tasks

    // --- Initialize tasks array from Local Storage ---
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // --- Function to save tasks to Local Storage ---
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- Function to create and display a task ---
    function createTaskElement(taskText) {
        // Create list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When "Remove" button is clicked
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Remove from array and update Local Storage
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append button to list item, then list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    // --- Function to add a new task ---
    function addTask(taskText = null, save = true) {
        // If no text provided, read from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Validate input
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create and display task
        createTaskElement(taskText);

        // Save to Local Storage (if not loading from it)
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input field
        taskInput.value = '';
    }

    // --- Function to load tasks from Local Storage ---
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t re-save while loading
    }

    // --- Attach Event Listeners ---

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task when pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Load saved tasks on page load ---
    loadTasks();
});
