# 周琪雯作品集 - GitHub 部署指南

## 项目已准备就绪

您的作品集代码已完成，包含以下功能：
- 现代极简风格落地页
- Framer Motion 滚动动画
- 丰富的鼠标悬停交互效果
- 响应式布局（移动端单列，桌面端三列）
- 作品展示与筛选功能

## 部署到 GitHub Pages 步骤

### 方法一：手动创建仓库

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名称：`portfolio` 或 `rookive-portfolio`
   - 描述：`周琪雯角色原画作品集`
   - 选择 Public（公开）
   - 点击 "Create repository"

2. **推送代码到 GitHub**
   ```bash
   cd /workspace/projects
   
   # 添加远程仓库（替换 YOUR_USERNAME）
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   
   # 推送到 GitHub
   git branch -M main
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 等待自动部署完成

### 方法二：使用 GitHub CLI（推荐）

如果您本地有 GitHub CLI：
```bash
# 登录 GitHub
gh auth login

# 创建仓库并推送
cd /workspace/projects
gh repo create portfolio --public --source=. --push

# 启用 GitHub Pages
gh api repos/{owner}/{repo}/pages -X POST -f source='{"branch":"main"}'
```

### 方法三：一键部署脚本

在您的本地终端执行：
```bash
# 克隆项目
git clone <your-repo-url>
cd portfolio

# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 部署到 GitHub Pages
pnpm run deploy
```

## 当前项目统计

- 📄 文件数量：85+
- 📦 依赖包：已完整安装
- 🎨 页面模块：5个主要区域
- 🖼️ 作品图片：14张
- ✨ 动画效果：20+

## 技术栈

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Lucide React Icons

---

**注意**：由于沙箱环境限制，无法直接创建 GitHub 仓库。请在您的 GitHub 账户中手动创建仓库，然后使用上述命令推送代码。
