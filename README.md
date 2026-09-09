# 만나의 식탁

한 끼의 음식에서 시작해 세계 각지의 역사, 생활방식과 식문화를 기록하는
Next.js 기반 콘텐츠 아카이브입니다.

## 주요 기능

- 나라·지역별 식문화 탐색
- 문화 이야기 목록, 주제·지역 필터와 상세 페이지
- 세계 레시피 목록, 음식 종류·지역 필터와 상세 페이지
- 클래스 소개와 문의 접수
- Supabase 문의 저장 및 Resend 관리자 알림
- 반응형 공통 헤더·푸터
- 메타데이터, `robots.txt`, `sitemap.xml`, JSON-LD
- 404, 로딩, 오류 화면
- 기본 보안 헤더와 문의 폼 허니팟

## 기술 구성

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase
- Resend
- Vercel

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

프로덕션 빌드를 확인하려면:

```bash
npm run build
npm run start
```

## 환경변수

`.env.example`을 복사해 `.env.local`을 만들고 실제 값을 입력합니다.

```powershell
Copy-Item .env.example .env.local
```

필수:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

문의 이메일 알림을 사용할 때:

```env
RESEND_API_KEY=
ADMIN_EMAIL=
RESEND_FROM_EMAIL=Manna Table <onboarding@resend.dev>
```

선택:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=
```

`SUPABASE_SERVICE_ROLE_KEY`와 `RESEND_API_KEY`는 서버 전용 비밀값입니다.
`NEXT_PUBLIC_` 접두사를 붙이지 말고 Git에 커밋하지 마세요.

## 데이터베이스

Supabase SQL Editor에서 다음 파일을 실행합니다.

```text
supabase/schema.sql
```

API는 서버의 서비스 역할 키로 `public.inquiries` 테이블에 데이터를
저장합니다. 브라우저에서 직접 insert하는 공개 정책은 사용하지 않습니다.

## 콘텐츠 수정

정적 콘텐츠는 `lib/content.ts`에서 관리합니다.

- `countries`: 나라·지역 소개, 식탁의 장면, 지역·공간별 특징, 식사 이해 노트와 참고 자료
- `stories`: 문화 이야기와 참고 자료
- `recipes`: 재료, 조리 순서와 문화적 배경

나라 상세 페이지는 `countries` 데이터의 다음 필드를 자동으로 표시합니다.

```text
introduction             식문화 개요
representativeFlavors    대표적인 맛
mainIngredients          주요 재료
foodCulture              식문화 키워드
representativeFoods      대표 음식
tableScenes              일상에서 나타나는 식사 장면
regionalNotes            지역 또는 식사 공간별 차이
diningNotes              문화적 일반화를 피하기 위한 안내
sources                  공식 기관과 참고 자료
```

새 상세 페이지는 별도로 만들 필요가 없습니다. 배열에 콘텐츠를 추가하면
동적 경로와 사이트맵에 함께 반영됩니다.

## 경로

```text
/                         메인
/countries                나라별 식탁
/countries/[slug]         나라 상세
/stories                  문화 이야기
/stories/[slug]           이야기 상세
/recipes                  세계 레시피
/recipes/[slug]           레시피 상세
/videos                   영상
/classes                  클래스 및 문의
/about                    브랜드 소개
/privacy                  개인정보 처리 안내
/api/inquiries            문의 API
```

## Vercel 배포

1. GitHub 저장소에 코드를 푸시합니다.
2. Vercel에서 저장소를 Import합니다.
3. `.env.local`의 실제 값을 Vercel Environment Variables에 등록합니다.
4. `NEXT_PUBLIC_SITE_URL`을 실제 Vercel 주소 또는 연결한 도메인으로 설정합니다.
5. 배포 후 문의 저장, 이메일 알림, `/sitemap.xml`, `/robots.txt`를 확인합니다.

이후 수정은 다음으로 자동 배포됩니다.

```bash
git add .
git commit -m "Update website"
git push
```

## 운영 전 확인

- `/privacy`의 보관 기간과 운영자 연락처를 실제 정책에 맞게 수정
- Resend 발신 도메인 인증
- 문의 폼 실제 제출 테스트
- Supabase 키와 Resend 키가 Git 기록에 포함되지 않았는지 확인
- 음식·문화 설명의 출처와 지역·시대 범위 검토
- 실제 촬영한 음식 사진과 대체텍스트 추가
