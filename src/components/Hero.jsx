import { motion } from 'framer-motion'
import SnakeAnimation from './SnakeAnimation'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <SnakeAnimation />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-white via-neon-mint to-neon-cyan bg-clip-text text-transparent">
              Alex Rivera
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300 mb-4 sm:mb-6"
          >
            Creative Developer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting exceptional digital experiences with modern web technologies.
            Passionate about clean code, stunning design, and innovative solutions.
          </motion.p>

          <motion.div variants={itemVariants}>
            <button className="group relative px-8 py-4 bg-transparent border-2 border-neon-mint rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 bg-neon-mint opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-neon-mint blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              <span className="relative text-neon-mint font-semibold text-lg tracking-wide">
                View My Work
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
