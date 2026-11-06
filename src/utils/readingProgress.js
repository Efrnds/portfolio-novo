export function paginasPorPorcentagem(porcentagem, totalPaginas) {
  return porcentagem >= 100
    ? totalPaginas
    : Math.min(totalPaginas - 1, Math.round(totalPaginas * porcentagem / 100));
}

export function calcularProgressoLeitura(tipo, valor, porcentagemAtual, totalPaginas) {
  if (!Number.isFinite(valor) || !Number.isFinite(porcentagemAtual) ||
      !Number.isInteger(totalPaginas) || totalPaginas <= 0 ||
      porcentagemAtual < 0 || porcentagemAtual >= 100) return null;

  const paginaAnterior = paginasPorPorcentagem(porcentagemAtual, totalPaginas);
  if (tipo === "paginas") {
    if (!Number.isInteger(valor) || valor <= 0 || valor > totalPaginas - paginaAnterior) return null;
    const paginaAtual = paginaAnterior + valor;
    return { paginasLidas: valor, paginaAtual, porcentagem: paginaAtual / totalPaginas * 100 };
  }

  if (valor <= porcentagemAtual || valor > 100) return null;
  const paginaAtual = paginasPorPorcentagem(valor, totalPaginas);
  const paginasLidas = paginaAtual - paginaAnterior;
  if (paginasLidas <= 0) return null;
  return { paginasLidas, paginaAtual, porcentagem: valor };
}
