import { useRef } from "react";
import { AssemblyEdges, AssemblyPart } from "./Assembly";
import { useAssembly } from "../hooks/useAssembly";
import ArchiveScene from "./construction/ArchiveScene";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

export default function WorkSection() {
  const ref = useRef(null);
  const { copy, localizeProject } = useLanguage();
  const localizedProjects = projects.map(localizeProject);
  const featured = localizedProjects.filter((project) => project.film && project.story);
  const archive = localizedProjects.filter((project) => !project.film || !project.story);
  const assembly = useAssembly(ref);

  return (
    <section id="work" className="work-section scroll-mt-28">
      <div
        ref={ref}
        className="section-heading section-heading--work"
      >
        <AssemblyEdges progress={assembly} />
        <AssemblyPart progress={assembly} from="left">
          <p className="eyebrow">{copy.work.eyebrow}</p>
          <h2>{copy.work.title}</h2>
        </AssemblyPart>
        <AssemblyPart progress={assembly} start={0.36}><p>{copy.work.body}</p></AssemblyPart>
      </div>

      <div className="work-section__chapters">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <ArchiveScene projects={archive} offset={featured.length} />
    </section>
  );
}
