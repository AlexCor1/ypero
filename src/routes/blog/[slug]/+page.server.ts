import type { PageServerLoad } from './$types';
import { getPost } from '$lib/blog';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	// Configure marked for clean output
	marked.setOptions({
		gfm: true,
		breaks: true
	});

	const html = await marked.parse(post.content);

	return {
		post: {
			...post,
			html
		}
	};
};
