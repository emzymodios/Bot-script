# 🌐 Render Setup - Chi Tiết Từng Bước

Hướng dẫn setup Discord Bot trên Render.com cho **24/7 hosting**

---

## 📋 Chuẩn Bị

**Cần có:**
- ✅ GitHub account (có repo code)
- ✅ Discord Bot Token
- ✅ Render account (free)
- ✅ 30 phút cho setup

---

## **PHẦN 1: Discord Bot Setup**

### **Bước 1: Tạo Discord Application**

1. Vào https://discord.com/developers/applications
2. Click **"New Application"**
   ```
   Application Name: script-hub-bot
   ```
3. Click **"Create"** ✅

### **Bước 2: Tạo Bot**

1. Vào tab **"Bot"** (menu bên trái)
2. Click **"Add Bot"** ✅
3. Tìm phần **TOKEN**
4. Click **"Copy"** và **lưu lại nơi an toàn** 🔒
   ```
   Token: NDx...xxxxxx (GIỮ BÍ MẬT!)
   ```

### **Bước 3: Setup Bot Permissions**

1. Vào tab **"OAuth2"** (menu bên trái)
2. Chọn **"URL Generator"** (submenu)

**Scopes:**
- ✅ `bot`

**Permissions:**
- ✅ `Administrator` (hoặc select individual permissions)

3. Copy URL ở cuối
4. Mở link trong browser
5. Chọn server để invite bot
6. Click **"Authorize"** ✅

**Bot giờ đã trong server bạn!** 🎉

---

## **PHẦN 2: GitHub Setup**

### **Bước 1: Tổ Chức File**

Ensure repository structure:
```
script-hub-bot/
├── commands/
│   └── menu.js
├── events/
│   ├── ready.js
│   └── interactionCreate.js
├── index.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### **Bước 2: Commit & Push**

```bash
# Navigate to your project
cd script-hub-bot

# Initialize git (nếu chưa)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Script Hub Bot"

# Add remote (thay YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/script-hub-bot.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

✅ Code giờ trên GitHub

---

## **PHẦN 3: Render Deployment**

### **Step 1: Render Account**

1. Vào https://render.com
2. Click **"Sign up"**
3. Chọn **"GitHub"** để đăng nhập nhanh
4. **Authorize Render** với GitHub account
5. Đăng nhập thành công ✅

### **Step 2: Create Web Service**

1. Vào **Render Dashboard**
2. Click **"New +"** button (góc phải)
3. Chọn **"Web Service"**

### **Step 3: Connect GitHub Repository**

1. Click **"Connect a repository"**
2. Tìm repo **`script-hub-bot`**
3. Click **"Connect"** ✅

### **Step 4: Configure Service**

**General Settings:**
```
Name:           script-hub-bot
Environment:    Node
Region:         Singapore (hoặc gần nhất)
Branch:         main
Runtime:        node-18
Build Command:  npm install
Start Command:  node index.js
```

**Plan:**
```
Free tier (hoặc upgrade to Starter for 24/7)
```

### **Step 5: Environment Variables** ⭐ QUAN TRỌNG

1. Scroll xuống tìm **"Environment Variables"** section
2. Click **"Add Environment Variable"**

**Add first variable:**
```
Key:   DISCORD_TOKEN
Value: [Your Bot Token Here]
```

3. Click **"Add Environment Variable"** lần nữa

**Add second variable:**
```
Key:   CLIENT_ID
Value: [Your Client ID Here]
```

**Lấy Client ID từ đâu:**
- Vào Discord Developer Portal
- Application page
- Copy "APPLICATION ID"

4. (Optional) Add third variable:
```
Key:   NODE_ENV
Value: production
```

### **Step 6: Deploy**

1. Review lại tất cả settings
2. Click **"Create Web Service"**
3. **Chờ deployment** (2-3 phút)
4. Xem logs để confirm

**Log success:**
```
✅ Bot is ready! Logged in as script-hub-bot#1234
📝 Registering slash commands...
✅ Successfully registered 1 slash command(s) globally
```

✅ Bot online 24/7! 🎉

---

## **PHẦN 4: Kiểm Tra Bot**

### **Trên Discord Server:**

```
Gõ: /menu
```

**Kết quả mong muốn:**
- ✅ Embed menu hiện lên
- ✅ Select menu với 17 scripts
- ✅ Có thể chọn script
- ✅ Response embed hiện

### **Kiểm Tra Logs:**

1. Render Dashboard
2. Bot service → **"Logs"** tab
3. Xem real-time logs
4. Tìm errors (nếu có)

---

## **PHẦN 5: Update Code**

**Sau khi deploy, nếu update code:**

```bash
# Edit code locally
# ...

# Commit & push
git add .
git commit -m "Update menu colors"
git push origin main
```

**Render sẽ tự:**
1. ✅ Detect push
2. ✅ Pull code mới
3. ✅ npm install
4. ✅ Restart bot

⏱️ Mất ~1 phút

---

## **🔍 Troubleshooting**

### **Bot không online?**

**Check 1: Logs**
```
Render Dashboard 
→ Bot Service 
→ "Logs" tab
```

Tìm error message

**Check 2: Environment Variables**
- DISCORD_TOKEN correct?
- NODE_ENV = production?

**Check 3: Restart Bot**
- Vào service
- Click "..." menu
- Select "Restart"

### **Bot offline sau 15 phút?**

**Nguyên nhân:** Free tier Render sleep

**Giải pháp:**
1. Upgrade to **Starter Plan** ($7/month) → 24/7
2. Hoặc dùng **keep-alive** service

### **Menu không hoạt động?**

**Kiểm tra:**
1. Bot có permission "Embed Links"?
2. Role IDs đúng không?
3. Reload command trên Render

### **Logs hiện error?**

**Phổ biến:**
```
Error: Unauthorized - Token invalid
→ Kiểm tra DISCORD_TOKEN đúng?

Error: Cannot find module
→ npm install chưa xong, chờ tiếp

Error: Timeout
→ Render đang restart, chờ lại
```

---

## **📊 Render Plans**

| Feature | Free | Starter ($7) | Pro ($12) |
|---------|------|--------------|-----------|
| Uptime | 15m inactive → sleep | **24/7** | 24/7 |
| CPU | Shared | Dedicated | Dedicated |
| RAM | 512MB | 512MB | 1GB |
| Bandwidth | Limited | 100GB/mo | Unlimited |
| **Recommendation** | Test | **Production** | High Traffic |

**Cho Discord Bot:** Starter Plan ($7/month) là lý tưởng

---

## **💡 Pro Tips**

### ✅ **Auto-Update Code**
```
Push to GitHub 
→ Render auto-redeploy 
→ Zero downtime
```

### ✅ **Monitor Bot Health**
- Render: Check logs regularly
- Discord: Use `/menu` command
- Check bot status

### ✅ **Backup Environment**
```
Lưu giữ:
- Bot Token (secure)
- Client ID
- Backup code trên GitHub
```

### ✅ **Keep Dependencies Updated**
```bash
# Check updates
npm outdated

# Update
npm update
```

---

## **🎯 Next Steps**

1. ✅ Setup Discord Bot (20 min)
2. ✅ Push code to GitHub (5 min)
3. ✅ Deploy on Render (10 min)
4. ✅ Test bot (`/menu`) (5 min)
5. ✅ Customize (ongoing)

---

## **❓ FAQ**

**Q: Bot tắt sau 15 phút?**  
A: Free tier Render sleep. Upgrade to Starter hoặc pay $7/month

**Q: Update code mất bao lâu?**  
A: ~1-2 phút sau khi push GitHub

**Q: Render có tính phí?**  
A: Free, nhưng 15m inactivity sleep. Starter $7/mo for 24/7

**Q: Có thể dùng platform khác?**  
A: Có - Railway, Heroku, VPS. Render là easiest

**Q: Làm sao để keep bot alive 24/7?**  
A: Upgrade to Starter Plan ($7/month)

---

## **📞 Support**

- 🔗 Render Docs: https://render.com/docs
- 🔗 Discord.js: https://discord.js.org
- 🔗 Discord Dev: https://discord.com/developers

---

**Chúc bạn deploy thành công! 🚀**

Status: ✅ Ready for production  
Last Updated: September 2024
