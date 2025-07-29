# Invert-Hub

## Project Setup

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- Git

### Install dependencies

```sh
cd server
npm install
cd ../client
npm install
```

### Database setup (Prisma)

```sh
cd server
npx prisma generate
npx prisma migrate dev
```

### Running the apps

**Server:**
```sh
cd server
npm start
```

**Client:**
```sh
cd client
npm run dev
```

---

## Team Workflow

1. **Branching:**
   - `main`: Production branch (auto-deployed by Vercel)
   - `development`: Staging branch for integration/testing
   - Feature branches: `feature/your-feature` (branch from `development`)

2. **Pull Requests:**
   - All changes must be made via pull requests (PRs), no direct pushes to `main` or `development`.
   - PRs into `main` and `development` require passing Vercel checks (and reviews if enabled).
   - Keep PRs small and focused for easier review.

3. **Merging:**
   - Only merge PRs after all required checks (Vercel, etc.) pass.
   - Keep `development` up to date with `main` by merging or rebasing as needed.

4. **Code Owners:**
   - Only designated code owners can approve PRs if required by branch protection rules.

5. **Vercel Deployments:**
   - Every PR and push triggers a Vercel deployment preview.
   - `main` is always deployed to production.

---

## Useful Commands

```sh
# Create a new feature branch
git checkout development
git pull origin development
git checkout -b feature/your-feature

# Push your branch
git push -u origin feature/your-feature

# Start a pull request on GitHub
```
