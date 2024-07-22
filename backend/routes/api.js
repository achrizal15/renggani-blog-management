import express from 'express'
import authRoutes from './authRoutes.js'
import blogRoutes from './blogRoutes.js'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.use('/public',express.static('public'))
router.use('/api',blogRoutes)
router.use('/api',userRoutes)
router.use('/auth',authRoutes)

export default router