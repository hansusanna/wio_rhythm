import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("API 키가 없습니다.");
  process.exit(1);
}

// 1. 모델 데이터의 타입을 정의합니다 (리액트 Props 정의하듯이)
interface GeminiModel {
  name: string;
  version: string;
  displayName: string;
  description: string;
  inputTokenLimit: number;
  outputTokenLimit: number;
  supportedGenerationMethods: string[];
  temperature?: number;
  topP?: number;
  topK?: number;
}

async function checkAvailableModels() {
  console.log("사용 가능한 모델 리스트를 조회 중입니다...\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const data = await response.json();

    if (!data.models) {
      console.log("모델 정보를 가져오지 못했습니다.", data);
      return;
    }

    // 2. any 대신 위에서 만든 인터페이스(GeminiModel)를 사용
    const chatModels = (data.models as GeminiModel[])
      .filter((model) => model.supportedGenerationMethods.includes("generateContent"))
      .filter((model) => model.name.includes("gemini"));

    console.log("[사용 가능한 Gemini 모델 목록]");
    console.log("------------------------------------------------");
    
    chatModels.forEach((model) => {
      const modelName = model.name.replace("models/", "");
      console.log(` ${modelName}`);
      console.log(`   └─ 설명: ${model.displayName}`);
      console.log(`   └─ 버전: ${model.version}`);
    });
    console.log("------------------------------------------------");

  } catch (error) {
    console.error(" 조회 실패:", error);
  }
}

checkAvailableModels();