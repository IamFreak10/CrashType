/**
 * ============================================================================
 * মডিউল ৩.১: Built-in Type Guards (`typeof`, `instanceof`, `in`)
 * ============================================================================
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 03-unions-and-type-narrowing/01-type-guards.ts
 */

// ১. 'typeof' Guard (Primitives)
function padLeft(value: string, padding: string | number): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value; // TS জানে padding একটি number
  }
  return padding + value;               // TS জানে padding একটি string
}

// ২. 'instanceof' Guard (Classes & Built-in Objects যেমন Date, Error)
function formatDate(input: string | Date): string {
  if (input instanceof Date) {
    return input.toISOString();         // TS জানে input একটি Date অবজেক্ট
  }
  return new Date(input).toISOString(); // TS জানে input একটি string
}

// ৩. 'in' Operator Guard (Object properties চেক করতে)
type EmailNotification = { email: string; subject: string };
type SMSNotification = { phoneNumber: string; message: string };

function sendNotification(notification: EmailNotification | SMSNotification) {
  if ("email" in notification) {
    console.log(`Sending email to ${notification.email}: ${notification.subject}`);
  } else {
    console.log(`Sending SMS to ${notification.phoneNumber}: ${notification.message}`);
  }
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি ফাংশন লিখুন `extractId`:
 * প্যারামিটার `target` হতে পারে:
 * - number
 * - string
 * - অথবা এমন একটি object যার ভেতর `id` (string | number) প্রপার্টি রয়েছে
 * 
 * ফাংশনটিকে অবশ্যই স্ট্রিং হিসেবে ID রিটার্ন করতে হবে:
 * - যদি target string হয় -> target রিটার্ন করবে
 * - যদি target number হয় -> target.toString() রিটার্ন করবে
 * - যদি target object হয় এবং তাতে "id" থাকে -> target.id.toString() রিটার্ন করবে
 * - অন্যথায় "UNKNOWN_ID" রিটার্ন করবে
 */

export function extractId(target: string | number | { id: string | number } | null | undefined): string {
  // TODO: Type guard লজিক লিখুন (as assertion ছাড়া!)
  if (typeof target === "string") {
    return target;
  }
  if (typeof target === "number") {
    return target.toString();
  }
  if (target && typeof target === "object" && "id" in target) {
    return target.id.toString();
  }
  return "UNKNOWN_ID";
}

// টেস্ট:
const t1 = extractId("user_101");
const t2 = extractId(505);
const t3 = extractId({ id: 99 });
const t4 = extractId(null);

if (t1 === "user_101" && t2 === "505" && t3 === "99" && t4 === "UNKNOWN_ID") {
  console.log("🎉 Module 3.1 Task Passed! All type guards working safely.");
} else {
  console.error("❌ Module 3.1 Task Failed!");
}
