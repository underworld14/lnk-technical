# lnk-technical

A technical test project built to demonstrate an application utilizing various technologies.

## Tech Stack

- **Backend:** Express
- **Frontend:** React, TailwindCSS, ShadCN UI
- **Database:** MongoDB
- **ORM:** Prisma ORM
- **Email Service:** Resend

## Requirements

- **Node.js:** v20 or higher
- **pnpm:** v9 or higher
- **MongoDB:** v4 or higher

## Setup Guide

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd lnk-technical
```

### 2. Copy and configure environment variables

```bash
cp .env.example .env
```

### 3. Set up environment variables

Fill in the values in the `.env` file. Make sure to register for [Resend](https://resend.com/) to enable email sending functionality.

### 4. Install dependencies

```bash
pnpm i
```

### 5. Synchronize Prisma schema with MongoDB

```bash
pnpx prisma db push
```

### 6. Generate Prisma client

```bash
pnpx prisma generate
```

### 7. Run the development server

```bash
pnpm run dev
```

The application should now be running on `http://localhost:3000` (or the specified port in your configuration).

---

Feel free to report issues or suggest improvements to the repository. Happy coding!
