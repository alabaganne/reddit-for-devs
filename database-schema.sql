-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posts table
CREATE TABLE posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    upvotes INTEGER DEFAULT 0 NOT NULL
);

-- Create comments table
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    upvotes INTEGER DEFAULT 0 NOT NULL
);

-- Create post_upvotes table (for tracking individual user upvotes)
CREATE TABLE post_upvotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    UNIQUE(post_id, user_id)
);

-- Create comment_upvotes table (for tracking individual user upvotes)
CREATE TABLE comment_upvotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    UNIQUE(comment_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);
CREATE INDEX idx_post_upvotes_post_id ON post_upvotes(post_id);
CREATE INDEX idx_post_upvotes_user_id ON post_upvotes(user_id);
CREATE INDEX idx_comment_upvotes_comment_id ON comment_upvotes(comment_id);
CREATE INDEX idx_comment_upvotes_user_id ON comment_upvotes(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_upvotes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your authentication setup)
-- These policies allow anyone to read and write (suitable for a public blog)
-- You should modify these based on your authentication requirements

-- Posts policies
CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update posts" ON posts FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete posts" ON posts FOR DELETE USING (true);

-- Comments policies
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update comments" ON comments FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete comments" ON comments FOR DELETE USING (true);

-- Post upvotes policies
CREATE POLICY "Anyone can view post upvotes" ON post_upvotes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert post upvotes" ON post_upvotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete post upvotes" ON post_upvotes FOR DELETE USING (true);

-- Comment upvotes policies
CREATE POLICY "Anyone can view comment upvotes" ON comment_upvotes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert comment upvotes" ON comment_upvotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete comment upvotes" ON comment_upvotes FOR DELETE USING (true);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at for posts
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 