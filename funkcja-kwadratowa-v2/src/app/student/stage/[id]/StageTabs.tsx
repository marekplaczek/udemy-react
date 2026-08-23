"use client";

import { useState } from "react";
import type { StageContent } from "@/features/quadratic/content";
import Parabola, { formatQuadratic } from "@/features/quadratic/Parabola";
import QuizClient from "./QuizClient";

export default function StageTabs({ stage }: { stage: StageContent }) {
  const [tab, setTab] = useState<"theory" | "quiz">("theory");

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Materiały etapu">
        <button className={`tab ${tab === "theory" ? "tab-active" : ""}`} onClick={() => setTab("theory")}>Teoria</button>
        <button className={`tab ${tab === "quiz" ? "tab-active" : ""}`} onClick={() => setTab("quiz")}>Quiz — wymagane 100%</button>
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
          {stage.formulas.map((formula) => <div className="formula" key={formula}>{formula}</div>)}
          <h2 className="theory-heading">Najważniejsze zasady</h2>
          <ul className="theory-list">{stage.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          {stage.note ? <div className="note"><strong>Uwaga.</strong> {stage.note}</div> : null}
          {stage.example ? <div className="example"><strong>Przykład.</strong> {stage.example}</div> : null}
          <button className="btn btn-primary full-btn" onClick={() => setTab("quiz")}>Przejdź do quizu</button>
        </section>
      ) : <QuizClient stageId={stage.id} />}
    </>
  );
}
