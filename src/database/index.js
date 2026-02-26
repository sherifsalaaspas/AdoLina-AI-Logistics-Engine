// Simulation of a Database Connection
const logisticsTasks = [
  { id: 1, task: 'Inventory Audit', status: 'Completed', adapter: 'ILSCHERY' },
  { id: 2, task: 'Demand Forecasting', status: 'In Progress', adapter: 'ILSDEMAND' },
  { id: 3, task: 'Supply Chain Optimization', status: 'Pending', adapter: 'ILSOLUTION' }
];

module.exports = {
  getTasks: async () => {
    return logisticsTasks;
  },
  addTask: async (task) => {
    const newTask = { id: logisticsTasks.length + 1, ...task };
    logisticsTasks.push(newTask);
    return newTask;
  },
  isConnected: () => true
};
