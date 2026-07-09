import { prisma } from "../db/prisma.js";
import { createSlug } from "../utils/slugify.js";

const isUuid = (value) => /^[0-9a-fA-F-]{36}$/.test(value);

const buildSlugBase = (data) => {
  if (data.title) {
    const s = createSlug(data.title);
    if (s) return s;
  }

  const groom = data.couple?.groomEn || data.couple?.groom || "groom";
  const bride = data.couple?.brideEn || data.couple?.bride || "bride";
  const year = data.weddingDate ? new Date(data.weddingDate).getFullYear() : "event";
  const base = createSlug(`${groom}-${bride}-${year}`) || `invite-${Date.now().toString(36)}`;
  return base;
};

const generateUniqueSlug = async (base) => {
  let candidate = base;
  let attempt = 0;

  while (attempt < 5) {
    // check uniqueness
    const existing = await prisma.invitation.findUnique({ where: { slug: candidate } });
    if (!existing) return candidate;
    attempt += 1;
    candidate = `${base}-${Math.random().toString(36).slice(2, 7)}`;
  }

  return `${base}-${Date.now().toString(36)}`;
};

const buildInvitationPayload = (invitation) => ({
  id: invitation.id,
  slug: invitation.slug,
  title: invitation.title,
  category: invitation.category,
  style: invitation.style,
  couple: invitation.couple,
  hero: invitation.hero,
  story: invitation.story,
  weddingDate: invitation.weddingDate.toISOString(),
  calendar: invitation.calendar,
  musicUrl: invitation.musicUrl,
  final: {
    title: invitation.finalSection?.title || "",
    message: invitation.finalSection?.message || "",
    image: invitation.finalSection?.image || "",
  },
  locations: (invitation.locations || []).map((location) => ({
    type: location.type || "ceremony",
    id: location.id,
    name: location.name,
    nameEn: location.nameEn || "",
    image: location.imageUrl || "",
    address: location.address,
    mapUrl: location.mapUrl,
    order: location.order,
  })),
  timeline: {
    title: invitation.timelineSection?.title || "",
    events: (invitation.timelineEvents || []).map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      time: event.time,
      order: event.order,
    })),
  },
  dressCode: {
    title: invitation.dressCodeSection?.title || "",
    description: invitation.dressCodeSection?.description || "",
    images: (invitation.dressCodeImages || []).map((i) => i.imageUrl),
    colorPalette: invitation.dressCodeSection?.colorPalette || [],
    guidelines: invitation.dressCodeSection?.guidelines || [],
  },
  gallery: (invitation.galleryImages || []).map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    caption: item.caption,
    order: item.order,
  })),
  rsvp: invitation.rsvpSection || { title: invitation.title || "RSVP", subtitle: "" },
  status: invitation.status,
  isPublic: invitation.isPublic,
  createdAt: invitation.createdAt.toISOString(),
  updatedAt: invitation.updatedAt.toISOString(),
});

const buildSearchWhere = (search) => {
  if (!search) return undefined;

  return [
    { title: { contains: search, mode: "insensitive" } },
    { category: { contains: search, mode: "insensitive" } },
    { style: { contains: search, mode: "insensitive" } },
    { couple: { path: ["groom"], string_contains: search } },
    { couple: { path: ["bride"], string_contains: search } },
    { couple: { path: ["groomEn"], string_contains: search } },
    { couple: { path: ["brideEn"], string_contains: search } },
  ];
};

export const getInvitationList = async ({ page = 1, limit = 20, search, isPublic }) => {
  const where = {};

  if (isPublic !== undefined) {
    where.isPublic = isPublic;
    if (isPublic) {
      where.status = "APPROVED";
    }
  }

  if (search) {
    where.OR = buildSearchWhere(search);
  }

  const total = await prisma.invitation.count({ where });
  const invitations = await prisma.invitation.findMany({
    where,
    orderBy: { weddingDate: "asc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      locations: true,
      timelineEvents: true,
      dressCodeImages: true,
      galleryImages: true,
    },
  });

  return {
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
    data: invitations.map(buildInvitationPayload),
  };
};

export const getInvitation = async (identifier, publicOnly = true) => {
  const where = isUuid(identifier) ? { id: identifier } : { slug: identifier };
  const search = publicOnly ? { ...where, isPublic: true, status: "APPROVED" } : where;

  const invitation = await prisma.invitation.findFirst({
    where: search,
    include: {
      locations: { orderBy: { order: "asc" } },
      timelineEvents: { orderBy: { order: "asc" } },
      dressCodeImages: { orderBy: { order: "asc" } },
      galleryImages: { orderBy: { order: "asc" } },
    },
  });

  return invitation ? buildInvitationPayload(invitation) : null;
};

export const getLocationsByInvitationId = async (invitationId) => {
  return prisma.location.findMany({
    where: { invitationId },
    orderBy: { order: "asc" },
  });
};

export const getTimelineByInvitationId = async (invitationId) => {
  return prisma.timelineEvent.findMany({
    where: { invitationId },
    orderBy: { order: "asc" },
  });
};

export const getGalleryByInvitationId = async (invitationId) => {
  return prisma.galleryImage.findMany({
    where: { invitationId },
    orderBy: { order: "asc" },
  });
};

export const createInvitation = async (data, userId) => {
  const slugBase = buildSlugBase(data);
  const slug = await generateUniqueSlug(slugBase);

  const payload = {
    slug,
    title: data.title,
    category: data.category || "wedding",
    style: data.style || "elegant",
    couple: data.couple,
    hero: data.hero,
    story: data.story,
    calendar: data.calendar,
    rsvpSection: data.rsvp,
    timelineSection: data.timeline,
    dressCodeSection: {
      title: data.dressCode?.title || "",
      description: data.dressCode?.description || "",
      colorPalette: data.dressCode?.colorPalette || [],
      guidelines: data.dressCode?.guidelines || [],
    },
    weddingDate: new Date(data.weddingDate),
    musicUrl: data.musicUrl,
    finalSection: data.final,
    status: "PENDING",
    isPublic: false,
    createdBy: userId || null,
    locations: {
      create: (data.locations || []).map((location) => ({
        name: location.name,
        type: location.type,
        nameEn: location.nameEn,
        imageUrl: location.image,
        address: location.address || "",
        mapUrl: location.mapUrl || null,
        order: location.order ?? 0,
      })),
    },
    timelineEvents: {
      create: (data.timeline?.events || []).map((event, idx) => ({
        title: event.title,
        description: event.description || "",
        time: event.time,
        order: event.order ?? idx,
      })),
    },
    dressCodeImages: {
      create: (data.dressCode?.images || []).map((imageUrl, idx) => ({
        label: '',
        imageUrl,
        order: idx,
      })),
    },
    galleryImages: {
      create: (data.gallery || []).map((image, idx) => ({
        imageUrl: image.imageUrl,
        caption: image.caption || '',
        order: image.order ?? idx,
      })),
    },
  };

  const invitation = await prisma.invitation.create({
    data: payload,
    include: {
      locations: true,
      timelineEvents: true,
      dressCodeImages: true,
      galleryImages: true,
    },
  });

  return buildInvitationPayload(invitation);
};

export const updateInvitation = async (id, data) => {
  const payload = {
    title: data.title,
    category: data.category,
    style: data.style,
    couple: data.couple,
    hero: data.hero,
    story: data.story,
    calendar: data.calendar,
    rsvpSection: data.rsvp,
    timelineSection: data.timeline,
    dressCodeSection: data.dressCode,
    weddingDate: new Date(data.weddingDate),
    musicUrl: data.musicUrl,
    finalSection: data.final,
    status: data.status,
    isPublic: data.isPublic,
  };

  const transaction = [prisma.invitation.update({ where: { id }, data: payload })];

  if (data.locations) {
    transaction.push(prisma.location.deleteMany({ where: { invitationId: id } }));
    transaction.push(
      prisma.location.createMany({
        data: (data.locations || []).map((location) => ({
          invitationId: id,
          name: location.name,
          type: location.type,
          nameEn: location.nameEn,
          imageUrl: location.image,
          address: location.address || "",
          mapUrl: location.mapUrl || null,
          order: location.order ?? 0,
        })),
      }),
    );
  }

  if (data.timeline) {
    transaction.push(prisma.timelineEvent.deleteMany({ where: { invitationId: id } }));
    transaction.push(
      prisma.timelineEvent.createMany({
        data: (data.timeline?.events || []).map((event, idx) => ({
          invitationId: id,
          title: event.title,
          description: event.description || "",
          time: event.time,
          order: event.order ?? idx,
        })),
      }),
    );
  }

  if (data.dressCode) {
    transaction.push(prisma.dressCodeImage.deleteMany({ where: { invitationId: id } }));
    transaction.push(
      prisma.dressCodeImage.createMany({
        data: (data.dressCode?.images || []).map((imageUrl, idx) => ({
          invitationId: id,
          label: '',
          imageUrl,
          order: idx,
        })),
      }),
    );
  }

  if (data.gallery) {
    transaction.push(prisma.galleryImage.deleteMany({ where: { invitationId: id } }));
    transaction.push(
      prisma.galleryImage.createMany({
        data: (data.gallery || []).map((image, idx) => ({
          invitationId: id,
          imageUrl: image.imageUrl,
          caption: image.caption || '',
          order: image.order ?? idx,
        })),
      }),
    );
  }

  await prisma.$transaction(transaction);
  return getInvitation(id, false);
};

export const deleteInvitation = async (id) => {
  return prisma.invitation.delete({ where: { id } });
};

export const approveInvitation = async (id) => {
  const invitation = await prisma.invitation.update({
    where: { id },
    data: { status: "APPROVED", isPublic: true },
    include: {
      locations: true,
      timelineEvents: true,
      dressCodeImages: true,
      galleryImages: true,
    },
  });

  return buildInvitationPayload(invitation);
};

export const rejectInvitation = async (id) => {
  const invitation = await prisma.invitation.update({
    where: { id },
    data: { status: "REJECTED", isPublic: false },
    include: {
      locations: true,
      timelineEvents: true,
      dressCodeImages: true,
      galleryImages: true,
    },
  });

  return buildInvitationPayload(invitation);
};
