function markDone(taskId) {
  const task = document.getElementById(taskId);
  task.classList.toggle('completed');

  const btn = task.querySelector('.btn-done');
  if (task.classList.contains('completed')) {
    btn.textContent = 'Undo';
  } else {
    btn.textContent = 'Done';
  }
}

function removeTask(taskId) {
  const task = document.getElementById(taskId);
  task.remove();
}

const tasks = document.querySelectorAll('.task');
for (let i = 0; i < tasks.length; i++) {
  tasks[i].style.transition = 'opacity 0.3s';
}