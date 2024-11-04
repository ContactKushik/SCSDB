import React, { useState, useEffect } from 'react'
import { ArrowLeft, Linkedin, Github, Instagram, Mail } from 'lucide-react'

const ContactUs = () => {
  const [typewriterText, setTypewriterText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    "Let's Collaborate",
    'Buy Me a Coffee',
    'Reach Out to Us!',
    "Let's Connect and Collaborate",
    'Have Any Questions?',
    "We're Here to Help",
    'Stay in Touch',
    'Join Our Community',
    'Follow Us on Social Media',
    'Send Us Your Feedback',
    "Let's Grow Together",
  ]

  useEffect(() => {
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
            Contact Us
          </h1>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
          <div className="text-4xl sm:text-5xl font-semibold mb-6 text-white h-20">
            {typewriterText}
            <span className="animate-pulse">_</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#7463df]">
            🤗 FUELED BY GRIT AND CREATIVITY
          </h1>
          <h1 className="text-zinc-500 text-2xl sm:text-3xl font-semibold mt-5">
            KUSHIK
          </h1>
          <div className="flex text-4xl sm:text-5xl item-end mt-5 gap-5 sm:gap-10">
            <a
              href="https://www.linkedin.com/in/kushik-sahu-b09757191/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#7463df] transition-colors duration-200"
            >
              <Linkedin className="w-10 h-10 hover:scale-125 transition-transform duration-200" />
            </a>
            <a
              href="https://github.com/ContactKushik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#7463df] transition-colors duration-200"
            >
              <Github className="w-10 h-10 hover:scale-125 transition-transform duration-200" />
            </a>
            <a
              href="https://www.instagram.com/kushik_sahu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#7463df] transition-colors duration-200"
            >
              <Instagram className="w-10 h-10 hover:scale-125 transition-transform duration-200" />
            </a>
            <a
              href="mailto:contactkushik@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#7463df] transition-colors duration-200"
            >
              <Mail className="w-10 h-10 hover:scale-125 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
