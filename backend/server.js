import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import routes
import residentVisitorRoutes from './routes/residents/visitors.js'
import residentPaymentRoutes from './routes/residents/payments.js'
import residentStaffRoutes from './routes/residents/staff.js'
import residentServiceRoutes from './routes/residents/services.js'
import residentSosRoutes from './routes/residents/sos.js'
import residentNoticeRoutes from './routes/residents/notices.js'
import residentForumRoutes from './routes/residents/forums.js'

import managementInvoiceRoutes from './routes/management/invoices.js'
import managementComplaintRoutes from './routes/management/complaints.js'
import managementAmenityRoutes from './routes/management/amenities.js'
import managementCommunicationRoutes from './routes/management/communications.js'
import managementAssetRoutes from './routes/management/assets.js'
import managementVendorRoutes from './routes/management/vendors.js'

import securityGateRoutes from './routes/security/gate.js'
import securityBiometricRoutes from './routes/security/biometric.js'
import securityPatrolRoutes from './routes/security/patrol.js'
import securityOverstayRoutes from './routes/security/overstay.js'
import securityVehicleRoutes from './routes/security/vehicles.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Resident Routes
app.use('/api/residents/visitors', residentVisitorRoutes)
app.use('/api/residents/payments', residentPaymentRoutes)
app.use('/api/residents/staff', residentStaffRoutes)
app.use('/api/residents/services', residentServiceRoutes)
app.use('/api/residents/sos', residentSosRoutes)
app.use('/api/residents/notices', residentNoticeRoutes)
app.use('/api/residents/forums', residentForumRoutes)

// Management Routes
app.use('/api/management/invoices', managementInvoiceRoutes)
app.use('/api/management/complaints', managementComplaintRoutes)
app.use('/api/management/amenities', managementAmenityRoutes)
app.use('/api/management/communications', managementCommunicationRoutes)
app.use('/api/management/assets', managementAssetRoutes)
app.use('/api/management/vendors', managementVendorRoutes)

// Security Routes
app.use('/api/security/gate', securityGateRoutes)
app.use('/api/security/biometric', securityBiometricRoutes)
app.use('/api/security/patrol', securityPatrolRoutes)
app.use('/api/security/overstay', securityOverstayRoutes)
app.use('/api/security/vehicles', securityVehicleRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Society Pluss API running on port ${PORT}`)
})

export default app
