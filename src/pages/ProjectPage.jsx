import { Navigate, useParams } from "react-router-dom";
import { getProject, projects } from "../data/projects";
import CalmeraCase from "../components/project-cases/CalmeraCase";
import OpiniotecaCase from "../components/project-cases/OpiniotecaCase";
import TexsaCase from "../components/project-cases/TexsaCase";
import TratoCase from "../components/project-cases/TratoCase";
import VwrksCase from "../components/project-cases/VwrksCase";

const layouts = {
  trato: TratoCase,
  opinioteca: OpiniotecaCase,
  "calmera-os": CalmeraCase,
  vwrks: VwrksCase,
  "texsa-tools": TexsaCase,
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/" replace />;

  const index = projects.findIndex((item) => item.slug === project.slug);
  const Layout = layouts[project.slug];

  return (
    <Layout
      key={project.slug}
      project={project}
      prev={projects[index - 1]}
      next={projects[index + 1]}
    />
  );
}
