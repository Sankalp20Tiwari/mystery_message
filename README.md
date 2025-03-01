# Mystery Message

## 📌 Project Overview

The **Mystery Message** is a modern web application designed to facilitate user feedback collection and management. Built using **Next.js**, this application provides an intuitive and efficient way for users to share messages with other users anonymously, while also having the functionality to receive anonymous messages. The project emphasizes performance, scalability, and user experience.

<iframe src="https://mystery-message-olive-psi.vercel.app/" width="100%" height="500px"></iframe>


## 🚀 Features

- **User-friendly interface** for seamless feedback submission
- **Authentication system** using NextAuth
- **Mobile-responsive design** ensuring accessibility across devices
- **Optimized performance** with server-side rendering (SSR) and static site generation (SSG)
- **Modern UI** powered by Tailwind CSS
- **Secure API interactions** for data integrity

## 🔗 Live Demo

Check out the live version of Mystery Message here: [Live Site](https://mystery-message-olive-psi.vercel.app/)

## 🛠 Installation & Setup

To set up and run the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn** for package management
- A **MongoDB database**

### Steps to Run

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sankalp20Tiwari/mystery_message.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd mystery_message
   ```
3. **Install dependencies:**
   ```sh
   npm install  # or yarn install
   ```
4. **Configure environment variables:**
   Create a `.env` file in the root directory and define the necessary environment variables:
   ```sh
   NEXTAUTH_SECRET=<your-next-auth-secret>
   MONGODB_URI=<your-database-connection-string>
   RESEND_API_KEY=<your-resend-api-key>
   OPENAI_API_KEY=<your-openai-api-key>
   ```
5. **Run the development server:**
   ```sh
   npm run dev  # or yarn dev
   ```
6. Open `http://localhost:3000` in your browser to view the application.

## 🔧 Configuration

The application uses environment variables to manage API endpoints and database connections. Update the `.env` file accordingly to ensure smooth functionality.

## 📂 Project Structure

```
mystery_message/
├──src                 # Source directory
   ├──app              # Actual code files
       ├──(app)        # Pages
       ├──(auth)       # Auth related pages
       ├──(api)        # Auth and other APIs
       ├──u            # Another page
       ├──layout.tsx   # Layout page
   ├──components       # Reusable UI components
   ├──context          # Providers
   ├──helpers          # Helper functions
   ├──hooks            # React hooks
   ├──lib              # Utilities
   ├──model            # Models
   ├──schemas          # Schemas
   ├──types            # Type declaration for TypeScript     
├── public/            # Static assets (images, icons, etc.)
├── styles/            # Global and component-level styles
├── next.config.ts     # Next.js configuration settings
├── package.json       # Project metadata and dependencies
├── .env               # Environment variables (excluded from Git)
```

## 🏰 Technologies Used

- **Next.js** - React framework for SSR & SSG
- **TypeScript** - Ensures type safety and scalability
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **ESLint & Prettier** - Code linting and formatting for better maintainability
- **MongoDB** - Database solutions for storing feedback
- **JWT Authentication** - Secure user authentication using NextAuth.js
- **React-hook-form** - All forms are managed using React Hook Form
- **Shadcn** - Responsive and clean UI with help of Shadcn
- **Resend** - Mail functionality using Resend

## 🤝 Contributing

We welcome contributions to enhance the project! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Implement your changes and commit.
4. Push to your forked repository and submit a pull request.

## 🐝 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

For any inquiries or issues, please contact the maintainers or open an issue in the repository.




