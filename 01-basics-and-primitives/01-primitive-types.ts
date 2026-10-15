/**
 * ============================================================================
 * মডিউল ১.১: Primitive Types (মৌলিক ডেটা টাইপসমূহ)
 * ============================================================================
 * 
 * জাভাস্ক্রিপ্টের ৭টি প্রিমিটিভ টাইপ আছে:
 * string, number, boolean, null, undefined, bigint, symbol.
 * TypeScript এগুলোর ওপর স্ট্যাটিক টাইপ লেয়ার যোগ করে যাতে ভুল ডেটা অ্যাসাইন না হয়।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 01-basics-and-primitives/01-primitive-types.ts
 */

// ১. স্ট্রিং (string)
const developerName: string = "Freak";
const stack: string = `MERN to Fullstack`;

// ২. নাম্বার (number) - জাভাস্ক্রিপ্টে float এবং int উভয়ই 'number'
const age: number = 24;
const rating: number = 4.95;

// ৩. বুলিয়ান (boolean)
const isFullStackReady: boolean = true;

// ৪. null এবং undefined
// টিপ: strictNullChecks অন থাকলে আপনি কোনো string ভ্যারিয়েবলে সরাসরি null বা undefined রাখতে পারবেন না।
let userBio: string | null = null; // Union type: string হতে পারে অথবা null
let tempToken: string | undefined = undefined;

// ৫. Array (অ্যারে ডিক্লেয়ার করার দুটি উপায়)
const techSkills: string[] = ["React", "Express", "Node.js", "MongoDB"];
const projectYears: Array<number> = [2024, 2025, 2026];

// ৬. Tuple (ফিক্সড লেন্থ এবং নির্দিষ্ট পজিশনের টাইপসহ অ্যারে)
// যেমন: React এর useState হুকের রিটার্ন ভ্যালু একটি Tuple -> [state, setState]
let coordinate: [latitude: number, longitude: number] = [23.8103, 90.4125];

console.log("✅ Module 1.1 Loaded Successfully!");
console.log(`Developer: ${developerName}, Skills: ${techSkills.join(", ")}`);

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO: নিচের সমস্যাগুলো সমাধান করুন)
// ============================================================================

/**
 * টাস্ক ১:
 * এমন একটি Tuple টাইপ এবং ভ্যারিয়েবল ডিক্লেয়ার করুন যার নাম `httpResponse`
 * - ১ম এলিমেন্ট হবে HTTP status code (number) যেমন 200
 * - ২য় এলিমেন্ট হবে status message (string) যেমন "OK"
 * - ৩য় এলিমেন্ট হবে isSuccess (boolean) যেমন true
 */

// TODO: নিচের টাইপ অ্যানোটেশন এবং ভ্যালু ঠিক করুন
export let httpResponse: [number, string, boolean] = [200, "OK", true];

// ভ্যালিডেশন চেক (রান করলে যদি কোনো এরর না দেয়, বুঝবেন আপনার টাস্ক কমপ্লিট!)
if (httpResponse[0] === 200 && httpResponse[1] === "OK" && httpResponse[2] === true) {
  console.log("🎉 Task 1 Passed! Tuple is properly configured.");
} else {
  console.error("❌ Task 1 Failed! Please check httpResponse tuple.");
}
