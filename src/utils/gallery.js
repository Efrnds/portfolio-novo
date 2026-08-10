/**
 * Normalize project media into carousel slides.
 * Supports gallery[].aspect ("9/16" | "16/9" | "portrait" | "landscape")
 * and infers portrait from mobile-like paths/alts.
 */
function resolveAspect(item) {
  const raw = (item.aspect || item.orientation || "").toString().toLowerCase();
  if (
    raw === "9/16" ||
    raw === "portrait" ||
    raw === "mobile" ||
    raw === "phone"
  ) {
    return "9/16";
  }
  if (raw === "16/9" || raw === "landscape" || raw === "desktop") {
    return "16/9";
  }

  const hint = `${item.src || ""} ${item.alt || ""}`.toLowerCase();
  if (/(^|\/|[-_])mobile|phone|portrait|9x16|9-16/.test(hint)) {
    return "9/16";
  }
  return "16/9";
}

export function getProjectSlides(project) {
  if (project.gallery?.length) {
    return project.gallery.map((item) => ({
      src: item.src,
      alt: item.alt || project.title,
      aspect: resolveAspect(item),
    }));
  }

  const slides = [];
  const seen = new Set();

  const push = (src, alt, aspectHint) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    slides.push({
      src,
      alt: alt || project.title,
      aspect: resolveAspect({ src, alt, aspect: aspectHint }),
    });
  };

  project.images?.forEach((img) => {
    push(img.src, img.alt, img.aspect || img.orientation);
  });

  if (project.cardImages) {
    push(project.cardImages.desktop, `${project.title} desktop`, "16/9");
    push(project.cardImages.tablet, `${project.title} tablet`, "16/9");
    push(project.cardImages.mobile, `${project.title} mobile`, "9/16");
  }

  return slides;
}
