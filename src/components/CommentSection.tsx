'use client'

import { useState, useEffect } from 'react'
import { Comment } from '@/lib/mockData'
import { ArrowUp, ArrowDown, Send, Calendar, MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  onNewComment: (comment: Comment) => void
  onCommentUpdate: (comment: Comment) => void
}

interface CommentItemProps {
  comment: Comment
  onUpdate: (comment: Comment) => void
}

// Use a counter for stable ID generation to avoid hydration issues
let commentIdCounter = 2000

function CommentItem({ comment, onUpdate }: CommentItemProps) {
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hasDownvoted, setHasDownvoted] = useState(false)
  const [voting, setVoting] = useState(false)
  const [formattedDate, setFormattedDate] = useState<string>('')

  // Format date on the client side only to prevent hydration issues
  useEffect(() => {
    setFormattedDate(formatDistanceToNow(new Date(comment.created_at), { addSuffix: true }))
  }, [comment.created_at])

  const handleUpvote = () => {
    if (voting) return

    setVoting(true)
    
    // Simulate async operation
    setTimeout(() => {
      let newUpvotes = comment.upvotes
      
      if (hasUpvoted) {
        // Remove upvote
        newUpvotes = comment.upvotes - 1
        setHasUpvoted(false)
      } else {
        // Add upvote (and remove downvote if it exists)
        newUpvotes = hasDownvoted ? comment.upvotes + 2 : comment.upvotes + 1
        setHasUpvoted(true)
        setHasDownvoted(false)
      }
      
      const updatedComment = { ...comment, upvotes: newUpvotes }
      onUpdate(updatedComment)
      setVoting(false)
    }, 200)
  }

  const handleDownvote = () => {
    if (voting) return

    setVoting(true)
    
    // Simulate async operation
    setTimeout(() => {
      let newUpvotes = comment.upvotes
      
      if (hasDownvoted) {
        // Remove downvote
        newUpvotes = comment.upvotes + 1
        setHasDownvoted(false)
      } else {
        // Add downvote (and remove upvote if it exists)
        newUpvotes = hasUpvoted ? comment.upvotes - 2 : comment.upvotes - 1
        setHasDownvoted(true)
        setHasUpvoted(false)
      }
      
      const updatedComment = { ...comment, upvotes: newUpvotes }
      onUpdate(updatedComment)
      setVoting(false)
    }, 200)
  }

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleUpvote}
          disabled={voting}
          className={`p-1 rounded transition-colors ${
            hasUpvoted
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400'
          } ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ArrowUp size={14} />
        </button>
        <span className={`text-xs font-medium min-w-[20px] text-center ${
          hasUpvoted ? 'text-orange-500' : hasDownvoted ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
        }`}>
          {comment.upvotes}
        </span>
        <button
          onClick={handleDownvote}
          disabled={voting}
          className={`p-1 rounded transition-colors ${
            hasDownvoted
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400'
          } ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ArrowDown size={14} />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition-colors">
          <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
            {comment.content}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={12} />
          <span>
            {formattedDate || 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CommentSection({ 
  postId, 
  comments, 
  onNewComment,
  onCommentUpdate
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    
    // Simulate async operation
    setTimeout(() => {
      // Use a stable counter-based ID generation method
      const commentId = `comment-${++commentIdCounter}`
      const timestamp = new Date().toISOString()
      
      const comment: Comment = {
        id: commentId,
        post_id: postId,
        content: newComment.trim(),
        created_at: timestamp,
        upvotes: 0
      }

      onNewComment(comment)
      setNewComment('')
      setSubmitting(false)
    }, 500)
  }

  const handleCommentUpdate = (updatedComment: Comment) => {
    onCommentUpdate(updatedComment)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Comments</h3>

      {/* Add new comment form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <Send size={16} />
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments list */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <MessageCircle size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleCommentUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
} 