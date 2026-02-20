import { Helmet } from 'react-helmet-async';

export default function SEOHead({ 
    title, 
    description, 
    keywords, 
    canonicalUrl, 
    structuredData,
    openGraph,
    twitter,
    robots = "index, follow",
    author = "FreeTools"
}) {
    const siteName = 'FreeTools';
    const fullTitle = title ? `${title}` : `${siteName} — 100+ Free Online Utilities`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || 'Free online tools for everyone. No login required.'} />
            <meta name="keywords" content={keywords || 'free online tools, image tools, PDF tools, video tools, audio tools, developer tools, calculators'} />
            <meta name="author" content={author} />
            <meta name="robots" content={robots} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:site_name" content={openGraph?.siteName || siteName} />
            <meta property="og:title" content={openGraph?.title || fullTitle} />
            <meta property="og:description" content={openGraph?.description || description || 'Free online tools for everyone.'} />
            <meta property="og:type" content={openGraph?.type || "website"} />
            {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
            {openGraph?.locale && <meta property="og:locale" content={openGraph.locale} />}
            {openGraph?.images?.map((image, index) => (
                <meta 
                    key={index} 
                    property="og:image" 
                    content={image.url} 
                />
            )) || <meta property="og:image" content="https://freetools.com/og-image.png" />}
            {openGraph?.images?.[0]?.width && <meta property="og:image:width" content={openGraph.images[0].width} />}
            {openGraph?.images?.[0]?.height && <meta property="og:image:height" content={openGraph.images[0].height} />}
            
            {/* Twitter Card */}
            <meta name="twitter:card" content={twitter?.card || "summary_large_image"} />
            <meta name="twitter:site" content={twitter?.site || "@freetools"} />
            <meta name="twitter:creator" content={twitter?.creator || "@freetools"} />
            <meta name="twitter:title" content={twitter?.title || fullTitle} />
            <meta name="twitter:description" content={twitter?.description || description || 'Free online tools for everyone.'} />
            {twitter?.image && <meta name="twitter:image" content={twitter.image} />}
            
            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            
            {/* Favicon */}
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
            
            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}
