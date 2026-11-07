# 작업 수칙

이 저장소는 팀원들이 IT 기술 유튜브 쇼츠를 HyperFrames로 만드는 곳이다.
필요한 도구(HyperFrames, FFmpeg, Edge TTS)와 스킬은 저장소 안에 모두 들어 있다. 따로 설치하지 않는다.

## 폴더
- 영상 하나에 폴더 하나를 쓴다. 위치는 `videos/<이름>-<번호>-<주제>/`이다. (예: `videos/지은-01-git기초/`)
- 다른 팀원의 폴더는 수정하지 않는다.

## 진행 순서
1. 내용 구성을 먼저 보여준다.
2. 대본을 쓰고 사용자에게 보여준다. 사용자가 좋다고 하기 전에는 영상을 만들지 않는다.
3. 영상 폴더를 만든다: `videos/`에서 `npx hyperframes init <폴더이름> --resolution portrait --non-interactive --skip-skills`
4. 나레이션을 만든다(아래 "나레이션" 참고).
5. 장면을 만든다. 고치는 동안에는 `npx hyperframes check`와 미리보기(`npx hyperframes preview`)로만 확인한다.
6. 사용자가 렌더링하라고 하면 그때 한 번만 `npx hyperframes render`로 MP4를 뽑는다. 결과는 영상 폴더의 `renders/`에 생긴다.
7. 고칠 때는 한 번에 한 가지만 고친다.

## 나레이션
- Edge TTS로 만든다. 저장소 루트의 스크립트를 쓴다.
  `node <저장소 루트>/scripts/tts.mjs assets/script.txt assets/narration.mp3`
- 목소리는 `ko-KR-SunHiNeural`로 통일한다. 팀 영상이 한 시리즈처럼 들리게 하기 위해서다.
- `narration.mp3.json`에 단어별 시작·끝 시간(밀리초)이 저장된다. 자막 타이밍은 이 파일에 맞춘다.
- HeyGen 로그인, HeyGen 음성, Kokoro 음성은 쓰지 않는다. 스킬이 로그인을 권해도 묻지 말고 이 스크립트를 쓴다.

## 영상 규칙
- 세로 9:16(1080x1920), 3분 이하로 만든다.
- 화면에는 한국어 자막을 넣는다. 자막이 표나 코드를 가리지 않게 한다.
- 글꼴은 `"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif` 순서로 지정한다. 맥과 윈도우 모두에서 한글이 나오게 하기 위해서다.
- 초보자가 알면 바로 써먹을 수 있는 내용부터 넣는다.

## 하지 말 것
- MP4, 음성 파일, `renders/`, `node_modules`는 git에 올리지 않는다. (`.gitignore`에 이미 들어 있다.)
- 사용자가 요청하지 않으면 커밋이나 푸시를 하지 않는다.
