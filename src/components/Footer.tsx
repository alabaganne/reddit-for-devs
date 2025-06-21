'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/alabaganne',
    icon: Github
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alabaganne/',
    icon: Linkedin
  },
  {
    name: 'X',
    url: 'https://x.com/alabaganne1999',
    icon: Twitter
  }
]

export default function Footer() {
  return (
    <footer className="w-full mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${link.name}`}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <link.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Ala Baganne. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
} 