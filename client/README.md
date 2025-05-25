# Moon People Platform - Frontend Documentation

## Overview

The Moon People platform is a digital sanctuary for cancer patients to connect with volunteers and resources. This document covers the frontend implementation for **Phase 1 (Authentication & Basic Pages)** and **Phase 2 (Support Services Directory)**.

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   └── services/
│   │       ├── CategoryCard.js
│   │       ├── ServiceCard.js
│   │       └── ServiceFilter.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Categories.js
│   │   │   └── Services.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── NeedSupport.js
│   │   ├── NotFound.js
│   │   ├── Profile.js
│   │   ├── Register.js
│   │   ├── ServiceDetail.js
│   │   └── ServiceDirectory.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── admin/
│   │   │   ├── Categories.css
│   │   │   └── Services.css
│   │   ├── CategoryCard.css
│   │   ├── Footer.css
│   │   ├── Header.css
│   │   ├── Home.css
│   │   ├── NeedSupport.css
│   │   ├── ServiceCard.css
│   │   ├── ServiceDetail.css
│   │   ├── ServiceDirectory.css
│   │   └── ServiceFilter.css
│   ├── App.js
│   └── index.css
```

## Phase 1: Authentication & Basic Pages

### Features Implemented

#### Authentication System
- **User Registration**: Full registration form with validation
- **User Login**: Secure login with JWT token storage
- **Protected Routes**: Route protection based on authentication status and admin roles
- **User Profile**: Profile management page
- **Role-based Authorization**: Support for admin and regular user roles

#### Core Pages
- **Homepage**: Redesigned with hero section, mission statement, features, and testimonials
- **About Page**: Information about the platform
- **Contact Page**: Contact information and form
- **404 Page**: Custom not found page

#### Layout Components
- **Header**: Navigation with user authentication status and role-based menu items
- **Footer**: Enhanced footer with navigation sections and contact information

### Key Components

#### AuthContext (`src/context/AuthContext.js`)
Provides authentication state management throughout the application:
- User login/logout functionality
- Token management
- User role tracking
- Authentication status

#### ProtectedRoute (`src/components/auth/ProtectedRoute.js`)
Route protection component that:
- Checks authentication status
- Supports admin-only routes
- Redirects unauthorized users

#### API Service (`src/services/api.js`)
Centralized API communication service with methods for:
- Authentication (login, register, profile)
- Categories (CRUD operations)
- Services (CRUD operations with filtering)

## Phase 2: Support Services Directory

### Features Implemented

#### Service Directory Flow
- **Landing Page**: "I Need Support" page with service options
- **Service Directory**: Searchable and filterable service listings
- **Service Details**: Detailed view of individual services
- **Category Browsing**: Category-based service exploration

#### Admin Management
- **Category Management**: Admin interface for creating, editing, and managing service categories
- **Service Management**: Admin interface for managing service listings
- **Status Control**: Ability to activate/deactivate categories and services

### Key Components

#### Service Components
- **CategoryCard** (`src/components/services/CategoryCard.js`): Reusable card component for displaying service categories with icons
- **ServiceCard** (`src/components/services/ServiceCard.js`): Card component for service listings with provider, location, and category information
- **ServiceFilter** (`src/components/services/ServiceFilter.js`): Filter component with dropdowns for category, city, and language filtering

#### Pages
- **NeedSupport** (`src/pages/NeedSupport.js`): Landing page for users seeking support
- **ServiceDirectory** (`src/pages/ServiceDirectory.js`): Main directory with filtering and category browsing
- **ServiceDetail** (`src/pages/ServiceDetail.js`): Detailed service information page

#### Admin Pages
- **Categories** (`src/pages/admin/Categories.js`): Category management interface with CRUD operations
- **Services** (`src/pages/admin/Services.js`): Service management interface with comprehensive admin controls

## Design System

### Color Palette
- **Primary Purple**: `#5A2A8C` - Main actions and headings
- **Warm Coral**: `#F27D72` - Secondary elements and delete buttons
- **Soft Ivory**: `#FFF8ED` - Backgrounds
- **Deep Charcoal**: `#2D2D2D` - Text
- **Sage Green**: `#7BAE7F` - Edit buttons
- **Soft Lavender**: `#E2D9F3` - Borders and highlights

### Typography
- **Headings**: Montserrat font family
- **Body Text**: Open Sans font family
- Consistent font weights and sizes for readability

### UI Components
- **Rounded Corners**: 8px border radius for consistency
- **Soft Shadows**: Subtle drop shadows for depth
- **Ample Padding**: Comfortable spacing throughout
- **Responsive Design**: Mobile-first approach with breakpoints

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```

## Key Features

### Authentication Flow
1. Users can register with email and password
2. Login provides JWT token stored in localStorage
3. Protected routes check authentication status
4. Admin routes require admin role

### Service Directory Flow
1. Users start at "I Need Support" landing page
2. Can browse by category or use filters
3. Service cards show essential information
4. Detail pages provide comprehensive service information
5. Only active services and categories are displayed to users

### Admin Management
1. Admin users can access admin routes
2. Category management with activation/deactivation
3. Service management with full CRUD operations
4. Real-time UI updates after state changes

## Technical Implementation

### State Management
- React Context for authentication state
- Local component state for UI interactions
- API calls with proper error handling

### Responsive Design
- Mobile-first CSS approach
- Flexbox and CSS Grid for layouts
- Media queries for different screen sizes

### Accessibility
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance

### Performance Considerations
- Component-based architecture for reusability
- Efficient re-rendering with proper state management
- Optimized API calls with error handling
- CSS organization for maintainability

## Testing Status

### Completed & Verified
- ✅ User registration and login
- ✅ Protected route functionality
- ✅ Admin role-based access
- ✅ Service directory filtering
- ✅ Category management
- ✅ Service management
- ✅ Active/inactive status filtering
- ✅ Responsive design across devices
- ✅ Integration between admin and user interfaces

### Known Issues Resolved
- Fixed service visibility filtering in user directory
- Resolved admin service management data structure consistency
- Fixed CSS import errors in admin components
- Corrected routing for admin pages

## Next Phase

**Phase 3: Resource Library** will include:
- Resource management system
- Document and media library
- Search and categorization for resources
- User-friendly resource browsing interface

The patterns established in Phase 2 for service management will be leveraged for efficient resource management development.

## Contributing

When working on the frontend:
1. Follow the established component structure
2. Use the defined color palette and typography
3. Ensure responsive design for all new components
4. Add proper error handling for API interactions
5. Test both user and admin interfaces thoroughly
6. Maintain consistency with existing UI patterns