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
export async function insertCabins(newCabin) {
	//https://eojgunculvtkuxaxdgmj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }]);
	if (error) {
		console.log(error);
		throw new Error("Cabin could not be deleted");
	}
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
