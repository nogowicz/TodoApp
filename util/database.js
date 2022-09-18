import * as SQLite from 'expo-sqlite';

import { Todo } from '../models/todo';

const database = SQLite.openDatabase('tasks.db');

export function deleteTable() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `DROP TABLE tasks`
            ),
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
        });
        return promise;
    })
}

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    completed INTEGER DEFAULT 0,
                    important INTEGER DEFAULT 0,
                    urgent INTEGER DEFAULT 0,
                    effort INTEGER DEFAULT 0,
                    notes TEXT
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}


export function insertTask(task) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO tasks (title) VALUES (?)`,
                [
                    task.title,
                ],

                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function fetchTasks() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM tasks WHERE completed = 0`,
                [],
                (_, result) => {
                    const tasks = [];

                    for (const dp of result.rows._array) {
                        tasks.push(
                            new Todo(
                                dp.title,
                                dp.id,
                                dp.completed,
                                dp.important,
                                dp.urgent,
                                dp.effort
                            )
                        );
                    }
                    resolve(tasks);

                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function fetchTasksInNewestFirstMode() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM tasks 
                WHERE completed = 0
                ORDER BY id DESC`,
                [],
                (_, result) => {
                    const tasks = [];

                    for (const dp of result.rows._array) {
                        tasks.push(
                            new Todo(
                                dp.title,
                                dp.id,
                                dp.completed,
                                dp.important,
                                dp.urgent,
                                dp.effort
                            )
                        );
                    }
                    resolve(tasks);

                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function fetchTasksInPowerMode() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM tasks 
                WHERE completed = 0 
                ORDER BY 
                    important DESC,
                    urgent DESC,
                    effort DESC
                `,
                [],
                (_, result) => {
                    const tasks = [];

                    for (const dp of result.rows._array) {
                        tasks.push(
                            new Todo(
                                dp.title,
                                dp.id,
                                dp.completed,
                                dp.important,
                                dp.urgent,
                                dp.effort
                            )
                        );
                    }
                    resolve(tasks);

                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function fetchCompletedTasks() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM tasks WHERE completed = 1`,
                [],
                (_, result) => {
                    const tasks = [];

                    for (const dp of result.rows._array) {
                        tasks.push(
                            new Todo(
                                dp.title,
                                dp.id,
                                dp.completed,
                                dp.important,
                                dp.urgent,
                                dp.effort
                            )
                        );
                    }
                    resolve(tasks);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function deleteTask(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM tasks WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}

export function deleteAllCompletedTasks() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM tasks WHERE completed = 1`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}

export function updateCompletion(id, completed) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE tasks 
                 SET completed = ${completed}
                 WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}


export function fetchTask(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM tasks WHERE id = ?`,
                [id],
                (_, result) => {
                    const task = result.rows._array[0];
                    resolve(task);

                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function updateTask(id, title, important, urgent, effort, notes) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE tasks 
                 SET title =  ?,
                    important = ?,
                    urgent = ?,
                    effort = ?,
                    notes = ?
                    WHERE id = ?`,
                [title, important, urgent, effort, notes, id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}