// src/components/TasteSummary.tsx
import type { QuizAnswers } from '@/db/type/quiz';
import { TasteBar } from './TasteBar';
import { typeLabel, regionLabel, typeBadgeImages, regionCountryBadges } from '@/db/wineLabel';

type Props = {
  answers: QuizAnswers;
};

export function TasteSummary({ answers }: Props) {

  return (
    <div className="mb-8 px-10 py-5 md:px-6 md:py-6 text-base rounded-md bg-ui-cardBg">
      <div className="mb-4 flex flex-col items-center gap-4 text-ui-gray">
        {/* 종류 */}
        <div className="flex w-full flex-row items-center">
          <span className="w-16 mr-2 font-semibold">종 류</span>
          <span className="mr-2">{typeLabel(answers.type)}</span>
          <img
            src={typeBadgeImages[answers.type]}
            alt={typeLabel(answers.type)}
            className="h-8 w-auto"
          />
        </div>

        {/* 지역 */}
        <div className="flex w-full flex-row items-center">
          <span className="w-16 mr-2 font-semibold">지 역</span>
          <span className="mr-2">{regionLabel(answers.region)}</span>
          {/* 국가 뱃지들을 감싸는 flex 컨테이너*/}
          <span className="flex flex-row items-center gap-1.5">
            {/* 'answers.region' 키로 국가 뱃지 배열을 가져와 map() 실행 */}
            {regionCountryBadges[answers.region].map((badge) => (
              <img
                key={badge.label} // 배열 렌더링 시 key는 필수
                src={badge.src}
                alt={badge.label} // alt 태그에 '프랑스', '이탈리아' 등 국가명
                className="h-8 w-auto" // 뱃지 크기 조절
              />
            ))}
          </span>
        </div>
      </div>

      {/* 맛 프로파일 바 */}
      <div className="space-y-3">
        <TasteBar label="바디감" levelKey="body" answers={answers} />
        <TasteBar label="타닌감" levelKey="tannin" answers={answers} />
        <TasteBar label="산미" levelKey="acidity" answers={answers} />
        <TasteBar label="당도" levelKey="sweetness" answers={answers} />
      </div>
    </div>
  );
}
