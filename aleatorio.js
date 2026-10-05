const nomesAventureiros = [
    "Link",
    "Sheikah",
    "Explorador",
    "Herói de Hyrule",
    "Aventureiro",
    "Guardião de Hyrule"
];

export function aleatorio(lista) {
    if (!lista || lista.length === 0) {
        return "";
    }

    const posicao = Math.floor(Math.random() * lista.length);

    return lista[posicao];
}

export function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

export const nomeAventureiro = aleatorio(nomesAventureiros);
