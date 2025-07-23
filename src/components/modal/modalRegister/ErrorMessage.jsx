import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ErrorMessage = ({ message, errorClass }) => (
  <AnimatePresence>
    {message && (
      <motion.p 
      className={`modal__error ${errorClass}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

export default ErrorMessage;