# Society Pluss - Complete Real Estate Platform

## 🏠 Overview

Society Pluss is a comprehensive real estate platform where users can buy, sell, and rent properties. This is a production-grade full-stack application built with modern web technologies.

## 📦 Project Structure

```
society pluss/
├── frontend/                  # React + Vite frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── context/          # State management (Zustand)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Helper functions
│   │   ├── styles/           # Global styles
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── README.md             # Frontend documentation
│   └── index.html
│
└── database/                  # Database configuration
    ├── SCHEMA.md              # Database schema documentation
    └── setup.sql              # SQL queries to set up database
```

## 🎯 Features

### For Users
- ✅ **Browse Properties** - Search and filter properties by type, location, price, and more
- ✅ **Property Details** - View comprehensive property information with images
- ✅ **Save Favorites** - Bookmark properties for later
- ✅ **Send Inquiries** - Contact property owners directly
- ✅ **User Dashboard** - Manage profile and view inquiries
- ✅ **Post Properties** - List properties for rent or sale
- ✅ **User Authentication** - Secure signup and login with Supabase

### For Developers
- ✅ **Clean Architecture** - Organized code structure with separation of concerns
- ✅ **Type Safety** - JavaScript with JSDoc comments
- ✅ **State Management** - Zustand for lightweight global state
- ✅ **API Services** - Modular service layer for API calls
- ✅ **Security** - Row Level Security (RLS) on all database tables
- ✅ **Responsive Design** - Mobile-first, works on all devices

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Setup Supabase
- Create a Supabase account at https://supabase.com
- Create a new project
- Copy your Project URL and Anon Key

### 3. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Setup Database
- Go to your Supabase project dashboard
- Open SQL Editor
- Run all queries from `database/setup.sql`
- Create two Storage buckets:
  - `property-images` (public)
  - `profile-pictures` (public)

### 5. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 📋 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Homepage with featured properties and statistics |
| `/properties` | Browse Properties | All properties with advanced search filters |
| `/property/:id` | Property Details | Detailed view of a specific property |
| `/login` | Login | User authentication page |
| `/signup` | Sign Up | User registration page |
| `/favorites` | Favorites | Saved favorite properties |
| `/my-inquiries` | Inquiries | Manage property inquiries |
| `/dashboard` | Dashboard | User profile and property management |
| `/add-property` | Add Property | Post a new property listing |

## 🔧 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **Supabase JS** - Backend client
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Supabase** - PostgreSQL database, authentication, storage
- **PostgreSQL** - Relational database
- **PostgREST** - Auto-generated REST API

## 📚 Key Components

### Services
- **authService** - User authentication and password management
- **propertyService** - Property CRUD operations and image uploads
- **userService** - User profile management
- **inquiryService** - Property inquiries management
- **favoritesService** - Favorite properties management

### Stores (Zustand)
- **useAuthStore** - Authentication state
- **usePropertyStore** - Properties and filters state
- **useFavoritesStore** - Favorites state

### Pages
All pages are located in `src/pages/` and handle different sections of the application.

## 🗄️ Database Schema

### Tables
1. **user_profiles** - User information and settings
2. **properties** - Property listings
3. **inquiries** - Property inquiries from buyers
4. **favorites** - User's saved properties
5. **reviews** - Property reviews and ratings

See `database/SCHEMA.md` for detailed schema information.

## 🔒 Security

- ✅ **Row Level Security (RLS)** - Database-level access control
- ✅ **Supabase Auth** - Secure user authentication
- ✅ **Environment Variables** - Sensitive data in .env files
- ✅ **CORS Protection** - Secure API communication
- ✅ **Image Upload Security** - Validated file uploads to storage

## 🎨 Design System

The application uses Tailwind CSS for styling:
- **Colors**: Blue (#0066cc) as primary, with gray and status colors
- **Typography**: System fonts for optimal performance
- **Spacing**: 8px grid system
- **Components**: Reusable card, button, and input components
- **Responsive**: Mobile-first design approach

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Deploy to Other Platforms
- **AWS Amplify**
- **Firebase Hosting**
- **GitHub Pages**
- **Heroku**

## 🧪 Testing

When testing locally, you can:
1. Create test accounts with different roles
2. Post test properties
3. Send test inquiries
4. Test user workflows

## 📖 Documentation

- [Frontend README](./frontend/README.md) - Detailed frontend documentation
- [Database Schema](./database/SCHEMA.md) - Database structure and policies
- [Setup SQL](./database/setup.sql) - Database initialization queries

## 🤝 Contributing

Contributions are welcome! Please:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Create an issue with details

## 📄 License

MIT License - Free for personal and commercial use

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)
- [React Router](https://reactrouter.com)

## 🎉 Features Roadmap

- [ ] Admin Dashboard
- [ ] Real-time Chat
- [ ] Payment Integration
- [ ] Email Notifications
- [ ] Property Analytics
- [ ] AI Recommendations
- [ ] Virtual Tours
- [ ] Mobile App (React Native)
- [ ] Advanced Reporting

---

**Made with ❤️ for the real estate community**

**Current Version**: 1.0.0
**Last Updated**: April 2024
