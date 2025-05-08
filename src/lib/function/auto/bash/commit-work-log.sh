echo '📁 Adding files to staging area...'

git add . 

echo '---------------------------------'
echo '📄 Generating git status and diff files...'

git status > file_status.txt
git diff --cached > daily_work.txt

echo '✅ Git files have been generated successfully.'

echo '---------------------------------'
echo '📝 Starting work log summary...'

# node ./src/lib/function/auto/node/summary-work-log.js

echo '✅ Work log summary has been completed.'

echo '---------------------------------'
echo '📁 Adding files again before commit...'

# git add . 

# HEAD_COMMIT=$(cat ./commit_head.txt)
# BODY_COMMIT=$(cat ./commit_body.txt)

echo '---------------------------------'
echo '📝 Writing commit message...'

# git commit -m "$HEAD_COMMIT" -m "$BODY_COMMIT"

echo '✅ Commit has been completed successfully!'
