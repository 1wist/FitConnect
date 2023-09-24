// Function to calculate BMI
function calculateBMI() {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight)) {
        alert("Please enter valid height and weight.");
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    const bmiResult = document.getElementById("bmi-result");
    bmiResult.textContent = `Your BMI: ${bmi.toFixed(2)}`;
}

// Add more JavaScript functions for handling daily activity log, workout log, and health statistics as needed




// Configuration options for the chart
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};
// Data for the line chart
const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Sample Data',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [10, 20, 15, 25, 30, 35, 50, 30, 25, 60, 70, 50],
    }]
};
// Get the canvas element and create the chart
const ctx = document.getElementById('line-chart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions,
});

// Data for the line chart
const chartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Sample Data',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [10, 20, 15, 25, 30, 35, 50, 30, 25, 60, 70, 50],
    }]
};
// Get the canvas element and create the chart
const ctx2 = document.getElementById('line-chart2').getContext('2d');
const lineChart2 = new Chart(ctx2, {
    type: 'line',
    data: chartData2,
    options: chartOptions,
});

// Data for the line chart
const chartData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Sample Data',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [10, 20, 15, 25, 30, 35, 50, 30, 25, 60, 70, 50],
    }]
};
// Get the canvas element and create the chart
const ctx3 = document.getElementById('line-chart3').getContext('2d');
const lineChart3 = new Chart(ctx3, {
    type: 'line',
    data: chartData3,
    options: chartOptions,
});


//code for range slider for bmi
const sliderEl = document.querySelector("#range1")
const sliderValue = document.querySelector(".value2")
//to set to force value hardcode
sliderValue.innerHTML = "25";
sliderEl.value = 25;
// sliderEl.style.background = `linear-gradient(to right, #f50 25%, #ccc 25%)`;

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  sliderValue.textContent = tempSliderValue;

  const progress = (tempSliderValue / sliderEl.max) * 100;
 
  sliderEl.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
})

//bmi graph
document.addEventListener("DOMContentLoaded", function () {
    // Sample data: Replace this with your actual data
    const dates = ["2023-09-01", "2023-09-02", "2023-09-03", "2023-09-04"];
    const bmiValues = [22.5, 23.0, 23.5, 24.0];

    // Get the canvas element and create the chart
    const ctx = document.getElementById("bmiChart").getContext("2d");
    const bmiChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "BMI",
                data: bmiValues,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            }],
        },
        options: {
            scales: {
                x: [{
                    type: "time",
                    time: {
                        unit: "day",
                        displayFormats: {
                            day: "MMM D",
                        },
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Date",
                    },
                }],
                y: [{
                    scaleLabel: {
                        display: true,
                        labelString: "BMI",
                    },
                }],
            },
        },
    });
});

