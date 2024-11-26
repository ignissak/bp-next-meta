const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function seedGlossary() {
  const activeLearning = await prisma.glossary.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      term: "Active Learning",
      definition:
        "A training approach in which the algorithm chooses some of the data it learns from. Active learning is particularly valuable when labeled examples are scarce or expensive to obtain. Instead of blindly seeking a diverse range of labeled examples, an active learning algorithm selectively seeks the particular range of examples it needs for learning.",
    },
  });

  const automatedMachineLearning = await prisma.glossary.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      term: "Automated Machine Learning",
      definition:
        "A training approach in which the algorithm chooses some of the data it learns from. Automated machine learning is particularly valuable when labeled examples are scarce or expensive to obtain. Instead of blindly seeking a diverse range of labeled examples, an automated machine learning algorithm selectively seeks the particular range of examples it needs for learning.",
    },
  });

  const anomalyDetection = await prisma.glossary.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      term: "Anomaly Detection",
      definition:
        "The process of identifying outliers. For example, if the mean for a certain feature is 100 with a standard deviation of 10, then anomaly detection should flag a value of 200 as suspicious.",
    },
  });

  const generalArtificialIntelligence = await prisma.glossary.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      term: "General Artificial Intelligence",
      definition:
        "A type of AI that is capable of understanding, learning, and applying knowledge in a way that is indistinguishable from that of a human being. It is also known as strong AI or full AI.",
    },
  });

  const baseline = await prisma.glossary.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      term: "Baseline",
      definition:
        "A model used as a reference point for comparing how well another model (typically, a more complex one) is performing. For example, a logistic regression model might serve as a good baseline for a deep model. For a particular problem, the baseline helps model developers quantify the minimal expected performance that a new model must achieve for the new model to be useful.",
    },
  });

  const batchNormalization = await prisma.glossary.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      term: "Batch Normalization",
      definition:
        "Normalizing the input or output of the activation functions in a hidden layer. Batch normalization can provide the following benefits:\n - Make neural networks more stable by protecting against outlier weights.\n - Enable higher learning rates, which can speed training.\n - Reduce overfitting.",
    },
  });

  const batchSize = await prisma.glossary.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      term: "Batch Size",
      definition:
        "The number of examples in a batch. For instance, if the batch size is 100, then the model processes 100 examples per iteration. The following are popular batch size strategies:\n - Stochastic Gradient Descent (SGD), in which the batch size is 1.\n - Full batch, in which the batch size is the number of examples in the entire training set. For instance, if the training set contains a million examples, then the batch size would be a million examples. Full batch is usually an inefficient strategy.\n - mini-batch in which the batch size is usually between 10 and 1000. Mini-batch is usually the most efficient strategy.",
    },
  });

  console.log({
    activeLearning,
    automatedMachineLearning,
    anomalyDetection,
    generalArtificialIntelligence,
    baseline,
    batchNormalization,
    batchSize,
  });
}
async function main() {
  await seedGlossary();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
