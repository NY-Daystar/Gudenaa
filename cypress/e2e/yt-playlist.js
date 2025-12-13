/** File to extract list of youtube playlist */

import axios from "axios";
import fs from "fs";
import { writeCsv } from "./helper/index.js";
const { filePath, playlist, yt_api_key } = JSON.parse(fs.readFileSync("config.json", "utf8"));

const max = 50;

function main() {
	getPlaylistVideos()
		.then((videos) => {
			console.info(`Writing data in ${filePath}...`);
			console.log(`Retrieve ${videos.length} videos`);
			writeCsv(filePath, videos);
			console.info(`Data written in ${filePath}`);
		})
		.catch((err) => {
			console.error(err);
		});
}

async function getPlaylistVideos() {
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist}&key=${yt_api_key}&maxResults=${max}`;
	try {
		const response = await axios.get(url);
		const items = response.data.items;
		console.log("f", items);
		return items.map((video) => {
			return [video.snippet.title, `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`];
		});
	} catch (error) {
		console.error("Error fetching playlist videos");
		console.error(error.message);
		console.error(error.status);
	}
}

main();
