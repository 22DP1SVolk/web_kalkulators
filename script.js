const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const historySection = document.getElementById("history-section");
const toggleHistoryBtn = document.getElementById("toggle-history-btn");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// Display previous history on page load
renderHistory();

// Append value to display
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Perform calculation
function calculate() {
    try {
        const result = eval(display.value);
        if (result !== undefined) {
            addToHistory(`${display.value} = ${result}`);
            display.value = result;
        }
    } catch (error) {
        alert("Invalid calculation");
        display.value = "";
    }
}

// Add result to history
function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

// Render history
function renderHistory() {
    historyList.innerHTML = "";
    history.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.onclick = () => deleteHistoryItem(index);

        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

// Delete individual history item
function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

// Clear all history
function clearHistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    renderHistory();
}

// Toggle history visibility
function toggleHistory() {
    if (historySection.style.display === "none") {
        historySection.style.display = "block";
        toggleHistoryBtn.textContent = "Hide History";
    } else {
        historySection.style.display = "none";
        toggleHistoryBtn.textContent = "Show History";
    }
}
