import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Form data being sent:', {
      from_name: form.name,
      to_name: "Mouhcinet Teffahi",
      from_email: form.email,
      to_email: "mouhcineteffahi@gmail.com",
      message: form.message,
      reply_to: form.email,
      user_name: form.name,
      user_email: form.email,
    });

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log('EmailJS Success:', response);
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setLoading(false);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="text-center mb-12">
        <p className='text-purple-400 font-medium text-lg mb-2'>Get in touch</p>
        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Contact
        </h2>
      </motion.div>

      <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-black/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)]'
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-8 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-purple-300 font-medium mb-4'>Your Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-white/5 py-4 px-6 placeholder:text-gray-400 text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500/50 transition-all duration-300 font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-purple-300 font-medium mb-4'>Your email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-white/5 py-4 px-6 placeholder:text-gray-400 text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500/50 transition-all duration-300 font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-purple-300 font-medium mb-4'>Your Message</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-white/5 py-4 px-6 placeholder:text-gray-400 text-white rounded-lg outline-none border border-purple-500/20 focus:border-purple-500/50 transition-all duration-300 font-medium resize-none'
              />
            </label>

            <button
              type='submit'
              className='bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105'
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <img 
            src="/mouhcine.png" 
            alt="Mouhcine" 
            className="w-full h-full object-contain rounded-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");