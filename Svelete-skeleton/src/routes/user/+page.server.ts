import {redirect, type RequestEvent } from "@sveltejs/kit";
import { registerUser } from "../api/services/user.service";

export const actions = {

	createUser: async (event: RequestEvent) => {

		const request = event.request;

		const data = await request.formData();
		console.log("Form data", Object.fromEntries(data));

		const firstName = data.has('firstName') ? data.get('firstName') : null;
		const email = data.has('email') ? data.get('email') : null;
	

		const response = await registerUser(
			firstName.valueOf() as string,
			email.valueOf() as string,
		);
 
    const id = response.user.id;
		console.log("id---",id);
		console.log(JSON.stringify(response, null, 2));

		console.log("Response................", response)

		throw redirect(303, `/user/${id}/view`);
	}
}