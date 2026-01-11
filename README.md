# Blog Management System

A dynamic blog application built with Next.js and MongoDB, featuring a custom rich text editor, reactive sidebar carousel, and full CRUD blog management capabilities.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a remote URI)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
Create a `.env.local` file in the root directory and add your MongoDB connection string:
```bash
MONGODB_URI=mongodb://localhost:27017/blog_db
```

### Seeding the Database
To populate the database with initial sample posts:
```bash
npm run seed
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠 Features

### Blog Management
The system provides a complete interface for managing your content at `/manage-blogs`.
- **List Page**: View all existing blogs with options to edit or delete.
- **Create Page**: Add new blog posts with metadata (Title, Category, Hero Image, Author Avatar).
- **Edit Page**: Update existing blog posts using a persistent slug.
- **Rich Text Editor**: A custom-built `contentEditable` editor for React 19 compatibility, supporting:
  - Formatting (Bold, Italic, Lists, Headers)
  - Image & Link insertion
  - HTML content persistence

### Dynamic Blog Display
- **Related Articles**: Automatically fetches and displays articles from the same category.
- **Explore More Sidebar**: A dynamic section that filters out the current post and shuffles remaining articles.
- **Mobile Carousel**: On mobile devices, the "Explore more" section transforms into an interactive horizontal carousel with navigation.
- **Next/Prev Post Navigation**: Seamlessly navigate between blog posts using integrated navigation buttons.

---

## 📁 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/blog/`: Core blog components (Form, Content, AboutAuthor, Sidebar).
- `lib/`: Database connection logic, models, and centralized API client.
- `public/`: Static assets (images, logos).
- `styles/`: Global and module-specific CSS.

---

## 🧪 Technologies Used
- **Framework**: Next.js 
- **Database**: MongoDB & Mongoose
- **Editor**: Custom React 19 Rich Text Editor
- **Styling**: CSS Modules (Modern Vanilla CSS)
- **Validation**: ESLint
