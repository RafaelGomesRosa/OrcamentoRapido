<script>
    function generateReport() {
        const area = parseFloat(document.getElementById('area').value);
        const padraoSelect = document.getElementById('padrao');
        const padrao = padraoSelect.options[padraoSelect.selectedIndex].value;
        const costPerSqM = parseFloat(padraoSelect.options[padraoSelect.selectedIndex].getAttribute('data-cost'));

        // Validação para garantir que a área seja um número válido
        if (isNaN(area) || area <= 0) {
            alert('Por favor, insira uma metragem válida.');
            return;
        }

        const laborCostPerSqM = 800; // Custo de mão de obra por m²
        const constructionCost = area * costPerSqM; // Cálculo do custo da construção
        const laborCost = area * laborCostPerSqM; // Cálculo do custo da mão de obra

        // Cálculo de Benefícios e Despesas Indiretas (30% do custo da construção, sem incluir o BDI)
        const benefitsAndIndirectCosts = constructionCost * 0.30;

        // Cálculo do Custo Total (incluindo o BDI)
        const totalCost = constructionCost + laborCost + benefitsAndIndirectCosts;

        // Log dos valores
        console.log(`Metragem: ${area} m²`);
        console.log(`Padrão: ${padrao}`);
        console.log(`Custo por m²: ${costPerSqM}`);
        console.log(`Custo da Construção: R$ ${constructionCost.toFixed(2)}`);
        console.log(`Custo de Mão de Obra: R$ ${laborCost.toFixed(2)}`);
        console.log(`Benefícios e Despesas Indiretas: R$ ${benefitsAndIndirectCosts.toFixed(2)}`);
        console.log(`Custo Total: R$ ${totalCost.toFixed(2)}`);

        // Atualizar relatório
        document.getElementById('details').innerHTML = `
            <strong>Metragem:</strong> ${area} m²<br>
            <strong>Padrão:</strong> ${padrao}<br>
            <strong>Custo da construção:</strong> R$ ${constructionCost.toFixed(2)}<br>
            <strong>Custo de mão de obra:</strong> R$ ${laborCost.toFixed(2)}<br>
            <strong>Custo total:</strong> R$ ${totalCost.toFixed(2)}<br>
            <strong>Benefícios e Despesas Indiretas (30%):</strong> R$ ${benefitsAndIndirectCosts.toFixed(2)}
        `;

        // Exibir relatório
        document.getElementById('report').style.display = 'block';

        // Gráfico de pizza
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Custo da Construção', 'Custo de Mão de Obra', 'Benefícios e Despesas Indiretas'],
                datasets: [{
                    data: [constructionCost, laborCost, benefitsAndIndirectCosts],
                    backgroundColor: ['#28a745', '#007bff', '#ff9900'], // Cores para os setores
                    hoverBackgroundColor: ['#218838', '#0056b3', '#e68a00']
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

    function showCategoryInfo() {
        document.getElementById('categoryCard').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }

    function hideCategoryInfo() {
        document.getElementById('categoryCard').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
</script>
