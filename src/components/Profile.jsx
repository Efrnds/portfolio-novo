import { useLanguage } from "../i18n/LanguageContext";
import SceneArrival, { TypeArrival } from "./SceneArrival";

export default function Profile() {
  const { copy } = useLanguage();
  const text = copy.editorial.about;
  return (
    <section id="about" className="editorial-profile" aria-labelledby="about-title">
      <header><p className="editorial-label">03 / {text.label}</p><h2 id="about-title"><TypeArrival>{text.title}</TypeArrival></h2></header>
      <div className="editorial-profile__body">
        <p>{text.body}</p>
        <h3>{text.experience}</h3>
        <ol>{copy.experience.roles.map((role, index) => <SceneArrival as="li" delay={Math.min(index * 0.04, 0.12)} direction="right" key={role[1]}><div><strong>{role[1]}</strong><p>{role[0]}</p></div><span>{role[2]}</span></SceneArrival>)}</ol>
        <a className="editorial-link" href="mailto:contato.efrnds@outlook.com">{text.contact}</a>
      </div>
    </section>
  );
}
