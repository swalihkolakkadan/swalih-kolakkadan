import React from "react";
import { Helmet } from "react-helmet-async";
import { profile } from "../utils/constants";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
}

const SEO = ({
  title,
  description = profile.aboutMe,
  pathname = "",
  image = "/images/prof.jpg",
}: SEOProps) => {
  const fullTitle = title
    ? `${title} | ${profile.name}`
    : `${profile.name} - ${profile.designation}`;
  const url = `${profile.siteUrl}${pathname}`;
  const imageUrl = `${profile.siteUrl}${image}`;

  // JSON-LD structured data for Person
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    image: imageUrl,
    jobTitle: profile.designation,
    worksFor: {
      "@type": "Organization",
      name: profile.currentCompany,
    },
    sameAs: [profile.linkedIn, profile.github],
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressCountry: "India",
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Frontend Developer, React Developer, Software Engineer, Web Developer, TypeScript, JavaScript, Swalih Kolakkadan"
      />
      <meta name="author" content={profile.name} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
