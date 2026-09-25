"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

export const blurFadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const blurFadeLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const blurFadeRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const blurScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

interface MotionBoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export const MotionFadeBlur: React.FC<MotionBoxProps> = ({
  children,
  className = "",
  delay = 0,
  variants = blurFadeUpVariants,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerContainer: React.FC<MotionBoxProps> = ({
  children,
  className = "",
  variants = staggerContainerVariants,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionChildItem: React.FC<MotionBoxProps> = ({
  children,
  className = "",
  variants = blurFadeUpVariants,
  ...props
}) => {
  return (
    <motion.div
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
