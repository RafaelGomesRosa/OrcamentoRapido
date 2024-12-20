// Inicializar valores padrão
const customValues = {
    piso: { ceramica: 30, porcelanato: 50 },
    tinta: { latex: 15, acrilica: 25 },
    portas: 200,
    janelas: 300,
    forro: { gesso_rebaixado: 40, gesso_simples: 30, pvc: 20 }
};

// Exibir o card de personalização
function openCustomizationCard() {
    const card = document.getElementById("customizationCard");
    card.style.display = "block";
}

// Salvar os valores personalizados
function saveCustomValues() {
    const customPiso = parseFloat(document.getElementById("customPiso").value);
    const customTinta = parseFloat(document.getElementById("customTinta").value);
    const customPortas = parseFloat(document.getElementById("customPortas").value);
    const customJanelas = parseFloat(document.getElementById("customJanelas").value);
    const customForro = parseFloat(document.getElementById("customForro").value);

    if (customPiso) customValues.piso = { ceramica: customPiso, porcelanato: customPiso };
    if (customTinta) customValues.tinta = { latex: customTinta, acrilica: customTinta };
    if (customPortas) customValues.portas = customPortas;
    if (customJanelas) customValues.janelas = customJanelas;
    if (customForro) customValues.forro = { gesso_rebaixado: customForro, gesso_simples: customForro, pvc: customForro };

    document.getElementById("customizationCard").style.display = "none";
}

// Gerar o relatório
function generateReport() {
    const area = parseFloat(document.getElementById("area").value);
    const piso = document.getElementById("piso").value;
    const tinta = document.getElementById("tinta").value;
    const portas = parseInt(document.getElementById("portas").value, 10) || 0;
    const janelas = parseInt(document.getElementById("janelas").value, 10) || 0;
    const forro = document.getElementById("forro").value;

    if (!area || !piso || !tinta || !forro) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const custoPiso = area * (customValues.piso[piso] || 0);
    const custoTinta = area * (customValues.tinta[tinta] || 0);
    const custoPortas = portas * customValues.portas;
    const custoJanelas = janelas * customValues.janelas;
    const custoForro = area * (customValues.forro[forro] || 0);

    const total = custoPiso + custoTinta + custoPortas + custoJanelas + custoForro;

    const reportContent = `
        <p>Área Total: <b>${area} m²</b></p>
        <p>Piso (${piso}): <b>R$ ${custoPiso.toFixed(2)}</b></p>
        <p>Tinta (${tinta}): <b>R$ ${custoTinta.toFixed(2)}</b></p>
        <p>Portas (${portas}): <b>R$ ${custoPortas.toFixed(2)}</b></p>
        <p>Janelas (${janelas}): <b>R$ ${custoJanelas.toFixed(2)}</b></p>
        <p>Forro (${forro}): <b>R$ ${custoForro.toFixed(2)}</b></p>
        <p><strong>TOTAL: R$ ${total.toFixed(2)}</strong></p>
    `;

    document.getElementById("reportContent").innerHTML = reportContent;

    // Exibir o modal
    document.getElementById("reportModal").style.display = "block";
}

// Fechar modal
function closeModal() {
    document.getElementById("reportModal").style.display = "none";
}
