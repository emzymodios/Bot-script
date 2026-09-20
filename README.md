# 🔥 Script Hub Bot - Premium Discord Bot

[![Discord.js](https://img.shields.io/badge/Discord.js-v14-blue.svg?logo=discord)](https://discord.js.org)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg?logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](#)

---

## 📝 Giới Thiệu

**Script Hub Bot** là một Discord Bot **Premium & Đẹp Mắt** với **Menu System** được thiết kế chuyên nghiệp cho **Script Game Roblox**.

Bot có thể chạy **24/7** trên **Render** hoặc **các hosting khác**.

---

## ✨ Tính Năng

### 🎨 **Giao Diện Premium**
- ✅ Embed menu đẹp mắt với gradient colors
- ✅ Thumbnail icon chuyên nghiệp
- ✅ ASCII decorative boxes
- ✅ Responsive select menu

### 📋 **Script Management**
- ✅ 17 Script Hubs được tổ chức theo category
- ✅ Chi tiết mô tả cho từng script
- ✅ Emoji thích hợp cho từng loại
- ✅ Dễ thêm/xóa script

### 🔒 **Security & Permissions**
- ✅ Admin-only command
- ✅ Role-based access control
- ✅ Permission checking
- ✅ Error handling

### 🚀 **Easy Deployment**
- ✅ Ready for Render/Heroku/Railway
- ✅ Auto-deploy từ GitHub
- ✅ Environment variables support
- ✅ Zero-config setup

---

## 📁 Cấu Trúc Dự Án

```
script-hub-bot/
├── commands/
│   └── menu.js              # Menu command
├── events/
│   ├── ready.js             # Bot ready event
│   └── interactionCreate.js # Interaction handler
├── index.js                 # Main bot file
├── package.json             # Dependencies
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
└── README.md               # This file
```

---

## 🚀 Quick Start

### 1️⃣ **Local Setup**

```bash
# Clone repository
git clone <your-repo-url>
cd script-hub-bot

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Discord bot token
nano .env

# Start bot
npm start
```

### 2️⃣ **Deploy to Render**

**[Xem hướng dẫn Render setup dưới đây](#-render-setup)**

---

## 🔑 Environment Variables

Tạo file `.env` từ `.env.example`:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
NODE_ENV=production
```

**Các biến environment:**

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Bot token từ Discord Developer Portal | ✅ Yes |
| `CLIENT_ID` | Client ID từ Discord Developer Portal | ✅ Yes |
| `GUILD_ID` | Server ID (optional, dùng cho testing) | ❌ No |
| `NODE_ENV` | Environment (production/development) | ❌ No |

---

## 🌐 Render Setup - Chi Tiết

### **Bước 1: Chuẩn Bị Discord Bot**

1. Vào https://discord.com/developers/applications
2. Click **"New Application"**
3. Đặt tên bot
4. Vào tab **"Bot"** → Click **"Add Bot"**
5. Copy **TOKEN** và lưu lại
6. Vào tab **"OAuth2 → URL Generator"**
   - Scopes: `bot`
   - Permissions: Chọn `Administrator`
   - Copy URL → mở để invite bot vào server

✅ Bot bây giờ trong server của bạn

### **Bước 2: GitHub Setup**

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Script Hub Bot"

# Add remote (thay URL)
git remote add origin https://github.com/YOUR_USERNAME/script-hub-bot.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ Code giờ trên GitHub

### **Bước 3: Render Deploy**

**3.1 - Đăng Ký Render**
1. Vào https://render.com
2. Click **"Sign up"** → Chọn **GitHub** để đăng nhập nhanh
3. Authorize Render

**3.2 - Create Web Service**
1. Từ Render Dashboard → Click **"+ New"**
2. Chọn **"Web Service"**
3. Click **"Connect a repository"**
4. Tìm repo `script-hub-bot`
5. Click **"Connect"**

**3.3 - Configure Service**

```
Name: script-hub-bot
Environment: Node
Region: Singapore (hoặc gần nhất)
Branch: main
Runtime: node-18
Build Command: npm install
Start Command: node index.js
```

Scroll xuống → Click **"Create Web Service"**

**3.4 - Setup Environment Variables**

Trong Render dashboard:
1. Scroll xuống **"Environment Variables"**
2. Click **"Add Environment Variable"**

Thêm 3 biến:
```
DISCORD_TOKEN = your_token_here
CLIENT_ID = your_client_id_here
NODE_ENV = production
```

Render sẽ tự deploy (mất ~2-3 phút)

✅ Bot sẽ online 24/7

---

## 🧪 Testing Bot

**Trên Discord Server:**
```
/menu
```

**Kết quả:**
- Embed đẹp mắt hiện lên ✅
- Select menu với 17 scripts hiện lên ✅
- Chọn script → response embed hiện lên ✅

**Kiểm tra Render logs:**
1. Vào Render Dashboard
2. Chọn bot service
3. Vào **"Logs"** tab
4. Xem real-time logs

---

## 📝 Tùy Chỉnh

### **Thay Đổi Màu Embed**

File: `commands/menu.js`

```javascript
COLORS: {
    PRIMARY: '#FF6B6B',    // Thay màu ở đây
    SECONDARY: '#4ECDC4',
    ACCENT: '#FFE66D',
    DARK: '#1A1A2E'
}
```

### **Thêm Script Hub Mới**

File: `commands/menu.js`

```javascript
const SCRIPT_HUBS = [
    // ... existing scripts
    {
        label: '🎯 Script Mới',
        description: 'Mô tả script',
        value: 'script_id_unique',
        emoji: '🎯'
    }
];
```

### **Thêm Admin Roles**

File: `commands/menu.js`

```javascript
ADMIN_ROLES: [
    '1420260959913775155',  // Existing
    'YOUR_NEW_ROLE_ID'      // Thêm ở đây
]
```

### **Thay Đổi Prefix hoặc Status**

File: `events/ready.js`

```javascript
client.user.setPresence({
    activities: [{
        name: '/menu - Custom Text',  // Đổi text
        type: 1
    }],
    status: 'online'
});
```

---

## 🔄 Update Code

**Mỗi khi bạn update code:**

```bash
# Edit code locally
# ...

# Commit & Push
git add .
git commit -m "Update menu"
git push origin main
```

**Render sẽ tự:**
- Detect push
- Pull code mới
- Install dependencies
- Restart bot

⏱️ Mất ~1-2 phút

---

## 🐛 Troubleshooting

### ❌ Bot không online?

**Kiểm tra Render logs:**
1. Vào Render Dashboard
2. Bot service → **Logs** tab
3. Tìm error message
4. Kiểm tra:
   - Bot token đúng không?
   - index.js có syntax error?
   - package.json dependencies đầy đủ?

### ❌ Bot offline sau 15 phút?

**Nguyên nhân:** Free tier Render sleep sau inactivity

**Giải pháp:**
- Upgrade lên **Starter Plan** ($7/month)
- Hoặc dùng bot 24/7 monitoring

### ❌ Menu không hoạt động?

1. Reload bot trên Render
2. Verify bot có **permission embed links**
3. Check console logs
4. Kiểm tra role IDs đúng không

### ❌ Select menu không response?

1. Verify `interactionCreate.js` loading
2. Check event handler chạy không
3. Restart bot trên Render

---

## 📊 Deployment Options

| Platform | Price | Uptime | Setup |
|----------|-------|--------|-------|
| **Render** | Free / $7/mo | 15 min / 24/7 | ⭐⭐⭐⭐ |
| **Railway** | Free / $10/mo | 500h / 24/7 | ⭐⭐⭐⭐ |
| **Heroku** | Paid | 24/7 | ⭐⭐⭐ |
| **VPS** | Varies | 24/7 | ⭐⭐ |

**Khuyến cáo:** Render Free tier cho test, Starter Plan cho production

---

## 📦 Dependencies

```json
{
  "discord.js": "^14.14.0",
  "dotenv": "^16.3.1"
}
```

**Requirements:**
- Node.js >= 18.0.0
- npm >= 9.0.0

---

## 🔒 Security Tips

✅ **Luôn bảo vệ Bot Token:**
- Không push `.env` lên GitHub
- Sử dụng `.gitignore`
- Regenerate token nếu bị leak

✅ **Sử dụng Environment Variables:**
- Tất cả secrets ở `.env`
- Render auto-encrypt biến env

✅ **Regular Updates:**
- Update discord.js định kỳ
- Check security patches

---

## 📚 Học Tập

**Discord.js Docs:** https://discord.js.org  
**Discord Developer Portal:** https://discord.com/developers  
**Render Docs:** https://render.com/docs

---

## 📄 License

MIT License - Miễn phí sử dụng cho mục đích cá nhân & thương mại

---

## 🤝 Contributing

Có ý tưởng cải tiến?
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📞 Support

**Gặp vấn đề?**
1. Check Render logs
2. Xem troubleshooting section
3. Verify environment variables
4. Restart bot

---

## 🎯 Roadmap

- [ ] Thêm categories modal
- [ ] Script info command
- [ ] Download links integration
- [ ] User stats/tracking
- [ ] Advanced permissions

---

**Version:** 2.0.0 Premium  
**Status:** ✅ Production Ready  
**Last Updated:** September 2024

---

**Made with ❤️ for Script Hub Community**
