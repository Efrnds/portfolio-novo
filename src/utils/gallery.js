export function getProjectSlides(project) {
  if (project.gallery?.length) {
    return project.gallery.map((item) => ({
      src: item.src,
      alt: item.alt || project.title,
    }));
  }

  const slides = [];
  const seen = new Set();

  const push = (src, alt) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    slides.push({ src, alt: alt || project.title });
  };

  project.images?.forEach((img) => {
    push(img.src, img.alt);
  });

  if (project.cardImages) {
    push(project.cardImages.desktop, `${project.title} desktop`);
    push(project.cardImages.tablet, `${project.title} tablet`);
    push(project.cardImages.mobile, `${project.title} mobile`);
  }

  return slides;
}
