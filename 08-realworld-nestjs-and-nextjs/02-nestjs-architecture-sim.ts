/**
 * ============================================================================
 * মডিউল ৮.২: Nest.js End-to-End Architecture Simulation
 * ============================================================================
 * 
 * এই ফাইলটিতে পুরো Nest.js আর্কিটেকচার (DTO, Guard, Service, Controller, DI)
 * বিশুদ্ধ TypeScript দিয়ে সিমুলেট করা হয়েছে।
 * 
 * আপনি যদি এই ফাইলের কোড এবং টাইপ বুঝতে পারেন, Nest.js আপনার কাছে পানির মতো সহজ মনে হবে!
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 08-realworld-nestjs-and-nextjs/02-nestjs-architecture-sim.ts
 */

// ১. DTO (Data Transfer Object)
export class CreatePostDto {
  title: string;
  content: string;
  tags?: string[];

  constructor(title: string, content: string, tags?: string[]) {
    this.title = title;
    this.content = content;
    this.tags = tags;
  }
}

// ২. Entity (ডাটাবেজ মডেল)
export interface PostEntity {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  createdAt: Date;
}

// ৩. Service (@Injectable() ইনজেক্টেবল বিজনেস লজিক)
export class PostService {
  private posts: PostEntity[] = [];

  async create(dto: CreatePostDto, authorId: string): Promise<PostEntity> {
    const newPost: PostEntity = {
      id: `post_${Date.now()}`,
      title: dto.title,
      content: dto.content,
      tags: dto.tags || [],
      authorId,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  async findAll(): Promise<PostEntity[]> {
    return [...this.posts];
  }
}

// ৪. Guard (Auth Guard - CanActivate)
export class JwtAuthGuard {
  canActivate(context: { user?: { id: string; role: string } }): boolean {
    return !!context.user;
  }
}

// ৫. Controller (@Controller('posts') - HTTP লেয়ার)
export class PostController {
  // Dependency Injection (DI) - Constructor Injection
  constructor(
    private readonly postService: PostService,
    private readonly authGuard: JwtAuthGuard
  ) {}

  async handleCreatePost(
    requestContext: { user?: { id: string; role: string } },
    body: CreatePostDto
  ) {
    // Guard Execution
    if (!this.authGuard.canActivate(requestContext)) {
      throw new Error("401 Unauthorized: Please log in first");
    }

    // Call Service
    const createdPost = await this.postService.create(body, requestContext.user!.id);
    return {
      statusCode: 201,
      message: "Post created successfully via NestJS architecture simulation",
      data: createdPost,
    };
  }
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস ও এক্সিকিউশন
// ============================================================================

async function runNestSimulation() {
  const service = new PostService();
  const guard = new JwtAuthGuard();
  const controller = new PostController(service, guard);

  const dto = new CreatePostDto(
    "NestJS Architecture is Awesome",
    "Once TypeScript foundations are solid, NestJS feels natural!"
  );

  const response = await controller.handleCreatePost(
    { user: { id: "user_freak_10", role: "ADMIN" } },
    dto
  );

  console.log("Response:", response);
  if (response.statusCode === 201 && response.data.title.includes("NestJS")) {
    console.log("🎉 Module 8.2 Passed! You are now 100% ready to master Nest.js & Next.js!");
  }
}

runNestSimulation();
