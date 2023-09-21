let currentChart = null;
// Función para dar formato de moneda a un valor con decimales
function formatCurrencyWithDecimals(value) {
    return '$ ' + parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
// Función para realizar la solicitud al servidor y mostrar la tabla
function calculateLoan() {
    const loanAmountInput = document.getElementById('loan_amount_input');
    const annualInterestRateRange = document.getElementById('annual_interest_rate_range');
    const rangeValueInterest = document.getElementById('rangeValue_interest');
    const loanPeriodSelect = document.getElementById('loan_period_years_range');
    const startDateInput = document.getElementById('start_date_input');
    const loanPeriodMonths = parseInt(loanPeriodSelect.value) * 12;
    // Obtener los valores del formulario
    const loanAmount = parseFloat(loanAmountInput.value.replace(/[^0-9.]/g, '')) || 0;
    const annualInterestRate = parseFloat(annualInterestRateRange.value) || 0;
    const loanPeriodYears = parseFloat(loanPeriodSelect.value) || 0;
    const startDate = startDateInput.value;

    if (loanAmount === 0 || annualInterestRate === 0 || loanPeriodYears === 0 || startDate === '') {
        alert('All fields are required.');
        return;
    }


    // Realizar una solicitud al servidor (script de Python)
    fetch('https://7949-69-158-28-151.ngrok-free.app/calculate_loan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'loan_amount': loanAmount,
            'annual_interest_rate_range': annualInterestRate,
            'loan_period_years_range': loanPeriodYears,
            'start_date': startDate
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Aquí procesa los datos JSON y dibuja la tabla en el HTML
            displaySummary(loanAmount, annualInterestRate, loanPeriodMonths, data);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}
// Función para mostrar el resumen y la tabla en el HTML
function displaySummary(loanAmount, annualInterestRate, loanPeriodMonths, data) {
    // Calcula el total del interés y el costo total del préstamo
    const totalInterest = data.rows.reduce((total, row) => {
        return total + parseFloat(row['Interest Amount'].replace('$', '').replace(',', ''));
    }, 0);
    const totalCostOfLoan = data.rows.reduce((total, row) => {
        return total + parseFloat(row['Principal Amount'].replace('$', '').replace(',', ''));
    }, 0);
    const totalCostOfLoanSummary = loanAmount + totalInterest;
    // Actualiza los elementos en el HTML con los valores calculados
    document.getElementById('loanAmountSummary').textContent = formatCurrencyWithDecimals(loanAmount);
    document.getElementById('annualInterestRateSummary').textContent = annualInterestRate.toFixed(2) + '%';
    document.getElementById('numberOfPaymentsSummary').textContent = loanPeriodMonths;
    document.getElementById('monthlyPaymentSummary').textContent = formatCurrencyWithDecimals(data.rows[1]['Payment Amount']);
    document.getElementById('totalInterestSummary').textContent = formatCurrencyWithDecimals(totalInterest);
    document.getElementById('totalCostOfLoanSummary').textContent = formatCurrencyWithDecimals(totalCostOfLoanSummary);
    document.getElementById('loan-summary').style.display = 'block';
    // Llamar a la función para dibujar el gráfico de líneas
    drawTable(data);
    checkDataAvailability();
}
// Función para dibujar la tabla con los datos recibidos
function drawTable(data) {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-striped');
    const thead = document.createElement('thead');
    thead.classList.add('table-dark');
    const tbody = document.createElement('tbody');
    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    data.header.forEach(headerText => {
        if (headerText !== 'Payment Amount') { // Excluir la columna "Payment Amount" del encabezado
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        }
    });
    thead.appendChild(headerRow);
    // Función para convertir un objeto en una fila
    function objectToRow(obj) {
        const formatCurrency = (value) => numeral(value).format('$0,0.00');
        return [
            obj['Payment Date'],
            //formatCurrency(obj['Payment Amount']),
            formatCurrency(obj['Interest Amount']),
            formatCurrency(obj['Principal Amount']),
            formatCurrency(obj['Ending Balance'])
        ];
    }
    // Crear las filas de datos
    // Comenzar a procesar los datos desde el índice 1 (ignorar la primera fila)
    for (let i = 1; i < data.rows.length; i++) {
        const rowData = data.rows[i];
        if (typeof rowData === 'object' && !Array.isArray(rowData)) {
            const row = document.createElement('tr');
            // Excluir la columna "Payment Amount" de los datos
            const rowDataArray = objectToRow(rowData)//.slice(1); // Slice desde la segunda columna
            rowDataArray.forEach(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        } else {
            console.error('rowData no es un objeto:', rowData);
        }
    }
    // Agregar la cabecera y las filas al cuerpo de la tabla
    table.appendChild(thead);
    table.appendChild(tbody);
    // Agregar la tabla al contenedor en el HTML
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
    // Llamar a la función para dibujar el gráfico de líneas
    drawLineChart(data);
}
function drawLineChart(data) {
    document.getElementById('lineChart').style.display = 'block';
    const ctx = document.getElementById('lineChart').getContext('2d');
    // Verificar si ya existe un gráfico y destruirlo si es necesario
    if (currentChart) {
        currentChart.destroy();
    }
    const paymentDates = data.rows.map(row => row['Payment Date']);
    const principalAmounts = data.rows.map(row => parseFloat(row['Principal Amount'].replace('$', '').replace(',', '')));
    const interestAmounts = data.rows.map(row => parseFloat(row['Interest Amount'].replace('$', '').replace(',', '')));
    // Comenzar a procesar los datos desde el índice 1 (ignorar la primera fila)
    paymentDates.shift();
    principalAmounts.shift();
    interestAmounts.shift();
    const chartData = {
        labels: paymentDates,
        datasets: [
            {
                label: 'Principal Amount',
                borderColor: 'blue',
                backgroundColor: 'transparent',
                data: principalAmounts,
            },
            {
                label: 'Interest Amount',
                borderColor: 'red',
                backgroundColor: 'transparent',
                data: interestAmounts,
            },
        ],
    };
    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Principal vs Interest',
                    font: {
                        size: 24,
                    },
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month', // Puedes ajustar esto según tus necesidades
                        tooltipFormat: 'MMM YYYY', // Formato del tooltip
                    },
                },
                y: {
                    beginAtZero: true,
                    // Otras opciones de escala Y si es necesario
                },
            },
        },
    };
    // Crear el nuevo gráfico y almacenarlo en currentChart
    currentChart = new Chart(ctx, chartConfig);
}
// Función para restablecer los valores del formulario
function clearForm() {
    const loanAmountInput = document.getElementById('loan_amount_input');
    const annualInterestRateRange = document.getElementById('annual_interest_rate_range');
    const loanPeriodSelect = document.getElementById('annual_interest_rate_range');
    const startDateInput = document.getElementById('start_date_input');
    // Restablecer los valores del formulario a sus valores iniciales
    loanAmountInput.value = '';
    annualInterestRateRange.value = 0;
    loanPeriodSelect.value = 0;
    startDateInput.value = '';
    // También puedes actualizar el elemento HTML relacionado con el rango de interés aquí
    document.getElementById('annual_interest_rate_range').textContent = '0%';
    // También puedes actualizar el elemento HTML relacionado con el período en años aquí
    document.getElementById('rangeLoan_Period_interest').textContent = '0';
    // Ocultar las tablas
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    // Ocultar la gráfica y la tabla de resumen
    document.getElementById('lineChart').style.display = 'none';
    document.getElementById('loan-summary').style.display = 'none';
}

function checkDataAvailability() {
    // Lógica para verificar si hay datos en la tabla
    // Por ejemplo, puedes verificar si el elemento de la tabla existe o tiene filas.
    const tableContainer = document.getElementById('table-container');
    const saveButton = document.getElementById('saveButton');

    if (tableContainer && tableContainer.querySelector('table tbody tr')) {
        saveButton.removeAttribute('disabled'); // Habilitar el botón
    } else {
        saveButton.setAttribute('disabled', true); // Deshabilitar el botón
    }
}

function generateAndDownloadFile() {
    // Obtener el contenedor de la tabla
    const tableContainer = document.getElementById('table-container');

    // Verificar si hay una tabla dentro del contenedor
    const table = tableContainer.querySelector('table');
    if (!table) {
        console.error('No se encontró una tabla en el contenedor.');
        return;
    }

    // Obtener los datos de la tabla
    const tableData = Array.from(table.querySelectorAll('tr')).map(row =>
        Array.from(row.querySelectorAll('td, th')).map(cell => cell.textContent)
    );

    // Crear el contenido CSV
    const csvContent = tableData.map(row => row.join('|')).join('\n');

    // Crear un blob a partir del contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Crear un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.csv';

    // Simular un clic en el enlace para descargar el archivo
    a.click();

    // Limpiar el objeto URL
    URL.revokeObjectURL(a.href);
}




// Asignar la función al botón "Save"
document.getElementById('saveButton').addEventListener('click', generateAndDownloadFile);


// Asignar la función al botón "Calculate"
document.getElementById('calculateButton').addEventListener('click', calculateLoan);
// Sincronizar el valor del rango con el elemento HTML
document.getElementById('annual_interest_rate_range').addEventListener('input', function () {
    const annualInterestRate = parseFloat(this.value) || 0;
    document.getElementById('annual_interest_rate_range').textContent = annualInterestRate.toFixed(2) + '%';
});
document.getElementById('loan_period_years_range').addEventListener('input', function () {
    const loanPeriodSelect = parseFloat(this.value) || 0;
    document.getElementById('rangeLoan_Period_interest').textContent = loanPeriodSelect;
});
document.getElementById('clearButton').addEventListener('click', clearForm);
