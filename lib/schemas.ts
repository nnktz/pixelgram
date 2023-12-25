import { z } from 'zod'

// POST
const postSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

const createPost = postSchema.omit({ id: true })
const updatePost = postSchema
const deletePost = postSchema.pick({ id: true })

const likeSchema = z.object({
  postId: z.string(),
})

const bookmarkSchema = z.object({
  postId: z.string(),
})

// COMMENT
const commentSchema = z.object({
  id: z.string(),
  body: z.string(),
  postId: z.string(),
})

const createComment = commentSchema.omit({ id: true })
const updateComment = commentSchema
const deleteComment = commentSchema.pick({ id: true })

// EXPORTS
export {
  createPost,
  updatePost,
  deletePost,
  postSchema,
  likeSchema,
  bookmarkSchema,
  commentSchema,
  createComment,
  updateComment,
  deleteComment,
}
