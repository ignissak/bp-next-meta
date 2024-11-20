import { motion } from "motion/react";

export const HeroHomepage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      className="h-screen w-screen bg-cover bg-no-repeat relative z-0 flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 63%, #0A0A0A 87.5%), linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url('./images/homepage_title.jpg') lightgray 50% / cover no-repeat",
      }}
      initial={{
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 63%, #0A0A0A 87.5%), linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0)), url('./images/homepage_title.jpg') lightgray 0% / cover no-repeat",
      }}
      animate={{
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 63%, #0A0A0A 87.5%), linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url('./images/homepage_title.jpg') lightgray 50% / cover no-repeat",
      }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.section>
  );
};
