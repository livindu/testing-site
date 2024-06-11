function logout() {
    window.location.href = 'login.html';
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (for demonstration purposes only)
    if (username === 'admin' && password === 'admin') {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});

// Modified fetchChartData function to accept device parameter
function fetchChartData(device) {
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const parsedData = parseCSV(data, device);
            updateChart(parsedData, device);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Modified parseCSV function to dynamically select column based on device
function parseCSV(data, device) {
    const rows = data.split('\n').slice(1); // Remove the header row
    const time = [];
    const power = [];
    const devicePowerColumn = `${device}_power`; // Dynamically select column based on device

    rows.forEach(row => {
        const cols = row.split(',');
        time.push(cols[0]);
        power.push(parseFloat(cols[deviceToIndex(devicePowerColumn)]));
    });

    return { time, power };
}

// Define a mapping of devices to column indices
const deviceColumnIndices = {
    time: 0,
    main: 1,
    kettle: 2,
};

// Function to get the column index for a given device
function deviceToIndex(device) {
    // Check if the device exists in the mapping
    if (device in deviceColumnIndices) {
        return deviceColumnIndices[device];
    } else {
        // Handle case where device is not found (e.g., return a default index or throw an error)
        return -1; // Return -1 as a default value
    }
}

const devicePowerColumnIndex = deviceToIndex(device);
power.push(parseFloat(cols[devicePowerColumnIndex]));


// Updated showDeviceChart function to pass selected device to fetchChartData
function showDeviceChart(device) {
    document.getElementById('deviceIframe').style.display = 'none';
    document.getElementById('powerChart').style.display = 'block';
    document.getElementById('chartTitle').style.display = 'block';
    document.getElementById('chartTitle').innerText = `${device.charAt(0).toUpperCase() + device.slice(1)} Power Consumption`;
    fetchChartData(device); // Pass selected device to fetchChartData
}

// Updated showMainChart function to call fetchChartData with 'main' device
function showMainChart() {
    showDeviceChart('main');
}
