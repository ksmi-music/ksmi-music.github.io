# nvm use 16
npm run build
npm run deploy
rm -rf ./node_modules/.cache
git add .
git commit -m "update"
git push origin main