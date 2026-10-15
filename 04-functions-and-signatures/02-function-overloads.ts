/**
 * ============================================================================
 * মডিউল ৪.২: Function Overloads (ফাংশন ওভারলোড)
 * ============================================================================
 * 
 * জাভাস্ক্রিপ্ট সরাসরি মেথড ওভারলোডিং সমর্থন করে না (একই নামের একাধিক ফাংশন লেখা যায় না)।
 * কিন্তু TypeScript-এ আপনি একই ফাংশনের জন্য একাধিক "টাইপ সিগনেচার" লিখে
 * নিচে একটি কমন ইমপ্লিমেন্টেশন দিতে পারেন।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 04-functions-and-signatures/02-function-overloads.ts
 */

// ১. ওভারলোড সিগনেচার ১: যদি id (string) পাস করা হয়, তবে একটি Single User রিটার্ন হবে
function getUser(id: string): { id: string; name: string };

// ২. ওভারলোড সিগনেচার ২: যদি limit (number) পাস করা হয়, তবে User Array রিটার্ন হবে
function getUser(limit: number): Array<{ id: string; name: string }>;

// ৩. আসল ইমপ্লিমেন্টেশন সিগনেচার (বাইরে থেকে এটি সরাসরি দেখা যায় না):
function getUser(param: string | number): any {
  if (typeof param === "string") {
    return { id: param, name: `User_${param}` };
  }
  // param is number
  return Array.from({ length: param }, (_, i) => ({
    id: `${i + 1}`,
    name: `User_${i + 1}`,
  }));
}

// ব্যবহারের সময় ম্যাজিক দেখুন:
const single = getUser("101"); // TS জানে এর টাইপ { id: string; name: string }
const multiple = getUser(3);    // TS জানে এর টাইপ Array<{ id: string; name: string }>

console.log("Single user:", single);
console.log("Multiple users:", multiple);

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * `formatValue` নামের একটি ফাংশন ওভারলোড করুন:
 * - সিগনেচার ১: যদি ইনপুট `value: number` হয়, তবে রিটার্ন করবে `string` (যেমন: "$100.00")
 * - সিগনেচার ২: যদি ইনপুট `value: Date` হয়, তবে রিটার্ন করবে `number` (timestamp: date.getTime())
 */

// TODO: Overload 1 (number -> string)
export function formatValue(value: number): string;

// TODO: Overload 2 (Date -> number)
export function formatValue(value: Date): number;

// Implementation
export function formatValue(value: number | Date): string | number {
  if (typeof value === "number") {
    return `$${value.toFixed(2)}`;
  }
  return value.getTime();
}

// টেস্ট:
const formattedMoney = formatValue(49.9);
const timestamp = formatValue(new Date("2026-01-01T00:00:00Z"));

if (formattedMoney === "$49.90" && typeof timestamp === "number") {
  console.log("🎉 Module 4.2 Task Passed! Function overloads working accurately.");
}
