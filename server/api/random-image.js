import { readdirSync } from "fs";
import { join } from "path";
import { getQuery } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const currentImageUrl = query.currentImageUrl;

  const imagesDir = join(process.cwd(), "public/images");
  const files = readdirSync(imagesDir);

  const availableImages = files.filter((file) => {
    const imageUrl = `/images/${file}`;
    return imageUrl !== currentImageUrl;
  });

  if (availableImages.length === 0) {
    // If no other images available (e.g., only one image), return the same image
    return currentImageUrl;
  }

  // Select a random image from the available images
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const randomImage = availableImages[randomIndex];
  const imageUrl = `/images/${randomImage}`;

  return imageUrl;
});
