import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";

type FormValues = {
  location: string;
  entranceTime: Date;
  exitTime: Date;
  maxEntranceTime: Date;
  maxExitTime: Date;
};

const NewClock: React.FC = () => {
  const { handleChange, handleSubmit, values, errors } =
    useFormik<FormValues>({
      initialValues: {
        location: "",
        exitTime: new Date(),
        maxEntranceTime: new Date(),
        entranceTime: new Date(),
        maxExitTime: new Date(),
      },
      onSubmit: () => {},
    });
  return (
    <motion.div
      transition={{ ease: "easeOut", duration: 1 }}
      animate={{ opacity: [0, 1] }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">First Name</label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={handleChange}
          value={values.location}
        />
        {errors.location ? <div>{errors.location}</div> : null}
        <button type="submit">Submit</button>
      </form>
    </motion.div>
  );
};

export default NewClock;
