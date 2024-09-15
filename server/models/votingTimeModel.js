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
          path.join(__dirname, "../scripts/python/data.py"),
          path.join(__dirname, "../scripts/python/statistics.py"),
          path.join(__dirname, "../scripts/python/apriori.py"),
        ];

        const runScript = (scriptPath) => {
          return new Promise((resolve, reject) => {
            exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
              if (error) {
                reject(`Error executing script ${scriptPath}: ${error}`);
              } else {
                console.log(`Script ${scriptPath} output: ${stdout}`);
                resolve();
              }
            });
          });
        };

        const executeScriptsSequentially = async () => {
          try {
            for (const scriptPath of scriptPaths) {
              await runScript(scriptPath);
            }
            console.log("All scripts executed successfully.");
          } catch (err) {
            console.error(err);
          }
        };

        await executeScriptsSequentially();
      }
    }
  } catch (err) {
    console.error("Error checking voting status:", err);
  }
};

cron.schedule("* * * * *", checkVotingStatus);
