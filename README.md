# Pokédex Browser
<img width="2559" height="1466" alt="image" src="https://github.com/user-attachments/assets/9e149bd6-7aa3-4775-9b4b-bec97aa70ec5" />


A responsive and performant Pokémon browser built using **React** and **TypeScript**,
This application displays Pokémon in two views — **pagination** and **load more** — with detailed pages for each Pokémon, and polished handling of loading and error states.

---

## Live Demo & Repo

- **Live Preview**: [Demo](https://pokedex-swf.vercel.app/)
- **GitHub Repository**: [Code](https://github.com/Mohammed-Abdelsalam/pokedex)

---

## Tech Stack

This project was built with the following tools:

- **React 19**
- **Tailwind CSS 3.4**
- **React Router v6**
- **TypeScript 5**
- **Vite**
- **React Query v5** (`@tanstack/react-query`)
- **Axios**
- **React Error Boundary**
- **Lucide Icons**
- **ESLint + Prettier**

---

## Project Structure

```

poke-browser/
├─ public/
├─ src/
│  ├─ api/
│  │  ├─ axios.ts             # Axios instance with interceptors
│  │  └─ queryClient.ts       # React Query client & persistence
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.tsx
│  │  │  └─ Container.tsx
│  │  ├─ pokemon/
│  │  │  ├─ PokemonCard.tsx
│  │  │  └─ PokemonCardSkeleton.tsx
│  │  ├─ Pagination.tsx
│  │  ├─ LoadMoreButton.tsx
│  │  └─ ErrorFallback.tsx
│  ├─ hooks/
│  │  ├─ usePokemonList.ts
│  │  └─ usePokemonDetails.ts
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  └─ PokemonDetail.tsx
│  ├─ router/
│  │  └─ routes.tsx
│  ├─ contexts/
│  │  └─ ThemeContext.tsx
│  ├─ utils/
│  │  └─ helpers.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.ts
└─ README.md

```

---

## Features

- Grid view with both **pagination** and **load more**
- **Dedicated Pokémon detail page** (name, image, types, height, weight)
- **Responsive design** for desktop, tablet, and mobile
- Reusable components with clean separation of concerns
- **Skeleton loading states**
- **Error handling** with Error Boundary & retry
- Persisted query cache (localStorage) using React Query
- Strictly typed with TypeScript
- Clean, maintainable codebase with performance in mind

---

## Performance & Clean Code Practices

- Memoization using `useMemo`, `memo`, `useCallback`
- DRY and modular code organization
- Logical folder structure for scalability
- Avoided unnecessary re-renders
- Followed best practices for Error Boundaries and Query Caching
- Code is testable, with clear separation between logic and UI

---

## API Used

[PokeAPI](https://pokeapi.co)

- List Pokémon:  
  `GET https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
- Pokémon Details:  
  `GET https://pokeapi.co/api/v2/pokemon/{name}`

---

## Developer Info

**Mohamed Abdelsalam**

- Phone: [+201150733085](tel:+201150733085)
- Email: [mohamedabdelsalamcsai@gmail.com](mailto:mohamedabdelsalamcsai@gmail.com)
- LinkedIn: [linkedin.com/in/mo-abdelslalam-frontend](https://www.linkedin.com/in/mo-abdelslalam-frontend)
- Portfolio: [moabdelsalam.netlify.app](https://moabdelsalam.netlify.app/)

---

## License

This project is open-source and free to use for educational or assessment purposes.
