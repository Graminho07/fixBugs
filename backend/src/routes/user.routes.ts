import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/userController'

const router = Router()

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)

export default router
