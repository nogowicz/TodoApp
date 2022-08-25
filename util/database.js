import * as SQLite from 'expo-sqlite';

import { Todo } from '../models/todo';

const database = SQLite.openDatabase('tasks.db');

export function deleteTable() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`DROP TABLE tasks`), [], () => { resolve(); }, (_, error) => reject(error);
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
                    title TEXT NOT NULL
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
                `SELECT * FROM tasks`,
                [],
                (_, result) => {
                    const tasks = [];

                    for (const dp of result.rows._array) {
                        tasks.push(
                            new Todo(
                                dp.title,
                                dp.id
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