/**
 * ============================================================================
 * মডিউল ৪.১: Function Typing, Callbacks & Signatures
 * ============================================================================
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 04-functions-and-signatures/01-function-typing.ts
 */

// ১. Function Type Alias (কাস্টম ফাংশন টাইপ)
// Express Middleware বা React Event Handler টাইপ করার জন্য এটি ব্যবহৃত হয়:
export type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

// ২. Optional এবং Default Parameters
// default parameter দিলে TS স্বয়ংক্রিয়ভাবে টাইপ অনুমান করে নেয়
function paginate(page = 1, limit = 10, search?: string) {
  return {
    skip: (page - 1) * limit,
    take: limit,
    query: search ? search.trim() : null,
  };
}

// ৩. Rest Parameters (...args)
function sumTotal(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// ৪. Callback Typing
function executeWithLog<T>(actionName: string, fn: () => T): T {
  console.log(`[START] Executing: ${actionName}`);
  const result = fn();
  console.log(`[DONE] ${actionName} finished.`);
  return result;
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি Express Middleware এর মতো ফাংশন টাইপ তৈরি করুন যার নাম `RouteHandler`:
 * - প্যারামিটার ১: `path` (string)
 * - প্যারামিটার ২: `handler` (একটি ফাংশন যা `reqContext: { userId?: string }` নিবে এবং `Promise<void>` রিটার্ন করবে)
 * 
 * এরপর `registerRoute` ফাংশনটি ডিফাইন করুন।
 */

// TODO: HandlerFunction টাইপ ডিফাইন করুন
export type HandlerFunction = (reqContext: { userId?: string }) => Promise<void>;

// TODO: registerRoute ফাংশনটি টাইপসহ লিখুন
export function registerRoute(path: string, handler: HandlerFunction) {
  console.log(`Registered route at ${path}`);
  return { path, handler };
}

// টেস্ট:
const route = registerRoute("/api/profile", async (ctx) => {
  console.log("Handling route for user:", ctx.userId);
});

if (route.path === "/api/profile" && typeof route.handler === "function") {
  console.log("🎉 Module 4.1 Task Passed! Function typing working properly.");
}
