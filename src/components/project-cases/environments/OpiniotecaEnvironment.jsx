import { useId, useReducer, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiBookmark, FiBookOpen, FiHeart, FiStar } from "react-icons/fi";
import { useLanguage } from "../../../i18n/LanguageContext";
import { demoBooks } from "../../../data/productDemos";
import { initialReaderState, readerReducer } from "../../../utils/productDemos";
import { environmentCopy } from "./copy";
import ProductCrop from "./ProductCrop";
import { DemoFooter, Environment } from "./shared";

export default function OpiniotecaEnvironment() {
  const { language } = useLanguage();
  const copy = environmentCopy[language];
  const text = copy.reader;
  const reduced = useReducedMotion();
  const [state, dispatch] = useReducer(readerReducer, initialReaderState);
  const [bookId, setBookId] = useState(demoBooks[0].id);
  const [drafts, setDrafts] = useState({});
  const [tab, setTab] = useState("feed");
  const [published, setPublished] = useState(false);
  const ratingId = useId();
  const textareaId = useId();
  const book = demoBooks.find((item) => item.id === bookId);
  const draft = drafts[bookId] || { rating: 0, body: "" };
  const setDraft = (change) => { setDrafts((current) => ({ ...current, [bookId]: { ...draft, ...change } })); setPublished(false); };
  const reset = () => { dispatch({ type: "reset" }); setDrafts({}); setPublished(false); };
  const saved = state.saved.includes(bookId);

  return <Environment kind="opinioteca" title={text.title}>
    <div className="reader-native-bar"><span className="reader-native-brand"><FiBookOpen aria-hidden="true" />opinioteca</span>
      <nav aria-label={text.feed}>
        <button type="button" aria-pressed={tab === "feed"} onClick={() => setTab("feed")}>{text.feed}<span>{state.posts.length}</span></button>
        <button type="button" aria-pressed={tab === "shelf"} onClick={() => setTab("shelf")}>{text.shelf}<span>{state.saved.length}</span></button>
      </nav><span>{copy.demo}</span>
    </div>
    <header className="product-environment__heading"><h2>{text.title}</h2><p>{text.intro}</p></header>
    <div className="reader-native-books" role="group" aria-label={text.choose}>
      {demoBooks.map((item) => <motion.button key={item.id} type="button" className={bookId === item.id ? "is-selected" : ""} aria-pressed={bookId === item.id} onClick={() => { setBookId(item.id); setPublished(false); }} whileTap={reduced ? undefined : { scale: 0.985 }}>
        <ProductCrop item={item} label={item.title} /><span><strong>{item.title}</strong><small>{item.author}</small></span><FiArrowRight aria-hidden="true" />
      </motion.button>)}
    </div>
    <div className="reader-native-workspace">
      <div className="reader-native-feed">
        <div className="reader-native-section-title"><h3>{tab === "feed" ? text.feed : text.shelf}</h3><span>{tab === "feed" ? state.posts.length : state.saved.length}</span></div>
        {tab === "feed" ? <>
          {!state.posts.length && <div className="reader-native-empty"><FiBookOpen aria-hidden="true" /><h4>{text.empty}</h4><p>{text.emptyNote}</p></div>}
          <motion.div layout className="reader-native-posts">
            {state.posts.map((post) => {
              const postBook = demoBooks.find((item) => item.id === post.bookId);
              return <motion.article key={post.id} layout initial={reduced ? false : { y: 16, clipPath: "inset(0 0 100% 0)" }} animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.4 }}>
                <div className="reader-native-post__author"><span aria-hidden="true">{text.you.slice(0, 1)}</span><strong>{text.you}</strong><small>{copy.demo}</small></div>
                <div className="reader-native-post__book"><ProductCrop item={postBook} label={postBook.title} /><div><strong>{postBook.title}</strong><span>{postBook.author}</span><span className="reader-native-post__stars" aria-label={`${post.rating} / 5`}>{Array.from({ length: 5 }, (_, index) => <FiStar key={index} aria-hidden="true" fill={index < post.rating ? "currentColor" : "none"} />)}</span></div></div>
                <p>{post.body}</p><button type="button" aria-label={post.liked ? text.unlike : text.like} aria-pressed={post.liked} onClick={() => dispatch({ type: "like", id: post.id })}><FiHeart fill={post.liked ? "currentColor" : "none"} aria-hidden="true" />{post.liked ? 1 : 0}</button>
              </motion.article>;
            })}
          </motion.div>
        </> : <>
          {!state.saved.length && <div className="reader-native-empty"><FiBookmark aria-hidden="true" /><h4>{text.shelfEmpty}</h4><p>{text.shelfNote}</p></div>}
          <div className="reader-native-shelf">{demoBooks.filter((item) => state.saved.includes(item.id)).map((item) => <button key={item.id} type="button" onClick={() => setBookId(item.id)} aria-pressed={bookId === item.id}><ProductCrop item={item} label={item.title} /><strong>{item.title}</strong><span>{item.author}</span></button>)}</div>
        </>}
      </div>
      <form className="reader-native-composer" onSubmit={(event) => {
        event.preventDefault();
        dispatch({ type: "publish", bookId, rating: draft.rating, body: draft.body });
        if (draft.rating && draft.body.trim()) { setDrafts((current) => ({ ...current, [bookId]: { rating: 0, body: "" } })); setTab("feed"); setPublished(true); }
      }}>
        <div className="reader-native-composer__book"><ProductCrop item={book} label={book.title} /><div><h3>{book.title}</h3><p>{book.author}</p></div></div>
        <button type="button" className="reader-native-save" onClick={() => dispatch({ type: "save", bookId })} aria-pressed={saved}><FiBookmark fill={saved ? "currentColor" : "none"} aria-hidden="true" />{saved ? text.saved : text.save}</button>
        <fieldset className="reader-native-rating"><legend>{text.rating}</legend>{[1, 2, 3, 4, 5].map((rating) => <label key={rating} className={draft.rating >= rating ? "is-filled" : ""}>
          <input type="radio" name={ratingId} value={rating} checked={draft.rating === rating} onChange={() => setDraft({ rating })} /><FiStar fill={draft.rating >= rating ? "currentColor" : "none"} aria-hidden="true" /><span className="sr-only">{rating} {text.stars}</span>
        </label>)}</fieldset>
        <label htmlFor={textareaId}>{text.write}</label><textarea id={textareaId} value={draft.body} onChange={(event) => setDraft({ body: event.target.value })} placeholder={text.placeholder} maxLength={600} rows={4} required />
        <span className="reader-native-count">{draft.body.length} / 600</span>
        <motion.button type="submit" className="reader-native-publish" disabled={!draft.rating || !draft.body.trim()} whileTap={reduced ? undefined : { scale: 0.985 }}>{text.publish}<FiArrowRight aria-hidden="true" /></motion.button>
        <p className="reader-native-status" role="status">{state.error ? text.error : published ? text.published : ""}</p>
      </form>
    </div>
    <DemoFooter note={text.note} reset={reset} href="https://opinioteca.prismapp.com.br" />
  </Environment>;
}
