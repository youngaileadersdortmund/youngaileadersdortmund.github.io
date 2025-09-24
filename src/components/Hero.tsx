import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-ai-community.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">UN AI for Good Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Empowering Young
            </span>
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              AI Leaders
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Als lokale Community befähigen wir junge Menschen, 
            <strong className="text-white"> KI auf positive Weise zu nutzen</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" variant="default" className="group bg-white text-primary hover:bg-white/90 shadow-glow">
              Werde ein Young AI Leader
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 backdrop-blur-sm text-inherit">
              Mehr erfahren
            </Button>
          </div>
          
          <div className="text-white/80 text-sm">
            <p>Für Menschen zwischen <strong>18 und 30 Jahren</strong> • Bis zu <strong>4 Jahre</strong> Mitgliedschaft</p>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-ai-yellow/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-ai-mint/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-ai-lime/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>;
};
export default Hero;