<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Orçamento</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f9f9f9;
        }

        .form-container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
            margin-bottom: 20px;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
        }

        input, select, button {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        .card {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 100%;
            max-width: 500px;
        }

        canvas {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Gerar Relatório</h1>
        <label for="area">Metragem da Casa (m²):</label>
        <input type="number" id="area" placeholder="Digite a metragem" required>

        <label for="padrao">Padrão da Casa:</label>
        <select id="padrao">
            <option value="R1-B" data-cost="3016.03">R1-B - Residência padrão baixo</option>
            <option value="R1-N" data-cost="3528.16">R1-N - Residência padrão normal</option>
            <option value="R1-A" data-cost="4297.97">R1-A - Residência padrão alto</option>
            <option value="RP1Q" data-cost="2945.97">RP1Q - Residência popular</option>
        </select>

        <button onclick="generateReport()">Gerar Relatório</button>
    </div>

    <div id="report" class="card" style="display: none;">
        <h2>Relatório de Orçamento</h2>
        <p id="details"></p>
        <canvas id="chart" width="400" height="400"></canvas>
    </div>

    <script>
        function generateReport() {
            const area = parseFloat(document.getElementById('area').value);
            const padraoSelect = document.getElementById('padrao');
            const padrao = padraoSelect.options[padraoSelect.selectedIndex].value;
            const costPerSqM = parseFloat(padraoSelect.options[padraoSelect.selectedIndex].getAttribute('data-cost'));

            if (isNaN(area) || area <= 0) {
                alert('Por favor, insira uma metragem válida.');
                return;
            }

            const laborCostPerSqM = 800; // Custo de mão de obra por m²
            const constructionCost = area * costPerSqM;
            const laborCost = area * laborCostPerSqM;
            const totalCost = constructionCost + laborCost;

            // Log dos valores
            console.log(`Metragem: ${area} m²`);
            console.log(`Padrão: ${padrao}`);
            console.log(`Custo por m²: ${costPerSqM}`);
            console.log(`Custo da Construção: R$ ${constructionCost.toFixed(2)}`);
            console.log(`Custo de Mão de Obra: R$ ${laborCost.toFixed(2)}`);
            console.log(`Custo Total: R$ ${totalCost.toFixed(2)}`);

            // Atualizar relatório
            document.getElementById('details').innerHTML = `
                <strong>Metragem:</strong> ${area} m²<br>
                <strong>Padrão:</strong> ${padrao}<br>
                <strong>Custo da construção:</strong> R$ ${constructionCost.toFixed(2)}<br>
                <strong>Custo de mão de obra:</strong> R$ ${laborCost.toFixed(2)}<br>
                <strong>Custo total:</strong> R$ ${totalCost.toFixed(2)}
            `;

            // Exibir relatório
            document.getElementById('report').style.display = 'block';

            // Gráfico de pizza
            const ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Custo da Construção', 'Custo de Mão de Obra'],
                    datasets: [{
                        data: [constructionCost, laborCost],
                        backgroundColor: ['#28a745', '#007bff'], // Construção: Verde, Mão de Obra: Azul
                        hoverBackgroundColor: ['#218838', '#0056b3']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    </script>
</body>
</html>
