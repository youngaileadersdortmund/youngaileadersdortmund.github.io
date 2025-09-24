import { Button } from "@/components/ui/button";
import { ExternalLink, Globe } from "lucide-react";
import dortmundLogo from "@/assets/dortmund-hub-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={dortmundLogo} 
            alt="Young AI Leaders Dortmund Hub" 
            className="h-12 w-12 rounded-full shadow-elegant"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Young AI Leaders
            </h1>
            <p className="text-sm text-muted-foreground">Dortmund Hub</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#community" className="text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <a href="#join" className="text-foreground hover:text-primary transition-colors">
            Join Us
          </a>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            English
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;