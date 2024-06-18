<div align="center"><strong>Next.js 14 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://next-admin-dash.vercel.app/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

STEP 01 : Create a vercel postgres DB and run below CREATE TABLE query to create users and products tables.

```
CREATE TABLE next_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    username VARCHAR(50),
    email VARCHAR(50),
    isadmin BOOLEAN DEFAULT FALSE
);


CREATE TABLE next_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


```
STEP 02 : Insert sample data


```
INSERT INTO next_users (id, email, name, username,isadmin) VALUES (1, 'me@site.com', 'Me', 'username',true);

INSERT INTO next_products (name, price, image)
VALUES
('Product 1', 19.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8MHwwfHx8MA%3D%3D'),
('Product 2', 29.99, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8MHwwfHx8MA%3D%3D'),
('Product 3', 39.99, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxhcHRvcHxlbnwwfDB8MHx8fDA%3D');

```

STEP 03 : 
Copy the `.env.example` file to `.env` and update the values.


STEP 04 :

Finally, run the following commands to start the development server:

```
npm install
npm run dev
```

You should now be able to access the application at http://localhost:3000.
