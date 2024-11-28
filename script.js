let history = [];

function appendValue(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function calculate() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value);
        if (!isNaN(result)) {
            saveToHistory(display.value + " = " + result);
            display.value = result;
        } else {
            display.value = "Error";
        }
    } catch (error) {
        display.value = "Error";
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function saveToHistory(entry) {
    history.push(entry);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContent = document.getElementById('history-content');
    historyContent.innerHTML = history.map(item => `<p>${item}</p>`).join('');
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
}
