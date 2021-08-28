"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  ejs: {
    enable: true,
    package: "egg-view-ejs",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
};
