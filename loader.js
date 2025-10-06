// Firebase Image Loader for Next.js Image Optimization
export default function firebaseLoader({ src, width, quality }) {
  // In development, return the original source
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  // Firebase Image Processing API
  const operations = [
    { operation: "input", type: "url", url: src },
    { operation: "resize", width },
    { operation: "output", format: "webp", quality: quality || 75 }
  ];

  // Return the Firebase Image Processing URL
  return `/_fah/image/process?operations=${encodeURIComponent(JSON.stringify(operations))}`;
}