import { useLanguage } from "../i18n/LanguageContext";

export default function Profile() {
  const { copy } = useLanguage();
  const text = copy.editorial.about;
  return (
    <section id="about" className="editorial-profile" aria-labelledby="about-title">
      <header><p className="editorial-label">03 / {text.label}</p><h2 id="about-title">{text.title}</h2></header>
      <div className="editorial-profile__body">
        <p>{text.body}</p>
        <h3>{text.experience}</h3>
        <ol>{copy.experience.roles.map((role) => <li key={role[1]}><div><strong>{role[1]}</strong><p>{role[0]}</p></div><span>{role[2]}</span></li>)}</ol>
        <a className="editorial-link" href="mailto:contato.efrnds@outlook.com">{text.contact}</a>
      </div>
    </section>
  );
}
