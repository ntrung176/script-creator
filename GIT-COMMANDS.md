# Git Quick Commands

## 📥 Khởi tạo Git Repository

```bash
# Initialize Git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Friso Content Hub MVC"

# Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/[your-username]/bao-appdemo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 Update & Push Changes

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Update: your message here"

# Push to GitHub
git push
```

---

## 🌿 Branch Management

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

---

## 📋 Useful Git Commands

```bash
# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD^

# Discard all local changes
git reset --hard HEAD

# Pull latest changes
git pull origin main

# Clone repository
git clone https://github.com/[your-username]/bao-appdemo.git
```

---

## 🚀 Quick Deploy Workflow

```bash
# 1. Make changes to code
# 2. Test locally
npm run dev

# 3. Build to verify
npm run build

# 4. Commit and push
git add .
git commit -m "Update: add new feature"
git push

# GitHub Actions will auto-deploy! 🎉
```

---

## 📝 Common Commit Messages

```bash
# New feature
git commit -m "feat: add search functionality"

# Bug fix
git commit -m "fix: resolve copy button issue"

# Update documentation
git commit -m "docs: update README"

# Refactor code
git commit -m "refactor: improve ScriptController"

# Style changes
git commit -m "style: update button colors"

# Performance improvement
git commit -m "perf: optimize search algorithm"
```

---

## 🔧 Setup Git Config (First time)

```bash
# Set name
git config --global user.name "Your Name"

# Set email
git config --global user.email "your.email@example.com"

# Check config
git config --list
```

---

## 📦 One-liner Commands

### Full update workflow:
```bash
git add . && git commit -m "Update" && git push
```

### Quick save:
```bash
git add . && git commit -m "WIP: work in progress" && git push
```

### Force push (use carefully!):
```bash
git push -f origin main
```

---

## 🆘 Troubleshooting

### Forgot to add remote?
```bash
git remote add origin https://github.com/[username]/bao-appdemo.git
```

### Wrong remote URL?
```bash
git remote set-url origin https://github.com/[username]/bao-appdemo.git
```

### Lost commits?
```bash
git reflog
git reset --hard HEAD@{n}
```

### Merge conflicts?
```bash
# 1. Open conflicted files
# 2. Resolve conflicts manually
# 3. Add resolved files
git add .
# 4. Continue
git commit
```

---

**Quick Reference saved! Use these commands to manage your project.** 🚀
