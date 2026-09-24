<div align="center">

# 💪 FitLog

### Workout Library & Daily Planner

*Pick a lift. Lock it into today's plan. Log honest work.*

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

🔗 **[Live Site](<your-live-link>)** &nbsp;|&nbsp; 📦 **[GitHub Repository](<your-github-link>)**

</div>

---

## 📖 Description

FitLog is a dark, no-nonsense gym companion built as part of my Next.js module
assignment. You can browse a library of 12 workouts, open any of them to see the
full specs and instructions, and then decide what goes into **today's plan** and
what you'd rather **save for later**. The My Plan page keeps live totals of
exercises, minutes and calories, so you can see the size of your workout at a
glance. Everything works on mobile, tablet and desktop.

<!-- Optional: add a screenshot of your home page here
![FitLog Home](./public/screenshot.png)
-->

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16 (App Router)** | Routing, dynamic routes, Server & Client Components |
| **React 19** | `useState`, `useEffect` and the Context API for state |
| **Tailwind CSS v4** | Responsive, consistent styling |
| **react-hot-toast** | Toast notifications |
| **lucide-react** | Icons |
| **Vercel** | Deployment |

---

## ✨ Key Features

1. **Workout Library** — 12 workouts fetched from an API and shown in a
   responsive grid with muscle tags, equipment, duration, calories and rating.
2. **Dynamic Details Page** — every card opens `/workout/[id]` with a full spec
   sheet and step-by-step instructions.
3. **Today's Plan & Saved List** — add up to five lifts to today's plan or keep
   workouts for later, with toast feedback for every action.
4. **My Plan Dashboard** — live Exercises / Minutes / Calories totals, tabs for
   Today's Plan and Saved, sorting, Mark as Done and remove.
5. **Persistent & Polished** — plan and saved lists survive a page reload
   (`localStorage`), plus loading states, empty states and a custom 404 page.

---

## 🚀 Run Locally

```bash
git clone <your-github-link>
cd assignment-06
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

---

<div align="center">

Built by **Bijoy Kumar Paul** · Train hard, log honest. 🏋️

</div>