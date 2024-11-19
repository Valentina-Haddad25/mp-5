**Link Shortener**
A simple and efficient URL shortener built with Next.js, TypeScript, and MongoDB. This application generates short URLs with custom aliases while ensuring URL validity and preventing duplicate aliases.

**Features**
**Custom Aliases:** Users can create short URLs with their chosen aliases.
**Duplicate Prevention:** Ensures that no two URLs have the same alias.
**URL Validation:** Checks the input URL to ensure it is a valid link.
**MongoDB Integration:** All data is stored in a MongoDB database for persistence.
**Error Feedback:** Displays meaningful error messages for issues like duplicate aliases or invalid links.
**Technologies Used**
**Frontend:** Next.js, React, TypeScript
**Backend:** Node.js, TypeScript
**Database:** MongoDB
**Deployment:** Vercel: https://mp-5-one.vercel.app/ 
**Project Structure**
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Page layout
│   └── page.tsx            # Main application entry
├── components/
│   ├── box-and-url.tsx     # Form component for alias and URL input
│   └── header.tsx          # Header component
├── lib/
│   ├── create-sUL.ts       # Utility for short URL creation
│   └── insertIntoDB.ts     # Function to insert URLs into the database
├── pages/
│   └── [alias].tsx         # Route handling short URL redirection
├── .env.local              # Environment variables
├── next.config.mjs         # Next.js configuration
├── db.ts                   # MongoDB connection setup
└── README.md               # Project documentation (this file)
