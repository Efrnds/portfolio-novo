export const springs = {
  surface: { type: "spring", stiffness: 150, damping: 27, mass: 0.9 },
  panel: { type: "spring", stiffness: 240, damping: 32, mass: 0.85, restDelta: 0.5, restSpeed: 5 },
  scroll: { stiffness: 180, damping: 28, mass: 0.6, restDelta: 0.0001, restSpeed: 0.001 },
  control: { type: "spring", stiffness: 380, damping: 32, mass: 0.75 },
};

export function galleryPosition(scroll) {
  const progress = Math.min(1, Math.max(0, (scroll - 0.18) / 0.64));
  return progress * progress * (3 - 2 * progress);
}

export function visibleGalleryIndex(position, current) {
  if (position > 0.56) return 1;
  if (position < 0.44) return 0;
  return current;
}
