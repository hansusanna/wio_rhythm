import type { ViewMode, QuizAnswers } from '@/db/type/quiz';
import Home from '@/pages/Home';
import TasteQuiz from '@/components/TasteQuiz';
import QuizResults from '@/components/QuizResults';

type Props = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  quizAnswers: QuizAnswers;
  setQuizAnswers: (a: QuizAnswers) => void;
};

export default function MainSection({
  viewMode,
  setViewMode,
  quizAnswers,
  setQuizAnswers,
}: Props) {
  return (
    <section className="mx-auto max-w-6xl h-[100svh]">
      {viewMode === 'main' && (
        <Home onStart={() => setViewMode('quiz')} />
      )}

      {viewMode === 'quiz' && (
        <TasteQuiz
          onCancelToMain={() => setViewMode('main')}
          onComplete={(ans) => {
            setQuizAnswers(ans);
            setViewMode('results');
          }}
        />
      )}

      {viewMode === 'results' && (
        <QuizResults
          answers={quizAnswers}
          onBackToFirst={() => setViewMode('main')}
        />
      )}
    </section>
  );
}
