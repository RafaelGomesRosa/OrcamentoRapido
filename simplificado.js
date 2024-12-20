function generateReport() {
    const area = parseFloat(document.getElementById("area").value);
    const piso = document.getElementById("piso").value;
    const tinta = document.getElementById("tinta").value;
    const portas = parseInt(document.getElementById("portas").value, 10) || 0;
    const janelas = parseInt(document.getElementById("janelas").value, 10) || 0;
    const forro = document.getElementById("forro").value;

    // Valores estimados
    const valores = {
        piso: { ceramica: 30, porcelanato: 60 },
        tinta: { latex: 10, acrilica: 20 },
        portas: 200,
        janelas: 300,
        forro: { gesso_rebaixado: 50, gesso_simples: 30, pvc: 20 },
        laje: 80,
        tijolo: 5,
        cimento_areia: 15,
    };

    // Cálculo dos custos
    const custoPiso = area * (valores.piso[piso] || 0);
    const custoTinta = area * (valores.tinta[tinta] || 0);
    const custoPortas = portas * valores.portas;
    const custoJanelas = janelas * valores.janelas;
    const custoForro = area * (valores.forro[forro] || 0);
    const custoLaje = area * valores.laje;
    const custoTijolos = area * valores.tijolo;
    const custoCimentoAreia = area * valores.cimento_areia;

    const total = custoPiso + custoTinta + custoPortas + custoJanelas + custoForro + custoLaje + custoTijolos + custoCimentoAreia;

    // Exibir relatório
    const reportContent = `
        Área Total: ${area} m²

        - Piso (${piso}): R$ ${custoPiso.toFixed(2)}
        - Tinta (${tinta}): R$ ${custoTinta.toFixed(2)}
        - Portas (${portas}): R$ ${custoPortas.toFixed(2)}
        - Janelas (${janelas}): R$ ${custoJanelas.toFixed(2)}
        - Forro (${forro}): R$ ${custoForro.toFixed(2)}
        - Laje: R$ ${custoLaje.toFixed(2)}
        - Tijolos: R$ ${custoTijolos.toFixed(2)}
        - Cimento/Areia: R$ ${custoCimentoAreia.toFixed(2)}

        TOTAL: R$ ${total.toFixed(2)}
    `;

    document.getElementById("reportContent").textContent = reportContent;

    // Exibir modal
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
