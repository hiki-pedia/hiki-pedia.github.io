const fs = require("fs");
const filename = "assets/js/main.min.js";
const banner = `/*!
 * Blog scripts based on Minimal Mistakes 4.24.0.
 * Copyright 2013-2020 Michael Rose and contributors.
 * MIT License; see LICENSE.
 */
`;

fs.writeFileSync(filename, banner + fs.readFileSync(filename, "utf8"));
