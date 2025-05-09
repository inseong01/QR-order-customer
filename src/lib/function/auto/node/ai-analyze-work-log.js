import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs/promises'
import dotenv from 'dotenv';
dotenv.config();

// Initialize Vertex with your Cloud project and location
const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_PROJECT,
  location: 'us-central1',
});
const model = 'gemini-2.0-flash-001';
// Set up generation config
const generationConfig = {
  maxOutputTokens: 400,
  temperature: 0.2,
  topP: 0.95,
  responseModalities: ["TEXT"],
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'OFF',
    }
  ],
  systemInstruction: {
    parts: [{ "text": `커밋 메시지 작성기로서, 제공 받은 파일을 핵심 요약하여 커밋 메시지 반환` }]
  },
};

/**
 * diff, status 파일을 분석해 작업 내역 정리 함수
 */
export default async function analyzeWorkLog({ git_diff_text, git_status_text }) {
  const msg1Text1 = {
    text: `파일은 2가지로 Git Diff, Git Status 텍스트 파일로 구성돼.

    입력 파일:
    ${git_diff_text} 
    ${git_status_text}

    [ 커밋 메시지 작성 지침 ]
    - 헤더 (필수)

    형식: <type>: <변경 요약>
    헤더는 50자 이내이고 동사 원형으로 시작해. 
    예시로 "feat: 결제 기능 작업"처럼 작성할 수 있어. 만약에 기능 구현이 완료되지 않았다면 "~기능 작업"이라고 작성해.

    type은 다음 중 하나를 선택하면 돼.
    - feat: 새로운 기능 추가, 기능에 미완성이 있다면 "기능 작업"이라 기술
    - fix: 버그 수정
    - refactoring: 리팩토링
    - optimize: 성능 또는 UX 개선
    - chore: 빌드/설정/버전 관리 등 잡무
    - docs: 문서 수정
    - test: 테스트 코드 추가 또는 변경
    - migration: 시스템 이전/전환 작업

    - 본문 (선택)
    본문은 리스트(-) 형식으로 작성하고 
    "무엇을" 했는지 중심으로 서술해.

    작업 단위를 명확하게 구분하고
    세부 설명이 필요한 경우 리스트의 자식으로 줄바꿈 해서 작성하면 돼.

    리스트를 카테고리화 할 때 조사가 들어가지 않도록 해.
    조사가 포함되면 리스트 자식으로 처리하고 자식을 카테고리화 하면 돼.

    기능과 관련돼서 파일에 주석처리가 있다면 작업중이라 설명 붙여줘.

    작업중인 기능이 헤드 내용하고 관련 있으면 헤드 내용을 기능 추가가 아니라 기능 작업이라고 바꿔줘.
    아직 구현되지 않은 기능이라 나타내고 싶어.

    소괄호를 사용하는 경우에 작업 처리 현황을 나타내는 내용을 제외한 나머지는 리스트의 자식으로 줄바꿈 하고 한 줄로 작성해줘.
    간단한 변경을 나타내는 내용이면 소괄호 내용을 작성하지 않아도 돼.

    예시 1)
    \`\`\`
    optimize: 주문 및 요청 개선 
    - 테이블 요청 이후, 주문 장바구니 초기화 상황 개선 
      - 전역 상태 추가하여 패치 모드 구분 
    \n
    - 메인 페이지 개선 
      - 접속 시 초기 메뉴 카테고리 설정 
    \n
    - 카테고리 설정 함수
      - useEffect -> 개별 버튼 onClick 설정 
    \n
    - 'main' 태그 높이 유동성 조정 
    \n
    - 빌드 점검 완료 
      - 주문 결과 페이지 전환 시간 단축
    \`\`\`

    [ 커밋 메시지 작성 팁 ]
    커밋 메시지는 코드리뷰나 히스토리 추적을 위한 목적이야.

    한글로 핵심만 명확하게 한 줄로 작성해.

    모든 src/* 경로 표현은 생략하고 마지막 루트인 파일명만 작성하면 돼. 
    위치 이동으로 경로를 표기하는 경우는 파일명 표기하지 않아도 돼. 

    문장에 강조 표시 하지마. 
    가독성을 위해 리스트 사이마다 줄바꿈 삽입되어야 해.

    [ 출력 ]
    답변 출력 할 때, 커밋 메시지만 출력해.
    요약과 분석은 출력하지 않아도 돼.

    커밋으로 바로 사용할 수 있게 생성한 커밋 헤드, 바디 메시지만 출력해.`
  };

  const chat = ai.chats.create({
    model: model,
    config: generationConfig
  });

  async function sendMessage(message) {
    const response = await chat.sendMessageStream({
      message: message
    });

    process.stdout.write('stream result: ' + '\n');

    let content = ''

    for await (const chunk of response) {
      if (chunk.text) {
        // process.stdout.write(chunk.text);
        content += chunk.candidates[0].content.parts[0].text
      } else {
        // process.stdout.write(JSON.stringify(chunk) + '\n');
        content += '\n';
      }
    }

    await fs.writeFile('./commit-msg.txt', formatCommitLog(content.replaceAll('\`\`\`', '').trimStart()), { encoding: 'utf-8' });
  }

  async function generateContent() {
    await sendMessage([
      msg1Text1
    ]);
  }

  generateContent();
}

/**
 * 부모 카테고리 줄바꿈 함수
 * 
 * - 부모 카테고리, '-' 문자로 시작
 * - 자식 카테고리는 ' -' 공백이 포함돼 적용되지 않음
 * 
 */
function formatCommitLog(log) {
  return log
    .split("\n")  // 줄 단위로 분리
    .map((line) => {
      if (line.startsWith("-")) {
        return `\n${line}`;  // 부모 리스트만 줄바꿈
      }
      return line;  // 기존 형식 유지
    })
    .join("\n");  // 다시 문자열로 합치기
}
