import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import { useTranslations } from '@/i18n';

const t = useTranslations();

export async function GET(context) {
    const posts = await getCollection('blog');
    
    // Filter out draft posts and posts without required fields
    const publishedPosts = posts.filter(post => !post.data.draft);
    
    return rss({
        title: t('siteMetadata.title'),
        description: t('siteMetadata.description'),
        site: context.site,
        items: publishedPosts.map(({slug, data}) => ({
            title: data.title || 'Untitled',
            categories: data.tags ? data.tags.map((tag) => {
                // Handle both string slugs and reference objects
                return typeof tag === 'string' ? tag : (tag.slug || tag.id || 'default');
            }) : [],
            pubDate: data.date,
            description: data.summary || '',
            link: `/blog/${slug}/`,
        })),
    });
}
