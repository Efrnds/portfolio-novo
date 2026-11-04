export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function sceneRange(top, height, viewport, header, compact = false) {
  const start = compact ? top - viewport * 0.72 : top - header;
  const end = compact ? top - viewport * 0.12 : top + height - viewport;
  return { start, end: Math.max(start + 1, end) };
}

export function storyBeat(progress, count) {
  return Math.min(Math.max(count - 1, 0), Math.floor(clamp((progress - 0.4) / 0.43) * count));
}

export function scenePhase(progress) {
  if (progress < 0.4) return "building";
  if (progress < 0.84) return "reading";
  return "transferring";
}

export function acceptsTransition(event) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
