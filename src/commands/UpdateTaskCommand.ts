import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class UpdateTaskCommand extends AbstractCommand {
  private previousState: Task | undefined;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const tasks = this.taskList.getAllTasks();
    this.previousState = tasks.find(t => t.id === this.taskId);
    this.taskList.updateTask(this.taskId, this.updates);
  }

  undo(): void {
    if (this.previousState) {
      this.taskList.updateTask(this.taskId, this.previousState);
    }
  }
}