exports.getGame = async (req, res, next) => {
  res.status(200).render("index", {
    title: "Chinese Characters Quiz",
    allLevels: ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "ALL"],
    environment: process.env.NODE_ENV,
  });
};
