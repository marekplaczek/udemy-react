import Parabola, { formatQuadratic } from "@/features/quadratic/Parabola";
import { THEORY_EXTRAS } from "@/features/quadratic/theoryExtras";
import styles from "./TheoryExtras.module.css";

export default function TheoryExtras({ moduleId }: { moduleId: string }) {
  const extra = THEORY_EXTRAS[moduleId];
  if (!extra) return null;

  return (
    <div className={styles.wrapper}>
      {extra.explanation?.length ? (
        <section className={styles.section}>
          <h4 className={styles.heading}>Zrozumienie tematu</h4>
          <div className={styles.explanation}>
            {extra.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ) : null}

      {extra.graphs?.length ? (
        <section className={styles.section}>
          <h4 className={styles.heading}>Porównaj wykresy</h4>
          <div className={styles.graphGrid}>
            {extra.graphs.map((graph) => (
              <article className={styles.graphCard} key={`${moduleId}-${graph.title}`}>
                <h5>{graph.title}</h5>
                <div className={styles.graphCanvas}>
                  <Parabola a={graph.a} b={graph.b} c={graph.c} width={440} height={270} />
                </div>
                <div className={styles.formula}>f(x) = {formatQuadratic(graph.a, graph.b, graph.c)}</div>
                <p>{graph.caption}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {extra.workedExamples?.length ? (
        <section className={styles.section}>
          <h4 className={styles.heading}>Przykłady krok po kroku</h4>
          <div className={styles.examplesGrid}>
            {extra.workedExamples.map((example) => (
              <article className={styles.exampleCard} key={`${moduleId}-${example.title}`}>
                <h5>{example.title}</h5>
                <p className={styles.problem}>{example.problem}</p>
                <ol>
                  {example.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <div className={styles.answer}><strong>Odpowiedź:</strong> {example.answer}</div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {extra.practice?.length ? (
        <section className={styles.section}>
          <h4 className={styles.heading}>Spróbuj sam</h4>
          <div className={styles.practiceGrid}>
            {extra.practice.map((task, index) => (
              <article className={styles.practiceCard} key={`${moduleId}-practice-${index}`}>
                <div className={styles.practiceIndex}>Zadanie {index + 1}</div>
                <p>{task.question}</p>
                <details>
                  <summary>Podpowiedź</summary>
                  <p>{task.hint}</p>
                </details>
                <details>
                  <summary>Sprawdź odpowiedź</summary>
                  <p>{task.answer}</p>
                </details>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
