
import './../globals.css';
export const metadata = {
  title: 'NextJs Starter Template',
  description:
    'NextJs Starter Template for Archmage Solutions'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="flex flex-col min-h-screen">
          {children}

        </div>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
