/**
 * ============================================================================
 * মডিউল ৫.৩: Generic Constraints (`extends` & `keyof`)
 * ============================================================================
 * 
 * Generic Constraint কী?
 * যখন আপনি চান যে কোনো টাইপ আসুক ঠিক আছে, কিন্তু তার মধ্যে নির্দিষ্ট কিছু ফিল্ড বা বৈশিষ্ট্য
 * অবশ্যই থাকতে হবে।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 05-generics-mastery/03-generic-constraints.ts
 */

// ১. Base Entity Constraint (<T extends ...>)
interface BaseEntity {
  id: string;
}

// T যাই হোক না কেন, তার মধ্যে 'id: string' থাকতেই হবে:
function printEntityId<T extends BaseEntity>(entity: T): string {
  console.log(`Entity ID: ${entity.id}`);
  return entity.id;
}

printEntityId({ id: "usr_1", name: "Fahim", role: "admin" });
// printEntityId({ title: "No ID here" }); // ❌ Compile Error: Property 'id' is missing!

// ২. 'keyof' Constraint (<K extends keyof T>)
// কোনো অবজেক্ট থেকে ভুল কি (property) অ্যাক্সেস করা অসম্ভব করে তোলা:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const config = {
  port: 8080,
  host: "localhost",
  isProduction: false,
};

const host = getProperty(config, "host");         // Type: string
const port = getProperty(config, "port");         // Type: number
// getProperty(config, "databaseUrl");            // ❌ Compile Error: Argument of type '"databaseUrl"' is not assignable to "port" | "host" | "isProduction"

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি টাইপ-সেফ ফিল্টার ফাংশন তৈরি করুন:
 * `filterByProperty<T, K extends keyof T>(items: T[], key: K, targetValue: T[K]): T[]`
 * যা অবজেক্টের অ্যারেকে কোনো নির্দিষ্ট কি এবং তার মান অনুযায়ী ফিল্টার করবে।
 */

// TODO: filterByProperty ফাংশনটি লিখুন
export function filterByProperty<T, K extends keyof T>(
  items: T[],
  key: K,
  targetValue: T[K]
): T[] {
  return items.filter((item) => item[key] === targetValue);
}

// টেস্ট:
const users = [
  { id: "1", name: "Alice", role: "ADMIN" },
  { id: "2", name: "Bob", role: "USER" },
  { id: "3", name: "Charlie", role: "ADMIN" },
];

const admins = filterByProperty(users, "role", "ADMIN");
const userWithId2 = filterByProperty(users, "id", "2");

if (admins.length === 2 && userWithId2.length === 1 && userWithId2[0].name === "Bob") {
  console.log("🎉 Module 5.3 Task Passed! Generic constraints & keyof mastered.");
}
