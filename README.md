# Kopytko

Kopytko is my first, initial approach to creating **“The scratchpad repository”**. Repositories like this are mainly for creating, experimenting, and learning new frameworks and technologies.
This application has no special purpose - it is just a simple backend-frontend application with many different libraries implemented at once to check how they would be suitable for my future applications.
A huge part of this code looks terrible or even does not work - in some places I’ve added TODOs for myself to make some improvements.

Maybe someday this app will turn into something, maybe not. Is just my playground for future use. But, maybe here you will find something interesting for yourself, or just Github Copilot will make a useful hint based on this.

If you are going to use even a small part of this code in production you must be very brave, very stupid, or just want to sabotage your own application/company - do not know what’s worse.

### Current technologies:

- backend: [HonoJS](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/)
- frontend: [ReactJS (Vite)](https://vitejs.dev/), [Tanstack Router](https://tanstack.com/router/latest), [Tanstack Query](https://tanstack.com/query/latest), [React Hook Form](https://www.react-hook-form.com/), [TailwindCSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- other/common: [Zod](https://zod.dev/), [Turborepo](https://turbo.build/repo), [PostgreSQL](https://www.postgresql.org/) (using [PostgresApp](https://postgresapp.com/) for macOS )

### Instalation

```
git clone git@github.com:mkpanq/kopytko.git
```

There is already `.tool-versions` file for asdf configuration for easier node and pnpm version management. If you don't know it yet, I highly recommend [checking it out](https://asdf-vm.com/).

```
asdf install
```

Install packages for all workspaces:

```
pnpm install
```

Create and seed DB (remember about launching own Postgres DB locally - use Docker, or [PostgresApp](https://postgresapp.com/))

```
pnpm run db:migrate
pnpm run db:seed
```

Run project:

```
pnpm run dev
```
