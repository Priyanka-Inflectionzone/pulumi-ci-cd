import { error, type RequestEvent } from '@sveltejs/kit';
import { getUserById } from '../../../api/services/user.service';
import type { PageServerLoad } from './$types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	// const sessionId = event.cookies.get('sessionId');

	try {
		const userId = event.params.id;
		console.log("id---",userId);
		const response = await getUserById(userId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const user = response.user;

		console.log("response-----",response)
		const id = response.user.id;
		return {
			location: `${id}/edit`,
			user,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving user: ${error.message}`);
	}
};