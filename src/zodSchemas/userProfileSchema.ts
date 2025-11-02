import z from 'zod';

export const userProfileSchema = z.object({
    bio: z
        .string()
        .min(10, { message: "Bio must be at least 10 characters long." })
        .max(200, { message: "Bio must not exceed 200 characters." }),
});