const Episode = require("../models/Episode");
const Movie = require("../models/Movie");

const episodeCtrl = {
  getAllEpisode: async (req, res) => {
    try {
      let episodes = await Episode.find();
      res.status(200).json(episodes);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },

  getEpisode: async (req, res) => {
    try {
      const episode = await Episode.findById(req.params.id);

      if (!episode) {
        return res.status(400).json({ msg: "This episode does not exist." });
      }

      res.json(episode);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },

  createEpisode: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const { title, desc, thumbnail, duration, belongsToMovie } = req.body;

        const newEpisode = new Episode({
          title,
          desc,
          thumbnail,
          duration,
          belongsToMovie,
        });

        await newEpisode.save();

        const query =
          "seasons." + (belongsToMovie.seasonName - 1) + ".seasonContent";

        await Movie.findOneAndUpdate(
          { title: belongsToMovie.movieName },
          { $push: { [query]: newEpisode } }
        );

        res.json({
          msg: "Episode has been successfully created.",
          episode: newEpisode._doc,
        });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    } else {
      res.status(403).json("You are not allowed to post a episode.");
    }
  },

  updateEpisode: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const { title, desc, thumbnail, duration, belongsToMovie } = req.body;

        const replaceEpisode = await Episode.findByIdAndUpdate(
          req.params.id,
          {
            title,
            desc,
            thumbnail,
            duration,
            belongsToMovie,
          },
          { new: true }
        );

        const movie = await Movie.findOne({ title: belongsToMovie.movieName });

        const seasonNeedsReplace = movie.seasons.find(
          (e) => e.seasonName === belongsToMovie.seasonName
        );

        const replaceContent = seasonNeedsReplace.seasonContent.map((e) =>
          e._id.toString() === req.params.id ? replaceEpisode : e
        );

        await Movie.findOneAndUpdate(
          {
            title: belongsToMovie.movieName,
            "seasons.seasonName": belongsToMovie.seasonName,
          },
          {
            $set: {
              "seasons.$.seasonContent": replaceContent,
            },
          }
        );

        res.json({ msg: "Episode has been successfully updated." });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    } else {
      res.status(403).json("You are not allowed to update a episode.");
    }
  },

  deleteEpisode: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const deleteEpisode = await Episode.findByIdAndDelete(req.params.id);

        const query =
          "seasons." +
          (deleteEpisode.belongsToMovie.seasonName - 1) +
          ".seasonContent";

        await Movie.findOneAndUpdate(
          { title: deleteEpisode.belongsToMovie.movieName },
          { $pull: { [query]: deleteEpisode } }
        );

        res.json({ msg: "Episode has been successfully deleted." });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    } else {
      res.status(403).json("You are not allowed to delete a episode.");
    }
  },

  // getEpisodesOfSeason: async (req, res) => {
  //   try {
  //     const resMovie = await Movie.findById(req.params.idMovie);

  //     let episodesOfSeason;
  //     if (req.query.season) {
  //       episodesOfSeason = resMovie.seasons.filter(
  //         (e) => e.seasonName === parseInt(req.query.season)
  //       )[0].seasonContent;
  //     } else {
  //       episodesOfSeason = await Episode.find({
  //         "belongsToMovie.movieName": resMovie.title,
  //       });
  //     }

  //     if (!episodesOfSeason)
  //       return res.status(400).json({ msg: "This episode does not exist." });

  //     res.json(episodesOfSeason);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
};

module.exports = episodeCtrl;
