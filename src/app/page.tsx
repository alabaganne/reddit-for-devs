'use client'

import { useState, useMemo, useEffect } from 'react'
import { Post, mockPosts, mockCommunities, mockHashtags } from '@/lib/mockData'
import BlogList from '@/components/BlogList'
import CreatePost from '@/components/CreatePost'
import Pagination from '@/components/Pagination'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type TabType = 'best' | 'today' | 'new'

const POSTS_PER_PAGE = 6
const TOTAL_PAGES = 80 // Assuming 80 pages as requested

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [activeTab, setActiveTab] = useState<TabType>('new')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCommunity, setSelectedCommunity] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts])
    // Reset to first page when new post is added
    setCurrentPage(1)
  }

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ))
  }

  const handlePostDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes - only on client side
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCommunitySelect = (communityId: string) => {
    if (selectedCommunity === communityId) {
      setSelectedCommunity(undefined)
    } else {
      setSelectedCommunity(communityId)
    }
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    setCurrentPage(1)
  }

  const handleHashtagClick = (hashtag: string) => {
    setActiveFilters(prev => {
      if (prev.includes(hashtag)) {
        return prev.filter(h => h !== hashtag)
      } else {
        return [...prev, hashtag]
      }
    })
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCommunity(undefined)
    setActiveFilters([])
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Filter and sort posts based on active tab and filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Apply community filter
    if (selectedCommunity) {
      filtered = filtered.filter(post => post.communityId === selectedCommunity)
    }

    // Apply hashtag filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(post => 
        post.hashtags.some(hashtag => activeFilters.includes(hashtag))
      )
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.hashtags.some(hashtag => hashtag.toLowerCase().includes(query))
      )
    }

    // Use the same fixed reference date as in mockData to avoid hydration issues
    const referenceDate = new Date('2024-01-16T00:00:00Z')
    const todayStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate())
    
    switch (activeTab) {
      case 'best':
        // Sort by upvotes (highest first)
        return filtered.sort((a, b) => b.upvotes - a.upvotes)
      
      case 'today':
        // Filter posts from the reference date, then sort by creation time (newest first)
        return filtered
          .filter(post => {
            const postDate = new Date(post.created_at)
            return postDate >= todayStart && postDate < new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)
          })
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      
      case 'new':
      default:
        // Sort by creation time (newest first)
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  }, [posts, activeTab, selectedCommunity, activeFilters, searchQuery])

  // Paginate the filtered posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage])

  // Calculate actual total pages based on filtered posts
  const actualTotalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  
  // Use the simulated 80 pages for demo, but cap at actual pages for real functionality
  const displayTotalPages = activeTab === 'today' ? actualTotalPages : TOTAL_PAGES

  const tabs = [
    { id: 'new' as TabType, label: 'New', description: 'Latest posts' },
    { id: 'best' as TabType, label: 'Best', description: 'Most upvoted' },
    { id: 'today' as TabType, label: 'Today', description: 'Posted today' }
  ]

  const hasActiveFilters = selectedCommunity || activeFilters.length > 0 || searchQuery

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className={`
          fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:block
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar
            communities={mockCommunities}
            hashtags={mockHashtags}
            selectedCommunity={selectedCommunity}
            onCommunitySelect={handleCommunitySelect}
            onHashtagClick={handleHashtagClick}
            onSearch={handleSearch}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {isSidebarOpen && <div onClick={toggleSidebar} className="lg:hidden fixed inset-0 bg-black/50 z-30" />}

        <main className="flex-1 transition-all duration-300 lg:ml-0">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                  Welcome to <span className="text-yellow-500 underline">Coddit</span> 💻
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors">
                  Share your thoughts and engage with a community of developers.
                </p>
              </header>
              
              <div className="mb-8">
                <CreatePost onNewPost={handleNewPost} />
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Active Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommunity && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                        Community: {mockCommunities.find(c => c.id === selectedCommunity)?.name}
                      </span>
                    )}
                    {activeFilters.map(hashtag => (
                      <span key={hashtag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                        #{hashtag}
                      </span>
                    ))}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                        Search: &ldquo;{searchQuery}&rdquo;
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex-1 px-6 py-4 text-center transition-colors relative ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100'
                        }`}
                      >
                        <div className="font-medium">{tab.label}</div>
                        <div className={`text-xs mt-1 ${
                          activeTab === tab.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {tab.description}
                        </div>
                        {activeTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content Info */}
                <div className="mt-4 text-center">
                  <p className="text-gray-600 dark:text-gray-300 transition-colors">
                    {activeTab === 'best' && `Showing ${paginatedPosts.length} of ${filteredPosts.length} posts sorted by upvotes`}
                    {activeTab === 'today' && `Showing ${paginatedPosts.length} of ${filteredPosts.length} posts from today`}
                    {activeTab === 'new' && `Showing ${paginatedPosts.length} posts from page ${currentPage}`}
                  </p>
                </div>
              </div>
              
              <BlogList 
                posts={paginatedPosts}
                onPostUpdate={handlePostUpdate}
                onPostDelete={handlePostDelete}
                onCommunityClick={handleCommunitySelect}
                onHashtagClick={handleHashtagClick}
              />

              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={displayTotalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  )
}
