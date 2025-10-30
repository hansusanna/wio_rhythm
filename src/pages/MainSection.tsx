
import { useState } from 'react';
import type { ViewMode, QuizAnswers } from '@/db/type/quiz';
import TasteQuiz from '@/pages/TasteQuiz';
import QuizResults from '@/pages/QuizResults';
import Home from '@/pages/Home';

export default function MainSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});

  return (
    <>
      {viewMode === 'main' && (
        <Home /* Hero CTA에서 */ /* onStart={() => setViewMode('quiz')} */ />
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
    </>
  );
}
