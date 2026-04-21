function App() {
  return (
    <React.Fragment>
      <Nav />
      <TopMarquee />
      <Hero />
      <Stats />
      <POITypes />
      <MapShowcase />
      <Features />
      <Fitness />
      <Social />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <TweaksPanel />
    </React.Fragment>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
