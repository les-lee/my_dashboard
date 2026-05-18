# Fullstack Admin System - Exec Plan

## Project Overview

构建一个企业级全栈后台管理系统。

目标：

* 练习完整全栈开发能力
* 练习企业级工程化
* 练习 Docker 容器化
* 练习 CI/CD 自动部署
* 练习 RBAC 权限管理
* 练习真实生产环境部署

---

# Core Requirements

## Frontend

技术栈：

* React
* Vite
* TypeScript
* Ant Design
* React Router
* Zustand
* Axios

功能：

* 登录页
* 后台 Dashboard
* 用户管理
* 角色管理
* 权限管理
* 系统设置
* 动态菜单
* Token 管理
* Route Guard
* 权限按钮控制
* 表格 CRUD
* 分页
* 搜索
* 文件上传

---

## Backend

技术栈：

* Node.js
* NestJS
* TypeScript
* Prisma ORM
* MySQL
* JWT Authentication
* Redis

功能：

* RESTful API
* 用户鉴权
* RBAC 权限系统
* JWT 登录
* Refresh Token
* 权限中间件
* 日志系统
* 文件上传
* API 参数校验
* 全局异常处理
* Swagger API 文档

---

## Database

数据库：

* MySQL 8

核心表：

* users
* roles
* permissions
* role_permissions
* user_roles
* refresh_tokens
* audit_logs

---

## DevOps

必须实现：

* Docker
* Docker Compose
* GitHub Actions
* CI/CD
* 自动部署
* Nginx
* HTTPS
* 阿里云服务器部署

---

# Project Structure

```txt
project/
├── apps/
│   ├── admin-web/
│   └── api-server/
│
├── packages/
│
├── docker/
│
├── nginx/
│
├── .github/
│   └── workflows/
│
├── prisma/
│
├── docs/
│
├── .env
├── docker-compose.yml
├── AGENTS.md
└── .agent/
    └── PLANS.md
```

---

# Architecture

## Frontend Architecture

使用：

* Feature-based structure
* API Layer
* Permission Hooks
* Layout System
* Protected Routes

目录：

```txt
src/
├── api/
├── pages/
├── layouts/
├── store/
├── hooks/
├── router/
├── components/
├── permissions/
└── utils/
```

---

## Backend Architecture

NestJS 模块化：

```txt
src/
├── auth/
├── users/
├── roles/
├── permissions/
├── common/
├── prisma/
├── redis/
├── upload/
└── logs/
```

---

# Authentication Design

## Login Flow

1. 用户登录
2. 验证账号密码
3. 返回 Access Token
4. 返回 Refresh Token
5. 前端存储 Token
6. 请求自动携带 JWT
7. Access Token 过期后自动刷新

---

## Security

必须实现：

* Password Hash
* JWT Expiration
* Refresh Token Rotation
* Route Permission Check
* API Permission Check
* Request Validation
* CORS
* Helmet
* Rate Limit

---

# RBAC Permission System

## Permission Model

采用：

```txt
User -> Role -> Permission
```

示例：

```txt
Admin
  ├── user:create
  ├── user:update
  ├── role:update
  └── dashboard:view
```

---

## Frontend Permission Control

实现：

* 动态菜单
* 动态路由
* 权限按钮显示隐藏
* 页面访问控制

---

## Backend Permission Guard

实现：

* JWT Guard
* Role Guard
* Permission Guard

---

# Docker Design

## Services

Docker Compose 包含：

* frontend
* backend
* mysql
* redis
* nginx

---

## Requirements

必须实现：

* Production Dockerfile
* Multi-stage Build
* Environment Variables
* Health Check
* Volume Persistence

---

# CI/CD Design

## GitHub Actions

流程：

1. Push 到 main
2. 自动测试
3. 自动构建 Docker Image
4. Push 到 Docker Registry
5. SSH 到阿里云服务器
6. Pull 最新镜像
7. 自动重启容器

---

## CI Requirements

必须：

* Lint
* Type Check
* Unit Test
* Docker Build Test

---

# Deployment Design

## Server

服务器：

* 阿里云 ECS Ubuntu

部署：

* Docker Compose
* Nginx Reverse Proxy
* HTTPS
* PM2（可选）

---

## Domain

必须支持：

* HTTPS
* API Reverse Proxy
* Gzip
* Static Cache

---

# Development Phases

# Phase 1 - Project Initialization

目标：

初始化 Monorepo 项目。

任务：

* 创建 frontend
* 创建 backend
* 配置 TypeScript
* 配置 ESLint
* 配置 Prettier
* 配置 Husky
* 配置 Commitlint

验证：

```bash
npm run dev
```

完成标准：

* 前后端可运行
* lint 无报错

---

# Phase 2 - Database & Prisma

目标：

完成数据库初始化。

任务：

* 安装 MySQL
* 配置 Prisma
* 创建数据库 schema
* 创建 migration
* 创建 seed

验证：

```bash
npx prisma migrate dev
```

完成标准：

* 数据库表正常生成
* seed 成功

---

# Phase 3 - Authentication System

目标：

实现完整登录系统。

任务：

* Login API
* Register API
* JWT
* Refresh Token
* Password Hash
* Auth Middleware

验证：

* 可登录
* Token 正常刷新
* 未登录无法访问 API

---

# Phase 4 - RBAC Permission System

目标：

实现权限系统。

任务：

* Role CRUD
* Permission CRUD
* User Role Binding
* Permission Guard
* Dynamic Menu

验证：

* 不同角色看到不同菜单
* API 权限生效

---

# Phase 5 - Admin Dashboard

目标：

实现后台页面。

任务：

* Dashboard
* User Management
* Role Management
* Permission Management
* Table CRUD

验证：

* CRUD 正常
* 页面权限正常

---

# Phase 6 - Dockerization

目标：

完成容器化。

任务：

* Frontend Dockerfile
* Backend Dockerfile
* Docker Compose
* Nginx Config

验证：

```bash
docker compose up
```

完成标准：

* 所有服务正常运行

---

# Phase 7 - CI/CD

目标：

完成自动化部署。

任务：

* GitHub Actions
* Docker Build
* 自动部署
* SSH Deploy

验证：

* Push 自动部署成功

---

# Phase 8 - Production Deployment

目标：

部署到阿里云。

任务：

* 配置 ECS
* 配置 Docker
* 配置域名
* 配置 HTTPS
* 配置 Nginx

验证：

* HTTPS 可访问
* API 正常
* 页面正常

---

# Non-Functional Requirements

必须保证：

* Type Safety
* Clean Architecture
* Reusable Components
* Environment Isolation
* Production Ready
* Error Logging
* Secure Authentication

---

# Coding Standards

要求：

* 使用 TypeScript
* 禁止 any
* 函数职责单一
* 所有 API 必须 DTO 校验
* 所有组件必须可复用
* 所有环境变量集中管理

---

# Validation Checklist

## Frontend

* [ ] 登录正常
* [ ] Token 自动刷新
* [ ] 动态菜单正常
* [ ] 权限控制正常

---

## Backend

* [ ] JWT 正常
* [ ] 权限 Guard 正常
* [ ] Prisma 正常
* [ ] Redis 正常

---

## DevOps

* [ ] Docker 正常
* [ ] GitHub Actions 正常
* [ ] 自动部署正常
* [ ] HTTPS 正常

---

# Progress

* [ ] Phase 1
* [ ] Phase 2
* [ ] Phase 3
* [ ] Phase 4
* [ ] Phase 5
* [ ] Phase 6
* [ ] Phase 7
* [ ] Phase 8

---

# Recovery Strategy

如果部署失败：

1. 回滚 Docker Image
2. 恢复数据库备份
3. 查看 GitHub Actions Logs
4. 查看 Docker Logs

---

# Future Extensions

后续可扩展：

* 微服务
* Kubernetes
* WebSocket
* 消息队列
* 多租户
* SaaS Billing
* OpenAPI SDK
* GraphQL
* 灰度发布
* 监控系统

---

# Final Goal

最终达到：

* 可上线
* 可部署
* 可扩展
* 可维护
* 企业级工程结构
* 完整 DevOps 流程
* 完整权限体系
* 完整容器化流程
