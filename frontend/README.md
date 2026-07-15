# Society Pluss - Real Estate Platform

A modern, full-featured real estate platform built with React and Supabase. Buy, sell, and rent properties with ease.

## Features

✅ **Property Listings**
- Browse properties by type, status, location, and price
- Detailed property information with images
- Advanced search and filtering
- Mark properties as favorites

✅ **User Management**
- User authentication with Supabase
- User profiles and dashboards
- Property ownership and management
- User roles (buyer, seller, agent, admin)

✅ **Inquiry System**
- Send inquiries to property owners
- Track inquiry status
- Manage multiple inquiries

✅ **Responsive Design**
- Mobile-friendly interface
- Optimized for all screen sizes
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Supabase (Firebase Alternative)
- **Database**: PostgreSQL (via Supabase)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── context/          # State management
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html

database/
├── SCHEMA.md             # Database schema documentation
└── setup.sql             # SQL setup script
```

## Installation

### Prerequisites
- Node.js >= 16
- npm or yarn
- Supabase account

### Setup Steps

1. **Clone/Create Project**
```bash
cd society-pluss/frontend
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

3. **Setup Database**
- Go to Supabase Dashboard
- Open SQL Editor
- Copy and run the queries from `database/setup.sql`
- Create two Storage buckets: `property-images` and `profile-pictures`

4. **Start Development Server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Key Pages

- **Home** (`/`) - Homepage with featured properties
- **Browse Properties** (`/properties`) - All properties with filters
- **Property Details** (`/property/:id`) - Detailed property page
- **My Favorites** (`/favorites`) - Saved favorite properties
- **Inquiries** (`/my-inquiries`) - Property inquiry management
- **Dashboard** (`/dashboard`) - User profile and property management
- **Post Property** (`/add-property`) - List new property
- **Login** (`/login`) - User authentication
- **Sign Up** (`/signup`) - User registration

## API Services

### authService
- signUp, signIn, signOut
- getCurrentUser, resetPassword, updatePassword
- onAuthStateChange

### propertyService
- getProperties, getPropertyById
- createProperty, updateProperty, deleteProperty
- uploadPropertyImage, deletePropertyImage

### userService
- getUserProfile, createUserProfile, updateUserProfile
- uploadProfilePicture

### inquiryService
- getInquiries, getPropertyInquiries
- createInquiry, updateInquiry, deleteInquiry

### favoritesService
- getFavorites, addFavorite, removeFavorite
- isFavorite

## State Management

Using Zustand for lightweight state:

- `useAuthStore` - Authentication state
- `usePropertyStore` - Property listing and filters
- `useFavoritesStore` - User favorites

## Styling

- Tailwind CSS for utility-first styling
- Custom components in `src/styles/index.css`
- Responsive grid layouts
- Dark mode ready

## Database Schema

See `database/SCHEMA.md` for detailed schema information including:
- Tables and their relationships
- Row Level Security policies
- Storage buckets configuration

## Deployment

### Frontend (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy the dist/ folder
```

### Environment Variables
Set the same environment variables in your hosting platform's settings.

## Security Considerations

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Authentication required for sensitive operations
- ✅ Image uploads to secure storage bucket
- ✅ Password securely managed by Supabase Auth
- ✅ Sensitive data protected by RLS policies

## Future Enhancements

- [ ] Real-time chat between users
- [ ] Payment integration
- [ ] Property analytics and statistics
- [ ] Email notifications
- [ ] Admin panel
- [ ] Mobile app (React Native)
- [ ] AI-powered property recommendations
- [ ] Virtual property tours
- [ ] Review and rating system

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the real estate community**
