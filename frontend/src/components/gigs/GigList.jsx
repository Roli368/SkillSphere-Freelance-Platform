import { motion } from "framer-motion";
import GigCard from "./GigCard";

function GigList({ gigs }) {
  if (!gigs?.length) {
    return (
      <div className="py-20 text-center text-xl font-medium text-slate-500 dark:text-slate-400">
        No Gigs Found
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {gigs.map((gig) => (
        <motion.div key={gig._id} variants={item}>
          <GigCard gig={gig} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default GigList;