import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-8 text-muted-foreground">
            Page not found
          </p>
          <Button asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              <Home size={18} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
