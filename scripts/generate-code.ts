// scripts/generate-code.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// 터미널 인자값 받기 (예: npm run gen:code "로그인 페이지")
const userRequest = process.argv[2];

if (!userRequest) {
  console.error("생성할 내용을 입력해주세요! 예: npm run gen:code '구독 결제 페이지'");
  process.exit(1);
}

const configPath = path.join(process.cwd(), "tailwind.config.ts"); // 또는 .js
let tailwindConfigContent = "";

if (fs.existsSync(configPath)) {
  tailwindConfigContent = fs.readFileSync(configPath, "utf-8");
} else {
  console.warn("tailwind.config 파일을 찾을 수 없어 기본 설정으로 진행합니다.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

async function generateCode() {
  console.log(`커스텀 테마를 적용하여 개발 중: "${userRequest}"...`);
  
  const prompt = `
    리액트(Vite + Tailwind) 프론트엔드 전문가야.
    다음 요구사항을 개발해줘.
    
    [요구사항]
    "${userRequest}"

    [디자인 시스템 필수 준수사항]
    **아래 제공된 'tailwind.config' 설정을 반드시 참고하여, 여기에 정의된 커스텀 색상(colors), 폰트(fontFamily) 등을 사용해서 스타일링해.**
    (예: config에 'brand-red'가 있다면 'bg-red-500' 대신 'bg-brand-red'를 사용할 것)

    '''js
    ${tailwindConfigContent}
    '''
    
    [제약사항]
    1. 코드는 TypeScript(tsx)로 작성.
    2. 설명 없이 오직 코드만 출력.
    3. 디자인은 **'모바일 퍼스트(Mobile First)'** 원칙을 따르고, 직관적인 UI를 구성.
    4. 아이콘이 필요하면 'lucide-react' 라이브러리를 사용한다고 가정.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let code = response.text();

    // 마크다운 제거
    code = code.replace(/```tsx|```typescript|```/g, "").trim();

    // 저장 경로 설정 (src/components/generated)
    const outputDir = path.join(process.cwd(), "src", "components", "generated");
    // 파일명은 고정해두거나, 필요시 AI에게 파일명까지 추출하라고 시킬 수 있음
    const timestamp = new Date().getTime();
    const outputPath = path.join(outputDir, `new_${timestamp}.tsx`);
    
    // 폴더가 없으면 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, code, "utf-8");
    console.log(`생성 완료! 저장 경로: ${outputPath}`);

  } catch (error) {
    console.error("에러 발생:", error);
  }
}

generateCode();