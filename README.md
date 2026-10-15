# 🎓 TypeScript Mastery Crash Course (MERN to Nest.js & Next.js)

স্বাগতম! এই হ্যান্ডস-অন টিউটোরিয়ালটি আপনার বর্তমান MERN স্ট্যাক অভিজ্ঞতাকে **Nest.js (এন্টারপ্রাইজ ব্যাকএন্ড)** এবং **Next.js (টাইপ-সেফ ফুলস্ট্যাক)**-এ রূপান্তর করার জন্য তৈরি করা হয়েছে।

প্রতিটি ফাইলে রয়েছে:
1. **ব্যাখ্যা (Bengali & English)**
2. **বাস্তব উদাহরণ (Real-world examples)**
3. **প্র্যাকটিস টাস্ক (TODOs)**
4. **স্বয়ংক্রিয় টেস্ট ভ্যালিডেশন**

---

## 🚀 কীভাবে প্র্যাকটিস ও রান করবেন?

যেকোনো ফাইল সরাসরি রান করতে টার্মিনালে লিখুন:
```bash
npx tsx <ফাইলের_পাথ>
```
যেমন:
```bash
npx tsx 01-basics-and-primitives/01-primitive-types.ts
```

পুরো প্রজেক্টের টাইপ চেক করতে:
```bash
npm run typecheck
```

---

## 📂 মডিউল কারিকুলাম সূচিপত্র

### 🔹 [মডিউল ১: Basics and Primitives](./01-basics-and-primitives/)
- `01-primitive-types.ts`: string, number, boolean, null, undefined, arrays, tuples.
- `02-type-inference-vs-annotation.ts`: কখন টাইপ লিখতে হবে আর কখন TS নিজে বোঝে।
- `03-any-unknown-never.ts`: কেন `any` বাদ দিয়ে `unknown` এবং `never` ব্যবহার করবেন।

### 🔹 [মডিউল ২: Objects, Interfaces & Types](./02-objects-interfaces-types/)
- `01-object-types.ts`: Optional (`?`), readonly, এবং excess property checks.
- `02-interface-vs-type.ts`: `extends` vs `&`, Express Request augmentation (Declaration merging).
- `03-as-const-and-enums.ts`: String Enums বনাম আধুনিক `as const` অবজেক্ট প্যাটার্ন।

### 🔹 [মডিউল ৩: Unions & Type Narrowing](./03-unions-and-type-narrowing/)
- `01-type-guards.ts`: `typeof`, `instanceof`, এবং `in` অপারেটর।
- `02-custom-type-guards.ts`: কাস্টম টাইপ গার্ড (`val is Type`) এবং assertion ফাংশন।
- `03-discriminated-unions.ts`: Tagged Unions (Next.js UI State ও Error handling)।

### 🔹 [মডিউল ৪: Functions & Signatures](./04-functions-and-signatures/)
- `01-function-typing.ts`: ফাংশন সিগনেচার, কলব্যাক এবং রেস্ট প্যারামিটার।
- `02-function-overloads.ts`: একই ফাংশনে একাধিক টাইপ সিগনেচার হ্যান্ডলিং।

### 🔹 [মডিউল ৫: Generics Mastery](./05-generics-mastery/)
- `01-generic-basics.ts`: Type variables (`<T>`) এবং আইডেন্টিটি ফাংশন।
- `02-generic-interfaces-types.ts`: সার্বজনীন `ApiResponse<T>` এবং `PaginatedResult<T>`.
- `03-generic-constraints.ts`: `<T extends BaseEntity>`, `keyof`, এবং `T[K]` lookup types.
- `04-generic-classes.ts`: Generic Repository এবং Service প্যাটার্ন (Nest.js স্টাইল)।

### 🔹 [মডিউল ৬: OOP & Classes for Nest.js](./06-oop-classes-for-nestjs/)
- `01-classes-and-modifiers.ts`: `private`, `protected`, `readonly`, এবং **Parameter Properties** (`constructor(private readonly service)`).
- `02-inheritance-and-abstract.ts`: Abstract Class বনাম Interface (Nest.js DI Tokens ও Guards).
- `03-decorators-deep-dive.ts`: Decorators কীভাবে কাজ করে (`@Controller`, `@Get`, `@Injectable`).

### 🔹 [মডিউল ৭: Built-in Utility Types](./07-utility-types-cheatcodes/)
- `01-partial-pick-omit.ts`: `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`.
- `02-record-and-mapping.ts`: `Record<K, V>` এবং Mapped Types.
- `03-awaited-and-return-type.ts`: `ReturnType<T>` ও `Awaited<T>` (Prisma ও Server Actions এর মহৌষধ).

### 🔹 [মডিউল ৮: Real-World Integrations](./08-realworld-nestjs-and-nextjs/)
- `01-nextjs-app-router-types.ts`: Next.js 15+ Async Page Props, Server Actions, Zod Schema Types.
- `02-nestjs-architecture-sim.ts`: সম্পূর্ণ Nest.js আর্কিটেকচার সিমুলেশন (DTO, Guard, Service, Controller, DI).

---

## 💡 শেখার সেরা উপায়:
1. প্রতিটি ফাইলে যান এবং কোড ও ব্যাখ্যাটি পড়ুন।
2. নিচের **🏋️‍♂️ প্র্যাকটিস সেশন (TODO)** অংশটি দেখুন।
3. টার্মিনালে ফাইলটি রান করে চেক করুন: `npx tsx <filepath>`.
4. নিজে কোড পরিবর্তন করে এক্সপেরিমেন্ট করুন।
