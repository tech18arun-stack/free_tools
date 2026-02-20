import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, keywords, canonicalUrl, structuredData }) {
    const siteName = 'FreeTools';
    const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — 30+ Free Online Utilities`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || 'Free online tools for everyone. No login required.'} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || 'Free online tools for everyone.'} />
            <meta property="og:type" content="website" />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || 'Free online tools for everyone.'} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}
