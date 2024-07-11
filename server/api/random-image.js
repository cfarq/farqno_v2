import { readdirSync } from "fs";
import { join } from "path";
import { getQuery } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const imageDir = query.route;
  const currentImageUrl = query.currentImageUrl;

  const imagesDir = join(process.cwd(), `public/images/${imageDir}`);
  const files = readdirSync(imagesDir);

  const availableImages = files.filter((file) => {
    const imageUrl = `/images/${imageDir}/${file}`;
    return imageUrl !== currentImageUrl;
  });

  if (availableImages.length === 0) {
    return currentImageUrl;
  }

  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const randomImage = availableImages[randomIndex];
  const imageUrl = `/images/${imageDir}/${randomImage}`;

  return imageUrl;
});
