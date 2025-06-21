'use client'

import { Post } from '@/lib/mockData'
import BlogPost from './BlogPost'

interface BlogListProps {
  posts: Post[]
  onPostUpdate: (post: Post) => void
  onPostDelete: (postId: string) => void
  onCommunityClick?: (communityId: string) => void
  onHashtagClick?: (hashtag: string) => void
}

export default function BlogList({ posts, onPostUpdate, onPostDelete, onCommunityClick, onHashtagClick }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to share your thoughts with the community!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          post={post}
          onUpdate={onPostUpdate}
          onDelete={onPostDelete}
          onCommunityClick={onCommunityClick}
          onHashtagClick={onHashtagClick}
        />
      ))}
    </div>
  )
} 