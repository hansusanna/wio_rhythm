// scripts/generate-wines.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// .env 파일 로드
dotenv.config();

// API 키 확인
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("오류: .env 파일에서 GOOGLE_API_KEY를 찾을 수 없습니다.");
  process.exit(1);
}

// Gemini 모델 초기화
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

async function run() {
  console.log("🍷 AI 소믈리에가 와인 리스트를 작성 중입니다...");

  // AI에게 요청할 프롬프트 (구체적일수록 좋습니다)
  const prompt = `
    너는 10년 차 소믈리에야. 와인 구독 서비스 'Wio Rhythm'을 위한 추천 와인 데이터 6개를 만들어줘.
    
    [요구사항]
    1. 데이터는 반드시 JSON 배열([]) 형식이어야 해.
    2. Markdown 기호(\`\`\`json 등)는 절대 넣지 말고 순수 텍스트만 줘.
    3. 이미지는 실제 파일이 없으니 'wine_red_1.png' 같은 가상의 경로를 넣어줘.
    4. 설명(description)은 한국어로 50자 이내로 매력적으로 작성해줘.

    [데이터 구조 예시]
    {
      "id": 1,
      "name": "Chateau Margaux 2015",
      "type": "Red",
      "country": "France",
      "price": 350000,
      "description": "블랙베리의 진한 향과 실크 같은 탄닌이 어우러진 최고급 레드 와인.",
      "imageUrl": "/assets/wines/wine_red_1.png",
      "tags": ["Full-bodied", "Oak", "Premium"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 혹시 모를 마크다운 기호 제거 (안전장치)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const wineData = JSON.parse(text);

    // 5. 파일 저장 경로 설정 (src/data/wines.json)
    // process.cwd()는 현재 프로젝트 루트 경로를 의미합니다.
    const outputDir = path.join(process.cwd(), "src", "data");
    const outputPath = path.join(outputDir, "generated_wines.json");

    // 폴더가 없으면 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 파일 쓰기
    fs.writeFileSync(outputPath, JSON.stringify(wineData, null, 2), "utf-8");

    console.log("------------------------------------------------");
    console.log(`와인 데이터 생성 완료!`);
    console.log(`저장 위치: ${outputPath}`);
    console.log("------------------------------------------------");

  } catch (error) {
    console.error("❌ 데이터 생성 중 오류 발생:", error);
  }
}

run();