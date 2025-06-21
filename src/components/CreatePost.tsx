'use client'

import { useState } from 'react'
import { Post, mockCommunities } from '@/lib/mockData'
import { PlusCircle, X, Hash } from 'lucide-react'

interface CreatePostProps {
  onNewPost: (post: Post) => void
}

// Use a counter for stable ID generation to avoid hydration issues
let postIdCounter = 1000

export default function CreatePost({ onNewPost }: CreatePostProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCommunity, setSelectedCommunity] = useState('1') // Default to Web Development
  const [hashtags, setHashtags] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    
    // Simulate async operation
    setTimeout(() => {
      // Use a stable ID generation method
      const newId = `post-${++postIdCounter}`
      const timestamp = new Date().toISOString()
      
      // Parse hashtags from input
      const hashtagArray = hashtags
        .split(',')
        .map(tag => tag.trim().replace('#', ''))
        .filter(tag => tag.length > 0)
      
      const newPost: Post = {
        id: newId,
        title: title.trim(),
        content: content.trim(),
        created_at: timestamp,
        updated_at: timestamp,
        upvotes: 0,
        communityId: selectedCommunity,
        hashtags: hashtagArray
      }

      onNewPost(newPost)
      setTitle('')
      setContent('')
      setSelectedCommunity('1')
      setHashtags('')
      setIsOpen(false)
      setLoading(false)
    }, 500)
  }

  if (!isOpen) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-4"
        >
          <PlusCircle size={24} />
          <span className="text-lg font-medium">Create New Post</span>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create New Post</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="community" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Community
          </label>
          <select
            id="community"
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
            required
          >
            {mockCommunities.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hashtags
          </label>
          <div className="relative">
            <input
              type="text"
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="react, typescript, webdev (comma separated)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
            />
            <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Separate hashtags with commas. Don&apos;t include the # symbol.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
} 