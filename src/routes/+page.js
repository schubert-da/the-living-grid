export async function load() {
    const modules = import.meta.glob(
        '/src/content/image-gallery/*.json',
        { eager: true }
    );

    const posts = Object.entries(modules).map(([path, module]) => {
        const slug = path.split('/').pop().replace('.json', '');
        return {
            slug,
            ...module.default
        };
    });

    return { posts };
}