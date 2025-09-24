import { Button } from "@/components/ui/button";
import { ExternalLink, Mail } from "lucide-react";
import dortmundLogo from "@/assets/dortmund-hub-logo.png";

const Footer = () => {
  const hubLeaders = [
    "Raphael Fischer",
    "Nico Koltermann", 
    "Bahavathy Kathirganathan"
  ];

  const links = [
    {
      title: "Community Charter",
      url: "https://aiforgood.itu.int/young-ai-leaders-community/community-charter/"
    },
    {
      title: "AI for Good Homepage",
      url: "https://aiforgood.itu.int/young-ai-leaders-community/"
    }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={dortmundLogo} 
                alt="Young AI Leaders Dortmund Hub" 
                className="h-12 w-12 rounded-full shadow-elegant"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Young AI Leaders
                </h3>
                <p className="text-sm text-muted-foreground">Dortmund Hub</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Als einer von über 100 Hubs weltweit setzen wir KI im Raum Dortmund für Gutes ein!
            </p>
          </div>

          {/* Hub Leaders */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Hub Leadership</h3>
            <div className="space-y-3">
              {hubLeaders.map((leader, index) => (
                <p key={index} className="text-muted-foreground">{leader}</p>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-2">Kontakt</p>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href="mailto:dortmundhub.youngaileaders@gmail.com">
                  <Mail className="h-4 w-4" />
                  Hub E-Mail
                </a>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Weitere Informationen</h3>
            <div className="space-y-4">
              {links.map((link, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  asChild 
                  className="justify-start h-auto p-0 text-muted-foreground hover:text-foreground"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                    {link.title}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Wir freuen uns über <strong>Unterstützung</strong> und <strong>Feedback</strong> 
                jeglicher Form - vielen Dank!
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Young AI Leaders - Dortmund Hub. Teil der UN AI for Good Initiative.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;