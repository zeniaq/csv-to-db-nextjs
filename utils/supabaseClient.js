/* eslint-disable no-return-await */
import { createClient } from "@supabase/supabase-js";

export const readUser = async () => {
	const supabase = createClient(
		[process.env.NEXT_PUBLIC_SUPABASE_URL],
		[process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
	);

	return await supabase.from("users").select("*");
	// return await supabase.from("users").select("*").eq("id", `${user}`);
};

export const createUser = async (data) => {
	const supabase = createClient(
		[process.env.NEXT_PUBLIC_SUPABASE_URL],
		[process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
	);

	const req = await supabase.from("users").insert([
		{
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: parseInt(data.phone, 10),
			status: data.status,
		},
	]);
	return req;
};

export const updateUser = async (dataObj) => {
	const supabase = createClient(
		[process.env.NEXT_PUBLIC_SUPABASE_URL],
		[process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
	);

	return await supabase
		.from("users")
		.update([
			{
				firstName: dataObj.firstName,
				lastName: dataObj.lastName,
				email: dataObj.email,
				phone: dataObj.phone,
				status: dataObj.status,
			},
		])
		.eq("id", dataObj.id);
};
