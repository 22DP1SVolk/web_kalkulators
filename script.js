let history = JSON.parse(localStorage.getItem('history')) || [];

// Initialize history
updateHistory();

// Append value to the input field
function appendValue(value) {
    const inputField = document.getElementById('inputField');
    if (inputField.value === "0") inputField.value = "";
    inputField.value += value;
}

// Clear the input field
function clearInput() {
    document.getElementById('inputField').value = "0";
}

// Delete the last character
function deleteLast() {
    const inputField = document.getElementById('inputField');
    inputField.value = inputField.value.slice(0, -1) || "0";
}

// Toggle the sign
function toggleSign() {
    const inputField = document.getElementById('inputField');
    inputField.value = inputField.value.startsWith("-") 
        ? inputField.value.slice(1) 
        : -inputField.value;
}

// Perform calculation
function calculate() {
    const inputField = document.getElementById('inputField');
    try {
        const result = eval(inputField.value);
        if (!isNaN(result)) {
            history.push(`${inputField.value} = ${result}`);
            saveHistory();
            updateHistory();
            inputField.value = result;
        }
    } catch {
        inputField.value = "Error";
    }
}

// Update history UI
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = "";
    history.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;

        // Add a delete button for each history item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "X";
        deleteButton.classList.add('delete-history-item');
        deleteButton.onclick = () => deleteHistoryItem(index);

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
    });
}


// Save history to localStorage
function saveHistory() {
    localStorage.setItem('history', JSON.stringify(history));
}

// Clear history
function clearHistory() {
    history = [];
    saveHistory();
    updateHistory();
}

// Delete individual history item
function deleteHistoryItem(index) {
    // Remove the specific history item
    history.splice(index, 1);
    // Save updated history to localStorage
    saveHistory();
    // Re-render the updated history
    updateHistory();
}

// Toggle history visibility
function toggleHistory() {
    const historyDiv = document.querySelector('.history');
    historyDiv.classList.toggle('hidden');
}

