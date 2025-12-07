const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

function getAllTravelGuides() {
    const guidesDir = path.join(process.cwd(), 'data/travel-guides');

    try {
        const files = fs.readdirSync(guidesDir);
        const guides = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(guidesDir, file);
                const source = fs.readFileSync(filePath, 'utf-8');
                const matterResult = matter(source);

                return {
                    slug: file.replace('.md', ''),
                    city: matterResult.data.city || '',
                    country: matterResult.data.country || '',
                    content: matterResult.content
                };
            });

        return guides;
    } catch (error) {
        console.error('Error reading travel guides:', error);
        return [];
    }
}

function getTravelGuideBySlug(slug) {
    const guidesDir = path.join(process.cwd(), 'data/travel-guides');
    const filePath = path.join(guidesDir, `${slug}.md`);

    try {
        const source = fs.readFileSync(filePath, 'utf-8');
        const matterResult = matter(source);

        return {
            slug: slug,
            title: matterResult.data.title || '',
            description: matterResult.data.description || '',
            content: matterResult.content
        };
    } catch (error) {
        console.error('Error reading travel guide:', error);
        return null;
    }
}

module.exports = {
    getAllTravelGuides,
    getTravelGuideBySlug
};

