import express, { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

//json
app.use(express.json())

//cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

//test api
app.get('/test', (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'API is working' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

//get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

//get user by id
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

//create user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email
      }
    })
    res.status(201).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

//update user
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        name: req.body.name,
        email: req.body.email
      }
    })
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

//delete user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

//start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
