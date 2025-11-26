export const getRotationDuration = () => {
  const root = getComputedStyle(document.documentElement);
  const durationStr = root.getPropertyValue("--circle-rotation-duration").trim();

  if (durationStr.endsWith("ms")) {
    return parseFloat(durationStr);
  } else if (durationStr.endsWith("s")) {
    return parseFloat(durationStr) * 1000;
  }
  return 800;
};
