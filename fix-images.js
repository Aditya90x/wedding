const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'scenes');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let original = content;

    // Replace `objectFit: "cover"` with `objectFit: "cover", objectPosition: "top"`
    // But be careful not to do it if `objectPosition` is already defined right next to it.
    // A simpler regex: find `objectFit: "cover"` that does NOT have `objectPosition` in the same object.
    // Instead of complex regex, let's just globally replace it, then clean up any duplicates.
    
    content = content.replace(/objectFit:\s*"cover"/g, 'objectFit: "cover", objectPosition: "top"');
    
    // If it now has `objectPosition: "top", objectPosition: "center"`, the last one wins, but let's fix it:
    content = content.replace(/objectPosition:\s*"top",\s*objectPosition:\s*"center"/g, 'objectPosition: "top"');
    content = content.replace(/objectPosition:\s*"top",\s*opacity:/g, 'objectPosition: "top", opacity:');

    // Also reduce PARTICLES array lengths for performance:
    content = content.replace(/Array\.from\(\{\s*length:\s*20\s*\}\)/g, 'Array.from({ length: 10 })');
    content = content.replace(/Array\.from\(\{\s*length:\s*25\s*\}\)/g, 'Array.from({ length: 10 })');
    
    if (original !== content) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
}
console.log("Done updating objectFit for mobile view and reducing particles.");
