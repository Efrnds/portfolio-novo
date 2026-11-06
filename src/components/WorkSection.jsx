import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import SceneArrival, { TypeArrival } from "./SceneArrival";

export default function WorkSection() {
  const { copy, localizeProject } = useLanguage();
  const text = copy.editorial;
  const featured = projects.filter((project) => project.film && project.story).map(localizeProject);

  return (
    <section id="work" className="editorial-work" aria-labelledby="work-title">
      <header className="editorial-work__heading">
        <p className="editorial-label">01 / {text.index}</p>
        <h2 id="work-title"><TypeArrival>{text.workTitle}</TypeArrival></h2>
        <p>{text.workIntro}</p>
      </header>
      {featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      <article className="commission-entry">
        <SceneArrival className="commission-entry__copy" direction="left">
          <p className="editorial-label">04 / {text.commission}</p>
          <h3><TypeArrival>{text.commissionTitle}</TypeArrival></h3>
          <p>{text.commissionBody}</p>
          <Link className="editorial-link" to="/projects/vwrks">{text.commissionLink}<span aria-hidden="true">↗</span></Link>
        </SceneArrival>
        <Link to="/projects/vwrks" className="commission-entry__image" aria-label={`${copy.a11y.readCase} Vwrks`}>
          <img src="/images/vwrks/home.webp" alt={`${copy.details.vwrks.pages[0]} / Vwrks`} width="1876" height="996" loading="lazy" />
        </Link>
      </article>
    </section>
  );
}
