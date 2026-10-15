/**
 * ============================================================================
 * মডিউল ১.২: Type Inference (টাইপ অনুমান) vs Type Annotation (ম্যানুয়াল টাইপ)
 * ============================================================================
 * 
 * রুল অফ থাম্ব (Rule of Thumb):
 * - যদি TypeScript নিজে থেকেই টাইপ বুঝতে পারে, তবে বাড়তি টাইপ অ্যানোটেশন লিখে কোড নোংরা করার দরকার নেই।
 * - ফাংশনের প্যারামিটার এবং জটিল অবজেক্টের ক্ষেত্রে অবশ্যই টাইপ ডিফাইন করতে হবে।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 01-basics-and-primitives/02-type-inference-vs-annotation.ts
 */

// ১. টাইপ ইনফারেন্স (Type Inference)
// এখানে `: string` বা `: number` লেখার দরকার নেই। TS নিজে থেকেই টাইপ নির্ধারণ করে নিয়েছে:
let framework = "Express"; // TS knows: let framework: string
const version = 5;          // TS knows: const version: 5 (Literal Type!)

// ২. কখন ম্যানুয়াল অ্যানোটেশন (Annotation) বাধ্যতামূলক?
// যখন ভ্যারিয়েবল ডিক্লেয়ার করার সময় মান দেওয়া হয় না:
let authToken: string; 
authToken = "jwt-secret-xyz";

// ফাংশন প্যারামিটারে TS নিজে থেকে অনুমান করতে পারে না, তাই এখানে অ্যানোটেশন দিতেই হবে:
function calculateDiscount(price: number, discountPercentage: number): number {
  return price - (price * discountPercentage) / 100;
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * নিচের ফাংশনটিতে প্যারামিটার এবং রিটার্ন টাইপ মিসিং রয়েছে যার কারণে TypeScript ক্ষুব্ধ (implicit any error)।
 * সঠিক টাইপ অ্যানোটেশন যোগ করুন যাতে টাইপস্ক্রিপ্ট খুশি হয়।
 */

// TODO: `reqMethod` (string) এবং `statusCode` (number) টাইপ অ্যানোটেশন দিন এবং রিটার্ন টাইপ boolean দিন
export function isSuccessfulRequest(reqMethod: string, statusCode: number): boolean {
  if (reqMethod === "GET" && statusCode === 200) {
    return true;
  }
  if (reqMethod === "POST" && statusCode === 201) {
    return true;
  }
  return false;
}

// টেস্ট রান
const test1 = isSuccessfulRequest("POST", 201);
const test2 = isSuccessfulRequest("GET", 404);

if (test1 === true && test2 === false) {
  console.log("🎉 Task Passed! Inference & Annotation properly implemented.");
} else {
  console.error("❌ Task Failed!");
}
