const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for frequent itemsets
const FrequentItemsetSchema = new Schema({
  itemset: [
    {
      type: String, // Each item in the itemset (e.g., 'age_group_18-25', 'candidate_id_123')
      required: true,
    },
  ],
  support: {
    type: Number, // Support value for the itemset
    required: true,
  },
});

// Schema for association rules
const AssociationRuleSchema = new Schema({
  antecedent: [
    {
      type: String, // Items in the antecedent (e.g., 'age_group_18-25')
      required: true,
    },
  ],
  consequent: [
    {
      type: String, // Items in the consequent (e.g., 'candidate_id_123')
      required: true,
    },
  ],
  support: {
    type: Number, // Support value for the rule
    required: true,
  },
  confidence: {
    type: Number, // Confidence value for the rule
    required: true,
  },
  lift: {
    type: Number, // Lift value for the rule
    required: true,
  },
  leverage: {
    type: Number, // Leverage value for the rule
    required: true,
  },
  conviction: {
    type: Number, // Conviction value for the rule
    required: true,
  },
});

// Main schema to store Apriori results
const AprioriResultSchema = new Schema({
  frequent_itemsets: [FrequentItemsetSchema], // Array of frequent itemsets
  association_rules: [AssociationRuleSchema], // Array of association rules
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const AprioriResult = mongoose.model("AprioriResult", AprioriResultSchema);

module.exports = AprioriResult;
