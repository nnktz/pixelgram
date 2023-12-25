import { z } from 'zod'

const postSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

const createPost = postSchema.omit({ id: true })
const updatePost = postSchema
const deletePost = postSchema.pick({ id: true })

export { createPost, updatePost, deletePost, postSchema }
