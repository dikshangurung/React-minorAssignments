import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");
	if (error) {
		console.log(error);
	}
	return data;
}
export async function deleteCabins(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.log(error);
		throw new Error("Cabin could not be deleted");
	}
	return data;
}
export async function createEditCabin(newCabin, id) {
	//check for image if the image is updated or not. If yes then it will be of file type else it will start with the word supabaseUrl
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	//https://eojgunculvtkuxaxdgmj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	let query = supabase.from("cabins");
	//A) Create cabin
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	//B) Edit cabin

	if (id)
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

	const { data, error } = await query.select().single();
	if (error) {
		console.log(error);
		throw new Error("Cabin could not be deleted");
	}
	//Upload image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	//Delete the cabin if there is any storage error
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		throw new Error(
			"Cabin image could not be uploaded and cabin was not created"
		);
	}

	return data;
}
