import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	readingTime: number;
	content: string;
}

export interface BlogPostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	readingTime: number;
}

const POSTS_DIR = join(process.cwd(), 'src', 'content', 'blog');

function estimateReadingTime(text: string): number {
	const words = text.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(words / 220));
}

/**
 * Get all blog post metadata, sorted by date (newest first).
 */
export function getAllPosts(): BlogPostMeta[] {
	let files: string[];
	try {
		files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
	} catch {
		return [];
	}

	const posts: BlogPostMeta[] = files.map((filename) => {
		const raw = readFileSync(join(POSTS_DIR, filename), 'utf-8');
		const { data, content } = matter(raw);

		return {
			slug: filename.replace(/\.md$/, ''),
			title: data.title ?? 'Untitled',
			description: data.description ?? '',
			date: data.date ?? '',
			readingTime: estimateReadingTime(content)
		};
	});

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug with full rendered content.
 */
export function getPost(slug: string): BlogPost | null {
	try {
		const raw = readFileSync(join(POSTS_DIR, `${slug}.md`), 'utf-8');
		const { data, content } = matter(raw);

		return {
			slug,
			title: data.title ?? 'Untitled',
			description: data.description ?? '',
			date: data.date ?? '',
			readingTime: estimateReadingTime(content),
			content
		};
	} catch {
		return null;
	}
}
