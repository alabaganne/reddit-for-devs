# Blog Community App

A modern blog application built with Next.js, Supabase, and Tailwind CSS featuring upvoting and comments functionality.

## Features

- ✨ **Create Posts**: Share your thoughts with the community
- 🔥 **Upvoting System**: Upvote posts and comments
- 💬 **Comments Section**: Engage with posts through comments
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ⚡ **Real-time Updates**: Powered by Supabase
- 🎨 **Modern UI**: Clean design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js 18 or later
- A Supabase account and project

### Installation

1. **Clone and setup the project** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd reddit-clone
   npm install
   ```

2. **Set up Supabase**:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of `database-schema.sql`
   - Run the SQL to create all necessary tables and policies

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000) to see the app!

## Database Schema

The app uses four main tables:

- **posts**: Stores blog posts with title, content, and upvote count
- **comments**: Stores comments linked to posts with upvote count
- **post_upvotes**: Tracks individual user upvotes on posts
- **comment_upvotes**: Tracks individual user upvotes on comments

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page component
│   └── layout.tsx            # Root layout
├── components/
│   ├── BlogList.tsx          # Displays list of blog posts
│   ├── BlogPost.tsx          # Individual blog post component
│   ├── CreatePost.tsx        # Form for creating new posts
│   └── CommentSection.tsx    # Comments display and form
└── lib/
    └── supabase.ts           # Supabase client configuration
```

## Key Features Explained

### Upvoting System
- Users can upvote both posts and comments
- Upvote counts are displayed next to each item
- Visual feedback when items are upvoted

### Comments
- Expandable comment sections for each post
- Real-time comment count display
- Nested comment display with timestamps

### Responsive Design
- Mobile-first approach
- Clean, modern interface
- Smooth animations and transitions

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize the look by:
- Modifying the Tailwind configuration in `tailwind.config.ts`
- Updating component styles in the respective component files

### Database Policies
The current setup allows public read/write access. For production, consider:
- Implementing user authentication
- Updating Row Level Security policies in Supabase
- Adding user ownership checks

### Adding Features
Some ideas for extending the app:
- User authentication and profiles
- Post categories/tags
- Search functionality
- Rich text editor
- Image uploads
- Email notifications

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have questions or need help:
- Check the [Supabase documentation](https://supabase.com/docs)
- Review the [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the beautiful icons
