/**
 * ============================================================================
 * মডিউল ৫.১: Generics Basics (টাইপ ভ্যারিয়েবল)
 * ============================================================================
 * 
 * জেনেরিক কী?
 * সহজ কথায়: ফাংশন যেমন ভ্যালুকে প্যারামিটার হিসেবে নেয়,
 * তেমনি Generic হলো টাইপকে প্যারামিটার হিসেবে নেওয়া!
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 05-generics-mastery/01-generic-basics.ts
 */

// ১. আইডেন্টিটি ফাংশন (The Identity Function)
// 'any' ব্যবহার করলে ইনপুটের টাইপ হারিয়ে যায়:
// function badIdentity(arg: any): any { return arg; }

// Generic ব্যবহার করলে যে টাইপ ইনপুট দেওয়া হবে হুবহু সেই টাইপ রিটার্ন হবে:
function identity<T>(arg: T): T {
  return arg;
}

const strOutput = identity("TypeScript"); // Type: string
const numOutput = identity(42);           // Type: number

// ২. একাধিক টাইপ প্যারামিটার (<T, U>)
function createPair<TFirst, TSecond>(first: TFirst, second: TSecond): [TFirst, TSecond] {
  return [first, second];
}

const pair = createPair("statusCode", 200); // Type: [string, number]

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি জেনেরিক ইউটিলিটি ফাংশন লিখুন: `firstElement<T>(arr: T[]): T | undefined`
 * যা যে কোনো টাইপের অ্যারে গ্রহণ করবে এবং তার প্রথম উপাদানটি টাইপ-সেফভাবে রিটার্ন করবে।
 */

// TODO: firstElement ফাংশনটি লিখুন
export function firstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// টেস্ট:
const numList = [10, 20, 30];
const firstNum = firstElement(numList); // Type: number | undefined

const wordList = ["nest", "next", "express"];
const firstWord = firstElement(wordList); // Type: string | undefined

if (firstNum === 10 && firstWord === "nest") {
  console.log("🎉 Module 5.1 Task Passed! Generic identity and arrays working.");
}
