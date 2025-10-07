// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select key DOM elements
    const addButton = document.getElementById('add-task-btn');  // "Add Task" button
    const taskInput = document.getElementById('task-input');    // Input field for tasks
    const taskList = document.getElementById('task-list');      // Unordered list to display tasks

    // Function to add a new task to the list
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return; // Stop execution if no task entered
        }

        // Create a new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When the remove button is clicked, remove the task
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append the button to the list item, then add the list item to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Event listener for "Add Task" button click
    addButton.addEventListener('click', addTask);

    // Event listener to add task when pressing the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
