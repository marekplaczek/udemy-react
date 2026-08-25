import Parabola, { formatQuadratic } from "./Parabola";
import QuadraticCoefficientComparison from "./QuadraticCoefficientComparison";
import { THEORY_ENRICHMENT } from "./theoryEnrichment";
import { THEORY_ENRICHMENT_ADDITIONAL } from "./theoryEnrichmentAdditional";
import styles from "./theoryEnrichment.module.css";

export default function TheoryEnrichmentBlock({ moduleId }: { moduleId: string }) {
  const enrichment = THEORY_ENRICHMENT[moduleId];
  if (!enrichment) return null;

  const additional = THEORY_ENRICHMENT_ADDITIONAL[moduleId];
  const workedExamples = [
    ...enrichment.workedExamples,
    ...(additional?.workedExamples ?? []),
  ];
  const practice = [
    ...enrichment.practice,
    ...(additional?.practice ?? []),
  ];

  return (
    <div className={styles.wrapper}>
      {enrichment.graphs?.length ? (
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <div className={styles.eyebrow}>Zobacz na wykresie</div>
              <h4>Przykłady graficzne</h4>
            </div>
            <span className={styles.count}>{enrichment.graphs.length}</span>
          </div>
          <div className={styles.graphGrid}>
            {enrichment.graphs.map((graph) => (
              <article className={styles.graphCard} key={`${moduleId}-${graph.title}`}>
                <div className={styles.graphTitle}>{graph.title}</div>
                <Parabola a={graph.a} b={graph.b} c={graph.c} width={480} height={270} />
                <div className={styles.graphFormula}>f(x) = {formatQuadratic(graph.a, graph.b, graph.c)}</div>
                <p>{graph.caption}</p>
              </article>
            ))}
          </div>
          {moduleId === "module:01-general-form" ? <QuadraticCoefficientComparison /> : null}
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <div className={styles.eyebrow}>Od treści do odpowiedzi</div>
            <h4>Przykłady rozwiązane krok po kroku</h4>
          </div>
          <span className={styles.count}>{workedExamples.length}</span>
        </div>
        <div className={styles.workedGrid}>
          {workedExamples.map((example) => (
            <article className={styles.workedCard} key={`${moduleId}-${example.title}`}>
              <h5>{example.title}</h5>
              <div className={styles.task}><strong>Zadanie.</strong> {example.task}</div>
              <ol>
                {example.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <div className={styles.answer}><strong>Odpowiedź:</strong> {example.answer}</div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <div className={styles.eyebrow}>Sprawdź się</div>
            <h4>Krótkie zadania do samodzielnego rozwiązania</h4>
          </div>
          <span className={styles.count}>{practice.length}</span>
        </div>
        <div className={styles.practiceGrid}>
          {practice.map((item, index) => (
            <details className={styles.practiceCard} key={`${moduleId}-practice-${index}`}>
              <summary>
                <span className={styles.practiceIndex}>Zadanie {index + 1}</span>
                <span>{item.task}</span>
              </summary>
              <div className={styles.practiceAnswer}><strong>Odpowiedź:</strong> {item.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
