import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import VisiMisi from "./components/VisiMisi";
import Services from "./components/Services";
import Programs from "./components/Programs";
import Gallery from "./components/Gallery";
import Leadership from "./components/Leadership";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import { useData } from "./hooks/useData";

export default function App() {
  const site = useData("site").data;

  return (
    <div className="min-h-screen">
      <Navbar site={site} />
      <main>
        <Hero site={site} />
        <StatsSection />
        <About site={site} />
        <VisiMisiSection />
        <ServicesSection />
        <ProgramsSection />
        <GallerySection />
        <LeadershipSection />
        <FAQSection />
        <Contact site={site} />
      </main>
      <Footer site={site} />
      <ScrollTop />
    </div>
  );
}

function StatsSection() {
  const { data } = useData("stats", "stats");
  return <Stats stats={data} />;
}

function VisiMisiSection() {
  const { data: visi } = useData("visi", "visi");
  const { data: misi } = useData("misi", "misi");
  return <VisiMisi visi={visi} misi={misi} />;
}

function ServicesSection() {
  const { data } = useData("services", "services");
  return <Services services={data} />;
}

function ProgramsSection() {
  const { data } = useData("programs", "programs");
  return <Programs programs={data} />;
}

function GallerySection() {
  const { data } = useData("gallery", "gallery");
  return <Gallery gallery={data} />;
}

function LeadershipSection() {
  const { data } = useData("leadership", "leadership");
  return <Leadership leadership={data} />;
}

function FAQSection() {
  const { data } = useData("faq", "faq");
  return <FAQ faq={data} />;
}
