import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Community from "@/components/Community";
import JoinUs from "@/components/JoinUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Community />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
