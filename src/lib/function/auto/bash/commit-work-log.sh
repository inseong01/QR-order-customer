echo '>> 파일을 스테이징 영역에 추가 중...'
git add . 
echo '파일 스테이징 완료되었습니다.'

echo -e '\n'

echo '>> Git 상태 및 변경 사항 파일 생성 중...'
git status > file-status.txt
git diff --cached > diff-files.txt
echo 'Git 파일이 성공적으로 생성되었습니다.'

echo -e '\n'

echo '>> 작업 로그 요약을 시작합니다...'
node ./src/lib/function/auto/node/summary-work-log.js
echo -e '\n요약이 완료되었습니다.'

echo -e '\n'

while true; do
  echo '요약을 확인해주세요.'
  echo '---'
  cat ./commit-msg.txt
  echo '---'
  echo '>> 다시 요약할까요? (y/N)'

  read -r choice
  choice=${choice:-"n"}  # 기본값 n

  case "${choice,,}" in 
    y)
      echo '다시 요약을 진행합니다...'
      node ./src/lib/function/auto/node/summary-work-log.js
      echo '요약이 완료되었습니다.'
      ;;
    n)
      echo '요약을 유지합니다.'
      break 
      ;;
    *)
      echo '올바른 입력값(y/n)을 입력하세요!'
      ;;
  esac
done

echo -e '\n'

echo '>> 작업일지.txt 업데이트 중...'
node ./src/lib/function/auto/node/past-work-log.js
echo '파일이 업데이트 되었습니다.'

echo -e '\n'

while true; do
  echo '>> 자동 커밋을 실행할까요? (Y/n)'

  read -r choice
  choice=${choice:-"y"}  # 기본값 n

  case "${choice,,}" in 
    y)
      echo '자동 커밋을 진행합니다.'
      ;;
    n)
      echo '자동 커밋 진행을 종료합니다.'
      exit 0
      ;;
    *)
      echo '올바른 입력값(y/n)을 입력하세요!'
      ;;
  esac
done

echo -e '\n'

echo '>> 커밋 전에 다시 파일을 스테이징 하는 중...'
git add . 
echo '파일 스테이징 완료되었습니다.'

# 커밋 내용 변수 작성 
# HEAD_COMMIT=$(cat ./commit_head.txt)
# BODY_COMMIT=$(cat ./commit_body.txt)

echo -e '\n'

echo '>> 커밋 메시지를 작성 중...'
# git commit -m "$HEAD_COMMIT" -m "$BODY_COMMIT"
echo '커밋이 성공적으로 완료되었습니다!'
