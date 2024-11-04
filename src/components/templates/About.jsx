import React, { useState, useEffect } from 'react'
import { ArrowLeft, Tv } from 'lucide-react'

const About = () => {
  const [typewriterText, setTypewriterText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    'What to Watch?',
    'Find your celebrity crush',
    'Discover your favorite Movie',
    'Explore Movies from around the globe',
    'Stay updated with the latest trends',
    'Dive into endless entertainment',
    'Discover popular TV Shows',
    'Explore detailed info on Celebrities',
    'Explore TV shows from around the globe',
  ]

  useEffect(() => {
    // Set document title
    document.title = 'SCSDB | About'

    const typeSpeed = 50
    const deleteSpeed = 30
    const delaySpeed = 2500

    const currentText = texts[textIndex]

    if (!isDeleting && typewriterText !== currentText) {
      const timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterText.length + 1))
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && typewriterText === currentText) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delaySpeed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && typewriterText !== '') {
      const timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterText.length - 1))
      }, deleteSpeed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && typewriterText === '') {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }
  }, [typewriterText, textIndex, isDeleting, texts])

  return (
    <div className="w-full h-screen overflow-auto overflow-x-hidden bg-gradient-to-br from-gray-900 to-purple-900">
      <div className="w-full px-5 sm:px-10 py-5 h-full">
        <div className="flex justify-between gap-5 sm:gap-10 items-center">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-end gap-3 text-white">
            <ArrowLeft
              className="w-6 h-6 sm:w-8 sm:h-8 hover:text-[#7463df] cursor-pointer"
              onClick={() => window.history.back()}
            />
            About
          </h1>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
          <div className="text-4xl sm:text-5xl font-semibold mb-6 text-white h-20">
            {typewriterText}
            <span className="animate-pulse">_</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#7463df] flex items-center justify-center">
            <Tv className="w-8 h-8 mr-2 text-[#6556CD]" />
            SCSDB,
            <br />
            We've got you covered!
          </h1>
        </div>
      </div>
    </div>
  )
}

export default About
