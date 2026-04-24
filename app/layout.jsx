export const metadata = {
  title: "StorageAlly — AI operations partner for independent self-storage",
  description:
    "Stop guessing. Start knowing. StorageAlly is the AI-powered operations partner that independent self-storage owners wish they had. Built by an operator, for operators.",
  openGraph: {
    title: "StorageAlly",
    description:
      "AI-powered operations partner for independent self-storage owners.",
    url: "https://storageally.ai",
    siteName: "StorageAlly",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;0,8..60,800;1,8..60,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
