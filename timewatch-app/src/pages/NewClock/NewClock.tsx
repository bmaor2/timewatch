import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { Geolocation } from "@capacitor/geolocation";
import { useAsyncEffect } from "@hilma/tools";

type FormValues = {
  location: { latitude?: number; longitude?: number; description?: string };
  entranceTime: Date;
  exitTime: Date;
  maxEntranceTime: Date;
  maxExitTime: Date;
};

const NewClock: React.FC = () => {
  const { handleChange, handleSubmit, values, setFieldValue, errors } =
    useFormik<FormValues>({
      initialValues: {
        location: { latitude: 0, longitude: 0, description: "" },
        exitTime: new Date(),
        maxEntranceTime: new Date(),
        entranceTime: new Date(),
        maxExitTime: new Date(),
      },
      onSubmit: () => {},
    });

  useAsyncEffect(async (isMounted) => {
    const { coarseLocation, location } = await Geolocation.checkPermissions();
    if (
      (isMounted.current && coarseLocation !== "granted") ||
      location !== "granted"
    )
      await Geolocation.requestPermissions({
        permissions: ["coarseLocation", "location"],
      });
    getCurrentPosition();
  }, []);

  async function getCurrentPosition() {
    const { latitude, longitude } = (await Geolocation.getCurrentPosition())
      .coords;
    setFieldValue(
      "location",
      { latitude, longitude, description: "מיקומך הנוכחי" },
      true
    );
  }

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
          value={values.location.description}
        />
        {errors.location ? <div>{values.location.description}</div> : null}
        <button type="submit">Submit</button>
        {JSON.stringify(values.location, null, 2)}
      </form>
    </motion.div>
  );
};

export default NewClock;
