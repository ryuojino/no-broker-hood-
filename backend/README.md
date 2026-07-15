# Society Pluss Backend API

Complete API backend for the Society Pluss gated community management system. This Express.js server provides all endpoints for managing residents, property management, and security operations.

## Features

### Resident APIs (7 modules)
- **Visitors** - Pre-authorize guests, record check-in/out, manage visits
- **Payments** - Record maintenance, utility, rent bills with multiple payment methods
- **Staff** - Track domestic staff attendance and working hours
- **Services** - Request home services (cleaning, plumbing, electrical, etc.)
- **SOS** - Emergency alerts to security and emergency contacts
- **Notices** - Community notice board for announcements
- **Forums** - Community discussion forums and Q&A

### Management APIs (6 modules)
- **Invoices** - Generate GST-compliant invoices, track payments
- **Complaints** - Digital help desk with priority levels and assignment
- **Amenities** - Manage facility bookings (clubhouse, gym, pool, tennis courts)
- **Communications** - Send broadcasts and schedule meetings
- **Assets** - Track society assets and maintenance history
- **Vendors** - Manage vendor relationships and payments

### Security APIs (5 modules)
- **Gate Control** - Digital gate entry/exit logs with visitor tracking
- **Biometric** - Fingerprint/face-based staff attendance
- **Patrol** - Guard patrol route management with checkpoint logging
- **Overstay Alerts** - Automatic alerts for visitor overstays
- **Vehicles** - Vehicle registration and violation tracking

## Project Structure

```
backend/
├── server.js                 # Main Express server
├── package.json              # Dependencies
├── .env.example              # Environment variables template
└── routes/
    ├── residents/
    │   ├── visitors.js       # 8 endpoints
    │   ├── payments.js       # 7 endpoints
    │   ├── staff.js          # 6 endpoints
    │   ├── services.js       # 7 endpoints
    │   ├── sos.js            # 6 endpoints
    │   ├── notices.js        # 5 endpoints
    │   └── forums.js         # 7 endpoints
    ├── management/
    │   ├── invoices.js       # 7 endpoints
    │   ├── complaints.js     # 7 endpoints
    │   ├── amenities.js      # 7 endpoints
    │   ├── communications.js # 7 endpoints
    │   ├── assets.js         # 6 endpoints
    │   └── vendors.js        # 7 endpoints
    └── security/
        ├── gate.js           # 8 endpoints
        ├── biometric.js      # 7 endpoints
        ├── patrol.js         # 7 endpoints
        ├── overstay.js       # 7 endpoints
        └── vehicles.js       # 7 endpoints
```

## Installation

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
- `PORT` - Server port (default: 5000)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase API key
- `JWT_SECRET` - Secret key for JWT tokens
- Other optional services (Email, SMS, Payment, Clerk)

### 4. Start Server
```bash
npm run dev      # Development server with auto-reload
npm start        # Production server
```

Server will run on `http://localhost:5000`

## API Routes Overview

### Resident Routes
```
GET/POST  /api/residents/visitors/*
GET/POST  /api/residents/payments/*
GET/POST  /api/residents/staff/*
GET/POST  /api/residents/services/*
GET/POST  /api/residents/sos/*
GET/POST  /api/residents/notices/*
GET/POST  /api/residents/forums/*
```

### Management Routes
```
GET/POST  /api/management/invoices/*
GET/POST  /api/management/complaints/*
GET/POST  /api/management/amenities/*
GET/POST  /api/management/communications/*
GET/POST  /api/management/assets/*
GET/POST  /api/management/vendors/*
```

### Security Routes
```
GET/POST  /api/security/gate/*
GET/POST  /api/security/biometric/*
GET/POST  /api/security/patrol/*
GET/POST  /api/security/overstay/*
GET/POST  /api/security/vehicles/*
```

## Common Endpoints (Available in Each Module)

**List/Retrieve:**
- `GET /api/<module>/<type>/` - Get all records
- `GET /api/<module>/<type>/:id` - Get by ID

**Create:**
- `POST /api/<module>/<type>/create` - Create new record
- `POST /api/<module>/<type>/add` - Add new record

**Update:**
- `PUT /api/<module>/<type>/:id/update` - Update record
- `PUT /api/<module>/<type>/:id/status` - Update status

**Delete:**
- `DELETE /api/<module>/<type>/:id` - Delete record

## Health Check

```bash
curl http://localhost:5000/health
```

Response: `{ "status": "Server is running" }`

## Frontend Integration

### Update Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### Update Frontend Services
Update service files in `frontend/src/services/`:
- `residentService.js`
- `managementService.js`
- `securityService.js`

Example service update:
```javascript
// Before
const API_URL = 'http://localhost:5000'

// After
const API_URL = process.env.VITE_API_URL

// All API calls will now point to your backend
export const preAuthorizeVisitor = async (visitorData) => {
  return axios.post(`${API_URL}/api/residents/visitors/pre-authorize`, visitorData)
}
```

## Database Schema

The API expects the following tables in Supabase:

### Core Tables
- `users` - User profiles with role (resident/management/security)
- `properties` - Property/unit details
- `residents` - Resident information

### Resident Tables
- `visitors` - Visitor pre-authorizations and records
- `payments` - Payment history
- `staff_records` - Domestic staff information
- `service_requests` - Home service requests
- `sos_alerts` - Emergency alerts
- `notices` - Community notices
- `forum_discussions` - Forum posts and replies

### Management Tables
- `invoices` - Generated invoices
- `complaints` - Complaint tickets
- `amenities` - Facility details
- `bookings` - Amenity bookings
- `communications` - Broadcasts and meetings
- `assets` - Society assets
- `vendors` - Vendor information

### Security Tables
- `gate_entries` - Entry/exit logs
- `biometric_records` - Staff biometric data
- `patrol_routes` - Patrol route definitions
- `patrol_logs` - Checkpoint logs
- `overstay_alerts` - Overstay notifications
- `vehicles` - Registered vehicles
- `vehicle_violations` - Vehicle violations

## Error Handling

All endpoints return standardized response format:

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Middleware

- **CORS** - Cross-origin requests enabled
- **JSON Parser** - Automatic request body parsing
- **Error Handler** - Global error catching and logging
- **404 Handler** - Undefined route handling

## Development

### Hot Reload
```bash
npm run dev
```
Uses `nodemon` for automatic restart on file changes

### Testing Endpoints
Use tools like:
- Postman
- Thunder Client
- curl commands
- REST Client extension

## Future Enhancements

- [ ] Database schema implementation with Supabase
- [ ] Authentication middleware with JWT/Clerk
- [ ] Request validation with Joi/Yup
- [ ] Rate limiting
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit tests with Jest
- [ ] Email notification service
- [ ] SMS notifications
- [ ] Payment gateway integration
- [ ] Real-time updates with WebSockets
- [ ] File upload handling
- [ ] Audit logging

## Troubleshooting

**Port already in use:**
```bash
# Kill existing process
npx kill-port 5000

# Or use different port
PORT=3001 npm run dev
```

**CORS errors:**
Check that frontend `.env` has correct `VITE_API_URL`

**Module not found:**
```bash
npm install
```

**Dependencies conflict:**
```bash
npm install --legacy-peer-deps
```

## Support

For issues or questions, refer to:
- Frontend documentation: `frontend/README.md`
- Database schema: `database/SCHEMA.md`
- Implementation guide: `IMPLEMENTATION_COMPLETE.md`
