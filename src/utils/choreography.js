export const springs = {
  surface: { type: "spring", stiffness: 210, damping: 29, mass: 0.8 },
  panel: { type: "spring", duration: 0.38, bounce: 0 },
  scroll: { stiffness: 180, damping: 28, mass: 0.6, restDelta: 0.0001, restSpeed: 0.001 },
  control: { type: "spring", stiffness: 380, damping: 32, mass: 0.75 },
  gallery: { stiffness: 280, damping: 30, mass: 0.72, restDelta: 0.0001, restSpeed: 0.001 },
  reflow: { type: "spring", stiffness: 420, damping: 38, mass: 0.8, restDelta: 0.5, restSpeed: 5 },
};

export function visibleGalleryIndex(position, current) {
  if (position > 0.56) return 1;
  if (position < 0.44) return 0;
  return current;
}

export function nextGalleryState(state, progress) {
  if (state.manualOrigin !== undefined) {
    const joined = state.index ? progress > 0.56 : progress < 0.44;
    const reversed = state.index ? progress < state.manualOrigin - 0.08 : progress > state.manualOrigin + 0.08;
    if (!joined && !reversed) return state;
  }
  return { index: visibleGalleryIndex(progress, state.index) };
}
