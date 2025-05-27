const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

function getBucketList() {
    const bucketListPath = path.join(process.cwd(), 'data/bucket-list.md');

    try {
        const source = fs.readFileSync(bucketListPath, 'utf-8');
        const matterResult = matter(source);

        const content = matterResult.content;

        // Parse the markdown content to extract categories and items
        const lines = content.split('\n');
        const categories = {};
        let currentCategory = null;

        lines.forEach(line => {
            const trimmedLine = line.trim();

            // Check if it's a category header (starts with ##)
            if (trimmedLine.startsWith('## ')) {
                currentCategory = trimmedLine.replace('## ', '');
                categories[currentCategory] = [];
            }
            // Check if it's a checkbox item
            else if (trimmedLine.startsWith('- [')) {
                if (currentCategory) {
                    const isChecked = trimmedLine.startsWith('- [x]') || trimmedLine.startsWith('- [X]');
                    const text = trimmedLine.replace(/^- \[[ xX]?\] /, '');

                    categories[currentCategory].push({
                        text: text,
                        completed: isChecked
                    });
                }
            }
        });

        return {
            metadata: matterResult.data,
            categories: categories
        };
    } catch (error) {
        console.error('Error reading bucket list:', error);
        return {
            metadata: { title: 'Bucket List', description: '' },
            categories: {}
        };
    }
}

module.exports = {
    getBucketList
}; 