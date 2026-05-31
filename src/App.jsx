import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ background: '#050816' }}
          >
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
