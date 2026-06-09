import "./globals.css";

export const metadata = {
  title: "Wiki Surveys Presentation",
  description: "Animated slide presentation about Salganik and Levy's wiki surveys article.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
