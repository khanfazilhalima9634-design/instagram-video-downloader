const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/download", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send("Instagram URL missing");
    }

    const cmd = `yt-dlp -f mp4 -o - "${url}"`;

    res.setHeader("Content-Disposition", "attachment; filename=instagram-video.mp4");
    res.setHeader("Content-Type", "video/mp4");

    const process = exec(cmd, { maxBuffer: 1024 * 1024 * 50 });

    process.stdout.pipe(res);
    process.stderr.on("data", err => console.error(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Backend running on port " + PORT);
});

