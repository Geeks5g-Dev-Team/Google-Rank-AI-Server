import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreatePostDto): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        postContent: string;
        postImage: string | null;
        postUrl: string | null;
    }>;
    findAll(): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        postContent: string;
        postImage: string | null;
        postUrl: string | null;
    }[]>;
    findOne(id: string): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        postContent: string;
        postImage: string | null;
        postUrl: string | null;
    }>;
    update(id: string, data: UpdatePostDto): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        postContent: string;
        postImage: string | null;
        postUrl: string | null;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        postContent: string;
        postImage: string | null;
        postUrl: string | null;
    }>;
}
