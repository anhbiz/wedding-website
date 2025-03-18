// Thêm file này vào thư mục gốc của dự án
// Chạy bằng lệnh: node debug-script.js

const fs = require("fs")
const path = require("path")

// Kiểm tra thư mục public/images
const imagesDir = path.join(process.cwd(), "public", "images")

console.log("Checking if images directory exists:", fs.existsSync(imagesDir))

if (fs.existsSync(imagesDir)) {
  console.log("Images in directory:")
  const files = fs.readdirSync(imagesDir)
  files.forEach((file) => {
    const filePath = path.join(imagesDir, file)
    const stats = fs.statSync(filePath)
    console.log(`- ${file} (${stats.size} bytes)`)
  })
}

// Kiểm tra cấu hình Next.js
const nextConfigPath = path.join(process.cwd(), "next.config.js")
console.log("Next.js config exists:", fs.existsSync(nextConfigPath))

if (fs.existsSync(nextConfigPath)) {
  console.log("Next.js config content:")
  console.log(fs.readFileSync(nextConfigPath, "utf8"))
}

console.log("Current working directory:", process.cwd())

