# Employee Info

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

A React application for displaying and editing employee information.

## Features

- 📝 Personal information display
- 🏷️ Custom tag management
- 🌐 Social media links
- 📅 Work experience timeline
- 🎨 Drag-and-drop layout editing
- 💾 Local/Remote data storage

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- HeroUI Components
- React Router

## Quick Start

### Install Dependencies

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Production Build

```bash
yarn build
```

## Project Structure

```
src/
├── api/          # API requests
├── components/   # React components
└── hooks/        # Custom hooks
```

## Configuration

### Config Api

Edit src/api/baseUrl.ts:

```typescript
const baseUrl = your api addr;

export default baseUrl;
```

### Local Storage

Data will be automatically stored in localStorage if no API URL is configured.

## API Reference

### Get Profile

```http
GET /api/profile
```

Returns the employee profile information.

#### Response

```json
{
  "name": "string",
  "introduction": {
    "text": "string",
    "top": number,
    "left": number
  },
  "tags": [
    {
      "id": "string",
      "emoji": "string",
      "text": "string"
    }
  ],
  "social": {
    "top": number,
    "left": number,
    "context": [
      {
        "id": "string",
        "icon": "string",
        "link": "string"
      }
    ]
  },
  "resume": {
    "top": number,
    "left": number,
    "context": [
      {
        "id": "string",
        "title": "string",
        "start": "string",
        "end": "string"
      }
    ]
  }
}
```

### Update Profile

```http
PUT /api/profile
```

Updates the employee profile information.

#### Request Body

Same as the response format of GET /api/profile

#### Response

Returns 200 on success.

## Todo

- [ ] Image Management
  - [ ] Avatar management
  - [ ] Image gallery
- [ ] Appearance Customization
  - [ ] Custom fonts
  - [ ] Theme colors
  - [ ] Dark mode
- [ ] Responsive Design
  - [ ] Mobile-first layout
  - [ ] Tablet optimization
  - [ ] Desktop enhancement
- [ ] Blog Integration
  - [ ] External blog display

---

<h2 id="chinese">中文</h2>

一个用于展示和编辑员工信息的 React 应用。

## 功能特点

- 📝 个人信息展示
- 🏷️ 自定义标签管理
- 🌐 社交媒体链接
- 📅 工作经历时间线
- 🎨 拖拽式布局编辑
- 💾 本地/远程数据存储

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- HeroUI Components
- React Router

## 快速开始

### 安装依赖

```bash
yarn install
```

### 开发环境运行

```bash
yarn dev
```

### 构建生产版本

```bash
yarn build
```

## 项目结构

```
src/
├── api/          # API 请求相关
├── components/   # React 组件
└── hooks/        # 自定义 Hooks
```

## 配置说明

### 设置 Api

修改 src/api/baseUrl.ts ：

```typescript
const baseUrl = 你的 Api 地址;

export default baseUrl;
```

### 本地存储

如果未配置 API 地址，数据将自动存储在 localStorage 中。

## API 接口说明

### 获取档案

```http
GET /api/profile
```

获取员工档案信息。

#### 响应格式

```json
{
  "name": 字符串,
  "introduction": {
    "text": 字符串,
    "top": 数字,
    "left": 数字
  },
  "tags": [
    {
      "id": 字符串,
      "emoji": 字符串,
      "text": 字符串
    }
  ],
  "social": {
    "top": 数字,
    "left": 数字,
    "context": [
      {
        "id": 字符串,
        "icon": 字符串,
        "link": 字符串
      }
    ]
  },
  "resume": {
    "top": 数字,
    "left": 数字,
    "context": [
      {
        "id": 字符串,
        "title": 字符串,
        "start": 字符串,
        "end": 字符串
      }
    ]
  }
}
```

### 更新档案

```http
PUT /api/profile
```

更新员工档案信息。

#### 请求体

与获取档案的响应格式相同

#### 响应格式

成功时返回 200

## Todo

- [ ] 图片上传功能
  - [ ] 头像管理
  - [ ] 图片库
- [ ] 外观定制
  - [ ] 自定义字体
  - [ ] 主题颜色
  - [ ] 暗色模式
- [ ] 响应式设计
  - [ ] 移动端优先布局
  - [ ] 平板适配
  - [ ] 桌面端优化
- [ ] 博客展示
  - [ ] 外链博客展示
