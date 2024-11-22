import projects from '../data/projects.json';
import tasks from '../data/tasks.json';

export const fetchProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 500);
  });
};

export const fetchTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 500);
  });
};
