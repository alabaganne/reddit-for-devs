export interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  color: string
}

export interface Post {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  upvotes: number
  communityId: string
  hashtags: string[]
}

export interface Comment {
  id: string
  post_id: string
  content: string
  created_at: string
  upvotes: number
}

export interface Hashtag {
  name: string
  searchCount: number
  lastSearched: string
}

// Use static timestamps to avoid hydration issues
const getStaticTodayTime = (hours: number, minutes: number = 0) => {
  // Use a fixed date instead of new Date() to prevent hydration mismatches
  const fixedDate = new Date('2024-01-16T00:00:00Z') // Fixed reference date
  fixedDate.setHours(hours, minutes, 0, 0)
  return fixedDate.toISOString()
}

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Everything about modern web development',
    memberCount: 1247,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'React',
    description: 'React ecosystem and best practices',
    memberCount: 892,
    color: 'bg-cyan-500'
  },
  {
    id: '3',
    name: 'TypeScript',
    description: 'TypeScript tips, tricks, and discussions',
    memberCount: 654,
    color: 'bg-blue-600'
  },
  {
    id: '4',
    name: 'UI/UX Design',
    description: 'User interface and experience design',
    memberCount: 445,
    color: 'bg-purple-500'
  },
  {
    id: '5',
    name: 'DevOps',
    description: 'Development operations and deployment',
    memberCount: 567,
    color: 'bg-green-500'
  },
  {
    id: '6',
    name: 'JavaScript',
    description: 'JavaScript language and ecosystem',
    memberCount: 1103,
    color: 'bg-yellow-500'
  }
]

export const mockHashtags: Hashtag[] = [
  {
    name: 'react',
    searchCount: 156,
    lastSearched: '2024-01-16T10:30:00Z'
  },
  {
    name: 'typescript',
    searchCount: 89,
    lastSearched: '2024-01-16T09:15:00Z'
  },
  {
    name: 'nextjs',
    searchCount: 67,
    lastSearched: '2024-01-16T08:45:00Z'
  },
  {
    name: 'tailwind',
    searchCount: 45,
    lastSearched: '2024-01-16T07:20:00Z'
  },
  {
    name: 'docker',
    searchCount: 34,
    lastSearched: '2024-01-16T06:10:00Z'
  }
]

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to Our Blog Community!',
    content: `Hey everyone!

I'm excited to share this new blog platform with you all. This is a place where we can share ideas, have meaningful discussions, and learn from each other.

Feel free to upvote posts you enjoy and add your thoughts in the comments. Let's build an amazing community together!

What topics would you like to see more of here?`,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    upvotes: 42,
    communityId: '1',
    hashtags: ['welcome', 'community', 'discussion']
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    content: `The web development landscape is evolving rapidly. Here are some trends I'm excited about:

Server Components in React: Game-changing for performance
Edge Computing: Bringing computation closer to users
CSS Container Queries: Responsive design just got better
Zero-Trust Security: Essential for modern applications

What emerging technologies are you most excited about? Let me know in the comments!`,
    created_at: '2024-01-14T15:45:00Z',
    updated_at: '2024-01-14T15:45:00Z',
    upvotes: 28,
    communityId: '1',
    hashtags: ['webdev', 'trends', 'react', 'css']
  },
  {
    id: '3',
    title: 'Building Better User Experiences',
    content: `User experience isn't just about pretty interfaces. It's about creating meaningful interactions that solve real problems.

Some key principles I follow:
- Start with user research
- Design for accessibility
- Test early and often
- Keep it simple
- Listen to feedback

The best products are those that users don't even think about - they just work seamlessly.

What's your approach to UX design?`,
    created_at: '2024-01-13T09:20:00Z',
    updated_at: '2024-01-13T09:20:00Z',
    upvotes: 15,
    communityId: '4',
    hashtags: ['ux', 'design', 'accessibility', 'research']
  },
  // Static "today" posts to avoid hydration issues
  {
    id: '4',
    title: 'Just Launched: New Tab Feature!',
    content: `Excited to announce that we've just added tab functionality to our blog platform!

Now you can:
View posts by "New" (latest first)
Check "Best" posts (most upvoted)
See "Today" posts (submitted today)

This makes it so much easier to discover content that matters to you. Try switching between the tabs and let me know what you think!`,
    created_at: getStaticTodayTime(16, 0), // 4:00 PM on fixed date
    updated_at: getStaticTodayTime(16, 0),
    upvotes: 67,
    communityId: '1',
    hashtags: ['feature', 'launch', 'tabs', 'ui']
  },
  {
    id: '5',
    title: 'Quick Tips for Better Code Reviews',
    content: `Code reviews are crucial for maintaining quality. Here are some quick tips:

Be thorough but kind - Focus on the code, not the person
Look for logic errors - Don't just check syntax
Share knowledge - Explain why you suggest changes
Be timely - Don't let PRs sit too long
Focus on what matters - Not every style preference needs a comment

What's your code review process like?`,
    created_at: getStaticTodayTime(14, 30), // 2:30 PM on fixed date
    updated_at: getStaticTodayTime(14, 30),
    upvotes: 23,
    communityId: '5',
    hashtags: ['codereview', 'tips', 'quality', 'collaboration']
  },
  {
    id: '6',
    title: 'Morning Coffee Thoughts',
    content: `Sitting with my morning coffee and thinking about how much I love building things that people actually use.

There's something magical about creating a feature, shipping it, and then seeing real people interact with it. Every click, every comment, every upvote represents a real human on the other side.

What motivates you in your work?`,
    created_at: getStaticTodayTime(8, 15), // 8:15 AM on fixed date
    updated_at: getStaticTodayTime(8, 15),
    upvotes: 89,
    communityId: '1',
    hashtags: ['motivation', 'coffee', 'reflection', 'community']
  }
]

export const mockComments: Comment[] = [
  {
    id: '1',
    post_id: '1',
    content: 'This is exactly what the community needed! Looking forward to more discussions about React and Next.js.',
    created_at: '2024-01-15T11:30:00Z',
    upvotes: 8
  },
  {
    id: '2',
    post_id: '1',
    content: 'Love the welcoming atmosphere here. I\'d love to see more content about TypeScript best practices!',
    created_at: '2024-01-15T12:15:00Z',
    upvotes: 5
  },
  {
    id: '3',
    post_id: '2',
    content: 'Server Components have been a game-changer for my projects. The performance improvements are incredible!',
    created_at: '2024-01-14T16:30:00Z',
    upvotes: 12
  },
  {
    id: '4',
    post_id: '2',
    content: 'CSS Container Queries are so underrated. They\'ve simplified my responsive design workflow significantly.',
    created_at: '2024-01-14T17:45:00Z',
    upvotes: 7
  },
  {
    id: '5',
    post_id: '3',
    content: 'User research is definitely the foundation of good UX. No amount of beautiful design can fix a misunderstood problem.',
    created_at: '2024-01-13T10:15:00Z',
    upvotes: 9
  },
  // Comments for "today's" posts with static timestamps
  {
    id: '6',
    post_id: '4',
    content: 'Love the new tabs! The "Best" tab is perfect for discovering quality content.',
    created_at: getStaticTodayTime(12, 45), // 12:45 PM on fixed date
    upvotes: 15
  },
  {
    id: '7',
    post_id: '5',
    content: 'Great tips! I especially agree about being timely with reviews. Nothing kills momentum like stale PRs.',
    created_at: getStaticTodayTime(15, 20), // 3:20 PM on fixed date
    upvotes: 6
  },
  {
    id: '8',
    post_id: '6',
    content: 'This resonates so much! There\'s nothing like seeing your creation come to life through user interactions.',
    created_at: getStaticTodayTime(9, 30), // 9:30 AM on fixed date
    upvotes: 11
  }
] 