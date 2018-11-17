const weeklyStats = require('../../../modules/data/weeklyStats.json');



let tradesWeeklyChart = new Chart(document.getElementById("tradesWeeklyChart"), {
    type: 'bar',
    data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: "Trades",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [weeklyStats.week1.amountOfTrades, weeklyStats.week2.amountOfTrades, weeklyStats.week3.amountOfTrades, weeklyStats.week4.amountOfTrades]
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Amount of trades the last 4 weeks'
        }
    }
});


let amountOfAcceptedTrades = 0;
let amountOfDeclinedTrades = 0;
let amountOfGlitchedTrades = 0;

for (let i = 0; i < weeklyStats.length; i++) {
    amountOfAcceptedTrades = weeklyStats[i].amountOfAcceptedTrades;
    amountOfDeclinedTrades = weeklyStats[i].amountOfDeclinedTrades;
    amountOfGlitchedTrades = weeklyStats[i].amountOfGlitchedTrades;
}
amountOfAcceptedTrades = 1;

let acceptRateChart = new Chart(document.getElementById("acceptRateChart"), {
    type: 'doughnut',
    data: {
        labels: ["Accepted", "Declined", "Glitched"],
        datasets: [
            {
                label: "Accept rate",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [amountOfAcceptedTrades, amountOfDeclinedTrades, amountOfGlitchedTrades]
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Accept rate'
        }
    }
});