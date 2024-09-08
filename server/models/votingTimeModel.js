const mongoose = require("mongoose");
const cron = require("node-cron");
const { exec } = require("child_process");
const path = require("path");

const VotingTimeSchema = new mongoose.Schema({
  votingEnabled: { type: Boolean, default: false },
  votingStartTime: { type: Date, required: false },
  votingEndTime: { type: Date, required: false },
});

const VotingTime = mongoose.model("VotingTime", VotingTimeSchema);
module.exports = VotingTime;

const checkVotingStatus = async () => {
  try {
    const votingStatus = await VotingTime.findOne({});

    if (votingStatus && votingStatus.votingEndTime) {
      const currentTime = new Date();

      if (new Date(votingStatus.votingEndTime) < currentTime) {
        await VotingTime.updateOne(
          {},
          {
            votingEnabled: false,
            votingStartTime: null,
            votingEndTime: null,
          }
        );
        console.log("Voting has ended, status has been updated.");

        const scriptPaths = [
          path.join(__dirname, "../scripts/python/apriori.py"),
          path.join(__dirname, "../scripts/python/statistics.py"),
        ];

        scriptPaths.forEach((scriptPath) => {
          // Enclose the script path in quotes to handle spaces
          exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing script ${scriptPath}: ${error}`);
              return;
            }
            console.log(`Script ${scriptPath} output: ${stdout}`);
          });
        });
      }
    }
  } catch (err) {
    console.error("Error checking voting status:", err);
  }
};

cron.schedule("* * * * *", checkVotingStatus);
