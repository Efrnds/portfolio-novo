import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "../../src/i18n/LanguageContext";
import SceneNavigation from "../../src/components/construction/SceneNavigation";
import ConstructionDirector from "../../src/components/construction/ConstructionDirector";
import Header from "../../src/Layout/Header";
import Main from "../../src/Layout/Main";
import Footer from "../../src/Layout/Footer";
import ProjectPage from "../../src/pages/ProjectPage";
import ScrollProgress from "../../src/components/ScrollProgress";
import GrainOverlay from "../../src/components/GrainOverlay";
import { exerciseProduct } from "./product-interactions";

const config = window.__motionReview;
const checks = [];
const errors = [];
const scrollCalls = [];
const recordings = [];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const check = (name, passed, detail) => checks.push({ name, passed: !!passed, detail });
const click = (node) => { if (!node) throw new Error("Missing control"); flushSync(() => node.click()); };
const nativeScroll = window.scrollTo.bind(window);
window.scrollTo = (options, ...rest) => { scrollCalls.push(options); nativeScroll(options, ...rest); };
const nativeIntoView = HTMLElement.prototype.scrollIntoView;
HTMLElement.prototype.scrollIntoView = function (options) { scrollCalls.push(options); nativeIntoView.call(this, options); };
window.addEventListener("error", (event) => errors.push(event.message));
window.addEventListener("unhandledrejection", (event) => errors.push(String(event.reason)));

export function Navigator() {
  const navigate = useNavigate();
  useEffect(() => { window.reviewNavigate = navigate; }, [navigate]);
  return null;
}

function resolveAssets() {
  const roots = [document, ...[...document.querySelectorAll("[data-product-slice]")].map((node) => node.shadowRoot).filter(Boolean)];
  for (const root of roots) for (const image of root.querySelectorAll('img[src^="/"],image[href^="/"]')) {
    const attribute = image.tagName.toLowerCase() === "image" ? "href" : "src";
    image.setAttribute(attribute, config.publicBase + image.getAttribute(attribute).slice(1));
  }
}

function report() {
  if (window.reviewReported) return;
  window.reviewReported = true;
  const result = { name: config.name, viewport: [innerWidth, innerHeight], checks, errors, scrollCalls, recordings };
  const link = document.createElement("a");
  link.download = config.name + ".json";
  link.href = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: "application/json" }));
  link.click();
}

function record(name, read, duration = 700) {
  const frames = [];
  const start = performance.now();
  return new Promise((resolve) => {
    const sample = (time) => {
      frames.push({ ms: Math.round(time - start), value: read() });
      if (time - start < duration) requestAnimationFrame(sample);
      else { recordings.push({ name, frames, environment: "Firefox headless, file fixture; not a device FPS benchmark" }); resolve(frames); }
    };
    requestAnimationFrame(sample);
  });
}

function snapshot(name) {
  const clone = document.documentElement.cloneNode(true);
  clone.querySelectorAll("script").forEach((node) => node.remove());
  const originals = document.querySelectorAll("[style]");
  clone.querySelectorAll("[style]").forEach((node, index) => { node.style.transform = getComputedStyle(originals[index]).transform; });
  const originalHosts = document.querySelectorAll("[data-product-slice]");
  clone.querySelectorAll("[data-product-slice]").forEach((node, index) => {
    if (originalHosts[index].shadowRoot) node.innerHTML = `<template shadowrootmode="open">${originalHosts[index].shadowRoot.innerHTML}</template>`;
  });
  clone.querySelector("body").style.cssText += `margin:0;position:relative;top:-${scrollY}px;overflow:hidden;height:${innerHeight}px`;
  const link = document.createElement("a");
  link.download = `${config.name}-${name}.html`;
  link.href = URL.createObjectURL(new Blob(["<!doctype html>" + clone.outerHTML], { type: "text/html" }));
  link.click();
}

localStorage.setItem("portfolio-language", config.language ?? "en");
flushSync(() => createRoot(document.getElementById("root")).render(
  <MotionConfig reducedMotion="user"><MemoryRouter initialEntries={[config.route ?? "/"]}><LanguageProvider>
    <Navigator /><SceneNavigation><ConstructionDirector>
      <GrainOverlay /><ScrollProgress /><div className="font-Urbanist"><Header />
        <Routes><Route path="/" element={<Main />} /><Route path="/projects/:slug" element={<ProjectPage />} /></Routes><Footer />
      </div>
    </ConstructionDirector></SceneNavigation>
  </LanguageProvider></MemoryRouter></MotionConfig>,
));
const assetTimer = setInterval(resolveAssets, 100);
setTimeout(report, 19000);

async function run() {
  await document.fonts.ready;
  await pause(800);
  resolveAssets();
  check("page fits its viewport", document.documentElement.scrollWidth <= innerWidth + 1);
  const mark = document.querySelector(".site-header__mark span");
  check("header mark keeps its original size on every viewport", mark.offsetWidth > 0 && parseFloat(getComputedStyle(mark).fontSize) >= 31);
  snapshot("opening");
  const card = document.querySelector("#work-trato");
  if (!config.compact && !config.route) {
    const sequence = card.querySelector(".work-feature__sequence");
    const top = sequence.getBoundingClientRect().top + scrollY - 72;
    const travel = sequence.offsetHeight - innerHeight + 72;
    nativeScroll({ top: top + travel * 0.5, behavior: "instant" });
    await pause(700);
    const canvas = card.querySelector(".evidence-canvas");
    const track = card.querySelector(".evidence-track");
    const position = (canvas.getBoundingClientRect().left - track.getBoundingClientRect().left) / canvas.clientWidth;
    check("gallery settles on a whole screen when scrolling stops", Math.min(Math.abs(position), Math.abs(1 - position)) < 0.005, position);
    const before = scrollY;
    const views = card.querySelectorAll(".evidence-controls button");
    click(views[1]);
    const frames = await record("gallery selection", () => (canvas.getBoundingClientRect().left - track.getBoundingClientRect().left) / canvas.clientWidth);
    check("gallery moves toward its destination without overshooting", frames.every((frame) => frame.value >= -0.005 && frame.value <= 1.005) && frames.at(-1).value > 0.995);
    check("gallery reaches a readable destination within half a second", frames.find((frame) => frame.ms >= 500)?.value > 0.995);
    check("choosing a gallery screen preserves page position", Math.abs(scrollY - before) < 2, { before, after: scrollY });
    click(views[0]); await pause(80); click(views[1]); await pause(700);
    check("reversing a gallery transition settles on the latest choice", views[1].getAttribute("aria-pressed") === "true" && Math.abs((canvas.getBoundingClientRect().left - track.getBoundingClientRect().left) / canvas.clientWidth - 1) < 0.005 && Math.abs(scrollY - before) < 2);
    click(card.querySelector('a[href="/projects/trato"]'));
    await pause(800);
    check("case opens directly into its product demo", !!document.querySelector('[data-product-slice="trato"]') && !document.querySelector(".case-cover"));
    flushSync(() => window.reviewNavigate(-1));
    await new Promise(requestAnimationFrame);
    const restoredCard = document.querySelector("#work-trato");
    check("back restores the selected screen before its first frame", restoredCard?.querySelectorAll(".evidence-controls button")[1].getAttribute("aria-pressed") === "true", { mounted: !!restoredCard, selected: restoredCard?.querySelector('[aria-pressed="true"]')?.textContent });
    await pause(500);
    check("back restores reading position", Math.abs(scrollY - before) < 3, { before, after: scrollY });
    snapshot("gallery");
    click(document.querySelector('.language-switch button'));
    check("language change preserves gallery selection", document.querySelector('#work-trato .evidence-controls button[aria-pressed="true"]')?.textContent.includes("02"));
    const operations = document.querySelector("#experience");
    const operationsTop = operations.getBoundingClientRect().top + scrollY - 72;
    const reading = Number(operations.dataset.sceneReadOffset);
    nativeScroll({ top: operationsTop + reading, behavior: "instant" }); await pause(500);
    const content = operations.querySelector(".editorial-operations__content");
    check("operations holds a fully readable state", getComputedStyle(content).opacity === "1");
    check("pinned operations fits its available height", !operations.classList.contains("is-pinned") || content.getBoundingClientRect().bottom <= innerHeight);
    if (reading > 0) {
      const distance = operations.offsetHeight - innerHeight + 72;
      nativeScroll({ top: operationsTop + distance * 0.94, behavior: "instant" }); await pause(500);
      check("operations disappears before its dark environment ends", Number(getComputedStyle(content).opacity) < 0.01 && operations.getBoundingClientRect().bottom >= innerHeight - 1);
    }
    nativeScroll({ top: document.documentElement.scrollHeight, behavior: "instant" }); await pause(850);
    const footer = document.querySelector(".editorial-footer").getBoundingClientRect();
    check("ending fills the available viewport", footer.height >= innerHeight - 73);
    check("ending reaches its complete composition", footer.top <= 73 && footer.bottom >= innerHeight - 1, { top: footer.top, bottom: footer.bottom, viewport: innerHeight });
    const titleLines = [...document.querySelectorAll(".editorial-footer .type-arrival > span")].map((node) => ({ y: new DOMMatrix(getComputedStyle(node).transform).m42, text: node.textContent, visible: node.parentElement.dataset.arrived, top: node.parentElement.getBoundingClientRect().top, height: node.parentElement.offsetHeight, animations: node.getAnimations().map((animation) => ({ state: animation.playState, time: animation.currentTime, frames: animation.effect.getKeyframes() })) }));
    check("ending title is fully revealed", titleLines.length > 0 && titleLines.every((line) => Math.abs(line.y) < 1), titleLines);
    check("ending controls are visible at the end of the document", document.querySelector(".editorial-footer__bottom").getBoundingClientRect().bottom <= innerHeight + 1);
    snapshot("ending");
  }
  if (config.compact && !config.route) {
    click(document.querySelector(".menu-toggle"));
    await pause(500);
    check("menu opens", !!document.querySelector("#site-menu"));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })); await pause(450);
    check("Escape closes the menu and restores its trigger", !document.querySelector("#site-menu") && document.activeElement === document.querySelector(".menu-toggle"));
    click(document.querySelector(".menu-toggle")); await pause(400);
    const entries = document.querySelectorAll("#site-menu nav:first-of-type button");
    const beforeCalls = scrollCalls.length;
    click(entries[1]);
    await pause(700);
    check("menu closes after choosing a destination", !document.querySelector("#site-menu"));
    check("menu releases scroll lock", document.body.style.overflow !== "hidden");
    if (config.reduced) check("reduced motion never requests smooth scrolling", !scrollCalls.slice(beforeCalls).some((call) => call?.behavior === "smooth"));
    check("destination remains visible below the navbar", document.querySelector("#about").getBoundingClientRect().bottom > 72);
  }
  if (config.route) {
    const host = document.querySelector("[data-product-slice]");
    await pause(700);
    check("product loads without a cover image", !!host?.shadowRoot && !document.querySelector(".case-cover"));
    const scroller = host.shadowRoot.querySelector("[data-browser-scroll]");
    check("product keeps its scrollable content inside the browser", Math.abs(host.offsetHeight - scroller.clientHeight) <= 1 && scroller.scrollHeight >= scroller.clientHeight);
    check("case title is readable", document.querySelector(".project-detail h1").getBoundingClientRect().height > 0);
    const browser = host.closest("[data-demo-browser]");
    const viewport = browser.querySelector("[data-browser-viewport]");
    check("product has a bounded browser viewport", viewport.clientHeight >= 350 && viewport.clientHeight <= 741);
    check("product fits the browser width", scroller.scrollWidth <= scroller.clientWidth + 1, { content: scroller.scrollWidth, available: scroller.clientWidth });
    nativeScroll({ top: browser.getBoundingClientRect().top + scrollY - 80, behavior: "instant" }); await pause(350);
    const pageY = scrollY;
    scroller.scrollTo({ top: 160, behavior: "instant" }); await pause(100);
    check("scrolling the product preserves the portfolio position", Math.abs(scrollY - pageY) < 1);
    scroller.scrollTo({ top: 0, behavior: "instant" });
    snapshot("product");
    await exerciseProduct(host.shadowRoot, host.dataset.productSlice, check);
    const localPage = browser.querySelector("[data-browser-address]").textContent;
    const beforeNavigation = scrollY;
    if (!browser.querySelector("[data-browser-back]").disabled) {
      click(browser.querySelector("[data-browser-back]")); await pause(350);
      check("browser back changes the product page", browser.querySelector("[data-browser-address]").textContent !== localPage && !browser.querySelector("[data-browser-forward]").disabled);
      click(browser.querySelector("[data-browser-forward]")); await pause(350);
      check("browser forward restores the product page", browser.querySelector("[data-browser-address]").textContent === localPage);
    }
    click(browser.querySelector("[data-browser-reset]")); await pause(500);
    check("restart returns the demo to its first page", browser.querySelector("[data-browser-back]").disabled && browser.querySelector("[data-browser-forward]").disabled && host.shadowRoot.querySelector("[data-browser-scroll]").scrollTop === 0);
    check("browser navigation keeps the portfolio in place", Math.abs(scrollY - beforeNavigation) < 2, { before: beforeNavigation, after: scrollY });
    check("product interaction keeps the page within its viewport", document.documentElement.scrollWidth <= innerWidth + 1);
  }
  check("runtime is error free", errors.length === 0, errors);
  clearInterval(assetTimer);
  report();
}
run().catch((error) => { errors.push(error.stack); clearInterval(assetTimer); report(); });
