import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/random-profile');
	const data = await response.json();

	return {
		profile: data.profile || 'Default system message if profile fetch fails'
	};
};
