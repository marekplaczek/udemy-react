"use client";

import { useState } from "react";
import type { StageContent } from "@/features/quadratic/content";
import Parabola, { formatQuadratic } from "@/features/quadratic/Parabola";
import TheoryEnrichmentBlock from "@/features/quadratic/TheoryEnrichmentBlock";
import QuizClient from "./QuizClient";
import AiTutorClient from "./AiTutorClient";

export default function StageTabs({ stage }: { stage: StageContent }) {
  const [tab, setTab] = useState<"theory" | "quiz" | "ai">("theory");

  return (
    <>
      <div className="tabs tabs-3" role="tablist" aria-label="Materiały etapu">
        <button className={`tab ${tab === "theory" ? "tab-active" : ""}`} onClick={() => setTab("theory")}>Teoria</button>
        <button className={`tab ${tab === "quiz" ? "tab-active" : ""}`} onClick={() => setTab("quiz")}>Quiz — wymagane 100%</button>
        <button className={`tab ${tab === "ai" ? "tab-active" : ""}`} onClick={() => setTab("ai")}>Tutor AI</button>
      </div>

      {tab === "theory" ? (
        <section className="card theory-card">
          <div className="parabola-card">
            <Parabola {...stage.demo} />
            <div className="parabola-caption">
              Wykres poglądowy: <strong>f(x) = {formatQuadratic(stage.demo.a, stage.demo.b, stage.demo.c)}</strong>. Pomarańczowy punkt oznacza wierzchołek, a zaznaczone punkty na osi OX — miejsca zerowe.
            </div>
          </div>

          <p className="theory-intro">{stage.intro}</p>
          <div className="theory-stage-formulas">
            {stage.formulas.map((formula) => <div className="formula" key={formula}>{formula}</div>)}
          </div>
          <h2 className="theory-heading">Najważniejsze zasady etapu</h2>
          <ul className="theory-list">{stage.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          {stage.note ? <div className="note"><strong>Uwaga.</strong> {stage.note}</div> : null}
          {stage.example ? <div className="example"><strong>Przykład.</strong> {stage.example}</div> : null}

          <div className="theory-modules-header">
            <div>
              <h2 className="theory-heading">Moduły tego etapu</h2>
              <p className="muted">Zakres został dopasowany do rzeczywistych zadań z banku. Każdy moduł wskazuje numery zadań, które ćwiczą daną umiejętność.</p>
            </div>
            <span className="badge badge-current">{stage.modules.length} {stage.modules.length === 1 ? "moduł" : "moduły"}</span>
          </div>

          <div className="theory-modules">
            {stage.modules.map((module, index) => (
              <article className="theory-module" key={module.id} id={module.id.replace(":", "-")}>
                <div className="theory-module-title-row">
                  <div>
                    <div className="theory-module-index">Moduł {index + 1}</div>
                    <h3>{module.title}</h3>
                  </div>
                  <span className="theory-source-range">{module.sourceRange}</span>
                </div>

                <p>{module.intro}</p>
                <div className="theory-module-formulas">
                  {module.formulas.map((formula) => <div className="formula" key={formula}>{formula}</div>)}
                </div>

                <div className="theory-module-grid">
                  <div>
                    <h4>Co trzeba umieć</h4>
                    <ul className="theory-list">{module.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <h4>Jak rozpoznać ten typ zadania</h4>
                    <ul className="theory-list">{module.recognize.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>

                <div className="note theory-pitfalls">
                  <strong>Typowe pułapki.</strong>
                  <ul>{module.pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                {module.example ? <div className="example"><strong>Przykład.</strong> {module.example}</div> : null}

                <TheoryEnrichmentBlock moduleId={module.id} />
              </article>
            ))}
          </div>

          <button className="btn btn-primary full-btn" onClick={() => setTab("quiz")}>Przejdź do quizu</button>
        </section>
      ) : tab === "quiz" ? (
        <QuizClient stageId={stage.id} />
      ) : (
        <AiTutorClient stageId={stage.id} />
      )}
    </>
  );
}
