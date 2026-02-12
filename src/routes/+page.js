export async function load() {
    const modules = import.meta.glob(
        '/src/content/posts/*.md',
        { eager: true }
    );

    const posts = Object.entries(modules).map(([path, module]) => {
        const slug = path.split('/').pop().replace('.md', '');

        return {
            slug,
            ...module.metadata
        };
    });

    return { posts };
}