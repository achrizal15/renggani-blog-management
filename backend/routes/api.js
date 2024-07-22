import express from 'express'
import authRoutes from './authRoutes.js'
import blogRoutes from './blogRoutes.js'

const router = express.Router()

router.use('/api',blogRoutes)
router.use('/auth',authRoutes)

export default router