import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { getQuery } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const imageDir = query.route;
  const currentImageUrl = query.currentImageUrl;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Use the relative path to the public folder
  const imagesDir = join("../../public/images", imageDir);
  let files;

  try {
    files = readdirSync(imagesDir);
  } catch (err) {
    return {
      error: `Directory not found: ${err}`,
      filename: __filename,
      dirname: __dirname,
      event: event,
    }; // Handle case when directory doesn't exist
  }

  const availableImages = files.filter((file) => {
    const imageUrl = `/images/${imageDir}/${file}`;
    return imageUrl !== currentImageUrl;
  });

  if (availableImages.length === 0) {
    return currentImageUrl;
  }

  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const randomImage = availableImages[randomIndex];

  return randomImage;
});
