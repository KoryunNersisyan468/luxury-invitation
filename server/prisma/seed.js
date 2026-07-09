import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const main = async () => {
  const passwordHash = await bcrypt.hash("SaFeP@ssw0rd!", 12);

  await prisma.user.upsert({
    where: { email: "admin@luxurywedding.com" },
    update: { password: passwordHash, role: "ADMIN" },
    create: {
      email: "admin@luxurywedding.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const invitation = await prisma.invitation.upsert({
    where: { slug: "karen-gayane-wedding" },
    update: {
      title: "Karen & Gayane",
      category: "wedding",
      style: "elegant",
      couple: {
        groom: "Karen",
        bride: "Gayane",
        groomEn: "KAREN",
        brideEn: "GAYANE",
      },
      hero: {
        image: "/uploads/hero.jpg",
        subtitle: "Սիրով հրավիրում ենք",
      },
      story: {
        title: "Մեր Սիրո Պատմությունը",
        content: "Our story began in a dream-like meeting. From the first moment, we knew this was forever.",
      },
      calendar: {
        monthName: "Օգոստոս",
        year: 2026,
      },
      weddingDate: new Date("2026-08-17T15:00:00.000Z"),
      musicUrl: "https://example.com/music.mp3",
      finalSection: {
        message: "Ամենայն սրտանց ձեզ սպասում ենք մեր մեջունությանը։",
      },
      status: "APPROVED",
      isPublic: true,
    },
    create: {
      slug: "karen-gayane-wedding",
      title: "Karen & Gayane",
      category: "wedding",
      style: "elegant",
      couple: {
        groom: "Karen",
        bride: "Gayane",
        groomEn: "KAREN",
        brideEn: "GAYANE",
      },
      hero: {
        image: "/uploads/hero.jpg",
        subtitle: "Սիրով հրավիրում ենք",
      },
      story: {
        title: "Մեր Սիրո Պատմությունը",
        content: "Our story began in a dream-like meeting. From the first moment, we knew this was forever.",
      },
      calendar: {
        monthName: "Օգոստոս",
        year: 2026,
      },
      weddingDate: new Date("2026-08-17T15:00:00.000Z"),
      musicUrl: "https://example.com/music.mp3",
      finalSection: {
        message: "Ամենայն սրտանց ձեզ սպասում ենք մեր մեջունությանը։",
      },
      status: "APPROVED",
      isPublic: true,
    },
  });

  const categories = [
    ["wedding", "Wedding"],
    ["birthday", "Birthday"],
    ["baby-shower", "Baby Shower"],
    ["engagement", "Engagement"],
    ["graduation", "Graduation"],
  ];

  for (const [slug, name] of categories) {
    await prisma.invitationCategory.upsert({
      where: { slug },
      update: { name, isActive: true },
      create: { slug, name, isActive: true },
    });
  }

  const templates = [
    ["wedding", "elegant", "Elegant"],
    ["wedding", "luxury", "Luxury"],
    ["wedding", "minimal", "Minimal"],
    ["wedding", "floral", "Floral"],
    ["wedding", "classic", "Classic"],
    ["birthday", "kids", "Kids"],
    ["birthday", "modern", "Modern"],
    ["birthday", "neon", "Neon"],
    ["birthday", "cartoon", "Cartoon"],
    ["birthday", "luxury", "Luxury"],
    ["baby-shower", "soft", "Soft"],
    ["baby-shower", "storybook", "Storybook"],
    ["engagement", "romantic", "Romantic"],
    ["engagement", "minimal", "Minimal"],
    ["graduation", "modern", "Modern"],
    ["graduation", "formal", "Formal"],
  ];

  await prisma.invitationTemplate.deleteMany();

  for (const [category, style, name] of templates) {
    await prisma.invitationTemplate.create({
      data: { category, style, name, isActive: true },
    });
  }

  await prisma.location.createMany({
    data: [
      {
        invitationId: invitation.id,
        type: 'ceremony',
        name: "Wedding Ceremony",
        nameEn: "Wedding Ceremony",
        imageUrl: "/uploads/location-ceremony.jpg",
        address: "123 Luxury Villa, Yerevan",
        mapUrl: "https://maps.example.com/ceremony",
        order: 1,
      },
      {
        invitationId: invitation.id,
        type: 'reception',
        name: "Reception",
        nameEn: "Reception",
        imageUrl: "/uploads/location-reception.jpg",
        address: "Grand Ballroom, Yerevan",
        mapUrl: "https://maps.example.com/reception",
        order: 2,
      },
    ],
  });

  await prisma.timelineEvent.createMany({
    data: [
      {
        invitationId: invitation.id,
        title: "First meeting",
        description: "The first time our paths crossed.",
        time: "2024-06-01T18:00:00.000Z",
        order: 1,
      },
      {
        invitationId: invitation.id,
        title: "The proposal",
        description: "A perfect evening under the stars.",
        time: "2025-12-12T20:00:00.000Z",
        order: 2,
      },
    ],
  });

  await prisma.dressCodeImage.createMany({
    data: [
      {
        invitationId: invitation.id,
        label: "Black Tie",
        imageUrl: "/uploads/dresscode-black.jpg",
        order: 1,
      },
      {
        invitationId: invitation.id,
        label: "Cocktail Glam",
        imageUrl: "/uploads/dresscode-cocktail.jpg",
        order: 2,
      },
    ],
  });

  await prisma.galleryImage.createMany({
    data: [
      {
        invitationId: invitation.id,
        imageUrl: "/uploads/gallery-1.jpg",
        caption: "Couple portrait",
        order: 1,
      },
      {
        invitationId: invitation.id,
        imageUrl: "/uploads/gallery-2.jpg",
        caption: "Engagement celebration",
        order: 2,
      },
    ],
  });

  console.log("Seed completed.");
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
