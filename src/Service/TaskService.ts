import { scheduleJob, JobCallback, cancelJob } from "node-schedule"

export default class TaskService
{
    private static instance: TaskService;
    public static get Instance(): TaskService
    {
        if(TaskService.instance == null)
        {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }

    /**  *  *  *  *  *
    ┬ ┬ ┬ ┬ ┬ ┬
    │ │ │ │ │  |
    │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    │ │ │ │ └───── month (1 - 12)
    │ │ │ └────────── day of month (1 - 31)
    │ │ └─────────────── hour (0 - 23)
    │ └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)*/
    public Schedule(rule: string, jobCallback: JobCallback)
    {
        cancelJob("search")
        scheduleJob("search", rule, jobCallback);
    }
}