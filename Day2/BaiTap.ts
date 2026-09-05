//npx tsx Day2/BaiTap.ts
//1. Create a Promise that returns the string "Hello Async" after 2 seconds
const helloAsyncPromise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});
//Test Bài 1
// helloAsyncPromise.then((msg) => console.log("Bài 1:", msg));
//2. Write a function that returns a Promise resolving with the number 10 after 1 second.
function getNumberAfterDelay(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}
//Test Bài 2
// (async () => {
//   const num = await getNumberAfterDelay();
//   console.log("Bài 2:", num);
// })();
//3. Write a function that rejects a Promise with the error "Something went wrong" after 1 second.
function alwaysFails(): Promise<never> {
  return new Promise<never>((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}
//Test Bài 3
// (async () => {
//   try {
//     await alwaysFails();
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log("Bài 3:", err.message);
//     }
//   }
// })();
//4. Use .then() and .catch() to handle a Promise that returns a random number.
function getRandomNumber(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random();
      if (num < 0.9) {
        resolve(num);
      } else {
        reject(new Error("Random failure occurred"));
      }
    }, 500);
  });
}
function runRandomNumberDemo(): void {
  getRandomNumber()
    .then((num) => {
      console.log("Random number:", num);
    })
    .catch((err) => {
      console.error("Error:", err.message);
    });
}
//Test Bài 4
// runRandomNumberDemo();
//5. Create a function simulateTask(time) that returns a Promise resolving with "Task done" after time ms.
function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}
//Test Bài 5
// (async () => {
//   const result = await simulateTask(800);
//   console.log("Bài 5:", result);
// })();
//6. Use Promise.all() to run 3 simulated Promises in parallel and print the result.
function runPromiseAllDemo(): Promise<void> {
  return Promise.all([
    simulateTask(1000),
    simulateTask(1500),
    simulateTask(2000),
  ]).then((results) => {
    console.log("Promise.all results:", results);
  });
}
//Test Bài 6
// runPromiseAllDemo();
//7. Use Promise.race() to return whichever Promise resolves first.
function runPromiseRaceDemo(): Promise<void> {
  return Promise.race([
    simulateTask(1000),
    simulateTask(500),
    simulateTask(2000),
  ]).then((result) => {
    console.log("Promise.race winner:", result);
  });
}
//Test Bài 7
// runPromiseRaceDemo();
//8. Create a Promise chain: square the number 2, then double it, then add 5.
function promiseChainDemo(): Promise<void> {
  return Promise.resolve(2)
    .then((num) => num * num)
    .then((num) => num * 2)
    .then((num) => num + 5)
    .then((result) => {
      console.log("Promise chain result:", result);
    });
}
//Test Bài 8
// promiseChainDemo();
//9. Write a Promise that reads an array after 1 second and filters even numbers.
function getEvenNumbers(arr: number[]): Promise<number[]> {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const evens = arr.filter((n) => n % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}
//Test Bài 9
// (async () => {
//   const evens = await getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
//   console.log("Bài 9 (số chẵn):", evens);
// })();
//10. Use .finally() to log "Done" when a Promise finishes (success or failure).
function runFinallyDemo(): Promise<void> {
  return getRandomNumber()
    .then((num) => {
      console.log("Success value:", num);
    })
    .catch((err) => {
      console.error("Caught error:", err.message);
    })
    .finally(() => {
      console.log("Done");
    });
}
//Test Bài 10
// runFinallyDemo();
//B. ASYNC/AWAIT
//11. Convert Exercise 1 into async/await.
async function helloAsyncAwait(): Promise<string> {
  const result = await new Promise<string>((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
  return result;
}
//Test Bài 11
// (async () => {
//   const helloResult = await helloAsyncAwait();
//   console.log("Bài 11:", helloResult);
// })();
//12. Write an async function that calls simulateTask(2000) and logs the result.
async function runSimulateTaskDemo(): Promise<void> {
  const result = await simulateTask(2000);
  console.log("simulateTask result:", result);
}
//Test Bài 12
// runSimulateTaskDemo();
//13. Handle errors using try/catch with async/await.
async function handleErrorDemo(): Promise<void> {
  try {
    await alwaysFails();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Caught with try/catch:", err.message);
    }
  }
}
//Test Bài 13
// handleErrorDemo();
//14. Write an async function that takes a number, waits 1 second, and returns the number × 3
async function multiplyByThree(num: number): Promise<number> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}
//Test Bài 14
// (async () => {
//   const result = await multiplyByThree(5);
//   console.log("Bài 14:", result); // 15
// })();
//15. Call multiple async functions sequentially using await.
async function runSequentialDemo(): Promise<void> {
  const a = await multiplyByThree(1); // 3
  const b = await multiplyByThree(a); // 9
  const c = await multiplyByThree(b); // 27
  console.log("Sequential results:", { a, b, c });
}
//Test Bài 15
// runSequentialDemo();
//16. Call multiple async functions in parallel using Promise.all().
async function runParallelDemo(): Promise<void> {
  const [x, y, z] = await Promise.all([
    multiplyByThree(1),
    multiplyByThree(2),
    multiplyByThree(3),
  ]);
  console.log("Parallel results:", { x, y, z }); // {3, 6, 9}
}
//Test Bài 16
// runParallelDemo();
//17. Use for await...of to iterate over an array of Promises.
async function runForAwaitOfDemo(): Promise<void> {
  const tasks: Promise<number>[] = [1, 2, 3].map((n) => multiplyByThree(n));
  for await (const value of tasks) {
    console.log("for await...of value:", value);
  }
}
//Test Bài 17
// runForAwaitOfDemo();
//18. Write an async function fetchUser(id) that simulates an API call (resolves a user object after 1 second).
interface User {
  id: number;
  name: string;
}
async function fetchUser(id: number): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}` });
    }, 1000);
  });
}
//Test Bài 18
// (async () => {
//   const user = await fetchUser(1);
//   console.log("Bài 18:", user);
// })();
//19. Create an async function fetchUsers(ids: number[]) that calls fetchUser for each ID.
async function fetchUsers(ids: number[]): Promise<User[]> {
  const users = await Promise.all(ids.map((id) => fetchUser(id)));
  return users;
}
//Test Bài 19
// (async () => {
//   const users = await fetchUsers([1, 2, 3]);
//   console.log("Bài 19 (users):", users);
// })();
//20. Add a timeout: if the API call takes more than 2 seconds, throw an error.
function fetchUserWithTimeout(
  id: number,
  timeoutMs: number = 2000
): Promise<User> {
  const userPromise = fetchUser(id);
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  return Promise.race([userPromise, timeoutPromise]);
}
//Test Bài 20
// (async () => {
//   try {
//     const user = await fetchUserWithTimeout(1, 2000);
//     console.log("Bài 20 (user với timeout):", user);
//   } catch (err) {
//     if (err instanceof Error) console.log("Bài 20 lỗi:", err.message);
//   }
// })();
//C. FETCH API & SIMULATED I/O
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
//21. Use fetch to get data from a public API (e.g., https://jsonplaceholder.typicode.com/todos/1).
async function getTodoById(id: number): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: Todo = await response.json();
  return data;
}
// Test Bài 21
// (async () => {
//   try {
//     const todo = await getTodoById(1);
//     console.log("Bài 21 (todo):", todo);
//   } catch (err) {
//     console.log("Bài 21 lỗi:", err);
//   }
// })();
//22. Call the API multiple times and log the results.
async function callApiMultipleTimes(ids: number[]): Promise<void> {
  for (const id of ids) {
    const todo = await getTodoById(id);
    console.log(`Todo #${id}:`, todo);
  }
}
//Test Bài 22
// (async () => {
//   try {
//     await callApiMultipleTimes([1, 2]);
//   } catch (err) {
//     console.log("Bài 22 lỗi:", err);
//   }
// })();
//23. Write an async function that fetches a list of todos and filters out those that are not completed.
async function getIncompleteTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const todos: Todo[] = await response.json();
  return todos.filter((todo) => !todo.completed);
}
//Test Bài 23
// (async () => {
//   try {
//     const incomplete = await getIncompleteTodos();
//     console.log("Bài 23 - Số todo chưa hoàn thành:", incomplete.length);
//   } catch (err) {
//     console.log("Bài 23 lỗi:", err);
//   }
// })();
//24. Write an async function postData() that sends a POST request to a test API.
async function postData(): Promise<Todo> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      title: "New todo from TypeScript",
      completed: false,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const created: Todo = await response.json();
  return created;
}
//Test Bài 24
// (async () => {
//   try {
//     const created = await postData();
//     console.log("Bài 24 - Đã tạo:", created);
//   } catch (err) {
//     console.log("Bài 24 lỗi:", err);
//   }
// })();
//25.  Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.
function downloadFile(fileName: string): Promise<void> {
  return new Promise<void>((resolve) => {
    console.log(`Bắt đầu tải file: ${fileName}...`);
    setTimeout(() => {
      console.log(`Tải xong file: ${fileName}`);
      resolve();
    }, 3000);
  });
}
//Test Bài 25
// downloadFile("bao-cao.pdf");
//26. Use async/await with setTimeout to simulate a 5-second wait.
function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
async function waitFiveSeconds(): Promise<void> {
  console.log("Bắt đầu chờ 5 giây...");
  await delay(5000);
  console.log("Đã chờ xong 5 giây!");
}
//Test Bài 26
// waitFiveSeconds();
//27. Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.
async function fetchWithRetry<T>(url: string, retries: number = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: T = await response.json();
      return data;
    } catch (err) {
      lastError = err;
      console.warn(`Lần thử ${attempt}/${retries} thất bại.`);
      await delay(500);
    }
  }
  throw new Error(
    `Không thể lấy dữ liệu sau ${retries} lần thử. Lỗi cuối cùng: ${lastError}`
  );
}
//Test Bài 27
// (async () => {
//   try {
//     const todo = await fetchWithRetry<Todo>(
//       "https://jsonplaceholder.typicode.com/todos/1",
//       3
//     );
//     console.log("Bài 27 - Kết quả:", todo);
//   } catch (err) {
//     console.log("Bài 27 lỗi:", err);
//   }
// })();
//28. Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).
async function batchProcess(): Promise<string[]> {
  const tasks = [
    simulateTask(500),
    simulateTask(700),
    simulateTask(900),
    simulateTask(1100),
    simulateTask(1300),
  ];
  const results = await Promise.all(tasks);
  console.log("Batch process results:", results);
  return results;
}
//Test Bài 28
// batchProcess();
//29. Write an async function queueProcess() that processes tasks sequentially in a queue.
async function queueProcess(): Promise<string[]> {
  const times = [500, 700, 900];
  const results: string[] = [];
  for (const time of times) {
    console.log(`Đang xử lý task với thời gian ${time}ms...`);
    const result = await simulateTask(time);
    results.push(result);
  }
  console.log("Queue process results:", results);
  return results;
}
//Test Bài 29
// queueProcess();
//30. Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.
async function checkMultipleApiStatuses(): Promise<void> {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/invalid-endpoint-xyz",
  ];
  const results = await Promise.allSettled(
    urls.map((url) =>
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
    )
  );
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`[OK] ${urls[index]} ->`, result.value);
    } else {
      console.log(`[FAILED] ${urls[index]} ->`, result.reason.message);
    }
  });
}
//Test Bài 30
checkMultipleApiStatuses();
