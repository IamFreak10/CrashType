/**
 * ============================================================================
 * মডিউল ৫.৪: Generic Classes (The Nest.js Repository / Service Pattern)
 * ============================================================================
 * 
 * Nest.js এ প্রতিটা মডেলে (User, Post, Comment) আলাদা করে CRUD মেথড লেখার বদলে
 * একটি Generic Base Repository বা Base Service ক্লাস বানানো হয়।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 05-generics-mastery/04-generic-classes.ts
 */

export interface IdentifiableEntity {
  id: string;
}

// জেনেরিক ইন-মেমোরি রেপোজিটরি ক্লাস
export class GenericRepository<T extends IdentifiableEntity> {
  protected items: T[] = [];

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  delete(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < initialLength;
  }
}

// ইউজার ও পোস্টের জন্য ব্যবহার:
interface User extends IdentifiableEntity {
  name: string;
  email: string;
}

interface Post extends IdentifiableEntity {
  title: string;
  content: string;
}

const userRepo = new GenericRepository<User>();
userRepo.create({ id: "u_1", name: "Freak", email: "freak@dev.com" });
const user = userRepo.findById("u_1"); // Type is User | undefined (100% type-safe!)

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * `GenericRepository` কে এক্সটেন্ড করে একটি `AuditRepository<T extends IdentifiableEntity>` তৈরি করুন
 * যাতে একটি বাড়তি মেথড থাকবে:
 * `count(): number` (যা মোট আইটেমের সংখ্যা রিটার্ন করবে)
 */

// TODO: AuditRepository তৈরি করুন
export class AuditRepository<T extends IdentifiableEntity> extends GenericRepository<T> {
  count(): number {
    return this.items.length;
  }
}

// টেস্ট:
const postRepo = new AuditRepository<Post>();
postRepo.create({ id: "p_1", title: "NestJS TS Guide", content: "..." });
postRepo.create({ id: "p_2", title: "NextJS 16 Guide", content: "..." });

if (postRepo.count() === 2 && postRepo.findById("p_1")?.title === "NestJS TS Guide") {
  console.log("🎉 Module 5.4 Task Passed! Generic class inheritance working seamlessly.");
}
