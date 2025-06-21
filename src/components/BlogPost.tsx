'use client'

import { useState, useEffect } from 'react'
import { Post, Comment, mockComments, mockCommunities } from '@/lib/mockData'
import { ArrowUp, ArrowDown, MessageCircle, Calendar, Hash, Users } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import CommentSection from './CommentSection'

interface BlogPostProps {
  post: Post
  onUpdate: (post: Post) => void
  onDelete: (postId: string) => void
  onCommunityClick?: (communityId: string) => void
  onHashtagClick?: (hashtag: string) => void
}

export default function BlogPost({ post, onUpdate, onCommunityClick, onHashtagClick }: BlogPostProps) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter(comment => comment.post_id === post.id)
  )
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hasDownvoted, setHasDownvoted] = useState(false)
  const [voting, setVoting] = useState(false)
  const [formattedDate, setFormattedDate] = useState<string>('')

  // Get community info
  const community = mockCommunities.find(c => c.id === post.communityId)

  // Format date on the client side only to prevent hydration issues
  useEffect(() => {
    setFormattedDate(formatDistanceToNow(new Date(post.created_at), { addSuffix: true }))
  }, [post.created_at])

  const handleUpvote = () => {
    if (voting) return

    setVoting(true)
    
    // Simulate async operation
    setTimeout(() => {
      let newUpvotes = post.upvotes
      
      if (hasUpvoted) {
        // Remove upvote
        newUpvotes = post.upvotes - 1
        setHasUpvoted(false)
      } else {
        // Add upvote (and remove downvote if it exists)
        newUpvotes = hasDownvoted ? post.upvotes + 2 : post.upvotes + 1
        setHasUpvoted(true)
        setHasDownvoted(false)
      }
      
      const updatedPost = { ...post, upvotes: newUpvotes }
      onUpdate(updatedPost)
      setVoting(false)
    }, 200)
  }

  const handleDownvote = () => {
    if (voting) return

    setVoting(true)
    
    // Simulate async operation
    setTimeout(() => {
      let newUpvotes = post.upvotes
      
      if (hasDownvoted) {
        // Remove downvote
        newUpvotes = post.upvotes + 1
        setHasDownvoted(false)
      } else {
        // Add downvote (and remove upvote if it exists)
        newUpvotes = hasUpvoted ? post.upvotes - 2 : post.upvotes - 1
        setHasDownvoted(true)
        setHasUpvoted(false)
      }
      
      const updatedPost = { ...post, upvotes: newUpvotes }
      onUpdate(updatedPost)
      setVoting(false)
    }, 200)
  }

  const handleNewComment = (newComment: Comment) => {
    setComments([...comments, newComment])
  }

  const handleCommentUpdate = (updatedComment: Comment) => {
    setComments(comments.map(comment => 
      comment.id === updatedComment.id ? updatedComment : comment
    ))
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={handleUpvote}
              disabled={voting}
              className={`p-2 rounded-full transition-colors ${
                hasUpvoted
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400'
              } ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowUp size={20} />
            </button>
            <span className={`text-sm font-medium min-w-[24px] text-center ${
              hasUpvoted ? 'text-orange-500' : hasDownvoted ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {post.upvotes}
            </span>
            <button
              onClick={handleDownvote}
              disabled={voting}
              className={`p-2 rounded-full transition-colors ${
                hasDownvoted
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400'
              } ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowDown size={20} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            {/* Community Badge */}
            {community && (
              <div className="mb-3">
                <button
                  onClick={() => onCommunityClick?.(community.id)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${community.color}`}></div>
                  <Users size={14} />
                  {community.name}
                </button>
              </div>
            )}

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
              {post.title}
            </h2>
            
            <div className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            {/* Hashtags */}
            {post.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.hashtags.map((hashtag) => (
                  <button
                    key={hashtag}
                    onClick={() => onHashtagClick?.(hashtag)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <Hash size={12} />
                    {hashtag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>
                  {formattedDate || 'Loading...'}
                </span>
              </div>

              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded-md transition-all duration-200 transform hover:scale-105"
              >
                <MessageCircle size={16} />
                <span>
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {showComments && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <CommentSection
              postId={post.id}
              comments={comments}
              onNewComment={handleNewComment}
              onCommentUpdate={handleCommentUpdate}
            />
          </div>
        )}
      </div>
    </article>
  )
} 