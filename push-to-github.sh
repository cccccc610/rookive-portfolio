#!/bin/bash

# 周琪雯作品集 - GitHub 推送脚本
# 使用方法：bash push-to-github.sh YOUR_GITHUB_TOKEN YOUR_USERNAME

TOKEN="${1}"
USERNAME="${2}"
REPO_NAME="rookive-portfolio"

if [ -z "$TOKEN" ] || [ -z "$USERNAME" ]; then
    echo "使用方法：bash push-to-github.sh YOUR_TOKEN YOUR_USERNAME"
    echo ""
    echo "获取 GitHub Token："
    echo "1. 访问 https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token (classic)'"
    echo "3. 勾选 'repo' 权限"
    echo "4. 生成并复制 token"
    exit 1
fi

echo "正在创建 GitHub 仓库..."

# 创建仓库
RESPONSE=$(curl -s -X POST \
    -H "Authorization: token ${TOKEN}" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos \
    -d "{
        \"name\": \"${REPO_NAME}\",
        \"description\": \"周琪雯角色原画作品集 - 10年腾讯游戏美术经验\",
        \"private\": false,
        \"has_pages\": true
    }")

if echo "$RESPONSE" | grep -q "full_name"; then
    echo "✅ 仓库创建成功！"
else
    echo "❌ 创建失败："
    echo "$RESPONSE"
    exit 1
fi

# 配置远程仓库
git remote remove origin 2>/dev/null || true
git remote add origin https://${TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git

# 推送代码
echo "正在推送代码..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码推送成功！"
    echo ""
    echo "📱 仓库地址：https://github.com/${USERNAME}/${REPO_NAME}"
    echo ""
    echo "🌐 启用 GitHub Pages："
    echo "   1. 访问 https://github.com/${USERNAME}/${REPO_NAME}/settings/pages"
    echo "   2. Source 选择 'GitHub Actions'"
    echo "   3. 等待部署完成"
    echo ""
    echo "🔗 部署后访问地址：https://${USERNAME}.github.io/${REPO_NAME}"
else
    echo "❌ 推送失败"
fi
