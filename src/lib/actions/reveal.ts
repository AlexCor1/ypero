/**
 * Svelte action: use:reveal
 * Adds `.visible` class when element enters viewport.
 * Works with .reveal, .reveal-left, .reveal-right, .reveal-scale classes.
 * Also observes children with those classes (for staggered grids).
 */
export function reveal(node: HTMLElement) {
	const targets: HTMLElement[] = [];

	// Collect the node itself if it has a reveal class
	if (hasRevealClass(node)) {
		targets.push(node);
	}

	// Collect children with reveal classes
	node.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
		targets.push(el);
	});

	if (targets.length === 0) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					(entry.target as HTMLElement).classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
	);

	targets.forEach((el) => observer.observe(el));

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

function hasRevealClass(el: HTMLElement): boolean {
	return (
		el.classList.contains('reveal') ||
		el.classList.contains('reveal-left') ||
		el.classList.contains('reveal-right') ||
		el.classList.contains('reveal-scale')
	);
}
