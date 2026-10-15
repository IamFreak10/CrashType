/**
 * ============================================================================
 * মডিউল ১.৩: The Holy Trinity — `any` vs `unknown` vs `never`
 * ============================================================================
 *
 * ১. `any`: টাইপ চেকারকে পুরোপুরি অন্ধ করে দেয়। "I don't care, do whatever" (এড়িয়ে চলুন!)
 * ২. `unknown`: টাইপ-সেফ `any`। "I don't know yet, check before using" (API response, try/catch error এ ব্যবহার করুন)
 * ৩. `never`: যে মান কখনো ঘটতে পারে না। "This state should never exist" (Exhaustive check এর জন্য)
 *
 * কিভাবে রান করবেন:
 * $ npx tsx 01-basics-and-primitives/03-any-unknown-never.ts
 */

// ❌ 1. 'any' এর বিপদ:
let badData: any = 'Hello World';
// badData.nonExistentMethod(); // TS কোনো এরর দেবে না, কিন্তু রানটাইমে ক্র্যাশ করবে!
// ✅ 2. 'unknown' এর সুরক্ষা:
let safeData: unknown = 'Hello Nest & Next';
// safeData.toUpperCase(); // ❌ Compile Error: Object is of type 'unknown'!

// ব্যবহার করার আগে টাইপ চেক (Narrowing) করতে হবে:
if (typeof safeData === 'string') {
  console.log('Safe string:', safeData.toUpperCase()); // ✅ এখন TS নিশ্চিত এটা string
}

// 🛡️ 3. 'never' এবং Exhaustive Switch Check
// এটি Nest.js বিজনেস লজিক এবং Next.js UI তে বাগারোধক দেয়াল তৈরি করে
type Role = 'ADMIN' | 'USER' | 'MODERATOR';

function getPermissions(role: Role): string[] {
  switch (role) {
    case 'ADMIN':
      return ['create', 'read', 'update', 'delete'];
    case 'USER':
      return ['read'];
    case 'MODERATOR':
      return ['read', 'update'];
    default:
      // যদি ভবিষ্যতে কেউ Role এ নতুন কোনো মান যোগ করে (যেমন: "SUPERADMIN")
      // কিন্তু এই switch এ হ্যান্ডেল না করে, তবে নিচের লাইনটি কম্পাইল এরর দেবে!
      const _exhaustiveCheck: never = role;
      return _exhaustiveCheck;
  }
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি সেফ এরর হ্যান্ডলার ফাংশন লিখুন।
 * Express বা Next.js Server Action-এ try/catch ব্লকের error সবসময় 'unknown' টাইপ হওয়া উচিত।
 *
 * ফাংশনটি:
 * - যদি error instanceof Error হয়, তবে error.message রিটার্ন করবে।
 * - যদি error স্ট্রিং হয় (typeof error === 'string'), তবে সরাসরি string রিটার্ন করবে।
 * - অন্য সব ক্ষেত্রে "An unknown error occurred" রিটার্ন করবে।
 */

export function parseErrorMessage(error: unknown): string {
  // TODO: টাইপ গার্ড দিয়ে লজিক লিখুন (any ব্যবহার করা যাবে না!)
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

// ভ্যালিডেশন চেক:
const err1 = parseErrorMessage(new Error('Database connection failed'));
const err2 = parseErrorMessage('Timeout error');
const err3 = parseErrorMessage({ weirdObject: true });

if (
  err1 === 'Database connection failed' &&
  err2 === 'Timeout error' &&
  err3 === 'An unknown error occurred'
) {
  console.log("🎉 Task Passed! Error parsed safely without using 'any'.");
} else {
  console.error('❌ Task Failed!');
}
