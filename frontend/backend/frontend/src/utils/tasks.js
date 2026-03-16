export const updateTaskStatus = (task) => {
  const now = new Date();
  const expected = new Date(task.expectedTime);

  if (now > expected && task.status !== "Completed") {
    task.status = "Delayed";
    if (task.priority === "High") {
      alert(`⚠️ High priority task delayed: ${task.title}`);
    }
  }
  return task;
};