export async function load() {
    const modules = import.meta.glob(
        '/src/content/image-gallery/*.json',
        { eager: true }
    );

    let images = [];
    const imageResponse = Object.entries(modules).map(([path, module]) => {
        const slug = path.split('/').pop().replace('.json', '');
        const content = module.default;

        if (content.image?.length > 0) {
            content.image.forEach(imagePath => {
                const currentImage = { slug, ...content, image: imagePath };
                images.push(currentImage);
            })
        }
        else {
            images.push({ slug, ...content });
        }
    });

    return { images };
}