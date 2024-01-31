rm client/vite.config.js
cp vite.config.js client/
cd client/ 
npm install
sudo npm install vite -g
npm audit fix --force
npm audit
npm fund
npm run build
pm2 start "npm run dev" --name couponco_frontend
