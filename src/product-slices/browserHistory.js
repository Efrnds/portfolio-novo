export const initialPaths = {
  trato: "/agendar/1-trato-barbershop",
  opinioteca: "/home",
  calmera: "/busca",
  vwrks: "/trabalho",
};

export function visitPage(history, path, replace = false) {
  if (path === history.entries[history.index]) return history;
  if (replace) return { ...history, entries: history.entries.map((entry, index) => index === history.index ? path : entry) };
  const entries = [...history.entries.slice(0, history.index + 1), path];
  return { entries, index: entries.length - 1 };
}

export function movePage(history, direction) {
  const index = Math.max(0, Math.min(history.entries.length - 1, history.index + direction));
  return index === history.index ? history : { ...history, index };
}
