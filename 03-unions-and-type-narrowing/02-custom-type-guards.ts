/**
 * ============================================================================
 * মডিউল ৩.২: Custom Type Guards (`val is Type`) & Assertion Functions
 * ============================================================================
 * 
 * রিয়েল-ওয়ার্ল্ড সমস্যা:
 * Express-এর `req.query` বা `req.body` থেকে আসা ডেটা আনটাইপড থাকে।
 * আমরা যদি সাধারণ বুলিয়ান ফাংশন লিখি:
 * function isValid(x) { return typeof x === 'string'; }
 * TS কিন্তু ফাংশন কলের পর x কে string ভাববে না!
 * 
 * সমাধান: Type Predicate (`val is Type`)
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 03-unions-and-type-narrowing/02-custom-type-guards.ts
 */

export interface AuthenticatedUser {
  id: string;
  role: "ADMIN" | "USER";
  email: string;
}

// কাস্টম টাইপ গার্ড ফাংশন:
// রিটার্ন টাইপে দেখুন: `user is AuthenticatedUser`
export function isAuthenticatedUser(user: unknown): user is AuthenticatedUser {
  return (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    "role" in user &&
    "email" in user &&
    typeof (user as any).id === "string" &&
    typeof (user as any).email === "string"
  );
}




// কন্ট্রোলারে ব্যবহারের নিয়ম:
function processDashboard(reqUser: unknown) {
  if (isAuthenticatedUser(reqUser)) {
    // এখানে TS ১০০% জানে reqUser হলো AuthenticatedUser!
    console.log(`Access granted to ${reqUser.email} [${reqUser.role}]`);
  } else {
    console.log("Unauthorized access attempt!");
  }
}

// ২. Assertion Functions (`asserts condition`)
// এটি কোনো ভ্যালু রিটার্ন করে না, কিন্তু শর্ত মিথ্যা হলে Error থ্রো করে:
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি কাস্টম টাইপ গার্ড লিখুন: `isStringArray(val: unknown): val is string[]`
 * যা চেক করবে:
 * ১. val একটি Array কিনা (Array.isArray(val))
 * ২. অ্যারের প্রতিটি এলিমেন্ট string কিনা (val.every(...))
 */

// TODO: ফাংশনটি সম্পূর্ণ করুন
export function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((item) => typeof item === "string");
}

// টেস্ট:
const list1: unknown = ["react", "next", "nest"];
const list2: unknown = ["react", 123, "nest"];
const list3: unknown = "not-an-array";

if (isStringArray(list1) && !isStringArray(list2) && !isStringArray(list3)) {
  console.log("🎉 Module 3.2 Task Passed! Custom Type Guard works perfectly.");
} else {
  console.error("❌ Module 3.2 Task Failed!");
}
