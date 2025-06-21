'use client'

import { Community, Hashtag } from '@/lib/mockData'
import { Users, Hash, Search, X } from 'lucide-react'

interface SidebarProps {
  communities: Community[]
  hashtags: Hashtag[]
  selectedCommunity?: string
  onCommunitySelect: (communityId: string) => void
  onHashtagClick: (hashtag: string) => void
  onSearch: (query: string) => void
  onToggleSidebar: () => void
}

export default function Sidebar({
  communities,
  hashtags,
  selectedCommunity,
  onCommunitySelect,
  onHashtagClick,
  onSearch,
  onToggleSidebar
}: SidebarProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search</h3>
        <button 
          onClick={onToggleSidebar} 
          className="lg:hidden p-2 -mr-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search posts, communities..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>
      
      {/* Communities */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="h-5 w-5" />
          Communities
        </h3>
        <div className="space-y-3">
          {communities.map((community) => (
            <div
              key={community.id}
              onClick={() => onCommunitySelect(community.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedCommunity === community.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${community.color}`}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {community.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {community.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {community.memberCount.toLocaleString()} members
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Hashtags */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Recent Hashtags
        </h3>
        <div className="space-y-2">
          {hashtags.map((hashtag) => (
            <div
              key={hashtag.name}
              onClick={() => onHashtagClick(hashtag.name)}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  #{hashtag.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {hashtag.searchCount} searches
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 