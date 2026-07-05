require("dotenv").config();
const mongoose = require("mongoose");
const BlockchainRecord = require("../src/modules/blockchain/blockchain.model");
const AuditLog = require("../src/modules/audit/audit.model");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sentinelx";
mongoose.connect(uri).then(async () => {
  await BlockchainRecord.deleteMany({});
  await AuditLog.deleteMany({});
  console.log("Wiped old blockchain records and audit logs.");
  process.exit(0);
});
